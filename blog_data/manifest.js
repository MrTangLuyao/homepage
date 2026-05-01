/* ─────────────────────────────────────────────────────────────
   Louie's blog manifest — INDEX ONLY.

   Each post entry is metadata. The body lives in its own folder:
       blog_data/<slug>/post.zh.js
       blog_data/<slug>/post.en.js
   blog.html loads those on demand when the reader view opens a post.

   See blog_readme.md for the full schema and how to add a post.
   ───────────────────────────────────────────────────────────── */

window.__BLOG_MANIFEST = {
  version: 3,
  updated: '2026-05-02',
  posts: [

    {
      slug: 'sql-syntax-guide-1',
      date: '2026-05-02',
      title: {
        zh: 'SQL 基础语法 1',
        en: 'SQL Basic Syntax 1'
      },
      excerpt: {
        zh: 'SELECT · FROM · WHERE · 比较运算符 · AND/OR/NOT · IN · BETWEEN · LIKE · IS NULL · ORDER BY',
        en: 'SELECT · FROM · WHERE · Operators · AND/OR/NOT · IN · BETWEEN · LIKE · IS NULL · ORDER BY'
      },
      cover: 'cover.webp',
      tags: ['sql', 'guide'],
      readingTime: 20,
      lang: 'both'
    },

    {
      slug: 'sql-syntax-guide-2',
      date: '2026-05-02',
      title: {
        zh: 'SQL 基础语法 2',
        en: 'SQL Basic Syntax 2'
      },
      excerpt: {
        zh: 'LIMIT · DISTINCT · AS · JOIN · COUNT · GROUP BY · HAVING',
        en: 'LIMIT · DISTINCT · AS · JOIN · COUNT · GROUP BY · HAVING'
      },
      cover: 'cover.webp',
      tags: ['sql', 'guide'],
      readingTime: 22,
      lang: 'both'
    },

    {
      slug: 'sql-syntax-guide-3',
      date: '2026-05-02',
      title: {
        zh: 'SQL 基础语法 3',
        en: 'SQL Basic Syntax 3'
      },
      excerpt: {
        zh: '子查询 · EXISTS · COALESCE · CASE WHEN · 执行顺序 · 实用技巧',
        en: 'Subqueries · EXISTS · COALESCE · CASE WHEN · Execution Order · Practical Tips'
      },
      cover: 'cover.webp',
      tags: ['sql', 'guide'],
      readingTime: 18,
      lang: 'both'
    },

    {
      slug: 'welcome',
      date: '2026-05-01',
      title: {
        zh: '你好，欢迎来到我的博客',
        en: 'Hello — Welcome to my blog'
      },
      excerpt: {
        zh: '关于这个博客是怎么搭出来的、用了什么技术、以及为什么里面有那么多 AI 的痕迹。',
        en: "How this blog is built, what's under the hood, and why there's so much AI fingerprint inside."
      },
      tags: ['Hello World'],
      cover: 'cover.webp',
      readingTime: 2,
      lang: 'both',
      pinned: true
    },

    {
      slug: 'vision-networks-fttb',
      date: '2026-05-01',
      title: {
        zh: '澳洲免费FTTB千兆网络分享 - VisionNetworks',
        en: "Australia's Free FTTB Gigabit Network Guide — VisionNetworks"
      },
      excerpt: {
        zh: '公寓的 NBN 卡在 100 Mbps 还死贵？其实 FTTB 能跑超过千兆——TPG 集团的 Vision 网络、iinet/Vodafone 的套餐、安装流程、切回 NBN 的方法，一篇说清楚。',
        en: "Stuck with 100 Mbps NBN at your Aussie apartment? FTTB can actually exceed gigabit — a full guide to the TPG group's Vision network, iinet/Vodafone plans, install process, and switching back to NBN."
      },
      tags: ['australia', 'internet', 'guide'],
      readingTime: 8,
      lang: 'both'
    }

  ]
};
