/* ============================================================
 * learn/learn-lesson.js
 * Lesson runners (with grading), router, and boot for learn.html.
 * Loaded LAST so every cross-file symbol it references is already
 * defined.
 *
 *   renderPythonLesson(course, lesson, lessonId, courseSlug)
 *     — renders a Python lesson UI; "Run" executes interactively
 *       (Skulpt input() pumped through the in-page terminal),
 *       "Submit" runs against lesson.testInputs and grades the
 *       captured stdout against lesson.expectedOutput.
 *
 *   renderLesson(courseSlug, lessonIdRaw)
 *     — entry point used by the router. Resolves course type:
 *       * python → delegates to renderPythonLesson (after lazy
 *                  Skulpt + ace mode-python load)
 *       * sql    → renders SQL lesson UI; grades user query against
 *                  lesson.expectedSql via compareRows().
 *
 *   route()
 *     — hash router:  ''                          → renderCourseList
 *                     '#<slug>'                   → renderCourse
 *                     '#<slug>/playground'        → render*Playground
 *                     '#<slug>/<lessonId>'        → renderLesson
 *
 *   Boot block (last lines): loadManifest + applyLang(currentLang)
 *   + bindFadeIn — kicks off first paint.
 *
 * Cross-file dependencies — every symbol below is defined in an
 * earlier learn-*.js script:
 *   tt, pickLang, currentLang, applyLang     ← learn-i18n.js
 *   loadManifest, manifest, loadCourse,
 *   loadProgress, markDone, bindFadeIn,
 *   bindRipples                              ← learn-core.js
 *   ensureSql, ensurePython, ensureMonaco,
 *   createCodeEditor, freshDb, runSetup,
 *   runSingleSelect, compareRows,
 *   renderSchemaPreview, renderResultTable,
 *   escapeHtml                              ← learn-engines.js
 *   renderCourseList, renderCourse,
 *   renderPlayground, renderPythonPlayground ← learn-views.js
 * ============================================================ */

