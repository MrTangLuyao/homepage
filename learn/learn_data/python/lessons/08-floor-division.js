LEARN.lesson('python', 8, `
@@chapterRef python-tute-1
@@difficulty:zh 入门
@@difficulty:en Beginner
@@intro:zh
<p class="lead"><code>//</code> 整除运算符，只保留商的<strong>整数部分</strong>，小数直接丢弃（不是四舍五入）：</p>
<pre><code>print(17 // 5)    # 3     ← 17 ÷ 5 = 3 余 2
print(17 / 5)     # 3.4   ← 普通除法（比较）
print(7 // 2)     # 3
print(10 // 3)    # 3
print(6 // 2)     # 3     ← 能整除也是整数</code></pre>
<p>常见用途：把"总量"换算成"大单位"的整数部分，例如总秒数换算分钟数：</p>
<pre><code>total_sec = 500
minutes = total_sec // 60   # 8（完整分钟数，余下的秒不算）</code></pre>
<p><strong>类型规则</strong>：两个整数 <code>//</code> 结果是 <code>int</code>；若任一操作数是 <code>float</code>，结果是 <code>float</code>：<code>7.0 // 2</code> → <code>3.0</code>。</p>
@@intro:en
<p class="lead"><code>//</code> is the floor division operator — it returns only the <strong>integer part</strong> of the quotient, discarding any remainder (no rounding):</p>
<pre><code>print(17 // 5)    # 3     ← 17 ÷ 5 = 3 remainder 2
print(17 / 5)     # 3.4   ← normal division (for comparison)
print(7 // 2)     # 3
print(10 // 3)    # 3
print(6 // 2)     # 3     ← exact division still gives int</code></pre>
<p>Common use: convert a total into the integer number of a larger unit, e.g. seconds to minutes:</p>
<pre><code>total_sec = 500
minutes = total_sec // 60   # 8  (complete minutes, leftover seconds dropped)</code></pre>
<p><strong>Type rule</strong>: two integers with <code>//</code> give an <code>int</code> result; if either operand is a <code>float</code>, the result is a <code>float</code>: <code>7.0 // 2</code> → <code>3.0</code>.</p>
@@task:zh <code>total = 500</code> 秒，用 <code>//</code> 输出包含多少个完整分钟
@@task:en Given <code>total = 500</code> seconds, use <code>//</code> to print how many complete minutes that contains
@@hint:zh <code>total // 60</code> 得到完整分钟数。
@@hint:en total // 60 gives the complete minutes.
@@starter:zh
total = 500
# 输出完整分钟数

@@starter:en
total = 500
# print complete minutes

@@answer
total = 500
print(total // 60)

@@expectedOutput
8
`);
