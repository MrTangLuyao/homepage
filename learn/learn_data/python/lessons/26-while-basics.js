LEARN.lesson('python', 26, `
@@chapterRef python-tute-2
@@difficulty:zh 入门
@@difficulty:en Beginner
@@intro:zh
<p class="lead"><code>while</code> 先检查条件，条件为真就执行循环体，执行完再回去检查……如此循环，直到条件为假才停止。</p>
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
print(i)   # 8  （8² = 64 > 50）</code></pre>
@@intro:en
<p class="lead"><code>while</code> checks the condition first, executes the body if true, then checks again — repeating until the condition is false.</p>
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
print(i)   # 8  (8² = 64 > 50)</code></pre>
@@task:zh 用 while 循环输出 1 到 5，每行一个数字
@@task:en Use a while loop to print 1 to 5, one number per line
@@hint:zh i = 1 开始，i <= 5 为条件，循环体里 i += 1。
@@hint:en Start with i = 1, condition i <= 5, increment i += 1 inside the loop.
@@starter:zh
# 用 while 输出 1 到 5

@@starter:en
# use while to print 1 to 5

@@answer
i = 1
while i <= 5:
    print(i)
    i += 1

@@expectedOutput
1
2
3
4
5
`);
