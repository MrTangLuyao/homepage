LEARN.lesson('c', 2, `
@@chapterRef c-basic-syntax

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead">字符串里的某些字符没法直接打 —— 比如换行、Tab、双引号本身。C 用<strong>反斜杠 <code>\\</code></strong> 作"逃逸符号"，告诉编译器"接下来这个字符特殊处理"。</p>
<p>常见转义序列：</p>
<table style="border-collapse:collapse;font-size:13px;">
<tr><th style="text-align:left;padding:4px 12px 4px 0;">写法</th><th style="text-align:left;padding:4px;">含义</th></tr>
<tr><td style="padding:2px 12px 2px 0;"><code>\\n</code></td><td>换行（newline）</td></tr>
<tr><td style="padding:2px 12px 2px 0;"><code>\\t</code></td><td>制表符（Tab）</td></tr>
<tr><td style="padding:2px 12px 2px 0;"><code>\\\\</code></td><td>一个反斜杠</td></tr>
<tr><td style="padding:2px 12px 2px 0;"><code>\\"</code></td><td>一个双引号</td></tr>
<tr><td style="padding:2px 12px 2px 0;"><code>\\0</code></td><td>空字符（字符串结尾标记）</td></tr>
<tr><td style="padding:2px 12px 2px 0;"><code>\\x41</code></td><td>16 进制 ASCII（这里是 'A'）</td></tr>
</table>
<p style="margin-top:14px;"><strong>关键洞察</strong>：源代码里的两字符 <code>\\n</code> 在编译后变成<strong>一个</strong>字符（值为 10）。所以 <code>"abc\\n"</code> 实际占 5 字节（含末尾的 <code>\\0</code>），而不是 6 字节。</p>
<p>想打印 Windows 路径 <code>C:\\Users</code>？必须写 <code>"C:\\\\Users"</code>，因为单个 <code>\\U</code> 编译器会以为是 Unicode 转义。</p>

@@intro:en
<p class="lead">Some characters can't appear directly inside a string literal — newlines, tabs, double quotes themselves. C uses the <strong>backslash <code>\\</code></strong> as an "escape" character, signaling "the next character is special".</p>
<p>Common escape sequences:</p>
<table style="border-collapse:collapse;font-size:13px;">
<tr><th style="text-align:left;padding:4px 12px 4px 0;">Source</th><th style="text-align:left;padding:4px;">Meaning</th></tr>
<tr><td style="padding:2px 12px 2px 0;"><code>\\n</code></td><td>newline</td></tr>
<tr><td style="padding:2px 12px 2px 0;"><code>\\t</code></td><td>tab</td></tr>
<tr><td style="padding:2px 12px 2px 0;"><code>\\\\</code></td><td>a single backslash</td></tr>
<tr><td style="padding:2px 12px 2px 0;"><code>\\"</code></td><td>a double quote</td></tr>
<tr><td style="padding:2px 12px 2px 0;"><code>\\0</code></td><td>null character (string terminator)</td></tr>
<tr><td style="padding:2px 12px 2px 0;"><code>\\x41</code></td><td>hex ASCII (here 'A')</td></tr>
</table>
<p style="margin-top:14px;"><strong>Key insight</strong>: the two source-code characters <code>\\n</code> become <strong>one</strong> byte after compilation (value 10). So <code>"abc\\n"</code> is 5 bytes (including the trailing <code>\\0</code>), not 6.</p>
<p>To print a Windows path like <code>C:\\Users</code>, you must write <code>"C:\\\\Users"</code> — a lone <code>\\U</code> would be parsed as a Unicode escape.</p>

@@task:zh
用<strong>一次 printf</strong>（一个字符串）打印这三行：
<pre><code>C:\\Users\\Louie\\Desktop\\note.txt
She said "Hi!"
1\t2\t3</code></pre>
<p style="margin-top:8px;color:var(--muted);font-size:12px;">
最后一行的 <code>\\t</code> 是 Tab 字符。三道考点：反斜杠 / 双引号 / Tab。
</p>

@@task:en
With <strong>one printf call</strong> (one string), print these three lines:
<pre><code>C:\\Users\\Louie\\Desktop\\note.txt
She said "Hi!"
1\t2\t3</code></pre>
<p style="margin-top:8px;color:var(--muted);font-size:12px;">
The last line's <code>\\t</code> is a tab character. Three things to escape: backslash, double quote, tab.
</p>

@@hint:zh
每个反斜杠在源码里写 <code>\\\\</code>，每个双引号写 <code>\\"</code>，Tab 写 <code>\\t</code>，行末加 <code>\\n</code>。

@@hint:en
Each backslash needs <code>\\\\</code> in source, each double quote <code>\\"</code>, tab <code>\\t</code>, newline <code>\\n</code>.

@@starter
#include <stdio.h>

int main(void) {
    // 一次 printf，三行输出
    printf("");
    return 0;
}

@@answer
#include <stdio.h>

int main(void) {
    printf("C:\\\\Users\\\\Louie\\\\Desktop\\\\note.txt\\nShe said \\"Hi!\\"\\n1\\t2\\t3\\n");
    return 0;
}

@@expectedOutput
C:\\Users\\Louie\\Desktop\\note.txt
She said "Hi!"
1	2	3
`);
