LEARN.lesson('python', 38, `
@@chapterRef python-tute-2
@@difficulty:zh 初级
@@difficulty:en Elementary
@@intro:zh
<p class="lead">遍历列表时如果同时需要索引和元素，不要用 <code>range(len(lst))</code>——Python 提供了更优雅的 <code>enumerate()</code>：</p>
<pre><code># 老写法（不推荐）
fruits = ["apple", "banana", "cherry"]
for i in range(len(fruits)):
    print(i, fruits[i])

# Pythonic 写法（推荐）
for i, fruit in enumerate(fruits):
    print(i, fruit)
# 0 apple
# 1 banana
# 2 cherry</code></pre>
<p><code>enumerate()</code> 返回 <code>(index, value)</code> 元组，用两个变量接收（元组解包）。第二个参数可以指定起始编号：</p>
<pre><code>for i, fruit in enumerate(fruits, 1):   # 从 1 开始编号
    print(f"{i}. {fruit}")
# 1. apple
# 2. banana
# 3. cherry</code></pre>
<p>如果只需要索引，仍然用 <code>range(len(...))</code>；如果索引和值都需要，就用 <code>enumerate()</code>。</p>
@@intro:en
<p class="lead">When you need both the index and the element while iterating, don't use <code>range(len(lst))</code> — Python has the cleaner <code>enumerate()</code>:</p>
<pre><code># old-style (not recommended)
fruits = ["apple", "banana", "cherry"]
for i in range(len(fruits)):
    print(i, fruits[i])

# Pythonic way (recommended)
for i, fruit in enumerate(fruits):
    print(i, fruit)
# 0 apple
# 1 banana
# 2 cherry</code></pre>
<p><code>enumerate()</code> yields <code>(index, value)</code> tuples; use two variables to unpack them (tuple unpacking). The optional second argument sets the starting number:</p>
<pre><code>for i, fruit in enumerate(fruits, 1):   # start numbering at 1
    print(f"{i}. {fruit}")
# 1. apple
# 2. banana
# 3. cherry</code></pre>
<p>If you only need the index, <code>range(len(...))</code> is still fine; when you need both index and value, always prefer <code>enumerate()</code>.</p>
@@task:zh
<code>fruits = ["banana", "apple", "cherry"]</code>，先排序再用 <code>enumerate</code> 从 1 开始编号，输出 <code>1. apple</code>、<code>2. banana</code>、<code>3. cherry</code>
@@task:en
Given <code>fruits = ["banana", "apple", "cherry"]</code>, sort first then use <code>enumerate</code> starting at 1 to print <code>1. apple</code>, <code>2. banana</code>, <code>3. cherry</code>
@@hint:zh sorted(fruits) 排序，enumerate(..., 1) 从 1 编号。
@@hint:en sorted(fruits) to sort, enumerate(..., 1) to start at 1.
@@starter:zh
fruits = ["banana", "apple", "cherry"]

@@starter:en
fruits = ["banana", "apple", "cherry"]

@@answer
fruits = ["banana", "apple", "cherry"]
for i, fruit in enumerate(sorted(fruits), 1):
    print(f"{i}. {fruit}")

@@expectedOutput
1. apple
2. banana
3. cherry
`);
