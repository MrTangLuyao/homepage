/* learn_data/c/course.js — C language basics course
   Engine: JSCPP (JavaScript C++ interpreter), running entirely in the browser. */

(window.__LEARN_COURSES = window.__LEARN_COURSES || {})['c'] = {
  slug: 'c',
  type: 'c',
  title: { zh: 'C 语言基础语法', en: 'C · Core Syntax' },
  desc: {
    zh: '开发中，敬请期待。',
    en: 'Under development. Coming soon.',
  },
  hasPlayground: true,
  playgroundTitle: { zh: '自定义 C 语言代码', en: 'Custom C Playground' },

  lessons: [

    /* ─────────────────────── L1 HELLO WORLD ─────────────────────── */
    {
      id: 1,
      section: 'main',
      slug: 'hello-world',
      title: { zh: 'Part 1 · Hello World!', en: 'Part 1 · Hello World!' },
      chapter: { zh: 'C 基础 · Part 1', en: 'C Basics · Part 1' },
      intro: {
        zh: `<p>每个 C 程序都从 <code>main()</code> 函数开始运行。<code>#include &lt;stdio.h&gt;</code> 引入标准输入输出库，让你可以使用 <code>printf</code>。</p>
<pre><code>#include &lt;stdio.h&gt;

int main() {
    printf("Hello");  // 输出文本
    printf("\\n");    // 换行
    return 0;         // 返回 0 表示成功
}</code></pre>
<p><code>\\n</code> 是换行符，让光标跳到下一行。字符串必须用英文双引号 <code>"..."</code> 包裹。</p>`,
        en: `<p>Every C program starts from the <code>main()</code> function. <code>#include &lt;stdio.h&gt;</code> pulls in the standard I/O library so you can use <code>printf</code>.</p>
<pre><code>#include &lt;stdio.h&gt;

int main() {
    printf("Hello");  // print text
    printf("\\n");    // newline
    return 0;         // 0 means success
}</code></pre>
<p><code>\\n</code> is the newline character — it moves the cursor to the next line. Strings must be wrapped in double quotes <code>"..."</code>.</p>`,
      },
      task: {
        zh: '输出 <code>Hello World!</code>（注意大小写和感叹号，结尾换行）。',
        en: 'Print <code>Hello World!</code> followed by a newline (mind the case and exclamation mark).',
      },
      hint: {
        zh: '用 <code>printf("Hello World!\\n");</code>，字符串末尾的 <code>\\n</code> 代表换行。',
        en: 'Use <code>printf("Hello World!\\n");</code> — the <code>\\n</code> at the end of the string is a newline.',
      },
      starter: {
        zh: '#include <stdio.h>\n\nint main() {\n    // 在这里写代码\n    return 0;\n}\n',
        en: '#include <stdio.h>\n\nint main() {\n    // Write your code here\n    return 0;\n}\n',
      },
      answer: {
        zh: '#include <stdio.h>\n\nint main() {\n    printf("Hello World!\\n");\n    return 0;\n}\n',
        en: '#include <stdio.h>\n\nint main() {\n    printf("Hello World!\\n");\n    return 0;\n}\n',
      },
      expectedOutput: 'Hello World!\n',
    },

  ]
};
