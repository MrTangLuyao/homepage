# learn_readme.md

> Notes for future-me and AI collaborators. This is how `learn.html` is wired together and how to add or extend interactive courses without breaking anything.

---

## Architecture overview

**Zero build step. Zero backend. Lazy per-lesson loading.**

- SQL and Python run 100% in the browser — sql.js (SQLite asm.js) and Skulpt — loaded via `<script>` tags. file:// works locally.
- C is heavier: it runs the real **clang** compiler in a hidden `<iframe>` via [emception](https://github.com/jprendes/emception). The iframe is same-origin (mirrored under `lib/runtime/webC/`), so `<script>` and Worker creation succeed without cross-origin issues. **C lessons require HTTPS or `http://localhost`**; raw `file://` is gated off by the C-family modal.
- A course's metadata + lesson index loads when the user opens that course; each lesson's full content (and any SQL schema it references) loads only when the user navigates into that lesson.

Per-course download cost (first visit, browser-cached after):
- SQL: ~8 KB course index + ~5-15 KB per lesson
- Python: ~6 KB course index + ~3-10 KB per lesson
- **C: ~25-30 MB** (clang.wasm + libc/libc++ archives) on first playground entry; subsequent visits free

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
    ├── python/
    │   ├── course.js                   ← metadata + lesson index (no schemas)
    │   └── lessons/<NN>-<slug>.js
    └── c/
        └── course.js                   ← C course (currently playground-only)
lib/
├── design/                             ← visual assets (fonts, M3 tokens, shared CSS)
├── resources/                          ← static images (po.webp, etc.)
└── runtime/
    ├── sql-asm.js                      ← sql.js engine (eager init at module load)
    ├── webPython/                      ← Skulpt Python interpreter (lazy)
    ├── webC/                           ← emception clang mirror (~450 MB, lazy)
    │   ├── iframe.html                 ← C runtime iframe entry
    │   ├── postmsg-bridge.js           ← parent ↔ wasm postMessage adapter
    │   ├── main.bundle.js              ← upstream emception webpack bundle (3 MB)
    │   ├── emception.worker.bundle.worker.js  (530 KB)
    │   ├── cecdfcda360457a8f204.br     ← compressed clang (22 MB)
    │   └── 249 × *.a / *.gz            ← libc, libc++, libGL, etc. — fetched on demand
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

### C — emception (real clang in the browser)

C is a special case. There's no good "C interpreter" library for browsers (we tried JSCPP, TCC.wasm — both broken). The only viable option is real LLVM/clang compiled to WebAssembly via [emception](https://github.com/jprendes/emception) — a complete IDE app, not a clean library.

**Architecture** (`ensureC()` in `learn-engines.js`):

```
learn.html (parent)
  │ creates hidden <iframe src="lib/runtime/webC/iframe.html">
  ▼
iframe.html
  │ <script src="postmsg-bridge.js">
  ▼
postmsg-bridge.js
  ├─ stream-fetch main.bundle.js (with byte-progress UI)
  ├─ inject via <script src=> (so webpack auto-publicPath finds the bundle)
  ├─ wait for window.emception (set by upstream demo bundle)
  ├─ hide upstream demo UI elements
  └─ accept {type:'run', id, code, stdin?} via postMessage
       └─ writeFile /working/main.c → emcc → read /working/main.js
            └─ execute via `new Function('Module', code)(Module)`
                 with our Module.print/printErr/stdin/onExit hooks
```

The whole emception demo branch is **mirrored locally** under `lib/runtime/webC/` (~450 MB, 522 files). This is necessary because:
- Cross-origin Workers are forbidden by browsers (CORS doesn't unlock them)
- Loading from jsDelivr would put `main.bundle.js` cross-origin → its workers fail with `SecurityError`
- Same-origin mirror sidesteps every cross-origin restriction

Cloudflare Pages handles 450 MB easily (25 GB / 20k file limits, **unlimited bandwidth**). The browser only fetches what each program needs — typically **~25-30 MB on first C-playground entry**, cached forever after.

**C-family modal gate**: any course with `family: 'c'` in its manifest entry triggers `gateCFamilyAccess()` (in `learn-core.js`) before render. The modal warns about download size and `file://` incompatibility. Confirmation is sticky in `localStorage['louie-learn:cfamily-loaded']`. To re-prompt: clear that key.

**Compile flags currently used**:
```
emcc -O0 -sSINGLE_FILE=1 -sEXIT_RUNTIME=1 -sFORCE_FILESYSTEM=1 main.c -o main.js
```

- `-sSINGLE_FILE=1` — embed wasm as base64 in JS (one-file output)
- `-sEXIT_RUNTIME=1` — fire `Module.onExit(status)` when main returns (so we know exit code)
- `-sFORCE_FILESYSTEM=1` — wire `/dev/stdin` to `Module.stdin` (without it emcc may strip FS init)

### C runtime — known limitations

These are **not bugs in our code** — they're upstream constraints.

1. **No interactive `scanf`/`getchar`**. Stdin is **pre-filled** from the textarea before Run; the program reads it synchronously. We tried `-sASYNCIFY=1 -sASYNCIFY_IMPORTS=fd_read`, but emception's specific emscripten build has a bug where ASYNCIFY's state machine corrupts immediately on first `Module.stdin`-via-`handleSleep`. Adding more imports (`proc_exit`, `fd_close`) trips the WASM layout earlier still. Without ASYNCIFY, `Module.stdin` is synchronous, can't pause WASM to wait for input.
   - **Future fix**: when JSPI (JavaScript Promise Integration) is universally available — Chrome 133+ default, Firefox 132+ behind flag — replace ASYNCIFY with `-sJSPI=1`. JSPI uses native browser promise integration, doesn't have ASYNCIFY's state machine. Code stubs are kept (`onInputRequest` in `learn-engines.js`, `termRequestInput` in `learn-views.js`, `input-request`/`response` postMessage protocol in `postmsg-bridge.js`) — re-enable when JSPI ships.

2. **stdout buffering can reorder output around `scanf`**. Symptom: `printf("Hello"); scanf(...);` may swallow or delay the prompt. Two fixes work:
   - End every prompt `printf` with `\n` — line-buffered stdout flushes on newline (this is what the default playground demo does)
   - Or call `fflush(stdout);` explicitly before each `scanf` (works without `\n`, useful for inline prompts like `printf("> ");`)
   - Likely cause: libc line-buffers stdout when target is a TTY. With FORCE_FILESYSTEM, /dev/stdout is detected as a TTY, triggering buffering that delays our `Module.print` callbacks.

3. **First-time C playground load is slow on cold cache** (~25-30 MB). Mitigated by:
   - The C-family modal warning users upfront
   - The progress bar in the playground showing real bytes-loaded
   - Browser HTTP cache + Cloudflare edge cache making subsequent loads instant

4. **`file://` users see a "needs HTTPS" message** instead of the playground. emception's worker construction needs HTTPS or `http://localhost`.

### C playground — defaults

When the user opens `#c/playground` (after dismissing the C-family modal), the editor pre-loads a teaching demo that touches every C concept the playground supports:

```c
#include <stdio.h>

int main(void) {
    char name[64];
    int  age;
    char *p = name;          // pointer to the array's first element

    printf("What's your name?\n");
    scanf("%63s", p);        // write the name through the pointer

    printf("How old are you?\n");
    scanf("%d", &age);       // &age is the address of `age` (also a pointer)

    printf("Hello, %s! You are %d years old.\n", p, age);
    return 0;
}
```

Stdin textarea is pre-filled with `Louie\n19` so a single click on Run produces a complete output without any user typing. Comments switch between zh and en based on `currentLang`. Definition lives in `renderCPlayground()` in `learn-views.js`.

### emcc stderr formatting

emception forwards emcc's compiler messages line-by-line to `Module.printErr`, but each call carries no trailing newline. Without intervention, multi-line errors squash into one wrapped blob. `postmsg-bridge.js`'s compile-time `onOut` / `onErr` handlers wrap output through `withTrailingNl()` so each line lands on its own line in the terminal. ANSI color codes (e.g. `\x1b[32m`) are stripped, and emscripten internal info messages matching `^[a-z_]+:(INFO|DEBUG):` (like `shared:INFO: (Emscripten: Running sanity checks)`) are dropped — they're noise for students.

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
