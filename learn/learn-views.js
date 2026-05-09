/* ============================================================
 * learn/learn-views.js
 * Listing + playground render functions for learn.html.
 *
 *   renderCourseList()              — top-level course grid
 *   renderCourse(slug)              — lessons list for one course
 *   renderPlayground(courseSlug)    — free-form SQL playground (no grading)
 *   renderPythonPlayground(courseSlug)
 *                                   — free-form Python REPL (no grading)
 *
 * Cross-file dependencies (all loaded earlier in learn.html):
 *   tt, pickLang, currentLang        ← learn-i18n.js
 *   manifest, loadCourse,
 *   loadProgress, promptResetCourse,
 *   bindFadeIn, bindRipples          ← learn-core.js
 *   ensureSql, ensurePython,
 *   ensureMonaco, createCodeEditor,
 *   freshDb, runSetup, runSingleSelect,
 *   execToRows, renderSchemaPreview,
 *   renderResultTable, escapeHtml    ← learn-engines.js
 *
 * Lesson-runner views (renderLesson, renderPythonLesson) live in
 * learn-lesson.js because they're tightly coupled with grading.
 * ============================================================ */

/* ─── Course list view ─── */
function renderCourseList() {
  const wrap = document.getElementById('course-list');
  const courses = manifest.courses || [];
  if (courses.length === 0) {
    wrap.innerHTML = `<div class="not-found"><p>${tt('coming-soon')}</p></div>`;
    return;
  }
  wrap.innerHTML = courses.map(c => {
    const isComing = c.coming === true;
    const lessonsLabel = c.lessonsCount ? `${c.lessonsCount} ${tt('lessons-count')}` : '';
    const href = isComing ? '#' : `#${c.slug}`;
    const resetBtn = isComing ? '' : `
      <button class="reset-btn ripple-surface js-reset-btn" data-slug="${c.slug}" type="button" title="${tt('reset-progress')}" aria-label="${tt('reset-progress')}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>
      </button>`;
    return `
      <a class="course-card ripple-surface fade-in${isComing ? ' course-card-coming' : ''}" href="${href}" style="position: relative;">
        ${resetBtn}
        <div class="course-card-icon">${pickLang(c.icon) || ''}</div>
        <div class="course-card-title">${pickLang(c.title)}</div>
        <div class="course-card-desc">${pickLang(c.desc)}</div>
        <div class="course-card-meta">
          ${lessonsLabel ? `<span class="course-card-pill">${lessonsLabel}</span>` : ''}
          ${c.level ? `<span class="course-card-pill">${pickLang(c.level)}</span>` : ''}
          ${isComing ? `<span class="course-card-pill">${tt('coming-soon')}</span>` : ''}
        </div>
      </a>
    `;
  }).join('');
  wrap.querySelectorAll('.js-reset-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      const slug = btn.dataset.slug;
      const course = courses.find(x => x.slug === slug);
      promptResetCourse(slug, pickLang(course ? course.title : slug));
    });
  });
  bindFadeIn();
  bindRipples();
}

