LEARN.lesson('c', 12, `
@@chapterRef c-functions

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead">这是新手最容易栽的坑。<strong>C 的函数参数是<u>值传递</u></strong>—— 调用时实参的值被<strong>拷贝</strong>到形参。函数里改形参，调用者的那个变量原封不动。</p>
<pre><code>void try_change(int x) {
    x = 999;       // 改的是函数内部的副本
}

int main(void) {
    int a = 10;
    try_change(a);
    printf("%d\\n", a);   // 10，不是 999
}</code></pre>
<p>很多别的语言（Java 对象、Python 列表）会让你以为"传进去就能改"。<strong>C 不是</strong>。永远是值传递，没有例外。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">那怎么真的改？传地址（指针）</h3>
<p>把变量的<strong>地址</strong>传进去，函数通过指针来改地址指向的内存：</p>
<pre><code>void really_change(int *p) {
    *p = 999;         // 改 p 指向的那个内存
}

int main(void) {
    int a = 10;
    really_change(&a);     // 传 a 的地址
    printf("%d\\n", a);    // 999
}</code></pre>
<p>这是为什么 <code>scanf("%d", &amp;x)</code> 必须用 <code>&amp;</code> —— scanf 要修改你的变量，所以你得给它地址，不是值（光给值它没法改）。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">数组和字符串的"看似例外"</h3>
<p>数组传函数时，传的是<strong>数组首元素的地址</strong>（自动 decay 成指针），所以函数能改数组内容 —— 但本质还是值传递（传的是地址值的副本）。下一节继续讲。</p>

@@intro:en
<p class="lead">This is one of the easiest traps for newcomers. <strong>C function arguments are passed by <u>value</u></strong> — at call time, the actual argument is <strong>copied</strong> into the formal parameter. Modifying the parameter inside the function leaves the caller's variable untouched.</p>
<pre><code>void try_change(int x) {
    x = 999;       // modifies the local copy
}

int main(void) {
    int a = 10;
    try_change(a);
    printf("%d\\n", a);   // 10, not 999
}</code></pre>
<p>Many other languages (Java objects, Python lists) make you think "passing it in means I can modify it". <strong>C doesn't</strong>. Always by value, no exceptions.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">So how do you really modify it? Pass the address (a pointer)</h3>
<p>Pass the variable's <strong>address</strong>, and the function uses the pointer to modify the memory it points to:</p>
<pre><code>void really_change(int *p) {
    *p = 999;         // modify the memory p points to
}

int main(void) {
    int a = 10;
    really_change(&a);     // pass a's address
    printf("%d\\n", a);    // 999
}</code></pre>
<p>This is why <code>scanf("%d", &amp;x)</code> needs the <code>&amp;</code> — scanf wants to modify your variable, so you must give it an address; just the value wouldn't let it modify anything.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Arrays and strings — the apparent exception</h3>
<p>When passing an array to a function, what's actually passed is the <strong>address of the first element</strong> (automatic decay to pointer). So the function can modify the array contents — but it's still pass-by-value at heart (the address itself is copied). More on this next lesson.</p>

@@task:zh
写两个函数：
<ol>
<li><code>void try_swap(int a, int b)</code> —— 试图交换 a 和 b（用临时变量），然后函数内部 <code>printf("inside: %d %d\\n", a, b);</code></li>
<li><code>void real_swap(int *p, int *q)</code> —— 通过指针真正交换</li>
</ol>
<p>main 里：</p>
<pre><code>int x = 1, y = 2;
try_swap(x, y);
printf("after try_swap: %d %d\\n", x, y);
real_swap(&x, &y);
printf("after real_swap: %d %d\\n", x, y);</code></pre>
<p>期望输出：</p>
<pre><code>inside: 2 1
after try_swap: 1 2
after real_swap: 2 1</code></pre>

@@task:en
Write two functions:
<ol>
<li><code>void try_swap(int a, int b)</code> — attempts to swap a and b (with a temp), then prints <code>inside: %d %d\\n</code></li>
<li><code>void real_swap(int *p, int *q)</code> — actually swaps via pointers</li>
</ol>
<p>In main:</p>
<pre><code>int x = 1, y = 2;
try_swap(x, y);
printf("after try_swap: %d %d\\n", x, y);
real_swap(&x, &y);
printf("after real_swap: %d %d\\n", x, y);</code></pre>
<p>Expected output:</p>
<pre><code>inside: 2 1
after try_swap: 1 2
after real_swap: 2 1</code></pre>

@@hint:zh
<code>real_swap</code> 里：<code>int t = *p; *p = *q; *q = t;</code> —— 通过指针读 / 写，实际改的是 main 里 x 和 y 的内存。

@@hint:en
In <code>real_swap</code>: <code>int t = *p; *p = *q; *q = t;</code> — read/write through the pointers, actually modifying x and y in main.

@@starter
#include <stdio.h>

void try_swap(int a, int b) {
    // 试图交换并打印
}

void real_swap(int *p, int *q) {
    // 通过指针真交换
}

int main(void) {
    int x = 1, y = 2;
    try_swap(x, y);
    printf("after try_swap: %d %d\\n", x, y);
    real_swap(&x, &y);
    printf("after real_swap: %d %d\\n", x, y);
    return 0;
}

@@answer
#include <stdio.h>

void try_swap(int a, int b) {
    int t = a; a = b; b = t;
    printf("inside: %d %d\\n", a, b);
}

void real_swap(int *p, int *q) {
    int t = *p; *p = *q; *q = t;
}

int main(void) {
    int x = 1, y = 2;
    try_swap(x, y);
    printf("after try_swap: %d %d\\n", x, y);
    real_swap(&x, &y);
    printf("after real_swap: %d %d\\n", x, y);
    return 0;
}

@@expectedOutput
inside: 2 1
after try_swap: 1 2
after real_swap: 2 1
`);
