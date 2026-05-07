LEARN.lesson('python', 20, `
@@chapterRef python-tute-1
@@difficulty:zh 入门
@@difficulty:en Beginner
@@intro:zh
<p class="lead">当需要判断多个互斥情况时，用 <code>elif</code>（else if 的缩写）链式添加分支。Python 从上往下检查，<strong>执行第一个条件为真的分支</strong>，然后跳过剩余所有分支。</p>
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
</ul>
@@intro:en
<p class="lead">When you need to check multiple mutually exclusive cases, chain branches with <code>elif</code> (short for else if). Python checks top-to-bottom and <strong>runs the first branch whose condition is true</strong>, then skips all the rest.</p>
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
</ul>
@@task:zh 用 <code>input("Score: ")</code> 读取成绩，输出等级 A/B/C/D/F（≥90/≥80/≥70/≥60/其余）
@@task:en Use <code>input("Score: ")</code> to read a score, print grade A (≥90), B (≥80), C (≥70), D (≥60), F (otherwise)
@@hint:zh 从最高分段开始 if，依次 elif，最后 else。
@@hint:en Start with the highest band as if, then elif for each lower band.
@@starter:zh
score = int(input("Score: "))
# 判断等级

@@starter:en
score = int(input("Score: "))
# determine the grade

@@answer
score = int(input("Score: "))
if score >= 90:
    print("A")
elif score >= 80:
    print("B")
elif score >= 70:
    print("C")
elif score >= 60:
    print("D")
else:
    print("F")

@@expectedOutput
B

@@testInputs
85`);
