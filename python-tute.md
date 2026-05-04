# Python 语法大全

## 用例子学 Python

每个语法都用「代码 → 输出」对照展示

充足例子 · 详细解释 · 实用技巧

覆盖 Python 全部基础语法

---

## 目录

- Part 1　`print` 与 `input` —— 基本输入输出
- Part 2　数值运算 —— Python 作计算器
- Part 3　类型转换 —— `int` / `float` / `str`
- Part 4　整除与取余 —— `//` 与 `%`
- Part 5　字符串基础 —— 索引与切片
- Part 6　字符串方法 —— 常用操作
- Part 7　f-string 格式化 —— 精确控制输出
- Part 8　列表与元组 —— 序列类型
- Part 9　条件语句 —— `if` / `elif` / `else`
- Part 10　比较运算符与成员运算符
- Part 11　函数定义 —— `def` 与 `return`
- Part 12　`while` 循环
- Part 13　`for` 循环与 `range()`
- Part 14　嵌套循环 —— 循环套循环
- Part 15　字典 —— `dict`
- Part 16　集合 —— `set`
- Part 17　列表的可变性与复制
- Part 18　高级列表操作 —— `enumerate` · `sorted` · `append`
- Part 19　高级函数 —— `None` 返回 · 多返回值 · `lambda`
- Part 20　列表推导式
- Part 21　常用标准库 —— `math` · `collections` · `itertools` · `random`
- Part 22　文件读写 —— File I/O
- Part 23　CSV 文件处理
- Part 24　异常处理 —— `try` / `except` / `raise` / `assert`
- Part 25　递归 —— Recursion
- Part 26　调试技巧
- Part 27　实用技巧汇总

---

## Part 1　`print` 与 `input` —— 基本输入输出

`print` 和 `input` 是 Python 最基础的两个函数。`print` 把内容显示到屏幕上，`input` 从键盘读取用户输入。

### 1.1 `print` 基本用法

```python
print("Hello, World!")
```

```
输出
Hello, World!
```

`print` 会自动在末尾加换行。想输出多行，可以用 `\n`（换行符）：

```python
print("第一行\n第二行")
```

```
输出
第一行
第二行
```

也可以连续调用多次 `print`，效果相同：

```python
print("第一行")
print("第二行")
```

```
输出
第一行
第二行
```

### 1.2 `print` 输出多个值

`print` 可以一次输出多个值，用逗号隔开，之间自动加空格：

```python
name = "Alice"
age = 20
print(name, age)
```

```
输出
Alice 20
```

用 `sep` 参数改变分隔符，用 `end` 参数改变末尾字符：

```python
print("A", "B", "C", sep="-")
print("不换行", end="")
print("，接在后面")
```

```
输出
A-B-C
不换行，接在后面
```

### 1.3 `input` 基本用法

`input` 等待用户输入，按下 Enter 后返回输入的字符串：

```python
name = input("请输入你的名字：")
print("你好，" + name)
```

```
用户输入：Alice
输出：你好，Alice
```

> **注意**：`input` 返回的永远是**字符串**（`str`），哪怕用户输入了数字，也需要转换才能做数学运算。

---

## Part 2　数值运算 —— Python 作计算器

Python 支持所有常见的数学运算，可以当作功能强大的计算器来用。

### 2.1 基本运算符

| 运算符 | 含义       | 示例        | 结果   |
|--------|------------|-------------|--------|
| `+`    | 加法       | `3 + 4`     | `7`    |
| `-`    | 减法       | `10 - 3`    | `7`    |
| `*`    | 乘法       | `3 * 4`     | `12`   |
| `/`    | 除法       | `7 / 2`     | `3.5`  |
| `**`   | 幂次方     | `2 ** 10`   | `1024` |
| `//`   | 整除       | `7 // 2`    | `3`    |
| `%`    | 取余（模） | `7 % 2`     | `1`    |

### 2.2 运算优先级

Python 遵循数学中的优先级规则：`**` > `*` `/` `//` `%` > `+` `-`，括号优先级最高。

```python
print(2 + 3 * 4)        # 乘法先算
print((2 + 3) * 4)      # 括号先算
print(2 ** 3 + 1)       # 幂先算
```

```
输出
14
20
9
```

### 2.3 整数与浮点数

Python 中有两种数字类型：

- `int`（整数）：`1`, `42`, `-7`
- `float`（浮点数）：`3.14`, `2.0`, `-0.5`

只要有一个操作数是 `float`，结果就是 `float`；`/` 除法永远返回 `float`：

```python
print(type(4))        # int
print(type(4.0))      # float
print(4 / 2)          # 2.0，不是 2
print(4 // 2)         # 2，整数
```

```
输出
<class 'int'>
<class 'float'>
2.0
2
```

### 2.4 科学计数法

大数字可以用 `e` 表示科学计数法：

```python
x = 5.345e5      # 等于 5.345 × 10^5
y = 2.14e2       # 等于 214.0
print(x + y)
```

```
输出
534714.0
```

---

## Part 3　类型转换 —— `int` / `float` / `str`

不同类型的数据不能直接混用。`int()`、`float()`、`str()` 是三个最常用的类型转换函数。

### 3.1 转换方向

```
用户输入(str) ──→ int() / float() ──→ 数值计算
数值计算结果  ──→ str()            ──→ 字符串拼接
```

### 3.2 `str` 转 `int` / `float`

```python
age_str = "25"
age = int(age_str)
print(age + 1)       # 可以做加法了
```

```
输出
26
```

```python
price_str = "9.99"
price = float(price_str)
print(price * 2)
```

```
输出
19.98
```

### 3.3 数值转 `str`

数值不能直接用 `+` 和字符串拼接，需要先转成 `str`：

```python
age = 20
# print("年龄：" + age)    # 错误！不同类型不能拼接
print("年龄：" + str(age))  # 正确
```

```
输出
年龄：20
```

