LEARN.lesson('c-algo', 1, `
@@chapterRef c-algo-tute-1

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead">学算法的第一件事不是写算法，而是<strong>学会评价算法</strong>——给每个算法打个"运算量"标签，这就是<strong>大 O 记号</strong>。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">为什么不直接测时间？</h3>
<p>跑一遍计时太不公平：</p>
<ul>
  <li><strong>不同输入</strong>：10 个元素 vs 100 万个，能比吗？</li>
  <li><strong>不同机器</strong>：旧笔记本 vs 新台式机，差 10 倍很正常。</li>
  <li><strong>不同语言</strong>：C 编译 vs Python 解释，差 50 倍。</li>
</ul>
<p>大 O 抛开这些干扰，只看一件事：<strong>当输入规模 n 增大时，运算量增长得有多快</strong>。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">5 个最常见的等级</h3>
<table style="width:100%;border-collapse:collapse;font-size:13px;margin:8px 0;">
  <tr style="border-bottom:1px solid var(--border);"><th style="text-align:left;padding:4px 8px;">等级</th><th style="text-align:left;padding:4px 8px;">名字</th><th style="text-align:left;padding:4px 8px;">代表</th></tr>
  <tr><td style="padding:4px 8px;"><code>O(1)</code></td><td style="padding:4px 8px;">常数</td><td style="padding:4px 8px;">数组下标取值</td></tr>
  <tr><td style="padding:4px 8px;"><code>O(log n)</code></td><td style="padding:4px 8px;">对数</td><td style="padding:4px 8px;">二分搜索</td></tr>
  <tr><td style="padding:4px 8px;"><code>O(n)</code></td><td style="padding:4px 8px;">线性</td><td style="padding:4px 8px;">线性搜索 / 求和</td></tr>
  <tr><td style="padding:4px 8px;"><code>O(n log n)</code></td><td style="padding:4px 8px;">线性对数</td><td style="padding:4px 8px;">归并排序 / 快排</td></tr>
  <tr><td style="padding:4px 8px;"><code>O(n²)</code></td><td style="padding:4px 8px;">平方</td><td style="padding:4px 8px;">冒泡排序</td></tr>
</table>
<h3 style="margin:14px 0 6px;font-size:14px;">怎么从代码看出大 O？</h3>
<p>三条最常用的判断规则：</p>
<ul>
  <li>循环嵌套层数 = 指数。一层 <code>for</code> = O(n)，两层 = O(n²)，三层 = O(n³)</li>
  <li>顺序两段，取大的：<code>O(n) + O(n²) = O(n²)</code></li>
  <li>"每次砍一半" 是 log。<code>while (n &gt; 1) n /= 2;</code> 总共 log₂ n 次</li>
</ul>
<p>这一节我们用最具体的方式感受大 O —— 写一个函数，让它<strong>边干活边数自己干了多少步</strong>。</p>

@@intro:en
<p class="lead">The first thing in learning algorithms isn't writing them — it's <strong>evaluating</strong> them. Big O gives every algorithm a label measuring how its work grows with input size.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Why not just time it?</h3>
<p>Wall-clock timing is unfair:</p>
<ul>
  <li><strong>Different inputs</strong>: 10 elements vs 1M elements — incomparable.</li>
  <li><strong>Different machines</strong>: old laptop vs new desktop — easily 10× apart.</li>
  <li><strong>Different languages</strong>: compiled C vs interpreted Python — 50× apart.</li>
</ul>
<p>Big O drops the noise and asks one question: <strong>as input n grows, how fast does the work grow?</strong></p>
<h3 style="margin:14px 0 6px;font-size:14px;">Five common classes</h3>
<table style="width:100%;border-collapse:collapse;font-size:13px;margin:8px 0;">
  <tr style="border-bottom:1px solid var(--border);"><th style="text-align:left;padding:4px 8px;">Class</th><th style="text-align:left;padding:4px 8px;">Name</th><th style="text-align:left;padding:4px 8px;">Example</th></tr>
  <tr><td style="padding:4px 8px;"><code>O(1)</code></td><td style="padding:4px 8px;">Constant</td><td style="padding:4px 8px;">Array indexing</td></tr>
  <tr><td style="padding:4px 8px;"><code>O(log n)</code></td><td style="padding:4px 8px;">Logarithmic</td><td style="padding:4px 8px;">Binary search</td></tr>
  <tr><td style="padding:4px 8px;"><code>O(n)</code></td><td style="padding:4px 8px;">Linear</td><td style="padding:4px 8px;">Linear search / sum</td></tr>
  <tr><td style="padding:4px 8px;"><code>O(n log n)</code></td><td style="padding:4px 8px;">Linearithmic</td><td style="padding:4px 8px;">Merge sort / quicksort</td></tr>
  <tr><td style="padding:4px 8px;"><code>O(n²)</code></td><td style="padding:4px 8px;">Quadratic</td><td style="padding:4px 8px;">Bubble sort</td></tr>
</table>
<h3 style="margin:14px 0 6px;font-size:14px;">Reading Big O from code</h3>
<ul>
  <li>Loop nesting depth = exponent. One <code>for</code> = O(n), two = O(n²), three = O(n³).</li>
  <li>Sequential pieces: take the bigger. <code>O(n) + O(n²) = O(n²)</code></li>
  <li>"Halving" is log. <code>while (n &gt; 1) n /= 2;</code> runs log₂ n times.</li>
</ul>
<p>In this lesson we feel Big O concretely — write a function that <strong>counts its own operations</strong> as it runs.</p>

@@task:zh
实现 <code>int count_ops(int arr[], int n, int target)</code>：在数组里线性查找 target，返回<strong>比较次数</strong>（不是位置）。然后对下面三个用例打印结果：
<pre><code>arr = {3, 7, 2, 9, 5, 1, 8, 6, 4}, n = 9

target = 3  → 1 次比较（首项就是）
target = 4  → 9 次比较（在最末尾）
target = 99 → 9 次比较（找不到，扫完全部）</code></pre>
按下面格式输出：
<pre><code>find 3: 1 ops
find 4: 9 ops
find 99: 9 ops</code></pre>

@@task:en
Implement <code>int count_ops(int arr[], int n, int target)</code>: linearly search for target in the array; return the <strong>number of comparisons</strong> (not the index). Then for these three cases, print:
<pre><code>arr = {3, 7, 2, 9, 5, 1, 8, 6, 4}, n = 9

target = 3  → 1 comparison (first item)
target = 4  → 9 comparisons (last item)
target = 99 → 9 comparisons (not found, scanned everything)</code></pre>
Output format:
<pre><code>find 3: 1 ops
find 4: 9 ops
find 99: 9 ops</code></pre>

@@hint:zh
循环里每比一次 <code>arr[i] == target</code>，就给计数器 +1；找到了就 <code>return</code>，没找到走完循环再 <code>return</code>。
最坏情况 = 数组长度 n。这就是 O(n) 的"n"。

@@hint:en
Inside the loop, each <code>arr[i] == target</code> check increments a counter by 1; on a hit, return early; otherwise return after the loop. Worst-case count = array length n. That "n" is the n in O(n).

@@starter
#include <stdio.h>

int count_ops(int arr[], int n, int target) {
    // TODO: 返回比较次数
    return 0;
}

int main(void) {
    int arr[] = {3, 7, 2, 9, 5, 1, 8, 6, 4};
    int n = 9;

    printf("find 3: %d ops\\n",  count_ops(arr, n, 3));
    printf("find 4: %d ops\\n",  count_ops(arr, n, 4));
    printf("find 99: %d ops\\n", count_ops(arr, n, 99));
    return 0;
}

@@answer
#include <stdio.h>

int count_ops(int arr[], int n, int target) {
    int ops = 0;
    for (int i = 0; i < n; i++) {
        ops++;
        if (arr[i] == target) return ops;
    }
    return ops;
}

int main(void) {
    int arr[] = {3, 7, 2, 9, 5, 1, 8, 6, 4};
    int n = 9;

    printf("find 3: %d ops\\n",  count_ops(arr, n, 3));
    printf("find 4: %d ops\\n",  count_ops(arr, n, 4));
    printf("find 99: %d ops\\n", count_ops(arr, n, 99));
    return 0;
}

@@expectedOutput
find 3: 1 ops
find 4: 9 ops
find 99: 9 ops
`);