/* ─── Course (lesson list) view ─── */
async function renderCourse(slug) {
  const wrap = document.getElementById('course-content');
  let course;
  try {
    course = await loadCourse(slug);
  } catch (e) {
    wrap.innerHTML = `<div class="not-found"><h2>${tt('err-course-load')}</h2><p>${tt('not-found-desc')}</p><p style="margin-top:18px;"><a class="course-back" href="#">→ ${tt('not-found-back')}</a></p></div>`;
    return;
  }
  const lessons = course.lessons || [];
  const prog = loadProgress(slug);
  const doneCount = lessons.filter(l => prog[l.id]).length;
  const pct = lessons.length ? Math.round((doneCount / lessons.length) * 100) : 0;

  const sections = {};
  const sectionOrder = [];
  for (const l of lessons) {
    const sec = l.section || 'main';
    if (!(sec in sections)) { sections[sec] = []; sectionOrder.push(sec); }
    sections[sec].push(l);
  }
  const sectionLabel = (sec) => {
    if (sec === 'final') return tt('final-section');
    if (sec === 'main') return tt('lesson-section');
    if (sec === 'stdlib') return tt('stdlib-section');
    return sec;
  };

  const sectionsHtml = sectionOrder.map(sec => {
    const rows = sections[sec].map(l => {
      const isDone = !!prog[l.id];
      return `
        <a class="lesson-row ripple-surface${isDone ? ' is-done' : ''}" href="#${slug}/${l.id}">
          <span class="lesson-row-num">${String(l.id).padStart(2, '0')}</span>
          <div>
            <div class="lesson-row-title">${pickLang(l.title)}</div>
            ${l.chapter ? `<div class="lesson-row-sub">${pickLang(l.chapter)}</div>` : ''}
          </div>
          <span class="lesson-row-status">${isDone
            ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="9 12 11 14 15 10"></polyline></svg>'
            : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>'
          }</span>
        </a>
      `;
    }).join('');
    return `<div class="lesson-section-label">${sectionLabel(sec)}</div>${rows}`;
  }).join('');

  wrap.innerHTML = `
    <div class="fade-in">
      <div class="course-header">
        <h1 class="course-header-title">${pickLang(course.title)}</h1>
        <p class="course-header-sub">${pickLang(course.desc)}</p>
        <div class="course-progress">
          <span>${tt('progress-label')}</span>
          <div class="progress-bar"><div class="progress-bar-inner" style="width:${pct}%"></div></div>
          <span style="font-variant-numeric: tabular-nums; color: var(--accent); font-weight: 700;">${doneCount} / ${lessons.length}</span>
          <button class="reset-btn reset-btn-inline ripple-surface js-reset-course-detail" type="button" title="${tt('reset-progress')}" aria-label="${tt('reset-progress')}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>
            <span>${tt('reset-progress')}</span>
          </button>
        </div>
      </div>
      <div class="lesson-list">
        ${course.hasPlayground ? `
        <a class="lesson-row ripple-surface" href="#${slug}/playground">
          <span class="lesson-row-num" style="color:var(--accent); display:inline-flex; align-items:center; justify-content:center;"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg></span>
          <div>
            <div class="lesson-row-title">${course.playgroundTitle ? pickLang(course.playgroundTitle) : tt('playground-label')}</div>
          </div>
          <span class="lesson-row-status"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></span>
        </a>
        ` : ''}
        ${sectionsHtml}
      </div>
    </div>
  `;
  const detailBtn = wrap.querySelector('.js-reset-course-detail');
  if (detailBtn) {
    detailBtn.addEventListener('click', () => {
      promptResetCourse(course.slug, pickLang(course.title));
    });
  }
  requestAnimationFrame(() => {
    const wr = wrap.querySelector('.fade-in');
    if (wr) wr.classList.add('visible');
  });
  bindRipples();
}

