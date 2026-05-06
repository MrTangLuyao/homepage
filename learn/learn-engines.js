/* ============================================================
 * learn/learn-engines.js
 * Code-execution engines + result-rendering helpers for learn.html.
 *
 *   Python (Skulpt, lazy-loaded on demand)
 *     ensurePython()  — load lib/runtime/webPython/skulpt(.min|-stdlib).js
 *
 *   Monaco editor (lazy-loaded on demand, ~3MB)
 *     ensureMonaco()                   — load vs/editor/editor.main
 *     createCodeEditor(container, opts) — wrapper over monaco.editor.create
 *                                        with project defaults + auto-grow
 *                                        height (mimics Ace's minLines/maxLines).
 *                                        Uses Monaco's stock 'vs-dark' theme.
 *     disposeAllEditors()              — release every editor created by
 *                                        createCodeEditor(). Called from
 *                                        route() on every view transition
 *                                        to prevent memory leaks (Monaco
 *                                        does NOT auto-clean up when its
 *                                        DOM node is removed).
 *
 *   SQL (sql.js / SQLite asm.js, eager init at module load)
 *     ensureSql()         — initialise SQL = await initSqlJs()
 *     freshDb()           — new SQL.Database()
 *     execToRows(db, sql) — exec + reshape last result-set into [{col: val}]
 *     runSetup(db, sql)   — exec setup SQL (no-op on empty input)
 *     runSingleSelect(db, sql)
 *     compareRows(actual, expected, checkOrder)
 *                         — returns { ok, code?: 'rows'|'cols'|'data', got?, want? }
 *
 *   Result-rendering helpers (used by views + lesson runners)
 *     renderSchemaPreview(db, tables)
 *     renderResultTable(rows, compact)
 *     formatCell(v)
 *     escapeHtml(s)
 *
 * Cross-file references:
 *   - renderResultTable() calls tt() (learn-i18n.js). Safe — only
 *     invoked at render time.
 * ============================================================ */

/* ─── Python engine (Skulpt) ─── */
let _pythonReady = null;
function ensurePython() {
  if (typeof Sk !== 'undefined') return Promise.resolve();
  if (_pythonReady) return _pythonReady;
  _pythonReady = new Promise((resolve, reject) => {
    const s1 = document.createElement('script');
    s1.src = 'lib/runtime/webPython/skulpt.min.js';
    s1.onload = () => {
      const s2 = document.createElement('script');
      s2.src = 'lib/runtime/webPython/skulpt-stdlib.js';
      s2.onload = resolve;
      s2.onerror = () => reject(new Error('Failed to load skulpt-stdlib.js'));
      document.head.appendChild(s2);
    };
    s1.onerror = () => reject(new Error('Failed to load skulpt.min.js'));
    document.head.appendChild(s1);
  });
  return _pythonReady;
}

/* ─── Monaco editor (lazy-loaded, ~3MB) ─── */
//
// Monaco ships with its own AMD loader. The pattern:
//   1. lib/runtime/monaco/vs/loader.js is loaded by learn.html (defines window.require)
//   2. ensureMonaco() configures vs path + loads the main editor module
//   3. createCodeEditor() wraps monaco.editor.create() with our defaults +
//      auto-grow height (mimics Ace's minLines/maxLines)
//
// On file:// the worker thread can't always load — we route Monaco's worker
// requests to an empty data: URL, which makes Monaco fall back to running its
// language services on the main thread. SQL + Python tokenizers (Monarch)
// run fine that way; only intelliSense for languages like TypeScript would
// suffer, and we don't use those.
let _monacoReady = null;
function ensureMonaco() {
  if (typeof monaco !== 'undefined') return Promise.resolve();
  if (_monacoReady) return _monacoReady;
  _monacoReady = new Promise((resolve, reject) => {
    if (typeof window.require !== 'function' || typeof window.require.config !== 'function') {
      reject(new Error('Monaco AMD loader not present — expected lib/runtime/monaco/vs/loader.js to load before learn-engines.js'));
      return;
    }
    window.MonacoEnvironment = {
      // Empty worker: Monaco still creates a Worker but it does nothing,
      // so language services degrade gracefully to the main thread.
      getWorkerUrl: () => 'data:text/javascript;charset=utf-8,'
    };
    window.require.config({ paths: { vs: 'lib/runtime/monaco/vs' } });
    window.require(['vs/editor/editor.main'], resolve, reject);
  });
  return _monacoReady;
}

// Every editor returned by createCodeEditor() is tracked here so we can
// .dispose() them all on view transitions. Monaco editors hold a lot of
// internal state (ResizeObservers, language services, models) — without
// disposal, navigating between many lessons accumulates them and eventually
// chokes the event loop, leaving renders stuck on "Loading…".
const _activeEditors = [];
function disposeAllEditors() {
  const eds = _activeEditors.splice(0);
  for (const ed of eds) {
    try { ed.dispose(); } catch (e) { /* ignore */ }
  }
}

/**
 * Create a Monaco editor inside `container` with our defaults.
 * Returns the monaco editor instance directly (not an Ace-style wrapper).
 *
 * `container` should have a width set by its parent; height is auto-grown
 * from minLines..maxLines like Ace did.
 *
 * Caller is responsible for: ensureMonaco() awaited beforehand.
 * The router calls disposeAllEditors() before each view transition.
 */
