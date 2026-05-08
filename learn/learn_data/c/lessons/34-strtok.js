LEARN.lesson('c', 34, `
@@chapterRef c-string

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead"><code>strtok</code> 是 C 标准库里的 split 函数 —— 把一个字符串按分隔符切成若干段。它的接口很怪，第一次调用和后续调用参数不一样：</p>
<pre><code>char str[] = "apple,banana,cherry";
char *tok = strtok(str, ",");      // 第一次：传字符串
while (tok != NULL) {
    printf("%s\\n", tok);
    tok = strtok(NULL, ",");        // 后续：传 NULL！
}</code></pre>
<h3 style="margin:12px 0 6px;font-size:14px;">为什么后续传 NULL？</h3>
<p>strtok 用一个<u>静态变量</u>记住"上次切到哪里了"。第一次调用告诉它"切这个字符串"，后面 NULL 就是"继续上次那个"。这种基于静态状态的设计，意味着：</p>
<ul>
<li><strong>不可重入</strong>：不能在两个不同字符串之间穿插使用 strtok</li>
<li><strong>不是线程安全的</strong>：多线程同时调用会互相覆盖状态。线程安全版叫 <code>strtok_r</code></li>
</ul>
<h3 style="margin:12px 0 6px;font-size:14px;">strtok 会修改原字符串！</h3>
<p>strtok 通过<strong>把分隔符就地改成 <code>\\0</code></strong>来切分 —— 所以它需要一个<u>可写</u>的字符数组（不能传字符串字面量 <code>"a,b"</code>，那是只读内存，会崩）。这就是为什么例子里用 <code>char str[] = "..."</code>（数组）而不是 <code>const char *</code>。</p>
<pre><code>// 错误：会崩
char *str = "a,b,c";   // 字符串字面量在只读段
strtok(str, ",");       // segfault!

// 正确：数组在可写栈
char str[] = "a,b,c";
strtok(str, ",");</code></pre>
<h3 style="margin:12px 0 6px;font-size:14px;">分隔符可以是多个字符</h3>
<p>第二个参数其实是"<u>分隔符字符的集合</u>"。<code>strtok(s, " \\t\\n,")</code> 表示空格、tab、换行、逗号都算分隔符 —— 连续多个分隔符会被合并跳过。</p>

@@intro:en
<p class="lead"><code>strtok</code> is C's split function — break a string into pieces by delimiter. Its interface is unusual: first call differs from subsequent calls:</p>
<pre><code>char str[] = "apple,banana,cherry";
char *tok = strtok(str, ",");      // first call: pass string
while (tok != NULL) {
    printf("%s\\n", tok);
    tok = strtok(NULL, ",");        // subsequent: pass NULL!
}</code></pre>
<h3 style="margin:12px 0 6px;font-size:14px;">Why NULL on subsequent calls?</h3>
<p>strtok keeps the "where did I leave off" position in a <u>static variable</u>. The first call says "tokenize this string"; later NULL means "continue the previous one". Consequences:</p>
<ul>
<li><strong>Not re-entrant</strong>: can't interleave strtok over two different strings</li>
<li><strong>Not thread-safe</strong>: concurrent calls clobber each other. Thread-safe variant: <code>strtok_r</code></li>
</ul>
<h3 style="margin:12px 0 6px;font-size:14px;">strtok modifies the input!</h3>
<p>strtok works by <strong>overwriting delimiters with <code>\\0</code> in place</strong> — so it needs a <u>writable</u> char array (passing a string literal <code>"a,b"</code> is read-only memory and crashes).</p>
<pre><code>// WRONG: crashes
char *str = "a,b,c";    // literal in read-only segment
strtok(str, ",");        // segfault!

// CORRECT: array on writable stack
char str[] = "a,b,c";
strtok(str, ",");</code></pre>

@@task:zh
把字符串 <code>"red,green,blue,yellow"</code> 用 <code>strtok</code> 按逗号切分，每个色块单独打印一行：
<pre><code>red
green
blue
yellow</code></pre>

@@task:en
Tokenize <code>"red,green,blue,yellow"</code> by comma using <code>strtok</code>, print each color on its own line:
<pre><code>red
green
blue
yellow</code></pre>

@@hint:zh
记得用 <code>char str[] = "..."</code>（不是 <code>const char *</code>）。<code>char *p = strtok(str, ",")</code>，然后 <code>while (p) { printf...; p = strtok(NULL, ","); }</code>。

@@hint:en
Use <code>char str[] = "..."</code> (not <code>const char *</code>). <code>char *p = strtok(str, ",")</code>, then <code>while (p) { printf...; p = strtok(NULL, ","); }</code>.

@@starter
#include <stdio.h>
#include <string.h>

int main(void) {
    char str[] = "red,green,blue,yellow";
    // 用 strtok 按 "," 切分，逐行打印
    return 0;
}

@@answer
#include <stdio.h>
#include <string.h>

int main(void) {
    char str[] = "red,green,blue,yellow";
    char *p = strtok(str, ",");
    while (p != NULL) {
        printf("%s\\n", p);
        p = strtok(NULL, ",");
    }
    return 0;
}

@@expectedOutput
red
green
blue
yellow
`);
