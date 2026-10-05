/* ============================================================
 * lib/daily/daily.js
 * Daily themes. About one day in three remembers someone: the hero
 * becomes "Be the One." with their portrait, and their words join the
 * manifesto. Each theme lives in its own folder, lib/daily/<slug>/, as
 * theme.js plus its portrait. Days that are not in CALENDAR keep the
 * original hero, the default cover and just the manifesto frame.
 *
 * A theme.js only states facts; this file turns them into the page:
 *
 *   LouieDaily.define({
 *     name: 'Alan Turing',             // as the person wrote it
 *     born: 1912, died: 1954,
 *     marks: 'birth',                  // 'birth' | 'death'
 *     event: { year, zh, en },         // instead of marks: an event, {n} = years
 *     note: { zh, en },                // instead of marks/event: a fixed line
 *     cite: { zh, en },                // optional; default "— name（born – died）"
 *     lines: [{ zh, en }],             // the person's own words
 *     cover: { portrait: 'portrait.jpg', ratio: w / h, mono: true },
 *     credit: { title, author, license, licenseUrl, source }
 *   });
 *
 * Portrait covers: on wide screens the photo stands on the right at
 * full height; on tall screens it sits at the top and the hero moves
 * below it. A scene cover ({ dark, light, position }) fills the hero.
 *
 * Loaded synchronously in <head> so the cover is in place before the
 * first paint. Preview any day with ?day=MM-DD.
 * ============================================================ */
