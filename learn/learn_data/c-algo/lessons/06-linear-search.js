LEARN.lesson('c-algo', 6, `
@@chapterRef c-algo-tute-1

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead">线性搜索是<strong>最朴素的搜索</strong>——从头到尾扫一遍数组。它对什么数据都管用（不需要有序），<strong>是其他高级搜索的兜底方案</strong>。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">实现</h3>
<pre><code>int linear_search(int arr[], int n, int target) {
    for (int i = 0; i &lt; n; i++) {
        if (arr[i] == target) return i;     // 找到，返回下标
    }
    return -1;                              // 没找到
}</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">复杂度</h3>
<table style="width:100%;border-collapse:collapse;font-size:13px;margin:6px 0;">
  <tr style="border-bottom:1px solid var(--border);"><th style="text-align:left;padding:4px 8px;">情况</th><th style="text-align:left;padding:4px 8px;">步数</th><th style="text-align:left;padding:4px 8px;">大 O</th></tr>
  <tr><td style="padding:4px 8px;">最好（首项就是）</td><td style="padding:4px 8px;">1</td><td style="padding:4px 8px;">O(1)</td></tr>
  <tr><td style="padding:4px 8px;">最坏（末位 / 不存在）</td><td style="padding:4px 8px;">n</td><td style="padding:4px 8px;">O(n)</td></tr>
  <tr><td style="padding:4px 8px;">平均（均匀分布）</td><td style="padding:4px 8px;">n / 2</td><td style="padding:4px 8px;">O(n)</td></tr>
</table>
<h3 style="margin:14px 0 6px;font-size:14px;">何时用线性搜索？</h3>
<ul>
  <li>数据无序、且只查一两次</li>
  <li>数据规模很小（&lt; 几十个），缓存友好性让线性扫比"二分 + 排序"还快</li>
  <li>需要找<strong>所有</strong>满足条件的元素，而不是第一个</li>
</ul>

@@intro:en
<p class="lead">Linear search is <strong>the most basic search</strong> — walk through the array from start to finish. Works on any data (no sorting needed), the <strong>fallback for everything else</strong>.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Implementation</h3>
<pre><code>int linear_search(int arr[], int n, int target) {
    for (int i = 0; i &lt; n; i++) {
        if (arr[i] == target) return i;     // found
    }
    return -1;                              // not found
}</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">Complexity</h3>
<table style="width:100%;border-collapse:collapse;font-size:13px;margin:6px 0;">
  <tr style="border-bottom:1px solid var(--border);"><th style="text-align:left;padding:4px 8px;">Case</th><th style="text-align:left;padding:4px 8px;">Steps</th><th style="text-align:left;padding:4px 8px;">Big O</th></tr>
  <tr><td style="padding:4px 8px;">Best (first item)</td><td style="padding:4px 8px;">1</td><td style="padding:4px 8px;">O(1)</td></tr>
  <tr><td style="padding:4px 8px;">Worst (last / absent)</td><td style="padding:4px 8px;">n</td><td style="padding:4px 8px;">O(n)</td></tr>
  <tr><td style="padding:4px 8px;">Average (uniform)</td><td style="padding:4px 8px;">n / 2</td><td style="padding:4px 8px;">O(n)</td></tr>
</table>
<h3 style="margin:14px 0 6px;font-size:14px;">When to use linear search?</h3>
<ul>
  <li>Unsorted data + only one or two queries</li>
  <li>Small data (&lt; a few dozen) — cache friendliness beats "sort + binary search"</li>
  <li>Need <strong>all</strong> matches, not just the first</li>
</ul>

@@task:zh
实现 <code>int linear_search(int arr[], int n, int target)</code>，找到返回下标，找不到返回 -1。然后对几个测试用例打印结果：
<pre><code>arr = {7, 3, 5, 1, 9, 2, 8, 4, 6}, n = 9

target = 7  → 0   （首项）
target = 9  → 4   （中间）
target = 6  → 8   （末项）
target = 10 → -1  （不存在）</code></pre>
按下面格式输出：
<pre><code>find 7: index 0
find 9: index 4
find 6: index 8
find 10: index -1</code></pre>

@@task:en
Implement <code>int linear_search(int arr[], int n, int target)</code>: return index or -1. Then test:
<pre><code>arr = {7, 3, 5, 1, 9, 2, 8, 4, 6}, n = 9

target = 7  → 0   (first)
target = 9  → 4   (middle)
target = 6  → 8   (last)
target = 10 → -1  (not present)</code></pre>
Output:
<pre><code>find 7: index 0
find 9: index 4
find 6: index 8
find 10: index -1</code></pre>

@@hint:zh
循环 i 从 0 到 n-1，命中就 <code>return i;</code>；走完循环都没命中就 <code>return -1;</code>。
注意函数提前 return 是 C 的标准模式。

@@hint:en
Loop i from 0 to n-1, on match <code>return i;</code>; if loop finishes without a hit, <code>return -1;</code>. Early-return is the standard C pattern.

@@starter
#include <stdio.h>

int linear_search(int arr[], int n, int target) {
    // TODO
    return -1;
}

int main(void) {
    int arr[] = {7, 3, 5, 1, 9, 2, 8, 4, 6};
    int n = 9;

    printf("find 7: index %d\\n",  linear_search(arr, n, 7));
    printf("find 9: index %d\\n",  linear_search(arr, n, 9));
    printf("find 6: index %d\\n",  linear_search(arr, n, 6));
    printf("find 10: index %d\\n", linear_search(arr, n, 10));
    return 0;
}

@@answer
#include <stdio.h>

int linear_search(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}

int main(void) {
    int arr[] = {7, 3, 5, 1, 9, 2, 8, 4, 6};
    int n = 9;

    printf("find 7: index %d\\n",  linear_search(arr, n, 7));
    printf("find 9: index %d\\n",  linear_search(arr, n, 9));
    printf("find 6: index %d\\n",  linear_search(arr, n, 6));
    printf("find 10: index %d\\n", linear_search(arr, n, 10));
    return 0;
}

@@expectedOutput
find 7: index 0
find 9: index 4
find 6: index 8
find 10: index -1
`);
