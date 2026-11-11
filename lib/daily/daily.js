/* ============================================================
 * lib/daily/daily.js
 * Birthdays. On a day in CALENDAR the hero celebrates: a birthday
 * headline and note, a pixel-art avatar on a small stage with
 * fireworks (party.js) in place of the usual portrait, and a credit
 * in the footer. Every other day the page is left exactly as it is.
 *
 * Each birthday lives in its own folder, lib/daily/<slug>/, as
 * theme.js plus the avatar's sprite sheet. theme.js only states facts:
 *
 *   LouieDaily.birthday({
 *     name: 'Louie',
 *     me: true,                        // Louie's own: "to me"
 *     cover: { figure: 'figure.png', ratio: 43 / 53, frames: 32, fps: 8 },
 *     credit: { zh, en }               // one line in the footer
 *   });
 *
 * The sprite sheet holds every frame side by side on a transparent
 * ground; ratio is one frame's width / height. A headline or note
 * set there overrides the defaults below. A copy value is a string
 * (the same in every language) or { zh, en }.
 *
 * Loaded synchronously in <head>, so data-birthday and the avatar are
 * in place before the first paint. The day follows Louie's clock in
 * Melbourne; preview any day with ?day=MM-DD or ?day=YYYY-MM-DD.
 * ============================================================ */
(function () {
  'use strict';

  /* MM-DD → folder under lib/daily/. Repeats every year. */
  const CALENDAR = {
    '08-09': 'louie',
    '10-11': 'jimmy'
  };

  /* Every visitor sees the same day, wherever they are. */
  const TIME_ZONE = 'Australia/Melbourne';

  const root = document.documentElement;
  const self = document.currentScript;

  function clockDay() {
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

  function askedDay(today) {
    try {
      const q = new URLSearchParams(location.search).get('day') || '';
      const m = q.match(/^(?:(\d{4})-)?(\d{2}-\d{2})$/);
      if (m) return { year: m[1] ? +m[1] : today.year, day: m[2] };
    } catch (_) { /* no query support: show today */ }
    return today;
  }

  const today = clockDay();
  const { year, day } = askedDay(today);
  const previewing = day !== today.day;
  const base = self ? new URL('./', self.src).href : '';
  const slug = CALENDAR[day] || null;
  const dir = slug ? new URL(`${slug}/`, base || location.href).href : null;
  let theme = null;

  // Traditional Chinese falls back on the simplified text where a theme
  // has none of its own.
  const pick = (v, lang) => v == null ? '' : typeof v === 'string' ? v
    : (v[lang] ?? (lang === 'zh-Hant' ? v.zh : undefined) ?? '');

  /* "今天" / "Today" becomes the date when looking at another day. */
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];
  function note(t, lang) {
    const line = pick(t.note, lang);
    if (!previewing) return line;
    const [m, d] = day.split('-').map(Number);
    return lang.startsWith('zh')
      ? line.replace(/^今天/, `${m} 月 ${d} 日`)
      : line.replace(/^Today/, `${MONTHS[m - 1]} ${d}`);
  }

  /* The avatar is a CSS background on the stage; louie.css plays it. */
  function applyFigure(cover) {
    const set = (k, v) => root.style.setProperty(k, v);
    if (!cover || !cover.figure) return;
    const url = new URL(cover.figure, dir).href;
    set('--figure', `url("${url}")`);
    if (cover.ratio) set('--figure-ratio', String(cover.ratio));
    if (cover.frames > 1) {
      root.dataset.sprite = '';
      set('--figure-frames', String(cover.frames));
      set('--figure-fps', String(cover.fps || 8));
    }
    snapFigure(url, cover.frames > 1 ? cover.frames : 1);
  }

  /* Crisp scaling only looks even when every art pixel covers the same
     number of screen pixels, so the avatar's height (about 80% of the
     stage) is rounded to a whole number of them. The sheet is drawn at
     a whole scale, so a frame's art rows are its height over the
     largest block that divides both sides. */
  function snapFigure(url, frames) {
    const img = new Image();
    img.onload = () => {
      const gcd = (a, b) => b ? gcd(b, a % b) : a;
      const w = Math.round(img.naturalWidth / frames), h = img.naturalHeight;
      if (!w || !h) return;
      const artRows = h / gcd(w, h);
      const fit = () => {
        const stage = document.getElementById('party-stage');
        const fig = stage && stage.querySelector('.stage-figure');
        const room = stage ? stage.clientHeight : 0;
        if (!fig || !room) return;
        const dpr = window.devicePixelRatio || 1;
        const cell = Math.max(1, Math.round(0.8 * room * dpr / artRows));
        fig.style.height = `${cell * artRows / dpr}px`;
      };
      if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fit);
      else fit();
      addEventListener('resize', fit);             // breakpoints and zoom
    };
    img.src = url;
  }

  window.LouieDaily = {
    year, day, slug, previewing, base,
    today: today.day,
    calendar: CALENDAR,
    get theme() { return theme; },

    /* Called by lib/daily/<slug>/theme.js while <head> is still parsing. */
    birthday(b) {
      const n = b.name;
      theme = Object.assign({
        headline: b.me ? 'Happy birthday to me.' : `Happy birthday, ${n}.`,
        note: { zh: `今天是 ${n} 的生日`, 'zh-Hant': `今天是 ${n} 的生日`, en: `Today is ${n}’s birthday` }
      }, b);
      root.dataset.birthday = slug;
      applyFigure(theme.cover);
      const s = document.createElement('script');
      s.src = `${base}party.js`;
      document.head.appendChild(s);
    },

    /* Called by the page whenever its language is applied. */
    render(lang) {
      if (!theme) return;
      const title = document.getElementById('birthday-title');
      if (title) {
        title.textContent = pick(theme.headline, lang);
        title.classList.add('is-set');
      }
      const noteEl = document.getElementById('daily-note-text');
      if (noteEl) noteEl.textContent = note(theme, lang);

      const creditEl = document.getElementById('daily-credit');
      if (creditEl && theme.credit) {
        creditEl.innerHTML = pick(theme.credit, lang);
        creditEl.hidden = false;
      }
    }
  };

  /* Pull in the day's theme right here in <head>, ahead of the body. */
  if (dir) document.write(`<script src="${dir}theme.js"><\/script>`);
})();
