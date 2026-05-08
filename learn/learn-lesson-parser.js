/* ============================================================
 * learn/learn-lesson-parser.js
 * Defines the LEARN global (course/lesson/schema registrars) and
 * the @@key text-format parser used by the lazy-loading lesson layout.
 *
 *   window.LEARN
 *     .course(slug, meta)        — register course metadata + lazy index
 *                                  (called by course.js)
 *     .lesson(slug, id, raw)     — register one raw lesson text under its id
 *                                  (called by lessons/*.js)
 *     .schema(fullName, sql)     — register a named SQL schema
 *                                  (called by schemas/*.js)
 *
 *   parseLessonRaw(raw)          — parse @@key blocks → [{key, value}]
 *   assembleLesson(blocks, slug) — turn block list into {intro, task, ...}
 *   resolveSchema(lesson, slug)  — copy LEARN._schemas[<slug>:<name>] into
 *                                  lesson.setup
 *   assembleOneLesson(slug, id)  — convenience: parse + assemble + resolve
 *                                  for the single lesson `id`
 *   renderField(text)            — minimal HTML pass-through (Phase 1: no
 *                                  markdown transform — migrated lessons
 *                                  keep their HTML).
 *
 * @@key syntax
 *   "@@key value..."        — single-line scalar (value is rest of line)
 *   "@@key" then lines...   — multi-line scalar (until next "@@" line at col 0)
 *   "@@key:zh" / "@@key:en" — bilingual variant (assembled into {zh, en})
 *
 * Rationale for @@ over @: single-@ collides with Python decorators
 * (@property, @app.route) and other languages' annotations when they appear
 * at column 0 inside a code example. @@ is unique to our format.
 * ============================================================ */

window.LEARN = window.LEARN || {
  _schemas:    {},   // 'sql:c1_schema' → SQL string
  _lessonsRaw: {},   // courseSlug → { id → rawText }

  schema(fullName, sql) {
    this._schemas[fullName] = sql;
  },

  // 3-arg form: id is explicit, set by the lesson file. Index in course.js
  // also has the id; loadLesson cross-checks them on use.
  lesson(courseSlug, id, raw) {
    const bucket = (this._lessonsRaw[courseSlug] = this._lessonsRaw[courseSlug] || {});
    bucket[id] = raw;
  },

  course(courseSlug, meta) {
    // meta.lessons is the lesson INDEX (id, section, slug, title, chapter,
    // file). Each entry stays as index until loadLesson() lazily fills in
    // its content (intro, task, hint, setup, ...) via the lesson .js file.
    (window.__LEARN_COURSES = window.__LEARN_COURSES || {})[courseSlug] = { ...meta };
  },
};

/* ─── Field-type tables ─── */
const _INT_FIELDS    = new Set(['id']);
const _BOOL_FIELDS   = new Set(['checkOrder']);
const _ARRAY_FIELDS  = new Set(['tables', 'testInputs']);
// Bilingual: detected by ':zh' / ':en' suffix in the source @@key
// Long-form fields would get markdown processing; Phase 1 passes HTML through.
const _MARKDOWN_FIELDS = new Set(['intro', 'task', 'hint', 'warning']);

/* ─── Block parser ─── */
function parseLessonRaw(raw) {
  const lines = String(raw).split('\n');
  const blocks = [];
  let curKey = null;
  let curBuf = [];

  function flush() {
    if (curKey !== null) {
      blocks.push({ key: curKey, value: curBuf.join('\n') });
    }
    curKey = null;
    curBuf = [];
  }

  // Match "@@key" at column 0, key chars: letters, digits, underscore, colon, dash.
  // Optional inline value after whitespace.
  const KEY_RE = /^@@([A-Za-z0-9_:\-]+)(?:[ \t]+(.*))?$/;

  for (const line of lines) {
    const m = line.match(KEY_RE);
    if (m) {
      flush();
      const key = m[1];
      const inline = m[2];
      if (inline !== undefined && inline.trim().length > 0) {
        // Single-line scalar — commit immediately
        blocks.push({ key, value: inline.trim() });
      } else {
        // Multi-line — start collecting until next @@key
        curKey = key;
        curBuf = [];
      }
    } else if (curKey !== null) {
      curBuf.push(line);
    }
    // else: line before any @@key — drop (likely whitespace)
  }
  flush();

  // Trim only LEADING blank lines (a leftover from "@@key\n\nvalue" with an
  // accidental gap). DO NOT trim trailing newlines — a value ending in '\n'
  // (e.g., starter code with a clean cursor line) is intentional and the
  // source convention is "blank line before the next @@key" to encode it.
  for (const b of blocks) {
    if (b.value.indexOf('\n') !== -1) {
      b.value = b.value.replace(/^\n+/, '');
    }
  }
  return blocks;
}

