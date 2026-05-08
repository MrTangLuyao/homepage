LEARN.lesson('c', 24, `
@@chapterRef c-structs

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead">L22 已经提到结构体默认<strong>值传递</strong>。在工程实践里，传结构体有两个标准做法 —— 选哪个看场景。</p>
<h3 style="margin:12px 0 6px;font-size:14px;">方式 A：值传递（小结构、不需要修改）</h3>
<pre><code>struct Point { int x, y; };

int distance_squared(struct Point a, struct Point b) {
    int dx = a.x - b.x;
    int dy = a.y - b.y;
    return dx*dx + dy*dy;
}</code></pre>
<p>简单直观。但每次调用都会复制整个结构体 —— 8 字节的 Point 还好，500 字节的 struct 就明显慢了。</p>
<h3 style="margin:12px 0 6px;font-size:14px;">方式 B：指针传递（高效 + 可修改）</h3>
<pre><code>void translate(struct Point *p, int dx, int dy) {
    p-&gt;x += dx;
    p-&gt;y += dy;
}

struct Point pt = {3, 4};
translate(&amp;pt, 10, 20);
// pt 现在是 {13, 24}</code></pre>
<p>只传一个指针（4-8 字节），无论结构体多大都一样快。<strong>而且能改原对象</strong>，省去"返回新对象"的开销。</p>
<h3 style="margin:12px 0 6px;font-size:14px;">"只读" 用 const 指针</h3>
<p>当你想要"指针的高效但保证不改"，用 <code>const struct X *p</code>：</p>
<pre><code>void print_point(const struct Point *p) {
    // 编译器禁止 p->x = ... 这种写法
    printf("(%d, %d)\\n", p-&gt;x, p-&gt;y);
}</code></pre>
<p>这是 C 大型项目的常见风格 —— 文档化你的意图（"我只读不改"）的同时让编译器替你检查。</p>

@@intro:en
<p class="lead">L22 mentioned structs are pass-by-value by default. In practice there are two standard ways to pass them — pick based on context.</p>
<h3 style="margin:12px 0 6px;font-size:14px;">Form A: by value (small struct, no modification needed)</h3>
<pre><code>struct Point { int x, y; };

int distance_squared(struct Point a, struct Point b) {
    int dx = a.x - b.x;
    int dy = a.y - b.y;
    return dx*dx + dy*dy;
}</code></pre>
<p>Simple. But each call copies the whole struct — fine for an 8-byte Point, noticeable for a 500-byte struct.</p>
<h3 style="margin:12px 0 6px;font-size:14px;">Form B: by pointer (efficient + modifiable)</h3>
<pre><code>void translate(struct Point *p, int dx, int dy) {
    p-&gt;x += dx;
    p-&gt;y += dy;
}

struct Point pt = {3, 4};
translate(&amp;pt, 10, 20);
// pt is now {13, 24}</code></pre>
<p>Only a pointer (4-8 bytes) is passed, regardless of struct size. <strong>And it can mutate the original</strong>, avoiding "return a new copy" overhead.</p>
<h3 style="margin:12px 0 6px;font-size:14px;">Read-only via const pointer</h3>
<p>When you want the efficiency of a pointer but a guarantee against mutation, use <code>const struct X *p</code>:</p>
<pre><code>void print_point(const struct Point *p) {
    // compiler forbids p->x = ...
    printf("(%d, %d)\\n", p-&gt;x, p-&gt;y);
}</code></pre>

@@task:zh
定义 <code>struct Point {int x, y;}</code> 和函数 <code>void translate(struct Point *p, int dx, int dy)</code>。在 main 里：
<ol>
<li>创建 <code>pt = {3, 4}</code>，打印 <code>before: (3, 4)</code></li>
<li>调用 <code>translate(&amp;pt, 10, 20)</code></li>
<li>打印 <code>after: (13, 24)</code></li>
</ol>

@@task:en
Define <code>struct Point {int x, y;}</code> and a function <code>void translate(struct Point *p, int dx, int dy)</code>. In main:
<ol>
<li>Create <code>pt = {3, 4}</code>, print <code>before: (3, 4)</code></li>
<li>Call <code>translate(&amp;pt, 10, 20)</code></li>
<li>Print <code>after: (13, 24)</code></li>
</ol>

@@hint:zh
函数体：<code>p-&gt;x += dx; p-&gt;y += dy;</code> —— 通过指针修改的就是调用者的 pt。

@@hint:en
Function body: <code>p-&gt;x += dx; p-&gt;y += dy;</code> — pointer-mod modifies caller's pt directly.

@@starter
#include <stdio.h>

struct Point { int x, y; };

void translate(struct Point *p, int dx, int dy) {
    // ...
}

int main(void) {
    struct Point pt = {3, 4};
    printf("before: (%d, %d)\\n", pt.x, pt.y);
    translate(&pt, 10, 20);
    printf("after: (%d, %d)\\n", pt.x, pt.y);
    return 0;
}

@@answer
#include <stdio.h>

struct Point { int x, y; };

void translate(struct Point *p, int dx, int dy) {
    p->x += dx;
    p->y += dy;
}

int main(void) {
    struct Point pt = {3, 4};
    printf("before: (%d, %d)\\n", pt.x, pt.y);
    translate(&pt, 10, 20);
    printf("after: (%d, %d)\\n", pt.x, pt.y);
    return 0;
}

@@expectedOutput
before: (3, 4)
after: (13, 24)
`);
