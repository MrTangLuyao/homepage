LEARN.lesson('python', 63, `
@@chapterRef python-tute-3
@@difficulty:zh 综合
@@difficulty:en Comprehensive
@@intro:zh
<p class="lead"><strong>字谜</strong>（Anagram）是指使用相同字母、顺序不同的单词，例如 "eat"、"tea"、"ate" 三个词用的都是 e、a、t 这三个字母。这道题要求把一组单词中的字谜归到同一组。</p>
<p>这是软件面试中出现频率极高的经典题目，核心思路：<strong>同一组字谜，把字母排序后必定相同</strong>——可以用"排序后的字母串"作为字典的键：</p>
<pre><code>"eat"  → sorted → ['a','e','t'] → join → "aet"  ← 键
"tea"  → sorted → ['a','e','t'] → join → "aet"  ← 同一键
"tan"  → sorted → ['a','n','t'] → join → "ant"  ← 不同键</code></pre>
<p>遍历所有单词，把每个词追加到对应键的分组列表里，最终字典的每个值就是一组字谜。</p>
<p>需要注意的细节：</p>
<ul>
<li>先 <code>.lower()</code> 再排序，保证大小写不影响分组（本题词表全为小写，但好习惯）</li>
<li>最终输出需要对结果双重排序：每组内部按字母序排列，所有组之间也按字母序排列</li>
</ul>
@@intro:en
<p class="lead"><strong>Anagrams</strong> are words made from the same letters in different orders — for example "eat", "tea", and "ate" all use exactly the letters e, a, t. This problem groups a list of words so that all anagrams of each other end up in the same bucket.</p>
<p>This is a very common technical interview question. The key insight: <strong>anagrams always produce the same string when you sort their letters</strong> — use that sorted string as a dictionary key:</p>
<pre><code>"eat"  → sorted → ['a','e','t'] → join → "aet"  ← key
"tea"  → sorted → ['a','e','t'] → join → "aet"  ← same key
"tan"  → sorted → ['a','n','t'] → join → "ant"  ← different key</code></pre>
<p>Iterate over all words, appending each to the list for its key. At the end, each dictionary value is one anagram group.</p>
<p>Details to handle:</p>
<ul>
<li><code>.lower()</code> before sorting ensures case doesn't split groups (the word list here is all lowercase, but it's good practice)</li>
<li>The output needs two levels of sorting: sort words within each group alphabetically, and sort the groups themselves alphabetically</li>
</ul>
@@task:zh 实现 <code>group_anagrams(words)</code>，返回分好组并排好序的列表；对给定词表输出每组，格式 <code>Group N: [...]</code>。
@@task:en
Implement <code>group_anagrams(words)</code> returning sorted groups; print each group in the format <code>Group N: [...]</code>.
@@hint:zh key = "".join(sorted(word.lower()))；最终 return [sorted(g) for g in sorted(groups.values())]。
@@hint:en key = "".join(sorted(word.lower())); finally return [sorted(g) for g in sorted(groups.values())].
@@starter:zh
def group_anagrams(words):
    groups = {}
    for word in words:
        # 计算规范键，添加到对应组
        pass
    # 返回排好序的分组列表
    pass

words = ["eat", "tea", "tan", "ate", "nat", "bat", "listen", "silent", "enlist"]
for i, group in enumerate(group_anagrams(words), 1):
    print(f"Group {i}: {group}")

@@starter:en
def group_anagrams(words):
    groups = {}
    for word in words:
        # compute canonical key, add to the right group
        pass
    # return sorted list of sorted groups
    pass

words = ["eat", "tea", "tan", "ate", "nat", "bat", "listen", "silent", "enlist"]
for i, group in enumerate(group_anagrams(words), 1):
    print(f"Group {i}: {group}")

@@answer
def group_anagrams(words):
    groups = {}
    for word in words:
        key = "".join(sorted(word.lower()))
        if key not in groups:
            groups[key] = []
        groups[key].append(word)
    return [sorted(g) for g in sorted(groups.values())]

words = ["eat", "tea", "tan", "ate", "nat", "bat", "listen", "silent", "enlist"]
for i, group in enumerate(group_anagrams(words), 1):
    print(f"Group {i}: {group}")

@@expectedOutput
Group 1: ['ate', 'eat', 'tea']
Group 2: ['bat']
Group 3: ['enlist', 'listen', 'silent']
Group 4: ['nat', 'tan']
`);
