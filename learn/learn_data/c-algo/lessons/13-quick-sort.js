LEARN.lesson('c-algo', 13, `
@@chapterRef c-algo-tute-2

@@difficulty:zh 进阶
@@difficulty:en Intermediate

@@intro:zh
<p class="lead">快速排序——和归并是两种相反的分治：归并"切分廉价、合并干活"，快排"切分干活、合并不需要"。<strong>原地、平均 O(n log n)、实测最快</strong>。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">核心思想：partition</h3>
<ol>
  <li>选一个 <strong>pivot</strong>（轴心元素）</li>
  <li>把数组重排成：<strong>左边都 ≤ pivot，右边都 &gt; pivot</strong>。pivot 自己<strong>就到了它的最终位置</strong></li>
  <li>对 pivot 左边、右边分别递归</li>
</ol>
<p>关键点：<strong>partition 完成后 pivot 不会再动</strong>。每次递归都"敲定"一个元素的位置。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Lomuto 分区（最简单的实现）</h3>
<p>用最右元素作 pivot；维护两个指针：i 是"≤ pivot 区"右边界，j 扫整个范围：</p>
<pre><code>int partition(int a[], int lo, int hi) {
    int pivot = a[hi];          // 最右元素作 pivot
    int i = lo - 1;             // a[lo..i] 都 ≤ pivot
    for (int j = lo; j &lt; hi; j++) {
        if (a[j] &lt;= pivot) {
            i++;                // 扩大 ≤ 区
            int t = a[i]; a[i] = a[j]; a[j] = t;
        }
    }
    // 把 pivot 换到 i+1，左侧全是 ≤、右侧全是 &gt;
    int t = a[i + 1]; a[i + 1] = a[hi]; a[hi] = t;
    return i + 1;
}

void quick_sort(int a[], int lo, int hi) {
    if (lo &gt;= hi) return;
    int p = partition(a, lo, hi);
    quick_sort(a, lo, p - 1);
    quick_sort(a, p + 1, hi);
}</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">复杂度</h3>
<table style="width:100%;border-collapse:collapse;font-size:13px;margin:6px 0;">
  <tr style="border-bottom:1px solid var(--border);"><th style="text-align:left;padding:4px 8px;">情况</th><th style="text-align:left;padding:4px 8px;">复杂度</th></tr>
  <tr><td style="padding:4px 8px;">最好（pivot 总切中位数）</td><td style="padding:4px 8px;">O(n log n)</td></tr>
  <tr><td style="padding:4px 8px;">平均</td><td style="padding:4px 8px;">O(n log n)</td></tr>
  <tr><td style="padding:4px 8px;">最坏（pivot 总最大 / 最小）</td><td style="padding:4px 8px;">⚠️ O(n²)</td></tr>
  <tr><td style="padding:4px 8px;">空间</td><td style="padding:4px 8px;">O(log n)（递归栈），原地</td></tr>
  <tr><td style="padding:4px 8px;">稳定</td><td style="padding:4px 8px;">否</td></tr>
</table>
<p><strong>最坏 O(n²) 的触发条件</strong>：已排序输入 + 总选最右作 pivot。工业实现用<strong>随机 pivot</strong> 或<strong>三数取中</strong>避免这种情况。</p>

@@intro:en
<p class="lead">Quicksort — the opposite of merge sort: merge does cheap split + expensive merge, quick does expensive split + free merge. <strong>In-place, average O(n log n), fastest in practice</strong>.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Core: partition</h3>
<ol>
  <li>Pick a <strong>pivot</strong></li>
  <li>Rearrange so <strong>≤ pivot on left, &gt; pivot on right</strong>. Pivot ends up <strong>at its final sorted position</strong></li>
  <li>Recurse on left and right</li>
</ol>
<p>Key: <strong>after partition the pivot doesn't move again</strong>. Each recursive call "fixes" one element's position.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Lomuto partition (the simplest)</h3>
<p>Use rightmost as pivot; two pointers: i = boundary of "≤ pivot" region, j scans the range:</p>
<pre><code>int partition(int a[], int lo, int hi) {
    int pivot = a[hi];          // rightmost as pivot
    int i = lo - 1;             // a[lo..i] all ≤ pivot
    for (int j = lo; j &lt; hi; j++) {
        if (a[j] &lt;= pivot) {
            i++;                // grow ≤-region
            int t = a[i]; a[i] = a[j]; a[j] = t;
        }
    }
    // place pivot at i+1: left all ≤, right all &gt;
    int t = a[i + 1]; a[i + 1] = a[hi]; a[hi] = t;
    return i + 1;
}

void quick_sort(int a[], int lo, int hi) {
    if (lo &gt;= hi) return;
    int p = partition(a, lo, hi);
    quick_sort(a, lo, p - 1);
    quick_sort(a, p + 1, hi);
}</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">Complexity</h3>
<table style="width:100%;border-collapse:collapse;font-size:13px;margin:6px 0;">
  <tr style="border-bottom:1px solid var(--border);"><th style="text-align:left;padding:4px 8px;">Case</th><th style="text-align:left;padding:4px 8px;">Complexity</th></tr>
  <tr><td style="padding:4px 8px;">Best (pivot is median)</td><td style="padding:4px 8px;">O(n log n)</td></tr>
  <tr><td style="padding:4px 8px;">Average</td><td style="padding:4px 8px;">O(n log n)</td></tr>
  <tr><td style="padding:4px 8px;">Worst (pivot always extreme)</td><td style="padding:4px 8px;">⚠️ O(n²)</td></tr>
  <tr><td style="padding:4px 8px;">Space</td><td style="padding:4px 8px;">O(log n) (stack), in-place</td></tr>
  <tr><td style="padding:4px 8px;">Stable</td><td style="padding:4px 8px;">No</td></tr>
</table>
<p><strong>Worst-case trigger</strong>: sorted input + always-rightmost pivot. Industrial impls use <strong>random pivot</strong> or <strong>median-of-three</strong> to avoid it.</p>

@@task:zh
实现 partition 和 quick_sort，排 <code>{5, 2, 8, 1, 4, 7, 3, 6}</code>。空格分开打印：
<pre><code>1 2 3 4 5 6 7 8</code></pre>

@@task:en
Implement partition and quick_sort, sort <code>{5, 2, 8, 1, 4, 7, 3, 6}</code>. Print space-separated:
<pre><code>1 2 3 4 5 6 7 8</code></pre>

@@hint:zh
注意 partition 返回的是 pivot 的最终位置 p。后面递归调用是 <code>quick_sort(a, lo, p - 1)</code> 和 <code>quick_sort(a, p + 1, hi)</code>—— pivot 自己不再参与递归。

@@hint:en
partition returns the pivot's final position p. The recursive calls are <code>quick_sort(a, lo, p - 1)</code> and <code>quick_sort(a, p + 1, hi)</code> — pivot itself is excluded.

@@starter
#include <stdio.h>

int partition(int a[], int lo, int hi) {
    // TODO: Lomuto 分区
    return lo;
}

void quick_sort(int a[], int lo, int hi) {
    // TODO: 递归分治
}

int main(void) {
    int a[] = {5, 2, 8, 1, 4, 7, 3, 6};
    int n = 8;
    quick_sort(a, 0, n - 1);
    for (int i = 0; i < n; i++)
        printf("%d%s", a[i], i == n - 1 ? "\\n" : " ");
    return 0;
}

@@answer
#include <stdio.h>

int partition(int a[], int lo, int hi) {
    int pivot = a[hi];
    int i = lo - 1;
    for (int j = lo; j < hi; j++) {
        if (a[j] <= pivot) {
            i++;
            int t = a[i]; a[i] = a[j]; a[j] = t;
        }
    }
    int t = a[i + 1]; a[i + 1] = a[hi]; a[hi] = t;
    return i + 1;
}

void quick_sort(int a[], int lo, int hi) {
    if (lo >= hi) return;
    int p = partition(a, lo, hi);
    quick_sort(a, lo, p - 1);
    quick_sort(a, p + 1, hi);
}

int main(void) {
    int a[] = {5, 2, 8, 1, 4, 7, 3, 6};
    int n = 8;
    quick_sort(a, 0, n - 1);
    for (int i = 0; i < n; i++)
        printf("%d%s", a[i], i == n - 1 ? "\\n" : " ");
    return 0;
}

@@expectedOutput
1 2 3 4 5 6 7 8
`);
