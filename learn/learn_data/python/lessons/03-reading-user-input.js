LEARN.lesson('python', 3, `
@@chapterRef python-tute-1
@@difficulty:zh 入门
@@difficulty:en Beginner
@@intro:zh
<p class="lead"><code>input()</code> 暂停程序，等用户输入一行文字并按 Enter。<strong>无论用户输入什么，返回值始终是字符串（str）。</strong></p>
<p>括号内的字符串是提示语，原样显示在输入光标前（可以是空字符串）：</p>
<pre><code>name = input("你叫什么名字？")
print("你好，" + name)</code></pre>
<p>运行示例（<code>→</code> 表示用户的输入）：</p>
<pre><code>你叫什么名字？→ Alice
你好，Alice</code></pre>
<p>因为返回值是字符串，两个 <code>input()</code> 的结果直接相加是字符串拼接，而不是数学加法：</p>
<pre><code>a = input()    # 用户输入 3
b = input()    # 用户输入 4
print(a + b)   # 34，不是 7！</code></pre>
<p>要做数学运算，需要先用 <code>int()</code> 或 <code>float()</code> 转换（Part 3 详细介绍）。</p>
@@intro:en
<p class="lead"><code>input()</code> pauses the program, waits for the user to type a line and press Enter. It <strong>always returns a string</strong>, no matter what the user typed.</p>
<p>The string inside the parentheses is a prompt, shown before the cursor (can be empty):</p>
<pre><code>name = input("What is your name? ")
print("Hello, " + name)</code></pre>
<p>Example run (<code>→</code> marks user input):</p>
<pre><code>What is your name? → Alice
Hello, Alice</code></pre>
<p>Because the return value is always a string, adding two <code>input()</code> results gives concatenation, not arithmetic:</p>
<pre><code>a = input()    # user types 3
b = input()    # user types 4
print(a + b)   # 34, not 7!</code></pre>
<p>To do math, convert first with <code>int()</code> or <code>float()</code> (covered in Part 3).</p>
@@task:zh 用 <code>input("Name: ")</code> 读取名字，输出 <code>Hello, &lt;名字&gt;!</code>
@@task:en Use <code>input("Name: ")</code> to read a name, then output <code>Hello, &lt;name&gt;!</code>
@@hint:zh 把 input() 返回值和字符串拼接后 print()。
@@hint:en Concatenate the input() return value with surrounding strings and print.
@@starter:zh
# 读取名字，打招呼

@@starter:en
# Read a name and greet the user

@@answer
name = input("Name: ")
print("Hello, " + name + "!")

@@expectedOutput
Hello, Alice!

@@testInputs
Alice`);
