LEARN.lesson('c-algo', 9, `
@@chapterRef c-algo-tute-1

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead">选择排序——每一轮从未排序部分里挑出<strong>最小值</strong>，放到前面。它<strong>不稳定</strong>，但<strong>交换次数最少</strong>。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">思路</h3>
<pre><code>原始: [5  2  4  1  3]
轮 1: 找 5,2,4,1,3 的最小 → 1，与 a[0] 换
      → [1  2  4  5  3]
轮 2: 找 2,4,5,3 的最小 → 2，已经在 a[1]，不换
      → [1  2  4  5  3]
轮 3: 找 4,5,3 的最小 → 3，与 a[2] 换
      → [1  2  3  5  4]
轮 4: 找 5,4 的最小 → 4，与 a[3] 换
      → [1  2  3  4  5]</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">代码</h3>
<pre><code>void selection_sort(int a[], int n) {
    for (int i = 0; i &lt; n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j &lt; n; j++) {
            if (a[j] &lt; a[min_idx]) min_idx = j;
        }
        if (min_idx != i) {
            int t = a[i]; a[i] = a[min_idx]; a[min_idx] = t;
        }
    }
}</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">为什么不稳定？</h3>
<p>看 <code>{5a, 5b, 2}</code>：</p>
<ul>
  <li>轮 1 找最小 = 2，与 5a 换 → <code>{2, 5b, 5a}</code></li>
  <li><strong>5a 跑到了 5b 后面</strong>，原本"a 在前 b 在后"的相对顺序被破坏</li>
</ul>
<p>这是<strong>长距离交换</strong>带来的副作用。冒泡和插入只换相邻元素，所以稳定。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">独特优势：交换次数少</h3>
<p>选择排序<strong>每轮最多 1 次交换</strong>，n-1 轮总共最多 n-1 次。冒泡 / 插入可能交换 n²/2 次。在<strong>"写入很贵"</strong>的场合（比如刷盘、远程同步）这个优点很实用。</p>

@@intro:en
<p class="lead">Selection sort — each pass picks the <strong>minimum</strong> from the unsorted suffix and moves it to the front. <strong>Unstable</strong>, but does the <strong>fewest swaps</strong>.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Idea</h3>
<pre><code>start: [5  2  4  1  3]
pass 1: min of 5,2,4,1,3 → 1, swap with a[0]
       → [1  2  4  5  3]
pass 2: min of 2,4,5,3 → 2, already at a[1], no swap
pass 3: min of 4,5,3 → 3, swap with a[2]
       → [1  2  3  5  4]
pass 4: min of 5,4 → 4, swap with a[3]
       → [1  2  3  4  5]</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">Code</h3>
<pre><code>void selection_sort(int a[], int n) {
    for (int i = 0; i &lt; n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j &lt; n; j++) {
            if (a[j] &lt; a[min_idx]) min_idx = j;
        }
        if (min_idx != i) {
            int t = a[i]; a[i] = a[min_idx]; a[min_idx] = t;
        }
    }
}</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">Why is it unstable?</h3>
<p>Consider <code>{5a, 5b, 2}</code>:</p>
<ul>
  <li>Pass 1: min = 2, swap with 5a → <code>{2, 5b, 5a}</code></li>
  <li><strong>5a is now after 5b</strong> — the original "a before b" relative order is broken.</li>
</ul>
<p>That's a side effect of <strong>long-distance swaps</strong>. Bubble and insertion only swap adjacent elements, so they're stable.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Unique advantage: minimal swaps</h3>
<p>Selection does <strong>at most 1 swap per pass</strong>, n-1 swaps total. Bubble / insertion may do n²/2. Useful when <strong>writes are expensive</strong> (e.g. flash storage, remote sync).</p>

@@task:zh
实现选择排序，排 <code>{5, 2, 4, 1, 3, 8, 6, 9, 7}</code>。结果按空格分开打印：
<pre><code>1 2 3 4 5 6 7 8 9</code></pre>

@@task:en
Implement selection sort, sort <code>{5, 2, 4, 1, 3, 8, 6, 9, 7}</code>. Print space-separated:
<pre><code>1 2 3 4 5 6 7 8 9</code></pre>

@@hint:zh
外层 i 从 0 到 n-2。内层 j 从 i+1 到 n-1，记录 min_idx。内层结束后判断 min_idx != i 才换，省一次无效写。

@@hint:en
Outer i from 0 to n-2. Inner j from i+1 to n-1, track min_idx. After inner loop, only swap if min_idx != i to skip a no-op write.

@@starter
#include <stdio.h>

void selection_sort(int a[], int n) {
    // TODO
}

int main(void) {
    int a[] = {5, 2, 4, 1, 3, 8, 6, 9, 7};
    int n = 9;
    selection_sort(a, n);
    for (int i = 0; i < n; i++)
        printf("%d%s", a[i], i == n - 1 ? "\\n" : " ");
    return 0;
}

@@answer
#include <stdio.h>

void selection_sort(int a[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            if (a[j] < a[min_idx]) min_idx = j;
        }
        if (min_idx != i) {
            int t = a[i]; a[i] = a[min_idx]; a[min_idx] = t;
        }
    }
}

int main(void) {
    int a[] = {5, 2, 4, 1, 3, 8, 6, 9, 7};
    int n = 9;
    selection_sort(a, n);
    for (int i = 0; i < n; i++)
        printf("%d%s", a[i], i == n - 1 ? "\\n" : " ");
    return 0;
}

@@expectedOutput
1 2 3 4 5 6 7 8 9
`);
