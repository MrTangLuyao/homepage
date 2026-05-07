LEARN.lesson('python', 34, `
@@chapterRef python-tute-2
@@difficulty:zh 初级
@@difficulty:en Elementary
@@intro:zh
<p class="lead">用字典统计频次是非常经典的用法。核心逻辑：遍历序列，如果元素已在字典中就 +1，否则初始化为 1：</p>
<pre><code>text = "the cat sat on the mat"
count = {}
for word in text.split():
    if word in count:
        count[word] += 1
    else:
        count[word] = 1

print(count)          # {'the': 2, 'cat': 1, 'sat': 1, 'on': 1, 'mat': 1}
print(count["the"])   # 2</code></pre>
<p>更简洁的写法是用 <code>.get()</code> 的默认值，避免 if/else：</p>
<pre><code>count = {}
for word in text.split():
    count[word] = count.get(word, 0) + 1
    # 如果 word 不在 count 里，get 返回 0，再加 1 就是 1</code></pre>
<p>Python 标准库还提供了 <code>collections.Counter</code>，一行完成统计，课程后续会介绍。现在先掌握手写版本，理解其背后的逻辑。</p>
@@intro:en
<p class="lead">Counting frequencies with a dict is a classic pattern. The logic: iterate over a sequence; if the element already has a key, increment it; otherwise initialise to 1:</p>
<pre><code>text = "the cat sat on the mat"
count = {}
for word in text.split():
    if word in count:
        count[word] += 1
    else:
        count[word] = 1

print(count)          # {'the': 2, 'cat': 1, 'sat': 1, 'on': 1, 'mat': 1}
print(count["the"])   # 2</code></pre>
<p>A more concise version uses <code>.get()</code> with a default, avoiding the if/else:</p>
<pre><code>count = {}
for word in text.split():
    count[word] = count.get(word, 0) + 1
    # if word isn't in count, get returns 0, then +1 gives 1</code></pre>
<p>Python's standard library also has <code>collections.Counter</code> which does this in one line — covered later. For now, master the manual version to understand what's happening underneath.</p>
@@task:zh 统计字符串 <code>"mississippi"</code> 中每个字母出现的次数，分两行输出 <code>"s"</code> 的次数和 <code>"i"</code> 的次数
@@task:en Count each letter in <code>"mississippi"</code>, print the count for <code>"s"</code> and <code>"i"</code> on two lines
@@hint:zh 对每个字符 c 用同样的 if/else 计数模式，最后输出 count["s"] 和 count["i"]。
@@hint:en Apply the same if/else counting pattern to each character c, then print count["s"] and count["i"].
@@starter:zh
text = "mississippi"
count = {}
# 统计每个字符

@@starter:en
text = "mississippi"
count = {}
# count each character

@@answer
text = "mississippi"
count = {}
for c in text:
    if c in count:
        count[c] += 1
    else:
        count[c] = 1
print(count["s"])
print(count["i"])

@@expectedOutput
4
4
`);
