LEARN.lesson('c', 38, `
@@chapterRef c-stdlib

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead">C 标准库给所有类型提供一个通用排序函数 <code>qsort</code>。它不知道你要排的是 int / double / 还是结构体 —— 由你提供一个<strong>比较函数</strong>告诉它两个元素谁大。</p>
<pre><code>void qsort(
    void *base,                              // 数组首址
    size_t nitems,                            // 元素个数
    size_t size,                              // 每个元素的字节大小
    int (*compare)(const void *, const void *) // 比较函数
);</code></pre>
<p>这是 C 里第一次见到<strong>函数指针</strong> —— qsort 的最后一个参数是"一个返回 int、接受两个 void* 的函数的指针"。</p>
<h3 style="margin:12px 0 6px;font-size:14px;">写一个 int 比较器</h3>
<pre><code>int cmp_int(const void *a, const void *b) {
    int x = *(const int *)a;     // void* → int* → 解引用
    int y = *(const int *)b;
    if (x &lt; y) return -1;
    if (x &gt; y) return  1;
    return 0;
}

int arr[] = {5, 2, 8, 1, 9};
qsort(arr, 5, sizeof(int), cmp_int);</code></pre>
<h3 style="margin:12px 0 6px;font-size:14px;">比较函数的协议</h3>
<table style="border-collapse:collapse;font-size:13px;">
<tr><td style="padding:2px 14px 2px 0;">返回 &lt; 0</td><td>表示 a 应排在 b 前面（a 比 b "小"）</td></tr>
<tr><td style="padding:2px 14px 2px 0;">返回 0</td><td>表示 a 和 b 相等</td></tr>
<tr><td style="padding:2px 14px 2px 0;">返回 &gt; 0</td><td>表示 a 应排在 b 后面</td></tr>
</table>
<p>简化写法 <code>return x - y</code> 在 int 范围安全时常见，但<strong>有溢出风险</strong>（例如 INT_MIN - 5）。严格的写法用三向比较，如上所示。</p>
<h3 style="margin:12px 0 6px;font-size:14px;">为什么 void* ?</h3>
<p>因为 qsort 要支持任何类型 —— C 没有泛型，<code>void *</code> 是"任意指针"的统一类型。代价是程序员要在 cmp 里手动 cast 回正确类型。这个思路在 C 里相当通用（例如 <code>bsearch</code>、链表的回调等）。</p>

@@intro:en
<p class="lead">C provides one generic sort function <code>qsort</code> for all types. It doesn't know what you're sorting — int / double / struct — so you supply a <strong>comparator</strong> telling it which of two elements is "smaller".</p>
<pre><code>void qsort(
    void *base,
    size_t nitems,
    size_t size,
    int (*compare)(const void *, const void *)
);</code></pre>
<p>This is your first encounter with a <strong>function pointer</strong> — qsort's last parameter is "pointer to a function returning int, taking two void*".</p>
<h3 style="margin:12px 0 6px;font-size:14px;">An int comparator</h3>
<pre><code>int cmp_int(const void *a, const void *b) {
    int x = *(const int *)a;
    int y = *(const int *)b;
    if (x &lt; y) return -1;
    if (x &gt; y) return  1;
    return 0;
}
qsort(arr, 5, sizeof(int), cmp_int);</code></pre>
<p><code>return x - y</code> works for small ints but <strong>can overflow</strong> on extreme values. Use three-way comparison.</p>
<h3 style="margin:12px 0 6px;font-size:14px;">Why void*?</h3>
<p>So qsort can sort any type — C has no generics, <code>void *</code> is the "any pointer" type. Cost: programmer must cast back to the right type. Same pattern shows up in <code>bsearch</code>, linked-list callbacks, etc.</p>

@@task:zh
对数组 <code>int arr[] = {5, 2, 8, 1, 9, 3};</code> 用 <code>qsort</code> 升序排序，打印结果：
<pre><code>1 2 3 5 8 9</code></pre>

@@task:en
Sort <code>int arr[] = {5, 2, 8, 1, 9, 3};</code> ascending with <code>qsort</code>, print:
<pre><code>1 2 3 5 8 9</code></pre>

@@hint:zh
写一个 cmp_int 函数。<code>qsort(arr, 6, sizeof(int), cmp_int);</code>。打印循环 <code>printf("%d ", arr[i])</code> 然后 <code>printf("\\n")</code>。最后一项后多个空格也没事 —— 但本课期望紧凑格式："1 2 3 5 8 9\\n"，循环里用 <code>i &gt; 0</code> 加前导空格。

@@hint:en
Write cmp_int function. <code>qsort(arr, 6, sizeof(int), cmp_int);</code>. Use a leading-space loop to get exactly "1 2 3 5 8 9".

@@starter
#include <stdio.h>
#include <stdlib.h>

int cmp_int(const void *a, const void *b) {
    // 返回三向比较结果
    return 0;
}

int main(void) {
    int arr[] = {5, 2, 8, 1, 9, 3};
    int n = 6;
    // qsort, 然后打印
    return 0;
}

@@answer
#include <stdio.h>
#include <stdlib.h>

int cmp_int(const void *a, const void *b) {
    int x = *(const int *)a;
    int y = *(const int *)b;
    if (x < y) return -1;
    if (x > y) return  1;
    return 0;
}

int main(void) {
    int arr[] = {5, 2, 8, 1, 9, 3};
    int n = 6;
    qsort(arr, n, sizeof(int), cmp_int);
    for (int i = 0; i < n; i++) {
        if (i > 0) printf(" ");
        printf("%d", arr[i]);
    }
    printf("\\n");
    return 0;
}

@@expectedOutput
1 2 3 5 8 9
`);
