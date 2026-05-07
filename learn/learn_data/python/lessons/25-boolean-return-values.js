LEARN.lesson('python', 25, `
@@chapterRef python-tute-2
@@difficulty:zh 入门
@@difficulty:en Beginner
@@intro:zh
<p class="lead">返回 <code>True</code> 或 <code>False</code> 的函数叫<strong>谓词函数</strong>（predicate），命名习惯上以 <code>is_</code> 或 <code>has_</code> 开头，表明它是一个"是否"判断：</p>
<pre><code>def is_even(n):
    return n % 2 == 0   # 比较表达式的结果本身就是布尔值，直接 return

print(is_even(4))   # True
print(is_even(7))   # False</code></pre>
<p>不要写成 <code>if n % 2 == 0: return True else: return False</code>——比较表达式已经是布尔值，直接返回即可。</p>
<p>谓词函数可以直接放在 <code>if</code> 条件里：</p>
<pre><code>def is_even(n):
    return n % 2 == 0

for i in range(1, 8):
    if is_even(i):
        print(i, "is even")
# 2 is even
# 4 is even
# 6 is even</code></pre>
<p>Python 内置了一些常用谓词：<code>isinstance(x, int)</code>、<code>any([...])</code>、<code>all([...])</code> 等。</p>
@@intro:en
<p class="lead">A function returning <code>True</code> or <code>False</code> is called a <strong>predicate</strong>. By convention, name them with <code>is_</code> or <code>has_</code> to signal they answer a yes/no question:</p>
<pre><code>def is_even(n):
    return n % 2 == 0   # a comparison already produces a bool — return it directly

print(is_even(4))   # True
print(is_even(7))   # False</code></pre>
<p>Don't write <code>if n % 2 == 0: return True else: return False</code> — a comparison expression is already a boolean, so just return it.</p>
<p>Predicate functions work directly as <code>if</code> conditions:</p>
<pre><code>def is_even(n):
    return n % 2 == 0

for i in range(1, 8):
    if is_even(i):
        print(i, "is even")
# 2 is even
# 4 is even
# 6 is even</code></pre>
<p>Python has built-in predicates too: <code>isinstance(x, int)</code>, <code>any([...])</code>, <code>all([...])</code>, etc.</p>
@@task:zh 定义 <code>is_positive(n)</code>，返回 n 是否大于 0；分两行输出 <code>is_positive(5)</code> 和 <code>is_positive(-3)</code>
@@task:en
Define <code>is_positive(n)</code> returning whether n > 0; print <code>is_positive(5)</code> and <code>is_positive(-3)</code> on two lines
@@hint:zh return n > 0 直接返回布尔值。
@@hint:en return n > 0 directly returns a boolean.
@@starter:zh
# 定义 is_positive

# 两次调用

@@starter:en
# define is_positive

# two calls

@@answer
def is_positive(n):
    return n > 0
print(is_positive(5))
print(is_positive(-3))

@@expectedOutput
True
False
`);
