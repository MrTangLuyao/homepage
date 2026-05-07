LEARN.lesson('sql', 16, `
@@schema c16_schema
@@chapterRef sql-syntax-guide-2
@@expectedSql
SELECT c.name AS customer_name, p.name AS product_name, o.total
FROM orders AS o
JOIN customers AS c ON o.customer_id = c.id
JOIN products  AS p ON o.product_id  = p.id
@@checkOrder false
@@tables customers, products, orders
@@difficulty:zh 中级
@@difficulty:en Intermediate
@@intro:zh
<p class="lead">三张以上的表？<strong>JOIN 接着写</strong>就行 —— 每个 JOIN 接一个 ON。</p>
<pre><code>SELECT c.name, p.name, o.total
FROM orders AS o
JOIN customers AS c ON o.customer_id = c.id
JOIN products  AS p ON o.product_id  = p.id;</code></pre>
<p>读法：先有 <code>orders</code>，再把 <code>customers</code> 缝上去，再把 <code>products</code> 缝上去。三张表的别名让查询不啰嗦。</p>
@@intro:en
<p class="lead">Three or more tables? Just <strong>chain JOINs</strong> — each one with its own ON clause.</p>
<pre><code>SELECT c.name, p.name, o.total
FROM orders AS o
JOIN customers AS c ON o.customer_id = c.id
JOIN products  AS p ON o.product_id  = p.id;</code></pre>
<p>Read top-down: start with <code>orders</code>, stitch <code>customers</code> on, then stitch <code>products</code> on. Aliases keep it tidy.</p>
@@task:zh 把每个订单的<strong>顾客名、商品名、订单金额</strong>都拼出来。返回三列：<code>customer_name</code>、<code>product_name</code>、<code>total</code>。
@@task:en
For every order, return the <strong>customer name, product name, and order total</strong>. Three columns: <code>customer_name</code>, <code>product_name</code>, <code>total</code>.
@@hint:zh orders 是核心表，分别 JOIN customers 和 products 两次。
@@hint:en Start from orders and JOIN customers, then JOIN products.
@@starter:zh
@@starter:en`);
