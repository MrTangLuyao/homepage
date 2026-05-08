LEARN.lesson('c', 7, `
@@chapterRef c-decision-making

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead">条件判断让程序"分叉"走不同路径。三种基本写法：</p>
<pre><code>if (条件) {
    // 条件真就执行
}

if (条件) {
    // 真分支
} else {
    // 假分支
}

if (条件1) {
    // 第一种情况
} else if (条件2) {
    // 第二种情况
} else if (条件3) {
    // 第三种情况
} else {
    // 都不匹配（兜底）
}</code></pre>
<p>条件可以是任何 int 表达式：<strong>非 0 即真</strong>，0 即假。所以 <code>if (x)</code> 等价于 <code>if (x != 0)</code>。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">花括号能省吗？</h3>
<p>语法上：单语句可以省 <code>{ }</code>。<code>if (x &gt; 0) printf("pos");</code> 合法。但<strong>建议永远写</strong>，理由是：</p>
<pre><code>// 看似没问题
if (x > 0)
    printf("positive\\n");
    do_something();   // 这一行无论 x 多少都执行！</code></pre>
<p>缩进骗了你 —— C 不在乎缩进，<code>do_something()</code> 在 if 外面。加花括号能根除这个 bug。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">else if 链 vs 嵌套 if</h3>
<p>处理"多个互斥情况"用 <code>else if</code> 链最干净。一旦命中某个分支，后面所有都跳过 —— 这避免了多个 if 各自重复判断的开销和歧义。</p>

@@intro:en
<p class="lead">Conditional branching lets a program take different paths. Three forms:</p>
<pre><code>if (cond) {
    // runs if cond is true
}

if (cond) {
    // true branch
} else {
    // false branch
}

if (cond1) {
    // first case
} else if (cond2) {
    // second case
} else if (cond3) {
    // third case
} else {
    // fallback (none matched)
}</code></pre>
<p>The condition can be any int expression: <strong>non-zero is true</strong>, zero is false. So <code>if (x)</code> means the same as <code>if (x != 0)</code>.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Can we skip the braces?</h3>
<p>Syntactically: yes for a single statement. <code>if (x &gt; 0) printf("pos");</code> compiles. But <strong>always write them</strong> anyway:</p>
<pre><code>// looks fine, isn't
if (x > 0)
    printf("positive\\n");
    do_something();   // this runs no matter what x is!</code></pre>
<p>Indentation lied to you — C doesn't care about it; <code>do_something()</code> is outside the if. Braces eliminate this whole class of bugs.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">else if chain vs nested if</h3>
<p>For "multiple mutually exclusive cases", an <code>else if</code> chain is cleanest. Once one branch matches, all later branches are skipped — avoiding redundant tests and ambiguity.</p>

@@task:zh
从 stdin 读一个整数 score（0-100），按下列规则打印 <code>Grade: X</code>：
<ul>
<li>≥ 90 → A</li>
<li>≥ 80 → B</li>
<li>≥ 70 → C</li>
<li>≥ 60 → D</li>
<li>否则 → F</li>
</ul>
<p style="margin-top:8px;color:var(--muted);font-size:12px;">
本课已预填 <code>85</code> 作为测试输入，期望输出 <code>Grade: B</code>。
</p>

@@task:en
Read an integer <code>score</code> (0-100) from stdin and print <code>Grade: X</code> per:
<ul>
<li>≥ 90 → A</li>
<li>≥ 80 → B</li>
<li>≥ 70 → C</li>
<li>≥ 60 → D</li>
<li>else → F</li>
</ul>
<p style="margin-top:8px;color:var(--muted);font-size:12px;">
This lesson pre-fills <code>85</code> as test input; expected output <code>Grade: B</code>.
</p>

@@hint:zh
用 <code>scanf("%d", &score);</code> 读输入。然后 <code>if (score &gt;= 90) ... else if (score &gt;= 80) ... else ...</code> 链式判断。

@@hint:en
Use <code>scanf("%d", &score);</code> to read. Then chain <code>if (score &gt;= 90) ... else if (score &gt;= 80) ... else ...</code>.

@@starter
#include <stdio.h>

int main(void) {
    int score;
    scanf("%d", &score);

    char grade;
    // 在这里用 if/else if 决定 grade

    printf("Grade: %c\\n", grade);
    return 0;
}

@@answer
#include <stdio.h>

int main(void) {
    int score;
    scanf("%d", &score);

    char grade;
    if (score >= 90)      grade = 'A';
    else if (score >= 80) grade = 'B';
    else if (score >= 70) grade = 'C';
    else if (score >= 60) grade = 'D';
    else                  grade = 'F';

    printf("Grade: %c\\n", grade);
    return 0;
}

@@expectedOutput
Grade: B

@@testInputs
85
`);
