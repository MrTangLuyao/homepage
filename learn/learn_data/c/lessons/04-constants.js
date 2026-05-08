LEARN.lesson('c', 4, `
@@chapterRef c-constants

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead">"常量"指<strong>程序运行期间值不会变</strong>的量。C 提供两种声明方式 —— 它们看起来都能用，但底层机制完全不同。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">写法一：<code>#define</code>（预处理宏）</h3>
<pre><code>#define PI 3.14159
#define MAX_LEN 100</code></pre>
<p><code>#define</code> 是<strong>纯文本替换</strong>，发生在编译之前的"预处理"阶段。编译器看到 <code>area = PI * r * r</code> 时，PI 已经被替换成 <code>3.14159</code> 了 —— 没有"PI 这个变量"存在，更没有类型。</p>
<p>缺点：没有作用域、不报类型错误。优点：零运行时成本，适合定义常量数值、字符串。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">写法二：<code>const</code>（只读变量）</h3>
<pre><code>const float PI = 3.14159f;
const int   MAX_LEN = 100;</code></pre>
<p><code>const</code> 是<strong>真正的变量</strong>，有类型、有作用域、占内存（虽然现代编译器可能优化掉）。试图修改它（<code>PI = 3</code>）会被编译器拒绝。</p>
<p style="margin-top:10px;"><strong>该用哪个？</strong> 现代 C 偏好 <code>const</code>（类型安全），但 <code>#define</code> 在数组大小这种"必须是编译期常量"的场合仍是唯一选择，比如 <code>int arr[MAX_LEN]</code>。</p>
<p>顺带提一下整型字面量的进制：<code>42</code>（10 进制）、<code>052</code>（8 进制，前导 0）、<code>0x2A</code>（16 进制）—— 三个写法表示同一个数。</p>

@@intro:en
<p class="lead">A "constant" is a value that <strong>cannot change at runtime</strong>. C offers two ways to declare them — both work, but their mechanisms differ entirely.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Form 1: <code>#define</code> (preprocessor macro)</h3>
<pre><code>#define PI 3.14159
#define MAX_LEN 100</code></pre>
<p><code>#define</code> is <strong>pure text substitution</strong>, done in the "preprocess" stage before compilation. By the time the compiler sees <code>area = PI * r * r</code>, PI has already been replaced by <code>3.14159</code> — there is no "PI variable", and no type.</p>
<p>Downsides: no scope, no type checking. Upside: zero runtime cost.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Form 2: <code>const</code> (read-only variable)</h3>
<pre><code>const float PI = 3.14159f;
const int   MAX_LEN = 100;</code></pre>
<p><code>const</code> creates a <strong>real variable</strong> with a type, scope, and (potentially) memory. Trying to assign to it (<code>PI = 3</code>) is a compile error.</p>
<p style="margin-top:10px;"><strong>Which to use?</strong> Modern C prefers <code>const</code> for type safety. But <code>#define</code> remains the only choice when you need a true compile-time constant — e.g. <code>int arr[MAX_LEN]</code>.</p>
<p>Aside: integer literal bases — <code>42</code> (decimal), <code>052</code> (octal, leading 0), <code>0x2A</code> (hex). All represent the same number.</p>

@@task:zh
用 <code>#define</code> 定义 <code>PI</code> 为 <code>3.14159</code>，计算半径分别为 <code>3</code> 和 <code>5</code> 的圆面积，输出（保留两位小数）：
<pre><code>r=3: area=28.27
r=5: area=78.54</code></pre>

@@task:en
Use <code>#define</code> to set <code>PI</code> to <code>3.14159</code>. Compute and print the area of circles with radius <code>3</code> and <code>5</code> (two decimals):
<pre><code>r=3: area=28.27
r=5: area=78.54</code></pre>

@@hint:zh
面积公式 <code>π·r²</code> 写成 <code>PI * r * r</code>。两个 printf 即可，分别套不同的 r。

@@hint:en
Area = π·r² → <code>PI * r * r</code>. Two printf calls, one per radius.

@@starter
#include <stdio.h>

#define PI 3.14159

int main(void) {
    int r1 = 3;
    int r2 = 5;
    // 在这里输出两行

    return 0;
}

@@answer
#include <stdio.h>

#define PI 3.14159

int main(void) {
    int r1 = 3;
    int r2 = 5;
    printf("r=%d: area=%.2f\\n", r1, PI * r1 * r1);
    printf("r=%d: area=%.2f\\n", r2, PI * r2 * r2);
    return 0;
}

@@expectedOutput
r=3: area=28.27
r=5: area=78.54
`);