/* ─── SQL Playground view ─── */
async function renderPlayground(courseSlug) {
  const wrap = document.getElementById('lesson-content');
  wrap.innerHTML = loadingHtml(currentLang === 'zh' ? '加载中…' : 'Loading…');
  const navBar = document.getElementById('lesson-nav-bar');
  if (navBar) navBar.innerHTML = '';  // playground has no prev/next

  let course;
  try {
    course = await loadCourse(courseSlug);
  } catch(e) {
    wrap.innerHTML = `<div class="not-found"><h2>${tt('err-course-load')}</h2><p>${tt('not-found-desc')}</p><pre style="margin-top:14px;color:var(--err);font-size:12px;">${escapeHtml(String(e.message || e))}</pre></div>`;
    return;
  }
  try {
    await Promise.all([ensureSql(), ensureMonaco()]);
  } catch(e) {
    wrap.innerHTML = `<div class="not-found"><h2>${tt('err-engine-sql')}</h2><p>${tt('not-found-desc')}</p><pre style="margin-top:14px;color:var(--err);font-size:12px;">${escapeHtml(String(e.message || e))}</pre></div>`;
    return;
  }

  let playgroundDb = freshDb();

  wrap.innerHTML = `
    <div class="lesson-pane lesson-pane-left fade-in">
      <div class="lesson-meta-row">
        <span class="lesson-pill">${pickLang(course.title)}</span>
      </div>
      <div class="lesson-title-row">
        <h1 class="lesson-title">${tt('playground-label')}</h1>
      </div>
      <p style="color:var(--muted); font-size:14px; line-height:1.8; margin-bottom:18px;">${currentLang === 'zh'
        ? '自由编写 SQL。可 CREATE TABLE、INSERT、SELECT — 无任务、无判题。'
        : 'Free-form SQL. CREATE TABLE, INSERT, SELECT — no task, no grading.'
      }</p>
      <div class="pg-action-bar">
        <button class="editor-mini-btn" id="pg-load-demo">${tt('playground-load-demo')}</button>
        <button class="editor-mini-btn" id="pg-reset">${tt('playground-reset')}</button>
      </div>
      <h2>${tt('playground-tables-label')}</h2>
      <div id="pg-schema">
        <div class="result-empty" style="padding:8px 0;">${tt('playground-empty')}</div>
      </div>
    </div>
    ${SPLITTER_HTML}
    <div class="lesson-pane lesson-pane-right editor-pane fade-in">
      <div class="tab-pane code-tab is-active" data-tab="code">
        <div id="sql-editor" class="editor-fill"></div>
      </div>
      <div class="tab-pane output-tab" data-tab="output">
        <div class="result-box" id="result-box">
          <div class="result-status is-info"><span class="dot"></span><span>—</span></div>
          <div class="result-message" style="color:var(--muted);">${currentLang === 'zh' ? '点击运行查看结果。' : 'Click Run to see results.'}</div>
        </div>
      </div>
      <div class="editor-foot">
        <div class="tab-strip">
          <button class="tab-btn is-active" data-tab="code">${currentLang === 'zh' ? '代码' : 'Code'}</button>
          <button class="tab-btn" data-tab="output">${currentLang === 'zh' ? '输出' : 'Output'}</button>
        </div>
        <button class="btn btn-ghost ripple-surface" id="btn-run">▶  ${tt('btn-run')}</button>
      </div>
    </div>
  `;

  requestAnimationFrame(() => {
    wrap.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
    bindRipples();
    bindSplitter();
  });

  const schemaContainer = document.getElementById('pg-schema');

  function refreshSchema() {
    let tableNames;
    try {
      const rows = execToRows(playgroundDb, `SELECT name FROM sqlite_master WHERE type='table' ORDER BY name`);
      tableNames = rows.map(r => r.name);
    } catch(e) { tableNames = []; }
    schemaContainer.innerHTML = tableNames.length
      ? renderSchemaPreview(playgroundDb, tableNames)
      : `<div class="result-empty" style="padding:8px 0;">${tt('playground-empty')}</div>`;
  }

  document.getElementById('pg-load-demo').addEventListener('click', async () => {
    // Lazy-load the schema named in course.playgroundSchema on first click,
    // then cache the SQL string on `course` for re-use on subsequent clicks.
    if (!course.playgroundSetup) {
      if (!course.playgroundSchema) return;
      try {
        course.playgroundSetup = await loadSchema(courseSlug, course.playgroundSchema, course);
      } catch(e) {
        schemaContainer.innerHTML = `<div class="result-error">${escapeHtml(e.message || String(e))}</div>`;
        return;
      }
    }
    playgroundDb = freshDb();
    try { runSetup(playgroundDb, course.playgroundSetup); } catch(e) {
      schemaContainer.innerHTML = `<div class="result-error">${escapeHtml(e.message || String(e))}</div>`;
      return;
    }
    refreshSchema();
  });

  document.getElementById('pg-reset').addEventListener('click', () => {
    playgroundDb = freshDb();
    refreshSchema();
  });

  const resultBox = document.getElementById('result-box');
  const monacoEd = createCodeEditor(document.getElementById('sql-editor'), {
    language: 'sql',
    fillParent: true,
    tabSize: 2, wordWrap: 'on',
  });
  monacoEd.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
    () => document.getElementById('btn-run')?.click()
  );
  const editor = { get value() { return monacoEd.getValue(); } };

  /* Tab switching */
  const tabPanes = wrap.querySelectorAll('.tab-pane');
  const tabBtns  = wrap.querySelectorAll('.tab-btn');
  function activateTab(name) {
    tabPanes.forEach(p => p.classList.toggle('is-active', p.dataset.tab === name));
    tabBtns .forEach(b => b.classList.toggle('is-active', b.dataset.tab === name));
    if (name === 'code') {
      requestAnimationFrame(() => {
        const el = document.getElementById('sql-editor');
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.width > 0 && r.height > 0) monacoEd.layout({ width: r.width, height: r.height });
        }
      });
    }
  }
  tabBtns.forEach(b => b.addEventListener('click', () => activateTab(b.dataset.tab)));

  document.getElementById('btn-run').addEventListener('click', () => {
    activateTab('output');
    const sql = (editor.value || '').trim();
    if (!sql) {
      resultBox.innerHTML = `<div class="result-status is-info"><span class="dot"></span><span>—</span></div><div class="result-message">${tt('msg-empty-query')}</div>`;
      return;
    }
    try {
      const rows = runSingleSelect(playgroundDb, sql);
      resultBox.innerHTML = `<div class="result-status is-info"><span class="dot"></span><span>${tt('result-runonly')}</span></div>${renderResultTable(rows)}`;
    } catch(e) {
      resultBox.innerHTML = `<div class="result-status is-fail"><span class="dot"></span><span>${tt('result-error')}</span></div><div class="result-error">${escapeHtml(e.message || String(e))}</div>`;
    }
    refreshSchema();
  });
}