(function () {
  'use strict';

  /* MM-DD → theme folder. Every entry repeats each year; 02-29 only
     shows in leap years. Older dates follow the calendar of the time
     (Bach, Leonardo and Dürer were born under the Julian calendar). */
  const CALENDAR = {
    '01-01': 'grace-hopper',
    '01-04': 'isaac-newton',
    '01-08': 'stephen-hawking',
    '01-10': 'david-bowie',
    '01-12': 'sergei-korolev',
    '01-14': 'kurt-godel',
    '01-17': 'ryuichi-sakamoto',
    '01-19': 'hedy-lamarr',
    '01-22': 'sergei-eisenstein',
    '01-24': 'marvin-minsky',
    '01-27': 'wolfgang-amadeus-mozart',
    '01-30': 'douglas-engelbart',
    '02-06': 'francois-truffaut',
    '02-08': 'jules-verne',
    '02-11': 'thomas-edison',
    '02-13': 'wang-xuan',
    '02-15': 'galileo-galilei',
    '02-18': 'michelangelo',
    '02-20': 'ansel-adams',
    '02-22': 'andy-warhol',
    '02-24': 'claude-shannon',
    '02-26': 'jef-raskin',
    '02-29': 'herman-hollerith',
    '03-03': 'alexander-graham-bell',
    '03-07': 'stanley-kubrick',
    '03-11': 'jcr-licklider',
    '03-14': 'albert-einstein',
    '03-17': 'john-backus',
    '03-19': 'arthur-c-clarke',
    '03-21': 'johann-sebastian-bach',
    '03-24': 'gordon-moore',
    '03-30': 'vincent-van-gogh',
    '04-02': 'zhang-daqian',
    '04-04': 'andrei-tarkovsky',
    '04-06': 'igor-stravinsky',
    '04-09': 'frank-lloyd-wright',
    '04-12': 'yuri-gagarin',
    '04-15': 'leonardo-da-vinci',
    '04-18': 'edgar-codd',
    '04-20': 'joan-miro',
    '04-23': 'ray-tomlinson',
    '04-25': 'guglielmo-marconi',
    '04-29': 'alfred-hitchcock',
    '05-02': 'satyajit-ray',
    '05-04': 'keith-haring',
    '05-06': 'orson-welles',
    '05-11': 'richard-feynman',
    '05-16': 'i-m-pei',
    '05-19': 'gary-kildall',
    '05-21': 'albrecht-durer',
    '05-23': 'robert-moog',
    '05-26': 'miles-davis',
    '05-30': 'agnes-varda',
    '06-03': 'robert-noyce',
    '06-07': 'prince',
    '06-10': 'antoni-gaudi',
    '06-13': 'james-clerk-maxwell',
    '06-17': 'm-c-escher',
    '06-19': 'blaise-pascal',
    '06-23': 'alan-turing',
    '06-29': 'paul-klee',
    '07-01': 'gottfried-wilhelm-leibniz',
    '07-07': 'joseph-marie-jacquard',
    '07-10': 'nikola-tesla',
    '07-13': 'frida-kahlo',
    '07-20': 'neil-armstrong',
    '07-22': 'edward-hopper',
    '07-25': 'rosalind-franklin',
    '07-28': 'marcel-duchamp',
    '07-30': 'ingmar-bergman',
    '08-04': 'frances-allen',
    '08-06': 'edsger-dijkstra',
    '08-09': 'louie',
    '08-12': 'jean-michel-basquiat',
    '08-19': 'orville-wright',
    '08-22': 'henri-cartier-bresson',
    '08-26': 'katherine-johnson',
    '08-29': 'wu-guanzhong',
    '09-02': 'andy-grove',
    '09-04': 'john-mccarthy',
    '09-06': 'akira-kurosawa',
    '09-10': 'gunpei-yokoi',
    '09-16': 'qi-baishi',
    '09-18': 'jimi-hendrix',
    '09-22': 'michael-faraday',
    '09-25': 'glenn-gould',
    '09-28': 'seymour-cray',
    '10-05': 'steve-jobs',
    '10-09': 'john-lennon',
    '10-12': 'dennis-ritchie',
    '10-15': 'paul-allen',
    '10-19': 'auguste-lumiere',
    '10-25': 'pablo-picasso',
    '10-29': 'arpanet',
    '10-31': 'zaha-hadid',
    '11-02': 'george-boole',
    '11-07': 'marie-curie',
    '11-09': 'carl-sagan',
    '11-12': 'hua-luogeng',
    '11-14': 'claude-monet',
    '11-17': 'soichiro-honda',
    '11-20': 'edwin-hubble',
    '11-24': 'freddie-mercury',
    '11-26': 'norbert-wiener',
    '12-03': 'jean-luc-godard',
    '12-06': 'satoru-iwata',
    '12-08': 'georges-melies',
    '12-10': 'ada-lovelace',
    '12-13': 'wassily-kandinsky',
    '12-15': 'walt-disney',
    '12-18': 'konrad-zuse',
    '12-22': 'srinivasa-ramanujan',
    '12-26': 'charles-babbage',
    '12-28': 'john-von-neumann',
    '12-31': 'henri-matisse'
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
  const slug = CALENDAR[day] || null;
  const dir = slug && self ? new URL(`${slug}/`, self.src).href : null;
  let theme = null;

  /* A copy value is a string (same in every language) or { zh, en }. */
  const pick = (v, lang) => v == null ? '' : typeof v === 'string' ? v : (v[lang] ?? '');

  /* 15 → 十五, 105 → 一百零五, 574 → 五百七十四. */
  function zhNum(n) {
    const d = '零一二三四五六七八九';
    if (n < 10) return d[n];
    if (n < 20) return '十' + (n % 10 ? d[n % 10] : '');
    const units = ['', '十', '百', '千'];
    const s = String(n);
    let out = '', gap = false;
    for (let i = 0; i < s.length; i++) {
      const v = +s[i];
      if (!v) { gap = true; continue; }
      if (gap && out) out += '零';
      gap = false;
      out += d[v] + units[s.length - 1 - i];
    }
    return out;
  }

  function note(t, lang) {
    if (t.note) return pick(t.note, lang);
    if (t.event) {
      const n = year - t.event.year;
      return pick(t.event, lang).replace('{n}', lang === 'zh' ? zhNum(n) : String(n));
    }
    if (!t.marks) return '';
    const span = lang === 'zh' ? `（${t.born} – ${t.died}）` : ` (${t.born} – ${t.died})`;
    const n = year - (t.marks === 'birth' ? t.born : t.died);
    if (lang === 'zh') return `今天，纪念 ${t.name}${span}${t.marks === 'birth' ? '诞辰' : '逝世'}${zhNum(n)}周年`;
    return t.marks === 'birth'
      ? `Today, celebrating ${t.name}${span}, born ${n} years ago`
      : `Today, remembering ${t.name}${span}, ${n} years on`;
  }

  function cite(t, lang) {
    if (t.cite) return pick(t.cite, lang);
    if (!t.name) return '';
    if (!t.born) return `— ${t.name}`;
    return lang === 'zh' ? `— ${t.name}（${t.born} – ${t.died}）` : `— ${t.name} (${t.born} – ${t.died})`;
  }

  function credit(c, lang) {
    const a = (href, text) => href ? `<a href="${href}" target="_blank" rel="noopener">${text}</a>` : text;
    const pd = /^public domain$/i.test(c.license);
    if (lang === 'zh') {
      const lic = pd ? '属于公有领域' : `以 ${a(c.licenseUrl, c.license)} 授权`;
      return `今日封面 <em>${c.title}</em>，${c.author}，${lic}，来自 ${a(c.source, 'Wikimedia Commons')}，经裁切和黑白处理。`;
    }
    const lic = pd ? 'public domain' : `licensed ${a(c.licenseUrl, c.license)}`;
    return `Today’s cover: <em>${c.title}</em> by ${c.author}, ${lic}, via ${a(c.source, 'Wikimedia Commons')}, cropped and shown in black and white.`;
  }

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
    year, day, slug, zhNum,
    get theme() { return theme; },

    /* Called by lib/daily/<slug>/theme.js while <head> is still parsing. */
    define(t) {
      theme = t;
      root.dataset.daily = slug;
      if (t.cover) applyCover(t.cover);
    },

    /* Called by the page whenever its language is applied. The day's
       lines are built once and only re-worded afterwards, so their
       scroll reveal does not replay on a language switch. */
    render(lang) {
      if (!theme) return;
      const noteEl = document.getElementById('daily-note');
      if (noteEl) noteEl.textContent = note(theme, lang);

      const creditEl = document.querySelector('[data-i18n-html="bg-credit"]');
      if (creditEl && theme.credit) creditEl.innerHTML = credit(theme.credit, lang);

      const host = document.getElementById('daily-lines');
      if (!host || !theme.lines) return;
      const lines = theme.lines.map(l => ({ cls: l.cls || '', text: pick(l, lang) }));
      const by = cite(theme, lang);
      if (by) lines.push({ cls: 'mf-cite', text: by });
      if (!host.children.length) {
        lines.forEach(l => {
          const p = document.createElement('p');
          p.className = `mf-line ${l.cls}`.trim();
          host.appendChild(p);
        });
      }
      lines.forEach((l, i) => { host.children[i].innerHTML = l.text; });
    }
  };

  /* Pull in the day's theme right here in <head>, ahead of the body. */
  if (dir) document.write(`<script src="${dir}theme.js"><\/script>`);
})();
