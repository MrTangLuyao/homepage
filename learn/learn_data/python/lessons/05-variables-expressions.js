LEARN.lesson('python', 5, `
@@chapterRef python-tute-1
@@difficulty:zh 入门
@@difficulty:en Beginner
@@intro:zh
<p class="lead">变量用来存储数据。用 <code>=</code> 赋值，Python 会根据值自动推断类型，无需提前声明。</p>
<pre><code>width = 8          # int（整数）
height = 5         # int
pi = 3.14159       # float（浮点数）
name = "Alice"     # str（字符串）</code></pre>
<p>变量可以在表达式中使用，也可以随时重新赋值：</p>
<pre><code>area = width * height
print(area)            # 40
width = 10             # 重新赋值
print(width * height)  # 50</code></pre>
<p><strong>命名规则</strong>：只能包含字母、数字和下划线 <code>_</code>；不能以数字开头；区分大小写（<code>score</code>、<code>Score</code>、<code>SCORE</code> 是三个不同的变量）。习惯上用小写加下划线：<code>my_score</code>。</p>
@@intro:en
<p class="lead">Variables store data. Use <code>=</code> to assign a value — Python infers the type automatically, no declaration needed.</p>
<pre><code>width = 8          # int
height = 5         # int
pi = 3.14159       # float
name = "Alice"     # str</code></pre>
<p>Variables can be used in expressions and reassigned at any time:</p>
<pre><code>area = width * height
print(area)            # 40
width = 10             # reassign
print(width * height)  # 50</code></pre>
<p><strong>Naming rules</strong>: letters, digits, and underscores <code>_</code> only; cannot start with a digit; case-sensitive (<code>score</code>, <code>Score</code>, and <code>SCORE</code> are three different variables). Convention: lowercase with underscores, e.g. <code>my_score</code>.</p>
@@task:zh <code>width = 8</code>，<code>height = 5</code>，分两行输出面积和周长
@@task:en Given <code>width = 8</code> and <code>height = 5</code>, print two lines: the area and the perimeter
@@hint:zh 面积 = width * height，周长 = 2 * (width + height)。
@@hint:en area = width * height; perimeter = 2 * (width + height).
@@starter:zh
width = 8
height = 5
# 输出面积
# 输出周长

@@starter:en
width = 8
height = 5
# print area
# print perimeter

@@answer
width = 8
height = 5
print(width * height)
print(2 * (width + height))

@@expectedOutput
40
26
`);
