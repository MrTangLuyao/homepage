LEARN.lesson('python', 36, `
@@chapterRef python-tute-2
@@difficulty:zh 初级
@@difficulty:en Elementary
@@intro:zh
<p class="lead">集合支持四种数学集合运算，运算符和对应方法均可使用：</p>
<table><thead><tr><th>运算</th><th>符号</th><th>方法</th><th>含义</th></tr></thead><tbody>
<tr><td>交集</td><td><code>A &amp; B</code></td><td><code>A.intersection(B)</code></td><td>两个集合都有的元素</td></tr>
<tr><td>并集</td><td><code>A | B</code></td><td><code>A.union(B)</code></td><td>两个集合中所有元素</td></tr>
<tr><td>差集</td><td><code>A - B</code></td><td><code>A.difference(B)</code></td><td>在 A 中但不在 B 中</td></tr>
<tr><td>对称差</td><td><code>A ^ B</code></td><td><code>A.symmetric_difference(B)</code></td><td>只在其中一个集合里</td></tr>
</tbody></table>
<pre><code>A = {1, 2, 3, 4}
B = {3, 4, 5, 6}
print(A & B)   # {3, 4}       ← 交集：公共元素
print(A | B)   # {1,2,3,4,5,6} ← 并集：全部元素
print(A - B)   # {1, 2}       ← 差集：A 有 B 没有
print(A ^ B)   # {1, 2, 5, 6} ← 对称差：各自独有</code></pre>
<p>因为集合无序，输出顺序不定。需要固定顺序时，用 <code>sorted()</code> 包起来：</p>
<pre><code>print(sorted(A & B))   # [3, 4]（变成有序列表）</code></pre>
@@intro:en
<p class="lead">Sets support four mathematical set operations — both operator and method syntax work:</p>
<table><thead><tr><th>Op</th><th>Symbol</th><th>Method</th><th>Meaning</th></tr></thead><tbody>
<tr><td>Intersection</td><td><code>A &amp; B</code></td><td><code>A.intersection(B)</code></td><td>elements in both sets</td></tr>
<tr><td>Union</td><td><code>A | B</code></td><td><code>A.union(B)</code></td><td>all elements from either set</td></tr>
<tr><td>Difference</td><td><code>A - B</code></td><td><code>A.difference(B)</code></td><td>in A but not in B</td></tr>
<tr><td>Symmetric diff.</td><td><code>A ^ B</code></td><td><code>A.symmetric_difference(B)</code></td><td>in exactly one set</td></tr>
</tbody></table>
<pre><code>A = {1, 2, 3, 4}
B = {3, 4, 5, 6}
print(A & B)   # {3, 4}         ← intersection: common elements
print(A | B)   # {1,2,3,4,5,6}  ← union: everything
print(A - B)   # {1, 2}         ← difference: in A, not in B
print(A ^ B)   # {1, 2, 5, 6}   ← symmetric diff: each set's unique elements</code></pre>
<p>Sets are unordered, so print order may vary. Wrap in <code>sorted()</code> for a stable, predictable order:</p>
<pre><code>print(sorted(A & B))   # [3, 4]  (converted to a sorted list)</code></pre>
@@task:zh <code>A = {1,2,3,4}</code>，<code>B = {3,4,5,6}</code>，分两行输出：sorted(交集)、sorted(差集 A-B)
@@task:en
Given <code>A = {1,2,3,4}</code> and <code>B = {3,4,5,6}</code>, print two lines: sorted(intersection) and sorted(difference A-B)
@@hint:zh A & B 交集，A - B 差集，都用 sorted() 包起来。
@@hint:en A & B for intersection, A - B for difference, wrap both in sorted().
@@starter:zh
A = {1, 2, 3, 4}
B = {3, 4, 5, 6}

@@starter:en
A = {1, 2, 3, 4}
B = {3, 4, 5, 6}

@@answer
A = {1, 2, 3, 4}
B = {3, 4, 5, 6}
print(sorted(A & B))
print(sorted(A - B))

@@expectedOutput
[3, 4]
[1, 2]
`);
