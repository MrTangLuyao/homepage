LEARN.lesson('sql', 2, `
@@schema c2_schema
@@chapterRef sql-syntax-guide-1
@@expectedSql SELECT title, year FROM books
@@checkOrder false
@@tables books
@@difficulty:zh 入门
@@difficulty:en Beginner
@@intro:zh
<p class="lead"><strong>FROM</strong> 告诉数据库「<strong>从哪张表里查</strong>」。每个 SELECT 必须配一个 FROM。</p>
<pre><code>SELECT 列名 FROM 表名;</code></pre>
<p>FROM 后面也可以加<strong>表别名</strong>：<code>FROM books AS b</code> 或省略 AS：<code>FROM books b</code>。多表时别名很有用。</p>
@@intro:en
<p class="lead"><strong>FROM</strong> tells the database <strong>which table to query</strong>. Every SELECT needs a FROM.</p>
<pre><code>SELECT cols FROM table_name;</code></pre>
<p>You can also add a <strong>table alias</strong>: <code>FROM books AS b</code> or just <code>FROM books b</code>. Aliases shine in multi-table queries.</p>
@@task:zh 从 <code>books</code> 表里查出每本书的 <code>title</code> 和 <code>year</code>。
@@task:en List the <code>title</code> and <code>year</code> of every book in the <code>books</code> table.
@@hint:zh SELECT 列名 FROM 表名 —— 这一关就这两步。
@@hint:en SELECT columns FROM table — that is all this lesson needs.
@@starter:zh
@@starter:en`);
