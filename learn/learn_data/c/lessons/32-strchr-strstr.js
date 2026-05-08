LEARN.lesson('c', 32, `
@@chapterRef c-string

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead"><code>&lt;string.h&gt;</code> 提供了一组在字符串里查找的函数。它们都返回<strong>指针</strong> —— 指向找到的位置，或 <code>NULL</code> 表示没找到。</p>
<table style="border-collapse:collapse;font-size:13px;">
<tr><td style="padding:2px 14px 2px 0;"><code>strchr(s, c)</code></td><td>找<strong>第一次</strong>出现的字符 c</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>strrchr(s, c)</code></td><td>找<strong>最后一次</strong>出现的 c（r = reverse）</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>strstr(s, sub)</code></td><td>找子串 sub 的第一次出现位置</td></tr>
</table>
<h3 style="margin:12px 0 6px;font-size:14px;">返回指针的好处</h3>
<pre><code>const char *s = "hello.world.txt";
const char *dot = strrchr(s, '.');     // 指向最后一个 '.'
if (dot) {
    printf("ext = %s\\n", dot + 1);     // dot+1 跳过 '.', 输出 "txt"
    printf("base len = %ld\\n", dot - s); // 指针差 = 字符个数
}</code></pre>
<p>"找文件扩展名" 是 strrchr 的经典用例 —— 因为路径里可能有多个 <code>.</code>（如 <code>archive.tar.gz</code>），只有最后一个划分扩展名。</p>
<h3 style="margin:12px 0 6px;font-size:14px;">strstr · 子串查找</h3>
<pre><code>const char *p = strstr("Hello World", "World");
// p 指向 W — 即原串的第 7 个字符
if (p) printf("found at offset %ld\\n", p - "Hello World");

if (strstr(line, "ERROR")) { /* 这一行包含 "ERROR" */ }</code></pre>
<p style="color:var(--muted);font-size:12px;">注意：strchr / strrchr 第二个参数<u>是 int</u>（不是 char），但通常传 <code>'a'</code> 这样的字符常量没问题。技术原因是历史规定；实际用 char 不会出错。</p>

@@intro:en
<p class="lead"><code>&lt;string.h&gt;</code> provides a family of search functions. All return <strong>pointers</strong> — to the found position, or <code>NULL</code> if not found.</p>
<table style="border-collapse:collapse;font-size:13px;">
<tr><td style="padding:2px 14px 2px 0;"><code>strchr(s, c)</code></td><td>find <strong>first</strong> occurrence of char c</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>strrchr(s, c)</code></td><td>find <strong>last</strong> occurrence (r = reverse)</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>strstr(s, sub)</code></td><td>find substring sub's first occurrence</td></tr>
</table>
<h3 style="margin:12px 0 6px;font-size:14px;">Why pointer return?</h3>
<pre><code>const char *s = "hello.world.txt";
const char *dot = strrchr(s, '.');
if (dot) {
    printf("ext = %s\\n", dot + 1);     // dot+1 skips the '.'
    printf("base len = %ld\\n", dot - s);// pointer diff = char count
}</code></pre>
<p>Finding file extensions is the classic use of strrchr — paths may contain multiple <code>.</code> chars (<code>archive.tar.gz</code>), only the last separates the extension.</p>
<h3 style="margin:12px 0 6px;font-size:14px;">strstr · substring search</h3>
<pre><code>if (strstr(line, "ERROR")) { /* line contains "ERROR" */ }</code></pre>

@@task:zh
对字符串 <code>"archive.tar.gz"</code>，找出文件扩展名（最后一个 <code>.</code> 之后）和"基础部分"长度（<code>.</code> 前面字符数）。再判断它是否包含子串 <code>"tar"</code>。输出：
<pre><code>ext: gz
base len: 11
contains "tar": yes</code></pre>

@@task:en
For <code>"archive.tar.gz"</code>, find the extension (after last <code>.</code>) and the base length (chars before that <code>.</code>). Then test whether it contains the substring <code>"tar"</code>. Output:
<pre><code>ext: gz
base len: 11
contains "tar": yes</code></pre>

@@hint:zh
<code>strrchr(s, '.')</code> → 指针 +1 是 ext；指针差是 base len；<code>strstr(s, "tar")</code> 非 NULL 即"包含"。注意 <code>%td</code> 或 <code>%ld</code> 打印指针差。

@@hint:en
<code>strrchr(s, '.')</code> → ptr+1 is ext; pointer diff is base len; <code>strstr(s, "tar")</code> non-NULL means it contains. Use <code>%ld</code> for pointer difference.

@@starter
#include <stdio.h>
#include <string.h>

int main(void) {
    const char *s = "archive.tar.gz";
    // 用 strrchr 找扩展名
    // 用 strstr 判断包含
    return 0;
}

@@answer
#include <stdio.h>
#include <string.h>

int main(void) {
    const char *s = "archive.tar.gz";
    const char *dot = strrchr(s, '.');
    printf("ext: %s\\n", dot + 1);
    printf("base len: %ld\\n", dot - s);
    printf("contains \\"tar\\": %s\\n", strstr(s, "tar") ? "yes" : "no");
    return 0;
}

@@expectedOutput
ext: gz
base len: 11
contains "tar": yes
`);
