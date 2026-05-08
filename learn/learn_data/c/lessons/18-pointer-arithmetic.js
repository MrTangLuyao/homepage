LEARN.lesson('c', 18, `
@@chapterRef c-pointer-arithmetic

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead">指针可以加减整数，得到一个新指针。但 <code>p + 1</code> <strong>不是</strong>地址加 1 字节 —— 是加 <strong>sizeof(*p)</strong> 字节。这让指针运算"指向下一个元素"，特别适合数组遍历。</p>
<pre><code>int arr[5] = {10, 20, 30, 40, 50};
int *p = arr;          // p 指向 arr[0]
printf("%d\\n", *p);    // 10
p++;                   // 实际地址前进 4 字节（一个 int）
printf("%d\\n", *p);    // 20
p += 2;                // 再前进 8 字节
printf("%d\\n", *p);    // 40</code></pre>
<h3 style="margin:12px 0 6px;font-size:14px;">两个指针相减 = 元素差</h3>
<pre><code>int *q = &arr[3];
int *r = &arr[0];
printf("%ld\\n", q - r);   // 3，不是字节差</code></pre>
<p>这个机制让你能写"在数组里搜索"的简洁代码：找到目标后用指针差算出下标。</p>
<h3 style="margin:12px 0 6px;font-size:14px;">允许 vs 未定义</h3>
<ul>
<li>允许：指向数组任意元素 <strong>或末尾后一个位置</strong>（<code>arr + n</code> 合法但不能解引用）</li>
<li>UB：指向数组之外，比如 <code>arr - 1</code> 或 <code>arr + n + 1</code></li>
<li>UB：跨数组比较两个指针（<code>p1 &lt; p2</code> 仅当它们指向同一数组才有意义）</li>
</ul>

@@intro:en
<p class="lead">Pointers support arithmetic with integers, yielding new pointers. But <code>p + 1</code> is <strong>not</strong> "address plus 1 byte" — it's plus <strong>sizeof(*p)</strong> bytes. This makes pointer math "advance to next element", perfect for array iteration.</p>
<pre><code>int arr[5] = {10, 20, 30, 40, 50};
int *p = arr;          // p points at arr[0]
printf("%d\\n", *p);    // 10
p++;                   // actually advances by 4 bytes (one int)
printf("%d\\n", *p);    // 20
p += 2;                // advance another 8 bytes
printf("%d\\n", *p);    // 40</code></pre>
<h3 style="margin:12px 0 6px;font-size:14px;">Subtracting two pointers = element distance</h3>
<pre><code>int *q = &arr[3];
int *r = &arr[0];
printf("%ld\\n", q - r);   // 3, not the byte difference</code></pre>
<h3 style="margin:12px 0 6px;font-size:14px;">Allowed vs UB</h3>
<ul>
<li>Allowed: point to any element <strong>or one past the end</strong> (<code>arr + n</code> is legal but don't dereference)</li>
<li>UB: pointing outside the array, e.g. <code>arr - 1</code> or <code>arr + n + 1</code></li>
<li>UB: comparing pointers from different arrays (<code>p1 &lt; p2</code> only meaningful within one array)</li>
</ul>

@@task:zh
给定 <code>int arr[5] = {10, 20, 30, 40, 50};</code>，<strong>用指针 p 而非下标</strong>遍历数组打印每个元素，每行一个：
<pre><code>10
20
30
40
50</code></pre>
<p style="margin-top:8px;color:var(--muted);font-size:12px;">禁止使用 <code>arr[i]</code> 语法 —— 必须用 <code>*p</code> 和 <code>p++</code>。</p>

@@task:en
Given <code>int arr[5] = {10, 20, 30, 40, 50};</code>, traverse the array <strong>using a pointer p instead of indexing</strong>; print each element on its own line:
<pre><code>10
20
30
40
50</code></pre>
<p style="margin-top:8px;color:var(--muted);font-size:12px;">No <code>arr[i]</code> syntax — use <code>*p</code> and <code>p++</code>.</p>

@@hint:zh
<code>int *p = arr;</code> 然后循环 5 次：<code>printf("%d\\n", *p); p++;</code>。

@@hint:en
<code>int *p = arr;</code> then loop 5 times: <code>printf("%d\\n", *p); p++;</code>.

@@starter
#include <stdio.h>

int main(void) {
    int arr[5] = {10, 20, 30, 40, 50};
    int *p = arr;
    // 用 p 遍历

    return 0;
}

@@answer
#include <stdio.h>

int main(void) {
    int arr[5] = {10, 20, 30, 40, 50};
    int *p = arr;
    for (int i = 0; i < 5; i++) {
        printf("%d\\n", *p);
        p++;
    }
    return 0;
}

@@expectedOutput
10
20
30
40
50
`);
