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
 *     headline: { lead, pre, one },    // optional; instead of "Be the" / "One";
 *                                      // pre sits before the lit word
 *     lines: [{ zh, en }],             // the person's own words
 *     cover: { portrait: 'portrait.jpg', ratio: w / h, mono: true },
 *     credit: { title, author, license, licenseUrl, source }
 *                                      // or { zh, en } for a line as is
 *   });
 *
 * Birthdays use a ready-made template instead: a festive hero with
 * fireworks (party.js) and "Happy Birthday, <name>." as the headline,
 * or "Happy Birthday to Me." with me: true. Only name is required; any
 * define() field (cover, credit, note, lines, headline…) overrides it.
 *
 *   LouieDaily.birthday({
 *     name: 'Louie', me: true,
 *     cover: { figure: 'figure.webp', ratio: 661 / 1185 },
 *     credit: { zh, en }
 *   });
 *
 * Portrait covers: on wide screens the photo stands on the right at
 * full height; on tall screens it sits at the top and the hero moves
 * below it. A figure cover ({ figure, ratio }) is a cut-out with a
 * transparent background, set on the page as is (party days). A scene
 * cover ({ dark, light, position }) fills the hero.
 *
 * Loaded synchronously in <head> so the cover is in place before the
 * first paint. Preview any day with ?day=MM-DD; picker.js lists every
 * themed day (each folder's thumb.jpg) behind the hero's "每日主题".
 * ============================================================ */
(function () {
  'use strict';

  /* MM-DD → [theme folder, name for the picker, 0 when there is no
     portrait, 'color' when its picker thumb stays in colour]. Every
     entry repeats each year; 02-29 only shows in leap years. Older
     dates follow the calendar of the time (Bach, Leonardo and Dürer
     were born under the Julian calendar). */
  const CALENDAR = {
    '01-01': ['grace-hopper', 'Grace Hopper'],
    '01-04': ['isaac-newton', 'Isaac Newton'],
    '01-08': ['stephen-hawking', 'Stephen Hawking'],
    '01-10': ['david-bowie', 'David Bowie'],
    '01-12': ['sergei-korolev', 'Сергей Королёв'],
    '01-14': ['kurt-godel', 'Kurt Gödel'],
    '01-17': ['ryuichi-sakamoto', '坂本龍一'],
    '01-19': ['hedy-lamarr', 'Hedy Lamarr'],
    '01-22': ['sergei-eisenstein', 'Сергей Эйзенштейн'],
    '01-24': ['marvin-minsky', 'Marvin Minsky'],
    '01-27': ['wolfgang-amadeus-mozart', 'Wolfgang Amadeus Mozart'],
    '01-30': ['douglas-engelbart', 'Douglas Engelbart'],
    '02-06': ['francois-truffaut', 'François Truffaut'],
    '02-08': ['jules-verne', 'Jules Verne'],
    '02-11': ['thomas-edison', 'Thomas Edison'],
    '02-13': ['wang-xuan', '王选', 0],
    '02-15': ['galileo-galilei', 'Galileo Galilei'],
    '02-18': ['michelangelo', 'Michelangelo Buonarroti'],
    '02-20': ['ansel-adams', 'Ansel Adams'],
    '02-22': ['andy-warhol', 'Andy Warhol'],
    '02-24': ['claude-shannon', 'Claude Shannon'],
    '02-26': ['jef-raskin', 'Jef Raskin'],
    '02-29': ['herman-hollerith', 'Herman Hollerith'],
    '03-03': ['alexander-graham-bell', 'Alexander Graham Bell'],
    '03-07': ['stanley-kubrick', 'Stanley Kubrick'],
    '03-11': ['jcr-licklider', 'J. C. R. Licklider'],
    '03-14': ['albert-einstein', 'Albert Einstein'],
    '03-17': ['john-backus', 'John Backus', 0],
    '03-19': ['arthur-c-clarke', 'Arthur C. Clarke'],
    '03-21': ['johann-sebastian-bach', 'Johann Sebastian Bach'],
    '03-24': ['gordon-moore', 'Gordon Moore'],
    '03-30': ['vincent-van-gogh', 'Vincent van Gogh'],
    '04-02': ['zhang-daqian', '张大千', 0],
    '04-04': ['andrei-tarkovsky', 'Андрей Тарковский'],
    '04-06': ['igor-stravinsky', 'Игорь Стравинский'],
    '04-09': ['frank-lloyd-wright', 'Frank Lloyd Wright'],
    '04-12': ['yuri-gagarin', 'Юрий Гагарин'],
    '04-15': ['leonardo-da-vinci', 'Leonardo da Vinci'],
    '04-18': ['edgar-codd', 'Edgar F. Codd', 0],
    '04-20': ['joan-miro', 'Joan Miró'],
    '04-23': ['ray-tomlinson', 'Ray Tomlinson'],
    '04-25': ['guglielmo-marconi', 'Guglielmo Marconi'],
    '04-29': ['alfred-hitchcock', 'Alfred Hitchcock'],
    '05-02': ['satyajit-ray', 'সত্যজিৎ রায়'],
    '05-04': ['keith-haring', 'Keith Haring'],
    '05-06': ['orson-welles', 'Orson Welles'],
    '05-11': ['richard-feynman', 'Richard Feynman'],
    '05-16': ['i-m-pei', '贝聿铭'],
    '05-19': ['gary-kildall', 'Gary Kildall', 0],
    '05-21': ['albrecht-durer', 'Albrecht Dürer'],
    '05-23': ['robert-moog', 'Robert Moog'],
    '05-26': ['miles-davis', 'Miles Davis'],
    '05-30': ['agnes-varda', 'Agnès Varda'],
    '06-03': ['robert-noyce', 'Robert Noyce'],
    '06-07': ['prince', 'Prince'],
    '06-10': ['antoni-gaudi', 'Antoni Gaudí'],
    '06-13': ['james-clerk-maxwell', 'James Clerk Maxwell'],
    '06-17': ['m-c-escher', 'M. C. Escher'],
    '06-19': ['blaise-pascal', 'Blaise Pascal'],
    '06-23': ['alan-turing', 'Alan Turing'],
    '06-29': ['paul-klee', 'Paul Klee'],
    '07-01': ['gottfried-wilhelm-leibniz', 'Gottfried Wilhelm Leibniz'],
    '07-07': ['joseph-marie-jacquard', 'Joseph Marie Jacquard'],
    '07-10': ['nikola-tesla', 'Nikola Tesla'],
    '07-13': ['frida-kahlo', 'Frida Kahlo'],
    '07-20': ['neil-armstrong', 'Neil Armstrong'],
    '07-22': ['edward-hopper', 'Edward Hopper'],
    '07-25': ['rosalind-franklin', 'Rosalind Franklin'],
    '07-28': ['marcel-duchamp', 'Marcel Duchamp'],
    '07-30': ['ingmar-bergman', 'Ingmar Bergman'],
    '08-04': ['frances-allen', 'Frances Allen'],
    '08-06': ['edsger-dijkstra', 'Edsger W. Dijkstra'],
    '08-09': ['louie', 'Louie', 'color'],
    '08-12': ['jean-michel-basquiat', 'Jean-Michel Basquiat'],
    '08-19': ['orville-wright', 'Orville Wright'],
    '08-22': ['henri-cartier-bresson', 'Henri Cartier-Bresson'],
    '08-26': ['katherine-johnson', 'Katherine Johnson'],
    '08-29': ['wu-guanzhong', '吴冠中', 0],
    '09-02': ['andy-grove', 'Andy Grove'],
    '09-04': ['john-mccarthy', 'John McCarthy'],
    '09-06': ['akira-kurosawa', '黒澤明'],
    '09-10': ['gunpei-yokoi', '横井軍平'],
    '09-16': ['qi-baishi', '齐白石', 0],
    '09-18': ['jimi-hendrix', 'Jimi Hendrix'],
    '09-22': ['michael-faraday', 'Michael Faraday'],
    '09-25': ['glenn-gould', 'Glenn Gould'],
    '09-28': ['seymour-cray', 'Seymour Cray'],
    '10-05': ['steve-jobs', 'Steve Jobs'],
    '10-09': ['john-lennon', 'John Lennon'],
    '10-12': ['dennis-ritchie', 'Dennis Ritchie'],
    '10-15': ['paul-allen', 'Paul Allen'],
    '10-19': ['auguste-lumiere', 'Auguste Lumière'],
    '10-25': ['pablo-picasso', 'Pablo Picasso'],
    '10-29': ['arpanet', 'ARPANET'],
    '10-31': ['zaha-hadid', 'Zaha Hadid'],
    '11-02': ['george-boole', 'George Boole'],
    '11-07': ['marie-curie', 'Marie Skłodowska-Curie'],
    '11-09': ['carl-sagan', 'Carl Sagan'],
    '11-12': ['hua-luogeng', '华罗庚', 0],
    '11-14': ['claude-monet', 'Claude Monet'],
    '11-17': ['soichiro-honda', '本田宗一郎'],
    '11-20': ['edwin-hubble', 'Edwin Hubble'],
    '11-24': ['freddie-mercury', 'Freddie Mercury'],
    '11-26': ['norbert-wiener', 'Norbert Wiener'],
    '12-03': ['jean-luc-godard', 'Jean-Luc Godard'],
    '12-06': ['satoru-iwata', '岩田聡'],
    '12-08': ['georges-melies', 'Georges Méliès'],
    '12-10': ['ada-lovelace', 'Ada Lovelace'],
    '12-13': ['wassily-kandinsky', 'Василий Кандинский'],
    '12-15': ['walt-disney', 'Walt Disney'],
    '12-18': ['konrad-zuse', 'Konrad Zuse'],
    '12-22': ['srinivasa-ramanujan', 'Srinivasa Ramanujan'],
    '12-26': ['charles-babbage', 'Charles Babbage'],
    '12-28': ['john-von-neumann', 'John von Neumann'],
    '12-31': ['henri-matisse', 'Henri Matisse']
  };

  /* The site's day follows Louie's clock, so every visitor sees the
     same theme on the same day. */
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

  /* ?day=MM-DD (or YYYY-MM-DD) shows another day, e.g. from the picker. */
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
  const entry = CALENDAR[day] || null;
  const slug = entry ? entry[0] : null;
  const dir = slug ? new URL(`${slug}/`, base || location.href).href : null;
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

  /* "今天" / "Today" becomes the date when looking at another day. */
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];
  function note(t, lang) {
    const line = noteToday(t, lang);
    if (!previewing) return line;
    const [m, d] = day.split('-').map(Number);
    return lang === 'zh'
      ? line.replace(/^今天/, `${m} 月 ${d} 日`)
      : line.replace(/^Today/, `${MONTHS[m - 1]} ${d}`);
  }

  function noteToday(t, lang) {
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
    if (!c.source) return pick(c, lang);
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
    if (cover.figure) {
      root.dataset.cover = 'figure';
      set('--cover-photo', url(cover.figure));
      if (cover.ratio) set('--cover-ratio', String(cover.ratio));
      return;
    }
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
    today: today.day, todayYear: today.year, previewing, base,
    calendar: CALENDAR,
    get theme() { return theme; },

    /* Called by lib/daily/<slug>/theme.js while <head> is still parsing. */
    define(t) {
      theme = t;
      root.dataset.daily = slug;
      if (t.cover) applyCover(t.cover);
      if (t.party) {
        root.dataset.party = '';
        const s = document.createElement('script');
        s.src = `${base}party.js`;
        document.head.appendChild(s);
      }
    },

    /* The birthday template: see the note at the top of this file. */
    birthday(b) {
      const n = b.name;
      this.define(Object.assign({
        party: true,
        headline: b.me
          ? { lead: 'Happy Birthday', pre: 'to', one: 'Me' }
          : { lead: 'Happy Birthday,', one: n },
        note: { zh: `今天是 ${n} 的生日`, en: `Today is ${n}’s birthday` },
        lines: [b.me
          ? { cls: 'mf-strong', zh: '祝我生日快乐', en: 'Happy birthday to me.' }
          : { cls: 'mf-strong', zh: `祝 ${n} 生日快乐`, en: `Happy birthday, ${n}.` }],
        cite: b.me ? `— ${n}` : '— Louie'
      }, b));
    },

    /* Called by the page whenever its language is applied. The day's
       lines are built once and only re-worded afterwards, so their
       scroll reveal does not replay on a language switch. */
    render(lang) {
      if (!theme) return;
      const title = document.querySelector('.hero-title');
      if (title && theme.headline) {
        const pre = pick(theme.headline.pre, lang);
        title.querySelector('.ht-lead').textContent = pick(theme.headline.lead, lang);
        title.querySelector('.ht-pre').textContent = pre ? `${pre} ` : '';
        title.querySelector('.hero-one').textContent = pick(theme.headline.one, lang);
        title.classList.add('is-set');
      }
      const noteEl = document.getElementById('daily-note');
      if (noteEl) noteEl.textContent = note(theme, lang);

      const creditEl = document.querySelector('[data-i18n-html="bg-credit"]');
      if (creditEl && theme.credit) creditEl.innerHTML = credit(theme.credit, lang);
      else if (creditEl && theme.party && !theme.cover) creditEl.hidden = true;   // no wallpaper to credit

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
