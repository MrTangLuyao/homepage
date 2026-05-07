LEARN.lesson('sql', 17, `
@@schema c17_schema
@@chapterRef sql-syntax-guide-2
@@expectedSql
SELECT COUNT(*) AS total_users,
       COUNT(email) AS users_with_email,
       COUNT(DISTINCT city) AS distinct_cities
FROM users
@@checkOrder false
@@tables users
@@difficulty:zh 中级
@@difficulty:en Intermediate
@@intro:zh
<p class="lead"><strong>COUNT</strong> 是聚合函数，把一堆行折成一个数字。</p>
<pre><code>SELECT COUNT(*)            FROM orders;          -- 全部行数
SELECT COUNT(email)        FROM users;           -- email 不为 NULL 的行数
SELECT COUNT(DISTINCT city) FROM users;          -- 不同城市的数量</code></pre>
<ul>
  <li><code>COUNT(*)</code> 数<strong>所有行</strong>（包括 NULL）</li>
  <li><code>COUNT(列)</code> 只数<strong>该列非 NULL</strong> 的行</li>
  <li><code>COUNT(DISTINCT 列)</code> 数<strong>不重复</strong>的非 NULL 值</li>
</ul>
@@intro:en
<p class="lead"><strong>COUNT</strong> is an aggregate — it collapses many rows into one number.</p>
<pre><code>SELECT COUNT(*)            FROM orders;        -- all rows
SELECT COUNT(email)        FROM users;         -- rows where email IS NOT NULL
SELECT COUNT(DISTINCT city) FROM users;        -- distinct cities</code></pre>
<ul>
  <li><code>COUNT(*)</code> — every row (NULLs included)</li>
  <li><code>COUNT(col)</code> — only rows where <code>col</code> is NOT NULL</li>
  <li><code>COUNT(DISTINCT col)</code> — distinct non-NULL values</li>
</ul>
@@task:zh 一句查询返回三个数：<code>total_users</code>（总行数）、<code>users_with_email</code>（有邮箱的人数）、<code>distinct_cities</code>（不同城市的数量）。
@@task:en
Return three numbers in one query: <code>total_users</code> (all rows), <code>users_with_email</code> (rows with non-null email), and <code>distinct_cities</code> (number of distinct cities).
@@hint:zh <code>COUNT(*)</code>、<code>COUNT(email)</code>、<code>COUNT(DISTINCT city)</code>，各自用 AS 起别名。
@@hint:en Use <code>COUNT(*)</code>, <code>COUNT(email)</code>, and <code>COUNT(DISTINCT city)</code>, each with an AS alias.
@@starter:zh
@@starter:en`);
