LEARN.lesson('python', 42, `
@@chapterRef python-tute-3
@@difficulty:zh 进阶
@@difficulty:en Advanced
@@intro:zh
<p class="lead"><strong>提前返回</strong>（early return）：一旦确定结果，立即用 <code>return</code> 退出函数，不再执行后面的代码。这避免了不必要的计算和深层嵌套，让逻辑更清晰。</p>
<p>对比两种写法——提前返回更简洁：</p>
<pre><code># 不使用提前返回（嵌套深）
def is_sorted_v1(lst):
    result = True
    for i in range(1, len(lst)):
        if lst[i] < lst[i - 1]:
            result = False
    return result   # 即使发现问题，也要跑完整个循环

# 使用提前返回（发现问题即刻退出）
def is_sorted(lst):
    for i in range(1, len(lst)):
        if lst[i] < lst[i - 1]:
            return False   # ← 立刻退出，不再继续
    return True            # ← 全部通过才到这里

print(is_sorted([1, 2, 3]))   # True
print(is_sorted([1, 3, 2]))   # False</code></pre>
<p>提前返回也常用于<strong>参数校验</strong>（guard clause）：在函数开头用几个 if 排除非法输入，正常逻辑写在后面，不用嵌套在 else 里：</p>
<pre><code>def safe_divide(a, b):
    if b == 0:
        return None         # ← 卫语句：非法输入直接返回
    return a / b

print(safe_divide(10, 2))   # 5.0
print(safe_divide(10, 0))   # None</code></pre>
@@intro:en
<p class="lead"><strong>Early return</strong>: as soon as you know the result, use <code>return</code> to exit immediately — skip the rest. This avoids unnecessary computation and deep nesting, making logic cleaner.</p>
<p>Comparing both approaches — early return is clearer:</p>
<pre><code># without early return (deep nesting)
def is_sorted_v1(lst):
    result = True
    for i in range(1, len(lst)):
        if lst[i] < lst[i - 1]:
            result = False
    return result   # runs the entire loop even after finding a problem

# with early return (exit as soon as a problem is found)
def is_sorted(lst):
    for i in range(1, len(lst)):
        if lst[i] < lst[i - 1]:
            return False   # ← exit immediately
    return True            # ← only reached if everything passed

print(is_sorted([1, 2, 3]))   # True
print(is_sorted([1, 3, 2]))   # False</code></pre>
<p>Early return is also used as a <strong>guard clause</strong>: check for invalid input at the top of the function and return early, so the main logic doesn't need to be wrapped in an else:</p>
<pre><code>def safe_divide(a, b):
    if b == 0:
        return None          # ← guard: invalid input handled immediately
    return a / b

print(safe_divide(10, 2))    # 5.0
print(safe_divide(10, 0))    # None</code></pre>
@@task:zh
定义 <code>is_all_positive(lst)</code>：若任意元素 ≤ 0 则立即返回 <code>False</code>，全部 > 0 则返回 <code>True</code>。分两行输出 <code>[1,2,3]</code> 和 <code>[1,-2,3]</code> 的结果
@@task:en
Define <code>is_all_positive(lst)</code>: return <code>False</code> immediately if any element ≤ 0, otherwise return <code>True</code>. Print results for <code>[1,2,3]</code> and <code>[1,-2,3]</code> on two lines
@@hint:zh for n in lst: if n <= 0: return False；循环结束后 return True。
@@hint:en for n in lst: if n <= 0: return False; after the loop, return True.
@@starter:zh
# 定义 is_all_positive

# 测试两个列表

@@starter:en
# define is_all_positive

# test two lists

@@answer
def is_all_positive(lst):
    for n in lst:
        if n <= 0:
            return False
    return True
print(is_all_positive([1, 2, 3]))
print(is_all_positive([1, -2, 3]))

@@expectedOutput
True
False
`);
