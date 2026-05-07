LEARN.lesson('python', 51, `
@@chapterRef python-tute-3
@@difficulty:zh 进阶
@@difficulty:en Advanced
@@intro:zh
<p class="lead">一个 <code>try</code> 块可以跟多个 <code>except</code> 子句，分别处理不同类型的异常——Python 从上往下匹配，执行第一个命中的 <code>except</code>：</p>
<pre><code>try:
    result = 10 / int(input("除数："))
    print(result)
except ValueError:
    print("不是数字")          # 用户输入 "abc" 时触发
except ZeroDivisionError:
    print("不能除以零")        # 用户输入 "0" 时触发</code></pre>
<p>还有两个可选子句：</p>
<ul>
<li><code>else</code>：<strong>没有异常</strong>时执行（比把代码放在 try 末尾更清晰）</li>
<li><code>finally</code>：<strong>无论是否有异常都执行</strong>，常用于释放资源（关文件、断数据库连接）</li>
</ul>
<pre><code>try:
    n = int(input("整数："))
    result = 100 / n
except ValueError:
    print("请输入数字")
except ZeroDivisionError:
    print("不能为 0")
else:
    print(f"结果是 {result}")  # 只有成功才打印
finally:
    print("执行完毕")           # 始终打印</code></pre>
<p>如果想一个 <code>except</code> 捕获多种异常，用元组：</p>
<pre><code>except (ValueError, TypeError):
    print("输入有问题")</code></pre>
@@intro:en
<p class="lead">A <code>try</code> block can be followed by multiple <code>except</code> clauses, each handling a different exception type — Python matches from top to bottom and runs the first matching one:</p>
<pre><code>try:
    result = 10 / int(input("divisor: "))
    print(result)
except ValueError:
    print("not a number")       # triggered when user types "abc"
except ZeroDivisionError:
    print("cannot divide by zero")  # triggered when user types "0"</code></pre>
<p>Two optional clauses:</p>
<ul>
<li><code>else</code>: runs only when <strong>no exception occurred</strong> (cleaner than putting code at the end of try)</li>
<li><code>finally</code>: runs <strong>always</strong>, whether or not an exception occurred — used to release resources (close files, disconnect from databases)</li>
</ul>
<pre><code>try:
    n = int(input("Integer: "))
    result = 100 / n
except ValueError:
    print("please enter a number")
except ZeroDivisionError:
    print("cannot be 0")
else:
    print(f"result is {result}")  # only printed on success
finally:
    print("done")                  # always printed</code></pre>
<p>To catch multiple exception types with one <code>except</code>, use a tuple:</p>
<pre><code>except (ValueError, TypeError):
    print("bad input")</code></pre>
@@task:zh
用 <code>input("n: ")</code> 读取一个数，计算 <code>100 / n</code>；捕获 <code>ValueError</code> 和 <code>ZeroDivisionError</code>（测试输入为 <code>0</code>）
@@task:en
Use <code>input("n: ")</code> to read a number and compute <code>100 / n</code>; catch <code>ValueError</code> printing <code>not a number</code> and <code>ZeroDivisionError</code> printing <code>cannot divide by zero</code> (test input: <code>0</code>)
@@hint:zh 两个 except 分别捕获两种异常。
@@hint:en Two separate except clauses for the two error types.
@@starter:zh
# try/except 捕获两种异常

@@starter:en
# try/except with two exception types

@@answer
try:
    n = int(input("n: "))
    print(100 / n)
except ValueError:
    print("not a number")
except ZeroDivisionError:
    print("cannot divide by zero")

@@expectedOutput
cannot divide by zero

@@testInputs
0`);