/* ─── Python Playground view ─── */
async function renderPythonPlayground(courseSlug) {
  const wrap = document.getElementById('lesson-content');
  wrap.innerHTML = loadingHtml(currentLang === 'zh' ? '加载中…' : 'Loading…');
  const navBar = document.getElementById('lesson-nav-bar');
  if (navBar) navBar.innerHTML = '';  // playground has no prev/next

  let course;
  try {
    course = await loadCourse(courseSlug);
  } catch(e) {
    wrap.innerHTML = `<div class="not-found"><h2>${tt('err-course-load')}</h2><p>${tt('not-found-desc')}</p><pre style="margin-top:14px;color:var(--err);font-size:12px;">${escapeHtml(String(e.message || e))}</pre></div>`;
    return;
  }
  try {
    await Promise.all([ensurePython(), ensureMonaco()]);
  } catch(e) {
    wrap.innerHTML = `<div class="not-found"><h2>${tt('err-engine-python')}</h2><p>${tt('not-found-desc')}</p><pre style="margin-top:14px;color:var(--err);font-size:12px;">${escapeHtml(String(e.message || e))}</pre></div>`;
    return;
  }

  wrap.innerHTML = `
    <div class="lesson-pane lesson-pane-left fade-in">
      <div class="lesson-meta-row">
        <span class="lesson-pill">${pickLang(course.title)}</span>
      </div>
      <div class="lesson-title-row">
        <h1 class="lesson-title">${tt('py-playground-label')}</h1>
      </div>
      <p style="color:var(--muted); font-size:14px; line-height:1.8; margin-bottom:18px;">${currentLang === 'zh'
        ? '自由编写 Python 代码。'
        : 'Free-form Python.'
      }</p>
    </div>
    ${SPLITTER_HTML}
    <div class="lesson-pane lesson-pane-right editor-pane fade-in">
      <div class="tab-pane code-tab is-active" data-tab="code">
        <div id="py-editor" class="editor-fill"></div>
        <div class="tab-actions">
          <button class="editor-mini-btn" id="pg-py-clear">${tt('py-clear')}</button>
        </div>
      </div>
      <div class="tab-pane output-tab" data-tab="output">
        <div class="terminal" id="py-terminal">
          <span class="t-muted">${tt('py-ready')}</span>
        </div>
      </div>
      <div class="editor-foot">
        <div class="tab-strip">
          <button class="tab-btn is-active" data-tab="code">${currentLang === 'zh' ? '代码' : 'Code'}</button>
          <button class="tab-btn" data-tab="output">${currentLang === 'zh' ? '输出' : 'Output'}</button>
        </div>
        <button class="btn btn-ghost ripple-surface" id="btn-run">▶  ${tt('btn-run')}</button>
      </div>
    </div>
  `;

  requestAnimationFrame(() => {
    wrap.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
    bindRipples();
    bindSplitter();
  });

  const monacoEd = createCodeEditor(document.getElementById('py-editor'), {
    language: 'python',
    value: '',
    fillParent: true,
    tabSize: 4, wordWrap: 'off',
  });
  monacoEd.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
    () => document.getElementById('btn-run')?.click()
  );

  /* Tab switching */
  const tabPanes = wrap.querySelectorAll('.tab-pane');
  const tabBtns  = wrap.querySelectorAll('.tab-btn');
  function activateTab(name) {
    tabPanes.forEach(p => p.classList.toggle('is-active', p.dataset.tab === name));
    tabBtns .forEach(b => b.classList.toggle('is-active', b.dataset.tab === name));
    if (name === 'code') {
      requestAnimationFrame(() => {
        const el = document.getElementById('py-editor');
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.width > 0 && r.height > 0) monacoEd.layout({ width: r.width, height: r.height });
        }
      });
    }
  }
  tabBtns.forEach(b => b.addEventListener('click', () => activateTab(b.dataset.tab)));

  const editor = {
    get value() { return monacoEd.getValue(); },
    set value(v) { monacoEd.setValue(v); },
  };

  const termEl = document.getElementById('py-terminal');
  function termClear() { termEl.innerHTML = ''; }
  function termAppend(text, cls) {
    const s = document.createElement('span');
    s.className = cls || 't-out';
    s.textContent = text;
    termEl.appendChild(s);
    termEl.scrollTop = termEl.scrollHeight;
  }
  function termRequestInput(prompt) {
    return new Promise((resolve) => {
      if (prompt) termAppend(prompt);
      const line = document.createElement('div');
      line.className = 't-input-line';
      const pSpan = document.createElement('span');
      pSpan.className = 't-prompt';
      pSpan.textContent = '▶ ';
      const inp = document.createElement('input');
      inp.className = 't-input-field';
      inp.type = 'text';
      inp.setAttribute('autocomplete', 'off');
      inp.setAttribute('spellcheck', 'false');
      line.appendChild(pSpan);
      line.appendChild(inp);
      termEl.appendChild(line);
      termEl.scrollTop = termEl.scrollHeight;
      inp.focus();
      inp.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter') return;
        const val = inp.value;
        inp.disabled = true;
        inp.style.display = 'none';
        const echo = document.createElement('span');
        echo.className = 't-echo';
        echo.textContent = val + '\n';
        line.appendChild(echo);
        termEl.scrollTop = termEl.scrollHeight;
        resolve(val);
      });
    });
  }

  function skulptRead(x) {
    if (!Sk.builtinFiles?.files?.[x]) throw new Error("File not found: '" + x + "'");
    return Sk.builtinFiles.files[x];
  }

  let _running = false;
  function setRunning(v) {
    _running = v;
    const runBtn = document.getElementById('btn-run');
    if (runBtn) runBtn.disabled = v;
  }

  document.getElementById('btn-run').addEventListener('click', () => {
    if (_running) return;
    activateTab('output');
    setRunning(true);
    termClear();
    const code = editor.value;
    Sk.configure({
      output: (t) => termAppend(t),
      read: skulptRead,
      inputfun: termRequestInput,
      inputfunTakesPrompt: true,
      __future__: Sk.python3,
      // Keep the browser responsive during tight loops + hard-kill runaway code.
      yieldLimit: 100,    // yield to the event loop every ~100ms
      execLimit: 10000,   // throw TimeoutError after 10s
    });
    Sk.misceval.asyncToPromise(() =>
      Sk.importMainWithBody('<stdin>', false, code, true)
    ).catch((e) => {
      termAppend('\n' + e.toString() + '\n', 't-err');
    }).finally(() => setRunning(false));
  });

  document.getElementById('pg-py-clear').addEventListener('click', () => { monacoEd.setValue(''); termClear(); });
}

