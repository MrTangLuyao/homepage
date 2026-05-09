LEARN.lesson('c-algo', 8, `
@@chapterRef c-algo-tute-1

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead">冒泡排序——大数像泡泡一样不断"冒"到右边。<strong>O(n²)，但稳定且容易写</strong>。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">思路</h3>
<p>反复扫描数组：每次比较相邻两个，左 &gt; 右就交换。一轮过后，最大值"冒"到了最右。一共扫 n-1 轮。</p>
<pre><code>void bubble_sort(int a[], int n) {
    for (int i = 0; i &lt; n - 1; i++) {
        for (int j = 0; j &lt; n - 1 - i; j++) {
            if (a[j] &gt; a[j + 1]) {
                int t = a[j];
                a[j] = a[j + 1];
                a[j + 1] = t;
            }
        }
    }
}</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">自适应优化（早停）</h3>
<p>如果某一轮一次交换都没发生，说明数组已经有序，可以提前 break：</p>
<pre><code>void bubble_sort(int a[], int n) {
    for (int i = 0; i &lt; n - 1; i++) {
        int swapped = 0;
        for (int j = 0; j &lt; n - 1 - i; j++) {
            if (a[j] &gt; a[j + 1]) {
                int t = a[j];
                a[j] = a[j + 1];
                a[j + 1] = t;
                swapped = 1;
            }
        }
        if (!swapped) break;
    }
}</code></pre>
<p>已排好序的数组只走一轮 → 最好 <strong>O(n)</strong>。完全逆序仍是 O(n²)。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">评价</h3>
<table style="width:100%;border-collapse:collapse;font-size:13px;margin:6px 0;">
  <tr style="border-bottom:1px solid var(--border);"><th style="text-align:left;padding:4px 8px;">维度</th><th style="text-align:left;padding:4px 8px;">结果</th></tr>
  <tr><td style="padding:4px 8px;">最好</td><td style="padding:4px 8px;">O(n)（带 swapped 优化）</td></tr>
  <tr><td style="padding:4px 8px;">最坏 / 平均</td><td style="padding:4px 8px;">O(n²)</td></tr>
  <tr><td style="padding:4px 8px;">空间</td><td style="padding:4px 8px;">O(1)，原地</td></tr>
  <tr><td style="padding:4px 8px;">稳定</td><td style="padding:4px 8px;">是</td></tr>
</table>

@@intro:en
<p class="lead">Bubble sort — large values "bubble" up to the right. <strong>O(n²), but stable and easy to write</strong>.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Idea</h3>
<p>Sweep the array repeatedly: compare each adjacent pair, swap if left > right. After one sweep, the largest "bubbles" to the right end. n-1 sweeps total.</p>
<pre><code>void bubble_sort(int a[], int n) {
    for (int i = 0; i &lt; n - 1; i++) {
        for (int j = 0; j &lt; n - 1 - i; j++) {
            if (a[j] &gt; a[j + 1]) {
                int t = a[j];
                a[j] = a[j + 1];
                a[j + 1] = t;
            }
        }
    }
}</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">Adaptive (early-exit) optimization</h3>
<p>If a sweep does no swaps, the array is sorted — break early:</p>
<pre><code>void bubble_sort(int a[], int n) {
    for (int i = 0; i &lt; n - 1; i++) {
        int swapped = 0;
        for (int j = 0; j &lt; n - 1 - i; j++) {
            if (a[j] &gt; a[j + 1]) {
                int t = a[j];
                a[j] = a[j + 1];
                a[j + 1] = t;
                swapped = 1;
            }
        }
        if (!swapped) break;
    }
}</code></pre>
<p>An already-sorted array does one sweep → best <strong>O(n)</strong>. Fully reversed is still O(n²).</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Evaluation</h3>
<table style="width:100%;border-collapse:collapse;font-size:13px;margin:6px 0;">
  <tr style="border-bottom:1px solid var(--border);"><th style="text-align:left;padding:4px 8px;">Dimension</th><th style="text-align:left;padding:4px 8px;">Result</th></tr>
  <tr><td style="padding:4px 8px;">Best</td><td style="padding:4px 8px;">O(n) (with swapped flag)</td></tr>
  <tr><td style="padding:4px 8px;">Worst / avg</td><td style="padding:4px 8px;">O(n²)</td></tr>
  <tr><td style="padding:4px 8px;">Space</td><td style="padding:4px 8px;">O(1), in-place</td></tr>
  <tr><td style="padding:4px 8px;">Stable</td><td style="padding:4px 8px;">Yes</td></tr>
</table>

@@task:zh
实现带 <code>swapped</code> 优化的冒泡排序。然后排 <code>{5, 2, 4, 1, 3, 8, 6, 9, 7}</code>，每个元素之间用空格分开，结尾换行：
<pre><code>1 2 3 4 5 6 7 8 9</code></pre>

@@task:en
Implement bubble sort with the <code>swapped</code> optimization. Then sort <code>{5, 2, 4, 1, 3, 8, 6, 9, 7}</code>. Print elements space-separated:
<pre><code>1 2 3 4 5 6 7 8 9</code></pre>

@@hint:zh
两个嵌套 for；交换用临时变量；外层加 <code>int swapped = 0;</code> 标志，内层只要发生交换就设为 1，每轮末检查没发生就 break。
打印用：<code>for (int i = 0; i &lt; n; i++) printf("%d%s", a[i], i == n-1 ? "\\n" : " ");</code>

@@hint:en
Two nested for; swap via temp; outer adds <code>int swapped = 0;</code>, inner sets it to 1 on swap, end of pass break if not swapped.
Print: <code>for (int i = 0; i &lt; n; i++) printf("%d%s", a[i], i == n-1 ? "\\n" : " ");</code>

@@starter
#include <stdio.h>

void bubble_sort(int a[], int n) {
    // TODO: 带 swapped 优化的冒泡
}

int main(void) {
    int a[] = {5, 2, 4, 1, 3, 8, 6, 9, 7};
    int n = 9;
    bubble_sort(a, n);
    for (int i = 0; i < n; i++)
        printf("%d%s", a[i], i == n - 1 ? "\\n" : " ");
    return 0;
}

@@answer
#include <stdio.h>

void bubble_sort(int a[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int swapped = 0;
        for (int j = 0; j < n - 1 - i; j++) {
            if (a[j] > a[j + 1]) {
                int t = a[j];
                a[j] = a[j + 1];
                a[j + 1] = t;
                swapped = 1;
            }
        }
        if (!swapped) break;
    }
}

int main(void) {
    int a[] = {5, 2, 4, 1, 3, 8, 6, 9, 7};
    int n = 9;
    bubble_sort(a, n);
    for (int i = 0; i < n; i++)
        printf("%d%s", a[i], i == n - 1 ? "\\n" : " ");
    return 0;
}

@@expectedOutput
1 2 3 4 5 6 7 8 9
`);