### 3.4 `float` 转 `int` 会截断小数

```python
x = float(3.9)
print(int(x))     # 不是四舍五入，是直接丢掉小数部分
```

```
输出
3
```

> **注意**：`int()` 是**截断**（向零取整），不是四舍五入。`round()` 才是四舍五入。

### 3.5 综合示例：输入两个数求平均

```python
a = float(input("第一个数："))
b = float(input("第二个数："))
print("平均值：" + str((a + b) / 2))
```

```
用户输入：10
用户输入：20
输出：平均值：15.0
```

---

## Part 4　整除与取余 —— `//` 与 `%`

`//` 和 `%` 是两个非常实用的运算符，用于处理"整数分割"问题。

### 4.1 整除 `//`

`//` 返回除法的整数部分（商），小数部分直接丢掉：

```python
print(17 // 5)    # 17 ÷ 5 = 3 余 2，取整数部分
print(100 // 7)
print(7 // 7)
```

```
输出
3
14
1
```

### 4.2 取余 `%`

`%` 返回除法的余数：

```python
print(17 % 5)     # 17 = 3×5 + 2，余数是 2
print(100 % 7)
print(10 % 2)     # 整除时余数为 0
```

```
输出
2
2
0
```

### 4.3 两者配合使用

`//` 和 `%` 经常配合使用，将一个整数分解成更小的单位：

```python
total_minutes = 137
hours = total_minutes // 60
minutes = total_minutes % 60
print(str(hours) + "小时" + str(minutes) + "分钟")
```

```
输出
2小时17分钟
```

```python
total_days = 400
years = total_days // 365
remaining_days = total_days % 365
print(str(years) + "年零" + str(remaining_days) + "天")
```

```
输出
1年零35天
```

### 4.4 判断整除性

`% == 0` 是判断一个数能否被另一个数整除的标准写法：

```python
n = 24
if n % 2 == 0:
    print(str(n) + " 是偶数")
else:
    print(str(n) + " 是奇数")
```

```
输出
24 是偶数
```

---

## Part 5　字符串基础 —— 索引与切片

字符串（`str`）是 Python 中最常用的序列类型。每个字符都有一个位置（索引）。

### 5.1 索引：取单个字符

Python 字符串的索引从 `0` 开始，负数索引从末尾开始数：

```
字符串：  H  e  l  l  o
正索引：  0  1  2  3  4
负索引： -5 -4 -3 -2 -1
```

```python
s = "Hello"
print(s[0])     # 第 1 个字符
print(s[4])     # 第 5 个字符
print(s[-1])    # 最后一个字符
print(s[-2])    # 倒数第二个字符
```

```
输出
H
o
o
l
```

### 5.2 切片：取一段子字符串

切片格式：`s[start:end]`，取从 `start` 到 `end-1` 的字符（不含 `end`）。

```python
s = "Hello, World!"
print(s[0:5])    # 取第 0~4 位
print(s[7:12])   # 取第 7~11 位
print(s[:5])     # 省略 start = 从头开始
print(s[7:])     # 省略 end = 到末尾
print(s[:])      # 完整复制
```

```
输出
Hello
World
Hello
World!
Hello, World!
```

### 5.3 切片步长

切片的第三个参数是步长 `s[start:end:step]`：

```python
s = "abcdefgh"
print(s[::2])     # 每隔一个取一个
print(s[::-1])    # 步长为负 = 反转字符串
print(s[6:0:-2])  # 从索引 6 开始，每隔一个，往前走
```

```
输出
aceg
hgfedcba
gec
```

> **技巧**：`s[::-1]` 是反转字符串的最简洁写法。

### 5.4 `len()` 获取长度

```python
s = "Python"
print(len(s))              # 字符串长度
print(s[len(s) - 1])      # 最后一个字符（等价于 s[-1]）
```

```
输出
6
n
```

---

## Part 6　字符串方法 —— 常用操作

字符串对象自带很多方法，可以直接用 `.方法名()` 调用。

### 6.1 大小写转换

```python
s = "Hello World"
print(s.upper())      # 全转大写
print(s.lower())      # 全转小写
```

```
输出
HELLO WORLD
hello world
```

### 6.2 去除空白 `strip()`

```python
s = "   hello   "
print(s.strip())      # 去除两端空白
print(s.lstrip())     # 只去左边
print(s.rstrip())     # 只去右边
```

```
输出
hello
hello   
   hello
```

### 6.3 分割 `split()` 与合并 `join()`

`split()` 把字符串按空格（或指定字符）分割成列表；`join()` 把列表合并成字符串：

```python
sentence = "apple banana cherry"
words = sentence.split()
print(words)

# 用 "-" 连接
print("-".join(words))
```

```
输出
['apple', 'banana', 'cherry']
apple-banana-cherry
```

```python
csv_line = "Alice,20,90"
parts = csv_line.split(",")
print(parts)
print(parts[0])
```

```
输出
['Alice', '20', '90']
Alice
```

### 6.4 检查字符串内容

| 方法              | 含义                     | 示例                        |
|-------------------|--------------------------|-----------------------------|
| `s.isdigit()`     | 是否全是数字字符         | `"123".isdigit()` → `True`  |
| `s.isalpha()`     | 是否全是字母             | `"abc".isalpha()` → `True`  |
| `s.startswith(x)` | 是否以 x 开头            | `"hi".startswith("h")` → `True` |
| `s.endswith(x)`   | 是否以 x 结尾            | `"omics".endswith("ics")` → `True` |

```python
print("123".isdigit())
print("abc".isdigit())
print("hello".startswith("hel"))
```

```
输出
True
False
True
```

### 6.5 `in` 检查子字符串

```python
s = "Hello, World!"
print("World" in s)
print("Python" in s)
```

```
输出
True
False
```

---

## Part 7　f-string 格式化 —— 精确控制输出

f-string（格式化字符串）是 Python 3.6+ 中嵌入变量和表达式到字符串的最推荐方式。

