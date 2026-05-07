LEARN.lesson('python', 61, `
@@chapterRef python-tute-3
@@difficulty:zh 综合
@@difficulty:en Comprehensive
@@intro:zh
<p class="lead"><strong>归并排序</strong>是计算机科学中最经典的排序算法之一，时间复杂度 O(n log n)，比冒泡排序和插入排序的 O(n²) 快得多，适合处理大规模数据。</p>
<p>算法思路——分治（Divide & Conquer）：</p>
<ol>
<li><strong>分（Divide）</strong>：把列表从中间一分为二</li>
<li><strong>治（Conquer）</strong>：对左半和右半分别递归排序</li>
<li><strong>合（Merge）</strong>：把两个已排好序的子列合并成一个有序列表</li>
</ol>
<p>合并步骤用<strong>双指针</strong>：两个指针分别指向左右子列的当前位置，每次把较小的元素取出放入结果，直到某一侧耗尽，再把另一侧剩余部分全部追加：</p>
<pre><code>i, j = 0, 0
while i < len(left) and j < len(right):
    if left[i] <= right[j]: result.append(left[i]); i += 1
    else:                    result.append(right[j]); j += 1
result.extend(left[i:])   # 左侧剩余
result.extend(right[j:])  # 右侧剩余</code></pre>
<p>基本情况：列表长度 ≤ 1，本身就是有序的，直接返回副本。本题需要正确处理空列表和单元素列表。</p>
@@intro:en
<p class="lead"><strong>Merge sort</strong> is one of the most famous sorting algorithms in computer science, with O(n log n) time complexity — much faster than bubble or insertion sort's O(n²) on large data.</p>
<p>The approach is <strong>divide and conquer</strong>:</p>
<ol>
<li><strong>Divide</strong>: split the list in half</li>
<li><strong>Conquer</strong>: recursively sort the left and right halves</li>
<li><strong>Merge</strong>: combine the two sorted halves into one sorted list</li>
</ol>
<p>The merge step uses <strong>two pointers</strong>: one pointer per half, always picking the smaller current element, until one side is exhausted — then append the remainder of the other:</p>
<pre><code>i, j = 0, 0
while i < len(left) and j < len(right):
    if left[i] <= right[j]: result.append(left[i]); i += 1
    else:                    result.append(right[j]); j += 1
result.extend(left[i:])   # remaining left
result.extend(right[j:])  # remaining right</code></pre>
<p>Base case: a list of length ≤ 1 is already sorted — return a copy directly. The function must handle both empty lists and single-element lists correctly.</p>
@@task:zh 实现 <code>merge(left, right)</code> 和 <code>merge_sort(lst)</code>，对 5 组测试数据排序并输出 <code>原始 -> 排序后</code>。
@@task:en
Implement <code>merge(left, right)</code> and <code>merge_sort(lst)</code>; sort 5 test datasets and print <code>original -> sorted</code> for each.
@@hint:zh merge: i=j=0 双指针；left[i]<=right[j] 则取 left[i]，否则取 right[j]；循环后 extend 剩余。
@@hint:en merge: two pointers i=j=0; if left[i]<=right[j] take left[i], else take right[j]; extend with the remainder.
@@starter:zh
def merge(left, right):
    result = []
    i = j = 0
    # 双指针合并
    # 补上剩余
    return result

def merge_sort(lst):
    if len(lst) <= 1:
        return lst[:]
    mid = len(lst) // 2
    # 递归 + 合并
    pass

datasets = [
    [38, 27, 43, 3, 9, 82, 10],
    [5, 4, 3, 2, 1],
    [1],
    [],
    [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5],
]
for data in datasets:
    print(f"{data} -> {merge_sort(data)}")

@@starter:en
def merge(left, right):
    result = []
    i = j = 0
    # two-pointer merge
    # append remainder
    return result

def merge_sort(lst):
    if len(lst) <= 1:
        return lst[:]
    mid = len(lst) // 2
    # recurse + merge
    pass

datasets = [
    [38, 27, 43, 3, 9, 82, 10],
    [5, 4, 3, 2, 1],
    [1],
    [],
    [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5],
]
for data in datasets:
    print(f"{data} -> {merge_sort(data)}")

@@answer
def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result

def merge_sort(lst):
    if len(lst) <= 1:
        return lst[:]
    mid = len(lst) // 2
    return merge(merge_sort(lst[:mid]), merge_sort(lst[mid:]))

datasets = [
    [38, 27, 43, 3, 9, 82, 10],
    [5, 4, 3, 2, 1],
    [1],
    [],
    [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5],
]
for data in datasets:
    print(f"{data} -> {merge_sort(data)}")

@@expectedOutput
[38, 27, 43, 3, 9, 82, 10] -> [3, 9, 10, 27, 38, 43, 82]
[5, 4, 3, 2, 1] -> [1, 2, 3, 4, 5]
[1] -> [1]
[] -> []
[3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5] -> [1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]
`);
