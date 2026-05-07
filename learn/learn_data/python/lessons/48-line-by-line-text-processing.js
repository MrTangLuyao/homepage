LEARN.lesson('python', 48, `
@@chapterRef python-tute-3
@@difficulty:zh 进阶
@@difficulty:en Advanced
@@warning:zh
由于浏览器沙箱无法访问本地文件系统，本课时以字符串变量模拟文件内容——逻辑与真实 Python 的 <code>open()</code> 完全一致，在本地环境中替换为 <code>with open("data.txt") as f:</code> 即可直接使用。
@@warning:en
Because the browser sandbox has no access to the local file system, this lesson simulates file content with a string variable. The logic is identical to real Python — in a local environment, replace the string with <code>with open("data.txt") as f:</code> and it works as-is.
@@intro:zh
<p class="lead">在真实 Python 环境中，文件用 <code>open()</code> + <code>with</code> 语句读写：</p>
<pre><code># 真实 Python（本地环境）
with open("data.txt", "r", encoding="utf-8") as f:
    for line in f:              # 直接遍历文件对象，逐行读取
        print(line.strip())     # strip() 去掉末尾的 \\n</code></pre>
<p><code>with</code> 语句确保文件在块结束时自动关闭，即使中途发生异常。</p>
<p>由于<strong>浏览器沙箱无法访问本地文件系统</strong>，本课用字符串变量模拟文件内容——逻辑和真实 Python 完全一致：</p>
<pre><code>content = "Hello\\nWorld\\nPython"

# 等价于逐行遍历文件
for line in content.split("\\n"):
    print(line.strip())</code></pre>
<p>常见文件处理技巧：</p>
<pre><code># 去空行
lines = [l.strip() for l in content.split("\\n") if l.strip()]

# 跳过注释行（以 # 开头）
data = [l for l in content.split("\\n") if not l.startswith("#")]</code></pre>
@@intro:en
<p class="lead">In a real Python environment, files are read and written with <code>open()</code> + the <code>with</code> statement:</p>
<pre><code># real Python (local environment)
with open("data.txt", "r", encoding="utf-8") as f:
    for line in f:              # iterate the file object directly, line by line
        print(line.strip())     # strip() removes the trailing \\n</code></pre>
<p>The <code>with</code> statement ensures the file is automatically closed when the block ends — even if an exception occurs.</p>
<p>Because the <strong>browser sandbox has no access to the local file system</strong>, this lesson uses a string variable to simulate file content — the logic is identical to real Python:</p>
<pre><code>content = "Hello\\nWorld\\nPython"

# equivalent to iterating through a file line by line
for line in content.split("\\n"):
    print(line.strip())</code></pre>
<p>Common file processing patterns:</p>
<pre><code># remove blank lines
lines = [l.strip() for l in content.split("\\n") if l.strip()]

# skip comment lines (starting with #)
data = [l for l in content.split("\\n") if not l.startswith("#")]</code></pre>
@@task:zh 把 <code>content</code> 按行拆分，对每一行输出 <code>"line: " + 去空白后的内容</code>，跳过空行
@@task:en
Split <code>content</code> by line; for each non-empty line print <code>"line: " + stripped content</code>, skipping blank lines
@@hint:zh split("\\n") 拆行，strip() 去空白，if line.strip() 跳过空行。
@@hint:en split("\\n") to split, strip() to clean, if line.strip() to skip blanks.
@@starter:zh
content = "  Alice 90  \\n\\n  Bob 85  \\n  Carol 92  "
# 逐行处理，跳过空行

@@starter:en
content = "  Alice 90  \\n\\n  Bob 85  \\n  Carol 92  "
# process each line, skip blanks

@@answer
content = "  Alice 90  \\n\\n  Bob 85  \\n  Carol 92  "
for line in content.split("\\n"):
    clean = line.strip()
    if clean:
        print("line: " + clean)

@@expectedOutput
line: Alice 90
line: Bob 85
line: Carol 92
`);
