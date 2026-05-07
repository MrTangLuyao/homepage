LEARN.lesson('sql', 28, `
@@schema c28_schema
@@chapterRef sql-syntax-guide-3
@@expectedSql
SELECT name, score FROM students
WHERE score >= (
  SELECT DISTINCT score FROM students
  ORDER BY score DESC
  LIMIT 1 OFFSET 2
)
ORDER BY score DESC
@@checkOrder true
@@tables students
@@difficulty:zh 中级
@@difficulty:en Intermediate
@@intro:zh
<p class="lead">「<strong>前 N 名带并列</strong>」是<code>LIMIT N</code> 解决不了的问题 —— LIMIT 会把并列的人砍掉。</p>
<p>正确套路：<strong>找到第 N 大的值</strong>，然后筛选所有 ≥ 这个值的行。</p>
<pre><code>WHERE score &gt;= (
  SELECT DISTINCT score FROM students
  ORDER BY score DESC
  LIMIT 1 OFFSET 2          -- 第 3 大的不重复 score
)</code></pre>
<p>关键是子查询里的 <code>SELECT DISTINCT</code> + <code>LIMIT 1 OFFSET (N-1)</code> —— 这样取到的是「第 N 大的<strong>不重复</strong>分数」，确保并列正确。</p>
@@intro:en
<p class="lead">"<strong>Top N with ties</strong>" can't be done with plain <code>LIMIT N</code> — that blindly drops tied rows.</p>
<p>Pattern: <strong>find the N-th largest distinct value</strong>, then keep every row ≥ that.</p>
<pre><code>WHERE score &gt;= (
  SELECT DISTINCT score FROM students
  ORDER BY score DESC
  LIMIT 1 OFFSET 2          -- 3rd-largest distinct score
)</code></pre>
<p>Notice the inner query: <code>SELECT DISTINCT</code> + <code>LIMIT 1 OFFSET (N-1)</code>. That picks the N-th largest <strong>distinct</strong> score, so ties at the cut-off are preserved.</p>
@@task:zh
查出<strong>分数排名前 3 的所有学生</strong>（带并列）。如果第 N 名有并列，并列的全都返回。返回两列：<code>name</code>、<code>score</code>，按分数<strong>从高到低</strong>。
@@task:en
Return <strong>every student in the top 3 scores</strong>, including ties. Two columns: <code>name</code>, <code>score</code>, sorted by score <strong>descending</strong>.
@@hint:zh 子查询里 SELECT DISTINCT score ORDER BY DESC LIMIT 1 OFFSET 2 拿到第 3 大的分数，外层 WHERE score &gt;= 那个值。
@@hint:en Inner query: SELECT DISTINCT score ORDER BY DESC LIMIT 1 OFFSET 2; outer WHERE score >= that.
@@starter:zh
@@starter:en`);
