LEARN.lesson('c', 11, `
@@chapterRef c-functions

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead">函数是命名的、可复用的代码块。声明一次、调用 N 次 —— 是 C 程序避免重复、组织复杂度的最基本工具。</p>
<pre><code>返回类型 函数名(参数列表) {
    // 函数体
    return 值;     // 返回类型不为 void 时必须 return
}</code></pre>
<p>例子：</p>
<pre><code>int add(int a, int b) {
    return a + b;
}

int main(void) {
    int s = add(3, 4);   // 调用 → 8
    printf("%d\\n", s);
    return 0;
}</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">关键概念：函数原型（前置声明）</h3>
<p>C 编译器<strong>从上到下读源码</strong>。如果你在 main 里调用 <code>add</code>，但 <code>add</code> 的定义在 main 之后，编译器会"不认识 add"。两个解决办法：</p>
<ol>
<li>把 <code>add</code> 定义放在 main 之前（最简单）</li>
<li>在 main 之前写个<strong>函数原型</strong>：<code>int add(int a, int b);</code> —— 告诉编译器"add 这个函数存在，签名长这样，定义稍后给"</li>
</ol>
<pre><code>int add(int, int);   // 原型 — 参数名可省

int main(void) {
    printf("%d\\n", add(3, 4));   // OK，编译器认识 add
}

int add(int a, int b) { return a + b; }   // 定义放下面也行</code></pre>
<p>头文件（<code>&lt;stdio.h&gt;</code> 等）本质就是别人帮你写好的函数原型集合。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">void 函数</h3>
<p>不返回值的函数返回类型写 <code>void</code>，函数体里可以不写 return（写 <code>return;</code> 也合法，提前退出）。</p>

@@intro:en
<p class="lead">A function is a named, reusable block of code. Declare once, call N times — the most basic tool C gives you for avoiding repetition and managing complexity.</p>
<pre><code>return_type name(parameter_list) {
    // body
    return value;     // required if return_type is not void
}</code></pre>
<p>Example:</p>
<pre><code>int add(int a, int b) {
    return a + b;
}

int main(void) {
    int s = add(3, 4);   // call → 8
    printf("%d\\n", s);
    return 0;
}</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">Key concept: function prototypes (forward declaration)</h3>
<p>The C compiler reads source <strong>top to bottom</strong>. If you call <code>add</code> from main but define <code>add</code> after main, the compiler won't know about it. Two fixes:</p>
<ol>
<li>Put <code>add</code>'s definition before main (simplest)</li>
<li>Add a <strong>prototype</strong> before main: <code>int add(int a, int b);</code> — tells the compiler "add exists with this signature; definition coming later"</li>
</ol>
<pre><code>int add(int, int);   // prototype — parameter names optional

int main(void) {
    printf("%d\\n", add(3, 4));   // OK, compiler knows add
}

int add(int a, int b) { return a + b; }   // definition can be below</code></pre>
<p>Header files (<code>&lt;stdio.h&gt;</code> etc.) are essentially prepackaged collections of prototypes someone else wrote.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">void functions</h3>
<p>Functions that return nothing have return type <code>void</code>. The body needs no return (or you can write <code>return;</code> to exit early).</p>

@@task:zh
写一个函数 <code>int max3(int a, int b, int c)</code> 返回三个数中的最大值。在 main 里调用 <code>max3(7, 2, 9)</code>、<code>max3(-1, -3, -2)</code>、<code>max3(5, 5, 5)</code>，每次结果一行：
<pre><code>9
-1
5</code></pre>

@@task:en
Write a function <code>int max3(int a, int b, int c)</code> returning the max of three numbers. In main, call <code>max3(7, 2, 9)</code>, <code>max3(-1, -3, -2)</code>, <code>max3(5, 5, 5)</code>; print each result on its own line:
<pre><code>9
-1
5</code></pre>

@@hint:zh
两步：先比 a 和 b 拿大的，再和 c 比。或者用三元运算符 <code>(a &gt; b ? a : b) &gt; c ? ... : c</code>。

@@hint:en
Two steps: get the larger of a/b, then compare with c. Or use the ternary <code>(a &gt; b ? a : b) &gt; c ? ... : c</code>.

@@starter
#include <stdio.h>

// 在这里定义 max3

int main(void) {
    printf("%d\\n", max3(7, 2, 9));
    printf("%d\\n", max3(-1, -3, -2));
    printf("%d\\n", max3(5, 5, 5));
    return 0;
}

@@answer
#include <stdio.h>

int max3(int a, int b, int c) {
    int m = (a > b) ? a : b;
    return (m > c) ? m : c;
}

int main(void) {
    printf("%d\\n", max3(7, 2, 9));
    printf("%d\\n", max3(-1, -3, -2));
    printf("%d\\n", max3(5, 5, 5));
    return 0;
}

@@expectedOutput
9
-1
5
`);
