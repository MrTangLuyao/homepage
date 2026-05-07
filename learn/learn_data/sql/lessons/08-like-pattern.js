LEARN.lesson('sql', 8, `
@@schema c8_schema
@@chapterRef sql-syntax-guide-1
@@expectedSql SELECT id, title FROM books WHERE title LIKE '%SQL%'
@@checkOrder false
@@tables books
@@difficulty:zh 入门
@@difficulty:en Beginner
@@intro:zh
<p class="lead"><strong>LIKE</strong> 配通配符做模糊匹配。两个通配符：</p>
<ul>
  <li><code>%</code> — 任意多个字符（包括 0 个）</li>
  <li><code>_</code> — 恰好 1 个字符</li>
</ul>
<pre><code>title LIKE '%SQL%'    -- 包含 SQL
title LIKE 'SQL%'     -- 以 SQL 开头
title LIKE '%战'       -- 以「战」结尾</code></pre>
<p>反过来用 <code>NOT LIKE</code>。SQLite 默认 LIKE <strong>不区分大小写</strong>（仅对 ASCII）。</p>
@@intro:en
<p class="lead"><strong>LIKE</strong> + wildcards do fuzzy string matching:</p>
<ul>
  <li><code>%</code> — any number of characters (including zero)</li>
  <li><code>_</code> — exactly one character</li>
</ul>
<pre><code>title LIKE '%SQL%'   -- contains SQL
title LIKE 'SQL%'    -- starts with SQL
title LIKE '%end'    -- ends with "end"</code></pre>
<p><code>NOT LIKE</code> for the inverse. SQLite's LIKE is <strong>case-insensitive</strong> for ASCII by default.</p>
@@task:zh 查出标题<strong>包含 <code>SQL</code></strong>（任何位置）的所有书，返回 <code>id</code> 和 <code>title</code>。
@@task:en
Return the <code>id</code> and <code>title</code> of every book whose title <strong>contains <code>SQL</code></strong> (anywhere in the string).
@@hint:zh 用 <code>title LIKE '%SQL%'</code>，两边都加 <code>%</code>。
@@hint:en Use <code>title LIKE '%SQL%'</code> with <code>%</code> on both sides.
@@starter:zh
@@starter:en`);
