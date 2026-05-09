LEARN.lesson('c-algo', 4, `
@@chapterRef c-algo-tute-1

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead">斐波那契数列是递归的另一个经典案例，但它<strong>暴露了朴素递归的致命弱点</strong>——重复计算。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">数列定义</h3>
<pre><code>fib(0) = 0
fib(1) = 1
fib(n) = fib(n-1) + fib(n-2)   // n ≥ 2</code></pre>
<p>序列：0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ...</p>
<h3 style="margin:14px 0 6px;font-size:14px;">朴素递归（先写出来，体会问题）</h3>
<pre><code>int fib(int n) {
    if (n &lt; 2) return n;
    return fib(n - 1) + fib(n - 2);
}</code></pre>
<p>看起来非常优雅——但让我们看 <code>fib(5)</code> 的调用树：</p>
<pre><code>            fib(5)
           /       \\
       fib(4)      fib(3)
       /    \\      /    \\
   fib(3)  fib(2) fib(2) fib(1)
   /  \\    ...
 fib(2) fib(1)
 ...</code></pre>
<p><code>fib(2)</code> 被算了 <strong>3</strong> 次！<code>fib(3)</code> 被算了 2 次。整体复杂度是 <strong>O(2ⁿ)</strong>——指数级。<code>fib(40)</code> 需要约 10⁹ 次调用，跑几秒；<code>fib(50)</code> 跑几分钟。</p>
<p>这一节先<strong>感受</strong>朴素递归的代价。第 25 节学动态规划时再修复它。</p>

@@intro:en
<p class="lead">Fibonacci is another classic recursion example — but it <strong>exposes naive recursion's fatal weakness</strong>: redundant computation.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Definition</h3>
<pre><code>fib(0) = 0
fib(1) = 1
fib(n) = fib(n-1) + fib(n-2)   // n ≥ 2</code></pre>
<p>Sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ...</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Naive recursion (write it first, feel the problem)</h3>
<pre><code>int fib(int n) {
    if (n &lt; 2) return n;
    return fib(n - 1) + fib(n - 2);
}</code></pre>
<p>Looks elegant — but look at the call tree for <code>fib(5)</code>:</p>
<pre><code>            fib(5)
           /       \\
       fib(4)      fib(3)
       /    \\      /    \\
   fib(3)  fib(2) fib(2) fib(1)
   /  \\    ...
 fib(2) fib(1)
 ...</code></pre>
<p><code>fib(2)</code> is computed <strong>3</strong> times! <code>fib(3)</code> twice. Total cost is <strong>O(2ⁿ)</strong> — exponential. <code>fib(40)</code> takes ~10⁹ calls (seconds); <code>fib(50)</code> minutes.</p>
<p>This lesson <strong>feels</strong> the cost of naive recursion. Lesson 25 (DP) will fix it.</p>

@@task:zh
实现朴素递归 <code>int fib(int n)</code>，打印 fib(0) 到 fib(15) 共 16 个值，每行一个：
<pre><code>fib(0) = 0
fib(1) = 1
fib(2) = 1
fib(3) = 2
fib(4) = 3
fib(5) = 5
fib(6) = 8
fib(7) = 13
fib(8) = 21
fib(9) = 34
fib(10) = 55
fib(11) = 89
fib(12) = 144
fib(13) = 233
fib(14) = 377
fib(15) = 610</code></pre>

@@task:en
Implement naive <code>int fib(int n)</code>, print fib(0) through fib(15):
<pre><code>fib(0) = 0
fib(1) = 1
fib(2) = 1
fib(3) = 2
fib(4) = 3
fib(5) = 5
fib(6) = 8
fib(7) = 13
fib(8) = 21
fib(9) = 34
fib(10) = 55
fib(11) = 89
fib(12) = 144
fib(13) = 233
fib(14) = 377
fib(15) = 610</code></pre>

@@hint:zh
base case：<code>n &lt; 2</code> 时直接返回 n（覆盖 fib(0)=0 和 fib(1)=1）。
recursive case：<code>return fib(n - 1) + fib(n - 2);</code>。

@@hint:en
base case: when <code>n &lt; 2</code> return n (covers fib(0)=0 and fib(1)=1).
recursive case: <code>return fib(n - 1) + fib(n - 2);</code>

@@starter
#include <stdio.h>

int fib(int n) {
    // TODO: 朴素递归
    return 0;
}

int main(void) {
    for (int i = 0; i <= 15; i++) {
        printf("fib(%d) = %d\\n", i, fib(i));
    }
    return 0;
}

@@answer
#include <stdio.h>

int fib(int n) {
    if (n < 2) return n;
    return fib(n - 1) + fib(n - 2);
}

int main(void) {
    for (int i = 0; i <= 15; i++) {
        printf("fib(%d) = %d\\n", i, fib(i));
    }
    return 0;
}

@@expectedOutput
fib(0) = 0
fib(1) = 1
fib(2) = 1
fib(3) = 2
fib(4) = 3
fib(5) = 5
fib(6) = 8
fib(7) = 13
fib(8) = 21
fib(9) = 34
fib(10) = 55
fib(11) = 89
fib(12) = 144
fib(13) = 233
fib(14) = 377
fib(15) = 610
`);
