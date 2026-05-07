LEARN.lesson('sql', 13, `
@@schema c13_schema
@@chapterRef sql-syntax-guide-2
@@expectedSql SELECT name, score + 10 AS bonus_score FROM students
@@checkOrder false
@@tables students
@@difficulty:zh 入门
@@difficulty:en Beginner
@@intro:zh
<p class="lead"><strong>AS</strong> 给列或表起别名，让结果列名好看，或让长表名简化。</p>
<pre><code>-- 列别名：让 score + 10 显示成 bonus_score
SELECT name, score + 10 AS bonus_score FROM students;

-- 表别名（多表 JOIN 必备）
SELECT s.name FROM students AS s;     -- 也可省略 AS：FROM students s</code></pre>
<blockquote>列别名可以含空格，但要用<strong>双引号</strong>括起来：<code>AS "Bonus Score"</code>。</blockquote>
@@intro:en
<p class="lead"><strong>AS</strong> renames a column or table — useful when the raw column name is ugly (e.g. <code>score + 10</code>) or the table name is long.</p>
<pre><code>-- column alias
SELECT name, score + 10 AS bonus_score FROM students;

-- table alias (essential for multi-table queries)
SELECT s.name FROM students AS s;     -- AS is optional: FROM students s</code></pre>
<blockquote>An alias with spaces must be in <strong>double quotes</strong>: <code>AS "Bonus Score"</code>.</blockquote>
@@task:zh
查出每个学生的 <code>name</code> 和「奖励 10 分后的成绩」。返回两列：第一列是名字，第二列是 <code>score + 10</code>，给它取个别名（任意都行，比如 <code>bonus_score</code>）。
@@task:en
Return each student's <code>name</code> and their score-plus-10. Two columns: name first, then <code>score + 10</code> with any alias you like (e.g. <code>bonus_score</code>).
@@hint:zh <code>SELECT name, score + 10 AS bonus_score FROM students</code>。
@@hint:en <code>SELECT name, score + 10 AS bonus_score FROM students</code>.
@@starter:zh
@@starter:en`);
