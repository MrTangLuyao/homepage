/* ============================================================
 * learn/learn-terminal.js
 *
 * Shared xterm-based terminal used by Python and C lessons /
 * playgrounds (SQL keeps its tabular output).
 *
 * Exposes (global):
 *   createLessonTerminal(container, opts?) → handle
 *
 * The returned handle:
 *   write(s)        — append text (ANSI codes pass through)
 *   writeErr(s)     — same, red
 *   writeMuted(s)   — same, dim italic-ish
 *   writePass(s)    — same, green bold
 *   reset()         — clear screen and reset state
 *   focus()         — focus the terminal
 *   awaitLine()     — Promise<string>: capture one user-typed line
 *   isAwaiting()    — true while awaitLine() is unresolved
 *   cancelAwait()   — resolve pending awaitLine() with '' (for abort cleanup)
 *   fit()           — recompute size to fit the container
 *   dispose()       — clean up the underlying xterm instance
 *
 * IMPORTANT design choice — lazy .open():
 *   xterm's open() touches DOM measurement code that misbehaves when the
 *   container is inside a display:none ancestor (typical for our tab
 *   panes, where output-tab is hidden until the user clicks Run). Worse,
 *   a synchronous throw from open() would tank the caller's setup —
 *   leaving buttons unwired and ensureC un-awaited.
 *
 *   So this helper DEFERS .open() until the container is actually
 *   visible (rect width/height > 0). Until then, write/reset/awaitLine
 *   queue into an in-memory buffer that gets flushed on real-open. A
 *   MutationObserver watches both the container and its ancestors for
 *   visibility changes (display, hidden attr, class toggles).
 *
 * Browser conversion gotchas:
 *   - xterm only renders CRLF, not bare LF. write() translates
 *     '\n' → '\r\n' so callers can ignore that.
 * ============================================================ */