### 7.1 基本语法

在字符串前加 `f`，用 `{}` 包住变量名：

```python
name = "Alice"
age = 20
print(f"我叫 {name}，今年 {age} 岁。")
```

```
输出
我叫 Alice，今年 20 岁。
```

`{}` 里可以放任意表达式：

```python
x = 5
print(f"x 的平方是 {x ** 2}，x 加 1 是 {x + 1}")
```

```
输出
x 的平方是 25，x 加 1 是 6
```

### 7.2 格式规范：`{变量:格式}`

在 `{}` 里用 `:` 后接格式规范，控制输出的宽度、对齐和精度：

#### 数字精度

```python
price = 9.5
print(f"{price:.2f}")   # 保留 2 位小数
print(f"{price:.4f}")   # 保留 4 位小数
```

```
输出
9.50
9.5000
```

#### 列宽与对齐

| 格式     | 含义           | 示例                | 输出       |
|----------|----------------|---------------------|------------|
| `{x:<10}` | 左对齐，宽 10 | `f"{'A':<10}B"`    | `A         B` |
| `{x:>10}` | 右对齐，宽 10 | `f"{'A':>10}B"`    | `         AB` |
| `{x:^10}` | 居中，宽 10   | `f"{'A':^10}B"`    | `    A     B` |

```python
item = "apple"
price = 3.5
qty = 10

print(f"{'Item':<15}{'Price':>10}{'Qty':>6}")
print(f"{item:<15}{price:>10.2f}{qty:>6}")
```

```
输出
Item                Price   Qty
apple                3.50    10
```

#### 前导零

```python
for i in range(3):
    print(f"file_{i:02d}.txt")   # 宽度 2，不足补零
```

```
输出
file_00.txt
file_01.txt
file_02.txt
```

### 7.3 `%` 旧式格式化（了解即可）

```python
print("%.2f" % 3.14159)   # 旧写法
```

```
输出
3.14
```

> **提示**：新代码应优先使用 f-string，比旧式格式化更清晰、更强大。

---

## Part 8　列表与元组 —— 序列类型

列表（`list`）和元组（`tuple`）都是有序的序列，可以存放多个不同类型的值。

### 8.1 列表 `list`

用方括号 `[]` 创建列表：

```python
fruits = ["apple", "banana", "cherry"]
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True]

print(fruits[0])      # 第一个元素
print(fruits[-1])     # 最后一个元素
print(len(fruits))    # 列表长度
```

```
输出
apple
cherry
3
```

### 8.2 列表切片

列表切片和字符串切片语法完全相同：

```python
nums = [0, 1, 2, 3, 4, 5]
print(nums[1:4])    # 索引 1~3
print(nums[:3])     # 前 3 个
print(nums[3:])     # 第 3 个之后
print(nums[::2])    # 每隔一个
```

```
输出
[1, 2, 3]
[0, 1, 2]
[3, 4, 5]
[0, 2, 4]
```

### 8.3 列表修改

列表是**可变的**（mutable），可以直接修改元素：

```python
fruits = ["apple", "banana", "cherry"]
fruits[1] = "mango"
print(fruits)
```

```
输出
['apple', 'mango', 'cherry']
```

### 8.4 `append()` 添加元素

```python
fruits = ["apple", "banana"]
fruits.append("cherry")
print(fruits)
```

```
输出
['apple', 'banana', 'cherry']
```

### 8.5 元组 `tuple`

用小括号 `()` 创建元组。元组是**不可变的**（immutable）：

```python
point = (3, 4)
record = ("Alice", 20, 90.5)

print(point[0])
print(record[1])
```

```
输出
3
20
```

元组常用于函数返回多个值，或作为字典的键（因为不可变）。

---

## Part 9　条件语句 —— `if` / `elif` / `else`

`if` 语句让程序根据条件选择不同的执行路径。

### 9.1 基本结构

```python
if 条件:
    满足条件时执行
elif 另一个条件:
    满足这个条件时执行
else:
    以上都不满足时执行
```

> **注意**：Python 用**缩进**（通常 4 个空格）区分代码块，不用花括号。

### 9.2 单分支 `if`

```python
score = 85
if score >= 60:
    print("及格了！")
```

```
输出
及格了！
```

### 9.3 双分支 `if-else`

```python
score = 45
if score >= 60:
    print("及格")
else:
    print("不及格")
```

```
输出
不及格
```

### 9.4 多分支 `if-elif-else`

```python
score = 78

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"

print(f"成绩等级：{grade}")
```

```
输出
成绩等级：C
```

### 9.5 条件中的 `in` 操作符

`in` 可以检查一个值是否在列表、字符串或其他容器中：

```python
month = 7
if month in [12, 1, 2]:
    print("夏天")
elif month in [3, 4, 5]:
    print("秋天")
elif month in [6, 7, 8]:
    print("冬天")
else:
    print("春天")
```

```
输出
冬天
```

`in range(a, b)` 检查是否在某个范围内：

```python
age = 15
if age in range(13, 18):
    print("青少年")
```

```
输出
青少年
```

---

## Part 10　比较运算符与成员运算符

条件语句中会用到各种运算符来构成条件表达式。

### 10.1 比较运算符

| 运算符 | 含义       | 示例        | 结果    |
|--------|------------|-------------|---------|
| `==`   | 等于       | `5 == 5`    | `True`  |
| `!=`   | 不等于     | `5 != 3`    | `True`  |
| `>`    | 大于       | `5 > 3`     | `True`  |
| `<`    | 小于       | `5 < 3`     | `False` |
| `>=`   | 大于等于   | `5 >= 5`    | `True`  |
| `<=`   | 小于等于   | `3 <= 5`    | `True`  |

> **注意**：Python 的等于是 `==`（两个等号），赋值是 `=`（一个等号）。

### 10.2 逻辑运算符 `and` / `or` / `not`

