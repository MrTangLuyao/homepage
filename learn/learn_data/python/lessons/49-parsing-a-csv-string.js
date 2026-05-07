LEARN.lesson('python', 49, `
@@chapterRef python-tute-3
@@difficulty:zh 进阶
@@difficulty:en Advanced
@@warning:zh 由于浏览器沙箱无法访问本地文件系统，本课时以字符串变量模拟 CSV 文件内容。真实场景中应使用 Python 内置的 <code>csv</code> 模块配合 <code>open()</code>，解析逻辑完全相同。
@@warning:en
Because the browser sandbox has no file system access, this lesson simulates CSV file content with a string. In a real project, use Python's built-in <code>csv</code> module together with <code>open()</code> — the parsing logic is exactly the same.
@@intro:zh
<p class="lead">CSV（Comma-Separated Values，逗号分隔值）是一种极其普遍的数据格式：每行是一条记录，字段之间用逗号分隔，第一行通常是列名（表头）：</p>
<pre><code>name,age,score
Alice,20,90
Bob,21,85
Carol,19,92</code></pre>
<p>手动解析逻辑：按 <code>\\n</code> 拆行 → 跳过表头 → 对每行按逗号拆字段：</p>
<pre><code>csv_data = "name,age\\nAlice,20\\nBob,21"
lines = csv_data.split("\\n")   # 先按行拆
header = lines[0].split(",")    # 第一行是表头
print(header)   # ['name', 'age']

for line in lines[1:]:          # 跳过第一行（切片从索引 1 开始）
    row = line.split(",")       # 再按逗号拆字段
    print(row[0], row[1])       # Alice 20 / Bob 21</code></pre>
<p>在真实项目里，字段里可能有包含逗号的内容（如 <code>"Smith, John"</code>），此时手动解析会出错。应改用 Python 内置的 <code>csv</code> 模块，它能正确处理引号和转义：</p>
<pre><code>import csv, io
reader = csv.reader(io.StringIO(csv_data))
for row in reader:
    print(row)</code></pre>
@@intro:en
<p class="lead">CSV (Comma-Separated Values) is one of the most widespread data formats: each line is a record, fields are separated by commas, and the first line is usually a header row:</p>
<pre><code>name,age,score
Alice,20,90
Bob,21,85
Carol,19,92</code></pre>
<p>Manual parsing: split by <code>\\n</code> → skip the header → split each row by comma:</p>
<pre><code>csv_data = "name,age\\nAlice,20\\nBob,21"
lines = csv_data.split("\\n")   # split into rows
header = lines[0].split(",")    # first row is the header
print(header)   # ['name', 'age']

for line in lines[1:]:          # skip the header (slice from index 1)
    row = line.split(",")       # split each row into fields
    print(row[0], row[1])       # Alice 20 / Bob 21</code></pre>
<p>In real projects, field values can contain commas (e.g. <code>"Smith, John"</code>), which breaks manual parsing. Use Python's built-in <code>csv</code> module instead — it handles quotes and escaping correctly:</p>
<pre><code>import csv, io
reader = csv.reader(io.StringIO(csv_data))
for row in reader:
    print(row)</code></pre>
@@task:zh 解析 <code>csv_data</code>，跳过表头，输出分数（第三列）大于 87 的学生名字
@@task:en
Parse <code>csv_data</code>, skip the header, and print the name of every student whose score (third column) is greater than 87
@@hint:zh split("\\n") 拆行，lines[1:] 跳表头，int(row[2]) 转数字。
@@hint:en split("\\n") to split lines, lines[1:] to skip the header, int(row[2]) to convert the score.
@@starter:zh
csv_data = "name,age,score\\nAlice,20,90\\nBob,21,85\\nCarol,19,92"
# 解析并筛选

@@starter:en
csv_data = "name,age,score\\nAlice,20,90\\nBob,21,85\\nCarol,19,92"
# parse and filter

@@answer
csv_data = "name,age,score\\nAlice,20,90\\nBob,21,85\\nCarol,19,92"
lines = csv_data.split("\\n")
for line in lines[1:]:
    row = line.split(",")
    if int(row[2]) > 87:
        print(row[0])

@@expectedOutput
Alice
Carol
`);
