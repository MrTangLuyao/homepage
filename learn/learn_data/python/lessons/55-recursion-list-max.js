LEARN.lesson('python', 55, `
@@chapterRef python-tute-3
@@difficulty:zh 进阶
@@difficulty:en Advanced
@@intro:zh
<p class="lead">很多列表操作都能用递归思路表达：把"对整个列表的问题"变成"对第一个元素的处理 + 对剩余列表的同一问题"。</p>
<p>以求最大值为例：</p>
<pre><code>def rec_max(lst):
    if len(lst) == 1:          # 基本情况：只有一个元素，就是最大值
        return lst[0]
    rest_max = rec_max(lst[1:])   # 递归：剩余部分的最大值
    return lst[0] if lst[0] > rest_max else rest_max  # 比较首元素和剩余最大值</code></pre>
<p>展开 <code>rec_max([3, 7, 1])</code>：</p>
<pre><code>rec_max([3, 7, 1])
  → max(3, rec_max([7, 1]))
        → max(7, rec_max([1]))
               → 1              ← 基本情况
        ← max(7, 1) = 7
  ← max(3, 7) = 7</code></pre>
<p>这里用了 Python 的<strong>三元表达式</strong>（条件表达式）：</p>
<pre><code>值A if 条件 else 值B
# 条件为真时返回 值A，否则返回 值B

x = 10
result = "大" if x > 5 else "小"   # "大"</code></pre>
<p>注意：<code>lst[1:]</code> 每次创建新切片，有额外的内存开销。实际工程中对大列表求最大值，直接用内置 <code>max()</code> 更高效。</p>
@@intro:en
<p class="lead">Many list operations can be expressed recursively: turn "a problem on the whole list" into "handle the first element + the same problem on the rest."</p>
<p>Finding the maximum as an example:</p>
<pre><code>def rec_max(lst):
    if len(lst) == 1:             # base case: one element is the max
        return lst[0]
    rest_max = rec_max(lst[1:])   # recursive: max of the remaining elements
    return lst[0] if lst[0] > rest_max else rest_max  # compare head with rest's max</code></pre>
<p>Unwinding <code>rec_max([3, 7, 1])</code>:</p>
<pre><code>rec_max([3, 7, 1])
  → max(3, rec_max([7, 1]))
        → max(7, rec_max([1]))
               → 1              ← base case
        ← max(7, 1) = 7
  ← max(3, 7) = 7</code></pre>
<p>This uses Python's <strong>conditional (ternary) expression</strong>:</p>
<pre><code>value_if_true if condition else value_if_false

x = 10
result = "big" if x > 5 else "small"   # "big"</code></pre>
<p>Note: <code>lst[1:]</code> creates a new slice on every call, which costs extra memory. In real code, use the built-in <code>max()</code> for large lists — it's far more efficient.</p>
@@task:zh 写递归函数 <code>rec_max(lst)</code>，不用内置 <code>max()</code>，返回列表中的最大值；用 <code>[3, 7, 1, 9, 4]</code> 测试并输出
@@task:en
Write a recursive function <code>rec_max(lst)</code> without using built-in <code>max()</code>; test with <code>[3, 7, 1, 9, 4]</code> and print the result
@@hint:zh 基本情况 len==1 返回 lst[0]；递归比较 lst[0] 和 rec_max(lst[1:])。
@@hint:en Base case len==1 returns lst[0]; recursively compare lst[0] with rec_max(lst[1:]).
@@starter:zh
# 递归求最大值（不用 max()）

print(rec_max([3, 7, 1, 9, 4]))

@@starter:en
# recursive max (without max())

print(rec_max([3, 7, 1, 9, 4]))

@@answer
def rec_max(lst):
    if len(lst) == 1:
        return lst[0]
    rest_max = rec_max(lst[1:])
    return lst[0] if lst[0] > rest_max else rest_max
print(rec_max([3, 7, 1, 9, 4]))

@@expectedOutput
9
`);
