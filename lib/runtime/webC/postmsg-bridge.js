/* lib/runtime/webC/postmsg-bridge.js
 *
 * Bridge between the parent (learn.html) and emception (loaded inside this
 * iframe). All emception assets (main.bundle.js, worker, .br, .a libs) live
 * in this same directory — same-origin. This sidesteps two browser limits:
 *   1. cross-origin Worker construction (SecurityError, even with CORS headers)
 *   2. file:// → CDN cross-origin requests rejected
 *
 * Four responsibilities:
 *   1. Stream-fetch main.bundle.js for download progress UI.
 *   2. Inject it via <script src=relative> so webpack's auto-publicPath
 *      resolves to our directory and all sub-assets fetch same-origin.
 *   3. Wait for window.emception, hide upstream demo UI, set up postMessage
 *      protocol with the parent.
 *   4. Run compiled emcc output in one of two modes:
 *        - 'preinput': stdin is a pre-filled string drained synchronously
 *          by Module.stdin. Stdout is captured raw (bypassing emcc's TTY
 *          line buffer) so prompts with no trailing '\n' show immediately.
 *        - 'jspi':     wasm imports for stdin reads are wrapped with
 *          WebAssembly.Suspending; when fd 0 is read the bridge posts
 *          'input-request' to the parent and awaits 'input-response'.
 *          main is wrapped with WebAssembly.promising so the suspending
 *          imports can actually park the wasm stack. Needs Chromium 137+
 *          or Safari 26+ or Firefox 144+.
 *
 * Protocol — parent → iframe:
 *   { type: 'run',
 *       id, code,
 *       stdin?: string,                       // used in preinput mode
 *       mode?: 'preinput' | 'jspi',           // default 'preinput'
 *       flags?: string                        // emcc flags, default '-O0'
 *   }
 *   { type: 'input-response', id, text }      // reply to input-request
 *
 * Protocol — iframe → parent:
 *   { type: 'progress',
 *       phase: 'download' | 'init' | 'ready' | 'error',
 *       loaded?, total?, message? }
 *   { type: 'ready' }
 *   { type: 'stdout' | 'stderr', id, text }
 *   { type: 'input-request', id }             // JSPI mode: wasm wants a line
 *   { type: 'done', id, exitCode, error? }
 */

