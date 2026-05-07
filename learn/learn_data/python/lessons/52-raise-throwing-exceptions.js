LEARN.lesson('python', 52, `
@@chapterRef python-tute-3
@@difficulty:zh 进阶
@@difficulty:en Advanced
@@intro:zh
<p class="lead">除了被动捕获异常，也可以主动用 <code>raise</code> 抛出异常——当函数检测到输入不合法时，主动报错比悄悄产生错误结果要好得多：</p>
<pre><code>def check_age(age):
    if age < 0:
        raise ValueError("年龄不能为负数")  # 主动抛出
    if age > 150:
        raise ValueError("年龄不合理")
    return age

try:
    check_age(-5)
except ValueError as e:   # 用 as e 获取异常对象
    print(f"错误：{e}")   # 错误：年龄不能为负数</code></pre>
<p><code>as e</code> 把异常对象赋给变量 <code>e</code>，调用 <code>str(e)</code>（或在 f-string 里直接用）可以拿到异常消息。</p>
<p>常用于 <code>raise</code> 的内置异常类型：</p>
<table><thead><tr><th>异常</th><th>适用场景</th></tr></thead><tbody>
<tr><td><code>ValueError</code></td><td>值的内容不合法（如负数年龄）</td></tr>
<tr><td><code>TypeError</code></td><td>类型不对（如期望 int 却传了 str）</td></tr>
<tr><td><code>RuntimeError</code></td><td>通用运行时错误</td></tr>
</tbody></table>
<p>好的实践：<code>raise</code> 时写清楚消息，方便调用方看明白哪里出了问题：</p>
<pre><code>raise ValueError(f"期望正整数，实际得到 {n}")  # 比 raise ValueError("错误") 有用</code></pre>
@@intro:en
<p class="lead">Besides catching exceptions passively, you can actively throw them with <code>raise</code> — when a function detects invalid input, raising an exception is far better than silently producing a wrong result:</p>
<pre><code>def check_age(age):
    if age < 0:
        raise ValueError("age cannot be negative")  # actively raise
    if age > 150:
        raise ValueError("age seems unrealistic")
    return age

try:
    check_age(-5)
except ValueError as e:   # 'as e' binds the exception to e
    print(f"Error: {e}")  # Error: age cannot be negative</code></pre>
<p><code>as e</code> assigns the exception object to <code>e</code>. Calling <code>str(e)</code> (or using it directly in an f-string) retrieves the message.</p>
<p>Common exception types to raise:</p>
<table><thead><tr><th>Exception</th><th>When to use it</th></tr></thead><tbody>
<tr><td><code>ValueError</code></td><td>value content is wrong (e.g. negative age)</td></tr>
<tr><td><code>TypeError</code></td><td>wrong type (e.g. expected int, got str)</td></tr>
<tr><td><code>RuntimeError</code></td><td>general runtime problem</td></tr>
</tbody></table>
<p>Best practice: include a descriptive message so callers understand what went wrong:</p>
<pre><code>raise ValueError(f"expected a positive integer, got {n}")  # more useful than just "error"</code></pre>
@@task:zh
定义 <code>check_positive(n)</code>：若 n ≤ 0 则 raise ValueError("must be positive")；用 try/except 调用 <code>check_positive(-5)</code>，输出异常消息
@@task:en
Define <code>check_positive(n)</code>: raise ValueError("must be positive") if n ≤ 0; use try/except to call <code>check_positive(-5)</code> and print the exception message
@@hint:zh raise ValueError("must be positive")；except ValueError as e: print(e)。
@@hint:en raise ValueError("must be positive"); except ValueError as e: print(e).
@@starter:zh
# 定义 check_positive

# try/except 调用并输出异常消息

@@starter:en
# define check_positive

# try/except call and print message

@@answer
def check_positive(n):
    if n <= 0:
        raise ValueError("must be positive")
    return n
try:
    check_positive(-5)
except ValueError as e:
    print(e)

@@expectedOutput
must be positive
`);
