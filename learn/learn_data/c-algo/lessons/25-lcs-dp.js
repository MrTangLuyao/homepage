LEARN.lesson('c-algo', 25, `
@@chapterRef c-algo-tute-3

@@difficulty:zh 进阶
@@difficulty:en Intermediate

@@intro:zh
<p class="lead">动态规划（DP）的核心思想：<strong>每个子问题只算一次，结果存起来</strong>。这一节用 LCS 这个经典问题练习 DP 的"找状态 + 找转移"思维。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">问题：最长公共子序列（LCS）</h3>
<p>给两个字符串 X 和 Y，找最长的<strong>子序列</strong>（不要求连续，但要保持顺序）使它同时是 X 和 Y 的子序列。</p>
<p>例：X = "ABCBDAB"，Y = "BDCAB"。LCS 是 "BCAB" 或 "BDAB"，长度 4。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">为什么不能贪心？</h3>
<p>"先匹配最早的相同字符然后继续"听起来像贪心，但会错过更优解。LCS 必须考虑所有<strong>子问题</strong>—— DP 适用。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">状态 + 转移方程</h3>
<p><strong>状态</strong>：<code>dp[i][j]</code> = X 的前 i 个字符和 Y 的前 j 个字符的 LCS 长度。</p>
<p><strong>转移</strong>：</p>
<pre><code>if (X[i-1] == Y[j-1])
    dp[i][j] = dp[i-1][j-1] + 1            // 字符相同：把它加进 LCS
else
    dp[i][j] = max(dp[i-1][j], dp[i][j-1]) // 字符不同：哪边大用哪边

base: dp[0][*] = dp[*][0] = 0</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">填表（自底向上）</h3>
<pre><code>int lcs(const char *X, const char *Y) {
    int m = strlen(X), n = strlen(Y);
    int dp[m + 1][n + 1];
    for (int i = 0; i &lt;= m; i++) dp[i][0] = 0;
    for (int j = 0; j &lt;= n; j++) dp[0][j] = 0;
    for (int i = 1; i &lt;= m; i++) {
        for (int j = 1; j &lt;= n; j++) {
            if (X[i - 1] == Y[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                int up = dp[i - 1][j], left = dp[i][j - 1];
                dp[i][j] = up &gt; left ? up : left;
            }
        }
    }
    return dp[m][n];
}</code></pre>
<p>时间 O(mn)，空间 O(mn)。这一节我们只求长度，不重建 LCS 字符串本身。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">五步法套用到 LCS</h3>
<ol>
  <li>状态：dp[i][j] = X[0..i-1] 和 Y[0..j-1] 的 LCS 长度</li>
  <li>转移：见上</li>
  <li>base case：dp[0][*] = dp[*][0] = 0</li>
  <li>填表顺序：i 从 0 到 m，j 从 0 到 n（每个 dp[i][j] 依赖左、上、左上）</li>
  <li>构造解（本题省略，直接返回 dp[m][n]）</li>
</ol>

@@intro:en
<p class="lead">DP's core idea: <strong>each subproblem is computed once and cached</strong>. This lesson uses LCS to drill the "find state + find transition" mindset.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Problem: Longest Common Subsequence (LCS)</h3>
<p>Given strings X and Y, find the longest <strong>subsequence</strong> (not contiguous, but in order) that's a subsequence of both.</p>
<p>Example: X = "ABCBDAB", Y = "BDCAB". LCS = "BCAB" or "BDAB", length 4.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Why not greedy?</h3>
<p>"Match earliest equal char, continue" sounds greedy but misses better solutions. LCS must consider all <strong>subproblems</strong> — DP applies.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">State + transition</h3>
<p><strong>State</strong>: <code>dp[i][j]</code> = LCS length of X's first i chars and Y's first j chars.</p>
<p><strong>Transition</strong>:</p>
<pre><code>if (X[i-1] == Y[j-1])
    dp[i][j] = dp[i-1][j-1] + 1            // chars match: extend LCS
else
    dp[i][j] = max(dp[i-1][j], dp[i][j-1]) // chars differ: take the better

base: dp[0][*] = dp[*][0] = 0</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">Bottom-up table fill</h3>
<pre><code>int lcs(const char *X, const char *Y) {
    int m = strlen(X), n = strlen(Y);
    int dp[m + 1][n + 1];
    for (int i = 0; i &lt;= m; i++) dp[i][0] = 0;
    for (int j = 0; j &lt;= n; j++) dp[0][j] = 0;
    for (int i = 1; i &lt;= m; i++) {
        for (int j = 1; j &lt;= n; j++) {
            if (X[i - 1] == Y[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                int up = dp[i - 1][j], left = dp[i][j - 1];
                dp[i][j] = up &gt; left ? up : left;
            }
        }
    }
    return dp[m][n];
}</code></pre>
<p>Time O(mn), space O(mn). This lesson returns just the length; reconstructing the LCS string itself is left to a later lesson.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Five-step recipe applied to LCS</h3>
<ol>
  <li>State: dp[i][j] = LCS length of X[0..i-1] and Y[0..j-1]</li>
  <li>Transition: above</li>
  <li>Base: dp[0][*] = dp[*][0] = 0</li>
  <li>Fill order: i 0 to m, j 0 to n (each dp[i][j] depends on left, up, up-left)</li>
  <li>Reconstruct (skipped here, just return dp[m][n])</li>
</ol>

@@task:zh
实现 <code>int lcs(const char *X, const char *Y)</code>，对几对字符串打印 LCS 长度：
<pre><code>X = "ABCBDAB", Y = "BDCAB"   → 4
X = "AGGTAB",  Y = "GXTXAYB"  → 4
X = "ABC",     Y = "DEF"      → 0
X = "HELLO",   Y = "HELLO"    → 5</code></pre>
按下面格式输出：
<pre><code>LCS(ABCBDAB, BDCAB) = 4
LCS(AGGTAB, GXTXAYB) = 4
LCS(ABC, DEF) = 0
LCS(HELLO, HELLO) = 5</code></pre>

@@task:en
Implement <code>int lcs(const char *X, const char *Y)</code>, print LCS length for these pairs:
<pre><code>X = "ABCBDAB", Y = "BDCAB"   → 4
X = "AGGTAB",  Y = "GXTXAYB"  → 4
X = "ABC",     Y = "DEF"      → 0
X = "HELLO",   Y = "HELLO"    → 5</code></pre>
Output:
<pre><code>LCS(ABCBDAB, BDCAB) = 4
LCS(AGGTAB, GXTXAYB) = 4
LCS(ABC, DEF) = 0
LCS(HELLO, HELLO) = 5</code></pre>

@@hint:zh
C99 支持 <code>int dp[m + 1][n + 1];</code> 这种 VLA 写法，emcc 也支持。
注意 <code>X[i - 1]</code> 和 <code>Y[j - 1]</code> 的下标减 1——dp 的 i, j 是"前几个字符"的长度，比字符串下标多 1。

@@hint:en
C99 supports <code>int dp[m + 1][n + 1];</code> VLA syntax (and emcc allows it).
Watch the indexing: <code>X[i - 1]</code> and <code>Y[j - 1]</code> — dp's i, j are "how many prefix chars", one more than the string index.

@@starter
#include <stdio.h>
#include <string.h>

int lcs(const char *X, const char *Y) {
    // TODO
    return 0;
}

int main(void) {
    printf("LCS(ABCBDAB, BDCAB) = %d\\n",   lcs("ABCBDAB",   "BDCAB"));
    printf("LCS(AGGTAB, GXTXAYB) = %d\\n",  lcs("AGGTAB",    "GXTXAYB"));
    printf("LCS(ABC, DEF) = %d\\n",         lcs("ABC",       "DEF"));
    printf("LCS(HELLO, HELLO) = %d\\n",     lcs("HELLO",     "HELLO"));
    return 0;
}

@@answer
#include <stdio.h>
#include <string.h>

int lcs(const char *X, const char *Y) {
    int m = (int)strlen(X), n = (int)strlen(Y);
    int dp[m + 1][n + 1];
    for (int i = 0; i <= m; i++) dp[i][0] = 0;
    for (int j = 0; j <= n; j++) dp[0][j] = 0;
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (X[i - 1] == Y[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                int up = dp[i - 1][j], left = dp[i][j - 1];
                dp[i][j] = up > left ? up : left;
            }
        }
    }
    return dp[m][n];
}

int main(void) {
    printf("LCS(ABCBDAB, BDCAB) = %d\\n",   lcs("ABCBDAB",   "BDCAB"));
    printf("LCS(AGGTAB, GXTXAYB) = %d\\n",  lcs("AGGTAB",    "GXTXAYB"));
    printf("LCS(ABC, DEF) = %d\\n",         lcs("ABC",       "DEF"));
    printf("LCS(HELLO, HELLO) = %d\\n",     lcs("HELLO",     "HELLO"));
    return 0;
}

@@expectedOutput
LCS(ABCBDAB, BDCAB) = 4
LCS(AGGTAB, GXTXAYB) = 4
LCS(ABC, DEF) = 0
LCS(HELLO, HELLO) = 5
`);
