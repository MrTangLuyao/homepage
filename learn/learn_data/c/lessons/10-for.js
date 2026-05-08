LEARN.lesson('c', 10, `
@@chapterRef c-loops

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead"><code>for</code> 是把"初始化 / 条件 / 步进"三件事写在一起的紧凑循环写法 —— 当你<strong>事先知道循环次数</strong>时它最清晰。</p>
<pre><code>for (初始化; 条件; 步进) {
    // 循环体
}</code></pre>
<p>等价于：</p>
<pre><code>初始化;
while (条件) {
    // 循环体
    步进;
}</code></pre>
<p>典型从 0 数到 N-1：</p>
<pre><code>for (int i = 0; i < 10; i++) {
    printf("%d ", i);
}
// 输出 0 1 2 3 4 5 6 7 8 9</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">三段都可以省略</h3>
<p>分号必须有，但表达式可以为空：</p>
<pre><code>for (;;) { ... }            // 死循环（习惯写法之一）
for (int i = 0; i < n; ) {  // 步进省略，循环体内部自己控制
    if (...) i += 2; else i++;
}</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">嵌套 for —— 二维问题的标准武器</h3>
<pre><code>for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
        printf("%d,%d  ", i, j);
    }
    printf("\\n");
}</code></pre>
<p>外层每跑一次，内层完整跑 3 次；总共执行 9 次。这是处理矩阵、嵌套数据、组合枚举的基础。<strong>性能小提醒</strong>：嵌套循环的复杂度是相乘的 —— 三层循环每层 1000 次就是 10 亿次操作，足以让程序卡几秒。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">break 在嵌套里只跳出一层</h3>
<p>C 没有 <code>break 2;</code> 这种语法。要从内层一路跳出，要么用标志变量 + 外层条件检查，要么<u>很罕见</u>地用 <code>goto</code>。</p>

@@intro:en
<p class="lead"><code>for</code> packs init / condition / increment into one line — the cleanest form when you <strong>know the iteration count up front</strong>.</p>
<pre><code>for (init; cond; step) {
    // body
}</code></pre>
<p>Equivalent to:</p>
<pre><code>init;
while (cond) {
    // body
    step;
}</code></pre>
<p>Classic 0 to N-1:</p>
<pre><code>for (int i = 0; i < 10; i++) {
    printf("%d ", i);
}
// outputs 0 1 2 3 4 5 6 7 8 9</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">All three parts may be empty</h3>
<p>The semicolons stay; the expressions can be omitted:</p>
<pre><code>for (;;) { ... }            // infinite loop (one of the idiomatic ways)
for (int i = 0; i < n; ) {  // no step — the body controls i
    if (...) i += 2; else i++;
}</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">Nested for — the workhorse for 2D problems</h3>
<pre><code>for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
        printf("%d,%d  ", i, j);
    }
    printf("\\n");
}</code></pre>
<p>For each outer iteration, the inner loop runs fully (3 times); total 9 iterations. This is your foundation for matrices, nested data, combination enumeration. <strong>Perf note</strong>: nested loop costs multiply — three levels × 1000 each = 1 billion operations, easily a multi-second freeze.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">break only exits one level</h3>
<p>C has no <code>break 2;</code> syntax. To break out from the inner loop, use a flag variable + outer-loop test, or — rarely — <code>goto</code>.</p>

@@task:zh
打印中国传统的"九九乘法表"（只下三角部分），用嵌套 for：
<pre><code>1*1=1
2*1=2 2*2=4
3*1=3 3*2=6 3*3=9
4*1=4 4*2=8 4*3=12 4*4=16
5*1=5 5*2=10 5*3=15 5*4=20 5*5=25
6*1=6 6*2=12 6*3=18 6*4=24 6*5=30 6*6=36
7*1=7 7*2=14 7*3=21 7*4=28 7*5=35 7*6=42 7*7=49
8*1=8 8*2=16 8*3=24 8*4=32 8*5=40 8*6=48 8*7=56 8*8=64
9*1=9 9*2=18 9*3=27 9*4=36 9*5=45 9*6=54 9*7=63 9*8=72 9*9=81</code></pre>
<p style="margin-top:8px;color:var(--muted);font-size:12px;">
<strong>关键</strong>：每一项之间用<u>一个空格</u>分隔，每行末尾换行（一个 <code>\\n</code>）。
</p>

@@task:en
Print the Chinese 9×9 multiplication table (lower-triangle only), using nested for:
<pre><code>1*1=1
2*1=2 2*2=4
3*1=3 3*2=6 3*3=9
4*1=4 4*2=8 4*3=12 4*4=16
5*1=5 5*2=10 5*3=15 5*4=20 5*5=25
6*1=6 6*2=12 6*3=18 6*4=24 6*5=30 6*6=36
7*1=7 7*2=14 7*3=21 7*4=28 7*5=35 7*6=42 7*7=49
8*1=8 8*2=16 8*3=24 8*4=32 8*5=40 8*6=48 8*7=56 8*8=64
9*1=9 9*2=18 9*3=27 9*4=36 9*5=45 9*6=54 9*7=63 9*8=72 9*9=81</code></pre>
<p style="margin-top:8px;color:var(--muted);font-size:12px;">
<strong>Key</strong>: items separated by a <u>single space</u>, each row ends with a newline (<code>\\n</code>).
</p>

@@hint:zh
外层 <code>i = 1..9</code>，内层 <code>j = 1..i</code>（保证下三角）。<strong>注意</strong>项之间用一个空格但行末不能有多余空格 —— 用 <code>if (j > 1) printf(" ");</code> 然后 <code>printf("%d*%d=%d", i, j, i*j)</code>，内层循环结束后 <code>printf("\\n")</code>。

@@hint:en
Outer <code>i = 1..9</code>, inner <code>j = 1..i</code> (lower triangle). <strong>Watch out</strong>: items separated by a single space but no trailing space — use <code>if (j > 1) printf(" ");</code> then <code>printf("%d*%d=%d", i, j, i*j)</code>; after inner loop, <code>printf("\\n")</code>.

@@starter
#include <stdio.h>

int main(void) {
    // 嵌套 for 打印九九乘法表（下三角）

    return 0;
}

@@answer
#include <stdio.h>

int main(void) {
    for (int i = 1; i <= 9; i++) {
        for (int j = 1; j <= i; j++) {
            if (j > 1) printf(" ");
            printf("%d*%d=%d", i, j, i * j);
        }
        printf("\\n");
    }
    return 0;
}

@@expectedOutput
1*1=1
2*1=2 2*2=4
3*1=3 3*2=6 3*3=9
4*1=4 4*2=8 4*3=12 4*4=16
5*1=5 5*2=10 5*3=15 5*4=20 5*5=25
6*1=6 6*2=12 6*3=18 6*4=24 6*5=30 6*6=36
7*1=7 7*2=14 7*3=21 7*4=28 7*5=35 7*6=42 7*7=49
8*1=8 8*2=16 8*3=24 8*4=32 8*5=40 8*6=48 8*7=56 8*8=64
9*1=9 9*2=18 9*3=27 9*4=36 9*5=45 9*6=54 9*7=63 9*8=72 9*9=81
`);
