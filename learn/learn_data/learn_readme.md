# learn_readme.md

> Notes for future-me and AI collaborators. This is how `learn.html` is wired together and how to add or extend interactive courses without breaking anything.

---

## Architecture overview

**Zero build step. Zero backend. Zero `fetch()`. Lazy per-lesson loading.**

- All code runs 100% in the browser — SQL via sql.js (SQLite asm.js), Python via Skulpt.
- All data loads via `<script>` tags so the site works when opened as `file://` locally.
- A course's metadata + lesson index loads when the user opens that course; each lesson's full content (and any SQL schema it references) loads only when the user navigates into that lesson. The playground's demo schema loads only when the user clicks "Load Demo Tables".

So opening the SQL course list pulls **~8 KB** (one `course.js`); opening one lesson pulls **another ~5–15 KB** (one lesson file + maybe one schema file). Compared to the old monolith (the original SQL `course.js` was 134 KB; Python was 270 KB), users now download an order of magnitude less.

---

## File layout

```
learn.html                              ← interactive UI (routing, rendering, engines)
learn/
├── learn-core.js                       ← loadCourse / loadLesson / loadSchema, ripple,
│                                         splitter, progress, course caching
├── learn-engines.js                    ← sql.js + Skulpt + Monaco wrappers,
│                                         result-table rendering helpers
├── learn-i18n.js                       ← zh / en translations + applyLang / tt / pickLang
├── learn-lesson-parser.js              ← `@@key` parser + LEARN.{course,lesson,schema}
│                                         registrars + assembleOneLesson
├── learn-views.js                      ← course list, lesson list, playgrounds
├── learn-lesson.js                     ← lesson runners (SQL grading, Python grading),
│                                         hash router, boot
└── learn_data/
    ├── learn_readme.md                 ← this file
    ├── manifest.js                     ← course catalogue (window.__LEARN_MANIFEST)
    ├── sql/
    │   ├── course.js                   ← metadata + lesson index + schema manifest
    │   ├── schemas/<name>.js           ← shared SQL schemas (LEARN.schema)
    │   └── lessons/<NN>-<slug>.js      ← per-lesson content (LEARN.lesson)
    └── python/
        ├── course.js                   ← metadata + lesson index (no schemas)
        └── lessons/<NN>-<slug>.js
lib/
├── design/                             ← visual assets (fonts, M3 tokens, shared CSS)
├── resources/                          ← static images (po.webp, etc.)
└── runtime/
    ├── sql-asm.js                      ← sql.js engine (eager init at module load)
    ├── webPython/                      ← Skulpt Python interpreter (lazy)
    ├── luxon.min.js                    ← date library (used by blog/95)
    └── monaco/vs/                      ← Monaco editor (~3MB, vs/loader.js eager,
                                          vs/editor/editor.main lazy)
```

---

## How loading works

```
manifest.js (eager) ─┐
                     │
                     ▼
            User clicks course card
                     │
                     ▼
       loadCourse(slug)         ← injects <slug>/course.js
                     │
                     ▼
   course meta + lesson index ready (cards rendered)
                     │
                     ▼
            User clicks a lesson
                     │
                     ▼
       loadLesson(slug, id)     ← injects lessons/<NN>-<slug>.js
                     │
                     ▼
       Does the lesson set @@schema?
              │            │
              yes           no
              │             │
              ▼             ▼
      loadSchema(...)   ready
              │
              ▼
       inject schemas/<name>.js
              │
              ▼
       lesson.setup ← LEARN._schemas[<slug>:<name>]
```

`loadCourse`, `loadLesson`, `loadSchema` all dedupe in-flight requests and cache successful loads. Once a schema or lesson is fetched, it stays in memory for the rest of the session.

---

## `manifest.js` schema

```js
window.__LEARN_MANIFEST = {
  version: 1,
  updated: 'YYYY-MM-DD',
  courses: [
    {
      slug: 'sql',                              // REQUIRED — matches folder name
      icon: 'SQL',                              // shown on the card
      title: { zh: '...', en: '...' },
      desc:  { zh: '...', en: '...' },
      level: { zh: '入门', en: 'Beginner' },
      lessonsCount: 42,
      coming: false,                            // true → greyed-out "Coming Soon"
    }
  ]
};
```

