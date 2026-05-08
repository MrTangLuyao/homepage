LEARN.lesson('c', 3, `
@@chapterRef c-variables

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead">变量 = 给一段内存起个名字。声明变量时必须告诉编译器它存什么<strong>类型</strong>的数据 —— C 是<strong>静态类型</strong>语言，类型不能后面变。</p>
<p>三个最常用的基本类型：</p>
<table style="border-collapse:collapse;font-size:13px;">
<tr><th style="text-align:left;padding:4px 14px 4px 0;">类型</th><th style="text-align:left;padding:4px 14px 4px 0;">用途</th><th style="text-align:left;padding:4px;">printf 占位符</th></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>int</code></td><td style="padding:2px 14px 2px 0;">整数</td><td><code>%d</code></td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>float</code></td><td style="padding:2px 14px 2px 0;">单精度浮点</td><td><code>%f</code></td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>char</code></td><td style="padding:2px 14px 2px 0;">单个字符（其实是小整数）</td><td><code>%c</code></td></tr>
</table>
<p style="margin-top:12px;">声明 + 赋值的写法：</p>
<pre><code>int    age   = 18;
float  score = 92.5;
char   grade = 'A';   // 单引号是字符；双引号是字符串</code></pre>
<p><strong>容易踩的坑</strong>：</p>
<ul>
<li><code>'A'</code>（单引号）是 char，等价于整数 65。<code>"A"</code>（双引号）是<strong>两字节</strong>的字符串（'A' + 终止符 '\\0'），完全不同的类型。</li>
<li>占位符要和类型对应。<code>printf("%d", 3.14)</code> 不会报错但会打印垃圾值 —— C 的格式化不做类型检查。</li>
<li>int 整除会丢精度（下一课讲）。float 浮点有舍入误差，不能用 <code>==</code> 比较。</li>
</ul>

@@intro:en
<p class="lead">A variable is a named slice of memory. When you declare one, you must tell the compiler what <strong>type</strong> of data it holds — C is <strong>statically typed</strong>, the type can't change later.</p>
<p>Three most-used basic types:</p>
<table style="border-collapse:collapse;font-size:13px;">
<tr><th style="text-align:left;padding:4px 14px 4px 0;">Type</th><th style="text-align:left;padding:4px 14px 4px 0;">Use</th><th style="text-align:left;padding:4px;">printf specifier</th></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>int</code></td><td style="padding:2px 14px 2px 0;">integers</td><td><code>%d</code></td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>float</code></td><td style="padding:2px 14px 2px 0;">single-precision float</td><td><code>%f</code></td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>char</code></td><td style="padding:2px 14px 2px 0;">a single character (really a small int)</td><td><code>%c</code></td></tr>
</table>
<p style="margin-top:12px;">Declaration + assignment:</p>
<pre><code>int    age   = 18;
float  score = 92.5;
char   grade = 'A';   // single quotes = char; double = string</code></pre>
<p><strong>Common pitfalls</strong>:</p>
<ul>
<li><code>'A'</code> (single quotes) is a char — equivalent to integer 65. <code>"A"</code> (double quotes) is a <strong>two-byte</strong> string ('A' + terminator '\\0'). Totally different types.</li>
<li>Format specifier must match the type. <code>printf("%d", 3.14)</code> won't error but prints garbage — C does no type checking on format strings.</li>
<li>int division truncates (next lesson). Float values have rounding error — don't compare with <code>==</code>.</li>
</ul>

@@task:zh
声明三个变量：<code>age = 18</code>（int）、<code>score = 92.5</code>（float）、<code>grade = 'A'</code>（char），用<strong>一个 printf</strong> 打印成下面的格式：
<pre><code>Age: 18
Score: 92.50
Grade: A</code></pre>
<p style="margin-top:8px;color:var(--muted);font-size:12px;">
注意 score 显示两位小数 —— 用 <code>%.2f</code>（输出宽度的格式控制）。
</p>

@@task:en
Declare three variables: <code>age = 18</code> (int), <code>score = 92.5</code> (float), <code>grade = 'A'</code> (char). With <strong>one printf</strong>, output:
<pre><code>Age: 18
Score: 92.50
Grade: A</code></pre>
<p style="margin-top:8px;color:var(--muted);font-size:12px;">
Note score shows two decimal places — use <code>%.2f</code> (precision control in the format spec).
</p>

@@hint:zh
一个 printf 可以塞多个 <code>\\n</code>。占位符顺序对应参数顺序：<code>printf("Age: %d\\nScore: %.2f\\nGrade: %c\\n", age, score, grade);</code>

@@hint:en
A single printf can contain multiple <code>\\n</code>. Specifiers match the argument order: <code>printf("Age: %d\\nScore: %.2f\\nGrade: %c\\n", age, score, grade);</code>

@@starter
#include <stdio.h>

int main(void) {
    int   age   = 18;
    float score = 92.5;
    char  grade = 'A';

    // 在这里用一个 printf 输出所需格式

    return 0;
}

@@answer
#include <stdio.h>

int main(void) {
    int   age   = 18;
    float score = 92.5;
    char  grade = 'A';

    printf("Age: %d\\nScore: %.2f\\nGrade: %c\\n", age, score, grade);
    return 0;
}

@@expectedOutput
Age: 18
Score: 92.50
Grade: A
`);
