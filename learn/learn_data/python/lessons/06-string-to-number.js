LEARN.lesson('python', 6, `
@@chapterRef python-tute-1
@@difficulty:zh 入门
@@difficulty:en Beginner
@@intro:zh
<p class="lead"><code>input()</code> 的返回值是字符串，无法直接用于数学运算。用 <code>int()</code> 转换为整数，用 <code>float()</code> 转换为小数：</p>
<pre><code>s = "42"
n = int(s)          # 字符串 → 整数
print(n + 1)        # 43（数学加法，不是拼接）

x = float("3.14")
print(x * 2)        # 6.28</code></pre>
<p>实际使用时，直接把 <code>input()</code> 套在里面一起写：</p>
<pre><code>n = int(input("整数："))    # str → int
x = float(input("小数："))  # str → float</code></pre>
<p><strong>注意</strong>：如果用户输入的不是合法数字（比如 <code>abc</code>），<code>int()</code> 或 <code>float()</code> 会抛出 <code>ValueError</code> 错误，程序会终止。</p>
@@intro:en
<p class="lead"><code>input()</code> always returns a string, which can't be used in math directly. Use <code>int()</code> to convert to an integer, or <code>float()</code> to convert to a decimal:</p>
<pre><code>s = "42"
n = int(s)          # string → integer
print(n + 1)        # 43  (math, not concatenation)

x = float("3.14")
print(x * 2)        # 6.28</code></pre>
<p>In practice, wrap <code>input()</code> directly:</p>
<pre><code>n = int(input("Integer: "))    # str → int
x = float(input("Decimal: "))  # str → float</code></pre>
<p><strong>Note</strong>: if the user types something that isn't a valid number (e.g. <code>abc</code>), <code>int()</code> / <code>float()</code> raises a <code>ValueError</code> and the program stops.</p>
@@task:zh 用 <code>input("km: ")</code> 读取整数（千米），输出对应的米数（×1000）
@@task:en Use <code>input("km: ")</code> to read an integer (km), print the equivalent in metres (×1000)
@@hint:zh <code>int(input("km: "))</code> 包住就完成转换。
@@hint:en Wrap input() with int() to convert.
@@starter:zh
# 读取千米数，输出米数

@@starter:en
# Read km, print metres

@@answer
km = int(input("km: "))
print(km * 1000)

@@expectedOutput
5000

@@testInputs
5`);
