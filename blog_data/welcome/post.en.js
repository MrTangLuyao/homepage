/* Post body — welcome / en */

(window.__BLOG_POSTS = window.__BLOG_POSTS || {})['welcome:en'] = `
<p class="lead">Hi! I'm Louie, an international student from China, currently studying in Melbourne, Australia. Welcome to my blog — a quiet corner where I'll occasionally write about tech, life, and the occasional random thought.</p>

<h2>About this site</h2>
<p>The whole site is hand-written, line by line — <strong>purely static</strong>, no database, no backend, deployed on Cloudflare Pages. The frontend is HTML, a sprinkle of Tailwind, and plain JavaScript; the font is JetBrains Mono; the Win95-style windows and pixel-art mascot are there purely for fun.</p>
<p>The blog itself is set up so that every post's metadata lives in <code>blog_data/manifest.js</code>, and each post's body lives in <code>blog_data/&lt;slug&gt;/post.&lt;lang&gt;.js</code>. Everything loads via <code>&lt;script&gt;</code> tags. The nice consequence: opening the file directly via <code>file://</code> behaves exactly the same as serving it from a CDN — no fetch, no CORS, no backend. Adding a new post just means pushing a couple of files.</p>

<h2>About AI</h2>
<p>One thing I can't leave out: from the little 95.exe gimmick to this blog itself, <strong>a lot of the code, design ideas, docs, and even the draft of this post lean heavily on AI</strong> (mostly Claude).</p>
<p>I treat AI as an extremely patient pair-programming partner — it writes a draft, I read, edit, delete, redirect, then iterate until it feels like "this is what I actually wanted." It turns vague ideas into something concrete I can poke holes in; the poking, judgment, and final decisions still sit with me.</p>
<p>I genuinely enjoy working this way. So if you find something on this site that reads particularly well, that's probably AI and me grinding it out together; if something reads weirdly, that's probably me not grinding it enough.</p>

<h2>That's it</h2>
<p>Feel free to poke around. Updates will come slowly.</p>
<p style="color: var(--muted); font-size: 14px; margin-top: 32px;">— Louie, written in Melbourne</p>
`;
