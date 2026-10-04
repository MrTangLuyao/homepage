/* ============================================================
 * lib/daily/daily.js
 * Daily themes. "Be the One." is the page every day; some days of
 * the year also remember someone. A theme lives in its own folder,
 * lib/daily/<name>/, as theme.js (the day's lines, note and credit)
 * next to its cover image. Days that are not in CALENDAR keep the
 * default cover from lib/design/louie.css and the manifesto frame.
 *
 * Covers come in two kinds:
 *   scene     a landscape that fills the hero  { dark, light, position }
 *   portrait  a person: on wide screens the photo stands on the right
 *             at full height, on tall screens it sits at the top and
 *             the hero moves below it          { portrait, ratio, mono, ground }
 *             (ground = the page colour the photo dissolves into; match
 *             it to the photo's own backdrop, default #0a0a0a)
 *
 * Loaded synchronously in <head> so the cover is in place before the
 * first paint. Preview any day with ?day=MM-DD.
 * ============================================================ */
(function () {
  'use strict';

  /* MM-DD → theme folder. Every entry repeats each year. */
  const CALENDAR = {
    '10-05': 'jobs'   // Steve Jobs, 1955 – 2011
  };

  /* The site's day follows Louie's clock, so every visitor sees the
     same theme on the same day. */
  const TIME_ZONE = 'Australia/Melbourne';

  const root = document.documentElement;
  const self = document.currentScript;

  function siteDay() {
    try {
      const q = new URLSearchParams(location.search).get('day') || '';
      const m = q.match(/^(?:(\d{4})-)?(\d{2}-\d{2})$/);
      if (m) return { year: m[1] ? +m[1] : new Date().getFullYear(), day: m[2] };
    } catch (_) { /* fall through to the clock */ }
    try {
      const parts = {};
      new Intl.DateTimeFormat('en-US', {
        timeZone: TIME_ZONE, year: 'numeric', month: '2-digit', day: '2-digit'
      }).formatToParts(new Date()).forEach(p => { parts[p.type] = p.value; });
      return { year: +parts.year, day: `${parts.month}-${parts.day}` };
    } catch (_) {
      const d = new Date();
      const pad = n => String(n).padStart(2, '0');
      return { year: d.getFullYear(), day: `${pad(d.getMonth() + 1)}-${pad(d.getDate())}` };
    }
  }

  const { year, day } = siteDay();
  const name = CALENDAR[day] || null;
  const dir = name && self ? new URL(`${name}/`, self.src).href : null;
  let theme = null;

  /* A copy value is a string (same in every language) or { zh, en }. */
  const pick = (v, lang) => v == null ? '' : typeof v === 'string' ? v : (v[lang] ?? '');

  function applyCover(cover) {
    const url = p => `url("${new URL(p, dir).href}")`;
    const set = (k, v) => root.style.setProperty(k, v);
    if (cover.portrait) {
      root.dataset.cover = 'portrait';
      if (cover.mono) root.dataset.coverMono = '';
      set('--cover-dark', 'none');
      set('--cover-light', 'none');
      set('--cover-photo', url(cover.portrait));
      if (cover.ratio) set('--cover-ratio', String(cover.ratio));
      if (cover.ground) set('--cover-ground', cover.ground);
      return;
    }
    if (cover.dark) set('--cover-dark', url(cover.dark));
    if (cover.light || cover.dark) set('--cover-light', url(cover.light || cover.dark));
    if (cover.position) set('--cover-pos', cover.position);
  }

  window.LouieDaily = {
    year, day, name,
    get theme() { return theme; },

    /* Called by lib/daily/<name>/theme.js while <head> is still parsing. */
    define(t) {
      theme = t;
      root.dataset.daily = name;
      if (t.cover) applyCover(t.cover);
    },

    /* Called by the page whenever its language is applied. The day's
       lines are built once and only re-worded afterwards, so their
       scroll reveal does not replay on a language switch. */
    render(lang) {
      if (!theme) return;
      const note = document.getElementById('daily-note');
      if (note) note.textContent = pick(theme.note, lang);

      const credit = document.querySelector('[data-i18n-html="bg-credit"]');
      if (credit && theme.credit) credit.innerHTML = pick(theme.credit, lang);

      const host = document.getElementById('daily-lines');
      if (!host || !theme.lines) return;
      if (!host.children.length) {
        theme.lines.forEach(l => {
          const p = document.createElement('p');
          p.className = `mf-line ${l.cls || ''}`.trim();
          host.appendChild(p);
        });
      }
      theme.lines.forEach((l, i) => { host.children[i].innerHTML = pick(l, lang); });
    }
  };

  /* Pull in the day's theme right here in <head>, ahead of the body. */
  if (dir) document.write(`<script src="${dir}theme.js"><\/script>`);
})();