/* ─── C Playground view ─── */
//
// Differs from Python's:
//   - C runtime lives in a hidden iframe (lib/runtime/webC/iframe.html);
//     ensureC() may take 15–60 s on first cold load (~25 MB from CDN).
//   - We show progress messages during init (forwarded from the iframe).
//   - No interactive stdin: emcc compiles + runs as a unit; if the user
//     code calls scanf, it reads from a "Stdin" textarea pre-populated
//     before clicking Run.
async function renderCPlayground(courseSlug) {
  const wrap = document.getElementById('lesson-content');
  wrap.innerHTML = loadingHtml(currentLang === 'zh' ? '加载中…' : 'Loading…');
  const navBar = document.getElementById('lesson-nav-bar');
  if (navBar) navBar.innerHTML = '';

  let course;
  try {
    course = await loadCourse(courseSlug);
  } catch(e) {
    wrap.innerHTML = `<div class="not-found"><h2>${tt('err-course-load')}</h2><p>${tt('not-found-desc')}</p><pre style="margin-top:14px;color:var(--err);font-size:12px;">${escapeHtml(String(e.message || e))}</pre></div>`;
    return;
  }

  // Render skeleton immediately so users see something while the C runtime
  // boots. Monaco loads in parallel (small) — emception is the long pole.
  wrap.innerHTML = `
    <div class="lesson-pane lesson-pane-left fade-in">
      <div class="lesson-meta-row">
        <span class="lesson-pill">${pickLang(course.title)}</span>
      </div>
      <div class="lesson-title-row">
        <h1 class="lesson-title">${pickLang(course.playgroundTitle) || (currentLang === 'zh' ? '自定义 C 代码' : 'C Playground')}</h1>
      </div>
      <p style="color:var(--muted); font-size:14px; line-height:1.8; margin-bottom:18px;">${currentLang === 'zh'
        ? '自由编写 C 代码，使用真 clang 编译器（emception，~25 MB 首次加载）。'
        : 'Free-form C with the real clang compiler (emception, ~25 MB first load).'
      }</p>
      <style>
        .c-load-card { padding: 14px 16px; border: 1px solid var(--border); border-radius: 10px; background: rgba(0,0,0,0.15); }
        .c-load-title { font-size: 13px; color: var(--text); margin-bottom: 12px; }
        .c-load-track { height: 4px; background: var(--border); border-radius: 2px; overflow: hidden; position: relative; }
        .c-load-fill  { height: 100%; background: linear-gradient(90deg, var(--accent), var(--accent-on)); border-radius: 2px; transition: width 0.4s ease; width: 0%; }
        .c-load-fill.is-indeterminate { width: 30% !important; animation: c-load-bounce 1.4s ease-in-out infinite; }
        @keyframes c-load-bounce {
          0%   { transform: translateX(-50%); }
          50%  { transform: translateX(250%); }
          100% { transform: translateX(-50%); }
        }
        .c-load-detail { font-size: 11px; color: var(--muted); margin-top: 8px; font-variant-numeric: tabular-nums; line-height: 1.5; }
        /* is-error / is-ready visuals live in learn.css so they share the
           transition palette with other cards; do NOT add display:none here. */
      </style>
      <div id="c-load-card" class="c-load-card">
        <div class="c-load-title" id="c-load-title">${currentLang === 'zh' ? '正在加载 C 编译器…' : 'Loading C compiler…'}</div>
        <div class="c-load-track"><div class="c-load-fill is-indeterminate" id="c-load-fill"></div></div>
        <div class="c-load-detail" id="c-load-detail">${currentLang === 'zh' ? '首次约 25 MB，浏览器会缓存。' : 'First time ~25 MB; cached after.'}</div>
      </div>
    </div>
    ${SPLITTER_HTML}
    <div class="lesson-pane lesson-pane-right editor-pane fade-in">
      <div class="tab-pane code-tab is-active" data-tab="code">
        <div id="c-editor" class="editor-fill"></div>
        <div class="tab-actions">
          <button class="editor-mini-btn" id="pg-c-clear">${tt('py-clear')}</button>
        </div>
      </div>
      <div class="tab-pane input-tab" data-tab="input">
        <textarea id="c-stdin" spellcheck="false"
          placeholder="${currentLang === 'zh'
            ? '示例：scanf(&quot;%d&quot;, &amp;a) → 在这里输入数字。多个输入用换行分隔。'
            : 'e.g. scanf(&quot;%d&quot;, &amp;a) → type a number here. Use newlines for multiple inputs.'}">Louie
19</textarea>
      </div>
      <div class="tab-pane output-tab" data-tab="output">
        <div class="terminal" id="c-terminal">
          <span class="t-muted">${currentLang === 'zh' ? '编译器加载完成后即可运行。' : 'Once the compiler is loaded you can run.'}</span>
        </div>
      </div>
      <div class="editor-foot">
        <div class="tab-strip">
          <button class="tab-btn is-active" data-tab="code">${currentLang === 'zh' ? '代码' : 'Code'}</button>
          <button class="tab-btn" data-tab="input">${currentLang === 'zh' ? '输入' : 'Input'}</button>
          <button class="tab-btn" data-tab="output">${currentLang === 'zh' ? '输出' : 'Output'}</button>
        </div>
        <button class="btn btn-ghost ripple-surface" id="btn-run" disabled>▶  ${tt('btn-run')}</button>
      </div>
    </div>
  `;

  requestAnimationFrame(() => {
    wrap.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
    bindRipples();
    bindSplitter();
  });

  // Editor (Monaco). Default code shows pointers + two scanf inputs:
  //   - char *p = name      → pointer to the array's first element
  //   - scanf("%63s", p)    → write through the pointer
  //   - scanf("%d", &age)   → &age is itself a pointer (address-of)
  // printf strings end with \n so libc's line buffering flushes cleanly —
  // no need for fflush(stdout) here. (fflush is its own teaching topic.)
  const DEFAULT_C_CODE = (currentLang === 'zh')
    ? `#include <stdio.h>

int main(void) {
    char name[64];
    int  age;
    char *p = name;          // 指向 name 数组首元素的指针

    printf("What's your name?\\n");
    scanf("%63s", p);        // 通过指针 p 把名字写进 name

    printf("How old are you?\\n");
    scanf("%d", &age);       // &age 取 age 的地址 —— 也是个指针

    printf("Hello, %s! You are %d years old.\\n", p, age);
    return 0;
}
`
    : `#include <stdio.h>

int main(void) {
    char name[64];
    int  age;
    char *p = name;          // pointer to name's first element

    printf("What's your name?\\n");
    scanf("%63s", p);        // write the name through the pointer p

    printf("How old are you?\\n");
    scanf("%d", &age);       // &age is the address of age — also a pointer

    printf("Hello, %s! You are %d years old.\\n", p, age);
    return 0;
}
`;

  await ensureMonaco();
  const monacoEd = createCodeEditor(document.getElementById('c-editor'), {
    language: 'c',
    value: DEFAULT_C_CODE,
    fillParent: true,
    tabSize: 4, wordWrap: 'off',
  });
  monacoEd.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
    () => document.getElementById('btn-run')?.click()
  );

  /* Tab switching */
  const tabPanes = wrap.querySelectorAll('.tab-pane');
  const tabBtns  = wrap.querySelectorAll('.tab-btn');
  function activateTab(name) {
    tabPanes.forEach(p => p.classList.toggle('is-active', p.dataset.tab === name));
    tabBtns .forEach(b => b.classList.toggle('is-active', b.dataset.tab === name));
    if (name === 'code') {
      requestAnimationFrame(() => {
        const el = document.getElementById('c-editor');
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.width > 0 && r.height > 0) monacoEd.layout({ width: r.width, height: r.height });
        }
      });
    }
  }
  tabBtns.forEach(b => b.addEventListener('click', () => activateTab(b.dataset.tab)));

  // Terminal helpers
  const termEl = document.getElementById('c-terminal');
  function termClear() { termEl.innerHTML = ''; }
  function termAppend(text, cls) {
    const s = document.createElement('span');
    s.className = cls || 't-out';
    s.textContent = text;
    termEl.appendChild(s);
    termEl.scrollTop = termEl.scrollHeight;
  }

  // Interactive input prompt — appears in the terminal when scanf/getchar
  // blocks. Returns a Promise<string|null>. Enter commits the line; Ctrl+D
  // sends EOF (null).
  function termRequestInput() {
    return new Promise((resolve) => {
      const line = document.createElement('div');
      line.className = 't-input-line';
      const pSpan = document.createElement('span');
      pSpan.className = 't-prompt';
      pSpan.textContent = '▶ ';
      const inp = document.createElement('input');
      inp.className = 't-input-field';
      inp.type = 'text';
      inp.setAttribute('autocomplete', 'off');
      inp.setAttribute('spellcheck', 'false');
      line.appendChild(pSpan);
      line.appendChild(inp);
      termEl.appendChild(line);
      termEl.scrollTop = termEl.scrollHeight;
      // Defer focus so it survives terminal scroll
      requestAnimationFrame(() => inp.focus());
      function commit(value) {
        inp.disabled = true;
        inp.style.display = 'none';
        const echo = document.createElement('span');
        echo.className = 't-echo';
        echo.textContent = (value == null ? '(EOF)' : value) + '\n';
        line.appendChild(echo);
        termEl.scrollTop = termEl.scrollHeight;
        resolve(value);
      }
      inp.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') { e.preventDefault(); commit(inp.value); }
        else if (e.key === 'd' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); commit(null); }
      });
    });
  }

  // ─── Progress card driver ───
  const card    = document.getElementById('c-load-card');
  const titleEl = document.getElementById('c-load-title');
  const fillEl  = document.getElementById('c-load-fill');
  const detail  = document.getElementById('c-load-detail');

  function fmtMB(bytes) {
    if (bytes == null) return '?';
    return (bytes / (1024 * 1024)).toFixed(bytes < 1024 * 1024 ? 2 : 1) + ' MB';
  }
  let _readySeen = false;   // once set, lower-priority init warnings can't downgrade the card
  function setProgress({ phase, loaded, total, message }) {
    if (!card) return;
    // After the engine reports 'ready', ignore stray 'init' warnings —
    // those are typically runtime-level errors that belong in the terminal,
    // not in the compiler-status card.
    if (_readySeen && phase === 'init') return;
    if (phase === 'download') {
      titleEl.textContent = currentLang === 'zh' ? '下载 C 编译器' : 'Downloading C compiler';
      if (total) {
        const pct = Math.min(100, Math.round((loaded / total) * 100));
        fillEl.classList.remove('is-indeterminate');
        fillEl.style.width = pct + '%';
        detail.textContent = `${pct}%  ·  ${fmtMB(loaded)} / ${fmtMB(total)}` +
                             (message ? `  ·  ${message}` : '');
      } else {
        // Server didn't give content-length; show indeterminate + bytes loaded
        fillEl.classList.add('is-indeterminate');
        detail.textContent = `${fmtMB(loaded)}` + (message ? `  ·  ${message}` : '');
      }
    } else if (phase === 'init') {
      titleEl.textContent = currentLang === 'zh' ? '初始化 clang 与系统库' : 'Initialising clang + sysroot';
      fillEl.classList.add('is-indeterminate');
      detail.textContent = (message || (currentLang === 'zh'
        ? '正在加载 libc / libc++（来自浏览器缓存或 CDN）。'
        : 'Loading libc / libc++ (from cache or CDN).'));
    } else if (phase === 'ready') {
      // Don't hide the card — transition it to a green "Clang Ready" state
      // so the user sees confirmation that loading succeeded.
      _readySeen = true;
      card.classList.remove('is-error');
      card.classList.add('is-ready');
      fillEl.classList.remove('is-indeterminate');
      fillEl.style.width = '100%';
      titleEl.textContent = tt('c-ready-title');
      detail.textContent  = tt('c-ready-detail');
    } else if (phase === 'error') {
      card.classList.add('is-error');
      titleEl.textContent = currentLang === 'zh' ? 'C 编译器加载失败' : 'C compiler failed to load';
      fillEl.classList.remove('is-indeterminate');
      fillEl.style.width = '100%';
      detail.textContent = message || '';
    }
  }

  // Bring up the C runtime
  const runBtn = document.getElementById('btn-run');
  let cEngine;
  try {
    cEngine = await ensureC({ onProgress: setProgress });
    setProgress({ phase: 'ready' });
    runBtn.disabled = false;
    termClear();
    termAppend((currentLang === 'zh' ? '编译器已就绪，点击运行。' : 'Compiler ready — click Run.') + '\n', 't-muted');
  } catch (e) {
    setProgress({ phase: 'error', message: String(e.message || e) });
    return;
  }

  // Run handler — three button states for clearer feedback:
  //   idle       : "▶ 运行"            primary, clickable
  //   compiling  : "编译中…"           greyed, disabled
  //   done       : "✓ 完成"            green flash, then auto-revert to idle
  let _running = false;
  const RUN_LABEL = '▶  ' + tt('btn-run');
  function setRunBtn(state) {
    if (!runBtn) return;
    runBtn.classList.remove('is-busy', 'is-done');
    if (state === 'compiling') {
      runBtn.disabled = true;
      runBtn.classList.add('is-busy');
      runBtn.textContent = tt('c-compiling');
      _running = true;
    } else if (state === 'done') {
      runBtn.disabled = true;
      runBtn.classList.add('is-done');
      runBtn.textContent = tt('c-done');
      // _running stays true through the flash so a quick double-click does nothing
    } else { // idle
      runBtn.disabled = false;
      runBtn.textContent = RUN_LABEL;
      _running = false;
    }
  }

  runBtn.addEventListener('click', async () => {
    if (_running) return;
    activateTab('output');
    setRunBtn('compiling');
    termClear();

    const code  = monacoEd.getValue();
    const stdin = document.getElementById('c-stdin').value;
    try {
      const result = await cEngine.run(code, {
        stdin,
        flags: '-O0',
        onStdout: (t) => termAppend(t, 't-out'),
        onStderr: (t) => termAppend(t, 't-err'),
        // Interactive: scanf / getchar block here until user types in terminal.
        // The pre-filled stdin textarea drains FIRST; this only fires once
        // those bytes are exhausted.
        onInputRequest: termRequestInput,
      });
      if (result.error) {
        termAppend('\n' + result.error + '\n', 't-err');
      } else {
        termAppend('\n' + (currentLang === 'zh' ? '程序退出，状态码 ' : 'Process exited, code ') + result.exitCode + '\n',
                   result.exitCode === 0 ? 't-muted' : 't-err');
      }
    } catch (e) {
      termAppend('\n' + String(e.message || e) + '\n', 't-err');
    } finally {
      // Brief "✓ 完成" flash then revert to idle
      setRunBtn('done');
      setTimeout(() => setRunBtn('idle'), 1200);
    }
  });

  document.getElementById('pg-c-clear').addEventListener('click', () => { monacoEd.setValue(''); });
}
