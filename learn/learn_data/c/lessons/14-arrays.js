LEARN.lesson('c', 14, `
@@chapterRef c-arrays

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead">数组 = 一段<strong>连续内存</strong>里存同一种类型的多个值。声明时必须指定类型和大小，大小一旦定下就不能变。</p>
<pre><code>int arr[5];                       // 5 个 int，未初始化（含垃圾值）
int nums[5] = {2, 4, 6, 8, 10};   // 声明 + 初始化
int zeros[100] = {0};             // 第一个填 0，其余自动补 0
int auto_size[] = {1, 2, 3};      // 编译器自动算 size = 3</code></pre>
<p><strong>访问</strong>用方括号，<strong>下标从 0 开始</strong>：</p>
<pre><code>nums[0]   // 2
nums[4]   // 10
nums[5]   // 越界！未定义行为（UB）</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">最致命的坑：C 不检查越界</h3>
<p><code>int arr[5]</code> 的合法下标是 <strong>0..4</strong>。访问 <code>arr[5]</code> 不会立刻崩溃 —— 它会读 / 写紧挨着的内存（可能是别的变量）。这是 C 安全漏洞的最大来源（"buffer overflow"）。<strong>必须自己保证下标在范围内</strong>。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">遍历模式</h3>
<pre><code>int arr[5] = {2, 4, 6, 8, 10};
int n = sizeof(arr) / sizeof(arr[0]);   // 元素个数 = 5
for (int i = 0; i &lt; n; i++) {
    printf("%d ", arr[i]);
}</code></pre>
<p><code>sizeof(arr)/sizeof(arr[0])</code> 是<strong>本地</strong>计算数组长度的标准技巧（仅在数组本体可见的作用域有效，传给函数后就不行了 —— 见 L16）。</p>

@@intro:en
<p class="lead">An array is a contiguous chunk of memory holding multiple values of the same type. The type and size are fixed at declaration; size can't change later.</p>
<pre><code>int arr[5];                       // 5 ints, uninitialized (garbage values)
int nums[5] = {2, 4, 6, 8, 10};   // declare + initialize
int zeros[100] = {0};             // first 0, rest auto-zero
int auto_size[] = {1, 2, 3};      // compiler infers size = 3</code></pre>
<p><strong>Access</strong> with square brackets, <strong>indices from 0</strong>:</p>
<pre><code>nums[0]   // 2
nums[4]   // 10
nums[5]   // out of bounds! undefined behavior</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">The most lethal trap: C doesn't check bounds</h3>
<p>Valid indices for <code>int arr[5]</code> are <strong>0..4</strong>. <code>arr[5]</code> doesn't immediately crash — it reads/writes adjacent memory (possibly other variables). This is C's #1 source of security holes (buffer overflows). <strong>You must enforce bounds yourself</strong>.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Iteration idiom</h3>
<pre><code>int arr[5] = {2, 4, 6, 8, 10};
int n = sizeof(arr) / sizeof(arr[0]);   // element count = 5
for (int i = 0; i &lt; n; i++) {
    printf("%d ", arr[i]);
}</code></pre>
<p><code>sizeof(arr)/sizeof(arr[0])</code> is the standard trick for length computation — but <strong>only works in the scope where the array is declared</strong>; once passed to a function, it stops working (see L16).</p>

@@task:zh
给定 <code>int arr[5] = {2, 4, 6, 8, 10};</code>，遍历数组，按下面格式输出：
<pre><code>arr[0] = 2
arr[1] = 4
arr[2] = 6
arr[3] = 8
arr[4] = 10
sum = 30</code></pre>

@@task:en
Given <code>int arr[5] = {2, 4, 6, 8, 10};</code>, iterate and output:
<pre><code>arr[0] = 2
arr[1] = 4
arr[2] = 6
arr[3] = 8
arr[4] = 10
sum = 30</code></pre>

@@hint:zh
循环里同时打印元素和累加 sum。最后单独打印一行 sum。

@@hint:en
In the loop, both print the element and accumulate sum. Print the sum on a final line.

@@starter
#include <stdio.h>

int main(void) {
    int arr[5] = {2, 4, 6, 8, 10};
    int sum = 0;
    // 遍历：打印 + 累加

    return 0;
}

@@answer
#include <stdio.h>

int main(void) {
    int arr[5] = {2, 4, 6, 8, 10};
    int sum = 0;
    int n = sizeof(arr) / sizeof(arr[0]);
    for (int i = 0; i < n; i++) {
        printf("arr[%d] = %d\\n", i, arr[i]);
        sum += arr[i];
    }
    printf("sum = %d\\n", sum);
    return 0;
}

@@expectedOutput
arr[0] = 2
arr[1] = 4
arr[2] = 6
arr[3] = 8
arr[4] = 10
sum = 30
`);
