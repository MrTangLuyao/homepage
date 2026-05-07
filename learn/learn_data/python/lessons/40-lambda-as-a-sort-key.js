LEARN.lesson('python', 40, `
@@chapterRef python-tute-2
@@difficulty:zh 初级
@@difficulty:en Elementary
@@intro:zh
<p class="lead"><code>lambda</code> 是定义匿名函数的一行写法，语法为 <code>lambda 参数: 表达式</code>，常用在需要简单函数的地方（如 <code>sorted()</code> 的 <code>key</code>）：</p>
<pre><code># 普通函数写法
def get_score(s):
    return s[1]

# lambda 等价写法（更简洁，适合只用一次的情况）
get_score = lambda s: s[1]</code></pre>
<p>最常见的用法是作为 <code>sorted()</code> 的 <code>key</code>，按元素的某个字段排序：</p>
<pre><code>students = [("Alice", 90), ("Bob", 85), ("Carol", 92)]

# 按第二个元素（分数）升序
print(sorted(students, key=lambda s: s[1]))
# [('Bob', 85), ('Alice', 90), ('Carol', 92)]

# 按分数降序
print(sorted(students, key=lambda s: s[1], reverse=True))
# [('Carol', 92), ('Alice', 90), ('Bob', 85)]</code></pre>
<p><strong>lambda 的限制</strong>：只能写一个表达式，不能有赋值、循环、if/else 语句（但可以用三元表达式）。逻辑复杂时应换用普通 <code>def</code> 函数。</p>
@@intro:en
<p class="lead"><code>lambda</code> defines an anonymous (nameless) function in one line. Syntax: <code>lambda parameters: expression</code>. It's most useful when a simple function is needed in one place (like <code>sorted()</code>'s <code>key</code>):</p>
<pre><code># regular function
def get_score(s):
    return s[1]

# lambda equivalent (shorter, good for one-time use)
get_score = lambda s: s[1]</code></pre>
<p>Most common use: as <code>key</code> in <code>sorted()</code> to sort by a specific field of each element:</p>
<pre><code>students = [("Alice", 90), ("Bob", 85), ("Carol", 92)]

# sort by second element (score), ascending
print(sorted(students, key=lambda s: s[1]))
# [('Bob', 85), ('Alice', 90), ('Carol', 92)]

# sort by score, descending
print(sorted(students, key=lambda s: s[1], reverse=True))
# [('Carol', 92), ('Alice', 90), ('Bob', 85)]</code></pre>
<p><strong>Lambda limitations</strong>: only a single expression — no assignments, loops, or if/else statements (ternary expressions are OK). For anything complex, use a regular <code>def</code> function instead.</p>
@@task:zh <code>students = [("Alice", 90), ("Bob", 85), ("Carol", 92)]</code>，按分数<strong>从高到低</strong>排序，每行输出 <code>名字: 分数</code>
@@task:en
Given <code>students = [("Alice", 90), ("Bob", 85), ("Carol", 92)]</code>, sort by score <strong>highest first</strong> and print each as <code>name: score</code>
@@hint:zh sorted(..., key=lambda s: s[1], reverse=True)，再逐行输出。
@@hint:en sorted(..., key=lambda s: s[1], reverse=True), then print each row.
@@starter:zh
students = [("Alice", 90), ("Bob", 85), ("Carol", 92)]

@@starter:en
students = [("Alice", 90), ("Bob", 85), ("Carol", 92)]

@@answer
students = [("Alice", 90), ("Bob", 85), ("Carol", 92)]
result = sorted(students, key=lambda s: s[1], reverse=True)
for name, score in result:
    print(f"{name}: {score}")

@@expectedOutput
Carol: 92
Alice: 90
Bob: 85
`);
