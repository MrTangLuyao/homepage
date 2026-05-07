LEARN.lesson('python', 45, `
@@chapterRef python-tute-3
@@difficulty:zh 进阶
@@difficulty:en Advanced
@@intro:zh
<p class="lead">推导式可以作用在任何可迭代对象上——列表、字符串、range、甚至另一个推导式的结果。处理词语和文本是它最典型的应用场景之一：</p>
<pre><code>sentence = "Hello World from Python"
words = sentence.split()       # ['Hello', 'World', 'from', 'Python']

# 对每个单词求长度
lengths = [len(w) for w in words]
print(lengths)   # [5, 5, 4, 6]

# 过滤 + 变换：只留长单词并转小写
long = [w.lower() for w in words if len(w) > 4]
print(long)      # ['hello', 'world', 'python']</code></pre>
<p>推导式可以嵌套，用来"展平"二维结构（但嵌套层数超过 2 层时可读性下降，改用普通循环更好）：</p>
<pre><code>matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flat = [x for row in matrix for x in row]
print(flat)   # [1, 2, 3, 4, 5, 6, 7, 8, 9]</code></pre>
<p>对字符串本身也可以直接推导——字符串是字符的可迭代对象：</p>
<pre><code>vowels = [c for c in "hello world" if c in "aeiou"]
print(vowels)    # ['e', 'o', 'o']
print(len(vowels))  # 3</code></pre>
@@intro:en
<p class="lead">Comprehensions work on any iterable — lists, strings, range, or even the result of another comprehension. Processing text and words is one of their most typical use cases:</p>
<pre><code>sentence = "Hello World from Python"
words = sentence.split()       # ['Hello', 'World', 'from', 'Python']

# get the length of each word
lengths = [len(w) for w in words]
print(lengths)   # [5, 5, 4, 6]

# filter + transform: keep only long words, lowercase
long = [w.lower() for w in words if len(w) > 4]
print(long)      # ['hello', 'world', 'python']</code></pre>
<p>Comprehensions can be nested to "flatten" 2D structures (but beyond 2 levels, readability suffers — use regular loops instead):</p>
<pre><code>matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flat = [x for row in matrix for x in row]
print(flat)   # [1, 2, 3, 4, 5, 6, 7, 8, 9]</code></pre>
<p>You can also iterate directly over a string — strings are iterables of characters:</p>
<pre><code>vowels = [c for c in "hello world" if c in "aeiou"]
print(vowels)       # ['e', 'o', 'o']
print(len(vowels))  # 3</code></pre>
@@task:zh <code>sentence = "The quick brown fox jumps"</code>，分两行输出：每个单词长度的列表、所有长度 ≥ 4 的单词（转大写）
@@task:en
Given <code>sentence = "The quick brown fox jumps"</code>, print two lines: a list of each word's length, then all words with length ≥ 4 uppercased
@@hint:zh 先 split()，再两个推导式分别处理。
@@hint:en split() first, then two separate comprehensions.
@@starter:zh
sentence = "The quick brown fox jumps"

@@starter:en
sentence = "The quick brown fox jumps"

@@answer
sentence = "The quick brown fox jumps"
words = sentence.split()
print([len(w) for w in words])
print([w.upper() for w in words if len(w) >= 4])

@@expectedOutput
[3, 5, 5, 3, 5]
['QUICK', 'BROWN', 'JUMPS']
`);
