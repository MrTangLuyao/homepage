LEARN.lesson('sql', 23, `
@@schema c23_schema
@@chapterRef sql-syntax-guide-3
@@expectedSql
SELECT a.id, a.name FROM authors AS a
WHERE NOT EXISTS (SELECT 1 FROM books AS b WHERE b.author_id = a.id)
@@checkOrder false
@@tables authors, books
@@difficulty:zh 中级
@@difficulty:en Intermediate
@@intro:zh
<p class="lead"><strong>EXISTS (子查询)</strong> 检查子查询是否<strong>有至少一行</strong>。配合<strong>关联子查询</strong>（子查询里引用外层的列）做「找出有相关记录的行」。</p>
<pre><code>-- 找出「至少出过一本书」的作者
SELECT a.name FROM authors AS a
WHERE EXISTS (
  SELECT 1 FROM books AS b WHERE b.author_id = a.id
);</code></pre>
<p><strong>NOT EXISTS</strong> 反过来 —— 找「没有相关记录的」（比 NOT IN 安全，能正确处理 NULL）。</p>
<blockquote>EXISTS 只关心「有没有」，<strong>不关心子查询返回的内容</strong>，所以惯例写 <code>SELECT 1</code>。</blockquote>
@@intro:en
<p class="lead"><strong>EXISTS (subquery)</strong> tests whether the subquery returns <strong>any row at all</strong>. Pair it with a <strong>correlated subquery</strong> (one that references the outer row) to find "rows with related records".</p>
<pre><code>-- authors who have at least one book
SELECT a.name FROM authors AS a
WHERE EXISTS (
  SELECT 1 FROM books AS b WHERE b.author_id = a.id
);</code></pre>
<p><strong>NOT EXISTS</strong> for the inverse — "no related rows". Safer than NOT IN around NULLs.</p>
<blockquote>EXISTS only checks for any row; the subquery's actual columns don't matter, so the idiom is <code>SELECT 1</code>.</blockquote>
@@task:zh 查出<strong>没有出过任何一本书</strong>的作者，返回 <code>id</code> 和 <code>name</code>。用 <code>NOT EXISTS</code>。
@@task:en
Return the <code>id</code> and <code>name</code> of every author who has <strong>not published any book</strong>. Use <code>NOT EXISTS</code>.
@@hint:zh <code>WHERE NOT EXISTS (SELECT 1 FROM books WHERE books.author_id = authors.id)</code>。
@@hint:en <code>WHERE NOT EXISTS (SELECT 1 FROM books WHERE books.author_id = authors.id)</code>.
@@starter:zh
@@starter:en`);
