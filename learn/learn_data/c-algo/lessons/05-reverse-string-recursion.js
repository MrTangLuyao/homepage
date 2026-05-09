LEARN.lesson('c-algo', 5, `
@@chapterRef c-algo-tute-1

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead">字符串反转用递归怎么写？这一节练习<strong>"假设小一号已解决"</strong>这个递归核心思维。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">递归地反转字符串 ABCDE</h3>
<p>想法：<strong>先打印最后一个字符，再反转前 n-1 个字符</strong>。</p>
<pre><code>reverse("ABCDE")
= 'E' + reverse("ABCD")
= 'E' + 'D' + reverse("ABC")
= 'E' + 'D' + 'C' + reverse("AB")
= 'E' + 'D' + 'C' + 'B' + reverse("A")
= 'E' + 'D' + 'C' + 'B' + 'A'
= "EDCBA"</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">在 C 里"反转一个字符串"的实现方式</h3>
<p>C 字符串是字符数组。让递归直接打印反转结果（不构造新字符串）：</p>
<pre><code>void print_reverse(const char *s) {
    if (*s == '\\0') return;     // base: 空字符串
    print_reverse(s + 1);       // 先递归打印后面
    putchar(*s);                // 再打印当前字符
}</code></pre>
<p>关键：<strong>把"打印当前字符"放在递归调用之后</strong>。这样最深层的字符（NULL 之前那个）先打印，整体顺序就反过来了。</p>
<h3 style="margin:14px 0 6px;font-size:14px;">类比：后序遍历</h3>
<p>这正是后序遍历（先递归子树，再访问自己）的字符串版本。后面学树的时候你会再次看到这个模式。</p>

@@intro:en
<p class="lead">How do you reverse a string recursively? This lesson drills the core recursive mindset: <strong>"assume the smaller version is solved"</strong>.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Recursively reverse "ABCDE"</h3>
<p>Idea: <strong>print the last char first, then reverse the first n-1 chars</strong>.</p>
<pre><code>reverse("ABCDE")
= 'E' + reverse("ABCD")
= 'E' + 'D' + reverse("ABC")
= 'E' + 'D' + 'C' + reverse("AB")
= 'E' + 'D' + 'C' + 'B' + reverse("A")
= 'E' + 'D' + 'C' + 'B' + 'A'
= "EDCBA"</code></pre>
<h3 style="margin:14px 0 6px;font-size:14px;">Implementing in C</h3>
<p>C strings are char arrays. Let recursion print the reversed result directly (no new buffer):</p>
<pre><code>void print_reverse(const char *s) {
    if (*s == '\\0') return;     // base: empty
    print_reverse(s + 1);       // recurse into the tail first
    putchar(*s);                // then print current char
}</code></pre>
<p>Key: <strong>put "print current" AFTER the recursive call</strong>. The deepest char (just before '\\0') prints first, so the order reverses.</p>
<h3 style="margin:14px 0 6px;font-size:14px;">Analogy: post-order</h3>
<p>This is the string version of post-order traversal (recurse children first, then visit self). You'll see this pattern again with trees.</p>

@@task:zh
实现 <code>void print_reverse(const char *s)</code>，对 4 个字符串调用并各占一行（每行后换行）：
<pre><code>print_reverse("ABCDE")  → EDCBA
print_reverse("hello")  → olleh
print_reverse("a")      → a
print_reverse("")       → (空字符串什么都不打)</code></pre>
按下面格式输出：
<pre><code>EDCBA
olleh
a
</code></pre>
注意第 4 个测试是空字符串，会输出空行（紧跟 'a' 行后的换行就够了）。

@@task:en
Implement <code>void print_reverse(const char *s)</code>, call on 4 strings each on its own line:
<pre><code>print_reverse("ABCDE")  → EDCBA
print_reverse("hello")  → olleh
print_reverse("a")      → a
print_reverse("")       → (empty: nothing prints)</code></pre>
Output format:
<pre><code>EDCBA
olleh
a
</code></pre>
The 4th call produces an empty line — actually the trailing '\\n' after 'a' is enough.

@@hint:zh
base case：当前字符是 <code>'\\0'</code> 直接返回。
recursive case：先 <code>print_reverse(s + 1);</code>（递归处理后面）再 <code>putchar(*s);</code>（打印当前字符）。
主函数每次调用后 <code>printf("\\n");</code>。

@@hint:en
base case: current char is <code>'\\0'</code>, return.
recursive case: first <code>print_reverse(s + 1);</code> (recurse on tail), then <code>putchar(*s);</code>.
After each call in main, do <code>printf("\\n");</code>.

@@starter
#include <stdio.h>

void print_reverse(const char *s) {
    // TODO: 递归反转打印
}

int main(void) {
    print_reverse("ABCDE");  printf("\\n");
    print_reverse("hello");  printf("\\n");
    print_reverse("a");      printf("\\n");
    print_reverse("");       printf("\\n");
    return 0;
}

@@answer
#include <stdio.h>

void print_reverse(const char *s) {
    if (*s == '\\0') return;
    print_reverse(s + 1);
    putchar(*s);
}

int main(void) {
    print_reverse("ABCDE");  printf("\\n");
    print_reverse("hello");  printf("\\n");
    print_reverse("a");      printf("\\n");
    print_reverse("");       printf("\\n");
    return 0;
}

@@expectedOutput
EDCBA
olleh
a

`);
