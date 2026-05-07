LEARN.lesson('python', 65, `
@@chapterRef python-tute-3
@@difficulty:zh Boss
@@difficulty:en Boss
@@intro:zh
<p class="lead">这是一道综合性系统设计题，模拟真实世界的<strong>图书馆管理系统</strong>。你需要设计数据结构并实现增删查改操作——这与实际开发中的后端 CRUD 系统逻辑完全一致。</p>
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
</ul>
@@intro:en
<p class="lead">This is a comprehensive system design problem simulating a real-world <strong>library management system</strong>. You design the data structure and implement CRUD operations — the same logic that drives real backend systems.</p>
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
</ul>
@@task:zh 实现所有函数并通过完整测试序列产生预期输出。try/except 必须用于捕获借出失败异常。
@@task:en
Implement all functions and produce the expected output from the complete test sequence. try/except is required to catch checkout failure.
@@hint:zh
library 字典每个值：{"title","author","year","copies","out"}；available = copies - out；bar = "[" + "#"*available + "."*out + "]"。
@@hint:en
Each library entry: {"title","author","year","copies","out"}; available = copies - out; bar = "[" + "#"*available + "."*out + "]".
@@starter:zh
library = {}

def add_book(title, author, year, copies=1):
    pass  # 返回 "Added 'X'" 或 "Updated 'X': N copies total"

def checkout(title):
    pass  # 返回 "Checked out 'X' (N left)"，无库存 raise ValueError

def return_book(title):
    pass  # 返回 "Returned 'X' (N left)"

def search(query):
    pass  # 按书名/作者模糊搜索，年份升序

def report():
    books = sorted(library.values(), key=lambda b: b["title"])
    total = sum(b["copies"] for b in books)
    out_total = sum(b["out"] for b in books)
    print(f"=== Library Report ({len(books)} titles, {total} copies) ===")
    for b in books:
        avail = b["copies"] - b["out"]
        bar = "[" + "#" * avail + "." * b["out"] + "]"
        print(f"  {b['title']} ({b['year']}) by {b['author']} — {avail}/{b['copies']} {bar}")
    print(f"  Checked out: {out_total}/{total}")

print(add_book("Dune", "Herbert", 1965, 3))
print(add_book("Foundation", "Asimov", 1951, 2))
print(add_book("Neuromancer", "Gibson", 1984, 1))
print(add_book("Dune", "Herbert", 1965, 2))
print()
for _ in range(5):
    print(checkout("Dune"))
try:
    print(checkout("Dune"))
except ValueError as e:
    print(f"Error: {e}")
print()
print(return_book("Dune"))
print()
print("Search 'asim':")
for b in search("asim"):
    print(f"  {b['title']} by {b['author']} ({b['year']})")
print()
report()

@@starter:en
library = {}

def add_book(title, author, year, copies=1):
    pass  # return "Added 'X'" or "Updated 'X': N copies total"

def checkout(title):
    pass  # return "Checked out 'X' (N left)"; raise ValueError if none available

def return_book(title):
    pass  # return "Returned 'X' (N left)"

def search(query):
    pass  # fuzzy search by title/author, sorted by year

def report():
    books = sorted(library.values(), key=lambda b: b["title"])
    total = sum(b["copies"] for b in books)
    out_total = sum(b["out"] for b in books)
    print(f"=== Library Report ({len(books)} titles, {total} copies) ===")
    for b in books:
        avail = b["copies"] - b["out"]
        bar = "[" + "#" * avail + "." * b["out"] + "]"
        print(f"  {b['title']} ({b['year']}) by {b['author']} — {avail}/{b['copies']} {bar}")
    print(f"  Checked out: {out_total}/{total}")

print(add_book("Dune", "Herbert", 1965, 3))
print(add_book("Foundation", "Asimov", 1951, 2))
print(add_book("Neuromancer", "Gibson", 1984, 1))
print(add_book("Dune", "Herbert", 1965, 2))
print()
for _ in range(5):
    print(checkout("Dune"))
try:
    print(checkout("Dune"))
except ValueError as e:
    print(f"Error: {e}")
print()
print(return_book("Dune"))
print()
print("Search 'asim':")
for b in search("asim"):
    print(f"  {b['title']} by {b['author']} ({b['year']})")
print()
report()

@@answer
library = {}

def add_book(title, author, year, copies=1):
    key = title.lower()
    if key in library:
        library[key]["copies"] += copies
        return f"Updated '{title}': {library[key]['copies']} copies total"
    library[key] = {"title": title, "author": author, "year": year,
                    "copies": copies, "out": 0}
    return f"Added '{title}'"

def checkout(title):
    key = title.lower()
    b = library.get(key)
    if b is None:
        raise ValueError(f"'{title}' not in library")
    avail = b["copies"] - b["out"]
    if avail == 0:
        raise ValueError(f"No copies of '{title}' available")
    b["out"] += 1
    return f"Checked out '{title}' ({b['copies'] - b['out']} left)"

def return_book(title):
    key = title.lower()
    b = library.get(key)
    if b is None or b["out"] == 0:
        raise ValueError(f"No copies of '{title}' to return")
    b["out"] -= 1
    return f"Returned '{title}' ({b['copies'] - b['out']} left)"

def search(query):
    q = query.lower()
    results = [b for b in library.values()
               if q in b["title"].lower() or q in b["author"].lower()]
    return sorted(results, key=lambda b: b["year"])

def report():
    books = sorted(library.values(), key=lambda b: b["title"])
    total = sum(b["copies"] for b in books)
    out_total = sum(b["out"] for b in books)
    print(f"=== Library Report ({len(books)} titles, {total} copies) ===")
    for b in books:
        avail = b["copies"] - b["out"]
        bar = "[" + "#" * avail + "." * b["out"] + "]"
        print(f"  {b['title']} ({b['year']}) by {b['author']} — {avail}/{b['copies']} {bar}")
    print(f"  Checked out: {out_total}/{total}")

print(add_book("Dune", "Herbert", 1965, 3))
print(add_book("Foundation", "Asimov", 1951, 2))
print(add_book("Neuromancer", "Gibson", 1984, 1))
print(add_book("Dune", "Herbert", 1965, 2))
print()
for _ in range(5):
    print(checkout("Dune"))
try:
    print(checkout("Dune"))
except ValueError as e:
    print(f"Error: {e}")
print()
print(return_book("Dune"))
print()
print("Search 'asim':")
for b in search("asim"):
    print(f"  {b['title']} by {b['author']} ({b['year']})")
print()
report()

@@expectedOutput
Added 'Dune'
Added 'Foundation'
Added 'Neuromancer'
Updated 'Dune': 5 copies total

Checked out 'Dune' (4 left)
Checked out 'Dune' (3 left)
Checked out 'Dune' (2 left)
Checked out 'Dune' (1 left)
Checked out 'Dune' (0 left)
Error: No copies of 'Dune' available

Returned 'Dune' (1 left)

Search 'asim':
  Foundation by Asimov (1951)

=== Library Report (3 titles, 8 copies) ===
  Dune (1965) by Herbert — 1/5 [#....]
  Foundation (1951) by Asimov — 2/2 [##]
  Neuromancer (1984) by Gibson — 1/1 [#]
  Checked out: 4/8
`);
