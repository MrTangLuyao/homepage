LEARN.lesson('c', 9, `
@@chapterRef c-loops

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead">循环让程序"重复做某件事"。最朴素的形式是 <code>while</code> —— "只要条件为真，就反复执行循环体"。</p>
<pre><code>while (条件) {
    // 循环体
}</code></pre>
<p>执行模型：</p>
<ol>
<li>判断条件 → 假？跳出循环</li>
<li>真？执行循环体一次</li>
<li>跳回第 1 步</li>
</ol>
<h3 style="margin:14px 0 6px;font-size:14px;">最常见的死循环 bug</h3>
<pre><code>int i = 0;
while (i < 5) {
    printf("%d\\n", i);
    // 忘了 i++
}</code></pre>
<p>i 永远是 0，条件永远为真，程序卡住。<strong>每个 while 循环里必须有一个能让条件最终变假的语句</strong>，否则就是 bug（除非你<u>真的</u>想要无限循环 + 内部 break）。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">do-while：至少跑一次</h3>
<pre><code>do {
    // 循环体（无论如何先执行一次）
} while (条件);   // 注意结尾的分号</code></pre>
<p>差别：<code>while</code> 先判断后执行，<code>do-while</code> 先执行后判断。后者在"必然要做一次"的场合（菜单 → 等待用户输入 → 验证）有用。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">break / continue</h3>
<ul>
<li><code>break;</code> —— 立即跳出当前循环</li>
<li><code>continue;</code> —— 跳过本次剩余部分，立即去判断下一次</li>
</ul>

@@intro:en
<p class="lead">Loops let a program "repeat something". The simplest is <code>while</code>: "while the condition is true, run the body".</p>
<pre><code>while (cond) {
    // body
}</code></pre>
<p>Execution model:</p>
<ol>
<li>Test condition → false? exit loop</li>
<li>True? run body once</li>
<li>Go back to step 1</li>
</ol>
<h3 style="margin:14px 0 6px;font-size:14px;">The classic infinite-loop bug</h3>
<pre><code>int i = 0;
while (i < 5) {
    printf("%d\\n", i);
    // forgot i++
}</code></pre>
<p>i stays 0, condition stays true, program hangs. <strong>Every while loop needs a statement that eventually makes the condition false</strong> — unless you <u>actually</u> want infinite loop + internal break.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">do-while: runs at least once</h3>
<pre><code>do {
    // body (always runs once)
} while (cond);   // mind the trailing semicolon</code></pre>
<p>Difference: <code>while</code> tests then runs; <code>do-while</code> runs then tests. The latter helps in "must do once" patterns (menu → read input → validate).</p>
<h3 style="margin:14px 0 6px;font-size:14px;">break / continue</h3>
<ul>
<li><code>break;</code> — exit the current loop immediately</li>
<li><code>continue;</code> — skip the rest of this iteration, go test the condition again</li>
</ul>

@@task:zh
从 stdin 读一个正整数 N，用 <code>while</code> 计算 1 + 2 + ... + N，按下面格式输出：
<pre><code>Sum: 55</code></pre>
<p style="margin-top:8px;color:var(--muted);font-size:12px;">
本课预填 <code>10</code>，期望输出 <code>Sum: 55</code>。
</p>

@@task:en
Read a positive integer N from stdin, use <code>while</code> to compute 1 + 2 + ... + N, output:
<pre><code>Sum: 55</code></pre>
<p style="margin-top:8px;color:var(--muted);font-size:12px;">
Pre-filled input <code>10</code>; expected output <code>Sum: 55</code>.
</p>

@@hint:zh
两个变量：<code>i</code>（当前数）和 <code>sum</code>（累加器）。i 从 1 开始，每次循环 <code>sum += i; i++;</code>，直到 <code>i &gt; N</code>。

@@hint:en
Two variables: <code>i</code> (current number) and <code>sum</code> (accumulator). Start i at 1; each iteration <code>sum += i; i++;</code> until <code>i &gt; N</code>.

@@starter
#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);

    int sum = 0;
    int i   = 1;
    // 在这里写 while 循环

    printf("Sum: %d\\n", sum);
    return 0;
}

@@answer
#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);

    int sum = 0;
    int i   = 1;
    while (i <= n) {
        sum += i;
        i++;
    }

    printf("Sum: %d\\n", sum);
    return 0;
}

@@expectedOutput
Sum: 55

@@testInputs
10
`);
