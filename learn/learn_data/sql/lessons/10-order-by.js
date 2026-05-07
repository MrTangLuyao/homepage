LEARN.lesson('sql', 10, `
@@schema c10_schema
@@chapterRef sql-syntax-guide-1
@@expectedSql SELECT name, score FROM students ORDER BY score DESC
@@checkOrder true
@@tables students
@@difficulty:zh 入门
@@difficulty:en Beginner
@@intro:zh
<p class="lead">SELECT 的结果<strong>顺序不固定</strong>，要按某种顺序展示，就用 <strong>ORDER BY</strong>。</p>
<pre><code>SELECT * FROM students ORDER BY score;       -- 升序（默认）
SELECT * FROM students ORDER BY score DESC;  -- 降序
ORDER BY class ASC, score DESC;              -- 多列排序</code></pre>
<p>记忆：<strong>ASC</strong> = 升 = 小 → 大（默认）；<strong>DESC</strong> = 降 = 大 → 小。</p>
<blockquote>这一关会<strong>检查行的顺序</strong>。</blockquote>
@@intro:en
<p class="lead">SELECT's row order is <strong>undefined by default</strong>. Use <strong>ORDER BY</strong> to control it.</p>
<pre><code>SELECT * FROM students ORDER BY score;       -- ascending (default)
SELECT * FROM students ORDER BY score DESC;  -- descending
ORDER BY class ASC, score DESC;              -- multi-column</code></pre>
<p>Mnemonic: <strong>ASC</strong>ending = small → large (default); <strong>DESC</strong>ending = large → small.</p>
<blockquote>This lesson <strong>checks row order</strong>.</blockquote>
@@task:zh 查出全部学生的 <code>name</code> 和 <code>score</code>，按 <strong>score 从高到低</strong>排序。
@@task:en
Return every student's <code>name</code> and <code>score</code>, sorted by <strong>score descending</strong> (highest first).
@@hint:zh 在 SELECT 后面加 <code>ORDER BY score DESC</code>。
@@hint:en Append <code>ORDER BY score DESC</code> to your SELECT.
@@starter:zh
@@starter:en`);
