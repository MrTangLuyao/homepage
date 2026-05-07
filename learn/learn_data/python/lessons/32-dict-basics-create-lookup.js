LEARN.lesson('python', 32, `
@@chapterRef python-tute-2
@@difficulty:zh 初级
@@difficulty:en Elementary
@@intro:zh
<p class="lead">字典（<code>dict</code>）存储<strong>键值对（key: value）</strong>，通过键快速查找对应的值。键必须是不可变类型（字符串、数字、元组），值可以是任意类型：</p>
<pre><code>person = {"name": "Alice", "age": 20, "scores": [90, 85]}
print(person["name"])    # Alice    ← 用键查找
print(person["age"])     # 20
print(len(person))       # 3        ← 键值对数量</code></pre>
<p>如果键不存在，直接用 <code>[]</code> 访问会报 <code>KeyError</code>。用 <code>.get()</code> 可以安全获取，找不到时返回默认值：</p>
<pre><code>print(person.get("age"))         # 20
print(person.get("email"))       # None  ← 键不存在，不报错
print(person.get("email", "无")) # 无   ← 指定默认值</code></pre>
<p>用 <code>in</code> 检查键是否存在：</p>
<pre><code>print("age" in person)    # True
print("email" in person)  # False</code></pre>
@@intro:en
<p class="lead">A dictionary (<code>dict</code>) stores <strong>key-value pairs</strong> for fast lookup by key. Keys must be immutable (strings, numbers, tuples); values can be anything:</p>
<pre><code>person = {"name": "Alice", "age": 20, "scores": [90, 85]}
print(person["name"])    # Alice    ← look up by key
print(person["age"])     # 20
print(len(person))       # 3        ← number of key-value pairs</code></pre>
<p>Accessing a missing key with <code>[]</code> raises a <code>KeyError</code>. Use <code>.get()</code> for safe access — it returns a default when the key is absent:</p>
<pre><code>print(person.get("age"))           # 20
print(person.get("email"))         # None  ← missing key, no error
print(person.get("email", "n/a"))  # n/a  ← specify a default</code></pre>
<p>Use <code>in</code> to check for key existence:</p>
<pre><code>print("age" in person)    # True
print("email" in person)  # False</code></pre>
@@task:zh <code>capitals = {"France": "Paris", "Japan": "Tokyo", "Australia": "Canberra"}</code>，分两行输出：日本的首都、字典中的条目数
@@task:en
Given <code>capitals = {"France": "Paris", "Japan": "Tokyo", "Australia": "Canberra"}</code>, print two lines: the capital of Japan and the number of entries
@@hint:zh capitals["Japan"] 和 len(capitals)。
@@hint:en capitals["Japan"] and len(capitals).
@@starter:zh
capitals = {"France": "Paris", "Japan": "Tokyo", "Australia": "Canberra"}

@@starter:en
capitals = {"France": "Paris", "Japan": "Tokyo", "Australia": "Canberra"}

@@answer
capitals = {"France": "Paris", "Japan": "Tokyo", "Australia": "Canberra"}
print(capitals["Japan"])
print(len(capitals))

@@expectedOutput
Tokyo
3
`);
