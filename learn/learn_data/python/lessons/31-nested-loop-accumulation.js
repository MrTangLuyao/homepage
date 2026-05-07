LEARN.lesson('python', 31, `
@@chapterRef python-tute-2
@@difficulty:zh 初级
@@difficulty:en Elementary
@@intro:zh
<p class="lead">嵌套循环特别适合处理"每对组合"的问题——枚举所有可能的 (i, j) 组合并对每对做计算：</p>
<pre><code>total = 0
for i in range(1, 4):     # i = 1, 2, 3
    for j in range(1, 4): # j = 1, 2, 3
        total += i * j    # 把 i×j 累加进 total
print(total)   # 36</code></pre>
<p>手动展开验证：</p>
<pre><code># i=1: 1×1 + 1×2 + 1×3 = 6
# i=2: 2×1 + 2×2 + 2×3 = 12
# i=3: 3×1 + 3×2 + 3×3 = 18
# 合计：6 + 12 + 18 = 36 ✓</code></pre>
<p>也可以在内层循环里加条件，只累计满足要求的组合：</p>
<pre><code>count = 0
for i in range(1, 6):
    for j in range(1, 6):
        if i + j == 6:       # 只统计 i+j=6 的组合
            count += 1
print(count)   # 5  （(1,5)(2,4)(3,3)(4,2)(5,1)）</code></pre>
@@intro:en
<p class="lead">Nested loops are ideal for "every pair" problems — enumerate all (i, j) combinations and compute something for each pair:</p>
<pre><code>total = 0
for i in range(1, 4):     # i = 1, 2, 3
    for j in range(1, 4): # j = 1, 2, 3
        total += i * j    # accumulate i×j
print(total)   # 36</code></pre>
<p>Verify by hand:</p>
<pre><code># i=1: 1×1 + 1×2 + 1×3 = 6
# i=2: 2×1 + 2×2 + 2×3 = 12
# i=3: 3×1 + 3×2 + 3×3 = 18
# total: 6 + 12 + 18 = 36 ✓</code></pre>
<p>You can add a condition inside the inner loop to only count qualifying pairs:</p>
<pre><code>count = 0
for i in range(1, 6):
    for j in range(1, 6):
        if i + j == 6:       # only count pairs where i+j = 6
            count += 1
print(count)   # 5  ((1,5)(2,4)(3,3)(4,2)(5,1))</code></pre>
@@task:zh 用嵌套循环计算所有 i×j 之积的总和（i 和 j 各从 1 到 3），输出结果
@@task:en Use nested loops to compute the sum of all products i×j (i and j each from 1 to 3), print the result
@@hint:zh 外层 range(1,4)，内层 range(1,4)，total += i * j。
@@hint:en Outer range(1,4), inner range(1,4), total += i * j.
@@starter:zh
total = 0
# 嵌套循环
print(total)

@@starter:en
total = 0
# nested loops
print(total)

@@answer
total = 0
for i in range(1, 4):
    for j in range(1, 4):
        total += i * j
print(total)

@@expectedOutput
36
`);
