LEARN.lesson('python', 10, `
@@chapterRef python-tute-1
@@difficulty:zh 入门
@@difficulty:en Beginner
@@intro:zh
<p class="lead">字符串是一个字符序列，每个字符都有一个<strong>索引</strong>（位置编号）。正向索引从 <code>0</code> 开始，负向索引从末尾 <code>-1</code> 开始往前数：</p>
<pre><code>s = "Python"
#    P  y  t  h  o  n
#    0  1  2  3  4  5   ← 正向索引
#   -6 -5 -4 -3 -2 -1   ← 负向索引</code></pre>
<p>用方括号 <code>s[i]</code> 取出对应字符：</p>
<pre><code>print(s[0])    # P    ← 第 1 个字符
print(s[2])    # t    ← 第 3 个字符
print(s[-1])   # n    ← 最后一个字符
print(s[-2])   # o    ← 倒数第 2 个字符</code></pre>
<p><code>len(s)</code> 返回字符串的字符总数：<code>len("Python")</code> → <code>6</code>。索引超出范围会报 <code>IndexError</code>。</p>
@@intro:en
<p class="lead">A string is a sequence of characters. Each character has an <strong>index</strong>. Forward indices start at <code>0</code>; backward (negative) indices start at <code>-1</code> from the end:</p>
<pre><code>s = "Python"
#    P  y  t  h  o  n
#    0  1  2  3  4  5   ← forward indices
#   -6 -5 -4 -3 -2 -1   ← backward indices</code></pre>
<p>Use square brackets <code>s[i]</code> to access a character:</p>
<pre><code>print(s[0])    # P    ← 1st character
print(s[2])    # t    ← 3rd character
print(s[-1])   # n    ← last character
print(s[-2])   # o    ← 2nd from the end</code></pre>
<p><code>len(s)</code> returns the total number of characters: <code>len("Python")</code> → <code>6</code>. Accessing an out-of-range index raises an <code>IndexError</code>.</p>
@@task:zh <code>s = "Python"</code>，分三行输出：第 3 个字符（索引 2）、最后一个字符、字符串长度
@@task:en Given <code>s = "Python"</code>, print three lines: the 3rd character (index 2), the last character, and the length
@@hint:zh s[2]、s[-1]、len(s)。
@@hint:en s[2], s[-1], len(s).
@@starter:zh
s = "Python"

@@starter:en
s = "Python"

@@answer
s = "Python"
print(s[2])
print(s[-1])
print(len(s))

@@expectedOutput
t
n
6
`);
