LEARN.lesson('sql', 33, `
@@schema final_schema
@@expectedSql
SELECT br.id AS branch_id, COUNT(c.id) AS copy_count
FROM branches br
LEFT JOIN copies c ON c.branch_id = br.id
GROUP BY br.id
@@checkOrder false
@@tables branches, copies
@@difficulty:zh 进阶
@@difficulty:en Advanced
@@intro:zh
<p class="lead">综合大题登场。这一关的关键：<strong>没有副本的分馆也要出现</strong>，数量为 0。</p>
<p>这是大学课程作业里最常见的一类题：「每个 X 的 Y 数，包括 Y=0 的 X」。INNER JOIN 会丢掉空分馆 —— 必须用 <strong>LEFT JOIN</strong>。</p>
<p>另一个细节：用 <code>COUNT(c.id)</code> 而不是 <code>COUNT(*)</code>。LEFT JOIN 时空分馆会得到一行 <code>copies</code> 全为 NULL —— <code>COUNT(c.id)</code> 不会数 NULL，所以正确返回 0；<code>COUNT(*)</code> 会数那一行，错误返回 1。</p>
@@intro:en
<p class="lead">Final challenges start here. The trick: <strong>branches with no copies must still appear</strong> with a 0.</p>
<p>The classic university-assignment shape: "for every X, the count of Y, including X with no Y". INNER JOIN drops the empty branches — you need <strong>LEFT JOIN</strong>.</p>
<p>Bonus subtlety: use <code>COUNT(c.id)</code>, not <code>COUNT(*)</code>. After LEFT JOIN an empty branch produces one row whose <code>copies</code> columns are all NULL — <code>COUNT(c.id)</code> ignores NULL and gives 0; <code>COUNT(*)</code> counts that row and wrongly gives 1.</p>
@@task:zh
查出<strong>每个分馆</strong>的 <code>id</code> 和该分馆<strong>藏书副本（copies 表）的数量</strong>。<strong>没有副本的分馆也要出现</strong>，数量为 0。返回两列：<code>branch_id</code>、<code>copy_count</code>。
@@task:en
For <strong>every branch</strong>, return its <code>id</code> and the <strong>number of book copies based at it</strong>. <strong>Empty branches must appear</strong> with 0. Two columns: <code>branch_id</code>, <code>copy_count</code>.
@@hint:zh 从 branches 出发 LEFT JOIN copies；GROUP BY 分馆 id；用 <code>COUNT(c.id)</code> 而不是 <code>COUNT(*)</code>。
@@hint:en Start from branches, LEFT JOIN copies; GROUP BY branch id; use <code>COUNT(c.id)</code>, not <code>COUNT(*)</code>.
@@starter:zh
@@starter:en`);
