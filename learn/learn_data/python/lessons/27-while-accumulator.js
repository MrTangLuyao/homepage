LEARN.lesson('python', 27, `
@@chapterRef python-tute-2
@@difficulty:zh 入门
@@difficulty:en Beginner
@@intro:zh
<p class="lead"><strong>累加器模式</strong>：在循环外初始化一个结果变量（通常为 <code>0</code>），在每次循环中将当前值加进去：</p>
<pre><code>total = 0     # 累加器初始为 0
i = 1
while i <= 5:
    total += i   # 每次把 i 加进 total
    i += 1
print(total)     # 15  （1+2+3+4+5）</code></pre>
<p>同样的模式可以用于乘积（初始值改为 1）：</p>
<pre><code>product = 1   # 乘积累加器初始为 1（不能是 0！）
i = 1
while i <= 5:
    product *= i   # 1×2×3×4×5
    i += 1
print(product)    # 120  （5 的阶乘）</code></pre>
<p>或用于计数：</p>
<pre><code>count = 0
i = 1
while i <= 20:
    if i % 3 == 0:
        count += 1   # 统计 1-20 中 3 的倍数
    i += 1
print(count)     # 6</code></pre>
@@intro:en
<p class="lead">The <strong>accumulator pattern</strong>: initialise a result variable outside the loop (usually <code>0</code>), then add the current value to it on each iteration:</p>
<pre><code>total = 0     # accumulator starts at 0
i = 1
while i <= 5:
    total += i   # add i to total each time
    i += 1
print(total)     # 15  (1+2+3+4+5)</code></pre>
<p>The same pattern works for products (start at 1 instead of 0):</p>
<pre><code>product = 1   # product accumulator starts at 1 (never 0!)
i = 1
while i <= 5:
    product *= i   # 1×2×3×4×5
    i += 1
print(product)    # 120  (5 factorial)</code></pre>
<p>Or for counting:</p>
<pre><code>count = 0
i = 1
while i <= 20:
    if i % 3 == 0:
        count += 1   # count multiples of 3 in 1–20
    i += 1
print(count)     # 6</code></pre>
@@task:zh 用 while 循环计算 1 + 2 + … + 10 的总和，输出结果
@@task:en Use a while loop to compute 1 + 2 + … + 10 and print the result
@@hint:zh total 从 0 开始，i 从 1 到 10，每次 total += i。
@@hint:en Start total at 0, loop i from 1 to 10, add total += i each time.
@@starter:zh
# 累加 1 到 10

@@starter:en
# accumulate 1 to 10

@@answer
total = 0
i = 1
while i <= 10:
    total += i
    i += 1
print(total)

@@expectedOutput
55
`);
