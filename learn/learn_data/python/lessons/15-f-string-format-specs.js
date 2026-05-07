LEARN.lesson('python', 15, `
@@chapterRef python-tute-1
@@difficulty:zh 入门
@@difficulty:en Beginner
@@intro:zh
<p class="lead">在 f-string 的 <code>{}</code> 中，冒号后面可以加<strong>格式规范</strong>，控制数字的显示方式：<code>{变量:格式}</code>。</p>
<p>最常用的格式规范：</p>
<table><thead><tr><th>格式</th><th>含义</th><th>示例</th><th>输出</th></tr></thead><tbody>
<tr><td><code>.2f</code></td><td>浮点数，保留 2 位小数</td><td><code>f"{9.5:.2f}"</code></td><td><code>9.50</code></td></tr>
<tr><td><code>.4f</code></td><td>浮点数，保留 4 位小数</td><td><code>f"{3.14:.4f}"</code></td><td><code>3.1400</code></td></tr>
<tr><td><code>d</code></td><td>整数</td><td><code>f"{42:d}"</code></td><td><code>42</code></td></tr>
<tr><td><code>10d</code></td><td>整数，最少宽 10 字符（右对齐）</td><td><code>f"{42:10d}"</code></td><td><code>        42</code></td></tr>
<tr><td><code>e</code></td><td>科学记数法</td><td><code>f"{12345:.2e}"</code></td><td><code>1.23e+04</code></td></tr>
</tbody></table>
<pre><code>price = 9.5
print(f"价格：{price:.2f} 元")   # 价格：9.50 元
print(f"价格：{price:.4f} 元")   # 价格：9.5000 元

n = 42
print(f"[{n:8d}]")   # [      42]  ← 右对齐，宽度 8
print(f"[{n:<8d}]")  # [42      ]  ← 左对齐</code></pre>
@@intro:en
<p class="lead">Inside f-string <code>{}</code>, a colon introduces a <strong>format spec</strong> that controls how a value is displayed: <code>{variable:format}</code>.</p>
<p>Most common format specs:</p>
<table><thead><tr><th>Format</th><th>Meaning</th><th>Example</th><th>Output</th></tr></thead><tbody>
<tr><td><code>.2f</code></td><td>float, 2 decimal places</td><td><code>f"{9.5:.2f}"</code></td><td><code>9.50</code></td></tr>
<tr><td><code>.4f</code></td><td>float, 4 decimal places</td><td><code>f"{3.14:.4f}"</code></td><td><code>3.1400</code></td></tr>
<tr><td><code>d</code></td><td>integer</td><td><code>f"{42:d}"</code></td><td><code>42</code></td></tr>
<tr><td><code>10d</code></td><td>integer, min width 10 (right-align)</td><td><code>f"{42:10d}"</code></td><td><code>        42</code></td></tr>
<tr><td><code>e</code></td><td>scientific notation</td><td><code>f"{12345:.2e}"</code></td><td><code>1.23e+04</code></td></tr>
</tbody></table>
<pre><code>price = 9.5
print(f"Price: {price:.2f}")   # Price: 9.50
print(f"Price: {price:.4f}")   # Price: 9.5000

n = 42
print(f"[{n:8d}]")   # [      42]  ← right-align, width 8
print(f"[{n:<8d}]")  # [42      ]  ← left-align</code></pre>
@@task:zh <code>pi = 3.14159</code>，分两行输出：保留 2 位小数、保留 4 位小数
@@task:en Given <code>pi = 3.14159</code>, print two lines: pi to 2 decimal places, then to 4 decimal places
@@hint:zh f"{pi:.2f}" 和 f"{pi:.4f}"。
@@hint:en Use f"{pi:.2f}" and f"{pi:.4f}".
@@starter:zh
pi = 3.14159

@@starter:en
pi = 3.14159

@@answer
pi = 3.14159
print(f"{pi:.2f}")
print(f"{pi:.4f}")

@@expectedOutput
3.14
3.1416
`);
