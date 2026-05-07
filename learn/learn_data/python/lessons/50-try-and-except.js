LEARN.lesson('python', 50, `
@@chapterRef python-tute-3
@@difficulty:zh 进阶
@@difficulty:en Advanced
@@intro:zh
<p class="lead">程序运行时发生的错误叫<strong>异常</strong>（exception）。不处理的话程序直接崩溃并打印错误信息；用 <code>try/except</code> 可以捕获异常、优雅地处理错误：</p>
<pre><code># 不处理：程序崩溃
n = int("hello")   # ValueError: invalid literal for int() with base 10: 'hello'

# 用 try/except 捕获
try:
    n = int("hello")
    print("转换成功：", n)   # ← 如果 int() 成功，执行这里
except ValueError:
    print("不是有效整数")     # ← 如果 int() 失败，跳到这里</code></pre>
<p><strong>执行流程</strong>：</p>
<ol>
<li>执行 <code>try</code> 块里的代码</li>
<li>如果没有异常，跳过所有 <code>except</code>，继续执行后续代码</li>
<li>如果有异常，查找匹配的 <code>except</code> 子句并执行它</li>
</ol>
<p>常见异常类型：</p>
<table><thead><tr><th>异常</th><th>触发原因</th></tr></thead><tbody>
<tr><td><code>ValueError</code></td><td>值的类型对但内容不合法（如 <code>int("abc")</code>）</td></tr>
<tr><td><code>TypeError</code></td><td>操作用了错误类型（如 <code>"a" + 1</code>）</td></tr>
<tr><td><code>ZeroDivisionError</code></td><td>除以零</td></tr>
<tr><td><code>IndexError</code></td><td>列表索引越界</td></tr>
<tr><td><code>KeyError</code></td><td>字典键不存在</td></tr>
</tbody></table>
@@intro:en
<p class="lead">A runtime error is called an <strong>exception</strong>. Without handling, the program crashes and prints a traceback. Use <code>try/except</code> to catch exceptions and respond gracefully:</p>
<pre><code># without handling: program crashes
n = int("hello")   # ValueError: invalid literal for int() with base 10: 'hello'

# with try/except
try:
    n = int("hello")
    print("Converted:", n)   # ← runs if int() succeeds
except ValueError:
    print("not a valid integer")  # ← runs if int() raises ValueError</code></pre>
<p><strong>Execution flow</strong>:</p>
<ol>
<li>Execute the <code>try</code> block</li>
<li>If no exception, skip all <code>except</code> clauses and continue</li>
<li>If an exception occurs, find the matching <code>except</code> and execute it</li>
</ol>
<p>Common exception types:</p>
<table><thead><tr><th>Exception</th><th>When it occurs</th></tr></thead><tbody>
<tr><td><code>ValueError</code></td><td>right type, wrong content (e.g. <code>int("abc")</code>)</td></tr>
<tr><td><code>TypeError</code></td><td>wrong type for the operation (e.g. <code>"a" + 1</code>)</td></tr>
<tr><td><code>ZeroDivisionError</code></td><td>divide by zero</td></tr>
<tr><td><code>IndexError</code></td><td>list index out of range</td></tr>
<tr><td><code>KeyError</code></td><td>dictionary key does not exist</td></tr>
</tbody></table>
@@task:zh 用 try/except 把 <code>"abc"</code> 转成整数；捕获 <code>ValueError</code> 并输出 <code>not a number</code>
@@task:en
Use try/except to convert <code>"abc"</code> to an integer; catch the <code>ValueError</code> and print <code>not a number</code>
@@hint:zh try: n = int("abc") ... except ValueError: print("not a number")。
@@hint:en try: n = int("abc") ... except ValueError: print("not a number").
@@starter:zh
# try/except 捕获 ValueError

@@starter:en
# try/except catching ValueError

@@answer
try:
    n = int("abc")
    print(n)
except ValueError:
    print("not a number")

@@expectedOutput
not a number
`);
