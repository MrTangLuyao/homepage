LEARN.lesson('c-algo', 20, `
@@chapterRef c-algo-tute-2

@@difficulty:zh 进阶
@@difficulty:en Intermediate

@@intro:zh
<p class="lead"><strong>二叉搜索树（BST）</strong>是有序的二叉树。性质：每个节点 N，<strong>左子树所有值 &lt; N &lt; 右子树所有值</strong>。这个简单性质让查找和插入都是 O(log n)（树平衡时）。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">关键性质</h3>
<p><strong>中序遍历一棵 BST，输出一定是升序</strong>——这是 BST 性质的直接推论。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">查找</h3>
<pre><code>TreeNode *bst_search(TreeNode *root, int key) {
    TreeNode *cur = root;
    while (cur != NULL) {
        if      (key == cur-&gt;value) return cur;     // 找到
        else if (key &lt;  cur-&gt;value) cur = cur-&gt;left;
        else                        cur = cur-&gt;right;
    }
    return NULL;     // 没找到
}</code></pre>
<p>每一步淘汰半棵树，路径长度 = 树高 = O(log n)（树平衡时）。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">插入（递归版）</h3>
<pre><code>TreeNode *bst_insert(TreeNode *root, int v) {
    if (root == NULL) {
        TreeNode *n = malloc(sizeof(TreeNode));
        n-&gt;value = v;
        n-&gt;left = n-&gt;right = NULL;
        return n;
    }
    if      (v &lt; root-&gt;value) root-&gt;left  = bst_insert(root-&gt;left,  v);
    else if (v &gt; root-&gt;value) root-&gt;right = bst_insert(root-&gt;right, v);
    // v == root-&gt;value：BST 通常不允许重复，直接忽略
    return root;
}</code></pre>
<p>插入路径就是查找路径，到 NULL 时不返回 NULL，而是创建一个新节点挂在那里。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">最重要的注意事项</h3>
<p>朴素 BST 不会自动平衡。如果按升序插入 1, 2, 3, 4, 5——会变成一条向右的链表，所有操作退化到 O(n)。要保证平衡，工业用<strong>红黑树 / AVL 树</strong>。这些进阶留给以后。</p>

@@intro:en
<p class="lead"><strong>Binary Search Tree (BST)</strong> is an ordered binary tree. Property: every node N has <strong>all values in left subtree &lt; N &lt; all values in right subtree</strong>. This gives O(log n) search and insert (when balanced).</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Key property</h3>
<p><strong>In-order traversal of a BST is always sorted ascending</strong> — direct consequence.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Search</h3>
<pre><code>TreeNode *bst_search(TreeNode *root, int key) {
    TreeNode *cur = root;
    while (cur != NULL) {
        if      (key == cur-&gt;value) return cur;
        else if (key &lt;  cur-&gt;value) cur = cur-&gt;left;
        else                        cur = cur-&gt;right;
    }
    return NULL;
}</code></pre>
<p>Each step prunes half the tree, path = tree height = O(log n) (when balanced).</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Insert (recursive)</h3>
<pre><code>TreeNode *bst_insert(TreeNode *root, int v) {
    if (root == NULL) {
        TreeNode *n = malloc(sizeof(TreeNode));
        n-&gt;value = v;
        n-&gt;left = n-&gt;right = NULL;
        return n;
    }
    if      (v &lt; root-&gt;value) root-&gt;left  = bst_insert(root-&gt;left,  v);
    else if (v &gt; root-&gt;value) root-&gt;right = bst_insert(root-&gt;right, v);
    // v == root-&gt;value: BSTs typically disallow duplicates — ignore
    return root;
}</code></pre>
<p>Insert path is the search path. At NULL, instead of returning NULL, create a new node.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Big caveat</h3>
<p>Naive BST doesn't self-balance. Inserting in ascending order 1, 2, 3, 4, 5 → degenerates into a right-leaning chain, all ops degrade to O(n). Real-world: use <strong>red-black trees / AVL trees</strong>. That's for later.</p>

@@intro:en

@@task:zh
按这个顺序插入：50, 30, 70, 20, 40, 60, 80。然后中序遍历打印（验证 BST 性质——应该是升序），再做几次查找：
<pre><code>插入后中序遍历: 20 30 40 50 60 70 80
查找 60: found
查找 35: not found
查找 80: found</code></pre>

@@task:en
Insert in order: 50, 30, 70, 20, 40, 60, 80. Then in-order traverse (should be sorted), then a few searches:
<pre><code>inorder after inserts: 20 30 40 50 60 70 80
search 60: found
search 35: not found
search 80: found</code></pre>

@@hint:zh
插入用递归更干净。先 bst_insert(NULL, 50) 得到根，然后依次 root = bst_insert(root, 30); ...
中序输出试试 "%d " 然后末尾 "\\n"——尾随空格 OK，stdout 比较是 trim 的。

@@hint:en
Recursive insert is cleanest. Start with bst_insert(NULL, 50), then root = bst_insert(root, 30); ...
In-order output: "%d " then trailing "\\n" — trailing space is OK, stdout compare is trim-tolerant.

@@starter
#include <stdio.h>
#include <stdlib.h>

typedef struct TreeNode {
    int value;
    struct TreeNode *left, *right;
} TreeNode;

TreeNode *bst_insert(TreeNode *root, int v) {
    // TODO
    return root;
}

TreeNode *bst_search(TreeNode *root, int key) {
    // TODO
    return NULL;
}

void inorder(TreeNode *n) {
    if (!n) return;
    inorder(n->left);
    printf("%d ", n->value);
    inorder(n->right);
}

int main(void) {
    TreeNode *root = NULL;
    int keys[] = {50, 30, 70, 20, 40, 60, 80};
    for (int i = 0; i < 7; i++) root = bst_insert(root, keys[i]);

    printf("inorder after inserts: ");
    inorder(root);
    printf("\\n");

    printf("search 60: %s\\n", bst_search(root, 60) ? "found" : "not found");
    printf("search 35: %s\\n", bst_search(root, 35) ? "found" : "not found");
    printf("search 80: %s\\n", bst_search(root, 80) ? "found" : "not found");
    return 0;
}

@@answer
#include <stdio.h>
#include <stdlib.h>

typedef struct TreeNode {
    int value;
    struct TreeNode *left, *right;
} TreeNode;

TreeNode *bst_insert(TreeNode *root, int v) {
    if (root == NULL) {
        TreeNode *n = (TreeNode*)malloc(sizeof(TreeNode));
        n->value = v;
        n->left = n->right = NULL;
        return n;
    }
    if      (v < root->value) root->left  = bst_insert(root->left,  v);
    else if (v > root->value) root->right = bst_insert(root->right, v);
    return root;
}

TreeNode *bst_search(TreeNode *root, int key) {
    TreeNode *cur = root;
    while (cur != NULL) {
        if      (key == cur->value) return cur;
        else if (key <  cur->value) cur = cur->left;
        else                         cur = cur->right;
    }
    return NULL;
}

void inorder(TreeNode *n) {
    if (!n) return;
    inorder(n->left);
    printf("%d ", n->value);
    inorder(n->right);
}

int main(void) {
    TreeNode *root = NULL;
    int keys[] = {50, 30, 70, 20, 40, 60, 80};
    for (int i = 0; i < 7; i++) root = bst_insert(root, keys[i]);

    printf("inorder after inserts: ");
    inorder(root);
    printf("\\n");

    printf("search 60: %s\\n", bst_search(root, 60) ? "found" : "not found");
    printf("search 35: %s\\n", bst_search(root, 35) ? "found" : "not found");
    printf("search 80: %s\\n", bst_search(root, 80) ? "found" : "not found");
    return 0;
}

@@expectedOutput
inorder after inserts: 20 30 40 50 60 70 80
search 60: found
search 35: not found
search 80: found
`);
