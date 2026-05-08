LEARN.lesson('c', 1, `
@@chapterRef c-program-structure

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead">每个 C 程序都从 <code>main</code> 函数开始执行。这是雷打不动的入口点 —— 操作系统加载你的程序后，跳到 <code>main</code> 的第一条语句。</p>
<p>一个最小的 C 程序长这样：</p>
<pre><code>#include &lt;stdio.h&gt;

int main(void) {
    printf("Hello, C!\\n");
    return 0;
}</code></pre>
<p>逐行拆解：</p>
<ul>
<li><code>#include &lt;stdio.h&gt;</code> —— 把"标准输入输出"库的声明粘到这里。<code>printf</code> 就来自这个库。少了它编译器不认识 <code>printf</code>。</li>
<li><code>int main(void)</code> —— 声明 main 函数，返回 int，括号里的 <code>void</code> 表示"不接收参数"（写 <code>main()</code> 也行，但 <code>void</code> 更明确）。</li>
<li><code>{ ... }</code> —— 函数体。所有要执行的语句放里面，每条以 <code>;</code> 结尾。</li>
<li><code>printf("Hello, C!\\n");</code> —— 输出函数。<code>\\n</code> 是<strong>换行符</strong>，没有它后续 printf 的内容会和当前行挤在一起。</li>
<li><code>return 0;</code> —— main 返回 0 表示"程序正常结束"。返回非零值表示出错。</li>
</ul>
<p>每个 <code>printf</code> 都是<strong>独立的一次调用</strong>。要打印多行，可以多次调用 printf，也可以一个 printf 里塞多个 <code>\\n</code>。两种风格都常见。</p>

@@intro:en
<p class="lead">Every C program begins execution at the <code>main</code> function — an iron rule. After the OS loads your program, control jumps to <code>main</code>'s first statement.</p>
<p>The minimal C program:</p>
<pre><code>#include &lt;stdio.h&gt;

int main(void) {
    printf("Hello, C!\\n");
    return 0;
}</code></pre>
<p>Line by line:</p>
<ul>
<li><code>#include &lt;stdio.h&gt;</code> — paste in the declarations from the "standard I/O" library. <code>printf</code> lives there; without it the compiler doesn't know <code>printf</code>.</li>
<li><code>int main(void)</code> — declare main, returning int, <code>void</code> in the parens means "takes no arguments".</li>
<li><code>{ ... }</code> — the function body. Statements end with <code>;</code>.</li>
<li><code>printf("Hello, C!\\n");</code> — output function. <code>\\n</code> is the <strong>newline character</strong>; without it subsequent printf output runs into the same line.</li>
<li><code>return 0;</code> — main returning 0 means "exited normally". Non-zero means an error.</li>
</ul>
<p>Each <code>printf</code> is an <strong>independent call</strong>. To print multiple lines, you can call printf several times, or use multiple <code>\\n</code> inside one call. Both styles are normal.</p>

@@task:zh
打印三行内容（用<strong>三个独立的 printf 调用</strong>）：
<pre><code>Hello, C!
This is line 2.
And line 3.</code></pre>
<p style="margin-top:8px;color:var(--muted);font-size:12px;">提示：忘了 <code>\\n</code> 会怎样？故意试一次，看看输出是什么样。</p>

@@task:en
Print three lines using <strong>three separate printf calls</strong>:
<pre><code>Hello, C!
This is line 2.
And line 3.</code></pre>
<p style="margin-top:8px;color:var(--muted);font-size:12px;">Tip: try omitting <code>\\n</code> once and see what happens.</p>

@@hint:zh
每个 printf 字符串末尾都加 <code>\\n</code>。三次调用就够了。

@@hint:en
Add <code>\\n</code> at the end of each printf string. Three calls is all you need.

@@starter
#include <stdio.h>

int main(void) {
    // 在这里写 3 个 printf

    return 0;
}

@@answer
#include <stdio.h>

int main(void) {
    printf("Hello, C!\\n");
    printf("This is line 2.\\n");
    printf("And line 3.\\n");
    return 0;
}

@@expectedOutput
Hello, C!
This is line 2.
And line 3.
`);
