LEARN.lesson('c', 31, `
@@chapterRef c-stdio

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead"><code>printf</code> 远不止 <code>%d</code> 和 <code>%s</code>。掌握完整的格式说明符语法，能让输出的对齐、精度、进制全部可控 —— 这是写 CLI 工具、调试输出、生成报表的基本功。</p>
<h3 style="margin:12px 0 6px;font-size:14px;">格式说明符的完整语法</h3>
<pre><code>%[flags][width][.precision][length]specifier</code></pre>
<p>从左到右每段都有用，但通常只用其中几段。先说核心：</p>
<h3 style="margin:12px 0 6px;font-size:14px;">specifier · 类型</h3>
<table style="border-collapse:collapse;font-size:13px;">
<tr><td style="padding:2px 14px 2px 0;"><code>%d</code> / <code>%i</code></td><td>十进制整数</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>%u</code></td><td>无符号十进制</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>%x</code> / <code>%X</code></td><td>十六进制（小写 / 大写）</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>%o</code></td><td>八进制</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>%f</code></td><td>浮点（默认 6 位小数）</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>%e</code></td><td>科学记数法 <code>1.500000e+02</code></td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>%g</code></td><td>%e / %f 中较短的</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>%c</code> / <code>%s</code></td><td>字符 / 字符串</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>%p</code></td><td>指针地址</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>%%</code></td><td>真的 %</td></tr>
</table>
<h3 style="margin:12px 0 6px;font-size:14px;">width · 最少占多少字符</h3>
<pre><code>printf("%5d", 42);     // "   42"  (右对齐，前面补空格)
printf("%-5d|", 42);   // "42   |" (- = 左对齐)
printf("%05d", 42);    // "00042"  (0 = 用 0 填充)</code></pre>
<h3 style="margin:12px 0 6px;font-size:14px;">precision · 小数位 / 最大字符数</h3>
<pre><code>printf("%.3f", 3.14159);   // "3.142"  (浮点：保留 3 位小数)
printf("%.5d", 42);        // "00042"  (整数：最少 5 位)
printf("%.3s", "Hello");   // "Hel"    (字符串：最多 3 字符)</code></pre>
<h3 style="margin:12px 0 6px;font-size:14px;">组合用</h3>
<pre><code>printf("%10.3f", 3.14159);   // "     3.142"  (宽 10，精度 3)
printf("%-10.3f|", 3.14159); // "3.142     |" (左对齐版)</code></pre>
<p style="color:var(--muted);font-size:12px;">小知识：<code>%d</code> 和 <code>%i</code> 在 <code>printf</code> 里完全等价；但在 <code>scanf</code> 里 <code>%i</code> 会自动识别 <code>0x</code>(hex) <code>0</code>(oct) 前缀，而 <code>%d</code> 只认十进制。</p>

@@intro:en
<p class="lead"><code>printf</code> goes far beyond <code>%d</code> and <code>%s</code>. Mastering the full format-specifier grammar gives you control over alignment, precision, and base — essential for CLI tools, debug output, and report generation.</p>
<h3 style="margin:12px 0 6px;font-size:14px;">Full format-specifier syntax</h3>
<pre><code>%[flags][width][.precision][length]specifier</code></pre>
<h3 style="margin:12px 0 6px;font-size:14px;">specifier · type</h3>
<table style="border-collapse:collapse;font-size:13px;">
<tr><td style="padding:2px 14px 2px 0;"><code>%d</code> / <code>%i</code></td><td>decimal int</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>%u</code></td><td>unsigned decimal</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>%x</code> / <code>%X</code></td><td>hex (lower / upper)</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>%o</code></td><td>octal</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>%f</code></td><td>float (default 6 decimals)</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>%e</code></td><td>scientific notation</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>%g</code></td><td>shorter of %e / %f</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>%c</code> / <code>%s</code></td><td>char / string</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>%p</code></td><td>pointer address</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>%%</code></td><td>literal %</td></tr>
</table>
<h3 style="margin:12px 0 6px;font-size:14px;">width · minimum character count</h3>
<pre><code>printf("%5d", 42);     // "   42"  (right-align, pad with spaces)
printf("%-5d|", 42);   // "42   |" (- = left-align)
printf("%05d", 42);    // "00042"  (0 = pad with zeros)</code></pre>
<h3 style="margin:12px 0 6px;font-size:14px;">precision · decimals / max chars</h3>
<pre><code>printf("%.3f", 3.14159);   // "3.142"
printf("%.5d", 42);        // "00042"
printf("%.3s", "Hello");   // "Hel"</code></pre>

@@task:zh
打印这些值，每行一个。注意宽度与对齐：
<pre><code>dec: 255
hex: ff
oct: 377
pi:  3.142
sci: 3.142e+00
[   42]
[42   ]
[00042]</code></pre>

@@task:en
Print these values, one per line. Mind the width and alignment:
<pre><code>dec: 255
hex: ff
oct: 377
pi:  3.142
sci: 3.142e+00
[   42]
[42   ]
[00042]</code></pre>

@@hint:zh
分别用 <code>%d</code> / <code>%x</code> / <code>%o</code> 同一个 255；<code>%.3f</code> 与 <code>%.3e</code> 打印 π；最后 3 行用 <code>%5d</code> / <code>%-5d</code> / <code>%05d</code> 包在 <code>[ ]</code> 里。

@@hint:en
Use <code>%d</code> / <code>%x</code> / <code>%o</code> on 255; <code>%.3f</code> / <code>%.3e</code> for pi; bracket-wrap 42 with <code>%5d</code> / <code>%-5d</code> / <code>%05d</code>.

@@starter
#include <stdio.h>

int main(void) {
    int   n  = 255;
    double pi = 3.14159265;
    int   x  = 42;
    // 8 行 printf
    return 0;
}

@@answer
#include <stdio.h>

int main(void) {
    int    n  = 255;
    double pi = 3.14159265;
    int    x  = 42;
    printf("dec: %d\\n", n);
    printf("hex: %x\\n", n);
    printf("oct: %o\\n", n);
    printf("pi:  %.3f\\n", pi);
    printf("sci: %.3e\\n", pi);
    printf("[%5d]\\n",  x);
    printf("[%-5d]\\n", x);
    printf("[%05d]\\n", x);
    return 0;
}

@@expectedOutput
dec: 255
hex: ff
oct: 377
pi:  3.142
sci: 3.142e+00
[   42]
[42   ]
[00042]
`);
