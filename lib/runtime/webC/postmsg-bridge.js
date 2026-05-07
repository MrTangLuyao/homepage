/* lib/runtime/webC/postmsg-bridge.js
 *
 * Bridge between the parent (learn.html) and emception (loaded inside this
 * iframe). All emception assets (main.bundle.js, worker, .br, .a libs) live
 * in this same directory — same-origin. This sidesteps two browser limits:
 *   1. cross-origin Worker construction (SecurityError, even with CORS headers)
 *   2. file:// → CDN cross-origin requests rejected
 *
 * Three responsibilities:
 *   1. Stream-fetch main.bundle.js for download progress UI.
 *   2. Inject it via <script src=relative> so webpack's auto-publicPath
 *      resolves to our directory and all sub-assets fetch same-origin.
 *   3. Wait for window.emception, hide upstream demo UI, set up postMessage
 *      protocol with the parent.
 *
 * Protocol — parent → iframe:
 *   { type: 'run', id, code, stdin?, flags? }
 *
 * Protocol — iframe → parent:
 *   { type: 'progress',
 *       phase: 'download' | 'init' | 'ready' | 'error',
 *       loaded?, total?, message? }
 *   { type: 'ready' }
 *   { type: 'stdout' | 'stderr', id, text }
 *   { type: 'done', id, exitCode, error? }
 */

