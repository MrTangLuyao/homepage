LEARN.lesson('c-algo', 22, `
@@chapterRef c-algo-tute-2

@@difficulty:zh 进阶
@@difficulty:en Intermediate

@@intro:zh
<p class="lead">把上一节的 next[] 接上主匹配循环，就是完整的 KMP。<strong>i 永不回退，j 用 next[] 跳——总复杂度 O(n + m)。</strong></p>
<h3 style="margin:14px 0 6px;font-size:14px;">为什么朴素匹配慢</h3>
<p>朴素匹配每次失败都把 i 退回起点+1，j 重置为 0：之前已经匹配的前缀全部丢弃。这在 worst case 下是 O(nm)。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">KMP 的核心想法</h3>
<blockquote>失败时<strong>i 永远不回退</strong>，只让 j 跳到 <code>next[j-1]</code>。已经匹配的前缀里"既是前缀又是后缀"的那段可以直接复用。</blockquote>
<h3 style="margin:14px 0 6px;font-size:14px;">完整算法</h3>
<pre><code>int kmp_search(const char *text, const char *pattern) {
    int n = strlen(text), m = strlen(pattern);
    if (m == 0) return 0;
    int next[256];
    compute_next(pattern, m, next);

    int i = 0, j = 0;
    while (i &lt; n) {
        if (text[i] == pattern[j]) {
            i++; j++;
            if (j == m) return i - m;        // 找到，起始位置 i - m
        } else if (j &gt; 0) {
            j = next[j - 1];                  // 关键：i 不动，j 跳
        } else {
            i++;                              // j == 0 已经无路可跳
        }
    }
    return -1;
}</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">复杂度证明</h3>
<ul>
  <li>构造 next[]：O(m)</li>
  <li>主循环：i 永远只能前进；j 每次失败时只会减小，所以 i+j 的总和最多增加 2n 次 → 主匹配 O(n)</li>
  <li>合计 <strong>O(n + m)</strong>，真正的线性时间</li>
</ul>

@@intro:en
<p class="lead">Plug last lesson's next[] into the main matching loop, and you have full KMP. <strong>i never backtracks; j jumps via next[] — total O(n + m).</strong></p>
<h3 style="margin:14px 0 6px;font-size:14px;">Why naive is slow</h3>
<p>Naive on failure resets i to start+1 and j to 0: throws away the previously matched prefix. Worst case O(nm).</p>
<h3 style="margin:14px 0 6px;font-size:14px;">KMP's core idea</h3>
<blockquote>On failure, <strong>i never backtracks</strong>; let j jump to <code>next[j-1]</code>. The "prefix that's also a suffix" part of what we matched can be reused directly.</blockquote>
<h3 style="margin:14px 0 6px;font-size:14px;">Full algorithm</h3>
<pre><code>int kmp_search(const char *text, const char *pattern) {
    int n = strlen(text), m = strlen(pattern);
    if (m == 0) return 0;
    int next[256];
    compute_next(pattern, m, next);

    int i = 0, j = 0;
    while (i &lt; n) {
        if (text[i] == pattern[j]) {
            i++; j++;
            if (j == m) return i - m;
        } else if (j &gt; 0) {
            j = next[j - 1];                  // KEY: i stays, j jumps
        } else {
            i++;                              // j == 0, just advance i
        }
    }
    return -1;
}</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">Complexity proof</h3>
<ul>
  <li>Build next[]: O(m)</li>
  <li>Main loop: i only advances; j only decreases on failure. So i+j increases at most 2n times → main matching O(n)</li>
  <li>Total <strong>O(n + m)</strong> — true linear time</li>
</ul>

@@task:zh
实现完整 KMP（包括 compute_next）。对几个测试用例打印起始位置或 -1：
<pre><code>text = "ABABCABABABCD"
pattern = "ABABC"   → 起始位置 0

text = "ABABCABABABCD"
pattern = "ABABABC" → 起始位置 5

text = "ABABCABABABCD"
pattern = "XYZ"     → -1（不存在）

text = "AABAACAABAA"
pattern = "AABA"    → 起始位置 0</code></pre>
按下面格式输出：
<pre><code>ABABC in ABABCABABABCD: 0
ABABABC in ABABCABABABCD: 5
XYZ in ABABCABABABCD: -1
AABA in AABAACAABAA: 0</code></pre>

@@task:en
Implement full KMP (including compute_next). Print starting position or -1:
<pre><code>text = "ABABCABABABCD"
pattern = "ABABC"   → start at 0
pattern = "ABABABC" → start at 5
pattern = "XYZ"     → -1
text = "AABAACAABAA"
pattern = "AABA"    → start at 0</code></pre>
Output:
<pre><code>ABABC in ABABCABABABCD: 0
ABABABC in ABABCABABABCD: 5
XYZ in ABABCABABABCD: -1
AABA in AABAACAABAA: 0</code></pre>

@@hint:zh
直接照模板抄两个函数。
注意 <code>j == m</code> 时立刻 return 起始位置 = <code>i - m</code>（因为 i 已经 ++ 了）。

@@hint:en
Copy the two template functions directly.
When <code>j == m</code>, return start = <code>i - m</code> immediately (i has already been ++'d).

@@starter
#include <stdio.h>
#include <string.h>

void compute_next(const char *p, int m, int *next) {
    // TODO（来自第 21 节）
}

int kmp_search(const char *text, const char *pattern) {
    // TODO
    return -1;
}

int main(void) {
    printf("ABABC in ABABCABABABCD: %d\\n",   kmp_search("ABABCABABABCD", "ABABC"));
    printf("ABABABC in ABABCABABABCD: %d\\n", kmp_search("ABABCABABABCD", "ABABABC"));
    printf("XYZ in ABABCABABABCD: %d\\n",     kmp_search("ABABCABABABCD", "XYZ"));
    printf("AABA in AABAACAABAA: %d\\n",      kmp_search("AABAACAABAA", "AABA"));
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

int kmp_search(const char *text, const char *pattern) {
    int n = strlen(text), m = strlen(pattern);
    if (m == 0) return 0;
    int next[256];
    compute_next(pattern, m, next);

    int i = 0, j = 0;
    while (i < n) {
        if (text[i] == pattern[j]) {
            i++; j++;
            if (j == m) return i - m;
        } else if (j > 0) {
            j = next[j - 1];
        } else {
            i++;
        }
    }
    return -1;
}

int main(void) {
    printf("ABABC in ABABCABABABCD: %d\\n",   kmp_search("ABABCABABABCD", "ABABC"));
    printf("ABABABC in ABABCABABABCD: %d\\n", kmp_search("ABABCABABABCD", "ABABABC"));
    printf("XYZ in ABABCABABABCD: %d\\n",     kmp_search("ABABCABABABCD", "XYZ"));
    printf("AABA in AABAACAABAA: %d\\n",      kmp_search("AABAACAABAA", "AABA"));
    return 0;
}

@@expectedOutput
ABABC in ABABCABABABCD: 0
ABABABC in ABABCABABABCD: 5
XYZ in ABABCABABABCD: -1
AABA in AABAACAABAA: 0
`);
