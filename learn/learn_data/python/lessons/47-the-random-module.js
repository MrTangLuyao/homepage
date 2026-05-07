LEARN.lesson('python', 47, `
@@chapterRef python-tute-3
@@difficulty:zh 进阶
@@difficulty:en Advanced
@@intro:zh
<p class="lead"><code>random</code> 模块提供各种随机化功能，是游戏、模拟和测试中的常用工具：</p>
<table><thead><tr><th>函数</th><th>含义</th><th>示例</th></tr></thead><tbody>
<tr><td><code>randint(a, b)</code></td><td>生成 [a, b] 的随机整数（含两端）</td><td><code>randint(1, 6)</code> → 骰子</td></tr>
<tr><td><code>random()</code></td><td>生成 [0.0, 1.0) 的随机浮点数</td><td><code>random()</code> → 0.37...</td></tr>
<tr><td><code>choice(seq)</code></td><td>从序列中随机选一个</td><td><code>choice(["A","B","C"])</code></td></tr>
<tr><td><code>shuffle(lst)</code></td><td>原地打乱列表</td><td><code>shuffle(cards)</code></td></tr>
<tr><td><code>sample(seq, k)</code></td><td>不重复地随机抽 k 个</td><td><code>sample(range(100), 5)</code></td></tr>
</tbody></table>
<pre><code>from random import randint, choice, shuffle

# 模拟掷骰子
print(randint(1, 6))          # 1~6 随机整数

# 随机选一个水果
fruits = ["apple", "banana", "cherry"]
print(choice(fruits))

# 打乱列表
nums = [1, 2, 3, 4, 5]
shuffle(nums)
print(nums)                   # 顺序每次不同</code></pre>
<p>由于结果是随机的，每次运行输出都不同，点 <strong>运行</strong> 多次看效果即可。</p>
<p>在推导式中用 <code>_</code>（下划线）作为"占位循环变量"，表示"我只需要循环 n 次，不关心索引值"：</p>
<pre><code>nums = [randint(1, 10) for _ in range(5)]  # _ 表示不用这个索引</code></pre>
@@intro:en
<p class="lead">The <code>random</code> module provides a variety of randomisation tools — essential for games, simulations, and testing:</p>
<table><thead><tr><th>Function</th><th>Meaning</th><th>Example</th></tr></thead><tbody>
<tr><td><code>randint(a, b)</code></td><td>random integer in [a, b] inclusive</td><td><code>randint(1, 6)</code> → dice roll</td></tr>
<tr><td><code>random()</code></td><td>random float in [0.0, 1.0)</td><td><code>random()</code> → 0.37...</td></tr>
<tr><td><code>choice(seq)</code></td><td>pick one element at random</td><td><code>choice(["A","B","C"])</code></td></tr>
<tr><td><code>shuffle(lst)</code></td><td>shuffle a list in place</td><td><code>shuffle(cards)</code></td></tr>
<tr><td><code>sample(seq, k)</code></td><td>pick k unique elements at random</td><td><code>sample(range(100), 5)</code></td></tr>
</tbody></table>
<pre><code>from random import randint, choice, shuffle

# simulate a dice roll
print(randint(1, 6))

# pick a random fruit
fruits = ["apple", "banana", "cherry"]
print(choice(fruits))

# shuffle a list
nums = [1, 2, 3, 4, 5]
shuffle(nums)
print(nums)                   # different order every time</code></pre>
<p>Because results are random, output changes every run — click <strong>Run</strong> several times to see this.</p>
<p>Use <code>_</code> (underscore) as a "throwaway loop variable" when you only need to repeat n times and don't care about the index:</p>
<pre><code>nums = [randint(1, 10) for _ in range(5)]  # _ means "I don't need this index"</code></pre>
@@task:zh 用列表推导式 + <code>randint(1, 10)</code> 生成 5 个随机整数，存入 <code>nums</code>；分两行输出 nums 的长度和是否全部在 1~10 之间
@@task:en
Use a list comprehension + <code>randint(1, 10)</code> to generate 5 random integers into <code>nums</code>; print two lines: the length of nums and whether all values are in range
@@hint:zh [randint(1,10) for _ in range(5)]；all(1<=n<=10 for n in nums)。
@@hint:en [randint(1,10) for _ in range(5)]; all(1 <= n <= 10 for n in nums).
@@starter:zh
from random import randint
# 生成 5 个随机整数

@@starter:en
from random import randint
# generate 5 random integers

@@answer
from random import randint
nums = [randint(1, 10) for _ in range(5)]
print(len(nums))
print(all(1 <= n <= 10 for n in nums))

@@expectedOutput
5
True
`);
