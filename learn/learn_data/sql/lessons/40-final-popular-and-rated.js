LEARN.lesson('sql', 40, `
@@schema final_schema
@@expectedSql
SELECT b.id, b.title,
  (SELECT COUNT(*) FROM loans l JOIN copies c ON c.id = l.copy_id WHERE c.book_id = b.id) AS loan_count,
  (SELECT AVG(r.rating) FROM reviews r WHERE r.book_id = b.id) AS avg_rating
FROM books b
WHERE (SELECT COUNT(*) FROM loans l JOIN copies c ON c.id = l.copy_id WHERE c.book_id = b.id) >= 4
  AND (SELECT AVG(r.rating) FROM reviews r WHERE r.book_id = b.id) >= 4.0
@@checkOrder false
@@tables books, copies, loans, reviews
@@difficulty:zh 进阶
@@difficulty:en Advanced
@@intro:zh
<p class="lead">两个独立指标都要满足：「借阅次数 ≥ N」<strong>且</strong>「平均评分 ≥ M」。</p>
<p>用 <strong>JOIN + GROUP BY + DISTINCT</strong> 容易踩「笛卡尔积让 AVG 失真」的坑（评价记录被借阅笛卡尔重复一次，AVG 仍正确，但 COUNT 会被放大）。</p>
<p>更稳妥：<strong>每个指标用一个独立的标量子查询</strong>，主查询从 books 出发，分别投影。</p>
@@intro:en
<p class="lead">Two independent metrics, both required: "loaned ≥ N times" <strong>AND</strong> "average rating ≥ M".</p>
<p>JOIN + GROUP BY easily hits the "cartesian product inflates COUNT" pitfall when the same book has many loans <em>and</em> many reviews.</p>
<p>Cleaner: <strong>compute each metric in its own scalar subquery</strong>, main query iterates over books.</p>
@@task:zh
查出<strong>被借阅至少 4 次</strong> 且 <strong>评价平均分 &ge; 4.0</strong> 的书。返回四列：<code>id</code>、<code>title</code>、<code>loan_count</code>、<code>avg_rating</code>。
@@task:en
Find books with <strong>≥ 4 total loans</strong> AND <strong>average rating ≥ 4.0</strong>. Four columns: <code>id</code>, <code>title</code>, <code>loan_count</code>, <code>avg_rating</code>.
@@hint:zh 主查询 FROM books；两个标量子查询：一个数 loans（JOIN copies），一个 AVG(rating)；WHERE 用同样的两个表达式。
@@hint:en
Main query FROM books; two scalar subqueries — one COUNT over loans/copies, one AVG(rating); WHERE repeats both with thresholds.
@@starter:zh
@@starter:en`);
