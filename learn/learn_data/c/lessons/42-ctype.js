LEARN.lesson('c', 42, `
@@chapterRef c-ctype

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead"><code>&lt;ctype.h&gt;</code> 提供一组小函数，分类和转换<u>单个字符</u>。比起手写 <code>c &gt;= '0' &amp;&amp; c &lt;= '9'</code> 这种判断，它们更易读、可移植，也能正确处理本地化。</p>
<h3 style="margin:12px 0 6px;font-size:14px;">分类函数（is*）</h3>
<table style="border-collapse:collapse;font-size:13px;">
<tr><td style="padding:2px 14px 2px 0;"><code>isdigit(c)</code></td><td>0-9</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>isalpha(c)</code></td><td>字母 a-z, A-Z</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>isalnum(c)</code></td><td>字母或数字</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>isspace(c)</code></td><td>空白：空格、tab、换行、回车、垂直 tab、换页</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>isupper(c)</code> / <code>islower(c)</code></td><td>大写 / 小写字母</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>ispunct(c)</code></td><td>标点（非字母数字非空白的可打印）</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>isxdigit(c)</code></td><td>十六进制位 0-9 a-f A-F</td></tr>
</table>
<p>所有 is* 都返回非 0 表示"是"，0 表示"不是" —— 不一定返回 1。所以判断只用 <code>if (isdigit(c))</code>，<u>别</u>写 <code>if (isdigit(c) == 1)</code>。</p>
<h3 style="margin:12px 0 6px;font-size:14px;">转换函数</h3>
<pre><code>tolower('A')   // 'a'
tolower('a')   // 'a'  (本来就小写，原样返回)
tolower('5')   // '5'  (非字母原样返回)
toupper('z')   // 'Z'</code></pre>
<h3 style="margin:12px 0 6px;font-size:14px;">参数类型的小坑</h3>
<p>所有 ctype 函数<strong>形式上都接 int</strong>（不是 char）—— 它们期望<u>非负值</u> 或 EOF。问题在 char 是 signed 还是 unsigned 由实现决定 —— 当 char 是 signed 时，传入 <code>0x80</code> 以上的字符会变成负数，行为是 UB。</p>
<pre><code>// 安全做法：先转 unsigned char
int c = ...;
if (isalpha((unsigned char)c)) { ... }</code></pre>

@@intro:en
<p class="lead"><code>&lt;ctype.h&gt;</code> provides small functions to classify and transform <u>single characters</u>. More readable and portable than hand-rolled <code>c &gt;= '0' &amp;&amp; c &lt;= '9'</code> checks.</p>
<h3 style="margin:12px 0 6px;font-size:14px;">Classification (is*)</h3>
<table style="border-collapse:collapse;font-size:13px;">
<tr><td style="padding:2px 14px 2px 0;"><code>isdigit(c)</code></td><td>0-9</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>isalpha(c)</code></td><td>letter</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>isalnum(c)</code></td><td>letter or digit</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>isspace(c)</code></td><td>any whitespace</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>isupper / islower</code></td><td>case</td></tr>
</table>
<p>All is* return non-zero (not necessarily 1) for "yes". Use <code>if (isdigit(c))</code> — never <code>== 1</code>.</p>
<h3 style="margin:12px 0 6px;font-size:14px;">Conversion</h3>
<pre><code>tolower('A')   // 'a'
toupper('z')   // 'Z'
tolower('5')   // '5'  (non-letter passes through)</code></pre>
<h3 style="margin:12px 0 6px;font-size:14px;">Parameter type pitfall</h3>
<p>All ctype functions take <code>int</code>, expecting non-negative or EOF. With signed char, bytes ≥ 0x80 become negative — UB. Cast first: <code>isalpha((unsigned char)c)</code>.</p>

@@task:zh
对字符串 <code>"Hello, C123!"</code>：
<ol>
<li>统计字母个数（用 isalpha）</li>
<li>统计数字个数（用 isdigit）</li>
<li>用 toupper 把所有字母转大写后打印整个字符串</li>
</ol>
<pre><code>letters: 6
digits: 3
upper: HELLO, C123!</code></pre>

@@task:en
For <code>"Hello, C123!"</code>:
<ol>
<li>count letters (isalpha)</li>
<li>count digits (isdigit)</li>
<li>upcase all letters with toupper, print the whole string</li>
</ol>
<pre><code>letters: 6
digits: 3
upper: HELLO, C123!</code></pre>

@@hint:zh
循环每个字符 <code>c</code>：累加 <code>isalpha(c)?1:0</code> 和 <code>isdigit(c)?1:0</code>。第三行：<code>toupper(c)</code> 已经对非字母原样返回，所以可以无条件 <code>putchar(toupper(c))</code>。

@@hint:en
Loop each char: count <code>isalpha(c)</code> and <code>isdigit(c)</code>. For the upper line, <code>putchar(toupper(c))</code> works for every char (toupper passes non-letters through).

@@starter
#include <stdio.h>
#include <ctype.h>
#include <string.h>

int main(void) {
    const char *s = "Hello, C123!";
    int letters = 0, digits = 0;
    // 循环统计
    // 打印结果 + 大写
    return 0;
}

@@answer
#include <stdio.h>
#include <ctype.h>
#include <string.h>

int main(void) {
    const char *s = "Hello, C123!";
    int letters = 0, digits = 0;
    for (size_t i = 0; s[i]; i++) {
        if (isalpha((unsigned char)s[i])) letters++;
        if (isdigit((unsigned char)s[i])) digits++;
    }
    printf("letters: %d\\n", letters);
    printf("digits: %d\\n", digits);

    printf("upper: ");
    for (size_t i = 0; s[i]; i++) {
        putchar(toupper((unsigned char)s[i]));
    }
    putchar('\\n');
    return 0;
}

@@expectedOutput
letters: 6
digits: 3
upper: HELLO, C123!
`);
