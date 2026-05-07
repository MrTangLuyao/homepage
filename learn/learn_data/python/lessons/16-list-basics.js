LEARN.lesson('python', 16, `
@@chapterRef python-tute-1
@@difficulty:zh 入门
@@difficulty:en Beginner
@@intro:zh
<p class="lead">列表（<code>list</code>）是有序、可变的序列，用方括号 <code>[]</code> 创建，元素之间用逗号分隔。列表可以存放任意类型的数据，甚至混合类型：</p>
<pre><code>fruits  = ["apple", "banana", "cherry"]   # 字符串列表
nums    = [10, 20, 30, 40]                # 数字列表
mixed   = [1, "hello", True, 3.14]        # 混合类型
empty   = []                              # 空列表</code></pre>
<p>索引和切片与字符串完全一样（正向从 0 开始，负向从 -1 开始）：</p>
<pre><code>fruits = ["apple", "banana", "cherry"]
print(fruits[0])     # apple   ← 第一个
print(fruits[-1])    # cherry  ← 最后一个
print(fruits[1:3])   # ['banana', 'cherry']  ← 切片
print(len(fruits))   # 3</code></pre>
<p>可以用 <code>in</code> 检查某元素是否在列表中：</p>
<pre><code>print("apple" in fruits)    # True
print("mango" in fruits)    # False</code></pre>
@@intro:en
<p class="lead">A list is an ordered, mutable sequence created with square brackets <code>[]</code>, elements separated by commas. Lists can hold any type — even mixed types:</p>
<pre><code>fruits  = ["apple", "banana", "cherry"]   # strings
nums    = [10, 20, 30, 40]                # numbers
mixed   = [1, "hello", True, 3.14]        # mixed types
empty   = []                              # empty list</code></pre>
<p>Indexing and slicing work exactly like strings (forward from 0, backward from -1):</p>
<pre><code>fruits = ["apple", "banana", "cherry"]
print(fruits[0])     # apple    ← first element
print(fruits[-1])    # cherry   ← last element
print(fruits[1:3])   # ['banana', 'cherry']  ← slice
print(len(fruits))   # 3</code></pre>
<p>Use <code>in</code> to check membership:</p>
<pre><code>print("apple" in fruits)    # True
print("mango" in fruits)    # False</code></pre>
@@task:zh <code>colors = ["red", "green", "blue"]</code>，分三行输出：第一个、最后一个、列表长度
@@task:en
Given <code>colors = ["red", "green", "blue"]</code>, print three lines: the first element, the last element, and the length
@@hint:zh colors[0]、colors[-1]、len(colors)。
@@hint:en colors[0], colors[-1], len(colors).
@@starter:zh
colors = ["red", "green", "blue"]

@@starter:en
colors = ["red", "green", "blue"]

@@answer
colors = ["red", "green", "blue"]
print(colors[0])
print(colors[-1])
print(len(colors))

@@expectedOutput
red
blue
3
`);
