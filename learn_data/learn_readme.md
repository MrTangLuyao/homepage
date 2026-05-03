# learn_readme.md

> Notes for future-me and AI collaborators. This is how `learn.html` is wired together and how to add or extend interactive courses without breaking the sandbox.

---

## Architecture overview

**Zero build step, zero backend, zero `fetch()`.**

- All code runs 100% in the browser — SQL via sql.js (SQLite asm.js).
- All data is loaded via `<script>` tags so the site works when opened as `file://` locally.
- `learn_data/manifest.js` — course index (metadata only).
- `learn_data/<slug>/course.js` — full course content, lazy-injected when the user opens that course.

---

## File layout

```
learn.html                         ← the entire interactive UI (routing, rendering, engines)
learn_data/
├── manifest.js                    ← INDEX ONLY. Sets window.__LEARN_MANIFEST.
└── sql/
    └── course.js                  ← SQL course. Sets window.__LEARN_COURSES['sql'].
lib/
├── sql-asm.js                     ← sql.js engine (SQLite, asm.js build). Loaded eagerly.
├── ace/
│   ├── ace.min.js                 ← Ace code editor. Loaded eagerly.
│   ├── mode-mysql.min.js          ← SQL syntax highlighting.
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

## Engines

### SQL engine — sql.js
- Loaded eagerly on page load via `<script src="lib/sql-asm.js">`.
- `ensureSql()` initialises the engine once and caches it.
- Each lesson or query runs against a **fresh in-memory DB** — previous queries can't bleed state.
- The SQL Playground maintains a **persistent DB** for the session (tables survive between queries). "加载 Demo 表" resets and reloads the full schema. "重置表" resets to empty.

---

## Code editor — Ace

All code editors use **Ace editor** (`lib/ace/`). The three files are loaded eagerly:
- `ace.min.js` — core editor
- `mode-mysql.min.js` — SQL syntax
- `theme-tomorrow_night.min.js` — shared dark theme

Editors are initialised via `ace.edit(div)` with `setUseWorker(false)` (disables background syntax-check workers that would need separate files). The `minLines`/`maxLines` options control auto-height.

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
2. Create `learn_data/<slug>/course.js`. Use the `sql` course as a template. Do NOT set `type`.
3. Define lessons. Keep `setup` SQL small (3–5 rows per table).
4. Add the entry to `learn_data/manifest.js`.

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

