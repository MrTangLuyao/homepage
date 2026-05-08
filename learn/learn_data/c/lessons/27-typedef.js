LEARN.lesson('c', 27, `
@@chapterRef c-typedef

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead"><code>typedef</code> 给一个已存在的类型起<strong>新名字</strong>。不创造新类型，只创造别名 —— 但能极大改善可读性，特别是处理复杂类型（指针、结构体、函数指针）时。</p>
<pre><code>typedef unsigned int uint;
typedef char *string;

uint   age = 18;       // 等价于 unsigned int age = 18;
string name = "Bob";   // 等价于 char *name = "Bob";</code></pre>
<p>语法记忆：<strong>把变量声明语句前面加 <code>typedef</code>，"变量名"就变成"类型别名"</strong>。例如 <code>int *IntPtr;</code> 是声明指针变量；加 typedef 变成 <code>typedef int *IntPtr;</code> 就是定义"IntPtr 是 int 指针类型"。</p>
<h3 style="margin:12px 0 6px;font-size:14px;">常见用法 1：缩短结构体类型</h3>
<pre><code>typedef struct {
    int x, y;
} Point;             // 注意：在 ; 前才是别名

Point p = {3, 4};    // 不用写 struct Point</code></pre>
<p>这是 C 工程里几乎所有 struct 的标准写法 —— 省去每次写 <code>struct</code> 关键字的麻烦。</p>
<h3 style="margin:12px 0 6px;font-size:14px;">typedef vs #define 的差别</h3>
<table style="border-collapse:collapse;font-size:13px;">
<tr><th style="text-align:left;padding:4px 14px 4px 0;"></th><th style="text-align:left;padding:4px 14px 4px 0;">#define</th><th style="text-align:left;padding:4px;">typedef</th></tr>
<tr><td style="padding:2px 14px 2px 0;">阶段</td><td>预处理（文本替换）</td><td>编译（参与类型系统）</td></tr>
<tr><td style="padding:2px 14px 2px 0;">作用域</td><td>从 #define 那行起到文件末</td><td>遵守 C 作用域规则</td></tr>
<tr><td style="padding:2px 14px 2px 0;">复杂类型</td><td>容易出 bug</td><td>正确处理</td></tr>
</table>
<p>例子：<code>#define INT_PTR int*</code>，然后 <code>INT_PTR a, b;</code> 展开为 <code>int* a, b;</code> —— a 是指针，b 是普通 int！而 <code>typedef int *IntPtr;</code> 后 <code>IntPtr a, b;</code> 两个都是指针。</p>

@@intro:en
<p class="lead"><code>typedef</code> gives a <strong>new name</strong> to an existing type. It doesn't create a new type, just an alias — but greatly improves readability, especially for complex types (pointers, structs, function pointers).</p>
<pre><code>typedef unsigned int uint;
typedef char *string;

uint   age = 18;       // same as unsigned int age = 18;
string name = "Bob";   // same as char *name = "Bob";</code></pre>
<p>Mnemonic: <strong>take a variable declaration, prefix it with <code>typedef</code>, and the "variable name" becomes a type alias</strong>. <code>int *IntPtr;</code> declares a pointer; <code>typedef int *IntPtr;</code> makes IntPtr an alias for "pointer to int".</p>
<h3 style="margin:12px 0 6px;font-size:14px;">Most common use: shortening struct types</h3>
<pre><code>typedef struct {
    int x, y;
} Point;             // alias defined before the ;

Point p = {3, 4};    // no need to write struct Point</code></pre>
<h3 style="margin:12px 0 6px;font-size:14px;">typedef vs #define</h3>
<p>Critical difference for complex types: <code>#define INT_PTR int*</code>, then <code>INT_PTR a, b;</code> expands to <code>int* a, b;</code> — a is a pointer, b is a plain int. With <code>typedef int *IntPtr;</code>, <code>IntPtr a, b;</code> makes both pointers.</p>

@@task:zh
用 typedef：
<ol>
<li>定义 <code>uint</code> 为 <code>unsigned int</code> 的别名</li>
<li>定义 <code>Point</code> 为 <code>struct { int x, y; }</code> 的别名</li>
</ol>
<p>用这两个别名声明变量并打印：</p>
<pre><code>year: 2026
point: (5, 7)</code></pre>

@@task:en
With typedef:
<ol>
<li>alias <code>uint</code> for <code>unsigned int</code></li>
<li>alias <code>Point</code> for <code>struct { int x, y; }</code></li>
</ol>
<p>Use both to declare variables and print:</p>
<pre><code>year: 2026
point: (5, 7)</code></pre>

@@hint:zh
<code>typedef unsigned int uint;</code> 和 <code>typedef struct { int x, y; } Point;</code>。然后 <code>uint year = 2026; Point p = {5, 7};</code>。

@@hint:en
<code>typedef unsigned int uint;</code> and <code>typedef struct { int x, y; } Point;</code>. Then <code>uint year = 2026; Point p = {5, 7};</code>.

@@starter
#include <stdio.h>

// 在这里定义 typedef

int main(void) {
    // 用别名声明变量、打印

    return 0;
}

@@answer
#include <stdio.h>

typedef unsigned int uint;
typedef struct { int x, y; } Point;

int main(void) {
    uint  year = 2026;
    Point p    = {5, 7};
    printf("year: %u\\n", year);
    printf("point: (%d, %d)\\n", p.x, p.y);
    return 0;
}

@@expectedOutput
year: 2026
point: (5, 7)
`);
