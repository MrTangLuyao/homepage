LEARN.lesson('sql', 39, `
@@schema final_schema
@@expectedSql
SELECT m.id,
  CASE WHEN COUNT(l.id) = 0 THEN NULL
       ELSE COALESCE(SUM(l.fine), 0) * 1.0 / COUNT(l.id)
  END AS avg_fine_per_loan
FROM members m
LEFT JOIN loans l ON l.member_id = m.id
GROUP BY m.id
@@checkOrder false
@@tables members, loans
@@difficulty:zh 进阶
@@difficulty:en Advanced
@@intro:zh
<p class="lead">每位会员的<strong>总罚金 ÷ 借阅笔数</strong>。三种边界要全部正确处理：</p>
<ul>
  <li><strong>没借过任何书</strong>的会员 → 结果 NULL（不能除 0）</li>
  <li>借过但<strong>从没罚款</strong> → 结果 0（SUM 在全 NULL 时返回 NULL，要 COALESCE 成 0）</li>
  <li>正常情况 → 浮点除法（乘 1.0 强制转成 REAL，否则 SQLite 会做整数除法）</li>
</ul>
<pre><code>CASE WHEN COUNT(l.id) = 0 THEN NULL
     ELSE COALESCE(SUM(l.fine), 0) * 1.0 / COUNT(l.id)
END</code></pre>
<blockquote>对应 PDF 第 10 题（funding ÷ observations）。</blockquote>
@@intro:en
<p class="lead">Per member: <strong>total fine ÷ number of loans</strong>. Three boundary cases:</p>
<ul>
  <li>Member with <strong>no loans</strong> → NULL (can't divide by zero)</li>
  <li>Has loans but <strong>no fines ever</strong> → 0 (SUM returns NULL when all values are NULL — wrap with COALESCE)</li>
  <li>Normal case → float division (multiply by <code>1.0</code> to force REAL; SQLite does integer division otherwise)</li>
</ul>
<pre><code>CASE WHEN COUNT(l.id) = 0 THEN NULL
     ELSE COALESCE(SUM(l.fine), 0) * 1.0 / COUNT(l.id)
END</code></pre>
<blockquote>This mirrors PDF Q10 (funding ÷ observations).</blockquote>
@@task:zh
<strong>所有会员都要出现</strong>。对每位会员，返回其 <code>id</code> 和「<strong>平均每笔借阅的罚金</strong>」（总罚金 ÷ 借阅笔数）。<strong>没借过书</strong>的会员该值为 NULL；<strong>借过但 fine 全为 NULL/0</strong> 的会员该值为 0。<strong>不要四舍五入</strong>。
@@task:en
<strong>Include every member</strong>. For each, return <code>id</code> and the <strong>average fine per loan</strong> (total fine ÷ loans). Members with <strong>no loans</strong> get NULL; members with loans but no recorded fines get 0. <strong>Do not round.</strong>
@@hint:zh
LEFT JOIN loans + GROUP BY member.id；CASE WHEN COUNT(l.id) = 0 THEN NULL ELSE COALESCE(SUM(l.fine),0) * 1.0 / COUNT(l.id) END。
@@hint:en
LEFT JOIN loans + GROUP BY member.id; wrap in CASE WHEN COUNT(l.id) = 0 THEN NULL ELSE COALESCE(SUM(l.fine),0) * 1.0 / COUNT(l.id) END.
@@starter:zh
@@starter:en`);
