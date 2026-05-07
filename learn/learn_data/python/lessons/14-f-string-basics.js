LEARN.lesson('python', 14, `
@@chapterRef python-tute-1
@@difficulty:zh 入门
@@difficulty:en Beginner
@@intro:zh
<p class="lead">f-string（格式化字符串字面量）是 Python 3.6+ 推荐的字符串插值方式。在引号前加 <code>f</code>，然后用 <code>{}</code> 嵌入任意变量或表达式——比字符串拼接和 <code>str()</code> 简洁得多：</p>
<pre><code>name = "Alice"
age = 20

# 旧写法（繁琐）
print("我叫 " + name + "，今年 " + str(age) + " 岁。")

# f-string（推荐）
print(f"我叫 {name}，今年 {age} 岁。")
# 我叫 Alice，今年 20 岁。</code></pre>
<p><code>{}</code> 内可以放任意表达式，Python 会自动求值并转为字符串：</p>
<pre><code>x = 5
print(f"x 的平方是 {x ** 2}")       # x 的平方是 25
print(f"x+1 = {x + 1}")            # x+1 = 6
print(f"类型：{type(x).__name__}")   # 类型：int</code></pre>
<p>单引号/双引号均可包住 f-string，内部引号用另一种：</p>
<pre><code>print(f'He said "{name}"')   # He said "Alice"</code></pre>
@@intro:en
<p class="lead">f-strings (formatted string literals) are Python 3.6+'s recommended way to embed values in strings. Put <code>f</code> before the quote, then use <code>{}</code> to embed any variable or expression — much cleaner than concatenation or <code>str()</code>:</p>
<pre><code>name = "Alice"
age = 20

# old way (verbose)
print("My name is " + name + ", I am " + str(age) + " years old.")

# f-string (recommended)
print(f"My name is {name}, I am {age} years old.")
# My name is Alice, I am 20 years old.</code></pre>
<p><code>{}</code> can contain any expression — Python evaluates it and converts to a string automatically:</p>
<pre><code>x = 5
print(f"x squared is {x ** 2}")      # x squared is 25
print(f"x+1 = {x + 1}")              # x+1 = 6
print(f"type: {type(x).__name__}")   # type: int</code></pre>
<p>Single or double quotes work for f-strings; use the other kind inside <code>{}</code> string literals:</p>
<pre><code>print(f'He said "{name}"')   # He said "Alice"</code></pre>
@@task:zh <code>name = "Bob"</code>，<code>score = 95</code>，用 f-string 输出 <code>Bob scored 95 points.</code>
@@task:en
Given <code>name = "Bob"</code> and <code>score = 95</code>, use an f-string to print <code>Bob scored 95 points.</code>
@@hint:zh f"{name} scored {score} points." 放进 print()。
@@hint:en Put f"{name} scored {score} points." inside print().
@@starter:zh
name = "Bob"
score = 95

@@starter:en
name = "Bob"
score = 95

@@answer
name = "Bob"
score = 95
print(f"{name} scored {score} points.")

@@expectedOutput
Bob scored 95 points.
`);
