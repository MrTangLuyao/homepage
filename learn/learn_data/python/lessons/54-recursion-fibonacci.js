LEARN.lesson('python', 54, `
@@chapterRef python-tute-3
@@difficulty:zh 进阶
@@difficulty:en Advanced
@@intro:zh
<p class="lead">斐波那契数列：0, 1, 1, 2, 3, 5, 8, 13, 21…，其中每个数等于前两个数之和。这个定义天然就是递归形式：</p>
<pre><code>def fib(n):
    if n <= 1:              # 基本情况：fib(0)=0, fib(1)=1
        return n
    return fib(n-1) + fib(n-2)   # 两次递归调用

print(fib(8))   # 21</code></pre>
<p>每次调用会拆分成<strong>两次</strong>子调用，形成树形结构：</p>
<pre><code>fib(4)
├── fib(3)
│   ├── fib(2) → fib(1) + fib(0)
│   └── fib(1)
└── fib(2)
    ├── fib(1)
    └── fib(0)</code></pre>
<p><strong>性能警告</strong>：<code>fib(n)</code> 的调用次数随 n 指数增长——<code>fib(30)</code> 就要超过一百万次重复计算。解决方法是<strong>记忆化</strong>（缓存已算过的结果）：</p>
<pre><code>cache = {}
def fib_fast(n):
    if n in cache:
        return cache[n]         # 直接查缓存
    if n <= 1:
        return n
    cache[n] = fib_fast(n-1) + fib_fast(n-2)
    return cache[n]

print(fib_fast(50))   # 12586269025（极快）</code></pre>
@@intro:en
<p class="lead">The Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21… — each number is the sum of the two before it. This definition is naturally recursive:</p>
<pre><code>def fib(n):
    if n <= 1:              # base cases: fib(0)=0, fib(1)=1
        return n
    return fib(n-1) + fib(n-2)   # two recursive calls

print(fib(8))   # 21</code></pre>
<p>Each call splits into <strong>two</strong> sub-calls, forming a tree:</p>
<pre><code>fib(4)
├── fib(3)
│   ├── fib(2) → fib(1) + fib(0)
│   └── fib(1)
└── fib(2)
    ├── fib(1)
    └── fib(0)</code></pre>
<p><strong>Performance warning</strong>: the number of calls grows exponentially — <code>fib(30)</code> triggers over a million redundant calculations. The fix is <strong>memoization</strong> (cache previously computed results):</p>
<pre><code>cache = {}
def fib_fast(n):
    if n in cache:
        return cache[n]           # return cached result
    if n <= 1:
        return n
    cache[n] = fib_fast(n-1) + fib_fast(n-2)
    return cache[n]

print(fib_fast(50))   # 12586269025  (near-instant)</code></pre>
@@task:zh 写递归函数 <code>fib(n)</code>，输出 <code>fib(10)</code> 的值
@@task:en Write a recursive function <code>fib(n)</code> and print the value of <code>fib(10)</code>
@@hint:zh 基本情况 n<=1 返回 n；return fib(n-1) + fib(n-2)。
@@hint:en Base case n<=1 returns n; return fib(n-1) + fib(n-2).
@@starter:zh
# 递归斐波那契

print(fib(10))

@@starter:en
# recursive Fibonacci

print(fib(10))

@@answer
def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)
print(fib(10))

@@expectedOutput
55
`);
