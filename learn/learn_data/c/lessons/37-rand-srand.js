LEARN.lesson('c', 37, `
@@chapterRef c-stdlib

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead">C 标准库的"伪随机数"：每次调用 <code>rand()</code> 给一个 <code>0 ~ RAND_MAX</code> 之间的整数。<strong>"伪"</strong> 的意思是：它不是真随机，而是个固定的算法 —— 同一个起点（"种子"）产生的序列<u>每次都一样</u>。</p>
<pre><code>#include &lt;stdlib.h&gt;
#include &lt;time.h&gt;

srand(42);              // 种子 = 42（相同种子 → 相同序列）
printf("%d\\n", rand());
printf("%d\\n", rand());

// 如果不调 srand，等于 srand(1) — 程序每次跑出相同序列
// 真正"看起来"随机：srand(time(NULL)) 用当前时间做种子</code></pre>
<h3 style="margin:12px 0 6px;font-size:14px;">把 rand 限制到一个范围</h3>
<p>rand 返回 <code>0 ~ RAND_MAX</code>（至少 32767，常见 2^31-1）。要落到 <code>[a, b]</code>：</p>
<pre><code>// [0, n)
int x = rand() % n;

// [a, b]（含端点）
int x = a + rand() % (b - a + 1);</code></pre>
<p><strong>注意</strong> <code>rand() % n</code> 严格说<u>不是</u>均匀分布（当 n 不能整除 RAND_MAX+1 时尾部偏少）。对一般用途够用；做模拟 / 密码学要更严格的工具（<code>arc4random_uniform</code>）。</p>
<h3 style="margin:12px 0 6px;font-size:14px;">为什么"伪"是好事？</h3>
<p>调试时 —— 用固定种子能<strong>复现</strong> bug：跑 1000 次某个随机测试都崩在第 837 步，固定种子让每次跑得到相同序列、能稳定追查。</p>
<p>本课就来验证这个特性：同一种子两次播种，得到的随机数序列必定相同。</p>
<p style="color:var(--muted);font-size:12px;">注意：rand() 的具体输出依赖 libc 实现 —— 不同平台用的 PRNG 算法可能不同，所以本课不打印具体数值，而是验证"相同种子 → 相同序列"这一<u>普适保证</u>。</p>

@@intro:en
<p class="lead">C's pseudo-random: each <code>rand()</code> call returns an integer in <code>0 ~ RAND_MAX</code>. <strong>Pseudo</strong> means it's a fixed algorithm — the same starting point ("seed") produces the same sequence <u>every time</u>.</p>
<pre><code>srand(42);              // seed = 42 → reproducible sequence
printf("%d\\n", rand());
// Without srand, equivalent to srand(1) — same sequence every run
// For "looks random" output: srand(time(NULL))</code></pre>
<h3 style="margin:12px 0 6px;font-size:14px;">Limiting rand to a range</h3>
<pre><code>int x = rand() % n;                  // [0, n)
int x = a + rand() % (b - a + 1);    // [a, b]</code></pre>
<p><strong>Note</strong>: <code>rand() % n</code> isn't strictly uniform when n doesn't divide RAND_MAX+1 evenly. Fine for casual use; for simulations / crypto, use stronger tools.</p>
<h3 style="margin:12px 0 6px;font-size:14px;">Why "pseudo" is good</h3>
<p>Debugging — fixed seeds make randomized tests <strong>reproducible</strong>: a flaky test that always crashes at step 837 with seed=42 is much easier to fix than one that crashes "sometimes".</p>
<p>This lesson validates exactly that property: same seed twice → identical sequences.</p>
<p style="color:var(--muted);font-size:12px;">Note: rand()'s specific output depends on the libc — different platforms may use different PRNG algorithms. So we don't print specific values; we verify the <u>universal guarantee</u>: same seed → same sequence.</p>

@@task:zh
做两轮：每轮 <code>srand(42)</code> 后连续调 5 次 <code>rand() % 100</code>，把 5 个数存到数组里。比较两轮的数组是否完全相同：
<pre><code>round 1 done (5 numbers)
round 2 done (5 numbers)
sequences match: yes</code></pre>

@@task:en
Two rounds: each round <code>srand(42)</code> then call <code>rand() % 100</code> 5 times into an array. Compare the two arrays:
<pre><code>round 1 done (5 numbers)
round 2 done (5 numbers)
sequences match: yes</code></pre>

@@hint:zh
两次 <code>srand(42)</code> + 同样 5 次 <code>rand()</code> 得到的序列必然相同。用 <code>memcmp(a, b, sizeof(a))</code> 比较两个数组。

@@hint:en
Two <code>srand(42)</code> + same 5 <code>rand()</code> calls always give the same sequence. Compare with <code>memcmp(a, b, sizeof(a))</code>.

@@starter
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void) {
    int a[5], b[5];
    // round 1: srand(42), 填 a[]
    // round 2: srand(42), 填 b[]
    // 比较
    return 0;
}

@@answer
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void) {
    int a[5], b[5];

    srand(42);
    for (int i = 0; i < 5; i++) a[i] = rand() % 100;
    printf("round 1 done (5 numbers)\\n");

    srand(42);
    for (int i = 0; i < 5; i++) b[i] = rand() % 100;
    printf("round 2 done (5 numbers)\\n");

    int match = memcmp(a, b, sizeof(a)) == 0;
    printf("sequences match: %s\\n", match ? "yes" : "no");
    return 0;
}

@@expectedOutput
round 1 done (5 numbers)
round 2 done (5 numbers)
sequences match: yes
`);
