LEARN.lesson('sql', 19, `
@@schema c18_schema
@@chapterRef sql-syntax-guide-2
@@expectedSql SELECT customer, COUNT(*) AS orders_count, SUM(total) AS spent FROM orders GROUP BY customer
@@checkOrder false
@@tables orders
@@difficulty:zh 中级
@@difficulty:en Intermediate
@@intro:zh
<p class="lead"><strong>GROUP BY</strong> 把行<strong>按某列分组</strong>，每组聚合成一行。「每个 X 的 Y」就用它。</p>
<pre><code>SELECT customer, COUNT(*) AS orders_count, SUM(total) AS spent
FROM orders
GROUP BY customer;</code></pre>
<p>规则：SELECT 里出现的<strong>非聚合列</strong>，必须出现在 GROUP BY 里（这就是 <code>only_full_group_by</code> 模式）。</p>
<blockquote>「每个 X 的 ... 」 → GROUP BY X，SELECT 里只能放 X 本身和聚合（<code>COUNT</code>、<code>SUM</code> 等）。</blockquote>
@@intro:en
<p class="lead"><strong>GROUP BY</strong> bins rows <strong>by a column value</strong> and collapses each bin to one row. "For each X, the Y" — that's GROUP BY.</p>
<pre><code>SELECT customer, COUNT(*) AS orders_count, SUM(total) AS spent
FROM orders
GROUP BY customer;</code></pre>
<p>Rule: every <strong>non-aggregate column</strong> in SELECT must also appear in GROUP BY (that's <code>only_full_group_by</code> mode).</p>
<blockquote>"For each X, the …" → GROUP BY X, and SELECT can only project X itself and aggregate functions (<code>COUNT</code>, <code>SUM</code>, …).</blockquote>
@@task:zh 查出<strong>每个顾客</strong>的订单数和总消费，返回三列：<code>customer</code>、<code>orders_count</code>、<code>spent</code>。
@@task:en
For <strong>each customer</strong>, return order count and total spent. Three columns: <code>customer</code>, <code>orders_count</code>, <code>spent</code>.
@@hint:zh <code>GROUP BY customer</code>，SELECT 里放 <code>customer</code>、<code>COUNT(*)</code>、<code>SUM(total)</code>。
@@hint:en <code>GROUP BY customer</code>, then SELECT <code>customer</code>, <code>COUNT(*)</code>, <code>SUM(total)</code>.
@@starter:zh
@@starter:en`);
