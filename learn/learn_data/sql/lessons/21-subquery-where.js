LEARN.lesson('sql', 21, `
@@schema c11_schema
@@chapterRef sql-syntax-guide-3
@@expectedSql SELECT name, score FROM students WHERE score > (SELECT AVG(score) FROM students)
@@checkOrder false
@@tables students
@@difficulty:zh 中级
@@difficulty:en Intermediate
@@intro:zh
<p class="lead"><strong>子查询</strong>就是「查询里嵌套查询」。在 WHERE 里很常见。</p>
<p><strong>返回单值</strong>（标量子查询）—— 用作比较运算符的右值：</p>
<pre><code>SELECT name, score FROM students
WHERE score &gt; (SELECT AVG(score) FROM students);   -- 高于平均</code></pre>
<p><strong>返回多值</strong> —— 配 IN：</p>
<pre><code>WHERE id IN (SELECT student_id FROM enrollments WHERE course = 'SQL')</code></pre>
<blockquote>子查询要用括号包住。它先算出值，主查询再用这个值。</blockquote>
@@intro:en
<p class="lead">A <strong>subquery</strong> is a query nested inside another. They appear most often inside WHERE.</p>
<p><strong>Scalar subquery</strong> — returns a single value, plug into a comparison:</p>
<pre><code>SELECT name, score FROM students
WHERE score &gt; (SELECT AVG(score) FROM students);   -- above average</code></pre>
<p><strong>List subquery</strong> — pair with IN:</p>
<pre><code>WHERE id IN (SELECT student_id FROM enrollments WHERE course = 'SQL')</code></pre>
<blockquote>Subqueries are wrapped in parentheses. SQL evaluates the inner query first.</blockquote>
@@task:zh 查出<strong>分数高于全班平均分</strong>的学生，返回 <code>name</code> 和 <code>score</code>。要求用<strong>标量子查询</strong>计算平均值。
@@task:en
Return the <code>name</code> and <code>score</code> of students <strong>scoring above the class average</strong>. Use a <strong>scalar subquery</strong> to compute the average.
@@hint:zh <code>WHERE score &gt; (SELECT AVG(score) FROM students)</code>。
@@hint:en <code>WHERE score &gt; (SELECT AVG(score) FROM students)</code>.
@@starter:zh
@@starter:en`);
