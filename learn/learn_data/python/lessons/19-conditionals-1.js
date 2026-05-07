LEARN.lesson('python', 19, `
@@chapterRef python-tute-1
@@difficulty:zh 入门
@@difficulty:en Beginner
@@intro:zh
<p class="lead"><code>if</code> 语句根据条件决定是否执行某段代码。Python 用<strong>缩进</strong>（通常 4 个空格）划分代码块，冒号 <code>:</code> 表示块的开始，不需要花括号：</p>
<pre><code>score = 85
if score >= 60:
    print("及格")    # 条件为真时执行
    print("恭喜！")  # 同一缩进级别 = 同一块
else:
    print("不及格")  # 条件为假时执行</code></pre>
<p><code>else</code> 是可选的。没有 else 时，条件为假就直接跳过：</p>
<pre><code>x = 10
if x > 5:
    print("x 大于 5")   # 会执行
# 继续执行后面的代码，不受 if 影响</code></pre>
<p><strong>缩进错误是初学者最常见的 bug</strong>——混用空格和 Tab、或缩进不一致会导致 <code>IndentationError</code>：</p>
<pre><code>if True:
print("wrong")   # ❌ IndentationError：缺少缩进

if True:
    print("right")  # ✓</code></pre>
@@intro:en
<p class="lead"><code>if</code> executes a block of code only when a condition is true. Python uses <strong>indentation</strong> (typically 4 spaces) to define blocks, with a colon <code>:</code> to open each block — no curly braces required:</p>
<pre><code>score = 85
if score >= 60:
    print("Pass")    # runs when condition is true
    print("Well done!")  # same indent level = same block
else:
    print("Fail")    # runs when condition is false</code></pre>
<p><code>else</code> is optional. Without it, the false branch simply does nothing:</p>
<pre><code>x = 10
if x > 5:
    print("x is greater than 5")   # this runs
# execution continues normally after the if block</code></pre>
<p><strong>Indentation errors are the most common beginner mistake</strong> — mixing spaces and tabs, or inconsistent indentation, raises an <code>IndentationError</code>:</p>
<pre><code>if True:
print("wrong")   # ❌ IndentationError: missing indent

if True:
    print("right")  # ✓</code></pre>
@@task:zh 用 <code>input("n: ")</code> 读取整数，输出 <code>positive</code>（>0）或 <code>non-positive</code>
@@task:en Use <code>input("n: ")</code> to read an integer, print <code>positive</code> if > 0, else <code>non-positive</code>
@@hint:zh int(input(...)) 转整数，if n > 0 / else 判断。
@@hint:en Convert with int(input(...)), then if n > 0 / else.
@@starter:zh
# 读取整数，判断正负

@@starter:en
# Read an integer and check its sign

@@answer
n = int(input("n: "))
if n > 0:
    print("positive")
else:
    print("non-positive")

@@expectedOutput
positive

@@testInputs
7`);
