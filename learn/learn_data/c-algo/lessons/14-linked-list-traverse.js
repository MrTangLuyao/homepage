LEARN.lesson('c-algo', 14, `
@@chapterRef c-algo-tute-2

@@difficulty:zh 进阶
@@difficulty:en Intermediate

@@intro:zh
<p class="lead">单链表是计算机科学里最基础的"动态结构"——每个节点带一个指向下一个节点的指针，串成一条链。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">节点定义</h3>
<pre><code>typedef struct Node {
    int value;
    struct Node *next;   // 指向下一个；最后一个节点的 next = NULL
} Node;</code></pre>
<p>整个链表对外只暴露一个 <code>head</code> 指针，从它出发顺着 next 跳就能走完整条链。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">在 C 中创建节点</h3>
<p>动态分配：</p>
<pre><code>Node *n = (Node*)malloc(sizeof(Node));
n-&gt;value = 42;
n-&gt;next  = NULL;</code></pre>
<p>记得 <code>#include &lt;stdlib.h&gt;</code> 来用 malloc。每次 malloc 都应该有对应的 free，不然内存泄漏。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">手动构建链表 1 → 2 → 3</h3>
<pre><code>Node *a = (Node*)malloc(sizeof(Node));
Node *b = (Node*)malloc(sizeof(Node));
Node *c = (Node*)malloc(sizeof(Node));
a-&gt;value = 1; a-&gt;next = b;
b-&gt;value = 2; b-&gt;next = c;
c-&gt;value = 3; c-&gt;next = NULL;
Node *head = a;</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">遍历——O(n)</h3>
<pre><code>void traverse(Node *head) {
    for (Node *cur = head; cur != NULL; cur = cur-&gt;next) {
        printf("%d ", cur-&gt;value);
    }
}</code></pre>
<p>从 head 出发，沿 next 走到 NULL 为止。<strong>链表 vs 数组的最大区别</strong>：链表不能用下标 <code>list[3]</code> 直接跳——只能从头一个一个走。</p>

@@intro:en
<p class="lead">A singly linked list is the most basic "dynamic structure" in CS — each node has a pointer to the next, chaining them together.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Node definition</h3>
<pre><code>typedef struct Node {
    int value;
    struct Node *next;   // points to the next; last node's next = NULL
} Node;</code></pre>
<p>The list externally exposes only a <code>head</code> pointer; from there, follow next to walk the whole chain.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Creating a node in C</h3>
<p>Dynamic allocation:</p>
<pre><code>Node *n = (Node*)malloc(sizeof(Node));
n-&gt;value = 42;
n-&gt;next  = NULL;</code></pre>
<p>Remember <code>#include &lt;stdlib.h&gt;</code> for malloc. Every malloc should have a free; otherwise memory leaks.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Manually build 1 → 2 → 3</h3>
<pre><code>Node *a = (Node*)malloc(sizeof(Node));
Node *b = (Node*)malloc(sizeof(Node));
Node *c = (Node*)malloc(sizeof(Node));
a-&gt;value = 1; a-&gt;next = b;
b-&gt;value = 2; b-&gt;next = c;
c-&gt;value = 3; c-&gt;next = NULL;
Node *head = a;</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">Traverse — O(n)</h3>
<pre><code>void traverse(Node *head) {
    for (Node *cur = head; cur != NULL; cur = cur-&gt;next) {
        printf("%d ", cur-&gt;value);
    }
}</code></pre>
<p>Start at head, follow next until NULL. <strong>The biggest difference from arrays</strong>: no <code>list[3]</code> indexing — you can only walk from the start.</p>

@@task:zh
构建链表 <strong>10 → 20 → 30 → 40 → 50</strong>，然后遍历打印每个值，每个值占一行：
<pre><code>10
20
30
40
50</code></pre>
进阶推荐：写一个辅助函数 <code>Node *new_node(int v)</code> 创建一个新节点。

@@task:en
Build the list <strong>10 → 20 → 30 → 40 → 50</strong>, then traverse it printing each value on its own line:
<pre><code>10
20
30
40
50</code></pre>
Recommended: write a helper <code>Node *new_node(int v)</code> to create a new node.

@@hint:zh
最干净的写法：先写 <code>new_node(v)</code>，连续调用 5 次得到 5 个节点，再用 <code>a-&gt;next = b</code> 串起来。最后一个节点的 next 设 NULL。
遍历用 for 循环，<code>cur = head; cur != NULL; cur = cur-&gt;next</code>，循环体内 <code>printf("%d\\n", cur-&gt;value);</code>。

@@hint:en
Cleanest: write <code>new_node(v)</code>, call 5 times for 5 nodes, then chain via <code>a-&gt;next = b</code>. Last node's next = NULL.
Traversal: for loop with <code>cur = head; cur != NULL; cur = cur-&gt;next</code>, inside <code>printf("%d\\n", cur-&gt;value);</code>

@@starter
#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int value;
    struct Node *next;
} Node;

Node *new_node(int v) {
    // TODO
    return NULL;
}

int main(void) {
    // TODO: 构建 10 → 20 → 30 → 40 → 50

    // TODO: 遍历打印

    return 0;
}

@@answer
#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int value;
    struct Node *next;
} Node;

Node *new_node(int v) {
    Node *n = (Node*)malloc(sizeof(Node));
    n->value = v;
    n->next  = NULL;
    return n;
}

int main(void) {
    Node *a = new_node(10);
    Node *b = new_node(20);
    Node *c = new_node(30);
    Node *d = new_node(40);
    Node *e = new_node(50);
    a->next = b; b->next = c; c->next = d; d->next = e;
    Node *head = a;

    for (Node *cur = head; cur != NULL; cur = cur->next) {
        printf("%d\\n", cur->value);
    }

    // 释放（可选）
    Node *cur = head;
    while (cur) { Node *nx = cur->next; free(cur); cur = nx; }
    return 0;
}

@@expectedOutput
10
20
30
40
50
`);