| 运算符 | 含义   | 规则                             |
|--------|--------|----------------------------------|
| `and`  | 与     | 两边都为 `True` 才为 `True`      |
| `or`   | 或     | 任一为 `True` 即为 `True`        |
| `not`  | 非     | 取反                             |

```python
x = 15
print(x > 10 and x < 20)    # 两个条件都满足
print(x < 5 or x > 10)      # 至少一个满足
print(not x > 10)            # 取反
```

```
输出
True
True
False
```

### 10.3 成员运算符 `in` / `not in`

```python
vowels = ["a", "e", "i", "o", "u"]
c = "e"
print(c in vowels)       # True
print(c not in vowels)   # False

s = "Hello"
print("ell" in s)        # 子字符串检查
```

```
输出
True
False
True
```

### 10.4 链式比较

Python 支持像数学一样的链式比较：

```python
x = 15
print(10 < x < 20)     # 等价于 x > 10 and x < 20
```

```
输出
True
```

---

## Part 11　函数定义 —— `def` 与 `return`

函数是把一段代码打包起来、可以反复调用的工具。用 `def` 关键字定义。

### 11.1 基本结构

```python
def 函数名(参数1, 参数2):
    函数体
    return 返回值
```

### 11.2 无参数函数

```python
def greet():
    print("Hello, World!")

greet()    # 调用函数
```

```
输出
Hello, World!
```

### 11.3 有参数的函数

```python
def greet(name):
    print(f"Hello, {name}!")

greet("Alice")
greet("Bob")
```

```
输出
Hello, Alice!
Hello, Bob!
```

### 11.4 `return` 返回值

```python
def square(n):
    return n * n

result = square(5)
print(result)
print(square(3) + square(4))
```

```
输出
25
25
```

### 11.5 默认参数值

```python
def power(base, exp=2):    # exp 默认为 2
    return base ** exp

print(power(3))       # 用默认值 exp=2
print(power(3, 3))    # 指定 exp=3
```

```
输出
9
27
```

### 11.6 布尔返回值

返回 `True` / `False` 的函数通常以 `is_` 或 `has_` 开头，称为谓词函数：

```python
def is_even(n):
    return n % 2 == 0

print(is_even(4))
print(is_even(7))
```

```
输出
True
False
```

---

## Part 12　`while` 循环

`while` 循环在条件为 `True` 时不断重复执行，直到条件变为 `False`。

### 12.1 基本结构

```python
while 条件:
    循环体
```

### 12.2 计数循环

```python
i = 1
while i <= 5:
    print(i)
    i += 1    # 不要忘记更新计数器！
```

```
输出
1
2
3
4
5
```

> **警告**：如果忘记更新计数器，条件永远为 `True`，程序会陷入**死循环**，按 Ctrl+C 中断。

### 12.3 `while` 计算幂次表

```python
n = 3    # 底数
i = 1
while i <= 5:
    print(f"{i} ** {n} = {i ** n}")
    i += 1
```

```
输出
1 ** 3 = 1
2 ** 3 = 8
3 ** 3 = 27
4 ** 3 = 64
5 ** 3 = 125
```

### 12.4 `while True` + `break`

有时循环条件不好写在开头，可以用 `while True` 配合 `break`：

```python
while True:
    user_input = input("输入 q 退出：")
    if user_input == "q":
        break
    print(f"你输入了：{user_input}")
print("再见！")
```

```
用户输入：hello
输出：你输入了：hello
用户输入：q
输出：再见！
```

---

## Part 13　`for` 循环与 `range()`

`for` 循环用于**遍历**序列（列表、字符串、range 等）中的每个元素。

### 13.1 遍历列表

```python
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)
```

```
输出
apple
banana
cherry
```

### 13.2 遍历字符串

字符串也是序列，`for` 可以逐字符遍历：

```python
for c in "Hello":
    print(c)
```

```
输出
H
e
l
l
o
```

### 13.3 `range()` 生成数字序列

`range(start, stop, step)` 生成从 `start` 到 `stop-1` 的整数序列：

```python
# range(stop)        从 0 到 stop-1
# range(start, stop) 从 start 到 stop-1
# range(start, stop, step) 步长 step

for i in range(5):
    print(i, end=" ")
print()

for i in range(1, 6):
    print(i, end=" ")
print()

for i in range(0, 10, 2):
    print(i, end=" ")
```

```
输出
0 1 2 3 4
1 2 3 4 5
0 2 4 6 8
```

倒序：

```python
for i in range(5, 0, -1):
    print(i, end=" ")
```

```
输出
5 4 3 2 1
```

### 13.4 用 `for` 拼接字符串

```python
name = "Alice"
result = ""
for c in name:
    result = result + c + "-"
print(result)
```

```
输出
A-l-i-c-e-
```

### 13.5 `for` vs `while` 的选择

| 情况                       | 推荐         |
|----------------------------|--------------|
| 知道循环次数，或遍历序列   | `for`        |
| 循环次数不确定，看条件决定 | `while`      |

---

## Part 14　嵌套循环 —— 循环套循环

一个循环内部再包含另一个循环，称为嵌套循环。常用于处理二维结构（如表格、矩阵）。

### 14.1 基本结构

```python
for i in range(外层次数):
    for j in range(内层次数):
        # 内层循环体
```

外层每执行一次，内层完整执行一遍。

### 14.2 打印乘法表

```python
for i in range(1, 4):
    for j in range(1, 4):
        print(f"{i}×{j}={i*j}", end="  ")
    print()    # 内层结束后换行
```

```
输出
1×1=1  1×2=2  1×3=3  
2×1=2  2×2=4  2×3=6  
3×1=3  3×2=6  3×3=9  
```

### 14.3 打印星形图案

```python
height = 4
for i in range(1, height + 1):
    print("*" * i)
```

```
输出
*
**
***
****
```

### 14.4 遍历二维列表（矩阵）

```python
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

for row in matrix:
    for val in row:
        print(val, end=" ")
    print()
```

