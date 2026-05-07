LEARN.lesson('python', 58, `
@@chapterRef python-tute-3
@@difficulty:zh 进阶
@@difficulty:en Advanced
@@intro:zh
<p class="lead"><code>all()</code> 检查序列中<strong>所有</strong>元素是否都满足条件（全真才真）；<code>any()</code> 检查是否<strong>至少有一个</strong>满足条件（有一真就真）：</p>
<pre><code>nums = [2, 4, 6, 8]
print(all(n % 2 == 0 for n in nums))   # True  ← 全部是偶数
print(any(n > 5 for n in nums))         # True  ← 有 6 和 8 大于 5</code></pre>
<p>括号里用的是<strong>生成器表达式</strong>（类似列表推导式，但不生成列表，更省内存）：<code>条件表达式 for 变量 in 可迭代对象</code>。</p>
<p><strong>短路特性</strong>（与 and/or 类似）：</p>
<ul>
<li><code>all()</code>：遇到第一个 <code>False</code> 就立刻返回 <code>False</code>，不再检查后面的元素</li>
<li><code>any()</code>：遇到第一个 <code>True</code> 就立刻返回 <code>True</code>，不再检查后面的元素</li>
</ul>
<pre><code>nums = [2, 3, 4, 6]
print(all(n % 2 == 0 for n in nums))   # False ← n=3 就停了
print(any(n > 10 for n in nums))        # False ← 遍历完都没找到</code></pre>
<p><strong>边界情况</strong>：对<strong>空序列</strong>，<code>all([])</code> 返回 <code>True</code>（"没有任何元素违反条件"），<code>any([])</code> 返回 <code>False</code>（"没有任何元素满足条件"）。</p>
@@intro:en
<p class="lead"><code>all()</code> checks whether <strong>every</strong> element in a sequence satisfies a condition (all true → true); <code>any()</code> checks whether <strong>at least one</strong> does (one true is enough):</p>
<pre><code>nums = [2, 4, 6, 8]
print(all(n % 2 == 0 for n in nums))   # True  ← all are even
print(any(n > 5 for n in nums))         # True  ← 6 and 8 are > 5</code></pre>
<p>The argument uses a <strong>generator expression</strong> (like a list comprehension but without building a list — more memory-efficient): <code>condition for variable in iterable</code>.</p>
<p><strong>Short-circuit behaviour</strong> (same as and/or):</p>
<ul>
<li><code>all()</code>: stops and returns <code>False</code> on the first <code>False</code> it finds</li>
<li><code>any()</code>: stops and returns <code>True</code> on the first <code>True</code> it finds</li>
</ul>
<pre><code>nums = [2, 3, 4, 6]
print(all(n % 2 == 0 for n in nums))   # False ← stops at n=3
print(any(n > 10 for n in nums))        # False ← exhausts the whole list</code></pre>
<p><strong>Edge cases</strong>: on an <strong>empty sequence</strong>, <code>all([])</code> returns <code>True</code> ("no element violates the condition") and <code>any([])</code> returns <code>False</code> ("no element satisfies the condition").</p>
@@task:zh <code>nums = [2, 4, 6, 8, 10]</code>，分两行输出：所有数是否都是偶数（<code>all</code>）、是否存在大于 7 的数（<code>any</code>）
@@task:en
Given <code>nums = [2, 4, 6, 8, 10]</code>, print two lines: whether all numbers are even (use <code>all</code>), and whether any number is greater than 7 (use <code>any</code>)
@@hint:zh all(n % 2 == 0 for n in nums) 和 any(n > 7 for n in nums)。
@@hint:en all(n % 2 == 0 for n in nums) and any(n > 7 for n in nums).
@@starter:zh
nums = [2, 4, 6, 8, 10]

@@starter:en
nums = [2, 4, 6, 8, 10]

@@answer
nums = [2, 4, 6, 8, 10]
print(all(n % 2 == 0 for n in nums))
print(any(n > 7 for n in nums))

@@expectedOutput
True
True
`);
