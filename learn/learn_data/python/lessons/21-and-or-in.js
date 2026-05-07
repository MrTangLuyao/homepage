LEARN.lesson('python', 21, `
@@chapterRef python-tute-1
@@difficulty:zh 入门
@@difficulty:en Beginner
@@intro:zh
<p class="lead">Python 用英文单词而非符号组合条件，可读性更强：</p>
<table><thead><tr><th>运算符</th><th>含义</th><th>示例</th><th>结果</th></tr></thead><tbody>
<tr><td><code>and</code></td><td>两者都为真才为真</td><td><code>3 > 1 and 5 > 2</code></td><td><code>True</code></td></tr>
<tr><td><code>or</code></td><td>至少一个为真即为真</td><td><code>3 > 10 or 5 > 2</code></td><td><code>True</code></td></tr>
<tr><td><code>not</code></td><td>取反</td><td><code>not (3 > 10)</code></td><td><code>True</code></td></tr>
<tr><td><code>in</code></td><td>属于序列/集合</td><td><code>"a" in "cat"</code></td><td><code>True</code></td></tr>
<tr><td><code>not in</code></td><td>不属于序列/集合</td><td><code>5 not in [1,2,3]</code></td><td><code>True</code></td></tr>
</tbody></table>
<pre><code>x = 15
print(x > 10 and x < 20)   # True  ← 10 < x < 20 的等价写法
print(x < 5  or  x > 10)   # True  ← 满足其中一个
print(not (x == 15))        # False ← 对 True 取反
print(x in [10, 15, 20])    # True  ← 15 在列表里</code></pre>
<p><strong>短路求值</strong>：<code>and</code> 左边为假时直接返回 False（右边不执行）；<code>or</code> 左边为真时直接返回 True。这在右边有副作用（比如 <code>input()</code>）时很重要。</p>
@@intro:en
<p class="lead">Python uses English words instead of symbols to combine conditions — more readable:</p>
<table><thead><tr><th>Operator</th><th>Meaning</th><th>Example</th><th>Result</th></tr></thead><tbody>
<tr><td><code>and</code></td><td>both must be true</td><td><code>3 > 1 and 5 > 2</code></td><td><code>True</code></td></tr>
<tr><td><code>or</code></td><td>at least one must be true</td><td><code>3 > 10 or 5 > 2</code></td><td><code>True</code></td></tr>
<tr><td><code>not</code></td><td>negate</td><td><code>not (3 > 10)</code></td><td><code>True</code></td></tr>
<tr><td><code>in</code></td><td>membership in a sequence/set</td><td><code>"a" in "cat"</code></td><td><code>True</code></td></tr>
<tr><td><code>not in</code></td><td>not a member</td><td><code>5 not in [1,2,3]</code></td><td><code>True</code></td></tr>
</tbody></table>
<pre><code>x = 15
print(x > 10 and x < 20)   # True  ← equivalent to 10 < x < 20
print(x < 5  or  x > 10)   # True  ← one condition is enough
print(not (x == 15))        # False ← negates True
print(x in [10, 15, 20])    # True  ← 15 is in the list</code></pre>
<p><strong>Short-circuit evaluation</strong>: if the left side of <code>and</code> is false, Python never evaluates the right side; if the left side of <code>or</code> is true, the right side is skipped. Useful when the right side has side effects.</p>
@@task:zh 用 <code>input("Year: ")</code> 读取年份，输出 <code>leap year</code> 或 <code>not a leap year</code>
@@task:en Use <code>input("Year: ")</code> to read a year, print <code>leap year</code> or <code>not a leap year</code>
@@hint:zh 条件：<code>(year % 4 == 0 and year % 100 != 0) or year % 400 == 0</code>
@@hint:en Condition: <code>(year % 4 == 0 and year % 100 != 0) or year % 400 == 0</code>
@@starter:zh
year = int(input("Year: "))

@@starter:en
year = int(input("Year: "))

@@answer
year = int(input("Year: "))
if (year % 4 == 0 and year % 100 != 0) or year % 400 == 0:
    print("leap year")
else:
    print("not a leap year")

@@expectedOutput
leap year

@@testInputs
2024`);
