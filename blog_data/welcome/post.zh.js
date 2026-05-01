/* Post body — welcome / zh */

(window.__BLOG_POSTS = window.__BLOG_POSTS || {})['welcome:zh'] = `
<p class="lead">你好！我是 Louie，一名来自中国的留学生，目前在澳大利亚墨尔本读书。欢迎来到我的博客——这里会偶尔写写技术、生活，以及一些瞎想。</p>

<h2>关于这个网站</h2>
<p>整个站点是我自己一行行写的——<strong>纯静态</strong>，没有数据库，没有后端，挂在 Cloudflare Pages 上。前端就是 HTML、一点 Tailwind、和普通 JavaScript；字体用了 JetBrains Mono；那些 Win95 风的小窗口和像素吉祥物纯粹是好玩。</p>
<p>博客部分的设计是：每篇文章的元数据存在 <code>blog_data/manifest.js</code>，正文写在 <code>blog_data/&lt;slug&gt;/post.&lt;lang&gt;.js</code>，全部通过 <code>&lt;script&gt;</code> 标签加载。这样的好处是 file:// 直接双击和挂在 CDN 上行为完全一致，没有 fetch、没有 CORS、没有后端，加新文章也只是 push 几个文件。</p>

<h2>关于 AI</h2>
<p>有件事不能不提：从 95.exe 那个小玩意儿到这个博客本身，<strong>很多代码、设计灵感、文档，甚至这篇文章的草稿，都大量依赖了 AI 生成</strong>（主要是 Claude）。</p>
<p>我把 AI 当成一个非常有耐心的 pair programming 伙伴——它写一稿，我读、改、删、调整方向，再反复迭代，直到觉得"这才是我想要的"为止。它能把模糊的想法很快变成可以挑刺的实物，而挑刺、判断对错、最后定稿的责任仍然在我这里。</p>
<p>这种工作方式我挺喜欢的。所以如果你看到这站上有什么写得不错的细节，那大概率是我和 AI 一起磨出来的；如果有什么写得很怪的地方，那也大概率是我没磨够。</p>

<h2>就这样</h2>
<p>欢迎随便看看，慢慢更。</p>
<p style="color: var(--muted); font-size: 14px; margin-top: 32px;">— Louie，写于墨尔本</p>
`;
