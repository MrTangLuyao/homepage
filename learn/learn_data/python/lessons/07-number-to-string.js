LEARN.lesson('python', 7, `
@@chapterRef python-tute-1
@@difficulty:zh 入门
@@difficulty:en Beginner
@@intro:zh
<p class="lead">数字不能直接用 <code>+</code> 与字符串拼接，Python 会报 <code>TypeError</code>。用 <code>str()</code> 先把数字转成字符串：</p>
<pre><code>age = 20
# print("年龄：" + age)          # ❌ TypeError
print("年龄：" + str(age))       # ✓  年龄：20</code></pre>
<p>其他常用的转换函数：</p>
<pre><code>print(int(3.9))          # 3      ← 截断（丢弃小数，不是四舍五入）
print(int(-3.9))         # -3     ← 同样是截断，向零靠拢
print(round(3.9))        # 4      ← 四舍五入到整数
print(round(3.567, 2))   # 3.57   ← 保留 2 位小数</code></pre>
<p>还有一种更简洁的方式是 <strong>f-string</strong>，后续课程会详细介绍：</p>
<pre><code>age = 20
print(f"年龄：{age}")    # 年龄：20（无需 str() 转换）</code></pre>
@@intro:en
<p class="lead">You can't concatenate a number directly with a string using <code>+</code> — Python raises a <code>TypeError</code>. Convert the number to a string first with <code>str()</code>:</p>
<pre><code>age = 20
# print("Age: " + age)           # ❌ TypeError
print("Age: " + str(age))        # ✓  Age: 20</code></pre>
<p>Other useful conversion functions:</p>
<pre><code>print(int(3.9))          # 3      ← truncates (does not round)
print(int(-3.9))         # -3     ← truncates toward zero
print(round(3.9))        # 4      ← rounds to nearest integer
print(round(3.567, 2))   # 3.57   ← round to 2 decimal places</code></pre>
<p>A cleaner modern alternative is the <strong>f-string</strong>, covered later in the course:</p>
<pre><code>age = 20
print(f"Age: {age}")     # Age: 20  (no str() needed)</code></pre>
@@task:zh <code>year = 2026</code>，用字符串拼接输出 <code>The year is 2026.</code>
@@task:en Given <code>year = 2026</code>, use string concatenation to print <code>The year is 2026.</code>
@@hint:zh <code>str(year)</code> 先转字符串，再拼接。
@@hint:en Convert with str(year) first, then concatenate.
@@starter:zh
year = 2026
# 字符串拼接输出

@@starter:en
year = 2026
# print using string concatenation

@@answer
year = 2026
print("The year is " + str(year) + ".")

@@expectedOutput
The year is 2026.
`);
