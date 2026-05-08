LEARN.lesson('c', 19, `
@@chapterRef c-pointers-arrays

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead">指针和数组在 C 里有一种<strong>"几乎等价但又不完全等价"</strong>的关系，搞清楚这个能解开很多疑惑。</p>
<h3 style="margin:12px 0 6px;font-size:14px;">下标语法的真面目</h3>
<p>编译器把 <code>arr[i]</code> 翻译成 <code>*(arr + i)</code>。两个写法<strong>完全等价</strong>：</p>
<pre><code>int arr[5] = {10, 20, 30, 40, 50};
arr[2]      // 30
*(arr + 2)  // 30 — 等价
2[arr]      // 30 — 也合法（但极怪，别用）</code></pre>
<p>这是因为 <code>arr</code> 在大多数表达式里<strong>自动 decay</strong>成"指向首元素的指针"，所以 <code>arr + 2</code> 是有效的指针运算。</p>
<h3 style="margin:12px 0 6px;font-size:14px;">两者的关键差别</h3>
<table style="border-collapse:collapse;font-size:13px;">
<tr><th style="text-align:left;padding:4px 14px 4px 0;">操作</th><th style="text-align:left;padding:4px 14px 4px 0;">数组 arr</th><th style="text-align:left;padding:4px;">指针 p</th></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>sizeof</code></td><td>整个数组的字节数</td><td>指针本身的字节数</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>++</code></td><td>非法（数组名不是 lvalue）</td><td>合法</td></tr>
<tr><td style="padding:2px 14px 2px 0;">赋值</td><td>非法 <code>arr = ...</code></td><td>合法 <code>p = ...</code></td></tr>
</table>
<p>所以："数组就是常量指针"这句话<strong>大多数时候对</strong>，但 <code>sizeof</code> 和重新赋值的细节露馅了。</p>

@@intro:en
<p class="lead">Pointers and arrays in C have an <strong>"almost equivalent but not quite"</strong> relationship — understanding it dissolves a lot of confusion.</p>
<h3 style="margin:12px 0 6px;font-size:14px;">What subscript syntax really is</h3>
<p>The compiler translates <code>arr[i]</code> to <code>*(arr + i)</code>. They're <strong>fully equivalent</strong>:</p>
<pre><code>int arr[5] = {10, 20, 30, 40, 50};
arr[2]      // 30
*(arr + 2)  // 30 — equivalent
2[arr]      // 30 — also valid (weird, don't use)</code></pre>
<p>This works because <code>arr</code> in most expressions <strong>decays</strong> to "pointer to first element", so <code>arr + 2</code> is valid pointer arithmetic.</p>
<h3 style="margin:12px 0 6px;font-size:14px;">Key differences</h3>
<table style="border-collapse:collapse;font-size:13px;">
<tr><th style="text-align:left;padding:4px 14px 4px 0;">Operation</th><th style="text-align:left;padding:4px 14px 4px 0;">Array arr</th><th style="text-align:left;padding:4px;">Pointer p</th></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>sizeof</code></td><td>total array bytes</td><td>pointer's own size</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>++</code></td><td>illegal (array name isn't an lvalue)</td><td>legal</td></tr>
<tr><td style="padding:2px 14px 2px 0;">assignment</td><td>illegal <code>arr = ...</code></td><td>legal <code>p = ...</code></td></tr>
</table>
<p>So "an array is a const pointer" is <strong>mostly true</strong>, but <code>sizeof</code> and reassignment expose the difference.</p>

@@task:zh
给定 <code>int arr[5] = {1, 4, 9, 16, 25};</code>，用<strong>四种不同的写法</strong>访问 <code>arr[2]</code>（应该都是 9），按下面格式打印：
<pre><code>arr[2]     = 9
*(arr + 2) = 9
*(p + 2)   = 9
p[2]       = 9</code></pre>
<p style="margin-top:8px;color:var(--muted);font-size:12px;">最后两行用指针 <code>int *p = arr;</code>。证明 <code>p[i]</code> 也成立 —— 编译器看到的就是 <code>*(p+i)</code>。</p>

@@task:en
Given <code>int arr[5] = {1, 4, 9, 16, 25};</code>, access <code>arr[2]</code> (should be 9) <strong>four different ways</strong>:
<pre><code>arr[2]     = 9
*(arr + 2) = 9
*(p + 2)   = 9
p[2]       = 9</code></pre>
<p style="margin-top:8px;color:var(--muted);font-size:12px;">The last two use a pointer <code>int *p = arr;</code>. Proving <code>p[i]</code> also works — compiler sees it as <code>*(p+i)</code>.</p>

@@hint:zh
四个 printf，第三和第四个之前需要 <code>int *p = arr;</code>。

@@hint:en
Four printf calls; before the third one, declare <code>int *p = arr;</code>.

@@starter
#include <stdio.h>

int main(void) {
    int arr[5] = {1, 4, 9, 16, 25};
    // 四种写法

    return 0;
}

@@answer
#include <stdio.h>

int main(void) {
    int  arr[5] = {1, 4, 9, 16, 25};
    int *p      = arr;
    printf("arr[2]     = %d\\n", arr[2]);
    printf("*(arr + 2) = %d\\n", *(arr + 2));
    printf("*(p + 2)   = %d\\n", *(p + 2));
    printf("p[2]       = %d\\n", p[2]);
    return 0;
}

@@expectedOutput
arr[2]     = 9
*(arr + 2) = 9
*(p + 2)   = 9
p[2]       = 9
`);
