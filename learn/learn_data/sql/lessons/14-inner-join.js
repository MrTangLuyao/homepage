LEARN.lesson('sql', 14, `
@@schema c14_schema
@@chapterRef sql-syntax-guide-2
@@expectedSql SELECT b.title, a.name FROM books AS b INNER JOIN authors AS a ON b.author_id = a.id
@@checkOrder false
@@tables authors, books
@@difficulty:zh 中级
@@difficulty:en Intermediate
@@intro:zh
<p class="lead"><strong>INNER JOIN</strong> 把两张表用一个匹配条件「<strong>缝合</strong>」起来，只保留两边都能对上的行。</p>
<pre><code>SELECT b.title, a.name
FROM books AS b
INNER JOIN authors AS a ON b.author_id = a.id;</code></pre>
<ul>
  <li><code>ON</code> 是<strong>连接条件</strong>，通常是「外键 = 主键」</li>
  <li>关键字 <code>INNER</code> 可省略，<code>JOIN</code> 默认就是 INNER JOIN</li>
  <li>多表查询常给表起别名（<code>b</code>、<code>a</code>），引用列时用 <code>表别名.列名</code></li>
</ul>
@@intro:en
<p class="lead"><strong>INNER JOIN</strong> stitches two tables together by a match condition, keeping only rows where both sides match.</p>
<pre><code>SELECT b.title, a.name
FROM books AS b
INNER JOIN authors AS a ON b.author_id = a.id;</code></pre>
<ul>
  <li><code>ON</code> is the <strong>match condition</strong> — usually "foreign key = primary key"</li>
  <li><code>INNER</code> is optional; bare <code>JOIN</code> means INNER JOIN</li>
  <li>Aliases (<code>b</code>, <code>a</code>) keep multi-table queries readable — use <code>alias.column</code></li>
</ul>
@@task:zh 把每本书和它的作者拼起来，返回两列：<code>title</code>（书名）和<code>name</code>（作者名）。
@@task:en Stitch each book to its author. Return two columns: <code>title</code> (book) and <code>name</code> (author).
@@hint:zh FROM books JOIN authors ON books.author_id = authors.id。
@@hint:en FROM books JOIN authors ON books.author_id = authors.id.
@@starter:zh
@@starter:en`);
