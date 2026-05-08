LEARN.lesson('c', 28, `
@@chapterRef c-input-output

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead">scanf 是 C 标准的格式化输入函数，结构上和 printf 对称 —— 但有几个独有的"陷阱设计"必须搞清。</p>
<pre><code>int n;
scanf("%d", &amp;n);    // 读一个 int 进 n
// 注意：&amp;n 是 n 的地址 — scanf 要写到那里去
//       这是为什么"读字符串到 char[]"不用 &amp;（数组名已是地址）</code></pre>
<h3 style="margin:12px 0 6px;font-size:14px;">常用格式说明符</h3>
<table style="border-collapse:collapse;font-size:13px;">
<tr><td style="padding:2px 14px 2px 0;"><code>%d</code></td><td>int</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>%f</code></td><td>float（注意：scanf 用 %f 读 float、%lf 读 double，与 printf 不同！）</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>%c</code></td><td>单字符（不会跳过空白）</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>%s</code></td><td>字符串（读到下一个空白为止；<u>不</u>读空格）</td></tr>
</table>
<h3 style="margin:12px 0 6px;font-size:14px;">几个关键行为</h3>
<ul>
<li><strong>空白分隔</strong>：除 %c 外，所有说明符<u>自动跳过前导空白</u>（空格、换行、tab）。<code>"%d %d"</code> 和 <code>"%d%d"</code> 行为相同（都跳空白）。</li>
<li><strong>%s 不读空格</strong>：所以 <code>scanf("%s", name)</code> 读 "Bob Smith" 只会读到 "Bob"。要读整行用 <code>fgets</code>。</li>
<li><strong>缓冲区溢出</strong>：<code>%s</code> 不限制读入长度。读进 <code>char buf[10]</code> 但用户输入 100 字符 → 内存破坏。安全写法：<code>scanf("%9s", buf)</code> 限制最多 9 字符（留 1 给 <code>\\0</code>）。</li>
<li><strong>返回值</strong>：scanf 返回成功匹配的项数。检查这个值能判断输入是否合法。</li>
</ul>

@@intro:en
<p class="lead">scanf is C's standard formatted-input function — structurally symmetric to printf, but with a few unique "trap designs" you must know.</p>
<pre><code>int n;
scanf("%d", &amp;n);    // read one int into n
// Note: &amp;n is n's address — scanf writes there.
// That's why reading a string into char[] doesn't need &amp; (array name is already an address)</code></pre>
<h3 style="margin:12px 0 6px;font-size:14px;">Common format specifiers</h3>
<table style="border-collapse:collapse;font-size:13px;">
<tr><td style="padding:2px 14px 2px 0;"><code>%d</code></td><td>int</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>%f</code></td><td>float (note: scanf uses %f for float, %lf for double — unlike printf!)</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>%c</code></td><td>single char (does NOT skip whitespace)</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>%s</code></td><td>string (reads until next whitespace; doesn't read spaces)</td></tr>
</table>
<h3 style="margin:12px 0 6px;font-size:14px;">Key behaviors</h3>
<ul>
<li><strong>Whitespace separation</strong>: except %c, every specifier auto-skips leading whitespace. <code>"%d %d"</code> and <code>"%d%d"</code> behave identically.</li>
<li><strong>%s doesn't read spaces</strong>: <code>scanf("%s", name)</code> reading "Bob Smith" yields "Bob" only. For full lines, use <code>fgets</code>.</li>
<li><strong>Buffer overflow</strong>: <code>%s</code> doesn't bound length. Reading into <code>char buf[10]</code> with 100 chars input → memory corruption. Safer: <code>scanf("%9s", buf)</code> caps at 9 chars (leaving 1 for <code>\\0</code>).</li>
<li><strong>Return value</strong>: scanf returns the number of items successfully matched — check it to validate input.</li>
</ul>

@@task:zh
从 stdin 读入 <strong>"Alice 19 92.5"</strong>（一个字符串、一个 int、一个 float），按下面格式输出：
<pre><code>name: Alice
age: 19
score: 92.50</code></pre>
<p style="margin-top:8px;color:var(--muted);font-size:12px;">本课预填测试输入。</p>

@@task:en
Read <strong>"Alice 19 92.5"</strong> from stdin (a string, an int, a float). Output:
<pre><code>name: Alice
age: 19
score: 92.50</code></pre>

@@hint:zh
一个 scanf 搞定：<code>scanf("%s %d %f", name, &amp;age, &amp;score);</code>。注意 <code>name</code> 不写 &amp;，<code>age</code> / <code>score</code> 写 &amp;。

@@hint:en
One scanf does it: <code>scanf("%s %d %f", name, &amp;age, &amp;score);</code>. Note: no &amp; for <code>name</code>; &amp; for <code>age</code> / <code>score</code>.

@@starter
#include <stdio.h>

int main(void) {
    char  name[32];
    int   age;
    float score;
    // scanf 一次读三项，然后三个 printf

    return 0;
}

@@answer
#include <stdio.h>

int main(void) {
    char  name[32];
    int   age;
    float score;
    scanf("%s %d %f", name, &age, &score);
    printf("name: %s\\n", name);
    printf("age: %d\\n", age);
    printf("score: %.2f\\n", score);
    return 0;
}

@@expectedOutput
name: Alice
age: 19
score: 92.50

@@testInputs
Alice 19 92.5
`);
