LEARN.lesson('sql', 37, `
@@schema final_schema
@@expectedSql
SELECT gc.branch_id, gc.genre, gc.n
FROM (
  SELECT br.id AS branch_id, b.genre, COUNT(l.id) AS n
  FROM branches br
  LEFT JOIN copies c ON c.branch_id = br.id
  LEFT JOIN loans  l ON l.copy_id   = c.id
  LEFT JOIN books  b ON b.id        = c.book_id
  GROUP BY br.id, b.genre
) AS gc
WHERE gc.n = (
  SELECT MAX(gc2.n)
  FROM (
    SELECT br.id AS branch_id, b.genre, COUNT(l.id) AS n
    FROM branches br
    LEFT JOIN copies c ON c.branch_id = br.id
    LEFT JOIN loans  l ON l.copy_id   = c.id
    LEFT JOIN books  b ON b.id        = c.book_id
    GROUP BY br.id, b.genre
  ) AS gc2
  WHERE gc2.branch_id = gc.branch_id
)
@@checkOrder false
@@tables branches, copies, books, loans
@@difficulty:zh 进阶
@@difficulty:en Advanced
@@intro:zh
<p class="lead">三个难点叠加：</p>
<ol>
  <li><strong>每组的最大值那一行</strong> —— 把聚合结果当派生表，再用相关子查询比对组内最大值</li>
  <li><strong>没有借阅记录的分馆也要出现</strong>（NULL genre + 0 计数）—— LEFT JOIN 链路全开</li>
  <li><strong>并列要全保留</strong> —— 用 <code>n = MAX(...)</code> 而不是 <code>LIMIT 1</code></li>
</ol>
<blockquote>这道题对应 PDF 第 8 题（每个 site 的 endangered species）。</blockquote>
@@intro:en
<p class="lead">Three classic difficulties at once:</p>
<ol>
  <li><strong>The row(s) holding the per-group maximum</strong> — build the aggregates as a derived table, then correlate to its own per-group max</li>
  <li><strong>Branches with zero loans must appear</strong> (NULL genre, 0 count) — chain LEFT JOINs all the way</li>
  <li><strong>Ties stay</strong> — use <code>n = MAX(...)</code>, not <code>LIMIT 1</code></li>
</ol>
<blockquote>This maps to PDF Q8 (most-observed endangered species per site).</blockquote>
@@task:zh
每个分馆<strong>被借阅最多的 genre</strong> 是哪个？返回三列：<code>branch_id</code>、<code>genre</code>、<code>n</code>（该分馆该 genre 的借阅次数）。<strong>没有任何借阅</strong>的分馆也要出现 —— 此时 genre 为 NULL，<code>n</code> 为 0。<strong>并列</strong>时该分馆下每个并列 genre 各一行。
@@task:en
For each branch, find the <strong>genre that has been loaned the most times</strong> from copies based at that branch. Three columns: <code>branch_id</code>, <code>genre</code>, <code>n</code>. Branches with <strong>no loans at all</strong> must still appear, with NULL genre and 0 count. If multiple genres tie for the top, return one row for each tied genre.
@@hint:zh
把「每分馆每 genre 的借阅数」算出来当派生表（用 LEFT JOIN 让空分馆产生一行 genre=NULL, n=0），然后 WHERE n = (SELECT MAX(n2) FROM 同一派生表 WHERE branch_id = …)。
@@hint:en
Build a derived table of (branch_id, genre, n) using LEFT JOIN copies/loans/books so empty branches yield (NULL, 0). Then WHERE n = (SELECT MAX(n2) FROM same-derived-table WHERE branch_id = …).
@@starter:zh
@@starter:en`);