/* ─── Renderer ─── */
// Phase 1: pass-through, verbatim. Migrated lessons hold raw HTML (matching
// the strings today's course.js stores directly); we MUST NOT mangle them.
// In particular, do not trim — fields like `starter` rely on a trailing '\n'
// for cursor placement. A future phase can add real markdown rendering here
// for new lessons that opt in (e.g., via a leading "@@format markdown").
function renderField(text) {
  return String(text);
}

/* ─── Block list → lesson content object ─── */
function assembleLesson(blocks, courseSlug) {
  const lesson = {};
  for (const { key, value } of blocks) {
    const colonIdx = key.indexOf(':');

    if (colonIdx > 0) {
      // Bilingual field
      const baseKey = key.slice(0, colonIdx);
      const lang    = key.slice(colonIdx + 1);
      if (lang !== 'zh' && lang !== 'en') {
        console.warn(`[learn] Unknown lang "${lang}" in @@${key} (course ${courseSlug})`);
        continue;
      }
      lesson[baseKey] = lesson[baseKey] || {};
      // Verbatim — no trimming. Fields like `starter` rely on a trailing '\n'
      // (cursor placement). HTML prose (intro/task/hint) has no surrounding
      // whitespace by convention so the no-trim is a no-op for those.
      lesson[baseKey][lang] = _MARKDOWN_FIELDS.has(baseKey)
        ? renderField(value)
        : String(value);
      continue;
    }

    if (_INT_FIELDS.has(key)) {
      lesson[key] = parseInt(value, 10);
    } else if (_BOOL_FIELDS.has(key)) {
      const v = String(value).trim().toLowerCase();
      lesson[key] = (v === 'true' || v === '1' || v === 'yes');
    } else if (_ARRAY_FIELDS.has(key)) {
      // testInputs: one input per line (preserves whitespace in each).
      // Other arrays: comma- or space-separated tokens.
      if (key === 'testInputs') {
        lesson[key] = String(value).split('\n');
        while (lesson[key].length > 0 && lesson[key][lesson[key].length - 1] === '') {
          lesson[key].pop();
        }
      } else {
        lesson[key] = String(value)
          .split(/[,\s]+/)
          .map(s => s.trim())
          .filter(s => s.length > 0);
      }
    } else {
      // Plain string field. Preserve as-is so multi-line SQL keeps its formatting.
      lesson[key] = String(value);
    }
  }
  return lesson;
}

/* ─── Schema reference resolution ─── */
function resolveSchema(lesson, courseSlug) {
  if (typeof lesson.schema === 'string' && lesson.schema.length > 0) {
    const fullName = `${courseSlug}:${lesson.schema}`;
    const sql = window.LEARN._schemas[fullName];
    if (sql == null) {
      console.error(`[learn] Schema not found: "${fullName}" (lesson id ${lesson.id})`);
      lesson.setup = `-- ERROR: schema "${lesson.schema}" not found in course "${courseSlug}"`;
    } else {
      lesson.setup = sql;
    }
  }
  return lesson;
}

/* ─── Single-lesson assembly (used by loadLesson) ─── */
// Schemas must already be loaded into LEARN._schemas before calling this.
function assembleOneLesson(courseSlug, id) {
  const raw = ((window.LEARN._lessonsRaw || {})[courseSlug] || {})[id];
  if (raw == null) {
    throw new Error(`Lesson ${id} not registered for course "${courseSlug}"`);
  }
  const blocks  = parseLessonRaw(raw);
  const content = assembleLesson(blocks, courseSlug);
  return resolveSchema(content, courseSlug);
}
