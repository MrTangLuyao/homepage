LEARN.lesson('python', 39, `
@@chapterRef python-tute-2
@@difficulty:zh 初级
@@difficulty:en Elementary
@@intro:zh
<p class="lead"><code>sorted()</code> 接受任意可迭代对象，返回<strong>新的有序列表</strong>（不修改原数据）。<code>key</code> 参数接受一个函数，用来从每个元素中提取排序依据：</p>
<pre><code>words = ["banana", "apple", "fig"]
print(sorted(words))            # ['apple', 'banana', 'fig']  ← 字母序（默认）
print(sorted(words, key=len))   # ['fig', 'apple', 'banana']  ← 按字符串长度</code></pre>
<p><code>sorted()</code> vs 列表的 <code>.sort()</code>：</p>
<table><thead><tr><th></th><th><code>sorted(lst)</code></th><th><code>lst.sort()</code></th></tr></thead><tbody>
<tr><td>返回值</td><td>新列表</td><td><code>None</code>（原地修改）</td></tr>
<tr><td>原列表</td><td>不变</td><td>被修改</td></tr>
<tr><td>适用对象</td><td>任意可迭代</td><td>仅列表</td></tr>
</tbody></table>
<p>用 <code>reverse=True</code> 降序排列：</p>
<pre><code>print(sorted(words, reverse=True))            # 字母倒序
print(sorted(words, key=len, reverse=True))   # 从长到短</code></pre>
@@intro:en
<p class="lead"><code>sorted()</code> accepts any iterable and returns a <strong>new sorted list</strong> (original data unchanged). The <code>key</code> parameter takes a function that extracts the sort criterion from each element:</p>
<pre><code>words = ["banana", "apple", "fig"]
print(sorted(words))            # ['apple', 'banana', 'fig']  ← alphabetical (default)
print(sorted(words, key=len))   # ['fig', 'apple', 'banana']  ← by string length</code></pre>
<p><code>sorted()</code> vs list's <code>.sort()</code>:</p>
<table><thead><tr><th></th><th><code>sorted(lst)</code></th><th><code>lst.sort()</code></th></tr></thead><tbody>
<tr><td>Return value</td><td>new list</td><td><code>None</code> (in-place)</td></tr>
<tr><td>Original list</td><td>unchanged</td><td>modified</td></tr>
<tr><td>Works on</td><td>any iterable</td><td>lists only</td></tr>
</tbody></table>
<p>Use <code>reverse=True</code> for descending order:</p>
<pre><code>print(sorted(words, reverse=True))            # reverse alphabetical
print(sorted(words, key=len, reverse=True))   # longest first</code></pre>
@@task:zh <code>words = ["banana", "apple", "fig", "cherry"]</code>，分两行输出：按字母序排序的结果、按长度排序的结果
@@task:en
Given <code>words = ["banana", "apple", "fig", "cherry"]</code>, print two lines: sorted alphabetically, then sorted by length
@@hint:zh sorted(words) 字母序，sorted(words, key=len) 按长度。
@@hint:en sorted(words) for alphabetical, sorted(words, key=len) for by length.
@@starter:zh
words = ["banana", "apple", "fig", "cherry"]

@@starter:en
words = ["banana", "apple", "fig", "cherry"]

@@answer
words = ["banana", "apple", "fig", "cherry"]
print(sorted(words))
print(sorted(words, key=len))

@@expectedOutput
['apple', 'banana', 'cherry', 'fig']
['fig', 'apple', 'banana', 'cherry']
`);
