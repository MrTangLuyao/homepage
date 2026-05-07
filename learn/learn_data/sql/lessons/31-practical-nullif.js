LEARN.lesson('sql', 31, `
@@schema c31_schema
@@chapterRef sql-syntax-guide-3
@@expectedSql SELECT name, returns * 1.0 / NULLIF(sales, 0) AS return_rate FROM products
@@checkOrder false
@@tables products
@@difficulty:zh 中级
@@difficulty:en Intermediate
@@intro:zh
<p class="lead">SQLite 里整数除以 0 会得到 NULL，而 MySQL 会报错。无论哪种，都会让查询失败或返回意外值。</p>
<p>SQL 标准函数 <strong>NULLIF(a, b)</strong>：当 <code>a = b</code> 时返回 NULL，否则返回 <code>a</code>。除法时用它把 0 换成 NULL，整个表达式就<strong>安全地变 NULL</strong>。</p>
<pre><code>-- 危险写法
returns / sales

-- 安全写法
returns * 1.0 / NULLIF(sales, 0)</code></pre>
<p>结合 <code>COALESCE</code> 还能把 NULL 再换成 0：<code>COALESCE(returns * 1.0 / NULLIF(sales, 0), 0)</code>。</p>
@@intro:en
<p class="lead">In SQLite an integer divided by 0 yields NULL; in MySQL it raises an error. Either way the query goes off-rails.</p>
<p>The standard helper <strong>NULLIF(a, b)</strong>: returns NULL when <code>a = b</code>, else <code>a</code>. Wrap the divisor with it — the whole expression <strong>safely becomes NULL</strong> when the divisor is 0.</p>
<pre><code>-- dangerous
returns / sales

-- safe
returns * 1.0 / NULLIF(sales, 0)</code></pre>
<p>Combine with <code>COALESCE</code> to swap NULL out for 0: <code>COALESCE(returns * 1.0 / NULLIF(sales, 0), 0)</code>.</p>
@@task:zh
查出每件商品的<strong>退货率</strong>（<code>returns / sales</code>，<strong>浮点</strong>）。如果 sales 为 0，<strong>不要让查询出错</strong>，让那一行的退货率显示为 NULL。返回两列：<code>name</code>、<code>return_rate</code>。
@@task:en
For each product return its <strong>return rate</strong> (<code>returns / sales</code>, <strong>as a float</strong>). When sales is 0, <strong>do not let the query fail</strong> — show NULL for that row's rate. Two columns: <code>name</code>, <code>return_rate</code>.
@@hint:zh <code>returns * 1.0 / NULLIF(sales, 0) AS return_rate</code>。
@@hint:en <code>returns * 1.0 / NULLIF(sales, 0) AS return_rate</code>.
@@starter:zh
@@starter:en`);
