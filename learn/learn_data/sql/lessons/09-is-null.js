LEARN.lesson('sql', 9, `
@@schema c9_schema
@@chapterRef sql-syntax-guide-1
@@expectedSql SELECT id, name FROM employees WHERE manager_id IS NULL
@@checkOrder false
@@tables employees
@@difficulty:zh 入门
@@difficulty:en Beginner
@@intro:zh
<p class="lead">SQL 的 <strong>NULL</strong> 表示「未知」，不等于 0、空字符串或 false。</p>
<p>关键规则：<strong>NULL 不能用 <code>=</code> 比较</strong>。<code>WHERE x = NULL</code> 永远 0 行。必须用：</p>
<pre><code>WHERE x IS NULL
WHERE x IS NOT NULL</code></pre>
@@intro:en
<p class="lead">SQL's <strong>NULL</strong> means "unknown" — not 0, not an empty string, not false.</p>
<p>The key rule: <strong>you cannot compare to NULL with <code>=</code></strong>. <code>WHERE x = NULL</code> always returns 0 rows. Use:</p>
<pre><code>WHERE x IS NULL
WHERE x IS NOT NULL</code></pre>
@@task:zh 从 <code>employees</code> 里找出 <strong>没有上级（manager_id 为空）</strong>的员工，返回 <code>id</code> 和 <code>name</code>。
@@task:en
From <code>employees</code>, find everyone who has <strong>no manager (manager_id is null)</strong>; return <code>id</code> and <code>name</code>.
@@hint:zh 用 <code>manager_id IS NULL</code>，不能用 <code>= NULL</code>。
@@hint:en Use <code>manager_id IS NULL</code> — never <code>= NULL</code>.
@@starter:zh
@@starter:en`);
