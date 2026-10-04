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
│   ├── daily/       ← 每日主题：daily.js（日历和渲染）+ 每人一个文件夹
│   ├── design/      ← 共享 CSS、字体、Tailwind、M3 设计 tokens
│   ├── runtime/     ← 第三方 JS（luxon）
│   └── resources/   ← 图片
├── robots.txt, sitemap.xml
└── README.md
```

## 每日主题

主页每天都是 “Be the One.”，大约每三天还会纪念一位人物。每个主题是 `lib/daily/<人名>/` 下的 `theme.js`（人物、年份、名言）和 `portrait.jpg`（封面，来自 Wikimedia Commons 的自由授权图片）；日期写在 `lib/daily/daily.js` 的 `CALENDAR` 里。小标题、周年数、署名和图片授权说明都由 `daily.js` 自动生成。在网址后加 `?day=MM-DD` 可以预览任意一天。

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
│   ├── daily/       ← daily themes: daily.js (calendar + rendering) + one folder per person
│   ├── design/      ← shared CSS, fonts, Tailwind, M3 tokens
│   ├── runtime/     ← third-party JS (luxon)
│   └── resources/   ← images
├── robots.txt, sitemap.xml
└── README.md
```

## Daily themes

The homepage is "Be the One." every day; about one day in three it also remembers someone. Each theme is `lib/daily/<name>/` with `theme.js` (person, years, quotes) and `portrait.jpg` (a freely licensed cover from Wikimedia Commons); its date lives in `CALENDAR` in `lib/daily/daily.js`, which also writes the note, anniversary, signature and image credit. Add `?day=MM-DD` to the URL to preview any day.

Zero build step, zero backend, no `fetch()` — everything loads via `<script>` / `<link>` tags so the site also works when opened directly via `file://`.
