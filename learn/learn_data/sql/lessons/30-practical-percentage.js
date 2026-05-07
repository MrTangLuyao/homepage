LEARN.lesson('sql', 30, `
@@schema c30_schema
@@chapterRef sql-syntax-guide-3
@@expectedSql
SELECT customer,
       SUM(total) AS spent,
       SUM(total) * 100.0 / (SELECT SUM(total) FROM orders) AS pct
FROM orders
GROUP BY customer
@@checkOrder false
@@tables orders
@@difficulty:zh 中级
@@difficulty:en Intermediate
@@intro:zh
<p class="lead">「<strong>每个 X 占总数的多少 %</strong>」 —— GROUP BY 给每行求和，再用<strong>子查询求总数</strong>。</p>
<pre><code>SELECT customer,
       SUM(total) AS spent,
       SUM(total) * 100.0 / (SELECT SUM(total) FROM orders) AS pct
FROM orders
GROUP BY customer;</code></pre>
<p>三个细节：</p>
<ul>
  <li>子查询 <code>(SELECT SUM(total) FROM orders)</code> 返回单值，可以直接参与算术</li>
  <li>乘 <code>100.0</code>（不是 <code>100</code>）—— 强制浮点除法，否则 SQLite 会做整数除法</li>
  <li>外层 GROUP BY，子查询里<strong>不</strong> GROUP BY —— 子查询是「全表的总和」</li>
</ul>
@@intro:en
<p class="lead">"<strong>What % of the total does each X account for?</strong>" — GROUP BY gives the per-group sum; a <strong>subquery gives the grand total</strong>.</p>
<pre><code>SELECT customer,
       SUM(total) AS spent,
       SUM(total) * 100.0 / (SELECT SUM(total) FROM orders) AS pct
FROM orders
GROUP BY customer;</code></pre>
<p>Three details that bite:</p>
<ul>
  <li>The subquery returns one value, plug it straight into arithmetic</li>
  <li>Multiply by <code>100.0</code> not <code>100</code> — forces float division (otherwise SQLite does integer division and you get 0)</li>
  <li>Outer GROUP BY only; subquery has <strong>no</strong> GROUP BY — it's the grand total</li>
</ul>
@@task:zh
每个顾客<strong>消费总额</strong> 以及 <strong>占全店总收入的百分比</strong>。返回三列：<code>customer</code>、<code>spent</code>、<code>pct</code>（百分比，比如 40.0 表示 40%）。
@@task:en
For each customer, return <strong>total spent</strong> and <strong>their share of overall revenue as a percentage</strong>. Three columns: <code>customer</code>, <code>spent</code>, <code>pct</code> (e.g. 40.0 means 40%).
@@hint:zh SUM(total) * 100.0 / (SELECT SUM(total) FROM orders) AS pct —— 注意 100.0 强制浮点。
@@hint:en SUM(total) * 100.0 / (SELECT SUM(total) FROM orders) AS pct — note <code>100.0</code> forces floating point.
@@starter:zh
@@starter:en`);
