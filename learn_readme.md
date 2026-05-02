# learn_readme.md

> Notes for future-me and AI collaborators. This is how `learn.html` is wired together and how to add a new interactive course without breaking the sandbox.

---

## Why the architecture looks like this

Same as the blog: **zero build step, zero backend, zero `fetch()`**.

The platform uses **sql.js** (an asm.js port of SQLite) to run a real database entirely in the browser's memory. To keep the site functional when opened via `file://` (local preview), all data is loaded via `<script>` tags:

- `learn_data/manifest.js` — the **index** of available courses. Metadata only.
- `learn_data/<slug>/course.js` — the **entire course content**. All lessons, setup SQL, and validation rules for one course.

When a user selects a course, `learn.html` dynamically injects the matching `<script>` tag.

---

## File layout

```
learn.html                         ← the interactive learning UI
learn_data/
├── manifest.js                    ← INDEX ONLY. Sets window.__LEARN_MANIFEST.
├── <slug>/                        ← one folder per course
│   └── course.js                  ← THE ENTIRE COURSE. Sets window.__LEARN_COURSES['<slug>'].
└── (more course folders…)
lib/
├── sql-asm.js                     ← sql.js engine (asm.js build)
└── codemirror/                    ← Code editor components
learn_readme.md                    ← this file
```

---

## manifest.js schema (index only)

`learn_data/manifest.js` sets `window.__LEARN_MANIFEST` to:

```js
window.__LEARN_MANIFEST = {
  version: 1,
  updated: 'YYYY-MM-DD',
  courses: [
    {
      slug: 'sql',                 // REQUIRED. Matches folder name and course key.
      icon: 'SQL',                 // String/Logo shown on the card.
      title: { zh: '...', en: '...' },
      desc:  { zh: '...', en: '...' },
      level: { zh: '入门', en: 'Beginner' },
      lessonsCount: 42,
      coming: false                // true = shows "Coming Soon" badge, unclickable.
    }
  ]
};
```

---

## course.js schema (the content)

Each course file registers itself into a global registry:

```js
(window.__LEARN_COURSES = window.__LEARN_COURSES || {})['<slug>'] = {
  slug: '...',
  title: { zh: '...', en: '...' },
  desc:  { zh: '...', en: '...' },
  lessons: [
    {
      id: 1,                       // Lesson number.
      slug: 'select-basics',       // URL segment.
      title: { zh: '...', en: '...' },
      chapter: { zh: '...', en: '...' },
      chapterRef: 'slug',          // OPTIONAL. Links back to a blog post slug.
      difficulty: { zh: '...', en: '...' },
      intro: { zh: 'HTML...', en: 'HTML...' }, // The teaching content (prose).
      tables: ['students'],        // Names of tables to display in the UI.
      setup: `CREATE TABLE...`,    // SQL to build the level's DB state.
      task: { zh: '...', en: '...' }, // The goal for the user.
      hint: { zh: '...', en: '...' }, // Shown if user gets stuck.
      starter: { zh: '--...', en: '--...' }, // Initial code in the editor.
      expectedSql: 'SELECT...',    // Reference solution for validation.
      checkOrder: false            // true = row order must match expected exactly.
    }
  ]
};
```

---

## How to add a new course

1. **Pick a slug** — lowercase, hyphenated (`python-basics`, `css-flexbox`).
2. **Create the folder**: `learn_data/<slug>/`.
3. **Create `course.js`**: Use the `sql` course as a template.
4. **Define your lessons**:
   - Each lesson is a fresh start. The `setup` SQL runs in a new in-memory DB every time the lesson loads or "Run" is clicked.
   - Use standard SQLite syntax.
5. **Update the manifest**: Add the entry to `learn_data/manifest.js`.

---

## Lesson conventions

### Intro Prose
Use the same elements as the blog reader:
- `<p class="lead">` for the first paragraph.
- `<code>` for inline syntax.
- `<pre><code>` for block examples.
- `<ul>` / `<li>` for lists.

### Setup SQL
- Keep the database small. 3–5 rows per table is usually enough to teach the concept.
- Ensure the data is clean and illustrates the edge cases (e.g. include a `NULL` value if the lesson is about `IS NULL`).

### Validation (`expectedSql` vs `checkOrder`)
- The grader runs the user's SQL and the `expectedSql` on the same database.
- It compares the resulting **columns** and **values**.
- If `checkOrder: false` (default), the grader sorts both results before comparing.
- If `checkOrder: true`, the user must provide the exact same row order (use this for `ORDER BY` and `LIMIT` lessons).

---

## IF you are an AI

You are a teacher here. Your goal is to make the user feel smart, not frustrated.

1. **Incremental difficulty.** Don't jump from `SELECT` to `JOIN` in three levels.
2. **Real-world-ish data.** Use tables like `employees`, `orders`, `books`, `students`. Avoid `tableA`, `col1`.
3. **Bilingual by default.** Every string (`title`, `task`, `intro`) MUST have both `zh` and `en` keys.
4. **SQLite Specifics.** Remember this runs on SQLite. Date comparisons are string-based (`'YYYY-MM-DD'`). No `RIGHT JOIN` or `FULL OUTER JOIN` — explain how to achieve them with `LEFT JOIN` and `UNION` if necessary.
5. **The Grader is Strict.** The `expectedSql` is the golden standard. Ensure your `task` description perfectly matches what the `expectedSql` returns. If you ask for "name and age", the `expectedSql` must be `SELECT name, age...`, not `SELECT *`.
6. **Hints should nudge, not tell.** "Try using the WHERE clause" is better than giving the full solution immediately.

### When creating a course:
- First, define the **Schema Strategy**. Will every lesson use different tables, or will they share a large schema (like the `sql` course's "Final Challenges")? Shared schemas are great for "capstone" projects.
- Write the `setup` SQL first, then the `task`, then the `expectedSql`. This ensures the problem is actually solvable.

