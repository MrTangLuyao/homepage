LEARN.lesson('python', 46, `
@@chapterRef python-tute-3
@@difficulty:zh 进阶
@@difficulty:en Advanced
@@intro:zh
<p class="lead">Python 内置了大量标准库模块，<code>math</code> 是最常用的数学工具模块。用 <code>import math</code> 导入后，通过 <code>math.函数名()</code> 调用：</p>
<pre><code>import math

print(math.sqrt(16))     # 4.0    ← 平方根（结果是 float）
print(math.floor(3.7))   # 3      ← 向下取整（不大于 x 的最大整数）
print(math.ceil(3.2))    # 4      ← 向上取整（不小于 x 的最小整数）
print(math.abs(-5))      # ❌ 不对！绝对值直接用内置 abs(-5)，不用 math</code></pre>
<p>常用函数速查：</p>
<table><thead><tr><th>函数</th><th>含义</th><th>示例</th><th>结果</th></tr></thead><tbody>
<tr><td><code>math.sqrt(x)</code></td><td>平方根</td><td><code>math.sqrt(9)</code></td><td><code>3.0</code></td></tr>
<tr><td><code>math.floor(x)</code></td><td>向下取整</td><td><code>math.floor(3.9)</code></td><td><code>3</code></td></tr>
<tr><td><code>math.ceil(x)</code></td><td>向上取整</td><td><code>math.ceil(3.1)</code></td><td><code>4</code></td></tr>
<tr><td><code>math.log(x)</code></td><td>自然对数 ln</td><td><code>math.log(math.e)</code></td><td><code>1.0</code></td></tr>
<tr><td><code>math.log10(x)</code></td><td>以 10 为底</td><td><code>math.log10(1000)</code></td><td><code>3.0</code></td></tr>
<tr><td><code>math.pi</code></td><td>π 常数</td><td><code>math.pi</code></td><td><code>3.14159...</code></td></tr>
</tbody></table>
<p>如果频繁使用某个函数，可以用 <code>from math import sqrt, pi</code> 直接导入，省去 <code>math.</code> 前缀：</p>
<pre><code>from math import sqrt, pi
print(sqrt(25))   # 5.0
print(pi)         # 3.14159...</code></pre>
@@intro:en
<p class="lead">Python ships with a large standard library. <code>math</code> is the most-used mathematical module. Import it with <code>import math</code> and call functions as <code>math.function_name()</code>:</p>
<pre><code>import math

print(math.sqrt(16))     # 4.0    ← square root (result is float)
print(math.floor(3.7))   # 3      ← round down (largest int ≤ x)
print(math.ceil(3.2))    # 4      ← round up (smallest int ≥ x)
# Note: absolute value uses the built-in abs(), not math</code></pre>
<p>Quick reference for common functions:</p>
<table><thead><tr><th>Function</th><th>Meaning</th><th>Example</th><th>Result</th></tr></thead><tbody>
<tr><td><code>math.sqrt(x)</code></td><td>square root</td><td><code>math.sqrt(9)</code></td><td><code>3.0</code></td></tr>
<tr><td><code>math.floor(x)</code></td><td>round down</td><td><code>math.floor(3.9)</code></td><td><code>3</code></td></tr>
<tr><td><code>math.ceil(x)</code></td><td>round up</td><td><code>math.ceil(3.1)</code></td><td><code>4</code></td></tr>
<tr><td><code>math.log(x)</code></td><td>natural log ln</td><td><code>math.log(math.e)</code></td><td><code>1.0</code></td></tr>
<tr><td><code>math.log10(x)</code></td><td>base-10 log</td><td><code>math.log10(1000)</code></td><td><code>3.0</code></td></tr>
<tr><td><code>math.pi</code></td><td>π constant</td><td><code>math.pi</code></td><td><code>3.14159...</code></td></tr>
</tbody></table>
<p>If you use a function frequently, import it directly to skip the <code>math.</code> prefix:</p>
<pre><code>from math import sqrt, pi
print(sqrt(25))   # 5.0
print(pi)         # 3.14159...</code></pre>
@@task:zh 用 math 模块分三行输出：<code>sqrt(144)</code>、<code>floor(9.9)</code>、<code>ceil(9.1)</code>
@@task:en Use the math module to print three lines: <code>sqrt(144)</code>, <code>floor(9.9)</code>, <code>ceil(9.1)</code>
@@hint:zh import math，再用 math.sqrt、math.floor、math.ceil。
@@hint:en import math, then use math.sqrt, math.floor, math.ceil.
@@starter:zh
import math
# 三行输出

@@starter:en
import math
# three lines of output

@@answer
import math
print(math.sqrt(144))
print(math.floor(9.9))
print(math.ceil(9.1))

@@expectedOutput
12.0
9
10
`);
