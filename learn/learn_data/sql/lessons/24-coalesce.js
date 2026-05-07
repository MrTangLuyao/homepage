LEARN.lesson('sql', 24, `
@@schema c24_schema
@@chapterRef sql-syntax-guide-3
@@expectedSql SELECT name, price, price - COALESCE(discount, 0) AS final_price FROM sales
@@checkOrder false
@@tables sales
@@difficulty:zh 中级
@@difficulty:en Intermediate
@@intro:zh
<p class="lead"><strong>COALESCE(a, b, c, ...)</strong> 返回参数列表中<strong>第一个非 NULL 值</strong>。最常见的用途是「把 NULL 替换成默认值」。</p>
<pre><code>COALESCE(discount, 0)            -- 没折扣按 0 算
COALESCE(nickname, name)         -- 优先昵称，没昵称用真名
COALESCE(a, b, 'unknown')        -- 多级回退</code></pre>
<p>经典搭配：<strong>LEFT JOIN + COALESCE</strong>。LEFT JOIN 让没匹配的列变 NULL，COALESCE 把 NULL 变 0 或别的占位值。</p>
@@intro:en
<p class="lead"><strong>COALESCE(a, b, c, …)</strong> returns the <strong>first non-NULL argument</strong>. The classic use: "replace NULL with a default".</p>
<pre><code>COALESCE(discount, 0)            -- treat missing discount as 0
COALESCE(nickname, name)         -- prefer nickname; fall back to real name
COALESCE(a, b, 'unknown')        -- multi-level fallback</code></pre>
<p>Pairs perfectly with <strong>LEFT JOIN</strong>: LEFT JOIN turns missing matches into NULL, COALESCE swaps those NULLs for 0 (or any sentinel).</p>
@@task:zh
查出每件商品的 <code>name</code>、<code>price</code>，以及<strong>实付价</strong>（<code>price - discount</code>，没折扣按 0 算），第三列别名 <code>final_price</code>。
@@task:en
Return each product's <code>name</code>, <code>price</code>, and <strong>final price</strong> (<code>price - discount</code>, with NULL discounts treated as 0). Alias the third column <code>final_price</code>.
@@hint:zh 用 <code>price - COALESCE(discount, 0)</code>。
@@hint:en Use <code>price - COALESCE(discount, 0)</code>.
@@starter:zh
@@starter:en`);
