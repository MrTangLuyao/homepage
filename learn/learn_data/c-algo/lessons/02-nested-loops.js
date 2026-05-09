LEARN.lesson('c-algo', 2, `
@@chapterRef c-algo-tute-1

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead">嵌套循环是 <strong>O(n²)</strong> 复杂度的最典型形状——外层每跑一次，内层完整跑 n 次，总计 n × n。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">看这个模式</h3>
<pre><code>for (int i = 0; i &lt; n; i++) {       // 外层 n 次
    for (int j = 0; j &lt; n; j++) {   // 内层每次 n 次
        // ... 1 次操作
    }
}
// 总操作次数 = n × n = n²</code></pre>
<p>n=10 → 100 步；n=100 → 10000 步；n=1000 → 一百万步；n=10⁵ → 一百亿步（基本卡住）。<strong>嵌套循环对大数据是危险的</strong>。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">不是所有嵌套都是 n²</h3>
<p>很多嵌套循环内层<strong>从 i+1 开始</strong>，遍历所有"对子"：</p>
<pre><code>for (int i = 0; i &lt; n; i++) {
    for (int j = i + 1; j &lt; n; j++) {
        // 对每对 (i, j) 做点事
    }
}
// 总次数 = (n-1) + (n-2) + ... + 1 = n(n-1)/2 ≈ n²/2</code></pre>
<p>大 O 丢掉常数 1/2 → 还是 <strong>O(n²)</strong>。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">逆序对（Inversion）</h3>
<p>"逆序对"指数组里位置在前但值更大的两个元素。比如 <code>{3, 1, 2}</code>：</p>
<ul>
  <li>(3, 1)：3 在前但更大 ✓ 是逆序对</li>
  <li>(3, 2)：3 在前但更大 ✓ 是逆序对</li>
  <li>(1, 2)：1 在前更小 ✗ 不是</li>
</ul>
<p>共 <strong>2</strong> 对。逆序对越多，数组越"乱"。</p>

@@intro:en
<p class="lead">Nested loops are the canonical shape of <strong>O(n²)</strong>: outer runs n times, inner runs n times for each outer, total n × n.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">The pattern</h3>
<pre><code>for (int i = 0; i &lt; n; i++) {       // outer: n times
    for (int j = 0; j &lt; n; j++) {   // inner: n times each
        // ... 1 op
    }
}
// total = n × n = n²</code></pre>
<p>n=10 → 100 ops; n=100 → 10k; n=1000 → 1M; n=10⁵ → 10B (basically stuck). <strong>Nested loops are dangerous on big data</strong>.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Not every nested loop is n²</h3>
<p>Many nested loops have inner starting at <code>i+1</code> to enumerate pairs:</p>
<pre><code>for (int i = 0; i &lt; n; i++) {
    for (int j = i + 1; j &lt; n; j++) {
        // do something with each pair (i, j)
    }
}
// total = (n-1) + (n-2) + ... + 1 = n(n-1)/2 ≈ n²/2</code></pre>
<p>Big O drops the constant 1/2 → still <strong>O(n²)</strong>.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Inversions</h3>
<p>An "inversion" is a pair where an earlier element is larger. For <code>{3, 1, 2}</code>:</p>
<ul>
  <li>(3, 1): 3 first, larger ✓ inversion</li>
  <li>(3, 2): 3 first, larger ✓ inversion</li>
  <li>(1, 2): 1 first, smaller ✗ not</li>
</ul>
<p>Total: <strong>2</strong>. More inversions = more disorder.</p>

@@task:zh
实现 <code>int count_inversions(int arr[], int n)</code>：用嵌套循环数所有逆序对。然后对几个测试数组打印结果：
<pre><code>{1, 2, 3, 4, 5}     → 0   （已排好）
{5, 4, 3, 2, 1}     → 10  （完全逆序，最坏）
{3, 1, 2}           → 2
{2, 4, 1, 3, 5}     → 3</code></pre>
按下面格式输出：
<pre><code>sorted: 0
reversed: 10
{3,1,2}: 2
{2,4,1,3,5}: 3</code></pre>

@@task:en
Implement <code>int count_inversions(int arr[], int n)</code>: count all inversions with nested loops. Then test on these arrays:
<pre><code>{1, 2, 3, 4, 5}     → 0   (sorted)
{5, 4, 3, 2, 1}     → 10  (reversed, worst)
{3, 1, 2}           → 2
{2, 4, 1, 3, 5}     → 3</code></pre>
Output format:
<pre><code>sorted: 0
reversed: 10
{3,1,2}: 2
{2,4,1,3,5}: 3</code></pre>

@@hint:zh
外层 i 从 0 到 n-1，内层 j 从 i+1 到 n-1，<code>arr[i] &gt; arr[j]</code> 就 count++。
完全逆序的 5 元素数组 = 5×4/2 = 10 对。

@@hint:en
Outer i from 0 to n-1, inner j from i+1 to n-1, increment count when <code>arr[i] &gt; arr[j]</code>. A reversed 5-element array has 5×4/2 = 10 pairs.

@@starter
#include <stdio.h>

int count_inversions(int arr[], int n) {
    // TODO: 嵌套循环数对子
    return 0;
}

int main(void) {
    int a1[] = {1, 2, 3, 4, 5};
    int a2[] = {5, 4, 3, 2, 1};
    int a3[] = {3, 1, 2};
    int a4[] = {2, 4, 1, 3, 5};

    printf("sorted: %d\\n",     count_inversions(a1, 5));
    printf("reversed: %d\\n",   count_inversions(a2, 5));
    printf("{3,1,2}: %d\\n",    count_inversions(a3, 3));
    printf("{2,4,1,3,5}: %d\\n",count_inversions(a4, 5));
    return 0;
}

@@answer
#include <stdio.h>

int count_inversions(int arr[], int n) {
    int count = 0;
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (arr[i] > arr[j]) count++;
        }
    }
    return count;
}

int main(void) {
    int a1[] = {1, 2, 3, 4, 5};
    int a2[] = {5, 4, 3, 2, 1};
    int a3[] = {3, 1, 2};
    int a4[] = {2, 4, 1, 3, 5};

    printf("sorted: %d\\n",     count_inversions(a1, 5));
    printf("reversed: %d\\n",   count_inversions(a2, 5));
    printf("{3,1,2}: %d\\n",    count_inversions(a3, 3));
    printf("{2,4,1,3,5}: %d\\n",count_inversions(a4, 5));
    return 0;
}

@@expectedOutput
sorted: 0
reversed: 10
{3,1,2}: 2
{2,4,1,3,5}: 3
`);
