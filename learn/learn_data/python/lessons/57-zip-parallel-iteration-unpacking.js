LEARN.lesson('python', 57, `
@@chapterRef python-tute-3
@@difficulty:zh 进阶
@@difficulty:en Advanced
@@intro:zh
<p class="lead"><code>zip()</code> 把多个序列"拉链"在一起，每次取出来自各个序列的对应位置元素，组合成元组：</p>
<pre><code>names  = ["Alice", "Bob", "Carol"]
scores = [90, 85, 92]

# 不用 zip：繁琐
for i in range(len(names)):
    print(f"{names[i]}: {scores[i]}")

# 用 zip：简洁
for name, score in zip(names, scores):
    print(f"{name}: {score}")</code></pre>
<p><code>zip()</code> 以<strong>最短</strong>的序列为准停止——如果两个序列长度不同，多余的元素会被忽略：</p>
<pre><code>a = [1, 2, 3, 4]
b = ["a", "b"]
print(list(zip(a, b)))   # [(1, 'a'), (2, 'b')]  ← 只有 2 对</code></pre>
<p>用 <code>list(zip(...))</code> 可以把 zip 对象转成可查看的列表。还可以用 <code>zip</code> 同时遍历三个或更多序列：</p>
<pre><code>names  = ["Alice", "Bob"]
scores = [90, 85]
grades = ["A", "B"]
for name, score, grade in zip(names, scores, grades):
    print(f"{name}: {score} ({grade})")</code></pre>
@@intro:en
<p class="lead"><code>zip()</code> "zips" multiple sequences together, producing a tuple from corresponding positions on each iteration:</p>
<pre><code>names  = ["Alice", "Bob", "Carol"]
scores = [90, 85, 92]

# without zip: verbose
for i in range(len(names)):
    print(f"{names[i]}: {scores[i]}")

# with zip: clean
for name, score in zip(names, scores):
    print(f"{name}: {score}")</code></pre>
<p><code>zip()</code> stops at the <strong>shortest</strong> sequence — excess elements from longer sequences are silently dropped:</p>
<pre><code>a = [1, 2, 3, 4]
b = ["a", "b"]
print(list(zip(a, b)))   # [(1, 'a'), (2, 'b')]  ← only 2 pairs</code></pre>
<p>Wrap in <code>list(...)</code> to inspect the pairs. You can also zip three or more sequences at once:</p>
<pre><code>names  = ["Alice", "Bob"]
scores = [90, 85]
grades = ["A", "B"]
for name, score, grade in zip(names, scores, grades):
    print(f"{name}: {score} ({grade})")</code></pre>
@@task:zh
<code>names = ["Alice","Bob","Carol"]</code>，<code>scores = [90,85,92]</code>，用 <code>zip()</code> 遍历，每行输出 <code>名字: 分数</code>
@@task:en
Given <code>names = ["Alice","Bob","Carol"]</code> and <code>scores = [90,85,92]</code>, iterate with <code>zip()</code> and print each as <code>name: score</code>
@@hint:zh for name, score in zip(names, scores): print(f"{name}: {score}")。
@@hint:en for name, score in zip(names, scores): print(f"{name}: {score}").
@@starter:zh
names = ["Alice", "Bob", "Carol"]
scores = [90, 85, 92]

@@starter:en
names = ["Alice", "Bob", "Carol"]
scores = [90, 85, 92]

@@answer
names = ["Alice", "Bob", "Carol"]
scores = [90, 85, 92]
for name, score in zip(names, scores):
    print(f"{name}: {score}")

@@expectedOutput
Alice: 90
Bob: 85
Carol: 92
`);