Manifest only tells the course list view what cards to show. The course's *contents* live behind `loadCourse(slug)`.

---

## `course.js` schema (v2)

A course file calls `LEARN.course(slug, meta)`. It carries metadata, a lesson INDEX, and (for SQL) a schema manifest:

```js
LEARN.course('sql', {
  slug: 'sql',
  type: 'sql',                                  // 'sql' | 'python'
  title: { zh: '...', en: '...' },
  desc:  { zh: '...', en: '...' },

  hasPlayground: true,
  playgroundTitle:  { zh: '...', en: '...' },
  playgroundSchema: 'final_schema',             // SQL only — name from `schemas` below

  // SQL only. Schema name → file path. Loaded lazily by loadSchema().
  schemas: {
    c1_schema:    'schemas/c1_schema.js',
    final_schema: 'schemas/final_schema.js',
    // ...
  },

  // Lesson INDEX. Just enough to render the lesson list.
  // Full content (intro/task/hint/setup/expectedSql/...) lives in `file`.
  lessons: [
    { id: 1, section: 'main', slug: 'select-basics',
      title:   { zh: '...', en: '...' },
      chapter: { zh: '...', en: '...' },
      file: 'lessons/01-select-basics.js' },
    // ...
  ],
});
```

`section` defaults to `'main'`. The router treats `'final'` as a separate group with its own header in the lesson list (e.g., "最终挑战" / "Final challenges").

---

## Lesson file format (`@@key` syntax)

A lesson file calls `LEARN.lesson(courseSlug, id, raw)` once, with the content as a template literal in `raw`:

```js
LEARN.lesson('sql', 1, `
@@schema c1_schema
@@chapterRef sql-syntax-guide-1
@@expectedSql SELECT name, score FROM students
@@checkOrder false
@@tables students

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead"><strong>SELECT</strong> 是 SQL 的第一关键字 ——</p>
<pre><code>SELECT 列1, 列2 FROM 表名;</code></pre>
@@intro:en
<p class="lead"><strong>SELECT</strong> is the first SQL keyword —</p>
<pre><code>SELECT col1, col2 FROM table_name;</code></pre>

@@task:zh
从 <code>students</code> 表里只显示每个学生的 <code>name</code> 和 <code>score</code> 两列。
@@task:en
Return only the <code>name</code> and <code>score</code> of every student.

@@hint:zh
SELECT 后面把列名用逗号分开，再写 FROM 表名。
@@hint:en
List columns after SELECT separated by commas, then FROM <table>.

@@starter:zh
-- 在这里写你的 SQL

@@starter:en
-- write your SQL here
`);
```

### `@@key` rules

- `@@key value` (rest-of-line)         — single-line scalar
- `@@key` then lines until next `@@`   — multi-line scalar
- `@@key:zh` / `@@key:en`              — bilingual variant; assembled into `{zh, en}`
- `@@` (double-at) is the field marker. Single `@` would collide with Python decorators (`@property`, `@app.route`) appearing at column 0 inside code examples; `@@` doesn't collide with anything real.

### Trailing newlines

The parser preserves the value verbatim — including a trailing `\n`. The convention is **"blank line before the next `@@key` to encode a trailing `\n` in the value"**:

```
@@starter:zh
-- 在这里写你的 SQL              ← value ends without '\n'
@@starter:en

@@starter:zh
-- 在这里写你的 SQL
                                   ← value ends with '\n' (cursor lands on a clean line)
@@starter:en
```

This matters for `starter` (Monaco cursor placement) and `answer` / `expectedOutput` (Python grading compares stdout exactly).

### Field reference

