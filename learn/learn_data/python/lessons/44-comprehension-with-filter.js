LEARN.lesson('python', 44, `
@@chapterRef python-tute-3
@@difficulty:zh 进阶
@@difficulty:en Advanced
@@intro:zh
<p class="lead">在推导式末尾加 <code>if 条件</code>，只有满足条件的元素才会被保留进新列表：</p>
<p>语法：<code>[<em>表达式</em> for <em>变量</em> in <em>可迭代对象</em> if <em>条件</em>]</code></p>
<pre><code># 等价的 for 循环
result = []
for i in range(1, 11):
    if i % 2 == 0:
        result.append(i ** 2)

# 带过滤的推导式
even_sq = [i ** 2 for i in range(1, 11) if i % 2 == 0]
print(even_sq)   # [4, 16, 36, 64, 100]</code></pre>
<p>过滤和变换可以独立控制——过滤条件决定"选不选"，表达式决定"选进来的元素如何变换"：</p>
<pre><code>words = ["apple", "fig", "banana", "kiwi", "cherry"]

# 只保留长度 > 4 的单词，并转大写
long = [w.upper() for w in words if len(w) > 4]
print(long)   # ['APPLE', 'BANANA', 'CHERRY']

# 只过滤，不变换（恒等变换）
short = [w for w in words if len(w) <= 4]
print(short)  # ['fig', 'kiwi']</code></pre>
<p>还可以组合两个条件（用 <code>and</code> / <code>or</code>）：</p>
<pre><code>[i for i in range(1, 31) if i % 2 == 0 and i % 3 == 0]
# 被 2 和 3 整除 = 被 6 整除：[6, 12, 18, 24, 30]</code></pre>
@@intro:en
<p class="lead">Add <code>if condition</code> at the end of a comprehension to keep only elements that pass the filter:</p>
<p>Syntax: <code>[<em>expression</em> for <em>variable</em> in <em>iterable</em> if <em>condition</em>]</code></p>
<pre><code># equivalent for loop
result = []
for i in range(1, 11):
    if i % 2 == 0:
        result.append(i ** 2)

# comprehension with filter
even_sq = [i ** 2 for i in range(1, 11) if i % 2 == 0]
print(even_sq)   # [4, 16, 36, 64, 100]</code></pre>
<p>The filter and the transformation are independent — the condition decides "include or not," the expression decides "how to transform what's included":</p>
<pre><code>words = ["apple", "fig", "banana", "kiwi", "cherry"]

# keep words longer than 4 characters, uppercased
long = [w.upper() for w in words if len(w) > 4]
print(long)   # ['APPLE', 'BANANA', 'CHERRY']

# filter only, no transformation
short = [w for w in words if len(w) <= 4]
print(short)  # ['fig', 'kiwi']</code></pre>
<p>Combine conditions with <code>and</code> / <code>or</code>:</p>
<pre><code>[i for i in range(1, 31) if i % 2 == 0 and i % 3 == 0]
# divisible by both 2 and 3 → divisible by 6: [6, 12, 18, 24, 30]</code></pre>
@@task:zh 用带条件的列表推导式，从 1 到 20 中取出所有能被 3 整除的数，输出该列表
@@task:en Use a list comprehension with a filter to collect all numbers from 1 to 20 that are divisible by 3, then print the list
@@hint:zh [i for i in range(1, 21) if i % 3 == 0]。
@@hint:en [i for i in range(1, 21) if i % 3 == 0].
@@starter:zh
# 带过滤的列表推导式

@@starter:en
# list comprehension with filter

@@answer
result = [i for i in range(1, 21) if i % 3 == 0]
print(result)

@@expectedOutput
[3, 6, 9, 12, 15, 18]
`);
