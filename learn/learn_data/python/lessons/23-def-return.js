LEARN.lesson('python', 23, `
@@chapterRef python-tute-2
@@difficulty:zh 入门
@@difficulty:en Beginner
@@intro:zh
<p class="lead">函数是一段有名字的可重复调用的代码块。用 <code>def</code> 定义，用 <code>return</code> 把结果传回给调用者：</p>
<pre><code>def square(n):       # 定义：函数名 square，参数 n
    return n * n     # 计算并返回结果

result = square(5)   # 调用：传入实参 5
print(result)        # 25
print(square(10))    # 100  ← 可以直接在表达式中调用</code></pre>
<p><strong>参数（parameter）vs 实参（argument）</strong>：<code>n</code> 是定义时的参数名（占位符）；<code>5</code> 和 <code>10</code> 是调用时传入的实参（实际值）。</p>
<p><strong>return 立即结束函数</strong>，之后的代码不再执行：</p>
<pre><code>def sign(n):
    if n > 0:
        return "positive"   # 一旦执行，函数就结束
    if n < 0:
        return "negative"
    return "zero"

print(sign(5))    # positive
print(sign(-3))   # negative
print(sign(0))    # zero</code></pre>
<p>没有 <code>return</code> 语句（或 <code>return</code> 后没有值）的函数返回 <code>None</code>。</p>
@@intro:en
<p class="lead">A function is a named, reusable block of code. Use <code>def</code> to define it and <code>return</code> to send a result back to the caller:</p>
<pre><code>def square(n):       # define: function name square, parameter n
    return n * n     # compute and return the result

result = square(5)   # call: pass argument 5
print(result)        # 25
print(square(10))    # 100  ← can call directly in an expression</code></pre>
<p><strong>Parameter vs argument</strong>: <code>n</code> is the parameter (placeholder in the definition); <code>5</code> and <code>10</code> are arguments (actual values at call time).</p>
<p><strong>return ends the function immediately</strong> — code after it does not run:</p>
<pre><code>def sign(n):
    if n > 0:
        return "positive"   # function exits here
    if n < 0:
        return "negative"
    return "zero"

print(sign(5))    # positive
print(sign(-3))   # negative
print(sign(0))    # zero</code></pre>
<p>A function with no <code>return</code> statement (or <code>return</code> with no value) returns <code>None</code>.</p>
@@task:zh 定义函数 <code>add(a, b)</code> 返回两数之和，调用 <code>add(17, 25)</code> 并输出结果
@@task:en
Define a function <code>add(a, b)</code> that returns the sum of two numbers, call <code>add(17, 25)</code> and print the result
@@hint:zh def add(a, b): return a + b，再 print(add(17, 25))。
@@hint:en def add(a, b): return a + b, then print(add(17, 25)).
@@starter:zh
# 定义 add 函数

# 调用并输出

@@starter:en
# define add function

# call and print

@@answer
def add(a, b):
    return a + b
print(add(17, 25))

@@expectedOutput
42
`);
