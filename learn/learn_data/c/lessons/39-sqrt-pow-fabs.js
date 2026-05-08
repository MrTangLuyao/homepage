LEARN.lesson('c', 39, `
@@chapterRef c-math

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead"><code>&lt;math.h&gt;</code> 提供 C 的浮点数学函数 —— 平方根、幂、绝对值、三角、对数等。<strong>所有函数都接受 <code>double</code> 并返回 <code>double</code></strong>（float 版本带 <code>f</code> 后缀如 <code>sqrtf</code>，long double 版本带 <code>l</code>）。</p>
<table style="border-collapse:collapse;font-size:13px;">
<tr><td style="padding:2px 14px 2px 0;"><code>sqrt(x)</code></td><td>√x</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>pow(x, y)</code></td><td>x 的 y 次方（不是 x^y —— ^ 在 C 里是 XOR！）</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>fabs(x)</code></td><td>浮点绝对值</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>abs(x)</code></td><td><strong>整数</strong>绝对值（在 &lt;stdlib.h&gt;）</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>cbrt(x)</code></td><td>立方根</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>hypot(x, y)</code></td><td>√(x² + y²) — 不会中间溢出</td></tr>
</table>
<h3 style="margin:12px 0 6px;font-size:14px;">几个语言层面的"坑"</h3>
<ul>
<li><strong>编译时要 <code>-lm</code>?</strong> 在 Linux 上传统 gcc 需要 <code>gcc x.c -lm</code> 链接 math 库。本课的浏览器 emcc 已经处理了，无需担心。</li>
<li><strong>fabs vs abs</strong>：abs 是<u>整数</u>绝对值（来自 stdlib.h），fabs 是<u>浮点</u>。给浮点数用 abs 会先截成 int 再取绝对值 —— 是个常见 bug。</li>
<li><strong>pow 不便宜</strong>：<code>pow(x, 2)</code> 比 <code>x * x</code> 慢得多 —— 编译器有时能优化、有时不行。手动写 <code>x * x</code> 更安全。</li>
<li><strong>hypot vs sqrt(x*x+y*y)</strong>：当 x、y 很大时 x*x 可能溢出，hypot 会用更稳定的算法避免。但日常使用 sqrt 够了。</li>
</ul>
<h3 style="margin:12px 0 6px;font-size:14px;">浮点比较的传统坑</h3>
<pre><code>// 错：浮点不精确
if (sqrt(2.0) * sqrt(2.0) == 2.0) { /* 可能不进 */ }

// 对：用容差
if (fabs(a - b) &lt; 1e-9) { /* a ≈ b */ }</code></pre>

@@intro:en
<p class="lead"><code>&lt;math.h&gt;</code> provides C's floating-point math — sqrt, pow, fabs, trig, logs. <strong>All functions take <code>double</code> and return <code>double</code></strong> (float versions have <code>f</code> suffix: <code>sqrtf</code>; long double has <code>l</code>).</p>
<table style="border-collapse:collapse;font-size:13px;">
<tr><td style="padding:2px 14px 2px 0;"><code>sqrt(x)</code></td><td>square root</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>pow(x, y)</code></td><td>x to the y (NOT x^y — ^ is XOR in C!)</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>fabs(x)</code></td><td>float absolute value</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>abs(x)</code></td><td><strong>integer</strong> abs (in &lt;stdlib.h&gt;)</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>hypot(x, y)</code></td><td>√(x² + y²) without intermediate overflow</td></tr>
</table>
<h3 style="margin:12px 0 6px;font-size:14px;">Gotchas</h3>
<ul>
<li><strong>fabs vs abs</strong>: abs is for ints; using abs on a double silently truncates to int first — common bug.</li>
<li><strong>pow is slow</strong>: <code>pow(x, 2)</code> is much slower than <code>x * x</code>. Hand-write small powers.</li>
<li><strong>Float comparison</strong>: never use <code>==</code> on floats. Use <code>fabs(a - b) &lt; 1e-9</code>.</li>
</ul>

@@task:zh
打印这些值（小数 4 位精度）：
<pre><code>sqrt(2) = 1.4142
pow(2, 10) = 1024
fabs(-3.14) = 3.1400
hypot(3, 4) = 5.0000</code></pre>

@@task:en
Print these (4-decimal precision):
<pre><code>sqrt(2) = 1.4142
pow(2, 10) = 1024
fabs(-3.14) = 3.1400
hypot(3, 4) = 5.0000</code></pre>

@@hint:zh
<code>%.4f</code> 控制 4 位小数。<code>pow(2, 10) = 1024.0000</code> 但题目要 1024，所以用 <code>%g</code> 或 <code>(int)</code> cast。

@@hint:en
<code>%.4f</code> for 4 decimals. <code>pow(2, 10) = 1024.0000</code> but the answer wants 1024, so cast to int or use <code>%g</code>.

@@starter
#include <stdio.h>
#include <math.h>

int main(void) {
    // 4 行 printf
    return 0;
}

@@answer
#include <stdio.h>
#include <math.h>

int main(void) {
    printf("sqrt(2) = %.4f\\n",     sqrt(2.0));
    printf("pow(2, 10) = %d\\n",    (int)pow(2.0, 10.0));
    printf("fabs(-3.14) = %.4f\\n", fabs(-3.14));
    printf("hypot(3, 4) = %.4f\\n", hypot(3.0, 4.0));
    return 0;
}

@@expectedOutput
sqrt(2) = 1.4142
pow(2, 10) = 1024
fabs(-3.14) = 3.1400
hypot(3, 4) = 5.0000
`);