function createCodeEditor(container, opts = {}) {
  const lineHeight = 22;
  const minLines = opts.minLines || 10;
  const maxLines = opts.maxLines || 30;

  const ed = monaco.editor.create(container, {
    value:                 opts.value || '',
    language:              opts.language || 'plaintext',
    theme:                 'vs-dark',
    automaticLayout:       true,
    minimap:               { enabled: false },
    fontFamily:            "'JetBrains Mono', monospace",
    fontSize:              13,
    lineHeight,
    tabSize:               opts.tabSize || 2,
    insertSpaces:          true,
    wordWrap:              opts.wordWrap || 'on',
    scrollBeyondLastLine:  false,
    autoClosingBrackets:   'always',
    autoClosingQuotes:     'always',
    renderLineHighlight:   'line',
    overviewRulerLanes:    0,
    overviewRulerBorder:   false,
    scrollbar: {
      vertical:               'auto',
      horizontal:             'auto',
      verticalScrollbarSize:  6,
      horizontalScrollbarSize:6,
    },
    padding: { top: 8, bottom: 8 },
    fixedOverflowWidgets:   true,
  });
  _activeEditors.push(ed);

  const updateHeight = () => {
    const lines = Math.max(1, ed.getModel()?.getLineCount() || 1);
    const visible = Math.min(maxLines, Math.max(minLines, lines));
    container.style.height = (visible * lineHeight + 16) + 'px'; // +16 = top/bottom padding
    ed.layout();
  };
  ed.onDidContentSizeChange(updateHeight);
  updateHeight();

  return ed;
}

/* ─── SQL engine (sql.js / SQLite) ─── */
let SQL = null;
let _sqlReady = null;
function ensureSql() {
  if (SQL) return Promise.resolve(SQL);
  if (_sqlReady) return _sqlReady;
  _sqlReady = (typeof initSqlJs === 'function' ? initSqlJs() : Promise.reject(new Error('sql.js not loaded')))
    .then(s => { SQL = s; return s; });
  return _sqlReady;
}
ensureSql().catch(e => console.error('sql.js init failed:', e));

function freshDb() {
  if (!SQL) throw new Error('SQL engine not ready');
  return new SQL.Database();
}

function execToRows(db, sql) {
  const out = db.exec(sql);
  if (!out || out.length === 0) return [];
  const last = out[out.length - 1];
  const cols = last.columns;
  return last.values.map(v => {
    const row = {};
    for (let i = 0; i < cols.length; i++) row[cols[i]] = v[i];
    return row;
  });
}
function runSetup(db, sqlText) {
  if (!sqlText || !sqlText.trim()) return;
  db.exec(sqlText);
}
function runSingleSelect(db, sql) {
  return execToRows(db, sql);
}

function compareRows(actual, expected, checkOrder) {
  if (!Array.isArray(actual)) actual = [];
  if (!Array.isArray(expected)) expected = [];
  if (actual.length !== expected.length) {
    return { ok: false, code: 'rows', got: actual.length, want: expected.length };
  }
  function normalizeCell(v) {
    if (v == null) return 'NULL';
    if (typeof v === 'number') {
      if (Number.isInteger(v)) return String(v);
      return v.toFixed(6).replace(/\.?0+$/, '');
    }
    return String(v);
  }
  const expectedCols = expected.length > 0 ? Object.keys(expected[0]) : [];
  const actualCols   = actual.length   > 0 ? Object.keys(actual[0])   : [];
  if (expected.length === 0 && actual.length === 0) return { ok: true };
  if (expectedCols.length !== actualCols.length) return { ok: false, code: 'cols' };

  function rowToTuple(row, cols) { return cols.map(c => normalizeCell(row[c])); }
  const actualTuples   = actual.map(r => rowToTuple(r, actualCols));
  const expectedTuples = expected.map(r => rowToTuple(r, expectedCols));

  if (checkOrder) {
    for (let i = 0; i < expectedTuples.length; i++) {
      for (let j = 0; j < expectedCols.length; j++) {
        if (actualTuples[i][j] !== expectedTuples[i][j]) return { ok: false, code: 'data' };
      }
    }
    return { ok: true };
  } else {
    const sortKey = (t) => t.join('');
    const a = actualTuples.map(sortKey).sort();
    const e = expectedTuples.map(sortKey).sort();
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== e[i]) return { ok: false, code: 'data' };
    }
    return { ok: true };
  }
}

/* ─── Result rendering helpers ─── */
function renderSchemaPreview(db, tables) {
  if (!tables || tables.length === 0) return '';
  let html = '';
  for (const tname of tables) {
    try {
      const rows = execToRows(db, `SELECT * FROM ${tname}`);
      html += `<div class="data-table-name">${tname}</div>`;
      html += renderResultTable(rows, true);
    } catch (e) {
      html += `<div class="data-table-name">${tname}</div><div class="result-empty">(could not preview: ${e.message})</div>`;
    }
  }
  return html;
}

function renderResultTable(rows, compact) {
  if (!Array.isArray(rows) || rows.length === 0) {
    return `<div class="result-empty">${tt('result-empty')}</div>`;
  }
  const cols = Object.keys(rows[0]);
  const head = cols.map(c => `<th>${escapeHtml(c)}</th>`).join('');
  const body = rows.map(r =>
    '<tr>' + cols.map(c => `<td>${formatCell(r[c])}</td>`).join('') + '</tr>'
  ).join('');
  return `<table class="data-table">
    <thead><tr>${head}</tr></thead>
    <tbody>${body}</tbody>
  </table>`;
}
function formatCell(v) {
  if (v == null) return '<span style="color:var(--muted); font-style:italic;">NULL</span>';
  if (typeof v === 'number' && !Number.isInteger(v)) {
    return escapeHtml(Number(v.toFixed(6)).toString());
  }
  return escapeHtml(String(v));
}
function escapeHtml(s) {
  return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
