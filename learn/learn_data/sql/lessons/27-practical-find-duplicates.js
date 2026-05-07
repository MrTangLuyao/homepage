LEARN.lesson('sql', 27, `
@@schema c27_schema
@@chapterRef sql-syntax-guide-3
@@expectedSql SELECT email, COUNT(*) AS n FROM users GROUP BY email HAVING COUNT(*) > 1
@@checkOrder false
@@tables users
@@difficulty:zh 中级
@@difficulty:en Intermediate
@@intro:zh
<p class="lead">数据清洗的第一题：哪些<strong>邮箱 / 用户名 / 订单号</strong>出现了不止一次？</p>
<pre><code>SELECT email, COUNT(*) AS n
FROM users
GROUP BY email
HAVING COUNT(*) &gt; 1;</code></pre>
<p>套路：<strong>GROUP BY 你怀疑重复的列</strong>，<strong>HAVING COUNT(*) &gt; 1</strong>。返回的就是被重复过的值和它出现的次数。</p>
<p>博客 Part 27 还有更多类似的实用技巧：</p>
<ul>
  <li>27.2 找前 N 名（带并列）</li>
  <li>27.3 每组里取最大 / 最小那一行</li>
  <li>27.4 算累计百分比</li>
  <li>27.7 防止除零错误</li>
  <li>27.9 取第 N 大的值</li>
</ul>
@@intro:en
<p class="lead">The classic data-cleaning question: which <strong>emails / usernames / order IDs</strong> appear more than once?</p>
<pre><code>SELECT email, COUNT(*) AS n
FROM users
GROUP BY email
HAVING COUNT(*) &gt; 1;</code></pre>
<p>Recipe: <strong>GROUP BY the column you suspect is duplicated</strong>, then <strong>HAVING COUNT(*) &gt; 1</strong>. The result is each repeated value with its count.</p>
<p>Blog Part 27 covers more recipes:</p>
<ul>
  <li>27.2 top N with ties</li>
  <li>27.3 the row with max/min in each group</li>
  <li>27.4 cumulative percentages</li>
  <li>27.7 avoid division-by-zero</li>
  <li>27.9 the N-th largest value</li>
</ul>
@@task:zh 查出<strong>注册邮箱重复</strong>的所有 email，以及每个 email 被使用了多少次（次数 &gt; 1 才算重复）。返回两列：<code>email</code>、<code>n</code>。
@@task:en
Find every <strong>email that has been used more than once</strong>, and how many users used it. Two columns: <code>email</code>, <code>n</code>.
@@hint:zh GROUP BY email + HAVING COUNT(*) &gt; 1。
@@hint:en GROUP BY email + HAVING COUNT(*) > 1.
@@starter:zh
@@starter:en`);
