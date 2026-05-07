LEARN.lesson('python', 18, `
@@chapterRef python-tute-1
@@difficulty:zh 入门
@@difficulty:en Beginner
@@intro:zh
<p class="lead">元组（<code>tuple</code>）与列表类似，但是<strong>不可变的</strong>——创建后不能修改、添加或删除元素。用圆括号 <code>()</code> 创建：</p>
<pre><code>point = (3, 4)
print(point[0])    # 3   ← 索引访问（与列表一样）
print(point[-1])   # 4
print(len(point))  # 2

# point[0] = 99   # ❌ TypeError: tuple 不支持赋值</code></pre>
<p>元组支持和列表相同的只读操作（索引、切片、in、len），但不能修改：</p>
<pre><code>rgb = (255, 128, 0)
print(rgb[1:])         # (128, 0)
print(0 in rgb)        # False
print(255 in rgb)      # True</code></pre>
<p><strong>元组解包</strong>：把元组的各个值直接赋给多个变量，非常常用：</p>
<pre><code>point = (3, 4)
x, y = point            # 解包
print(f"x={x}, y={y}")  # x=3, y=4

a, b, c = (10, 20, 30)  # 三个变量同时赋值</code></pre>
<p>什么时候用元组：坐标、RGB 颜色、日期等"固定结构"的数据；函数返回多个值（Python 返回的其实是元组）。</p>
@@intro:en
<p class="lead">A tuple is like a list but <strong>immutable</strong> — once created, its contents cannot be changed, added to, or removed from. Created with parentheses <code>()</code>:</p>
<pre><code>point = (3, 4)
print(point[0])    # 3   ← indexing works just like a list
print(point[-1])   # 4
print(len(point))  # 2

# point[0] = 99   # ❌ TypeError: tuples don't support assignment</code></pre>
<p>Tuples support all read-only operations (indexing, slicing, in, len) but not modification:</p>
<pre><code>rgb = (255, 128, 0)
print(rgb[1:])         # (128, 0)
print(0 in rgb)        # False
print(255 in rgb)      # True</code></pre>
<p><strong>Tuple unpacking</strong>: assign each value of a tuple directly to separate variables — very common in Python:</p>
<pre><code>point = (3, 4)
x, y = point            # unpack
print(f"x={x}, y={y}")  # x=3, y=4

a, b, c = (10, 20, 30)  # three variables at once</code></pre>
<p>When to use tuples: coordinates, RGB colours, dates, or any "fixed-structure" data; also what Python returns when a function returns multiple values.</p>
@@task:zh <code>coords = (10, 20, 30)</code>，分三行输出 x、y、z
@@task:en Given <code>coords = (10, 20, 30)</code>, print the x, y, and z values on three separate lines
@@hint:zh coords[0]、coords[1]、coords[2]。
@@hint:en coords[0], coords[1], coords[2].
@@starter:zh
coords = (10, 20, 30)

@@starter:en
coords = (10, 20, 30)

@@answer
coords = (10, 20, 30)
print(coords[0])
print(coords[1])
print(coords[2])

@@expectedOutput
10
20
30
`);
