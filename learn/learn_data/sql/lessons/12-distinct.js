LEARN.lesson('sql', 12, `
@@schema c12_schema
@@chapterRef sql-syntax-guide-2
@@expectedSql SELECT DISTINCT category FROM products
@@checkOrder false
@@tables products
@@difficulty:zh 入门
@@difficulty:en Beginner
@@intro:zh
<p class="lead"><strong>DISTINCT</strong> 放在 SELECT 后面，把重复行去掉，只保留<strong>不同的组合</strong>。</p>
<pre><code>SELECT DISTINCT category FROM products;        -- 所有出现过的 category
SELECT DISTINCT city, country FROM orders;     -- 不重复的 (city, country) 组合</code></pre>
<p>注意 DISTINCT 作用于<strong>整行的列组合</strong>，不是单独某一列。</p>
@@intro:en
<p class="lead"><strong>DISTINCT</strong> after SELECT removes duplicate rows — it keeps only the <strong>unique combinations</strong> of the projected columns.</p>
<pre><code>SELECT DISTINCT category FROM products;        -- every distinct category
SELECT DISTINCT city, country FROM orders;     -- unique (city, country) pairs</code></pre>
<p>Important: DISTINCT looks at <strong>the whole projected row</strong>, not a single column.</p>
@@task:zh 从 <code>products</code> 里查出 <strong>所有不重复的 category</strong>。
@@task:en Return <strong>all distinct categories</strong> from <code>products</code>.
@@hint:zh <code>SELECT DISTINCT category FROM products</code>。
@@hint:en <code>SELECT DISTINCT category FROM products</code>.
@@starter:zh
@@starter:en`);
