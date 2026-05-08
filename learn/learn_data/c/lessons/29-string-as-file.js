LEARN.lesson('c', 29, `
@@chapterRef c-file-io

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead">真实 C 程序处理文件用 <code>FILE *</code> + <code>fopen / fread / fclose</code>：</p>
<pre><code>FILE *fp = fopen("data.txt", "r");
if (fp == NULL) { /* 文件不存在 */ }
char line[256];
while (fgets(line, sizeof(line), fp)) {
    // 处理一行
}
fclose(fp);</code></pre>
<p>核心范式：</p>
<ol>
<li><code>fopen(path, mode)</code> 打开 —— mode 是 <code>"r"</code>（读）/ <code>"w"</code>（写，覆盖）/ <code>"a"</code>（追加）/ <code>"rb"</code>（二进制读）等</li>
<li><strong>检查返回 NULL</strong> —— 文件不存在或权限不足时 fopen 返回 NULL，跳过这步是常见 bug</li>
<li>读：<code>fgets</code>（一行）/ <code>fread</code>（二进制）/ <code>fscanf</code>（格式化）</li>
<li>写：<code>fputs</code> / <code>fwrite</code> / <code>fprintf</code></li>
<li><code>fclose(fp)</code> —— 必须配对，否则资源泄漏 + 缓冲数据可能没刷盘</li>
</ol>
<h3 style="margin:12px 0 6px;font-size:14px;">浏览器沙箱里没文件系统</h3>
<p>本课的 emcc + emception 在浏览器里跑，<strong>没有真实文件可打开</strong>。但解析"逐行格式化数据"的<u>逻辑</u>完全一样 —— 把"文件内容"直接放在字符串变量里，用 <code>sscanf</code>（"string scanf"）解析。本质是把 fread + sscanf 合并成 sscanf。</p>
<pre><code>const char *data = "Alice 90\\nBob 85\\nCarol 92\\n";
// 真实代码用 fgets 一行一行读，这里我们手动按 \\n 切分</code></pre>
<p>本课用 <code>strchr</code> 找下一个 <code>\\n</code> 位置 + <code>sscanf</code> 解析单行 —— 和真实代码处理 <code>fgets</code> 返回的一行字符串<strong>逻辑相同</strong>。</p>

@@intro:en
<p class="lead">Real C programs handle files via <code>FILE *</code> + <code>fopen / fread / fclose</code>:</p>
<pre><code>FILE *fp = fopen("data.txt", "r");
if (fp == NULL) { /* file doesn't exist */ }
char line[256];
while (fgets(line, sizeof(line), fp)) {
    // process one line
}
fclose(fp);</code></pre>
<p>The core pattern:</p>
<ol>
<li><code>fopen(path, mode)</code> — mode is <code>"r"</code> (read) / <code>"w"</code> (write, truncate) / <code>"a"</code> (append) / <code>"rb"</code> (binary read), etc.</li>
<li><strong>Check for NULL</strong> — fopen returns NULL on missing file or permission denial; skipping this is a common bug</li>
<li>Read: <code>fgets</code> (line) / <code>fread</code> (binary) / <code>fscanf</code> (formatted)</li>
<li>Write: <code>fputs</code> / <code>fwrite</code> / <code>fprintf</code></li>
<li><code>fclose(fp)</code> — must pair with fopen, or you leak resources + may lose buffered writes</li>
</ol>
<h3 style="margin:12px 0 6px;font-size:14px;">No file system in the browser sandbox</h3>
<p>The emcc + emception running in your browser <strong>has no real files</strong>. But the <u>logic</u> for parsing line-formatted data is identical — keep "file content" in a string variable and use <code>sscanf</code> ("string scanf"). Effectively merging fread + sscanf into one call.</p>
<pre><code>const char *data = "Alice 90\\nBob 85\\nCarol 92\\n";
// real code uses fgets per line; we'll manually split by \\n</code></pre>

@@task:zh
给定字符串 <code>const char *data = "Alice 90\\nBob 85\\nCarol 92\\n";</code> 模拟 3 行文件内容。逐行解析（用 <code>sscanf("%s %d", name, &amp;score)</code>）并打印总平均分：
<pre><code>Alice: 90
Bob: 85
Carol: 92
average: 89</code></pre>
<p style="margin-top:8px;color:var(--muted);font-size:12px;">提示：用 <code>strchr(p, '\\n')</code> 找下一行的 <code>\\n</code>，用 <code>sscanf</code> 直接解析子串（它会在第一个空白停止）。</p>

@@task:en
Given <code>const char *data = "Alice 90\\nBob 85\\nCarol 92\\n";</code> as 3 lines of mock file. Parse each line (use <code>sscanf("%s %d", name, &amp;score)</code>) and print the average:
<pre><code>Alice: 90
Bob: 85
Carol: 92
average: 89</code></pre>

@@hint:zh
循环 3 次，每次：<code>sscanf(p, "%s %d", name, &amp;score)</code> 解析当前位置；<code>p = strchr(p, '\\n') + 1</code> 跳到下一行开头。最后 average = total / 3。

@@hint:en
Loop 3 times: <code>sscanf(p, "%s %d", name, &amp;score)</code> parses at current position; <code>p = strchr(p, '\\n') + 1</code> jumps to the next line. Finally average = total / 3.

@@starter
#include <stdio.h>
#include <string.h>

int main(void) {
    const char *data = "Alice 90\\nBob 85\\nCarol 92\\n";
    const char *p = data;
    int total = 0;

    for (int i = 0; i < 3; i++) {
        char name[32];
        int  score;
        // 解析 + 打印 + 累加 total
        // 跳到下一行
    }

    // 打印平均

    return 0;
}

@@answer
#include <stdio.h>
#include <string.h>

int main(void) {
    const char *data = "Alice 90\\nBob 85\\nCarol 92\\n";
    const char *p = data;
    int total = 0;

    for (int i = 0; i < 3; i++) {
        char name[32];
        int  score;
        sscanf(p, "%s %d", name, &score);
        printf("%s: %d\\n", name, score);
        total += score;
        p = strchr(p, '\\n') + 1;
    }

    printf("average: %d\\n", total / 3);
    return 0;
}

@@expectedOutput
Alice: 90
Bob: 85
Carol: 92
average: 89
`);
