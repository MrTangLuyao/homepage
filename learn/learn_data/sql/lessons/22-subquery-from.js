LEARN.lesson('sql', 22, `
@@schema c20_schema
@@chapterRef sql-syntax-guide-3
@@expectedSql
SELECT MAX(spent) AS top_spent
FROM (SELECT customer, SUM(total) AS spent FROM orders GROUP BY customer) AS per_customer
@@checkOrder false
@@tables orders
@@difficulty:zh 中级
@@difficulty:en Intermediate
@@intro:zh
<p class="lead">子查询也能放在 FROM 里，被当成<strong>临时表</strong>（派生表）参与查询。</p>
<pre><code>SELECT AVG(spent) AS avg_spent
FROM (
  SELECT customer, SUM(total) AS spent
  FROM orders
  GROUP BY customer
) AS per_customer;</code></pre>
<p>典型场景：<strong>先聚合，再对聚合结果继续查</strong>。比如「每个顾客先求总消费，再求平均消费」 —— 一句 SQL 干不动，但派生表能。</p>
<blockquote>派生表必须有<strong>别名</strong>（上例中的 <code>per_customer</code>），即使不引用。</blockquote>
@@intro:en
<p class="lead">Subqueries can also live in FROM as a <strong>derived table</strong> — a temporary table within the query.</p>
<pre><code>SELECT AVG(spent) AS avg_spent
FROM (
  SELECT customer, SUM(total) AS spent
  FROM orders
  GROUP BY customer
) AS per_customer;</code></pre>
<p>Classic use: "<strong>aggregate, then query the aggregates</strong>" — e.g. "first sum each customer's spend, then take the mean of those sums".</p>
<blockquote>A derived table <strong>must have an alias</strong> (above: <code>per_customer</code>), even if you never reference it.</blockquote>
@@task:zh 先按顾客把订单金额求和（每人一个总数），然后查出<strong>这些总数里的最大值</strong>，列名 <code>top_spent</code>。要求用 FROM 子查询。
@@task:en
First sum each customer's order totals, then return the <strong>largest of those sums</strong> as <code>top_spent</code>. You must use a derived table (subquery in FROM).
@@hint:zh 内层 GROUP BY customer 求 SUM；外层 SELECT MAX。
@@hint:en Inner query: GROUP BY customer with SUM. Outer: MAX over that.
@@starter:zh
@@starter:en`);
