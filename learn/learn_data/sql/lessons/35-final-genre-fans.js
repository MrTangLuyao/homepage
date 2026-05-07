LEARN.lesson('sql', 35, `
@@schema final_schema
@@expectedSql
SELECT l.member_id, b.genre, COUNT(*) AS total_loans
FROM loans l
JOIN copies c ON c.id = l.copy_id
JOIN books b  ON b.id = c.book_id
GROUP BY l.member_id, b.genre
HAVING COUNT(DISTINCT b.id) > 3
@@checkOrder false
@@tables members, books, copies, loans
@@difficulty:zh 进阶
@@difficulty:en Advanced
@@intro:zh
<p class="lead">「在某个分类里达到一定数量」 的题型 —— GROUP BY 多个键 + HAVING。</p>
<p>核心思路：按 <code>(member_id, genre)</code> 双键分组，每组用 <code>COUNT(DISTINCT book_id)</code> 数<strong>不重复的书</strong>（同一本书借多次只算 1 本）。HAVING 过滤组。</p>
<p>注意「<strong>多于 3 本</strong>」是<strong>严格大于</strong>，所以条件是 <code>&gt; 3</code>，不是 <code>&gt;= 3</code>。</p>
<p>同一会员可能在多个 genre 都达标 —— 那他就有<strong>多行</strong>结果。</p>
@@intro:en
<p class="lead">"Reaches a threshold within a category" — GROUP BY two keys, then HAVING.</p>
<p>The pattern: group by <code>(member_id, genre)</code>, count <code>DISTINCT book_id</code> per group (the same book borrowed twice still counts as 1). HAVING filters the groups.</p>
<p>"<strong>More than 3</strong>" is <strong>strict</strong>: <code>&gt; 3</code>, not <code>&gt;= 3</code>.</p>
<p>One member may qualify in multiple genres → multiple rows for that member.</p>
@@task:zh
一个会员被称为「<strong>类型迷</strong>」，如果他在<strong>同一个 genre</strong> 里借过<strong>多于 3 本</strong>不重复的书。列出每个类型迷以及他在那个 genre 里的<strong>总借阅次数</strong>（含重复）。如果一个人在多个 genre 都达标，每个 genre 单独一行。返回三列：<code>member_id</code>、<code>genre</code>、<code>total_loans</code>。
@@task:en
A member is a <strong>genre fan</strong> if they have borrowed <strong>more than 3 distinct books in the same genre</strong>. List every genre fan with their <strong>total loan count in that genre</strong> (counting repeats). One row per (member, genre) qualifying pair. Three columns: <code>member_id</code>, <code>genre</code>, <code>total_loans</code>.
@@hint:zh GROUP BY l.member_id, b.genre；HAVING COUNT(DISTINCT b.id) &gt; 3；SELECT 里 <code>COUNT(*) AS total_loans</code>。
@@hint:en GROUP BY l.member_id, b.genre; HAVING COUNT(DISTINCT b.id) > 3; SELECT <code>COUNT(*) AS total_loans</code>.
@@starter:zh
@@starter:en`);
