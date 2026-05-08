LEARN.lesson('c', 36, `
@@chapterRef c-stdlib

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead">从用户输入 / 配置文件 / 网络协议拿到的"数字"通常是字符串。把字符串变成 <code>int</code> 或 <code>double</code>，就要用 <code>&lt;stdlib.h&gt;</code> 的转换函数。</p>
<table style="border-collapse:collapse;font-size:13px;">
<tr><td style="padding:2px 14px 2px 0;"><code>atoi(s)</code></td><td>str → int（简单但<strong>不报错</strong>）</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>atof(s)</code></td><td>str → double</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>strtol(s, &amp;end, base)</code></td><td>str → long，<strong>能检错</strong>且支持任意进制</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>strtod(s, &amp;end)</code></td><td>str → double，能检错</td></tr>
</table>
<h3 style="margin:12px 0 6px;font-size:14px;">atoi · 简单但有缺陷</h3>
<pre><code>atoi("42")      // 42
atoi("  42")    // 42  (跳过前导空白)
atoi("42abc")   // 42  (停在非数字)
atoi("abc")     // 0   ← 这就是问题：解析失败和"输入是 0"无法区分</code></pre>
<p>对严肃代码 <code>atoi</code> 是不够的 —— 输入 <code>"abc"</code> 它返回 0，输入 <code>"0"</code> 也返回 0，分不清"出错"还是"合法的零"。</p>
<h3 style="margin:12px 0 6px;font-size:14px;">strtol · 工业级版本</h3>
<pre><code>char *end;
long n = strtol("42abc", &amp;end, 10);
// n   = 42
// end = 指向 'a'（解析停止的位置）

if (*end != '\\0') {
    // 没全部解析完 → 输入有非法字符
}
if (end == s) {
    // 一个字符都没解析 → 完全解析失败
}</code></pre>
<p><strong>第三参数 <code>base</code></strong>: 0 = 自动识别（<code>0x</code>=hex, <code>0</code>=oct, 否则 dec）；2~36 = 指定进制。</p>
<pre><code>strtol("0xFF",  NULL, 0);   // 255 (识别 0x)
strtol("FF",    NULL, 16);  // 255 (强制 hex)
strtol("1010",  NULL, 2);   // 10  (二进制)</code></pre>

@@intro:en
<p class="lead">Numbers from user input / config files / network protocols arrive as strings. Converting them to <code>int</code> or <code>double</code> is the job of <code>&lt;stdlib.h&gt;</code> conversion functions.</p>
<table style="border-collapse:collapse;font-size:13px;">
<tr><td style="padding:2px 14px 2px 0;"><code>atoi(s)</code></td><td>str → int (simple, <strong>no error reporting</strong>)</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>atof(s)</code></td><td>str → double</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>strtol(s, &amp;end, base)</code></td><td>str → long, <strong>error-aware</strong>, any base</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>strtod(s, &amp;end)</code></td><td>str → double, error-aware</td></tr>
</table>
<h3 style="margin:12px 0 6px;font-size:14px;">atoi: simple but flawed</h3>
<pre><code>atoi("abc")     // 0   ← can't distinguish "parse failed" from a legitimate "0"</code></pre>
<h3 style="margin:12px 0 6px;font-size:14px;">strtol: industrial-grade</h3>
<pre><code>char *end;
long n = strtol("42abc", &amp;end, 10);
// n = 42, end -> 'a' (where parse stopped)
if (*end != '\\0') /* trailing garbage */;</code></pre>
<p><strong>base</strong>: 0 = auto-detect (0x=hex, 0=oct, else dec); 2..36 = explicit base.</p>

@@task:zh
对字符串 <code>"42abc"</code>：
<ol>
<li>用 <code>atoi</code> 转换并打印</li>
<li>用 <code>strtol</code> 转换并打印数值 + 解析停止位置的字符</li>
</ol>
再演示 <code>strtol("0xFF", NULL, 0)</code> 自动识别十六进制：
<pre><code>atoi: 42
strtol: 42, stopped at 'a'
hex: 255</code></pre>

@@task:en
For <code>"42abc"</code>:
<ol>
<li>convert with <code>atoi</code></li>
<li>convert with <code>strtol</code>, print value + stop char</li>
</ol>
Then demo <code>strtol("0xFF", NULL, 0)</code>:
<pre><code>atoi: 42
strtol: 42, stopped at 'a'
hex: 255</code></pre>

@@hint:zh
<code>char *end; long n = strtol("42abc", &amp;end, 10);</code> → end 是停止位置的指针，<code>*end</code> 就是那个字符。

@@hint:en
<code>char *end; long n = strtol("42abc", &amp;end, 10);</code> → end is the stop position; <code>*end</code> is that char.

@@starter
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    const char *s = "42abc";
    // atoi
    // strtol
    // strtol("0xFF", NULL, 0)
    return 0;
}

@@answer
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    const char *s = "42abc";
    printf("atoi: %d\\n", atoi(s));

    char *end;
    long n = strtol(s, &end, 10);
    printf("strtol: %ld, stopped at '%c'\\n", n, *end);

    long h = strtol("0xFF", NULL, 0);
    printf("hex: %ld\\n", h);
    return 0;
}

@@expectedOutput
atoi: 42
strtol: 42, stopped at 'a'
hex: 255
`);
