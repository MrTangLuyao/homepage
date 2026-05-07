LEARN.lesson('sql', 3, `
@@schema c3_schema
@@chapterRef sql-syntax-guide-1
@@expectedSql SELECT name, score FROM students WHERE score >= 85
@@checkOrder false
@@tables students
@@difficulty:zh 入门
@@difficulty:en Beginner
@@intro:zh
<p class="lead"><strong>SELECT</strong> 决定显示<em>哪些列</em>，<strong>WHERE</strong> 决定保留<em>哪些行</em>。</p>
<pre><code>SELECT 列 FROM 表 WHERE 条件;</code></pre>
<p>字符串值要用<strong>单引号</strong>（<code>'F'</code>），数字不用。<strong>等号是单个 <code>=</code></strong>，不是 <code>==</code>。</p>
@@intro:en
<p class="lead"><strong>SELECT</strong> picks <em>which columns</em>; <strong>WHERE</strong> picks <em>which rows</em> to keep.</p>
<pre><code>SELECT cols FROM table WHERE condition;</code></pre>
<p>Strings need <strong>single quotes</strong> (<code>'F'</code>); numbers don't. SQL uses <strong>a single <code>=</code></strong>, not <code>==</code>.</p>
@@task:zh 从 <code>students</code> 表里查出<strong>成绩 ≥ 85 的所有学生</strong>，返回 <code>name</code> 和 <code>score</code> 两列。
@@task:en
From <code>students</code>, return the <code>name</code> and <code>score</code> of <strong>every student whose score is ≥ 85</strong>.
@@hint:zh 加一句 <code>WHERE score &gt;= 85</code>。
@@hint:en Add <code>WHERE score &gt;= 85</code> to your query.
@@starter:zh
SELECT name, score FROM students
WHERE ;
@@starter:en
SELECT name, score FROM students
WHERE ;`);
