# louie. 个人站

> [Read in English](#english-version)

**线上地址：[louie1.com](https://louie1.com)**

我的个人主页的源码。

## 页面
- **[主页 (index.html)](index.html)**：个人介绍和项目展示
- **[95 (95.html)](95.html)**：Windows 95 风彩蛋页

## 目录结构

```
.
├── index.html, 95.html   ← 入口页面
├── lib/
│   ├── design/      ← louie.css（主页的全部样式和颜色变量）、theme.js（浅色 / 深色）、scrollbar.js（滚动条）、字体（smiley/ 得意黑、fonts_chunks/ 鸿蒙、JetBrains Mono）；95 页用的 Tailwind
│   ├── daily/       ← 生日：daily.js（日历）、party.js（像素烟花）+ 每人一个文件夹
│   ├── search/      ← ⌘K 搜索 SDK（其他 louie.* 站点也在用）
│   ├── icons/       ← Lucide 图标
│   ├── runtime/     ← 第三方 JS（luxon，95 页用）
│   └── resources/   ← 头像：po.svg（主页右侧的像素图）、po.webp（网站图标和分享图）
├── search/          ← 搜索的额外条目和接入说明
├── robots.txt, sitemap.xml
└── README.md
```

## 样式

白底、深海军蓝文字，颜色只花在按钮链接（蓝）和状态上，结构靠 1px 细线而不是阴影和色块。颜色、字号、圆角都写成 `lib/design/louie.css` 开头的 CSS 变量，深色模式在 `:root[data-theme="dark"]` 里覆盖同一套变量。外观默认跟随系统，导航栏的按钮在三种状态间切换：跟随系统（图标带 A）→ 和系统相反 → 和系统相同 → 回到跟随系统。点按时的涟漪效果来自页面里的 `bindRipples()`，给元素加上 `ripple-surface` 类就有。

## 字体

- **得意黑（Smiley Sans）**：大标题和各节标题，只用到英文，所以只放了它的两个小分块（`lib/design/smiley/`）。
- **JetBrains Mono**：其余所有英文和界面文字（常规和粗体两个文件）。
- **鸿蒙（HarmonyOS Sans SC）**：所有中文，按 Unicode 区段切开的原分块（`lib/design/fonts_chunks/`）。浏览器只下载文字用到的区段，但页面上的中文几乎遍布每个区段，所以第一次打开要下载约 3.2 MB，之后走缓存。
- **Noto Sans SC**：一个 2 KB 的小文件，补全角标点（，：；（）），因为鸿蒙分块里没有这一段；另外带上许可证列表里它自己的 “Aa”。

中文从不让浏览器自己加粗（`font-synthesis: none`），层次靠字号和颜色。

## 生日

我和朋友过生日那天，首屏会换成 “Happy birthday to me.” 或 “Happy birthday, 名字.”，右边（手机上是标题上方）站着像素风头像，身后放像素烟花（`lib/daily/party.js`）。日期按墨尔本时间算；在网址后加 `?day=MM-DD` 可以提前看某一天的样子，例如 `?day=08-09`。给某人加一个生日只要两步：

1. 新建 `lib/daily/<名字>/theme.js`：

   ```js
   LouieDaily.birthday({
     name: 'Cohen',
     // 可选：像素动画头像，把每一帧横着排成一张透明底的图（figure.png），
     // 再写上一帧的宽高比、帧数和帧率（参考 Louie 的头像）
     // cover: { figure: 'figure.png', ratio: 一帧的宽 / 高, frames: 32, fps: 8 },
     // credit: { zh: '今日封面：Cohen 的头像。', en: 'Today’s cover: Cohen’s avatar.' }
   });
   ```

2. 在 `lib/daily/daily.js` 的 `CALENDAR` 里加上日期，例如 `'03-21': 'cohen'`。

标题和小标题（“今天是 Cohen 的生日”）会自动生成，也可以在 `theme.js` 里用 `headline`、`note` 另写来覆盖。可以参考 `lib/daily/louie/theme.js`。

整站零编译、零后端、零 `fetch()`，所有资源都通过 `<script>` / `<link>` 标签加载，本地双击 `*.html` 即可直接预览。

---

# English version

> [⬆ 回到中文](#louie-个人站)

**Live site: [louie1.com](https://louie1.com)**

Source code for my personal homepage.

## Pages
- **[Homepage](index.html)**: personal introduction and project showcase
- **[95](95.html)**: Windows 95 style easter egg

## Layout

```
.
├── index.html, 95.html   ← entry points
├── lib/
│   ├── design/      ← louie.css (all homepage styles and colour tokens), theme.js (light / dark), scrollbar.js (the scrollbar), fonts (smiley/ Smiley Sans, fonts_chunks/ HarmonyOS Sans, JetBrains Mono); Tailwind for the 95 page
│   ├── daily/       ← birthdays: daily.js (calendar), party.js (pixel fireworks) + one folder per person
│   ├── search/      ← the ⌘K search SDK (also used by the other louie.* sites)
│   ├── icons/       ← Lucide icons
│   ├── runtime/     ← third-party JS (luxon, for the 95 page)
│   └── resources/   ← avatar: po.svg (the pixel art on the hero) and po.webp (favicon and share image)
├── search/          ← extra search entries and how to embed the search
├── robots.txt, sitemap.xml
└── README.md
```

## Style

A white canvas and deep navy ink; colour goes only on actions (blue) and state, and structure comes from 1px hairlines rather than shadows or tinted blocks. Colours, type sizes and radii are CSS variables at the top of `lib/design/louie.css`; dark mode overrides the same variables under `:root[data-theme="dark"]`. The appearance follows the system by default, and the navbar button cycles through three states: follow the system (its icon carries an A) → the opposite of the system → the same as the system → back to following. The ripple on click or tap comes from the page's `bindRipples()`: give any element the `ripple-surface` class.

## Fonts

- **Smiley Sans (得意黑)**: the headline and the section heads. They are Latin only, so just two small chunks of it ship (`lib/design/smiley/`).
- **JetBrains Mono**: all other Latin and the interface (Regular and Bold).
- **HarmonyOS Sans SC**: all Chinese, from the original files split by Unicode block (`lib/design/fonts_chunks/`). The browser fetches only the blocks the text touches, but the page's Chinese touches nearly all of them, so a first visit downloads about 3.2 MB; later visits use the cache.
- **Noto Sans SC**: a 2 KB file holding the full-width punctuation (，：；（）), which the HarmonyOS chunks lack, plus the "Aa" it shows as its sample in the licences list.

The browser never draws Chinese bolder than the font (`font-synthesis: none`); hierarchy comes from size and colour.

## Birthdays

On my birthday and my friends' birthdays the hero changes to "Happy birthday to me." or "Happy birthday, <name>.", with a pixel-art avatar on the right (above the headline on phones) and pixel fireworks behind it (`lib/daily/party.js`). The day follows Melbourne time; add `?day=MM-DD` to the URL to see a given day early, e.g. `?day=08-09`. Adding someone's birthday takes two steps:

1. Create `lib/daily/<name>/theme.js`:

   ```js
   LouieDaily.birthday({
     name: 'Cohen',
     // optional: an animated pixel avatar. Lay the frames side by side in one
     // transparent image (figure.png), then give one frame's ratio, the frame
     // count and the frame rate (see Louie's avatar)
     // cover: { figure: 'figure.png', ratio: frame width / height, frames: 32, fps: 8 },
     // credit: { zh: '今日封面：Cohen 的头像。', en: 'Today’s cover: Cohen’s avatar.' }
   });
   ```

2. Add the date to `CALENDAR` in `lib/daily/daily.js`, e.g. `'03-21': 'cohen'`.

The headline and the note ("Today is Cohen's birthday") are written for you; `headline` or `note` set in `theme.js` overrides them. See `lib/daily/louie/theme.js` for a full example.

Zero build step, zero backend, no `fetch()`: everything loads via `<script>` / `<link>` tags so the site also works when opened directly via `file://`.
