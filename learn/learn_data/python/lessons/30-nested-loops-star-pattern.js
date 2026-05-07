LEARN.lesson('python', 30, `
@@chapterRef python-tute-2
@@difficulty:zh 初级
@@difficulty:en Elementary
@@intro:zh
<p class="lead">把一个循环放在另一个循环内部，叫做<strong>嵌套循环</strong>。外层每执行一次，内层会<strong>完整运行一遍</strong>：</p>
<pre><code>for i in range(1, 4):       # 外层：i = 1, 2, 3
    for j in range(1, 4):   # 内层：j = 1, 2, 3（每次外层迭代都重新从头跑）
        print(i * j, end=" ")
    print()   # 每行结束换行</code></pre>
<p>输出（3×3 乘法表）：</p>
<pre><code>1 2 3
2 4 6
3 6 9</code></pre>
<p>总共执行了 3 × 3 = 9 次内层循环体。一般地，外层 n 次 × 内层 m 次 = 共 n×m 次。</p>
<p>字符串乘法技巧：<code>"*" * n</code> 生成 n 个星号的字符串，常用于画图案：</p>
<pre><code>for i in range(1, 5):
    print("*" * i)
# *
# **
# ***
# ****</code></pre>
@@intro:en
<p class="lead">Placing one loop inside another creates a <strong>nested loop</strong>. Each outer iteration runs the inner loop <strong>completely from start to finish</strong>:</p>
<pre><code>for i in range(1, 4):       # outer: i = 1, 2, 3
    for j in range(1, 4):   # inner: j = 1, 2, 3 (restarts each outer iteration)
        print(i * j, end=" ")
    print()   # newline after each row</code></pre>
<p>Output (3×3 multiplication table):</p>
<pre><code>1 2 3
2 4 6
3 6 9</code></pre>
<p>The inner body ran 3 × 3 = 9 times. In general: outer n times × inner m times = n×m total executions.</p>
<p>String multiplication trick: <code>"*" * n</code> creates a string of n asterisks — handy for drawing patterns:</p>
<pre><code>for i in range(1, 5):
    print("*" * i)
# *
# **
# ***
# ****</code></pre>
@@task:zh 打印一个高度为 4 的直角三角形，第 i 行有 i 个星号
@@task:en Print a right triangle of height 4 — row i contains i asterisks
@@hint:zh <code>print("*" * i)</code> 可以输出 i 个星号。
@@hint:en <code>print("*" * i)</code> prints i asterisks.
@@starter:zh
# 打印高度为 4 的星形三角形

@@starter:en
# print star triangle of height 4

@@answer
for i in range(1, 5):
    print("*" * i)

@@expectedOutput
*
**
***
****
`);