```
输出
1 2 3 
4 5 6 
7 8 9 
```

---

## Part 15　字典 —— `dict`

字典（`dict`）是一种存储**键值对**的数据结构。通过键（key）快速查找对应的值（value）。

### 15.1 创建字典

```python
person = {
    "name": "Alice",
    "age": 20,
    "score": 90.5
}
print(person["name"])
print(person["age"])
```

```
输出
Alice
20
```

### 15.2 修改与添加

```python
person = {"name": "Alice", "age": 20}
person["age"] = 21           # 修改已有键
person["city"] = "Sydney"    # 添加新键
print(person)
```

```
输出
{'name': 'Alice', 'age': 21, 'city': 'Sydney'}
```

### 15.3 检查键是否存在

```python
data = {"a": 1, "b": 2}
if "a" in data:
    print("键 'a' 存在，值为", data["a"])
if "c" not in data:
    print("键 'c' 不存在")
```

```
输出
键 'a' 存在，值为 1
键 'c' 不存在
```

### 15.4 遍历字典

```python
scores = {"Alice": 90, "Bob": 85, "Carol": 92}

# 遍历键
for name in scores:
    print(name)

# 遍历键值对
for name, score in scores.items():
    print(f"{name}: {score}")
```

```
输出
Alice
Bob
Carol
Alice: 90
Bob: 85
Carol: 92
```

### 15.5 用字典统计频率

统计一段文本中每个单词出现的次数——这是字典最经典的用法：

```python
text = "the cat sat on the mat the cat"
words = text.split()
count = {}

for word in words:
    if word in count:
        count[word] += 1
    else:
        count[word] = 1

print(count)
```

```
输出
{'the': 3, 'cat': 2, 'sat': 1, 'on': 1, 'mat': 1}
```

### 15.6 `.keys()` · `.values()` · `.items()`

```python
d = {"a": 1, "b": 2, "c": 3}
print(list(d.keys()))
print(list(d.values()))
print(list(d.items()))
```

```
输出
['a', 'b', 'c']
[1, 2, 3]
[('a', 1), ('b', 2), ('c', 3)]
```

---

## Part 16　集合 —— `set`

集合（`set`）是**无序且不重复**的元素集合，支持数学中的集合运算。

### 16.1 创建集合

```python
fruits = {"apple", "banana", "cherry", "apple"}   # 重复的 apple 自动去除
print(fruits)
print(type(fruits))
```

```
输出
{'banana', 'cherry', 'apple'}
<class 'set'>
```

也可以用 `set()` 从列表转换（常用于去重）：

```python
numbers = [1, 2, 2, 3, 3, 3]
unique = set(numbers)
print(unique)
```

```
输出
{1, 2, 3}
```

### 16.2 集合运算

```python
A = {1, 2, 3, 4}
B = {3, 4, 5, 6}

print(A & B)    # 交集：两者都有的
print(A | B)    # 并集：两者合并
print(A - B)    # 差集：A 有但 B 没有
```

```
输出
{3, 4}
{1, 2, 3, 4, 5, 6}
{1, 2}
```

### 16.3 实际应用：找共同元素

```python
def common_elements(list1, list2):
    return len(set(list1) & set(list2))

friends_alice = ["Bob", "Carol", "Dave"]
friends_bob   = ["Carol", "Eve", "Alice"]
print(common_elements(friends_alice, friends_bob))
```

```
输出
1
```

---

## Part 17　列表的可变性与复制

列表是**可变**（mutable）的，这意味着修改列表会影响所有指向同一列表的变量。

### 17.1 别名（Alias）陷阱

```python
a = [1, 2, 3]
b = a           # b 是 a 的别名，指向同一个列表
b[0] = 99
print(a)        # a 也变了！
```

```
输出
[99, 2, 3]
```

`b = a` 不是复制，只是给同一个列表又起了个名字。

### 17.2 浅复制

要真正复制一个列表，用 `.copy()` 或切片 `[:]`：

```python
a = [1, 2, 3]
b = a.copy()     # 或者 b = a[:]
b[0] = 99
print(a)         # a 不受影响
print(b)
```

```
输出
[1, 2, 3]
[99, 2, 3]
```

### 17.3 可变 vs 不可变

| 类型      | 可变？ | 示例                          |
|-----------|--------|-------------------------------|
| `list`    | 是     | `[1, 2, 3]`                   |
| `dict`    | 是     | `{"a": 1}`                    |
| `set`     | 是     | `{1, 2, 3}`                   |
| `str`     | 否     | `"hello"`                     |
| `int`     | 否     | `42`                          |
| `tuple`   | 否     | `(1, 2, 3)`                   |

字符串不可变，所以 `s[0] = "X"` 会报错；对字符串的所有"修改"都是创建新字符串。

### 17.4 就地修改 vs 返回新列表

函数对列表的修改有两种风格：

**就地修改**（原列表被改变）：

```python
def shift_left(lst):
    for i in range(len(lst) - 1):
        lst[i], lst[i + 1] = lst[i + 1], lst[i]

data = [1, 2, 3, 4]
shift_left(data)
print(data)      # 原列表已改变
```

```
输出
[2, 3, 4, 1]
```

**返回新列表**（原列表不变）：

```python
def shift_left_copy(lst):
    copy = lst.copy()
    for i in range(len(copy) - 1):
        copy[i], copy[i + 1] = copy[i + 1], copy[i]
    return copy

data = [1, 2, 3, 4]
result = shift_left_copy(data)
print(data)      # 原列表不变
print(result)
```

```
输出
[1, 2, 3, 4]
[2, 3, 4, 1]
```

---

## Part 18　高级列表操作

### 18.1 `enumerate()` —— 同时获取索引和值

遍历列表时，常需要同时知道索引和值：

