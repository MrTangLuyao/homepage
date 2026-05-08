LEARN.lesson('c', 13, `
@@chapterRef c-scope-rules

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead">"作用域"指变量名在哪些代码区域可见。C 有三种主要作用域：</p>
<h3 style="margin:12px 0 6px;font-size:14px;">局部变量（block scope）</h3>
<p>在 <code>{ }</code> 内声明，只在这对花括号内有效。函数参数也是局部的。</p>
<pre><code>void f(void) {
    int x = 10;       // 只在 f 内可见
}
// 这里 x 不存在</code></pre>
<h3 style="margin:12px 0 6px;font-size:14px;">全局变量（file scope）</h3>
<p>定义在所有函数<strong>之外</strong>，整个文件可见。慎用 —— 任何函数都能改它，调试时根本不知道谁动的。</p>
<pre><code>int counter = 0;     // 全局

void inc(void) { counter++; }
int main(void) { inc(); printf("%d\\n", counter); }</code></pre>
<h3 style="margin:12px 0 6px;font-size:14px;">static 局部变量 — 函数调用之间保留</h3>
<p>普通局部变量函数返回时就消失。<code>static</code> 局部变量<strong>在程序整个生命周期都活着</strong>，只是名字只在该函数内可见。常用于"计数器"模式：</p>
<pre><code>void counter(void) {
    static int n = 0;   // 只初始化一次
    n++;
    printf("called %d times\\n", n);
}
// 调三次输出: 1, 2, 3</code></pre>
<p><strong>对比</strong>：如果不写 static，每次调用 n 都重新变成 0，永远输出 1。</p>

@@intro:en
<p class="lead">"Scope" is which regions of code can see a name. C has three main scopes:</p>
<h3 style="margin:12px 0 6px;font-size:14px;">Local (block scope)</h3>
<p>Declared inside <code>{ }</code>, visible only within those braces. Function parameters are local too.</p>
<pre><code>void f(void) {
    int x = 10;       // visible only inside f
}
// x doesn't exist here</code></pre>
<h3 style="margin:12px 0 6px;font-size:14px;">Global (file scope)</h3>
<p>Defined <strong>outside</strong> all functions, visible throughout the file. Use sparingly — any function can mutate it, making debugging hard.</p>
<h3 style="margin:12px 0 6px;font-size:14px;">static local — survives between calls</h3>
<p>Normal locals die when the function returns. A <code>static</code> local <strong>lives for the program's whole lifetime</strong>; the name is just only visible inside the function. Classic counter pattern:</p>
<pre><code>void counter(void) {
    static int n = 0;   // initialized only once
    n++;
    printf("called %d times\\n", n);
}
// three calls print: 1, 2, 3</code></pre>
<p><strong>Without <code>static</code></strong>, n resets to 0 each call, always printing 1.</p>

@@task:zh
写函数 <code>void counter(void)</code> 用 static 局部变量记录被调用次数，每次打印 <code>call N: ...</code>。在 main 里调用 4 次，期望输出：
<pre><code>call 1
call 2
call 3
call 4</code></pre>

@@task:en
Write <code>void counter(void)</code> using a static local to track call count, printing <code>call N</code> each time. Call it 4 times from main:
<pre><code>call 1
call 2
call 3
call 4</code></pre>

@@hint:zh
<code>static int n = 0;</code> 在函数内 — 只在第一次进入时初始化为 0，后续调用 n 保留上次的值。

@@hint:en
<code>static int n = 0;</code> inside the function — initialized to 0 only on the first call; later calls preserve the previous value.

@@starter
#include <stdio.h>

void counter(void) {
    // static int ...
}

int main(void) {
    counter();
    counter();
    counter();
    counter();
    return 0;
}

@@answer
#include <stdio.h>

void counter(void) {
    static int n = 0;
    n++;
    printf("call %d\\n", n);
}

int main(void) {
    counter();
    counter();
    counter();
    counter();
    return 0;
}

@@expectedOutput
call 1
call 2
call 3
call 4
`);