(function () {
  'use strict';

  // Same-origin URL — relative to this iframe.html. The whole emception demo
  // build lives next to us; webpack auto publicPath will read this.
  const BUNDLE_URL = 'main.bundle.js';
  const READY_TIMEOUT_MS = 120 * 1000;

  // ─── Local fallback UI in iframe (only if iframe were ever shown) ───
  const fbTitle  = document.getElementById('fb-title');
  const fbDetail = document.getElementById('fb-detail');
  function setStatus(title, detail) {
    if (fbTitle)  fbTitle.textContent  = title;
    if (fbDetail) fbDetail.textContent = detail || '';
  }
  function notifyParent(payload) {
    try { parent.postMessage(payload, '*'); } catch (e) {}
  }

  // ─── Forward iframe errors to parent so they aren't a black hole ───
  // Use phase: 'init' (not 'error') so a recoverable error doesn't make the
  // UI go fatal. Only a real timeout in waitForEmception triggers `error`.
  window.addEventListener('error', (ev) => {
    const file = ev.filename ? ev.filename.split('/').pop() : '?';
    let msg = ev.message;
    if (ev.error && ev.error.stack) {
      const firstLine = ev.error.stack.split('\n')[0];
      if (firstLine && firstLine !== msg) msg = firstLine;
    }
    parent.postMessage({ type: 'progress', phase: 'init',
      message: `⚠ ${msg} @ ${file}:${ev.lineno || '?'}` }, '*');
    console.error('[c-runtime]', ev.message, ev.error || '');
  });
  window.addEventListener('unhandledrejection', (ev) => {
    const r = ev.reason;
    const msg = (r && (r.message || r.toString())) || 'unknown';
    parent.postMessage({ type: 'progress', phase: 'init',
      message: `⚠ unhandled: ${String(msg).slice(0, 200)}` }, '*');
    console.error('[c-runtime] unhandled rejection:', r);
  });

  // ─── 1. Stream-download main.bundle.js to warm browser HTTP cache ───
  // The bundle is already same-origin so the actual <script src> a moment
  // later will hit the cache (zero re-network). The fetch is purely for
  // visible byte-progress UI.
  async function warmBundleCache() {
    setStatus('Loading C compiler bundle…');
    notifyParent({ type: 'progress', phase: 'download', loaded: 0, total: null,
                   message: 'Reading bundle…' });

    const resp = await fetch(BUNDLE_URL);
    if (!resp.ok) throw new Error(`Bundle fetch failed: HTTP ${resp.status}`);
    const total = parseInt(resp.headers.get('content-length') || '0', 10) || null;
    const reader = resp.body.getReader();
    let loaded = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      loaded += value.byteLength;
      notifyParent({ type: 'progress', phase: 'download', loaded, total,
                     message: 'main.bundle.js' });
    }
  }

  // ─── 2. Load bundle via <script src=...> ───
  // Same-origin script-src lets webpack's auto publicPath read
  // document.currentScript.src and resolve to this directory.
  function loadBundleViaSrc() {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = BUNDLE_URL;
      s.onload  = () => resolve();
      s.onerror = () => reject(new Error('Failed to load main.bundle.js via <script src>'));
      document.body.appendChild(s);
    });
  }

  // ─── 3. Wait for window.emception, with periodic heartbeat ───
  function waitForEmception(timeoutMs) {
    const start = Date.now();
    return new Promise((resolve, reject) => {
      const tick = setInterval(() => {
        const elapsed = Date.now() - start;
        if (window.emception) {
          clearInterval(tick); clearInterval(beat);
          resolve(window.emception);
        } else if (elapsed > timeoutMs) {
          clearInterval(tick); clearInterval(beat);
          reject(new Error(`window.emception not found after ${(elapsed/1000)|0}s`));
        }
      }, 100);
      const beat = setInterval(() => {
        const sec = ((Date.now() - start) / 1000) | 0;
        notifyParent({ type: 'progress', phase: 'init',
          message: `Waiting for clang worker… (${sec}s)` });
      }, 5000);
    });
  }

  // ─── Hide upstream demo UI ───
  function hideUpstreamUI() {
    document.querySelectorAll('#layout, .monaco-editor, .xterm').forEach(el => {
      el.style.display = 'none';
    });
  }
  for (const t of [200, 600, 1500, 3000]) setTimeout(hideUpstreamUI, t);

  // ─── Boot sequence ───
  (async function boot() {
    let em;
    try {
      await warmBundleCache();

      notifyParent({ type: 'progress', phase: 'init', message: 'Starting compiler…' });
      setStatus('Initialising compiler…');
      try {
        await loadBundleViaSrc();
      } catch (e) {
        throw new Error('Bundle load failed: ' + (e.message || e));
      }

      em = await waitForEmception(READY_TIMEOUT_MS);
      notifyParent({ type: 'progress', phase: 'init',
                     message: 'Loading sysroot (libc, libc++)…' });

      const Comlink = window.Comlink;
      let activeRunId = null;

      // Emception's onstdout/onstderr fire for emcc/clang's *own* logging
      // during compile (not for the compiled program — that goes through
      // Module.print in runCompiledJs). emcc is verbose: ANSI-colored info
      // lines like "shared:INFO: (Emscripten: Running sanity checks)" that
      // confuse students. Strip ANSI and drop module-info/debug lines.
      const ANSI_RE         = /\x1b\[[0-9;]*m/g;
      const EMSC_NOISE_RE   = /^[a-z_]+:(INFO|DEBUG):/;
      function cleanCompilerLog(text) {
        const noAnsi = String(text).replace(ANSI_RE, '');
        const kept = noAnsi.split('\n').filter(l => !EMSC_NOISE_RE.test(l));
        return kept.join('\n');
      }
      // emception forwards emcc's stderr line-by-line WITHOUT trailing
      // newlines, so a multi-line compile error renders as one wrapped blob
      // unless we re-add the newlines ourselves.
      function withTrailingNl(s) { return s.endsWith('\n') ? s : s + '\n'; }
      const onOut = (s) => {
        if (activeRunId == null) return;
        const t = cleanCompilerLog(s);
        if (t.trim()) notifyParent({ type: 'stdout', id: activeRunId, text: withTrailingNl(t) });
      };
      const onErr = (s) => {
        if (activeRunId == null) return;
        const t = cleanCompilerLog(s);
        if (t.trim()) notifyParent({ type: 'stderr', id: activeRunId, text: withTrailingNl(t) });
      };
      em.onstdout = Comlink ? Comlink.proxy(onOut) : onOut;
      em.onstderr = Comlink ? Comlink.proxy(onErr) : onErr;

      try { await em.init(); } catch (e) { /* harmless if already initialising */ }

      hideUpstreamUI();
      setStatus('Ready.');
      notifyParent({ type: 'progress', phase: 'ready', message: 'Ready' });
      notifyParent({ type: 'ready' });

      // ─── Run handler ───
      window.addEventListener('message', async (ev) => {
        const msg = ev.data;
        if (!msg || typeof msg !== 'object' || msg.type !== 'run') return;
        const { id, code, stdin = '', flags = '-O0' } = msg;

        activeRunId = id;
        try {
          await em.fileSystem.writeFile('/working/main.c', String(code));
          // No ASYNCIFY — interactive scanf turned out to be too fragile on
          // top of emception's emscripten build (proc_exit / printf paths
          // corrupt the ASYNCIFY state machine before scanf can suspend).
          // Stdin is pre-filled from the textarea and read synchronously.
          // Future attempt with JSPI (Chrome 133+ default) may revive
          // interactive mode without these state issues.
          const cmd = `emcc ${flags} -sSINGLE_FILE=1 -sEXIT_RUNTIME=1 ` +
                      `-sFORCE_FILESYSTEM=1 ` +
                      `main.c -o main.js`;
          const result = await em.run(cmd);
          if (result.returncode !== 0) {
            notifyParent({ type: 'done', id, exitCode: result.returncode,
                           error: 'Compilation failed' });
            return;
          }
          const jsBytes = await em.fileSystem.readFile('/working/main.js',
                                                       { encoding: 'utf8' });
          await runCompiledJs(id, jsBytes, stdin);
        } catch (e) {
          notifyParent({ type: 'done', id, exitCode: -1,
                         error: String(e && e.message || e) });
        } finally {
          activeRunId = null;
        }
      });

    } catch (err) {
      setStatus('C runtime failed to load.', String(err.message || err));
      notifyParent({ type: 'progress', phase: 'error',
                     message: String(err.message || err) });
    }
  })();

  // ─── Execute compiled emcc output ───
  // Stdin is pre-filled from the textarea before run. Module.stdin drains
  // bytes synchronously; once exhausted, returns null (EOF). Interactive
  // scanf isn't supported on this build because emception's emscripten +
  // ASYNCIFY combo trips its own state machine before Module.stdin can
  // suspend cleanly. Pre-fill is the reliable path.
  function runCompiledJs(id, jsCode, stdin) {
    return new Promise((resolve) => {
      let inputBuffer = Array.from(new TextEncoder().encode(String(stdin)));
      let interactiveEofReached = false;

      let runFinished = false;
      function finishRun(exitCode, error) {
        if (runFinished) return;
        runFinished = true;
        notifyParent({ type: 'done', id, exitCode: exitCode | 0, error });
        resolve();
      }

      // Only warn once per run AND only when stdin started empty. scanf
      // routinely calls stdin one extra time after parsing a number (looking
      // for the terminator) — that hits an empty buffer naturally and is NOT
      // a user error, so don't warn for it.
      const initialStdinEmpty = inputBuffer.length === 0;
      let stdinExhaustedWarned = false;

      const Module = {
        print:    (s) => notifyParent({ type: 'stdout', id, text: s + '\n' }),
        printErr: (s) => notifyParent({ type: 'stderr', id, text: s + '\n' }),
        stdin: function () {
          if (inputBuffer.length > 0) return inputBuffer.shift();
          // Buffer drained or never had anything.
          if (initialStdinEmpty && !stdinExhaustedWarned) {
            stdinExhaustedWarned = true;
            notifyParent({ type: 'stderr', id,
              text: '\n[stdin] 程序请求读取，但左侧 stdin 输入框是空的 — ' +
                    '预填输入后再运行。\n' });
          }
          interactiveEofReached = true;
          return null;
        },
        onExit:  (status) => finishRun(status | 0),
        onAbort: (msg) => finishRun(-1, String(msg || 'aborted')),
      };

      try {
        const fn = new Function('Module', jsCode);
        fn(Module);
      } catch (e) {
        if (!runFinished) {
          finishRun(-1, 'Run failed: ' + String(e.message || e));
        }
      }
    });
  }
})();
