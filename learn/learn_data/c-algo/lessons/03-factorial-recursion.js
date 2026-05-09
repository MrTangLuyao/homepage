LEARN.lesson('c-algo', 3, `
@@chapterRef c-algo-tute-1

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead"><strong>递归</strong>是函数调用自己。它对处理"自相似"问题（树、分治、目录遍历）很自然——但写错就会死循环、栈溢出。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">两块缺一不可</h3>
<table style="width:100%;border-collapse:collapse;font-size:13px;margin:6px 0;">
  <tr style="border-bottom:1px solid var(--border);"><th style="text-align:left;padding:4px 8px;">部分</th><th style="text-align:left;padding:4px 8px;">作用</th><th style="text-align:left;padding:4px 8px;">缺了会怎样</th></tr>
  <tr><td style="padding:4px 8px;"><strong>base case</strong></td><td style="padding:4px 8px;">直接给答案，停止递归</td><td style="padding:4px 8px;">无限递归 → 栈溢出</td></tr>
  <tr><td style="padding:4px 8px;"><strong>recursive case</strong></td><td style="padding:4px 8px;">把问题缩小，调用自己</td><td style="padding:4px 8px;">无法"自相似"地拆解</td></tr>
</table>
<h3 style="margin:14px 0 6px;font-size:14px;">阶乘 —— 教科书第一例</h3>
<p><code>n!</code> 的数学定义：</p>
<pre><code>n! = n × (n-1)!     ← 大问题 = 自己的更小版本
1! = 1              ← 终止</code></pre>
<p>翻译成 C：</p>
<pre><code>int factorial(int n) {
    if (n &lt;= 1) return 1;            // base case
    return n * factorial(n - 1);     // recursive case
}</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">为什么这个能工作？</h3>
<p>不要试图在脑子里展开调用栈——那会被嵌套层数搞晕。<strong>用归纳的眼光</strong>：</p>
<ul>
  <li>假设 <code>factorial(n - 1)</code> 已经返回了正确的 (n-1)!</li>
  <li>那么 <code>n × factorial(n - 1)</code> 就是 n!</li>
  <li>base case 让递归在 n=1 时停止</li>
</ul>
<p><strong>递归的精髓：相信"自己缩小一号的版本会工作"。</strong></p>
<h3 style="margin:14px 0 6px;font-size:14px;">写递归三步法</h3>
<ol>
  <li><strong>找 base case</strong>：最简单的输入是什么？</li>
  <li><strong>假设小一号的版本已经解决</strong>（不要展开！信任它）</li>
  <li><strong>用小版本的结果拼出当前结果</strong></li>
</ol>

@@intro:en
<p class="lead"><strong>Recursion</strong> = a function calling itself. Natural fit for self-similar problems (trees, divide & conquer, directory traversal) — but stack overflow if done wrong.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Two parts, both required</h3>
<table style="width:100%;border-collapse:collapse;font-size:13px;margin:6px 0;">
  <tr style="border-bottom:1px solid var(--border);"><th style="text-align:left;padding:4px 8px;">Part</th><th style="text-align:left;padding:4px 8px;">Role</th><th style="text-align:left;padding:4px 8px;">If missing</th></tr>
  <tr><td style="padding:4px 8px;"><strong>base case</strong></td><td style="padding:4px 8px;">Answer directly, stop recursing</td><td style="padding:4px 8px;">Infinite recursion → stack overflow</td></tr>
  <tr><td style="padding:4px 8px;"><strong>recursive case</strong></td><td style="padding:4px 8px;">Shrink the problem, call self</td><td style="padding:4px 8px;">Can't decompose self-similarly</td></tr>
</table>
<h3 style="margin:14px 0 6px;font-size:14px;">Factorial — textbook example</h3>
<p>Math definition of <code>n!</code>:</p>
<pre><code>n! = n × (n-1)!     ← big problem = smaller version of itself
1! = 1              ← termination</code></pre>
<p>Translates to C as:</p>
<pre><code>int factorial(int n) {
    if (n &lt;= 1) return 1;            // base case
    return n * factorial(n - 1);     // recursive case
}</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">Why does this work?</h3>
<p>Don't try to unfold the call stack mentally — too many nested levels confuse you. <strong>Use induction</strong>:</p>
<ul>
  <li>Assume <code>factorial(n - 1)</code> already returns the correct (n-1)!</li>
  <li>Then <code>n × factorial(n - 1)</code> is n!</li>
  <li>Base case stops recursion at n=1</li>
</ul>
<p><strong>The essence of recursion: trust that "self at smaller size works".</strong></p>
<h3 style="margin:14px 0 6px;font-size:14px;">Three-step recipe</h3>
<ol>
  <li><strong>Find the base case</strong>: what's the simplest input?</li>
  <li><strong>Assume the smaller version is solved</strong> (don't unfold! trust it)</li>
  <li><strong>Combine the smaller answer to get the current one</strong></li>
</ol>

@@task:zh
实现递归版的 <code>int factorial(int n)</code>，<strong>不要用循环</strong>。打印 0! 到 7! 共 8 行：
<pre><code>0! = 1
1! = 1
2! = 2
3! = 6
4! = 24
5! = 120
6! = 720
7! = 5040</code></pre>
约定：0! = 1（数学定义）。

@@task:en
Implement <code>int factorial(int n)</code> recursively (<strong>no loops</strong>). Print 0! through 7!:
<pre><code>0! = 1
1! = 1
2! = 2
3! = 6
4! = 24
5! = 120
6! = 720
7! = 5040</code></pre>
Convention: 0! = 1.

@@hint:zh
base case：<code>n &lt;= 1</code> 时返回 1（覆盖 0! 和 1!）。recursive case：返回 <code>n * factorial(n - 1)</code>。
主函数 for 循环 i 从 0 到 7，打印 <code>printf("%d! = %d\\n", i, factorial(i));</code>。

@@hint:en
base case: when <code>n &lt;= 1</code> return 1 (covers both 0! and 1!). recursive case: return <code>n * factorial(n - 1)</code>.
In main, loop i from 0 to 7 and <code>printf("%d! = %d\\n", i, factorial(i));</code>

@@starter
#include <stdio.h>

int factorial(int n) {
    // TODO: 用递归实现
    return 0;
}

int main(void) {
    for (int i = 0; i <= 7; i++) {
        printf("%d! = %d\\n", i, factorial(i));
    }
    return 0;
}

@@answer
#include <stdio.h>

int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int main(void) {
    for (int i = 0; i <= 7; i++) {
        printf("%d! = %d\\n", i, factorial(i));
    }
    return 0;
}

@@expectedOutput
0! = 1
1! = 1
2! = 2
3! = 6
4! = 24
5! = 120
6! = 720
7! = 5040
`);
