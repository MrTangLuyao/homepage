# learn_readme.md

> Notes for future-me. How `learn.html` is wired together and how to add or extend interactive courses without breaking anything.

---

## Architecture overview

**Zero build step. Zero backend. Lazy per-lesson loading.**

- SQL and Python run 100% in the browser — sql.js (SQLite asm.js) and Skulpt — loaded via `<script>` tags. file:// works locally.
- C is heavier: it runs the real **clang** compiler in a hidden `<iframe>` via [emception](https://github.com/jprendes/emception). The iframe is same-origin (mirrored under `lib/runtime/webC/`), so `<script>` and Worker creation succeed without cross-origin issues. **C lessons require HTTPS or `http://localhost`**; raw `file://` is gated off by the C-family modal.
- A course's metadata + lesson index loads when the user opens that course; each lesson's full content (and any SQL schema it references) loads only when the user navigates into that lesson.

Per-course download cost (first visit, browser-cached after):
- SQL: ~8 KB course index + ~5–15 KB per lesson
- Python: ~6 KB course index + ~3–10 KB per lesson
- **C: ~25–30 MB** (clang.wasm + libc/libc++ archives) on first entry to any C-family course (`c` core syntax / `c-algo` algorithms) or playground; subsequent visits free. `c` and `c-algo` share the same emception cache.

---

## File layout

```
learn.html                              ← interactive UI (routing, rendering, engines)
learn/
├── learn-core.js                       ← loadCourse / loadLesson / loadSchema, ripple,
│                                         splitter, progress, course caching
├── learn-engines.js                    ← sql.js + Skulpt + Monaco + emception wrappers,
│                                         result-table rendering helpers
├── learn-i18n.js                       ← zh / en translations + applyLang / tt / pickLang
├── learn-lesson-parser.js              ← `@@key` parser + LEARN.{course,lesson,schema}
│                                         registrars + assembleOneLesson
├── learn-views.js                      ← course list, lesson list, playgrounds (SQL/Py/C)
├── learn-lesson.js                     ← lesson runners (SQL/Python/C grading),
│                                         hash router, boot
├── learn.css                           ← shared styles incl. the new .editor-pane layout
└── learn_data/
    ├── learn_readme.md                 ← this file
    ├── learn_readme_c.md               ← Chinese version
    ├── manifest.js                     ← course catalogue (window.__LEARN_MANIFEST)
    ├── sql/
    │   ├── course.js                   ← metadata + lesson index + schema manifest
    │   ├── schemas/<name>.js           ← shared SQL schemas (LEARN.schema)
    │   └── lessons/<NN>-<slug>.js      ← per-lesson content (LEARN.lesson)
    ├── python/
    │   ├── course.js                   ← metadata + lesson index (no schemas)
    │   └── lessons/<NN>-<slug>.js
    ├── c/
    │   ├── course.js                   ← metadata + lesson index (no schemas);
    │   │                                 'main' (syntax) and 'stdlib' sections
    │   └── lessons/<NN>-<slug>.js      ← 44 lessons total (30 syntax + 14 stdlib)
    └── c-algo/                         ← C Algorithms (Beta), shares emception runtime with c
        ├── course.js                   ← metadata + lesson index; family: 'c'
        └── lessons/<NN>-<slug>.js      ← 25 lessons (algorithms + data structures)
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
      icon: 'SQL',                              // shown on the card (also accepts a { zh, en }
                                                //   bilingual object, e.g. c-algo: { zh: 'C 算法', en: 'C Algo' })
      title: { zh: '...', en: '...' },
      desc:  { zh: '...', en: '...' },
      level: { zh: '入门', en: 'Beginner' },
      lessonsCount: 42,
      coming: false,                            // true → greyed-out "Coming Soon"
      family: 'c',                              // OPTIONAL — gates entry behind the C-resource modal
    }
  ]
};
```

Manifest only tells the course list view what cards to show. The course's *contents* live behind `loadCourse(slug)`. `family: 'c'` is currently the only family value, and it triggers `gateCFamilyAccess()` to warn about download size before the C-family course loads.

---

## `course.js` schema

A course file calls `LEARN.course(slug, meta)`. It carries metadata, a lesson INDEX, and (for SQL) a schema manifest:

```js
LEARN.course('sql', {
  slug: 'sql',
  type: 'sql',                                  // 'sql' | 'python' | 'c'
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

`section` defaults to `'main'`. The router treats `'final'` and `'stdlib'` as separate groups with their own headers in the lesson list (e.g., "最终挑战" / "标准库"). The C course uses both `'main'` (syntax lessons) and `'stdlib'` (`<stdio.h>`, `<string.h>`, etc.).

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

This matters for `starter` (Monaco cursor placement) and `answer` / `expectedOutput` (Python and C grading compare stdout exactly).

### Bilingual content rules

1. **Every prose field needs both `@@key:zh` and `@@key:en`.** Lessons are bilingual end-to-end.
2. **Verbatim HTML.** `intro` / `task` / `hint` use raw HTML (`<p class="lead">`, `<pre><code>`, `<strong>`, `<code>`). Don't switch to Markdown — the parser is verbatim pass-through, not a Markdown renderer.

### Field reference

| Field             | Type            | Where                 | Notes                                            |
|-------------------|-----------------|-----------------------|--------------------------------------------------|
| `id`              | int             | LEARN.lesson 2nd arg + course.js index | Stable identity, used for routing & progress    |
| `section`         | string          | course.js index       | `'main'` (default), `'final'`, or `'stdlib'`     |
| `slug`            | string          | course.js index       | URL-friendly; used in filename                   |
| `title`           | bilingual       | course.js index       |                                                  |
| `chapter`         | bilingual       | course.js index       | Sub-label shown under the lesson title           |
| `chapterRef`      | string          | lesson file           | Optional.<br>· `sql` / `python` / `c-algo`: links to `blog.html#<chapterRef>`<br>· `c` (core syntax): ignored — link is hardcoded to runoob's main C tutorial |
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
| **Python / C**    |                 |                       |                                                  |
| `answer`          | code            | lesson file           | Reference solution (revealed by "Show answer")   |
| `expectedOutput`  | string          | lesson file           | Grader compares stdout (after trim) to this      |
| `testInputs`      | array           | lesson file           | Strings fed to `input()` (Py) / stdin (C) on grade |

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
- **Identical bytes only.** If two lessons differ even by one row, they get separate files. Don't merge for cosmetic reasons — the principle is "the lesson author chose those exact rows on purpose; respect it."
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
- Skulpt is Python 3-ish but not 100%. f-strings, list/dict/set comprehensions, basic stdlib (`math`, `random`, `re`) work; `numpy`, `pandas`, `requests` etc. don't.

### Code editor — Monaco
- Lives at `lib/runtime/monaco/vs/`. Install: download monaco-editor's npm tarball, extract `package/min/vs/` into that path.
- `vs/loader.js` (small AMD loader) is fetched eagerly by `learn.html`. `vs/editor/editor.main` (~3 MB) is loaded lazily by `ensureMonaco()` the first time a lesson or playground opens.
- Editors are created via `createCodeEditor(container, opts)`. Two height modes:
  - `fillParent: true` — the container's height is set by its parent's CSS (used by lesson views with `.editor-pane`); the function calls `ed.layout()` multiple times after creation to recover from initial-render race conditions.
  - default — auto-grow from `minLines` to `maxLines` based on content (Ace-like).
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
  └─ accept {type:'run', id, code, stdin?, mode?} via postMessage
       mode: 'preinput' (default, sync stdin from string) | 'jspi' (real wasm suspend)
       │
       ├─ writeFile /working/main.c → emcc → read /working/main.js
       │  using: emcc -O0 -sSINGLE_FILE=1 -sEXIT_RUNTIME=1 -sFORCE_FILESYSTEM=1
       │  (note: NO -fexceptions — JS-based EH invoke_* trampolines insert
       │   JS frames between wasm frames, and JSPI cannot suspend through them)
       │
       ├─ temporarily patch WebAssembly.instantiate / instantiateStreaming:
       │   · replace fd_write / __syscall_write / __syscall_writev (fd 1/2)
       │     → call onStdout / onStderr directly, BYPASSING emcc's TTY line buffer
       │     (without this `printf("Name? ")` with no '\n' would sit trapped in
       │     emcc's internal line buffer until a newline shows up)
       │   · JSPI mode additionally: wrap fd_read / __syscall_read /
       │     __syscall_readv / __syscall_pread64 (fd 0) with
       │     new WebAssembly.Suspending(asyncFn). asyncFn posts 'input-request'
       │     to the parent and awaits 'input-response'; wasm stack truly parks.
       │   · JSPI also wraps the entry export (__main_argc_argv / _main)
       │     with WebAssembly.promising() — without that the Suspending import
       │     throws "no active suspender".
       │
       ├─ execute main.js via `new Function('Module', code)(Module)`
       │   Module.noInitialRun = useJspi (in JSPI mode we await promisingMain ourselves)
       │   Module.stdin = () => null  ← defensive: prevents emcc's default TTY
       │                                fallback from calling window.prompt()
       │
       ├─ postMessage back {type:'runtime-start', id} — compile done, program about to run.
       │   parent prints a cyan "[compiled — running]" divider on receipt.
       ├─ postMessage back {type:'stdout'|'stderr', id, text} — program output.
       ├─ JSPI mode: postMessage back {type:'input-request', id} when stdin reads.
       │   parent reads a line from the xterm and replies {type:'input-response', id, text}.
       └─ postMessage back {type:'done', id, exitCode, error?} — wrapped up.
```

The whole emception demo branch is **mirrored locally** under `lib/runtime/webC/` (~450 MB, 522 files). This is necessary because:
- Cross-origin Workers are forbidden by browsers (CORS doesn't unlock them)
- Loading from jsDelivr would put `main.bundle.js` cross-origin → its workers fail with `SecurityError`
- Same-origin mirror sidesteps every cross-origin restriction

Cloudflare Pages handles 450 MB easily (25 GB / 20k file limits, **unlimited bandwidth**). The browser only fetches what each program needs — typically **~25–30 MB on first C entry**, cached forever after.

**C-family modal gate**: any course with `family: 'c'` in its manifest entry triggers `gateCFamilyAccess()` (in `learn-core.js`) before render. The modal warns about download size and `file://` incompatibility. Confirmation is sticky in `localStorage['louie-learn:cfamily-loaded']`. To re-prompt: clear that key.

**Compile flags currently used**:
```
emcc -O0 -sSINGLE_FILE=1 -sEXIT_RUNTIME=1 -sFORCE_FILESYSTEM=1 main.c -o main.js
```

- `-sSINGLE_FILE=1` — embed wasm as base64 in JS (one-file output)
- `-sEXIT_RUNTIME=1` — fire `Module.onExit(status)` when main returns (so we know exit code)
- `-sFORCE_FILESYSTEM=1` — wire `/dev/stdin` to `Module.stdin` (without it emcc may strip FS init)

### C runtime — past limitations & current status

1. ~~**No interactive `scanf`/`getchar`**~~ **Resolved.**
   We now use **JSPI** (JavaScript Promise Integration) — `WebAssembly.Suspending(asyncFn)` wraps stdin imports (`fd_read` / `__syscall_read*`), `WebAssembly.promising` wraps the entry export. The wasm stack truly suspends at `scanf`, the parent fetches a line from the xterm terminal via postMessage, and after the user presses Enter wasm resumes. No ASYNCIFY anywhere (we tried that early; emception's particular emscripten build corrupted the ASYNCIFY state machine on first call. JSPI uses the browser's native promise integration and has no relation to ASYNCIFY).
   **Browser requirements**: Chromium 137+ / Safari 26+ / Firefox 144+. Older browsers get a fallback — each C lesson page has a top-right "Pre-input mode (not recommended)" toggle. Default OFF (JSPI); manually ON drains stdin from a textarea synchronously.
   **Grading always uses pre-input mode** regardless of the user's toggle state — auto-tests need deterministic input.

2. ~~**stdout buffering can reorder output around `scanf`**~~ **Resolved.**
   We no longer rely on libc line buffering. `postmsg-bridge.js` swaps out `fd_write` / `__syscall_writev` / `__syscall_write` imports (fd 1/2) at runtime for non-suspending JS functions that pipe bytes straight to `onStdout` / `onStderr`, **completely bypassing emcc's TTY line-buffer pipeline**. `printf("Name? ")` with no `\n` shows up instantly.
   ⇒ Lesson authors no longer need to hack `\n` or `fflush(stdout);` around prompts.

3. **First-time C load is slow on cold cache** (~25–30 MB). Mitigated by:
   - The C-family modal warning users upfront
   - The progress bar in the playground showing real bytes-loaded
   - Browser HTTP cache + Cloudflare edge cache making subsequent loads instant

4. **`file://` users see a "needs HTTPS" message** instead of the playground/lesson. emception's worker construction needs HTTPS or `http://localhost`.

5. **`-fexceptions` cannot be used.** JS-based C++ EH installs `invoke_*` JS trampolines; JSPI cannot suspend through JS frames (throws `SuspendError: trying to suspend JS frames`). So the compile flags deliberately omit `-fexceptions` — libc++ links its no-exceptions variant. If C++ exceptions are ever needed, switch to `-fwasm-exceptions` (wasm-native EH, no JS frames inserted).

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

## Right-pane editor layout

The lesson and playground views share a single right-pane structure (`.editor-pane`). It uses absolute positioning to give Monaco a stable container size — `flex` and `overflow:auto` together caused several initial-render races where Monaco locked to ~10 lines.

```
┌──────────────────────────────────────┐  ← .editor-pane (background: var(--surface))
│  ╭────────────────────────────────╮  │
│  │                                │  │  ← .tab-pane.code-tab.is-active (background: #1e1e1e)
│  │   Monaco editor (.editor-fill) │  │     position: absolute; top: 0; bottom: 50px;
│  │   [reset][hint][answer]        │  │     border-bottom-radius: 14px (Chrome-tab-style merge)
│  │   ← .tab-actions (top-right)   │  │
│  ╰╮                              ╭╯  │
│   │                              │   │
│   │ [Code][Input][Output] ▶ ✓    │   │  ← .editor-foot (height: 50px)
│   │                              │   │     ↑ tabs (left)        ↑ Run/Submit (right)
│   ╰──────────────────────────────╯   │
└──────────────────────────────────────┘
```

Key CSS rules (in `learn.css`, all marked `!important` because they need to defeat the more-specific `body.lesson-mode .lesson-pane { padding; overflow }` rules):

- `.editor-pane` — `padding: 0; position: relative; overflow: hidden; background: var(--surface)`
- `.editor-pane .tab-pane` — `position: absolute; top: 0; left: 0; right: 0; bottom: 50px; background: #1e1e1e; border-bottom-{left,right}-radius: 14px; overflow: hidden`. Hidden by default (`display: none`); active tab gets `display: block`.
- `.editor-pane .editor-fill` — Monaco container, `position: absolute; inset: 0; width: 100%; height: 100%`.
- `.editor-pane .editor-foot` — `position: absolute; bottom: 0; left: 0; right: 0; height: 50px` — bottom action bar.
- `.tab-strip` / `.tab-btn` — Excel-style sheet tabs hanging from the foot's top edge. Active tab uses `background: #1e1e1e` (matching the editor) and `margin-top: -1px` to fuse seamlessly with the editor card above.

Monaco internally renders its own scrollbar / overflow-guard layers that sometimes bypass the parent's `border-radius` clip — `learn.css` adds an explicit `border-bottom-{left,right}-radius` on `.editor-pane .tab-pane.code-tab .monaco-editor` and its `.overflow-guard` to keep both bottom corners clean.

`createCodeEditor(container, { fillParent: true })` is the entry point. It runs `ed.layout({ width, height })` at four points (RAF, +50ms, +200ms, +600ms) to recover from the case where the parent's layout isn't fully resolved at create-time.

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

**SQL grader rules:**

1. **Match `expectedSql` to the task exactly**: if the task says "name and age", `expectedSql` must `SELECT name, age` — not `SELECT *`.
2. **SQLite dialect**: dates are ISO strings (`'YYYY-MM-DD'`); comparison is lexicographic AND chronological for that format. No `RIGHT JOIN` or `FULL OUTER JOIN`.
3. **`checkOrder: false` (default)**: both result sets are sorted before compare. Set `true` only for `ORDER BY` / `LIMIT` lessons.
4. **Hints nudge, don't solve**: "Try `WHERE`" beats giving the answer.
5. **Write the schema first, then the task, then `expectedSql`** — this proves the problem is solvable and the data set is sufficient.

## How to add a new lesson (Python)

1. Pick an `id`.
2. Pick a `slug` (derived from English title, e.g., `for-loop-basics`).
3. Create `learn/learn_data/python/lessons/<NN>-<slug>.js`.
4. Append the index entry to `course.lessons` in `course.js`.
5. No schema work — Python lessons are self-contained.

**Python grader rules:**

1. **`expectedOutput` must match stdout exactly** (after trim). If the task says "print the sum", make sure `answer` produces *only* that, with the right trailing `\n`.
2. **`testInputs` order matches `input()` calls**. Inputs are strings (Python's `input()` returns string).
3. **Sandbox limits**: no file I/O, no network. If a topic needs a file, simulate the content as a string variable.
4. **Skulpt is Python 3-ish but not 100%** — see "Engines / Python" above for what works.

## How to add a new lesson (C)

1. Pick an `id` (next free integer; the `c` core-syntax course is 1–44, `c-algo` is 1–25 — they're independently numbered).
2. Pick a `slug` (`hello-c`, `pointers`, `malloc-free`, …).
3. Decide the section: `'main'` for syntax, `'stdlib'` for `<header.h>` lessons; `c-algo` uses `'main'` for everything.
4. Create `learn/learn_data/<course-slug>/lessons/<NN>-<slug>.js` (course-slug is either `c` or `c-algo`).
5. Append the index entry to `course.lessons` in `course.js`. Bump `lessonsCount` in `manifest.js`.

**C grader rules:**

1. **`expectedOutput` is whitespace-tolerant trim compare** against stdout. Stderr is included so compile errors are visible.
2. **`testInputs` array is joined by newlines and pre-filled into stdin.** Grading **always uses pre-input mode** (even when the user's toggle is in JSPI/live mode) so the test is deterministic.
3. **Prompts do NOT need a trailing `\n`.** The bridge now bypasses emcc's TTY line buffer at runtime, so `printf("Name? ")` shows up immediately. In fact for nicer interactive UX, leave the `\n` off so the cursor stays inline — the resulting graded output is a single line like `Please enter your name: Hello, Alice!`.
4. **Pin RNG / time-dependent output**. `srand(time(NULL))` will fail grading because output varies; use a fixed seed (`srand(42)`) or check only invariants (`time(NULL) > 0`).

## How to add a new course

1. Pick a slug (lowercase, hyphenated). The folder name = the slug.
2. Create `learn/learn_data/<slug>/course.js` registering with `LEARN.course('<slug>', { type: 'sql' | 'python' | 'c', ... })`.
3. Create `lessons/` (and `schemas/` if SQL).
4. Add an entry to `manifest.js`.

A new language type (e.g., JavaScript, Rust) requires runtime work — adding an `ensure<Language>()` engine wrapper in `learn-engines.js`, a grading path in `learn-lesson.js`, and a playground in `learn-views.js`. Match the C course's structure as the reference: it has the most complex runtime gating and is the cleanest example.
