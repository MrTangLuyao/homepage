LEARN.lesson('c-algo', 23, `
@@chapterRef c-algo-tute-3

@@difficulty:zh 进阶
@@difficulty:en Intermediate

@@intro:zh
<p class="lead">哈希表把 key 直接<strong>映射</strong>到内存地址 → 平均 O(1) 查找。这一节实现链地址法（chaining）解决冲突。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">三个核心组件</h3>
<ol>
  <li><strong>桶数组</strong>：固定大小的 <code>Node*</code> 数组，每个桶是链表的头</li>
  <li><strong>哈希函数</strong>：把 key 映射到 [0, M)。最简单：<code>key % M</code></li>
  <li><strong>冲突处理</strong>：多个 key 哈希到同一桶时，挂成链表</li>
</ol>
<h3 style="margin:14px 0 6px;font-size:14px;">数据结构</h3>
<pre><code>typedef struct Entry {
    int key, value;
    struct Entry *next;
} Entry;

#define M 7
Entry *table[M];     // 静态：每个元素是 NULL 或链表头</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">三个核心操作</h3>
<pre><code>// 插入：在桶 h 的链头加新节点（O(1)）
void hash_insert(int key, int value) {
    int h = key % M;
    Entry *e = malloc(sizeof(Entry));
    e-&gt;key = key;
    e-&gt;value = value;
    e-&gt;next = table[h];
    table[h] = e;
}

// 查找：扫桶 h 的链表
int *hash_find(int key) {
    int h = key % M;
    for (Entry *e = table[h]; e != NULL; e = e-&gt;next) {
        if (e-&gt;key == key) return &amp;e-&gt;value;
    }
    return NULL;
}</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">复杂度分析</h3>
<ul>
  <li>插入：<strong>O(1)</strong>（不需要去重，直接挂头）</li>
  <li>查找：平均 <strong>O(1 + α)</strong>，α = 负载因子（n/M）。α &lt; 1 时几乎是常数。</li>
  <li>最坏：<strong>O(n)</strong>（所有 key 哈希到同一个桶）</li>
</ul>
<p>"最坏 O(n)"看起来很糟糕，但只要哈希函数合理，几乎永远不会发生。所以工程中我们说"哈希表 O(1)"。</p>

@@intro:en
<p class="lead">A hash table maps keys directly to memory addresses → average O(1) lookup. This lesson implements chaining for collision resolution.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Three core components</h3>
<ol>
  <li><strong>Bucket array</strong>: fixed-size array of <code>Node*</code>, each bucket holds a list head</li>
  <li><strong>Hash function</strong>: maps key to [0, M). Simplest: <code>key % M</code></li>
  <li><strong>Collision handling</strong>: multiple keys hashing to the same bucket → chain them</li>
</ol>
<h3 style="margin:14px 0 6px;font-size:14px;">Data</h3>
<pre><code>typedef struct Entry {
    int key, value;
    struct Entry *next;
} Entry;

#define M 7
Entry *table[M];     // static: each slot is NULL or list head</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">Core ops</h3>
<pre><code>// Insert: prepend to bucket h's list (O(1))
void hash_insert(int key, int value) {
    int h = key % M;
    Entry *e = malloc(sizeof(Entry));
    e-&gt;key = key;
    e-&gt;value = value;
    e-&gt;next = table[h];
    table[h] = e;
}

// Find: walk bucket h's chain
int *hash_find(int key) {
    int h = key % M;
    for (Entry *e = table[h]; e != NULL; e = e-&gt;next) {
        if (e-&gt;key == key) return &amp;e-&gt;value;
    }
    return NULL;
}</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">Complexity</h3>
<ul>
  <li>Insert: <strong>O(1)</strong> (no dedup, prepend)</li>
  <li>Find: average <strong>O(1 + α)</strong>, α = load factor (n/M). When α &lt; 1, nearly constant.</li>
  <li>Worst: <strong>O(n)</strong> (all keys collide into one bucket)</li>
</ul>
<p>"Worst O(n)" sounds bad, but with a reasonable hash function, it virtually never happens. In practice we just say "hash table O(1)".</p>

@@task:zh
实现 hash_insert 和 hash_find（不需要支持删除）。M = 7。插入并查找：
<pre><code>插入: (10, 100), (22, 220), (3, 30), (17, 170), (8, 80), (31, 310), (14, 140)
注意:
  10 % 7 = 3
  22 % 7 = 1
  3 % 7 = 3   ← 与 10 冲突
  17 % 7 = 3  ← 又冲突
  8 % 7 = 1   ← 与 22 冲突
  31 % 7 = 3  ← 又冲突
  14 % 7 = 0

查找:
  17 → 找到，value 170
  31 → 找到，value 310
  99 → 没找到</code></pre>
按下面格式输出：
<pre><code>find 17: 170
find 31: 310
find 99: not found</code></pre>

@@task:en
Implement hash_insert and hash_find (no delete). M = 7. Insert and find:
<pre><code>Insert: (10, 100), (22, 220), (3, 30), (17, 170), (8, 80), (31, 310), (14, 140)
Notes:
  10 % 7 = 3
  22 % 7 = 1
  3 % 7 = 3   ← collides with 10
  17 % 7 = 3  ← another collision
  8 % 7 = 1   ← collides with 22
  31 % 7 = 3  ← collides
  14 % 7 = 0

Find:
  17 → found, value 170
  31 → found, value 310
  99 → not found</code></pre>
Output:
<pre><code>find 17: 170
find 31: 310
find 99: not found</code></pre>

@@hint:zh
table 用静态全局数组方便。模板已经声明好。
不需要 delete，所以 insert 直接 prepend，不需要查重（这是经典做法——重复的 key 后插的"覆盖"前面的，因为 find 从链头开始扫）。

@@hint:en
Use a global static array for table. Template has it declared.
No delete required, so insert can prepend without dedup (classic — the most-recent insert "shadows" earlier same-key, since find starts at the head).

@@starter
#include <stdio.h>
#include <stdlib.h>

#define M 7

typedef struct Entry {
    int key, value;
    struct Entry *next;
} Entry;

Entry *table[M] = {NULL};   // 7 buckets

void hash_insert(int key, int value) {
    // TODO
}

int *hash_find(int key) {
    // TODO
    return NULL;
}

int main(void) {
    int kvs[][2] = {{10,100},{22,220},{3,30},{17,170},{8,80},{31,310},{14,140}};
    for (int i = 0; i < 7; i++) hash_insert(kvs[i][0], kvs[i][1]);

    int *p;
    p = hash_find(17);
    if (p) printf("find 17: %d\\n", *p); else printf("find 17: not found\\n");
    p = hash_find(31);
    if (p) printf("find 31: %d\\n", *p); else printf("find 31: not found\\n");
    p = hash_find(99);
    if (p) printf("find 99: %d\\n", *p); else printf("find 99: not found\\n");
    return 0;
}

@@answer
#include <stdio.h>
#include <stdlib.h>

#define M 7

typedef struct Entry {
    int key, value;
    struct Entry *next;
} Entry;

Entry *table[M] = {NULL};

void hash_insert(int key, int value) {
    int h = key % M;
    Entry *e = (Entry*)malloc(sizeof(Entry));
    e->key = key;
    e->value = value;
    e->next = table[h];
    table[h] = e;
}

int *hash_find(int key) {
    int h = key % M;
    for (Entry *e = table[h]; e != NULL; e = e->next) {
        if (e->key == key) return &e->value;
    }
    return NULL;
}

int main(void) {
    int kvs[][2] = {{10,100},{22,220},{3,30},{17,170},{8,80},{31,310},{14,140}};
    for (int i = 0; i < 7; i++) hash_insert(kvs[i][0], kvs[i][1]);

    int *p;
    p = hash_find(17);
    if (p) printf("find 17: %d\\n", *p); else printf("find 17: not found\\n");
    p = hash_find(31);
    if (p) printf("find 31: %d\\n", *p); else printf("find 31: not found\\n");
    p = hash_find(99);
    if (p) printf("find 99: %d\\n", *p); else printf("find 99: not found\\n");
    return 0;
}

@@expectedOutput
find 17: 170
find 31: 310
find 99: not found
`);
