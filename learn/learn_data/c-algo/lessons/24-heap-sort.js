LEARN.lesson('c-algo', 24, `
@@chapterRef c-algo-tute-3

@@difficulty:zh 进阶
@@difficulty:en Intermediate

@@intro:zh
<p class="lead">二叉堆是一棵<strong>完全二叉树</strong>，但用普通数组就能存——用<strong>下标算父子关系</strong>就行。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">数组表示完全二叉树</h3>
<p>对索引 i：</p>
<ul>
  <li>父节点：<code>(i - 1) / 2</code></li>
  <li>左子：<code>2i + 1</code></li>
  <li>右子：<code>2i + 2</code></li>
</ul>
<p>不需要任何指针。<strong>这是堆最优雅的地方</strong>——内存紧凑、缓存友好。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">最大堆性质</h3>
<p>每个节点的值 ≥ 它两个子节点。所以 <strong>a[0] 永远是最大值</strong>。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">heapify_down（下沉）</h3>
<p>把不满足堆序的根节点往下沉到正确位置：</p>
<pre><code>void heapify_down(int a[], int n, int i) {
    while (1) {
        int l = 2 * i + 1, r = 2 * i + 2;
        int largest = i;
        if (l &lt; n &amp;&amp; a[l] &gt; a[largest]) largest = l;
        if (r &lt; n &amp;&amp; a[r] &gt; a[largest]) largest = r;
        if (largest == i) break;        // 不再需要交换
        int t = a[i]; a[i] = a[largest]; a[largest] = t;
        i = largest;
    }
}</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">build_heap：O(n) 建堆</h3>
<p>从最后一个非叶子节点（<code>n/2 - 1</code>）开始，对每个节点做 heapify_down：</p>
<pre><code>void build_heap(int a[], int n) {
    for (int i = n / 2 - 1; i &gt;= 0; i--) {
        heapify_down(a, n, i);
    }
}</code></pre>
<p>反直觉的事实：这个 build_heap 是 <strong>O(n)</strong> 不是 O(n log n)（数学证明涉及级数收敛）。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">堆排序</h3>
<ol>
  <li>build_heap → 数组变成合法的最大堆</li>
  <li>把 a[0]（最大）和最后一个元素交换 → 最大值锁定在末尾</li>
  <li>对前 n-1 个元素 heapify_down → 重新成堆</li>
  <li>重复直到只剩 1 个</li>
</ol>
<p>O(n) build + n 次 O(log n) extract = <strong>O(n log n)</strong>。原地，不稳定。</p>

@@intro:en
<p class="lead">A binary heap is a <strong>complete binary tree</strong>, but stored in a plain array — <strong>index math gives parent/child relations</strong>.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Array representation</h3>
<p>For index i:</p>
<ul>
  <li>Parent: <code>(i - 1) / 2</code></li>
  <li>Left child: <code>2i + 1</code></li>
  <li>Right child: <code>2i + 2</code></li>
</ul>
<p>No pointers. <strong>The elegance of heaps</strong> — compact memory, cache-friendly.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Max-heap property</h3>
<p>Every node ≥ its two children. So <strong>a[0] is always the max</strong>.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">heapify_down (sift down)</h3>
<p>Sink a root that violates heap order to its proper place:</p>
<pre><code>void heapify_down(int a[], int n, int i) {
    while (1) {
        int l = 2 * i + 1, r = 2 * i + 2;
        int largest = i;
        if (l &lt; n &amp;&amp; a[l] &gt; a[largest]) largest = l;
        if (r &lt; n &amp;&amp; a[r] &gt; a[largest]) largest = r;
        if (largest == i) break;
        int t = a[i]; a[i] = a[largest]; a[largest] = t;
        i = largest;
    }
}</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">build_heap: O(n)</h3>
<p>Start from the last non-leaf (<code>n/2 - 1</code>), heapify_down each one:</p>
<pre><code>void build_heap(int a[], int n) {
    for (int i = n / 2 - 1; i &gt;= 0; i--) {
        heapify_down(a, n, i);
    }
}</code></pre>
<p>Counterintuitive fact: this build is <strong>O(n)</strong>, not O(n log n) (proof involves a converging series).</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Heap sort</h3>
<ol>
  <li>build_heap → max-heap</li>
  <li>Swap a[0] (max) with the last element → max locked at the end</li>
  <li>heapify_down on first n-1 elements → re-heapify</li>
  <li>Repeat until one left</li>
</ol>
<p>O(n) build + n × O(log n) extract = <strong>O(n log n)</strong>. In-place, unstable.</p>

@@task:zh
实现 heapify_down、build_heap、heap_sort。排 <code>{4, 9, 7, 12, 3, 14, 8, 11}</code>，空格分开打印：
<pre><code>3 4 7 8 9 11 12 14</code></pre>

@@task:en
Implement heapify_down, build_heap, heap_sort. Sort <code>{4, 9, 7, 12, 3, 14, 8, 11}</code>, print space-separated:
<pre><code>3 4 7 8 9 11 12 14</code></pre>

@@hint:zh
heap_sort 的核心循环：
<pre><code>for (int end = n - 1; end &gt; 0; end--) {
    int t = a[0]; a[0] = a[end]; a[end] = t;     // 把最大值换到末尾
    heapify_down(a, end, 0);                     // 仅在前 end 个元素上重整
}</code></pre>
<strong>注意</strong>：调用 heapify_down 时 n 用 <code>end</code>（已锁定部分不参与）。

@@hint:en
Core loop:
<pre><code>for (int end = n - 1; end &gt; 0; end--) {
    int t = a[0]; a[0] = a[end]; a[end] = t;     // swap max to end
    heapify_down(a, end, 0);                     // reheapify first end
}</code></pre>
<strong>Note</strong>: pass <code>end</code> (not n) to heapify_down — already-locked tail is excluded.

@@starter
#include <stdio.h>

void heapify_down(int a[], int n, int i) {
    // TODO
}

void build_heap(int a[], int n) {
    // TODO
}

void heap_sort(int a[], int n) {
    // TODO
}

int main(void) {
    int a[] = {4, 9, 7, 12, 3, 14, 8, 11};
    int n = 8;
    heap_sort(a, n);
    for (int i = 0; i < n; i++)
        printf("%d%s", a[i], i == n - 1 ? "\\n" : " ");
    return 0;
}

@@answer
#include <stdio.h>

void heapify_down(int a[], int n, int i) {
    while (1) {
        int l = 2 * i + 1, r = 2 * i + 2;
        int largest = i;
        if (l < n && a[l] > a[largest]) largest = l;
        if (r < n && a[r] > a[largest]) largest = r;
        if (largest == i) break;
        int t = a[i]; a[i] = a[largest]; a[largest] = t;
        i = largest;
    }
}

void build_heap(int a[], int n) {
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify_down(a, n, i);
    }
}

void heap_sort(int a[], int n) {
    build_heap(a, n);
    for (int end = n - 1; end > 0; end--) {
        int t = a[0]; a[0] = a[end]; a[end] = t;
        heapify_down(a, end, 0);
    }
}

int main(void) {
    int a[] = {4, 9, 7, 12, 3, 14, 8, 11};
    int n = 8;
    heap_sort(a, n);
    for (int i = 0; i < n; i++)
        printf("%d%s", a[i], i == n - 1 ? "\\n" : " ");
    return 0;
}

@@expectedOutput
3 4 7 8 9 11 12 14
`);