async function renderPythonLesson(course, lesson, lessonId, courseSlug) {
  const wrap = document.getElementById('lesson-content');

  const lessons = course.lessons || [];
  const idx = lessons.findIndex(l => l.id === lessonId);
  const prev = idx > 0 ? lessons[idx - 1] : null;
  const next = idx < lessons.length - 1 ? lessons[idx + 1] : null;

  const intro   = pickLang(lesson.intro)   || '';
  const task    = pickLang(lesson.task)    || '';
  const hint    = pickLang(lesson.hint)    || '';
  const starter = pickLang(lesson.starter) || '';

  wrap.innerHTML = `
    <div class="lesson-pane lesson-pane-left fade-in">
      <div class="lesson-meta-row">
        <span class="lesson-pill">${pickLang(course.title)}</span>
        <span>${tt('lessons-count')} ${String(lesson.id).padStart(2,'0')} / ${String(lessons.length).padStart(2,'0')}</span>
        ${lesson.chapter ? `<span>· ${pickLang(lesson.chapter)}</span>` : ''}
        ${lesson.difficulty ? `<span>· ${tt('difficulty')}: ${pickLang(lesson.difficulty)}</span>` : ''}
      </div>
      <div class="lesson-title-row">
        <h1 class="lesson-title">${pickLang(lesson.title)}</h1>
        ${lesson.chapterRef ? `
          <a class="tutorial-link ripple-surface" href="blog.html#${lesson.chapterRef}" target="_blank" rel="noopener">
            <span>${tt('tutorial-link')}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>` : ''}
      </div>
      <div id="py-intro">${intro}</div>
    </div>

    ${SPLITTER_HTML}

    <div class="lesson-pane lesson-pane-right lesson-right fade-in">
      <div class="task-block">
        <div class="task-label">${tt('task-label')}</div>
        <div class="task-text">${task}</div>
      </div>

      ${lesson.warning ? `
      <div class="lesson-warning">
        <div class="task-label">${currentLang === 'zh' ? '⚠ 注意' : '⚠ Note'}</div>
        <div>${pickLang(lesson.warning)}</div>
      </div>` : ''}

      ${hint ? `
        <div class="hint-panel" id="hint-body" style="display:none;">
          <div class="task-label">${tt('hint-label')}</div>
          <div>${hint}</div>
        </div>` : ''}

      <div class="editor-wrap">
        <div class="editor-label">
          <span>${tt('py-editor-label')}</span>
          <span class="editor-actions">
            <button class="editor-mini-btn" id="btn-reset">${tt('btn-reset')}</button>
            ${hint ? `<button class="editor-mini-btn" id="hint-toggle">${tt('show-hint')}</button>` : ''}
            <button class="editor-mini-btn" id="btn-show-answer">${tt('btn-show-answer')}</button>
          </span>
        </div>
        <div class="editor-host" id="editor-host">
          <div id="py-editor"></div>
        </div>
      </div>

      <div class="editor-bar">
        <button class="btn btn-ghost" id="btn-run">▶  ${tt('btn-run')}</button>
        <button class="btn btn-primary" id="btn-check">✓  ${tt('btn-check')}</button>
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

  // Render the prev/back/next row into the top bar (above the panes)
  const navBar = document.getElementById('lesson-nav-bar');
  if (navBar) {
    navBar.innerHTML = `
      <div class="lesson-nav-foot">
        <a class="nav-btn ripple-surface" href="#${courseSlug}/${prev ? prev.id : ''}" aria-disabled="${prev ? 'false' : 'true'}">← ${tt('btn-prev')}</a>
        <a class="nav-btn ripple-surface" href="#${courseSlug}">${tt('btn-back-list')}</a>
        <a class="nav-btn ripple-surface" href="#${courseSlug}/${next ? next.id : ''}" aria-disabled="${next ? 'false' : 'true'}">${tt('btn-next')} →</a>
      </div>
    `;
  }

  requestAnimationFrame(() => {
    wrap.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
    bindRipples();
    bindSplitter();
  });

  /* ── Monaco editor ── */
  const editorHost = document.getElementById('editor-host');
  const monacoEd = createCodeEditor(document.getElementById('py-editor'), {
    language: 'python',
    value: starter,
    minLines: 10, maxLines: 24,
    tabSize: 4, wordWrap: 'off',
  });
  monacoEd.onDidFocusEditorWidget(() => editorHost.classList.add('is-focused'));
  monacoEd.onDidBlurEditorWidget (() => editorHost.classList.remove('is-focused'));
  monacoEd.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
    () => document.getElementById('btn-run')?.click()
  );
  monacoEd.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.Enter,
    () => document.getElementById('btn-check')?.click()
  );

  const editor = {
    get value() { return monacoEd.getValue(); },
    set value(v) { monacoEd.setValue(v); },
  };

  /* ── Terminal helpers ── */
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

  /* ── Run helpers ── */
  let _running = false;

  function setRunning(v) {
    _running = v;
    const runBtn   = document.getElementById('btn-run');
    const checkBtn = document.getElementById('btn-check');
    if (runBtn)   runBtn.disabled   = v;
    if (checkBtn) checkBtn.disabled = v;
  }

  function skulptRead(x) {
    if (!Sk.builtinFiles?.files?.[x])
      throw new Error("File not found: '" + x + "'");
    return Sk.builtinFiles.files[x];
  }

  function runInteractive() {
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
      yieldLimit: 100,
      execLimit: 10000,
    });
    Sk.misceval.asyncToPromise(() =>
      Sk.importMainWithBody('<stdin>', false, code, true)
    ).catch((e) => {
      termAppend('\n' + e.toString() + '\n', 't-err');
    }).finally(() => setRunning(false));
  }

  function runCheck() {
    if (_running) return;
    setRunning(true);
    const code = editor.value;
    const testInputs = (lesson.testInputs || []).slice();
    let inputIdx = 0;
    let output = '';
    Sk.configure({
      output: (t) => { output += t; },
      read: skulptRead,
      inputfun: (p) => Promise.resolve(testInputs[inputIdx++] || ''),
      inputfunTakesPrompt: true,
      __future__: Sk.python3,
      // Keep the browser responsive during tight loops + hard-kill runaway code.
      yieldLimit: 100,
      execLimit: 10000,
    });
    Sk.misceval.asyncToPromise(() =>
      Sk.importMainWithBody('<stdin>', false, code, true)
    ).then(() => {
      termClear();
      const expected = lesson.expectedOutput || '';
      if (output.trim() === expected.trim()) {
        markDone(courseSlug, lesson.id);
        termAppend('✦ ' + tt('msg-pass') + '\n', 't-pass');
        termAppend('\n' + tt('py-got') + '\n', 't-muted');
        termAppend(output);
      } else {
        termAppend('✗ ' + tt('result-fail') + '\n\n', 't-err');
        termAppend(tt('py-expected') + '\n', 't-muted');
        termAppend(expected || '(empty)\n');
        termAppend('\n' + tt('py-got') + '\n', 't-muted');
        termAppend(output || '(empty)\n');
      }
    }).catch((e) => {
      termClear();
      termAppend(e.toString() + '\n', 't-err');
    }).finally(() => setRunning(false));
  }

  document.getElementById('btn-run').addEventListener('click', runInteractive);
  document.getElementById('btn-check').addEventListener('click', runCheck);
  document.getElementById('btn-clear-term').addEventListener('click', () => {
    if (!_running) termClear();
  });
  document.getElementById('btn-reset').addEventListener('click', () => {
    editor.value = starter;
    termClear();
    termAppend(tt('py-reset-done') + '\n', 't-muted');
  });

  const showBtn = document.getElementById('btn-show-answer');
  let answerShown = false, answerSaved = '';
  showBtn.addEventListener('click', () => {
    if (!answerShown) {
      answerSaved = editor.value;
      editor.value = lesson.answer || '';
      showBtn.textContent = tt('btn-hide-answer');
      answerShown = true;
    } else {
      editor.value = answerSaved;
      showBtn.textContent = tt('btn-show-answer');
      answerShown = false;
    }
  });

  const hintToggle = document.getElementById('hint-toggle');
  if (hintToggle) {
    hintToggle.addEventListener('click', () => {
      const body = document.getElementById('hint-body');
      const open = body.style.display !== 'none';
      body.style.display = open ? 'none' : 'block';
      hintToggle.textContent = open ? tt('show-hint') : tt('hide-hint');
    });
  }
}

/* ─── Lesson view (SQL grading) ─── */
let _currentLesson = null;

async function renderLesson(courseSlug, lessonIdRaw) {
  const wrap = document.getElementById('lesson-content');
  wrap.innerHTML = loadingHtml(currentLang === 'zh' ? '加载中…' : 'Loading…');
  let course;
  try {
    course = await loadCourse(courseSlug);
  } catch (e) {
    wrap.innerHTML = `<div class="not-found"><h2>${tt('err-course-load')}</h2><p>${tt('not-found-desc')}</p><pre style="margin-top:18px; color:var(--err); font-size:12px;">${escapeHtml(String(e.message || e))}</pre></div>`;
    return;
  }

  const lessonId = parseInt(lessonIdRaw, 10);
  const lesson = (course.lessons || []).find(l => l.id === lessonId);
  if (!lesson) {
    wrap.innerHTML = `<div class="not-found"><h2>${tt('err-lesson-missing')}</h2><p>${tt('not-found-desc')}</p></div>`;
    return;
  }

  /* ── Python course: lazy-load Skulpt + Monaco, then render ── */
  if (course.type === 'python') {
    wrap.innerHTML = loadingHtml(tt('py-loading'));
    try {
      await Promise.all([ensurePython(), ensureMonaco()]);
    } catch(e) {
      wrap.innerHTML = `<div class="not-found"><h2>${tt('err-engine-python')}</h2><p>${tt('not-found-desc')}</p><pre style="margin-top:18px; color:var(--err); font-size:12px;">${escapeHtml(String(e.message || e))}</pre></div>`;
      return;
    }
    return renderPythonLesson(course, lesson, lessonId, courseSlug);
  }

  /* ── SQL course: ensure sql.js + Monaco ── */
  try {
    await Promise.all([ensureSql(), ensureMonaco()]);
  } catch (e) {
    wrap.innerHTML = `<div class="not-found"><h2>${tt('err-engine-sql')}</h2><p>${tt('not-found-desc')}</p><pre style="margin-top:18px; color:var(--err); font-size:12px;">${escapeHtml(String(e.message || e))}</pre></div>`;
    return;
  }

  const db = freshDb();
  let setupErr = null;
  try { runSetup(db, lesson.setup); } catch (e) { setupErr = e; console.error('Lesson setup failed:', e); }

  const schemaHtml = setupErr
    ? `<div class="result-error">Setup failed: ${escapeHtml(setupErr.message || String(setupErr))}</div>`
    : renderSchemaPreview(db, lesson.tables || []);

  const lessons = course.lessons || [];
  const idx = lessons.findIndex(l => l.id === lessonId);
  const prev = idx > 0 ? lessons[idx - 1] : null;
  const next = idx >= 0 && idx < lessons.length - 1 ? lessons[idx + 1] : null;

  const intro = pickLang(lesson.intro) || '';
  const task  = pickLang(lesson.task) || '';
  const hint  = pickLang(lesson.hint) || '';
  const initialSql = lesson.starter ? pickLang(lesson.starter) : '';

  wrap.innerHTML = `
      <div class="lesson-pane lesson-pane-left fade-in">
          <div class="lesson-meta-row">
            <span class="lesson-pill">${pickLang(course.title)}</span>
            <span>${tt('lessons-count')} ${String(lesson.id).padStart(2,'0')} / ${String(lessons.length).padStart(2,'0')}</span>
            ${lesson.chapter ? `<span>· ${pickLang(lesson.chapter)}</span>` : ''}
            ${lesson.difficulty ? `<span>· ${tt('difficulty')}: ${pickLang(lesson.difficulty)}</span>` : ''}
          </div>
          <div class="lesson-title-row">
            <h1 class="lesson-title">${pickLang(lesson.title)}</h1>
            ${lesson.chapterRef ? `
              <a class="tutorial-link ripple-surface" href="blog.html#${lesson.chapterRef}" target="_blank" rel="noopener">
                <span>${tt('tutorial-link')}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            ` : ''}
          </div>
          ${lesson.subtitle ? `<p class="lesson-subtitle">${pickLang(lesson.subtitle)}</p>` : ''}

          <div id="lesson-intro">${intro}</div>
          ${(lesson.tables && lesson.tables.length) ? `
            <h2>${tt('tables-label')}</h2>
            <div id="lesson-schema">${schemaHtml}</div>
          ` : ''}
        </div>

      ${SPLITTER_HTML}

      <div class="lesson-pane lesson-pane-right lesson-right fade-in">
          <div class="task-block">
            <div class="task-label">${tt('task-label')}</div>
            <div class="task-text">${task}</div>
          </div>

          ${hint ? `
            <div class="hint-panel" id="hint-body" style="display:none;">
              <div class="task-label">${tt('hint-label')}</div>
              <div>${hint}</div>
            </div>
          ` : ''}

          <div class="editor-wrap">
            <div class="editor-label">
              <span>${tt('editor-label')}</span>
              <span class="editor-actions">
                <button class="editor-mini-btn" id="btn-reset">${tt('btn-reset')}</button>
                ${hint ? `<button class="editor-mini-btn" id="hint-toggle">${tt('show-hint')}</button>` : ''}
                <button class="editor-mini-btn" id="btn-show-answer">${tt('btn-show-answer')}</button>
              </span>
            </div>
            <div class="editor-host" id="editor-host">
              <div id="sql-editor"></div>
            </div>
          </div>

          <div class="editor-bar">
            <button class="btn btn-ghost" id="btn-run">▶  ${tt('btn-run')}</button>
            <button class="btn btn-primary" id="btn-check">✓  ${tt('btn-check')}</button>
          </div>

          <div class="result-box" id="result-box">
            <div class="result-status is-info"><span class="dot"></span><span>—</span></div>
            <div class="result-message" style="color: var(--muted);">${currentLang === 'zh' ? '点击 运行 看你的查询输出，点击 提交 检查答案。' : 'Click Run to see output. Click Submit to check.'}</div>
          </div>
        </div>
  `;

  // Render the prev/back/next row into the top bar (above the panes)
  const navBar = document.getElementById('lesson-nav-bar');
  if (navBar) {
    navBar.innerHTML = `
      <div class="lesson-nav-foot">
        <a class="nav-btn ripple-surface" href="#${courseSlug}/${prev ? prev.id : ''}" aria-disabled="${prev ? 'false' : 'true'}">← ${tt('btn-prev')}</a>
        <a class="nav-btn ripple-surface" href="#${courseSlug}">${tt('btn-back-list')}</a>
        <a class="nav-btn ripple-surface" href="#${courseSlug}/${next ? next.id : ''}" aria-disabled="${next ? 'false' : 'true'}">${tt('btn-next')} →</a>
      </div>
    `;
  }

  requestAnimationFrame(() => {
    wrap.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
    bindRipples();
    bindSplitter();
  });

  const editorHost = document.getElementById('editor-host');
  const monacoEd = createCodeEditor(document.getElementById('sql-editor'), {
    language: 'sql',
    value: initialSql,
    minLines: 10, maxLines: 30,
    tabSize: 2, wordWrap: 'on',
  });
  monacoEd.onDidFocusEditorWidget(() => editorHost.classList.add('is-focused'));
  monacoEd.onDidBlurEditorWidget (() => editorHost.classList.remove('is-focused'));
  monacoEd.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
    () => document.getElementById('btn-run')?.click()
  );
  monacoEd.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.Enter,
    () => document.getElementById('btn-check')?.click()
  );
  const editor = {
    get value() { return monacoEd.getValue(); },
    set value(v) { monacoEd.setValue(v); },
  };
  const resultBox = document.getElementById('result-box');
  const initial = initialSql;

  function setStatus(status, msg) {
    const cls = status === 'pass' ? 'is-pass' : status === 'fail' ? 'is-fail' : 'is-info';
    const label = status === 'pass' ? tt('result-pass') : status === 'fail' ? tt('result-fail') : tt('result-runonly');
    const head = `<div class="result-status ${cls}"><span class="dot"></span><span>${label}</span></div>`;
    resultBox.innerHTML = head + (msg || '');
  }

  function showError(err) {
    setStatus('fail', `<div class="result-error">${escapeHtml(err.message || String(err))}</div>`);
  }

  function runUserSql() {
    const sql = (editor.value || '').trim();
    if (!sql) { setStatus('info', `<div class="result-message">${tt('msg-empty-query')}</div>`); return null; }
    const fdb = freshDb();
    try { runSetup(fdb, lesson.setup); } catch (e) { showError(e); return null; }
    try {
      const rows = runSingleSelect(fdb, sql);
      return { rows, db: fdb };
    } catch (e) { showError(e); return null; }
  }

  document.getElementById('btn-run').addEventListener('click', () => {
    const r = runUserSql();
    if (!r) return;
    const tableHtml = renderResultTable(r.rows);
    setStatus('info', `
      <div class="result-message">${currentLang === 'zh' ? '查询执行成功。' : 'Query executed.'}</div>
      <div class="result-table-wrap">
        <div class="result-table-label">${tt('result-yours')}</div>
        ${tableHtml}
      </div>
    `);
  });

  document.getElementById('btn-check').addEventListener('click', () => {
    const r = runUserSql();
    if (!r) return;
    const edb = freshDb();
    try { runSetup(edb, lesson.setup); } catch (e) { showError(e); return; }
    let expectedRows;
    try { expectedRows = runSingleSelect(edb, lesson.expectedSql); }
    catch (e) { showError(e); return; }

    const cmp = compareRows(r.rows, expectedRows, !!lesson.checkOrder);
    const yourTbl = `
      <div class="result-table-wrap">
        <div class="result-table-label">${tt('result-yours')}</div>
        ${renderResultTable(r.rows)}
      </div>`;
    const expectedTbl = `
      <div class="result-table-wrap">
        <div class="result-table-label">${tt('result-expected')}</div>
        ${renderResultTable(expectedRows)}
      </div>`;
    const tablesRow = `<div class="result-tables-row has-expected">${yourTbl}${expectedTbl}</div>`;

    if (cmp.ok) {
      markDone(courseSlug, lesson.id);
      setStatus('pass', `<div class="result-message">${tt('msg-pass')}</div>${tablesRow}`);
    } else {
      let msg;
      if (cmp.code === 'rows') msg = tt('msg-fail-rows', { got: cmp.got, want: cmp.want });
      else if (cmp.code === 'cols') msg = tt('msg-fail-cols');
      else if (cmp.code === 'order') msg = tt('msg-fail-order');
      else msg = tt('msg-fail-data');
      setStatus('fail', `<div class="result-message">${msg}</div>${tablesRow}`);
    }
  });

  document.getElementById('btn-reset').addEventListener('click', () => {
    editor.value = initial;
    setStatus('info', `<div class="result-message" style="color: var(--muted);">${currentLang === 'zh' ? '已恢复到起始代码。' : 'Reset to starter code.'}</div>`);
  });

  const showBtn = document.getElementById('btn-show-answer');
  let answerShown = false;
  let answerSaved = '';
  showBtn.addEventListener('click', () => {
    if (!answerShown) {
      answerSaved = editor.value;
      editor.value = lesson.expectedSql || '';
      showBtn.textContent = tt('btn-hide-answer');
      answerShown = true;
    } else {
      editor.value = answerSaved;
      showBtn.textContent = tt('btn-show-answer');
      answerShown = false;
    }
  });

  const hintToggle = document.getElementById('hint-toggle');
  if (hintToggle) {
    hintToggle.addEventListener('click', () => {
      const body = document.getElementById('hint-body');
      const open = body.style.display !== 'none';
      body.style.display = open ? 'none' : 'block';
      hintToggle.textContent = open ? tt('show-hint') : tt('hide-hint');
    });
  }
}

/* ─── Router ─── */
function route() {
  // Dispose any Monaco editors from the previous view BEFORE the new
  // render replaces lesson-content's DOM. Monaco doesn't auto-clean up
  // when its container is removed — without this, editors accumulate
  // and eventually choke the event loop.
  disposeAllEditors();

  const hash = location.hash.replace(/^#/, '').trim();
  const parts = hash.split('/').filter(Boolean);
  const courseList = document.getElementById('view-courses');
  const courseView = document.getElementById('view-course');
  const lessonView = document.getElementById('view-lesson');
  const main = document.getElementById('main');

  document.getElementById('course-back-link').href = '#';
  if (parts.length >= 1) {
    document.getElementById('lesson-back-link').href = '#' + parts[0];
  }

  const inLesson = parts.length >= 2;
  main.classList.toggle('is-lesson', inLesson);
  document.body.classList.toggle('lesson-mode', inLesson);

  if (parts.length === 0) {
    courseList.style.display = 'block';
    courseView.style.display = 'none';
    lessonView.style.display = 'none';
    renderCourseList();
    window.scrollTo({ top: 0, behavior: 'instant' });
  } else if (parts.length === 1) {
    courseList.style.display = 'none';
    courseView.style.display = 'block';
    lessonView.style.display = 'none';
    renderCourse(parts[0]);
    window.scrollTo({ top: 0, behavior: 'instant' });
  } else if (parts[1] === 'playground') {
    courseList.style.display = 'none';
    courseView.style.display = 'none';
    lessonView.style.display = '';
    const courseInfo = (manifest.courses || []).find(c => c.slug === parts[0]);
    if (courseInfo?.type === 'python' || parts[0] === 'python') {
      renderPythonPlayground(parts[0]);
    } else {
      renderPlayground(parts[0]);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  } else {
    courseList.style.display = 'none';
    courseView.style.display = 'none';
    lessonView.style.display = '';
    renderLesson(parts[0], parts[1]);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}

window.addEventListener('hashchange', route);

/* ─── Boot ─── */
loadManifest();
applyLang(currentLang);
bindFadeIn();
