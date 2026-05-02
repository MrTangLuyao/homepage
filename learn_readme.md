# learn_readme.md

> Notes for future-me and AI collaborators. This is how `learn.html` is wired together and how to add or extend interactive courses without breaking the sandbox.

---

## Architecture overview

**Zero build step, zero backend, zero `fetch()`.**

- All code runs 100% in the browser — SQL via sql.js (SQLite asm.js), C via JSCPP (pure-JS C interpreter).
- All data is loaded via `<script>` tags so the site works when opened as `file://` locally.
- `learn_data/manifest.js` — course index (metadata only).
- `learn_data/<slug>/course.js` — full course content, lazy-injected when the user opens that course.

---

## File layout

```
learn.html                         ← the entire interactive UI (routing, rendering, engines)
learn_data/
├── manifest.js                    ← INDEX ONLY. Sets window.__LEARN_MANIFEST.
├── sql/
│   └── course.js                  ← SQL course. Sets window.__LEARN_COURSES['sql'].
└── c/
    └── course.js                  ← C course.  Sets window.__LEARN_COURSES['c'].
lib/
├── sql-asm.js                     ← sql.js engine (SQLite, asm.js build). Loaded eagerly.
├── JSCPP.es5.min.js               ← JSCPP C interpreter (pure JS, ~620 KB). Lazy-loaded.
├── picoc.min.js                   ← PicoC WASM C interpreter (backup, NOT currently used — causes main-thread freeze on load due to synchronous WASM compilation).
├── ace/
│   ├── ace.min.js                 ← Ace code editor. Loaded eagerly.
│   ├── mode-mysql.min.js          ← SQL syntax highlighting.
│   ├── mode-c_cpp.min.js          ← C/C++ syntax highlighting.
│   └── theme-tomorrow_night.min.js← Dark theme for the editor.
└── (fonts, images, etc.)
learn_readme.md                    ← this file
```

---

## manifest.js schema

```js
window.__LEARN_MANIFEST = {
  version: 1,
  updated: 'YYYY-MM-DD',
  courses: [
    {
      slug: 'sql',               // REQUIRED. Matches folder name and course key.
      icon: 'SQL',               // Shown on the card.
      title: { zh: '...', en: '...' },
      desc:  { zh: '...', en: '...' },
      level: { zh: '入门', en: 'Beginner' },
      lessonsCount: 42,
      coming: false              // true = greyed-out "Coming Soon", unclickable.
    }
  ]
};
```

---

## course.js schema — SQL course

```js
(window.__LEARN_COURSES = window.__LEARN_COURSES || {})['sql'] = {
  slug: 'sql',
  title: { zh: '...', en: '...' },
  desc:  { zh: '...', en: '...' },

  // Playground (free-form editor, no grading)
  hasPlayground: true,
  playgroundTitle: { zh: '自定义 SQL 语句', en: 'Custom SQL Playground' },
  playgroundSetup: SOME_SQL_STRING,  // SQL run when user clicks "加载 Demo 表"

  lessons: [
    {
      id: 1,
      section: 'main',           // 'main' | 'final' | any string for custom section label
      slug: 'select-basics',
      title:    { zh: '...', en: '...' },
      chapter:  { zh: '...', en: '...' },
      chapterRef: 'blog-slug',   // OPTIONAL — links to a blog post
      difficulty: { zh: '...', en: '...' },
      intro:    { zh: 'HTML', en: 'HTML' },
      tables:   ['students'],    // Table names to preview in the left pane
      setup:    `CREATE TABLE students...`,
      task:     { zh: '...', en: '...' },
      hint:     { zh: '...', en: '...' },
      starter:  { zh: 'SELECT ...', en: 'SELECT ...' },
      expectedSql: 'SELECT name FROM students WHERE ...',
      checkOrder: false          // true = row order must match exactly
    }
  ]
};
```

### SQL validation
- Grader runs user SQL and `expectedSql` on the same fresh in-memory DB.
- Compares columns and values positionally (column names are ignored — aliases are fine).
- `checkOrder: false` (default): both result sets are sorted before comparing.
- `checkOrder: true`: row order must match exactly. Use for `ORDER BY` / `LIMIT` lessons.

---

