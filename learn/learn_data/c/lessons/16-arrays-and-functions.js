LEARN.lesson('c', 16, `
@@chapterRef c-passing-arrays-to-functions

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead">L12 说 C 是值传递。L14 说数组占用连续内存。把数组传函数时，C 做了一个重要决定：<strong>不复制整个数组（太贵），传首元素的地址</strong>。</p>
<pre><code>void f(int arr[], int n) {
    arr[0] = 99;     // 这一改影响调用者的数组！
}

int main(void) {
    int a[3] = {1, 2, 3};
    f(a, 3);
    printf("%d\\n", a[0]);    // 99
}</code></pre>
<p>看起来像"通过引用传递"，但本质是：<code>int arr[]</code> 这个参数<strong>实际等价于 <code>int *arr</code></strong>。函数收到的是地址的副本（一个指针变量）。</p>
<h3 style="margin:12px 0 6px;font-size:14px;">致命副作用：长度信息丢失</h3>
<p>由于函数收到的是指针，不是真正的"数组"，<code>sizeof(arr)</code> 在函数内<strong>不再返回数组总字节</strong>，而是返回<u>指针的字节数</u>（32-bit 系统是 4，64-bit 是 8）：</p>
<pre><code>void wrong(int arr[]) {
    int n = sizeof(arr) / sizeof(arr[0]);   // 错！n 是 8/4=2，不是真正的元素数
}</code></pre>
<p>这就是为什么 C 标准库里几乎所有处理数组的函数都<strong>额外要一个长度参数</strong>：<code>memcpy(dst, src, len)</code>、<code>qsort(arr, n, size, cmp)</code>。</p>

@@intro:en
<p class="lead">L12 said C uses pass-by-value. L14 said arrays are contiguous memory. When you pass an array to a function, C makes an important decision: <strong>don't copy the whole array (too expensive); pass the address of the first element instead</strong>.</p>
<pre><code>void f(int arr[], int n) {
    arr[0] = 99;     // this modifies the caller's array!
}

int main(void) {
    int a[3] = {1, 2, 3};
    f(a, 3);
    printf("%d\\n", a[0]);    // 99
}</code></pre>
<p>Looks like "pass by reference", but really: <code>int arr[]</code> as a parameter is <strong>equivalent to <code>int *arr</code></strong>. The function receives a copy of the address (a pointer variable).</p>
<h3 style="margin:12px 0 6px;font-size:14px;">Lethal side effect: length info is lost</h3>
<p>Since the function gets a pointer, not a real "array", <code>sizeof(arr)</code> inside the function <strong>no longer returns total array bytes</strong> — it returns the pointer size (4 on 32-bit, 8 on 64-bit):</p>
<pre><code>void wrong(int arr[]) {
    int n = sizeof(arr) / sizeof(arr[0]);   // wrong! n = 8/4 = 2
}</code></pre>
<p>This is why nearly every standard library function that processes arrays takes a <strong>separate length parameter</strong>: <code>memcpy(dst, src, len)</code>, <code>qsort(arr, n, size, cmp)</code>.</p>

@@task:zh
写两个函数：
<ol>
<li><code>int sum_array(int arr[], int n)</code> 返回数组前 n 个元素的和</li>
<li><code>void double_all(int arr[], int n)</code> 把每个元素乘以 2（注意：这会改原数组！）</li>
</ol>
<p>main 里：</p>
<pre><code>int a[5] = {1, 2, 3, 4, 5};
printf("sum = %d\\n", sum_array(a, 5));
double_all(a, 5);
printf("after doubling: ");
for (int i = 0; i < 5; i++) printf("%d ", a[i]);   // 注意：这里 trailing space 不重要，对比时用的是下面的格式
printf("\\n");</code></pre>
<p>期望输出（注意末尾"after doubling:"那行各项之间一个空格、行末没多余空格）：</p>
<pre><code>sum = 15
after doubling: 2 4 6 8 10</code></pre>

@@task:en
Write two functions:
<ol>
<li><code>int sum_array(int arr[], int n)</code> returns the sum of the first n elements</li>
<li><code>void double_all(int arr[], int n)</code> doubles each element in place (this modifies the original array!)</li>
</ol>
<p>In main, after <code>int a[5] = {1, 2, 3, 4, 5};</code>, print:</p>
<pre><code>sum = 15
after doubling: 2 4 6 8 10</code></pre>

@@hint:zh
打印数组那行，用"项前加空格"模式避免行末多余空格：先 <code>printf("after doubling:");</code> 然后循环里 <code>printf(" %d", arr[i]);</code>。

@@hint:en
For the array print, use the "space before item" idiom to avoid trailing spaces: print <code>after doubling:</code> first, then in the loop <code>printf(" %d", arr[i]);</code>.

@@starter
#include <stdio.h>

int sum_array(int arr[], int n) {
    // ...
}

void double_all(int arr[], int n) {
    // ...
}

int main(void) {
    int a[5] = {1, 2, 3, 4, 5};
    printf("sum = %d\\n", sum_array(a, 5));
    double_all(a, 5);
    printf("after doubling:");
    for (int i = 0; i < 5; i++) printf(" %d", a[i]);
    printf("\\n");
    return 0;
}

@@answer
#include <stdio.h>

int sum_array(int arr[], int n) {
    int s = 0;
    for (int i = 0; i < n; i++) s += arr[i];
    return s;
}

void double_all(int arr[], int n) {
    for (int i = 0; i < n; i++) arr[i] *= 2;
}

int main(void) {
    int a[5] = {1, 2, 3, 4, 5};
    printf("sum = %d\\n", sum_array(a, 5));
    double_all(a, 5);
    printf("after doubling:");
    for (int i = 0; i < 5; i++) printf(" %d", a[i]);
    printf("\\n");
    return 0;
}

@@expectedOutput
sum = 15
after doubling: 2 4 6 8 10
`);
