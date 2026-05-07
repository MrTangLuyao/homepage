LEARN.lesson('sql', 11, `
@@schema c11_schema
@@chapterRef sql-syntax-guide-2
@@expectedSql SELECT name, score FROM students ORDER BY score DESC LIMIT 3
@@checkOrder true
@@tables students
@@difficulty:zh 入门
@@difficulty:en Beginner
@@intro:zh
<p class="lead"><strong>LIMIT</strong> 限制返回的行数，<strong>OFFSET</strong> 从第几行开始（0 是第一行）。</p>
<pre><code>SELECT * FROM students ORDER BY score DESC
LIMIT 3;            -- 前 3 名

SELECT * FROM students ORDER BY score DESC
LIMIT 3 OFFSET 3;   -- 跳过前 3 行，再取 3 行（第 4–6 名）</code></pre>
<p>分页常用：每页 N 行，第 k 页 = <code>LIMIT N OFFSET (k-1)*N</code>。</p>
<blockquote><strong>LIMIT 通常配 ORDER BY</strong>，否则「前 N 行」是不确定的。</blockquote>
@@intro:en
<p class="lead"><strong>LIMIT</strong> caps the number of rows; <strong>OFFSET</strong> skips that many first (0-indexed).</p>
<pre><code>SELECT * FROM students ORDER BY score DESC
LIMIT 3;            -- top 3

SELECT * FROM students ORDER BY score DESC
LIMIT 3 OFFSET 3;   -- skip first 3, take next 3 (ranks 4–6)</code></pre>
<p>Pagination: page <code>k</code> of <code>N</code> rows = <code>LIMIT N OFFSET (k-1)*N</code>.</p>
<blockquote><strong>LIMIT almost always pairs with ORDER BY</strong>; otherwise "first N" is undefined.</blockquote>
@@task:zh 查出 <strong>分数前 3 名</strong>的学生，返回 <code>name</code> 和 <code>score</code>，按分数从高到低。
@@task:en Return the <strong>top 3 students by score</strong> (<code>name</code>, <code>score</code>), highest first.
@@hint:zh ORDER BY score DESC 之后加 LIMIT 3。
@@hint:en After ORDER BY score DESC, add LIMIT 3.
@@starter:zh
@@starter:en`);
