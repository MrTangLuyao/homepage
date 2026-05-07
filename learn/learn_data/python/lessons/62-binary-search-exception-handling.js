LEARN.lesson('python', 62, `
@@chapterRef python-tute-3
@@difficulty:zh 综合
@@difficulty:en Comprehensive
@@intro:zh
<p class="lead"><strong>二分查找</strong>（Binary Search）是在<strong>有序列表</strong>中查找目标值的高效算法。每次比较都能把搜索范围<strong>减半</strong>，因此时间复杂度为 O(log n)——在一百万个元素中最多只需 20 次比较，而线性查找最坏需要一百万次。</p>
<p>算法逻辑：</p>
<ol>
<li>维护左右边界 <code>left</code> 和 <code>right</code>，初始覆盖整个列表</li>
<li>每次取中间位置 <code>mid = (left + right) // 2</code></li>
<li>如果 <code>lst[mid] == target</code>，找到了，返回索引</li>
<li>如果 <code>lst[mid] < target</code>，目标在右半，<code>left = mid + 1</code></li>
<li>如果 <code>lst[mid] > target</code>，目标在左半，<code>right = mid - 1</code></li>
<li>当 <code>left > right</code> 时，搜索空间已耗尽，目标不存在</li>
</ol>
<p><strong>前提条件</strong>：列表必须是有序的！对无序列表直接用二分查找会得到错误结果。</p>
<p>本题要求：找不到时 <code>raise ValueError</code>，调用方用 <code>try/except</code> 捕获并格式化输出，体现"异常作为控制流"的设计思路。</p>
@@intro:en
<p class="lead"><strong>Binary search</strong> is an efficient algorithm for finding a target in a <strong>sorted</strong> list. Each comparison <strong>halves</strong> the search range, giving O(log n) time — at most 20 comparisons in a million elements, versus up to a million for a linear scan.</p>
<p>The algorithm:</p>
<ol>
<li>Maintain <code>left</code> and <code>right</code> boundaries, initially covering the whole list</li>
<li>At each step compute <code>mid = (left + right) // 2</code></li>
<li>If <code>lst[mid] == target</code>: found, return the index</li>
<li>If <code>lst[mid] < target</code>: target is in the right half, set <code>left = mid + 1</code></li>
<li>If <code>lst[mid] > target</code>: target is in the left half, set <code>right = mid - 1</code></li>
<li>When <code>left > right</code>: the search space is empty, the target does not exist</li>
</ol>
<p><strong>Prerequisite</strong>: the list must be sorted. Running binary search on an unsorted list produces incorrect results.</p>
<p>This problem requires: <code>raise ValueError</code> when not found, and the caller uses <code>try/except</code> to format the output — demonstrating "exception as control flow."</p>
@@task:zh 实现 <code>binary_search(lst, target)</code>，找不到时 raise ValueError；对 6 个查询值调用，用 try/except 格式化输出结果。
@@task:en
Implement <code>binary_search(lst, target)</code> raising ValueError when not found; call it for 6 query values using try/except to format the output.
@@hint:zh 循环内 left <= right；找不到时 raise ValueError(f"{target} not found")。
@@hint:en Loop while left <= right; raise ValueError(f"{target} not found") when exhausted.
@@starter:zh
def binary_search(lst, target):
    # 二分查找，找不到 raise ValueError
    pass

data = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
for q in [7, 1, 19, 13, 6, 20]:
    try:
        print(f"Found {q} at index {binary_search(data, q)}")
    except ValueError as e:
        print(f"Error: {e}")

@@starter:en
def binary_search(lst, target):
    # binary search, raise ValueError when not found
    pass

data = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
for q in [7, 1, 19, 13, 6, 20]:
    try:
        print(f"Found {q} at index {binary_search(data, q)}")
    except ValueError as e:
        print(f"Error: {e}")

@@answer
def binary_search(lst, target):
    left, right = 0, len(lst) - 1
    while left <= right:
        mid = (left + right) // 2
        if lst[mid] == target:
            return mid
        elif lst[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    raise ValueError(f"{target} not found")

data = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
for q in [7, 1, 19, 13, 6, 20]:
    try:
        print(f"Found {q} at index {binary_search(data, q)}")
    except ValueError as e:
        print(f"Error: {e}")

@@expectedOutput
Found 7 at index 3
Found 1 at index 0
Found 19 at index 9
Found 13 at index 6
Error: 6 not found
Error: 20 not found
`);
