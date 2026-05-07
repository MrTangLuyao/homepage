LEARN.lesson('python', 68, `
@@chapterRef python-tute-3
@@difficulty:zh 终极Boss
@@difficulty:en Final Boss
@@intro:zh
<p class="lead">这是<strong>终极 Boss 关</strong>，模拟真实工作中常见的<strong>销售数据分析</strong>任务——类似 Excel 透视表或数据库聚合查询。数据是一组销售流水记录，每条记录包含（月份、销售员、产品、数量、单价）：</p>
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
<p>报告格式已在 starter 中实现（排序、百分比、进度条字符画），你只需完成三个核心函数。这道题约 80 行，综合运用了本课程所有核心技术——完成它意味着你已经掌握了 Python 基础语法的全部内容。</p>
@@intro:en
<p class="lead">This is the <strong>Final Boss</strong>, simulating a real-world <strong>sales data analysis</strong> task — similar to an Excel pivot table or a database aggregate query. The data is a list of sales transactions, each containing (month, salesperson, product, quantity, unit price):</p>
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
<p>The report formatting is already implemented in the starter (sorting, percentages, bar charts). You just need to complete the three core functions. This problem is about 80 lines and uses every core technique from the course — completing it means you have mastered the fundamentals of Python.</p>
@@task:zh 实现三个核心函数，打印按销售员/产品/月份/整体的完整销售报告。
@@task:en
Implement the three core functions and print a complete sales report broken down by salesperson, product, monthly trend, and overall statistics.
@@hint:zh
revenue_by(field_idx)：遍历 transactions，key=t[field_idx]，rev=t[3]*t[4]；top_by_month：两级字典嵌套；overall_stats：列表推导式 + max + next(generator)。
@@hint:en
revenue_by(field_idx): iterate transactions, key=t[field_idx], rev=t[3]*t[4]; top_by_month: two-level nested dict; overall_stats: list comprehension + max + next(generator).
@@starter:zh
transactions = [
    ("2026-01", "Alice", "Laptop",  2, 1200),
    ("2026-01", "Bob",   "Phone",   5,  800),
    ("2026-01", "Alice", "Tablet",  3,  450),
    ("2026-01", "Carol", "Laptop",  1, 1200),
    ("2026-02", "Bob",   "Laptop",  3, 1200),
    ("2026-02", "Alice", "Phone",   4,  800),
    ("2026-02", "Carol", "Tablet",  6,  450),
    ("2026-02", "Carol", "Phone",   2,  800),
    ("2026-03", "Alice", "Laptop",  4, 1200),
    ("2026-03", "Bob",   "Tablet",  2,  450),
    ("2026-03", "Carol", "Laptop",  2, 1200),
    ("2026-03", "Alice", "Phone",   3,  800),
]

def revenue_by(field_idx):
    """按 transactions 的某一字段聚合总营收"""
    pass

def top_by_month():
    """返回 {月份: (销售员, 营收)} 每月营收第一"""
    pass

def overall_stats():
    """返回 (总营收, 平均单笔, 最大单笔营收, 最大单笔交易元组)"""
    pass

print("=== Revenue by Salesperson ===")
by_person = revenue_by(1)
for person, rev in sorted(by_person.items(), key=lambda x: -x[1]):
    pct = rev / sum(by_person.values()) * 100
    print(f"  {person.ljust(8)}: \${rev}  ({pct:.1f}%)")
print()
print("=== Revenue by Product ===")
by_product = revenue_by(2)
for prod, rev in sorted(by_product.items(), key=lambda x: -x[1]):
    print(f"  {prod.ljust(8)}: \${rev}")
print()
print("=== Monthly Revenue Trend ===")
by_month = revenue_by(0)
for month in sorted(by_month):
    rev = by_month[month]
    bar = "#" * (rev // 1000)
    print(f"  {month}: \${rev}  {bar}")
print()
print("=== Top Salesperson per Month ===")
tops = top_by_month()
for month in sorted(tops):
    person, rev = tops[month]
    print(f"  {month}: {person} (\${rev})")
print()
total, avg, max_rev, max_t = overall_stats()
print("=== Overall Stats ===")
print(f"  Total revenue : \${total}")
print(f"  Avg per sale  : \${avg:.1f}")
print(f"  Biggest sale  : \${max_rev} ({max_t[1]}, {max_t[2]}, {max_t[3]} units)")

@@starter:en
transactions = [
    ("2026-01", "Alice", "Laptop",  2, 1200),
    ("2026-01", "Bob",   "Phone",   5,  800),
    ("2026-01", "Alice", "Tablet",  3,  450),
    ("2026-01", "Carol", "Laptop",  1, 1200),
    ("2026-02", "Bob",   "Laptop",  3, 1200),
    ("2026-02", "Alice", "Phone",   4,  800),
    ("2026-02", "Carol", "Tablet",  6,  450),
    ("2026-02", "Carol", "Phone",   2,  800),
    ("2026-03", "Alice", "Laptop",  4, 1200),
    ("2026-03", "Bob",   "Tablet",  2,  450),
    ("2026-03", "Carol", "Laptop",  2, 1200),
    ("2026-03", "Alice", "Phone",   3,  800),
]

def revenue_by(field_idx):
    """Aggregate total revenue by one field of transactions"""
    pass

def top_by_month():
    """Return {month: (salesperson, revenue)} for the top earner each month"""
    pass

def overall_stats():
    """Return (total, avg_per_sale, max_single_rev, max_transaction_tuple)"""
    pass

print("=== Revenue by Salesperson ===")
by_person = revenue_by(1)
for person, rev in sorted(by_person.items(), key=lambda x: -x[1]):
    pct = rev / sum(by_person.values()) * 100
    print(f"  {person.ljust(8)}: \${rev}  ({pct:.1f}%)")
print()
print("=== Revenue by Product ===")
by_product = revenue_by(2)
for prod, rev in sorted(by_product.items(), key=lambda x: -x[1]):
    print(f"  {prod.ljust(8)}: \${rev}")
print()
print("=== Monthly Revenue Trend ===")
by_month = revenue_by(0)
for month in sorted(by_month):
    rev = by_month[month]
    bar = "#" * (rev // 1000)
    print(f"  {month}: \${rev}  {bar}")
print()
print("=== Top Salesperson per Month ===")
tops = top_by_month()
for month in sorted(tops):
    person, rev = tops[month]
    print(f"  {month}: {person} (\${rev})")
print()
total, avg, max_rev, max_t = overall_stats()
print("=== Overall Stats ===")
print(f"  Total revenue : \${total}")
print(f"  Avg per sale  : \${avg:.1f}")
print(f"  Biggest sale  : \${max_rev} ({max_t[1]}, {max_t[2]}, {max_t[3]} units)")

@@answer
transactions = [
    ("2026-01", "Alice", "Laptop",  2, 1200),
    ("2026-01", "Bob",   "Phone",   5,  800),
    ("2026-01", "Alice", "Tablet",  3,  450),
    ("2026-01", "Carol", "Laptop",  1, 1200),
    ("2026-02", "Bob",   "Laptop",  3, 1200),
    ("2026-02", "Alice", "Phone",   4,  800),
    ("2026-02", "Carol", "Tablet",  6,  450),
    ("2026-02", "Carol", "Phone",   2,  800),
    ("2026-03", "Alice", "Laptop",  4, 1200),
    ("2026-03", "Bob",   "Tablet",  2,  450),
    ("2026-03", "Carol", "Laptop",  2, 1200),
    ("2026-03", "Alice", "Phone",   3,  800),
]

def revenue_by(field_idx):
    agg = {}
    for t in transactions:
        key = t[field_idx]
        agg[key] = agg.get(key, 0) + t[3] * t[4]
    return agg

def top_by_month():
    monthly = {}
    for month, person, product, qty, price in transactions:
        if month not in monthly:
            monthly[month] = {}
        monthly[month][person] = monthly[month].get(person, 0) + qty * price
    result = {}
    for month, people in monthly.items():
        top_person = max(people, key=lambda p: people[p])
        result[month] = (top_person, people[top_person])
    return result

def overall_stats():
    revenues = [t[3] * t[4] for t in transactions]
    total = sum(revenues)
    avg = total / len(revenues)
    max_rev = max(revenues)
    max_t = next(t for t in transactions if t[3] * t[4] == max_rev)
    return total, avg, max_rev, max_t

print("=== Revenue by Salesperson ===")
by_person = revenue_by(1)
for person, rev in sorted(by_person.items(), key=lambda x: -x[1]):
    pct = rev / sum(by_person.values()) * 100
    print(f"  {person.ljust(8)}: \${rev}  ({pct:.1f}%)")
print()
print("=== Revenue by Product ===")
by_product = revenue_by(2)
for prod, rev in sorted(by_product.items(), key=lambda x: -x[1]):
    print(f"  {prod.ljust(8)}: \${rev}")
print()
print("=== Monthly Revenue Trend ===")
by_month = revenue_by(0)
for month in sorted(by_month):
    rev = by_month[month]
    bar = "#" * (rev // 1000)
    print(f"  {month}: \${rev}  {bar}")
print()
print("=== Top Salesperson per Month ===")
tops = top_by_month()
for month in sorted(tops):
    person, rev = tops[month]
    print(f"  {month}: {person} (\${rev})")
print()
total, avg, max_rev, max_t = overall_stats()
print("=== Overall Stats ===")
print(f"  Total revenue : \${total}")
print(f"  Avg per sale  : \${avg:.1f}")
print(f"  Biggest sale  : \${max_rev} ({max_t[1]}, {max_t[2]}, {max_t[3]} units)")

@@expectedOutput
=== Revenue by Salesperson ===
  Alice   : $14150  (46.3%)
  Bob     : $8500  (27.8%)
  Carol   : $7900  (25.9%)

=== Revenue by Product ===
  Laptop  : $14400
  Phone   : $11200
  Tablet  : $4950

=== Monthly Revenue Trend ===
  2026-01: $8950  ########
  2026-02: $11100  ###########
  2026-03: $10500  ##########

=== Top Salesperson per Month ===
  2026-01: Bob ($4000)
  2026-02: Carol ($4300)
  2026-03: Alice ($7200)

=== Overall Stats ===
  Total revenue : $30550
  Avg per sale  : $2545.8
  Biggest sale  : $4800 (Alice, Laptop, 4 units)
`);
