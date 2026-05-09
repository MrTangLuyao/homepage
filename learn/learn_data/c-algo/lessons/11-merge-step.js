LEARN.lesson('c-algo', 11, `
@@chapterRef c-algo-tute-2

@@difficulty:zh 进阶
@@difficulty:en Intermediate

@@intro:zh
<p class="lead">归并排序的全部技术含量都在<strong>"合并"</strong>这一步——把两个已经排好序的数组合成一个排好序的大数组。这一节先单独练这一步，下一节再做完整归并。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">问题</h3>
<p>给两个已经升序排好的数组 <code>L[]</code> 和 <code>R[]</code>，合并成一个升序数组 <code>out[]</code>。</p>
<p>例：<code>L = [1, 4, 7]</code>，<code>R = [2, 3, 8, 9]</code> → <code>out = [1, 2, 3, 4, 7, 8, 9]</code>。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">双指针法</h3>
<p>三个指针 i、j、k：i 扫 L、j 扫 R、k 写 out。每一步比较 <code>L[i]</code> 和 <code>R[j]</code>，谁小拿谁，被拿的指针前进：</p>
<pre><code>L: 1 4 7
   ^ i=0
R: 2 3 8 9
   ^ j=0
out:                  ← k=0

step 1: L[0]=1 ≤ R[0]=2 → 拿 1，i++，写 out[0]=1
step 2: L[1]=4 vs R[0]=2 → 拿 2，j++
step 3: L[1]=4 vs R[1]=3 → 拿 3，j++
step 4: L[1]=4 vs R[2]=8 → 拿 4，i++
step 5: L[2]=7 vs R[2]=8 → 拿 7，i++
i 越界 → 把 R 剩下的 8, 9 都搬过来</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">代码模板</h3>
<pre><code>void merge(int L[], int nL, int R[], int nR, int out[]) {
    int i = 0, j = 0, k = 0;
    while (i &lt; nL &amp;&amp; j &lt; nR) {
        if (L[i] &lt;= R[j]) out[k++] = L[i++];
        else              out[k++] = R[j++];
    }
    while (i &lt; nL) out[k++] = L[i++];   // L 剩下的
    while (j &lt; nR) out[k++] = R[j++];   // R 剩下的
}</code></pre>
<p>每个元素恰好被拿一次 → 总代价 <strong>O(nL + nR)</strong>，一遍扫。</p>
<p>关键细节：<strong>用 <code>&lt;=</code> 而不是 <code>&lt;</code></strong>。当 L[i] == R[j] 时优先拿 L 的，能保留稳定性（左半元素的相对顺序）。</p>

@@intro:en
<p class="lead">All of merge sort's technical content is in the <strong>merge step</strong> — combining two already-sorted arrays into one sorted array. This lesson drills just that; the next does the full sort.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Problem</h3>
<p>Given two sorted arrays <code>L[]</code> and <code>R[]</code>, produce a sorted <code>out[]</code>.</p>
<p>Example: <code>L = [1, 4, 7]</code>, <code>R = [2, 3, 8, 9]</code> → <code>out = [1, 2, 3, 4, 7, 8, 9]</code>.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Two pointers</h3>
<p>Three pointers i, j, k: i scans L, j scans R, k writes out. Each step compare <code>L[i]</code> and <code>R[j]</code>, take the smaller, advance that pointer:</p>
<pre><code>L: 1 4 7
   ^ i=0
R: 2 3 8 9
   ^ j=0
out:                  ← k=0

step 1: L[0]=1 ≤ R[0]=2 → take 1, i++, out[0]=1
step 2: L[1]=4 vs R[0]=2 → take 2, j++
step 3: L[1]=4 vs R[1]=3 → take 3, j++
step 4: L[1]=4 vs R[2]=8 → take 4, i++
step 5: L[2]=7 vs R[2]=8 → take 7, i++
i exhausted → copy remainder of R (8, 9)</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">Template</h3>
<pre><code>void merge(int L[], int nL, int R[], int nR, int out[]) {
    int i = 0, j = 0, k = 0;
    while (i &lt; nL &amp;&amp; j &lt; nR) {
        if (L[i] &lt;= R[j]) out[k++] = L[i++];
        else              out[k++] = R[j++];
    }
    while (i &lt; nL) out[k++] = L[i++];   // remainder of L
    while (j &lt; nR) out[k++] = R[j++];   // remainder of R
}</code></pre>
<p>Each element is taken once → total <strong>O(nL + nR)</strong>, one pass.</p>
<p>Key detail: <strong>use <code>&lt;=</code> not <code>&lt;</code></strong>. When L[i] == R[j], prefer L — preserves stability (left-side relative order).</p>

@@task:zh
实现 <code>void merge(int L[], int nL, int R[], int nR, int out[])</code>。在主函数里：
<pre><code>L = {1, 4, 7}      nL = 3
R = {2, 3, 8, 9}   nR = 4
out 长度 = 7</code></pre>
合并后用空格打印 out：
<pre><code>1 2 3 4 7 8 9</code></pre>

@@task:en
Implement <code>void merge(int L[], int nL, int R[], int nR, int out[])</code>. In main:
<pre><code>L = {1, 4, 7}      nL = 3
R = {2, 3, 8, 9}   nR = 4
out length = 7</code></pre>
After merging, print out space-separated:
<pre><code>1 2 3 4 7 8 9</code></pre>

@@hint:zh
照模板抄即可。注意第一个 while 同时检查 i 和 j 都没越界；后两个 while 把任一剩余的搬过去。

@@hint:en
Copy the template as-is. The first while requires both i and j in range; the next two while loops copy whichever side has leftovers.

@@starter
#include <stdio.h>

void merge(int L[], int nL, int R[], int nR, int out[]) {
    // TODO: 双指针合并
}

int main(void) {
    int L[] = {1, 4, 7};
    int R[] = {2, 3, 8, 9};
    int out[7];
    merge(L, 3, R, 4, out);
    for (int i = 0; i < 7; i++)
        printf("%d%s", out[i], i == 6 ? "\\n" : " ");
    return 0;
}

@@answer
#include <stdio.h>

void merge(int L[], int nL, int R[], int nR, int out[]) {
    int i = 0, j = 0, k = 0;
    while (i < nL && j < nR) {
        if (L[i] <= R[j]) out[k++] = L[i++];
        else              out[k++] = R[j++];
    }
    while (i < nL) out[k++] = L[i++];
    while (j < nR) out[k++] = R[j++];
}

int main(void) {
    int L[] = {1, 4, 7};
    int R[] = {2, 3, 8, 9};
    int out[7];
    merge(L, 3, R, 4, out);
    for (int i = 0; i < 7; i++)
        printf("%d%s", out[i], i == 6 ? "\\n" : " ");
    return 0;
}

@@expectedOutput
1 2 3 4 7 8 9
`);
