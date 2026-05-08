LEARN.lesson('c', 44, `
@@chapterRef c-assert

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead"><code>assert(condition)</code> 是 C 提供的最简单的"<strong>这里不该出错</strong>"保险栓。它检查一个表达式：</p>
<ul>
<li>如果<strong>真</strong>，啥也不发生 —— 程序继续</li>
<li>如果<strong>假</strong>，立刻打印诊断信息（哪个文件、哪一行、哪个表达式失败）然后调用 <code>abort()</code> 终止程序</li>
</ul>
<pre><code>#include &lt;assert.h&gt;

void divide(int a, int b) {
    assert(b != 0);          // 不该是 0 — 是的话立刻死
    return a / b;
}

assert(arr != NULL);                       // malloc 不该失败
assert(index &gt;= 0 &amp;&amp; index &lt; size);        // 数组下标必须合法
assert(state == EXPECTED_STATE);            // 状态机不该跑到这里时是别的状态</code></pre>
<h3 style="margin:12px 0 6px;font-size:14px;">assert 的关键设计：发布版自动消失</h3>
<p>定义 <code>NDEBUG</code>（"No Debug"）后再 <code>#include &lt;assert.h&gt;</code>，所有 <code>assert(...)</code> 会被预处理器替换成空 —— 完全没运行时开销。</p>
<pre><code>// gcc x.c -O2 -DNDEBUG    // 发布构建：assert 全消失</code></pre>
<p>这是为什么<strong>不要把"必须执行的副作用"放进 assert</strong>：</p>
<pre><code>// 错！发布版里 NDEBUG 让 assert 消失，counter 永远不增
assert(counter++ &lt; LIMIT);

// 对：只检查、不修改
counter++;
assert(counter &lt; LIMIT);</code></pre>
<h3 style="margin:12px 0 6px;font-size:14px;">assert vs 错误处理</h3>
<p>assert 只该用在"<u>这种情况发生 = 我代码有 bug</u>"的地方 —— 不是用户输入错、不是网络出问题。那些是<strong>预期可能失败</strong>的情况，要写真正的错误处理（返回错误码、打印消息、给出合理回退）。</p>
<table style="border-collapse:collapse;font-size:13px;">
<tr><td style="padding:2px 14px 2px 0;"><strong>assert</strong></td><td>违反"内部不变量"（数组下标越界、状态机非法状态）— 应该崩</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><strong>错误处理</strong></td><td>外部条件失败（文件不存在、输入格式错）— 应该报错并继续</td></tr>
</table>

@@intro:en
<p class="lead"><code>assert(condition)</code> is C's simplest "<strong>this should never happen</strong>" tripwire. It checks an expression:</p>
<ul>
<li>If <strong>true</strong>: nothing happens — program continues</li>
<li>If <strong>false</strong>: prints diagnostic (file, line, failed expression) and calls <code>abort()</code></li>
</ul>
<pre><code>#include &lt;assert.h&gt;
assert(arr != NULL);
assert(index &gt;= 0 &amp;&amp; index &lt; size);</code></pre>
<h3 style="margin:12px 0 6px;font-size:14px;">Release build erases asserts</h3>
<p>Define <code>NDEBUG</code> before including <code>&lt;assert.h&gt;</code> and every <code>assert(...)</code> compiles to nothing. Zero runtime cost.</p>
<pre><code>// gcc x.c -O2 -DNDEBUG    // release: asserts vanish</code></pre>
<p>This is why you must <strong>never put required side effects in assert</strong>:</p>
<pre><code>// WRONG: in release builds, counter never increments
assert(counter++ &lt; LIMIT);

// CORRECT: separate the increment
counter++;
assert(counter &lt; LIMIT);</code></pre>
<h3 style="margin:12px 0 6px;font-size:14px;">assert vs error handling</h3>
<p>Use assert only for "<u>this happening = my code has a bug</u>" cases — not user input errors, not network failures. Those are <strong>expected-failure</strong> situations needing real error handling (return codes, log + recover).</p>

@@task:zh
写一个函数 <code>safe_div(int a, int b)</code>，用 <code>assert(b != 0)</code> 保护除法，返回 a/b。在 main 里调几次合法的除法，打印结果。<u>不要</u>触发 assert 失败 —— 我们要看 assert 在保证为真时<strong>沉默不打扰</strong>。
<pre><code>10 / 2 = 5
20 / 4 = 5
99 / 3 = 33
all asserts passed</code></pre>

@@task:en
Write a function <code>safe_div(int a, int b)</code> that uses <code>assert(b != 0)</code> to guard division, returning a/b. In main, call it on a few legal divisions and print results. <u>Don't</u> trigger an assert failure — observe that assert stays <strong>silent when its condition holds</strong>.
<pre><code>10 / 2 = 5
20 / 4 = 5
99 / 3 = 33
all asserts passed</code></pre>

@@hint:zh
<code>int safe_div(int a, int b) { assert(b != 0); return a / b; }</code>。在 main 里调三次然后打印。

@@hint:en
<code>int safe_div(int a, int b) { assert(b != 0); return a / b; }</code>. Call three times in main.

@@starter
#include <stdio.h>
#include <assert.h>

int safe_div(int a, int b) {
    // assert b != 0
    return 0;
}

int main(void) {
    // 三次调用 + 打印
    return 0;
}

@@answer
#include <stdio.h>
#include <assert.h>

int safe_div(int a, int b) {
    assert(b != 0);
    return a / b;
}

int main(void) {
    printf("10 / 2 = %d\\n", safe_div(10, 2));
    printf("20 / 4 = %d\\n", safe_div(20, 4));
    printf("99 / 3 = %d\\n", safe_div(99, 3));
    printf("all asserts passed\\n");
    return 0;
}

@@expectedOutput
10 / 2 = 5
20 / 4 = 5
99 / 3 = 33
all asserts passed
`);
