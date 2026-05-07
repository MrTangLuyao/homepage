LEARN.lesson('sql', 34, `
@@schema final_schema
@@expectedSql
SELECT m.id AS member_id, COUNT(l.id) AS active_loans
FROM members m
JOIN loans l ON l.member_id = m.id AND l.return_date IS NULL
WHERE NOT EXISTS (
  SELECT 1 FROM memberships ms
  WHERE ms.member_id = m.id
    AND (ms.end_date IS NULL OR ms.end_date > DATE('now'))
)
GROUP BY m.id
@@checkOrder false
@@tables members, memberships, loans
@@difficulty:zh 进阶
@@difficulty:en Advanced
@@intro:zh
<p class="lead">两条独立条件求交集，其中一条是<strong>否定</strong>。</p>
<p>「<strong>有 X，没 Y</strong>」 这种题型的标准写法：</p>
<pre><code>WHERE EXISTS (有 X 的子查询)
  AND NOT EXISTS (有 Y 的子查询)</code></pre>
<p>「有效会员」定义：在 memberships 表里存在一条记录，其 <code>end_date IS NULL</code>（永久）或 <code>end_date &gt; DATE('now')</code>（未来到期）。</p>
<p>「在借书」定义：loans 里 <code>return_date IS NULL</code>。</p>
<blockquote>SQLite 用 <code>DATE('now')</code> 取当天日期。</blockquote>
@@intro:en
<p class="lead">Intersection of two independent predicates — one of which is a <strong>negation</strong>.</p>
<p>The classic shape "<strong>has X but not Y</strong>" is:</p>
<pre><code>WHERE EXISTS (subquery for X)
  AND NOT EXISTS (subquery for Y)</code></pre>
<p>"Active membership" = a row in <code>memberships</code> where <code>end_date IS NULL</code> (perpetual) or <code>end_date &gt; DATE('now')</code> (still in the future).</p>
<p>"Currently borrowing" = a <code>loans</code> row with <code>return_date IS NULL</code>.</p>
<blockquote>SQLite gives today's date with <code>DATE('now')</code>.</blockquote>
@@task:zh
查出<strong>当前有未归还借阅</strong>但<strong>没有任何有效会员资格</strong>的会员。返回两列：<code>member_id</code> 和 <code>active_loans</code>（该会员当前未归还的借阅数）。
@@task:en
Find members who <strong>currently have at least one unreturned loan</strong> but <strong>have no active membership</strong>. Return two columns: <code>member_id</code> and <code>active_loans</code> (count of unreturned loans for that member).
@@hint:zh JOIN loans 限定 return_date IS NULL；NOT EXISTS 检查 memberships 里 end_date 是 NULL 或 &gt; DATE('now')；GROUP BY 会员 id。
@@hint:en
JOIN loans with return_date IS NULL; NOT EXISTS for any membership row whose end_date is NULL or > DATE('now'); GROUP BY member id.
@@starter:zh
@@starter:en`);
