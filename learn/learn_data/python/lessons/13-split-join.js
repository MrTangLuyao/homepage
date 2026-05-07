LEARN.lesson('python', 13, `
@@chapterRef python-tute-1
@@difficulty:zh 入门
@@difficulty:en Beginner
@@intro:zh
<p class="lead"><code>split()</code> 把字符串按分隔符拆成列表；<code>join()</code> 是反向操作，把列表里的字符串拼成一个字符串：</p>
<p><strong>split()</strong>：</p>
<pre><code>s = "apple banana cherry"
words = s.split()           # 默认按空白字符拆分
print(words)                # ['apple', 'banana', 'cherry']
print(len(words))           # 3

csv = "a,b,c,d"
parts = csv.split(",")      # 指定分隔符
print(parts)                # ['a', 'b', 'c', 'd']</code></pre>
<p><strong>join()</strong>：调用方式是 <code>"分隔符".join(列表)</code>（注意：分隔符在前）：</p>
<pre><code>words = ["apple", "banana", "cherry"]
print("-".join(words))   # apple-banana-cherry
print(" ".join(words))   # apple banana cherry
print("".join(words))    # applebananacherry  ← 无分隔符</code></pre>
<p>两者常配合使用：先 <code>split()</code> 处理，再 <code>join()</code> 重新拼合：</p>
<pre><code>s = "  too   many   spaces  "
words = s.split()             # 自动处理多余空格
print(" ".join(words))        # too many spaces</code></pre>
@@intro:en
<p class="lead"><code>split()</code> breaks a string into a list at a delimiter; <code>join()</code> is the reverse — it merges a list of strings into one string:</p>
<p><strong>split()</strong>:</p>
<pre><code>s = "apple banana cherry"
words = s.split()           # default: split on any whitespace
print(words)                # ['apple', 'banana', 'cherry']
print(len(words))           # 3

csv = "a,b,c,d"
parts = csv.split(",")      # specify delimiter
print(parts)                # ['a', 'b', 'c', 'd']</code></pre>
<p><strong>join()</strong>: syntax is <code>"separator".join(list)</code> — note the separator goes in front:</p>
<pre><code>words = ["apple", "banana", "cherry"]
print("-".join(words))   # apple-banana-cherry
print(" ".join(words))   # apple banana cherry
print("".join(words))    # applebananacherry  ← no separator</code></pre>
<p>They are often used together — split to process, then join to reassemble:</p>
<pre><code>s = "  too   many   spaces  "
words = s.split()             # handles extra whitespace automatically
print(" ".join(words))        # too many spaces</code></pre>
@@task:zh <code>s = "one two three four"</code>，分两行输出：单词数量、以 <code>,</code> 连接的所有单词
@@task:en Given <code>s = "one two three four"</code>, print two lines: the word count, and all words joined by <code>,</code>
@@hint:zh split() 得到列表，len() 计数，",".join() 合并。
@@hint:en split() gives the list, len() counts, ",".join() merges.
@@starter:zh
s = "one two three four"

@@starter:en
s = "one two three four"

@@answer
s = "one two three four"
words = s.split()
print(len(words))
print(",".join(words))

@@expectedOutput
4
one,two,three,four
`);
