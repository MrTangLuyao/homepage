LEARN.lesson('sql', 32, `
@@schema c32_schema
@@chapterRef sql-syntax-guide-3
@@expectedSql SELECT DISTINCT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 2
@@checkOrder false
@@tables employees
@@difficulty:zh 中级
@@difficulty:en Intermediate
@@intro:zh
<p class="lead">「<strong>第 N 大的值</strong>」 —— 比如「第三高的工资」 —— 用 <code>DISTINCT + ORDER BY DESC + LIMIT 1 OFFSET (N-1)</code>。</p>
<pre><code>SELECT DISTINCT salary
FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET 2            -- N=3，所以 OFFSET 是 N-1 = 2</code></pre>
<p><code>DISTINCT</code> 是关键 —— 多人同薪时<strong>只算一档</strong>。</p>
<p>「第 1 大」就是 OFFSET 0 = 等价于 <code>SELECT MAX(salary)</code>；「第 2 大」OFFSET 1；以此类推。</p>
@@intro:en
<p class="lead">"<strong>The N-th largest value</strong>" — e.g. "the 3rd highest salary" — uses <code>DISTINCT + ORDER BY DESC + LIMIT 1 OFFSET (N-1)</code>.</p>
<pre><code>SELECT DISTINCT salary
FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET 2            -- N=3, so OFFSET is N-1 = 2</code></pre>
<p>The <code>DISTINCT</code> matters — multiple people on the same salary count as <strong>one tier</strong>.</p>
<p>"1st largest" with OFFSET 0 is equivalent to <code>SELECT MAX(salary)</code>; "2nd" uses OFFSET 1, and so on.</p>
@@task:zh 查出<strong>第 3 高的工资</strong>是多少（同薪只算一档）。返回一列：<code>salary</code>，一行结果。
@@task:en
Return the <strong>3rd highest salary</strong> (people on the same salary count as one tier). One column: <code>salary</code>, one row.
@@hint:zh <code>SELECT DISTINCT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 2</code>。
@@hint:en <code>SELECT DISTINCT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 2</code>.
@@starter:zh
@@starter:en`);
