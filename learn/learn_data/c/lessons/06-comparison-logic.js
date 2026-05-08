LEARN.lesson('c', 6, `
@@chapterRef c-operators

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead">用 if 判断之前，得先会"问问题"—— 这是关系运算符和逻辑运算符的活。它们的结果是一个 <code>int</code>：<strong>真为 1，假为 0</strong>。C89/C99 没有真正的 bool 类型（C99 加了 <code>&lt;stdbool.h&gt;</code> 包装但底层仍是 int）。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">关系运算符（比较两个值）</h3>
<table style="border-collapse:collapse;font-size:13px;">
<tr><td style="padding:2px 14px 2px 0;"><code>==</code></td><td>等于</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>!=</code></td><td>不等于</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>&lt;</code> &nbsp; <code>&gt;</code></td><td>小于 / 大于</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>&lt;=</code> <code>&gt;=</code></td><td>小于等于 / 大于等于</td></tr>
</table>
<p style="margin-top:10px;"><strong>巨坑提醒</strong>：<code>=</code> 是赋值，<code>==</code> 是判等。<code>if (a = 5)</code> 把 5 赋给 a 然后判断"5 是否真"（永远真），不是检查 a 等于 5！这个 bug 找几小时都常见。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">逻辑运算符（组合多个条件）</h3>
<table style="border-collapse:collapse;font-size:13px;">
<tr><td style="padding:2px 14px 2px 0;"><code>&amp;&amp;</code></td><td>与 — 两边都真才真</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>||</code></td><td>或 — 任一真就真</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>!</code></td><td>非 — 翻转真假</td></tr>
</table>
<p style="margin-top:10px;"><strong>短路求值</strong>：<code>&amp;&amp;</code> 左边为假就<strong>不计算</strong>右边；<code>||</code> 左边为真也不算右边。这有时是 bug 来源（依赖右侧副作用），但更多时候是优化技巧（<code>p != NULL &amp;&amp; p-&gt;x &gt; 0</code> 安全访问指针）。</p>

@@intro:en
<p class="lead">Before using <code>if</code>, you need to "ask questions" — that's what relational and logical operators do. Their result is an <code>int</code>: <strong>1 for true, 0 for false</strong>. C89/C99 has no real bool type (C99 added <code>&lt;stdbool.h&gt;</code> but it's still int underneath).</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Relational operators (compare two values)</h3>
<table style="border-collapse:collapse;font-size:13px;">
<tr><td style="padding:2px 14px 2px 0;"><code>==</code></td><td>equal</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>!=</code></td><td>not equal</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>&lt;</code> &nbsp; <code>&gt;</code></td><td>less / greater</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>&lt;=</code> <code>&gt;=</code></td><td>less-or-equal / greater-or-equal</td></tr>
</table>
<p style="margin-top:10px;"><strong>Big trap</strong>: <code>=</code> is assignment, <code>==</code> is equality. <code>if (a = 5)</code> assigns 5 to a then tests "is 5 truthy?" (always true) — it does NOT check that a equals 5. This is a classic hours-lost bug.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Logical operators (combine conditions)</h3>
<table style="border-collapse:collapse;font-size:13px;">
<tr><td style="padding:2px 14px 2px 0;"><code>&amp;&amp;</code></td><td>and — both sides true</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>||</code></td><td>or — either side true</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>!</code></td><td>not — flip true/false</td></tr>
</table>
<p style="margin-top:10px;"><strong>Short-circuit evaluation</strong>: with <code>&amp;&amp;</code>, if the left side is false the right side is <strong>not evaluated</strong>; same for <code>||</code> when the left side is true. Sometimes a footgun (if you depended on right-side side-effects), more often a useful tool (<code>p != NULL &amp;&amp; p-&gt;x &gt; 0</code> safely dereferences).</p>

@@task:zh
给 <code>int a = 5; int b = 10;</code>，按下面格式打印 7 个判断的结果（每行末尾 0 或 1）：
<pre><code>a == b: 0
a != b: 1
a < b: 1
a + b > 12: 1
(a > 0) && (b < 20): 1
(a < 0) || (b == 10): 1
!(a == b): 1</code></pre>

@@task:en
Given <code>int a = 5; int b = 10;</code>, print the 7 comparison results (each line ends with 0 or 1):
<pre><code>a == b: 0
a != b: 1
a < b: 1
a + b > 12: 1
(a > 0) && (b < 20): 1
(a < 0) || (b == 10): 1
!(a == b): 1</code></pre>

@@hint:zh
关系/逻辑运算符的结果就是 int，可以直接用 <code>%d</code> 打印：<code>printf("a == b: %d\\n", a == b);</code>

@@hint:en
The result of these operators is just an int — print with <code>%d</code>: <code>printf("a == b: %d\\n", a == b);</code>

@@starter
#include <stdio.h>

int main(void) {
    int a = 5;
    int b = 10;

    // 7 个 printf

    return 0;
}

@@answer
#include <stdio.h>

int main(void) {
    int a = 5;
    int b = 10;
    printf("a == b: %d\\n", a == b);
    printf("a != b: %d\\n", a != b);
    printf("a < b: %d\\n", a < b);
    printf("a + b > 12: %d\\n", a + b > 12);
    printf("(a > 0) && (b < 20): %d\\n", (a > 0) && (b < 20));
    printf("(a < 0) || (b == 10): %d\\n", (a < 0) || (b == 10));
    printf("!(a == b): %d\\n", !(a == b));
    return 0;
}

@@expectedOutput
a == b: 0
a != b: 1
a < b: 1
a + b > 12: 1
(a > 0) && (b < 20): 1
(a < 0) || (b == 10): 1
!(a == b): 1
`);
