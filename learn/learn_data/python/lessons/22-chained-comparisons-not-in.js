LEARN.lesson('python', 22, `
@@chapterRef python-tute-2
@@difficulty:zh 入门
@@difficulty:en Beginner
@@intro:zh
<p class="lead">Python 支持像数学一样的<strong>链式比较</strong>——多个比较运算符连写，比用 <code>and</code> 更简洁：</p>
<pre><code>x = 15
# 两种写法等价：
print(10 < x < 20)              # True  ← 链式
print(x > 10 and x < 20)        # True  ← and 版本

print(0 <= x <= 10)             # False ← x 不在 [0, 10] 内
print(1 < 2 < 3 < 4)            # True  ← 可以链更多个</code></pre>
<p>所有 Python 比较运算符：</p>
<table><thead><tr><th>符号</th><th>含义</th><th>符号</th><th>含义</th></tr></thead><tbody>
<tr><td><code>==</code></td><td>等于</td><td><code>!=</code></td><td>不等于</td></tr>
<tr><td><code>&lt;</code></td><td>小于</td><td><code>&gt;</code></td><td>大于</td></tr>
<tr><td><code>&lt;=</code></td><td>小于等于</td><td><code>&gt;=</code></td><td>大于等于</td></tr>
</tbody></table>
<p><code>not in</code> 是 <code>in</code> 的取反，检查某元素<strong>不在</strong>序列中：</p>
<pre><code>print("z" not in "Hello")      # True
print(99 not in [1, 2, 3])     # True</code></pre>
@@intro:en
<p class="lead">Python supports <strong>chained comparisons</strong> — multiple comparison operators written in sequence, more concise than using <code>and</code>:</p>
<pre><code>x = 15
# Two equivalent ways:
print(10 < x < 20)              # True  ← chained
print(x > 10 and x < 20)        # True  ← and version

print(0 <= x <= 10)             # False ← x not in [0, 10]
print(1 < 2 < 3 < 4)            # True  ← can chain more</code></pre>
<p>All Python comparison operators:</p>
<table><thead><tr><th>Op</th><th>Meaning</th><th>Op</th><th>Meaning</th></tr></thead><tbody>
<tr><td><code>==</code></td><td>equal</td><td><code>!=</code></td><td>not equal</td></tr>
<tr><td><code>&lt;</code></td><td>less than</td><td><code>&gt;</code></td><td>greater than</td></tr>
<tr><td><code>&lt;=</code></td><td>less than or equal</td><td><code>&gt;=</code></td><td>greater than or equal</td></tr>
</tbody></table>
<p><code>not in</code> negates <code>in</code> — checks that an element is <strong>absent</strong> from a sequence:</p>
<pre><code>print("z" not in "Hello")      # True
print(99 not in [1, 2, 3])     # True</code></pre>
@@task:zh <code>n = 42</code>，分两行输出：① 用链式比较判断 n 是否严格在 0 到 100 之间；② 判断 n 是否不在 <code>[1, 2, 3]</code> 中
@@task:en
Given <code>n = 42</code>, print two lines: ① use a chained comparison to check if n is strictly between 0 and 100; ② check if n is not in <code>[1, 2, 3]</code>
@@hint:zh ① <code>0 < n < 100</code>；② <code>n not in [1, 2, 3]</code>。
@@hint:en ① <code>0 < n < 100</code>; ② <code>n not in [1, 2, 3]</code>.
@@starter:zh
n = 42

@@starter:en
n = 42

@@answer
n = 42
print(0 < n < 100)
print(n not in [1, 2, 3])

@@expectedOutput
True
True
`);
