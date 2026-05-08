LEARN.lesson('c', 40, `
@@chapterRef c-math

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead">C 的三角函数也住在 <code>&lt;math.h&gt;</code>。<strong>关键约定：所有角度单位都是<u>弧度</u></strong>（radians），不是度数（degrees）。</p>
<table style="border-collapse:collapse;font-size:13px;">
<tr><td style="padding:2px 14px 2px 0;"><code>sin(x)</code> / <code>cos(x)</code> / <code>tan(x)</code></td><td>正弦 / 余弦 / 正切（x 单位 = 弧度）</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>asin(x)</code> / <code>acos(x)</code> / <code>atan(x)</code></td><td>反三角，返回弧度</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>atan2(y, x)</code></td><td>反正切，但用四象限信息得到 [-π, π]</td></tr>
</table>
<h3 style="margin:12px 0 6px;font-size:14px;">M_PI 不是标准</h3>
<p>常量 <code>M_PI</code>（≈3.14159265358979）<u>不是</u>标准 C 的一部分 —— 它是 POSIX 扩展。GCC / Clang / emcc 默认提供，但严格 ISO 模式下可能没有。可移植的写法：</p>
<pre><code>#ifndef M_PI
#define M_PI 3.14159265358979323846
#endif

// 或者直接：
const double PI = 3.14159265358979323846;</code></pre>
<h3 style="margin:12px 0 6px;font-size:14px;">度 ↔ 弧度</h3>
<pre><code>double radians = degrees * M_PI / 180.0;
double degrees = radians * 180.0 / M_PI;</code></pre>
<h3 style="margin:12px 0 6px;font-size:14px;">浮点近似的真相</h3>
<p><code>sin(0)</code> 你期望得到精确的 0，确实如此。但 <code>sin(M_PI)</code> 不会得到 0 —— 因为 M_PI 本身只是 π 的浮点近似（精度 ~16 位），sin 在这个略有偏差的输入上算出来约 <code>1.2246e-16</code>。这不是 sin 的 bug，而是浮点数的本质。</p>
<pre><code>sin(0)        // 0
cos(0)        // 1
sin(M_PI)     // 约 1.22e-16 (而非 0)
sin(M_PI / 2) // 1
cos(M_PI / 2) // 约 6.12e-17 (而非 0)</code></pre>

@@intro:en
<p class="lead">C's trig functions also live in <code>&lt;math.h&gt;</code>. <strong>Key convention: all angles are in <u>radians</u></strong>, not degrees.</p>
<table style="border-collapse:collapse;font-size:13px;">
<tr><td style="padding:2px 14px 2px 0;"><code>sin / cos / tan</code></td><td>argument in radians</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>asin / acos / atan</code></td><td>return radians</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>atan2(y, x)</code></td><td>four-quadrant arctan, [-π, π]</td></tr>
</table>
<h3 style="margin:12px 0 6px;font-size:14px;">M_PI is not standard</h3>
<p><code>M_PI</code> is a POSIX extension, not ISO C. GCC / Clang / emcc provide it by default, but strict ISO mode may not. Portable:</p>
<pre><code>#ifndef M_PI
#define M_PI 3.14159265358979323846
#endif</code></pre>
<h3 style="margin:12px 0 6px;font-size:14px;">Degrees ↔ radians</h3>
<pre><code>double radians = degrees * M_PI / 180.0;</code></pre>

@@task:zh
打印 sin/cos 在几个标志性角度的值（小数 2 位）：
<pre><code>sin(0)    = 0.00
cos(0)    = 1.00
sin(PI/2) = 1.00
cos(PI/2) = 0.00
sin(PI/6) = 0.50</code></pre>
<p style="color:var(--muted);font-size:12px;">注意 <code>cos(PI/2)</code> 用 <code>%.2f</code> 会得到 0.00（小到 6e-17 的浮点近似在两位小数下圆为 0）。</p>

@@task:en
Print sin/cos at canonical angles (2 decimal precision):
<pre><code>sin(0)    = 0.00
cos(0)    = 1.00
sin(PI/2) = 1.00
cos(PI/2) = 0.00
sin(PI/6) = 0.50</code></pre>

@@hint:zh
<code>const double PI = M_PI;</code> 然后 <code>sin(0.0)</code>、<code>cos(0.0)</code>、<code>sin(PI/2.0)</code>、<code>cos(PI/2.0)</code>、<code>sin(PI/6.0)</code>。用 <code>%.2f</code>。

@@hint:en
Use <code>M_PI</code> directly. Format with <code>%.2f</code>.

@@starter
#include <stdio.h>
#include <math.h>

int main(void) {
    // 5 行 printf
    return 0;
}

@@answer
#include <stdio.h>
#include <math.h>

int main(void) {
    printf("sin(0)    = %.2f\\n", sin(0.0));
    printf("cos(0)    = %.2f\\n", cos(0.0));
    printf("sin(PI/2) = %.2f\\n", sin(M_PI / 2.0));
    printf("cos(PI/2) = %.2f\\n", cos(M_PI / 2.0));
    printf("sin(PI/6) = %.2f\\n", sin(M_PI / 6.0));
    return 0;
}

@@expectedOutput
sin(0)    = 0.00
cos(0)    = 1.00
sin(PI/2) = 1.00
cos(PI/2) = 0.00
sin(PI/6) = 0.50
`);
