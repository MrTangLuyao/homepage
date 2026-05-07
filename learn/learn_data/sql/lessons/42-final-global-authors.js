LEARN.lesson('sql', 42, `
@@schema final_schema
@@expectedSql
SELECT a.id, a.name, COUNT(DISTINCT m.country) AS distinct_countries
FROM authors a
JOIN books b   ON b.author_id = a.id
JOIN copies c  ON c.book_id   = b.id
JOIN loans l   ON l.copy_id   = c.id
JOIN members m ON m.id        = l.member_id
GROUP BY a.id, a.name
HAVING COUNT(DISTINCT m.country) >= 3
@@checkOrder false
@@tables authors, books, copies, loans, members
@@difficulty:zh 进阶
@@difficulty:en Advanced
@@intro:zh
<p class="lead">综合大题最后一关 —— 链上五张表，HAVING 里用 <code>COUNT(DISTINCT)</code> 做去重计数。</p>
<p>路径：<code>authors → books → copies → loans → members</code>，从 author 一路连到借阅这本书的会员，最后看会员的 <code>country</code>。</p>
<p>同一作者可能写过多本书、每本被多人借过 —— <strong>笛卡尔积会让同一个国家被数多次</strong>，必须用 <code>COUNT(DISTINCT m.country)</code>，不能用 <code>COUNT(*)</code>。</p>
@@intro:en
<p class="lead">The final synthesis — five-table JOIN chain, HAVING with <code>COUNT(DISTINCT)</code>.</p>
<p>The path: <code>authors → books → copies → loans → members</code>. Land on the borrowing member, look at their <code>country</code>.</p>
<p>One author can have many books, each loaned by many members — the <strong>Cartesian explosion will count the same country many times</strong> unless you use <code>COUNT(DISTINCT m.country)</code>, never <code>COUNT(*)</code>.</p>
@@task:zh
查出<strong>书被来自至少 3 个不同国家的会员借阅</strong>过的作者。返回三列：<code>id</code>、<code>name</code>、<code>distinct_countries</code>（该作者的书的借阅人来自的不同国家数）。
@@task:en
Find every author whose books have been <strong>borrowed by members from at least 3 distinct countries</strong>. Three columns: <code>id</code>, <code>name</code>, <code>distinct_countries</code>.
@@hint:zh 5 表 JOIN 串联 + GROUP BY a.id, a.name + HAVING COUNT(DISTINCT m.country) &gt;= 3。
@@hint:en Chain all 5 tables with JOINs, GROUP BY a.id, a.name, HAVING COUNT(DISTINCT m.country) >= 3.
@@starter:zh
@@starter:en`);
