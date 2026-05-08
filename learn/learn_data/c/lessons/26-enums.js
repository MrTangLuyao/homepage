LEARN.lesson('c', 26, `
@@chapterRef c-enums

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead">enum 让你给一组整数常量起<strong>有意义的名字</strong>，比裸数字（0、1、2…）可读性高得多。</p>
<pre><code>enum Day { MON, TUE, WED, THU, FRI, SAT, SUN };

enum Day today = WED;
if (today == WED) printf("Hump day!\\n");</code></pre>
<p>没指定值时，enum 成员从 <strong>0</strong> 开始递增：MON=0, TUE=1, WED=2, ..., SUN=6。</p>
<h3 style="margin:12px 0 6px;font-size:14px;">手动赋值与混合</h3>
<pre><code>enum Status {
    OK      = 0,
    ERROR   = 1,
    WARNING = 10,
    INFO,            // 11，从上一个 +1
    DEBUG            // 12
};</code></pre>
<h3 style="margin:12px 0 6px;font-size:14px;">本质就是 int</h3>
<p>enum 在 C 里底层就是 int —— 可以隐式转换、参与算术、用 <code>%d</code> 打印。这意味着<strong>没有真正的类型安全</strong>：</p>
<pre><code>enum Day d = 999;        // 编译通过！没有"非法值"检查
printf("%d\\n", d + 1);   // 1000，照常算</code></pre>
<p>这是 C 与 Rust/Swift 等现代语言 enum 的关键差别 —— C 的 enum 只是个"命名整数"，没有"枚举类型只能是这几个值之一"的约束。</p>
<h3 style="margin:12px 0 6px;font-size:14px;">enum 名字 vs 标签 vs 变量</h3>
<p>声明完整写法是 <code>enum Day d</code>。配合 <code>typedef</code>（下一课）可以省掉 <code>enum</code> 关键字 —— 这是工程里的常见做法。</p>

@@intro:en
<p class="lead">enum lets you give a group of integer constants <strong>meaningful names</strong> — much more readable than bare numbers (0, 1, 2…).</p>
<pre><code>enum Day { MON, TUE, WED, THU, FRI, SAT, SUN };

enum Day today = WED;
if (today == WED) printf("Hump day!\\n");</code></pre>
<p>Without explicit values, enum members count up from <strong>0</strong>: MON=0, TUE=1, WED=2, ..., SUN=6.</p>
<h3 style="margin:12px 0 6px;font-size:14px;">Manual assignment + mixing</h3>
<pre><code>enum Status {
    OK      = 0,
    ERROR   = 1,
    WARNING = 10,
    INFO,            // 11, last+1
    DEBUG            // 12
};</code></pre>
<h3 style="margin:12px 0 6px;font-size:14px;">It's just int underneath</h3>
<p>In C, enum is internally just int — implicit conversion, arithmetic, and <code>%d</code> printing all work. This means <strong>no real type safety</strong>:</p>
<pre><code>enum Day d = 999;        // compiles! no "invalid value" check
printf("%d\\n", d + 1);   // 1000, computed normally</code></pre>
<p>Key difference from Rust/Swift enums — C's enum is just "named integers", with no constraint that "this value must be one of the listed members".</p>

@@task:zh
定义 <code>enum Day { MON, TUE, WED, THU, FRI, SAT, SUN };</code>。打印每个枚举名对应的数值（用 %d 看底层 int），最后再打印一行算术结果验证它确实是 int：
<pre><code>MON=0, TUE=1, WED=2, THU=3, FRI=4, SAT=5, SUN=6
SAT - MON = 5</code></pre>

@@task:en
Define <code>enum Day { MON, TUE, WED, THU, FRI, SAT, SUN };</code>. Print each name's underlying int value, then a line proving it's just an int via arithmetic:
<pre><code>MON=0, TUE=1, WED=2, THU=3, FRI=4, SAT=5, SUN=6
SAT - MON = 5</code></pre>

@@hint:zh
一个 printf 里塞 7 个 <code>%d</code>。最后一行就是 <code>SAT - MON</code> 的算术。

@@hint:en
One printf with 7 <code>%d</code>s for the first line. Then arithmetic: <code>SAT - MON</code>.

@@starter
#include <stdio.h>

enum Day { MON, TUE, WED, THU, FRI, SAT, SUN };

int main(void) {
    // 两行 printf

    return 0;
}

@@answer
#include <stdio.h>

enum Day { MON, TUE, WED, THU, FRI, SAT, SUN };

int main(void) {
    printf("MON=%d, TUE=%d, WED=%d, THU=%d, FRI=%d, SAT=%d, SUN=%d\\n",
           MON, TUE, WED, THU, FRI, SAT, SUN);
    printf("SAT - MON = %d\\n", SAT - MON);
    return 0;
}

@@expectedOutput
MON=0, TUE=1, WED=2, THU=3, FRI=4, SAT=5, SUN=6
SAT - MON = 5
`);
