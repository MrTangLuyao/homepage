LEARN.lesson('python', 12, `
@@chapterRef python-tute-1
@@difficulty:zh 入门
@@difficulty:en Beginner
@@intro:zh
<p class="lead">字符串是不可变的——所有字符串方法都返回<strong>新字符串</strong>，不修改原来的变量。调用方式：<code>字符串.方法()</code>。</p>
<p>大小写相关方法：</p>
<pre><code>s = "Hello World"
print(s.upper())      # HELLO WORLD   ← 全大写
print(s.lower())      # hello world   ← 全小写
print(s.title())      # Hello World   ← 每词首字母大写（已经是了）
print("hello".capitalize())  # Hello  ← 仅第一个字母大写</code></pre>
<p>去除空白（包括空格、制表符、换行符）：</p>
<pre><code>s = "  Hello World  "
print(s.strip())    # "Hello World"   ← 去两端
print(s.lstrip())   # "Hello World  " ← 只去左端
print(s.rstrip())   # "  Hello World" ← 只去右端</code></pre>
<p>可以链式调用——上一步的返回值直接再调方法：</p>
<pre><code>s = "  hello world  "
print(s.strip().upper())  # HELLO WORLD</code></pre>
@@intro:en
<p class="lead">Strings are immutable — every string method returns a <strong>new string</strong>, leaving the original unchanged. Syntax: <code>string.method()</code>.</p>
<p>Case methods:</p>
<pre><code>s = "Hello World"
print(s.upper())      # HELLO WORLD   ← all uppercase
print(s.lower())      # hello world   ← all lowercase
print(s.title())      # Hello World   ← title-case each word
print("hello".capitalize())  # Hello  ← only first letter uppercased</code></pre>
<p>Strip whitespace (spaces, tabs, newlines):</p>
<pre><code>s = "  Hello World  "
print(s.strip())    # "Hello World"   ← both ends
print(s.lstrip())   # "Hello World  " ← left end only
print(s.rstrip())   # "  Hello World" ← right end only</code></pre>
<p>Methods can be chained — each result is a new string you can call more methods on:</p>
<pre><code>s = "  hello world  "
print(s.strip().upper())  # HELLO WORLD</code></pre>
@@task:zh <code>s = "  hello world  "</code>，分两行输出：去除两端空白后的字符串、再转为全大写
@@task:en Given <code>s = "  hello world  "</code>, print two lines: the stripped string, then that result in uppercase
@@hint:zh strip() 去空白，upper() 转大写。
@@hint:en strip() removes whitespace, upper() converts to uppercase.
@@starter:zh
s = "  hello world  "

@@starter:en
s = "  hello world  "

@@answer
s = "  hello world  "
clean = s.strip()
print(clean)
print(clean.upper())

@@expectedOutput
hello world
HELLO WORLD
`);
