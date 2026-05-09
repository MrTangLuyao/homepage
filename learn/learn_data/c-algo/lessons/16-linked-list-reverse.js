LEARN.lesson('c-algo', 16, `
@@chapterRef c-algo-tute-2

@@difficulty:zh 进阶
@@difficulty:en Intermediate

@@intro:zh
<p class="lead">"反转一个链表" 是技术面试最经典的题。它考察一件事：<strong>在迭代过程中正确管理三个指针</strong>。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">问题</h3>
<p>把链表 <code>1 → 2 → 3 → 4 → 5</code> 变成 <code>5 → 4 → 3 → 2 → 1</code>。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">为什么不能"边走边改"？</h3>
<p>看似很简单——把 <code>cur-&gt;next</code> 改成前驱不就行了？但<strong>问题在于</strong>：你刚把 <code>cur-&gt;next</code> 改了，下次想走 <code>cur = cur-&gt;next</code> 就走到错误地方了。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">三指针迭代法</h3>
<p>维护三个指针：<code>prev</code>（前驱）、<code>cur</code>（当前）、<code>next</code>（先存好后续，免得断链）。</p>
<pre><code>Node *reverse(Node *head) {
    Node *prev = NULL;
    Node *cur  = head;
    while (cur != NULL) {
        Node *next = cur-&gt;next;   // ① 先存下一个，免得改了就丢
        cur-&gt;next  = prev;        // ② 反向
        prev       = cur;          // ③ 前进 prev
        cur        = next;         // ④ 前进 cur
    }
    return prev;                   // 旧 tail = 新 head
}</code></pre>
<p>每一步：</p>
<ul>
  <li>先把<strong>下一个节点</strong>记下来（不然改了 cur-&gt;next 就丢了）</li>
  <li>把 cur-&gt;next 改成 prev（这是反转的核心）</li>
  <li>prev 移到 cur</li>
  <li>cur 移到 next</li>
</ul>
<p>循环结束时 cur 是 NULL，prev 就是新的 head（原来的 tail）。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">复杂度</h3>
<p>遍历一遍，<strong>O(n)</strong>。空间 O(1)（只用三个指针变量）—— 完美的原地操作。</p>

@@intro:en
<p class="lead">"Reverse a linked list" is a classic interview problem. It tests one thing: <strong>correctly juggling three pointers in iteration</strong>.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Problem</h3>
<p>Turn <code>1 → 2 → 3 → 4 → 5</code> into <code>5 → 4 → 3 → 2 → 1</code>.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Why can't you just modify in place?</h3>
<p>Tempting: rewrite <code>cur-&gt;next</code> to point to the predecessor. <strong>Problem</strong>: once you've rewritten cur-&gt;next, doing <code>cur = cur-&gt;next</code> takes you to the wrong place.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Three-pointer iteration</h3>
<p>Maintain three pointers: <code>prev</code> (predecessor), <code>cur</code> (current), <code>next</code> (save successor before breaking link).</p>
<pre><code>Node *reverse(Node *head) {
    Node *prev = NULL;
    Node *cur  = head;
    while (cur != NULL) {
        Node *next = cur-&gt;next;   // ① save next first
        cur-&gt;next  = prev;        // ② reverse the link
        prev       = cur;          // ③ advance prev
        cur        = next;         // ④ advance cur
    }
    return prev;                   // old tail = new head
}</code></pre>
<p>Per step:</p>
<ul>
  <li>Save the <strong>next node</strong> first (or you'll lose it once cur-&gt;next is overwritten)</li>
  <li>Rewrite cur-&gt;next to prev (the actual reversal)</li>
  <li>Move prev to cur</li>
  <li>Move cur to next</li>
</ul>
<p>When cur is NULL, prev is the new head (the old tail).</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Complexity</h3>
<p>One pass, <strong>O(n)</strong>. Space O(1) (just three pointer vars) — perfect in-place op.</p>

@@task:zh
实现 <code>Node *reverse(Node *head)</code>。模板已经构建好链表 <code>1 → 2 → 3 → 4 → 5</code> 并提供 print_list。
反转后打印：
<pre><code>1 2 3 4 5
5 4 3 2 1</code></pre>
（第一行是反转前，第二行反转后）

@@task:en
Implement <code>Node *reverse(Node *head)</code>. The template builds <code>1 → 2 → 3 → 4 → 5</code> and gives print_list. Print before / after:
<pre><code>1 2 3 4 5
5 4 3 2 1</code></pre>

@@hint:zh
四步走严格按顺序：保 next、反指、移 prev、移 cur。任何顺序错乱都会导致链断或死循环。
新 head 是循环结束时的 prev，记得 return 它。

@@hint:en
Strict order of the four steps: save next, reverse, advance prev, advance cur. Any mix-up breaks the chain or loops forever.
New head is prev when the loop ends — return it.

@@starter
#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int value;
    struct Node *next;
} Node;

Node *new_node(int v) {
    Node *n = (Node*)malloc(sizeof(Node));
    n->value = v; n->next = NULL;
    return n;
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

Node *reverse(Node *head) {
    // TODO: 三指针法
    return head;
}

int main(void) {
    // 1 → 2 → 3 → 4 → 5
    Node *a = new_node(1), *b = new_node(2), *c = new_node(3),
         *d = new_node(4), *e = new_node(5);
    a->next = b; b->next = c; c->next = d; d->next = e;
    Node *head = a;

    print_list(head);
    head = reverse(head);
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

Node *new_node(int v) {
    Node *n = (Node*)malloc(sizeof(Node));
    n->value = v; n->next = NULL;
    return n;
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

Node *reverse(Node *head) {
    Node *prev = NULL;
    Node *cur  = head;
    while (cur != NULL) {
        Node *next = cur->next;
        cur->next  = prev;
        prev       = cur;
        cur        = next;
    }
    return prev;
}

int main(void) {
    Node *a = new_node(1), *b = new_node(2), *c = new_node(3),
         *d = new_node(4), *e = new_node(5);
    a->next = b; b->next = c; c->next = d; d->next = e;
    Node *head = a;

    print_list(head);
    head = reverse(head);
    print_list(head);
    return 0;
}

@@expectedOutput
1 2 3 4 5
5 4 3 2 1
`);
