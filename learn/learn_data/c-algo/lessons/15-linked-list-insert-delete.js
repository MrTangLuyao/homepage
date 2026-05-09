LEARN.lesson('c-algo', 15, `
@@chapterRef c-algo-tute-2

@@difficulty:zh 进阶
@@difficulty:en Intermediate

@@intro:zh
<p class="lead">链表的<strong>所有威力</strong>都来自指针拆接。这一节练两个最常用的操作：头部插入、按值删除。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">在头部插入 —— O(1)</h3>
<pre><code>Node *insert_head(Node *head, int v) {
    Node *n = (Node*)malloc(sizeof(Node));
    n-&gt;value = v;
    n-&gt;next  = head;     // 新节点的 next 指向旧 head
    return n;            // 新 head 是新节点
}

// 用法：head = insert_head(head, 42);</code></pre>
<p>三步：① 创建新节点；② 让新节点的 next 指向原来的 head；③ 把"链表的 head"改成新节点。<strong>返回新 head</strong>因为它变了。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">按值删除 —— O(n)</h3>
<p>关键：<strong>让前一个节点的 next 越过被删的节点，直接指向后一个</strong>。</p>
<pre><code>Node *delete_value(Node *head, int v) {
    // 特殊：要删 head 自己
    if (head != NULL &amp;&amp; head-&gt;value == v) {
        Node *next = head-&gt;next;
        free(head);
        return next;
    }
    // 一般：找 cur 使 cur-&gt;next-&gt;value == v
    Node *cur = head;
    while (cur != NULL &amp;&amp; cur-&gt;next != NULL &amp;&amp; cur-&gt;next-&gt;value != v) {
        cur = cur-&gt;next;
    }
    if (cur != NULL &amp;&amp; cur-&gt;next != NULL) {
        Node *del = cur-&gt;next;
        cur-&gt;next = del-&gt;next;     // 越过 del
        free(del);
    }
    return head;
}</code></pre>
<p>两个边界情况：① 删的是 head（要更新 head 指针）；② 找不到该值（什么都不做）。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">为什么删除是 O(n)？</h3>
<p>找到要删的节点本身需要 O(n) 遍历。<strong>真正的拆接只需要 O(1)</strong>——找到前驱后，改一个指针就行。</p>
<p>这就是为什么 <strong>双链表</strong>（每个节点带 prev 指针）能在已知节点指针时 O(1) 删除——不需要再扫一遍找前驱。</p>

@@intro:en
<p class="lead">All of a linked list's power comes from pointer rewiring. This lesson drills the two most common ops: insert at head, delete by value.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Insert at head — O(1)</h3>
<pre><code>Node *insert_head(Node *head, int v) {
    Node *n = (Node*)malloc(sizeof(Node));
    n-&gt;value = v;
    n-&gt;next  = head;     // new node's next = old head
    return n;            // new head is the new node
}

// Usage: head = insert_head(head, 42);</code></pre>
<p>Three steps: ① allocate; ② point new node's next at old head; ③ change the list's head to the new node. <strong>Return the new head</strong> since it changed.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Delete by value — O(n)</h3>
<p>Key: <strong>route the previous node's next past the dying node, straight to its successor</strong>.</p>
<pre><code>Node *delete_value(Node *head, int v) {
    // Special: deleting head itself
    if (head != NULL &amp;&amp; head-&gt;value == v) {
        Node *next = head-&gt;next;
        free(head);
        return next;
    }
    // General: find cur where cur-&gt;next-&gt;value == v
    Node *cur = head;
    while (cur != NULL &amp;&amp; cur-&gt;next != NULL &amp;&amp; cur-&gt;next-&gt;value != v) {
        cur = cur-&gt;next;
    }
    if (cur != NULL &amp;&amp; cur-&gt;next != NULL) {
        Node *del = cur-&gt;next;
        cur-&gt;next = del-&gt;next;     // bypass del
        free(del);
    }
    return head;
}</code></pre>
<p>Two edge cases: ① deleting head (update head); ② value not found (do nothing).</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Why is delete O(n)?</h3>
<p>Finding the target node takes O(n) traversal. <strong>The actual unlinking is O(1)</strong> — once you know the predecessor, just rewire one pointer.</p>
<p>This is why <strong>doubly linked lists</strong> (with prev pointers) achieve O(1) delete given a node pointer — no scan to find predecessor.</p>

@@task:zh
模板已经给了 <code>insert_head</code> 实现。补全 <code>delete_value</code>。运行流程：
<ol>
  <li>建空链表（head = NULL）</li>
  <li>head_insert 三次：30, 20, 10 → 链表是 10 → 20 → 30</li>
  <li>遍历打印 → 10 20 30</li>
  <li>delete_value(20) → 链表是 10 → 30</li>
  <li>遍历打印 → 10 30</li>
  <li>delete_value(10)（删 head）→ 链表是 30</li>
  <li>遍历打印 → 30</li>
  <li>delete_value(99)（不存在，无事发生）</li>
  <li>遍历打印 → 30</li>
</ol>
按下面格式输出（每行一个状态）：
<pre><code>10 20 30
10 30
30
30</code></pre>

@@task:en
The template gives <code>insert_head</code>. Complete <code>delete_value</code>. Flow:
<ol>
  <li>Empty list (head = NULL)</li>
  <li>insert_head 3 times: 30, 20, 10 → list is 10 → 20 → 30</li>
  <li>Traverse → 10 20 30</li>
  <li>delete_value(20) → list is 10 → 30</li>
  <li>Traverse → 10 30</li>
  <li>delete_value(10) (deleting head) → list is 30</li>
  <li>Traverse → 30</li>
  <li>delete_value(99) (absent, no-op)</li>
  <li>Traverse → 30</li>
</ol>
Output (each line is a state):
<pre><code>10 20 30
10 30
30
30</code></pre>

@@hint:zh
delete_value 三种情况：① head 本身就是 → 改 head 返回 next；② 链上找到 → 拆 cur-&gt;next；③ 没找到 → return head 不变。
打印用一个辅助函数 <code>print_list(head)</code> 把空格分隔的值打印 + "\\n"。

@@hint:en
delete_value has three cases: ① head itself matches → return new head; ② found in chain → unlink cur-&gt;next; ③ not found → return head unchanged.
Use a helper <code>print_list(head)</code> that prints space-separated values + "\\n".

@@starter
#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int value;
    struct Node *next;
} Node;

Node *insert_head(Node *head, int v) {
    Node *n = (Node*)malloc(sizeof(Node));
    n->value = v;
    n->next  = head;
    return n;
}

Node *delete_value(Node *head, int v) {
    // TODO
    return head;
}

void print_list(Node *head) {
    int first = 1;
    for (Node *cur = head; cur; cur = cur->next) {
        if (!first) printf(" ");
        printf("%d", cur->value);
        first = 0;
    }
    printf("\\n");
}

int main(void) {
    Node *head = NULL;
    head = insert_head(head, 30);
    head = insert_head(head, 20);
    head = insert_head(head, 10);
    print_list(head);

    head = delete_value(head, 20);
    print_list(head);

    head = delete_value(head, 10);
    print_list(head);

    head = delete_value(head, 99);
    print_list(head);
    return 0;
}

@@answer
#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int value;
    struct Node *next;
} Node;

Node *insert_head(Node *head, int v) {
    Node *n = (Node*)malloc(sizeof(Node));
    n->value = v;
    n->next  = head;
    return n;
}

Node *delete_value(Node *head, int v) {
    if (head != NULL && head->value == v) {
        Node *next = head->next;
        free(head);
        return next;
    }
    Node *cur = head;
    while (cur != NULL && cur->next != NULL && cur->next->value != v) {
        cur = cur->next;
    }
    if (cur != NULL && cur->next != NULL) {
        Node *del = cur->next;
        cur->next = del->next;
        free(del);
    }
    return head;
}

void print_list(Node *head) {
    int first = 1;
    for (Node *cur = head; cur; cur = cur->next) {
        if (!first) printf(" ");
        printf("%d", cur->value);
        first = 0;
    }
    printf("\\n");
}

int main(void) {
    Node *head = NULL;
    head = insert_head(head, 30);
    head = insert_head(head, 20);
    head = insert_head(head, 10);
    print_list(head);

    head = delete_value(head, 20);
    print_list(head);

    head = delete_value(head, 10);
    print_list(head);

    head = delete_value(head, 99);
    print_list(head);
    return 0;
}

@@expectedOutput
10 20 30
10 30
30
30
`);
