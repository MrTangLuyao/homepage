LEARN.lesson('c', 30, `
@@chapterRef c-memory-management

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead">前面所有数组的大小都是<strong>编译时</strong>定下来的（<code>int arr[5]</code>）。但很多场景下，"要多大"得到运行时才知道 —— 比如读用户输入决定数组长度。这时需要<strong>动态内存分配</strong>：在程序运行时向系统申请一块内存。</p>
<pre><code>#include &lt;stdlib.h&gt;     // malloc / free 在这里

int n = 100;
int *arr = malloc(n * sizeof(int));   // 申请 n 个 int 大小的空间
if (arr == NULL) {
    /* 申请失败（内存不足） */
}

// 当成普通数组用
for (int i = 0; i &lt; n; i++) arr[i] = i * i;

free(arr);   // 用完<strong>必须</strong>释放
arr = NULL;  // 防止后续误用 dangling pointer</code></pre>
<h3 style="margin:12px 0 6px;font-size:14px;">三件必须做的事</h3>
<ol>
<li><strong>检查 NULL</strong>：malloc 失败返回 NULL（虽然现代系统几乎不会失败，但严肃代码必须检查）</li>
<li><strong>每个 malloc 配对一个 free</strong>：忘了 = 内存泄漏（程序长跑会吃光内存）</li>
<li><strong>free 之后别再用</strong>：那是 dangling pointer，访问 = UB（最隐蔽的 bug 之一）</li>
</ol>
<h3 style="margin:12px 0 6px;font-size:14px;">malloc 的"族谱"</h3>
<table style="border-collapse:collapse;font-size:13px;">
<tr><td style="padding:2px 14px 2px 0;"><code>malloc(n)</code></td><td>申请 n 字节，<u>不</u>初始化（含垃圾值）</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>calloc(count, size)</code></td><td>申请 count*size 字节，<strong>自动清零</strong></td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>realloc(p, new_size)</code></td><td>调整已有内存大小（可能搬地址）</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>free(p)</code></td><td>释放</td></tr>
</table>
<p>malloc 返回 <code>void *</code>，可以隐式转换给任意类型指针 —— 在 C 里不需要写 <code>(int*)malloc(...)</code>（C++ 才需要）。但工程惯例还是会加 cast 增强可读性。</p>

@@intro:en
<p class="lead">All previous arrays had compile-time sizes (<code>int arr[5]</code>). But many situations need a runtime-determined size — e.g., reading user input to decide array length. That's where <strong>dynamic memory allocation</strong> comes in: ask the system for a block of memory at runtime.</p>
<pre><code>#include &lt;stdlib.h&gt;     // malloc / free live here

int n = 100;
int *arr = malloc(n * sizeof(int));   // request space for n ints
if (arr == NULL) {
    /* allocation failed */
}

// use it like a normal array
for (int i = 0; i &lt; n; i++) arr[i] = i * i;

free(arr);   // <strong>MUST</strong> release when done
arr = NULL;  // avoid later use-of-dangling-pointer</code></pre>
<h3 style="margin:12px 0 6px;font-size:14px;">Three rules you must follow</h3>
<ol>
<li><strong>Check for NULL</strong>: malloc returns NULL on failure (rare on modern systems but serious code must check)</li>
<li><strong>Every malloc paired with one free</strong>: forget = memory leak (long-running programs gradually consume all RAM)</li>
<li><strong>Don't use after free</strong>: dangling pointer — access is UB (one of the sneakiest bug classes)</li>
</ol>
<h3 style="margin:12px 0 6px;font-size:14px;">The malloc family</h3>
<table style="border-collapse:collapse;font-size:13px;">
<tr><td style="padding:2px 14px 2px 0;"><code>malloc(n)</code></td><td>n bytes, <u>uninitialized</u> (garbage)</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>calloc(count, size)</code></td><td>count*size bytes, <strong>zeroed automatically</strong></td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>realloc(p, new_size)</code></td><td>resize an existing allocation (may move address)</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>free(p)</code></td><td>release</td></tr>
</table>

@@task:zh
用 <code>malloc</code> 申请一个能装 <strong>5 个 int</strong> 的数组，填入平方数 <code>1, 4, 9, 16, 25</code>，按下面格式打印再 <code>free</code>：
<pre><code>arr[0] = 1
arr[1] = 4
arr[2] = 9
arr[3] = 16
arr[4] = 25
sum = 55</code></pre>

@@task:en
Use <code>malloc</code> to allocate an array of <strong>5 ints</strong>, fill with squares <code>1, 4, 9, 16, 25</code>, print then <code>free</code>:
<pre><code>arr[0] = 1
arr[1] = 4
arr[2] = 9
arr[3] = 16
arr[4] = 25
sum = 55</code></pre>

@@hint:zh
<code>int *arr = malloc(5 * sizeof(int));</code> → 检查 NULL → 循环填 <code>arr[i] = (i+1)*(i+1)</code> → 循环打印 + 累加 → printf 求和 → <code>free(arr)</code>。

@@hint:en
<code>int *arr = malloc(5 * sizeof(int));</code> → check NULL → loop <code>arr[i] = (i+1)*(i+1)</code> → loop print + accumulate → printf sum → <code>free(arr)</code>.

@@starter
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n = 5;
    int *arr = malloc(n * sizeof(int));
    if (arr == NULL) return 1;

    // 填、打印、求和、free

    return 0;
}

@@answer
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n = 5;
    int *arr = malloc(n * sizeof(int));
    if (arr == NULL) return 1;

    int sum = 0;
    for (int i = 0; i < n; i++) {
        arr[i] = (i + 1) * (i + 1);
        printf("arr[%d] = %d\\n", i, arr[i]);
        sum += arr[i];
    }
    printf("sum = %d\\n", sum);

    free(arr);
    return 0;
}

@@expectedOutput
arr[0] = 1
arr[1] = 4
arr[2] = 9
arr[3] = 16
arr[4] = 25
sum = 55
`);
