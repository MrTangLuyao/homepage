LEARN.lesson('c-algo', 19, `
@@chapterRef c-algo-tute-2

@@difficulty:zh 进阶
@@difficulty:en Intermediate

@@intro:zh
<p class="lead">树是计算机里最常见的非线性结构。每个节点最多两个子节点的就叫<strong>二叉树</strong>。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">节点定义</h3>
<pre><code>typedef struct TreeNode {
    int value;
    struct TreeNode *left;   // 左子，可能 NULL
    struct TreeNode *right;  // 右子，可能 NULL
} TreeNode;</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">三种深度优先遍历</h3>
<p>区别只在 <code>visit</code> 写在哪一行：</p>
<pre><code>void preorder(TreeNode *n) {     // 前序：自己 → 左 → 右
    if (!n) return;
    visit(n);                     // ① 自己
    preorder(n-&gt;left);            // ② 左
    preorder(n-&gt;right);           // ③ 右
}

void inorder(TreeNode *n) {       // 中序：左 → 自己 → 右
    if (!n) return;
    inorder(n-&gt;left);             // ① 左
    visit(n);                     // ② 自己
    inorder(n-&gt;right);            // ③ 右
}

void postorder(TreeNode *n) {     // 后序：左 → 右 → 自己
    if (!n) return;
    postorder(n-&gt;left);           // ① 左
    postorder(n-&gt;right);          // ② 右
    visit(n);                     // ③ 自己
}</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">在示例树上的结果</h3>
<pre><code>        4
       / \\
      2   6
     / \\ / \\
    1  3 5  7</code></pre>
<table style="width:100%;border-collapse:collapse;font-size:13px;margin:6px 0;">
  <tr style="border-bottom:1px solid var(--border);"><th style="text-align:left;padding:4px 8px;">遍历</th><th style="text-align:left;padding:4px 8px;">输出</th><th style="text-align:left;padding:4px 8px;">用途</th></tr>
  <tr><td style="padding:4px 8px;">前序</td><td style="padding:4px 8px;">4 2 1 3 6 5 7</td><td style="padding:4px 8px;">序列化树</td></tr>
  <tr><td style="padding:4px 8px;">中序</td><td style="padding:4px 8px;">1 2 3 4 5 6 7</td><td style="padding:4px 8px;"><strong>BST 输出有序</strong> ⭐</td></tr>
  <tr><td style="padding:4px 8px;">后序</td><td style="padding:4px 8px;">1 3 2 5 7 6 4</td><td style="padding:4px 8px;">从下到上汇总（删树、算高度）</td></tr>
</table>

@@intro:en
<p class="lead">Trees are CS's most common non-linear structures. A tree where each node has at most two children is a <strong>binary tree</strong>.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Node</h3>
<pre><code>typedef struct TreeNode {
    int value;
    struct TreeNode *left;   // may be NULL
    struct TreeNode *right;  // may be NULL
} TreeNode;</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">Three depth-first traversals</h3>
<p>Differ only in where <code>visit</code> sits:</p>
<pre><code>void preorder(TreeNode *n) {     // pre: self → left → right
    if (!n) return;
    visit(n);
    preorder(n-&gt;left);
    preorder(n-&gt;right);
}

void inorder(TreeNode *n) {       // in: left → self → right
    if (!n) return;
    inorder(n-&gt;left);
    visit(n);
    inorder(n-&gt;right);
}

void postorder(TreeNode *n) {     // post: left → right → self
    if (!n) return;
    postorder(n-&gt;left);
    postorder(n-&gt;right);
    visit(n);
}</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">On this example tree</h3>
<pre><code>        4
       / \\
      2   6
     / \\ / \\
    1  3 5  7</code></pre>
<table style="width:100%;border-collapse:collapse;font-size:13px;margin:6px 0;">
  <tr style="border-bottom:1px solid var(--border);"><th style="text-align:left;padding:4px 8px;">Traversal</th><th style="text-align:left;padding:4px 8px;">Output</th><th style="text-align:left;padding:4px 8px;">Use</th></tr>
  <tr><td style="padding:4px 8px;">Pre</td><td style="padding:4px 8px;">4 2 1 3 6 5 7</td><td style="padding:4px 8px;">Serialise tree</td></tr>
  <tr><td style="padding:4px 8px;">In</td><td style="padding:4px 8px;">1 2 3 4 5 6 7</td><td style="padding:4px 8px;"><strong>BST → sorted</strong> ⭐</td></tr>
  <tr><td style="padding:4px 8px;">Post</td><td style="padding:4px 8px;">1 3 2 5 7 6 4</td><td style="padding:4px 8px;">Bottom-up aggregation (free tree, height)</td></tr>
</table>

@@task:zh
模板已经给你建好这棵 7 节点的树。实现 <code>preorder</code>、<code>inorder</code>、<code>postorder</code>，每种遍历输出一行（空格分开）：
<pre><code>4 2 1 3 6 5 7
1 2 3 4 5 6 7
1 3 2 5 7 6 4</code></pre>

@@task:en
The template builds the 7-node tree. Implement <code>preorder</code>, <code>inorder</code>, <code>postorder</code>, output each on its own line (space-separated):
<pre><code>4 2 1 3 6 5 7
1 2 3 4 5 6 7
1 3 2 5 7 6 4</code></pre>

@@hint:zh
三个递归函数都很短，只有 4 行：base case + 三段（位置不同）。
为了让前序的输出是 "4 2 1 3 6 5 7"（无前导空格）：可以让 visit 用 <code>printf("%d ", v)</code> 然后调用结束后用 <code>printf("\\b\\n")</code>，或者更干净——用全局或外部 first 标志。最简单：直接 <code>printf("%d ", v)</code>，再额外 <code>printf("\\n")</code>，输出末尾有个空格但 expectedOutput 是 trim 比较，可能没问题。

@@hint:en
Three recursive functions, each ~4 lines: base + three pieces (different orders).
Simplest output: <code>printf("%d ", v)</code> in visit, then <code>printf("\\n")</code> after the call. Trailing space is OK since the comparison is trim-tolerant.

@@starter
#include <stdio.h>
#include <stdlib.h>

typedef struct TreeNode {
    int value;
    struct TreeNode *left, *right;
} TreeNode;

TreeNode *new_node(int v) {
    TreeNode *n = (TreeNode*)malloc(sizeof(TreeNode));
    n->value = v; n->left = n->right = NULL;
    return n;
}

void preorder(TreeNode *n) {
    // TODO
}

void inorder(TreeNode *n) {
    // TODO
}

void postorder(TreeNode *n) {
    // TODO
}

int main(void) {
    /*       4
            / \\
           2   6
          / \\ / \\
         1  3 5  7   */
    TreeNode *root = new_node(4);
    root->left  = new_node(2);
    root->right = new_node(6);
    root->left->left   = new_node(1);
    root->left->right  = new_node(3);
    root->right->left  = new_node(5);
    root->right->right = new_node(7);

    preorder(root);  printf("\\n");
    inorder(root);   printf("\\n");
    postorder(root); printf("\\n");
    return 0;
}

@@answer
#include <stdio.h>
#include <stdlib.h>

typedef struct TreeNode {
    int value;
    struct TreeNode *left, *right;
} TreeNode;

TreeNode *new_node(int v) {
    TreeNode *n = (TreeNode*)malloc(sizeof(TreeNode));
    n->value = v; n->left = n->right = NULL;
    return n;
}

void preorder(TreeNode *n) {
    if (!n) return;
    printf("%d ", n->value);
    preorder(n->left);
    preorder(n->right);
}

void inorder(TreeNode *n) {
    if (!n) return;
    inorder(n->left);
    printf("%d ", n->value);
    inorder(n->right);
}

void postorder(TreeNode *n) {
    if (!n) return;
    postorder(n->left);
    postorder(n->right);
    printf("%d ", n->value);
}

int main(void) {
    TreeNode *root = new_node(4);
    root->left  = new_node(2);
    root->right = new_node(6);
    root->left->left   = new_node(1);
    root->left->right  = new_node(3);
    root->right->left  = new_node(5);
    root->right->right = new_node(7);

    preorder(root);  printf("\\n");
    inorder(root);   printf("\\n");
    postorder(root); printf("\\n");
    return 0;
}

@@expectedOutput
4 2 1 3 6 5 7
1 2 3 4 5 6 7
1 3 2 5 7 6 4
`);
