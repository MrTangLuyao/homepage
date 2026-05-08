LEARN.lesson('c', 17, `
@@chapterRef c-pointers

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead">指针是 C 最强大也最让人头大的概念。一句话：<strong>指针是"存地址的变量"</strong>。普通变量存数值，指针变量存的是另一个变量的内存地址。</p>
<h3 style="margin:12px 0 6px;font-size:14px;">两个核心运算符</h3>
<table style="border-collapse:collapse;font-size:13px;">
<tr><td style="padding:2px 14px 2px 0;"><code>&amp;x</code></td><td>取 x 的地址 ("address-of")</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>*p</code></td><td>读 / 写 p 指向的内存 ("dereference")</td></tr>
</table>
<pre><code>int  x  = 42;
int *p  = &amp;x;       // p 存 x 的地址
printf("%d\\n", *p);  // 42  通过 p 读出 x
*p = 100;            // 通过 p 改 x
printf("%d\\n", x);   // 100</code></pre>
<h3 style="margin:12px 0 6px;font-size:14px;">声明 vs 使用 — <code>*</code> 在两个语境里含义完全不同</h3>
<ul>
<li><strong>声明</strong>：<code>int *p;</code> 中的 <code>*</code> 是<u>类型说明</u>，意思是"p 是 int 的指针"</li>
<li><strong>表达式</strong>：<code>x = *p;</code> 中的 <code>*</code> 是<u>解引用</u>，意思是"读 p 指向的值"</li>
</ul>
<p>这个双重含义是初学者最常混淆的地方。</p>
<h3 style="margin:12px 0 6px;font-size:14px;">NULL 指针</h3>
<p>没指向任何东西的指针应该显式赋值 <code>NULL</code>（值为 0 的特殊地址）。<strong>千万不能解引用 NULL</strong> —— 程序立刻崩。</p>
<pre><code>int *p = NULL;
if (p != NULL) {
    *p = 5;     // 安全检查后再用
}</code></pre>

@@intro:en
<p class="lead">Pointers are C's most powerful and most confusing concept. One sentence: <strong>a pointer is "a variable that holds an address"</strong>. Ordinary variables store values; pointer variables store the memory address of another variable.</p>
<h3 style="margin:12px 0 6px;font-size:14px;">Two core operators</h3>
<table style="border-collapse:collapse;font-size:13px;">
<tr><td style="padding:2px 14px 2px 0;"><code>&amp;x</code></td><td>address of x ("address-of")</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>*p</code></td><td>read/write the memory p points to ("dereference")</td></tr>
</table>
<pre><code>int  x  = 42;
int *p  = &amp;x;       // p stores x's address
printf("%d\\n", *p);  // 42  reads x via p
*p = 100;            // writes x via p
printf("%d\\n", x);   // 100</code></pre>
<h3 style="margin:12px 0 6px;font-size:14px;">Declaration vs use — <code>*</code> means different things</h3>
<ul>
<li><strong>Declaration</strong>: <code>int *p;</code> — the <code>*</code> is <u>type syntax</u>, meaning "p is a pointer to int"</li>
<li><strong>Expression</strong>: <code>x = *p;</code> — the <code>*</code> is <u>dereference</u>, meaning "value pointed to by p"</li>
</ul>
<p>This dual meaning is the most common source of confusion.</p>
<h3 style="margin:12px 0 6px;font-size:14px;">NULL pointers</h3>
<p>A pointer not pointing to anything should be explicitly set to <code>NULL</code>. <strong>Never dereference NULL</strong> — instant crash.</p>
<pre><code>int *p = NULL;
if (p != NULL) {
    *p = 5;     // safe after check
}</code></pre>

@@task:zh
按下面顺序操作并打印：
<ol>
<li>声明 <code>int x = 10;</code> 和指向它的指针 <code>p</code></li>
<li>打印 <code>x = 10</code>（直接读 x）</li>
<li>打印 <code>*p = 10</code>（通过 p 读）</li>
<li>用 <code>*p</code> 改 x 为 99</li>
<li>打印 <code>after *p=99: x = 99</code></li>
</ol>
<p>期望输出：</p>
<pre><code>x = 10
*p = 10
after *p=99: x = 99</code></pre>

@@task:en
Do this in order and print each step:
<ol>
<li>Declare <code>int x = 10;</code> and a pointer <code>p</code> to it</li>
<li>Print <code>x = 10</code> (read x directly)</li>
<li>Print <code>*p = 10</code> (read via p)</li>
<li>Use <code>*p</code> to change x to 99</li>
<li>Print <code>after *p=99: x = 99</code></li>
</ol>
<p>Expected output:</p>
<pre><code>x = 10
*p = 10
after *p=99: x = 99</code></pre>

@@hint:zh
<code>int *p = &amp;x;</code> 声明并初始化。后面 <code>*p = 99;</code> 通过 p 修改 x。

@@hint:en
<code>int *p = &amp;x;</code> declares + initializes. Later <code>*p = 99;</code> modifies x via p.

@@starter
#include <stdio.h>

int main(void) {
    int x = 10;
    // 声明 p，让它指向 x

    return 0;
}

@@answer
#include <stdio.h>

int main(void) {
    int  x = 10;
    int *p = &x;
    printf("x = %d\\n", x);
    printf("*p = %d\\n", *p);
    *p = 99;
    printf("after *p=99: x = %d\\n", x);
    return 0;
}

@@expectedOutput
x = 10
*p = 10
after *p=99: x = 99
`);
