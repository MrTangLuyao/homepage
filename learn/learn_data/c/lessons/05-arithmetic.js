LEARN.lesson('c', 5, `
@@chapterRef c-operators

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead">C 的算术运算符就五个：<code>+</code> 加、<code>-</code> 减、<code>*</code> 乘、<code>/</code> 除、<code>%</code> 取余。语法直觉，但 <code>/</code> 藏着<strong>初学者最常踩的陷阱</strong>。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">整除的陷阱</h3>
<p>当 <code>/</code> 两侧都是<strong>整数</strong>时，结果也是整数 —— 小数部分<strong>直接丢弃</strong>（向 0 截断），不是四舍五入。</p>
<pre><code>7 / 2     // 结果 3，不是 3.5
7 / 4     // 结果 1，不是 1.75
-7 / 2    // 结果 -3，向 0 截断（不是 -4）</code></pre>
<p>要得到浮点结果，必须让至少<strong>一侧是浮点</strong>：</p>
<pre><code>7 / 2.0       // 3.5  （字面量 2.0 是 double）
(float)7 / 2  // 3.5  （强制转换 cast）
7.0 / 2       // 3.5</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">取余 <code>%</code></h3>
<p><code>%</code> 只能用于整数（不能 <code>3.14 % 2</code>）。<code>a % b</code> 是 <code>a</code> 除以 <code>b</code> 的余数：</p>
<pre><code>7  % 3   // 1
10 % 5   // 0  （能整除）
9  % 4   // 1</code></pre>
<p><strong>用途</strong>：判断奇偶（<code>n % 2 == 0</code>）、循环计数模 N、提取个位数（<code>123 % 10 == 3</code>）等。</p>

@@intro:en
<p class="lead">C has five arithmetic operators: <code>+</code> add, <code>-</code> subtract, <code>*</code> multiply, <code>/</code> divide, <code>%</code> remainder. The syntax is obvious, but <code>/</code> hides <strong>the most common beginner trap</strong>.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">The integer-division trap</h3>
<p>When both sides of <code>/</code> are <strong>integers</strong>, the result is an integer — the fractional part is <strong>truncated toward zero</strong>, not rounded.</p>
<pre><code>7 / 2     // 3, not 3.5
7 / 4     // 1, not 1.75
-7 / 2    // -3 (truncates toward 0, not -4)</code></pre>
<p>To get a float result, at least <strong>one side must be a float</strong>:</p>
<pre><code>7 / 2.0       // 3.5  (literal 2.0 is a double)
(float)7 / 2  // 3.5  (explicit cast)
7.0 / 2       // 3.5</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">Modulo <code>%</code></h3>
<p><code>%</code> works on integers only (no <code>3.14 % 2</code>). <code>a % b</code> is the remainder of <code>a / b</code>:</p>
<pre><code>7  % 3   // 1
10 % 5   // 0  (divides evenly)
9  % 4   // 1</code></pre>
<p><strong>Uses</strong>: parity check (<code>n % 2 == 0</code>), counter modulo N, extracting last digit (<code>123 % 10 == 3</code>).</p>

@@task:zh
给 <code>int a = 7; int b = 4;</code>，计算并按下面格式打印（最后一行的"真平均"用浮点，保留两位小数）：
<pre><code>Sum: 11
Diff: 3
Prod: 28
IntDiv: 1
Rem: 3
TrueAvg: 5.50</code></pre>
<p style="margin-top:8px;color:var(--muted);font-size:12px;">
<strong>关键考点</strong>：直接写 <code>(a + b) / 2</code> 得到的是整数 5，不是 5.50。需要 cast：<code>(float)(a + b) / 2</code>。
</p>

@@task:en
Given <code>int a = 7; int b = 4;</code>, compute and print:
<pre><code>Sum: 11
Diff: 3
Prod: 28
IntDiv: 1
Rem: 3
TrueAvg: 5.50</code></pre>
<p style="margin-top:8px;color:var(--muted);font-size:12px;">
<strong>Watch out</strong>: writing <code>(a + b) / 2</code> directly gives integer 5, not 5.50. Cast first: <code>(float)(a + b) / 2</code>.
</p>

@@hint:zh
真平均的写法：<code>(float)(a + b) / 2</code>，括号决定 cast 的对象。

@@hint:en
True average: <code>(float)(a + b) / 2</code>. Parentheses control what gets cast.

@@starter
#include <stdio.h>

int main(void) {
    int a = 7;
    int b = 4;

    // 6 个 printf：和、差、积、整除、余数、真平均

    return 0;
}

@@answer
#include <stdio.h>

int main(void) {
    int a = 7;
    int b = 4;
    printf("Sum: %d\\n", a + b);
    printf("Diff: %d\\n", a - b);
    printf("Prod: %d\\n", a * b);
    printf("IntDiv: %d\\n", a / b);
    printf("Rem: %d\\n", a % b);
    printf("TrueAvg: %.2f\\n", (float)(a + b) / 2);
    return 0;
}

@@expectedOutput
Sum: 11
Diff: 3
Prod: 28
IntDiv: 1
Rem: 3
TrueAvg: 5.50
`);