```python
fruits = ["apple", "banana", "cherry"]

# 普通写法
for i in range(len(fruits)):
    print(i, fruits[i])

# 更 Pythonic 的写法
for i, fruit in enumerate(fruits):
    print(i, fruit)
```

```
输出（两种写法结果相同）
0 apple
1 banana
2 cherry
```

### 18.2 `sorted()` 与 `.sort()`

`sorted()` 返回新排序列表（不修改原列表）；`.sort()` 就地排序：

```python
nums = [3, 1, 4, 1, 5, 9, 2, 6]

print(sorted(nums))           # 升序，返回新列表
print(sorted(nums, reverse=True))  # 降序

# 原列表没变
print(nums)
```

```
输出
[1, 1, 2, 3, 4, 5, 6, 9]
[9, 6, 5, 4, 3, 2, 1, 1]
[3, 1, 4, 1, 5, 9, 2, 6]
```

### 18.3 `key` 参数自定义排序

```python
words = ["banana", "apple", "fig", "cherry"]

# 按长度排序
print(sorted(words, key=len))

# 按最后一个字母排序
print(sorted(words, key=lambda w: w[-1]))
```

```
输出
['fig', 'apple', 'banana', 'cherry']
['banana', 'apple', 'fig', 'cherry']
```

### 18.4 `join()` 拼接列表

```python
words = ["Hello", "World", "from", "Python"]
print(" ".join(words))
print(", ".join(words))
```

```
输出
Hello World from Python
Hello, World, from, Python
```

---

## Part 19　高级函数 —— `None` 返回 · 多返回值 · `lambda`

### 19.1 `None` 返回值

没有 `return` 语句（或 `return` 后面没有值）的函数返回 `None`：

```python
def greet(name):
    print(f"Hello, {name}")    # 没有 return

result = greet("Alice")
print(result)    # None
```

```
输出
Hello, Alice
None
```

可以利用 `None` 表示"没有结果"：

```python
def safe_max(lst):
    if not lst:             # 列表为空时
        return None
    return max(lst)

print(safe_max([3, 1, 4]))
print(safe_max([]))
```

```
输出
4
None
```

### 19.2 多返回值（元组）

Python 函数可以用逗号分隔的方式返回多个值（实际上返回的是一个元组）：

```python
def min_max(lst):
    return min(lst), max(lst)

lo, hi = min_max([3, 1, 4, 1, 5, 9])
print(f"最小值：{lo}，最大值：{hi}")
```

```
输出
最小值：1，最大值：9
```

### 19.3 提前返回（Early Return）

在满足条件时提前 `return`，避免多层嵌套：

```python
def is_sorted(lst):
    for i in range(1, len(lst)):
        if lst[i] < lst[i - 1]:
            return False     # 发现不满足条件就立刻返回
    return True

print(is_sorted([1, 2, 3, 4]))
print(is_sorted([1, 3, 2, 4]))
```

```
输出
True
False
```

### 19.4 `lambda` 匿名函数

`lambda` 是定义简单函数的简洁写法，常与 `sorted()`、`map()`、`filter()` 配合使用：

```python
# 普通函数
def square(x):
    return x ** 2

# 等价的 lambda
square = lambda x: x ** 2

print(square(5))
```

```
输出
25
```

`lambda` 最常见的用法是作为 `key` 参数：

```python
students = [("Alice", 90), ("Bob", 85), ("Carol", 92)]

# 按分数（第二个元素）排序
sorted_students = sorted(students, key=lambda s: s[1])
print(sorted_students)

# 按分数降序，同分按名字升序
sorted_students = sorted(students, key=lambda s: (-s[1], s[0]))
print(sorted_students)
```

```
输出
[('Bob', 85), ('Alice', 90), ('Carol', 92)]
[('Carol', 92), ('Alice', 90), ('Bob', 85)]
```

---

## Part 20　列表推导式

列表推导式是用一行代码生成列表的 Pythonic 方式，比 `for` + `append` 更简洁。

### 20.1 基本语法

```python
[表达式 for 变量 in 可迭代对象]
```

等价于：

```python
result = []
for 变量 in 可迭代对象:
    result.append(表达式)
```

### 20.2 示例对比

普通写法：

```python
squares = []
for i in range(1, 6):
    squares.append(i ** 2)
print(squares)
```

列表推导式写法：

```python
squares = [i ** 2 for i in range(1, 6)]
print(squares)
```

```
输出（两种写法相同）
[1, 4, 9, 16, 25]
```

### 20.3 带条件过滤

```python
[表达式 for 变量 in 可迭代对象 if 条件]
```

```python
# 只取偶数的平方
even_squares = [i ** 2 for i in range(1, 11) if i % 2 == 0]
print(even_squares)
```

```
输出
[4, 16, 36, 64, 100]
```

### 20.4 对字符串使用

```python
sentence = "Hello World from Python"
words = sentence.split()
lengths = [len(w) for w in words]
print(lengths)

long_words = [w for w in words if len(w) > 4]
print(long_words)
```

```
输出
[5, 5, 4, 6]
['Hello', 'World', 'Python']
```

---

## Part 21　常用标准库

Python 内置了大量标准库。常用的有 `math`、`random`、`collections`、`itertools`。

### 21.1 `math` 模块

```python
from math import sqrt, cos, sin, radians, pi

print(sqrt(16))              # 平方根
print(round(pi, 4))         # 圆周率
print(cos(radians(60)))      # 60 度的余弦（先转弧度）
print(sin(radians(30)))      # 30 度的正弦
```

```
输出
4.0
3.1416
0.5000000000000001
0.49999999999999994
```

### 21.2 `random` 模块

```python
from random import randint, choice, shuffle

print(randint(1, 6))         # 1~6 的随机整数（含两端）

fruits = ["apple", "banana", "cherry"]
print(choice(fruits))        # 随机选一个

nums = [1, 2, 3, 4, 5]
shuffle(nums)                # 就地打乱
print(nums)
```

```
输出（示例，每次运行不同）
4
banana
[3, 1, 5, 2, 4]
```

