LEARN.lesson('sql', 4, `
@@schema c4_schema
@@chapterRef sql-syntax-guide-1
@@expectedSql SELECT * FROM events WHERE date < '2024-04-01'
@@checkOrder false
@@tables events
@@difficulty:zh 入门
@@difficulty:en Beginner
@@intro:zh
<p class="lead">在 WHERE 里能用六个比较运算符：<code>=</code>、<code>&lt;&gt;</code>（不等于）、<code>&gt;</code>、<code>&lt;</code>、<code>&gt;=</code>、<code>&lt;=</code>。</p>
<p><code>&lt;&gt;</code> 和 <code>!=</code> <strong>等价</strong>，标准是前者。</p>
<p>日期也能用比较运算符，格式是 <code>'YYYY-MM-DD'</code>（这一关里日期存为字符串，按 ISO 格式比较 = 时间顺序）。</p>
@@intro:en
<p class="lead">Inside WHERE you can use six comparison operators: <code>=</code>, <code>&lt;&gt;</code> (not equal), <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code>.</p>
<p><code>&lt;&gt;</code> and <code>!=</code> are <strong>equivalent</strong>; <code>&lt;&gt;</code> is the SQL standard.</p>
<p>Dates compare too — store as <code>'YYYY-MM-DD'</code> ISO strings (lexicographic order = chronological order).</p>
@@task:zh 从 <code>events</code> 表里查出<strong> 2024-04-01 之前发生</strong>的所有事件，返回所有列（用 <code>*</code>）。
@@task:en
From <code>events</code>, return every event that happened <strong>before 2024-04-01</strong> (return all columns with <code>*</code>).
@@hint:zh 用 <code>date &lt; '2024-04-01'</code>，注意日期要带单引号。
@@hint:en Use <code>date &lt; '2024-04-01'</code> — the literal needs single quotes.
@@starter:zh
@@starter:en`);
