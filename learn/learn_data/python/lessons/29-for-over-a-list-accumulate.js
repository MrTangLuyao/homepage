LEARN.lesson('python', 29, `
@@chapterRef python-tute-2
@@difficulty:zh 入门
@@difficulty:en Beginner
@@intro:zh
<p class="lead"><code>for</code> 可以直接遍历列表、字符串、元组等任意序列，每次把当前元素赋给循环变量：</p>
<pre><code>nums = [3, 7, 2, 9]
for n in nums:        # n 依次取 3, 7, 2, 9
    print(n * 2)      # 6  14  4  18</code></pre>
<p>结合累加器，可以对列表求和、求最大值等：</p>
<pre><code>nums = [3, 7, 2, 9]
total = 0
for n in nums:
    total += n
print(total)   # 21</code></pre>
<p>Python 内置了更简洁的方式，实际开发中通常直接用：</p>
<pre><code>nums = [3, 7, 2, 9]
print(sum(nums))    # 21  ← 内置求和
print(max(nums))    # 9   ← 内置最大值
print(min(nums))    # 2   ← 内置最小值</code></pre>
<p>但理解手动累加的逻辑是学习循环的基础，很多复杂问题（如条件求和）必须手写循环。</p>
@@intro:en
<p class="lead"><code>for</code> iterates directly over any sequence — lists, strings, tuples — assigning each element to the loop variable in turn:</p>
<pre><code>nums = [3, 7, 2, 9]
for n in nums:        # n takes values 3, 7, 2, 9 in order
    print(n * 2)      # 6  14  4  18</code></pre>
<p>Combined with an accumulator, you can compute sums, maximums, etc.:</p>
<pre><code>nums = [3, 7, 2, 9]
total = 0
for n in nums:
    total += n
print(total)   # 21</code></pre>
<p>Python has built-in shortcuts for common cases:</p>
<pre><code>nums = [3, 7, 2, 9]
print(sum(nums))    # 21  ← built-in sum
print(max(nums))    # 9   ← built-in max
print(min(nums))    # 2   ← built-in min</code></pre>
<p>Understanding the manual accumulator logic is fundamental — many real problems (like conditional sums) still require a hand-written loop.</p>
@@task:zh <code>nums = [3, 7, 2, 9, 1]</code>，用 for 循环计算所有数字的和并输出
@@task:en Given <code>nums = [3, 7, 2, 9, 1]</code>, use a for loop to compute the sum and print it
@@hint:zh total 从 0 开始，for n in nums: total += n。
@@hint:en Start total at 0, then for n in nums: total += n.
@@starter:zh
nums = [3, 7, 2, 9, 1]
# 累加并输出

@@starter:en
nums = [3, 7, 2, 9, 1]
# accumulate and print

@@answer
nums = [3, 7, 2, 9, 1]
total = 0
for n in nums:
    total += n
print(total)

@@expectedOutput
22
`);
