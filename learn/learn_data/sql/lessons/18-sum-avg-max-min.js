LEARN.lesson('sql', 18, `
@@schema c18_schema
@@chapterRef sql-syntax-guide-2
@@expectedSql
SELECT SUM(total) AS total_revenue,
       AVG(total) AS avg_order,
       MAX(total) AS max_order,
       MIN(total) AS min_order
FROM orders
@@checkOrder false
@@tables orders
@@difficulty:zh 中级
@@difficulty:en Intermediate
@@intro:zh
<p class="lead">和 COUNT 类似的聚合函数：</p>
<table>
  <thead><tr><th>函数</th><th>作用</th></tr></thead>
  <tbody>
    <tr><td><code>SUM(列)</code></td><td>求和（忽略 NULL）</td></tr>
    <tr><td><code>AVG(列)</code></td><td>平均值（忽略 NULL）</td></tr>
    <tr><td><code>MAX(列)</code></td><td>最大值（数字、字符串、日期都行）</td></tr>
    <tr><td><code>MIN(列)</code></td><td>最小值</td></tr>
  </tbody>
</table>
<pre><code>SELECT SUM(total), AVG(total), MAX(total), MIN(total) FROM orders;</code></pre>
<blockquote>没有 <code>GROUP BY</code> 时，聚合函数把<strong>整张表</strong>折成一行。</blockquote>
@@intro:en
<p class="lead">Cousins of COUNT:</p>
<table>
  <thead><tr><th>Function</th><th>What it does</th></tr></thead>
  <tbody>
    <tr><td><code>SUM(col)</code></td><td>Total (NULLs ignored)</td></tr>
    <tr><td><code>AVG(col)</code></td><td>Average (NULLs ignored)</td></tr>
    <tr><td><code>MAX(col)</code></td><td>Largest value — works for numbers, strings, dates</td></tr>
    <tr><td><code>MIN(col)</code></td><td>Smallest value</td></tr>
  </tbody>
</table>
<pre><code>SELECT SUM(total), AVG(total), MAX(total), MIN(total) FROM orders;</code></pre>
<blockquote>Without <code>GROUP BY</code>, an aggregate collapses <strong>the whole table</strong> to one row.</blockquote>
@@task:zh
一句查询返回 <code>orders</code> 表的<strong>总销售额</strong>、<strong>平均订单金额</strong>、<strong>最大订单</strong>、<strong>最小订单</strong>，分别取别名 <code>total_revenue</code>、<code>avg_order</code>、<code>max_order</code>、<code>min_order</code>。
@@task:en
In one query, return <strong>total revenue</strong>, <strong>average order</strong>, <strong>biggest order</strong>, and <strong>smallest order</strong> from <code>orders</code>, aliased as <code>total_revenue</code>, <code>avg_order</code>, <code>max_order</code>, <code>min_order</code>.
@@hint:zh 四个聚合函数放在同一个 SELECT 里。
@@hint:en Put all four aggregates in the same SELECT.
@@starter:zh
@@starter:en`);
