/* ─────────────────────────────────────────────────────────────
   Louie's blog manifest — INDEX ONLY.

   Each post entry is metadata. The body lives in its own folder:
       blog/blog_data/<slug>/post.zh.js
       blog/blog_data/<slug>/post.en.js
   blog.html loads those on demand when the reader view opens a post.
   ───────────────────────────────────────────────────────────── */

window.__BLOG_MANIFEST = {
  version: 3,
  updated: '2026-05-05',
  posts: [

    {
      slug: "python-tute-1",
      date: "2026-05-04",
      title: { "zh": "Python 基础语法 1", "en": "Python Syntax Guide 1" },
      excerpt: { "zh": "print/input · 数值运算 · 类型转换 · 整除取余 · 字符串索引切片 · 字符串方法 · f-string · 列表与元组 · 条件语句", "en": "print/input · Numeric ops · Type conversion · Floor division · String indexing · String methods · f-string · Lists & tuples · Conditionals" },
      cover: "cover.webp",
      tags: ["python", "code"],
      readingTime: 22,
      lang: "both",
    },

    {
      slug: "python-tute-2",
      date: "2026-05-04",
      title: { "zh": "Python 基础语法 2", "en": "Python Syntax Guide 2" },
      excerpt: { "zh": "比较运算符 · 函数定义 · while 循环 · for 循环 · 嵌套循环 · 字典 · 集合 · 列表可变性 · 高级列表操作", "en": "Comparison operators · Functions · while loop · for loop · Nested loops · Dict · Set · List mutability · Advanced list ops" },
      cover: "cover.webp",
      tags: ["python", "code"],
      readingTime: 22,
      lang: "both",
    },

    {
      slug: "python-tute-3",
      date: "2026-05-04",
      title: { "zh": "Python 基础语法 3", "en": "Python Syntax Guide 3" },
      excerpt: { "zh": "高级函数 · 列表推导式 · 常用标准库 · 文件读写 · CSV · 异常处理 · 递归 · 调试技巧 · 实用技巧", "en": "Advanced functions · List comprehensions · stdlib · File I/O · CSV · Exception handling · Recursion · Debugging · Practical tips" },
      cover: "cover.webp",
      tags: ["python", "code"],
      readingTime: 20,
      lang: "both",
    },

    {
      slug: "sql-syntax-guide-1",
      date: "2026-05-02",
      title: { "zh": "SQL 基础语法 1", "en": "SQL Basic Syntax 1" },
      excerpt: { "zh": "SELECT · FROM · WHERE · 比较运算符 · AND/OR/NOT · IN · BETWEEN · LIKE · IS NULL · ORDER BY", "en": "SELECT · FROM · WHERE · Operators · AND/OR/NOT · IN · BETWEEN · LIKE · IS NULL · ORDER BY" },
      cover: "cover.webp",
      tags: ["sql", "code"],
      readingTime: 20,
      lang: "both",
    },

    {
      slug: "sql-syntax-guide-2",
      date: "2026-05-02",
      title: { "zh": "SQL 基础语法 2", "en": "SQL Basic Syntax 2" },
      excerpt: { "zh": "LIMIT · DISTINCT · AS · JOIN · COUNT · GROUP BY · HAVING", "en": "LIMIT · DISTINCT · AS · JOIN · COUNT · GROUP BY · HAVING" },
      cover: "cover.webp",
      tags: ["sql", "code"],
      readingTime: 22,
      lang: "both",
    },

    {
      slug: "sql-syntax-guide-3",
      date: "2026-05-02",
      title: { "zh": "SQL 基础语法 3", "en": "SQL Basic Syntax 3" },
      excerpt: { "zh": "子查询 · EXISTS · COALESCE · CASE WHEN · 执行顺序 · 实用技巧", "en": "Subqueries · EXISTS · COALESCE · CASE WHEN · Execution Order · Practical Tips" },
      cover: "cover.webp",
      tags: ["sql", "code"],
      readingTime: 18,
      lang: "both",
    },

    {
      slug: "welcome",
      date: "2026-05-01",
      updated: "2026-05-04",
      title: { "zh": "你好，欢迎来到我的博客", "en": "Hello — Welcome to my blog" },
      excerpt: { "zh": "介绍博客，以及louie.网站", "en": "Introduction to my blog" },
      cover: "cover.webp",
      tags: ["Hello World"],
      readingTime: 2,
      lang: "both",
      pinned: true,
    },

    {
      slug: "vision-networks-fttb",
      date: "2026-02-14",
      updated: "2026-05-01",
      title: { "zh": "澳洲免费FTTB千兆网络分享 - VisionNetworks", "en": "Australia's Free FTTB Gigabit Network Guide — VisionNetworks" },
      excerpt: { "zh": "公寓的 NBN 卡在 100 Mbps 还死贵？其实 FTTB 能跑超过千兆——TPG 集团的 Vision 网络、iinet/Vodafone 的套餐、安装流程、切回 NBN 的方法，一篇说清楚。", "en": "Stuck with 100 Mbps NBN at your Aussie apartment? FTTB can actually exceed gigabit — a full guide to the TPG group's Vision network, iinet/Vodafone plans, install process, and switching back to NBN." },
      tags: ["australia", "internet", "nbn"],
      readingTime: 8,
      lang: "both",
    }

  ]
};