(function () {
  'use strict';

  const BUNDLE_URL = 'main.bundle.js';
  const READY_TIMEOUT_MS = 120 * 1000;

  // Feature-detect JSPI once. Engine-level — same answer for every run.
  const HAS_JSPI = typeof WebAssembly.Suspending === 'function'
                && typeof WebAssembly.promising  === 'function';

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

  // ─── Forward iframe errors to parent ───
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

  function loadBundleViaSrc() {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = BUNDLE_URL;
      s.onload  = () => resolve();
      s.onerror = () => reject(new Error('Failed to load main.bundle.js via <script src>'));
      document.body.appendChild(s);
    });
  }

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

  function hideUpstreamUI() {
    document.querySelectorAll('#layout, .monaco-editor, .xterm').forEach(el => {
      el.style.display = 'none';
    });
  }
  for (const t of [200, 600, 1500, 3000]) setTimeout(hideUpstreamUI, t);

  // ─── stdin response queue (JSPI mode) ──────────────────────────────
  // Each Suspending wrapper invocation calls awaitStdinFromParent(),
  // which pushes a resolver onto this queue and sends 'input-request'
  // to the parent. The parent's onInputRequest callback responds with
  // 'input-response' which pops and resolves. One pending read at a time;
  // wasm doesn't issue two parallel reads.
  const _stdinResolvers = [];
  window.addEventListener('message', (ev) => {
    const msg = ev.data;
    if (!msg || typeof msg !== 'object') return;
    if (msg.type === 'input-response') {
      const r = _stdinResolvers.shift();
      if (r) r(typeof msg.text === 'string' ? msg.text : null);
    }
  });

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

      // emcc's own compile-time logging is noisy (ANSI-coloured INFO
      // lines). Strip those for the student.
      const ANSI_RE       = /\x1b\[[0-9;]*m/g;
      const EMSC_NOISE_RE = /^[a-z_]+:(INFO|DEBUG):/;
      function cleanCompilerLog(text) {
        const noAnsi = String(text).replace(ANSI_RE, '');
        const kept = noAnsi.split('\n').filter(l => !EMSC_NOISE_RE.test(l));
        return kept.join('\n');
      }
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
        const { id, code, stdin = '', flags = '-O0', mode = 'preinput' } = msg;

        activeRunId = id;
        try {
          await em.fileSystem.writeFile('/working/main.c', String(code));
          // Compile flags:
          //   - SINGLE_FILE: inline wasm so we can run it directly in-iframe
          //   - EXIT_RUNTIME: get a proper exit code from main()
          //   - FORCE_FILESYSTEM: keep _malloc/HEAPU8 etc. exported
          //   - NO -fexceptions: JS-based invoke_* trampolines insert JS
          //     frames between wasm frames, which JSPI cannot suspend
          //     through. Default no-exception libc++ is fine for plain C
          //     stdin/stdout programs.
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
          // Tell the parent that compilation has succeeded and the
          // compiled program is about to start. The parent uses this to
          // print a "[compiled — running]" divider between compile log
          // and program output (matches the emception_l demo UX).
          notifyParent({ type: 'runtime-start', id });
          await runCompiledJs(id, jsBytes, { stdin, mode });
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

  /* ============================================================
   * Run compiled emcc output.
   *
   * Both modes patch WebAssembly.instantiate/instantiateStreaming for
   * the duration of one run (restored in finish()) to:
   *
   *   a) Replace fd_write / __syscall_writev / __syscall_write for
   *      fd 1 & 2 with direct calls to onStdout/onStderr. This
   *      bypasses emcc's TTY line-buffer, so `printf("Name? ")`
   *      with NO trailing '\n' shows immediately — without this the
   *      prompt stays trapped in emcc's internal line buffer until
   *      a newline appears, and the student sees the cursor waiting
   *      for input before the question text shows up.
   *
   *   b) (JSPI mode only) Replace fd_read / __syscall_read /
   *      __syscall_readv / __syscall_pread64 for fd 0 with a
   *      `new WebAssembly.Suspending(asyncFn)` that posts
   *      'input-request' to the parent and awaits 'input-response'.
   *      Once the imports are wrapped, the instance's entry export
   *      (__main_argc_argv / _main / main) is itself wrapped with
   *      WebAssembly.promising — without that, the Suspending
   *      import throws "no active suspender" when wasm calls it.
   *
   * (a) applies to both modes for a consistent print-prompt UX.
   * (b) applies only to JSPI; preinput mode uses sync Module.stdin
   * draining the pre-filled buffer.
   * ============================================================ */
  function runCompiledJs(id, jsCode, { stdin = '', mode = 'preinput' } = {}) {
    return new Promise((resolveOuter) => {
      let runFinished = false;
      let patchedWA = false;

      // Save WebAssembly originals so we can restore.
      const origInst       = WebAssembly.instantiate;
      const origInstStream = WebAssembly.instantiateStreaming;

      function restoreWA() {
        if (!patchedWA) return;
        WebAssembly.instantiate = origInst;
        if (origInstStream) WebAssembly.instantiateStreaming = origInstStream;
        patchedWA = false;
      }
      function finishRun(exitCode, error) {
        if (runFinished) return;
        runFinished = true;
        restoreWA();
        notifyParent({ type: 'done', id, exitCode: exitCode | 0, error });
        resolveOuter();
      }

      // If JSPI was requested but engine doesn't have it, warn and
      // gracefully degrade to sync EOF stdin (no popup).
      const useJspi = mode === 'jspi' && HAS_JSPI;
      if (mode === 'jspi' && !HAS_JSPI) {
        notifyParent({ type: 'stderr', id,
          text: '[警告] 当前浏览器不支持 JSPI，交互输入不可用。请使用 Chrome 137+ 或开启「预输入模式」。\n' });
      }

      // ─── stdin sources ───
      // Preinput: a fixed buffer of bytes drained sync.
      // JSPI:     awaitStdinFromParent() per blocked read.
      let preInputBuffer = mode === 'preinput'
        ? Array.from(new TextEncoder().encode(String(stdin)))
        : [];
      const initialStdinEmpty = (mode === 'preinput') && preInputBuffer.length === 0;
      let stdinExhaustedWarned = false;

      function awaitStdinFromParent() {
        return new Promise((resolve) => {
          _stdinResolvers.push(resolve);
          notifyParent({ type: 'input-request', id });
        });
      }

      // ─── Wasm import wrappers ────────────────────────────────────
      const enc = new TextEncoder();
      const dec = new TextDecoder();

      let promisingMain = null;

      function readIov(iov, iovcnt) {
        const H8  = self.Module && self.Module.HEAPU8;
        const H32 = self.Module && self.Module.HEAP32;
        if (!H8 || !H32) return new Uint8Array();
        const parts = [];
        let total = 0;
        for (let i = 0; i < iovcnt; i++) {
          const ptr = H32[(iov >> 2) + i * 2];
          const len = H32[(iov >> 2) + i * 2 + 1] | 0;
          parts.push(H8.subarray(ptr, ptr + len));
          total += len;
        }
        const out = new Uint8Array(total);
        let off = 0;
        for (const p of parts) { out.set(p, off); off += p.length; }
        return out;
      }
      function writeBytesToIovs(bytes, iov, iovcnt) {
        const H8  = self.Module && self.Module.HEAPU8;
        const H32 = self.Module && self.Module.HEAP32;
        if (!H8 || !H32) return 0;
        let written = 0;
        for (let i = 0; i < iovcnt && written < bytes.length; i++) {
          const ptr = H32[(iov >> 2) + i * 2];
          const len = H32[(iov >> 2) + i * 2 + 1] | 0;
          const n   = Math.min(len, bytes.length - written);
          H8.set(bytes.subarray(written, written + n), ptr);
          written += n;
        }
        return written;
      }

      // Stdout/stderr bypass: same for both modes, non-suspending.
      function wrapStdoutImports(imports) {
        if (!imports) return;
        const env  = imports.env;
        const wasi = imports.wasi_snapshot_preview1;

        function syncReplace(ns, name, impl) {
          if (!ns) return;
          const fn = ns[name];
          if (typeof fn !== 'function' || fn.__patched) return;
          impl.__patched = true;
          ns[name] = impl;
        }

        if (env && typeof env.__syscall_writev === 'function') {
          const orig = env.__syscall_writev;
          syncReplace(env, '__syscall_writev', function (fd, iov, iovcnt) {
            if (fd !== 1 && fd !== 2) return orig(fd, iov, iovcnt);
            const bytes = readIov(iov, iovcnt);
            const s = dec.decode(bytes);
            notifyParent({ type: fd === 1 ? 'stdout' : 'stderr', id, text: s });
            return bytes.length;
          });
        }
        if (env && typeof env.__syscall_write === 'function') {
          const orig = env.__syscall_write;
          syncReplace(env, '__syscall_write', function (fd, buf, count) {
            if (fd !== 1 && fd !== 2) return orig(fd, buf, count);
            const H8 = self.Module && self.Module.HEAPU8;
            if (!H8) return 0;
            const s = dec.decode(H8.subarray(buf, buf + (count | 0)));
            notifyParent({ type: fd === 1 ? 'stdout' : 'stderr', id, text: s });
            return count | 0;
          });
        }
        if (wasi && typeof wasi.fd_write === 'function') {
          const orig = wasi.fd_write;
          syncReplace(wasi, 'fd_write', function (fd, iovs, iovs_len, nwritten_out) {
            if (fd !== 1 && fd !== 2) return orig(fd, iovs, iovs_len, nwritten_out);
            const bytes = readIov(iovs, iovs_len);
            const s = dec.decode(bytes);
            notifyParent({ type: fd === 1 ? 'stdout' : 'stderr', id, text: s });
            const H32 = self.Module && self.Module.HEAP32;
            if (H32) H32[nwritten_out >> 2] = bytes.length;
            return 0;
          });
        }
      }

      // Stdin JSPI wrap — only when useJspi.
      function wrapStdinImportsJspi(imports) {
        if (!useJspi || !imports) return;
        const env  = imports.env;
        const wasi = imports.wasi_snapshot_preview1;

        function wrap(ns, name, suspendingImpl) {
          if (!ns) return;
          const fn = ns[name];
          if (typeof fn !== 'function' || fn.__patched) return;
          const wrapped = new WebAssembly.Suspending(suspendingImpl(fn));
          wrapped.__patched = true;
          ns[name] = wrapped;
        }

        wrap(env, '__syscall_read', (orig) => async function (fd, buf, count) {
          if (fd !== 0) return orig(fd, buf, count);
          const text  = await awaitStdinFromParent();
          const bytes = enc.encode(text == null ? '' : text);
          const n = Math.min(bytes.length, count | 0);
          const H8 = self.Module && self.Module.HEAPU8;
          if (H8) H8.set(bytes.subarray(0, n), buf);
          return n;
        });
        wrap(env, '__syscall_readv', (orig) => async function (fd, iov, iovcnt) {
          if (fd !== 0) return orig(fd, iov, iovcnt);
          const text  = await awaitStdinFromParent();
          const bytes = enc.encode(text == null ? '' : text);
          return writeBytesToIovs(bytes, iov, iovcnt);
        });
        wrap(env, '__syscall_pread64', (orig) => async function (fd, buf, count, ol, oh) {
          if (fd !== 0) return orig(fd, buf, count, ol, oh);
          const text  = await awaitStdinFromParent();
          const bytes = enc.encode(text == null ? '' : text);
          const n = Math.min(bytes.length, count | 0);
          const H8 = self.Module && self.Module.HEAPU8;
          if (H8) H8.set(bytes.subarray(0, n), buf);
          return n;
        });
        wrap(wasi, 'fd_read', (orig) => async function (fd, iovs, iovs_len, nread) {
          if (fd !== 0) return orig(fd, iovs, iovs_len, nread);
          const text  = await awaitStdinFromParent();
          const bytes = enc.encode(text == null ? '' : text);
          const written = writeBytesToIovs(bytes, iovs, iovs_len);
          const H32 = self.Module && self.Module.HEAP32;
          if (H32) H32[nread >> 2] = written;
          return 0;
        });
      }

      function setupPromisingEntry(instance) {
        if (!useJspi || promisingMain) return;
        const ex = instance && instance.exports;
        if (!ex) return;
        const entry = ex.__main_argc_argv || ex._main || ex.main;
        if (entry) promisingMain = WebAssembly.promising(entry);
      }

      // ─── Patch WebAssembly.instantiate ───
      WebAssembly.instantiate = function patched(binOrMod, imports) {
        try { wrapStdoutImports(imports); }   catch (e) { console.warn('[c] stdout wrap:', e); }
        try { wrapStdinImportsJspi(imports); } catch (e) { console.warn('[c] stdin wrap:',  e); }
        const p = origInst.call(WebAssembly, binOrMod, imports);
        return p.then((res) => {
          const inst = (res && res.instance) ? res.instance : res;
          try { setupPromisingEntry(inst); } catch (e) { console.warn('[c] promising:', e); }
          return res;
        });
      };
      if (origInstStream) {
        WebAssembly.instantiateStreaming = function patched(source, imports) {
          try { wrapStdoutImports(imports); }   catch (e) {}
          try { wrapStdinImportsJspi(imports); } catch (e) {}
          const p = origInstStream.call(WebAssembly, source, imports);
          return p.then((res) => {
            try { setupPromisingEntry(res.instance); } catch (e) {}
            return res;
          });
        };
      }
      patchedWA = true;

      // ─── Module config ───
      const Module = {
        // JSPI: we drive main ourselves so the call site is inside a
        // WebAssembly.promising frame.
        // Preinput: let emcc call main normally; finish via onExit.
        noInitialRun:    useJspi,
        noExitRuntime:   useJspi,

        // print/printErr are emcc's line-buffered callbacks. With our
        // fd_write bypass installed they should NEVER fire — but keep
        // them as a defensive fallback in case the wrap missed an import.
        print:    (s) => notifyParent({ type: 'stdout', id, text: s + '\n' }),
        printErr: (s) => notifyParent({ type: 'stderr', id, text: s + '\n' }),

        // Sync stdin: drains pre-filled buffer (preinput) or returns EOF
        // immediately (JSPI — should never be called since reads are
        // intercepted at the import level, but defends against TTY
        // fallback paths and prevents window.prompt() popups).
        stdin: function () {
          if (preInputBuffer.length > 0) return preInputBuffer.shift();
          if (!useJspi && initialStdinEmpty && !stdinExhaustedWarned) {
            stdinExhaustedWarned = true;
            notifyParent({ type: 'stderr', id,
              text: '\n[stdin] 程序请求读取，但 stdin 输入框是空的 — 预填输入后再运行，或关闭"预输入模式"开关用交互输入。\n' });
          }
          return null;
        },

        onExit:  (status) => { if (!useJspi) finishRun(status | 0); },
        onAbort: (msg) => finishRun(-1, String(msg || 'aborted')),

        // Preinput mode runs main via emcc's default flow → onExit fires.
        // JSPI mode disables initial run; we call main ourselves here.
        postRun: useJspi ? [function () {
          const Mod = this;
          (async function () {
            let argv0 = 0, argv = 0;
            try {
              const nameBytes = new TextEncoder().encode('a.out\0');
              argv0 = Mod._malloc(nameBytes.length);
              Mod.HEAPU8.set(nameBytes, argv0);
              argv  = Mod._malloc(8);
              Mod.HEAP32[ argv      >> 2 ] = argv0;
              Mod.HEAP32[(argv + 4) >> 2 ] = 0;
            } catch (_) { argv0 = 0; argv = 0; }

            try {
              let exit = 0;
              try {
                if (promisingMain) exit = (await promisingMain(argv ? 1 : 0, argv)) | 0;
                else if (Mod._main) exit = Mod._main(argv ? 1 : 0, argv) | 0;
              } catch (e) {
                if (e && typeof e === 'object' && 'status' in e) exit = e.status | 0;
                else throw e;
              } finally {
                if (argv0) try { Mod._free(argv0); } catch (_) {}
                if (argv)  try { Mod._free(argv);  } catch (_) {}
              }
              finishRun(exit);
            } catch (e) {
              finishRun(-1, e && (e.stack || e.message) || e);
            }
          })();
        }] : undefined,
      };

      // emcc 3.1.24 with SINGLE_FILE emits a script that mutates a
      // global `Module`. Stash so the wrappers can reach HEAPU8 etc.
      self.Module = Module;
      try {
        const fn = new Function('Module', jsCode);
        fn(Module);
      } catch (e) {
        if (!runFinished) finishRun(-1, 'Run failed: ' + String(e.message || e));
      }
    });
  }
})();
