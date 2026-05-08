LEARN.lesson('c', 8, `
@@chapterRef c-decision-making

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead"><code>switch</code> 是一种特殊的多分支判断 —— 当你需要"按某个整数/字符的具体值跳到不同处理"时，比 <code>if/else if</code> 链更清晰。</p>
<pre><code>switch (变量) {
    case 值1:
        // ...
        break;
    case 值2:
        // ...
        break;
    default:
        // 都不匹配
}</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">三个必须知道的规则</h3>
<ol>
<li><strong><code>switch</code> 只能比较 int 和 char</strong>。不支持 float、字符串、范围。<code>case 1.5</code> 或 <code>case "abc"</code> 都不合法。</li>
<li><strong><code>case</code> 后面的值必须是<u>编译期常量</u></strong>。<code>case x + 1:</code> 中 x 是变量就不行；<code>case MY_CONST:</code>（<code>#define</code> 出来的）可以。</li>
<li><strong><code>break</code> 不能省 —— 否则"穿透"到下一个 case</strong>。这是 C 的著名坑：</li>
</ol>
<pre><code>switch (n) {
    case 1:
        printf("one\\n");
        // 没写 break ↓
    case 2:
        printf("two\\n");
        break;
}
// n=1 时输出："one\\nthow\\n"</code></pre>
<p>有时<strong>故意</strong>不写 break，把多个 case 共享同一段代码：</p>
<pre><code>switch (day) {
    case 1: case 2: case 3: case 4: case 5:
        printf("Weekday\\n"); break;
    case 6: case 7:
        printf("Weekend\\n"); break;
}</code></pre>
<p>这种"故意穿透"建议加注释 <code>/* fallthrough */</code> 让读代码的人知道是有意为之。</p>

@@intro:en
<p class="lead"><code>switch</code> is a multi-way branch tailored for "jump based on the specific value of an integer/char". Cleaner than long <code>if/else if</code> chains.</p>
<pre><code>switch (variable) {
    case value1:
        // ...
        break;
    case value2:
        // ...
        break;
    default:
        // none matched
}</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">Three rules you must know</h3>
<ol>
<li><strong><code>switch</code> only compares int and char</strong>. No float, no strings, no ranges. <code>case 1.5</code> or <code>case "abc"</code> won't compile.</li>
<li><strong><code>case</code> values must be <u>compile-time constants</u></strong>. <code>case x + 1:</code> with variable x — illegal; <code>case MY_CONST:</code> (a <code>#define</code>) is fine.</li>
<li><strong><code>break</code> is not optional — without it, execution "falls through" to the next case</strong>. C's famous trap:</li>
</ol>
<pre><code>switch (n) {
    case 1:
        printf("one\\n");
        // no break ↓
    case 2:
        printf("two\\n");
        break;
}
// n=1 prints: one\\ntwo\\n</code></pre>
<p>Sometimes the fall-through is <strong>intentional</strong>, sharing a body across cases:</p>
<pre><code>switch (day) {
    case 1: case 2: case 3: case 4: case 5:
        printf("Weekday\\n"); break;
    case 6: case 7:
        printf("Weekend\\n"); break;
}</code></pre>
<p>For deliberate fall-through, add <code>/* fallthrough */</code> as a comment so future readers know.</p>

@@task:zh
从 stdin 读一个整数 1-7，用 <code>switch</code> 打印对应英文星期名（首字母大写）：
<pre><code>1 → Monday
2 → Tuesday
...
7 → Sunday</code></pre>
<p>都不匹配时打印 <code>Invalid</code>。</p>
<p style="margin-top:8px;color:var(--muted);font-size:12px;">
本课预填了 <code>3</code>，期望输出 <code>Wednesday</code>。
</p>

@@task:en
Read an integer 1-7 from stdin, use <code>switch</code> to print the corresponding English weekday:
<pre><code>1 → Monday
2 → Tuesday
...
7 → Sunday</code></pre>
<p>Print <code>Invalid</code> if no match.</p>
<p style="margin-top:8px;color:var(--muted);font-size:12px;">
Pre-filled input <code>3</code>; expected output <code>Wednesday</code>.
</p>

@@hint:zh
每个 case 后面记得加 <code>break</code>。<code>default</code> 处理 1-7 之外的值，打印 <code>Invalid</code>。

@@hint:en
Add <code>break</code> after each case. <code>default</code> handles values outside 1-7 — print <code>Invalid</code>.

@@starter
#include <stdio.h>

int main(void) {
    int day;
    scanf("%d", &day);

    switch (day) {
        // case 1: ...
        // case 2: ...
        default:
            printf("Invalid\\n");
    }
    return 0;
}

@@answer
#include <stdio.h>

int main(void) {
    int day;
    scanf("%d", &day);

    switch (day) {
        case 1: printf("Monday\\n");    break;
        case 2: printf("Tuesday\\n");   break;
        case 3: printf("Wednesday\\n"); break;
        case 4: printf("Thursday\\n");  break;
        case 5: printf("Friday\\n");    break;
        case 6: printf("Saturday\\n");  break;
        case 7: printf("Sunday\\n");    break;
        default: printf("Invalid\\n");
    }
    return 0;
}

@@expectedOutput
Wednesday

@@testInputs
3
`);
