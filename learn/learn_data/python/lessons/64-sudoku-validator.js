LEARN.lesson('python', 64, `
@@chapterRef python-tute-3
@@difficulty:zh Boss
@@difficulty:en Boss
@@intro:zh
<p class="lead"><strong>数独</strong>是一个 9×9 的填数字游戏：每一行、每一列、以及每个 3×3 的宫格中，数字 1-9 各出现恰好一次。本题不是解数独，而是<strong>验证一个已填写的盘面是否合法</strong>（0 代表空格，跳过不检查）。</p>
<p>验证需要检查三类区域，共 27 个：</p>
<ul>
<li><strong>9 行</strong>：直接用 <code>grid[i]</code></li>
<li><strong>9 列</strong>：第 j 列 = <code>[grid[r][j] for r in range(9)]</code></li>
<li><strong>9 个 3×3 宫格</strong>：左上角在 <code>(br*3, bc*3)</code>，br 和 bc 各从 0 到 2</li>
</ul>
<p>判断一组数字是否有重复：过滤掉 0 后，看元素个数是否等于去重后的个数（集合的大小）。</p>
<p>本题需要实现 5 个函数，共同完成验证和打印任务：</p>
<ul>
<li><code>has_duplicates(nums)</code>：判断是否含重复非零数字</li>
<li><code>get_cols(grid)</code>：提取 9 列，返回列表的列表</li>
<li><code>get_boxes(grid)</code>：提取 9 个宫格（含宫格坐标，用于错误提示）</li>
<li><code>validate(grid)</code>：调用上面三个，汇总错误信息列表</li>
<li><code>print_grid(grid)</code>：美观打印盘面，0 显示为 <code>.</code>，在第 3 和第 6 行/列后加分隔线</li>
</ul>
@@intro:en
<p class="lead"><strong>Sudoku</strong> is a 9×9 number puzzle where each row, column, and 3×3 box must contain each digit 1-9 exactly once. This problem doesn't solve a Sudoku — it <strong>validates whether a filled grid is legal</strong> (0 = empty cell, skipped in checks).</p>
<p>Validation checks three types of regions, 27 total:</p>
<ul>
<li><strong>9 rows</strong>: directly use <code>grid[i]</code></li>
<li><strong>9 columns</strong>: column j = <code>[grid[r][j] for r in range(9)]</code></li>
<li><strong>9 boxes (3×3)</strong>: top-left corner at <code>(br*3, bc*3)</code>, with br and bc each from 0 to 2</li>
</ul>
<p>Checking for duplicates: filter out zeros, then compare the element count to the unique count (set size).</p>
<p>The problem requires 5 functions working together:</p>
<ul>
<li><code>has_duplicates(nums)</code>: detect duplicate non-zero values</li>
<li><code>get_cols(grid)</code>: extract all 9 columns as a list of lists</li>
<li><code>get_boxes(grid)</code>: extract all 9 boxes (with coordinates for error messages)</li>
<li><code>validate(grid)</code>: call the above three and collect all error messages</li>
<li><code>print_grid(grid)</code>: pretty-print with dots for zeros and dividers after rows/cols 3 and 6</li>
</ul>
@@task:zh 实现上述所有函数，打印盘面，再输出验证结果。没有冲突输出 <code>Valid: no conflicts found.</code>。
@@task:en
Implement all functions above, print the grid, then print the validation result. No conflicts → <code>Valid: no conflicts found.</code>
@@hint:zh get_boxes：外层 br in range(3)，内层 bc in range(3)，最内层推导式提取 3×3 块。
@@hint:en get_boxes: outer br in range(3), inner bc in range(3), innermost comprehension to extract the 3×3 block.
@@starter:zh
GRID = [
    [5,3,0,0,7,0,0,0,0],
    [6,0,0,1,9,5,0,0,0],
    [0,9,8,0,0,0,0,6,0],
    [8,0,0,0,6,0,0,0,3],
    [4,0,0,8,0,3,0,0,1],
    [7,0,0,0,2,0,0,0,6],
    [0,6,0,0,0,0,2,8,0],
    [0,0,0,4,1,9,0,0,5],
    [0,0,0,0,8,0,0,7,9],
]

def has_duplicates(nums): pass
def get_cols(grid): pass
def get_boxes(grid): pass
def validate(grid):
    errors = []
    return errors
def print_grid(grid): pass

print_grid(GRID)
print()
errors = validate(GRID)
if errors:
    for e in errors: print(f"ERROR: {e}")
else:
    print("Valid: no conflicts found.")

@@starter:en
GRID = [
    [5,3,0,0,7,0,0,0,0],
    [6,0,0,1,9,5,0,0,0],
    [0,9,8,0,0,0,0,6,0],
    [8,0,0,0,6,0,0,0,3],
    [4,0,0,8,0,3,0,0,1],
    [7,0,0,0,2,0,0,0,6],
    [0,6,0,0,0,0,2,8,0],
    [0,0,0,4,1,9,0,0,5],
    [0,0,0,0,8,0,0,7,9],
]

def has_duplicates(nums): pass
def get_cols(grid): pass
def get_boxes(grid): pass
def validate(grid):
    errors = []
    return errors
def print_grid(grid): pass

print_grid(GRID)
print()
errors = validate(GRID)
if errors:
    for e in errors: print(f"ERROR: {e}")
else:
    print("Valid: no conflicts found.")

@@answer
GRID = [
    [5,3,0,0,7,0,0,0,0],
    [6,0,0,1,9,5,0,0,0],
    [0,9,8,0,0,0,0,6,0],
    [8,0,0,0,6,0,0,0,3],
    [4,0,0,8,0,3,0,0,1],
    [7,0,0,0,2,0,0,0,6],
    [0,6,0,0,0,0,2,8,0],
    [0,0,0,4,1,9,0,0,5],
    [0,0,0,0,8,0,0,7,9],
]

def has_duplicates(nums):
    filled = [n for n in nums if n != 0]
    return len(filled) != len(set(filled))

def get_cols(grid):
    return [[grid[r][c] for r in range(9)] for c in range(9)]

def get_boxes(grid):
    boxes = []
    for br in range(3):
        for bc in range(3):
            box = [grid[br*3+r][bc*3+c] for r in range(3) for c in range(3)]
            boxes.append((br+1, bc+1, box))
    return boxes

def validate(grid):
    errors = []
    for i, row in enumerate(grid):
        if has_duplicates(row):
            errors.append(f"Row {i+1} has duplicates")
    for j, col in enumerate(get_cols(grid)):
        if has_duplicates(col):
            errors.append(f"Col {j+1} has duplicates")
    for br, bc, box in get_boxes(grid):
        if has_duplicates(box):
            errors.append(f"Box ({br},{bc}) has duplicates")
    return errors

def print_grid(grid):
    for i, row in enumerate(grid):
        if i in (3, 6):
            print("------+-------+------")
        parts = []
        for j, v in enumerate(row):
            if j in (3, 6):
                parts.append("|")
            parts.append(str(v) if v else ".")
        print(" ".join(parts))

print_grid(GRID)
print()
errors = validate(GRID)
if errors:
    for e in errors: print(f"ERROR: {e}")
else:
    print("Valid: no conflicts found.")

@@expectedOutput
5 3 . | . 7 . | . . .
6 . . | 1 9 5 | . . .
. 9 8 | . . . | . 6 .
------+-------+------
8 . . | . 6 . | . . 3
4 . . | 8 . 3 | . . 1
7 . . | . 2 . | . . 6
------+-------+------
. 6 . | . . . | 2 8 .
. . . | 4 1 9 | . . 5
. . . | . 8 . | . 7 9

Valid: no conflicts found.
`);
