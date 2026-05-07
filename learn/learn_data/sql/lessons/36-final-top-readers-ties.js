LEARN.lesson('sql', 36, `
@@schema final_schema
@@expectedSql
SELECT m.id AS member_id, COUNT(DISTINCT b.author_id) AS distinct_authors
FROM members m
JOIN loans l  ON l.member_id = m.id
JOIN copies c ON c.id = l.copy_id
JOIN books b  ON b.id = c.book_id
GROUP BY m.id
HAVING COUNT(DISTINCT b.author_id) >= (
  SELECT da FROM (
    SELECT DISTINCT COUNT(DISTINCT b2.author_id) AS da
    FROM members m2
    JOIN loans l2  ON l2.member_id = m2.id
    JOIN copies c2 ON c2.id = l2.copy_id
    JOIN books b2  ON b2.id = c2.book_id
    GROUP BY m2.id
    ORDER BY da DESC
  )
  LIMIT 1 OFFSET 2
)
@@checkOrder false
@@tables members, books, copies, loans
@@difficulty:zh 进阶
@@difficulty:en Advanced
@@intro:zh
<p class="lead">「<strong>含并列</strong>」 是大坑 —— <code>LIMIT 3</code> 会粗暴砍掉并列的人。</p>
<p>正确思路：<strong>找到第 3 大的「不重复」计数</strong>，再用 HAVING 把所有 ≥ 这个值的人都返回。</p>
<pre><code>HAVING COUNT(DISTINCT ...) &gt;= (
  /* 第 3 大的不重复计数 */
  SELECT da FROM (
    SELECT DISTINCT COUNT(DISTINCT ...) AS da
    FROM ... GROUP BY ...
    ORDER BY da DESC
  )
  LIMIT 1 OFFSET 2
)</code></pre>
<p>如果第 1、2、3 名分别是 7、4、4，<strong>不重复</strong>的计数是 {7, 4}，第 3 大不存在 —— 所以这一题<strong>题目假定至少 3 个不同的计数值</strong>。</p>
<blockquote>这道题对应 PDF 第 7 题。</blockquote>
@@intro:en
<p class="lead">"<strong>Including ties</strong>" is the trap — <code>LIMIT 3</code> blindly cuts off tied rows.</p>
<p>Correct approach: <strong>find the third-largest distinct count</strong>, then HAVING ≥ that value.</p>
<pre><code>HAVING COUNT(DISTINCT ...) &gt;= (
  /* 3rd-largest distinct count */
  SELECT da FROM (
    SELECT DISTINCT COUNT(DISTINCT ...) AS da
    FROM ... GROUP BY ...
    ORDER BY da DESC
  )
  LIMIT 1 OFFSET 2
)</code></pre>
<p>This question maps directly to PDF Q7.</p>
@@task:zh
查出<strong>借阅作者数最多的前 3 名</strong>会员，<strong>含并列</strong>。如果有人在<strong>第 N 名</strong>并列，所有并列的人都要返回。返回两列：<code>member_id</code>、<code>distinct_authors</code>。
@@task:en
Return the <strong>top 3 members by number of distinct authors</strong> they have borrowed. <strong>Include ties</strong> at any rank. Two columns: <code>member_id</code>, <code>distinct_authors</code>.
@@hint:zh 主查询 GROUP BY member_id，HAVING 的右边是「第 3 大的不重复计数」—— 通过子查询里 SELECT DISTINCT count + ORDER BY DESC + LIMIT 1 OFFSET 2 拿到。
@@hint:en
Main query: GROUP BY member_id. The HAVING threshold is the "3rd-largest distinct count" — get it via SELECT DISTINCT count + ORDER BY DESC + LIMIT 1 OFFSET 2.
@@starter:zh
@@starter:en`);
