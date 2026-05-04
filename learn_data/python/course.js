/* learn_data/python/course.js — Parts 1-9 → L1-L21 | Parts 10-18 → L22-L40
   Parts 19-27 → L41-L58 | Comprehensive L59-L63 | Boss L64-L68 */

window.__LEARN_COURSES = window.__LEARN_COURSES || {};
window.__LEARN_COURSES['python'] = {
  slug: 'python',
  type: 'python',
  hasPlayground: true,
  playgroundTitle: { zh: '自定义 Python 代码', en: 'Python Playground' },
  title: { zh: 'Python 基础语法', en: 'Python · Core Syntax' },
  desc: {
    zh: '早期测试，可能包含大量未知错误。左侧课程内容可能不完善。',
    en: 'Early access. May contain many unknown bugs. Course content on the left may be incomplete.',
  },
  lessons: [

    /* ══════════ PART 1 · print & input ══════════ */
    {
      id: 1, section: 'main',
      chapter: { zh: 'Part 1 · print 与 input', en: 'Part 1 · print & input' },
      title: { zh: '你好，Python！', en: 'Hello, Python!' },
      difficulty: { zh: '入门', en: 'Beginner' }, chapterRef: 'python-tute-1',
      intro: {
        zh: `<p class="lead"><code>print()</code> 是 Python 最常用的输出函数，把内容显示到屏幕上，末尾自动加换行。</p>
<p>可以输出字符串、数字或任意表达式：</p>
<pre><code>print("Hello, World!")   # Hello, World!
print(42)                # 42
print(3 + 4)             # 7
print()                  # （空行）</code></pre>
<p><strong>字符串</strong>是被引号括起来的一段文字。单引号 <code>'...'</code> 和双引号 <code>"..."</code> 效果完全相同。如果内容里有单引号，可以用双引号包住，反之亦然：</p>
<pre><code>print('它说："你好"')    # 它说："你好"
print("It's Python!")   # It's Python!</code></pre>`,
        en: `<p class="lead"><code>print()</code> is Python's most-used output function. It displays content on the screen and automatically adds a newline at the end.</p>
<p>You can print strings, numbers, or any expression:</p>
<pre><code>print("Hello, World!")   # Hello, World!
print(42)                # 42
print(3 + 4)             # 7
print()                  # (blank line)</code></pre>
<p><strong>Strings</strong> are pieces of text wrapped in quotes. Single quotes <code>'...'</code> and double quotes <code>"..."</code> are identical. If the text itself contains one kind of quote, wrap it in the other:</p>
<pre><code>print('She said "hello"')  # She said "hello"
print("It's Python!")      # It's Python!</code></pre>`,
      },
      task: { zh: '写一行代码，输出 <code>Hello, World!</code>', en: 'Write one line that outputs <code>Hello, World!</code>' },
      hint: { zh: '使用 <code>print("Hello, World!")</code>。', en: 'Use <code>print("Hello, World!")</code>.' },
      starter: { zh: '# 在这里写你的代码\n', en: '# Write your code here\n' },
      answer: 'print("Hello, World!")\n',
      expectedOutput: 'Hello, World!\n', testInputs: [],
    },

    {
      id: 2, section: 'main',
      chapter: { zh: 'Part 1 · print 与 input', en: 'Part 1 · print & input' },
      title: { zh: '多值输出与 sep / end', en: 'Multiple Values & sep / end' },
      difficulty: { zh: '入门', en: 'Beginner' }, chapterRef: 'python-tute-1',
      intro: {
        zh: `<p class="lead"><code>print()</code> 可以一次输出多个值，用逗号分隔传入。默认各值之间用<strong>空格</strong>隔开，末尾加换行。</p>
<p>用 <code>sep</code>（separator，分隔符）和 <code>end</code>（结尾字符）自定义格式：</p>
<pre><code>print("Alice", 20)              # Alice 20     ← sep 默认 " "
print("A", "B", "C", sep="-")  # A-B-C         ← 改用 "-"
print("A", "B", "C", sep="")   # ABC           ← 无间隔
print("no newline", end="!")    # no newline!   ← end 改为 "!"
print("line 1", end=" | ")
print("line 2")                 # line 1 | line 2</code></pre>
<p>默认值：<code>sep=" "</code>（一个空格），<code>end="\\n"</code>（换行符）。</p>`,
        en: `<p class="lead"><code>print()</code> accepts multiple arguments separated by commas. By default values are separated by a <strong>space</strong> and a newline is added at the end.</p>
<p>Use <code>sep</code> (separator) and <code>end</code> to customise the output format:</p>
<pre><code>print("Alice", 20)              # Alice 20     ← sep defaults to " "
print("A", "B", "C", sep="-")  # A-B-C         ← changed to "-"
print("A", "B", "C", sep="")   # ABC           ← no gap
print("no newline", end="!")    # no newline!   ← end changed to "!"
print("line 1", end=" | ")
print("line 2")                 # line 1 | line 2</code></pre>
<p>Defaults: <code>sep=" "</code> (one space), <code>end="\\n"</code> (newline).</p>`,
      },
      task: { zh: '用一次 <code>print()</code> 输出 <code>2026-5-5</code>（三个数字，用 <code>-</code> 分隔）', en: 'Use a single <code>print()</code> to output <code>2026-5-5</code> (three numbers separated by <code>-</code>)' },
      hint: { zh: '传入三个数字，加 <code>sep="-"</code>。', en: 'Pass three numbers and add <code>sep="-"</code>.' },
      starter: { zh: '# 一个 print，三个参数\n', en: '# One print call, three arguments\n' },
      answer: 'print(2026, 5, 5, sep="-")\n',
      expectedOutput: '2026-5-5\n', testInputs: [],
    },

    {
      id: 3, section: 'main',
      chapter: { zh: 'Part 1 · print 与 input', en: 'Part 1 · print & input' },
      title: { zh: '读取用户输入', en: 'Reading User Input' },
      difficulty: { zh: '入门', en: 'Beginner' }, chapterRef: 'python-tute-1',
      intro: {
        zh: `<p class="lead"><code>input()</code> 暂停程序，等用户输入一行文字并按 Enter。<strong>无论用户输入什么，返回值始终是字符串（str）。</strong></p>
<p>括号内的字符串是提示语，原样显示在输入光标前（可以是空字符串）：</p>
<pre><code>name = input("你叫什么名字？")
print("你好，" + name)</code></pre>
<p>运行示例（<code>→</code> 表示用户的输入）：</p>
<pre><code>你叫什么名字？→ Alice
你好，Alice</code></pre>
<p>因为返回值是字符串，两个 <code>input()</code> 的结果直接相加是字符串拼接，而不是数学加法：</p>
<pre><code>a = input()    # 用户输入 3
b = input()    # 用户输入 4
print(a + b)   # 34，不是 7！</code></pre>
<p>要做数学运算，需要先用 <code>int()</code> 或 <code>float()</code> 转换（Part 3 详细介绍）。</p>`,
        en: `<p class="lead"><code>input()</code> pauses the program, waits for the user to type a line and press Enter. It <strong>always returns a string</strong>, no matter what the user typed.</p>
<p>The string inside the parentheses is a prompt, shown before the cursor (can be empty):</p>
<pre><code>name = input("What is your name? ")
print("Hello, " + name)</code></pre>
<p>Example run (<code>→</code> marks user input):</p>
<pre><code>What is your name? → Alice
Hello, Alice</code></pre>
<p>Because the return value is always a string, adding two <code>input()</code> results gives concatenation, not arithmetic:</p>
<pre><code>a = input()    # user types 3
b = input()    # user types 4
print(a + b)   # 34, not 7!</code></pre>
<p>To do math, convert first with <code>int()</code> or <code>float()</code> (covered in Part 3).</p>`,
      },
      task: { zh: '用 <code>input("Name: ")</code> 读取名字，输出 <code>Hello, &lt;名字&gt;!</code>', en: 'Use <code>input("Name: ")</code> to read a name, then output <code>Hello, &lt;name&gt;!</code>' },
      hint: { zh: '把 input() 返回值和字符串拼接后 print()。', en: 'Concatenate the input() return value with surrounding strings and print.' },
      starter: { zh: '# 读取名字，打招呼\n', en: '# Read a name and greet the user\n' },
      answer: 'name = input("Name: ")\nprint("Hello, " + name + "!")\n',
      expectedOutput: 'Hello, Alice!\n', testInputs: ['Alice'],
    },

    /* ══════════ PART 2 · 数值运算 ══════════ */
    {
      id: 4, section: 'main',
      chapter: { zh: 'Part 2 · 数值运算', en: 'Part 2 · Numeric Ops' },
      title: { zh: '算术运算符', en: 'Arithmetic Operators' },
      difficulty: { zh: '入门', en: 'Beginner' }, chapterRef: 'python-tute-1',
      intro: {
        zh: `<p class="lead">Python 支持常见数学运算符，可对整数（<code>int</code>）和浮点数（<code>float</code>）进行计算：</p>
<table><thead><tr><th>符号</th><th>含义</th><th>示例</th><th>结果</th></tr></thead><tbody>
<tr><td><code>+</code></td><td>加</td><td><code>3 + 4</code></td><td><code>7</code></td></tr>
<tr><td><code>-</code></td><td>减</td><td><code>10 - 3</code></td><td><code>7</code></td></tr>
<tr><td><code>*</code></td><td>乘</td><td><code>3 * 4</code></td><td><code>12</code></td></tr>
<tr><td><code>/</code></td><td>除（结果始终为 float）</td><td><code>7 / 2</code></td><td><code>3.5</code></td></tr>
<tr><td><code>**</code></td><td>幂（乘方）</td><td><code>2 ** 10</code></td><td><code>1024</code></td></tr>
</tbody></table>
<p>注意：<code>/</code> 的结果<strong>始终是浮点数</strong>，即使能整除——<code>4 / 2</code> 得到 <code>2.0</code>，不是 <code>2</code>。</p>
<p>运算优先级（高→低）：<code>**</code> → <code>*</code> <code>/</code> → <code>+</code> <code>-</code>；括号可以强制改变顺序：<code>(2 + 3) * 4</code> → <code>20</code>。</p>`,
        en: `<p class="lead">Python supports the standard arithmetic operators, working with integers (<code>int</code>) and floating-point numbers (<code>float</code>):</p>
<table><thead><tr><th>Op</th><th>Meaning</th><th>Example</th><th>Result</th></tr></thead><tbody>
<tr><td><code>+</code></td><td>Add</td><td><code>3 + 4</code></td><td><code>7</code></td></tr>
<tr><td><code>-</code></td><td>Subtract</td><td><code>10 - 3</code></td><td><code>7</code></td></tr>
<tr><td><code>*</code></td><td>Multiply</td><td><code>3 * 4</code></td><td><code>12</code></td></tr>
<tr><td><code>/</code></td><td>Divide (always float)</td><td><code>7 / 2</code></td><td><code>3.5</code></td></tr>
<tr><td><code>**</code></td><td>Power</td><td><code>2 ** 10</code></td><td><code>1024</code></td></tr>
</tbody></table>
<p>Note: <code>/</code> <strong>always returns a float</strong>, even when the result is whole — <code>4 / 2</code> gives <code>2.0</code>, not <code>2</code>.</p>
<p>Precedence (high → low): <code>**</code> → <code>*</code> <code>/</code> → <code>+</code> <code>-</code>; parentheses override everything: <code>(2 + 3) * 4</code> → <code>20</code>.</p>`,
      },
      task: { zh: '分两行输出：① <code>2 ** 10</code> 的值；② <code>17 / 4</code> 的值', en: 'Print two lines: ① the value of <code>2 ** 10</code>; ② the value of <code>17 / 4</code>' },
      hint: { zh: '用两个 print()，把表达式直接放进去。', en: 'Use two print() calls with the expressions inside.' },
      starter: { zh: '# 输出两个计算结果\n', en: '# Print two results\n' },
      answer: 'print(2 ** 10)\nprint(17 / 4)\n',
      expectedOutput: '1024\n4.25\n', testInputs: [],
    },

    {
      id: 5, section: 'main',
      chapter: { zh: 'Part 2 · 数值运算', en: 'Part 2 · Numeric Ops' },
      title: { zh: '变量与表达式', en: 'Variables & Expressions' },
      difficulty: { zh: '入门', en: 'Beginner' }, chapterRef: 'python-tute-1',
      intro: {
        zh: `<p class="lead">变量用来存储数据。用 <code>=</code> 赋值，Python 会根据值自动推断类型，无需提前声明。</p>
<pre><code>width = 8          # int（整数）
height = 5         # int
pi = 3.14159       # float（浮点数）
name = "Alice"     # str（字符串）</code></pre>
<p>变量可以在表达式中使用，也可以随时重新赋值：</p>
<pre><code>area = width * height
print(area)            # 40
width = 10             # 重新赋值
print(width * height)  # 50</code></pre>
<p><strong>命名规则</strong>：只能包含字母、数字和下划线 <code>_</code>；不能以数字开头；区分大小写（<code>score</code>、<code>Score</code>、<code>SCORE</code> 是三个不同的变量）。习惯上用小写加下划线：<code>my_score</code>。</p>`,
        en: `<p class="lead">Variables store data. Use <code>=</code> to assign a value — Python infers the type automatically, no declaration needed.</p>
<pre><code>width = 8          # int
height = 5         # int
pi = 3.14159       # float
name = "Alice"     # str</code></pre>
<p>Variables can be used in expressions and reassigned at any time:</p>
<pre><code>area = width * height
print(area)            # 40
width = 10             # reassign
print(width * height)  # 50</code></pre>
<p><strong>Naming rules</strong>: letters, digits, and underscores <code>_</code> only; cannot start with a digit; case-sensitive (<code>score</code>, <code>Score</code>, and <code>SCORE</code> are three different variables). Convention: lowercase with underscores, e.g. <code>my_score</code>.</p>`,
      },
      task: { zh: '<code>width = 8</code>，<code>height = 5</code>，分两行输出面积和周长', en: 'Given <code>width = 8</code> and <code>height = 5</code>, print two lines: the area and the perimeter' },
      hint: { zh: '面积 = width * height，周长 = 2 * (width + height)。', en: 'area = width * height; perimeter = 2 * (width + height).' },
      starter: { zh: 'width = 8\nheight = 5\n# 输出面积\n# 输出周长\n', en: 'width = 8\nheight = 5\n# print area\n# print perimeter\n' },
      answer: 'width = 8\nheight = 5\nprint(width * height)\nprint(2 * (width + height))\n',
      expectedOutput: '40\n26\n', testInputs: [],
    },

    /* ══════════ PART 3 · 类型转换 ══════════ */
    {
      id: 6, section: 'main',
      chapter: { zh: 'Part 3 · 类型转换', en: 'Part 3 · Type Conversion' },
      title: { zh: '字符串转数字', en: 'String to Number' },
      difficulty: { zh: '入门', en: 'Beginner' }, chapterRef: 'python-tute-1',
      intro: {
        zh: `<p class="lead"><code>input()</code> 的返回值是字符串，无法直接用于数学运算。用 <code>int()</code> 转换为整数，用 <code>float()</code> 转换为小数：</p>
<pre><code>s = "42"
n = int(s)          # 字符串 → 整数
print(n + 1)        # 43（数学加法，不是拼接）

x = float("3.14")
print(x * 2)        # 6.28</code></pre>
<p>实际使用时，直接把 <code>input()</code> 套在里面一起写：</p>
<pre><code>n = int(input("整数："))    # str → int
x = float(input("小数："))  # str → float</code></pre>
<p><strong>注意</strong>：如果用户输入的不是合法数字（比如 <code>abc</code>），<code>int()</code> 或 <code>float()</code> 会抛出 <code>ValueError</code> 错误，程序会终止。</p>`,
        en: `<p class="lead"><code>input()</code> always returns a string, which can't be used in math directly. Use <code>int()</code> to convert to an integer, or <code>float()</code> to convert to a decimal:</p>
<pre><code>s = "42"
n = int(s)          # string → integer
print(n + 1)        # 43  (math, not concatenation)

x = float("3.14")
print(x * 2)        # 6.28</code></pre>
<p>In practice, wrap <code>input()</code> directly:</p>
<pre><code>n = int(input("Integer: "))    # str → int
x = float(input("Decimal: "))  # str → float</code></pre>
<p><strong>Note</strong>: if the user types something that isn't a valid number (e.g. <code>abc</code>), <code>int()</code> / <code>float()</code> raises a <code>ValueError</code> and the program stops.</p>`,
      },
      task: { zh: '用 <code>input("km: ")</code> 读取整数（千米），输出对应的米数（×1000）', en: 'Use <code>input("km: ")</code> to read an integer (km), print the equivalent in metres (×1000)' },
      hint: { zh: '<code>int(input("km: "))</code> 包住就完成转换。', en: 'Wrap input() with int() to convert.' },
      starter: { zh: '# 读取千米数，输出米数\n', en: '# Read km, print metres\n' },
      answer: 'km = int(input("km: "))\nprint(km * 1000)\n',
      expectedOutput: '5000\n', testInputs: ['5'],
    },

    {
      id: 7, section: 'main',
      chapter: { zh: 'Part 3 · 类型转换', en: 'Part 3 · Type Conversion' },
      title: { zh: '数字转字符串', en: 'Number to String' },
      difficulty: { zh: '入门', en: 'Beginner' }, chapterRef: 'python-tute-1',
      intro: {
        zh: `<p class="lead">数字不能直接用 <code>+</code> 与字符串拼接，Python 会报 <code>TypeError</code>。用 <code>str()</code> 先把数字转成字符串：</p>
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
print(f"年龄：{age}")    # 年龄：20（无需 str() 转换）</code></pre>`,
        en: `<p class="lead">You can't concatenate a number directly with a string using <code>+</code> — Python raises a <code>TypeError</code>. Convert the number to a string first with <code>str()</code>:</p>
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
print(f"Age: {age}")     # Age: 20  (no str() needed)</code></pre>`,
      },
      task: { zh: '<code>year = 2026</code>，用字符串拼接输出 <code>The year is 2026.</code>', en: 'Given <code>year = 2026</code>, use string concatenation to print <code>The year is 2026.</code>' },
      hint: { zh: '<code>str(year)</code> 先转字符串，再拼接。', en: 'Convert with str(year) first, then concatenate.' },
      starter: { zh: 'year = 2026\n# 字符串拼接输出\n', en: 'year = 2026\n# print using string concatenation\n' },
      answer: 'year = 2026\nprint("The year is " + str(year) + ".")\n',
      expectedOutput: 'The year is 2026.\n', testInputs: [],
    },

    /* ══════════ PART 4 · 整除与取余 ══════════ */
    {
      id: 8, section: 'main',
      chapter: { zh: 'Part 4 · 整除与取余', en: 'Part 4 · Floor Division & Modulo' },
      title: { zh: '整除', en: 'Floor Division' },
      difficulty: { zh: '入门', en: 'Beginner' }, chapterRef: 'python-tute-1',
      intro: {
        zh: `<p class="lead"><code>//</code> 整除运算符，只保留商的<strong>整数部分</strong>，小数直接丢弃（不是四舍五入）：</p>
<pre><code>print(17 // 5)    # 3     ← 17 ÷ 5 = 3 余 2
print(17 / 5)     # 3.4   ← 普通除法（比较）
print(7 // 2)     # 3
print(10 // 3)    # 3
print(6 // 2)     # 3     ← 能整除也是整数</code></pre>
<p>常见用途：把"总量"换算成"大单位"的整数部分，例如总秒数换算分钟数：</p>
<pre><code>total_sec = 500
minutes = total_sec // 60   # 8（完整分钟数，余下的秒不算）</code></pre>
<p><strong>类型规则</strong>：两个整数 <code>//</code> 结果是 <code>int</code>；若任一操作数是 <code>float</code>，结果是 <code>float</code>：<code>7.0 // 2</code> → <code>3.0</code>。</p>`,
        en: `<p class="lead"><code>//</code> is the floor division operator — it returns only the <strong>integer part</strong> of the quotient, discarding any remainder (no rounding):</p>
<pre><code>print(17 // 5)    # 3     ← 17 ÷ 5 = 3 remainder 2
print(17 / 5)     # 3.4   ← normal division (for comparison)
print(7 // 2)     # 3
print(10 // 3)    # 3
print(6 // 2)     # 3     ← exact division still gives int</code></pre>
<p>Common use: convert a total into the integer number of a larger unit, e.g. seconds to minutes:</p>
<pre><code>total_sec = 500
minutes = total_sec // 60   # 8  (complete minutes, leftover seconds dropped)</code></pre>
<p><strong>Type rule</strong>: two integers with <code>//</code> give an <code>int</code> result; if either operand is a <code>float</code>, the result is a <code>float</code>: <code>7.0 // 2</code> → <code>3.0</code>.</p>`,
      },
      task: { zh: '<code>total = 500</code> 秒，用 <code>//</code> 输出包含多少个完整分钟', en: 'Given <code>total = 500</code> seconds, use <code>//</code> to print how many complete minutes that contains' },
      hint: { zh: '<code>total // 60</code> 得到完整分钟数。', en: 'total // 60 gives the complete minutes.' },
      starter: { zh: 'total = 500\n# 输出完整分钟数\n', en: 'total = 500\n# print complete minutes\n' },
      answer: 'total = 500\nprint(total // 60)\n',
      expectedOutput: '8\n', testInputs: [],
    },

    {
      id: 9, section: 'main',
      chapter: { zh: 'Part 4 · 整除与取余', en: 'Part 4 · Floor Division & Modulo' },
      title: { zh: '取余 % 与时间换算', en: 'Modulo % & Time Conversion' },
      difficulty: { zh: '入门', en: 'Beginner' }, chapterRef: 'python-tute-1',
      intro: {
        zh: `<p class="lead"><code>%</code> 取余（模运算），返回除法的<strong>余数</strong>：</p>
<pre><code>print(17 % 5)    # 2    ← 17 = 5×3 + 2，余 2
print(10 % 3)    # 1
print(6 % 2)     # 0    ← 能整除时余数为 0</code></pre>
<p><code>//</code> 和 <code>%</code> 常配合使用，把一个总量分解为多个单位：</p>
<pre><code>total = 137           # 分钟数
hours   = total // 60   # 2（完整小时）
minutes = total % 60    # 17（剩余分钟）
print(hours, "小时", minutes, "分钟")  # 2 小时 17 分钟</code></pre>
<p>其他常见用途：</p>
<ul>
<li>判断奇偶：<code>n % 2 == 0</code> 为偶数，<code>n % 2 == 1</code> 为奇数</li>
<li>循环编号：<code>i % n</code> 让结果在 <code>0 ~ n-1</code> 之间循环（常用于列表下标）</li>
</ul>`,
        en: `<p class="lead"><code>%</code> is the modulo operator — it returns the <strong>remainder</strong> of division:</p>
<pre><code>print(17 % 5)    # 2    ← 17 = 5×3 + 2, remainder 2
print(10 % 3)    # 1
print(6 % 2)     # 0    ← exactly divisible, no remainder</code></pre>
<p><code>//</code> and <code>%</code> are often used together to split a total into multiple units:</p>
<pre><code>total = 137             # minutes
hours   = total // 60   # 2  (complete hours)
minutes = total % 60    # 17 (remaining minutes)
print(hours, "hr", minutes, "min")  # 2 hr 17 min</code></pre>
<p>Other common uses:</p>
<ul>
<li>Even/odd check: <code>n % 2 == 0</code> is even, <code>n % 2 == 1</code> is odd</li>
<li>Cycling indices: <code>i % n</code> keeps the result in the range <code>0 ~ n-1</code> (useful for list indexing)</li>
</ul>`,
      },
      task: { zh: '<code>total = 500</code> 秒，分两行输出完整分钟数和剩余秒数', en: 'Given <code>total = 500</code> seconds, print two lines: complete minutes and remaining seconds' },
      hint: { zh: '<code>total // 60</code> 分钟，<code>total % 60</code> 剩余秒。', en: 'total // 60 for minutes, total % 60 for remaining seconds.' },
      starter: { zh: 'total = 500\n', en: 'total = 500\n' },
      answer: 'total = 500\nprint(total // 60)\nprint(total % 60)\n',
      expectedOutput: '8\n20\n', testInputs: [],
    },

    /* ══════════ PART 5 · 字符串索引与切片 ══════════ */
    {
      id: 10, section: 'main',
      chapter: { zh: 'Part 5 · 字符串索引与切片', en: 'Part 5 · String Indexing & Slicing' },
      title: { zh: '字符串索引', en: 'String Indexing' },
      difficulty: { zh: '入门', en: 'Beginner' }, chapterRef: 'python-tute-1',
      intro: {
        zh: `<p class="lead">字符串是一个字符序列，每个字符都有一个<strong>索引</strong>（位置编号）。正向索引从 <code>0</code> 开始，负向索引从末尾 <code>-1</code> 开始往前数：</p>
<pre><code>s = "Python"
#    P  y  t  h  o  n
#    0  1  2  3  4  5   ← 正向索引
#   -6 -5 -4 -3 -2 -1   ← 负向索引</code></pre>
<p>用方括号 <code>s[i]</code> 取出对应字符：</p>
<pre><code>print(s[0])    # P    ← 第 1 个字符
print(s[2])    # t    ← 第 3 个字符
print(s[-1])   # n    ← 最后一个字符
print(s[-2])   # o    ← 倒数第 2 个字符</code></pre>
<p><code>len(s)</code> 返回字符串的字符总数：<code>len("Python")</code> → <code>6</code>。索引超出范围会报 <code>IndexError</code>。</p>`,
        en: `<p class="lead">A string is a sequence of characters. Each character has an <strong>index</strong>. Forward indices start at <code>0</code>; backward (negative) indices start at <code>-1</code> from the end:</p>
<pre><code>s = "Python"
#    P  y  t  h  o  n
#    0  1  2  3  4  5   ← forward indices
#   -6 -5 -4 -3 -2 -1   ← backward indices</code></pre>
<p>Use square brackets <code>s[i]</code> to access a character:</p>
<pre><code>print(s[0])    # P    ← 1st character
print(s[2])    # t    ← 3rd character
print(s[-1])   # n    ← last character
print(s[-2])   # o    ← 2nd from the end</code></pre>
<p><code>len(s)</code> returns the total number of characters: <code>len("Python")</code> → <code>6</code>. Accessing an out-of-range index raises an <code>IndexError</code>.</p>`,
      },
      task: { zh: '<code>s = "Python"</code>，分三行输出：第 3 个字符（索引 2）、最后一个字符、字符串长度', en: 'Given <code>s = "Python"</code>, print three lines: the 3rd character (index 2), the last character, and the length' },
      hint: { zh: 's[2]、s[-1]、len(s)。', en: 's[2], s[-1], len(s).' },
      starter: { zh: 's = "Python"\n', en: 's = "Python"\n' },
      answer: 's = "Python"\nprint(s[2])\nprint(s[-1])\nprint(len(s))\n',
      expectedOutput: 't\nn\n6\n', testInputs: [],
    },

    {
      id: 11, section: 'main',
      chapter: { zh: 'Part 5 · 字符串索引与切片', en: 'Part 5 · String Indexing & Slicing' },
      title: { zh: '字符串切片', en: 'String Slicing' },
      difficulty: { zh: '入门', en: 'Beginner' }, chapterRef: 'python-tute-1',
      intro: {
        zh: `<p class="lead">切片 <code>s[start:end]</code> 提取从 <code>start</code> 到 <code>end-1</code> 的子串（<strong>包含 start，不含 end</strong>）：</p>
<pre><code>s = "Hello, World!"
#    0123456789...

print(s[0:5])    # Hello   ← 索引 0,1,2,3,4
print(s[7:12])   # World   ← 索引 7,8,9,10,11
print(s[:5])     # Hello   ← 省略 start 默认为 0
print(s[7:])     # World!  ← 省略 end 默认到末尾
print(s[-6:])    # World!  ← 负索引：最后 6 个字符</code></pre>
<p>第三个参数是步长，<code>s[::2]</code> 表示每隔一个字符取一个；<code>s[::-1]</code> 步长为 -1，即<strong>反转字符串</strong>：</p>
<pre><code>print(s[::2])    # Hlo ol!  ← 每隔一个
print(s[::-1])   # !dlroW ,olleH  ← 完全反转</code></pre>
<p>切片不会报越界错误——超出范围的部分会被自动截断：</p>
<pre><code>print(s[:100])   # Hello, World!  ← 正常，不报错</code></pre>`,
        en: `<p class="lead">Slicing <code>s[start:end]</code> extracts characters from <code>start</code> up to (but not including) <code>end</code>:</p>
<pre><code>s = "Hello, World!"
#    0123456789...

print(s[0:5])    # Hello   ← indices 0,1,2,3,4
print(s[7:12])   # World   ← indices 7,8,9,10,11
print(s[:5])     # Hello   ← omit start → defaults to 0
print(s[7:])     # World!  ← omit end → defaults to end of string
print(s[-6:])    # World!  ← negative: last 6 characters</code></pre>
<p>The third parameter is a step. <code>s[::2]</code> takes every other character; <code>s[::-1]</code> reverses the string:</p>
<pre><code>print(s[::2])    # Hlo ol!  ← every other character
print(s[::-1])   # !dlroW ,olleH  ← fully reversed</code></pre>
<p>Slicing never raises an IndexError — out-of-range bounds are silently clamped:</p>
<pre><code>print(s[:100])   # Hello, World!  ← fine, no error</code></pre>`,
      },
      task: { zh: '<code>s = "Hello, World!"</code>，分两行输出：前 5 个字符、最后 6 个字符', en: 'Given <code>s = "Hello, World!"</code>, print two lines: the first 5 characters and the last 6 characters' },
      hint: { zh: 's[:5] 前 5 个，s[-6:] 最后 6 个。', en: 's[:5] for first 5, s[-6:] for last 6.' },
      starter: { zh: 's = "Hello, World!"\n', en: 's = "Hello, World!"\n' },
      answer: 's = "Hello, World!"\nprint(s[:5])\nprint(s[-6:])\n',
      expectedOutput: 'Hello\nWorld!\n', testInputs: [],
    },

    /* ══════════ PART 6 · 字符串方法 ══════════ */
    {
      id: 12, section: 'main',
      chapter: { zh: 'Part 6 · 字符串方法', en: 'Part 6 · String Methods' },
      title: { zh: '大小写与去空白', en: 'Case & Strip' },
      difficulty: { zh: '入门', en: 'Beginner' }, chapterRef: 'python-tute-1',
      intro: {
        zh: `<p class="lead">字符串是不可变的——所有字符串方法都返回<strong>新字符串</strong>，不修改原来的变量。调用方式：<code>字符串.方法()</code>。</p>
<p>大小写相关方法：</p>
<pre><code>s = "Hello World"
print(s.upper())      # HELLO WORLD   ← 全大写
print(s.lower())      # hello world   ← 全小写
print(s.title())      # Hello World   ← 每词首字母大写（已经是了）
print("hello".capitalize())  # Hello  ← 仅第一个字母大写</code></pre>
<p>去除空白（包括空格、制表符、换行符）：</p>
<pre><code>s = "  Hello World  "
print(s.strip())    # "Hello World"   ← 去两端
print(s.lstrip())   # "Hello World  " ← 只去左端
print(s.rstrip())   # "  Hello World" ← 只去右端</code></pre>
<p>可以链式调用——上一步的返回值直接再调方法：</p>
<pre><code>s = "  hello world  "
print(s.strip().upper())  # HELLO WORLD</code></pre>`,
        en: `<p class="lead">Strings are immutable — every string method returns a <strong>new string</strong>, leaving the original unchanged. Syntax: <code>string.method()</code>.</p>
<p>Case methods:</p>
<pre><code>s = "Hello World"
print(s.upper())      # HELLO WORLD   ← all uppercase
print(s.lower())      # hello world   ← all lowercase
print(s.title())      # Hello World   ← title-case each word
print("hello".capitalize())  # Hello  ← only first letter uppercased</code></pre>
<p>Strip whitespace (spaces, tabs, newlines):</p>
<pre><code>s = "  Hello World  "
print(s.strip())    # "Hello World"   ← both ends
print(s.lstrip())   # "Hello World  " ← left end only
print(s.rstrip())   # "  Hello World" ← right end only</code></pre>
<p>Methods can be chained — each result is a new string you can call more methods on:</p>
<pre><code>s = "  hello world  "
print(s.strip().upper())  # HELLO WORLD</code></pre>`,
      },
      task: { zh: '<code>s = "  hello world  "</code>，分两行输出：去除两端空白后的字符串、再转为全大写', en: 'Given <code>s = "  hello world  "</code>, print two lines: the stripped string, then that result in uppercase' },
      hint: { zh: 'strip() 去空白，upper() 转大写。', en: 'strip() removes whitespace, upper() converts to uppercase.' },
      starter: { zh: 's = "  hello world  "\n', en: 's = "  hello world  "\n' },
      answer: 's = "  hello world  "\nclean = s.strip()\nprint(clean)\nprint(clean.upper())\n',
      expectedOutput: 'hello world\nHELLO WORLD\n', testInputs: [],
    },

    {
      id: 13, section: 'main',
      chapter: { zh: 'Part 6 · 字符串方法', en: 'Part 6 · String Methods' },
      title: { zh: 'split() 与 join()', en: 'split() & join()' },
      difficulty: { zh: '入门', en: 'Beginner' }, chapterRef: 'python-tute-1',
      intro: {
        zh: `<p class="lead"><code>split()</code> 把字符串按分隔符拆成列表；<code>join()</code> 是反向操作，把列表里的字符串拼成一个字符串：</p>
<p><strong>split()</strong>：</p>
<pre><code>s = "apple banana cherry"
words = s.split()           # 默认按空白字符拆分
print(words)                # ['apple', 'banana', 'cherry']
print(len(words))           # 3

csv = "a,b,c,d"
parts = csv.split(",")      # 指定分隔符
print(parts)                # ['a', 'b', 'c', 'd']</code></pre>
<p><strong>join()</strong>：调用方式是 <code>"分隔符".join(列表)</code>（注意：分隔符在前）：</p>
<pre><code>words = ["apple", "banana", "cherry"]
print("-".join(words))   # apple-banana-cherry
print(" ".join(words))   # apple banana cherry
print("".join(words))    # applebananacherry  ← 无分隔符</code></pre>
<p>两者常配合使用：先 <code>split()</code> 处理，再 <code>join()</code> 重新拼合：</p>
<pre><code>s = "  too   many   spaces  "
words = s.split()             # 自动处理多余空格
print(" ".join(words))        # too many spaces</code></pre>`,
        en: `<p class="lead"><code>split()</code> breaks a string into a list at a delimiter; <code>join()</code> is the reverse — it merges a list of strings into one string:</p>
<p><strong>split()</strong>:</p>
<pre><code>s = "apple banana cherry"
words = s.split()           # default: split on any whitespace
print(words)                # ['apple', 'banana', 'cherry']
print(len(words))           # 3

csv = "a,b,c,d"
parts = csv.split(",")      # specify delimiter
print(parts)                # ['a', 'b', 'c', 'd']</code></pre>
<p><strong>join()</strong>: syntax is <code>"separator".join(list)</code> — note the separator goes in front:</p>
<pre><code>words = ["apple", "banana", "cherry"]
print("-".join(words))   # apple-banana-cherry
print(" ".join(words))   # apple banana cherry
print("".join(words))    # applebananacherry  ← no separator</code></pre>
<p>They are often used together — split to process, then join to reassemble:</p>
<pre><code>s = "  too   many   spaces  "
words = s.split()             # handles extra whitespace automatically
print(" ".join(words))        # too many spaces</code></pre>`,
      },
      task: { zh: '<code>s = "one two three four"</code>，分两行输出：单词数量、以 <code>,</code> 连接的所有单词', en: 'Given <code>s = "one two three four"</code>, print two lines: the word count, and all words joined by <code>,</code>' },
      hint: { zh: 'split() 得到列表，len() 计数，",".join() 合并。', en: 'split() gives the list, len() counts, ",".join() merges.' },
      starter: { zh: 's = "one two three four"\n', en: 's = "one two three four"\n' },
      answer: 's = "one two three four"\nwords = s.split()\nprint(len(words))\nprint(",".join(words))\n',
      expectedOutput: '4\none,two,three,four\n', testInputs: [],
    },

    /* ══════════ PART 7 · f-string ══════════ */
    {
      id: 14, section: 'main',
      chapter: { zh: 'Part 7 · f-string 格式化', en: 'Part 7 · f-string Formatting' },
      title: { zh: 'f-string 基础', en: 'f-string Basics' },
      difficulty: { zh: '入门', en: 'Beginner' }, chapterRef: 'python-tute-1',
      intro: {
        zh: `<p class="lead">f-string（格式化字符串字面量）是 Python 3.6+ 推荐的字符串插值方式。在引号前加 <code>f</code>，然后用 <code>{}</code> 嵌入任意变量或表达式——比字符串拼接和 <code>str()</code> 简洁得多：</p>
<pre><code>name = "Alice"
age = 20

# 旧写法（繁琐）
print("我叫 " + name + "，今年 " + str(age) + " 岁。")

# f-string（推荐）
print(f"我叫 {name}，今年 {age} 岁。")
# 我叫 Alice，今年 20 岁。</code></pre>
<p><code>{}</code> 内可以放任意表达式，Python 会自动求值并转为字符串：</p>
<pre><code>x = 5
print(f"x 的平方是 {x ** 2}")       # x 的平方是 25
print(f"x+1 = {x + 1}")            # x+1 = 6
print(f"类型：{type(x).__name__}")   # 类型：int</code></pre>
<p>单引号/双引号均可包住 f-string，内部引号用另一种：</p>
<pre><code>print(f'He said "{name}"')   # He said "Alice"</code></pre>`,
        en: `<p class="lead">f-strings (formatted string literals) are Python 3.6+'s recommended way to embed values in strings. Put <code>f</code> before the quote, then use <code>{}</code> to embed any variable or expression — much cleaner than concatenation or <code>str()</code>:</p>
<pre><code>name = "Alice"
age = 20

# old way (verbose)
print("My name is " + name + ", I am " + str(age) + " years old.")

# f-string (recommended)
print(f"My name is {name}, I am {age} years old.")
# My name is Alice, I am 20 years old.</code></pre>
<p><code>{}</code> can contain any expression — Python evaluates it and converts to a string automatically:</p>
<pre><code>x = 5
print(f"x squared is {x ** 2}")      # x squared is 25
print(f"x+1 = {x + 1}")              # x+1 = 6
print(f"type: {type(x).__name__}")   # type: int</code></pre>
<p>Single or double quotes work for f-strings; use the other kind inside <code>{}</code> string literals:</p>
<pre><code>print(f'He said "{name}"')   # He said "Alice"</code></pre>`,
      },
      task: { zh: '<code>name = "Bob"</code>，<code>score = 95</code>，用 f-string 输出 <code>Bob scored 95 points.</code>', en: 'Given <code>name = "Bob"</code> and <code>score = 95</code>, use an f-string to print <code>Bob scored 95 points.</code>' },
      hint: { zh: 'f"{name} scored {score} points." 放进 print()。', en: 'Put f"{name} scored {score} points." inside print().' },
      starter: { zh: 'name = "Bob"\nscore = 95\n', en: 'name = "Bob"\nscore = 95\n' },
      answer: 'name = "Bob"\nscore = 95\nprint(f"{name} scored {score} points.")\n',
      expectedOutput: 'Bob scored 95 points.\n', testInputs: [],
    },

    {
      id: 15, section: 'main',
      chapter: { zh: 'Part 7 · f-string 格式化', en: 'Part 7 · f-string Formatting' },
      title: { zh: 'f-string 格式规范', en: 'f-string Format Specs' },
      difficulty: { zh: '入门', en: 'Beginner' }, chapterRef: 'python-tute-1',
      intro: {
        zh: `<p class="lead">在 f-string 的 <code>{}</code> 中，冒号后面可以加<strong>格式规范</strong>，控制数字的显示方式：<code>{变量:格式}</code>。</p>
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
print(f"[{n:<8d}]")  # [42      ]  ← 左对齐</code></pre>`,
        en: `<p class="lead">Inside f-string <code>{}</code>, a colon introduces a <strong>format spec</strong> that controls how a value is displayed: <code>{variable:format}</code>.</p>
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
print(f"[{n:<8d}]")  # [42      ]  ← left-align</code></pre>`,
      },
      task: { zh: '<code>pi = 3.14159</code>，分两行输出：保留 2 位小数、保留 4 位小数', en: 'Given <code>pi = 3.14159</code>, print two lines: pi to 2 decimal places, then to 4 decimal places' },
      hint: { zh: 'f"{pi:.2f}" 和 f"{pi:.4f}"。', en: 'Use f"{pi:.2f}" and f"{pi:.4f}".' },
      starter: { zh: 'pi = 3.14159\n', en: 'pi = 3.14159\n' },
      answer: 'pi = 3.14159\nprint(f"{pi:.2f}")\nprint(f"{pi:.4f}")\n',
      expectedOutput: '3.14\n3.1416\n', testInputs: [],
    },

    /* ══════════ PART 8 · 列表与元组 ══════════ */
    {
      id: 16, section: 'main',
      chapter: { zh: 'Part 8 · 列表与元组', en: 'Part 8 · Lists & Tuples' },
      title: { zh: '列表基础', en: 'List Basics' },
      difficulty: { zh: '入门', en: 'Beginner' }, chapterRef: 'python-tute-1',
      intro: {
        zh: `<p class="lead">列表（<code>list</code>）是有序、可变的序列，用方括号 <code>[]</code> 创建，元素之间用逗号分隔。列表可以存放任意类型的数据，甚至混合类型：</p>
<pre><code>fruits  = ["apple", "banana", "cherry"]   # 字符串列表
nums    = [10, 20, 30, 40]                # 数字列表
mixed   = [1, "hello", True, 3.14]        # 混合类型
empty   = []                              # 空列表</code></pre>
<p>索引和切片与字符串完全一样（正向从 0 开始，负向从 -1 开始）：</p>
<pre><code>fruits = ["apple", "banana", "cherry"]
print(fruits[0])     # apple   ← 第一个
print(fruits[-1])    # cherry  ← 最后一个
print(fruits[1:3])   # ['banana', 'cherry']  ← 切片
print(len(fruits))   # 3</code></pre>
<p>可以用 <code>in</code> 检查某元素是否在列表中：</p>
<pre><code>print("apple" in fruits)    # True
print("mango" in fruits)    # False</code></pre>`,
        en: `<p class="lead">A list is an ordered, mutable sequence created with square brackets <code>[]</code>, elements separated by commas. Lists can hold any type — even mixed types:</p>
<pre><code>fruits  = ["apple", "banana", "cherry"]   # strings
nums    = [10, 20, 30, 40]                # numbers
mixed   = [1, "hello", True, 3.14]        # mixed types
empty   = []                              # empty list</code></pre>
<p>Indexing and slicing work exactly like strings (forward from 0, backward from -1):</p>
<pre><code>fruits = ["apple", "banana", "cherry"]
print(fruits[0])     # apple    ← first element
print(fruits[-1])    # cherry   ← last element
print(fruits[1:3])   # ['banana', 'cherry']  ← slice
print(len(fruits))   # 3</code></pre>
<p>Use <code>in</code> to check membership:</p>
<pre><code>print("apple" in fruits)    # True
print("mango" in fruits)    # False</code></pre>`,
      },
      task: { zh: '<code>colors = ["red", "green", "blue"]</code>，分三行输出：第一个、最后一个、列表长度', en: 'Given <code>colors = ["red", "green", "blue"]</code>, print three lines: the first element, the last element, and the length' },
      hint: { zh: 'colors[0]、colors[-1]、len(colors)。', en: 'colors[0], colors[-1], len(colors).' },
      starter: { zh: 'colors = ["red", "green", "blue"]\n', en: 'colors = ["red", "green", "blue"]\n' },
      answer: 'colors = ["red", "green", "blue"]\nprint(colors[0])\nprint(colors[-1])\nprint(len(colors))\n',
      expectedOutput: 'red\nblue\n3\n', testInputs: [],
    },

    {
      id: 17, section: 'main',
      chapter: { zh: 'Part 8 · 列表与元组', en: 'Part 8 · Lists & Tuples' },
      title: { zh: '列表修改与 append()', en: 'List Mutation & append()' },
      difficulty: { zh: '入门', en: 'Beginner' }, chapterRef: 'python-tute-1',
      intro: {
        zh: `<p class="lead">列表是<strong>可变的</strong>——与字符串不同，可以直接修改、增加或删除元素，而不需要创建新列表：</p>
<p>修改元素：</p>
<pre><code>fruits = ["apple", "banana", "cherry"]
fruits[0] = "mango"    # 直接赋值修改第一个元素
print(fruits)          # ['mango', 'banana', 'cherry']</code></pre>
<p>添加元素：</p>
<pre><code>fruits.append("grape")      # 追加到末尾
fruits.insert(1, "kiwi")    # 在索引 1 处插入
print(fruits)               # ['mango', 'kiwi', 'banana', 'cherry', 'grape']</code></pre>
<p>删除元素：</p>
<pre><code>fruits.remove("banana")  # 按值删除（第一次出现）
fruits.pop()             # 删除并返回最后一个
fruits.pop(0)            # 删除并返回索引 0 的元素
del fruits[1]            # 按索引删除（不返回）</code></pre>
<p>其他常用方法：</p>
<pre><code>nums = [3, 1, 4, 1, 5]
nums.sort()              # 原地排序（修改自身）
print(nums)              # [1, 1, 3, 4, 5]
nums.reverse()           # 原地反转
print(nums.count(1))     # 2  ← 统计 1 出现的次数</code></pre>`,
        en: `<p class="lead">Lists are <strong>mutable</strong> — unlike strings, you can modify, add, or remove elements directly without creating a new list:</p>
<p>Modify an element:</p>
<pre><code>fruits = ["apple", "banana", "cherry"]
fruits[0] = "mango"    # assign directly to change the first element
print(fruits)          # ['mango', 'banana', 'cherry']</code></pre>
<p>Add elements:</p>
<pre><code>fruits.append("grape")      # add to the end
fruits.insert(1, "kiwi")    # insert at index 1
print(fruits)               # ['mango', 'kiwi', 'banana', 'cherry', 'grape']</code></pre>
<p>Remove elements:</p>
<pre><code>fruits.remove("banana")  # remove by value (first occurrence)
fruits.pop()             # remove and return the last element
fruits.pop(0)            # remove and return element at index 0
del fruits[1]            # delete by index (no return value)</code></pre>
<p>Other useful methods:</p>
<pre><code>nums = [3, 1, 4, 1, 5]
nums.sort()              # sort in place (modifies the list)
print(nums)              # [1, 1, 3, 4, 5]
nums.reverse()           # reverse in place
print(nums.count(1))     # 2  ← count occurrences of 1</code></pre>`,
      },
      task: { zh: '从 <code>nums = [10, 20, 30]</code> 开始：① append(40)；② 把第一个元素改为 100；③ 输出最终列表', en: 'Start with <code>nums = [10, 20, 30]</code>: ① append(40); ② change the first element to 100; ③ print the final list' },
      hint: { zh: 'append() 先加，nums[0] = 100 修改，print(nums) 输出。', en: 'append() first, then nums[0] = 100, then print(nums).' },
      starter: { zh: 'nums = [10, 20, 30]\n', en: 'nums = [10, 20, 30]\n' },
      answer: 'nums = [10, 20, 30]\nnums.append(40)\nnums[0] = 100\nprint(nums)\n',
      expectedOutput: '[100, 20, 30, 40]\n', testInputs: [],
    },

    {
      id: 18, section: 'main',
      chapter: { zh: 'Part 8 · 列表与元组', en: 'Part 8 · Lists & Tuples' },
      title: { zh: '元组 tuple', en: 'Tuples' },
      difficulty: { zh: '入门', en: 'Beginner' }, chapterRef: 'python-tute-1',
      intro: {
        zh: `<p class="lead">元组（<code>tuple</code>）与列表类似，但是<strong>不可变的</strong>——创建后不能修改、添加或删除元素。用圆括号 <code>()</code> 创建：</p>
<pre><code>point = (3, 4)
print(point[0])    # 3   ← 索引访问（与列表一样）
print(point[-1])   # 4
print(len(point))  # 2

# point[0] = 99   # ❌ TypeError: tuple 不支持赋值</code></pre>
<p>元组支持和列表相同的只读操作（索引、切片、in、len），但不能修改：</p>
<pre><code>rgb = (255, 128, 0)
print(rgb[1:])         # (128, 0)
print(0 in rgb)        # False
print(255 in rgb)      # True</code></pre>
<p><strong>元组解包</strong>：把元组的各个值直接赋给多个变量，非常常用：</p>
<pre><code>point = (3, 4)
x, y = point            # 解包
print(f"x={x}, y={y}")  # x=3, y=4

a, b, c = (10, 20, 30)  # 三个变量同时赋值</code></pre>
<p>什么时候用元组：坐标、RGB 颜色、日期等"固定结构"的数据；函数返回多个值（Python 返回的其实是元组）。</p>`,
        en: `<p class="lead">A tuple is like a list but <strong>immutable</strong> — once created, its contents cannot be changed, added to, or removed from. Created with parentheses <code>()</code>:</p>
<pre><code>point = (3, 4)
print(point[0])    # 3   ← indexing works just like a list
print(point[-1])   # 4
print(len(point))  # 2

# point[0] = 99   # ❌ TypeError: tuples don't support assignment</code></pre>
<p>Tuples support all read-only operations (indexing, slicing, in, len) but not modification:</p>
<pre><code>rgb = (255, 128, 0)
print(rgb[1:])         # (128, 0)
print(0 in rgb)        # False
print(255 in rgb)      # True</code></pre>
<p><strong>Tuple unpacking</strong>: assign each value of a tuple directly to separate variables — very common in Python:</p>
<pre><code>point = (3, 4)
x, y = point            # unpack
print(f"x={x}, y={y}")  # x=3, y=4

a, b, c = (10, 20, 30)  # three variables at once</code></pre>
<p>When to use tuples: coordinates, RGB colours, dates, or any "fixed-structure" data; also what Python returns when a function returns multiple values.</p>`,
      },
      task: { zh: '<code>coords = (10, 20, 30)</code>，分三行输出 x、y、z', en: 'Given <code>coords = (10, 20, 30)</code>, print the x, y, and z values on three separate lines' },
      hint: { zh: 'coords[0]、coords[1]、coords[2]。', en: 'coords[0], coords[1], coords[2].' },
      starter: { zh: 'coords = (10, 20, 30)\n', en: 'coords = (10, 20, 30)\n' },
      answer: 'coords = (10, 20, 30)\nprint(coords[0])\nprint(coords[1])\nprint(coords[2])\n',
      expectedOutput: '10\n20\n30\n', testInputs: [],
    },

    /* ══════════ PART 9 · 条件语句 ══════════ */
    {
      id: 19, section: 'main',
      chapter: { zh: 'Part 9 · 条件语句', en: 'Part 9 · Conditionals' },
      title: { zh: '条件判断 1', en: 'Conditionals 1' },
      difficulty: { zh: '入门', en: 'Beginner' }, chapterRef: 'python-tute-1',
      intro: {
        zh: `<p class="lead"><code>if</code> 语句根据条件决定是否执行某段代码。Python 用<strong>缩进</strong>（通常 4 个空格）划分代码块，冒号 <code>:</code> 表示块的开始，不需要花括号：</p>
<pre><code>score = 85
if score >= 60:
    print("及格")    # 条件为真时执行
    print("恭喜！")  # 同一缩进级别 = 同一块
else:
    print("不及格")  # 条件为假时执行</code></pre>
<p><code>else</code> 是可选的。没有 else 时，条件为假就直接跳过：</p>
<pre><code>x = 10
if x > 5:
    print("x 大于 5")   # 会执行
# 继续执行后面的代码，不受 if 影响</code></pre>
<p><strong>缩进错误是初学者最常见的 bug</strong>——混用空格和 Tab、或缩进不一致会导致 <code>IndentationError</code>：</p>
<pre><code>if True:
print("wrong")   # ❌ IndentationError：缺少缩进

if True:
    print("right")  # ✓</code></pre>`,
        en: `<p class="lead"><code>if</code> executes a block of code only when a condition is true. Python uses <strong>indentation</strong> (typically 4 spaces) to define blocks, with a colon <code>:</code> to open each block — no curly braces required:</p>
<pre><code>score = 85
if score >= 60:
    print("Pass")    # runs when condition is true
    print("Well done!")  # same indent level = same block
else:
    print("Fail")    # runs when condition is false</code></pre>
<p><code>else</code> is optional. Without it, the false branch simply does nothing:</p>
<pre><code>x = 10
if x > 5:
    print("x is greater than 5")   # this runs
# execution continues normally after the if block</code></pre>
<p><strong>Indentation errors are the most common beginner mistake</strong> — mixing spaces and tabs, or inconsistent indentation, raises an <code>IndentationError</code>:</p>
<pre><code>if True:
print("wrong")   # ❌ IndentationError: missing indent

if True:
    print("right")  # ✓</code></pre>`,
      },
      task: { zh: '用 <code>input("n: ")</code> 读取整数，输出 <code>positive</code>（>0）或 <code>non-positive</code>', en: 'Use <code>input("n: ")</code> to read an integer, print <code>positive</code> if > 0, else <code>non-positive</code>' },
      hint: { zh: 'int(input(...)) 转整数，if n > 0 / else 判断。', en: 'Convert with int(input(...)), then if n > 0 / else.' },
      starter: { zh: '# 读取整数，判断正负\n', en: '# Read an integer and check its sign\n' },
      answer: 'n = int(input("n: "))\nif n > 0:\n    print("positive")\nelse:\n    print("non-positive")\n',
      expectedOutput: 'positive\n', testInputs: ['7'],
    },

    {
      id: 20, section: 'main',
      chapter: { zh: 'Part 9 · 条件语句', en: 'Part 9 · Conditionals' },
      title: { zh: '条件判断 2', en: 'Conditionals 2' },
      difficulty: { zh: '入门', en: 'Beginner' }, chapterRef: 'python-tute-1',
      intro: {
        zh: `<p class="lead">当需要判断多个互斥情况时，用 <code>elif</code>（else if 的缩写）链式添加分支。Python 从上往下检查，<strong>执行第一个条件为真的分支</strong>，然后跳过剩余所有分支。</p>
<pre><code>score = 78
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"       # ← score=78 命中这里，下面不再检查
elif score >= 60:
    grade = "D"
else:
    grade = "F"       # 以上所有条件都不满足才执行
print(grade)          # C</code></pre>
<p>关键点：</p>
<ul>
<li><code>elif</code> 和 <code>else</code> 都是<strong>可选的</strong>，可以有多个 <code>elif</code> 但最多一个 <code>else</code></li>
<li>顺序很重要：把最严格的条件放最前面（如先判断 ≥90，再判断 ≥80）</li>
<li><code>else</code> 是"兜底"分支，当所有条件都不满足时执行</li>
</ul>`,
        en: `<p class="lead">When you need to check multiple mutually exclusive cases, chain branches with <code>elif</code> (short for else if). Python checks top-to-bottom and <strong>runs the first branch whose condition is true</strong>, then skips all the rest.</p>
<pre><code>score = 78
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"       # ← score=78 matches here; rest are skipped
elif score >= 60:
    grade = "D"
else:
    grade = "F"       # only runs if no condition above was true
print(grade)          # C</code></pre>
<p>Key points:</p>
<ul>
<li><code>elif</code> and <code>else</code> are both <strong>optional</strong>; you can have many <code>elif</code>s but at most one <code>else</code></li>
<li>Order matters: put the most restrictive condition first (check ≥90 before ≥80)</li>
<li><code>else</code> is the catch-all — it runs only when every condition above is false</li>
</ul>`,
      },
      task: { zh: '用 <code>input("Score: ")</code> 读取成绩，输出等级 A/B/C/D/F（≥90/≥80/≥70/≥60/其余）', en: 'Use <code>input("Score: ")</code> to read a score, print grade A (≥90), B (≥80), C (≥70), D (≥60), F (otherwise)' },
      hint: { zh: '从最高分段开始 if，依次 elif，最后 else。', en: 'Start with the highest band as if, then elif for each lower band.' },
      starter: { zh: 'score = int(input("Score: "))\n# 判断等级\n', en: 'score = int(input("Score: "))\n# determine the grade\n' },
      answer: 'score = int(input("Score: "))\nif score >= 90:\n    print("A")\nelif score >= 80:\n    print("B")\nelif score >= 70:\n    print("C")\nelif score >= 60:\n    print("D")\nelse:\n    print("F")\n',
      expectedOutput: 'B\n', testInputs: ['85'],
    },

    {
      id: 21, section: 'main',
      chapter: { zh: 'Part 9 · 条件语句', en: 'Part 9 · Conditionals' },
      title: { zh: 'and、or 和 in', en: 'and, or & in' },
      difficulty: { zh: '入门', en: 'Beginner' }, chapterRef: 'python-tute-1',
      intro: {
        zh: `<p class="lead">Python 用英文单词而非符号组合条件，可读性更强：</p>
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
<p><strong>短路求值</strong>：<code>and</code> 左边为假时直接返回 False（右边不执行）；<code>or</code> 左边为真时直接返回 True。这在右边有副作用（比如 <code>input()</code>）时很重要。</p>`,
        en: `<p class="lead">Python uses English words instead of symbols to combine conditions — more readable:</p>
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
<p><strong>Short-circuit evaluation</strong>: if the left side of <code>and</code> is false, Python never evaluates the right side; if the left side of <code>or</code> is true, the right side is skipped. Useful when the right side has side effects.</p>`,
      },
      task: { zh: '用 <code>input("Year: ")</code> 读取年份，输出 <code>leap year</code> 或 <code>not a leap year</code>', en: 'Use <code>input("Year: ")</code> to read a year, print <code>leap year</code> or <code>not a leap year</code>' },
      hint: { zh: '条件：<code>(year % 4 == 0 and year % 100 != 0) or year % 400 == 0</code>', en: 'Condition: <code>(year % 4 == 0 and year % 100 != 0) or year % 400 == 0</code>' },
      starter: { zh: 'year = int(input("Year: "))\n', en: 'year = int(input("Year: "))\n' },
      answer: 'year = int(input("Year: "))\nif (year % 4 == 0 and year % 100 != 0) or year % 400 == 0:\n    print("leap year")\nelse:\n    print("not a leap year")\n',
      expectedOutput: 'leap year\n', testInputs: ['2024'],
    },

    /* ══════════ PART 10 ══════════ */
    {
      id: 22, section: 'main',
      chapter: { zh: 'Part 10 · 比较与成员运算符', en: 'Part 10 · Comparisons & Membership' },
      title: { zh: '链式比较与 not in', en: 'Chained Comparisons & not in' },
      difficulty: { zh: '入门', en: 'Beginner' }, chapterRef: 'python-tute-2',
      intro: {
        zh: `<p class="lead">Python 支持像数学一样的<strong>链式比较</strong>——多个比较运算符连写，比用 <code>and</code> 更简洁：</p>
<pre><code>x = 15
# 两种写法等价：
print(10 < x < 20)              # True  ← 链式
print(x > 10 and x < 20)        # True  ← and 版本

print(0 <= x <= 10)             # False ← x 不在 [0, 10] 内
print(1 < 2 < 3 < 4)            # True  ← 可以链更多个</code></pre>
<p>所有 Python 比较运算符：</p>
<table><thead><tr><th>符号</th><th>含义</th><th>符号</th><th>含义</th></tr></thead><tbody>
<tr><td><code>==</code></td><td>等于</td><td><code>!=</code></td><td>不等于</td></tr>
<tr><td><code>&lt;</code></td><td>小于</td><td><code>&gt;</code></td><td>大于</td></tr>
<tr><td><code>&lt;=</code></td><td>小于等于</td><td><code>&gt;=</code></td><td>大于等于</td></tr>
</tbody></table>
<p><code>not in</code> 是 <code>in</code> 的取反，检查某元素<strong>不在</strong>序列中：</p>
<pre><code>print("z" not in "Hello")      # True
print(99 not in [1, 2, 3])     # True</code></pre>`,
        en: `<p class="lead">Python supports <strong>chained comparisons</strong> — multiple comparison operators written in sequence, more concise than using <code>and</code>:</p>
<pre><code>x = 15
# Two equivalent ways:
print(10 < x < 20)              # True  ← chained
print(x > 10 and x < 20)        # True  ← and version

print(0 <= x <= 10)             # False ← x not in [0, 10]
print(1 < 2 < 3 < 4)            # True  ← can chain more</code></pre>
<p>All Python comparison operators:</p>
<table><thead><tr><th>Op</th><th>Meaning</th><th>Op</th><th>Meaning</th></tr></thead><tbody>
<tr><td><code>==</code></td><td>equal</td><td><code>!=</code></td><td>not equal</td></tr>
<tr><td><code>&lt;</code></td><td>less than</td><td><code>&gt;</code></td><td>greater than</td></tr>
<tr><td><code>&lt;=</code></td><td>less than or equal</td><td><code>&gt;=</code></td><td>greater than or equal</td></tr>
</tbody></table>
<p><code>not in</code> negates <code>in</code> — checks that an element is <strong>absent</strong> from a sequence:</p>
<pre><code>print("z" not in "Hello")      # True
print(99 not in [1, 2, 3])     # True</code></pre>`,
      },
      task: { zh: '<code>n = 42</code>，分两行输出：① 用链式比较判断 n 是否严格在 0 到 100 之间；② 判断 n 是否不在 <code>[1, 2, 3]</code> 中', en: 'Given <code>n = 42</code>, print two lines: ① use a chained comparison to check if n is strictly between 0 and 100; ② check if n is not in <code>[1, 2, 3]</code>' },
      hint: { zh: '① <code>0 < n < 100</code>；② <code>n not in [1, 2, 3]</code>。', en: '① <code>0 < n < 100</code>; ② <code>n not in [1, 2, 3]</code>.' },
      starter: { zh: 'n = 42\n', en: 'n = 42\n' },
      answer: 'n = 42\nprint(0 < n < 100)\nprint(n not in [1, 2, 3])\n',
      expectedOutput: 'True\nTrue\n', testInputs: [],
    },

    /* ══════════ PART 11 · 函数 ══════════ */
    {
      id: 23, section: 'main',
      chapter: { zh: 'Part 11 · 函数定义', en: 'Part 11 · Functions' },
      title: { zh: 'def 与 return', en: 'def & return' },
      difficulty: { zh: '入门', en: 'Beginner' }, chapterRef: 'python-tute-2',
      intro: {
        zh: `<p class="lead">函数是一段有名字的可重复调用的代码块。用 <code>def</code> 定义，用 <code>return</code> 把结果传回给调用者：</p>
<pre><code>def square(n):       # 定义：函数名 square，参数 n
    return n * n     # 计算并返回结果

result = square(5)   # 调用：传入实参 5
print(result)        # 25
print(square(10))    # 100  ← 可以直接在表达式中调用</code></pre>
<p><strong>参数（parameter）vs 实参（argument）</strong>：<code>n</code> 是定义时的参数名（占位符）；<code>5</code> 和 <code>10</code> 是调用时传入的实参（实际值）。</p>
<p><strong>return 立即结束函数</strong>，之后的代码不再执行：</p>
<pre><code>def sign(n):
    if n > 0:
        return "positive"   # 一旦执行，函数就结束
    if n < 0:
        return "negative"
    return "zero"

print(sign(5))    # positive
print(sign(-3))   # negative
print(sign(0))    # zero</code></pre>
<p>没有 <code>return</code> 语句（或 <code>return</code> 后没有值）的函数返回 <code>None</code>。</p>`,
        en: `<p class="lead">A function is a named, reusable block of code. Use <code>def</code> to define it and <code>return</code> to send a result back to the caller:</p>
<pre><code>def square(n):       # define: function name square, parameter n
    return n * n     # compute and return the result

result = square(5)   # call: pass argument 5
print(result)        # 25
print(square(10))    # 100  ← can call directly in an expression</code></pre>
<p><strong>Parameter vs argument</strong>: <code>n</code> is the parameter (placeholder in the definition); <code>5</code> and <code>10</code> are arguments (actual values at call time).</p>
<p><strong>return ends the function immediately</strong> — code after it does not run:</p>
<pre><code>def sign(n):
    if n > 0:
        return "positive"   # function exits here
    if n < 0:
        return "negative"
    return "zero"

print(sign(5))    # positive
print(sign(-3))   # negative
print(sign(0))    # zero</code></pre>
<p>A function with no <code>return</code> statement (or <code>return</code> with no value) returns <code>None</code>.</p>`,
      },
      task: { zh: '定义函数 <code>add(a, b)</code> 返回两数之和，调用 <code>add(17, 25)</code> 并输出结果', en: 'Define a function <code>add(a, b)</code> that returns the sum of two numbers, call <code>add(17, 25)</code> and print the result' },
      hint: { zh: 'def add(a, b): return a + b，再 print(add(17, 25))。', en: 'def add(a, b): return a + b, then print(add(17, 25)).' },
      starter: { zh: '# 定义 add 函数\n\n# 调用并输出\n', en: '# define add function\n\n# call and print\n' },
      answer: 'def add(a, b):\n    return a + b\nprint(add(17, 25))\n',
      expectedOutput: '42\n', testInputs: [],
    },

    {
      id: 24, section: 'main',
      chapter: { zh: 'Part 11 · 函数定义', en: 'Part 11 · Functions' },
      title: { zh: '默认参数', en: 'Default Parameters' },
      difficulty: { zh: '入门', en: 'Beginner' }, chapterRef: 'python-tute-2',
      intro: {
        zh: `<p class="lead">参数可以有<strong>默认值</strong>——调用时如果不传该参数，就使用默认值：</p>
<pre><code>def power(base, exp=2):   # exp 默认为 2
    return base ** exp

print(power(3))           # 9    ← 等同于 power(3, 2)
print(power(3, 3))        # 27   ← 显式传入 exp=3，覆盖默认值
print(power(2, 10))       # 1024</code></pre>
<p><strong>规则</strong>：有默认值的参数必须排在无默认值的参数<strong>之后</strong>，否则报错：</p>
<pre><code># def wrong(a=1, b):  ← ❌ SyntaxError
def right(a, b=1):    # ← ✓</code></pre>
<p>还可以用<strong>关键字参数</strong>显式指定参数名，让调用更清晰：</p>
<pre><code>def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Alice")                       # Hello, Alice!
greet("Bob", greeting="Hi")          # Hi, Bob!
greet(greeting="Hey", name="Carol")  # Hey, Carol!  ← 顺序可以换</code></pre>`,
        en: `<p class="lead">Parameters can have <strong>default values</strong> — if the caller doesn't pass that argument, the default is used:</p>
<pre><code>def power(base, exp=2):   # exp defaults to 2
    return base ** exp

print(power(3))           # 9    ← same as power(3, 2)
print(power(3, 3))        # 27   ← explicit exp=3 overrides the default
print(power(2, 10))       # 1024</code></pre>
<p><strong>Rule</strong>: parameters with defaults must come <strong>after</strong> those without defaults, or Python raises a SyntaxError:</p>
<pre><code># def wrong(a=1, b):  ← ❌ SyntaxError
def right(a, b=1):    # ← ✓</code></pre>
<p>You can also pass arguments by name (<strong>keyword arguments</strong>) for clarity and order flexibility:</p>
<pre><code>def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Alice")                       # Hello, Alice!
greet("Bob", greeting="Hi")          # Hi, Bob!
greet(greeting="Hey", name="Carol")  # Hey, Carol!  ← order swapped</code></pre>`,
      },
      task: { zh: '定义 <code>power(base, exp=2)</code> 返回 base 的 exp 次方；分两行输出 <code>power(3)</code> 和 <code>power(2, 10)</code>', en: 'Define <code>power(base, exp=2)</code> returning base to the power of exp; print <code>power(3)</code> and <code>power(2, 10)</code> on two lines' },
      hint: { zh: 'return base ** exp；调用时不传 exp 会用默认值 2。', en: 'return base ** exp; calling without exp uses the default 2.' },
      starter: { zh: '# 定义 power 函数\n\n# 两次调用\n', en: '# define power function\n\n# two calls\n' },
      answer: 'def power(base, exp=2):\n    return base ** exp\nprint(power(3))\nprint(power(2, 10))\n',
      expectedOutput: '9\n1024\n', testInputs: [],
    },

    {
      id: 25, section: 'main',
      chapter: { zh: 'Part 11 · 函数定义', en: 'Part 11 · Functions' },
      title: { zh: '布尔返回值', en: 'Boolean Return Values' },
      difficulty: { zh: '入门', en: 'Beginner' }, chapterRef: 'python-tute-2',
      intro: {
        zh: `<p class="lead">返回 <code>True</code> 或 <code>False</code> 的函数叫<strong>谓词函数</strong>（predicate），命名习惯上以 <code>is_</code> 或 <code>has_</code> 开头，表明它是一个"是否"判断：</p>
<pre><code>def is_even(n):
    return n % 2 == 0   # 比较表达式的结果本身就是布尔值，直接 return

print(is_even(4))   # True
print(is_even(7))   # False</code></pre>
<p>不要写成 <code>if n % 2 == 0: return True else: return False</code>——比较表达式已经是布尔值，直接返回即可。</p>
<p>谓词函数可以直接放在 <code>if</code> 条件里：</p>
<pre><code>def is_even(n):
    return n % 2 == 0

for i in range(1, 8):
    if is_even(i):
        print(i, "is even")
# 2 is even
# 4 is even
# 6 is even</code></pre>
<p>Python 内置了一些常用谓词：<code>isinstance(x, int)</code>、<code>any([...])</code>、<code>all([...])</code> 等。</p>`,
        en: `<p class="lead">A function returning <code>True</code> or <code>False</code> is called a <strong>predicate</strong>. By convention, name them with <code>is_</code> or <code>has_</code> to signal they answer a yes/no question:</p>
<pre><code>def is_even(n):
    return n % 2 == 0   # a comparison already produces a bool — return it directly

print(is_even(4))   # True
print(is_even(7))   # False</code></pre>
<p>Don't write <code>if n % 2 == 0: return True else: return False</code> — a comparison expression is already a boolean, so just return it.</p>
<p>Predicate functions work directly as <code>if</code> conditions:</p>
<pre><code>def is_even(n):
    return n % 2 == 0

for i in range(1, 8):
    if is_even(i):
        print(i, "is even")
# 2 is even
# 4 is even
# 6 is even</code></pre>
<p>Python has built-in predicates too: <code>isinstance(x, int)</code>, <code>any([...])</code>, <code>all([...])</code>, etc.</p>`,
      },
      task: { zh: '定义 <code>is_positive(n)</code>，返回 n 是否大于 0；分两行输出 <code>is_positive(5)</code> 和 <code>is_positive(-3)</code>', en: 'Define <code>is_positive(n)</code> returning whether n > 0; print <code>is_positive(5)</code> and <code>is_positive(-3)</code> on two lines' },
      hint: { zh: 'return n > 0 直接返回布尔值。', en: 'return n > 0 directly returns a boolean.' },
      starter: { zh: '# 定义 is_positive\n\n# 两次调用\n', en: '# define is_positive\n\n# two calls\n' },
      answer: 'def is_positive(n):\n    return n > 0\nprint(is_positive(5))\nprint(is_positive(-3))\n',
      expectedOutput: 'True\nFalse\n', testInputs: [],
    },

    /* ══════════ PART 12 · while ══════════ */
    {
      id: 26, section: 'main',
      chapter: { zh: 'Part 12 · while 循环', en: 'Part 12 · while Loop' },
      title: { zh: 'while 基础', en: 'while Basics' },
      difficulty: { zh: '入门', en: 'Beginner' }, chapterRef: 'python-tute-2',
      intro: {
        zh: `<p class="lead"><code>while</code> 先检查条件，条件为真就执行循环体，执行完再回去检查……如此循环，直到条件为假才停止。</p>
<pre><code>i = 1
while i <= 5:    # ① 检查条件
    print(i)     # ② 执行
    i += 1       # ③ 更新，回到 ①
# 输出：1 2 3 4 5（各占一行）</code></pre>
<p>while 循环的三要素：</p>
<ol>
<li><strong>初始化</strong>（循环变量的起始值，在 while 前设置）</li>
<li><strong>条件</strong>（什么时候继续循环）</li>
<li><strong>更新</strong>（每次循环体结束后改变变量，否则条件永远为真 → 死循环）</li>
</ol>
<p>用 <code>break</code> 可以立即跳出循环，常见于"找到即停"的场景：</p>
<pre><code>i = 1
while i <= 100:
    if i * i > 50:
        break      # 找到第一个平方超过 50 的数就停
    i += 1
print(i)   # 8  （8² = 64 > 50）</code></pre>`,
        en: `<p class="lead"><code>while</code> checks the condition first, executes the body if true, then checks again — repeating until the condition is false.</p>
<pre><code>i = 1
while i <= 5:    # ① check condition
    print(i)     # ② execute
    i += 1       # ③ update, go back to ①
# prints: 1 2 3 4 5 (one per line)</code></pre>
<p>Three essentials of a while loop:</p>
<ol>
<li><strong>Initialise</strong> — set the loop variable before the while</li>
<li><strong>Condition</strong> — when to keep going</li>
<li><strong>Update</strong> — change the variable at the end of the body, or the condition stays true forever → infinite loop</li>
</ol>
<p>Use <code>break</code> to exit the loop immediately — common in "stop when found" patterns:</p>
<pre><code>i = 1
while i <= 100:
    if i * i > 50:
        break      # stop at the first i whose square exceeds 50
    i += 1
print(i)   # 8  (8² = 64 > 50)</code></pre>`,
      },
      task: { zh: '用 while 循环输出 1 到 5，每行一个数字', en: 'Use a while loop to print 1 to 5, one number per line' },
      hint: { zh: 'i = 1 开始，i <= 5 为条件，循环体里 i += 1。', en: 'Start with i = 1, condition i <= 5, increment i += 1 inside the loop.' },
      starter: { zh: '# 用 while 输出 1 到 5\n', en: '# use while to print 1 to 5\n' },
      answer: 'i = 1\nwhile i <= 5:\n    print(i)\n    i += 1\n',
      expectedOutput: '1\n2\n3\n4\n5\n', testInputs: [],
    },

    {
      id: 27, section: 'main',
      chapter: { zh: 'Part 12 · while 循环', en: 'Part 12 · while Loop' },
      title: { zh: 'while 累加器', en: 'while Accumulator' },
      difficulty: { zh: '入门', en: 'Beginner' }, chapterRef: 'python-tute-2',
      intro: {
        zh: `<p class="lead"><strong>累加器模式</strong>：在循环外初始化一个结果变量（通常为 <code>0</code>），在每次循环中将当前值加进去：</p>
<pre><code>total = 0     # 累加器初始为 0
i = 1
while i <= 5:
    total += i   # 每次把 i 加进 total
    i += 1
print(total)     # 15  （1+2+3+4+5）</code></pre>
<p>同样的模式可以用于乘积（初始值改为 1）：</p>
<pre><code>product = 1   # 乘积累加器初始为 1（不能是 0！）
i = 1
while i <= 5:
    product *= i   # 1×2×3×4×5
    i += 1
print(product)    # 120  （5 的阶乘）</code></pre>
<p>或用于计数：</p>
<pre><code>count = 0
i = 1
while i <= 20:
    if i % 3 == 0:
        count += 1   # 统计 1-20 中 3 的倍数
    i += 1
print(count)     # 6</code></pre>`,
        en: `<p class="lead">The <strong>accumulator pattern</strong>: initialise a result variable outside the loop (usually <code>0</code>), then add the current value to it on each iteration:</p>
<pre><code>total = 0     # accumulator starts at 0
i = 1
while i <= 5:
    total += i   # add i to total each time
    i += 1
print(total)     # 15  (1+2+3+4+5)</code></pre>
<p>The same pattern works for products (start at 1 instead of 0):</p>
<pre><code>product = 1   # product accumulator starts at 1 (never 0!)
i = 1
while i <= 5:
    product *= i   # 1×2×3×4×5
    i += 1
print(product)    # 120  (5 factorial)</code></pre>
<p>Or for counting:</p>
<pre><code>count = 0
i = 1
while i <= 20:
    if i % 3 == 0:
        count += 1   # count multiples of 3 in 1–20
    i += 1
print(count)     # 6</code></pre>`,
      },
      task: { zh: '用 while 循环计算 1 + 2 + … + 10 的总和，输出结果', en: 'Use a while loop to compute 1 + 2 + … + 10 and print the result' },
      hint: { zh: 'total 从 0 开始，i 从 1 到 10，每次 total += i。', en: 'Start total at 0, loop i from 1 to 10, add total += i each time.' },
      starter: { zh: '# 累加 1 到 10\n', en: '# accumulate 1 to 10\n' },
      answer: 'total = 0\ni = 1\nwhile i <= 10:\n    total += i\n    i += 1\nprint(total)\n',
      expectedOutput: '55\n', testInputs: [],
    },

    /* ══════════ PART 13 · for ══════════ */
    {
      id: 28, section: 'main',
      chapter: { zh: 'Part 13 · for 循环与 range()', en: 'Part 13 · for Loop & range()' },
      title: { zh: 'for 与 range()', en: 'for & range()' },
      difficulty: { zh: '入门', en: 'Beginner' }, chapterRef: 'python-tute-2',
      intro: {
        zh: `<p class="lead"><code>for</code> 逐个遍历序列中的每个元素；<code>range()</code> 生成一段整数序列，专为 <code>for</code> 设计：</p>
<table><thead><tr><th>写法</th><th>生成的数列</th></tr></thead><tbody>
<tr><td><code>range(5)</code></td><td>0, 1, 2, 3, 4（从 0 到 stop-1）</td></tr>
<tr><td><code>range(1, 6)</code></td><td>1, 2, 3, 4, 5（从 start 到 stop-1）</td></tr>
<tr><td><code>range(0, 10, 2)</code></td><td>0, 2, 4, 6, 8（步长为 2）</td></tr>
<tr><td><code>range(5, 0, -1)</code></td><td>5, 4, 3, 2, 1（倒数，步长为 -1）</td></tr>
</tbody></table>
<pre><code>for i in range(5):
    print(i, end=" ")    # 0 1 2 3 4

for i in range(5, 0, -1):
    print(i, end=" ")    # 5 4 3 2 1</code></pre>
<p><code>for</code> 也可以直接遍历字符串：</p>
<pre><code>for ch in "abc":
    print(ch)    # a  b  c（各占一行）</code></pre>
<p><strong>for vs while</strong>：次数固定时用 <code>for</code>；需要按条件决定何时停止时用 <code>while</code>。</p>`,
        en: `<p class="lead"><code>for</code> visits each element of a sequence in order; <code>range()</code> generates integer sequences, designed for use with <code>for</code>:</p>
<table><thead><tr><th>Syntax</th><th>Generates</th></tr></thead><tbody>
<tr><td><code>range(5)</code></td><td>0, 1, 2, 3, 4 (0 to stop-1)</td></tr>
<tr><td><code>range(1, 6)</code></td><td>1, 2, 3, 4, 5 (start to stop-1)</td></tr>
<tr><td><code>range(0, 10, 2)</code></td><td>0, 2, 4, 6, 8 (step of 2)</td></tr>
<tr><td><code>range(5, 0, -1)</code></td><td>5, 4, 3, 2, 1 (countdown, step -1)</td></tr>
</tbody></table>
<pre><code>for i in range(5):
    print(i, end=" ")    # 0 1 2 3 4

for i in range(5, 0, -1):
    print(i, end=" ")    # 5 4 3 2 1</code></pre>
<p><code>for</code> can also iterate directly over a string:</p>
<pre><code>for ch in "abc":
    print(ch)    # a  b  c (one per line)</code></pre>
<p><strong>for vs while</strong>: use <code>for</code> when the number of iterations is known; use <code>while</code> when you need a condition to decide when to stop.</p>`,
      },
      task: { zh: '用 for + range() 输出 0 到 10 之间的偶数（含 0 和 10），每行一个', en: 'Use for + range() to print the even numbers from 0 to 10 inclusive, one per line' },
      hint: { zh: 'range(0, 11, 2) 生成 0, 2, 4, 6, 8, 10。', en: 'range(0, 11, 2) generates 0, 2, 4, 6, 8, 10.' },
      starter: { zh: '# 输出 0 到 10 的偶数\n', en: '# print even numbers 0 to 10\n' },
      answer: 'for i in range(0, 11, 2):\n    print(i)\n',
      expectedOutput: '0\n2\n4\n6\n8\n10\n', testInputs: [],
    },

    {
      id: 29, section: 'main',
      chapter: { zh: 'Part 13 · for 循环与 range()', en: 'Part 13 · for Loop & range()' },
      title: { zh: 'for 遍历列表，累加', en: 'for Over a List, Accumulate' },
      difficulty: { zh: '入门', en: 'Beginner' }, chapterRef: 'python-tute-2',
      intro: {
        zh: `<p class="lead"><code>for</code> 可以直接遍历列表、字符串、元组等任意序列，每次把当前元素赋给循环变量：</p>
<pre><code>nums = [3, 7, 2, 9]
for n in nums:        # n 依次取 3, 7, 2, 9
    print(n * 2)      # 6  14  4  18</code></pre>
<p>结合累加器，可以对列表求和、求最大值等：</p>
<pre><code>nums = [3, 7, 2, 9]
total = 0
for n in nums:
    total += n
print(total)   # 21</code></pre>
<p>Python 内置了更简洁的方式，实际开发中通常直接用：</p>
<pre><code>nums = [3, 7, 2, 9]
print(sum(nums))    # 21  ← 内置求和
print(max(nums))    # 9   ← 内置最大值
print(min(nums))    # 2   ← 内置最小值</code></pre>
<p>但理解手动累加的逻辑是学习循环的基础，很多复杂问题（如条件求和）必须手写循环。</p>`,
        en: `<p class="lead"><code>for</code> iterates directly over any sequence — lists, strings, tuples — assigning each element to the loop variable in turn:</p>
<pre><code>nums = [3, 7, 2, 9]
for n in nums:        # n takes values 3, 7, 2, 9 in order
    print(n * 2)      # 6  14  4  18</code></pre>
<p>Combined with an accumulator, you can compute sums, maximums, etc.:</p>
<pre><code>nums = [3, 7, 2, 9]
total = 0
for n in nums:
    total += n
print(total)   # 21</code></pre>
<p>Python has built-in shortcuts for common cases:</p>
<pre><code>nums = [3, 7, 2, 9]
print(sum(nums))    # 21  ← built-in sum
print(max(nums))    # 9   ← built-in max
print(min(nums))    # 2   ← built-in min</code></pre>
<p>Understanding the manual accumulator logic is fundamental — many real problems (like conditional sums) still require a hand-written loop.</p>`,
      },
      task: { zh: '<code>nums = [3, 7, 2, 9, 1]</code>，用 for 循环计算所有数字的和并输出', en: 'Given <code>nums = [3, 7, 2, 9, 1]</code>, use a for loop to compute the sum and print it' },
      hint: { zh: 'total 从 0 开始，for n in nums: total += n。', en: 'Start total at 0, then for n in nums: total += n.' },
      starter: { zh: 'nums = [3, 7, 2, 9, 1]\n# 累加并输出\n', en: 'nums = [3, 7, 2, 9, 1]\n# accumulate and print\n' },
      answer: 'nums = [3, 7, 2, 9, 1]\ntotal = 0\nfor n in nums:\n    total += n\nprint(total)\n',
      expectedOutput: '22\n', testInputs: [],
    },

    /* ══════════ PART 14 · 嵌套循环 ══════════ */
    {
      id: 30, section: 'main',
      chapter: { zh: 'Part 14 · 嵌套循环', en: 'Part 14 · Nested Loops' },
      title: { zh: '嵌套循环与星形图案', en: 'Nested Loops & Star Pattern' },
      difficulty: { zh: '初级', en: 'Elementary' }, chapterRef: 'python-tute-2',
      intro: {
        zh: `<p class="lead">把一个循环放在另一个循环内部，叫做<strong>嵌套循环</strong>。外层每执行一次，内层会<strong>完整运行一遍</strong>：</p>
<pre><code>for i in range(1, 4):       # 外层：i = 1, 2, 3
    for j in range(1, 4):   # 内层：j = 1, 2, 3（每次外层迭代都重新从头跑）
        print(i * j, end=" ")
    print()   # 每行结束换行</code></pre>
<p>输出（3×3 乘法表）：</p>
<pre><code>1 2 3
2 4 6
3 6 9</code></pre>
<p>总共执行了 3 × 3 = 9 次内层循环体。一般地，外层 n 次 × 内层 m 次 = 共 n×m 次。</p>
<p>字符串乘法技巧：<code>"*" * n</code> 生成 n 个星号的字符串，常用于画图案：</p>
<pre><code>for i in range(1, 5):
    print("*" * i)
# *
# **
# ***
# ****</code></pre>`,
        en: `<p class="lead">Placing one loop inside another creates a <strong>nested loop</strong>. Each outer iteration runs the inner loop <strong>completely from start to finish</strong>:</p>
<pre><code>for i in range(1, 4):       # outer: i = 1, 2, 3
    for j in range(1, 4):   # inner: j = 1, 2, 3 (restarts each outer iteration)
        print(i * j, end=" ")
    print()   # newline after each row</code></pre>
<p>Output (3×3 multiplication table):</p>
<pre><code>1 2 3
2 4 6
3 6 9</code></pre>
<p>The inner body ran 3 × 3 = 9 times. In general: outer n times × inner m times = n×m total executions.</p>
<p>String multiplication trick: <code>"*" * n</code> creates a string of n asterisks — handy for drawing patterns:</p>
<pre><code>for i in range(1, 5):
    print("*" * i)
# *
# **
# ***
# ****</code></pre>`,
      },
      task: { zh: '打印一个高度为 4 的直角三角形，第 i 行有 i 个星号', en: 'Print a right triangle of height 4 — row i contains i asterisks' },
      hint: { zh: '<code>print("*" * i)</code> 可以输出 i 个星号。', en: '<code>print("*" * i)</code> prints i asterisks.' },
      starter: { zh: '# 打印高度为 4 的星形三角形\n', en: '# print star triangle of height 4\n' },
      answer: 'for i in range(1, 5):\n    print("*" * i)\n',
      expectedOutput: '*\n**\n***\n****\n', testInputs: [],
    },

    {
      id: 31, section: 'main',
      chapter: { zh: 'Part 14 · 嵌套循环', en: 'Part 14 · Nested Loops' },
      title: { zh: '嵌套循环累加', en: 'Nested Loop Accumulation' },
      difficulty: { zh: '初级', en: 'Elementary' }, chapterRef: 'python-tute-2',
      intro: {
        zh: `<p class="lead">嵌套循环特别适合处理"每对组合"的问题——枚举所有可能的 (i, j) 组合并对每对做计算：</p>
<pre><code>total = 0
for i in range(1, 4):     # i = 1, 2, 3
    for j in range(1, 4): # j = 1, 2, 3
        total += i * j    # 把 i×j 累加进 total
print(total)   # 36</code></pre>
<p>手动展开验证：</p>
<pre><code># i=1: 1×1 + 1×2 + 1×3 = 6
# i=2: 2×1 + 2×2 + 2×3 = 12
# i=3: 3×1 + 3×2 + 3×3 = 18
# 合计：6 + 12 + 18 = 36 ✓</code></pre>
<p>也可以在内层循环里加条件，只累计满足要求的组合：</p>
<pre><code>count = 0
for i in range(1, 6):
    for j in range(1, 6):
        if i + j == 6:       # 只统计 i+j=6 的组合
            count += 1
print(count)   # 5  （(1,5)(2,4)(3,3)(4,2)(5,1)）</code></pre>`,
        en: `<p class="lead">Nested loops are ideal for "every pair" problems — enumerate all (i, j) combinations and compute something for each pair:</p>
<pre><code>total = 0
for i in range(1, 4):     # i = 1, 2, 3
    for j in range(1, 4): # j = 1, 2, 3
        total += i * j    # accumulate i×j
print(total)   # 36</code></pre>
<p>Verify by hand:</p>
<pre><code># i=1: 1×1 + 1×2 + 1×3 = 6
# i=2: 2×1 + 2×2 + 2×3 = 12
# i=3: 3×1 + 3×2 + 3×3 = 18
# total: 6 + 12 + 18 = 36 ✓</code></pre>
<p>You can add a condition inside the inner loop to only count qualifying pairs:</p>
<pre><code>count = 0
for i in range(1, 6):
    for j in range(1, 6):
        if i + j == 6:       # only count pairs where i+j = 6
            count += 1
print(count)   # 5  ((1,5)(2,4)(3,3)(4,2)(5,1))</code></pre>`,
      },
      task: { zh: '用嵌套循环计算所有 i×j 之积的总和（i 和 j 各从 1 到 3），输出结果', en: 'Use nested loops to compute the sum of all products i×j (i and j each from 1 to 3), print the result' },
      hint: { zh: '外层 range(1,4)，内层 range(1,4)，total += i * j。', en: 'Outer range(1,4), inner range(1,4), total += i * j.' },
      starter: { zh: 'total = 0\n# 嵌套循环\nprint(total)\n', en: 'total = 0\n# nested loops\nprint(total)\n' },
      answer: 'total = 0\nfor i in range(1, 4):\n    for j in range(1, 4):\n        total += i * j\nprint(total)\n',
      expectedOutput: '36\n', testInputs: [],
    },

    /* ══════════ PART 15 · 字典 ══════════ */
    {
      id: 32, section: 'main',
      chapter: { zh: 'Part 15 · 字典 dict', en: 'Part 15 · Dictionaries' },
      title: { zh: '字典基础：创建与查找', en: 'Dict Basics: Create & Lookup' },
      difficulty: { zh: '初级', en: 'Elementary' }, chapterRef: 'python-tute-2',
      intro: {
        zh: `<p class="lead">字典（<code>dict</code>）存储<strong>键值对（key: value）</strong>，通过键快速查找对应的值。键必须是不可变类型（字符串、数字、元组），值可以是任意类型：</p>
<pre><code>person = {"name": "Alice", "age": 20, "scores": [90, 85]}
print(person["name"])    # Alice    ← 用键查找
print(person["age"])     # 20
print(len(person))       # 3        ← 键值对数量</code></pre>
<p>如果键不存在，直接用 <code>[]</code> 访问会报 <code>KeyError</code>。用 <code>.get()</code> 可以安全获取，找不到时返回默认值：</p>
<pre><code>print(person.get("age"))         # 20
print(person.get("email"))       # None  ← 键不存在，不报错
print(person.get("email", "无")) # 无   ← 指定默认值</code></pre>
<p>用 <code>in</code> 检查键是否存在：</p>
<pre><code>print("age" in person)    # True
print("email" in person)  # False</code></pre>`,
        en: `<p class="lead">A dictionary (<code>dict</code>) stores <strong>key-value pairs</strong> for fast lookup by key. Keys must be immutable (strings, numbers, tuples); values can be anything:</p>
<pre><code>person = {"name": "Alice", "age": 20, "scores": [90, 85]}
print(person["name"])    # Alice    ← look up by key
print(person["age"])     # 20
print(len(person))       # 3        ← number of key-value pairs</code></pre>
<p>Accessing a missing key with <code>[]</code> raises a <code>KeyError</code>. Use <code>.get()</code> for safe access — it returns a default when the key is absent:</p>
<pre><code>print(person.get("age"))           # 20
print(person.get("email"))         # None  ← missing key, no error
print(person.get("email", "n/a"))  # n/a  ← specify a default</code></pre>
<p>Use <code>in</code> to check for key existence:</p>
<pre><code>print("age" in person)    # True
print("email" in person)  # False</code></pre>`,
      },
      task: { zh: '<code>capitals = {"France": "Paris", "Japan": "Tokyo", "Australia": "Canberra"}</code>，分两行输出：日本的首都、字典中的条目数', en: 'Given <code>capitals = {"France": "Paris", "Japan": "Tokyo", "Australia": "Canberra"}</code>, print two lines: the capital of Japan and the number of entries' },
      hint: { zh: 'capitals["Japan"] 和 len(capitals)。', en: 'capitals["Japan"] and len(capitals).' },
      starter: { zh: 'capitals = {"France": "Paris", "Japan": "Tokyo", "Australia": "Canberra"}\n', en: 'capitals = {"France": "Paris", "Japan": "Tokyo", "Australia": "Canberra"}\n' },
      answer: 'capitals = {"France": "Paris", "Japan": "Tokyo", "Australia": "Canberra"}\nprint(capitals["Japan"])\nprint(len(capitals))\n',
      expectedOutput: 'Tokyo\n3\n', testInputs: [],
    },

    {
      id: 33, section: 'main',
      chapter: { zh: 'Part 15 · 字典 dict', en: 'Part 15 · Dictionaries' },
      title: { zh: '字典修改与遍历', en: 'Dict Modification & Iteration' },
      difficulty: { zh: '初级', en: 'Elementary' }, chapterRef: 'python-tute-2',
      intro: {
        zh: `<p class="lead">字典是<strong>可变的</strong>：可以随时修改现有键的值，或添加新键：</p>
<pre><code>d = {"name": "Alice", "age": 20}
d["age"] = 21          # 修改已有键
d["city"] = "Sydney"   # 添加新键
del d["age"]           # 删除键（也可以用 d.pop("age")）</code></pre>
<p>三种遍历方式：</p>
<pre><code>d = {"name": "Alice", "age": 21, "city": "Sydney"}

for k in d:                 # 只遍历键
    print(k)

for v in d.values():        # 只遍历值
    print(v)

for k, v in d.items():      # 同时遍历键和值（最常用）
    print(f"{k}: {v}")</code></pre>
<p><strong>注意</strong>：Python 3.7+ 保证字典保持插入顺序，遍历时元素按插入顺序出现。</p>`,
        en: `<p class="lead">Dictionaries are <strong>mutable</strong>: you can change existing values or add new keys at any time:</p>
<pre><code>d = {"name": "Alice", "age": 20}
d["age"] = 21          # modify existing key
d["city"] = "Sydney"   # add new key
del d["age"]           # remove a key (or use d.pop("age"))</code></pre>
<p>Three ways to iterate:</p>
<pre><code>d = {"name": "Alice", "age": 21, "city": "Sydney"}

for k in d:                 # keys only
    print(k)

for v in d.values():        # values only
    print(v)

for k, v in d.items():      # both key and value (most common)
    print(f"{k}: {v}")</code></pre>
<p><strong>Note</strong>: Python 3.7+ guarantees insertion order is preserved, so iteration always follows the order items were added.</p>`,
      },
      task: { zh: '从 <code>person = {"name": "Alice", "age": 20}</code>：把 age 改为 21，添加 "city": "Sydney"；分两行输出修改后的 age 和 city', en: 'Start with <code>person = {"name": "Alice", "age": 20}</code>: change age to 21, add "city": "Sydney"; print the updated age and city on two lines' },
      hint: { zh: 'person["age"] = 21，person["city"] = "Sydney"，再输出两个值。', en: 'person["age"] = 21, person["city"] = "Sydney", then print both.' },
      starter: { zh: 'person = {"name": "Alice", "age": 20}\n# 修改 age，添加 city\n', en: 'person = {"name": "Alice", "age": 20}\n# change age, add city\n' },
      answer: 'person = {"name": "Alice", "age": 20}\nperson["age"] = 21\nperson["city"] = "Sydney"\nprint(person["age"])\nprint(person["city"])\n',
      expectedOutput: '21\nSydney\n', testInputs: [],
    },

    {
      id: 34, section: 'main',
      chapter: { zh: 'Part 15 · 字典 dict', en: 'Part 15 · Dictionaries' },
      title: { zh: '字典统计词频', en: 'Dict Word Frequency' },
      difficulty: { zh: '初级', en: 'Elementary' }, chapterRef: 'python-tute-2',
      intro: {
        zh: `<p class="lead">用字典统计频次是非常经典的用法。核心逻辑：遍历序列，如果元素已在字典中就 +1，否则初始化为 1：</p>
<pre><code>text = "the cat sat on the mat"
count = {}
for word in text.split():
    if word in count:
        count[word] += 1
    else:
        count[word] = 1

print(count)          # {'the': 2, 'cat': 1, 'sat': 1, 'on': 1, 'mat': 1}
print(count["the"])   # 2</code></pre>
<p>更简洁的写法是用 <code>.get()</code> 的默认值，避免 if/else：</p>
<pre><code>count = {}
for word in text.split():
    count[word] = count.get(word, 0) + 1
    # 如果 word 不在 count 里，get 返回 0，再加 1 就是 1</code></pre>
<p>Python 标准库还提供了 <code>collections.Counter</code>，一行完成统计，课程后续会介绍。现在先掌握手写版本，理解其背后的逻辑。</p>`,
        en: `<p class="lead">Counting frequencies with a dict is a classic pattern. The logic: iterate over a sequence; if the element already has a key, increment it; otherwise initialise to 1:</p>
<pre><code>text = "the cat sat on the mat"
count = {}
for word in text.split():
    if word in count:
        count[word] += 1
    else:
        count[word] = 1

print(count)          # {'the': 2, 'cat': 1, 'sat': 1, 'on': 1, 'mat': 1}
print(count["the"])   # 2</code></pre>
<p>A more concise version uses <code>.get()</code> with a default, avoiding the if/else:</p>
<pre><code>count = {}
for word in text.split():
    count[word] = count.get(word, 0) + 1
    # if word isn't in count, get returns 0, then +1 gives 1</code></pre>
<p>Python's standard library also has <code>collections.Counter</code> which does this in one line — covered later. For now, master the manual version to understand what's happening underneath.</p>`,
      },
      task: { zh: '统计字符串 <code>"mississippi"</code> 中每个字母出现的次数，分两行输出 <code>"s"</code> 的次数和 <code>"i"</code> 的次数', en: 'Count each letter in <code>"mississippi"</code>, print the count for <code>"s"</code> and <code>"i"</code> on two lines' },
      hint: { zh: '对每个字符 c 用同样的 if/else 计数模式，最后输出 count["s"] 和 count["i"]。', en: 'Apply the same if/else counting pattern to each character c, then print count["s"] and count["i"].' },
      starter: { zh: 'text = "mississippi"\ncount = {}\n# 统计每个字符\n', en: 'text = "mississippi"\ncount = {}\n# count each character\n' },
      answer: 'text = "mississippi"\ncount = {}\nfor c in text:\n    if c in count:\n        count[c] += 1\n    else:\n        count[c] = 1\nprint(count["s"])\nprint(count["i"])\n',
      expectedOutput: '4\n4\n', testInputs: [],
    },

    /* ══════════ PART 16 · 集合 ══════════ */
    {
      id: 35, section: 'main',
      chapter: { zh: 'Part 16 · 集合 set', en: 'Part 16 · Sets' },
      title: { zh: '集合去重与成员检查', en: 'Set Deduplication & Membership' },
      difficulty: { zh: '初级', en: 'Elementary' }, chapterRef: 'python-tute-2',
      intro: {
        zh: `<p class="lead">集合（<code>set</code>）是<strong>无序、不重复</strong>的元素集合。无序意味着集合不保证元素的出现顺序；不重复意味着相同的元素只保留一份：</p>
<pre><code>nums = [1, 2, 2, 3, 3, 3]
unique = set(nums)        # 转成集合，自动去重
print(unique)             # {1, 2, 3}（顺序不定）
print(len(unique))        # 3
print(3 in unique)        # True  ← 成员检测比列表快得多</code></pre>
<p>创建集合的两种方式：</p>
<pre><code>s1 = {1, 2, 3}            # 直接用 {} 字面量（注意空集必须用 set()，不能用 {}）
s2 = set([1, 2, 2, 3])   # 从列表转换

empty = set()             # 空集（{} 是空字典，不是空集！）</code></pre>
<p>常用操作：</p>
<pre><code>s = {1, 2, 3}
s.add(4)       # 添加元素
s.remove(2)    # 删除元素（不存在时报 KeyError）
s.discard(99)  # 删除元素（不存在时不报错）
print(s)       # {1, 3, 4}</code></pre>`,
        en: `<p class="lead">A set is an <strong>unordered, no-duplicate</strong> collection. Unordered means no guaranteed element order; no-duplicate means identical elements are stored only once:</p>
<pre><code>nums = [1, 2, 2, 3, 3, 3]
unique = set(nums)        # convert to set, duplicates removed
print(unique)             # {1, 2, 3}  (order may vary)
print(len(unique))        # 3
print(3 in unique)        # True  ← membership test much faster than a list</code></pre>
<p>Two ways to create a set:</p>
<pre><code>s1 = {1, 2, 3}            # curly-brace literal (empty set MUST use set(), not {})
s2 = set([1, 2, 2, 3])   # convert from a list

empty = set()             # empty set ({} is an empty dict, not a set!)</code></pre>
<p>Common operations:</p>
<pre><code>s = {1, 2, 3}
s.add(4)       # add an element
s.remove(2)    # remove (raises KeyError if missing)
s.discard(99)  # remove (no error if missing)
print(s)       # {1, 3, 4}</code></pre>`,
      },
      task: { zh: '<code>nums = [1, 2, 2, 3, 3, 3, 4]</code>，转成集合后：分两行输出去重后的元素个数、以及 <code>3 in unique</code> 的结果', en: 'Given <code>nums = [1, 2, 2, 3, 3, 3, 4]</code>, convert to a set then print two lines: the number of unique elements, and the result of <code>3 in unique</code>' },
      hint: { zh: 'unique = set(nums)，len(unique)，3 in unique。', en: 'unique = set(nums), then len(unique) and 3 in unique.' },
      starter: { zh: 'nums = [1, 2, 2, 3, 3, 3, 4]\n', en: 'nums = [1, 2, 2, 3, 3, 3, 4]\n' },
      answer: 'nums = [1, 2, 2, 3, 3, 3, 4]\nunique = set(nums)\nprint(len(unique))\nprint(3 in unique)\n',
      expectedOutput: '4\nTrue\n', testInputs: [],
    },

    {
      id: 36, section: 'main',
      chapter: { zh: 'Part 16 · 集合 set', en: 'Part 16 · Sets' },
      title: { zh: '集合运算', en: 'Set Operations' },
      difficulty: { zh: '初级', en: 'Elementary' }, chapterRef: 'python-tute-2',
      intro: {
        zh: `<p class="lead">集合支持四种数学集合运算，运算符和对应方法均可使用：</p>
<table><thead><tr><th>运算</th><th>符号</th><th>方法</th><th>含义</th></tr></thead><tbody>
<tr><td>交集</td><td><code>A &amp; B</code></td><td><code>A.intersection(B)</code></td><td>两个集合都有的元素</td></tr>
<tr><td>并集</td><td><code>A | B</code></td><td><code>A.union(B)</code></td><td>两个集合中所有元素</td></tr>
<tr><td>差集</td><td><code>A - B</code></td><td><code>A.difference(B)</code></td><td>在 A 中但不在 B 中</td></tr>
<tr><td>对称差</td><td><code>A ^ B</code></td><td><code>A.symmetric_difference(B)</code></td><td>只在其中一个集合里</td></tr>
</tbody></table>
<pre><code>A = {1, 2, 3, 4}
B = {3, 4, 5, 6}
print(A & B)   # {3, 4}       ← 交集：公共元素
print(A | B)   # {1,2,3,4,5,6} ← 并集：全部元素
print(A - B)   # {1, 2}       ← 差集：A 有 B 没有
print(A ^ B)   # {1, 2, 5, 6} ← 对称差：各自独有</code></pre>
<p>因为集合无序，输出顺序不定。需要固定顺序时，用 <code>sorted()</code> 包起来：</p>
<pre><code>print(sorted(A & B))   # [3, 4]（变成有序列表）</code></pre>`,
        en: `<p class="lead">Sets support four mathematical set operations — both operator and method syntax work:</p>
<table><thead><tr><th>Op</th><th>Symbol</th><th>Method</th><th>Meaning</th></tr></thead><tbody>
<tr><td>Intersection</td><td><code>A &amp; B</code></td><td><code>A.intersection(B)</code></td><td>elements in both sets</td></tr>
<tr><td>Union</td><td><code>A | B</code></td><td><code>A.union(B)</code></td><td>all elements from either set</td></tr>
<tr><td>Difference</td><td><code>A - B</code></td><td><code>A.difference(B)</code></td><td>in A but not in B</td></tr>
<tr><td>Symmetric diff.</td><td><code>A ^ B</code></td><td><code>A.symmetric_difference(B)</code></td><td>in exactly one set</td></tr>
</tbody></table>
<pre><code>A = {1, 2, 3, 4}
B = {3, 4, 5, 6}
print(A & B)   # {3, 4}         ← intersection: common elements
print(A | B)   # {1,2,3,4,5,6}  ← union: everything
print(A - B)   # {1, 2}         ← difference: in A, not in B
print(A ^ B)   # {1, 2, 5, 6}   ← symmetric diff: each set's unique elements</code></pre>
<p>Sets are unordered, so print order may vary. Wrap in <code>sorted()</code> for a stable, predictable order:</p>
<pre><code>print(sorted(A & B))   # [3, 4]  (converted to a sorted list)</code></pre>`,
      },
      task: { zh: '<code>A = {1,2,3,4}</code>，<code>B = {3,4,5,6}</code>，分两行输出：sorted(交集)、sorted(差集 A-B)', en: 'Given <code>A = {1,2,3,4}</code> and <code>B = {3,4,5,6}</code>, print two lines: sorted(intersection) and sorted(difference A-B)' },
      hint: { zh: 'A & B 交集，A - B 差集，都用 sorted() 包起来。', en: 'A & B for intersection, A - B for difference, wrap both in sorted().' },
      starter: { zh: 'A = {1, 2, 3, 4}\nB = {3, 4, 5, 6}\n', en: 'A = {1, 2, 3, 4}\nB = {3, 4, 5, 6}\n' },
      answer: 'A = {1, 2, 3, 4}\nB = {3, 4, 5, 6}\nprint(sorted(A & B))\nprint(sorted(A - B))\n',
      expectedOutput: '[3, 4]\n[1, 2]\n', testInputs: [],
    },

    /* ══════════ PART 17 · 列表可变性 ══════════ */
    {
      id: 37, section: 'main',
      chapter: { zh: 'Part 17 · 列表可变性与复制', en: 'Part 17 · List Mutability & Copying' },
      title: { zh: '别名陷阱与 copy()', en: 'Alias Trap & copy()' },
      difficulty: { zh: '初级', en: 'Elementary' }, chapterRef: 'python-tute-2',
      intro: {
        zh: `<p class="lead">Python 中，变量名存的是对象的<strong>引用（地址）</strong>，不是对象本身。<code>b = a</code> 只是让 b 指向和 a 同一个列表，并不创建新的列表：</p>
<pre><code>a = [1, 2, 3]
b = a           # b 和 a 指向同一个列表
b[0] = 99       # 修改通过 b 可见
print(a)        # [99, 2, 3]  ← a 也"变了"！
print(b is a)   # True ← 它们是同一个对象</code></pre>
<p>要创建独立的副本，有三种常见写法：</p>
<pre><code>a = [1, 2, 3]
b1 = a.copy()   # 方法一：.copy()
b2 = list(a)    # 方法二：list() 构造
b3 = a[:]       # 方法三：切片（最老派，但仍常见）

b1[0] = 99
print(a)    # [1, 2, 3]  ← 不受影响
print(b1)   # [99, 2, 3]</code></pre>
<p><strong>注意</strong>：以上三种都是<strong>浅拷贝</strong>——如果列表里有嵌套列表，内层列表仍然共享。深拷贝需要 <code>import copy; copy.deepcopy(a)</code>。</p>`,
        en: `<p class="lead">In Python, a variable stores a <strong>reference (address)</strong> to an object, not the object itself. <code>b = a</code> makes b point to the same list as a — no new list is created:</p>
<pre><code>a = [1, 2, 3]
b = a           # b and a point to the same list
b[0] = 99       # the change is visible through both names
print(a)        # [99, 2, 3]  ← a "changed" too!
print(b is a)   # True ← they are the same object</code></pre>
<p>To get an independent copy, there are three common approaches:</p>
<pre><code>a = [1, 2, 3]
b1 = a.copy()   # option 1: .copy()
b2 = list(a)    # option 2: list() constructor
b3 = a[:]       # option 3: slice (older style, still common)

b1[0] = 99
print(a)    # [1, 2, 3]  ← unaffected
print(b1)   # [99, 2, 3]</code></pre>
<p><strong>Note</strong>: all three produce a <strong>shallow copy</strong> — nested lists inside are still shared. For full independence, use <code>import copy; copy.deepcopy(a)</code>.</p>`,
      },
      task: { zh: '<code>a = [1, 2, 3]</code>，用 <code>.copy()</code> 创建 b；把 b[0] 改为 99；分两行输出 a 和 b', en: 'Given <code>a = [1, 2, 3]</code>, create b using <code>.copy()</code>; change b[0] to 99; print a and b on two lines' },
      hint: { zh: 'b = a.copy() 复制，b[0] = 99 修改，print(a) 和 print(b)。', en: 'b = a.copy() to copy, b[0] = 99 to modify, then print(a) and print(b).' },
      starter: { zh: 'a = [1, 2, 3]\n# 复制并修改 b\n', en: 'a = [1, 2, 3]\n# copy and modify b\n' },
      answer: 'a = [1, 2, 3]\nb = a.copy()\nb[0] = 99\nprint(a)\nprint(b)\n',
      expectedOutput: '[1, 2, 3]\n[99, 2, 3]\n', testInputs: [],
    },

    /* ══════════ PART 18 · 高级列表操作 ══════════ */
    {
      id: 38, section: 'main',
      chapter: { zh: 'Part 18 · 高级列表操作', en: 'Part 18 · Advanced List Ops' },
      title: { zh: 'enumerate() 同时取索引和值', en: 'enumerate(): Index & Value Together' },
      difficulty: { zh: '初级', en: 'Elementary' }, chapterRef: 'python-tute-2',
      intro: {
        zh: `<p class="lead">遍历列表时如果同时需要索引和元素，不要用 <code>range(len(lst))</code>——Python 提供了更优雅的 <code>enumerate()</code>：</p>
<pre><code># 老写法（不推荐）
fruits = ["apple", "banana", "cherry"]
for i in range(len(fruits)):
    print(i, fruits[i])

# Pythonic 写法（推荐）
for i, fruit in enumerate(fruits):
    print(i, fruit)
# 0 apple
# 1 banana
# 2 cherry</code></pre>
<p><code>enumerate()</code> 返回 <code>(index, value)</code> 元组，用两个变量接收（元组解包）。第二个参数可以指定起始编号：</p>
<pre><code>for i, fruit in enumerate(fruits, 1):   # 从 1 开始编号
    print(f"{i}. {fruit}")
# 1. apple
# 2. banana
# 3. cherry</code></pre>
<p>如果只需要索引，仍然用 <code>range(len(...))</code>；如果索引和值都需要，就用 <code>enumerate()</code>。</p>`,
        en: `<p class="lead">When you need both the index and the element while iterating, don't use <code>range(len(lst))</code> — Python has the cleaner <code>enumerate()</code>:</p>
<pre><code># old-style (not recommended)
fruits = ["apple", "banana", "cherry"]
for i in range(len(fruits)):
    print(i, fruits[i])

# Pythonic way (recommended)
for i, fruit in enumerate(fruits):
    print(i, fruit)
# 0 apple
# 1 banana
# 2 cherry</code></pre>
<p><code>enumerate()</code> yields <code>(index, value)</code> tuples; use two variables to unpack them (tuple unpacking). The optional second argument sets the starting number:</p>
<pre><code>for i, fruit in enumerate(fruits, 1):   # start numbering at 1
    print(f"{i}. {fruit}")
# 1. apple
# 2. banana
# 3. cherry</code></pre>
<p>If you only need the index, <code>range(len(...))</code> is still fine; when you need both index and value, always prefer <code>enumerate()</code>.</p>`,
      },
      task: { zh: '<code>fruits = ["banana", "apple", "cherry"]</code>，先排序再用 <code>enumerate</code> 从 1 开始编号，输出 <code>1. apple</code>、<code>2. banana</code>、<code>3. cherry</code>', en: 'Given <code>fruits = ["banana", "apple", "cherry"]</code>, sort first then use <code>enumerate</code> starting at 1 to print <code>1. apple</code>, <code>2. banana</code>, <code>3. cherry</code>' },
      hint: { zh: 'sorted(fruits) 排序，enumerate(..., 1) 从 1 编号。', en: 'sorted(fruits) to sort, enumerate(..., 1) to start at 1.' },
      starter: { zh: 'fruits = ["banana", "apple", "cherry"]\n', en: 'fruits = ["banana", "apple", "cherry"]\n' },
      answer: 'fruits = ["banana", "apple", "cherry"]\nfor i, fruit in enumerate(sorted(fruits), 1):\n    print(f"{i}. {fruit}")\n',
      expectedOutput: '1. apple\n2. banana\n3. cherry\n', testInputs: [],
    },

    {
      id: 39, section: 'main',
      chapter: { zh: 'Part 18 · 高级列表操作', en: 'Part 18 · Advanced List Ops' },
      title: { zh: 'sorted() 与 key 参数', en: 'sorted() with a key' },
      difficulty: { zh: '初级', en: 'Elementary' }, chapterRef: 'python-tute-2',
      intro: {
        zh: `<p class="lead"><code>sorted()</code> 接受任意可迭代对象，返回<strong>新的有序列表</strong>（不修改原数据）。<code>key</code> 参数接受一个函数，用来从每个元素中提取排序依据：</p>
<pre><code>words = ["banana", "apple", "fig"]
print(sorted(words))            # ['apple', 'banana', 'fig']  ← 字母序（默认）
print(sorted(words, key=len))   # ['fig', 'apple', 'banana']  ← 按字符串长度</code></pre>
<p><code>sorted()</code> vs 列表的 <code>.sort()</code>：</p>
<table><thead><tr><th></th><th><code>sorted(lst)</code></th><th><code>lst.sort()</code></th></tr></thead><tbody>
<tr><td>返回值</td><td>新列表</td><td><code>None</code>（原地修改）</td></tr>
<tr><td>原列表</td><td>不变</td><td>被修改</td></tr>
<tr><td>适用对象</td><td>任意可迭代</td><td>仅列表</td></tr>
</tbody></table>
<p>用 <code>reverse=True</code> 降序排列：</p>
<pre><code>print(sorted(words, reverse=True))            # 字母倒序
print(sorted(words, key=len, reverse=True))   # 从长到短</code></pre>`,
        en: `<p class="lead"><code>sorted()</code> accepts any iterable and returns a <strong>new sorted list</strong> (original data unchanged). The <code>key</code> parameter takes a function that extracts the sort criterion from each element:</p>
<pre><code>words = ["banana", "apple", "fig"]
print(sorted(words))            # ['apple', 'banana', 'fig']  ← alphabetical (default)
print(sorted(words, key=len))   # ['fig', 'apple', 'banana']  ← by string length</code></pre>
<p><code>sorted()</code> vs list's <code>.sort()</code>:</p>
<table><thead><tr><th></th><th><code>sorted(lst)</code></th><th><code>lst.sort()</code></th></tr></thead><tbody>
<tr><td>Return value</td><td>new list</td><td><code>None</code> (in-place)</td></tr>
<tr><td>Original list</td><td>unchanged</td><td>modified</td></tr>
<tr><td>Works on</td><td>any iterable</td><td>lists only</td></tr>
</tbody></table>
<p>Use <code>reverse=True</code> for descending order:</p>
<pre><code>print(sorted(words, reverse=True))            # reverse alphabetical
print(sorted(words, key=len, reverse=True))   # longest first</code></pre>`,
      },
      task: { zh: '<code>words = ["banana", "apple", "fig", "cherry"]</code>，分两行输出：按字母序排序的结果、按长度排序的结果', en: 'Given <code>words = ["banana", "apple", "fig", "cherry"]</code>, print two lines: sorted alphabetically, then sorted by length' },
      hint: { zh: 'sorted(words) 字母序，sorted(words, key=len) 按长度。', en: 'sorted(words) for alphabetical, sorted(words, key=len) for by length.' },
      starter: { zh: 'words = ["banana", "apple", "fig", "cherry"]\n', en: 'words = ["banana", "apple", "fig", "cherry"]\n' },
      answer: 'words = ["banana", "apple", "fig", "cherry"]\nprint(sorted(words))\nprint(sorted(words, key=len))\n',
      expectedOutput: "['apple', 'banana', 'cherry', 'fig']\n['fig', 'apple', 'banana', 'cherry']\n", testInputs: [],
    },

    {
      id: 40, section: 'main',
      chapter: { zh: 'Part 18 · 高级列表操作', en: 'Part 18 · Advanced List Ops' },
      title: { zh: 'lambda 作为排序键', en: 'lambda as a Sort Key' },
      difficulty: { zh: '初级', en: 'Elementary' }, chapterRef: 'python-tute-2',
      intro: {
        zh: `<p class="lead"><code>lambda</code> 是定义匿名函数的一行写法，语法为 <code>lambda 参数: 表达式</code>，常用在需要简单函数的地方（如 <code>sorted()</code> 的 <code>key</code>）：</p>
<pre><code># 普通函数写法
def get_score(s):
    return s[1]

# lambda 等价写法（更简洁，适合只用一次的情况）
get_score = lambda s: s[1]</code></pre>
<p>最常见的用法是作为 <code>sorted()</code> 的 <code>key</code>，按元素的某个字段排序：</p>
<pre><code>students = [("Alice", 90), ("Bob", 85), ("Carol", 92)]

# 按第二个元素（分数）升序
print(sorted(students, key=lambda s: s[1]))
# [('Bob', 85), ('Alice', 90), ('Carol', 92)]

# 按分数降序
print(sorted(students, key=lambda s: s[1], reverse=True))
# [('Carol', 92), ('Alice', 90), ('Bob', 85)]</code></pre>
<p><strong>lambda 的限制</strong>：只能写一个表达式，不能有赋值、循环、if/else 语句（但可以用三元表达式）。逻辑复杂时应换用普通 <code>def</code> 函数。</p>`,
        en: `<p class="lead"><code>lambda</code> defines an anonymous (nameless) function in one line. Syntax: <code>lambda parameters: expression</code>. It's most useful when a simple function is needed in one place (like <code>sorted()</code>'s <code>key</code>):</p>
<pre><code># regular function
def get_score(s):
    return s[1]

# lambda equivalent (shorter, good for one-time use)
get_score = lambda s: s[1]</code></pre>
<p>Most common use: as <code>key</code> in <code>sorted()</code> to sort by a specific field of each element:</p>
<pre><code>students = [("Alice", 90), ("Bob", 85), ("Carol", 92)]

# sort by second element (score), ascending
print(sorted(students, key=lambda s: s[1]))
# [('Bob', 85), ('Alice', 90), ('Carol', 92)]

# sort by score, descending
print(sorted(students, key=lambda s: s[1], reverse=True))
# [('Carol', 92), ('Alice', 90), ('Bob', 85)]</code></pre>
<p><strong>Lambda limitations</strong>: only a single expression — no assignments, loops, or if/else statements (ternary expressions are OK). For anything complex, use a regular <code>def</code> function instead.</p>`,
      },
      task: { zh: '<code>students = [("Alice", 90), ("Bob", 85), ("Carol", 92)]</code>，按分数<strong>从高到低</strong>排序，每行输出 <code>名字: 分数</code>', en: 'Given <code>students = [("Alice", 90), ("Bob", 85), ("Carol", 92)]</code>, sort by score <strong>highest first</strong> and print each as <code>name: score</code>' },
      hint: { zh: 'sorted(..., key=lambda s: s[1], reverse=True)，再逐行输出。', en: 'sorted(..., key=lambda s: s[1], reverse=True), then print each row.' },
      starter: { zh: 'students = [("Alice", 90), ("Bob", 85), ("Carol", 92)]\n', en: 'students = [("Alice", 90), ("Bob", 85), ("Carol", 92)]\n' },
      answer: 'students = [("Alice", 90), ("Bob", 85), ("Carol", 92)]\nresult = sorted(students, key=lambda s: s[1], reverse=True)\nfor name, score in result:\n    print(f"{name}: {score}")\n',
      expectedOutput: 'Carol: 92\nAlice: 90\nBob: 85\n', testInputs: [],
    },

    /* ══════════ PART 19 · 高级函数 ══════════ */
    {
      id: 41, section: 'main',
      chapter: { zh: 'Part 19 · 高级函数', en: 'Part 19 · Advanced Functions' },
      title: { zh: 'None 返回值与多返回值', en: 'None Return & Multiple Return Values' },
      difficulty: { zh: '进阶', en: 'Advanced' }, chapterRef: 'python-tute-3',
      intro: {
        zh: `<p class="lead">没有 <code>return</code> 语句（或只写 <code>return</code> 不带值）的函数自动返回 <code>None</code>，<code>None</code> 是 Python 里表示"什么都没有"的特殊值：</p>
<pre><code>def greet(name):
    print(f"Hello, {name}!")   # 有副作用，但不返回任何值

result = greet("Alice")    # Hello, Alice!
print(result)              # None  ← 函数没有 return，返回 None</code></pre>
<p><strong>多返回值</strong>：在 <code>return</code> 后面用逗号分隔多个值，Python 会把它们打包成一个元组并返回：</p>
<pre><code>def min_max(lst):
    return min(lst), max(lst)   # 实际上返回 (min, max) 元组

result = min_max([3, 1, 4, 1, 5])
print(result)       # (1, 5)       ← 元组
print(type(result)) # <class 'tuple'></code></pre>
<p>用<strong>元组解包</strong>把多个返回值分别赋给变量：</p>
<pre><code>lo, hi = min_max([3, 1, 4, 1, 5])
print(lo, hi)    # 1 5

# 如果只想要部分值，用 _ 忽略不需要的：
_, maximum = min_max([3, 1, 4, 1, 5])
print(maximum)   # 5</code></pre>`,
        en: `<p class="lead">A function with no <code>return</code> (or a bare <code>return</code>) automatically returns <code>None</code> — Python's value for "nothing":</p>
<pre><code>def greet(name):
    print(f"Hello, {name}!")   # has a side effect, but no return value

result = greet("Alice")    # Hello, Alice!
print(result)              # None  ← no return statement → None</code></pre>
<p><strong>Multiple return values</strong>: put comma-separated values after <code>return</code> and Python packs them into a tuple:</p>
<pre><code>def min_max(lst):
    return min(lst), max(lst)   # returns the tuple (min, max)

result = min_max([3, 1, 4, 1, 5])
print(result)       # (1, 5)         ← a tuple
print(type(result)) # <class 'tuple'></code></pre>
<p>Use <strong>tuple unpacking</strong> to assign each return value to its own variable:</p>
<pre><code>lo, hi = min_max([3, 1, 4, 1, 5])
print(lo, hi)    # 1 5

# Use _ to discard a value you don't need:
_, maximum = min_max([3, 1, 4, 1, 5])
print(maximum)   # 5</code></pre>`,
      },
      task: { zh: '定义 <code>min_max(lst)</code> 同时返回最小值和最大值；用 <code>[3, 1, 4, 1, 5, 9]</code> 调用，分两行输出最小值和最大值', en: 'Define <code>min_max(lst)</code> returning both the minimum and maximum; call it with <code>[3, 1, 4, 1, 5, 9]</code> and print the min then max on two lines' },
      hint: { zh: 'return min(lst), max(lst)；解包用 lo, hi = min_max(...)。', en: 'return min(lst), max(lst); unpack with lo, hi = min_max(...).' },
      starter: { zh: '# 定义 min_max\n\n# 调用并分两行输出\n', en: '# define min_max\n\n# call and print on two lines\n' },
      answer: 'def min_max(lst):\n    return min(lst), max(lst)\nlo, hi = min_max([3, 1, 4, 1, 5, 9])\nprint(lo)\nprint(hi)\n',
      expectedOutput: '1\n9\n', testInputs: [],
    },

    {
      id: 42, section: 'main',
      chapter: { zh: 'Part 19 · 高级函数', en: 'Part 19 · Advanced Functions' },
      title: { zh: '提前返回', en: 'Early Return' },
      difficulty: { zh: '进阶', en: 'Advanced' }, chapterRef: 'python-tute-3',
      intro: {
        zh: `<p class="lead"><strong>提前返回</strong>（early return）：一旦确定结果，立即用 <code>return</code> 退出函数，不再执行后面的代码。这避免了不必要的计算和深层嵌套，让逻辑更清晰。</p>
<p>对比两种写法——提前返回更简洁：</p>
<pre><code># 不使用提前返回（嵌套深）
def is_sorted_v1(lst):
    result = True
    for i in range(1, len(lst)):
        if lst[i] < lst[i - 1]:
            result = False
    return result   # 即使发现问题，也要跑完整个循环

# 使用提前返回（发现问题即刻退出）
def is_sorted(lst):
    for i in range(1, len(lst)):
        if lst[i] < lst[i - 1]:
            return False   # ← 立刻退出，不再继续
    return True            # ← 全部通过才到这里

print(is_sorted([1, 2, 3]))   # True
print(is_sorted([1, 3, 2]))   # False</code></pre>
<p>提前返回也常用于<strong>参数校验</strong>（guard clause）：在函数开头用几个 if 排除非法输入，正常逻辑写在后面，不用嵌套在 else 里：</p>
<pre><code>def safe_divide(a, b):
    if b == 0:
        return None         # ← 卫语句：非法输入直接返回
    return a / b

print(safe_divide(10, 2))   # 5.0
print(safe_divide(10, 0))   # None</code></pre>`,
        en: `<p class="lead"><strong>Early return</strong>: as soon as you know the result, use <code>return</code> to exit immediately — skip the rest. This avoids unnecessary computation and deep nesting, making logic cleaner.</p>
<p>Comparing both approaches — early return is clearer:</p>
<pre><code># without early return (deep nesting)
def is_sorted_v1(lst):
    result = True
    for i in range(1, len(lst)):
        if lst[i] < lst[i - 1]:
            result = False
    return result   # runs the entire loop even after finding a problem

# with early return (exit as soon as a problem is found)
def is_sorted(lst):
    for i in range(1, len(lst)):
        if lst[i] < lst[i - 1]:
            return False   # ← exit immediately
    return True            # ← only reached if everything passed

print(is_sorted([1, 2, 3]))   # True
print(is_sorted([1, 3, 2]))   # False</code></pre>
<p>Early return is also used as a <strong>guard clause</strong>: check for invalid input at the top of the function and return early, so the main logic doesn't need to be wrapped in an else:</p>
<pre><code>def safe_divide(a, b):
    if b == 0:
        return None          # ← guard: invalid input handled immediately
    return a / b

print(safe_divide(10, 2))    # 5.0
print(safe_divide(10, 0))    # None</code></pre>`,
      },
      task: { zh: '定义 <code>is_all_positive(lst)</code>：若任意元素 ≤ 0 则立即返回 <code>False</code>，全部 > 0 则返回 <code>True</code>。分两行输出 <code>[1,2,3]</code> 和 <code>[1,-2,3]</code> 的结果', en: 'Define <code>is_all_positive(lst)</code>: return <code>False</code> immediately if any element ≤ 0, otherwise return <code>True</code>. Print results for <code>[1,2,3]</code> and <code>[1,-2,3]</code> on two lines' },
      hint: { zh: 'for n in lst: if n <= 0: return False；循环结束后 return True。', en: 'for n in lst: if n <= 0: return False; after the loop, return True.' },
      starter: { zh: '# 定义 is_all_positive\n\n# 测试两个列表\n', en: '# define is_all_positive\n\n# test two lists\n' },
      answer: 'def is_all_positive(lst):\n    for n in lst:\n        if n <= 0:\n            return False\n    return True\nprint(is_all_positive([1, 2, 3]))\nprint(is_all_positive([1, -2, 3]))\n',
      expectedOutput: 'True\nFalse\n', testInputs: [],
    },

    /* ══════════ PART 20 · 列表推导式 ══════════ */
    {
      id: 43, section: 'main',
      chapter: { zh: 'Part 20 · 列表推导式', en: 'Part 20 · List Comprehensions' },
      title: { zh: '列表推导式基础', en: 'List Comprehension Basics' },
      difficulty: { zh: '进阶', en: 'Advanced' }, chapterRef: 'python-tute-3',
      intro: {
        zh: `<p class="lead">列表推导式（list comprehension）是 Python 里一行生成列表的简洁写法，本质上是 for 循环的压缩形式：</p>
<p>语法：<code>[<em>表达式</em> for <em>变量</em> in <em>可迭代对象</em>]</code></p>
<pre><code># 等价的 for 循环写法
squares = []
for i in range(1, 6):
    squares.append(i ** 2)

# 推导式写法（一行，更 Pythonic）
squares = [i ** 2 for i in range(1, 6)]
print(squares)   # [1, 4, 9, 16, 25]</code></pre>
<p>推导式可以对任意可迭代对象使用，也可以对元素做任意变换：</p>
<pre><code>nums   = [1, 2, 3, 4, 5]
doubled = [n * 2 for n in nums]     # [2, 4, 6, 8, 10]
strs    = [str(n) for n in nums]    # ['1', '2', '3', '4', '5']
words   = ["hello", "world"]
upper   = [w.upper() for w in words]  # ['HELLO', 'WORLD']</code></pre>
<p><strong>何时用推导式，何时用普通 for</strong>：推导式只适合"把每个元素变换成另一个值，生成新列表"这一类操作。如果循环体有多行逻辑、多个变量修改、或者有副作用（比如 <code>print</code>），就用普通 for。</p>`,
        en: `<p class="lead">A list comprehension is Python's concise one-line way to build a list — essentially a compressed for loop:</p>
<p>Syntax: <code>[<em>expression</em> for <em>variable</em> in <em>iterable</em>]</code></p>
<pre><code># equivalent for-loop version
squares = []
for i in range(1, 6):
    squares.append(i ** 2)

# comprehension version (one line, more Pythonic)
squares = [i ** 2 for i in range(1, 6)]
print(squares)   # [1, 4, 9, 16, 25]</code></pre>
<p>Comprehensions work on any iterable and can apply any transformation to each element:</p>
<pre><code>nums   = [1, 2, 3, 4, 5]
doubled = [n * 2 for n in nums]      # [2, 4, 6, 8, 10]
strs    = [str(n) for n in nums]     # ['1', '2', '3', '4', '5']
words   = ["hello", "world"]
upper   = [w.upper() for w in words] # ['HELLO', 'WORLD']</code></pre>
<p><strong>When to use a comprehension vs a regular for loop</strong>: use a comprehension for "transform each element, produce a new list." If the loop body has multi-line logic, modifies multiple variables, or has side effects (like <code>print</code>), use a regular for loop instead.</p>`,
      },
      task: { zh: '用列表推导式生成 1 到 10 每个数的平方，输出该列表', en: 'Use a list comprehension to generate the square of every number from 1 to 10, then print the list' },
      hint: { zh: '[i ** 2 for i in range(1, 11)]。', en: '[i ** 2 for i in range(1, 11)].' },
      starter: { zh: '# 列表推导式：1~10 的平方\n', en: '# list comprehension: squares of 1 to 10\n' },
      answer: 'squares = [i ** 2 for i in range(1, 11)]\nprint(squares)\n',
      expectedOutput: '[1, 4, 9, 16, 25, 36, 49, 64, 81, 100]\n', testInputs: [],
    },

    {
      id: 44, section: 'main',
      chapter: { zh: 'Part 20 · 列表推导式', en: 'Part 20 · List Comprehensions' },
      title: { zh: '带条件过滤的推导式', en: 'Comprehension with Filter' },
      difficulty: { zh: '进阶', en: 'Advanced' }, chapterRef: 'python-tute-3',
      intro: {
        zh: `<p class="lead">在推导式末尾加 <code>if 条件</code>，只有满足条件的元素才会被保留进新列表：</p>
<p>语法：<code>[<em>表达式</em> for <em>变量</em> in <em>可迭代对象</em> if <em>条件</em>]</code></p>
<pre><code># 等价的 for 循环
result = []
for i in range(1, 11):
    if i % 2 == 0:
        result.append(i ** 2)

# 带过滤的推导式
even_sq = [i ** 2 for i in range(1, 11) if i % 2 == 0]
print(even_sq)   # [4, 16, 36, 64, 100]</code></pre>
<p>过滤和变换可以独立控制——过滤条件决定"选不选"，表达式决定"选进来的元素如何变换"：</p>
<pre><code>words = ["apple", "fig", "banana", "kiwi", "cherry"]

# 只保留长度 > 4 的单词，并转大写
long = [w.upper() for w in words if len(w) > 4]
print(long)   # ['APPLE', 'BANANA', 'CHERRY']

# 只过滤，不变换（恒等变换）
short = [w for w in words if len(w) <= 4]
print(short)  # ['fig', 'kiwi']</code></pre>
<p>还可以组合两个条件（用 <code>and</code> / <code>or</code>）：</p>
<pre><code>[i for i in range(1, 31) if i % 2 == 0 and i % 3 == 0]
# 被 2 和 3 整除 = 被 6 整除：[6, 12, 18, 24, 30]</code></pre>`,
        en: `<p class="lead">Add <code>if condition</code> at the end of a comprehension to keep only elements that pass the filter:</p>
<p>Syntax: <code>[<em>expression</em> for <em>variable</em> in <em>iterable</em> if <em>condition</em>]</code></p>
<pre><code># equivalent for loop
result = []
for i in range(1, 11):
    if i % 2 == 0:
        result.append(i ** 2)

# comprehension with filter
even_sq = [i ** 2 for i in range(1, 11) if i % 2 == 0]
print(even_sq)   # [4, 16, 36, 64, 100]</code></pre>
<p>The filter and the transformation are independent — the condition decides "include or not," the expression decides "how to transform what's included":</p>
<pre><code>words = ["apple", "fig", "banana", "kiwi", "cherry"]

# keep words longer than 4 characters, uppercased
long = [w.upper() for w in words if len(w) > 4]
print(long)   # ['APPLE', 'BANANA', 'CHERRY']

# filter only, no transformation
short = [w for w in words if len(w) <= 4]
print(short)  # ['fig', 'kiwi']</code></pre>
<p>Combine conditions with <code>and</code> / <code>or</code>:</p>
<pre><code>[i for i in range(1, 31) if i % 2 == 0 and i % 3 == 0]
# divisible by both 2 and 3 → divisible by 6: [6, 12, 18, 24, 30]</code></pre>`,
      },
      task: { zh: '用带条件的列表推导式，从 1 到 20 中取出所有能被 3 整除的数，输出该列表', en: 'Use a list comprehension with a filter to collect all numbers from 1 to 20 that are divisible by 3, then print the list' },
      hint: { zh: '[i for i in range(1, 21) if i % 3 == 0]。', en: '[i for i in range(1, 21) if i % 3 == 0].' },
      starter: { zh: '# 带过滤的列表推导式\n', en: '# list comprehension with filter\n' },
      answer: 'result = [i for i in range(1, 21) if i % 3 == 0]\nprint(result)\n',
      expectedOutput: '[3, 6, 9, 12, 15, 18]\n', testInputs: [],
    },

    {
      id: 45, section: 'main',
      chapter: { zh: 'Part 20 · 列表推导式', en: 'Part 20 · List Comprehensions' },
      title: { zh: '推导式处理字符串', en: 'Comprehension on Strings' },
      difficulty: { zh: '进阶', en: 'Advanced' }, chapterRef: 'python-tute-3',
      intro: {
        zh: `<p class="lead">推导式可以作用在任何可迭代对象上——列表、字符串、range、甚至另一个推导式的结果。处理词语和文本是它最典型的应用场景之一：</p>
<pre><code>sentence = "Hello World from Python"
words = sentence.split()       # ['Hello', 'World', 'from', 'Python']

# 对每个单词求长度
lengths = [len(w) for w in words]
print(lengths)   # [5, 5, 4, 6]

# 过滤 + 变换：只留长单词并转小写
long = [w.lower() for w in words if len(w) > 4]
print(long)      # ['hello', 'world', 'python']</code></pre>
<p>推导式可以嵌套，用来"展平"二维结构（但嵌套层数超过 2 层时可读性下降，改用普通循环更好）：</p>
<pre><code>matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flat = [x for row in matrix for x in row]
print(flat)   # [1, 2, 3, 4, 5, 6, 7, 8, 9]</code></pre>
<p>对字符串本身也可以直接推导——字符串是字符的可迭代对象：</p>
<pre><code>vowels = [c for c in "hello world" if c in "aeiou"]
print(vowels)    # ['e', 'o', 'o']
print(len(vowels))  # 3</code></pre>`,
        en: `<p class="lead">Comprehensions work on any iterable — lists, strings, range, or even the result of another comprehension. Processing text and words is one of their most typical use cases:</p>
<pre><code>sentence = "Hello World from Python"
words = sentence.split()       # ['Hello', 'World', 'from', 'Python']

# get the length of each word
lengths = [len(w) for w in words]
print(lengths)   # [5, 5, 4, 6]

# filter + transform: keep only long words, lowercase
long = [w.lower() for w in words if len(w) > 4]
print(long)      # ['hello', 'world', 'python']</code></pre>
<p>Comprehensions can be nested to "flatten" 2D structures (but beyond 2 levels, readability suffers — use regular loops instead):</p>
<pre><code>matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flat = [x for row in matrix for x in row]
print(flat)   # [1, 2, 3, 4, 5, 6, 7, 8, 9]</code></pre>
<p>You can also iterate directly over a string — strings are iterables of characters:</p>
<pre><code>vowels = [c for c in "hello world" if c in "aeiou"]
print(vowels)       # ['e', 'o', 'o']
print(len(vowels))  # 3</code></pre>`,
      },
      task: { zh: '<code>sentence = "The quick brown fox jumps"</code>，分两行输出：每个单词长度的列表、所有长度 ≥ 4 的单词（转大写）', en: 'Given <code>sentence = "The quick brown fox jumps"</code>, print two lines: a list of each word\'s length, then all words with length ≥ 4 uppercased' },
      hint: { zh: '先 split()，再两个推导式分别处理。', en: 'split() first, then two separate comprehensions.' },
      starter: { zh: 'sentence = "The quick brown fox jumps"\n', en: 'sentence = "The quick brown fox jumps"\n' },
      answer: 'sentence = "The quick brown fox jumps"\nwords = sentence.split()\nprint([len(w) for w in words])\nprint([w.upper() for w in words if len(w) >= 4])\n',
      expectedOutput: "[3, 5, 5, 3, 5]\n['QUICK', 'BROWN', 'JUMPS']\n", testInputs: [],
    },

    /* ══════════ PART 21 · 标准库 ══════════ */
    {
      id: 46, section: 'main',
      chapter: { zh: 'Part 21 · 常用标准库', en: 'Part 21 · Standard Library' },
      title: { zh: 'math 模块', en: 'The math Module' },
      difficulty: { zh: '进阶', en: 'Advanced' }, chapterRef: 'python-tute-3',
      intro: {
        zh: `<p class="lead">Python 内置了大量标准库模块，<code>math</code> 是最常用的数学工具模块。用 <code>import math</code> 导入后，通过 <code>math.函数名()</code> 调用：</p>
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
print(pi)         # 3.14159...</code></pre>`,
        en: `<p class="lead">Python ships with a large standard library. <code>math</code> is the most-used mathematical module. Import it with <code>import math</code> and call functions as <code>math.function_name()</code>:</p>
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
print(pi)         # 3.14159...</code></pre>`,
      },
      task: { zh: '用 math 模块分三行输出：<code>sqrt(144)</code>、<code>floor(9.9)</code>、<code>ceil(9.1)</code>', en: 'Use the math module to print three lines: <code>sqrt(144)</code>, <code>floor(9.9)</code>, <code>ceil(9.1)</code>' },
      hint: { zh: 'import math，再用 math.sqrt、math.floor、math.ceil。', en: 'import math, then use math.sqrt, math.floor, math.ceil.' },
      starter: { zh: 'import math\n# 三行输出\n', en: 'import math\n# three lines of output\n' },
      answer: 'import math\nprint(math.sqrt(144))\nprint(math.floor(9.9))\nprint(math.ceil(9.1))\n',
      expectedOutput: '12.0\n9\n10\n', testInputs: [],
    },

    {
      id: 47, section: 'main',
      chapter: { zh: 'Part 21 · 常用标准库', en: 'Part 21 · Standard Library' },
      title: { zh: 'random 模块', en: 'The random Module' },
      difficulty: { zh: '进阶', en: 'Advanced' }, chapterRef: 'python-tute-3',
      intro: {
        zh: `<p class="lead"><code>random</code> 模块提供各种随机化功能，是游戏、模拟和测试中的常用工具：</p>
<table><thead><tr><th>函数</th><th>含义</th><th>示例</th></tr></thead><tbody>
<tr><td><code>randint(a, b)</code></td><td>生成 [a, b] 的随机整数（含两端）</td><td><code>randint(1, 6)</code> → 骰子</td></tr>
<tr><td><code>random()</code></td><td>生成 [0.0, 1.0) 的随机浮点数</td><td><code>random()</code> → 0.37...</td></tr>
<tr><td><code>choice(seq)</code></td><td>从序列中随机选一个</td><td><code>choice(["A","B","C"])</code></td></tr>
<tr><td><code>shuffle(lst)</code></td><td>原地打乱列表</td><td><code>shuffle(cards)</code></td></tr>
<tr><td><code>sample(seq, k)</code></td><td>不重复地随机抽 k 个</td><td><code>sample(range(100), 5)</code></td></tr>
</tbody></table>
<pre><code>from random import randint, choice, shuffle

# 模拟掷骰子
print(randint(1, 6))          # 1~6 随机整数

# 随机选一个水果
fruits = ["apple", "banana", "cherry"]
print(choice(fruits))

# 打乱列表
nums = [1, 2, 3, 4, 5]
shuffle(nums)
print(nums)                   # 顺序每次不同</code></pre>
<p>由于结果是随机的，每次运行输出都不同，点 <strong>运行</strong> 多次看效果即可。</p>
<p>在推导式中用 <code>_</code>（下划线）作为"占位循环变量"，表示"我只需要循环 n 次，不关心索引值"：</p>
<pre><code>nums = [randint(1, 10) for _ in range(5)]  # _ 表示不用这个索引</code></pre>`,
        en: `<p class="lead">The <code>random</code> module provides a variety of randomisation tools — essential for games, simulations, and testing:</p>
<table><thead><tr><th>Function</th><th>Meaning</th><th>Example</th></tr></thead><tbody>
<tr><td><code>randint(a, b)</code></td><td>random integer in [a, b] inclusive</td><td><code>randint(1, 6)</code> → dice roll</td></tr>
<tr><td><code>random()</code></td><td>random float in [0.0, 1.0)</td><td><code>random()</code> → 0.37...</td></tr>
<tr><td><code>choice(seq)</code></td><td>pick one element at random</td><td><code>choice(["A","B","C"])</code></td></tr>
<tr><td><code>shuffle(lst)</code></td><td>shuffle a list in place</td><td><code>shuffle(cards)</code></td></tr>
<tr><td><code>sample(seq, k)</code></td><td>pick k unique elements at random</td><td><code>sample(range(100), 5)</code></td></tr>
</tbody></table>
<pre><code>from random import randint, choice, shuffle

# simulate a dice roll
print(randint(1, 6))

# pick a random fruit
fruits = ["apple", "banana", "cherry"]
print(choice(fruits))

# shuffle a list
nums = [1, 2, 3, 4, 5]
shuffle(nums)
print(nums)                   # different order every time</code></pre>
<p>Because results are random, output changes every run — click <strong>Run</strong> several times to see this.</p>
<p>Use <code>_</code> (underscore) as a "throwaway loop variable" when you only need to repeat n times and don't care about the index:</p>
<pre><code>nums = [randint(1, 10) for _ in range(5)]  # _ means "I don't need this index"</code></pre>`,
      },
      task: { zh: '用列表推导式 + <code>randint(1, 10)</code> 生成 5 个随机整数，存入 <code>nums</code>；分两行输出 nums 的长度和是否全部在 1~10 之间', en: 'Use a list comprehension + <code>randint(1, 10)</code> to generate 5 random integers into <code>nums</code>; print two lines: the length of nums and whether all values are in range' },
      hint: { zh: '[randint(1,10) for _ in range(5)]；all(1<=n<=10 for n in nums)。', en: '[randint(1,10) for _ in range(5)]; all(1 <= n <= 10 for n in nums).' },
      starter: { zh: 'from random import randint\n# 生成 5 个随机整数\n', en: 'from random import randint\n# generate 5 random integers\n' },
      answer: 'from random import randint\nnums = [randint(1, 10) for _ in range(5)]\nprint(len(nums))\nprint(all(1 <= n <= 10 for n in nums))\n',
      expectedOutput: '5\nTrue\n', testInputs: [],
    },

    /* ══════════ PART 22 · 文件读写（浏览器适配） ══════════ */
    {
      id: 48, section: 'main',
      chapter: { zh: 'Part 22 · 文件读写', en: 'Part 22 · File I/O' },
      title: { zh: '逐行处理文本（字符串模拟）', en: 'Line-by-Line Text Processing' },
      difficulty: { zh: '进阶', en: 'Advanced' }, chapterRef: 'python-tute-3',
      intro: {
        zh: `<p class="lead">在真实 Python 环境中，文件用 <code>open()</code> + <code>with</code> 语句读写：</p>
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
data = [l for l in content.split("\\n") if not l.startswith("#")]</code></pre>`,
        en: `<p class="lead">In a real Python environment, files are read and written with <code>open()</code> + the <code>with</code> statement:</p>
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
data = [l for l in content.split("\\n") if not l.startswith("#")]</code></pre>`,
      },
      task: { zh: '把 <code>content</code> 按行拆分，对每一行输出 <code>"line: " + 去空白后的内容</code>，跳过空行', en: 'Split <code>content</code> by line; for each non-empty line print <code>"line: " + stripped content</code>, skipping blank lines' },
      hint: { zh: 'split("\\n") 拆行，strip() 去空白，if line.strip() 跳过空行。', en: 'split("\\n") to split, strip() to clean, if line.strip() to skip blanks.' },
      starter: { zh: 'content = "  Alice 90  \\n\\n  Bob 85  \\n  Carol 92  "\n# 逐行处理，跳过空行\n', en: 'content = "  Alice 90  \\n\\n  Bob 85  \\n  Carol 92  "\n# process each line, skip blanks\n' },
      answer: 'content = "  Alice 90  \\n\\n  Bob 85  \\n  Carol 92  "\nfor line in content.split("\\n"):\n    clean = line.strip()\n    if clean:\n        print("line: " + clean)\n',
      expectedOutput: 'line: Alice 90\nline: Bob 85\nline: Carol 92\n', testInputs: [],
      warning: {
        zh: '由于浏览器沙箱无法访问本地文件系统，本课时以字符串变量模拟文件内容——逻辑与真实 Python 的 <code>open()</code> 完全一致，在本地环境中替换为 <code>with open("data.txt") as f:</code> 即可直接使用。',
        en: 'Because the browser sandbox has no access to the local file system, this lesson simulates file content with a string variable. The logic is identical to real Python — in a local environment, replace the string with <code>with open("data.txt") as f:</code> and it works as-is.',
      },
    },

    /* ══════════ PART 23 · CSV（字符串模拟） ══════════ */
    {
      id: 49, section: 'main',
      chapter: { zh: 'Part 23 · CSV 文件处理', en: 'Part 23 · CSV Processing' },
      title: { zh: '解析 CSV 字符串', en: 'Parsing a CSV String' },
      difficulty: { zh: '进阶', en: 'Advanced' }, chapterRef: 'python-tute-3',
      intro: {
        zh: `<p class="lead">CSV（Comma-Separated Values，逗号分隔值）是一种极其普遍的数据格式：每行是一条记录，字段之间用逗号分隔，第一行通常是列名（表头）：</p>
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
    print(row)</code></pre>`,
        en: `<p class="lead">CSV (Comma-Separated Values) is one of the most widespread data formats: each line is a record, fields are separated by commas, and the first line is usually a header row:</p>
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
    print(row)</code></pre>`,
      },
      task: { zh: '解析 <code>csv_data</code>，跳过表头，输出分数（第三列）大于 87 的学生名字', en: 'Parse <code>csv_data</code>, skip the header, and print the name of every student whose score (third column) is greater than 87' },
      hint: { zh: 'split("\\n") 拆行，lines[1:] 跳表头，int(row[2]) 转数字。', en: 'split("\\n") to split lines, lines[1:] to skip the header, int(row[2]) to convert the score.' },
      starter: { zh: 'csv_data = "name,age,score\\nAlice,20,90\\nBob,21,85\\nCarol,19,92"\n# 解析并筛选\n', en: 'csv_data = "name,age,score\\nAlice,20,90\\nBob,21,85\\nCarol,19,92"\n# parse and filter\n' },
      answer: 'csv_data = "name,age,score\\nAlice,20,90\\nBob,21,85\\nCarol,19,92"\nlines = csv_data.split("\\n")\nfor line in lines[1:]:\n    row = line.split(",")\n    if int(row[2]) > 87:\n        print(row[0])\n',
      expectedOutput: 'Alice\nCarol\n', testInputs: [],
      warning: {
        zh: '由于浏览器沙箱无法访问本地文件系统，本课时以字符串变量模拟 CSV 文件内容。真实场景中应使用 Python 内置的 <code>csv</code> 模块配合 <code>open()</code>，解析逻辑完全相同。',
        en: 'Because the browser sandbox has no file system access, this lesson simulates CSV file content with a string. In a real project, use Python\'s built-in <code>csv</code> module together with <code>open()</code> — the parsing logic is exactly the same.',
      },
    },

    /* ══════════ PART 24 · 异常处理 ══════════ */
    {
      id: 50, section: 'main',
      chapter: { zh: 'Part 24 · 异常处理', en: 'Part 24 · Exception Handling' },
      title: { zh: 'try 和 except', en: 'try and except' },
      difficulty: { zh: '进阶', en: 'Advanced' }, chapterRef: 'python-tute-3',
      intro: {
        zh: `<p class="lead">程序运行时发生的错误叫<strong>异常</strong>（exception）。不处理的话程序直接崩溃并打印错误信息；用 <code>try/except</code> 可以捕获异常、优雅地处理错误：</p>
<pre><code># 不处理：程序崩溃
n = int("hello")   # ValueError: invalid literal for int() with base 10: 'hello'

# 用 try/except 捕获
try:
    n = int("hello")
    print("转换成功：", n)   # ← 如果 int() 成功，执行这里
except ValueError:
    print("不是有效整数")     # ← 如果 int() 失败，跳到这里</code></pre>
<p><strong>执行流程</strong>：</p>
<ol>
<li>执行 <code>try</code> 块里的代码</li>
<li>如果没有异常，跳过所有 <code>except</code>，继续执行后续代码</li>
<li>如果有异常，查找匹配的 <code>except</code> 子句并执行它</li>
</ol>
<p>常见异常类型：</p>
<table><thead><tr><th>异常</th><th>触发原因</th></tr></thead><tbody>
<tr><td><code>ValueError</code></td><td>值的类型对但内容不合法（如 <code>int("abc")</code>）</td></tr>
<tr><td><code>TypeError</code></td><td>操作用了错误类型（如 <code>"a" + 1</code>）</td></tr>
<tr><td><code>ZeroDivisionError</code></td><td>除以零</td></tr>
<tr><td><code>IndexError</code></td><td>列表索引越界</td></tr>
<tr><td><code>KeyError</code></td><td>字典键不存在</td></tr>
</tbody></table>`,
        en: `<p class="lead">A runtime error is called an <strong>exception</strong>. Without handling, the program crashes and prints a traceback. Use <code>try/except</code> to catch exceptions and respond gracefully:</p>
<pre><code># without handling: program crashes
n = int("hello")   # ValueError: invalid literal for int() with base 10: 'hello'

# with try/except
try:
    n = int("hello")
    print("Converted:", n)   # ← runs if int() succeeds
except ValueError:
    print("not a valid integer")  # ← runs if int() raises ValueError</code></pre>
<p><strong>Execution flow</strong>:</p>
<ol>
<li>Execute the <code>try</code> block</li>
<li>If no exception, skip all <code>except</code> clauses and continue</li>
<li>If an exception occurs, find the matching <code>except</code> and execute it</li>
</ol>
<p>Common exception types:</p>
<table><thead><tr><th>Exception</th><th>When it occurs</th></tr></thead><tbody>
<tr><td><code>ValueError</code></td><td>right type, wrong content (e.g. <code>int("abc")</code>)</td></tr>
<tr><td><code>TypeError</code></td><td>wrong type for the operation (e.g. <code>"a" + 1</code>)</td></tr>
<tr><td><code>ZeroDivisionError</code></td><td>divide by zero</td></tr>
<tr><td><code>IndexError</code></td><td>list index out of range</td></tr>
<tr><td><code>KeyError</code></td><td>dictionary key does not exist</td></tr>
</tbody></table>`,
      },
      task: { zh: '用 try/except 把 <code>"abc"</code> 转成整数；捕获 <code>ValueError</code> 并输出 <code>not a number</code>', en: 'Use try/except to convert <code>"abc"</code> to an integer; catch the <code>ValueError</code> and print <code>not a number</code>' },
      hint: { zh: 'try: n = int("abc") ... except ValueError: print("not a number")。', en: 'try: n = int("abc") ... except ValueError: print("not a number").' },
      starter: { zh: '# try/except 捕获 ValueError\n', en: '# try/except catching ValueError\n' },
      answer: 'try:\n    n = int("abc")\n    print(n)\nexcept ValueError:\n    print("not a number")\n',
      expectedOutput: 'not a number\n', testInputs: [],
    },

    {
      id: 51, section: 'main',
      chapter: { zh: 'Part 24 · 异常处理', en: 'Part 24 · Exception Handling' },
      title: { zh: '捕获多种异常', en: 'Multiple except Clauses' },
      difficulty: { zh: '进阶', en: 'Advanced' }, chapterRef: 'python-tute-3',
      intro: {
        zh: `<p class="lead">一个 <code>try</code> 块可以跟多个 <code>except</code> 子句，分别处理不同类型的异常——Python 从上往下匹配，执行第一个命中的 <code>except</code>：</p>
<pre><code>try:
    result = 10 / int(input("除数："))
    print(result)
except ValueError:
    print("不是数字")          # 用户输入 "abc" 时触发
except ZeroDivisionError:
    print("不能除以零")        # 用户输入 "0" 时触发</code></pre>
<p>还有两个可选子句：</p>
<ul>
<li><code>else</code>：<strong>没有异常</strong>时执行（比把代码放在 try 末尾更清晰）</li>
<li><code>finally</code>：<strong>无论是否有异常都执行</strong>，常用于释放资源（关文件、断数据库连接）</li>
</ul>
<pre><code>try:
    n = int(input("整数："))
    result = 100 / n
except ValueError:
    print("请输入数字")
except ZeroDivisionError:
    print("不能为 0")
else:
    print(f"结果是 {result}")  # 只有成功才打印
finally:
    print("执行完毕")           # 始终打印</code></pre>
<p>如果想一个 <code>except</code> 捕获多种异常，用元组：</p>
<pre><code>except (ValueError, TypeError):
    print("输入有问题")</code></pre>`,
        en: `<p class="lead">A <code>try</code> block can be followed by multiple <code>except</code> clauses, each handling a different exception type — Python matches from top to bottom and runs the first matching one:</p>
<pre><code>try:
    result = 10 / int(input("divisor: "))
    print(result)
except ValueError:
    print("not a number")       # triggered when user types "abc"
except ZeroDivisionError:
    print("cannot divide by zero")  # triggered when user types "0"</code></pre>
<p>Two optional clauses:</p>
<ul>
<li><code>else</code>: runs only when <strong>no exception occurred</strong> (cleaner than putting code at the end of try)</li>
<li><code>finally</code>: runs <strong>always</strong>, whether or not an exception occurred — used to release resources (close files, disconnect from databases)</li>
</ul>
<pre><code>try:
    n = int(input("Integer: "))
    result = 100 / n
except ValueError:
    print("please enter a number")
except ZeroDivisionError:
    print("cannot be 0")
else:
    print(f"result is {result}")  # only printed on success
finally:
    print("done")                  # always printed</code></pre>
<p>To catch multiple exception types with one <code>except</code>, use a tuple:</p>
<pre><code>except (ValueError, TypeError):
    print("bad input")</code></pre>`,
      },
      task: { zh: '用 <code>input("n: ")</code> 读取一个数，计算 <code>100 / n</code>；捕获 <code>ValueError</code> 和 <code>ZeroDivisionError</code>（测试输入为 <code>0</code>）', en: 'Use <code>input("n: ")</code> to read a number and compute <code>100 / n</code>; catch <code>ValueError</code> printing <code>not a number</code> and <code>ZeroDivisionError</code> printing <code>cannot divide by zero</code> (test input: <code>0</code>)' },
      hint: { zh: '两个 except 分别捕获两种异常。', en: 'Two separate except clauses for the two error types.' },
      starter: { zh: '# try/except 捕获两种异常\n', en: '# try/except with two exception types\n' },
      answer: 'try:\n    n = int(input("n: "))\n    print(100 / n)\nexcept ValueError:\n    print("not a number")\nexcept ZeroDivisionError:\n    print("cannot divide by zero")\n',
      expectedOutput: 'cannot divide by zero\n', testInputs: ['0'],
    },

    {
      id: 52, section: 'main',
      chapter: { zh: 'Part 24 · 异常处理', en: 'Part 24 · Exception Handling' },
      title: { zh: 'raise 主动抛出异常', en: 'raise: Throwing Exceptions' },
      difficulty: { zh: '进阶', en: 'Advanced' }, chapterRef: 'python-tute-3',
      intro: {
        zh: `<p class="lead">除了被动捕获异常，也可以主动用 <code>raise</code> 抛出异常——当函数检测到输入不合法时，主动报错比悄悄产生错误结果要好得多：</p>
<pre><code>def check_age(age):
    if age < 0:
        raise ValueError("年龄不能为负数")  # 主动抛出
    if age > 150:
        raise ValueError("年龄不合理")
    return age

try:
    check_age(-5)
except ValueError as e:   # 用 as e 获取异常对象
    print(f"错误：{e}")   # 错误：年龄不能为负数</code></pre>
<p><code>as e</code> 把异常对象赋给变量 <code>e</code>，调用 <code>str(e)</code>（或在 f-string 里直接用）可以拿到异常消息。</p>
<p>常用于 <code>raise</code> 的内置异常类型：</p>
<table><thead><tr><th>异常</th><th>适用场景</th></tr></thead><tbody>
<tr><td><code>ValueError</code></td><td>值的内容不合法（如负数年龄）</td></tr>
<tr><td><code>TypeError</code></td><td>类型不对（如期望 int 却传了 str）</td></tr>
<tr><td><code>RuntimeError</code></td><td>通用运行时错误</td></tr>
</tbody></table>
<p>好的实践：<code>raise</code> 时写清楚消息，方便调用方看明白哪里出了问题：</p>
<pre><code>raise ValueError(f"期望正整数，实际得到 {n}")  # 比 raise ValueError("错误") 有用</code></pre>`,
        en: `<p class="lead">Besides catching exceptions passively, you can actively throw them with <code>raise</code> — when a function detects invalid input, raising an exception is far better than silently producing a wrong result:</p>
<pre><code>def check_age(age):
    if age < 0:
        raise ValueError("age cannot be negative")  # actively raise
    if age > 150:
        raise ValueError("age seems unrealistic")
    return age

try:
    check_age(-5)
except ValueError as e:   # 'as e' binds the exception to e
    print(f"Error: {e}")  # Error: age cannot be negative</code></pre>
<p><code>as e</code> assigns the exception object to <code>e</code>. Calling <code>str(e)</code> (or using it directly in an f-string) retrieves the message.</p>
<p>Common exception types to raise:</p>
<table><thead><tr><th>Exception</th><th>When to use it</th></tr></thead><tbody>
<tr><td><code>ValueError</code></td><td>value content is wrong (e.g. negative age)</td></tr>
<tr><td><code>TypeError</code></td><td>wrong type (e.g. expected int, got str)</td></tr>
<tr><td><code>RuntimeError</code></td><td>general runtime problem</td></tr>
</tbody></table>
<p>Best practice: include a descriptive message so callers understand what went wrong:</p>
<pre><code>raise ValueError(f"expected a positive integer, got {n}")  # more useful than just "error"</code></pre>`,
      },
      task: { zh: '定义 <code>check_positive(n)</code>：若 n ≤ 0 则 raise ValueError("must be positive")；用 try/except 调用 <code>check_positive(-5)</code>，输出异常消息', en: 'Define <code>check_positive(n)</code>: raise ValueError("must be positive") if n ≤ 0; use try/except to call <code>check_positive(-5)</code> and print the exception message' },
      hint: { zh: 'raise ValueError("must be positive")；except ValueError as e: print(e)。', en: 'raise ValueError("must be positive"); except ValueError as e: print(e).' },
      starter: { zh: '# 定义 check_positive\n\n# try/except 调用并输出异常消息\n', en: '# define check_positive\n\n# try/except call and print message\n' },
      answer: 'def check_positive(n):\n    if n <= 0:\n        raise ValueError("must be positive")\n    return n\ntry:\n    check_positive(-5)\nexcept ValueError as e:\n    print(e)\n',
      expectedOutput: 'must be positive\n', testInputs: [],
    },

    /* ══════════ PART 25 · 递归 ══════════ */
    {
      id: 53, section: 'main',
      chapter: { zh: 'Part 25 · 递归', en: 'Part 25 · Recursion' },
      title: { zh: '递归：阶乘', en: 'Recursion: Factorial' },
      difficulty: { zh: '进阶', en: 'Advanced' }, chapterRef: 'python-tute-3',
      intro: {
        zh: `<p class="lead"><strong>递归</strong>是函数调用自身来解决问题的技术。每次调用把原问题缩小一步，直到缩小到能直接回答的<strong>基本情况（base case）</strong>，然后逐层返回结果。</p>
<p>以阶乘为例：<code>5! = 5 × 4! = 5 × 4 × 3! = …</code></p>
<pre><code>def factorial(n):
    if n <= 1:           # 基本情况：能直接回答
        return 1
    return n * factorial(n - 1)   # 递归情况：缩小问题

print(factorial(5))   # 120</code></pre>
<p>调用过程展开（以 <code>factorial(4)</code> 为例）：</p>
<pre><code>factorial(4)
  → 4 * factorial(3)
       → 3 * factorial(2)
            → 2 * factorial(1)
                 → 1          ← 基本情况，开始返回
            ← 2 * 1 = 2
       ← 3 * 2 = 6
  ← 4 * 6 = 24</code></pre>
<p><strong>两个必要条件</strong>：</p>
<ol>
<li>必须有<strong>基本情况</strong>（否则无限递归，Python 默认最多 1000 层后报 <code>RecursionError</code>）</li>
<li>每次递归必须让问题<strong>向基本情况逼近</strong></li>
</ol>`,
        en: `<p class="lead"><strong>Recursion</strong> is the technique of a function calling itself to solve a problem. Each call shrinks the problem by one step until it reaches a <strong>base case</strong> that can be answered directly, then results unwind back up the call chain.</p>
<p>Factorial example: <code>5! = 5 × 4! = 5 × 4 × 3! = …</code></p>
<pre><code>def factorial(n):
    if n <= 1:           # base case: answer directly
        return 1
    return n * factorial(n - 1)   # recursive case: shrink the problem

print(factorial(5))   # 120</code></pre>
<p>Unwinding the calls for <code>factorial(4)</code>:</p>
<pre><code>factorial(4)
  → 4 * factorial(3)
       → 3 * factorial(2)
            → 2 * factorial(1)
                 → 1          ← base case, start returning
            ← 2 * 1 = 2
       ← 3 * 2 = 6
  ← 4 * 6 = 24</code></pre>
<p><strong>Two requirements for correct recursion</strong>:</p>
<ol>
<li>Must have a <strong>base case</strong> — without one, Python hits infinite recursion and raises <code>RecursionError</code> after ~1000 calls by default</li>
<li>Each recursive call must move <strong>closer to the base case</strong></li>
</ol>`,
      },
      task: { zh: '写一个递归函数 <code>factorial(n)</code>，输出 <code>factorial(6)</code> 的结果', en: 'Write a recursive function <code>factorial(n)</code> and print the result of <code>factorial(6)</code>' },
      hint: { zh: '基本情况：n <= 1 返回 1；递归情况：return n * factorial(n - 1)。', en: 'Base case: n <= 1 return 1; recursive case: return n * factorial(n - 1).' },
      starter: { zh: '# 递归阶乘\n\nprint(factorial(6))\n', en: '# recursive factorial\n\nprint(factorial(6))\n' },
      answer: 'def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\nprint(factorial(6))\n',
      expectedOutput: '720\n', testInputs: [],
    },

    {
      id: 54, section: 'main',
      chapter: { zh: 'Part 25 · 递归', en: 'Part 25 · Recursion' },
      title: { zh: '递归：斐波那契数列', en: 'Recursion: Fibonacci' },
      difficulty: { zh: '进阶', en: 'Advanced' }, chapterRef: 'python-tute-3',
      intro: {
        zh: `<p class="lead">斐波那契数列：0, 1, 1, 2, 3, 5, 8, 13, 21…，其中每个数等于前两个数之和。这个定义天然就是递归形式：</p>
<pre><code>def fib(n):
    if n <= 1:              # 基本情况：fib(0)=0, fib(1)=1
        return n
    return fib(n-1) + fib(n-2)   # 两次递归调用

print(fib(8))   # 21</code></pre>
<p>每次调用会拆分成<strong>两次</strong>子调用，形成树形结构：</p>
<pre><code>fib(4)
├── fib(3)
│   ├── fib(2) → fib(1) + fib(0)
│   └── fib(1)
└── fib(2)
    ├── fib(1)
    └── fib(0)</code></pre>
<p><strong>性能警告</strong>：<code>fib(n)</code> 的调用次数随 n 指数增长——<code>fib(30)</code> 就要超过一百万次重复计算。解决方法是<strong>记忆化</strong>（缓存已算过的结果）：</p>
<pre><code>cache = {}
def fib_fast(n):
    if n in cache:
        return cache[n]         # 直接查缓存
    if n <= 1:
        return n
    cache[n] = fib_fast(n-1) + fib_fast(n-2)
    return cache[n]

print(fib_fast(50))   # 12586269025（极快）</code></pre>`,
        en: `<p class="lead">The Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21… — each number is the sum of the two before it. This definition is naturally recursive:</p>
<pre><code>def fib(n):
    if n <= 1:              # base cases: fib(0)=0, fib(1)=1
        return n
    return fib(n-1) + fib(n-2)   # two recursive calls

print(fib(8))   # 21</code></pre>
<p>Each call splits into <strong>two</strong> sub-calls, forming a tree:</p>
<pre><code>fib(4)
├── fib(3)
│   ├── fib(2) → fib(1) + fib(0)
│   └── fib(1)
└── fib(2)
    ├── fib(1)
    └── fib(0)</code></pre>
<p><strong>Performance warning</strong>: the number of calls grows exponentially — <code>fib(30)</code> triggers over a million redundant calculations. The fix is <strong>memoization</strong> (cache previously computed results):</p>
<pre><code>cache = {}
def fib_fast(n):
    if n in cache:
        return cache[n]           # return cached result
    if n <= 1:
        return n
    cache[n] = fib_fast(n-1) + fib_fast(n-2)
    return cache[n]

print(fib_fast(50))   # 12586269025  (near-instant)</code></pre>`,
      },
      task: { zh: '写递归函数 <code>fib(n)</code>，输出 <code>fib(10)</code> 的值', en: 'Write a recursive function <code>fib(n)</code> and print the value of <code>fib(10)</code>' },
      hint: { zh: '基本情况 n<=1 返回 n；return fib(n-1) + fib(n-2)。', en: 'Base case n<=1 returns n; return fib(n-1) + fib(n-2).' },
      starter: { zh: '# 递归斐波那契\n\nprint(fib(10))\n', en: '# recursive Fibonacci\n\nprint(fib(10))\n' },
      answer: 'def fib(n):\n    if n <= 1:\n        return n\n    return fib(n - 1) + fib(n - 2)\nprint(fib(10))\n',
      expectedOutput: '55\n', testInputs: [],
    },

    {
      id: 55, section: 'main',
      chapter: { zh: 'Part 25 · 递归', en: 'Part 25 · Recursion' },
      title: { zh: '递归：列表求最大值', en: 'Recursion: List Max' },
      difficulty: { zh: '进阶', en: 'Advanced' }, chapterRef: 'python-tute-3',
      intro: {
        zh: `<p class="lead">很多列表操作都能用递归思路表达：把"对整个列表的问题"变成"对第一个元素的处理 + 对剩余列表的同一问题"。</p>
<p>以求最大值为例：</p>
<pre><code>def rec_max(lst):
    if len(lst) == 1:          # 基本情况：只有一个元素，就是最大值
        return lst[0]
    rest_max = rec_max(lst[1:])   # 递归：剩余部分的最大值
    return lst[0] if lst[0] > rest_max else rest_max  # 比较首元素和剩余最大值</code></pre>
<p>展开 <code>rec_max([3, 7, 1])</code>：</p>
<pre><code>rec_max([3, 7, 1])
  → max(3, rec_max([7, 1]))
        → max(7, rec_max([1]))
               → 1              ← 基本情况
        ← max(7, 1) = 7
  ← max(3, 7) = 7</code></pre>
<p>这里用了 Python 的<strong>三元表达式</strong>（条件表达式）：</p>
<pre><code>值A if 条件 else 值B
# 条件为真时返回 值A，否则返回 值B

x = 10
result = "大" if x > 5 else "小"   # "大"</code></pre>
<p>注意：<code>lst[1:]</code> 每次创建新切片，有额外的内存开销。实际工程中对大列表求最大值，直接用内置 <code>max()</code> 更高效。</p>`,
        en: `<p class="lead">Many list operations can be expressed recursively: turn "a problem on the whole list" into "handle the first element + the same problem on the rest."</p>
<p>Finding the maximum as an example:</p>
<pre><code>def rec_max(lst):
    if len(lst) == 1:             # base case: one element is the max
        return lst[0]
    rest_max = rec_max(lst[1:])   # recursive: max of the remaining elements
    return lst[0] if lst[0] > rest_max else rest_max  # compare head with rest's max</code></pre>
<p>Unwinding <code>rec_max([3, 7, 1])</code>:</p>
<pre><code>rec_max([3, 7, 1])
  → max(3, rec_max([7, 1]))
        → max(7, rec_max([1]))
               → 1              ← base case
        ← max(7, 1) = 7
  ← max(3, 7) = 7</code></pre>
<p>This uses Python's <strong>conditional (ternary) expression</strong>:</p>
<pre><code>value_if_true if condition else value_if_false

x = 10
result = "big" if x > 5 else "small"   # "big"</code></pre>
<p>Note: <code>lst[1:]</code> creates a new slice on every call, which costs extra memory. In real code, use the built-in <code>max()</code> for large lists — it's far more efficient.</p>`,
      },
      task: { zh: '写递归函数 <code>rec_max(lst)</code>，不用内置 <code>max()</code>，返回列表中的最大值；用 <code>[3, 7, 1, 9, 4]</code> 测试并输出', en: 'Write a recursive function <code>rec_max(lst)</code> without using built-in <code>max()</code>; test with <code>[3, 7, 1, 9, 4]</code> and print the result' },
      hint: { zh: '基本情况 len==1 返回 lst[0]；递归比较 lst[0] 和 rec_max(lst[1:])。', en: 'Base case len==1 returns lst[0]; recursively compare lst[0] with rec_max(lst[1:]).' },
      starter: { zh: '# 递归求最大值（不用 max()）\n\nprint(rec_max([3, 7, 1, 9, 4]))\n', en: '# recursive max (without max())\n\nprint(rec_max([3, 7, 1, 9, 4]))\n' },
      answer: 'def rec_max(lst):\n    if len(lst) == 1:\n        return lst[0]\n    rest_max = rec_max(lst[1:])\n    return lst[0] if lst[0] > rest_max else rest_max\nprint(rec_max([3, 7, 1, 9, 4]))\n',
      expectedOutput: '9\n', testInputs: [],
    },

    /* ══════════ PART 26 · 调试 ══════════ */
    {
      id: 56, section: 'main',
      chapter: { zh: 'Part 26 · 调试技巧', en: 'Part 26 · Debugging' },
      title: { zh: '找出并修复 Bug', en: 'Find & Fix the Bug' },
      difficulty: { zh: '进阶', en: 'Advanced' }, chapterRef: 'python-tute-3',
      intro: {
        zh: `<p class="lead">调试（debug）是找出并修复代码中错误的过程。Python 的错误分两大类：</p>
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
<p><strong>策略三：检查边界条件</strong>——空列表、0、负数、最大值等极端情况是逻辑错误最容易出现的地方。</p>`,
        en: `<p class="lead">Debugging is the process of finding and fixing mistakes in code. Python errors fall into two broad categories:</p>
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
<p><strong>Strategy 3: Check edge cases</strong> — empty lists, zero, negative numbers, and maximum values are where logic bugs most often hide.</p>`,
      },
      task: { zh: '下面代码应输出 <code>[1,2,3,4,5,6]</code> 中所有偶数之和（答案 <strong>12</strong>），但有 Bug。找到并修复它。', en: 'The code below should output the sum of all even numbers in <code>[1,2,3,4,5,6]</code> (answer: <strong>12</strong>), but it has a bug. Find and fix it.' },
      hint: { zh: '仔细看 total 的更新方式——是赋值还是累加？', en: 'Look carefully at how total is updated — assignment or accumulation?' },
      starter: { zh: 'nums = [1, 2, 3, 4, 5, 6]\ntotal = 0\nfor n in nums:\n    if n % 2 == 0:\n        total = n    # Bug 在这里\nprint(total)\n', en: 'nums = [1, 2, 3, 4, 5, 6]\ntotal = 0\nfor n in nums:\n    if n % 2 == 0:\n        total = n    # Bug is here\nprint(total)\n' },
      answer: 'nums = [1, 2, 3, 4, 5, 6]\ntotal = 0\nfor n in nums:\n    if n % 2 == 0:\n        total += n\nprint(total)\n',
      expectedOutput: '12\n', testInputs: [],
    },

    /* ══════════ PART 27 · 实用技巧 ══════════ */
    {
      id: 57, section: 'main',
      chapter: { zh: 'Part 27 · 实用技巧', en: 'Part 27 · Practical Tips' },
      title: { zh: 'zip() 并行遍历与解包', en: 'zip() Parallel Iteration & Unpacking' },
      difficulty: { zh: '进阶', en: 'Advanced' }, chapterRef: 'python-tute-3',
      intro: {
        zh: `<p class="lead"><code>zip()</code> 把多个序列"拉链"在一起，每次取出来自各个序列的对应位置元素，组合成元组：</p>
<pre><code>names  = ["Alice", "Bob", "Carol"]
scores = [90, 85, 92]

# 不用 zip：繁琐
for i in range(len(names)):
    print(f"{names[i]}: {scores[i]}")

# 用 zip：简洁
for name, score in zip(names, scores):
    print(f"{name}: {score}")</code></pre>
<p><code>zip()</code> 以<strong>最短</strong>的序列为准停止——如果两个序列长度不同，多余的元素会被忽略：</p>
<pre><code>a = [1, 2, 3, 4]
b = ["a", "b"]
print(list(zip(a, b)))   # [(1, 'a'), (2, 'b')]  ← 只有 2 对</code></pre>
<p>用 <code>list(zip(...))</code> 可以把 zip 对象转成可查看的列表。还可以用 <code>zip</code> 同时遍历三个或更多序列：</p>
<pre><code>names  = ["Alice", "Bob"]
scores = [90, 85]
grades = ["A", "B"]
for name, score, grade in zip(names, scores, grades):
    print(f"{name}: {score} ({grade})")</code></pre>`,
        en: `<p class="lead"><code>zip()</code> "zips" multiple sequences together, producing a tuple from corresponding positions on each iteration:</p>
<pre><code>names  = ["Alice", "Bob", "Carol"]
scores = [90, 85, 92]

# without zip: verbose
for i in range(len(names)):
    print(f"{names[i]}: {scores[i]}")

# with zip: clean
for name, score in zip(names, scores):
    print(f"{name}: {score}")</code></pre>
<p><code>zip()</code> stops at the <strong>shortest</strong> sequence — excess elements from longer sequences are silently dropped:</p>
<pre><code>a = [1, 2, 3, 4]
b = ["a", "b"]
print(list(zip(a, b)))   # [(1, 'a'), (2, 'b')]  ← only 2 pairs</code></pre>
<p>Wrap in <code>list(...)</code> to inspect the pairs. You can also zip three or more sequences at once:</p>
<pre><code>names  = ["Alice", "Bob"]
scores = [90, 85]
grades = ["A", "B"]
for name, score, grade in zip(names, scores, grades):
    print(f"{name}: {score} ({grade})")</code></pre>`,
      },
      task: { zh: '<code>names = ["Alice","Bob","Carol"]</code>，<code>scores = [90,85,92]</code>，用 <code>zip()</code> 遍历，每行输出 <code>名字: 分数</code>', en: 'Given <code>names = ["Alice","Bob","Carol"]</code> and <code>scores = [90,85,92]</code>, iterate with <code>zip()</code> and print each as <code>name: score</code>' },
      hint: { zh: 'for name, score in zip(names, scores): print(f"{name}: {score}")。', en: 'for name, score in zip(names, scores): print(f"{name}: {score}").' },
      starter: { zh: 'names = ["Alice", "Bob", "Carol"]\nscores = [90, 85, 92]\n', en: 'names = ["Alice", "Bob", "Carol"]\nscores = [90, 85, 92]\n' },
      answer: 'names = ["Alice", "Bob", "Carol"]\nscores = [90, 85, 92]\nfor name, score in zip(names, scores):\n    print(f"{name}: {score}")\n',
      expectedOutput: 'Alice: 90\nBob: 85\nCarol: 92\n', testInputs: [],
    },

    {
      id: 58, section: 'main',
      chapter: { zh: 'Part 27 · 实用技巧', en: 'Part 27 · Practical Tips' },
      title: { zh: 'any() 与 all()', en: 'any() and all()' },
      difficulty: { zh: '进阶', en: 'Advanced' }, chapterRef: 'python-tute-3',
      intro: {
        zh: `<p class="lead"><code>all()</code> 检查序列中<strong>所有</strong>元素是否都满足条件（全真才真）；<code>any()</code> 检查是否<strong>至少有一个</strong>满足条件（有一真就真）：</p>
<pre><code>nums = [2, 4, 6, 8]
print(all(n % 2 == 0 for n in nums))   # True  ← 全部是偶数
print(any(n > 5 for n in nums))         # True  ← 有 6 和 8 大于 5</code></pre>
<p>括号里用的是<strong>生成器表达式</strong>（类似列表推导式，但不生成列表，更省内存）：<code>条件表达式 for 变量 in 可迭代对象</code>。</p>
<p><strong>短路特性</strong>（与 and/or 类似）：</p>
<ul>
<li><code>all()</code>：遇到第一个 <code>False</code> 就立刻返回 <code>False</code>，不再检查后面的元素</li>
<li><code>any()</code>：遇到第一个 <code>True</code> 就立刻返回 <code>True</code>，不再检查后面的元素</li>
</ul>
<pre><code>nums = [2, 3, 4, 6]
print(all(n % 2 == 0 for n in nums))   # False ← n=3 就停了
print(any(n > 10 for n in nums))        # False ← 遍历完都没找到</code></pre>
<p><strong>边界情况</strong>：对<strong>空序列</strong>，<code>all([])</code> 返回 <code>True</code>（"没有任何元素违反条件"），<code>any([])</code> 返回 <code>False</code>（"没有任何元素满足条件"）。</p>`,
        en: `<p class="lead"><code>all()</code> checks whether <strong>every</strong> element in a sequence satisfies a condition (all true → true); <code>any()</code> checks whether <strong>at least one</strong> does (one true is enough):</p>
<pre><code>nums = [2, 4, 6, 8]
print(all(n % 2 == 0 for n in nums))   # True  ← all are even
print(any(n > 5 for n in nums))         # True  ← 6 and 8 are > 5</code></pre>
<p>The argument uses a <strong>generator expression</strong> (like a list comprehension but without building a list — more memory-efficient): <code>condition for variable in iterable</code>.</p>
<p><strong>Short-circuit behaviour</strong> (same as and/or):</p>
<ul>
<li><code>all()</code>: stops and returns <code>False</code> on the first <code>False</code> it finds</li>
<li><code>any()</code>: stops and returns <code>True</code> on the first <code>True</code> it finds</li>
</ul>
<pre><code>nums = [2, 3, 4, 6]
print(all(n % 2 == 0 for n in nums))   # False ← stops at n=3
print(any(n > 10 for n in nums))        # False ← exhausts the whole list</code></pre>
<p><strong>Edge cases</strong>: on an <strong>empty sequence</strong>, <code>all([])</code> returns <code>True</code> ("no element violates the condition") and <code>any([])</code> returns <code>False</code> ("no element satisfies the condition").</p>`,
      },
      task: { zh: '<code>nums = [2, 4, 6, 8, 10]</code>，分两行输出：所有数是否都是偶数（<code>all</code>）、是否存在大于 7 的数（<code>any</code>）', en: 'Given <code>nums = [2, 4, 6, 8, 10]</code>, print two lines: whether all numbers are even (use <code>all</code>), and whether any number is greater than 7 (use <code>any</code>)' },
      hint: { zh: 'all(n % 2 == 0 for n in nums) 和 any(n > 7 for n in nums)。', en: 'all(n % 2 == 0 for n in nums) and any(n > 7 for n in nums).' },
      starter: { zh: 'nums = [2, 4, 6, 8, 10]\n', en: 'nums = [2, 4, 6, 8, 10]\n' },
      answer: 'nums = [2, 4, 6, 8, 10]\nprint(all(n % 2 == 0 for n in nums))\nprint(any(n > 7 for n in nums))\n',
      expectedOutput: 'True\nTrue\n', testInputs: [],
    },

    /* ══════════════════ 综合挑战 · COMPREHENSIVE CHALLENGES ══════════════════ */

    {
      id: 59, section: 'final',
      chapter: { zh: '综合挑战', en: 'Comprehensive Challenges' },
      title: { zh: '凯撒密码：加密与解密', en: 'Caesar Cipher: Encrypt & Decrypt' },
      difficulty: { zh: '综合', en: 'Comprehensive' }, chapterRef: 'python-tute-3',
      intro: {
        zh: `<p class="lead"><strong>凯撒密码</strong>是历史上最古老的加密方式之一，相传由古罗马统帅凯撒用于军事通信。它的原理极其简单：把每个字母在字母表中向后移动固定位数（位移量），解密时向前移回来。</p>
<p>例如位移量为 3：A→D，B→E，…，Z→C（到达末尾后回绕）。"Hello" 加密后变成 "Khoor"。</p>
<p><strong>在 Python 中实现的关键</strong>：<code>ord(c)</code> 把字符转成 ASCII 数字，<code>chr(n)</code> 把数字转回字符，取余 <code>% 26</code> 实现回绕：</p>
<pre><code>base = ord('A') if c.isupper() else ord('a')
new_c = chr((ord(c) - base + shift) % 26 + base)
# 大小写分开处理，保证各自在 A-Z / a-z 范围内回绕</code></pre>
<p><strong>需要处理的细节</strong>：</p>
<ul>
<li>大写字母和小写字母分别回绕（A-Z 和 a-z 是独立区间）</li>
<li>空格、标点、数字等非字母字符<strong>原样保留</strong>，不加密</li>
<li>解密 = 加密时位移取 <code>26 - shift</code>（也可以直接传负的 shift，Python 的 % 对负数也能正确处理）</li>
</ul>
<p>实现完成后用 3 条消息做完整的 加密 → 解密 → 验证 测试。</p>`,
        en: `<p class="lead">The <strong>Caesar cipher</strong> is one of the oldest known encryption techniques, reportedly used by Julius Caesar for military communications. The idea is simple: shift every letter forward by a fixed number of positions in the alphabet, and reverse the shift to decrypt.</p>
<p>For example, with a shift of 3: A→D, B→E, …, Z→C (wrapping at the end). "Hello" becomes "Khoor".</p>
<p><strong>The Python key</strong>: <code>ord(c)</code> converts a character to its ASCII number, <code>chr(n)</code> converts back, and <code>% 26</code> handles the wraparound:</p>
<pre><code>base = ord('A') if c.isupper() else ord('a')
new_c = chr((ord(c) - base + shift) % 26 + base)
# handle uppercase and lowercase separately so each wraps within its own A-Z / a-z range</code></pre>
<p><strong>Details to get right</strong>:</p>
<ul>
<li>Uppercase and lowercase letters wrap independently (A-Z and a-z are separate ranges)</li>
<li>Spaces, punctuation, digits, and other non-letter characters must <strong>pass through unchanged</strong></li>
<li>Decryption = encryption with shift replaced by <code>26 - shift</code> (or negative shift — Python's % works correctly on negatives)</li>
</ul>
<p>Once implemented, run a full encrypt → decrypt → verify test on 3 messages.</p>`,
      },
      task: {
        zh: '实现 <code>caesar_encrypt(text, shift)</code> 和 <code>caesar_decrypt(text, shift)</code>。用 shift=7 测试三条消息，每条消息输出两行：<code>原文 -> 密文 -> 解密文</code> 和 <code>OK</code> 或 <code>FAIL</code>。',
        en: 'Implement <code>caesar_encrypt(text, shift)</code> and <code>caesar_decrypt(text, shift)</code>. Test three messages with shift=7; for each print two lines: <code>original -> cipher -> decrypted</code> and <code>OK</code> or <code>FAIL</code>.',
      },
      hint: { zh: 'base = ord("A") if c.isupper() else ord("a")；解密 shift 换成 26-shift。', en: 'base = ord("A") if c.isupper() else ord("a"); for decryption use 26-shift.' },
      starter: {
        zh: 'def caesar_encrypt(text, shift):\n    # 对每个字母移位，非字母原样保留\n    pass\n\ndef caesar_decrypt(text, shift):\n    # 反向移位\n    pass\n\nshift = 7\ncases = ["Hello, World!", "The Quick Brown Fox", "AaBbZz"]\nfor msg in cases:\n    enc = caesar_encrypt(msg, shift)\n    dec = caesar_decrypt(enc, shift)\n    print(f"{msg} -> {enc} -> {dec}")\n    print("OK" if dec == msg else "FAIL")\n',
        en: 'def caesar_encrypt(text, shift):\n    # shift each letter, pass non-letters unchanged\n    pass\n\ndef caesar_decrypt(text, shift):\n    # reverse the shift\n    pass\n\nshift = 7\ncases = ["Hello, World!", "The Quick Brown Fox", "AaBbZz"]\nfor msg in cases:\n    enc = caesar_encrypt(msg, shift)\n    dec = caesar_decrypt(enc, shift)\n    print(f"{msg} -> {enc} -> {dec}")\n    print("OK" if dec == msg else "FAIL")\n',
      },
      answer: 'def caesar_encrypt(text, shift):\n    result = []\n    for c in text:\n        if c.isalpha():\n            base = ord("A") if c.isupper() else ord("a")\n            result.append(chr((ord(c) - base + shift) % 26 + base))\n        else:\n            result.append(c)\n    return "".join(result)\n\ndef caesar_decrypt(text, shift):\n    return caesar_encrypt(text, 26 - shift)\n\nshift = 7\ncases = ["Hello, World!", "The Quick Brown Fox", "AaBbZz"]\nfor msg in cases:\n    enc = caesar_encrypt(msg, shift)\n    dec = caesar_decrypt(enc, shift)\n    print(f"{msg} -> {enc} -> {dec}")\n    print("OK" if dec == msg else "FAIL")\n',
      expectedOutput: 'Hello, World! -> Olssv, Dvysk! -> Hello, World!\nOK\nThe Quick Brown Fox -> Aol Xbpjr Iyvdu Mve -> The Quick Brown Fox\nOK\nAaBbZz -> HhIiGg -> AaBbZz\nOK\n',
      testInputs: [],
    },

    {
      id: 60, section: 'final',
      chapter: { zh: '综合挑战', en: 'Comprehensive Challenges' },
      title: { zh: '矩阵乘法', en: 'Matrix Multiplication' },
      difficulty: { zh: '综合', en: 'Comprehensive' }, chapterRef: 'python-tute-3',
      intro: {
        zh: `<p class="lead"><strong>矩阵乘法</strong>是线性代数的核心运算，广泛应用于计算机图形学（旋转、缩放变换）、机器学习（神经网络的前向传播）和科学计算。</p>
<p>两个 n×n 矩阵 A 和 B 相乘，结果矩阵 C 的每个元素定义为：</p>
<pre><code>C[i][j] = A[i][0]×B[0][j] + A[i][1]×B[1][j] + ... + A[i][n-1]×B[n-1][j]
        = Σ A[i][k] × B[k][j]  （k 从 0 到 n-1）</code></pre>
<p>换句话说：<strong>C 的第 i 行第 j 列 = A 的第 i 行与 B 的第 j 列对应元素的乘积之和</strong>。实现需要三重循环：外两层枚举 i 和 j（结果矩阵的位置），内层 k 做求和。</p>
<p>本题要实现两个函数：</p>
<ul>
<li><code>mat_mul(A, B)</code>：三重循环计算乘积，返回结果矩阵</li>
<li><code>print_matrix(M, label)</code>：带标题逐行打印矩阵</li>
</ul>
<p>结果矩阵初始化为全零：<code>[[0]*n for _ in range(n)]</code>，然后对每个位置累加 n 项乘积。</p>`,
        en: `<p class="lead"><strong>Matrix multiplication</strong> is a core operation in linear algebra, used everywhere: in computer graphics (rotation and scaling transforms), machine learning (the forward pass of neural networks), and scientific computing.</p>
<p>For two n×n matrices A and B, each element of the result matrix C is defined as:</p>
<pre><code>C[i][j] = A[i][0]×B[0][j] + A[i][1]×B[1][j] + ... + A[i][n-1]×B[n-1][j]
        = Σ A[i][k] × B[k][j]  (k from 0 to n-1)</code></pre>
<p>In plain language: <strong>C's element at row i, column j = the dot product of A's i-th row and B's j-th column</strong>. Implementation needs three nested loops: the outer two pick i and j (the result cell), the inner k accumulates the sum.</p>
<p>You need to implement two functions:</p>
<ul>
<li><code>mat_mul(A, B)</code>: triple-loop calculation, return the result matrix</li>
<li><code>print_matrix(M, label)</code>: print the matrix row by row with a title</li>
</ul>
<p>Initialise the result as all zeros with <code>[[0]*n for _ in range(n)]</code>, then accumulate n products into each cell.</p>`,
      },
      task: { zh: '实现 <code>mat_mul(A, B)</code> 和 <code>print_matrix(M, label)</code>，对给定的两个 3×3 矩阵计算并打印乘积。', en: 'Implement <code>mat_mul(A, B)</code> and <code>print_matrix(M, label)</code>; compute and display the product of the two given 3×3 matrices.' },
      hint: { zh: 'result = [[0]*n for _ in range(n)] 初始化全零矩阵；三重循环累加。', en: 'result = [[0]*n for _ in range(n)] for the zero matrix; triple-loop to accumulate.' },
      starter: { zh: 'def mat_mul(A, B):\n    n = len(A)\n    # 初始化结果矩阵，三重循环\n    pass\n\ndef print_matrix(M, label):\n    print(f"=== {label} ===")\n    # 逐行打印\n    pass\n\nA = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\nB = [[9, 8, 7], [6, 5, 4], [3, 2, 1]]\nC = mat_mul(A, B)\nprint_matrix(A, "A")\nprint_matrix(B, "B")\nprint_matrix(C, "A x B")\n', en: 'def mat_mul(A, B):\n    n = len(A)\n    # initialise result, triple loop\n    pass\n\ndef print_matrix(M, label):\n    print(f"=== {label} ===")\n    # print each row\n    pass\n\nA = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\nB = [[9, 8, 7], [6, 5, 4], [3, 2, 1]]\nC = mat_mul(A, B)\nprint_matrix(A, "A")\nprint_matrix(B, "B")\nprint_matrix(C, "A x B")\n' },
      answer: 'def mat_mul(A, B):\n    n = len(A)\n    result = [[0] * n for _ in range(n)]\n    for i in range(n):\n        for j in range(n):\n            for k in range(n):\n                result[i][j] += A[i][k] * B[k][j]\n    return result\n\ndef print_matrix(M, label):\n    print(f"=== {label} ===")\n    for row in M:\n        print(row)\n\nA = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\nB = [[9, 8, 7], [6, 5, 4], [3, 2, 1]]\nC = mat_mul(A, B)\nprint_matrix(A, "A")\nprint_matrix(B, "B")\nprint_matrix(C, "A x B")\n',
      expectedOutput: '=== A ===\n[1, 2, 3]\n[4, 5, 6]\n[7, 8, 9]\n=== B ===\n[9, 8, 7]\n[6, 5, 4]\n[3, 2, 1]\n=== A x B ===\n[30, 24, 18]\n[84, 69, 54]\n[138, 114, 90]\n',
      testInputs: [],
    },

    {
      id: 61, section: 'final',
      chapter: { zh: '综合挑战', en: 'Comprehensive Challenges' },
      title: { zh: '归并排序', en: 'Merge Sort' },
      difficulty: { zh: '综合', en: 'Comprehensive' }, chapterRef: 'python-tute-3',
      intro: {
        zh: `<p class="lead"><strong>归并排序</strong>是计算机科学中最经典的排序算法之一，时间复杂度 O(n log n)，比冒泡排序和插入排序的 O(n²) 快得多，适合处理大规模数据。</p>
<p>算法思路——分治（Divide & Conquer）：</p>
<ol>
<li><strong>分（Divide）</strong>：把列表从中间一分为二</li>
<li><strong>治（Conquer）</strong>：对左半和右半分别递归排序</li>
<li><strong>合（Merge）</strong>：把两个已排好序的子列合并成一个有序列表</li>
</ol>
<p>合并步骤用<strong>双指针</strong>：两个指针分别指向左右子列的当前位置，每次把较小的元素取出放入结果，直到某一侧耗尽，再把另一侧剩余部分全部追加：</p>
<pre><code>i, j = 0, 0
while i < len(left) and j < len(right):
    if left[i] <= right[j]: result.append(left[i]); i += 1
    else:                    result.append(right[j]); j += 1
result.extend(left[i:])   # 左侧剩余
result.extend(right[j:])  # 右侧剩余</code></pre>
<p>基本情况：列表长度 ≤ 1，本身就是有序的，直接返回副本。本题需要正确处理空列表和单元素列表。</p>`,
        en: `<p class="lead"><strong>Merge sort</strong> is one of the most famous sorting algorithms in computer science, with O(n log n) time complexity — much faster than bubble or insertion sort's O(n²) on large data.</p>
<p>The approach is <strong>divide and conquer</strong>:</p>
<ol>
<li><strong>Divide</strong>: split the list in half</li>
<li><strong>Conquer</strong>: recursively sort the left and right halves</li>
<li><strong>Merge</strong>: combine the two sorted halves into one sorted list</li>
</ol>
<p>The merge step uses <strong>two pointers</strong>: one pointer per half, always picking the smaller current element, until one side is exhausted — then append the remainder of the other:</p>
<pre><code>i, j = 0, 0
while i < len(left) and j < len(right):
    if left[i] <= right[j]: result.append(left[i]); i += 1
    else:                    result.append(right[j]); j += 1
result.extend(left[i:])   # remaining left
result.extend(right[j:])  # remaining right</code></pre>
<p>Base case: a list of length ≤ 1 is already sorted — return a copy directly. The function must handle both empty lists and single-element lists correctly.</p>`,
      },
      task: { zh: '实现 <code>merge(left, right)</code> 和 <code>merge_sort(lst)</code>，对 5 组测试数据排序并输出 <code>原始 -> 排序后</code>。', en: 'Implement <code>merge(left, right)</code> and <code>merge_sort(lst)</code>; sort 5 test datasets and print <code>original -> sorted</code> for each.' },
      hint: { zh: 'merge: i=j=0 双指针；left[i]<=right[j] 则取 left[i]，否则取 right[j]；循环后 extend 剩余。', en: 'merge: two pointers i=j=0; if left[i]<=right[j] take left[i], else take right[j]; extend with the remainder.' },
      starter: { zh: 'def merge(left, right):\n    result = []\n    i = j = 0\n    # 双指针合并\n    # 补上剩余\n    return result\n\ndef merge_sort(lst):\n    if len(lst) <= 1:\n        return lst[:]\n    mid = len(lst) // 2\n    # 递归 + 合并\n    pass\n\ndatasets = [\n    [38, 27, 43, 3, 9, 82, 10],\n    [5, 4, 3, 2, 1],\n    [1],\n    [],\n    [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5],\n]\nfor data in datasets:\n    print(f"{data} -> {merge_sort(data)}")\n', en: 'def merge(left, right):\n    result = []\n    i = j = 0\n    # two-pointer merge\n    # append remainder\n    return result\n\ndef merge_sort(lst):\n    if len(lst) <= 1:\n        return lst[:]\n    mid = len(lst) // 2\n    # recurse + merge\n    pass\n\ndatasets = [\n    [38, 27, 43, 3, 9, 82, 10],\n    [5, 4, 3, 2, 1],\n    [1],\n    [],\n    [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5],\n]\nfor data in datasets:\n    print(f"{data} -> {merge_sort(data)}")\n' },
      answer: 'def merge(left, right):\n    result = []\n    i = j = 0\n    while i < len(left) and j < len(right):\n        if left[i] <= right[j]:\n            result.append(left[i])\n            i += 1\n        else:\n            result.append(right[j])\n            j += 1\n    result.extend(left[i:])\n    result.extend(right[j:])\n    return result\n\ndef merge_sort(lst):\n    if len(lst) <= 1:\n        return lst[:]\n    mid = len(lst) // 2\n    return merge(merge_sort(lst[:mid]), merge_sort(lst[mid:]))\n\ndatasets = [\n    [38, 27, 43, 3, 9, 82, 10],\n    [5, 4, 3, 2, 1],\n    [1],\n    [],\n    [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5],\n]\nfor data in datasets:\n    print(f"{data} -> {merge_sort(data)}")\n',
      expectedOutput: '[38, 27, 43, 3, 9, 82, 10] -> [3, 9, 10, 27, 38, 43, 82]\n[5, 4, 3, 2, 1] -> [1, 2, 3, 4, 5]\n[1] -> [1]\n[] -> []\n[3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5] -> [1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]\n',
      testInputs: [],
    },

    {
      id: 62, section: 'final',
      chapter: { zh: '综合挑战', en: 'Comprehensive Challenges' },
      title: { zh: '二分查找 + 异常处理', en: 'Binary Search + Exception Handling' },
      difficulty: { zh: '综合', en: 'Comprehensive' }, chapterRef: 'python-tute-3',
      intro: {
        zh: `<p class="lead"><strong>二分查找</strong>（Binary Search）是在<strong>有序列表</strong>中查找目标值的高效算法。每次比较都能把搜索范围<strong>减半</strong>，因此时间复杂度为 O(log n)——在一百万个元素中最多只需 20 次比较，而线性查找最坏需要一百万次。</p>
<p>算法逻辑：</p>
<ol>
<li>维护左右边界 <code>left</code> 和 <code>right</code>，初始覆盖整个列表</li>
<li>每次取中间位置 <code>mid = (left + right) // 2</code></li>
<li>如果 <code>lst[mid] == target</code>，找到了，返回索引</li>
<li>如果 <code>lst[mid] < target</code>，目标在右半，<code>left = mid + 1</code></li>
<li>如果 <code>lst[mid] > target</code>，目标在左半，<code>right = mid - 1</code></li>
<li>当 <code>left > right</code> 时，搜索空间已耗尽，目标不存在</li>
</ol>
<p><strong>前提条件</strong>：列表必须是有序的！对无序列表直接用二分查找会得到错误结果。</p>
<p>本题要求：找不到时 <code>raise ValueError</code>，调用方用 <code>try/except</code> 捕获并格式化输出，体现"异常作为控制流"的设计思路。</p>`,
        en: `<p class="lead"><strong>Binary search</strong> is an efficient algorithm for finding a target in a <strong>sorted</strong> list. Each comparison <strong>halves</strong> the search range, giving O(log n) time — at most 20 comparisons in a million elements, versus up to a million for a linear scan.</p>
<p>The algorithm:</p>
<ol>
<li>Maintain <code>left</code> and <code>right</code> boundaries, initially covering the whole list</li>
<li>At each step compute <code>mid = (left + right) // 2</code></li>
<li>If <code>lst[mid] == target</code>: found, return the index</li>
<li>If <code>lst[mid] < target</code>: target is in the right half, set <code>left = mid + 1</code></li>
<li>If <code>lst[mid] > target</code>: target is in the left half, set <code>right = mid - 1</code></li>
<li>When <code>left > right</code>: the search space is empty, the target does not exist</li>
</ol>
<p><strong>Prerequisite</strong>: the list must be sorted. Running binary search on an unsorted list produces incorrect results.</p>
<p>This problem requires: <code>raise ValueError</code> when not found, and the caller uses <code>try/except</code> to format the output — demonstrating "exception as control flow."</p>`,
      },
      task: { zh: '实现 <code>binary_search(lst, target)</code>，找不到时 raise ValueError；对 6 个查询值调用，用 try/except 格式化输出结果。', en: 'Implement <code>binary_search(lst, target)</code> raising ValueError when not found; call it for 6 query values using try/except to format the output.' },
      hint: { zh: '循环内 left <= right；找不到时 raise ValueError(f"{target} not found")。', en: 'Loop while left <= right; raise ValueError(f"{target} not found") when exhausted.' },
      starter: { zh: 'def binary_search(lst, target):\n    # 二分查找，找不到 raise ValueError\n    pass\n\ndata = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]\nfor q in [7, 1, 19, 13, 6, 20]:\n    try:\n        print(f"Found {q} at index {binary_search(data, q)}")\n    except ValueError as e:\n        print(f"Error: {e}")\n', en: 'def binary_search(lst, target):\n    # binary search, raise ValueError when not found\n    pass\n\ndata = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]\nfor q in [7, 1, 19, 13, 6, 20]:\n    try:\n        print(f"Found {q} at index {binary_search(data, q)}")\n    except ValueError as e:\n        print(f"Error: {e}")\n' },
      answer: 'def binary_search(lst, target):\n    left, right = 0, len(lst) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if lst[mid] == target:\n            return mid\n        elif lst[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    raise ValueError(f"{target} not found")\n\ndata = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]\nfor q in [7, 1, 19, 13, 6, 20]:\n    try:\n        print(f"Found {q} at index {binary_search(data, q)}")\n    except ValueError as e:\n        print(f"Error: {e}")\n',
      expectedOutput: 'Found 7 at index 3\nFound 1 at index 0\nFound 19 at index 9\nFound 13 at index 6\nError: 6 not found\nError: 20 not found\n',
      testInputs: [],
    },

    {
      id: 63, section: 'final',
      chapter: { zh: '综合挑战', en: 'Comprehensive Challenges' },
      title: { zh: '字谜', en: 'Anagrams' },
      difficulty: { zh: '综合', en: 'Comprehensive' }, chapterRef: 'python-tute-3',
      intro: {
        zh: `<p class="lead"><strong>字谜</strong>（Anagram）是指使用相同字母、顺序不同的单词，例如 "eat"、"tea"、"ate" 三个词用的都是 e、a、t 这三个字母。这道题要求把一组单词中的字谜归到同一组。</p>
<p>这是软件面试中出现频率极高的经典题目，核心思路：<strong>同一组字谜，把字母排序后必定相同</strong>——可以用"排序后的字母串"作为字典的键：</p>
<pre><code>"eat"  → sorted → ['a','e','t'] → join → "aet"  ← 键
"tea"  → sorted → ['a','e','t'] → join → "aet"  ← 同一键
"tan"  → sorted → ['a','n','t'] → join → "ant"  ← 不同键</code></pre>
<p>遍历所有单词，把每个词追加到对应键的分组列表里，最终字典的每个值就是一组字谜。</p>
<p>需要注意的细节：</p>
<ul>
<li>先 <code>.lower()</code> 再排序，保证大小写不影响分组（本题词表全为小写，但好习惯）</li>
<li>最终输出需要对结果双重排序：每组内部按字母序排列，所有组之间也按字母序排列</li>
</ul>`,
        en: `<p class="lead"><strong>Anagrams</strong> are words made from the same letters in different orders — for example "eat", "tea", and "ate" all use exactly the letters e, a, t. This problem groups a list of words so that all anagrams of each other end up in the same bucket.</p>
<p>This is a very common technical interview question. The key insight: <strong>anagrams always produce the same string when you sort their letters</strong> — use that sorted string as a dictionary key:</p>
<pre><code>"eat"  → sorted → ['a','e','t'] → join → "aet"  ← key
"tea"  → sorted → ['a','e','t'] → join → "aet"  ← same key
"tan"  → sorted → ['a','n','t'] → join → "ant"  ← different key</code></pre>
<p>Iterate over all words, appending each to the list for its key. At the end, each dictionary value is one anagram group.</p>
<p>Details to handle:</p>
<ul>
<li><code>.lower()</code> before sorting ensures case doesn't split groups (the word list here is all lowercase, but it's good practice)</li>
<li>The output needs two levels of sorting: sort words within each group alphabetically, and sort the groups themselves alphabetically</li>
</ul>`,
      },
      task: { zh: '实现 <code>group_anagrams(words)</code>，返回分好组并排好序的列表；对给定词表输出每组，格式 <code>Group N: [...]</code>。', en: 'Implement <code>group_anagrams(words)</code> returning sorted groups; print each group in the format <code>Group N: [...]</code>.' },
      hint: { zh: 'key = "".join(sorted(word.lower()))；最终 return [sorted(g) for g in sorted(groups.values())]。', en: 'key = "".join(sorted(word.lower())); finally return [sorted(g) for g in sorted(groups.values())].' },
      starter: { zh: 'def group_anagrams(words):\n    groups = {}\n    for word in words:\n        # 计算规范键，添加到对应组\n        pass\n    # 返回排好序的分组列表\n    pass\n\nwords = ["eat", "tea", "tan", "ate", "nat", "bat", "listen", "silent", "enlist"]\nfor i, group in enumerate(group_anagrams(words), 1):\n    print(f"Group {i}: {group}")\n', en: 'def group_anagrams(words):\n    groups = {}\n    for word in words:\n        # compute canonical key, add to the right group\n        pass\n    # return sorted list of sorted groups\n    pass\n\nwords = ["eat", "tea", "tan", "ate", "nat", "bat", "listen", "silent", "enlist"]\nfor i, group in enumerate(group_anagrams(words), 1):\n    print(f"Group {i}: {group}")\n' },
      answer: 'def group_anagrams(words):\n    groups = {}\n    for word in words:\n        key = "".join(sorted(word.lower()))\n        if key not in groups:\n            groups[key] = []\n        groups[key].append(word)\n    return [sorted(g) for g in sorted(groups.values())]\n\nwords = ["eat", "tea", "tan", "ate", "nat", "bat", "listen", "silent", "enlist"]\nfor i, group in enumerate(group_anagrams(words), 1):\n    print(f"Group {i}: {group}")\n',
      expectedOutput: "Group 1: ['ate', 'eat', 'tea']\nGroup 2: ['bat']\nGroup 3: ['enlist', 'listen', 'silent']\nGroup 4: ['nat', 'tan']\n",
      testInputs: [],
    },

    /* ══════════════════ Boss关 · BOSS LEVELS ══════════════════ */

    {
      id: 64, section: 'final',
      chapter: { zh: 'Boss关', en: 'Boss Level' },
      title: { zh: 'Sudoku 验证器', en: 'Sudoku Validator' },
      difficulty: { zh: 'Boss', en: 'Boss' }, chapterRef: 'python-tute-3',
      intro: {
        zh: `<p class="lead"><strong>数独</strong>是一个 9×9 的填数字游戏：每一行、每一列、以及每个 3×3 的宫格中，数字 1-9 各出现恰好一次。本题不是解数独，而是<strong>验证一个已填写的盘面是否合法</strong>（0 代表空格，跳过不检查）。</p>
<p>验证需要检查三类区域，共 27 个：</p>
<ul>
<li><strong>9 行</strong>：直接用 <code>grid[i]</code></li>
<li><strong>9 列</strong>：第 j 列 = <code>[grid[r][j] for r in range(9)]</code></li>
<li><strong>9 个 3×3 宫格</strong>：左上角在 <code>(br*3, bc*3)</code>，br 和 bc 各从 0 到 2</li>
</ul>
<p>判断一组数字是否有重复：过滤掉 0 后，看元素个数是否等于去重后的个数（集合的大小）。</p>
<p>本题需要实现 5 个函数，共同完成验证和打印任务：</p>
<ul>
<li><code>has_duplicates(nums)</code>：判断是否含重复非零数字</li>
<li><code>get_cols(grid)</code>：提取 9 列，返回列表的列表</li>
<li><code>get_boxes(grid)</code>：提取 9 个宫格（含宫格坐标，用于错误提示）</li>
<li><code>validate(grid)</code>：调用上面三个，汇总错误信息列表</li>
<li><code>print_grid(grid)</code>：美观打印盘面，0 显示为 <code>.</code>，在第 3 和第 6 行/列后加分隔线</li>
</ul>`,
        en: `<p class="lead"><strong>Sudoku</strong> is a 9×9 number puzzle where each row, column, and 3×3 box must contain each digit 1-9 exactly once. This problem doesn't solve a Sudoku — it <strong>validates whether a filled grid is legal</strong> (0 = empty cell, skipped in checks).</p>
<p>Validation checks three types of regions, 27 total:</p>
<ul>
<li><strong>9 rows</strong>: directly use <code>grid[i]</code></li>
<li><strong>9 columns</strong>: column j = <code>[grid[r][j] for r in range(9)]</code></li>
<li><strong>9 boxes (3×3)</strong>: top-left corner at <code>(br*3, bc*3)</code>, with br and bc each from 0 to 2</li>
</ul>
<p>Checking for duplicates: filter out zeros, then compare the element count to the unique count (set size).</p>
<p>The problem requires 5 functions working together:</p>
<ul>
<li><code>has_duplicates(nums)</code>: detect duplicate non-zero values</li>
<li><code>get_cols(grid)</code>: extract all 9 columns as a list of lists</li>
<li><code>get_boxes(grid)</code>: extract all 9 boxes (with coordinates for error messages)</li>
<li><code>validate(grid)</code>: call the above three and collect all error messages</li>
<li><code>print_grid(grid)</code>: pretty-print with dots for zeros and dividers after rows/cols 3 and 6</li>
</ul>`,
      },
      task: { zh: '实现上述所有函数，打印盘面，再输出验证结果。没有冲突输出 <code>Valid: no conflicts found.</code>。', en: 'Implement all functions above, print the grid, then print the validation result. No conflicts → <code>Valid: no conflicts found.</code>' },
      hint: { zh: 'get_boxes：外层 br in range(3)，内层 bc in range(3)，最内层推导式提取 3×3 块。', en: 'get_boxes: outer br in range(3), inner bc in range(3), innermost comprehension to extract the 3×3 block.' },
      starter: { zh: 'GRID = [\n    [5,3,0,0,7,0,0,0,0],\n    [6,0,0,1,9,5,0,0,0],\n    [0,9,8,0,0,0,0,6,0],\n    [8,0,0,0,6,0,0,0,3],\n    [4,0,0,8,0,3,0,0,1],\n    [7,0,0,0,2,0,0,0,6],\n    [0,6,0,0,0,0,2,8,0],\n    [0,0,0,4,1,9,0,0,5],\n    [0,0,0,0,8,0,0,7,9],\n]\n\ndef has_duplicates(nums): pass\ndef get_cols(grid): pass\ndef get_boxes(grid): pass\ndef validate(grid):\n    errors = []\n    return errors\ndef print_grid(grid): pass\n\nprint_grid(GRID)\nprint()\nerrors = validate(GRID)\nif errors:\n    for e in errors: print(f"ERROR: {e}")\nelse:\n    print("Valid: no conflicts found.")\n', en: 'GRID = [\n    [5,3,0,0,7,0,0,0,0],\n    [6,0,0,1,9,5,0,0,0],\n    [0,9,8,0,0,0,0,6,0],\n    [8,0,0,0,6,0,0,0,3],\n    [4,0,0,8,0,3,0,0,1],\n    [7,0,0,0,2,0,0,0,6],\n    [0,6,0,0,0,0,2,8,0],\n    [0,0,0,4,1,9,0,0,5],\n    [0,0,0,0,8,0,0,7,9],\n]\n\ndef has_duplicates(nums): pass\ndef get_cols(grid): pass\ndef get_boxes(grid): pass\ndef validate(grid):\n    errors = []\n    return errors\ndef print_grid(grid): pass\n\nprint_grid(GRID)\nprint()\nerrors = validate(GRID)\nif errors:\n    for e in errors: print(f"ERROR: {e}")\nelse:\n    print("Valid: no conflicts found.")\n' },
      answer: 'GRID = [\n    [5,3,0,0,7,0,0,0,0],\n    [6,0,0,1,9,5,0,0,0],\n    [0,9,8,0,0,0,0,6,0],\n    [8,0,0,0,6,0,0,0,3],\n    [4,0,0,8,0,3,0,0,1],\n    [7,0,0,0,2,0,0,0,6],\n    [0,6,0,0,0,0,2,8,0],\n    [0,0,0,4,1,9,0,0,5],\n    [0,0,0,0,8,0,0,7,9],\n]\n\ndef has_duplicates(nums):\n    filled = [n for n in nums if n != 0]\n    return len(filled) != len(set(filled))\n\ndef get_cols(grid):\n    return [[grid[r][c] for r in range(9)] for c in range(9)]\n\ndef get_boxes(grid):\n    boxes = []\n    for br in range(3):\n        for bc in range(3):\n            box = [grid[br*3+r][bc*3+c] for r in range(3) for c in range(3)]\n            boxes.append((br+1, bc+1, box))\n    return boxes\n\ndef validate(grid):\n    errors = []\n    for i, row in enumerate(grid):\n        if has_duplicates(row):\n            errors.append(f"Row {i+1} has duplicates")\n    for j, col in enumerate(get_cols(grid)):\n        if has_duplicates(col):\n            errors.append(f"Col {j+1} has duplicates")\n    for br, bc, box in get_boxes(grid):\n        if has_duplicates(box):\n            errors.append(f"Box ({br},{bc}) has duplicates")\n    return errors\n\ndef print_grid(grid):\n    for i, row in enumerate(grid):\n        if i in (3, 6):\n            print("------+-------+------")\n        parts = []\n        for j, v in enumerate(row):\n            if j in (3, 6):\n                parts.append("|")\n            parts.append(str(v) if v else ".")\n        print(" ".join(parts))\n\nprint_grid(GRID)\nprint()\nerrors = validate(GRID)\nif errors:\n    for e in errors: print(f"ERROR: {e}")\nelse:\n    print("Valid: no conflicts found.")\n',
      expectedOutput: '5 3 . | . 7 . | . . .\n6 . . | 1 9 5 | . . .\n. 9 8 | . . . | . 6 .\n------+-------+------\n8 . . | . 6 . | . . 3\n4 . . | 8 . 3 | . . 1\n7 . . | . 2 . | . . 6\n------+-------+------\n. 6 . | . . . | 2 8 .\n. . . | 4 1 9 | . . 5\n. . . | . 8 . | . 7 9\n\nValid: no conflicts found.\n',
      testInputs: [],
    },

    {
      id: 65, section: 'final',
      chapter: { zh: 'Boss关', en: 'Boss Level' },
      title: { zh: '图书馆管理系统', en: 'Library Management System' },
      difficulty: { zh: 'Boss', en: 'Boss' }, chapterRef: 'python-tute-3',
      intro: {
        zh: `<p class="lead">这是一道综合性系统设计题，模拟真实世界的<strong>图书馆管理系统</strong>。你需要设计数据结构并实现增删查改操作——这与实际开发中的后端 CRUD 系统逻辑完全一致。</p>
<p><strong>数据设计</strong>：用全局字典 <code>library</code> 存储所有书籍，以<strong>书名小写</strong>作为键（保证不区分大小写地查找），每本书的值是一个字典：</p>
<pre><code>{"title": "Dune", "author": "Herbert", "year": 1965, "copies": 5, "out": 2}
# copies = 总副本数，out = 当前借出数，available = copies - out</code></pre>
<p>需要实现 5 个函数：</p>
<ul>
<li><code>add_book(title, author, year, copies)</code>：书不存在则新增，已存在则增加库存</li>
<li><code>checkout(title)</code>：借出一本（<code>out += 1</code>）；若无可借副本（<code>available == 0</code>），raise <code>ValueError</code></li>
<li><code>return_book(title)</code>：归还一本（<code>out -= 1</code>）</li>
<li><code>search(query)</code>：按书名或作者做<strong>子串模糊匹配</strong>（<code>query.lower() in title.lower()</code>），结果按年份升序</li>
<li><code>report()</code>：已在 starter 中实现——按书名排序，打印可借数量及可视化进度条（<code>#</code> 表示可借，<code>.</code> 表示已借出）</li>
</ul>`,
        en: `<p class="lead">This is a comprehensive system design problem simulating a real-world <strong>library management system</strong>. You design the data structure and implement CRUD operations — the same logic that drives real backend systems.</p>
<p><strong>Data design</strong>: a global dict <code>library</code> keyed by <strong>lowercase title</strong> (for case-insensitive lookup), with each book's value being a dict:</p>
<pre><code>{"title": "Dune", "author": "Herbert", "year": 1965, "copies": 5, "out": 2}
# copies = total copies, out = currently checked out, available = copies - out</code></pre>
<p>You need to implement 5 functions:</p>
<ul>
<li><code>add_book(title, author, year, copies)</code>: create a new entry or increase stock if it already exists</li>
<li><code>checkout(title)</code>: lend one copy (<code>out += 1</code>); raise <code>ValueError</code> if no copies available (<code>available == 0</code>)</li>
<li><code>return_book(title)</code>: accept a return (<code>out -= 1</code>)</li>
<li><code>search(query)</code>: <strong>substring fuzzy match</strong> on title or author (<code>query.lower() in title.lower()</code>), sorted by year</li>
<li><code>report()</code>: already implemented in the starter — alphabetical listing with available count and a visual bar (<code>#</code> = available, <code>.</code> = checked out)</li>
</ul>`,
      },
      task: { zh: '实现所有函数并通过完整测试序列产生预期输出。try/except 必须用于捕获借出失败异常。', en: 'Implement all functions and produce the expected output from the complete test sequence. try/except is required to catch checkout failure.' },
      hint: { zh: 'library 字典每个值：{"title","author","year","copies","out"}；available = copies - out；bar = "[" + "#"*available + "."*out + "]"。', en: 'Each library entry: {"title","author","year","copies","out"}; available = copies - out; bar = "[" + "#"*available + "."*out + "]".' },
      starter: { zh: 'library = {}\n\ndef add_book(title, author, year, copies=1):\n    pass  # 返回 "Added \'X\'" 或 "Updated \'X\': N copies total"\n\ndef checkout(title):\n    pass  # 返回 "Checked out \'X\' (N left)"，无库存 raise ValueError\n\ndef return_book(title):\n    pass  # 返回 "Returned \'X\' (N left)"\n\ndef search(query):\n    pass  # 按书名/作者模糊搜索，年份升序\n\ndef report():\n    books = sorted(library.values(), key=lambda b: b["title"])\n    total = sum(b["copies"] for b in books)\n    out_total = sum(b["out"] for b in books)\n    print(f"=== Library Report ({len(books)} titles, {total} copies) ===")\n    for b in books:\n        avail = b["copies"] - b["out"]\n        bar = "[" + "#" * avail + "." * b["out"] + "]"\n        print(f"  {b[\'title\']} ({b[\'year\']}) by {b[\'author\']} — {avail}/{b[\'copies\']} {bar}")\n    print(f"  Checked out: {out_total}/{total}")\n\nprint(add_book("Dune", "Herbert", 1965, 3))\nprint(add_book("Foundation", "Asimov", 1951, 2))\nprint(add_book("Neuromancer", "Gibson", 1984, 1))\nprint(add_book("Dune", "Herbert", 1965, 2))\nprint()\nfor _ in range(5):\n    print(checkout("Dune"))\ntry:\n    print(checkout("Dune"))\nexcept ValueError as e:\n    print(f"Error: {e}")\nprint()\nprint(return_book("Dune"))\nprint()\nprint("Search \'asim\':")\nfor b in search("asim"):\n    print(f"  {b[\'title\']} by {b[\'author\']} ({b[\'year\']})")\nprint()\nreport()\n', en: 'library = {}\n\ndef add_book(title, author, year, copies=1):\n    pass  # return "Added \'X\'" or "Updated \'X\': N copies total"\n\ndef checkout(title):\n    pass  # return "Checked out \'X\' (N left)"; raise ValueError if none available\n\ndef return_book(title):\n    pass  # return "Returned \'X\' (N left)"\n\ndef search(query):\n    pass  # fuzzy search by title/author, sorted by year\n\ndef report():\n    books = sorted(library.values(), key=lambda b: b["title"])\n    total = sum(b["copies"] for b in books)\n    out_total = sum(b["out"] for b in books)\n    print(f"=== Library Report ({len(books)} titles, {total} copies) ===")\n    for b in books:\n        avail = b["copies"] - b["out"]\n        bar = "[" + "#" * avail + "." * b["out"] + "]"\n        print(f"  {b[\'title\']} ({b[\'year\']}) by {b[\'author\']} — {avail}/{b[\'copies\']} {bar}")\n    print(f"  Checked out: {out_total}/{total}")\n\nprint(add_book("Dune", "Herbert", 1965, 3))\nprint(add_book("Foundation", "Asimov", 1951, 2))\nprint(add_book("Neuromancer", "Gibson", 1984, 1))\nprint(add_book("Dune", "Herbert", 1965, 2))\nprint()\nfor _ in range(5):\n    print(checkout("Dune"))\ntry:\n    print(checkout("Dune"))\nexcept ValueError as e:\n    print(f"Error: {e}")\nprint()\nprint(return_book("Dune"))\nprint()\nprint("Search \'asim\':")\nfor b in search("asim"):\n    print(f"  {b[\'title\']} by {b[\'author\']} ({b[\'year\']})")\nprint()\nreport()\n' },
      answer: 'library = {}\n\ndef add_book(title, author, year, copies=1):\n    key = title.lower()\n    if key in library:\n        library[key]["copies"] += copies\n        return f"Updated \'{title}\': {library[key][\'copies\']} copies total"\n    library[key] = {"title": title, "author": author, "year": year,\n                    "copies": copies, "out": 0}\n    return f"Added \'{title}\'"\n\ndef checkout(title):\n    key = title.lower()\n    b = library.get(key)\n    if b is None:\n        raise ValueError(f"\'{title}\' not in library")\n    avail = b["copies"] - b["out"]\n    if avail == 0:\n        raise ValueError(f"No copies of \'{title}\' available")\n    b["out"] += 1\n    return f"Checked out \'{title}\' ({b[\'copies\'] - b[\'out\']} left)"\n\ndef return_book(title):\n    key = title.lower()\n    b = library.get(key)\n    if b is None or b["out"] == 0:\n        raise ValueError(f"No copies of \'{title}\' to return")\n    b["out"] -= 1\n    return f"Returned \'{title}\' ({b[\'copies\'] - b[\'out\']} left)"\n\ndef search(query):\n    q = query.lower()\n    results = [b for b in library.values()\n               if q in b["title"].lower() or q in b["author"].lower()]\n    return sorted(results, key=lambda b: b["year"])\n\ndef report():\n    books = sorted(library.values(), key=lambda b: b["title"])\n    total = sum(b["copies"] for b in books)\n    out_total = sum(b["out"] for b in books)\n    print(f"=== Library Report ({len(books)} titles, {total} copies) ===")\n    for b in books:\n        avail = b["copies"] - b["out"]\n        bar = "[" + "#" * avail + "." * b["out"] + "]"\n        print(f"  {b[\'title\']} ({b[\'year\']}) by {b[\'author\']} — {avail}/{b[\'copies\']} {bar}")\n    print(f"  Checked out: {out_total}/{total}")\n\nprint(add_book("Dune", "Herbert", 1965, 3))\nprint(add_book("Foundation", "Asimov", 1951, 2))\nprint(add_book("Neuromancer", "Gibson", 1984, 1))\nprint(add_book("Dune", "Herbert", 1965, 2))\nprint()\nfor _ in range(5):\n    print(checkout("Dune"))\ntry:\n    print(checkout("Dune"))\nexcept ValueError as e:\n    print(f"Error: {e}")\nprint()\nprint(return_book("Dune"))\nprint()\nprint("Search \'asim\':")\nfor b in search("asim"):\n    print(f"  {b[\'title\']} by {b[\'author\']} ({b[\'year\']})")\nprint()\nreport()\n',
      expectedOutput: "Added 'Dune'\nAdded 'Foundation'\nAdded 'Neuromancer'\nUpdated 'Dune': 5 copies total\n\nChecked out 'Dune' (4 left)\nChecked out 'Dune' (3 left)\nChecked out 'Dune' (2 left)\nChecked out 'Dune' (1 left)\nChecked out 'Dune' (0 left)\nError: No copies of 'Dune' available\n\nReturned 'Dune' (1 left)\n\nSearch 'asim':\n  Foundation by Asimov (1951)\n\n=== Library Report (3 titles, 8 copies) ===\n  Dune (1965) by Herbert — 1/5 [#....]\n  Foundation (1951) by Asimov — 2/2 [##]\n  Neuromancer (1984) by Gibson — 1/1 [#]\n  Checked out: 4/8\n",
      testInputs: [],
    },

    {
      id: 66, section: 'final',
      chapter: { zh: 'Boss关', en: 'Boss Level' },
      title: { zh: '维吉尼亚密码 + 频率分析', en: 'Vigenere Cipher + Frequency Analysis' },
      difficulty: { zh: 'Boss', en: 'Boss' }, chapterRef: 'python-tute-3',
      intro: {
        zh: `<p class="lead"><strong>维吉尼亚密码</strong>（Vigenère Cipher）是对凯撒密码的重大升级，16 世纪提出，曾被称为"无法破解的密码"。它不使用固定位移，而是用一个<strong>关键词</strong>循环控制每个字母的位移量：</p>
<pre><code>明文:  A t t a c k  a t  D a w n
关键词: K E Y K E Y  K E  Y K E Y
位移:  10 4 24 10 4 24 10 4 24 10 4 24</code></pre>
<p>关键词 "KEY" 中，K=10，E=4，Y=24（对应字母在字母表中的位置，从 0 计数）。关键词循环重复使用，直到覆盖所有字母。<strong>非字母字符原样保留，且不消耗关键词的位置计数</strong>。</p>
<p>实现要点：</p>
<ul>
<li>用独立计数器 <code>ki</code> 追踪关键词位置，<strong>只在遇到字母时</strong> <code>ki += 1</code>（空格标点不推进 ki）</li>
<li>位移量：<code>shift = ord(key[ki % len(key)].upper()) - ord('A')</code></li>
<li>关键词校验：空字符串或含非字母字符时 raise <code>ValueError</code></li>
</ul>
<p>本题还需要实现<strong>频率分析</strong>：统计密文中每个字母出现的次数和百分比，输出最高频的 Top-3。历史上，密码分析者正是通过分析密文字母频率来破解密码的。</p>`,
        en: `<p class="lead">The <strong>Vigenère cipher</strong> is a major upgrade on Caesar's cipher, proposed in the 16th century and once called "the indecipherable cipher." Instead of a fixed shift, it uses a <strong>keyword</strong> that cycles through shifts for each letter:</p>
<pre><code>plaintext: A t t a c k  a t  D a w n
keyword:   K E Y K E Y  K E  Y K E Y
shifts:    10 4 24 10 4 24 10 4 24 10 4 24</code></pre>
<p>In "KEY": K=10, E=4, Y=24 (zero-indexed positions in the alphabet). The keyword repeats cyclically. <strong>Non-letter characters pass through unchanged and do not advance the keyword position.</strong></p>
<p>Implementation notes:</p>
<ul>
<li>Use a separate counter <code>ki</code> to track the keyword position — <strong>only increment <code>ki</code> when the current character is a letter</strong> (spaces and punctuation don't advance it)</li>
<li>Shift amount: <code>shift = ord(key[ki % len(key)].upper()) - ord('A')</code></li>
<li>Validate the key: raise <code>ValueError</code> if it's empty or contains non-letter characters</li>
</ul>
<p>The problem also requires <strong>frequency analysis</strong>: count each letter's occurrences in the ciphertext and output the Top-3 by frequency. Historically, cryptanalysts cracked ciphers exactly this way.</p>`,
      },
      task: { zh: '实现 <code>vigenere_encrypt</code>、<code>vigenere_decrypt</code>、<code>freq_analysis</code>；用 key="KEY"、text="Attack at Dawn!" 运行，输出加密结果、验证信息和 Top-3 频率。', en: 'Implement <code>vigenere_encrypt</code>, <code>vigenere_decrypt</code>, <code>freq_analysis</code>; run with key="KEY" and text="Attack at Dawn!", print the encrypted result, verification, and Top-3 letter frequencies.' },
      hint: { zh: 'ki 只在 c.isalpha() 时递增；解密用 -shift（Python 的 % 对负数也正确工作）；freq_analysis 用 sorted(freq.items(), key=lambda x: (-x[1], x[0]))[:3]。', en: 'ki only increments when c.isalpha(); decryption uses -shift (Python % works correctly on negatives); freq_analysis uses sorted(freq.items(), key=lambda x: (-x[1], x[0]))[:3].' },
      starter: { zh: 'def vigenere_encrypt(text, key):\n    if not key or not key.isalpha():\n        raise ValueError(f"Invalid key: \'{key}\'")\n    key = key.upper()\n    result = []\n    ki = 0\n    for c in text:\n        if c.isalpha():\n            # 计算位移并加密\n            ki += 1\n        else:\n            result.append(c)\n    return "".join(result)\n\ndef vigenere_decrypt(text, key):\n    pass  # 与加密相同，但位移取反\n\ndef freq_analysis(text, top_n=3):\n    freq = {}\n    for c in text:\n        if c.isalpha():\n            lc = c.lower()\n            freq[lc] = freq.get(lc, 0) + 1\n    total = sum(freq.values())\n    ranked = sorted(freq.items(), key=lambda x: (-x[1], x[0]))[:top_n]\n    return [(ch, cnt, cnt / total * 100) for ch, cnt in ranked]\n\nkey = "KEY"\ntext = "Attack at Dawn!"\ntry:\n    enc = vigenere_encrypt(text, key)\n    dec = vigenere_decrypt(enc, key)\n    print("=== Encryption ===")\n    print(f"key      : {key}")\n    print(f"original : {text}")\n    print(f"encrypted: {enc}")\n    print(f"decrypted: {dec}")\n    print(f"verified : {dec == text}")\nexcept ValueError as e:\n    print(f"Error: {e}")\nprint()\nprint("=== Top-3 Cipher Letter Frequency ===")\nfor ch, cnt, pct in freq_analysis(enc):\n    print(f"  {ch}: {cnt} occurrences ({pct:.1f}%)")\n', en: 'def vigenere_encrypt(text, key):\n    if not key or not key.isalpha():\n        raise ValueError(f"Invalid key: \'{key}\'")\n    key = key.upper()\n    result = []\n    ki = 0\n    for c in text:\n        if c.isalpha():\n            # compute shift and encrypt\n            ki += 1\n        else:\n            result.append(c)\n    return "".join(result)\n\ndef vigenere_decrypt(text, key):\n    pass  # same as encrypt but negate the shift\n\ndef freq_analysis(text, top_n=3):\n    freq = {}\n    for c in text:\n        if c.isalpha():\n            lc = c.lower()\n            freq[lc] = freq.get(lc, 0) + 1\n    total = sum(freq.values())\n    ranked = sorted(freq.items(), key=lambda x: (-x[1], x[0]))[:top_n]\n    return [(ch, cnt, cnt / total * 100) for ch, cnt in ranked]\n\nkey = "KEY"\ntext = "Attack at Dawn!"\ntry:\n    enc = vigenere_encrypt(text, key)\n    dec = vigenere_decrypt(enc, key)\n    print("=== Encryption ===")\n    print(f"key      : {key}")\n    print(f"original : {text}")\n    print(f"encrypted: {enc}")\n    print(f"decrypted: {dec}")\n    print(f"verified : {dec == text}")\nexcept ValueError as e:\n    print(f"Error: {e}")\nprint()\nprint("=== Top-3 Cipher Letter Frequency ===")\nfor ch, cnt, pct in freq_analysis(enc):\n    print(f"  {ch}: {cnt} occurrences ({pct:.1f}%)")\n' },
      answer: 'def vigenere_encrypt(text, key):\n    if not key or not key.isalpha():\n        raise ValueError(f"Invalid key: \'{key}\'")\n    key = key.upper()\n    result = []\n    ki = 0\n    for c in text:\n        if c.isalpha():\n            shift = ord(key[ki % len(key)]) - ord("A")\n            base = ord("A") if c.isupper() else ord("a")\n            result.append(chr((ord(c) - base + shift) % 26 + base))\n            ki += 1\n        else:\n            result.append(c)\n    return "".join(result)\n\ndef vigenere_decrypt(text, key):\n    if not key or not key.isalpha():\n        raise ValueError(f"Invalid key: \'{key}\'")\n    key = key.upper()\n    result = []\n    ki = 0\n    for c in text:\n        if c.isalpha():\n            shift = ord(key[ki % len(key)]) - ord("A")\n            base = ord("A") if c.isupper() else ord("a")\n            result.append(chr((ord(c) - base - shift) % 26 + base))\n            ki += 1\n        else:\n            result.append(c)\n    return "".join(result)\n\ndef freq_analysis(text, top_n=3):\n    freq = {}\n    for c in text:\n        if c.isalpha():\n            lc = c.lower()\n            freq[lc] = freq.get(lc, 0) + 1\n    total = sum(freq.values())\n    ranked = sorted(freq.items(), key=lambda x: (-x[1], x[0]))[:top_n]\n    return [(ch, cnt, cnt / total * 100) for ch, cnt in ranked]\n\nkey = "KEY"\ntext = "Attack at Dawn!"\ntry:\n    enc = vigenere_encrypt(text, key)\n    dec = vigenere_decrypt(enc, key)\n    print("=== Encryption ===")\n    print(f"key      : {key}")\n    print(f"original : {text}")\n    print(f"encrypted: {enc}")\n    print(f"decrypted: {dec}")\n    print(f"verified : {dec == text}")\nexcept ValueError as e:\n    print(f"Error: {e}")\nprint()\nprint("=== Top-3 Cipher Letter Frequency ===")\nfor ch, cnt, pct in freq_analysis(enc):\n    print(f"  {ch}: {cnt} occurrences ({pct:.1f}%)")\n',
      expectedOutput: '=== Encryption ===\nkey      : KEY\noriginal : Attack at Dawn!\nencrypted: Kxrkgi kx Bkal!\ndecrypted: Attack at Dawn!\nverified : True\n\n=== Top-3 Cipher Letter Frequency ===\n  k: 4 occurrences (33.3%)\n  x: 2 occurrences (16.7%)\n  a: 1 occurrences (8.3%)\n',
      testInputs: [],
    },

    {
      id: 67, section: 'final',
      chapter: { zh: 'Boss关', en: 'Boss Level' },
      title: { zh: '学生档案管理系统', en: 'Student Records Manager' },
      difficulty: { zh: 'Boss', en: 'Boss' }, chapterRef: 'python-tute-3',
      intro: {
        zh: `<p class="lead">这道题模拟一个<strong>学生档案管理系统</strong>，综合运用列表过滤、字典聚合、排序和异常处理，是接近真实数据库查询的编程练习。</p>
<p>数据已给定：每位学生是一个字典，包含姓名、年级（9-12）、GPA（0.0-4.0）和社团列表。</p>
<p>需要实现 4 个函数：</p>
<ul>
<li><strong><code>search(grade, min_gpa, club)</code></strong>：多条件过滤，三个参数均可为 <code>None</code>（表示不过滤该条件）。用列表推导式逐个过滤，最终按 GPA 降序排序</li>
<li><strong><code>grade_report()</code></strong>：按年级分组统计——用集合推导式找出所有年级，逐年级计算人数、平均 GPA（保留 2 位小数）和 GPA 最高的学生</li>
<li><strong><code>club_report()</code></strong>：按社团分组统计——遍历所有学生的所有社团，建立社团→成员列表的字典，再计算每个社团的成员数和平均 GPA</li>
<li><strong><code>add_student(name, grade, gpa, clubs)</code></strong>：带数据校验的新增——GPA 不在 [0,4] 或年级不在 {9,10,11,12} 时 raise <code>ValueError</code>，校验通过后追加到 <code>students</code> 列表</li>
</ul>`,
        en: `<p class="lead">This problem simulates a <strong>student records management system</strong>, combining list filtering, dictionary aggregation, sorting, and exception handling — close to how real database queries and backend logic work.</p>
<p>The data is given: each student is a dict with name, grade (9-12), GPA (0.0-4.0), and a list of clubs.</p>
<p>Four functions to implement:</p>
<ul>
<li><strong><code>search(grade, min_gpa, club)</code></strong>: multi-criteria filter where all three params can be <code>None</code> (meaning "no filter on that criterion"). Filter with list comprehensions, sort the result by GPA descending</li>
<li><strong><code>grade_report()</code></strong>: group by grade — use a set comprehension to find all grades, then for each compute count, average GPA (to 2 decimal places), and the top-GPA student</li>
<li><strong><code>club_report()</code></strong>: group by club — iterate all students' clubs to build a club→member-list dict, then compute member count and average GPA per club</li>
<li><strong><code>add_student(name, grade, gpa, clubs)</code></strong>: validated insert — raise <code>ValueError</code> if GPA is outside [0,4] or grade is not in {9,10,11,12}; otherwise append to <code>students</code></li>
</ul>`,
      },
      task: { zh: '实现所有函数，通过 starter 中的完整测试序列产生预期输出。', en: 'Implement all functions and produce the expected output from the full test sequence in the starter.' },
      hint: { zh: 'search 三个参数都可为 None（不过滤）；club_report 先遍历所有学生的所有社团建立 clubs 字典，再排序输出。', en: 'search: all three params can be None (no filter); club_report: first iterate all students\' clubs to build a dict, then sort and print.' },
      starter: { zh: 'students = [\n    {"name": "Alice",  "grade": 10, "gpa": 3.8, "clubs": ["math", "science"]},\n    {"name": "Bob",    "grade": 11, "gpa": 3.2, "clubs": ["art", "music"]},\n    {"name": "Carol",  "grade": 10, "gpa": 3.9, "clubs": ["science", "debate"]},\n    {"name": "David",  "grade": 12, "gpa": 2.7, "clubs": ["sports"]},\n    {"name": "Eve",    "grade": 11, "gpa": 3.6, "clubs": ["math", "debate"]},\n    {"name": "Frank",  "grade": 12, "gpa": 3.4, "clubs": ["science", "art"]},\n    {"name": "Grace",  "grade": 10, "gpa": 3.1, "clubs": ["music", "sports"]},\n]\n\ndef search(grade=None, min_gpa=None, club=None): pass\ndef grade_report(): pass\ndef club_report(): pass\ndef add_student(name, grade, gpa, clubs): pass\n\nprint("=== Grade 10 ===")\nfor s in search(grade=10):\n    print(f"  {s[\'name\']}: GPA {s[\'gpa\']}, clubs: {\', \'.join(s[\'clubs\'])}")\nprint()\nprint("=== Science, GPA >= 3.5 ===")\nfor s in search(min_gpa=3.5, club="science"):\n    print(f"  {s[\'name\']} (Grade {s[\'grade\']}, GPA {s[\'gpa\']})")\nprint()\nprint("=== Grade Report ===")\ngrade_report()\nprint()\nprint("=== Club Report ===")\nclub_report()\nprint()\ntry: print(add_student("Hank", 13, 3.5, ["math"]))\nexcept ValueError as e: print(f"Error: {e}")\ntry: print(add_student("Iris", 11, 4.5, ["science"]))\nexcept ValueError as e: print(f"Error: {e}")\ntry:\n    print(add_student("Jack", 12, 3.8, ["debate"]))\n    print(f"Now {len(students)} students")\nexcept ValueError as e: print(f"Error: {e}")\n', en: 'students = [\n    {"name": "Alice",  "grade": 10, "gpa": 3.8, "clubs": ["math", "science"]},\n    {"name": "Bob",    "grade": 11, "gpa": 3.2, "clubs": ["art", "music"]},\n    {"name": "Carol",  "grade": 10, "gpa": 3.9, "clubs": ["science", "debate"]},\n    {"name": "David",  "grade": 12, "gpa": 2.7, "clubs": ["sports"]},\n    {"name": "Eve",    "grade": 11, "gpa": 3.6, "clubs": ["math", "debate"]},\n    {"name": "Frank",  "grade": 12, "gpa": 3.4, "clubs": ["science", "art"]},\n    {"name": "Grace",  "grade": 10, "gpa": 3.1, "clubs": ["music", "sports"]},\n]\n\ndef search(grade=None, min_gpa=None, club=None): pass\ndef grade_report(): pass\ndef club_report(): pass\ndef add_student(name, grade, gpa, clubs): pass\n\nprint("=== Grade 10 ===")\nfor s in search(grade=10):\n    print(f"  {s[\'name\']}: GPA {s[\'gpa\']}, clubs: {\', \'.join(s[\'clubs\'])}")\nprint()\nprint("=== Science, GPA >= 3.5 ===")\nfor s in search(min_gpa=3.5, club="science"):\n    print(f"  {s[\'name\']} (Grade {s[\'grade\']}, GPA {s[\'gpa\']})")\nprint()\nprint("=== Grade Report ===")\ngrade_report()\nprint()\nprint("=== Club Report ===")\nclub_report()\nprint()\ntry: print(add_student("Hank", 13, 3.5, ["math"]))\nexcept ValueError as e: print(f"Error: {e}")\ntry: print(add_student("Iris", 11, 4.5, ["science"]))\nexcept ValueError as e: print(f"Error: {e}")\ntry:\n    print(add_student("Jack", 12, 3.8, ["debate"]))\n    print(f"Now {len(students)} students")\nexcept ValueError as e: print(f"Error: {e}")\n' },
      answer: 'students = [\n    {"name": "Alice",  "grade": 10, "gpa": 3.8, "clubs": ["math", "science"]},\n    {"name": "Bob",    "grade": 11, "gpa": 3.2, "clubs": ["art", "music"]},\n    {"name": "Carol",  "grade": 10, "gpa": 3.9, "clubs": ["science", "debate"]},\n    {"name": "David",  "grade": 12, "gpa": 2.7, "clubs": ["sports"]},\n    {"name": "Eve",    "grade": 11, "gpa": 3.6, "clubs": ["math", "debate"]},\n    {"name": "Frank",  "grade": 12, "gpa": 3.4, "clubs": ["science", "art"]},\n    {"name": "Grace",  "grade": 10, "gpa": 3.1, "clubs": ["music", "sports"]},\n]\n\ndef search(grade=None, min_gpa=None, club=None):\n    res = students[:]\n    if grade is not None:\n        res = [s for s in res if s["grade"] == grade]\n    if min_gpa is not None:\n        res = [s for s in res if s["gpa"] >= min_gpa]\n    if club is not None:\n        res = [s for s in res if club in s["clubs"]]\n    return sorted(res, key=lambda s: (-s["gpa"], s["name"]))\n\ndef grade_report():\n    for g in sorted(set(s["grade"] for s in students)):\n        grp = [s for s in students if s["grade"] == g]\n        avg = sum(s["gpa"] for s in grp) / len(grp)\n        top = max(grp, key=lambda s: s["gpa"])\n        print(f"Grade {g}: {len(grp)} students, avg GPA {avg:.2f}, top: {top[\'name\']} ({top[\'gpa\']})")\n\ndef club_report():\n    clubs = {}\n    for s in students:\n        for c in s["clubs"]:\n            if c not in clubs:\n                clubs[c] = []\n            clubs[c].append(s["name"])\n    for club, members in sorted(clubs.items()):\n        avg = sum(s["gpa"] for s in students if club in s["clubs"]) / len(members)\n        print(f"{club.ljust(10)}: {len(members)} members, avg GPA {avg:.2f} — {\', \'.join(sorted(members))}")\n\ndef add_student(name, grade, gpa, clubs):\n    if not (0.0 <= gpa <= 4.0):\n        raise ValueError(f"Invalid GPA: {gpa}")\n    if grade not in [9, 10, 11, 12]:\n        raise ValueError(f"Invalid grade: {grade}")\n    students.append({"name": name, "grade": grade, "gpa": gpa, "clubs": clubs})\n    return f"Added {name}"\n\nprint("=== Grade 10 ===")\nfor s in search(grade=10):\n    print(f"  {s[\'name\']}: GPA {s[\'gpa\']}, clubs: {\', \'.join(s[\'clubs\'])}")\nprint()\nprint("=== Science, GPA >= 3.5 ===")\nfor s in search(min_gpa=3.5, club="science"):\n    print(f"  {s[\'name\']} (Grade {s[\'grade\']}, GPA {s[\'gpa\']})")\nprint()\nprint("=== Grade Report ===")\ngrade_report()\nprint()\nprint("=== Club Report ===")\nclub_report()\nprint()\ntry: print(add_student("Hank", 13, 3.5, ["math"]))\nexcept ValueError as e: print(f"Error: {e}")\ntry: print(add_student("Iris", 11, 4.5, ["science"]))\nexcept ValueError as e: print(f"Error: {e}")\ntry:\n    print(add_student("Jack", 12, 3.8, ["debate"]))\n    print(f"Now {len(students)} students")\nexcept ValueError as e: print(f"Error: {e}")\n',
      expectedOutput: '=== Grade 10 ===\n  Carol: GPA 3.9, clubs: science, debate\n  Alice: GPA 3.8, clubs: math, science\n  Grace: GPA 3.1, clubs: music, sports\n\n=== Science, GPA >= 3.5 ===\n  Carol (Grade 10, GPA 3.9)\n  Alice (Grade 10, GPA 3.8)\n\n=== Grade Report ===\nGrade 10: 3 students, avg GPA 3.60, top: Carol (3.9)\nGrade 11: 2 students, avg GPA 3.40, top: Eve (3.6)\nGrade 12: 2 students, avg GPA 3.05, top: Frank (3.4)\n\n=== Club Report ===\nart       : 2 members, avg GPA 3.30 — Bob, Frank\ndebate    : 2 members, avg GPA 3.75 — Carol, Eve\nmath      : 2 members, avg GPA 3.70 — Alice, Eve\nmusic     : 2 members, avg GPA 3.15 — Bob, Grace\nscience   : 3 members, avg GPA 3.70 — Alice, Carol, Frank\nsports    : 2 members, avg GPA 2.90 — David, Grace\n\nError: Invalid grade: 13\nError: Invalid GPA: 4.5\nAdded Jack\nNow 8 students\n',
      testInputs: [],
    },

    {
      id: 68, section: 'final',
      chapter: { zh: 'Boss关', en: 'Boss Level' },
      title: { zh: '销售数据', en: 'Sales Data' },
      difficulty: { zh: '终极Boss', en: 'Final Boss' }, chapterRef: 'python-tute-3',
      intro: {
        zh: `<p class="lead">这是<strong>终极 Boss 关</strong>，模拟真实工作中常见的<strong>销售数据分析</strong>任务——类似 Excel 透视表或数据库聚合查询。数据是一组销售流水记录，每条记录包含（月份、销售员、产品、数量、单价）：</p>
<pre><code>transactions = [
    ("2026-01", "Alice", "Laptop",  2, 1200),  # 营收 = 2 × 1200 = 2400
    ("2026-01", "Bob",   "Phone",   5,  800),  # 营收 = 5 × 800  = 4000
    ...
]</code></pre>
<p>需要实现三个核心函数，驱动四份报告：</p>
<ul>
<li><strong><code>revenue_by(field_idx)</code></strong>：通用聚合函数——按 <code>transactions[i][field_idx]</code> 分组，累加每组的营收（数量 × 单价），返回 <code>{键: 总营收}</code> 字典。field_idx=0 按月聚合，=1 按销售员，=2 按产品</li>
<li><strong><code>top_by_month()</code></strong>：两级字典嵌套——先建 <code>{月份: {销售员: 营收}}</code>，再对每个月取营收最高的销售员，返回 <code>{月份: (销售员, 营收)}</code></li>
<li><strong><code>overall_stats()</code></strong>：整体统计——用列表推导式计算每笔交易营收，再求总额、平均值、最大值；用 <code>next(generator)</code> 找到营收最大的那笔交易元组</li>
</ul>
<p>报告格式已在 starter 中实现（排序、百分比、进度条字符画），你只需完成三个核心函数。这道题约 80 行，综合运用了本课程所有核心技术——完成它意味着你已经掌握了 Python 基础语法的全部内容。</p>`,
        en: `<p class="lead">This is the <strong>Final Boss</strong>, simulating a real-world <strong>sales data analysis</strong> task — similar to an Excel pivot table or a database aggregate query. The data is a list of sales transactions, each containing (month, salesperson, product, quantity, unit price):</p>
<pre><code>transactions = [
    ("2026-01", "Alice", "Laptop",  2, 1200),  # revenue = 2 × 1200 = 2400
    ("2026-01", "Bob",   "Phone",   5,  800),  # revenue = 5 × 800  = 4000
    ...
]</code></pre>
<p>Implement three core functions that power four reports:</p>
<ul>
<li><strong><code>revenue_by(field_idx)</code></strong>: a general-purpose aggregator — group by <code>transactions[i][field_idx]</code> and accumulate revenue (qty × price) per group, returning a <code>{key: total_revenue}</code> dict. field_idx=0 groups by month, =1 by salesperson, =2 by product</li>
<li><strong><code>top_by_month()</code></strong>: two-level nested dict — first build <code>{month: {salesperson: revenue}}</code>, then find the top earner per month, returning <code>{month: (salesperson, revenue)}</code></li>
<li><strong><code>overall_stats()</code></strong>: whole-dataset statistics — use a list comprehension to compute per-transaction revenue, then get total, average, max; use <code>next(generator)</code> to locate the highest-revenue transaction tuple</li>
</ul>
<p>The report formatting is already implemented in the starter (sorting, percentages, bar charts). You just need to complete the three core functions. This problem is about 80 lines and uses every core technique from the course — completing it means you have mastered the fundamentals of Python.</p>`,
      },
      task: { zh: '实现三个核心函数，打印按销售员/产品/月份/整体的完整销售报告。', en: 'Implement the three core functions and print a complete sales report broken down by salesperson, product, monthly trend, and overall statistics.' },
      hint: { zh: 'revenue_by(field_idx)：遍历 transactions，key=t[field_idx]，rev=t[3]*t[4]；top_by_month：两级字典嵌套；overall_stats：列表推导式 + max + next(generator)。', en: 'revenue_by(field_idx): iterate transactions, key=t[field_idx], rev=t[3]*t[4]; top_by_month: two-level nested dict; overall_stats: list comprehension + max + next(generator).' },
      starter: { zh: 'transactions = [\n    ("2026-01", "Alice", "Laptop",  2, 1200),\n    ("2026-01", "Bob",   "Phone",   5,  800),\n    ("2026-01", "Alice", "Tablet",  3,  450),\n    ("2026-01", "Carol", "Laptop",  1, 1200),\n    ("2026-02", "Bob",   "Laptop",  3, 1200),\n    ("2026-02", "Alice", "Phone",   4,  800),\n    ("2026-02", "Carol", "Tablet",  6,  450),\n    ("2026-02", "Carol", "Phone",   2,  800),\n    ("2026-03", "Alice", "Laptop",  4, 1200),\n    ("2026-03", "Bob",   "Tablet",  2,  450),\n    ("2026-03", "Carol", "Laptop",  2, 1200),\n    ("2026-03", "Alice", "Phone",   3,  800),\n]\n\ndef revenue_by(field_idx):\n    """按 transactions 的某一字段聚合总营收"""\n    pass\n\ndef top_by_month():\n    """返回 {月份: (销售员, 营收)} 每月营收第一"""\n    pass\n\ndef overall_stats():\n    """返回 (总营收, 平均单笔, 最大单笔营收, 最大单笔交易元组)"""\n    pass\n\nprint("=== Revenue by Salesperson ===")\nby_person = revenue_by(1)\nfor person, rev in sorted(by_person.items(), key=lambda x: -x[1]):\n    pct = rev / sum(by_person.values()) * 100\n    print(f"  {person.ljust(8)}: ${rev}  ({pct:.1f}%)")\nprint()\nprint("=== Revenue by Product ===")\nby_product = revenue_by(2)\nfor prod, rev in sorted(by_product.items(), key=lambda x: -x[1]):\n    print(f"  {prod.ljust(8)}: ${rev}")\nprint()\nprint("=== Monthly Revenue Trend ===")\nby_month = revenue_by(0)\nfor month in sorted(by_month):\n    rev = by_month[month]\n    bar = "#" * (rev // 1000)\n    print(f"  {month}: ${rev}  {bar}")\nprint()\nprint("=== Top Salesperson per Month ===")\ntops = top_by_month()\nfor month in sorted(tops):\n    person, rev = tops[month]\n    print(f"  {month}: {person} (${rev})")\nprint()\ntotal, avg, max_rev, max_t = overall_stats()\nprint("=== Overall Stats ===")\nprint(f"  Total revenue : ${total}")\nprint(f"  Avg per sale  : ${avg:.1f}")\nprint(f"  Biggest sale  : ${max_rev} ({max_t[1]}, {max_t[2]}, {max_t[3]} units)")\n', en: 'transactions = [\n    ("2026-01", "Alice", "Laptop",  2, 1200),\n    ("2026-01", "Bob",   "Phone",   5,  800),\n    ("2026-01", "Alice", "Tablet",  3,  450),\n    ("2026-01", "Carol", "Laptop",  1, 1200),\n    ("2026-02", "Bob",   "Laptop",  3, 1200),\n    ("2026-02", "Alice", "Phone",   4,  800),\n    ("2026-02", "Carol", "Tablet",  6,  450),\n    ("2026-02", "Carol", "Phone",   2,  800),\n    ("2026-03", "Alice", "Laptop",  4, 1200),\n    ("2026-03", "Bob",   "Tablet",  2,  450),\n    ("2026-03", "Carol", "Laptop",  2, 1200),\n    ("2026-03", "Alice", "Phone",   3,  800),\n]\n\ndef revenue_by(field_idx):\n    """Aggregate total revenue by one field of transactions"""\n    pass\n\ndef top_by_month():\n    """Return {month: (salesperson, revenue)} for the top earner each month"""\n    pass\n\ndef overall_stats():\n    """Return (total, avg_per_sale, max_single_rev, max_transaction_tuple)"""\n    pass\n\nprint("=== Revenue by Salesperson ===")\nby_person = revenue_by(1)\nfor person, rev in sorted(by_person.items(), key=lambda x: -x[1]):\n    pct = rev / sum(by_person.values()) * 100\n    print(f"  {person.ljust(8)}: ${rev}  ({pct:.1f}%)")\nprint()\nprint("=== Revenue by Product ===")\nby_product = revenue_by(2)\nfor prod, rev in sorted(by_product.items(), key=lambda x: -x[1]):\n    print(f"  {prod.ljust(8)}: ${rev}")\nprint()\nprint("=== Monthly Revenue Trend ===")\nby_month = revenue_by(0)\nfor month in sorted(by_month):\n    rev = by_month[month]\n    bar = "#" * (rev // 1000)\n    print(f"  {month}: ${rev}  {bar}")\nprint()\nprint("=== Top Salesperson per Month ===")\ntops = top_by_month()\nfor month in sorted(tops):\n    person, rev = tops[month]\n    print(f"  {month}: {person} (${rev})")\nprint()\ntotal, avg, max_rev, max_t = overall_stats()\nprint("=== Overall Stats ===")\nprint(f"  Total revenue : ${total}")\nprint(f"  Avg per sale  : ${avg:.1f}")\nprint(f"  Biggest sale  : ${max_rev} ({max_t[1]}, {max_t[2]}, {max_t[3]} units)")\n' },
      answer: 'transactions = [\n    ("2026-01", "Alice", "Laptop",  2, 1200),\n    ("2026-01", "Bob",   "Phone",   5,  800),\n    ("2026-01", "Alice", "Tablet",  3,  450),\n    ("2026-01", "Carol", "Laptop",  1, 1200),\n    ("2026-02", "Bob",   "Laptop",  3, 1200),\n    ("2026-02", "Alice", "Phone",   4,  800),\n    ("2026-02", "Carol", "Tablet",  6,  450),\n    ("2026-02", "Carol", "Phone",   2,  800),\n    ("2026-03", "Alice", "Laptop",  4, 1200),\n    ("2026-03", "Bob",   "Tablet",  2,  450),\n    ("2026-03", "Carol", "Laptop",  2, 1200),\n    ("2026-03", "Alice", "Phone",   3,  800),\n]\n\ndef revenue_by(field_idx):\n    agg = {}\n    for t in transactions:\n        key = t[field_idx]\n        agg[key] = agg.get(key, 0) + t[3] * t[4]\n    return agg\n\ndef top_by_month():\n    monthly = {}\n    for month, person, product, qty, price in transactions:\n        if month not in monthly:\n            monthly[month] = {}\n        monthly[month][person] = monthly[month].get(person, 0) + qty * price\n    result = {}\n    for month, people in monthly.items():\n        top_person = max(people, key=lambda p: people[p])\n        result[month] = (top_person, people[top_person])\n    return result\n\ndef overall_stats():\n    revenues = [t[3] * t[4] for t in transactions]\n    total = sum(revenues)\n    avg = total / len(revenues)\n    max_rev = max(revenues)\n    max_t = next(t for t in transactions if t[3] * t[4] == max_rev)\n    return total, avg, max_rev, max_t\n\nprint("=== Revenue by Salesperson ===")\nby_person = revenue_by(1)\nfor person, rev in sorted(by_person.items(), key=lambda x: -x[1]):\n    pct = rev / sum(by_person.values()) * 100\n    print(f"  {person.ljust(8)}: ${rev}  ({pct:.1f}%)")\nprint()\nprint("=== Revenue by Product ===")\nby_product = revenue_by(2)\nfor prod, rev in sorted(by_product.items(), key=lambda x: -x[1]):\n    print(f"  {prod.ljust(8)}: ${rev}")\nprint()\nprint("=== Monthly Revenue Trend ===")\nby_month = revenue_by(0)\nfor month in sorted(by_month):\n    rev = by_month[month]\n    bar = "#" * (rev // 1000)\n    print(f"  {month}: ${rev}  {bar}")\nprint()\nprint("=== Top Salesperson per Month ===")\ntops = top_by_month()\nfor month in sorted(tops):\n    person, rev = tops[month]\n    print(f"  {month}: {person} (${rev})")\nprint()\ntotal, avg, max_rev, max_t = overall_stats()\nprint("=== Overall Stats ===")\nprint(f"  Total revenue : ${total}")\nprint(f"  Avg per sale  : ${avg:.1f}")\nprint(f"  Biggest sale  : ${max_rev} ({max_t[1]}, {max_t[2]}, {max_t[3]} units)")\n',
      expectedOutput: '=== Revenue by Salesperson ===\n  Alice   : $14150  (46.3%)\n  Bob     : $8500  (27.8%)\n  Carol   : $7900  (25.9%)\n\n=== Revenue by Product ===\n  Laptop  : $14400\n  Phone   : $11200\n  Tablet  : $4950\n\n=== Monthly Revenue Trend ===\n  2026-01: $8950  ########\n  2026-02: $11100  ###########\n  2026-03: $10500  ##########\n\n=== Top Salesperson per Month ===\n  2026-01: Bob ($4000)\n  2026-02: Carol ($4300)\n  2026-03: Alice ($7200)\n\n=== Overall Stats ===\n  Total revenue : $30550\n  Avg per sale  : $2545.8\n  Biggest sale  : $4800 (Alice, Laptop, 4 units)\n',
      testInputs: [],
    },

  ],
};


