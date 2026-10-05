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

平时的主页是原版首屏加上宣言区；大约每三天有一个主题日，纪念一位人物，首屏换成 “Be the One.” 和这个人的封面。每个主题是 `lib/daily/<人名>/` 下的 `theme.js`（人物、年份、名言）、`portrait.jpg`（封面，来自 Wikimedia Commons 的自由授权图片）和 `thumb.jpg`（选择器里的小图）；日期写在 `lib/daily/daily.js` 的 `CALENDAR` 里。小标题、周年数、署名和图片授权说明都由 `daily.js` 自动生成。首屏的「每日主题」按钮（`lib/daily/picker.js`）像 Google Doodles 档案馆一样列出全年所有主题，点一位就能看到那一天的主页；也可以直接在网址后加 `?day=MM-DD`。

### 生日模板

生日是一个固定模板：首屏用网站自己的暖色（深色是炭灰配珊瑚色光晕，浅色是奶油色配蜜桃色光晕）、在人物身后放烟花（`lib/daily/party.js`），大标题是 “Happy Birthday, 名字.”，自己的生日写 `me: true` 就是 “Happy Birthday to Me.”。给某人加一个生日只要两步：

1. 新建 `lib/daily/<名字>/theme.js`：

   ```js
   LouieDaily.birthday({
     name: 'Cohen',
     // 可选：有照片就放 portrait.jpg 和 thumb.jpg，再写上 cover 和 credit；
     // 去掉背景的透明抠图（像 Louie 的头像）用 figure，会直接站在页面上
     // cover: { portrait: 'portrait.jpg', ratio: 4 / 5 },
     // cover: { figure: 'figure.webp', ratio: 宽 / 高 },
     // credit: { zh: '今日封面：Cohen 的照片。', en: 'Today’s cover: a photo of Cohen.' }
   });
   ```

2. 在 `lib/daily/daily.js` 的 `CALENDAR` 里加上日期，例如 `'03-21': ['cohen', 'Cohen', 0]`（没有照片写 `0`，有照片想让选择器里的小图保持彩色写 `'color'`）。

小标题（“今天是 Cohen 的生日”）、宣言区的祝福和署名都会自动生成；`note`、`lines`、`headline` 等任何字段都可以在 `theme.js` 里另写来覆盖。可以参考 `lib/daily/louie/theme.js`。

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

On ordinary days the homepage is the original hero plus the manifesto; about one day in three is a themed day that remembers someone, with a "Be the One." hero and their cover. Each theme is `lib/daily/<name>/` with `theme.js` (person, years, quotes), `portrait.jpg` (a freely licensed cover from Wikimedia Commons) and `thumb.jpg` (its picker thumbnail); its date lives in `CALENDAR` in `lib/daily/daily.js`, which also writes the note, anniversary, signature and image credit. The hero's "Themes" button (`lib/daily/picker.js`) lists every themed day, Google-Doodles style; pick one to see the homepage on that day, or add `?day=MM-DD` to the URL.

### Birthday template

Birthdays use a fixed template: a cheerful hero in the site's own warm colours (charcoal with a coral glow in dark, cream with a peach glow in light) with fireworks behind the person (`lib/daily/party.js`) and "Happy Birthday, <name>." as the headline, or "Happy Birthday to Me." with `me: true`. Adding someone's birthday takes two steps:

1. Create `lib/daily/<name>/theme.js`:

   ```js
   LouieDaily.birthday({
     name: 'Cohen',
     // optional: with a photo, add portrait.jpg and thumb.jpg, then cover and credit;
     // a transparent cut-out (like Louie's avatar) uses figure and stands on the page as is
     // cover: { portrait: 'portrait.jpg', ratio: 4 / 5 },
     // cover: { figure: 'figure.webp', ratio: width / height },
     // credit: { zh: '今日封面：Cohen 的照片。', en: 'Today’s cover: a photo of Cohen.' }
   });
   ```

2. Add the date to `CALENDAR` in `lib/daily/daily.js`, e.g. `'03-21': ['cohen', 'Cohen', 0]` (`0` without a photo, `'color'` to keep the picker thumbnail in colour).

The note ("Today is Cohen's birthday"), the manifesto greeting and its signature are written for you; any field such as `note`, `lines` or `headline` set in `theme.js` overrides them. See `lib/daily/louie/theme.js` for a full example.

Zero build step, zero backend, no `fetch()` — everything loads via `<script>` / `<link>` tags so the site also works when opened directly via `file://`.
