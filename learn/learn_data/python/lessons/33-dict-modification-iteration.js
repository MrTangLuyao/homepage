LEARN.lesson('python', 33, `
@@chapterRef python-tute-2
@@difficulty:zh 初级
@@difficulty:en Elementary
@@intro:zh
<p class="lead">字典是<strong>可变的</strong>：可以随时修改现有键的值，或添加新键：</p>
<pre><code>d = {"name": "Alice", "age": 20}
d["age"] = 21          # 修改已有键
d["city"] = "Sydney"   # 添加新键
del d["age"]           # 删除键（也可以用 d.pop("age")）</code></pre>
<p>三种遍历方式：</p>
<pre><code>d = {"name": "Alice", "age": 21, "city": "Sydney"}

for k in d:                 # 只遍历键
    print(k)

for v in d.values():        # 只遍历值
    print(v)

for k, v in d.items():      # 同时遍历键和值（最常用）
    print(f"{k}: {v}")</code></pre>
<p><strong>注意</strong>：Python 3.7+ 保证字典保持插入顺序，遍历时元素按插入顺序出现。</p>
@@intro:en
<p class="lead">Dictionaries are <strong>mutable</strong>: you can change existing values or add new keys at any time:</p>
<pre><code>d = {"name": "Alice", "age": 20}
d["age"] = 21          # modify existing key
d["city"] = "Sydney"   # add new key
del d["age"]           # remove a key (or use d.pop("age"))</code></pre>
<p>Three ways to iterate:</p>
<pre><code>d = {"name": "Alice", "age": 21, "city": "Sydney"}

for k in d:                 # keys only
    print(k)

for v in d.values():        # values only
    print(v)

for k, v in d.items():      # both key and value (most common)
    print(f"{k}: {v}")</code></pre>
<p><strong>Note</strong>: Python 3.7+ guarantees insertion order is preserved, so iteration always follows the order items were added.</p>
@@task:zh 从 <code>person = {"name": "Alice", "age": 20}</code>：把 age 改为 21，添加 "city": "Sydney"；分两行输出修改后的 age 和 city
@@task:en
Start with <code>person = {"name": "Alice", "age": 20}</code>: change age to 21, add "city": "Sydney"; print the updated age and city on two lines
@@hint:zh person["age"] = 21，person["city"] = "Sydney"，再输出两个值。
@@hint:en person["age"] = 21, person["city"] = "Sydney", then print both.
@@starter:zh
person = {"name": "Alice", "age": 20}
# 修改 age，添加 city

@@starter:en
person = {"name": "Alice", "age": 20}
# change age, add city

@@answer
person = {"name": "Alice", "age": 20}
person["age"] = 21
person["city"] = "Sydney"
print(person["age"])
print(person["city"])

@@expectedOutput
21
Sydney
`);
