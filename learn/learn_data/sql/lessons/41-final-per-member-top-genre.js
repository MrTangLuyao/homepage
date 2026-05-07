LEARN.lesson('sql', 41, `
@@schema final_schema
@@expectedSql
SELECT mg.member_id, mg.genre, mg.n
FROM (
  SELECT l.member_id, b.genre, COUNT(*) AS n
  FROM loans l
  JOIN copies c ON c.id = l.copy_id
  JOIN books b  ON b.id = c.book_id
  GROUP BY l.member_id, b.genre
) AS mg
WHERE mg.n = (
  SELECT MAX(n2)
  FROM (
    SELECT l.member_id AS mid, b.genre, COUNT(*) AS n2
    FROM loans l
    JOIN copies c ON c.id = l.copy_id
    JOIN books b  ON b.id = c.book_id
    GROUP BY l.member_id, b.genre
  ) AS mg2
  WHERE mg2.mid = mg.member_id
)
@@checkOrder false
@@tables members, loans, copies, books
@@difficulty:zh 进阶
@@difficulty:en Advanced
@@intro:zh
<p class="lead">和挑战 5 同形 —— 但<strong>分组主体换成会员</strong>，且<strong>没借过书的会员被排除</strong>。</p>
<p>所以这一次<strong>不需要</strong> LEFT JOIN（不需要 0 行），用 INNER JOIN + GROUP BY 即可。</p>
<p><strong>并列保留</strong>的写法仍然是相关子查询比 MAX。</p>
@@intro:en
<p class="lead">Same shape as Challenge 5 — but <strong>grouped by member</strong>, and members with no loans are <strong>excluded</strong>.</p>
<p>So this time <strong>no LEFT JOIN needed</strong> (no zero rows): plain INNER JOIN + GROUP BY suffices.</p>
<p><strong>Ties</strong> are still preserved by correlating to MAX inside the per-group derived table.</p>
@@task:zh
对<strong>每位有借阅记录的会员</strong>，找出他<strong>借阅次数最多</strong>的 genre。如果该会员在多个 genre 上并列最多，<strong>每个并列 genre 一行</strong>。返回三列：<code>member_id</code>、<code>genre</code>、<code>n</code>。
@@task:en
For <strong>every member who has borrowed at least once</strong>, find the genre they have <strong>loaned most often</strong>. If multiple genres tie at the top for that member, return <strong>one row per tied genre</strong>. Three columns: <code>member_id</code>, <code>genre</code>, <code>n</code>.
@@hint:zh 派生表 (member_id, genre, n) 来自 GROUP BY 双键；外层 WHERE n = (SELECT MAX(n2) FROM 同派生表 WHERE member_id 相同)。
@@hint:en
Derived table of (member_id, genre, n) via GROUP BY two keys; outer WHERE n = (SELECT MAX(n2) FROM same derived table WHERE same member_id).
@@starter:zh
@@starter:en`);
