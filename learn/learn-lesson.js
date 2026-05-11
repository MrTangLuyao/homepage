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

      <div id="py-intro">${intro}</div>
    </div>

    ${SPLITTER_HTML}

    <div class="lesson-pane lesson-pane-right editor-pane fade-in">
      <div class="tab-pane code-tab is-active" data-tab="code">
        <div id="py-editor" class="editor-fill"></div>
        <div class="tab-actions">
          <button class="editor-mini-btn" id="btn-reset">${tt('btn-reset')}</button>
          ${hint ? `<button class="editor-mini-btn" id="hint-toggle">${tt('show-hint')}</button>` : ''}
          <button class="editor-mini-btn" id="btn-show-answer">${tt('btn-show-answer')}</button>
        </div>
      </div>
      <div class="tab-pane output-tab" data-tab="output">
        <div class="terminal xterm-host" id="py-terminal"></div>
      </div>
      <div class="editor-foot">
        <div class="tab-strip">
          <button class="tab-btn is-active" data-tab="code">${currentLang === 'zh' ? '代码' : 'Code'}</button>
          <button class="tab-btn" data-tab="output">${currentLang === 'zh' ? '输出' : 'Output'}</button>
        </div>
        <button class="btn btn-ghost ripple-surface" id="btn-run">▶  ${tt('btn-run')}</button>
        <button class="btn btn-primary ripple-surface" id="btn-check">✓  ${tt('btn-check')}</button>
      </div>
      <!-- old commented block left for reference
      <div class="tab-actions" id="code-actions">
        <button class="editor-mini-btn" id="btn-reset">${tt('btn-reset')}</button>
        ${hint ? `<button class="editor-mini-btn" id="hint-toggle">${tt('show-hint')}</button>` : ''}
        <button class="editor-mini-btn" id="btn-show-answer">${tt('btn-show-answer')}</button>
      </div>
      <div class="tab-pane output-pane" data-tab="output">
        <div class="terminal" id="py-terminal">
          <span class="t-muted">${tt('py-ready')}</span>
        </div>
      </div>
      <div class="tab-strip">
        <button class="tab-btn is-active" data-tab="code">${currentLang === 'zh' ? '代码' : 'Code'}</button>
        <button class="tab-btn" data-tab="output">${currentLang === 'zh' ? '输出' : 'Output'}</button>
      </div>
      -->
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

  /* ── Monaco editor (fills the code pane) ── */
  const monacoEd = createCodeEditor(document.getElementById('py-editor'), {
    language: 'python',
    value: starter,
    fillParent: true,
    tabSize: 4, wordWrap: 'off',
  });
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

  /* ── xterm terminal ──
   * Wrapped in try/catch as a hard barrier so an xterm init mishap can't
   * cascade into the rest of the lesson UI. Falls back to a no-op stub. */
  let term;
  try {
    term = createLessonTerminal(document.getElementById('py-terminal'));
    term.writeMuted(tt('py-ready') + '\n');
  } catch (e) {
    console.error('[py-lesson] terminal init failed — using no-op stub:', e);
    term = { write(){}, writeErr(){}, writeMuted(){}, writePass(){}, writeInfo(){},
             reset(){}, focus(){}, fit(){}, awaitLine(){ return Promise.resolve(''); },
             isAwaiting(){ return false; }, cancelAwait(){}, dispose(){} };
  }

  /* ── Tab switching (Code / Output) ── */
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
    } else if (name === 'output') {
      requestAnimationFrame(() => { try { term.fit(); } catch (_) {} });
    }
  }
  tabBtns.forEach(b => b.addEventListener('click', () => activateTab(b.dataset.tab)));

  // Adapter: Skulpt's inputfun receives a prompt string and must
  // return Promise<string>. We print the prompt then await one
  // typed line from the terminal.
  function termRequestInput(prompt) {
    if (prompt) term.write(String(prompt));
    return term.awaitLine();
  }

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
    activateTab('output');
    setRunning(true);
    term.reset();
    const code = editor.value;
    Sk.configure({
      output: (t) => term.write(t),
      read: skulptRead,
      inputfun: termRequestInput,
      inputfunTakesPrompt: true,
      __future__: Sk.python3,
      yieldLimit: 100,
      execLimit: 10000,
    });
    Sk.misceval.asyncToPromise(() =>
      Sk.importMainWithBody('<stdin>', false, code, true)
    ).catch((e) => {
      term.writeErr('\n' + e.toString() + '\n');
    }).finally(() => {
      term.cancelAwait();
      setRunning(false);
    });
  }

  function runCheck() {
    if (_running) return;
    activateTab('output');
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
      yieldLimit: 100,
      execLimit: 10000,
    });
    Sk.misceval.asyncToPromise(() =>
      Sk.importMainWithBody('<stdin>', false, code, true)
    ).then(() => {
      term.reset();
      const expected = lesson.expectedOutput || '';
      if (output.trim() === expected.trim()) {
        markDone(courseSlug, lesson.id);
        term.writePass('✦ ' + tt('msg-pass') + '\n');
        term.writeMuted('\n' + tt('py-got') + '\n');
        term.write(output);
      } else {
        term.writeErr('✗ ' + tt('result-fail') + '\n\n');
        term.writeMuted(tt('py-expected') + '\n');
        term.write(expected || '(empty)\n');
        term.writeMuted('\n' + tt('py-got') + '\n');
        term.write(output || '(empty)\n');
      }
    }).catch((e) => {
      term.reset();
      term.writeErr(e.toString() + '\n');
    }).finally(() => setRunning(false));
  }

  document.getElementById('btn-run').addEventListener('click', runInteractive);
  document.getElementById('btn-check').addEventListener('click', runCheck);
  document.getElementById('btn-reset').addEventListener('click', () => {
    editor.value = starter;
    term.reset();
    activateTab('code');
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

/* ─── Lesson runner: C ───
 * Parallel structure to renderPythonLesson but the engine is cEngine
 * (compile via emception, then run with stdin from lesson.testInputs).
 * Run = stream output to terminal; Submit = capture output, compare to
 * lesson.expectedOutput (whitespace-tolerant trim compare). */
async function renderCLesson(course, lesson, lessonId, courseSlug, cEngine) {
  const wrap = document.getElementById('lesson-content');

  const lessons = course.lessons || [];
  const idx = lessons.findIndex(l => l.id === lessonId);
  const prev = idx > 0 ? lessons[idx - 1] : null;
  const next = idx < lessons.length - 1 ? lessons[idx + 1] : null;

  const intro   = pickLang(lesson.intro)   || '';
  const task    = pickLang(lesson.task)    || '';
  const hint    = pickLang(lesson.hint)    || '';
  const starter = pickLang(lesson.starter) || '';

  // Pre-filled stdin shown to the user as a textarea — used for grading
  // and for the optional "pre-input mode" toggle.
  // testInputs is a list of strings — joined with newlines.
  const defaultStdin = (Array.isArray(lesson.testInputs) ? lesson.testInputs : []).join('\n');

  // Feature-detect JSPI once per page. The toggle defaults OFF (JSPI mode)
  // when JSPI is available, ON (pre-input) when it isn't, so older
  // browsers still get a working "Run" out of the box.
  const HAS_JSPI = typeof WebAssembly.Suspending === 'function'
                && typeof WebAssembly.promising  === 'function';
  let preInputMode = !HAS_JSPI;   // mutable — toggle button flips it

  // C lessons reuse Python lesson's i18n keys for editor/run/term labels —
  // the labels don't say "Python" anywhere.
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
        ${course.slug === 'c-algo' && lesson.chapterRef ? `
          <a class="tutorial-link ripple-surface" href="blog.html#${lesson.chapterRef}" target="_blank" rel="noopener">
            <span>${tt('tutorial-link')}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>` : `
          <a class="tutorial-link ripple-surface"
             href="https://www.runoob.com/cprogramming/c-tutorial.html"
             target="_blank" rel="noopener">
            <span>${tt('runoob-link')}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>`}
      </div>

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

      <div id="c-intro">${intro}</div>
    </div>

    ${SPLITTER_HTML}

    <div class="lesson-pane lesson-pane-right editor-pane fade-in" data-pre-input="${preInputMode ? '1' : '0'}">
      <div class="tab-pane code-tab is-active" data-tab="code">
        <div id="c-editor" class="editor-fill"></div>
        <div class="tab-actions">
          <button class="m3-toggle ripple-surface ${preInputMode ? 'is-on' : ''}" id="btn-preinput-toggle"
                  title="${currentLang === 'zh' ? '开启后会显示输入编辑器，stdin 从那里同步读取（适合答案判定 / 老浏览器）' : 'When on, an input editor appears; stdin is read synchronously from it (use for grading / old browsers).'}">
            <span class="m3-track"><span class="m3-thumb"></span></span>
            <span>${currentLang === 'zh' ? '预输入模式（不推荐）' : 'Pre-input mode (not recommended)'}</span>
          </button>
          <button class="editor-mini-btn" id="btn-reset">${tt('btn-reset')}</button>
          ${hint ? `<button class="editor-mini-btn" id="hint-toggle">${tt('show-hint')}</button>` : ''}
          <button class="editor-mini-btn" id="btn-show-answer">${tt('btn-show-answer')}</button>
        </div>
      </div>
      <div class="tab-pane input-tab" data-tab="input"${preInputMode ? '' : ' hidden'}>
        <textarea id="c-stdin" spellcheck="false">${escapeHtml(defaultStdin)}</textarea>
      </div>
      <div class="tab-pane output-tab" data-tab="output">
        <div class="terminal xterm-host" id="c-terminal"></div>
      </div>
      <div class="editor-foot">
        <div class="tab-strip">
          <button class="tab-btn is-active" data-tab="code">${currentLang === 'zh' ? '代码' : 'Code'}</button>
          <button class="tab-btn" data-tab="input" id="tab-input-btn"${preInputMode ? '' : ' hidden'}>${currentLang === 'zh' ? '输入' : 'Input'}</button>
          <button class="tab-btn" data-tab="output">${currentLang === 'zh' ? '输出' : 'Output'}</button>
        </div>
        <button class="btn btn-ghost ripple-surface" id="btn-run">▶  ${tt('btn-run')}</button>
        <button class="btn btn-primary ripple-surface" id="btn-check">✓  ${tt('btn-check')}</button>
      </div>
      <!-- old commented block left for reference
      <div class="tab-actions" id="code-actions">
        <button class="editor-mini-btn" id="btn-reset">${tt('btn-reset')}</button>
        ${hint ? `<button class="editor-mini-btn" id="hint-toggle">${tt('show-hint')}</button>` : ''}
        <button class="editor-mini-btn" id="btn-show-answer">${tt('btn-show-answer')}</button>
      </div>
      ${defaultStdin ? `
      <div class="tab-pane input-pane" data-tab="input">
        <textarea id="c-stdin" spellcheck="false">${escapeHtml(defaultStdin)}</textarea>
      </div>` : ''}
      <div class="tab-pane output-pane" data-tab="output">
        <div class="terminal" id="c-terminal">
          <span class="t-muted">${currentLang === 'zh' ? '编译器已就绪，点运行试试。' : 'Compiler ready — click Run.'}</span>
        </div>
      </div>
      <div class="tab-strip">
        <button class="tab-btn is-active" data-tab="code">${currentLang === 'zh' ? '代码' : 'Code'}</button>
        ${defaultStdin ? `<button class="tab-btn" data-tab="input">${currentLang === 'zh' ? '输入' : 'Input'}</button>` : ''}
        <button class="tab-btn" data-tab="output">${currentLang === 'zh' ? '输出' : 'Output'}</button>
      </div>
      -->
    </div>
  `;

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

  /* ── Monaco editor (fills the code pane) ── */
  const monacoEd = createCodeEditor(document.getElementById('c-editor'), {
    language: 'c',
    value: starter,
    fillParent: true,
    tabSize: 4, wordWrap: 'off',
  });
  monacoEd.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
    () => document.getElementById('btn-run')?.click());
  monacoEd.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.Enter,
    () => document.getElementById('btn-check')?.click());

  const editor = {
    get value() { return monacoEd.getValue(); },
    set value(v) { monacoEd.setValue(v); },
  };

  /* ── xterm terminal ──
   * Wrapped in try/catch as a hard barrier so an xterm initialisation
   * mishap can't cascade into "all buttons inert / Monaco invisible".
   * If creation fails, we fall back to a no-op handle and keep going. */
  let term;
  try {
    const termEl = document.getElementById('c-terminal');
    term = createLessonTerminal(termEl);
    term.writeMuted(currentLang === 'zh' ? '编译器已就绪，点运行试试。\n' : 'Compiler ready — click Run.\n');
  } catch (e) {
    console.error('[c-lesson] terminal init failed — using no-op stub:', e);
    term = { write(){}, writeErr(){}, writeMuted(){}, writePass(){}, writeInfo(){},
             reset(){}, focus(){}, fit(){}, awaitLine(){ return Promise.resolve(''); },
             isAwaiting(){ return false; }, cancelAwait(){}, dispose(){} };
  }

  /* ── Tab switching (Code / Input / Output) ── */
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
    } else if (name === 'output') {
      requestAnimationFrame(() => { try { term.fit(); } catch (_) {} });
    }
  }
  tabBtns.forEach(b => b.addEventListener('click', () => activateTab(b.dataset.tab)));

  /* ── 预输入模式 toggle (M3 switch) ── */
  // Same defensive wrap reason as the terminal init: a single null
  // querySelector can't be allowed to break the rest of the wiring.
  try {
    const pane = wrap.querySelector('.editor-pane');
    const preBtn   = document.getElementById('btn-preinput-toggle');
    const inputTab = wrap.querySelector('.tab-pane.input-tab');
    const inputTabBtn = document.getElementById('tab-input-btn');
    function applyPreInputUI() {
      if (pane)   pane.setAttribute('data-pre-input', preInputMode ? '1' : '0');
      if (preBtn) preBtn.classList.toggle('is-on', preInputMode);
      if (preInputMode) {
        if (inputTab)    inputTab.hidden = false;
        if (inputTabBtn) inputTabBtn.hidden = false;
      } else {
        if (inputTab)    inputTab.hidden = true;
        if (inputTabBtn) inputTabBtn.hidden = true;
        if (wrap.querySelector('.tab-pane.input-tab.is-active')) activateTab('code');
      }
    }
    applyPreInputUI();
    if (preBtn) preBtn.addEventListener('click', () => {
      preInputMode = !preInputMode;
      applyPreInputUI();
    });
  } catch (e) {
    console.error('[c-lesson] preinput toggle setup failed:', e);
  }

  /* ── Run + Submit ── */
  let _running = false;
  function setRunning(v) {
    _running = v;
    const runBtn   = document.getElementById('btn-run');
    const checkBtn = document.getElementById('btn-check');
    if (runBtn)   { runBtn.disabled   = v; runBtn.textContent   = v ? (tt('c-compiling') || 'Compiling…') : ('▶  ' + tt('btn-run')); }
    if (checkBtn) { checkBtn.disabled = v; }
  }

  function readStdin() {
    const ta = document.getElementById('c-stdin');
    return ta ? ta.value : defaultStdin;
  }

  // ── Run: respects the user's preInputMode toggle.
  //    - preInputMode ON: send stdin string from textarea, mode='preinput'
  //    - preInputMode OFF: mode='jspi', stdin comes from terminal typing
  async function runInteractive() {
    if (_running) return;
    activateTab('output');
    setRunning(true);
    term.reset();
    // Echo the compile command up front so users see what's being run —
    // matches the emception_l demo's UX exactly.
    const flags = '-O0';
    term.writeInfo(`$ emcc ${flags} -sSINGLE_FILE=1 -sEXIT_RUNTIME=1 -sFORCE_FILESYSTEM=1 main.c -o main.js\n`);
    try {
      const result = await cEngine.run(editor.value, {
        stdin: preInputMode ? readStdin() : '',
        mode:  preInputMode ? 'preinput'  : 'jspi',
        flags,
        onStdout: (t) => term.write(t),
        onStderr: (t) => term.writeErr(t),
        onRuntimeStart: () => term.writeInfo('\n[compiled — running]\n\n'),
        onInputRequest: preInputMode ? undefined : () => term.awaitLine().then(s => s + '\n'),
      });
      if (result.error) {
        term.writeErr('\n' + result.error + '\n');
      } else {
        term.writeInfo('\n[exit ' + result.exitCode + ']\n');
      }
    } catch (e) {
      term.writeErr('\n' + String(e.message || e) + '\n');
    } finally {
      term.cancelAwait();
      setRunning(false);
    }
  }

  // ── Submit: grading ALWAYS uses pre-input mode (lesson.testInputs)
  //    regardless of the toggle. Interactive input can't be replayed
  //    deterministically and would defeat auto-grading.
  async function runCheck() {
    if (_running) return;
    activateTab('output');
    setRunning(true);
    let captured = '';
    try {
      const result = await cEngine.run(editor.value, {
        stdin: defaultStdin,   // always the test inputs for grading
        mode:  'preinput',
        flags: '-O0',
        onStdout: (t) => { captured += t; },
        onStderr: (t) => { captured += t; },
      });
      term.reset();
      if (result.error) {
        term.writeErr('✗ ' + (currentLang === 'zh' ? '运行失败：' : 'Run failed: ') + result.error + '\n\n');
        if (captured) term.writeErr(captured + '\n');
        return;
      }
      const expected = lesson.expectedOutput || '';
      if (captured.trim() === expected.trim()) {
        markDone(courseSlug, lesson.id);
        term.writePass('✦ ' + tt('msg-pass') + '\n');
        term.writeMuted('\n' + tt('py-got') + '\n');
        term.write(captured);
      } else {
        term.writeErr('✗ ' + tt('result-fail') + '\n\n');
        term.writeMuted(tt('py-expected') + '\n');
        term.write(expected || '(empty)\n');
        term.writeMuted('\n' + tt('py-got') + '\n');
        term.write(captured || '(empty)\n');
      }
    } catch (e) {
      term.reset();
      term.writeErr(String(e.message || e) + '\n');
    } finally {
      setRunning(false);
    }
  }

  document.getElementById('btn-run').addEventListener('click', runInteractive);
  document.getElementById('btn-check').addEventListener('click', runCheck);
  document.getElementById('btn-reset').addEventListener('click', () => {
    editor.value = starter;
    term.reset();
    activateTab('code');
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
  if (!(course.lessons || []).find(l => l.id === lessonId)) {
    wrap.innerHTML = `<div class="not-found"><h2>${tt('err-lesson-missing')}</h2><p>${tt('not-found-desc')}</p></div>`;
    return;
  }
  // Lazy-load full content. Cached after first call via entry._loaded.
  let lesson;
  try {
    lesson = await loadLesson(courseSlug, lessonId);
  } catch (e) {
    wrap.innerHTML = `<div class="not-found"><h2>${tt('err-lesson-missing')}</h2><p>${tt('not-found-desc')}</p><pre style="margin-top:18px; color:var(--err); font-size:12px;">${escapeHtml(String(e.message || e))}</pre></div>`;
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

  /* ── C course: ensureC (boots emception iframe) + Monaco, then render ── */
  if (course.type === 'c') {
    wrap.innerHTML = loadingHtml(currentLang === 'zh' ? '加载 C 编译器…' : 'Loading C compiler…');
    let cEng;
    try {
      const [eng] = await Promise.all([ensureC(), ensureMonaco()]);
      cEng = eng;
    } catch(e) {
      wrap.innerHTML = `<div class="not-found"><h2>${currentLang === 'zh' ? 'C 编译器加载失败' : 'C compiler failed to load'}</h2><p>${tt('not-found-desc')}</p><pre style="margin-top:18px; color:var(--err); font-size:12px;">${escapeHtml(String(e.message || e))}</pre></div>`;
      return;
    }
    return renderCLesson(course, lesson, lessonId, courseSlug, cEng);
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

          <div class="task-block">
            <div class="task-label">${tt('task-label')}</div>
            <div class="task-text">${task}</div>
          </div>

          ${hint ? `
            <div class="hint-panel" id="hint-body" style="display:none;">
              <div class="task-label">${tt('hint-label')}</div>
              <div>${hint}</div>
            </div>` : ''}

          <div id="lesson-intro">${intro}</div>
          ${(lesson.tables && lesson.tables.length) ? `
            <h2>${tt('tables-label')}</h2>
            <div id="lesson-schema">${schemaHtml}</div>
          ` : ''}
        </div>

      ${SPLITTER_HTML}

      <div class="lesson-pane lesson-pane-right editor-pane fade-in">
        <div class="tab-pane code-tab is-active" data-tab="code">
          <div id="sql-editor" class="editor-fill"></div>
          <div class="tab-actions">
            <button class="editor-mini-btn" id="btn-reset">${tt('btn-reset')}</button>
            ${hint ? `<button class="editor-mini-btn" id="hint-toggle">${tt('show-hint')}</button>` : ''}
            <button class="editor-mini-btn" id="btn-show-answer">${tt('btn-show-answer')}</button>
          </div>
        </div>
        <div class="tab-pane output-tab" data-tab="output">
          <div class="result-box" id="result-box">
            <div class="result-status is-info"><span class="dot"></span><span>—</span></div>
            <div class="result-message" style="color: var(--muted);">${currentLang === 'zh' ? '点击 运行 看你的查询输出，点击 提交 检查答案。' : 'Click Run to see output. Click Submit to check.'}</div>
          </div>
        </div>
        <div class="editor-foot">
          <div class="tab-strip">
            <button class="tab-btn is-active" data-tab="code">${currentLang === 'zh' ? '代码' : 'Code'}</button>
            <button class="tab-btn" data-tab="output">${currentLang === 'zh' ? '输出' : 'Output'}</button>
          </div>
          <button class="btn btn-ghost ripple-surface" id="btn-run">▶  ${tt('btn-run')}</button>
          <button class="btn btn-primary ripple-surface" id="btn-check">✓  ${tt('btn-check')}</button>
        </div>
        <!-- old commented block left for reference
        <div class="tab-actions" id="code-actions">
          <button class="editor-mini-btn" id="btn-reset">${tt('btn-reset')}</button>
          ${hint ? `<button class="editor-mini-btn" id="hint-toggle">${tt('show-hint')}</button>` : ''}
          <button class="editor-mini-btn" id="btn-show-answer">${tt('btn-show-answer')}</button>
        </div>
        <div class="tab-pane output-pane" data-tab="output">
          <div class="result-box" id="result-box">
            <div class="result-status is-info"><span class="dot"></span><span>—</span></div>
            <div class="result-message" style="color: var(--muted);">${currentLang === 'zh' ? '点击 运行 看你的查询输出，点击 提交 检查答案。' : 'Click Run to see output. Click Submit to check.'}</div>
          </div>
        </div>
        <div class="tab-strip">
          <button class="tab-btn is-active" data-tab="code">${currentLang === 'zh' ? '代码' : 'Code'}</button>
          <button class="tab-btn" data-tab="output">${currentLang === 'zh' ? '输出' : 'Output'}</button>
        </div>
        -->
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

  const monacoEd = createCodeEditor(document.getElementById('sql-editor'), {
    language: 'sql',
    value: initialSql,
    fillParent: true,
    tabSize: 2, wordWrap: 'on',
  });
  monacoEd.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
    () => document.getElementById('btn-run')?.click()
  );
  monacoEd.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.Enter,
    () => document.getElementById('btn-check')?.click()
  );

  /* ── Tab switching (Code / Output) ── */
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
    activateTab('output');
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
    activateTab('output');
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
    activateTab('code');
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
async function route() {
  // Dispose any Monaco editors from the previous view BEFORE the new
  // render replaces lesson-content's DOM. Monaco doesn't auto-clean up
  // when its container is removed — without this, editors accumulate
  // and eventually choke the event loop.
  disposeAllEditors();

  const hash = location.hash.replace(/^#/, '').trim();
  const parts = hash.split('/').filter(Boolean);

  // Gate C-family course routes behind the resource-loading warning modal.
  // The gate remembers confirmation for the duration the user stays inside
  // the C course (list ↔ lesson nav skips the prompt). Leaving the C
  // course — back to the course list, into another course family, or any
  // other non-C route — clears the ack so re-entry re-prompts.
  {
    const courseInfo = parts.length >= 1
      ? (manifest.courses || []).find(c => c.slug === parts[0])
      : null;
    const inCFamily = !!(courseInfo && courseInfo.family === 'c');
    if (inCFamily) {
      const ok = await gateCFamilyAccess();
      if (!ok) { location.hash = ''; return; }
    } else {
      _cfamilyAckedThisSession = false;
    }
  }
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
    } else if (courseInfo?.type === 'c' || parts[0] === 'c') {
      renderCPlayground(parts[0]);
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
