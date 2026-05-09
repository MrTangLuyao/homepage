LEARN.lesson('c-algo', 21, `
@@chapterRef c-algo-tute-2

@@difficulty:zh 进阶
@@difficulty:en Intermediate

@@intro:zh
<p class="lead">KMP 字符串匹配的核心是<strong>失败函数 next[]</strong>——预先扫一遍模式串，记下"如果在位置 j 失败了，j 应该跳到哪里继续"。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">next[] 的定义</h3>
<p>对模式串 P，<code>next[i]</code> 定义为：<strong>P[0..i] 这段子串中，最长的"既是真前缀又是真后缀"的长度</strong>。</p>
<p>"真前缀" = 不包括整个串本身的前缀。"真后缀" = 不包括整个串本身的后缀。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">手算例子：P = "ABABABC"</h3>
<table style="width:100%;border-collapse:collapse;font-size:13px;margin:6px 0;">
  <tr style="border-bottom:1px solid var(--border);"><th style="text-align:left;padding:4px 8px;">i</th><th style="text-align:left;padding:4px 8px;">P[0..i]</th><th style="text-align:left;padding:4px 8px;">最长公共前后缀</th><th style="text-align:left;padding:4px 8px;">next[i]</th></tr>
  <tr><td style="padding:4px 8px;">0</td><td style="padding:4px 8px;">A</td><td style="padding:4px 8px;">—</td><td style="padding:4px 8px;">0</td></tr>
  <tr><td style="padding:4px 8px;">1</td><td style="padding:4px 8px;">AB</td><td style="padding:4px 8px;">—</td><td style="padding:4px 8px;">0</td></tr>
  <tr><td style="padding:4px 8px;">2</td><td style="padding:4px 8px;">ABA</td><td style="padding:4px 8px;">A</td><td style="padding:4px 8px;">1</td></tr>
  <tr><td style="padding:4px 8px;">3</td><td style="padding:4px 8px;">ABAB</td><td style="padding:4px 8px;">AB</td><td style="padding:4px 8px;">2</td></tr>
  <tr><td style="padding:4px 8px;">4</td><td style="padding:4px 8px;">ABABA</td><td style="padding:4px 8px;">ABA</td><td style="padding:4px 8px;">3</td></tr>
  <tr><td style="padding:4px 8px;">5</td><td style="padding:4px 8px;">ABABAB</td><td style="padding:4px 8px;">ABAB</td><td style="padding:4px 8px;">4</td></tr>
  <tr><td style="padding:4px 8px;">6</td><td style="padding:4px 8px;">ABABABC</td><td style="padding:4px 8px;">—</td><td style="padding:4px 8px;">0</td></tr>
</table>
<h3 style="margin:14px 0 6px;font-size:14px;">构造算法（O(m)）</h3>
<pre><code>void compute_next(const char *p, int m, int *next) {
    next[0] = 0;
    int k = 0;                  // 当前已匹配前缀长度
    for (int i = 1; i &lt; m; i++) {
        while (k &gt; 0 &amp;&amp; p[i] != p[k]) k = next[k - 1];
        if (p[i] == p[k]) k++;
        next[i] = k;
    }
}</code></pre>
<p>这段代码本质上是 KMP 在模式串<strong>自己</strong>身上跑一遍——每次失败用之前的 next 值反向跳。整体仍然 O(m)。</p>
<p>这一节先单独构造 next[]，下一节用它做完整匹配。</p>

@@intro:en
<p class="lead">KMP's core is the <strong>failure function next[]</strong> — pre-scan the pattern, record "if we fail at position j, where should j jump to continue".</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Definition of next[]</h3>
<p>For pattern P, <code>next[i]</code> = length of longest "proper prefix that is also a proper suffix" of P[0..i].</p>
<p>"Proper prefix" excludes the full string. Same for proper suffix.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Hand calc: P = "ABABABC"</h3>
<table style="width:100%;border-collapse:collapse;font-size:13px;margin:6px 0;">
  <tr style="border-bottom:1px solid var(--border);"><th style="text-align:left;padding:4px 8px;">i</th><th style="text-align:left;padding:4px 8px;">P[0..i]</th><th style="text-align:left;padding:4px 8px;">Longest prefix==suffix</th><th style="text-align:left;padding:4px 8px;">next[i]</th></tr>
  <tr><td style="padding:4px 8px;">0</td><td style="padding:4px 8px;">A</td><td style="padding:4px 8px;">—</td><td style="padding:4px 8px;">0</td></tr>
  <tr><td style="padding:4px 8px;">1</td><td style="padding:4px 8px;">AB</td><td style="padding:4px 8px;">—</td><td style="padding:4px 8px;">0</td></tr>
  <tr><td style="padding:4px 8px;">2</td><td style="padding:4px 8px;">ABA</td><td style="padding:4px 8px;">A</td><td style="padding:4px 8px;">1</td></tr>
  <tr><td style="padding:4px 8px;">3</td><td style="padding:4px 8px;">ABAB</td><td style="padding:4px 8px;">AB</td><td style="padding:4px 8px;">2</td></tr>
  <tr><td style="padding:4px 8px;">4</td><td style="padding:4px 8px;">ABABA</td><td style="padding:4px 8px;">ABA</td><td style="padding:4px 8px;">3</td></tr>
  <tr><td style="padding:4px 8px;">5</td><td style="padding:4px 8px;">ABABAB</td><td style="padding:4px 8px;">ABAB</td><td style="padding:4px 8px;">4</td></tr>
  <tr><td style="padding:4px 8px;">6</td><td style="padding:4px 8px;">ABABABC</td><td style="padding:4px 8px;">—</td><td style="padding:4px 8px;">0</td></tr>
</table>
<h3 style="margin:14px 0 6px;font-size:14px;">Construction (O(m))</h3>
<pre><code>void compute_next(const char *p, int m, int *next) {
    next[0] = 0;
    int k = 0;                  // length of currently-matched prefix
    for (int i = 1; i &lt; m; i++) {
        while (k &gt; 0 &amp;&amp; p[i] != p[k]) k = next[k - 1];
        if (p[i] == p[k]) k++;
        next[i] = k;
    }
}</code></pre>
<p>This essentially runs KMP on the pattern <strong>against itself</strong> — using earlier next values to skip back on failure. Overall still O(m).</p>
<p>This lesson builds next[] alone; the next lesson uses it for matching.</p>

@@task:zh
实现 <code>compute_next(p, m, next)</code>。对几个模式串构造并打印它的 next[]：
<pre><code>"ABABABC"   → 0 0 1 2 3 4 0
"AAAAA"     → 0 1 2 3 4
"ABCDE"     → 0 0 0 0 0
"AABAACAABAA" → 0 1 0 1 2 0 1 2 3 4 5</code></pre>
按下面格式输出：
<pre><code>ABABABC: 0 0 1 2 3 4 0
AAAAA: 0 1 2 3 4
ABCDE: 0 0 0 0 0
AABAACAABAA: 0 1 0 1 2 0 1 2 3 4 5</code></pre>

@@task:en
Implement <code>compute_next(p, m, next)</code>. Build next[] for several patterns and print:
<pre><code>"ABABABC"   → 0 0 1 2 3 4 0
"AAAAA"     → 0 1 2 3 4
"ABCDE"     → 0 0 0 0 0
"AABAACAABAA" → 0 1 0 1 2 0 1 2 3 4 5</code></pre>
Output:
<pre><code>ABABABC: 0 0 1 2 3 4 0
AAAAA: 0 1 2 3 4
ABCDE: 0 0 0 0 0
AABAACAABAA: 0 1 0 1 2 0 1 2 3 4 5</code></pre>

@@hint:zh
照模板抄。注意三个细节：
① <code>next[0]</code> 总是 0；
② <code>k = 0</code> 起步；
③ while 里用 <code>k = next[k-1]</code> 反向跳，<strong>不是 k--</strong>。

@@hint:en
Copy the template. Three details:
① <code>next[0]</code> is always 0;
② start with <code>k = 0</code>;
③ inside while, jump back with <code>k = next[k-1]</code>, <strong>not k--</strong>.

@@starter
#include <stdio.h>
#include <string.h>

void compute_next(const char *p, int m, int *next) {
    // TODO
}

void print_next(const char *p) {
    int m = (int)strlen(p);
    int next[256];
    compute_next(p, m, next);
    printf("%s: ", p);
    for (int i = 0; i < m; i++) {
        printf("%d%s", next[i], i == m - 1 ? "\\n" : " ");
    }
}

int main(void) {
    print_next("ABABABC");
    print_next("AAAAA");
    print_next("ABCDE");
    print_next("AABAACAABAA");
    return 0;
}

@@answer
#include <stdio.h>
#include <string.h>

void compute_next(const char *p, int m, int *next) {
    next[0] = 0;
    int k = 0;
    for (int i = 1; i < m; i++) {
        while (k > 0 && p[i] != p[k]) k = next[k - 1];
        if (p[i] == p[k]) k++;
        next[i] = k;
    }
}

void print_next(const char *p) {
    int m = (int)strlen(p);
    int next[256];
    compute_next(p, m, next);
    printf("%s: ", p);
    for (int i = 0; i < m; i++) {
        printf("%d%s", next[i], i == m - 1 ? "\\n" : " ");
    }
}

int main(void) {
    print_next("ABABABC");
    print_next("AAAAA");
    print_next("ABCDE");
    print_next("AABAACAABAA");
    return 0;
}

@@expectedOutput
ABABABC: 0 0 1 2 3 4 0
AAAAA: 0 1 2 3 4
ABCDE: 0 0 0 0 0
AABAACAABAA: 0 1 0 1 2 0 1 2 3 4 5
`);
