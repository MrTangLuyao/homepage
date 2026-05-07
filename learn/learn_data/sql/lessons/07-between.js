LEARN.lesson('sql', 7, `
@@schema c7_schema
@@chapterRef sql-syntax-guide-1
@@expectedSql SELECT * FROM orders WHERE order_date BETWEEN '2024-04-01' AND '2024-06-30'
@@checkOrder false
@@tables orders
@@difficulty:zh 入门
@@difficulty:en Beginner
@@intro:zh
<p class="lead"><strong>BETWEEN x AND y</strong> 判断在 [x, y] 区间内（<strong>包含两端</strong>）。</p>
<pre><code>-- 等价
WHERE score &gt;= 80 AND score &lt;= 90
WHERE score BETWEEN 80 AND 90</code></pre>
<p>必须 <strong>BETWEEN 小 AND 大</strong>，反着写得到 0 行。日期也能用。</p>
@@intro:en
<p class="lead"><strong>BETWEEN x AND y</strong> is "in the closed interval [x, y]" — <strong>both ends included</strong>.</p>
<pre><code>-- equivalent
WHERE score &gt;= 80 AND score &lt;= 90
WHERE score BETWEEN 80 AND 90</code></pre>
<p>Always <strong>BETWEEN small AND large</strong> — backwards returns 0 rows. Works on dates too.</p>
@@task:zh 查出 <strong>2024 年第二季度（4–6 月）</strong>的订单，返回所有列。要求用 <code>BETWEEN</code>。
@@task:en Return every order in <strong>Q2 of 2024 (April–June)</strong>, all columns. You must use <code>BETWEEN</code>.
@@hint:zh <code>WHERE order_date BETWEEN '2024-04-01' AND '2024-06-30'</code>。
@@hint:en <code>WHERE order_date BETWEEN '2024-04-01' AND '2024-06-30'</code>.
@@starter:zh
@@starter:en`);
