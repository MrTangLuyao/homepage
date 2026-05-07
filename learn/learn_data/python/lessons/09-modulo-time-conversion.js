LEARN.lesson('python', 9, `
@@chapterRef python-tute-1
@@difficulty:zh 入门
@@difficulty:en Beginner
@@intro:zh
<p class="lead"><code>%</code> 取余（模运算），返回除法的<strong>余数</strong>：</p>
<pre><code>print(17 % 5)    # 2    ← 17 = 5×3 + 2，余 2
print(10 % 3)    # 1
print(6 % 2)     # 0    ← 能整除时余数为 0</code></pre>
<p><code>//</code> 和 <code>%</code> 常配合使用，把一个总量分解为多个单位：</p>
<pre><code>total = 137           # 分钟数
hours   = total // 60   # 2（完整小时）
minutes = total % 60    # 17（剩余分钟）
print(hours, "小时", minutes, "分钟")  # 2 小时 17 分钟</code></pre>
<p>其他常见用途：</p>
<ul>
<li>判断奇偶：<code>n % 2 == 0</code> 为偶数，<code>n % 2 == 1</code> 为奇数</li>
<li>循环编号：<code>i % n</code> 让结果在 <code>0 ~ n-1</code> 之间循环（常用于列表下标）</li>
</ul>
@@intro:en
<p class="lead"><code>%</code> is the modulo operator — it returns the <strong>remainder</strong> of division:</p>
<pre><code>print(17 % 5)    # 2    ← 17 = 5×3 + 2, remainder 2
print(10 % 3)    # 1
print(6 % 2)     # 0    ← exactly divisible, no remainder</code></pre>
<p><code>//</code> and <code>%</code> are often used together to split a total into multiple units:</p>
<pre><code>total = 137             # minutes
hours   = total // 60   # 2  (complete hours)
minutes = total % 60    # 17 (remaining minutes)
print(hours, "hr", minutes, "min")  # 2 hr 17 min</code></pre>
<p>Other common uses:</p>
<ul>
<li>Even/odd check: <code>n % 2 == 0</code> is even, <code>n % 2 == 1</code> is odd</li>
<li>Cycling indices: <code>i % n</code> keeps the result in the range <code>0 ~ n-1</code> (useful for list indexing)</li>
</ul>
@@task:zh <code>total = 500</code> 秒，分两行输出完整分钟数和剩余秒数
@@task:en Given <code>total = 500</code> seconds, print two lines: complete minutes and remaining seconds
@@hint:zh <code>total // 60</code> 分钟，<code>total % 60</code> 剩余秒。
@@hint:en total // 60 for minutes, total % 60 for remaining seconds.
@@starter:zh
total = 500

@@starter:en
total = 500

@@answer
total = 500
print(total // 60)
print(total % 60)

@@expectedOutput
8
20
`);