## course.js schema — C course

```js
(window.__LEARN_COURSES = window.__LEARN_COURSES || {})['c'] = {
  slug: 'c',
  type: 'c',                     // REQUIRED for C courses. Tells learn.html to use the C rendering path.
  title: { zh: '...', en: '...' },
  desc:  { zh: '...', en: '...' },

  hasPlayground: true,
  playgroundTitle: { zh: '自定义 C 语言代码', en: 'Custom C Playground' },
  // No playgroundSetup for C — the playground starts with an empty environment.

  lessons: [
    {
      id: 1,
      section: 'main',
      slug: 'hello-world',
      title:    { zh: '...', en: '...' },
      chapter:  { zh: '...', en: '...' },
      intro:    { zh: 'HTML', en: 'HTML' },
      task:     { zh: '...', en: '...' },
      hint:     { zh: '...', en: '...' },
      starter:  { zh: '#include <stdio.h>...', en: '...' },
      answer:   { zh: '#include <stdio.h>...', en: '...' },  // Shown when user clicks "Show Answer"
      expectedOutput: 'Hello World!\n',  // Exact stdout the program must produce
    }
  ]
};
```

### C validation
- JSCPP runs the user's code and captures stdout.
- `norm(output) === norm(expectedOutput)` — both are `.trim()`-ed and `\r\n` normalized before comparing.
- `answer` is the reference solution shown by the "Show Answer" button.
- There is no `expectedSql` for C — use `expectedOutput` instead.

---

## How the course type system works

`learn.html` checks `course.type` after loading the course file:

| `course.type` | Lesson renderer | Playground renderer |
|---|---|---|
| `undefined` / `'sql'` | `renderLesson` (SQL editor, row comparison) | `renderPlayground` (SQL with DB viewer) |
| `'c'` | `renderCLesson` (C editor, stdout comparison) | `renderCPlayground` (bare C editor) |

The playground entry row in the course list is rendered by `renderCourse` when `course.hasPlayground === true`. The label comes from `course.playgroundTitle` (falls back to `tt('playground-label')` if not set).

---

## Engines

### SQL engine — sql.js
- Loaded eagerly on page load via `<script src="lib/sql-asm.js">`.
- `ensureSql()` initialises the engine once and caches it.
- Each lesson or query runs against a **fresh in-memory DB** — previous queries can't bleed state.
- The SQL Playground maintains a **persistent DB** for the session (tables survive between queries). "加载 Demo 表" resets and reloads the full schema. "重置表" resets to empty.

### C engine — JSCPP
- **Lazy-loaded** — only downloaded when the user first opens a C lesson or playground. (~620 KB, pure JS, no WASM → no main-thread freeze.)
- `ensureC()` injects `<script src="lib/JSCPP.es5.min.js">` the first time it is needed and caches the result.
- JSCPP runs synchronously; the result is available immediately after `runC(code)` returns.
- The bundle has been **patched**: the default `stdio.write` function was changed to call `window.__cOut(s)` if that global is set. `runC` sets this global before calling JSCPP and deletes it afterwards. This approach completely bypasses JSCPP's internal `mergeConfig` / `CRuntime` config system, which was unreliable.

#### ⚠️ JSCPP known bug — comma + space in string literals

**Bug**: In JSCPP's PEG parser, a **space character immediately after a comma inside a C string literal is silently dropped**.

```c
printf("Hello, World!\n");  // outputs "Hello,World!\n"  ← WRONG
printf("Hello World!\n");   // outputs "Hello World!\n"  ← correct
printf("a, b, c\n");        // outputs "a,b,c\n"         ← spaces after commas stripped
```

Char code evidence: for `printf("Hello, World!\n")`, the captured char codes were `72 101 108 108 111 44 87 111 114 108 100 33 10` — char 32 (space) is completely absent between 44 (`,`) and 87 (`W`).

The bug is deep in JSCPP's minified PEG parser; it was not fixable by patching the `stdio.write` or config system. Workaround: **avoid spaces immediately after commas in C string literals when writing course content**.

```c
// OK — spaces elsewhere work fine:
printf("Hello World!\n");
printf("name: %s\n", name);
printf("sum = %d\n", a + b);

// AVOID in expectedOutput / answer:
printf("Hello, World!\n");   // space after comma will be stripped
printf("x = 1, y = 2\n");   // spaces after commas will be stripped
```

