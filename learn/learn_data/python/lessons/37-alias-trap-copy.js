LEARN.lesson('python', 37, `
@@chapterRef python-tute-2
@@difficulty:zh 初级
@@difficulty:en Elementary
@@intro:zh
<p class="lead">Python 中，变量名存的是对象的<strong>引用（地址）</strong>，不是对象本身。<code>b = a</code> 只是让 b 指向和 a 同一个列表，并不创建新的列表：</p>
<pre><code>a = [1, 2, 3]
b = a           # b 和 a 指向同一个列表
b[0] = 99       # 修改通过 b 可见
print(a)        # [99, 2, 3]  ← a 也"变了"！
print(b is a)   # True ← 它们是同一个对象</code></pre>
<p>要创建独立的副本，有三种常见写法：</p>
<pre><code>a = [1, 2, 3]
b1 = a.copy()   # 方法一：.copy()
b2 = list(a)    # 方法二：list() 构造
b3 = a[:]       # 方法三：切片（最老派，但仍常见）

b1[0] = 99
print(a)    # [1, 2, 3]  ← 不受影响
print(b1)   # [99, 2, 3]</code></pre>
<p><strong>注意</strong>：以上三种都是<strong>浅拷贝</strong>——如果列表里有嵌套列表，内层列表仍然共享。深拷贝需要 <code>import copy; copy.deepcopy(a)</code>。</p>
@@intro:en
<p class="lead">In Python, a variable stores a <strong>reference (address)</strong> to an object, not the object itself. <code>b = a</code> makes b point to the same list as a — no new list is created:</p>
<pre><code>a = [1, 2, 3]
b = a           # b and a point to the same list
b[0] = 99       # the change is visible through both names
print(a)        # [99, 2, 3]  ← a "changed" too!
print(b is a)   # True ← they are the same object</code></pre>
<p>To get an independent copy, there are three common approaches:</p>
<pre><code>a = [1, 2, 3]
b1 = a.copy()   # option 1: .copy()
b2 = list(a)    # option 2: list() constructor
b3 = a[:]       # option 3: slice (older style, still common)

b1[0] = 99
print(a)    # [1, 2, 3]  ← unaffected
print(b1)   # [99, 2, 3]</code></pre>
<p><strong>Note</strong>: all three produce a <strong>shallow copy</strong> — nested lists inside are still shared. For full independence, use <code>import copy; copy.deepcopy(a)</code>.</p>
@@task:zh <code>a = [1, 2, 3]</code>，用 <code>.copy()</code> 创建 b；把 b[0] 改为 99；分两行输出 a 和 b
@@task:en Given <code>a = [1, 2, 3]</code>, create b using <code>.copy()</code>; change b[0] to 99; print a and b on two lines
@@hint:zh b = a.copy() 复制，b[0] = 99 修改，print(a) 和 print(b)。
@@hint:en b = a.copy() to copy, b[0] = 99 to modify, then print(a) and print(b).
@@starter:zh
a = [1, 2, 3]
# 复制并修改 b

@@starter:en
a = [1, 2, 3]
# copy and modify b

@@answer
a = [1, 2, 3]
b = a.copy()
b[0] = 99
print(a)
print(b)

@@expectedOutput
[1, 2, 3]
[99, 2, 3]
`);
