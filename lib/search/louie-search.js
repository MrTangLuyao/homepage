/* ============================================================
 * louie-search.js — the louie1.com search, embeddable anywhere.
 *
 * One line on any site:
 *   <script defer src="https://louie1.com/lib/search/louie-search.js"></script>
 * → ⌘K (mac) / Ctrl+K (win) opens the search overlay.
 *
 * Sources:
 *   · built-in louie.* sites / projects / social links
 *   · blog posts, fetched live from blog.louie1.com's librarian
 *     indexes (a blog update is searchable immediately)
 *   · https://louie1.com/search/extra_content.json — hand-curated
 *     extras (schema: search/README.md)
 *
 * Zero dependencies; UI in Shadow DOM so host styles are untouched.
 * Theme matches louie1.com (lib/design/louie.css tokens).
 * Icons: Lucide (https://lucide.dev, ISC) — see lib/icons/lucide/.
 * Interaction patterns inspired by Raycast / cmdk.
 *
 * API: LouieSearch.open()/.close()/.toggle()/.setLang('zh'|'en')
 *      LouieSearch.configure({...}) / .prefetch()
 * ============================================================ */
(function () {
  'use strict';
  if (window.LouieSearch) return;

  /* ─── Environment ─── */
  const IS_MAC = /Mac|iPhone|iPad/.test(navigator.platform);
  const MOD = IS_MAC ? '⌘' : 'Ctrl';
  /* Exact-host match only: subdomains (blog.louie1.com …) must NOT get
     relative links to homepage pages. Local dev of other sites should set
     data-home-origin explicitly. */
  const AT_HOME = /^(www\.)?louie1\.com$/.test(location.hostname)
    || location.protocol === 'file:'
    || /^(localhost|127\.0\.0\.1)$/.test(location.hostname);

  const cfg = {
    lang: null,                                   // null → auto
    hotkey: true,
    placeholder: null,
    homeOrigin: AT_HOME ? '' : 'https://louie1.com',
    blogDataBase: 'https://blog.louie1.com/blog/blog_data',
    blogOrigin: 'https://blog.louie1.com',
    learnOrigin: 'https://learn.louie1.com',
    recentPosts: 3,
    localItems: [],                               // host-provided extra items
    onLangSwitch: null                            // host hook: (nextLang) => void
  };

  let lang = null;
  function curLang() {
    if (cfg.lang) return cfg.lang;
    if (lang) return lang;
    try { const s = localStorage.getItem('louie-lang'); if (s === 'zh' || s === 'en') return (lang = s); } catch (e) {}
    return (lang = navigator.language.toLowerCase().includes('zh') ? 'zh' : 'en');
  }
  function T(v) {
    if (v == null) return '';
    if (typeof v === 'string') return v;
    return v[curLang()] || v.zh || v.en || '';
  }

  const UI = {
    placeholder: { zh: '试试 ' + MOD + ' K 搜索', en: 'Try ' + MOD + ' K to search' },
    empty: { zh: '未找到「{q}」', en: 'No results for “{q}”' },
    gSites: { zh: 'louie. 站点', en: 'louie. sites' },
    gBlog: { zh: '博客', en: 'Blog' },
    gRecent: { zh: '最新文章', en: 'Recent posts' },
    gProjects: { zh: '项目', en: 'Projects' },
    gSocial: { zh: '社交', en: 'Social' },
    gCourses: { zh: '课程', en: 'Courses' },
    gLessons: { zh: '课时', en: 'Lessons' },
    gActions: { zh: '操作', en: 'Actions' }
  };

  /* Icons: Lucide v0.525.0 (https://lucide.dev) — ISC License.
     Downloaded to lib/icons/lucide/, inlined here verbatim. */
  const ICONS = {
  "book-open": "<path d=\"M12 7v14\" /><path d=\"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z\" />",
  "clock": "<path d=\"M12 6v6l4 2\" /><circle cx=\"12\" cy=\"12\" r=\"10\" />",
  "code-xml": "<path d=\"m18 16 4-4-4-4\" /><path d=\"m6 8-4 4 4 4\" /><path d=\"m14.5 4-5 16\" />",
  "dna": "<path d=\"m10 16 1.5 1.5\" /><path d=\"m14 8-1.5-1.5\" /><path d=\"M15 2c-1.798 1.998-2.518 3.995-2.807 5.993\" /><path d=\"m16.5 10.5 1 1\" /><path d=\"m17 6-2.891-2.891\" /><path d=\"M2 15c6.667-6 13.333 0 20-6\" /><path d=\"m20 9 .891.891\" /><path d=\"M3.109 14.109 4 15\" /><path d=\"m6.5 12.5 1 1\" /><path d=\"m7 18 2.891 2.891\" /><path d=\"M9 22c1.798-1.998 2.518-3.995 2.807-5.993\" />",
  "file-text": "<path d=\"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z\" /><path d=\"M14 2v4a2 2 0 0 0 2 2h4\" /><path d=\"M10 9H8\" /><path d=\"M16 13H8\" /><path d=\"M16 17H8\" />",
  "folder": "<path d=\"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z\" />",
  "github": "<path d=\"M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4\" /><path d=\"M9 18c-4.51 2-5-2-7-2\" />",
  "house": "<path d=\"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8\" /><path d=\"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\" />",
  "joystick": "<path d=\"M21 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2Z\" /><path d=\"M6 15v-2\" /><path d=\"M12 15V9\" /><circle cx=\"12\" cy=\"6\" r=\"3\" />",
  "languages": "<path d=\"m5 8 6 6\" /><path d=\"m4 14 6-6 2-3\" /><path d=\"M2 5h12\" /><path d=\"M7 2h1\" /><path d=\"m22 22-5-10-5 10\" /><path d=\"M14 18h6\" />",
  "layers": "<path d=\"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z\" /><path d=\"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12\" /><path d=\"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17\" />",
  "link": "<path d=\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71\" /><path d=\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71\" />",
  "message-circle": "<path d=\"M7.9 20A9 9 0 1 0 4 16.1L2 22Z\" />",
  "notebook-pen": "<path d=\"M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4\" /><path d=\"M2 6h4\" /><path d=\"M2 10h4\" /><path d=\"M2 14h4\" /><path d=\"M2 18h4\" /><path d=\"M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z\" />",
  "palette": "<path d=\"M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z\" /><circle cx=\"13.5\" cy=\"6.5\" r=\".5\" fill=\"currentColor\" /><circle cx=\"17.5\" cy=\"10.5\" r=\".5\" fill=\"currentColor\" /><circle cx=\"6.5\" cy=\"12.5\" r=\".5\" fill=\"currentColor\" /><circle cx=\"8.5\" cy=\"7.5\" r=\".5\" fill=\"currentColor\" />",
  "search": "<path d=\"m21 21-4.34-4.34\" /><circle cx=\"11\" cy=\"11\" r=\"8\" />",
  "tv": "<path d=\"m17 2-5 5-5-5\" /><rect width=\"20\" height=\"15\" x=\"2\" y=\"7\" rx=\"2\" />"
};

  function iconSvg(name) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
      + (ICONS[name] || ICONS.link) + '</svg>';
  }

  /* ─── Built-in items ─── */
  function homeHref(p) { return cfg.homeOrigin ? cfg.homeOrigin + '/' + p.replace('index.html', '') : p; }

  function coreItems() {
    return [
      { g: UI.gSites, icon: 'house', title: 'louie.home', sub: { zh: '主页', en: 'Home' }, hint: 'louie1.com', url: homeHref('index.html'), kw: 'home 主页 首页 louie portfolio' },
      { g: UI.gSites, icon: 'notebook-pen', title: 'louie.blog', sub: { zh: '双语博客', en: 'Bilingual blog' }, hint: 'blog.louie1.com', url: cfg.blogOrigin + '/', kw: 'blog 博客 双语 文章 posts' },
      { g: UI.gSites, icon: 'code-xml', title: 'louie.learn', sub: { zh: '在线编程练习场', en: 'Coding playground' }, hint: 'learn.louie1.com', url: 'https://learn.louie1.com', kw: 'learn 学习 编程 练习 sql python playground' },
      { g: UI.gSites, icon: 'palette', title: 'louie.design', sub: { zh: '主页设计的幕后', en: 'Behind the homepage' }, hint: 'louie1.com/design', url: homeHref('design.html'), kw: 'design 设计 壁纸 wallpaper' },
      { g: UI.gSites, icon: 'joystick', title: 'louie.95', sub: { zh: "复古 '95 风格实验", en: "A retro '95 throwback" }, hint: 'louie1.com/95', url: homeHref('95.html'), kw: '95 retro windows 复古 怀旧' },
      { g: UI.gProjects, icon: 'folder', title: 'opendrop', sub: { zh: '一个模仿 AirPortal 空投快传的开源网站', en: 'An open-source imitation of AirPortal website' }, hint: 'github.com', url: 'https://github.com/MrTangLuyao/opendrop', newTab: true, kw: 'opendrop airportal 空投 快传 开源 文件' },
      { g: UI.gProjects, icon: 'code-xml', title: 'louie.learn', sub: { zh: '一个在线学习编程平台', en: 'An online programming learning platform' }, hint: 'learn.louie1.com', url: 'https://learn.louie1.com', kw: 'learn 学习 编程平台' },
      { g: UI.gProjects, icon: 'clock', title: 'Jetlag Commander', sub: { zh: '科学时差调节系统', en: 'Scientific jetlag adjustment' }, hint: 'jetlag.louie1.com', url: 'https://jetlag.louie1.com', newTab: true, kw: 'jetlag 时差 circadian' },
      { g: UI.gProjects, icon: 'message-circle', title: 'Sync Station', sub: { zh: '聊天交互式文件分享工具', en: 'Chat-style file sharing tool' }, hint: 'github.com', url: 'https://github.com/Cohenjikan/sync-station', newTab: true, kw: 'sync station 文件 分享' },
      { g: UI.gProjects, icon: 'dna', title: 'PrimerScore Web', sub: { zh: 'PCR 引物设计工具的网页实现', en: 'Web-based PCR primer design tool' }, hint: 'github.com', url: 'https://github.com/TH-Chen-CN/PrimerScore', newTab: true, kw: 'primer pcr 引物 生物' },
      { g: UI.gSocial, icon: 'github', title: 'GitHub', sub: '@mrtangluyao', hint: 'github.com', url: 'https://github.com/mrtangluyao/', newTab: true, kw: 'github 开源 code' },
      { g: UI.gSocial, icon: 'tv', title: 'Bilibili', sub: '@古怪的路易', hint: 'bilibili.com', url: 'https://space.bilibili.com/501015028', newTab: true, kw: 'bilibili b站 视频' },
      { g: UI.gSocial, icon: 'book-open', title: { zh: '小红书', en: 'Xiaohongshu' }, sub: '@古怪的路易', hint: 'xiaohongshu', url: 'https://xhslink.com/m/7yaJ9ssWxsW', newTab: true, kw: 'xiaohongshu xhs rednote 小红书' },
      { g: UI.gSocial, icon: 'link', title: { zh: 'Cohen 的主页', en: "Cohen's Homepage" }, sub: 'cohenjikan.com', hint: { zh: '友链', en: 'friend' }, url: 'https://cohenjikan.com', newTab: true, kw: 'cohen friend 友链 朋友' }
    ];
  }

  /* ─── Actions — language switch stays in sync with the host page ─── */
  function switchLang() {
    const next = curLang() === 'zh' ? 'en' : 'zh';
    if (typeof cfg.onLangSwitch === 'function') {
      cfg.onLangSwitch(next);          /* host flips its own UI, then calls setLang */
    } else {
      lang = next; cfg.lang = null;
      try { localStorage.setItem('louie-lang', next); } catch (e) {}
    }
    if (overlayIns) overlayIns.render();
  }

  function actionItems() {
    return [
      { g: UI.gActions, icon: 'languages', title: { zh: '切换语言 · English', en: '切换语言 · 中文' }, run: switchLang, keepOpen: true, kw: 'language 语言 切换 english 中文 translate 设置 settings' },
      { g: UI.gActions, icon: 'github', title: { zh: '查看本站源码', en: 'View site source' }, hint: 'github.com', url: 'https://github.com/MrTangLuyao/homepage', newTab: true, kw: 'source 源码 repo github homepage' }
    ].concat(cfg.localItems || []);
  }

  /* ─── Remote items: blog librarians + extra_content.json ─── */
  let remoteItems = [];
  let recentItems = [];
  let fetched = false;

  function blogEntryToItem(entry, collectionSlug) {
    const path = collectionSlug ? collectionSlug + '/' + entry.slug : entry.slug;
    return {
      g: UI.gBlog, icon: 'file-text',
      title: entry.title || entry.slug,
      sub: entry.excerpt || '',
      hint: entry.date || '',
      url: cfg.blogOrigin + '/#/' + path,
      kw: (entry.tags || []).join(' ') + ' blog 博客 文章 post',
      date: entry.date || ''
    };
  }

  async function fetchJson(url) {
    const r = await fetch(url, { mode: 'cors' });
    if (!r.ok) throw new Error(r.status);
    return r.json();
  }

  async function loadRemote() {
    if (fetched) return;
    fetched = true;
    const items = [];

    const CK = 'louie-search-cache-v1';
    try {
      const c = JSON.parse(sessionStorage.getItem(CK));
      if (c && Date.now() - c.t < 30 * 60 * 1000) {
        remoteItems = c.items;
        finishRemote();
        return;
      }
    } catch (e) {}

    try {
      const head = await fetchJson(cfg.blogDataBase + '/head_librarian.json');
      const collections = [];
      (head.entries || []).forEach(en => {
        if (en.kind === 'post') items.push(blogEntryToItem(en));
        else if (en.kind === 'collection') {
          items.push({
            g: UI.gBlog, icon: 'layers',
            title: en.title || en.slug,
            sub: en.excerpt || '',
            hint: { zh: '合集', en: 'collection' },
            url: cfg.blogOrigin + '/#/' + en.slug,
            kw: (en.tags || []).join(' ') + ' blog 博客 合集 collection',
            date: en.date || ''
          });
          collections.push(en.slug);
        }
      });
      await Promise.allSettled(
        collections.map(slug => fetchJson(cfg.blogDataBase + '/' + slug + '/librarian.json')
          .then(lib => (lib.entries || []).forEach(en => {
            if (en.kind === 'post') items.push(blogEntryToItem(en, slug));
          })))
      );
    } catch (e) { /* offline / CORS — built-ins still work */ }

    /* learn — courses AND every lesson, via the broadcast index that
       `tools/build-search-broadcast.mjs` (learn repo) regenerates from
       each course's own data. Falls back to manifest.js (courses only)
       if the broadcast file is missing. */
    try {
      const bc = await fetchJson(cfg.learnOrigin + '/learn/learn_data/search_broadcast.json');
      (bc.courses || []).forEach(c => {
        items.push({
          g: UI.gCourses, icon: 'code-xml',
          title: c.title || c.slug,
          sub: c.desc || '',
          hint: c.level || '',
          url: cfg.learnOrigin + '/#' + c.slug,
          kw: c.slug + ' learn course 课程 教程 练习 lesson'
        });
        (c.lessons || []).forEach(l => {
          items.push({
            g: UI.gLessons, icon: 'code-xml',
            title: l.title,
            sub: l.chapter || c.title || '',
            hint: c.slug + ' · ' + l.id,
            url: cfg.learnOrigin + '/#' + c.slug + '/' + l.id,
            kw: c.slug + ' ' + (l.slug || '') + ' learn lesson 课时 练习'
          });
        });
        if (c.playground) {
          items.push({
            g: UI.gCourses, icon: 'code-xml',
            title: c.playground.title || 'Playground',
            sub: c.title || '',
            hint: c.slug,
            url: cfg.learnOrigin + '/#' + c.slug + '/playground',
            kw: c.slug + ' playground 练习场 沙盒 自定义'
          });
        }
      });
    } catch (e) {
      /* broadcast missing — fall back to the course manifest */
      try {
        let manifest = window.__LEARN_MANIFEST;
        if (!manifest) {
          const r = await fetch(cfg.learnOrigin + '/learn/learn_data/manifest.js', { mode: 'cors' });
          if (!r.ok) throw new Error(r.status);
          const sandbox = {};
          new Function('window', (await r.text()) + '\n;return window.__LEARN_MANIFEST;')(sandbox);
          manifest = sandbox.__LEARN_MANIFEST;
        }
        ((manifest && manifest.courses) || []).forEach(c => {
          if (c.coming) return;
          items.push({
            g: UI.gCourses, icon: 'code-xml',
            title: c.title || c.slug,
            sub: c.desc || '',
            hint: c.level || '',
            url: cfg.learnOrigin + '/#' + c.slug,
            kw: c.slug + ' learn course 课程 教程 练习 lesson'
          });
        });
      } catch (e2) { /* learn unreachable — skip */ }
    }

    try {
      const extra = await fetchJson((cfg.homeOrigin || '') + '/search/extra_content.json');
      (extra.items || []).forEach(it => {
        items.push({
          g: it.group || { zh: '更多', en: 'More' },
          icon: it.icon || 'link',
          title: it.title || '', sub: it.sub || '',
          hint: it.hint || '', url: it.url || '#',
          newTab: it.newTab !== false, kw: it.kw || ''
        });
      });
    } catch (e) {}

    remoteItems = items;
    try { sessionStorage.setItem(CK, JSON.stringify({ t: Date.now(), items })); } catch (e) {}
    finishRemote();
  }

  function finishRemote() {
    recentItems = remoteItems
      .filter(it => it.icon === 'file-text' && it.date)
      .sort((a, b) => (a.date < b.date ? 1 : -1))
      .slice(0, cfg.recentPosts)
      .map(it => Object.assign({}, it, { g: UI.gRecent }));
    if (overlayIns) overlayIns.render();
  }

  /* ─── Scoring — simplified take on cmdk's command-score ─── */
  function fieldScore(hay, q) {
    if (!hay) return 0;
    if (hay === q) return 1;
    if (hay.startsWith(q)) return 0.9;
    const esc = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (new RegExp('[\\s./·#-]' + esc).test(hay)) return 0.8;
    if (hay.includes(q)) return 0.6;
    let i = 0;
    for (const ch of hay) { if (ch === q[i]) i++; if (i === q.length) break; }
    return i === q.length && q.length > 1 ? 0.25 : 0;
  }
  function both(v) {
    if (v == null) return '';
    if (typeof v === 'string') return v;
    return (v.zh || '') + ' ' + (v.en || '');
  }
  function itemScore(item, tokens) {
    let total = 0;
    for (const tok of tokens) {
      const s = Math.max(
        fieldScore(both(item.title).toLowerCase(), tok),
        fieldScore((item.kw || '').toLowerCase(), tok) * 0.9,
        fieldScore((both(item.sub) + ' ' + both(item.hint)).toLowerCase(), tok) * 0.7
      );
      if (!s) return 0;
      total += s;
    }
    return total / tokens.length;
  }

  /* ─── Styles — louie.css tokens, kept minimal ─── */
  const STYLE = `
    :host { all: initial; }
    * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
    .root {
      font-family: 'JetBrains Mono', 'HarmonyOS Sans', 'PingFang SC', 'Microsoft YaHei', sans-serif;
      font-size: 15px; line-height: 1.6; color: #e8e8e8;
    }
    kbd {
      font: inherit; font-size: 11px; color: #a1a1a0;
      background: #333332; border: 1px solid #3a3a39;
      border-radius: 6px; padding: 1px 7px;
    }
    .overlay { position: fixed; inset: 0; z-index: 2147483000; }
    .overlay[hidden] { display: none; }
    .backdrop {
      position: absolute; inset: 0;
      background: rgba(0, 0, 0, 0.55);
      backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px);
    }
    .panel {
      position: relative;
      width: min(560px, calc(100vw - 28px));
      margin: clamp(56px, 16vh, 160px) auto 0;
      background: #2a2a29;
      border: 1px solid #3a3a39;
      border-radius: 16px;
      box-shadow: 0 24px 64px rgba(0, 0, 0, 0.5);
      overflow: hidden;
      animation: in 0.16s ease-out;
    }
    @keyframes in { from { opacity: 0; transform: translateY(-6px); } }
    .inputrow { display: flex; align-items: center; gap: 12px; padding: 14px 16px; }
    .inputrow > svg { width: 18px; height: 18px; color: #a1a1a0; flex-shrink: 0; }
    input {
      flex: 1; min-width: 0; font: inherit; font-size: 15px;
      color: #e8e8e8; background: none; border: none; outline: none; padding: 0;
    }
    input::placeholder { color: rgba(161, 161, 160, 0.7); }
    .keys { display: flex; gap: 5px; flex-shrink: 0; }
    .list {
      max-height: min(380px, 48vh); overflow-y: auto;
      padding: 6px;
      border-top: 1px solid #3a3a39;
      overscroll-behavior: contain;
      scrollbar-width: thin; scrollbar-color: #4a4a49 transparent;
    }
    .group {
      font-size: 10.5px; font-weight: 500; letter-spacing: 0.14em;
      text-transform: uppercase; color: rgba(161, 161, 160, 0.75);
      padding: 11px 12px 4px; user-select: none;
    }
    .item {
      position: relative; overflow: hidden;
      display: flex; align-items: center; gap: 12px;
      padding: 9px 12px; border-radius: 10px; cursor: pointer;
    }
    .item:hover { background: #333332; }
    .item.sel { background: rgba(217, 119, 87, 0.15); }
    .ic { width: 18px; height: 18px; flex-shrink: 0; color: #a1a1a0; }
    .ic svg { width: 18px; height: 18px; display: block; }
    .item.sel .ic { color: #ffb49d; }
    .tx { flex: 1; min-width: 0; display: flex; align-items: baseline; gap: 9px; }
    .ti {
      font-size: 14px; font-weight: 600; color: #e8e8e8;
      white-space: nowrap; flex-shrink: 0;
      max-width: 75%; overflow: hidden; text-overflow: ellipsis;
    }
    .item.sel .ti { color: #ffb49d; }
    .su {
      font-size: 12px; color: #a1a1a0;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 0;
    }
    .hi {
      font-size: 11px; color: rgba(161, 161, 160, 0.6);
      white-space: nowrap; flex-shrink: 0;
    }
    .empty { padding: 24px 14px; text-align: center; color: #a1a1a0; font-size: 13px; }
    @media (hover: none) { .keys, .hi { display: none; } }
    .ripple {
      position: absolute; border-radius: 50%; transform: scale(0);
      animation: ripple 520ms linear; pointer-events: none;
      background: rgba(255, 255, 255, 0.12);
    }
    @keyframes ripple { to { transform: scale(4); opacity: 0; } }
    @media (prefers-reduced-motion: reduce) {
      .panel { animation: none; }
      .ripple { display: none; }
    }
  `;

  /* ─── Helpers ─── */
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function rippleAt(el, x, y) {
    const d = Math.max(el.clientWidth, el.clientHeight);
    const r = el.getBoundingClientRect();
    const s = document.createElement('span');
    s.className = 'ripple';
    s.style.cssText = 'width:' + d + 'px;height:' + d + 'px;left:' + (x - r.left - d / 2) + 'px;top:' + (y - r.top - d / 2) + 'px;';
    const old = el.querySelector('.ripple');
    if (old) old.remove();
    el.appendChild(s);
  }

  /* ─── Overlay ─── */
  let overlayIns = null;

  function buildOverlay() {
    const host = document.createElement('div');
    host.id = 'louie-search-host';
    document.body.appendChild(host);
    const shadow = host.attachShadow({ mode: 'open' });
    const root = document.createElement('div');
    root.className = 'root';
    root.innerHTML =
      '<div class="overlay" hidden><div class="backdrop"></div><div class="panel">'
      + '<div class="inputrow">' + iconSvg('search')
      + '<input type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" aria-label="Search">'
      + '<span class="keys"><kbd>esc</kbd></span>'
      + '</div>'
      + '<div class="list" role="listbox"></div>'
      + '</div></div>';
    const style = document.createElement('style');
    style.textContent = STYLE;
    shadow.append(style, root);

    const ov = root.querySelector('.overlay');
    const input = root.querySelector('input');
    const list = root.querySelector('.list');

    let visible = [];
    let sel = 0;

    function defaultItems() {
      const sites = coreItems().filter(it => it.g === UI.gSites);
      return sites.concat(recentItems, actionItems());
    }
    function allItems() {
      return coreItems().concat(remoteItems, actionItems());
    }

    function render() {
      const raw = input.value.trim().toLowerCase();
      const tokens = raw.split(/\s+/).filter(Boolean);
      visible = tokens.length
        ? allItems()
            .map(item => ({ item, s: itemScore(item, tokens) }))
            .filter(x => x.s > 0)
            .sort((a, b) => b.s - a.s)
            .map(x => x.item)
        : defaultItems();
      sel = Math.min(sel, Math.max(0, visible.length - 1));

      input.placeholder = T(cfg.placeholder || UI.placeholder);

      if (!visible.length) {
        list.innerHTML = '<div class="empty">' + esc(T(UI.empty)).replace('{q}', esc(input.value.trim())) + '</div>';
        return;
      }
      let html = '';
      let lastG = null;
      visible.forEach((item, i) => {
        const gLabel = T(item.g);
        if (!tokens.length && gLabel !== lastG) {
          html += '<div class="group">' + esc(gLabel) + '</div>';
          lastG = gLabel;
        }
        const sub = T(item.sub);
        const hint = T(item.hint);
        html += '<div class="item' + (i === sel ? ' sel' : '') + '" data-i="' + i + '" role="option"' + (i === sel ? ' aria-selected="true"' : '') + '>'
          + '<span class="ic">' + iconSvg(item.icon) + '</span>'
          + '<span class="tx"><span class="ti">' + esc(T(item.title)) + '</span>'
          + (sub ? '<span class="su">' + esc(sub) + '</span>' : '') + '</span>'
          + (hint ? '<span class="hi">' + esc(hint) + '</span>' : '')
          + '</div>';
      });
      list.innerHTML = html;
      list.querySelectorAll('.item').forEach(el => {
        el.addEventListener('pointerdown', e => rippleAt(el, e.clientX, e.clientY));
        el.addEventListener('click', () => exec(visible[+el.dataset.i]));
        el.addEventListener('pointermove', () => {
          const i = +el.dataset.i;
          if (i !== sel) { sel = i; paint(); }
        });
      });
      const s = list.querySelector('.item.sel');
      if (s) s.scrollIntoView({ block: 'nearest' });
    }

    function paint() {
      list.querySelectorAll('.item').forEach(el => {
        const on = +el.dataset.i === sel;
        el.classList.toggle('sel', on);
        if (on) { el.setAttribute('aria-selected', 'true'); el.scrollIntoView({ block: 'nearest' }); }
        else el.removeAttribute('aria-selected');
      });
    }

    function exec(item) {
      if (!item) return;
      if (typeof item.run === 'function') {
        item.run();
        if (!item.keepOpen) close();
        return;
      }
      close();
      if (item.newTab) window.open(item.url, '_blank', 'noopener');
      else window.location.href = item.url;
    }

    function open() {
      loadRemote();
      ov.hidden = false;
      input.value = ''; sel = 0; render();
      input.focus();
    }
    function close() { ov.hidden = true; }

    input.addEventListener('input', () => { sel = 0; render(); });
    input.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        if (input.value) { input.value = ''; sel = 0; render(); }
        else close();
        return;
      }
      if (!visible.length) return;
      if (e.key === 'ArrowDown') { e.preventDefault(); sel = (sel + 1) % visible.length; paint(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); sel = (sel - 1 + visible.length) % visible.length; paint(); }
      else if (e.key === 'Enter') { e.preventDefault(); exec(visible[sel]); }
    });
    root.querySelector('.backdrop').addEventListener('click', close);

    return { open, close, render, isOpen: () => !ov.hidden };
  }

  function ensureOverlay() {
    if (!overlayIns) overlayIns = buildOverlay();
    return overlayIns;
  }

  /* ─── Hotkey ─── */
  let hotkeyBound = false;
  function bindHotkeys() {
    if (hotkeyBound) return;
    hotkeyBound = true;
    document.addEventListener('keydown', e => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const o = ensureOverlay();
        o.isOpen() ? o.close() : o.open();
      } else if (e.key === 'Escape' && overlayIns && overlayIns.isOpen()) {
        overlayIns.close();
      }
    });
  }

  /* ─── Public API ─── */
  window.LouieSearch = {
    version: '2.0.0',
    MOD: MOD,
    configure(opts) { Object.assign(cfg, opts || {}); if (overlayIns) overlayIns.render(); },
    open() { ensureOverlay().open(); },
    close() { if (overlayIns) overlayIns.close(); },
    toggle() { const o = ensureOverlay(); o.isOpen() ? o.close() : o.open(); },
    setLang(l) { if (l === 'zh' || l === 'en') { lang = l; cfg.lang = null; if (overlayIns) overlayIns.render(); } },
    prefetch: loadRemote
  };

  /* ─── Auto-init ─── */
  const me = document.currentScript;
  if (me) {
    if (me.dataset.blogDataBase) cfg.blogDataBase = me.dataset.blogDataBase;
    if (me.dataset.blogOrigin) cfg.blogOrigin = me.dataset.blogOrigin;
    if (me.dataset.homeOrigin) cfg.homeOrigin = me.dataset.homeOrigin;
    if (me.dataset.learnOrigin) cfg.learnOrigin = me.dataset.learnOrigin;
    if (me.dataset.lang) cfg.lang = me.dataset.lang;
    if (me.getAttribute('data-auto') === 'false') cfg.hotkey = false;
  }
  if (cfg.hotkey) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bindHotkeys);
    else bindHotkeys();
  }
})();
