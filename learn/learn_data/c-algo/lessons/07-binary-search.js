LEARN.lesson('c-algo', 7, `
@@chapterRef c-algo-tute-1

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead">二分搜索是<strong>排好序数据</strong>的杀手锏：每次砍掉一半，n 个元素只要 log₂ n 步。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">速度差距有多大？</h3>
<table style="width:100%;border-collapse:collapse;font-size:13px;margin:6px 0;">
  <tr style="border-bottom:1px solid var(--border);"><th style="text-align:left;padding:4px 8px;">n</th><th style="text-align:left;padding:4px 8px;">线性最坏</th><th style="text-align:left;padding:4px 8px;">二分最坏</th></tr>
  <tr><td style="padding:4px 8px;">10</td><td style="padding:4px 8px;">10</td><td style="padding:4px 8px;">4</td></tr>
  <tr><td style="padding:4px 8px;">1000</td><td style="padding:4px 8px;">1000</td><td style="padding:4px 8px;">10</td></tr>
  <tr><td style="padding:4px 8px;">1,000,000</td><td style="padding:4px 8px;">100 万</td><td style="padding:4px 8px;">20</td></tr>
  <tr><td style="padding:4px 8px;">10 亿</td><td style="padding:4px 8px;">10 亿</td><td style="padding:4px 8px;">30</td></tr>
</table>
<h3 style="margin:14px 0 6px;font-size:14px;">算法（迭代版）</h3>
<pre><code>int binary_search(int arr[], int n, int target) {
    int lo = 0, hi = n - 1;
    while (lo &lt;= hi) {
        int mid = lo + (hi - lo) / 2;       // 防溢出写法
        if (arr[mid] == target) return mid;
        if (arr[mid] &lt; target) lo = mid + 1;  // 在右半
        else                    hi = mid - 1;  // 在左半
    }
    return -1;
}</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">两个经典坑</h3>
<ol>
  <li><strong>用 <code>lo + (hi - lo) / 2</code>，不要 <code>(lo + hi) / 2</code></strong>：lo 和 hi 都很大时，加法可能溢出 int。这是工业代码里反复出现的 bug。</li>
  <li><strong>循环条件是 <code>lo &lt;= hi</code> 不是 <code>lo &lt; hi</code></strong>：当只剩一个元素 (lo == hi) 时也要检查它。</li>
</ol>
<h3 style="margin:14px 0 6px;font-size:14px;">前提：数据有序</h3>
<p>二分搜索<strong>必须</strong>用在有序数据上。无序时它给出错误结果。如果只查一次，<strong>不要</strong>专门排序去二分——排序代价 O(n log n) 比直接线性 O(n) 还大。只有<strong>多次查询</strong>才划算。</p>

@@intro:en
<p class="lead">Binary search is the killer move for <strong>sorted data</strong>: halve the range each step, only log₂ n steps for n elements.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">How big is the gap?</h3>
<table style="width:100%;border-collapse:collapse;font-size:13px;margin:6px 0;">
  <tr style="border-bottom:1px solid var(--border);"><th style="text-align:left;padding:4px 8px;">n</th><th style="text-align:left;padding:4px 8px;">Linear worst</th><th style="text-align:left;padding:4px 8px;">Binary worst</th></tr>
  <tr><td style="padding:4px 8px;">10</td><td style="padding:4px 8px;">10</td><td style="padding:4px 8px;">4</td></tr>
  <tr><td style="padding:4px 8px;">1,000</td><td style="padding:4px 8px;">1,000</td><td style="padding:4px 8px;">10</td></tr>
  <tr><td style="padding:4px 8px;">1,000,000</td><td style="padding:4px 8px;">1M</td><td style="padding:4px 8px;">20</td></tr>
  <tr><td style="padding:4px 8px;">1 billion</td><td style="padding:4px 8px;">1B</td><td style="padding:4px 8px;">30</td></tr>
</table>
<h3 style="margin:14px 0 6px;font-size:14px;">Iterative algorithm</h3>
<pre><code>int binary_search(int arr[], int n, int target) {
    int lo = 0, hi = n - 1;
    while (lo &lt;= hi) {
        int mid = lo + (hi - lo) / 2;       // overflow-safe
        if (arr[mid] == target) return mid;
        if (arr[mid] &lt; target) lo = mid + 1;  // right half
        else                    hi = mid - 1;  // left half
    }
    return -1;
}</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">Two classic pitfalls</h3>
<ol>
  <li><strong>Use <code>lo + (hi - lo) / 2</code>, not <code>(lo + hi) / 2</code></strong>: when both are large, the sum overflows int. A real-world bug pattern.</li>
  <li><strong>Loop condition is <code>lo &lt;= hi</code> not <code>lo &lt; hi</code></strong>: when only one element remains (lo == hi) you must still check it.</li>
</ol>
<h3 style="margin:14px 0 6px;font-size:14px;">Prerequisite: sorted data</h3>
<p>Binary search <strong>requires</strong> sorted data. If you only query once, <strong>don't</strong> sort just to binary-search — sorting costs O(n log n), worse than linear O(n). Only worth it for <strong>many queries</strong>.</p>

@@task:zh
实现迭代版的 <code>int binary_search(int arr[], int n, int target)</code>。对几个值打印结果：
<pre><code>arr = {1, 3, 4, 7, 9, 12, 15, 18, 22, 25}, n = 10

target = 1   → 0
target = 22  → 8
target = 9   → 4   （正中间）
target = 100 → -1  （不存在）
target = 5   → -1  （在 4 和 7 之间，没有）</code></pre>
按下面格式输出：
<pre><code>find 1: index 0
find 22: index 8
find 9: index 4
find 100: index -1
find 5: index -1</code></pre>

@@task:en
Implement iterative <code>int binary_search(int arr[], int n, int target)</code>. Test:
<pre><code>arr = {1, 3, 4, 7, 9, 12, 15, 18, 22, 25}, n = 10

target = 1   → 0
target = 22  → 8
target = 9   → 4   (middle)
target = 100 → -1  (out of range)
target = 5   → -1  (between 4 and 7, absent)</code></pre>
Output:
<pre><code>find 1: index 0
find 22: index 8
find 9: index 4
find 100: index -1
find 5: index -1</code></pre>

@@hint:zh
两指针 <code>lo = 0, hi = n - 1</code>。while <code>lo &lt;= hi</code>：算 mid = lo + (hi - lo) / 2，比较 arr[mid] 和 target，相等就返回，小于把 lo 移到 mid+1，大于把 hi 移到 mid-1。

@@hint:en
Two pointers <code>lo = 0, hi = n - 1</code>. While <code>lo &lt;= hi</code>: compute mid = lo + (hi - lo) / 2, compare arr[mid] with target, return on equal; move lo to mid+1 on less, hi to mid-1 on greater.

@@starter
#include <stdio.h>

int binary_search(int arr[], int n, int target) {
    // TODO: 迭代版二分
    return -1;
}

int main(void) {
    int arr[] = {1, 3, 4, 7, 9, 12, 15, 18, 22, 25};
    int n = 10;

    printf("find 1: index %d\\n",   binary_search(arr, n, 1));
    printf("find 22: index %d\\n",  binary_search(arr, n, 22));
    printf("find 9: index %d\\n",   binary_search(arr, n, 9));
    printf("find 100: index %d\\n", binary_search(arr, n, 100));
    printf("find 5: index %d\\n",   binary_search(arr, n, 5));
    return 0;
}

@@answer
#include <stdio.h>

int binary_search(int arr[], int n, int target) {
    int lo = 0, hi = n - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) lo = mid + 1;
        else                   hi = mid - 1;
    }
    return -1;
}

int main(void) {
    int arr[] = {1, 3, 4, 7, 9, 12, 15, 18, 22, 25};
    int n = 10;

    printf("find 1: index %d\\n",   binary_search(arr, n, 1));
    printf("find 22: index %d\\n",  binary_search(arr, n, 22));
    printf("find 9: index %d\\n",   binary_search(arr, n, 9));
    printf("find 100: index %d\\n", binary_search(arr, n, 100));
    printf("find 5: index %d\\n",   binary_search(arr, n, 5));
    return 0;
}

@@expectedOutput
find 1: index 0
find 22: index 8
find 9: index 4
find 100: index -1
find 5: index -1
`);
