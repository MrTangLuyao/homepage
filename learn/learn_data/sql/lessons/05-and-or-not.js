LEARN.lesson('sql', 5, `
@@schema c3_schema
@@chapterRef sql-syntax-guide-1
@@expectedSql SELECT name, age, gender FROM students WHERE age = 18 AND gender = 'F'
@@checkOrder false
@@tables students
@@difficulty:zh 入门
@@difficulty:en Beginner
@@intro:zh
<p class="lead">把多个条件粘在一起：<strong>AND</strong>（同时满足）、<strong>OR</strong>（任一满足）、<strong>NOT</strong>（取反）。</p>
<p><strong>优先级</strong>：NOT &gt; AND &gt; OR。混用 AND 和 OR 时<strong>强烈建议加括号</strong>，让意图明确。</p>
<pre><code>WHERE (age &lt; 20) AND (score &gt; 85)</code></pre>
@@intro:en
<p class="lead">Combine conditions with <strong>AND</strong> (all true), <strong>OR</strong> (any true), or <strong>NOT</strong> (negate).</p>
<p><strong>Precedence</strong>: NOT &gt; AND &gt; OR. When mixing AND and OR, <strong>add parentheses</strong> to make intent unambiguous.</p>
<pre><code>WHERE (age &lt; 20) AND (score &gt; 85)</code></pre>
@@task:zh
查出 <strong>18 岁的女生</strong>（gender = <code>'F'</code> AND age = 18），返回 <code>name</code>、<code>age</code>、<code>gender</code> 三列。
@@task:en
Return the <code>name</code>, <code>age</code>, and <code>gender</code> of <strong>every 18-year-old female</strong> (gender = <code>'F'</code> AND age = 18).
@@hint:zh 在 WHERE 里用 AND 把两个条件连起来。
@@hint:en Use AND in the WHERE clause to require both conditions.
@@starter:zh
@@starter:en`);
