# louie. 个人站

> [Read in English](#english-version)

**线上地址：[louie1.com](https://louie1.com)**

我的个人主页的源码。

## 页面
- **[主页 (index.html)](index.html)** — 个人介绍 + 项目展示
- **[95 (95.html)](95.html)** — Windows 95 风彩蛋页

## 目录结构

```
.
├── index.html, 95.html   ← 入口页面
├── lib/
│   ├── design/      ← 共享 CSS、字体、Tailwind、M3 设计 tokens
│   ├── runtime/     ← 第三方 JS（luxon）
│   └── resources/   ← 图片
├── robots.txt, sitemap.xml
└── README.md
```

整站零编译、零后端、零 `fetch()`——所有资源都通过 `<script>` / `<link>` 标签加载，本地双击 `*.html` 即可直接预览。

---

# English version

> [⬆ 回到中文](#louie-个人站)

**Live site: [louie1.com](https://louie1.com)**

Source code for my personal homepage.

## Pages
- **[Homepage](index.html)** — personal introduction and project showcase
- **[95](95.html)** — Windows-95-style easter egg

## Layout

```
.
├── index.html, 95.html   ← entry points
├── lib/
│   ├── design/      ← shared CSS, fonts, Tailwind, M3 tokens
│   ├── runtime/     ← third-party JS (luxon)
│   └── resources/   ← images
├── robots.txt, sitemap.xml
└── README.md
```

Zero build step, zero backend, no `fetch()` — everything loads via `<script>` / `<link>` tags so the site also works when opened directly via `file://`.
