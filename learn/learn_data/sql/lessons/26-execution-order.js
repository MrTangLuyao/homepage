LEARN.lesson('sql', 26, `
@@schema c26_schema
@@chapterRef sql-syntax-guide-3
@@expectedSql
SELECT customer, COUNT(*) AS orders_count, SUM(total) AS spent
FROM orders
WHERE total >= 10
GROUP BY customer
HAVING COUNT(*) >= 2
ORDER BY spent DESC
LIMIT 3
@@checkOrder true
@@tables orders
@@difficulty:zh 中级
@@difficulty:en Intermediate
@@intro:zh
<p class="lead">SQL 写起来 SELECT 在前，但<strong>逻辑执行顺序完全不一样</strong>：</p>
<pre><code>1. FROM      ← 先决定数据源
2. WHERE     ← 再过滤行
3. GROUP BY  ← 再分组
4. HAVING    ← 再过滤分组
5. SELECT    ← 才计算 SELECT 列（包括别名）
6. ORDER BY  ← 最后排序
7. LIMIT     ← 截取若干行</code></pre>
<p>这能解释几个新手常见疑问：</p>
<ul>
  <li>WHERE 不能用 SELECT 里起的<strong>别名</strong> —— WHERE 在 SELECT 之前执行</li>
  <li>WHERE 不能放<strong>聚合函数</strong> —— 聚合在 GROUP BY 之后才有，用 HAVING</li>
  <li>ORDER BY <strong>能</strong>用 SELECT 别名 —— 它在 SELECT 之后</li>
</ul>
<p>这一关用一句查询练习<strong>从原始数据到最终结果</strong>的完整链：FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT。</p>
@@intro:en
<p class="lead">SQL is <strong>written</strong> SELECT-first, but its <strong>logical execution order</strong> is very different:</p>
<pre><code>1. FROM      ← pick the data source
2. WHERE     ← filter raw rows
3. GROUP BY  ← bin into groups
4. HAVING    ← filter groups
5. SELECT    ← only now compute the projection (and aliases exist)
6. ORDER BY  ← sort
7. LIMIT     ← take the first N</code></pre>
<p>This explains a few classic gotchas:</p>
<ul>
  <li>WHERE can't reference an <strong>alias</strong> from SELECT — WHERE runs first</li>
  <li>WHERE can't use an <strong>aggregate</strong> — aggregates only exist after GROUP BY (use HAVING)</li>
  <li>ORDER BY <strong>can</strong> use SELECT aliases — it runs after SELECT</li>
</ul>
<p>This level chains every clause from raw data to a final list: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT.</p>
@@task:zh
只看<strong>金额 ≥ 10 的订单</strong>（WHERE）；按顾客分组（GROUP BY），算每人的订单数和总消费；只保留<strong>下过 ≥ 2 单</strong>的人（HAVING）；按总消费<strong>从高到低</strong>（ORDER BY）取<strong>前 3 名</strong>（LIMIT）。返回三列：<code>customer</code>、<code>orders_count</code>、<code>spent</code>。
@@task:en
Keep only orders with <strong>total ≥ 10</strong> (WHERE). Group by customer; compute order count and total spent. Keep only customers with <strong>≥ 2 qualifying orders</strong> (HAVING). Sort by spend <strong>descending</strong> (ORDER BY) and take the <strong>top 3</strong> (LIMIT). Three columns: <code>customer</code>, <code>orders_count</code>, <code>spent</code>.
@@hint:zh WHERE total &gt;= 10 → GROUP BY customer → HAVING COUNT(*) &gt;= 2 → ORDER BY spent DESC → LIMIT 3。
@@hint:en WHERE total >= 10 → GROUP BY customer → HAVING COUNT(*) >= 2 → ORDER BY spent DESC → LIMIT 3.
@@starter:zh
@@starter:en`);
