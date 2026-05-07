LEARN.lesson('python', 28, `
@@chapterRef python-tute-2
@@difficulty:zh 入门
@@difficulty:en Beginner
@@intro:zh
<p class="lead"><code>for</code> 逐个遍历序列中的每个元素；<code>range()</code> 生成一段整数序列，专为 <code>for</code> 设计：</p>
<table><thead><tr><th>写法</th><th>生成的数列</th></tr></thead><tbody>
<tr><td><code>range(5)</code></td><td>0, 1, 2, 3, 4（从 0 到 stop-1）</td></tr>
<tr><td><code>range(1, 6)</code></td><td>1, 2, 3, 4, 5（从 start 到 stop-1）</td></tr>
<tr><td><code>range(0, 10, 2)</code></td><td>0, 2, 4, 6, 8（步长为 2）</td></tr>
<tr><td><code>range(5, 0, -1)</code></td><td>5, 4, 3, 2, 1（倒数，步长为 -1）</td></tr>
</tbody></table>
<pre><code>for i in range(5):
    print(i, end=" ")    # 0 1 2 3 4

for i in range(5, 0, -1):
    print(i, end=" ")    # 5 4 3 2 1</code></pre>
<p><code>for</code> 也可以直接遍历字符串：</p>
<pre><code>for ch in "abc":
    print(ch)    # a  b  c（各占一行）</code></pre>
<p><strong>for vs while</strong>：次数固定时用 <code>for</code>；需要按条件决定何时停止时用 <code>while</code>。</p>
@@intro:en
<p class="lead"><code>for</code> visits each element of a sequence in order; <code>range()</code> generates integer sequences, designed for use with <code>for</code>:</p>
<table><thead><tr><th>Syntax</th><th>Generates</th></tr></thead><tbody>
<tr><td><code>range(5)</code></td><td>0, 1, 2, 3, 4 (0 to stop-1)</td></tr>
<tr><td><code>range(1, 6)</code></td><td>1, 2, 3, 4, 5 (start to stop-1)</td></tr>
<tr><td><code>range(0, 10, 2)</code></td><td>0, 2, 4, 6, 8 (step of 2)</td></tr>
<tr><td><code>range(5, 0, -1)</code></td><td>5, 4, 3, 2, 1 (countdown, step -1)</td></tr>
</tbody></table>
<pre><code>for i in range(5):
    print(i, end=" ")    # 0 1 2 3 4

for i in range(5, 0, -1):
    print(i, end=" ")    # 5 4 3 2 1</code></pre>
<p><code>for</code> can also iterate directly over a string:</p>
<pre><code>for ch in "abc":
    print(ch)    # a  b  c (one per line)</code></pre>
<p><strong>for vs while</strong>: use <code>for</code> when the number of iterations is known; use <code>while</code> when you need a condition to decide when to stop.</p>
@@task:zh 用 for + range() 输出 0 到 10 之间的偶数（含 0 和 10），每行一个
@@task:en Use for + range() to print the even numbers from 0 to 10 inclusive, one per line
@@hint:zh range(0, 11, 2) 生成 0, 2, 4, 6, 8, 10。
@@hint:en range(0, 11, 2) generates 0, 2, 4, 6, 8, 10.
@@starter:zh
# 输出 0 到 10 的偶数

@@starter:en
# print even numbers 0 to 10

@@answer
for i in range(0, 11, 2):
    print(i)

@@expectedOutput
0
2
4
6
8
10
`);
