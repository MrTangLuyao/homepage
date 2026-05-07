LEARN.lesson('python', 56, `
@@chapterRef python-tute-3
@@difficulty:zh 进阶
@@difficulty:en Advanced
@@intro:zh
<p class="lead">调试（debug）是找出并修复代码中错误的过程。Python 的错误分两大类：</p>
<ul>
<li><strong>语法错误（SyntaxError）</strong>：代码写法不合法，程序根本不能运行（如忘写冒号、缩进错误）</li>
<li><strong>运行时错误（RuntimeError / 逻辑错误）</strong>：代码语法正确，但运行时行为不符合预期</li>
</ul>
<p><strong>策略一：阅读 Traceback</strong>——Python 的错误信息指出了出错的文件名、行号、异常类型和描述：</p>
<pre><code>Traceback (most recent call last):
  File "test.py", line 3, in &lt;module&gt;
    print(nums[10])
IndexError: list index out of range
#           ↑ 异常类型   ↑ 描述</code></pre>
<p><strong>策略二：插入 print 检查中间变量</strong>——最简单直接的调试方式：</p>
<pre><code>total = 0
for n in [1, 2, 3]:
    total = n           # Bug：赋值，不是累加！
    print(f"n={n}, total={total}")  # 插入 print 观察
# n=1, total=1
# n=2, total=2   ← total 没有累加，每次都被覆盖
# n=3, total=3</code></pre>
<p><strong>策略三：检查边界条件</strong>——空列表、0、负数、最大值等极端情况是逻辑错误最容易出现的地方。</p>
@@intro:en
<p class="lead">Debugging is the process of finding and fixing mistakes in code. Python errors fall into two broad categories:</p>
<ul>
<li><strong>Syntax errors (SyntaxError)</strong>: the code is not legal Python and cannot run at all (e.g. missing colon, bad indentation)</li>
<li><strong>Runtime / logic errors</strong>: the code runs but behaves incorrectly</li>
</ul>
<p><strong>Strategy 1: Read the Traceback</strong> — Python's error output shows the file, line number, exception type, and description:</p>
<pre><code>Traceback (most recent call last):
  File "test.py", line 3, in &lt;module&gt;
    print(nums[10])
IndexError: list index out of range
#           ↑ exception type   ↑ description</code></pre>
<p><strong>Strategy 2: Insert print statements</strong> — the simplest way to inspect intermediate values:</p>
<pre><code>total = 0
for n in [1, 2, 3]:
    total = n           # Bug: assignment, not accumulation!
    print(f"n={n}, total={total}")  # inserted to observe
# n=1, total=1
# n=2, total=2   ← total isn't accumulating, it's overwritten each time
# n=3, total=3</code></pre>
<p><strong>Strategy 3: Check edge cases</strong> — empty lists, zero, negative numbers, and maximum values are where logic bugs most often hide.</p>
@@task:zh 下面代码应输出 <code>[1,2,3,4,5,6]</code> 中所有偶数之和（答案 <strong>12</strong>），但有 Bug。找到并修复它。
@@task:en
The code below should output the sum of all even numbers in <code>[1,2,3,4,5,6]</code> (answer: <strong>12</strong>), but it has a bug. Find and fix it.
@@hint:zh 仔细看 total 的更新方式——是赋值还是累加？
@@hint:en Look carefully at how total is updated — assignment or accumulation?
@@starter:zh
nums = [1, 2, 3, 4, 5, 6]
total = 0
for n in nums:
    if n % 2 == 0:
        total = n    # Bug 在这里
print(total)

@@starter:en
nums = [1, 2, 3, 4, 5, 6]
total = 0
for n in nums:
    if n % 2 == 0:
        total = n    # Bug is here
print(total)

@@answer
nums = [1, 2, 3, 4, 5, 6]
total = 0
for n in nums:
    if n % 2 == 0:
        total += n
print(total)

@@expectedOutput
12
`);
