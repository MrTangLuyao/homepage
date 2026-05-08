LEARN.lesson('c', 33, `
@@chapterRef c-string

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead"><code>strcpy / strcmp / strcat</code> 都不限制读写长度 —— 缓冲区不够大就会溢出，是 C 历史上最大的安全漏洞来源。<code>strn*</code> 系列加了一个"最多 n 字符"的边界，安全得多。</p>
<table style="border-collapse:collapse;font-size:13px;">
<tr><td style="padding:2px 14px 2px 0;"><code>strncpy(dst, src, n)</code></td><td>最多复制 n 字符</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>strncmp(a, b, n)</code></td><td>只比较前 n 字符</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>strncat(dst, src, n)</code></td><td>最多追加 n 字符</td></tr>
</table>
<h3 style="margin:12px 0 6px;font-size:14px;">strncpy 的关键陷阱</h3>
<pre><code>char buf[10];
strncpy(buf, "Hello, World!", 9);
buf[9] = '\\0';   // 关键：手动加 \\0</code></pre>
<p><strong>strncpy 不保证</strong>结果以 <code>\\0</code> 结尾 —— 当 src 比 n 长时，它复制满 n 字符就停，不留位置给 <code>\\0</code>。所以工程惯例是：复制 <code>n-1</code> 字符 + 手动写 <code>'\\0'</code>，留 1 字节安全空间。</p>
<h3 style="margin:12px 0 6px;font-size:14px;">strncmp · 只比较前缀</h3>
<pre><code>if (strncmp("hello", "help", 3) == 0) {
    // 前 3 字符相同 → "hel" == "hel" ✓
}
// 解析 HTTP 头时常用：
// strncmp(line, "Content-", 8) == 0</code></pre>
<h3 style="margin:12px 0 6px;font-size:14px;">strncat · 追加，但限制总量</h3>
<p>注意 strncat 的 <code>n</code> 是"<u>最多再追加多少字符</u>"，不是"目标缓冲区总大小"。要算够 <code>strlen(dst) + n + 1 ≤ buf_size</code>。</p>

@@intro:en
<p class="lead"><code>strcpy / strcmp / strcat</code> have no length bound — buffer overflows here are C's biggest historical security hole. The <code>strn*</code> family adds an "at most n chars" limit, which is much safer.</p>
<table style="border-collapse:collapse;font-size:13px;">
<tr><td style="padding:2px 14px 2px 0;"><code>strncpy(dst, src, n)</code></td><td>copy at most n chars</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>strncmp(a, b, n)</code></td><td>compare first n chars only</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>strncat(dst, src, n)</code></td><td>append at most n chars</td></tr>
</table>
<h3 style="margin:12px 0 6px;font-size:14px;">Critical strncpy gotcha</h3>
<pre><code>char buf[10];
strncpy(buf, "Hello, World!", 9);
buf[9] = '\\0';   // CRITICAL: manually NUL-terminate</code></pre>
<p><strong>strncpy does not guarantee</strong> a trailing <code>\\0</code> — when src is longer than n, it copies exactly n chars with no room for the terminator. Idiomatic pattern: copy <code>n-1</code> chars + manually write <code>'\\0'</code>.</p>
<h3 style="margin:12px 0 6px;font-size:14px;">strncmp · prefix match</h3>
<pre><code>if (strncmp("hello", "help", 3) == 0) {
    // first 3 chars match: "hel" == "hel"
}</code></pre>

@@task:zh
完成下面三件事：
<ol>
<li>用 <code>strncpy</code> 把 <code>"Hello, World!"</code> 的前 5 字符复制到 <code>char buf[6]</code>，加 <code>\\0</code>，打印</li>
<li>用 <code>strncmp</code> 比较 <code>"hello"</code> 和 <code>"help"</code> 的前 3 字符，输出 yes/no</li>
<li>用 <code>strncat</code> 拼接 <code>"foo"</code> + <code>"barbaz"</code> 的前 3 字符</li>
</ol>
<pre><code>copy: Hello
match first 3: yes
concat: foobar</code></pre>

@@task:en
Do three things:
<ol>
<li>strncpy first 5 chars of <code>"Hello, World!"</code> into <code>char buf[6]</code>, add <code>\\0</code>, print</li>
<li>strncmp first 3 chars of <code>"hello"</code> and <code>"help"</code>, print yes/no</li>
<li>strncat <code>"foo"</code> + first 3 chars of <code>"barbaz"</code></li>
</ol>
<pre><code>copy: Hello
match first 3: yes
concat: foobar</code></pre>

@@hint:zh
<code>strncpy(buf, "Hello, World!", 5); buf[5] = '\\0';</code><br>
<code>strncmp("hello", "help", 3) == 0 ? "yes" : "no"</code><br>
<code>char dst[16] = "foo"; strncat(dst, "barbaz", 3);</code>

@@hint:en
<code>strncpy(buf, "Hello, World!", 5); buf[5] = '\\0';</code><br>
<code>strncmp("hello", "help", 3) == 0 ? "yes" : "no"</code><br>
<code>char dst[16] = "foo"; strncat(dst, "barbaz", 3);</code>

@@starter
#include <stdio.h>
#include <string.h>

int main(void) {
    char buf[6];
    // strncpy + 手动 \\0
    // strncmp 判断
    char dst[16] = "foo";
    // strncat
    return 0;
}

@@answer
#include <stdio.h>
#include <string.h>

int main(void) {
    char buf[6];
    strncpy(buf, "Hello, World!", 5);
    buf[5] = '\\0';
    printf("copy: %s\\n", buf);

    int eq = strncmp("hello", "help", 3) == 0;
    printf("match first 3: %s\\n", eq ? "yes" : "no");

    char dst[16] = "foo";
    strncat(dst, "barbaz", 3);
    printf("concat: %s\\n", dst);

    return 0;
}

@@expectedOutput
copy: Hello
match first 3: yes
concat: foobar
`);
