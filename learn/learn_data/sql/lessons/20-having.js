LEARN.lesson('sql', 20, `
@@schema c20_schema
@@chapterRef sql-syntax-guide-2
@@expectedSql SELECT customer, COUNT(*) AS orders_count FROM orders GROUP BY customer HAVING COUNT(*) >= 2
@@checkOrder false
@@tables orders
@@difficulty:zh 中级
@@difficulty:en Intermediate
@@intro:zh
<p class="lead"><strong>WHERE</strong> 在分组<strong>之前</strong>过滤行；<strong>HAVING</strong> 在分组<strong>之后</strong>过滤聚合结果。</p>
<pre><code>SELECT customer, SUM(total) AS spent
FROM orders
GROUP BY customer
HAVING SUM(total) &gt; 50;</code></pre>
<p>HAVING 里能用聚合函数（<code>SUM</code>、<code>COUNT</code>），WHERE 里不能。</p>
<table>
  <thead><tr><th>子句</th><th>过滤的对象</th></tr></thead>
  <tbody>
    <tr><td>WHERE</td><td>原始行（一行一行看）</td></tr>
    <tr><td>HAVING</td><td>分组后的聚合结果（一组一组看）</td></tr>
  </tbody>
</table>
@@intro:en
<p class="lead"><strong>WHERE</strong> filters rows <strong>before</strong> grouping; <strong>HAVING</strong> filters group aggregates <strong>after</strong>.</p>
<pre><code>SELECT customer, SUM(total) AS spent
FROM orders
GROUP BY customer
HAVING SUM(total) &gt; 50;</code></pre>
<p>HAVING can use aggregates (<code>SUM</code>, <code>COUNT</code>); WHERE cannot.</p>
<table>
  <thead><tr><th>Clause</th><th>What it filters</th></tr></thead>
  <tbody>
    <tr><td>WHERE</td><td>Raw rows (one row at a time)</td></tr>
    <tr><td>HAVING</td><td>Group aggregates (one group at a time)</td></tr>
  </tbody>
</table>
@@task:zh 查出<strong>下过 2 单及以上</strong>的顾客和他们的订单数，两列：<code>customer</code>、<code>orders_count</code>。
@@task:en
Find customers who placed <strong>at least 2 orders</strong>; return <code>customer</code> and <code>orders_count</code>.
@@hint:zh GROUP BY customer + <code>HAVING COUNT(*) &gt;= 2</code>。
@@hint:en GROUP BY customer + <code>HAVING COUNT(*) &gt;= 2</code>.
@@starter:zh
@@starter:en`);