### 21.3 `collections.defaultdict`

`defaultdict` 是字典的增强版：访问不存在的键时自动创建默认值，省去了每次检查的麻烦：

```python
from collections import defaultdict

# 统计词频（普通字典需要先检查键是否存在）
text = "the cat sat on the mat the cat"
count = defaultdict(int)      # 默认值为 0

for word in text.split():
    count[word] += 1          # 不存在的键直接 +1，不报错

print(dict(count))
```

```
输出
{'the': 3, 'cat': 2, 'sat': 1, 'on': 1, 'mat': 1}
```

### 21.4 `itertools.permutations`

`permutations` 生成一个序列的所有排列：

```python
from itertools import permutations

items = ["A", "B", "C"]
for perm in permutations(items, 2):    # 取 2 个的排列
    print(perm)
```

```
输出
('A', 'B')
('A', 'C')
('B', 'A')
('B', 'C')
('C', 'A')
('C', 'B')
```

---

## Part 22　文件读写 —— File I/O

Python 可以读写文本文件，用 `open()` 函数打开文件，用 `with` 语句确保文件自动关闭。

### 22.1 读取文件

```python
with open("data.txt", "r") as f:
    content = f.read()          # 读取全部内容为一个字符串
print(content)
```

逐行读取：

```python
with open("data.txt", "r") as f:
    for line in f:
        print(line.strip())     # strip() 去除行尾换行符
```

假设 `data.txt` 内容为：

```
Hello
World
Python
```

```
输出
Hello
World
Python
```

### 22.2 写入文件

```python
with open("output.txt", "w") as f:   # "w" 模式会覆盖原文件
    f.write("第一行\n")
    f.write("第二行\n")
```

追加模式（不覆盖，在末尾添加）：

```python
with open("output.txt", "a") as f:   # "a" = append
    f.write("第三行\n")
```

### 22.3 合并两个文件

```python
def concatenate(file1, file2, output):
    with open(file1, "r") as f1, open(file2, "r") as f2:
        content = f1.read() + f2.read()
    with open(output, "w") as out:
        out.write(content)
```

> **提示**：`with` 语句结束后，文件会**自动关闭**，不需要手动调用 `f.close()`。这是推荐写法。

---

## Part 23　CSV 文件处理

CSV（Comma-Separated Values）是最常见的数据文件格式，Python 内置 `csv` 模块处理它。

### 23.1 读取 CSV

假设有 `students.csv`：

```
name,age,score
Alice,20,90
Bob,21,85
Carol,19,92
```

```python
import csv

with open("students.csv", "r") as f:
    reader = csv.reader(f)
    header = next(reader)       # 读取第一行（表头）
    print("表头：", header)

    for row in reader:
        print(row)
```

```
输出
表头：['name', 'age', 'score']
['Alice', '20', '90']
['Bob', '21', '85']
['Carol', '19', '92']
```

> **注意**：`csv.reader` 读取的每一行都是字符串列表，数字也是字符串，需要 `int()` / `float()` 转换。

### 23.2 写入 CSV

```python
import csv

data = [
    ["name", "score"],
    ["Alice", 90],
    ["Bob", 85],
]

with open("output.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerows(data)
```

> **提示**：写入 CSV 时加 `newline=""` 可以避免 Windows 下出现多余空行。

### 23.3 排序 CSV 数据

```python
import csv

def sort_csv(input_file, output_file):
    with open(input_file, "r") as f:
        reader = csv.reader(f)
        header = next(reader)
        rows = list(reader)

    rows.sort(key=lambda row: row[0])   # 按第一列排序

    with open(output_file, "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(header)
        writer.writerows(rows)
```

---

## Part 24　异常处理 —— `try` / `except` / `raise` / `assert`

程序运行时可能遇到各种错误（异常）。异常处理让程序能优雅地应对错误，而不是直接崩溃。

### 24.1 基本结构

```python
try:
    可能出错的代码
except 错误类型:
    出错时执行这里
```

### 24.2 捕获常见异常

```python
try:
    x = int(input("输入一个整数："))
    print(f"你输入了 {x}")
except ValueError:
    print("输入无效，不是整数！")
```

```
用户输入：hello
输出：输入无效，不是整数！
```

### 24.3 捕获多种异常

```python
try:
    result = 10 / int(input("除数："))
    print(result)
except ValueError:
    print("不是有效数字")
except ZeroDivisionError:
    print("不能除以零")
```

### 24.4 常见异常类型

| 异常类型            | 触发场景                          |
|---------------------|-----------------------------------|
| `ValueError`        | 类型转换失败（如 `int("abc")`）   |
| `ZeroDivisionError` | 除以零                            |
| `IndexError`        | 列表索引越界                      |
| `KeyError`          | 字典访问不存在的键                |
| `FileNotFoundError` | 打开不存在的文件                  |
| `IOError`           | 文件读写错误                      |
| `StopIteration`     | 迭代器耗尽                        |

### 24.5 `raise` 主动抛出异常

```python
def check_age(age):
    if age < 0:
        raise ValueError("年龄不能为负数！")
    return age

try:
    check_age(-5)
except ValueError as e:
    print(f"错误：{e}")
```

```
输出
错误：年龄不能为负数！
```

### 24.6 `assert` 断言

`assert` 用于在代码中设置"必须满足的条件"，条件为假时抛出 `AssertionError`：

```python
def divide(a, b):
    assert b != 0, "除数不能为零"
    return a / b

print(divide(10, 2))
print(divide(10, 0))    # 触发 AssertionError
```

```
输出
5.0
AssertionError: 除数不能为零
```

> **提示**：`assert` 主要用于开发阶段的调试和测试。生产代码中应该用 `if` + `raise` 做参数检查。

---

## Part 25　递归 —— Recursion

递归是函数**调用自身**的技术。每个递归函数必须有：
1. **基本情况（Base Case）**：不再递归，直接返回结果
2. **递归情况（Recursive Case）**：把问题缩小，然后调用自身

