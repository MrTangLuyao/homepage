# learn_readme.md

> Notes for future-me and AI collaborators. This is how `learn.html` is wired together and how to add or extend interactive courses without breaking the sandbox.

---

## Architecture overview

**Zero build step, zero backend, zero `fetch()`.**

- All code runs 100% in the browser — SQL via sql.js (SQLite asm.js).
- All data is loaded via `<script>` tags so the site works when opened as `file://` locally.
- `learn/learn_data/manifest.js` — course index (metadata only).
- `learn/learn_data/<slug>/course.js` — full course content, lazy-injected when the user opens that course.

---

## File layout

```
learn.html                         ← the entire interactive UI (routing, rendering, engines)
learn/
└── learn_data/
    ├── manifest.js                ← INDEX ONLY. Sets window.__LEARN_MANIFEST.
    └── sql/
        └── course.js              ← SQL course. Sets window.__LEARN_COURSES['sql'].
lib/
├── design/                        ← visual assets (fonts, M3 tokens, shared CSS)
├── resources/                     ← static images (po.webp, etc.)
└── runtime/
    ├── sql-asm.js                 ← sql.js engine (SQLite, asm.js build). Loaded eagerly.
    ├── webPython/                 ← Skulpt Python interpreter (lazy-loaded).
    ├── luxon.min.js               ← date library (used by blog/95).
    └── monaco/
        └── vs/                    ← Monaco editor (~3MB). Drop the contents of
                                     monaco-editor's `min/vs/` directory here.
                                     loader.js is fetched eagerly by learn.html;
                                     editor.main is lazy-loaded by ensureMonaco().
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

## Engines

### SQL engine — sql.js
- Loaded eagerly on page load via `<script src="lib/runtime/sql-asm.js">`.
- `ensureSql()` initialises the engine once and caches it.
- Each lesson or query runs against a **fresh in-memory DB** — previous queries can't bleed state.
- The SQL Playground maintains a **persistent DB** for the session (tables survive between queries). "加载 Demo 表" resets and reloads the full schema. "重置表" resets to empty.

---

## Code editor — Ace

All code editors use **Monaco editor** (the editor that powers VS Code). It lives at `lib/runtime/monaco/vs/`. To install: download monaco-editor's npm tarball, extract `package/min/vs/` into that path.

Loading is split into two phases for fast first-paint:
- `lib/runtime/monaco/vs/loader.js` is fetched eagerly by `learn.html` (small AMD loader, ~10 KB)
- `vs/editor/editor.main` (~3 MB) is loaded lazily by `ensureMonaco()` in `learn-engines.js` the first time a lesson or playground is opened

Editors are created via `createCodeEditor(container, { language, value, minLines, maxLines, tabSize, wordWrap })` — a wrapper in `learn-engines.js` that:
- Uses Monaco's stock `vs-dark` theme (no custom palette — colors are intentionally left at Monaco's defaults)
- Auto-grows container height to fit content within `minLines..maxLines` (mimics the auto-grow behaviour Ace had)
- Disables minimap, sets JetBrains Mono, and routes Monaco's worker requests to an empty data URL so language services run on the main thread (required for `file://` compatibility)

---

## Playground system

Any course can have a playground (free-form editor, no grading) by setting `hasPlayground: true`. The entry row appears at the top of the lesson list with a pencil icon.

### SQL playground extras
- Left pane shows a live DB schema (all tables in the current session DB).
- "加载 Demo 表" button: resets the DB and loads `course.playgroundSetup` SQL.
- "重置表" button: resets to empty DB.
- Each Run re-uses the same DB instance (tables persist between queries).

---

## How to add a new SQL course

1. Pick a slug (lowercase, hyphenated: `python-basics`, `css-flexbox`).
2. Create `learn/learn_data/<slug>/course.js`. Use the `sql` course as a template. Do NOT set `type`.
3. Define lessons. Keep `setup` SQL small (3–5 rows per table).
4. Add the entry to `learn/learn_data/manifest.js`.

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

