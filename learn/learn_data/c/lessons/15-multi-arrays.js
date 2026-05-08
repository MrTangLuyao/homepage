LEARN.lesson('c', 15, `
@@chapterRef c-multi-dimensional-arrays

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead">二维数组就是"数组的数组" —— 直觉上的"行 × 列"矩阵。</p>
<pre><code>int m[3][4];                          // 3 行 4 列的 int
int g[2][3] = { {1,2,3}, {4,5,6} };  // 声明 + 初始化</code></pre>
<p>访问 <code>m[i][j]</code>，<code>i</code> 行，<code>j</code> 列。两边下标都从 0 开始。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">内存其实是一维的（行主序）</h3>
<p>C 把二维数组按<strong>行</strong>顺序铺平在内存里：先放第 0 行所有元素，再第 1 行……所以 <code>m[1][2]</code> 实际是地址 <code>&amp;m[0][0] + (1*4 + 2)</code>。</p>
<p>这个布局影响性能 —— 遍历时<strong>外层 i 内层 j</strong>是顺序访问内存（cache 友好）；反过来 <code>外层 j 内层 i</code> 在大数组上慢得多。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">遍历模式</h3>
<pre><code>for (int i = 0; i &lt; rows; i++) {
    for (int j = 0; j &lt; cols; j++) {
        printf("%d ", m[i][j]);
    }
    printf("\\n");
}</code></pre>

@@intro:en
<p class="lead">A 2D array is "an array of arrays" — the intuitive row × column matrix.</p>
<pre><code>int m[3][4];                          // 3-row, 4-col int matrix
int g[2][3] = { {1,2,3}, {4,5,6} };  // declare + init</code></pre>
<p>Access <code>m[i][j]</code>: <code>i</code> = row, <code>j</code> = column. Both 0-indexed.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Memory is actually 1D (row-major)</h3>
<p>C lays out 2D arrays in <strong>row-major</strong> order: all of row 0 first, then row 1, etc. So <code>m[1][2]</code> is at address <code>&amp;m[0][0] + (1*4 + 2)</code>.</p>
<p>This layout matters for perf — iterating <strong>i outer, j inner</strong> walks memory sequentially (cache-friendly); reversing the loops is much slower on large arrays.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Iteration</h3>
<pre><code>for (int i = 0; i &lt; rows; i++) {
    for (int j = 0; j &lt; cols; j++) {
        printf("%d ", m[i][j]);
    }
    printf("\\n");
}</code></pre>

@@task:zh
给定 3×3 矩阵：
<pre><code>int m[3][3] = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};</code></pre>
<p>打印矩阵，然后另起一行打印<strong>主对角线之和</strong>（m[0][0]+m[1][1]+m[2][2]）：</p>
<pre><code>1 2 3
4 5 6
7 8 9
diagonal sum: 15</code></pre>

@@task:en
Given 3×3 matrix:
<pre><code>int m[3][3] = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};</code></pre>
<p>Print it, then on a new line print the <strong>main diagonal sum</strong> (m[0][0]+m[1][1]+m[2][2]):</p>
<pre><code>1 2 3
4 5 6
7 8 9
diagonal sum: 15</code></pre>

@@hint:zh
矩阵打印用嵌套 for；对角线只需 i==j 时累加。注意每行末尾不要多余空格。

@@hint:en
Use nested for to print the matrix; the diagonal sum just needs i==j. Avoid trailing spaces on each line.

@@starter
#include <stdio.h>

int main(void) {
    int m[3][3] = {{1,2,3},{4,5,6},{7,8,9}};
    // 打印矩阵 + 对角线和

    return 0;
}

@@answer
#include <stdio.h>

int main(void) {
    int m[3][3] = {{1,2,3},{4,5,6},{7,8,9}};
    int sum = 0;
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            if (j > 0) printf(" ");
            printf("%d", m[i][j]);
        }
        printf("\\n");
        sum += m[i][i];
    }
    printf("diagonal sum: %d\\n", sum);
    return 0;
}

@@expectedOutput
1 2 3
4 5 6
7 8 9
diagonal sum: 15
`);