| Field             | Type            | Where                 | Notes                                            |
|-------------------|-----------------|-----------------------|--------------------------------------------------|
| `id`              | int             | LEARN.lesson 2nd arg + course.js index | Stable identity, used for routing & progress    |
| `section`         | string          | course.js index       | `'main'` (default) or `'final'`                  |
| `slug`            | string          | course.js index       | URL-friendly; used in filename                   |
| `title`           | bilingual       | course.js index       |                                                  |
| `chapter`         | bilingual       | course.js index       | Sub-label shown under the lesson title           |
| `chapterRef`      | string          | lesson file           | Optional — links to a blog post                  |
| `difficulty`      | bilingual       | lesson file           | "入门" / "Beginner" etc.                         |
| `intro`           | bilingual HTML  | lesson file           | Long-form lesson explanation                     |
| `task`            | bilingual HTML  | lesson file           | What the user must accomplish                    |
| `hint`            | bilingual HTML  | lesson file           | Optional — shown on demand                       |
| `warning`         | bilingual HTML  | lesson file           | Optional — caveats / browser-sandbox notes       |
| `subtitle`        | bilingual HTML  | lesson file           | Optional                                         |
| `starter`         | bilingual code  | lesson file           | Initial editor contents                          |
| **SQL only**      |                 |                       |                                                  |
| `schema`          | string          | lesson file           | Name from `course.schemas`; resolved to `setup`  |
| `tables`          | array           | lesson file           | Table names to preview in the left pane          |
| `expectedSql`     | string          | lesson file           | Grader runs this against the same fresh DB       |
| `checkOrder`      | bool            | lesson file           | `true` → row order must match (ORDER BY/LIMIT)   |
| **Python only**   |                 |                       |                                                  |
| `answer`          | code            | lesson file           | Reference solution (revealed by "Show answer")   |
| `expectedOutput`  | string          | lesson file           | Grader compares stdout (after trim) to this      |
| `testInputs`      | array           | lesson file           | Strings fed to `input()` during grading run      |

Bilingual fields appear as `@@key:zh` and `@@key:en` blocks. Scalar string/int/bool fields appear as plain `@@key` blocks. `tables` is comma- or space-separated. `testInputs` is one input per line.

---

## Schema file format (SQL only)

```js
// learn/learn_data/sql/schemas/c1_schema.js

LEARN.schema('sql:c1_schema', `
  CREATE TABLE students (id INTEGER, name TEXT, age INTEGER, gender TEXT, score INTEGER);
  INSERT INTO students VALUES (1, 'Alice', 18, 'F', 85);
  INSERT INTO students VALUES (2, 'Bob',   19, 'M', 92);
  INSERT INTO students VALUES (3, 'Carol', 20, 'F', 78);
  INSERT INTO students VALUES (4, 'David', 18, 'M', 88);
`);
```

The fully-qualified name is `<courseSlug>:<schemaName>`. Lessons reference by `<schemaName>` only (`@@schema c1_schema`); the course slug is added automatically.

### Schema dedup convention (conservative)

- **`final_schema`** — the big shared library/bookstore database. Used by every "final challenge" lesson + the playground.
- **`c<N>_schema`** — single-use schema owned by lesson `N` (most lessons).
- **Shared schemas keep the lowest member's id** in the name (`c3_schema` if shared by L3 + L5).
- **Identical bytes only**. If two lessons differ even by one row, they get separate files. Don't merge for cosmetic reasons — the principle is "the lesson author chose those exact rows on purpose; respect it."
- For *truly* shared concepts that read better with a name (e.g., `students_basic`, `books_with_genre`), give them semantic names. Use this sparingly.

---

## Engines

### SQL — sql.js (SQLite, asm.js)
- Loaded eagerly via `<script src="lib/runtime/sql-asm.js">`.
- `ensureSql()` initializes once and caches.
- Each lesson runs against a **fresh in-memory DB** — previous queries can't bleed state.
- The SQL Playground keeps a **persistent DB** for the session. "Load Demo Tables" lazy-loads `playgroundSchema` then runs it; "Reset Tables" wipes to empty.

### Python — Skulpt
- Lazy-loaded on first Python lesson or playground entry (`ensurePython()`).
- Output is captured for grading. `input()` is pumped through an in-page terminal during interactive runs; during grading runs it pulls from `testInputs` in order.
- Hard runtime limits: `yieldLimit: 100` (event-loop yield cadence), `execLimit: 10000` (10s timeout for runaway loops).

