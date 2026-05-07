LEARN.lesson('python', 43, `
@@chapterRef python-tute-3
@@difficulty:zh 进阶
@@difficulty:en Advanced
@@intro:zh
<p class="lead">列表推导式（list comprehension）是 Python 里一行生成列表的简洁写法，本质上是 for 循环的压缩形式：</p>
<p>语法：<code>[<em>表达式</em> for <em>变量</em> in <em>可迭代对象</em>]</code></p>
<pre><code># 等价的 for 循环写法
squares = []
for i in range(1, 6):
    squares.append(i ** 2)

# 推导式写法（一行，更 Pythonic）
squares = [i ** 2 for i in range(1, 6)]
print(squares)   # [1, 4, 9, 16, 25]</code></pre>
<p>推导式可以对任意可迭代对象使用，也可以对元素做任意变换：</p>
<pre><code>nums   = [1, 2, 3, 4, 5]
doubled = [n * 2 for n in nums]     # [2, 4, 6, 8, 10]
strs    = [str(n) for n in nums]    # ['1', '2', '3', '4', '5']
words   = ["hello", "world"]
upper   = [w.upper() for w in words]  # ['HELLO', 'WORLD']</code></pre>
<p><strong>何时用推导式，何时用普通 for</strong>：推导式只适合"把每个元素变换成另一个值，生成新列表"这一类操作。如果循环体有多行逻辑、多个变量修改、或者有副作用（比如 <code>print</code>），就用普通 for。</p>
@@intro:en
<p class="lead">A list comprehension is Python's concise one-line way to build a list — essentially a compressed for loop:</p>
<p>Syntax: <code>[<em>expression</em> for <em>variable</em> in <em>iterable</em>]</code></p>
<pre><code># equivalent for-loop version
squares = []
for i in range(1, 6):
    squares.append(i ** 2)

# comprehension version (one line, more Pythonic)
squares = [i ** 2 for i in range(1, 6)]
print(squares)   # [1, 4, 9, 16, 25]</code></pre>
<p>Comprehensions work on any iterable and can apply any transformation to each element:</p>
<pre><code>nums   = [1, 2, 3, 4, 5]
doubled = [n * 2 for n in nums]      # [2, 4, 6, 8, 10]
strs    = [str(n) for n in nums]     # ['1', '2', '3', '4', '5']
words   = ["hello", "world"]
upper   = [w.upper() for w in words] # ['HELLO', 'WORLD']</code></pre>
<p><strong>When to use a comprehension vs a regular for loop</strong>: use a comprehension for "transform each element, produce a new list." If the loop body has multi-line logic, modifies multiple variables, or has side effects (like <code>print</code>), use a regular for loop instead.</p>
@@task:zh 用列表推导式生成 1 到 10 每个数的平方，输出该列表
@@task:en Use a list comprehension to generate the square of every number from 1 to 10, then print the list
@@hint:zh [i ** 2 for i in range(1, 11)]。
@@hint:en [i ** 2 for i in range(1, 11)].
@@starter:zh
# 列表推导式：1~10 的平方

@@starter:en
# list comprehension: squares of 1 to 10

@@answer
squares = [i ** 2 for i in range(1, 11)]
print(squares)

@@expectedOutput
[1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
`);