### 25.1 一句话理解

递归 = 把大问题拆成同类的小问题，直到小到可以直接回答。

### 25.2 经典示例：阶乘

```python
def factorial(n):
    if n <= 1:        # 基本情况
        return 1
    return n * factorial(n - 1)    # 递归情况

print(factorial(5))
```

执行过程：`factorial(5)` → `5 × factorial(4)` → `5 × 4 × factorial(3)` → ... → `5 × 4 × 3 × 2 × 1`

```
输出
120
```

### 25.3 在列表中查找元素

```python
def contains(lst, target):
    if not lst:              # 基本情况：空列表
        return False
    if lst[0] == target:    # 基本情况：找到了
        return True
    return contains(lst[1:], target)   # 递归：去掉第一个，继续查找

print(contains([1, 2, 3, 4], 3))
print(contains([1, 2, 3, 4], 9))
```

```
输出
True
False
```

### 25.4 单次递归调用

```python
def longest_word(words):
    if len(words) == 1:
        return words[0]
    best_rest = longest_word(words[1:])
    return words[0] if len(words[0]) >= len(best_rest) else best_rest

print(longest_word(["cat", "elephant", "dog"]))
```

```
输出
elephant
```

### 25.5 两次递归调用（分治）

每次递归分成两半处理，是"分治"策略的体现：

```python
def longest_word_dc(words):
    if not words:
        return None
    if len(words) == 1:
        return words[0]
    mid = len(words) // 2
    left = longest_word_dc(words[:mid])
    right = longest_word_dc(words[mid:])
    return left if len(left) >= len(right) else right

print(longest_word_dc(["cat", "elephant", "dog", "butterfly"]))
```

```
输出
butterfly
```

### 25.6 递归 vs 循环的选择

| 情况                           | 推荐   |
|--------------------------------|--------|
| 问题自然地分解成同类子问题     | 递归   |
| 简单重复操作，循环更直观       | 循环   |
| 树形结构、嵌套结构             | 递归   |

---

## Part 26　调试技巧

调试（Debugging）是找出并修正代码错误的过程。掌握调试技巧是编程能力的重要部分。

### 26.1 `print` 调试法

最简单的调试方式：在关键位置插入 `print`，检查变量的值：

```python
def buggy_sum(lst):
    total = 0
    for i in lst:
        print(f"当前 i={i}, total={total}")   # 调试用
        total += i
    return total
```

### 26.2 常见错误类型

| 错误类型         | 含义                         | 示例                              |
|------------------|------------------------------|-----------------------------------|
| `SyntaxError`    | 语法错误，代码写错了         | 忘记冒号、括号不匹配              |
| `IndentationError`| 缩进错误                    | 混用空格和 Tab                    |
| `NameError`      | 使用了未定义的变量           | `print(x)` 但 x 没有赋值         |
| `TypeError`      | 类型不匹配                   | `"hello" + 5`                     |
| `IndexError`     | 索引越界                     | `lst[10]` 但列表只有 5 个元素     |
| `LogicError`     | 逻辑错误（不报错但结果错）   | 把 `>` 写成了 `>=`                |

### 26.3 缩进问题（Python 特有）

Python 用缩进表示代码块，缩进错误会导致逻辑错误：

```python
# 错误：循环体没有缩进，print 不在 for 里
for i in range(3):
    pass
print(i)    # 只打印一次，不是 3 次

# 正确：print 在循环体内
for i in range(3):
    print(i)    # 打印 3 次
```

### 26.4 边界条件检查

```python
def get_middle(lst):
    mid = len(lst) // 2
    return lst[mid]

# 测试各种边界情况
print(get_middle([1]))          # 只有一个元素
print(get_middle([1, 2]))       # 两个元素
print(get_middle([1, 2, 3]))    # 三个元素
```

```
输出
1
2
2
```

---

## Part 27　实用技巧汇总

### 27.1 交换两个变量

Python 可以不用临时变量，直接交换：

```python
a, b = 5, 10
a, b = b, a          # Python 独特的优雅写法
print(a, b)
```

```
输出
10 5
```

### 27.2 解包（Unpacking）

```python
# 列表解包
first, *rest = [1, 2, 3, 4, 5]
print(first)    # 1
print(rest)     # [2, 3, 4, 5]

# 元组解包
x, y = (10, 20)
print(x, y)
```

```
输出
1
[2, 3, 4, 5]
10 20
```

### 27.3 `any()` 和 `all()`

```python
nums = [2, 4, 6, 8]
print(all(n % 2 == 0 for n in nums))   # 全部是偶数？
print(any(n > 5 for n in nums))         # 有任意一个 > 5？
```

```
输出
True
True
```

### 27.4 `zip()` 并行遍历

```python
names = ["Alice", "Bob", "Carol"]
scores = [90, 85, 92]

for name, score in zip(names, scores):
    print(f"{name}: {score}")
```

```
输出
Alice: 90
Bob: 85
Carol: 92
```

### 27.5 字符串 `join` vs `+` 拼接

在循环中拼接字符串，用 `join` 比 `+` 高效：

```python
words = ["Hello", "World", "from", "Python"]

# 慢（每次 + 都创建新字符串）
result = ""
for w in words:
    result += w + " "

# 快（推荐）
result = " ".join(words)
print(result)
```

```
输出
Hello World from Python
```

### 27.6 Python 执行流程心智模型

理解一段 Python 代码的执行顺序：

```
1. 从上到下顺序执行
2. 遇到 if/elif/else → 根据条件选择分支
3. 遇到 for/while → 重复执行循环体
4. 遇到 def → 定义函数（不执行）
5. 遇到函数调用 f() → 跳入函数体执行，遇到 return 回来
6. 遇到 try → 尝试执行，出错就跳到 except
```

---

*Python 语法大全 · 用例子学 Python*