(function () {
  'use strict';

  function createLessonTerminal(container, opts = {}) {
    if (typeof Terminal === 'undefined') {
      console.error('[lesson-terminal] xterm.js not loaded — include lib/runtime/xterm/xterm.min.js before learn-terminal.js');
      // Return a no-op handle so callers don't crash.
      return makeNoopHandle();
    }

    const term = new Terminal({
      convertEol: false,                 // we manage \n → \r\n ourselves
      cursorBlink: true,
      // Default xterm cursor is the wide block style we used in emception_l.
      // (cursorStyle:'bar' produces a slim caret — we explicitly do NOT
      // want that here, the block looks more "terminal".)
      fontFamily: opts.fontFamily || "'JetBrains Mono', ui-monospace, Menlo, monospace",
      fontSize:   opts.fontSize   || 13,
      lineHeight: 1.25,
      scrollback: 4000,
      // Match the emception_l demo palette verbatim so the look is the
      // same one the user already approved.
      theme: {
        background: '#252524',
        foreground: '#d4d4d4',
        cursor:     '#f4cf73',
        cursorAccent: '#252524',
        selectionBackground: 'rgba(244, 207, 115, 0.3)',
      },
    });

    let fit = null;
    if (typeof FitAddon !== 'undefined' && FitAddon.FitAddon) {
      try { fit = new FitAddon.FitAddon(); term.loadAddon(fit); }
      catch (e) { console.warn('[lesson-terminal] FitAddon load failed:', e); fit = null; }
    }

    // Pending writes accumulated before .open() succeeds.
    let opened = false;
    const pending = [];

    function tryOpen() {
      if (opened) return true;
      // Verify the container is in the DOM AND has non-zero measured size.
      if (!container || !container.isConnected) return false;
      const rect = container.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return false;
      try {
        term.open(container);
      } catch (e) {
        console.warn('[lesson-terminal] term.open failed:', e);
        return false;
      }
      opened = true;
      try { fit && fit.fit(); } catch (_) {}
      // Flush queued writes in order.
      for (const op of pending) {
        try { op(); } catch (e) { console.warn('[lesson-terminal] queued op failed:', e); }
      }
      pending.length = 0;
      return true;
    }

    // Try once immediately (most callers pass a visible container).
    tryOpen();

    // Watch for visibility changes — when the user switches tabs to
    // make the container visible, we open then.
    const ro = (typeof ResizeObserver === 'function') ? new ResizeObserver(() => {
      if (!opened) tryOpen();
      else { try { fit && fit.fit(); } catch (_) {} }
    }) : null;
    if (ro) try { ro.observe(container); } catch (_) {}

    // Backup: also watch ancestor display via MutationObserver — ResizeObserver
    // sometimes misses ancestor display:none → block transitions until a paint.
    const mo = (typeof MutationObserver === 'function') ? new MutationObserver(() => {
      if (!opened) tryOpen();
    }) : null;
    if (mo) try {
      let el = container;
      while (el) {
        mo.observe(el, { attributes: true, attributeFilter: ['style', 'class', 'hidden'] });
        el = el.parentElement;
      }
    } catch (_) {}

    function rawWriteImpl(s) {
      term.write(String(s).replace(/(?<!\r)\n/g, '\r\n'));
    }
    function enqueueOrWrite(s) {
      if (opened) { rawWriteImpl(s); }
      else if (tryOpen()) { rawWriteImpl(s); }
      else { pending.push(() => rawWriteImpl(s)); }
    }

    function write(s)      { if (s == null) return; enqueueOrWrite(String(s)); }
    function writeErr(s)   { write('\x1b[31m' + String(s) + '\x1b[0m'); }
    function writeMuted(s) { write('\x1b[2;3m' + String(s) + '\x1b[0m'); }
    function writePass(s)  { write('\x1b[1;32m' + String(s) + '\x1b[0m'); }
    // Cyan info line — matches the emception_l demo where compile commands
    // and the "[compiled — running]" / "[exit N]" markers used cyan.
    function writeInfo(s)  { write('\x1b[36m' + String(s) + '\x1b[0m'); }

    function reset() {
      if (!opened) { pending.length = 0; }
      else         { try { term.reset(); } catch (_) {} }
      curLine = '';
      if (pendingResolve) {
        const r = pendingResolve;
        pendingResolve = null;
        acceptingInput = false;
        r('');
      }
    }
    function focus() { try { term.focus(); } catch (_) {} }
    function fitNow() {
      // Callers invoke this when the output tab becomes visible. If the
      // terminal hasn't been opened yet (because it was first created
      // while its container was inside a display:none tab), this is the
      // most reliable moment to open it: the container now has real
      // dimensions. We retry one extra RAF in case layout hasn't flushed.
      if (!opened) {
        if (!tryOpen()) {
          requestAnimationFrame(() => {
            if (!opened) tryOpen();
            try { fit && fit.fit(); } catch (_) {}
          });
          return;
        }
      }
      try { fit && fit.fit(); } catch (_) {}
    }

    /* ── stdin line buffer ── */
    let curLine = '';
    let pendingResolve = null;
    let acceptingInput = false;

    term.onData((data) => {
      if (!acceptingInput) return;
      for (const ch of data) {
        const code = ch.charCodeAt(0);
        if (ch === '\r' || ch === '\n') {
          term.write('\r\n');
          const line = curLine;
          curLine = '';
          if (pendingResolve) {
            const r = pendingResolve;
            pendingResolve = null;
            acceptingInput = false;
            r(line);
          }
        } else if (code === 127 || code === 8) {
          if (curLine.length > 0) {
            curLine = curLine.slice(0, -1);
            term.write('\b \b');
          }
        } else if (code >= 32 && code < 127) {
          curLine += ch;
          term.write(ch);
        }
      }
    });

    function awaitLine() {
      // Ensure terminal is open before accepting input — without an open
      // terminal there's no onData event source.
      tryOpen();
      return new Promise((resolve) => {
        pendingResolve = resolve;
        acceptingInput = true;
        if (opened) focus();
      });
    }
    function isAwaiting() { return acceptingInput; }
    function cancelAwait() {
      if (pendingResolve) {
        const r = pendingResolve;
        pendingResolve = null;
        acceptingInput = false;
        r('');
      }
    }

    function dispose() {
      try { ro && ro.disconnect(); } catch (_) {}
      try { mo && mo.disconnect(); } catch (_) {}
      try { term.dispose(); } catch (_) {}
    }

    return {
      write, writeErr, writeMuted, writePass, writeInfo,
      reset, focus, fit: fitNow,
      awaitLine, isAwaiting, cancelAwait,
      dispose,
      _term: term,
    };
  }

  function makeNoopHandle() {
    const noop = () => {};
    return {
      write: noop, writeErr: noop, writeMuted: noop, writePass: noop, writeInfo: noop,
      reset: noop, focus: noop, fit: noop,
      awaitLine: () => Promise.resolve(''),
      isAwaiting: () => false,
      cancelAwait: noop,
      dispose: noop,
      _term: null,
    };
  }

  window.createLessonTerminal = createLessonTerminal;
})();
