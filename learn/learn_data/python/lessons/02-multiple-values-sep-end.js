LEARN.lesson('python', 2, `
@@chapterRef python-tute-1
@@difficulty:zh 入门
@@difficulty:en Beginner
@@intro:zh
<p class="lead"><code>print()</code> 可以一次输出多个值，用逗号分隔传入。默认各值之间用<strong>空格</strong>隔开，末尾加换行。</p>
<p>用 <code>sep</code>（separator，分隔符）和 <code>end</code>（结尾字符）自定义格式：</p>
<pre><code>print("Alice", 20)              # Alice 20     ← sep 默认 " "
print("A", "B", "C", sep="-")  # A-B-C         ← 改用 "-"
print("A", "B", "C", sep="")   # ABC           ← 无间隔
print("no newline", end="!")    # no newline!   ← end 改为 "!"
print("line 1", end=" | ")
print("line 2")                 # line 1 | line 2</code></pre>
<p>默认值：<code>sep=" "</code>（一个空格），<code>end="\\n"</code>（换行符）。</p>
@@intro:en
<p class="lead"><code>print()</code> accepts multiple arguments separated by commas. By default values are separated by a <strong>space</strong> and a newline is added at the end.</p>
<p>Use <code>sep</code> (separator) and <code>end</code> to customise the output format:</p>
<pre><code>print("Alice", 20)              # Alice 20     ← sep defaults to " "
print("A", "B", "C", sep="-")  # A-B-C         ← changed to "-"
print("A", "B", "C", sep="")   # ABC           ← no gap
print("no newline", end="!")    # no newline!   ← end changed to "!"
print("line 1", end=" | ")
print("line 2")                 # line 1 | line 2</code></pre>
<p>Defaults: <code>sep=" "</code> (one space), <code>end="\\n"</code> (newline).</p>
@@task:zh 用一次 <code>print()</code> 输出 <code>2026-5-5</code>（三个数字，用 <code>-</code> 分隔）
@@task:en Use a single <code>print()</code> to output <code>2026-5-5</code> (three numbers separated by <code>-</code>)
@@hint:zh 传入三个数字，加 <code>sep="-"</code>。
@@hint:en Pass three numbers and add <code>sep="-"</code>.
@@starter:zh
# 一个 print，三个参数

@@starter:en
# One print call, three arguments

@@answer
print(2026, 5, 5, sep="-")

@@expectedOutput
2026-5-5
`);
