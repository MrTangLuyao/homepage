LEARN.lesson('python', 67, `
@@chapterRef python-tute-3
@@difficulty:zh Boss
@@difficulty:en Boss
@@intro:zh
<p class="lead">这道题模拟一个<strong>学生档案管理系统</strong>，综合运用列表过滤、字典聚合、排序和异常处理，是接近真实数据库查询的编程练习。</p>
<p>数据已给定：每位学生是一个字典，包含姓名、年级（9-12）、GPA（0.0-4.0）和社团列表。</p>
<p>需要实现 4 个函数：</p>
<ul>
<li><strong><code>search(grade, min_gpa, club)</code></strong>：多条件过滤，三个参数均可为 <code>None</code>（表示不过滤该条件）。用列表推导式逐个过滤，最终按 GPA 降序排序</li>
<li><strong><code>grade_report()</code></strong>：按年级分组统计——用集合推导式找出所有年级，逐年级计算人数、平均 GPA（保留 2 位小数）和 GPA 最高的学生</li>
<li><strong><code>club_report()</code></strong>：按社团分组统计——遍历所有学生的所有社团，建立社团→成员列表的字典，再计算每个社团的成员数和平均 GPA</li>
<li><strong><code>add_student(name, grade, gpa, clubs)</code></strong>：带数据校验的新增——GPA 不在 [0,4] 或年级不在 {9,10,11,12} 时 raise <code>ValueError</code>，校验通过后追加到 <code>students</code> 列表</li>
</ul>
@@intro:en
<p class="lead">This problem simulates a <strong>student records management system</strong>, combining list filtering, dictionary aggregation, sorting, and exception handling — close to how real database queries and backend logic work.</p>
<p>The data is given: each student is a dict with name, grade (9-12), GPA (0.0-4.0), and a list of clubs.</p>
<p>Four functions to implement:</p>
<ul>
<li><strong><code>search(grade, min_gpa, club)</code></strong>: multi-criteria filter where all three params can be <code>None</code> (meaning "no filter on that criterion"). Filter with list comprehensions, sort the result by GPA descending</li>
<li><strong><code>grade_report()</code></strong>: group by grade — use a set comprehension to find all grades, then for each compute count, average GPA (to 2 decimal places), and the top-GPA student</li>
<li><strong><code>club_report()</code></strong>: group by club — iterate all students' clubs to build a club→member-list dict, then compute member count and average GPA per club</li>
<li><strong><code>add_student(name, grade, gpa, clubs)</code></strong>: validated insert — raise <code>ValueError</code> if GPA is outside [0,4] or grade is not in {9,10,11,12}; otherwise append to <code>students</code></li>
</ul>
@@task:zh 实现所有函数，通过 starter 中的完整测试序列产生预期输出。
@@task:en Implement all functions and produce the expected output from the full test sequence in the starter.
@@hint:zh search 三个参数都可为 None（不过滤）；club_report 先遍历所有学生的所有社团建立 clubs 字典，再排序输出。
@@hint:en
search: all three params can be None (no filter); club_report: first iterate all students' clubs to build a dict, then sort and print.
@@starter:zh
students = [
    {"name": "Alice",  "grade": 10, "gpa": 3.8, "clubs": ["math", "science"]},
    {"name": "Bob",    "grade": 11, "gpa": 3.2, "clubs": ["art", "music"]},
    {"name": "Carol",  "grade": 10, "gpa": 3.9, "clubs": ["science", "debate"]},
    {"name": "David",  "grade": 12, "gpa": 2.7, "clubs": ["sports"]},
    {"name": "Eve",    "grade": 11, "gpa": 3.6, "clubs": ["math", "debate"]},
    {"name": "Frank",  "grade": 12, "gpa": 3.4, "clubs": ["science", "art"]},
    {"name": "Grace",  "grade": 10, "gpa": 3.1, "clubs": ["music", "sports"]},
]

def search(grade=None, min_gpa=None, club=None): pass
def grade_report(): pass
def club_report(): pass
def add_student(name, grade, gpa, clubs): pass

print("=== Grade 10 ===")
for s in search(grade=10):
    print(f"  {s['name']}: GPA {s['gpa']}, clubs: {', '.join(s['clubs'])}")
print()
print("=== Science, GPA >= 3.5 ===")
for s in search(min_gpa=3.5, club="science"):
    print(f"  {s['name']} (Grade {s['grade']}, GPA {s['gpa']})")
print()
print("=== Grade Report ===")
grade_report()
print()
print("=== Club Report ===")
club_report()
print()
try: print(add_student("Hank", 13, 3.5, ["math"]))
except ValueError as e: print(f"Error: {e}")
try: print(add_student("Iris", 11, 4.5, ["science"]))
except ValueError as e: print(f"Error: {e}")
try:
    print(add_student("Jack", 12, 3.8, ["debate"]))
    print(f"Now {len(students)} students")
except ValueError as e: print(f"Error: {e}")

@@starter:en
students = [
    {"name": "Alice",  "grade": 10, "gpa": 3.8, "clubs": ["math", "science"]},
    {"name": "Bob",    "grade": 11, "gpa": 3.2, "clubs": ["art", "music"]},
    {"name": "Carol",  "grade": 10, "gpa": 3.9, "clubs": ["science", "debate"]},
    {"name": "David",  "grade": 12, "gpa": 2.7, "clubs": ["sports"]},
    {"name": "Eve",    "grade": 11, "gpa": 3.6, "clubs": ["math", "debate"]},
    {"name": "Frank",  "grade": 12, "gpa": 3.4, "clubs": ["science", "art"]},
    {"name": "Grace",  "grade": 10, "gpa": 3.1, "clubs": ["music", "sports"]},
]

def search(grade=None, min_gpa=None, club=None): pass
def grade_report(): pass
def club_report(): pass
def add_student(name, grade, gpa, clubs): pass

print("=== Grade 10 ===")
for s in search(grade=10):
    print(f"  {s['name']}: GPA {s['gpa']}, clubs: {', '.join(s['clubs'])}")
print()
print("=== Science, GPA >= 3.5 ===")
for s in search(min_gpa=3.5, club="science"):
    print(f"  {s['name']} (Grade {s['grade']}, GPA {s['gpa']})")
print()
print("=== Grade Report ===")
grade_report()
print()
print("=== Club Report ===")
club_report()
print()
try: print(add_student("Hank", 13, 3.5, ["math"]))
except ValueError as e: print(f"Error: {e}")
try: print(add_student("Iris", 11, 4.5, ["science"]))
except ValueError as e: print(f"Error: {e}")
try:
    print(add_student("Jack", 12, 3.8, ["debate"]))
    print(f"Now {len(students)} students")
except ValueError as e: print(f"Error: {e}")

@@answer
students = [
    {"name": "Alice",  "grade": 10, "gpa": 3.8, "clubs": ["math", "science"]},
    {"name": "Bob",    "grade": 11, "gpa": 3.2, "clubs": ["art", "music"]},
    {"name": "Carol",  "grade": 10, "gpa": 3.9, "clubs": ["science", "debate"]},
    {"name": "David",  "grade": 12, "gpa": 2.7, "clubs": ["sports"]},
    {"name": "Eve",    "grade": 11, "gpa": 3.6, "clubs": ["math", "debate"]},
    {"name": "Frank",  "grade": 12, "gpa": 3.4, "clubs": ["science", "art"]},
    {"name": "Grace",  "grade": 10, "gpa": 3.1, "clubs": ["music", "sports"]},
]

def search(grade=None, min_gpa=None, club=None):
    res = students[:]
    if grade is not None:
        res = [s for s in res if s["grade"] == grade]
    if min_gpa is not None:
        res = [s for s in res if s["gpa"] >= min_gpa]
    if club is not None:
        res = [s for s in res if club in s["clubs"]]
    return sorted(res, key=lambda s: (-s["gpa"], s["name"]))

def grade_report():
    for g in sorted(set(s["grade"] for s in students)):
        grp = [s for s in students if s["grade"] == g]
        avg = sum(s["gpa"] for s in grp) / len(grp)
        top = max(grp, key=lambda s: s["gpa"])
        print(f"Grade {g}: {len(grp)} students, avg GPA {avg:.2f}, top: {top['name']} ({top['gpa']})")

def club_report():
    clubs = {}
    for s in students:
        for c in s["clubs"]:
            if c not in clubs:
                clubs[c] = []
            clubs[c].append(s["name"])
    for club, members in sorted(clubs.items()):
        avg = sum(s["gpa"] for s in students if club in s["clubs"]) / len(members)
        print(f"{club.ljust(10)}: {len(members)} members, avg GPA {avg:.2f} — {', '.join(sorted(members))}")

def add_student(name, grade, gpa, clubs):
    if not (0.0 <= gpa <= 4.0):
        raise ValueError(f"Invalid GPA: {gpa}")
    if grade not in [9, 10, 11, 12]:
        raise ValueError(f"Invalid grade: {grade}")
    students.append({"name": name, "grade": grade, "gpa": gpa, "clubs": clubs})
    return f"Added {name}"

print("=== Grade 10 ===")
for s in search(grade=10):
    print(f"  {s['name']}: GPA {s['gpa']}, clubs: {', '.join(s['clubs'])}")
print()
print("=== Science, GPA >= 3.5 ===")
for s in search(min_gpa=3.5, club="science"):
    print(f"  {s['name']} (Grade {s['grade']}, GPA {s['gpa']})")
print()
print("=== Grade Report ===")
grade_report()
print()
print("=== Club Report ===")
club_report()
print()
try: print(add_student("Hank", 13, 3.5, ["math"]))
except ValueError as e: print(f"Error: {e}")
try: print(add_student("Iris", 11, 4.5, ["science"]))
except ValueError as e: print(f"Error: {e}")
try:
    print(add_student("Jack", 12, 3.8, ["debate"]))
    print(f"Now {len(students)} students")
except ValueError as e: print(f"Error: {e}")

@@expectedOutput
=== Grade 10 ===
  Carol: GPA 3.9, clubs: science, debate
  Alice: GPA 3.8, clubs: math, science
  Grace: GPA 3.1, clubs: music, sports

=== Science, GPA >= 3.5 ===
  Carol (Grade 10, GPA 3.9)
  Alice (Grade 10, GPA 3.8)

=== Grade Report ===
Grade 10: 3 students, avg GPA 3.60, top: Carol (3.9)
Grade 11: 2 students, avg GPA 3.40, top: Eve (3.6)
Grade 12: 2 students, avg GPA 3.05, top: Frank (3.4)

=== Club Report ===
art       : 2 members, avg GPA 3.30 — Bob, Frank
debate    : 2 members, avg GPA 3.75 — Carol, Eve
math      : 2 members, avg GPA 3.70 — Alice, Eve
music     : 2 members, avg GPA 3.15 — Bob, Grace
science   : 3 members, avg GPA 3.70 — Alice, Carol, Frank
sports    : 2 members, avg GPA 2.90 — David, Grace

Error: Invalid grade: 13
Error: Invalid GPA: 4.5
Added Jack
Now 8 students
`);
