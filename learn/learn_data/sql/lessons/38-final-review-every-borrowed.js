LEARN.lesson('sql', 38, `
@@schema final_schema
@@expectedSql
SELECT m.id AS member_id, COUNT(DISTINCT b.id) AS borrowed_count
FROM members m
JOIN loans l  ON l.member_id = m.id
JOIN copies c ON c.id = l.copy_id
JOIN books b  ON b.id = c.book_id
WHERE NOT EXISTS (
  SELECT 1
  FROM loans l2
  JOIN copies c2 ON c2.id = l2.copy_id
  JOIN books b2  ON b2.id = c2.book_id
  WHERE l2.member_id = m.id
    AND NOT EXISTS (
      SELECT 1 FROM reviews r
      WHERE r.member_id = m.id AND r.book_id = b2.id
    )
)
GROUP BY m.id
@@checkOrder false
@@tables members, loans, copies, books, reviews
@@difficulty:zh 进阶
@@difficulty:en Advanced
@@intro:zh
<p class="lead">「<strong>对所有 X 都满足 P</strong>」是关系代数里的<strong>除法</strong>，SQL 没有专门语法 —— 用<strong>双重否定</strong> 表达：</p>
<blockquote>「<strong>每一本</strong>都评过」 ≡ 「<strong>不存在</strong>一本是没评过的」</blockquote>
<pre><code>WHERE NOT EXISTS (
  SELECT 1 FROM 借阅 l
  WHERE l.member_id = m.id
    AND NOT EXISTS (SELECT 1 FROM 评价 r WHERE r.member_id = m.id AND r.book_id = l.book_id)
)</code></pre>
<p>另外要注意：<strong>没借过任何书</strong>的会员被「空集为真」逻辑包进来 —— 题目要求<strong>排除</strong>他们，所以加个 JOIN loans + GROUP BY 强制要求至少一条借阅。</p>
<blockquote>对应 PDF 第 9 题的核心思路。</blockquote>
@@intro:en
<p class="lead">"<strong>For every X, P holds</strong>" is relational <strong>division</strong> — SQL has no native syntax, so we use a <strong>double negation</strong>:</p>
<blockquote>"reviewed <strong>every</strong> borrowed book" ≡ "there is <strong>no</strong> borrowed book that was not reviewed"</blockquote>
<pre><code>WHERE NOT EXISTS (
  SELECT 1 FROM loans l
  WHERE l.member_id = m.id
    AND NOT EXISTS (SELECT 1 FROM reviews r WHERE r.member_id = m.id AND r.book_id = l.book_id)
)</code></pre>
<p>Watch out: members with <strong>no loans at all</strong> trivially satisfy "for every loan…" — the spec says <strong>exclude them</strong>, so add a JOIN loans + GROUP BY to force at least one borrow.</p>
<blockquote>The core trick from PDF Q9.</blockquote>
@@task:zh
查出<strong>对自己借过的每一本书都写过评价</strong>的会员（同一本书借多次只算一本）。<strong>排除</strong>没借过任何书的会员。返回两列：<code>member_id</code>、<code>borrowed_count</code>（该会员借过的不重复书的数量）。
@@task:en
Find members who have <strong>written a review for every distinct book they have borrowed</strong>. <strong>Exclude</strong> members who have not borrowed anything. Two columns: <code>member_id</code>, <code>borrowed_count</code> (distinct books borrowed).
@@hint:zh 主查询 JOIN loans 强制至少一次借阅；WHERE NOT EXISTS 包一个 NOT EXISTS（双重否定）。
@@hint:en Main query JOINs loans (forces ≥ 1 borrow); WHERE NOT EXISTS wrapping a NOT EXISTS (double negation).
@@starter:zh
@@starter:en`);
