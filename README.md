# louie. 个人站

> [Read in English](#english-version)

**线上地址：[louie1.com](https://louie1.com)**

我的个人网站和博客的源码。

## 页面
- **[主页 (index.html)](index.html)** — 个人介绍 + 项目展示
- **[博客 (blog.html)](blog.html)** — 中英双语博客
- **[Learn (learn.html)](learn.html)** — 浏览器内交互式 SQL / Python / C 教程
- **[95 (95.html)](95.html)** — Windows 95 风彩蛋页

## 目录结构

```
.
├── index.html, blog.html, learn.html, 95.html   ← 入口页面
├── lib/
│   ├── design/      ← 共享 CSS、字体、Tailwind、M3 设计 tokens
│   ├── runtime/     ← 第三方 JS / wasm（Monaco、sql.js、Skulpt、emception clang、xterm.js）
│   └── resources/   ← 图片
├── blog/
│   ├── blog-*.js    ← 博客页面模块（i18n / core / toc / views / router）
│   ├── blog.css
│   ├── blog_data/   ← 文章 manifest + 每篇文章独立文件夹
│   └── editor/      ← 写文桌面 GUI（blog_writer.py）
├── learn/
│   ├── learn-*.js   ← Learn 页面模块（i18n / core / engines / terminal / views / lesson）
│   ├── learn.css
│   └── learn_data/  ← 课程 manifest + 每门课程独立内容
├── _headers         ← Cloudflare 缓存规则（HTML/自己的 JS 不缓存，第三方库长期缓存）
├── wrangler.toml    ← Cloudflare Static Assets 部署配置
├── robots.txt, sitemap.xml
└── README.md
```

## 技术细节
- 博客：见 [blog/blog_data/blog_readme_c.md](blog/blog_data/blog_readme_c.md)
- Learn（SQL / Python / C 三套引擎、xterm 终端、C 的 JSPI 实时输入与预输入模式）：见 [learn/learn_data/learn_readme_c.md](learn/learn_data/learn_readme_c.md)

整站零编译、零后端、零 `fetch()`——所有数据都通过 `<script>` 标签加载，所以本地双击 `*.html` 也能直接跑（C 教程是例外，浏览器内的 clang 运行时需要 HTTPS 或 `http://localhost`）。

---

# English version

> [⬆ 回到中文](#louie-个人站)

**Live site: [louie1.com](https://louie1.com)**

Source code for my personal website and blog.

## Pages
- **[Homepage](index.html)** — personal introduction and project showcase
- **[Blog](blog.html)** — bilingual blog posts
- **[Learn](learn.html)** — interactive in-browser SQL / Python / C tutorials
- **[95](95.html)** — Windows-95-style easter egg

## Layout

```
.
├── index.html, blog.html, learn.html, 95.html   ← entry points
├── lib/
│   ├── design/      ← shared CSS, fonts, Tailwind, M3 tokens
│   ├── runtime/     ← third-party JS / wasm (Monaco, sql.js, Skulpt, emception clang, xterm.js)
│   └── resources/   ← images
├── blog/
│   ├── blog-*.js    ← blog page modules (i18n / core / toc / views / router)
│   ├── blog.css
│   ├── blog_data/   ← post manifest + per-post folders
│   └── editor/      ← desktop GUI for writing posts (blog_writer.py)
├── learn/
│   ├── learn-*.js   ← learn page modules (i18n / core / engines / terminal / views / lesson)
│   ├── learn.css
│   └── learn_data/  ← course manifest + per-course content
├── _headers         ← Cloudflare cache rules (HTML/own JS no-cache, libs cached hard)
├── wrangler.toml    ← Cloudflare Static Assets deploy config
├── robots.txt, sitemap.xml
└── README.md
```

## Technical details
- Blog: see [blog/blog_data/blog_readme.md](blog/blog_data/blog_readme.md)
- Learn (SQL / Python / C engines, xterm terminal, C's JSPI live stdin + pre-input fallback): see [learn/learn_data/learn_readme.md](learn/learn_data/learn_readme.md)

Zero build step, zero backend, no `fetch()` — everything loads via `<script>` tags so the site also works when opened directly via `file://` (except the C tutorials, which need HTTPS or `http://localhost` for the clang-in-browser runtime).
