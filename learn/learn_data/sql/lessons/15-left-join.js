LEARN.lesson('sql', 15, `
@@schema c15_schema
@@chapterRef sql-syntax-guide-2
@@expectedSql SELECT a.name, b.title FROM authors AS a LEFT JOIN books AS b ON a.id = b.author_id
@@checkOrder false
@@tables authors, books
@@difficulty:zh 中级
@@difficulty:en Intermediate
@@intro:zh
<p class="lead"><strong>LEFT JOIN</strong> 保留<strong>左边表的所有行</strong>，右边没匹配上的列用 NULL 填。</p>
<pre><code>SELECT a.name, b.title
FROM authors AS a
LEFT JOIN books AS b ON a.id = b.author_id;</code></pre>
<p>典型用途：「<strong>列出所有 X，包括没有任何 Y 的</strong>」。</p>
<blockquote>区分：
<br/>· INNER JOIN —— 两边都得有
<br/>· LEFT JOIN —— 左边都保留，右边没的填 NULL
<br/>· RIGHT JOIN —— 反过来（实际工作中很少用，把表换边写 LEFT JOIN 即可）</blockquote>
@@intro:en
<p class="lead"><strong>LEFT JOIN</strong> keeps <strong>every row from the left table</strong>; non-matching right-side columns are filled with NULL.</p>
<pre><code>SELECT a.name, b.title
FROM authors AS a
LEFT JOIN books AS b ON a.id = b.author_id;</code></pre>
<p>Classic use: "<strong>list all X, including those with no Y</strong>".</p>
<blockquote>Compare:
<br/>· INNER JOIN — both sides must match
<br/>· LEFT JOIN — keep all left rows; missing right → NULL
<br/>· RIGHT JOIN — the mirror (rarely used; just swap sides and write LEFT JOIN)</blockquote>
@@task:zh 列出<strong>所有作者</strong>和他们的书名 —— <strong>没有书的作者也要出现</strong>，title 显示 NULL。返回两列：<code>name</code> 和 <code>title</code>。
@@task:en
List <strong>every author</strong> and their book titles — <strong>authors with no books must still appear</strong>, with NULL for title. Return two columns: <code>name</code> and <code>title</code>.
@@hint:zh 左表是 authors，<code>LEFT JOIN books ON authors.id = books.author_id</code>。
@@hint:en Authors is the left table: <code>LEFT JOIN books ON authors.id = books.author_id</code>.
@@starter:zh
@@starter:en`);
