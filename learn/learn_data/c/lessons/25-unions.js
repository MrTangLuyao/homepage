LEARN.lesson('c', 25, `
@@chapterRef c-unions

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead">union（共用体）和 struct 长得很像 —— 都用 <code>.</code> 访问成员 —— 但内存布局完全不同。<strong>struct 把所有成员一字排开占独立空间；union 把所有成员塞在<u>同一块</u>内存里，互斥使用</strong>。</p>
<pre><code>union Data {
    int   i;        // 4 字节
    float f;        // 4 字节
    char  s[4];     // 4 字节
};

union Data d;
// sizeof(d) == 4，不是 12！所有成员共享同一个 4 字节</code></pre>
<p>整个 union 占用空间 = <strong>最大成员的字节数</strong>。设置一个成员后<u>不要</u>读其它成员 —— 那是未定义行为（虽然在实践里常被用来做"类型双关"，比如把 int 当 4 个 char 看 byte order）。</p>
<h3 style="margin:12px 0 6px;font-size:14px;">典型用途：tagged union</h3>
<p>当一个变量"可能是几种类型之一"时，用 union 节省空间，外加一个 enum 标记当前是哪种：</p>
<pre><code>enum Tag { INT, FLOAT, STRING };
struct Value {
    enum Tag tag;
    union {
        int   i;
        float f;
        char  s[16];
    } as;
};
// 64 字节而非 64 + 16 + 4 + 4 字节</code></pre>
<p>现代编程语言里的 sum type / variant / Result&lt;T, E&gt; 底层就是这种结构。</p>

@@intro:en
<p class="lead">A union looks like a struct — same <code>.</code> access — but the memory layout differs entirely. <strong>A struct gives each member its own slot; a union packs all members into the <u>same</u> memory, used one at a time</strong>.</p>
<pre><code>union Data {
    int   i;        // 4 bytes
    float f;        // 4 bytes
    char  s[4];     // 4 bytes
};

union Data d;
// sizeof(d) == 4, not 12! all members share one 4-byte slot</code></pre>
<p>Total size = <strong>size of the largest member</strong>. After setting one member, <u>don't</u> read another — that's UB (though in practice often abused for "type punning", e.g. inspecting an int's byte order).</p>
<h3 style="margin:12px 0 6px;font-size:14px;">Classic use: tagged union</h3>
<p>When a value "might be one of several types", a union saves space + an enum tracks which it currently is. Sum types in modern languages (Rust enum, Haskell ADT) are built on this.</p>

@@task:zh
定义 <code>union Data { int i; float f; char s[4]; };</code>。在 main 里：
<ol>
<li>打印 <code>sizeof(union Data)</code></li>
<li>设 <code>d.i = 65</code>（ASCII 'A'），打印 <code>i = 65, s[0] = A</code> —— <strong>同一块内存的两种解读</strong></li>
<li>设 <code>d.f = 3.14</code>，打印 <code>f = 3.14</code></li>
</ol>
<p>期望输出：</p>
<pre><code>size = 4
i = 65, s[0] = A
f = 3.14</code></pre>

@@task:en
Define <code>union Data { int i; float f; char s[4]; };</code>. In main:
<ol>
<li>Print <code>sizeof(union Data)</code></li>
<li>Set <code>d.i = 65</code> (ASCII 'A'), print <code>i = 65, s[0] = A</code> — same memory, two readings</li>
<li>Set <code>d.f = 3.14</code>, print <code>f = 3.14</code></li>
</ol>
<p>Expected:</p>
<pre><code>size = 4
i = 65, s[0] = A
f = 3.14</code></pre>

@@hint:zh
<code>sizeof</code> 用 <code>%zu</code> 或 cast 成 <code>(int)</code>。第二行<strong>同时</strong>读 i 和 s[0] —— 这是 union 唯一"合法的" type pun（多数编译器允许 char-array 透视）。

@@hint:en
<code>sizeof</code> via <code>%zu</code> or cast to <code>(int)</code>. Line 2 reads i and s[0] together — char-array peeking is the one type-pun most compilers tolerate.

@@starter
#include <stdio.h>

union Data {
    int   i;
    float f;
    char  s[4];
};

int main(void) {
    union Data d;
    // 三步打印

    return 0;
}

@@answer
#include <stdio.h>

union Data {
    int   i;
    float f;
    char  s[4];
};

int main(void) {
    union Data d;
    printf("size = %d\\n", (int)sizeof(union Data));
    d.i = 65;
    printf("i = %d, s[0] = %c\\n", d.i, d.s[0]);
    d.f = 3.14;
    printf("f = %.2f\\n", d.f);
    return 0;
}

@@expectedOutput
size = 4
i = 65, s[0] = A
f = 3.14
`);
