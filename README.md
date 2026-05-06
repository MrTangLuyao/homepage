# The louie. website

Source code for my personal website and blog.

## Pages
- **[Homepage](index.html)** — personal introduction and project showcase
- **[Blog](blog.html)** — bilingual blog posts
- **[Learn](learn.html)** — interactive in-browser SQL & Python tutorials
- **[95](95.html)** — Windows-95-style easter egg

## Live site
[louie1.com](https://louie1.com)

## Layout

```
.
├── index.html, blog.html, learn.html, 95.html   ← entry points
├── lib/
│   ├── design/      ← shared CSS, fonts, Tailwind, M3 tokens
│   ├── runtime/     ← third-party JS (Monaco, sql.js, Skulpt, ace, luxon)
│   └── resources/   ← images
├── blog/
│   ├── blog-*.js    ← blog page modules (i18n / core / toc / views / router)
│   ├── blog.css
│   ├── blog_data/   ← post manifest + per-post folders
│   └── editor/      ← desktop GUI for writing posts (blog_writer.py)
├── learn/
│   ├── learn-*.js   ← learn page modules (i18n / core / engines / views / lesson)
│   ├── learn.css
│   └── learn_data/  ← course manifest + per-course content
├── robots.txt, sitemap.xml
└── README.md
```

## Technical details
- Blog: see [blog/blog_data/blog_readme.md](blog/blog_data/blog_readme.md)
- Learn: see [learn/learn_data/learn_readme.md](learn/learn_data/learn_readme.md)

Zero build step, zero backend, no `fetch()` — everything loads via `<script>` tags so the site also works when opened directly via `file://`.
