LEARN.lesson('python', 11, `
@@chapterRef python-tute-1
@@difficulty:zh 入门
@@difficulty:en Beginner
@@intro:zh
<p class="lead">切片 <code>s[start:end]</code> 提取从 <code>start</code> 到 <code>end-1</code> 的子串（<strong>包含 start，不含 end</strong>）：</p>
<pre><code>s = "Hello, World!"
#    0123456789...

print(s[0:5])    # Hello   ← 索引 0,1,2,3,4
print(s[7:12])   # World   ← 索引 7,8,9,10,11
print(s[:5])     # Hello   ← 省略 start 默认为 0
print(s[7:])     # World!  ← 省略 end 默认到末尾
print(s[-6:])    # World!  ← 负索引：最后 6 个字符</code></pre>
<p>第三个参数是步长，<code>s[::2]</code> 表示每隔一个字符取一个；<code>s[::-1]</code> 步长为 -1，即<strong>反转字符串</strong>：</p>
<pre><code>print(s[::2])    # Hlo ol!  ← 每隔一个
print(s[::-1])   # !dlroW ,olleH  ← 完全反转</code></pre>
<p>切片不会报越界错误——超出范围的部分会被自动截断：</p>
<pre><code>print(s[:100])   # Hello, World!  ← 正常，不报错</code></pre>
@@intro:en
<p class="lead">Slicing <code>s[start:end]</code> extracts characters from <code>start</code> up to (but not including) <code>end</code>:</p>
<pre><code>s = "Hello, World!"
#    0123456789...

print(s[0:5])    # Hello   ← indices 0,1,2,3,4
print(s[7:12])   # World   ← indices 7,8,9,10,11
print(s[:5])     # Hello   ← omit start → defaults to 0
print(s[7:])     # World!  ← omit end → defaults to end of string
print(s[-6:])    # World!  ← negative: last 6 characters</code></pre>
<p>The third parameter is a step. <code>s[::2]</code> takes every other character; <code>s[::-1]</code> reverses the string:</p>
<pre><code>print(s[::2])    # Hlo ol!  ← every other character
print(s[::-1])   # !dlroW ,olleH  ← fully reversed</code></pre>
<p>Slicing never raises an IndexError — out-of-range bounds are silently clamped:</p>
<pre><code>print(s[:100])   # Hello, World!  ← fine, no error</code></pre>
@@task:zh <code>s = "Hello, World!"</code>，分两行输出：前 5 个字符、最后 6 个字符
@@task:en Given <code>s = "Hello, World!"</code>, print two lines: the first 5 characters and the last 6 characters
@@hint:zh s[:5] 前 5 个，s[-6:] 最后 6 个。
@@hint:en s[:5] for first 5, s[-6:] for last 6.
@@starter:zh
s = "Hello, World!"

@@starter:en
s = "Hello, World!"

@@answer
s = "Hello, World!"
print(s[:5])
print(s[-6:])

@@expectedOutput
Hello
World!
`);
