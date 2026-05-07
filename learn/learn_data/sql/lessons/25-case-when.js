LEARN.lesson('sql', 25, `
@@schema c25_schema
@@chapterRef sql-syntax-guide-3
@@expectedSql
SELECT name, score,
  CASE
    WHEN score >= 90 THEN 'A'
    WHEN score >= 80 THEN 'B'
    WHEN score >= 70 THEN 'C'
    ELSE 'F'
  END AS grade
FROM students
@@checkOrder false
@@tables students
@@difficulty:zh 中级
@@difficulty:en Intermediate
@@intro:zh
<p class="lead"><strong>CASE WHEN</strong> 是 SQL 的 if-else，能根据条件返回不同的值，做<strong>分级、打标签</strong>等。</p>
<pre><code>SELECT name, score,
  CASE
    WHEN score &gt;= 90 THEN 'A'
    WHEN score &gt;= 80 THEN 'B'
    WHEN score &gt;= 70 THEN 'C'
    ELSE 'F'
  END AS grade
FROM students;</code></pre>
<p>规则：<strong>从上到下</strong>第一个为真的 WHEN 生效，后面的 WHEN 被跳过；都不满足走 ELSE（没写 ELSE 默认是 NULL）。</p>
<p>CASE 还能配合 SUM 做「条件计数 / 求和」（参见博客 25.4、25.5）。</p>
@@intro:en
<p class="lead"><strong>CASE WHEN</strong> is SQL's if-else. It evaluates conditions in order and returns the first match — perfect for <strong>grading, bucketing, labelling</strong>.</p>
<pre><code>SELECT name, score,
  CASE
    WHEN score &gt;= 90 THEN 'A'
    WHEN score &gt;= 80 THEN 'B'
    WHEN score &gt;= 70 THEN 'C'
    ELSE 'F'
  END AS grade
FROM students;</code></pre>
<p>Rule: <strong>top to bottom</strong> — the first matching WHEN wins, the rest are skipped. If nothing matches, ELSE runs (defaults to NULL if absent).</p>
<p>CASE inside SUM/COUNT lets you do "conditional sums" — a powerful pivot trick.</p>
@@task:zh
给每个学生打个等级。返回三列：<code>name</code>、<code>score</code>、<code>grade</code>。<br/>规则：score &ge; 90 → <code>'A'</code>；80–89 → <code>'B'</code>；70–79 → <code>'C'</code>；其余 → <code>'F'</code>。
@@task:en
Assign a letter grade to every student. Three columns: <code>name</code>, <code>score</code>, <code>grade</code>.<br/>Rules: score ≥ 90 → <code>'A'</code>; 80–89 → <code>'B'</code>; 70–79 → <code>'C'</code>; else → <code>'F'</code>.
@@hint:zh CASE WHEN ... THEN ... WHEN ... THEN ... ELSE ... END，最后用 AS grade 起别名。
@@hint:en CASE WHEN … THEN … WHEN … THEN … ELSE … END AS grade.
@@starter:zh
@@starter:en`);
