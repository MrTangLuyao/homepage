LEARN.lesson('sql', 29, `
@@schema c29_schema
@@chapterRef sql-syntax-guide-3
@@expectedSql
SELECT name, class, score FROM students s
WHERE score = (SELECT MAX(score) FROM students WHERE class = s.class)
@@checkOrder false
@@tables students
@@difficulty:zh 中级
@@difficulty:en Intermediate
@@intro:zh
<p class="lead">「<strong>每组里最大的那一行</strong>」 —— 不是 <code>SELECT MAX(score)</code>，那只能给你最大值，给不了行的其他列。</p>
<p>套路：<strong>子查询求每组最大值，主查询比对</strong>。</p>
<pre><code>SELECT * FROM students s
WHERE score = (SELECT MAX(score) FROM students WHERE class = s.class);</code></pre>
<p>这是<strong>关联子查询</strong> —— 内层用了外层的 <code>s.class</code>。每行检查时，子查询都按那一行的 class 重新计算。</p>
<p>用 <code>=</code> 而不是 <code>LIMIT 1</code>，<strong>并列时同班级最高分的几个人都返回</strong>。</p>
@@intro:en
<p class="lead">"<strong>The row holding the max in each group</strong>" — <code>SELECT MAX(score)</code> alone gives you the max value, not the row.</p>
<p>Pattern: <strong>inner query computes the per-group max, outer matches against it</strong>.</p>
<pre><code>SELECT * FROM students s
WHERE score = (SELECT MAX(score) FROM students WHERE class = s.class);</code></pre>
<p>This is a <strong>correlated subquery</strong> — the inner query references the outer row's <code>s.class</code>, so it re-evaluates per row.</p>
<p>Using <code>=</code> instead of <code>LIMIT 1</code> means <strong>ties are preserved</strong> — every student tied for the class top score appears.</p>
@@task:zh 对每个班级，找出<strong>分数最高的学生</strong>（含并列）。返回三列：<code>name</code>、<code>class</code>、<code>score</code>。
@@task:en
For each class, return the <strong>top-scoring student(s)</strong> (including ties). Three columns: <code>name</code>, <code>class</code>, <code>score</code>.
@@hint:zh WHERE score = (SELECT MAX(score) FROM students WHERE class = 外层.class) —— 关联子查询。
@@hint:en WHERE score = (SELECT MAX(score) FROM students WHERE class = outer.class) — correlated subquery.
@@starter:zh
@@starter:en`);
