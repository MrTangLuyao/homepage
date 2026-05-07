LEARN.lesson('python', 24, `
@@chapterRef python-tute-2
@@difficulty:zh 入门
@@difficulty:en Beginner
@@intro:zh
<p class="lead">参数可以有<strong>默认值</strong>——调用时如果不传该参数，就使用默认值：</p>
<pre><code>def power(base, exp=2):   # exp 默认为 2
    return base ** exp

print(power(3))           # 9    ← 等同于 power(3, 2)
print(power(3, 3))        # 27   ← 显式传入 exp=3，覆盖默认值
print(power(2, 10))       # 1024</code></pre>
<p><strong>规则</strong>：有默认值的参数必须排在无默认值的参数<strong>之后</strong>，否则报错：</p>
<pre><code># def wrong(a=1, b):  ← ❌ SyntaxError
def right(a, b=1):    # ← ✓</code></pre>
<p>还可以用<strong>关键字参数</strong>显式指定参数名，让调用更清晰：</p>
<pre><code>def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Alice")                       # Hello, Alice!
greet("Bob", greeting="Hi")          # Hi, Bob!
greet(greeting="Hey", name="Carol")  # Hey, Carol!  ← 顺序可以换</code></pre>
@@intro:en
<p class="lead">Parameters can have <strong>default values</strong> — if the caller doesn't pass that argument, the default is used:</p>
<pre><code>def power(base, exp=2):   # exp defaults to 2
    return base ** exp

print(power(3))           # 9    ← same as power(3, 2)
print(power(3, 3))        # 27   ← explicit exp=3 overrides the default
print(power(2, 10))       # 1024</code></pre>
<p><strong>Rule</strong>: parameters with defaults must come <strong>after</strong> those without defaults, or Python raises a SyntaxError:</p>
<pre><code># def wrong(a=1, b):  ← ❌ SyntaxError
def right(a, b=1):    # ← ✓</code></pre>
<p>You can also pass arguments by name (<strong>keyword arguments</strong>) for clarity and order flexibility:</p>
<pre><code>def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Alice")                       # Hello, Alice!
greet("Bob", greeting="Hi")          # Hi, Bob!
greet(greeting="Hey", name="Carol")  # Hey, Carol!  ← order swapped</code></pre>
@@task:zh 定义 <code>power(base, exp=2)</code> 返回 base 的 exp 次方；分两行输出 <code>power(3)</code> 和 <code>power(2, 10)</code>
@@task:en
Define <code>power(base, exp=2)</code> returning base to the power of exp; print <code>power(3)</code> and <code>power(2, 10)</code> on two lines
@@hint:zh return base ** exp；调用时不传 exp 会用默认值 2。
@@hint:en return base ** exp; calling without exp uses the default 2.
@@starter:zh
# 定义 power 函数

# 两次调用

@@starter:en
# define power function

# two calls

@@answer
def power(base, exp=2):
    return base ** exp
print(power(3))
print(power(2, 10))

@@expectedOutput
9
1024
`);
