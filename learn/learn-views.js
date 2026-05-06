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
        <div class="course-card-icon">${c.icon || ''}</div>
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
    <div class="lesson-pane lesson-pane-right lesson-right fade-in">
      <div class="editor-wrap">
        <div class="editor-label"><span>${tt('editor-label')}</span></div>
        <div class="editor-host" id="editor-host">
          <div id="sql-editor"></div>
        </div>
      </div>
      <div class="editor-bar">
        <button class="btn btn-ghost" id="btn-run">▶  ${tt('btn-run')}</button>
      </div>
      <div class="result-box" id="result-box">
        <div class="result-status is-info"><span class="dot"></span><span>—</span></div>
        <div class="result-message" style="color:var(--muted);">${currentLang === 'zh' ? '点击运行查看结果。' : 'Click Run to see results.'}</div>
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

  document.getElementById('pg-load-demo').addEventListener('click', () => {
    if (!course.playgroundSetup) return;
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

  const editorHost = document.getElementById('editor-host');
  const resultBox = document.getElementById('result-box');
  const monacoEd = createCodeEditor(document.getElementById('sql-editor'), {
    language: 'sql',
    minLines: 12, maxLines: 30,
    tabSize: 2, wordWrap: 'on',
  });
  monacoEd.onDidFocusEditorWidget(() => editorHost.classList.add('is-focused'));
  monacoEd.onDidBlurEditorWidget (() => editorHost.classList.remove('is-focused'));
  const editor = { get value() { return monacoEd.getValue(); } };

  document.getElementById('btn-run').addEventListener('click', () => {
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
    <div class="lesson-pane lesson-pane-right lesson-right fade-in">
      <div class="editor-wrap">
        <div class="editor-label">
          <span>${tt('py-editor-label')}</span>
          <span class="editor-actions">
            <button class="editor-mini-btn" id="pg-py-clear">${tt('py-clear')}</button>
          </span>
        </div>
        <div class="editor-host" id="editor-host">
          <div id="py-editor"></div>
        </div>
      </div>
      <div class="editor-bar">
        <button class="btn btn-ghost" id="btn-run">▶  ${tt('btn-run')}</button>
      </div>
      <div class="terminal-wrap">
        <div class="terminal-label">
          <span>Terminal</span>
          <button class="editor-mini-btn" id="btn-clear-term">${tt('py-clear')}</button>
        </div>
        <div class="terminal" id="py-terminal">
          <span class="t-muted">${tt('py-ready')}</span>
        </div>
      </div>
    </div>
  `;

  requestAnimationFrame(() => {
    wrap.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
    bindRipples();
    bindSplitter();
  });

  const editorHost = document.getElementById('editor-host');
  const monacoEd = createCodeEditor(document.getElementById('py-editor'), {
    language: 'python',
    value: '',
    minLines: 12, maxLines: 30,
    tabSize: 4, wordWrap: 'off',
  });
  monacoEd.onDidFocusEditorWidget(() => editorHost.classList.add('is-focused'));
  monacoEd.onDidBlurEditorWidget (() => editorHost.classList.remove('is-focused'));
  monacoEd.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
    () => document.getElementById('btn-run')?.click()
  );

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

  document.getElementById('btn-clear-term').addEventListener('click', () => { if (!_running) termClear(); });
  document.getElementById('pg-py-clear').addEventListener('click', () => { monacoEd.setValue(''); termClear(); });
}
