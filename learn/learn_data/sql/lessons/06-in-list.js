LEARN.lesson('sql', 6, `
@@schema c6_schema
@@chapterRef sql-syntax-guide-1
@@expectedSql SELECT name, category FROM products WHERE category IN ('fruit', 'drink')
@@checkOrder false
@@tables products
@@difficulty:zh 入门
@@difficulty:en Beginner
@@intro:zh
<p class="lead">判断一个值<strong>是不是在多个候选里</strong>，写 <code>IN (...)</code> 比一串 <code>OR</code> 优雅。</p>
<pre><code>WHERE category IN ('fruit', 'drink');
-- 等价于
WHERE category = 'fruit' OR category = 'drink';</code></pre>
<p><code>NOT IN</code> 找不在列表里的行；但<strong>列表里有 NULL 时 NOT IN 会返回 0 行</strong>，要小心。</p>
@@intro:en
<p class="lead">Test if a value is <strong>among several options</strong> with <code>IN (...)</code> — cleaner than chaining <code>OR</code>s.</p>
<pre><code>WHERE category IN ('fruit', 'drink');
-- equivalent to
WHERE category = 'fruit' OR category = 'drink';</code></pre>
<p><code>NOT IN</code> excludes rows in the list — but <strong>if the list contains NULL, NOT IN returns 0 rows</strong>. Watch out.</p>
@@task:zh 查出所有<strong> category 是 fruit 或 drink </strong>的商品，返回 <code>name</code> 和 <code>category</code>。
@@task:en
Return the <code>name</code> and <code>category</code> of every product whose <strong>category is fruit or drink</strong>.
@@hint:zh 用 <code>category IN ('fruit', 'drink')</code>。
@@hint:en Use <code>category IN ('fruit', 'drink')</code>.
@@starter:zh
@@starter:en`);
