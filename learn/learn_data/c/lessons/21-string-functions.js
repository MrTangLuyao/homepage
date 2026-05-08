LEARN.lesson('c', 21, `
@@chapterRef c-strings

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead">手动遍历字符串太繁琐 —— <code>&lt;string.h&gt;</code> 提供了一组久经考验的函数。四个最常用的：</p>
<table style="border-collapse:collapse;font-size:13px;">
<tr><td style="padding:2px 14px 2px 0;"><code>strlen(s)</code></td><td>返回字符串长度（不含 <code>\\0</code>）</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>strcpy(dst, src)</code></td><td>把 src 拷贝到 dst（含 <code>\\0</code>）</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>strcat(dst, src)</code></td><td>把 src 接在 dst 后面</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>strcmp(a, b)</code></td><td>比较：相等返 0，a&lt;b 返负，a&gt;b 返正</td></tr>
</table>
<pre><code>#include &lt;string.h&gt;

char a[20] = "Hello";
char b[]   = ", World!";
strcat(a, b);              // a 现在是 "Hello, World!"
printf("len = %zu\\n", strlen(a));     // 13
printf("eq?  = %d\\n", strcmp(a, "x"));  // 非 0</code></pre>
<h3 style="margin:12px 0 6px;font-size:14px;">致命陷阱：缓冲区溢出</h3>
<p><code>strcpy</code> 和 <code>strcat</code> <strong>不检查目标空间够不够</strong>。如果 dst 不够大，写飞，破坏邻近内存。这是 C 安全漏洞最大的来源之一。</p>
<pre><code>char small[5];
strcpy(small, "Hello, World!");   // 写入 14 字节到 5 字节空间 → UB</code></pre>
<p>更安全的版本：<code>strncpy(dst, src, n)</code> / <code>strncat(dst, src, n)</code>，限制最多 n 字节。但这俩也有自己的坑（strncpy 不保证加 <code>\\0</code>）—— 现代 C 推荐 <code>snprintf</code>。</p>
<h3 style="margin:12px 0 6px;font-size:14px;">strcmp 的返回值用法</h3>
<p>判等用 <code>strcmp(a, b) == 0</code>。<strong>不能</strong>用 <code>a == b</code> —— 那是比较两个 char 指针的地址值。</p>

@@intro:en
<p class="lead">Manual string traversal is tedious — <code>&lt;string.h&gt;</code> provides battle-tested functions. The four most-used:</p>
<table style="border-collapse:collapse;font-size:13px;">
<tr><td style="padding:2px 14px 2px 0;"><code>strlen(s)</code></td><td>length (excluding <code>\\0</code>)</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>strcpy(dst, src)</code></td><td>copy src into dst (including <code>\\0</code>)</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>strcat(dst, src)</code></td><td>append src onto dst</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>strcmp(a, b)</code></td><td>compare: 0 if equal, negative if a&lt;b, positive if a&gt;b</td></tr>
</table>
<h3 style="margin:12px 0 6px;font-size:14px;">Lethal trap: buffer overflow</h3>
<p><code>strcpy</code> and <code>strcat</code> <strong>don't check destination size</strong>. If dst is too small, they overrun, corrupting adjacent memory. C's #1 security hole class.</p>
<p>Safer: <code>strncpy</code> / <code>strncat</code> with size limit; modern C prefers <code>snprintf</code>.</p>
<h3 style="margin:12px 0 6px;font-size:14px;">Using strcmp's return value</h3>
<p>Equality test: <code>strcmp(a, b) == 0</code>. <strong>Don't</strong> use <code>a == b</code> — that compares two char pointers' addresses.</p>

@@task:zh
给定两个字符串：<code>char first[50] = "Hello";</code> 和 <code>char last[] = ", World!";</code>。先打印 <code>first</code> 的长度，再用 strcat 连接 last，再打印新长度和拼接结果。比较 first 和 "Hello" 是否相等并打印。期望输出：
<pre><code>len before: 5
len after: 13
joined: Hello, World!
equal to "Hello"? 0</code></pre>

@@task:en
Given <code>char first[50] = "Hello";</code> and <code>char last[] = ", World!";</code>. Print first's length, strcat last onto it, print new length + joined string, then compare to "Hello":
<pre><code>len before: 5
len after: 13
joined: Hello, World!
equal to "Hello"? 0</code></pre>

@@hint:zh
strlen 返回 <code>size_t</code>，用 <code>%zu</code>（或强制转 <code>(int)</code> 用 <code>%d</code>）。strcmp 返回非 0 即"不等"，期望输出最后一行是 <code>0</code>。

@@hint:en
strlen returns <code>size_t</code>; print with <code>%zu</code> (or cast to <code>(int)</code> + <code>%d</code>). strcmp returns non-0 for "not equal" — expected last line is <code>0</code>.

@@starter
#include <stdio.h>
#include <string.h>

int main(void) {
    char first[50] = "Hello";
    char last[]    = ", World!";
    // 打印长度、拼接、再打印、比较

    return 0;
}

@@answer
#include <stdio.h>
#include <string.h>

int main(void) {
    char first[50] = "Hello";
    char last[]    = ", World!";
    printf("len before: %d\\n", (int)strlen(first));
    strcat(first, last);
    printf("len after: %d\\n", (int)strlen(first));
    printf("joined: %s\\n", first);
    printf("equal to \\"Hello\\"? %d\\n", strcmp(first, "Hello") == 0);
    return 0;
}

@@expectedOutput
len before: 5
len after: 13
joined: Hello, World!
equal to "Hello"? 0
`);
