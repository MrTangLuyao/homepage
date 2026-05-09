/* learn/learn_data/c-algo/course.js
 * C 算法入门 (Beta) —— 接续 c-algo-tute-{1,2,3} 三篇博客的实战练习。
 * 每节课用 C 实现一个经典算法或数据结构，stdout 与 expectedOutput 对比批改。
 *
 * 25 节，按递进难度组织：
 *   - 复杂度分析 (1-2)
 *   - 递归思维 (3-5)
 *   - 搜索 (6-7)
 *   - 基础排序 O(n²) (8-10)
 *   - 高效排序 (11-13)
 *   - 链表家族 (14-18)
 *   - 树 (19-20)
 *   - 字符串匹配 (21-22)
 *   - 哈希 / 堆 (23-24)
 *   - 动态规划 (25)
 */

LEARN.course('c-algo', {
  slug: 'c-algo',
  type: 'c',
  title: { zh: 'C 算法入门 (Beta)', en: 'C Algorithms (Beta)' },
  desc:  {
    zh: '早期测试，可能包含错误。',
    en: 'Early access. May contain bugs.',
  },

  hasPlayground: false,

  lessons: [
    /* ── 复杂度分析 ── */
    { id: 1,  section: 'main', slug: 'counting-ops',
      title:   { zh: '大 O：数操作次数',         en: 'Big O: counting operations' },
      chapter: { zh: 'O(n) 入门',                en: 'O(n) intro' },
      file: 'lessons/01-counting-ops.js' },

    { id: 2,  section: 'main', slug: 'nested-loops',
      title:   { zh: '嵌套循环 O(n²)',           en: 'Nested loops O(n²)' },
      chapter: { zh: '逆序对',                   en: 'inversion pairs' },
      file: 'lessons/02-nested-loops.js' },

    /* ── 递归思维 ── */
    { id: 3,  section: 'main', slug: 'factorial-recursion',
      title:   { zh: '递归 · 阶乘',              en: 'Recursion · factorial' },
      chapter: { zh: 'base case + 自相似',       en: 'base + self-similar' },
      file: 'lessons/03-factorial-recursion.js' },

    { id: 4,  section: 'main', slug: 'fibonacci-recursion',
      title:   { zh: '递归 · 斐波那契',          en: 'Recursion · Fibonacci' },
      chapter: { zh: '体会重复计算',             en: 'feel the redundancy' },
      file: 'lessons/04-fibonacci-recursion.js' },

    { id: 5,  section: 'main', slug: 'reverse-string-recursion',
      title:   { zh: '递归 · 反转字符串',        en: 'Recursion · reverse string' },
      chapter: { zh: '尾递归思路',               en: 'tail-recursive idea' },
      file: 'lessons/05-reverse-string-recursion.js' },

    /* ── 搜索 ── */
    { id: 6,  section: 'main', slug: 'linear-search',
      title:   { zh: '线性搜索',                 en: 'Linear search' },
      chapter: { zh: 'O(n)',                     en: 'O(n)' },
      file: 'lessons/06-linear-search.js' },

    { id: 7,  section: 'main', slug: 'binary-search',
      title:   { zh: '二分搜索',                 en: 'Binary search' },
      chapter: { zh: 'O(log n)',                 en: 'O(log n)' },
      file: 'lessons/07-binary-search.js' },

    /* ── 基础排序 O(n²) ── */
    { id: 8,  section: 'main', slug: 'bubble-sort',
      title:   { zh: '冒泡排序',                 en: 'Bubble sort' },
      chapter: { zh: '稳定 · 自适应',            en: 'stable · adaptive' },
      file: 'lessons/08-bubble-sort.js' },

    { id: 9,  section: 'main', slug: 'selection-sort',
      title:   { zh: '选择排序',                 en: 'Selection sort' },
      chapter: { zh: '交换最少',                 en: 'fewest swaps' },
      file: 'lessons/09-selection-sort.js' },

    { id: 10, section: 'main', slug: 'insertion-sort',
      title:   { zh: '插入排序',                 en: 'Insertion sort' },
      chapter: { zh: '近有序最优',               en: 'best for near-sorted' },
      file: 'lessons/10-insertion-sort.js' },

    /* ── 高效排序 O(n log n) ── */
    { id: 11, section: 'main', slug: 'merge-step',
      title:   { zh: '归并的核心 · 合并步骤',    en: "Merge sort's core · merge step" },
      chapter: { zh: '双指针',                   en: 'two pointers' },
      file: 'lessons/11-merge-step.js' },

    { id: 12, section: 'main', slug: 'merge-sort',
      title:   { zh: '完整归并排序',             en: 'Full merge sort' },
      chapter: { zh: '分治 · 稳定',              en: 'divide & conquer · stable' },
      file: 'lessons/12-merge-sort.js' },

    { id: 13, section: 'main', slug: 'quick-sort',
      title:   { zh: '快速排序',                 en: 'Quicksort' },
      chapter: { zh: 'Lomuto 分区',              en: 'Lomuto partition' },
      file: 'lessons/13-quick-sort.js' },

    /* ── 链表家族 ── */
    { id: 14, section: 'main', slug: 'linked-list-traverse',
      title:   { zh: '单链表 · 创建与遍历',      en: 'Linked list · create & traverse' },
      chapter: { zh: 'malloc + next 指针',       en: 'malloc + next pointer' },
      file: 'lessons/14-linked-list-traverse.js' },

    { id: 15, section: 'main', slug: 'linked-list-insert-delete',
      title:   { zh: '单链表 · 头插与删除',      en: 'Linked list · insert & delete' },
      chapter: { zh: '指针拆接',                 en: 'pointer rewiring' },
      file: 'lessons/15-linked-list-insert-delete.js' },

    { id: 16, section: 'main', slug: 'linked-list-reverse',
      title:   { zh: '单链表 · 反转',            en: 'Linked list · reverse' },
      chapter: { zh: '三指针迭代',               en: 'three-pointer iteration' },
      file: 'lessons/16-linked-list-reverse.js' },

    { id: 17, section: 'main', slug: 'stack-paren',
      title:   { zh: '栈 · 括号匹配',            en: 'Stack · paren match' },
      chapter: { zh: 'LIFO 经典应用',            en: 'classic LIFO use' },
      file: 'lessons/17-stack-paren.js' },

    { id: 18, section: 'main', slug: 'queue-circular',
      title:   { zh: '队列 · 循环数组',          en: 'Queue · circular array' },
      chapter: { zh: 'FIFO + ring buffer',       en: 'FIFO + ring buffer' },
      file: 'lessons/18-queue-circular.js' },

    /* ── 树 ── */
    { id: 19, section: 'main', slug: 'tree-traversal',
      title:   { zh: '二叉树遍历',               en: 'Binary tree traversal' },
      chapter: { zh: '前序 / 中序 / 后序',       en: 'pre / in / post order' },
      file: 'lessons/19-tree-traversal.js' },

    { id: 20, section: 'main', slug: 'bst-search-insert',
      title:   { zh: 'BST · 查找与插入',         en: 'BST · search & insert' },
      chapter: { zh: 'O(log n) 容器',            en: 'O(log n) container' },
      file: 'lessons/20-bst-search-insert.js' },

    /* ── 字符串匹配 ── */
    { id: 21, section: 'main', slug: 'kmp-next',
      title:   { zh: 'KMP · 构造 next[]',        en: 'KMP · build next[]' },
      chapter: { zh: '失败函数',                 en: 'failure function' },
      file: 'lessons/21-kmp-next.js' },

    { id: 22, section: 'main', slug: 'kmp-search',
      title:   { zh: 'KMP · 主匹配',             en: 'KMP · main matcher' },
      chapter: { zh: 'i 不回退',                 en: 'i never backtracks' },
      file: 'lessons/22-kmp-search.js' },

    /* ── 哈希 / 堆 ── */
    { id: 23, section: 'main', slug: 'hash-chaining',
      title:   { zh: '哈希表 · 链地址法',        en: 'Hash table · chaining' },
      chapter: { zh: 'O(1) 平均查找',            en: 'O(1) avg lookup' },
      file: 'lessons/23-hash-chaining.js' },

    { id: 24, section: 'main', slug: 'heap-sort',
      title:   { zh: '二叉堆 · 堆排序',          en: 'Binary heap · heap sort' },
      chapter: { zh: 'build_heap + heapify',    en: 'build_heap + heapify' },
      file: 'lessons/24-heap-sort.js' },

    /* ── 动态规划 ── */
    { id: 25, section: 'main', slug: 'lcs-dp',
      title:   { zh: '动态规划 · 最长公共子序列', en: 'DP · Longest Common Subsequence' },
      chapter: { zh: '填表 + O(mn)',             en: 'table fill + O(mn)' },
      file: 'lessons/25-lcs-dp.js' },
  ],
});
