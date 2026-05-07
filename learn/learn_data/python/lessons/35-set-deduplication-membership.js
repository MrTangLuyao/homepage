LEARN.lesson('python', 35, `
@@chapterRef python-tute-2
@@difficulty:zh 初级
@@difficulty:en Elementary
@@intro:zh
<p class="lead">集合（<code>set</code>）是<strong>无序、不重复</strong>的元素集合。无序意味着集合不保证元素的出现顺序；不重复意味着相同的元素只保留一份：</p>
<pre><code>nums = [1, 2, 2, 3, 3, 3]
unique = set(nums)        # 转成集合，自动去重
print(unique)             # {1, 2, 3}（顺序不定）
print(len(unique))        # 3
print(3 in unique)        # True  ← 成员检测比列表快得多</code></pre>
<p>创建集合的两种方式：</p>
<pre><code>s1 = {1, 2, 3}            # 直接用 {} 字面量（注意空集必须用 set()，不能用 {}）
s2 = set([1, 2, 2, 3])   # 从列表转换

empty = set()             # 空集（{} 是空字典，不是空集！）</code></pre>
<p>常用操作：</p>
<pre><code>s = {1, 2, 3}
s.add(4)       # 添加元素
s.remove(2)    # 删除元素（不存在时报 KeyError）
s.discard(99)  # 删除元素（不存在时不报错）
print(s)       # {1, 3, 4}</code></pre>
@@intro:en
<p class="lead">A set is an <strong>unordered, no-duplicate</strong> collection. Unordered means no guaranteed element order; no-duplicate means identical elements are stored only once:</p>
<pre><code>nums = [1, 2, 2, 3, 3, 3]
unique = set(nums)        # convert to set, duplicates removed
print(unique)             # {1, 2, 3}  (order may vary)
print(len(unique))        # 3
print(3 in unique)        # True  ← membership test much faster than a list</code></pre>
<p>Two ways to create a set:</p>
<pre><code>s1 = {1, 2, 3}            # curly-brace literal (empty set MUST use set(), not {})
s2 = set([1, 2, 2, 3])   # convert from a list

empty = set()             # empty set ({} is an empty dict, not a set!)</code></pre>
<p>Common operations:</p>
<pre><code>s = {1, 2, 3}
s.add(4)       # add an element
s.remove(2)    # remove (raises KeyError if missing)
s.discard(99)  # remove (no error if missing)
print(s)       # {1, 3, 4}</code></pre>
@@task:zh <code>nums = [1, 2, 2, 3, 3, 3, 4]</code>，转成集合后：分两行输出去重后的元素个数、以及 <code>3 in unique</code> 的结果
@@task:en
Given <code>nums = [1, 2, 2, 3, 3, 3, 4]</code>, convert to a set then print two lines: the number of unique elements, and the result of <code>3 in unique</code>
@@hint:zh unique = set(nums)，len(unique)，3 in unique。
@@hint:en unique = set(nums), then len(unique) and 3 in unique.
@@starter:zh
nums = [1, 2, 2, 3, 3, 3, 4]

@@starter:en
nums = [1, 2, 2, 3, 3, 3, 4]

@@answer
nums = [1, 2, 2, 3, 3, 3, 4]
unique = set(nums)
print(len(unique))
print(3 in unique)

@@expectedOutput
4
True
`);