#### ⚠️ picoc.min.js — do NOT use for main-thread execution

`lib/picoc.min.js` is a WASM-compiled PicoC interpreter that was evaluated as an alternative to JSCPP. It was found to **freeze the browser** because its WASM binary (~600 KB) is compiled synchronously on the main thread when `picoc()` is called. It is kept in `lib/` for reference but is **not loaded or used**. To use it safely, it would need to run in a Web Worker.

---

## Code editor — Ace

All code editors (SQL and C) use **Ace editor** (`lib/ace/`). The four files are loaded eagerly:
- `ace.min.js` — core editor
- `mode-mysql.min.js` — SQL syntax
- `mode-c_cpp.min.js` — C/C++ syntax
- `theme-tomorrow_night.min.js` — shared dark theme for both SQL and C

Editors are initialised via `ace.edit(div)` with `setUseWorker(false)` (disables background syntax-check workers that would need separate files). The `minLines`/`maxLines` options control auto-height.

---

## Playground system

Any course can have a playground (free-form editor, no grading) by setting `hasPlayground: true`. The entry row appears at the top of the lesson list with a pencil icon.

### SQL playground extras
- Left pane shows a live DB schema (all tables in the current session DB).
- "加载 Demo 表" button: resets the DB and loads `course.playgroundSetup` SQL.
- "重置表" button: resets to empty DB.
- Each Run re-uses the same DB instance (tables persist between queries).

### C playground
- Left pane shows the course title and a brief description. No DB viewer.
- Each Run is independent (no persistent state between runs).

---

## How to add a new SQL course

1. Pick a slug (lowercase, hyphenated: `python-basics`, `css-flexbox`).
2. Create `learn_data/<slug>/course.js`. Use the `sql` course as a template. Do NOT set `type`.
3. Define lessons. Keep `setup` SQL small (3–5 rows per table).
4. Add the entry to `learn_data/manifest.js`.

## How to add a new C lesson

1. Add a new object to the `lessons` array in `learn_data/c/course.js`.
2. Set `id`, `slug`, `title`, `intro`, `task`, `hint`, `starter`, `answer`, `expectedOutput`.
3. Update `lessonsCount` in `manifest.js`.
4. **Avoid spaces after commas in `expectedOutput` and `answer`** (JSCPP bug — see above).

---

## If you are an AI writing course content

### SQL
1. **Bilingual**: every string field (`title`, `task`, `intro`, `hint`, `starter`) needs both `zh` and `en`.
2. **Incremental difficulty**: don't jump from `SELECT` to `JOIN` in three levels.
3. **Real-world data**: `employees`, `orders`, `books`, `students` — not `tableA`, `col1`.
4. **SQLite dialect**: date comparisons are string-based (`'YYYY-MM-DD'`). No `RIGHT JOIN` or `FULL OUTER JOIN`.
5. **Match task to expectedSql exactly**: if the task says "name and age", `expectedSql` must be `SELECT name, age`, not `SELECT *`.
6. **Hints should nudge, not solve**: "Try using WHERE" beats giving the full answer.
7. **Write setup SQL first**, then task, then expectedSql — this ensures the problem is solvable.

### C
1. **Bilingual**: same as SQL.
2. **JSCPP limitations**: no file I/O, no OS calls, no dynamic libraries. Stick to `stdio.h`, `stdlib.h`, `string.h`, `math.h`.
3. **No spaces after commas in string literals** (JSCPP bug). Use `Hello World!` not `Hello, World!`. For format strings like `printf("x=%d, y=%d\n", x, y)` the space after `,` will be stripped in output — design `expectedOutput` accordingly, or avoid the pattern.
4. **Simple programs only**: no recursion-heavy programs (JSCPP stack is limited), no large arrays, no complex pointer arithmetic.
5. **`expectedOutput` must match exactly** (after trim + `\r\n` normalisation). Include `\n` for newlines.
6. `starter` should give students the scaffolding (`main()` boilerplate) without giving away the answer.
7. `answer` is the canonical solution shown by "Show Answer". Make it clean and idiomatic.
