LEARN.lesson('python', 1, `
@@chapterRef python-tute-1
@@difficulty:zh 入门
@@difficulty:en Beginner
@@intro:zh
<p class="lead"><code>print()</code> 是 Python 最常用的输出函数，把内容显示到屏幕上，末尾自动加换行。</p>
<p>可以输出字符串、数字或任意表达式：</p>
<pre><code>print("Hello, World!")   # Hello, World!
print(42)                # 42
print(3 + 4)             # 7
print()                  # （空行）</code></pre>
<p><strong>字符串</strong>是被引号括起来的一段文字。单引号 <code>'...'</code> 和双引号 <code>"..."</code> 效果完全相同。如果内容里有单引号，可以用双引号包住，反之亦然：</p>
<pre><code>print('它说："你好"')    # 它说："你好"
print("It's Python!")   # It's Python!</code></pre>
@@intro:en
<p class="lead"><code>print()</code> is Python's most-used output function. It displays content on the screen and automatically adds a newline at the end.</p>
<p>You can print strings, numbers, or any expression:</p>
<pre><code>print("Hello, World!")   # Hello, World!
print(42)                # 42
print(3 + 4)             # 7
print()                  # (blank line)</code></pre>
<p><strong>Strings</strong> are pieces of text wrapped in quotes. Single quotes <code>'...'</code> and double quotes <code>"..."</code> are identical. If the text itself contains one kind of quote, wrap it in the other:</p>
<pre><code>print('She said "hello"')  # She said "hello"
print("It's Python!")      # It's Python!</code></pre>
@@task:zh 写一行代码，输出 <code>Hello, World!</code>
@@task:en Write one line that outputs <code>Hello, World!</code>
@@hint:zh 使用 <code>print("Hello, World!")</code>。
@@hint:en Use <code>print("Hello, World!")</code>.
@@starter:zh
# 在这里写你的代码

@@starter:en
# Write your code here

@@answer
print("Hello, World!")

@@expectedOutput
Hello, World!
`);
