LEARN.lesson('c', 43, `
@@chapterRef c-time

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead"><code>&lt;time.h&gt;</code> 提供两类时间：<strong>"墙上时间"</strong>（time_t，自 1970-01-01 UTC 起的秒数）和<strong>"CPU 时间"</strong>（clock_t，进程消耗的 CPU 时间单位数）。两者用途完全不同。</p>
<h3 style="margin:12px 0 6px;font-size:14px;">time(NULL) · 当前 Unix 时间戳</h3>
<pre><code>#include &lt;time.h&gt;

time_t now = time(NULL);          // 比如 1715234567
printf("%ld\\n", (long)now);

// 给随机数播种最常见的用法：
srand((unsigned)time(NULL));</code></pre>
<p>time_t 在 32 位系统上是 32 位整数 —— <strong>2038 年 1 月 19 日会溢出</strong>（"2038 问题"）。现代 64 位系统已扩展到 64 位 time_t，可用到大约公元 2920 亿年。</p>
<h3 style="margin:12px 0 6px;font-size:14px;">clock() · 程序耗 CPU 多久</h3>
<pre><code>clock_t start = clock();
do_something();
clock_t end = clock();

double seconds = (double)(end - start) / CLOCKS_PER_SEC;
printf("耗时 %.3f 秒\\n", seconds);</code></pre>
<p><code>CLOCKS_PER_SEC</code> 通常是 1000000（每秒 100 万个 tick），但<u>不保证</u> —— 一定要除它。</p>
<h3 style="margin:12px 0 6px;font-size:14px;">两种时间的区别</h3>
<table style="border-collapse:collapse;font-size:13px;">
<tr><td style="padding:2px 14px 2px 0;"><code>time()</code></td><td>真实流逝时间（"墙上时间"）—— 包括睡眠、I/O 等待、调度延迟</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>clock()</code></td><td>本进程实际占用 CPU 的时间 —— 不含睡眠、I/O</td></tr>
</table>
<p>测算法效率用 clock；测真实响应时间用 time。</p>
<h3 style="margin:12px 0 6px;font-size:14px;">为什么本课不打印时间值？</h3>
<p>每次运行 time/clock 返回不同值 —— 没法和固定的"期望输出"比对。所以本课只验证两个<u>普适保证</u>：<code>time(NULL) &gt; 0</code>（在 1970 之后），<code>clock() &gt;= 0</code>（合法返回）。</p>

@@intro:en
<p class="lead"><code>&lt;time.h&gt;</code> exposes two kinds of time: <strong>wall-clock</strong> (<code>time_t</code>, seconds since 1970-01-01 UTC) and <strong>CPU time</strong> (<code>clock_t</code>, per-process CPU ticks). Different uses entirely.</p>
<h3 style="margin:12px 0 6px;font-size:14px;">time(NULL) · current Unix timestamp</h3>
<pre><code>time_t now = time(NULL);         // e.g. 1715234567
srand((unsigned)time(NULL));      // common pattern: seed RNG from time</code></pre>
<p>32-bit time_t <strong>overflows in Jan 2038</strong> ("Y2038 problem"). Modern 64-bit systems extend to ~292 billion years.</p>
<h3 style="margin:12px 0 6px;font-size:14px;">clock() · CPU time consumed</h3>
<pre><code>clock_t start = clock();
do_something();
double sec = (double)(clock() - start) / CLOCKS_PER_SEC;</code></pre>
<p><code>CLOCKS_PER_SEC</code> is typically 1,000,000 — never assume, always divide.</p>
<h3 style="margin:12px 0 6px;font-size:14px;">time vs clock</h3>
<ul>
<li><code>time()</code> — wall-clock, includes sleep/IO wait</li>
<li><code>clock()</code> — CPU only, no sleep/IO counted</li>
</ul>
<h3 style="margin:12px 0 6px;font-size:14px;">Why no specific values printed?</h3>
<p>Each run gives different values. We verify the <u>universal guarantees</u> instead: <code>time(NULL) &gt; 0</code> and <code>clock() &gt;= 0</code>.</p>

@@task:zh
检查两个时间函数返回值的合理性：
<pre><code>time positive: yes
clock non-negative: yes</code></pre>

@@task:en
Sanity-check the two time functions:
<pre><code>time positive: yes
clock non-negative: yes</code></pre>

@@hint:zh
<code>time(NULL) &gt; 0 ? "yes" : "no"</code> · <code>clock() &gt;= 0 ? "yes" : "no"</code>。

@@hint:en
<code>time(NULL) &gt; 0 ? "yes" : "no"</code> · <code>clock() &gt;= 0 ? "yes" : "no"</code>.

@@starter
#include <stdio.h>
#include <time.h>

int main(void) {
    // 两行 printf
    return 0;
}

@@answer
#include <stdio.h>
#include <time.h>

int main(void) {
    printf("time positive: %s\\n",
           time(NULL) > 0 ? "yes" : "no");
    printf("clock non-negative: %s\\n",
           clock() >= 0 ? "yes" : "no");
    return 0;
}

@@expectedOutput
time positive: yes
clock non-negative: yes
`);
