LEARN.lesson('c-algo', 17, `
@@chapterRef c-algo-tute-2

@@difficulty:zh 进阶
@@difficulty:en Intermediate

@@intro:zh
<p class="lead"><strong>栈</strong>就是 LIFO（Last In First Out，后进先出）的容器。push 和 pop 都在同一端发生。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">数组实现的固定大小栈</h3>
<pre><code>#define MAX 1024
typedef struct {
    int data[MAX];
    int top;     // 栈顶索引；-1 表示空
} Stack;

void init(Stack *s)        { s-&gt;top = -1; }
int  is_empty(Stack *s)    { return s-&gt;top == -1; }
void push(Stack *s, int v) { s-&gt;data[++s-&gt;top] = v; }
int  pop(Stack *s)         { return s-&gt;data[s-&gt;top--]; }
int  peek(Stack *s)        { return s-&gt;data[s-&gt;top]; }</code></pre>
<p>所有操作 O(1)。栈是不少经典算法的"骨架"——函数调用栈、撤销/重做、表达式求值、深度优先搜索。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">经典应用：括号匹配</h3>
<p>判断字符串里的 <code>()</code>、<code>[]</code>、<code>{}</code> 是否成对且嵌套正确：</p>
<pre><code>"()"            ✓
"({[]})"        ✓
"(])"           ✗（] 想匹配 (）
"((("           ✗（没闭合）
"))"            ✗（多了 ））</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">算法</h3>
<ol>
  <li>遇到左括号（任意一种）→ push 进栈</li>
  <li>遇到右括号 → 看栈顶。栈空、或栈顶不是对应的左括号 → 失败</li>
  <li>否则 pop 栈顶</li>
  <li>扫完字符串，栈空就是匹配成功</li>
</ol>
<p>栈天然适合这种"嵌套"问题——最近压入的就是最近需要匹配的。</p>

@@intro:en
<p class="lead"><strong>Stack</strong> = LIFO (Last In First Out) container. Both push and pop happen at the same end.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Array-backed fixed stack</h3>
<pre><code>#define MAX 1024
typedef struct {
    int data[MAX];
    int top;     // top index; -1 = empty
} Stack;

void init(Stack *s)        { s-&gt;top = -1; }
int  is_empty(Stack *s)    { return s-&gt;top == -1; }
void push(Stack *s, int v) { s-&gt;data[++s-&gt;top] = v; }
int  pop(Stack *s)         { return s-&gt;data[s-&gt;top--]; }
int  peek(Stack *s)        { return s-&gt;data[s-&gt;top]; }</code></pre>
<p>All ops O(1). Stack is the skeleton of many classic algorithms — call stack, undo/redo, expression eval, DFS.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Classic application: paren matching</h3>
<p>Check if <code>()</code>, <code>[]</code>, <code>{}</code> in a string are balanced and properly nested:</p>
<pre><code>"()"            ✓
"({[]})"        ✓
"(])"           ✗  (] doesn't match ()
"((("           ✗  (unclosed)
"))"            ✗  (extra ))</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">Algorithm</h3>
<ol>
  <li>Open bracket (any type) → push</li>
  <li>Close bracket → check top. Empty stack OR top doesn't match → fail</li>
  <li>Otherwise pop</li>
  <li>End of string: empty stack = balanced</li>
</ol>
<p>Stack is a natural fit for nesting — the most-recently-pushed is the most-recently-needs-matching.</p>

@@task:zh
实现 <code>int is_balanced(const char *s)</code>：返回 1 = 匹配，0 = 不匹配。栈里存字符（push/pop 字符）。然后对几个测试串打印结果：
<pre><code>"()"        → 1
"({[]})"    → 1
"(]"        → 0
"((("       → 0
"))"        → 0
""          → 1   （空字符串视为匹配）</code></pre>
按下面格式输出：
<pre><code>(): 1
({[]}): 1
(]: 0
(((: 0
)): 0
empty: 1</code></pre>

@@task:en
Implement <code>int is_balanced(const char *s)</code>: return 1 = balanced, 0 = not. Stack holds chars. Test:
<pre><code>"()"        → 1
"({[]})"    → 1
"(]"        → 0
"((("       → 0
"))"        → 0
""          → 1   (empty = balanced)</code></pre>
Output:
<pre><code>(): 1
({[]}): 1
(]: 0
(((: 0
)): 0
empty: 1</code></pre>

@@hint:zh
栈存 char。遇到 <code>(</code>、<code>[</code>、<code>{</code> push；遇到 <code>)</code>、<code>]</code>、<code>}</code> 检查栈顶是不是对应的左括号——是就 pop，否则返回 0。最后栈空才算成功。
辅助函数：<code>int matches(char open, char close)</code>。

@@hint:en
Stack holds char. On <code>(</code> <code>[</code> <code>{</code> → push; on <code>)</code> <code>]</code> <code>}</code> → check top matches. If yes pop; otherwise return 0. End: stack must be empty.
Helper: <code>int matches(char open, char close)</code>.

@@starter
#include <stdio.h>
#include <string.h>

#define MAX 1024
typedef struct { char data[MAX]; int top; } Stack;

void init(Stack *s)         { s->top = -1; }
int  is_empty(Stack *s)     { return s->top == -1; }
void push(Stack *s, char c) { s->data[++s->top] = c; }
char pop(Stack *s)          { return s->data[s->top--]; }
char peek(Stack *s)         { return s->data[s->top]; }

int is_balanced(const char *s) {
    // TODO
    return 0;
}

int main(void) {
    printf("(): %d\\n",       is_balanced("()"));
    printf("({[]}): %d\\n",   is_balanced("({[]})"));
    printf("(]: %d\\n",       is_balanced("(]"));
    printf("(((: %d\\n",      is_balanced("((("));
    printf(")): %d\\n",       is_balanced("))"));
    printf("empty: %d\\n",    is_balanced(""));
    return 0;
}

@@answer
#include <stdio.h>
#include <string.h>

#define MAX 1024
typedef struct { char data[MAX]; int top; } Stack;

void init(Stack *s)         { s->top = -1; }
int  is_empty(Stack *s)     { return s->top == -1; }
void push(Stack *s, char c) { s->data[++s->top] = c; }
char pop(Stack *s)          { return s->data[s->top--]; }
char peek(Stack *s)         { return s->data[s->top]; }

int matches(char open, char close) {
    return (open == '(' && close == ')')
        || (open == '[' && close == ']')
        || (open == '{' && close == '}');
}

int is_balanced(const char *s) {
    Stack stk; init(&stk);
    for (int i = 0; s[i]; i++) {
        char c = s[i];
        if (c == '(' || c == '[' || c == '{') {
            push(&stk, c);
        } else if (c == ')' || c == ']' || c == '}') {
            if (is_empty(&stk)) return 0;
            if (!matches(peek(&stk), c)) return 0;
            pop(&stk);
        }
    }
    return is_empty(&stk) ? 1 : 0;
}

int main(void) {
    printf("(): %d\\n",       is_balanced("()"));
    printf("({[]}): %d\\n",   is_balanced("({[]})"));
    printf("(]: %d\\n",       is_balanced("(]"));
    printf("(((: %d\\n",      is_balanced("((("));
    printf(")): %d\\n",       is_balanced("))"));
    printf("empty: %d\\n",    is_balanced(""));
    return 0;
}

@@expectedOutput
(): 1
({[]}): 1
(]: 0
(((: 0
)): 0
empty: 1
`);
