LEARN.lesson('python', 60, `
@@chapterRef python-tute-3
@@difficulty:zh 综合
@@difficulty:en Comprehensive
@@intro:zh
<p class="lead"><strong>矩阵乘法</strong>是线性代数的核心运算，广泛应用于计算机图形学（旋转、缩放变换）、机器学习（神经网络的前向传播）和科学计算。</p>
<p>两个 n×n 矩阵 A 和 B 相乘，结果矩阵 C 的每个元素定义为：</p>
<pre><code>C[i][j] = A[i][0]×B[0][j] + A[i][1]×B[1][j] + ... + A[i][n-1]×B[n-1][j]
        = Σ A[i][k] × B[k][j]  （k 从 0 到 n-1）</code></pre>
<p>换句话说：<strong>C 的第 i 行第 j 列 = A 的第 i 行与 B 的第 j 列对应元素的乘积之和</strong>。实现需要三重循环：外两层枚举 i 和 j（结果矩阵的位置），内层 k 做求和。</p>
<p>本题要实现两个函数：</p>
<ul>
<li><code>mat_mul(A, B)</code>：三重循环计算乘积，返回结果矩阵</li>
<li><code>print_matrix(M, label)</code>：带标题逐行打印矩阵</li>
</ul>
<p>结果矩阵初始化为全零：<code>[[0]*n for _ in range(n)]</code>，然后对每个位置累加 n 项乘积。</p>
@@intro:en
<p class="lead"><strong>Matrix multiplication</strong> is a core operation in linear algebra, used everywhere: in computer graphics (rotation and scaling transforms), machine learning (the forward pass of neural networks), and scientific computing.</p>
<p>For two n×n matrices A and B, each element of the result matrix C is defined as:</p>
<pre><code>C[i][j] = A[i][0]×B[0][j] + A[i][1]×B[1][j] + ... + A[i][n-1]×B[n-1][j]
        = Σ A[i][k] × B[k][j]  (k from 0 to n-1)</code></pre>
<p>In plain language: <strong>C's element at row i, column j = the dot product of A's i-th row and B's j-th column</strong>. Implementation needs three nested loops: the outer two pick i and j (the result cell), the inner k accumulates the sum.</p>
<p>You need to implement two functions:</p>
<ul>
<li><code>mat_mul(A, B)</code>: triple-loop calculation, return the result matrix</li>
<li><code>print_matrix(M, label)</code>: print the matrix row by row with a title</li>
</ul>
<p>Initialise the result as all zeros with <code>[[0]*n for _ in range(n)]</code>, then accumulate n products into each cell.</p>
@@task:zh 实现 <code>mat_mul(A, B)</code> 和 <code>print_matrix(M, label)</code>，对给定的两个 3×3 矩阵计算并打印乘积。
@@task:en
Implement <code>mat_mul(A, B)</code> and <code>print_matrix(M, label)</code>; compute and display the product of the two given 3×3 matrices.
@@hint:zh result = [[0]*n for _ in range(n)] 初始化全零矩阵；三重循环累加。
@@hint:en result = [[0]*n for _ in range(n)] for the zero matrix; triple-loop to accumulate.
@@starter:zh
def mat_mul(A, B):
    n = len(A)
    # 初始化结果矩阵，三重循环
    pass

def print_matrix(M, label):
    print(f"=== {label} ===")
    # 逐行打印
    pass

A = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
B = [[9, 8, 7], [6, 5, 4], [3, 2, 1]]
C = mat_mul(A, B)
print_matrix(A, "A")
print_matrix(B, "B")
print_matrix(C, "A x B")

@@starter:en
def mat_mul(A, B):
    n = len(A)
    # initialise result, triple loop
    pass

def print_matrix(M, label):
    print(f"=== {label} ===")
    # print each row
    pass

A = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
B = [[9, 8, 7], [6, 5, 4], [3, 2, 1]]
C = mat_mul(A, B)
print_matrix(A, "A")
print_matrix(B, "B")
print_matrix(C, "A x B")

@@answer
def mat_mul(A, B):
    n = len(A)
    result = [[0] * n for _ in range(n)]
    for i in range(n):
        for j in range(n):
            for k in range(n):
                result[i][j] += A[i][k] * B[k][j]
    return result

def print_matrix(M, label):
    print(f"=== {label} ===")
    for row in M:
        print(row)

A = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
B = [[9, 8, 7], [6, 5, 4], [3, 2, 1]]
C = mat_mul(A, B)
print_matrix(A, "A")
print_matrix(B, "B")
print_matrix(C, "A x B")

@@expectedOutput
=== A ===
[1, 2, 3]
[4, 5, 6]
[7, 8, 9]
=== B ===
[9, 8, 7]
[6, 5, 4]
[3, 2, 1]
=== A x B ===
[30, 24, 18]
[84, 69, 54]
[138, 114, 90]
`);
