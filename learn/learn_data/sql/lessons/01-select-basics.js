LEARN.lesson('sql', 1, `
@@schema c1_schema
@@chapterRef sql-syntax-guide-1
@@expectedSql SELECT name, score FROM students
@@checkOrder false
@@tables students
@@difficulty:zh 入门
@@difficulty:en Beginner
@@intro:zh
<p class="lead"><strong>SELECT</strong> 是 SQL 的第一关键字 —— 它决定结果中<strong>显示哪些列</strong>。</p>
<pre><code>SELECT 列1, 列2 FROM 表名;</code></pre>
<p>用 <code>*</code> 表示所有列；列的顺序由你 SELECT 时写的顺序决定。</p>
<p>SELECT 后面也可以放<strong>表达式</strong>，比如 <code>score + 10</code>，但本关只用列名。</p>
@@intro:en
<p class="lead"><strong>SELECT</strong> is the first SQL keyword — it picks <strong>which columns</strong> appear.</p>
<pre><code>SELECT col1, col2 FROM table_name;</code></pre>
<p>Use <code>*</code> for every column. Columns are returned in the order you list them.</p>
<p>SELECT can also take expressions like <code>score + 10</code>, but this lesson only needs plain column names.</p>
@@task:zh 从 <code>students</code> 表里只显示每个学生的 <code>name</code> 和 <code>score</code> 两列（每行一个学生）。
@@task:en
Return only the <code>name</code> and <code>score</code> of every student in <code>students</code> (one row per student).
@@hint:zh SELECT 后面把列名用逗号分开，再写 FROM 表名。
@@hint:en List the columns after SELECT separated by commas, then FROM &lt;table&gt;.
@@starter:zh
-- 在这里写你的 SQL

@@starter:en
-- write your SQL here
`);
