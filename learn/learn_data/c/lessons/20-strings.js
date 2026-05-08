LEARN.lesson('c', 20, `
@@chapterRef c-strings

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead">C 没有专门的字符串类型。<strong>字符串就是 char 数组</strong>，约定以 <code>'\\0'</code>（值为 0 的字节，叫"空字符"）<strong>结尾</strong>。所有标准库的字符串函数都依赖这个约定 —— 它们一直读到遇见 <code>\\0</code> 才停。</p>
<pre><code>char s1[6] = {'H','e','l','l','o','\\0'};   // 显式
char s2[]  = "Hello";                       // 编译器自动加 \\0，size=6
char *s3   = "Hello";                       // 字符串字面量（常量区，不要试图修改）</code></pre>
<p><strong>"Hello" 占 6 字节</strong>（5 字符 + 终止符），不是 5。这个 +1 是 C 字符串内存计算的常见错误来源。</p>
<h3 style="margin:12px 0 6px;font-size:14px;">printf 用 <code>%s</code></h3>
<pre><code>char s[] = "World";
printf("Hello, %s!\\n", s);    // Hello, World!</code></pre>
<p><code>%s</code> 接收 char 指针（数组名 decay），从那里一直打印直到 <code>\\0</code>。</p>
<h3 style="margin:12px 0 6px;font-size:14px;">手动遍历到结尾</h3>
<p>看看字符串的真面目 —— 一个一个字符读：</p>
<pre><code>char s[] = "Hi";
for (int i = 0; s[i] != '\\0'; i++) {
    putchar(s[i]);    // H, i
}</code></pre>
<p>常见 bug：在固定大小的 char 数组里写入字符串忘了留 <code>\\0</code> 的空间，导致后续 <code>%s</code> 读飞（一直读到下一个偶然出现的 0 字节）。</p>

@@intro:en
<p class="lead">C has no dedicated string type. <strong>A string is a char array</strong>, by convention <strong>terminated with <code>'\\0'</code></strong> (a zero byte, the "null character"). All standard library string functions rely on this — they keep reading until they hit <code>\\0</code>.</p>
<pre><code>char s1[6] = {'H','e','l','l','o','\\0'};   // explicit
char s2[]  = "Hello";                       // compiler adds \\0, size=6
char *s3   = "Hello";                       // string literal (read-only memory)</code></pre>
<p><strong>"Hello" takes 6 bytes</strong> (5 chars + terminator), not 5. This +1 is a frequent source of off-by-one bugs.</p>
<h3 style="margin:12px 0 6px;font-size:14px;">printf with <code>%s</code></h3>
<pre><code>char s[] = "World";
printf("Hello, %s!\\n", s);    // Hello, World!</code></pre>
<p><code>%s</code> takes a char pointer (array name decays), prints from there until <code>\\0</code>.</p>
<h3 style="margin:12px 0 6px;font-size:14px;">Manual traversal to terminator</h3>
<pre><code>char s[] = "Hi";
for (int i = 0; s[i] != '\\0'; i++) {
    putchar(s[i]);    // H, i
}</code></pre>
<p>Common bug: writing into a fixed-size char buffer without leaving room for the <code>\\0</code> — subsequent <code>%s</code> reads keep going until some random next zero byte.</p>

@@task:zh
给定 <code>char s[] = "Hello";</code>，<strong>用循环逐字符</strong>打印每个字符及其 ASCII 值（用 <code>'\\0' != s[i]</code> 判断结束），最后单独一行打印总长度。期望输出：
<pre><code>s[0] = H (72)
s[1] = e (101)
s[2] = l (108)
s[3] = l (108)
s[4] = o (111)
length = 5</code></pre>

@@task:en
Given <code>char s[] = "Hello";</code>, <strong>iterate character by character</strong> printing each char + its ASCII value (loop until <code>'\\0'</code>); finally print the length:
<pre><code>s[0] = H (72)
s[1] = e (101)
s[2] = l (108)
s[3] = l (108)
s[4] = o (111)
length = 5</code></pre>

@@hint:zh
循环条件 <code>s[i] != '\\0'</code>。打印用 <code>printf("s[%d] = %c (%d)\\n", i, s[i], s[i]);</code> —— %c 输出字符，%d 输出 ASCII。

@@hint:en
Loop condition <code>s[i] != '\\0'</code>. Print with <code>printf("s[%d] = %c (%d)\\n", i, s[i], s[i]);</code> — %c for char, %d for ASCII.

@@starter
#include <stdio.h>

int main(void) {
    char s[] = "Hello";
    int i = 0;
    // 循环到 \\0

    return 0;
}

@@answer
#include <stdio.h>

int main(void) {
    char s[] = "Hello";
    int i = 0;
    while (s[i] != '\\0') {
        printf("s[%d] = %c (%d)\\n", i, s[i], s[i]);
        i++;
    }
    printf("length = %d\\n", i);
    return 0;
}

@@expectedOutput
s[0] = H (72)
s[1] = e (101)
s[2] = l (108)
s[3] = l (108)
s[4] = o (111)
length = 5
`);
