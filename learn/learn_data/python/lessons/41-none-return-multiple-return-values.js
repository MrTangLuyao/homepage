LEARN.lesson('python', 41, `
@@chapterRef python-tute-3
@@difficulty:zh 进阶
@@difficulty:en Advanced
@@intro:zh
<p class="lead">没有 <code>return</code> 语句（或只写 <code>return</code> 不带值）的函数自动返回 <code>None</code>，<code>None</code> 是 Python 里表示"什么都没有"的特殊值：</p>
<pre><code>def greet(name):
    print(f"Hello, {name}!")   # 有副作用，但不返回任何值

result = greet("Alice")    # Hello, Alice!
print(result)              # None  ← 函数没有 return，返回 None</code></pre>
<p><strong>多返回值</strong>：在 <code>return</code> 后面用逗号分隔多个值，Python 会把它们打包成一个元组并返回：</p>
<pre><code>def min_max(lst):
    return min(lst), max(lst)   # 实际上返回 (min, max) 元组

result = min_max([3, 1, 4, 1, 5])
print(result)       # (1, 5)       ← 元组
print(type(result)) # <class 'tuple'></code></pre>
<p>用<strong>元组解包</strong>把多个返回值分别赋给变量：</p>
<pre><code>lo, hi = min_max([3, 1, 4, 1, 5])
print(lo, hi)    # 1 5

# 如果只想要部分值，用 _ 忽略不需要的：
_, maximum = min_max([3, 1, 4, 1, 5])
print(maximum)   # 5</code></pre>
@@intro:en
<p class="lead">A function with no <code>return</code> (or a bare <code>return</code>) automatically returns <code>None</code> — Python's value for "nothing":</p>
<pre><code>def greet(name):
    print(f"Hello, {name}!")   # has a side effect, but no return value

result = greet("Alice")    # Hello, Alice!
print(result)              # None  ← no return statement → None</code></pre>
<p><strong>Multiple return values</strong>: put comma-separated values after <code>return</code> and Python packs them into a tuple:</p>
<pre><code>def min_max(lst):
    return min(lst), max(lst)   # returns the tuple (min, max)

result = min_max([3, 1, 4, 1, 5])
print(result)       # (1, 5)         ← a tuple
print(type(result)) # <class 'tuple'></code></pre>
<p>Use <strong>tuple unpacking</strong> to assign each return value to its own variable:</p>
<pre><code>lo, hi = min_max([3, 1, 4, 1, 5])
print(lo, hi)    # 1 5

# Use _ to discard a value you don't need:
_, maximum = min_max([3, 1, 4, 1, 5])
print(maximum)   # 5</code></pre>
@@task:zh 定义 <code>min_max(lst)</code> 同时返回最小值和最大值；用 <code>[3, 1, 4, 1, 5, 9]</code> 调用，分两行输出最小值和最大值
@@task:en
Define <code>min_max(lst)</code> returning both the minimum and maximum; call it with <code>[3, 1, 4, 1, 5, 9]</code> and print the min then max on two lines
@@hint:zh return min(lst), max(lst)；解包用 lo, hi = min_max(...)。
@@hint:en return min(lst), max(lst); unpack with lo, hi = min_max(...).
@@starter:zh
# 定义 min_max

# 调用并分两行输出

@@starter:en
# define min_max

# call and print on two lines

@@answer
def min_max(lst):
    return min(lst), max(lst)
lo, hi = min_max([3, 1, 4, 1, 5, 9])
print(lo)
print(hi)

@@expectedOutput
1
9
`);
