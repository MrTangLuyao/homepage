LEARN.lesson('python', 53, `
@@chapterRef python-tute-3
@@difficulty:zh 进阶
@@difficulty:en Advanced
@@intro:zh
<p class="lead"><strong>递归</strong>是函数调用自身来解决问题的技术。每次调用把原问题缩小一步，直到缩小到能直接回答的<strong>基本情况（base case）</strong>，然后逐层返回结果。</p>
<p>以阶乘为例：<code>5! = 5 × 4! = 5 × 4 × 3! = …</code></p>
<pre><code>def factorial(n):
    if n <= 1:           # 基本情况：能直接回答
        return 1
    return n * factorial(n - 1)   # 递归情况：缩小问题

print(factorial(5))   # 120</code></pre>
<p>调用过程展开（以 <code>factorial(4)</code> 为例）：</p>
<pre><code>factorial(4)
  → 4 * factorial(3)
       → 3 * factorial(2)
            → 2 * factorial(1)
                 → 1          ← 基本情况，开始返回
            ← 2 * 1 = 2
       ← 3 * 2 = 6
  ← 4 * 6 = 24</code></pre>
<p><strong>两个必要条件</strong>：</p>
<ol>
<li>必须有<strong>基本情况</strong>（否则无限递归，Python 默认最多 1000 层后报 <code>RecursionError</code>）</li>
<li>每次递归必须让问题<strong>向基本情况逼近</strong></li>
</ol>
@@intro:en
<p class="lead"><strong>Recursion</strong> is the technique of a function calling itself to solve a problem. Each call shrinks the problem by one step until it reaches a <strong>base case</strong> that can be answered directly, then results unwind back up the call chain.</p>
<p>Factorial example: <code>5! = 5 × 4! = 5 × 4 × 3! = …</code></p>
<pre><code>def factorial(n):
    if n <= 1:           # base case: answer directly
        return 1
    return n * factorial(n - 1)   # recursive case: shrink the problem

print(factorial(5))   # 120</code></pre>
<p>Unwinding the calls for <code>factorial(4)</code>:</p>
<pre><code>factorial(4)
  → 4 * factorial(3)
       → 3 * factorial(2)
            → 2 * factorial(1)
                 → 1          ← base case, start returning
            ← 2 * 1 = 2
       ← 3 * 2 = 6
  ← 4 * 6 = 24</code></pre>
<p><strong>Two requirements for correct recursion</strong>:</p>
<ol>
<li>Must have a <strong>base case</strong> — without one, Python hits infinite recursion and raises <code>RecursionError</code> after ~1000 calls by default</li>
<li>Each recursive call must move <strong>closer to the base case</strong></li>
</ol>
@@task:zh 写一个递归函数 <code>factorial(n)</code>，输出 <code>factorial(6)</code> 的结果
@@task:en Write a recursive function <code>factorial(n)</code> and print the result of <code>factorial(6)</code>
@@hint:zh 基本情况：n <= 1 返回 1；递归情况：return n * factorial(n - 1)。
@@hint:en Base case: n <= 1 return 1; recursive case: return n * factorial(n - 1).
@@starter:zh
# 递归阶乘

print(factorial(6))

@@starter:en
# recursive factorial

print(factorial(6))

@@answer
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)
print(factorial(6))

@@expectedOutput
720
`);
