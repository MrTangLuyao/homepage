LEARN.lesson('c', 41, `
@@chapterRef c-math

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead">把浮点数变成整数（或"接近整数的浮点"）有几种取整方式 —— 它们的差异很重要，特别是处理负数时。</p>
<table style="border-collapse:collapse;font-size:13px;">
<tr><td style="padding:2px 14px 2px 0;"><code>floor(x)</code></td><td>向<strong>下</strong>取整（向 -∞）</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>ceil(x)</code></td><td>向<strong>上</strong>取整（向 +∞）</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>round(x)</code></td><td>四舍五入（远离零）</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>trunc(x)</code></td><td>截断小数部分（向 0 取整）</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>(int)x</code></td><td>cast 强制转换 —— 等价于 <code>trunc</code></td></tr>
</table>
<h3 style="margin:12px 0 6px;font-size:14px;">正数好理解，负数才见真章</h3>
<pre><code>floor(2.7)   →  2     ceil(2.7)   →  3
floor(2.3)   →  2     ceil(2.3)   →  3
floor(-2.3)  → -3     ceil(-2.3)  → -2     ← 负数的方向反着！
floor(-2.7)  → -3     ceil(-2.7)  → -2
trunc(-2.7)  → -2     ← trunc 永远朝 0 走
round(-2.7)  → -3     ← round 远离 0</code></pre>
<p>规律：<strong>floor 永远朝 -∞ 走</strong>，所以负数会更负。<strong>trunc 永远朝 0 走</strong>，无论正负。<strong>round 远离 0</strong>（2.5 → 3，-2.5 → -3）。</p>
<h3 style="margin:12px 0 6px;font-size:14px;">返回类型是 double，不是 int</h3>
<p><code>floor(2.7)</code> 返回的是 <code>2.0</code>（double），<u>不是</u> <code>2</code>（int）。如果要 int，再做一次 cast：</p>
<pre><code>int n = (int)floor(2.7);   // 2 (int)</code></pre>
<h3 style="margin:12px 0 6px;font-size:14px;">"银行家舍入"</h3>
<p>C 的 <code>round</code> 是"远离零的四舍五入"（2.5 → 3，3.5 → 4）。但 IEEE 754 默认<u>另一种</u> —— 偶数舍入（2.5 → 2，3.5 → 4）。在金融场景里这种"靠向偶数"能避免长期累积偏差。<code>nearbyint</code> / <code>rint</code> 走默认舍入模式，而 <code>round</code> 总是远离零。</p>

@@intro:en
<p class="lead">Several ways to convert a float to an integer (or "integer-valued float") — the differences matter especially for negative numbers.</p>
<table style="border-collapse:collapse;font-size:13px;">
<tr><td style="padding:2px 14px 2px 0;"><code>floor(x)</code></td><td>round <strong>down</strong> (toward -∞)</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>ceil(x)</code></td><td>round <strong>up</strong> (toward +∞)</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>round(x)</code></td><td>nearest integer, ties away from zero</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>trunc(x)</code></td><td>drop the fraction (toward 0)</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>(int)x</code></td><td>cast = same as <code>trunc</code></td></tr>
</table>
<h3 style="margin:12px 0 6px;font-size:14px;">Negative numbers reveal the difference</h3>
<pre><code>floor(-2.3)  → -3   ceil(-2.3)  → -2   trunc(-2.3) → -2
floor(-2.7)  → -3   ceil(-2.7)  → -2   trunc(-2.7) → -2
round(-2.7)  → -3</code></pre>
<p><strong>floor</strong> always goes toward -∞. <strong>trunc</strong> always toward 0. <strong>round</strong> ties away from zero.</p>
<h3 style="margin:12px 0 6px;font-size:14px;">Returns double, not int</h3>
<pre><code>int n = (int)floor(2.7);   // cast to int</code></pre>

@@task:zh
对四个值 <code>2.7, 2.3, -2.3, -2.7</code> 分别打印 <code>floor / ceil / round / trunc</code> 的结果：
<pre><code>x=2.7  floor=2  ceil=3  round=3  trunc=2
x=2.3  floor=2  ceil=3  round=2  trunc=2
x=-2.3 floor=-3 ceil=-2 round=-2 trunc=-2
x=-2.7 floor=-3 ceil=-2 round=-3 trunc=-2</code></pre>

@@task:en
For each of <code>2.7, 2.3, -2.3, -2.7</code>, print <code>floor / ceil / round / trunc</code>:
<pre><code>x=2.7  floor=2  ceil=3  round=3  trunc=2
x=2.3  floor=2  ceil=3  round=2  trunc=2
x=-2.3 floor=-3 ceil=-2 round=-2 trunc=-2
x=-2.7 floor=-3 ceil=-2 round=-3 trunc=-2</code></pre>

@@hint:zh
循环遍历 4 个值，每行用 <code>printf("x=%.1f floor=%d ceil=%d round=%d trunc=%d\\n", x, (int)floor(x), ...)</code>。注意 <code>%.1f</code> 配合负值会得到正确的 <code>-2.3</code>。期望第一行 "x=2.7 " 后面双空格 —— 实际只有单空格用 <code>%g</code> 自动决定宽度。

@@hint:en
Loop over 4 values; <code>printf("x=%-4g  floor=%d  ceil=%d  round=%d  trunc=%d\\n", x, ...)</code>. Use <code>%-4g</code> for left-aligned fixed-width float, plus double space.

@@starter
#include <stdio.h>
#include <math.h>

int main(void) {
    double xs[] = {2.7, 2.3, -2.3, -2.7};
    // 4 行 printf
    return 0;
}

@@answer
#include <stdio.h>
#include <math.h>

int main(void) {
    double xs[] = {2.7, 2.3, -2.3, -2.7};
    for (int i = 0; i < 4; i++) {
        double x = xs[i];
        printf("x=%-4g floor=%-2d ceil=%-2d round=%-2d trunc=%d\\n",
               x, (int)floor(x), (int)ceil(x), (int)round(x), (int)trunc(x));
    }
    return 0;
}

@@expectedOutput
x=2.7  floor=2  ceil=3  round=3  trunc=2
x=2.3  floor=2  ceil=3  round=2  trunc=2
x=-2.3 floor=-3 ceil=-2 round=-2 trunc=-2
x=-2.7 floor=-3 ceil=-2 round=-3 trunc=-2
`);
