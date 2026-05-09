LEARN.lesson('c-algo', 10, `
@@chapterRef c-algo-tute-1

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead">插入排序——像打牌：抓一张就插进合适位置。<strong>对小数据 / 几乎有序的数据是最快的 O(n²) 排序</strong>。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">思路</h3>
<p>把数组分成"已排序前缀"+"未排序后缀"。每次拿后缀第一张牌，向左挪到合适位置：</p>
<pre><code>[5] | 2 4 1 3        ← 左边 [5] 已"排好"，准备插 2
拿 2 向左：2 &lt; 5 → 5 右移 → 2 落位
[2 5] | 4 1 3
拿 4：4 &lt; 5 → 5 移；4 &gt; 2 → 停。落 2 和 5 之间
[2 4 5] | 1 3
... 继续</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">代码</h3>
<pre><code>void insertion_sort(int a[], int n) {
    for (int i = 1; i &lt; n; i++) {
        int key = a[i];               // 抓的牌
        int j = i - 1;
        while (j &gt;= 0 &amp;&amp; a[j] &gt; key) {
            a[j + 1] = a[j];          // 大的右移
            j--;
        }
        a[j + 1] = key;               // 插入正确位置
    }
}</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">关键优势：自适应</h3>
<p>"几乎有序" 的输入只需要少量挪动。比如：</p>
<ul>
  <li>已经完全有序：每张牌只比较 1 次就停 → <strong>O(n)</strong></li>
  <li>每个元素离正确位置 ≤ k 步：O(nk)，k 小就接近线性</li>
</ul>
<p>这就是为什么<strong>工业级排序（Java Timsort、C++ std::sort）</strong>在数据小（&lt; 几十个）时切到插入排序——常数因子比快排小，且能利用部分有序性。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">评价</h3>
<table style="width:100%;border-collapse:collapse;font-size:13px;margin:6px 0;">
  <tr style="border-bottom:1px solid var(--border);"><th style="text-align:left;padding:4px 8px;">维度</th><th style="text-align:left;padding:4px 8px;">结果</th></tr>
  <tr><td style="padding:4px 8px;">最好</td><td style="padding:4px 8px;">O(n) ⭐（已有序）</td></tr>
  <tr><td style="padding:4px 8px;">最坏 / 平均</td><td style="padding:4px 8px;">O(n²)</td></tr>
  <tr><td style="padding:4px 8px;">空间</td><td style="padding:4px 8px;">O(1)，原地</td></tr>
  <tr><td style="padding:4px 8px;">稳定</td><td style="padding:4px 8px;">是（用 &gt;，相等不挪）</td></tr>
  <tr><td style="padding:4px 8px;">自适应</td><td style="padding:4px 8px;">⭐⭐ 非常自适应</td></tr>
</table>

@@intro:en
<p class="lead">Insertion sort — like playing cards: grab one, insert it where it belongs. <strong>The fastest O(n²) sort on small / near-sorted data</strong>.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Idea</h3>
<p>Split into "sorted prefix" + "unsorted suffix". Take the first card of the suffix, slide it left to its slot:</p>
<pre><code>[5] | 2 4 1 3        ← prefix [5] sorted, will insert 2
take 2, walk left: 2 &lt; 5 → 5 shifts right → drop 2
[2 5] | 4 1 3
take 4: 4 &lt; 5 → shift; 4 &gt; 2 → stop. Drop between 2 and 5
[2 4 5] | 1 3
... continue</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">Code</h3>
<pre><code>void insertion_sort(int a[], int n) {
    for (int i = 1; i &lt; n; i++) {
        int key = a[i];               // card in hand
        int j = i - 1;
        while (j &gt;= 0 &amp;&amp; a[j] &gt; key) {
            a[j + 1] = a[j];          // shift bigger right
            j--;
        }
        a[j + 1] = key;               // drop into place
    }
}</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">Key advantage: adaptive</h3>
<p>"Almost sorted" input needs few shifts:</p>
<ul>
  <li>Already sorted: each card compares once and stops → <strong>O(n)</strong></li>
  <li>Each element ≤ k steps from its place: O(nk), near linear for small k</li>
</ul>
<p>This is why <strong>industrial sorts (Java Timsort, C++ std::sort)</strong> switch to insertion sort when data is small (&lt; a few dozen) — smaller constants and exploits existing order.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Evaluation</h3>
<table style="width:100%;border-collapse:collapse;font-size:13px;margin:6px 0;">
  <tr style="border-bottom:1px solid var(--border);"><th style="text-align:left;padding:4px 8px;">Dimension</th><th style="text-align:left;padding:4px 8px;">Result</th></tr>
  <tr><td style="padding:4px 8px;">Best</td><td style="padding:4px 8px;">O(n) ⭐ (sorted)</td></tr>
  <tr><td style="padding:4px 8px;">Worst / avg</td><td style="padding:4px 8px;">O(n²)</td></tr>
  <tr><td style="padding:4px 8px;">Space</td><td style="padding:4px 8px;">O(1), in-place</td></tr>
  <tr><td style="padding:4px 8px;">Stable</td><td style="padding:4px 8px;">Yes (uses &gt;, equals don't move)</td></tr>
  <tr><td style="padding:4px 8px;">Adaptive</td><td style="padding:4px 8px;">⭐⭐ very</td></tr>
</table>

@@task:zh
实现插入排序，排 <code>{5, 2, 4, 1, 3, 8, 6, 9, 7}</code>。空格分开打印：
<pre><code>1 2 3 4 5 6 7 8 9</code></pre>

@@task:en
Implement insertion sort, sort <code>{5, 2, 4, 1, 3, 8, 6, 9, 7}</code>. Print space-separated:
<pre><code>1 2 3 4 5 6 7 8 9</code></pre>

@@hint:zh
外层 i 从 1 到 n-1。<code>key = a[i]</code>，j = i-1。while <code>j &gt;= 0 &amp;&amp; a[j] &gt; key</code>：<code>a[j+1] = a[j]; j--;</code>。最后 <code>a[j+1] = key;</code>。

@@hint:en
Outer i from 1 to n-1. <code>key = a[i]</code>, j = i-1. While <code>j &gt;= 0 &amp;&amp; a[j] &gt; key</code>: <code>a[j+1] = a[j]; j--;</code> Finally <code>a[j+1] = key;</code>

@@starter
#include <stdio.h>

void insertion_sort(int a[], int n) {
    // TODO
}

int main(void) {
    int a[] = {5, 2, 4, 1, 3, 8, 6, 9, 7};
    int n = 9;
    insertion_sort(a, n);
    for (int i = 0; i < n; i++)
        printf("%d%s", a[i], i == n - 1 ? "\\n" : " ");
    return 0;
}

@@answer
#include <stdio.h>

void insertion_sort(int a[], int n) {
    for (int i = 1; i < n; i++) {
        int key = a[i];
        int j = i - 1;
        while (j >= 0 && a[j] > key) {
            a[j + 1] = a[j];
            j--;
        }
        a[j + 1] = key;
    }
}

int main(void) {
    int a[] = {5, 2, 4, 1, 3, 8, 6, 9, 7};
    int n = 9;
    insertion_sort(a, n);
    for (int i = 0; i < n; i++)
        printf("%d%s", a[i], i == n - 1 ? "\\n" : " ");
    return 0;
}

@@expectedOutput
1 2 3 4 5 6 7 8 9
`);
