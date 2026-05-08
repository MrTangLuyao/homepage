LEARN.lesson('c', 22, `
@@chapterRef c-structs

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead">数组是"同一种类型的多个值"。结构体（struct）是"<strong>不同类型</strong>的多个值打包在一起"，比如一个学生 = 名字（字符串）+ 年龄（int）+ 成绩（float）。这是 C 表达"复合数据"的基础。</p>
<pre><code>struct Student {
    char name[32];
    int  age;
    float score;
};

struct Student s;       // 声明一个学生
s.age = 18;             // . 访问成员
s.score = 92.5;
strcpy(s.name, "Alice");</code></pre>
<h3 style="margin:12px 0 6px;font-size:14px;">声明 + 初始化</h3>
<pre><code>// 按声明顺序
struct Student a = {"Alice", 18, 92.5};

// 指定初始化（C99，推荐 — 不依赖顺序，可读性好）
struct Student b = { .name = "Bob", .age = 19, .score = 85.0 };</code></pre>
<h3 style="margin:12px 0 6px;font-size:14px;">struct 的"奇怪"之处：默认值传递</h3>
<p>和数组不同，结构体作为函数参数时<strong>整体被复制</strong>（值传递）。所以传一个 1KB 的 struct 是真复制 1KB —— 大结构体记得用指针传（下一课）。</p>
<pre><code>void f(struct Student s) {   // 整个 s 被复制进函数
    s.age = 999;             // 改的是副本，外面 s.age 不变
}</code></pre>

@@intro:en
<p class="lead">Arrays hold "multiple values of one type". Structs hold "multiple values of <strong>different</strong> types" packed together — e.g., a student = name (string) + age (int) + score (float). C's basic mechanism for compound data.</p>
<pre><code>struct Student {
    char name[32];
    int  age;
    float score;
};

struct Student s;       // declare a student
s.age = 18;             // . accesses members
s.score = 92.5;
strcpy(s.name, "Alice");</code></pre>
<h3 style="margin:12px 0 6px;font-size:14px;">Declaration + initialization</h3>
<pre><code>// in declaration order
struct Student a = {"Alice", 18, 92.5};

// designated initializer (C99, preferred — order-independent, readable)
struct Student b = { .name = "Bob", .age = 19, .score = 85.0 };</code></pre>
<h3 style="margin:12px 0 6px;font-size:14px;">A "weird" thing about structs: pass-by-value by default</h3>
<p>Unlike arrays, structs as function arguments are <strong>copied wholesale</strong>. Passing a 1 KB struct really copies 1 KB — pass big structs by pointer (next lesson).</p>

@@task:zh
定义 <code>struct Student</code>（name / age / score），创建并初始化 Alice (18, 92.5) 和 Bob (19, 85.0)，按下面格式打印：
<pre><code>Alice, 18, 92.50
Bob, 19, 85.00</code></pre>

@@task:en
Define <code>struct Student</code> (name / age / score), create + init Alice (18, 92.5) and Bob (19, 85.0), print:
<pre><code>Alice, 18, 92.50
Bob, 19, 85.00</code></pre>

@@hint:zh
两个 printf：<code>printf("%s, %d, %.2f\\n", s.name, s.age, s.score);</code>。

@@hint:en
Two printfs: <code>printf("%s, %d, %.2f\\n", s.name, s.age, s.score);</code>.

@@starter
#include <stdio.h>

struct Student {
    char name[32];
    int  age;
    float score;
};

int main(void) {
    // 创建 Alice / Bob 并打印

    return 0;
}

@@answer
#include <stdio.h>

struct Student {
    char name[32];
    int  age;
    float score;
};

int main(void) {
    struct Student a = {"Alice", 18, 92.5};
    struct Student b = {"Bob",   19, 85.0};
    printf("%s, %d, %.2f\\n", a.name, a.age, a.score);
    printf("%s, %d, %.2f\\n", b.name, b.age, b.score);
    return 0;
}

@@expectedOutput
Alice, 18, 92.50
Bob, 19, 85.00
`);
