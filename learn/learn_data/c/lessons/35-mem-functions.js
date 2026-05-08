LEARN.lesson('c', 35, `
@@chapterRef c-string

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead"><code>str*</code> 函数都假定输入是 NUL 结尾的字符串 —— 遇到 <code>\\0</code> 就停。但很多场景下数据里有 <code>\\0</code> 是合法的（二进制数据、图像、音频）。这时用 <code>mem*</code> 函数 —— 它们只看字节、不看内容、不在乎 <code>\\0</code>。</p>
<table style="border-collapse:collapse;font-size:13px;">
<tr><td style="padding:2px 14px 2px 0;"><code>memcpy(dst, src, n)</code></td><td>复制 n 字节</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>memset(dst, byte, n)</code></td><td>把 n 字节都设成 byte</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>memcmp(a, b, n)</code></td><td>逐字节比较 n 字节</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>memmove(dst, src, n)</code></td><td>同 memcpy，但允许 src/dst 重叠</td></tr>
</table>
<h3 style="margin:12px 0 6px;font-size:14px;">memset · 数组初始化</h3>
<pre><code>int arr[10];
memset(arr, 0, sizeof(arr));    // 全部清零

char buf[100];
memset(buf, 'A', sizeof(buf));  // 全填 'A'</code></pre>
<p>注意：<code>memset</code> 是<strong>按字节</strong>设置。<code>memset(int_array, 1, ...)</code> 不会让每个 int 等于 1，而是每个字节都等于 0x01 —— 4 字节合起来是 <code>0x01010101 = 16843009</code>。所以 memset 只能用在 0、-1（全位 1）这种"每字节相同"的值。</p>
<h3 style="margin:12px 0 6px;font-size:14px;">memcpy vs strcpy</h3>
<pre><code>// strcpy 遇到 \\0 就停 — 适合 NUL 结尾字符串
strcpy(dst, "hello");      // 复制 6 字节 (含 \\0)

// memcpy 严格按字节数 — 适合任意二进制
memcpy(dst, src, 100);     // 复制 100 字节，不管内容</code></pre>
<h3 style="margin:12px 0 6px;font-size:14px;">memmove · 处理重叠</h3>
<p>当源和目标内存有重叠时（比如把数组左移：<code>memcpy(arr, arr+1, n)</code>），memcpy 行为是 UB。memmove 保证正确处理重叠 —— 性能略低但安全。</p>

@@intro:en
<p class="lead"><code>str*</code> functions assume NUL-terminated input — they stop at <code>\\0</code>. But many situations have legitimate <code>\\0</code> bytes (binary data, images, audio). For those, use <code>mem*</code> — it only sees bytes, never inspects content, doesn't care about <code>\\0</code>.</p>
<table style="border-collapse:collapse;font-size:13px;">
<tr><td style="padding:2px 14px 2px 0;"><code>memcpy(dst, src, n)</code></td><td>copy n bytes</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>memset(dst, byte, n)</code></td><td>set n bytes all to byte</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>memcmp(a, b, n)</code></td><td>compare n bytes</td></tr>
<tr><td style="padding:2px 14px 2px 0;"><code>memmove(dst, src, n)</code></td><td>memcpy but handles overlap</td></tr>
</table>
<h3 style="margin:12px 0 6px;font-size:14px;">memset gotcha</h3>
<p><code>memset</code> sets <strong>per byte</strong>. <code>memset(int_array, 1, ...)</code> won't make each int equal 1 — every byte becomes 0x01, so each 4-byte int is <code>0x01010101 = 16843009</code>. Only safe for 0, -1 (all-bits-set), or any value where each byte is the same.</p>

@@task:zh
完成下面三件事：
<ol>
<li>用 <code>memset</code> 把 <code>int arr[5]</code> 全部清零，打印每个元素</li>
<li>用 <code>memcpy</code> 把 <code>arr</code> 复制到 <code>copy[5]</code></li>
<li>用 <code>memcmp</code> 比较 <code>arr</code> 和 <code>copy</code></li>
</ol>
<pre><code>arr: 0 0 0 0 0
copy: 0 0 0 0 0
memcmp: equal</code></pre>

@@task:en
Do three things:
<ol>
<li>memset <code>int arr[5]</code> to all zeros, print elements</li>
<li>memcpy <code>arr</code> into <code>copy[5]</code></li>
<li>memcmp <code>arr</code> vs <code>copy</code></li>
</ol>
<pre><code>arr: 0 0 0 0 0
copy: 0 0 0 0 0
memcmp: equal</code></pre>

@@hint:zh
<code>memset(arr, 0, sizeof(arr));</code> · <code>memcpy(copy, arr, sizeof(arr));</code> · <code>memcmp(arr, copy, sizeof(arr)) == 0 ? "equal" : "different"</code>。

@@hint:en
<code>memset(arr, 0, sizeof(arr));</code> · <code>memcpy(copy, arr, sizeof(arr));</code> · <code>memcmp(arr, copy, sizeof(arr)) == 0</code>.

@@starter
#include <stdio.h>
#include <string.h>

int main(void) {
    int arr[5];
    int copy[5];
    // memset 清零 arr
    // memcpy 复制
    // 打印 + 比较
    return 0;
}

@@answer
#include <stdio.h>
#include <string.h>

int main(void) {
    int arr[5];
    int copy[5];
    memset(arr, 0, sizeof(arr));
    memcpy(copy, arr, sizeof(arr));

    printf("arr:");
    for (int i = 0; i < 5; i++) printf(" %d", arr[i]);
    printf("\\n");

    printf("copy:");
    for (int i = 0; i < 5; i++) printf(" %d", copy[i]);
    printf("\\n");

    printf("memcmp: %s\\n",
           memcmp(arr, copy, sizeof(arr)) == 0 ? "equal" : "different");
    return 0;
}

@@expectedOutput
arr: 0 0 0 0 0
copy: 0 0 0 0 0
memcmp: equal
`);
