LEARN.lesson('python', 17, `
@@chapterRef python-tute-1
@@difficulty:zh 入门
@@difficulty:en Beginner
@@intro:zh
<p class="lead">列表是<strong>可变的</strong>——与字符串不同，可以直接修改、增加或删除元素，而不需要创建新列表：</p>
<p>修改元素：</p>
<pre><code>fruits = ["apple", "banana", "cherry"]
fruits[0] = "mango"    # 直接赋值修改第一个元素
print(fruits)          # ['mango', 'banana', 'cherry']</code></pre>
<p>添加元素：</p>
<pre><code>fruits.append("grape")      # 追加到末尾
fruits.insert(1, "kiwi")    # 在索引 1 处插入
print(fruits)               # ['mango', 'kiwi', 'banana', 'cherry', 'grape']</code></pre>
<p>删除元素：</p>
<pre><code>fruits.remove("banana")  # 按值删除（第一次出现）
fruits.pop()             # 删除并返回最后一个
fruits.pop(0)            # 删除并返回索引 0 的元素
del fruits[1]            # 按索引删除（不返回）</code></pre>
<p>其他常用方法：</p>
<pre><code>nums = [3, 1, 4, 1, 5]
nums.sort()              # 原地排序（修改自身）
print(nums)              # [1, 1, 3, 4, 5]
nums.reverse()           # 原地反转
print(nums.count(1))     # 2  ← 统计 1 出现的次数</code></pre>
@@intro:en
<p class="lead">Lists are <strong>mutable</strong> — unlike strings, you can modify, add, or remove elements directly without creating a new list:</p>
<p>Modify an element:</p>
<pre><code>fruits = ["apple", "banana", "cherry"]
fruits[0] = "mango"    # assign directly to change the first element
print(fruits)          # ['mango', 'banana', 'cherry']</code></pre>
<p>Add elements:</p>
<pre><code>fruits.append("grape")      # add to the end
fruits.insert(1, "kiwi")    # insert at index 1
print(fruits)               # ['mango', 'kiwi', 'banana', 'cherry', 'grape']</code></pre>
<p>Remove elements:</p>
<pre><code>fruits.remove("banana")  # remove by value (first occurrence)
fruits.pop()             # remove and return the last element
fruits.pop(0)            # remove and return element at index 0
del fruits[1]            # delete by index (no return value)</code></pre>
<p>Other useful methods:</p>
<pre><code>nums = [3, 1, 4, 1, 5]
nums.sort()              # sort in place (modifies the list)
print(nums)              # [1, 1, 3, 4, 5]
nums.reverse()           # reverse in place
print(nums.count(1))     # 2  ← count occurrences of 1</code></pre>
@@task:zh 从 <code>nums = [10, 20, 30]</code> 开始：① append(40)；② 把第一个元素改为 100；③ 输出最终列表
@@task:en Start with <code>nums = [10, 20, 30]</code>: ① append(40); ② change the first element to 100; ③ print the final list
@@hint:zh append() 先加，nums[0] = 100 修改，print(nums) 输出。
@@hint:en append() first, then nums[0] = 100, then print(nums).
@@starter:zh
nums = [10, 20, 30]

@@starter:en
nums = [10, 20, 30]

@@answer
nums = [10, 20, 30]
nums.append(40)
nums[0] = 100
print(nums)

@@expectedOutput
[100, 20, 30, 40]
`);