### Code editor — Monaco
- Lives at `lib/runtime/monaco/vs/`. Install: download monaco-editor's npm tarball, extract `package/min/vs/` into that path.
- `vs/loader.js` (small AMD loader) is fetched eagerly by `learn.html`. `vs/editor/editor.main` (~3 MB) is loaded lazily by `ensureMonaco()` the first time a lesson or playground opens.
- Editors are created via `createCodeEditor(container, opts)` — wraps `monaco.editor.create` with project defaults + auto-grow height (mimics Ace's `minLines`/`maxLines`).
- Workers are routed to an empty `data:` URL so language services degrade to the main thread (required for `file://` compatibility). DevTools shows many `data:text/javascrip…` 0-byte requests; that's normal — filter `-data:` to hide.

---

## How to add a new lesson (SQL)

1. Pick an `id` (next free integer in the course).
2. Pick a `slug` (lowercase, hyphenated: `having-filter`, `cross-join-basics`).
3. Decide the schema:
   - If an existing schema fits, reuse its name in `@@schema`.
   - Otherwise create `learn/learn_data/sql/schemas/c<id>_schema.js` and add the entry to `course.schemas` in `course.js`.
4. Create `learn/learn_data/sql/lessons/<NN>-<slug>.js` using the format above.
5. Append the index entry to `course.lessons` in `course.js`.
6. Bump `lessonsCount` in `manifest.js` if visible.

## How to add a new lesson (Python)

1. Pick an `id`.
2. Pick a `slug` (derived from English title, e.g., `for-loop-basics`).
3. Create `learn/learn_data/python/lessons/<NN>-<slug>.js`.
4. Append the index entry to `course.lessons` in `course.js`.
5. No schema work — Python lessons are self-contained.

## How to add a new course

1. Pick a slug (lowercase, hyphenated). The folder name = the slug.
2. Create `learn/learn_data/<slug>/course.js` registering with `LEARN.course('<slug>', { type: 'sql' | 'python', ... })`.
3. Create `lessons/` (and `schemas/` if SQL).
4. Add an entry to `manifest.js`.

A new language type (e.g., JavaScript, C) requires runtime work — adding an `ensure<Language>()` engine wrapper, a grading path in `learn-lesson.js`, and a playground in `learn-views.js`.

---

## If you are an AI writing course content

### General

1. **Bilingual**: every prose field needs both `@@key:zh` and `@@key:en`.
2. **Verbatim HTML**: intro/task/hint use raw HTML (`<p class="lead">`, `<pre><code>`, `<strong>`, `<code>`). Don't switch to Markdown — the parser doesn't render Markdown today (it's verbatim pass-through).
3. **`@@` (double-at)** at column 0 is the field marker. Inside a code example a single `@` (Python decorator) is fine.
4. **Trailing `\n` in `starter` / `answer` / `expectedOutput` is meaningful**. Encode it by leaving a blank line before the next `@@key`.

### SQL specifics

1. **Match `expectedSql` to the task exactly**: if the task says "name and age", `expectedSql` must `SELECT name, age` — not `SELECT *`.
2. **SQLite dialect**: dates are ISO strings (`'YYYY-MM-DD'`); comparison is lexicographic AND chronological for that format. No `RIGHT JOIN` or `FULL OUTER JOIN`.
3. **`checkOrder: false` (default)**: both result sets are sorted before compare. Set `true` only for `ORDER BY` / `LIMIT` lessons.
4. **Hints nudge, don't solve**: "Try `WHERE`" beats giving the answer.
5. **Write the schema first, then the task, then `expectedSql`** — this proves the problem is solvable and the data set is sufficient.

### Python specifics

1. **`expectedOutput` must match stdout exactly** (after trim). If your task says "print the sum", make sure `answer` produces *only* that, with the right trailing `\n`.
2. **`testInputs` order matches `input()` calls**. Inputs are strings (Python's `input()` returns string).
3. **Sandbox limits**: no file I/O, no network. If a topic needs a file, simulate the content as a string variable (see L48 / L49 for the convention).
4. **Skulpt is Python 3-ish but not 100%**. f-strings, list/dict/set comprehensions, basic stdlib (`math`, `random`, `re`) all work; `numpy`, `pandas`, `requests` etc. don't.
