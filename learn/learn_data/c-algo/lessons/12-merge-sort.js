LEARN.lesson('c-algo', 12, `
@@chapterRef c-algo-tute-2

@@difficulty:zh 进阶
@@difficulty:en Intermediate

@@intro:zh
<p class="lead">把上一节的 merge 接到分治框架里就是<strong>归并排序</strong>。最坏 O(n log n)、稳定，是 <em>需要保证最坏情况性能</em> 时的首选。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">分治框架（递归）</h3>
<pre><code>void merge_sort(int a[], int lo, int hi) {
    if (lo &gt;= hi) return;             // base：1 个元素天然有序
    int mid = lo + (hi - lo) / 2;
    merge_sort(a, lo, mid);            // 排左半
    merge_sort(a, mid + 1, hi);        // 排右半
    merge(a, lo, mid, hi);             // 合并
}</code></pre>
<p>可以"信任"递归调用都返回了排好的子数组，然后 merge 它们。这就是典型的<strong>分治</strong>结构。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">原地版的 merge</h3>
<p>由于要在 <code>a[]</code> 里操作不是分开的 L、R 数组，merge 写法稍微改一下：用临时缓冲 <code>tmp[]</code> 把结果存好，再写回 <code>a[lo..hi]</code>：</p>
<pre><code>void merge(int a[], int lo, int mid, int hi) {
    int n = hi - lo + 1;
    int *tmp = (int*)malloc(n * sizeof(int));
    int i = lo, j = mid + 1, k = 0;
    while (i &lt;= mid &amp;&amp; j &lt;= hi) {
        if (a[i] &lt;= a[j]) tmp[k++] = a[i++];
        else              tmp[k++] = a[j++];
    }
    while (i &lt;= mid) tmp[k++] = a[i++];
    while (j &lt;= hi)  tmp[k++] = a[j++];
    for (int t = 0; t &lt; n; t++) a[lo + t] = tmp[t];   // 写回
    free(tmp);
}</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">为什么是 O(n log n)？</h3>
<ul>
  <li><strong>每"层"递归</strong>：所有 merge 加起来覆盖整个数组，每层 O(n)</li>
  <li><strong>层数 = log n</strong>：每次范围减半</li>
  <li>合计 <strong>O(n log n)</strong></li>
</ul>
<p>额外空间 O(n)（临时缓冲）—— 这是归并的代价。要省内存就用快排（下一节）。</p>

@@intro:en
<p class="lead">Plug the merge from the last lesson into a divide-and-conquer frame and you get <strong>merge sort</strong>. Worst-case O(n log n), stable — the choice when <em>worst-case bounds matter</em>.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Divide & conquer (recursive)</h3>
<pre><code>void merge_sort(int a[], int lo, int hi) {
    if (lo &gt;= hi) return;             // base: 1 element is sorted
    int mid = lo + (hi - lo) / 2;
    merge_sort(a, lo, mid);            // sort left
    merge_sort(a, mid + 1, hi);        // sort right
    merge(a, lo, mid, hi);             // merge
}</code></pre>
<p>"Trust" that recursive calls return sorted subarrays, then merge them. Classic <strong>divide and conquer</strong>.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">In-place merge</h3>
<p>Since L and R aren't separate arrays but slices of <code>a[]</code>, write merge into a temp buffer <code>tmp[]</code>, then copy back to <code>a[lo..hi]</code>:</p>
<pre><code>void merge(int a[], int lo, int mid, int hi) {
    int n = hi - lo + 1;
    int *tmp = (int*)malloc(n * sizeof(int));
    int i = lo, j = mid + 1, k = 0;
    while (i &lt;= mid &amp;&amp; j &lt;= hi) {
        if (a[i] &lt;= a[j]) tmp[k++] = a[i++];
        else              tmp[k++] = a[j++];
    }
    while (i &lt;= mid) tmp[k++] = a[i++];
    while (j &lt;= hi)  tmp[k++] = a[j++];
    for (int t = 0; t &lt; n; t++) a[lo + t] = tmp[t];   // copy back
    free(tmp);
}</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">Why O(n log n)?</h3>
<ul>
  <li>Per recursion <strong>level</strong>: all merges cover the whole array, O(n) per level</li>
  <li><strong>Levels = log n</strong>: each split halves the range</li>
  <li>Total <strong>O(n log n)</strong></li>
</ul>
<p>Extra space O(n) (temp buffer) — that's merge sort's cost. For O(1) extra, use quicksort (next lesson).</p>

@@task:zh
实现 <code>merge</code> 和 <code>merge_sort</code>。在主函数排 <code>{5, 2, 8, 1, 4, 7, 3, 6}</code>，空格分开打印：
<pre><code>1 2 3 4 5 6 7 8</code></pre>

@@task:en
Implement <code>merge</code> and <code>merge_sort</code>. In main, sort <code>{5, 2, 8, 1, 4, 7, 3, 6}</code>, print space-separated:
<pre><code>1 2 3 4 5 6 7 8</code></pre>

@@hint:zh
需要 <code>#include &lt;stdlib.h&gt;</code> 才能用 malloc/free。
注意：<code>merge_sort(a, 0, n-1)</code>，传的是<strong>闭区间下标</strong>，不是 (start, length)。

@@hint:en
You'll need <code>#include &lt;stdlib.h&gt;</code> for malloc/free.
Note: <code>merge_sort(a, 0, n-1)</code> uses <strong>inclusive indices</strong>, not (start, length).

@@starter
#include <stdio.h>
#include <stdlib.h>

void merge(int a[], int lo, int mid, int hi) {
    // TODO
}

void merge_sort(int a[], int lo, int hi) {
    // TODO: 递归分治
}

int main(void) {
    int a[] = {5, 2, 8, 1, 4, 7, 3, 6};
    int n = 8;
    merge_sort(a, 0, n - 1);
    for (int i = 0; i < n; i++)
        printf("%d%s", a[i], i == n - 1 ? "\\n" : " ");
    return 0;
}

@@answer
#include <stdio.h>
#include <stdlib.h>

void merge(int a[], int lo, int mid, int hi) {
    int n = hi - lo + 1;
    int *tmp = (int*)malloc(n * sizeof(int));
    int i = lo, j = mid + 1, k = 0;
    while (i <= mid && j <= hi) {
        if (a[i] <= a[j]) tmp[k++] = a[i++];
        else              tmp[k++] = a[j++];
    }
    while (i <= mid) tmp[k++] = a[i++];
    while (j <= hi)  tmp[k++] = a[j++];
    for (int t = 0; t < n; t++) a[lo + t] = tmp[t];
    free(tmp);
}

void merge_sort(int a[], int lo, int hi) {
    if (lo >= hi) return;
    int mid = lo + (hi - lo) / 2;
    merge_sort(a, lo, mid);
    merge_sort(a, mid + 1, hi);
    merge(a, lo, mid, hi);
}

int main(void) {
    int a[] = {5, 2, 8, 1, 4, 7, 3, 6};
    int n = 8;
    merge_sort(a, 0, n - 1);
    for (int i = 0; i < n; i++)
        printf("%d%s", a[i], i == n - 1 ? "\\n" : " ");
    return 0;
}

@@expectedOutput
1 2 3 4 5 6 7 8
`);
