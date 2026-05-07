LEARN.lesson('python', 4, `
@@chapterRef python-tute-1
@@difficulty:zh 入门
@@difficulty:en Beginner
@@intro:zh
<p class="lead">Python 支持常见数学运算符，可对整数（<code>int</code>）和浮点数（<code>float</code>）进行计算：</p>
<table><thead><tr><th>符号</th><th>含义</th><th>示例</th><th>结果</th></tr></thead><tbody>
<tr><td><code>+</code></td><td>加</td><td><code>3 + 4</code></td><td><code>7</code></td></tr>
<tr><td><code>-</code></td><td>减</td><td><code>10 - 3</code></td><td><code>7</code></td></tr>
<tr><td><code>*</code></td><td>乘</td><td><code>3 * 4</code></td><td><code>12</code></td></tr>
<tr><td><code>/</code></td><td>除（结果始终为 float）</td><td><code>7 / 2</code></td><td><code>3.5</code></td></tr>
<tr><td><code>**</code></td><td>幂（乘方）</td><td><code>2 ** 10</code></td><td><code>1024</code></td></tr>
</tbody></table>
<p>注意：<code>/</code> 的结果<strong>始终是浮点数</strong>，即使能整除——<code>4 / 2</code> 得到 <code>2.0</code>，不是 <code>2</code>。</p>
<p>运算优先级（高→低）：<code>**</code> → <code>*</code> <code>/</code> → <code>+</code> <code>-</code>；括号可以强制改变顺序：<code>(2 + 3) * 4</code> → <code>20</code>。</p>
@@intro:en
<p class="lead">Python supports the standard arithmetic operators, working with integers (<code>int</code>) and floating-point numbers (<code>float</code>):</p>
<table><thead><tr><th>Op</th><th>Meaning</th><th>Example</th><th>Result</th></tr></thead><tbody>
<tr><td><code>+</code></td><td>Add</td><td><code>3 + 4</code></td><td><code>7</code></td></tr>
<tr><td><code>-</code></td><td>Subtract</td><td><code>10 - 3</code></td><td><code>7</code></td></tr>
<tr><td><code>*</code></td><td>Multiply</td><td><code>3 * 4</code></td><td><code>12</code></td></tr>
<tr><td><code>/</code></td><td>Divide (always float)</td><td><code>7 / 2</code></td><td><code>3.5</code></td></tr>
<tr><td><code>**</code></td><td>Power</td><td><code>2 ** 10</code></td><td><code>1024</code></td></tr>
</tbody></table>
<p>Note: <code>/</code> <strong>always returns a float</strong>, even when the result is whole — <code>4 / 2</code> gives <code>2.0</code>, not <code>2</code>.</p>
<p>Precedence (high → low): <code>**</code> → <code>*</code> <code>/</code> → <code>+</code> <code>-</code>; parentheses override everything: <code>(2 + 3) * 4</code> → <code>20</code>.</p>
@@task:zh 分两行输出：① <code>2 ** 10</code> 的值；② <code>17 / 4</code> 的值
@@task:en Print two lines: ① the value of <code>2 ** 10</code>; ② the value of <code>17 / 4</code>
@@hint:zh 用两个 print()，把表达式直接放进去。
@@hint:en Use two print() calls with the expressions inside.
@@starter:zh
# 输出两个计算结果

@@starter:en
# Print two results

@@answer
print(2 ** 10)
print(17 / 4)

@@expectedOutput
1024
4.25
`);
