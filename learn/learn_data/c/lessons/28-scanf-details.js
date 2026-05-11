LEARN.lesson('c', 28, `
@@chapterRef c-input-output

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead">现在运行时支持 <strong>真·实时输入</strong> 了 —— 程序里写 <code>scanf</code> 时会真的把 wasm 挂起，等你在终端里敲字 + 回车再继续。本课用最经典的 "提示 → 读名字 → 打招呼" 写法演示这件事。</p>

<pre><code>printf("Please enter your name: ");   // 提示词，结尾<u>不</u>加 \\n
scanf("%63s", name);                   // 读到下一个空白；63 是上限
printf("Hello, %s!\\n", name);          // 回应</code></pre>

<h3 style="margin:12px 0 6px;font-size:14px;">三个细节</h3>
<ul>
<li><strong>提示词不要 <code>\\n</code></strong>：这样光标停在 <code>"Please enter your name: "</code> 后面，看起来才像真终端。加了 <code>\\n</code> 用户输入就会落在下一行，体验差。</li>
<li><strong>name 不写 <code>&amp;</code></strong>：<code>char name[64]</code> 已经是数组首地址，写 <code>&amp;name</code> 反而是 "指向数组的指针" 类型，scanf 拿到也能用但是 warning，不优雅。</li>
<li><strong>限长 <code>%63s</code></strong>：缓冲区 64 字节里要给 <code>\\0</code> 留一格，所以最多读 63 字符。不限长 = 缓冲区溢出 = 段错误。</li>
</ul>

<p style="margin-top:10px;color:var(--muted);font-size:12px;">提交时按"预输入模式"判分 —— testInputs 里预填了 "Alice"。运行时关掉预输入模式可以自己在终端打字试。</p>

@@intro:en
<p class="lead">The runtime now supports <strong>real interactive input</strong> — when your program calls <code>scanf</code> the wasm stack is genuinely suspended until you type a line in the terminal. This lesson is the classic "prompt → read name → greet" pattern that demonstrates it.</p>

<pre><code>printf("Please enter your name: ");   // prompt, NO trailing \\n
scanf("%63s", name);                   // read until next whitespace; cap at 63
printf("Hello, %s!\\n", name);          // reply</code></pre>

<h3 style="margin:12px 0 6px;font-size:14px;">Three details</h3>
<ul>
<li><strong>No <code>\\n</code> in the prompt</strong>: leaves the cursor sitting right after <code>"Please enter your name: "</code> — proper-terminal UX. With <code>\\n</code> the user's input lands on the next line, which looks wrong.</li>
<li><strong>No <code>&amp;</code> on <code>name</code></strong>: <code>char name[64]</code> is already the array's first address; <code>&amp;name</code> would be a "pointer to array" type — scanf still works but emits a warning. Ugly.</li>
<li><strong>Bound the read with <code>%63s</code></strong>: leave one byte in the 64-byte buffer for the <code>\\0</code>. Unbounded <code>%s</code> = buffer overflow = segfault.</li>
</ul>

<p style="margin-top:10px;color:var(--muted);font-size:12px;">Submit grades in "pre-input mode" — testInputs has "Alice" pre-filled. When running, toggle pre-input mode off to type yourself in the terminal.</p>

@@task:zh
写一个程序：
<ol>
<li>用 <code>printf</code> 输出提示 <code>Please enter your name: </code>（结尾<u>不</u>加 <code>\\n</code>）</li>
<li>用 <code>scanf("%63s", name)</code> 读一个名字</li>
<li>用 <code>printf</code> 输出 <code>Hello, &lt;名字&gt;!</code>（结尾加 <code>\\n</code>）</li>
</ol>

@@task:en
Write a program that:
<ol>
<li>uses <code>printf</code> to print <code>Please enter your name: </code> (NO trailing <code>\\n</code>)</li>
<li>uses <code>scanf("%63s", name)</code> to read a name</li>
<li>uses <code>printf</code> to print <code>Hello, &lt;name&gt;!</code> (with trailing <code>\\n</code>)</li>
</ol>

@@hint:zh
三行代码搞定。<strong>提示词不要 \\n</strong>，否则提交时输出会比期望多一个换行 → 不通过。
<pre><code>printf("Please enter your name: ");
scanf("%63s", name);
printf("Hello, %s!\\n", name);</code></pre>

@@hint:en
Three lines. <strong>No <code>\\n</code> on the prompt</strong> — otherwise the graded output has one extra newline and fails.
<pre><code>printf("Please enter your name: ");
scanf("%63s", name);
printf("Hello, %s!\\n", name);</code></pre>

@@starter
#include <stdio.h>

int main(void) {
    char name[64];
    // 1. 打印提示 "Please enter your name: "（不要 \\n）
    // 2. scanf 读名字（用 %63s 限长）
    // 3. 打印 "Hello, <名字>!\\n"

    return 0;
}

@@answer
#include <stdio.h>

int main(void) {
    char name[64];
    printf("Please enter your name: ");
    scanf("%63s", name);
    printf("Hello, %s!\\n", name);
    return 0;
}

@@expectedOutput
Please enter your name: Hello, Alice!

@@testInputs
Alice
`);
