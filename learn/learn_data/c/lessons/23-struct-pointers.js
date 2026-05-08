LEARN.lesson('c', 23, `
@@chapterRef c-pointers-to-structs

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead">指向结构体的指针很常用 —— 链表、树、传大结构体给函数都要它。语法和指向 int 的指针一样，但<strong>访问成员有专用语法</strong>。</p>
<pre><code>struct Point { int x, y; };
struct Point p = {3, 4};
struct Point *ptr = &amp;p;</code></pre>
<h3 style="margin:12px 0 6px;font-size:14px;">两种等价写法</h3>
<table style="border-collapse:collapse;font-size:13px;">
<tr><td style="padding:2px 14px 2px 0;"><code>(*ptr).x</code></td><td>先解引用再 .</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>ptr-&gt;x</code></td><td><strong>箭头操作符</strong> — 指针专用，意思相同</td></tr>
</table>
<p>括号必须有：<code>*ptr.x</code> 会被解析成 <code>*(ptr.x)</code>，错。所以 C 引入了 <code>-&gt;</code> 简化写法 —— 大家都用 <code>-&gt;</code>，几乎不见 <code>(*p).x</code> 风格。</p>
<pre><code>ptr-&gt;x = 10;
ptr-&gt;y = 20;
printf("(%d, %d)\\n", ptr-&gt;x, ptr-&gt;y);   // (10, 20)</code></pre>
<h3 style="margin:12px 0 6px;font-size:14px;">什么时候用 . 什么时候用 -&gt;</h3>
<ul>
<li><code>p.x</code> —— p 是<strong>结构体本身</strong></li>
<li><code>p-&gt;x</code> —— p 是<strong>指向结构体的指针</strong></li>
</ul>
<p>这是一个非常严格的二选一 —— 选错编译器会报"member access on incompatible type"。</p>

@@intro:en
<p class="lead">Pointers to structs are everywhere — linked lists, trees, passing large structs to functions all need them. Syntax matches pointer-to-int, but member access has <strong>dedicated syntax</strong>.</p>
<pre><code>struct Point { int x, y; };
struct Point p = {3, 4};
struct Point *ptr = &amp;p;</code></pre>
<h3 style="margin:12px 0 6px;font-size:14px;">Two equivalent forms</h3>
<table style="border-collapse:collapse;font-size:13px;">
<tr><td style="padding:2px 14px 2px 0;"><code>(*ptr).x</code></td><td>dereference then .</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>ptr-&gt;x</code></td><td><strong>arrow operator</strong> — pointer-specific, same meaning</td></tr>
</table>
<p>Parens are required: <code>*ptr.x</code> is parsed as <code>*(ptr.x)</code> — wrong. C added <code>-&gt;</code> for clarity. Nearly everyone uses <code>-&gt;</code>; <code>(*p).x</code> style is rare.</p>
<pre><code>ptr-&gt;x = 10;
ptr-&gt;y = 20;
printf("(%d, %d)\\n", ptr-&gt;x, ptr-&gt;y);   // (10, 20)</code></pre>
<h3 style="margin:12px 0 6px;font-size:14px;">When to use . vs -&gt;</h3>
<ul>
<li><code>p.x</code> — p is <strong>the struct itself</strong></li>
<li><code>p-&gt;x</code> — p is a <strong>pointer to a struct</strong></li>
</ul>
<p>Strict choice — pick wrong and the compiler complains "member access on incompatible type".</p>

@@task:zh
定义 <code>struct Point {int x, y;}</code>，创建 <code>p = {1, 2}</code>，再创建指针 <code>ptr</code> 指向 p。<strong>通过 ptr</strong>把 p 的坐标改成 (10, 20)，最后打印 p 的值（注意 —— 直接读 p，不通过 ptr）：
<pre><code>before: (1, 2)
after: (10, 20)</code></pre>

@@task:en
Define <code>struct Point {int x, y;}</code>, create <code>p = {1, 2}</code>, then a pointer <code>ptr</code> to p. <strong>Via ptr</strong>, change p's coords to (10, 20), then print p directly (not via ptr):
<pre><code>before: (1, 2)
after: (10, 20)</code></pre>

@@hint:zh
<code>ptr-&gt;x = 10; ptr-&gt;y = 20;</code> —— 通过指针修改的就是 p 本人。

@@hint:en
<code>ptr-&gt;x = 10; ptr-&gt;y = 20;</code> — modifying through the pointer modifies p itself.

@@starter
#include <stdio.h>

struct Point { int x, y; };

int main(void) {
    struct Point p = {1, 2};
    struct Point *ptr = &p;
    // 打印 before、用 ptr 修改、打印 after

    return 0;
}

@@answer
#include <stdio.h>

struct Point { int x, y; };

int main(void) {
    struct Point p = {1, 2};
    struct Point *ptr = &p;
    printf("before: (%d, %d)\\n", p.x, p.y);
    ptr->x = 10;
    ptr->y = 20;
    printf("after: (%d, %d)\\n", p.x, p.y);
    return 0;
}

@@expectedOutput
before: (1, 2)
after: (10, 20)
`);
