/* learn/learn_data/c/course.js
 * C 基础课，按 runoob.com/cprogramming 的章节顺序组织。每课 chapterRef
 * 指向对应的 runoob 文章 slug，左上角"查看菜鸟教程"链接到那里。
 *
 * No SQL schemas — C 课程像 Python 一样自包含，每节课 stdin 通过
 * testInputs 预填，stdout 与 expectedOutput 对比批改。 */

LEARN.course('c', {
  slug: 'c',
  type: 'c',
  title: { zh: 'C 语言基础语法 (Beta)', en: 'C · Core Syntax (Beta)' },
  desc:  {
    zh: '早期测试，可能包含错误。',
    en: 'Early access. May contain bugs.',
  },

  hasPlayground: true,
  playgroundTitle: { zh: '自定义 C 代码', en: 'C Playground' },

  lessons: [
    { id: 1,  section: 'main', slug: 'hello-c',
      title:   { zh: '程序结构', en: 'Program structure' },
      chapter: { zh: 'printf,return', en: 'printf,return' },
      file: 'lessons/01-hello-c.js' },

    { id: 2,  section: 'main', slug: 'escapes',
      title:   { zh: '转义符', en: 'Escape sequences' },
      chapter: { zh: '\\n,\\t,\\\\', en: '\\n,\\t,\\\\' },
      file: 'lessons/02-escapes.js' },

    { id: 3,  section: 'main', slug: 'variables',
      title:   { zh: '变量与基本类型', en: 'Variables & types' },
      chapter: { zh: 'int,float,char', en: 'int,float,char' },
      file: 'lessons/03-variables.js' },

    { id: 4,  section: 'main', slug: 'constants',
      title:   { zh: '常量', en: 'Constants' },
      chapter: { zh: '#define,const', en: '#define,const' },
      file: 'lessons/04-constants.js' },

    { id: 5,  section: 'main', slug: 'arithmetic',
      title:   { zh: '算术运算符', en: 'Arithmetic operators' },
      chapter: { zh: '+,-,*,/,%', en: '+,-,*,/,%' },
      file: 'lessons/05-arithmetic.js' },

    { id: 6,  section: 'main', slug: 'comparison-logic',
      title:   { zh: '关系与逻辑运算', en: 'Relational & logical' },
      chapter: { zh: '==,!=,&amp;&amp;,||', en: '==,!=,&amp;&amp;,||' },
      file: 'lessons/06-comparison-logic.js' },

    { id: 7,  section: 'main', slug: 'if-else',
      title:   { zh: 'if 判断', en: 'if statement' },
      chapter: { zh: 'if,else', en: 'if,else' },
      file: 'lessons/07-if-else.js' },

    { id: 8,  section: 'main', slug: 'switch',
      title:   { zh: 'switch', en: 'switch' },
      chapter: { zh: 'switch,case,break', en: 'switch,case,break' },
      file: 'lessons/08-switch.js' },

    { id: 9,  section: 'main', slug: 'while',
      title:   { zh: 'while 循环', en: 'while loop' },
      chapter: { zh: 'while', en: 'while' },
      file: 'lessons/09-while.js' },

    { id: 10, section: 'main', slug: 'for',
      title:   { zh: 'for 循环', en: 'for loop' },
      chapter: { zh: 'for', en: 'for' },
      file: 'lessons/10-for.js' },

    { id: 11, section: 'main', slug: 'functions',
      title:   { zh: '函数', en: 'Functions' },
      chapter: { zh: 'Functions', en: 'Functions' },
      file: 'lessons/11-functions.js' },

    { id: 12, section: 'main', slug: 'pass-by-value',
      title:   { zh: '值传递', en: 'Pass-by-value' },
      chapter: { zh: 'Pass-by-value', en: 'Pass-by-value' },
      file: 'lessons/12-pass-by-value.js' },

    { id: 13, section: 'main', slug: 'scope',
      title:   { zh: '作用域', en: 'Scope' },
      chapter: { zh: 'static', en: 'static' },
      file: 'lessons/13-scope.js' },

    { id: 14, section: 'main', slug: 'arrays',
      title:   { zh: '数组', en: 'Arrays' },
      chapter: { zh: 'Arrays', en: 'Arrays' },
      file: 'lessons/14-arrays.js' },

    { id: 15, section: 'main', slug: 'multi-arrays',
      title:   { zh: '二维数组', en: '2D arrays' },
      chapter: { zh: '2D arrays', en: '2D arrays' },
      file: 'lessons/15-multi-arrays.js' },

    { id: 16, section: 'main', slug: 'arrays-and-functions',
      title:   { zh: '数组与函数', en: 'Arrays & functions' },
      chapter: { zh: 'Arrays &amp; functions', en: 'Arrays &amp; functions' },
      file: 'lessons/16-arrays-and-functions.js' },

    { id: 17, section: 'main', slug: 'pointers',
      title:   { zh: '指针', en: 'Pointers' },
      chapter: { zh: '&amp;,*', en: '&amp;,*' },
      file: 'lessons/17-pointers.js' },

    { id: 18, section: 'main', slug: 'pointer-arithmetic',
      title:   { zh: '指针运算', en: 'Pointer arithmetic' },
      chapter: { zh: 'Pointer arithmetic', en: 'Pointer arithmetic' },
      file: 'lessons/18-pointer-arithmetic.js' },

    { id: 19, section: 'main', slug: 'pointers-and-arrays',
      title:   { zh: '指针与数组', en: 'Pointers & arrays' },
      chapter: { zh: 'Pointers &amp; arrays', en: 'Pointers &amp; arrays' },
      file: 'lessons/19-pointers-and-arrays.js' },

    { id: 20, section: 'main', slug: 'strings',
      title:   { zh: '字符串', en: 'Strings' },
      chapter: { zh: 'char[],\\0', en: 'char[],\\0' },
      file: 'lessons/20-strings.js' },

    { id: 21, section: 'main', slug: 'string-functions',
      title:   { zh: '字符串函数', en: 'String functions' },
      chapter: { zh: 'strlen,strcpy,strcat', en: 'strlen,strcpy,strcat' },
      file: 'lessons/21-string-functions.js' },

    { id: 22, section: 'main', slug: 'structs',
      title:   { zh: '结构体', en: 'Structs' },
      chapter: { zh: 'struct', en: 'struct' },
      file: 'lessons/22-structs.js' },

    { id: 23, section: 'main', slug: 'struct-pointers',
      title:   { zh: '结构体指针', en: 'Struct pointers' },
      chapter: { zh: '-&gt;', en: '-&gt;' },
      file: 'lessons/23-struct-pointers.js' },

    { id: 24, section: 'main', slug: 'structs-and-functions',
      title:   { zh: '结构体与函数', en: 'Structs & functions' },
      chapter: { zh: 'Structs &amp; functions', en: 'Structs &amp; functions' },
      file: 'lessons/24-structs-and-functions.js' },

    { id: 25, section: 'main', slug: 'unions',
      title:   { zh: '共用体', en: 'Unions' },
      chapter: { zh: 'union', en: 'union' },
      file: 'lessons/25-unions.js' },

    { id: 26, section: 'main', slug: 'enums',
      title:   { zh: '枚举', en: 'Enums' },
      chapter: { zh: 'enum', en: 'enum' },
      file: 'lessons/26-enums.js' },

    { id: 27, section: 'main', slug: 'typedef',
      title:   { zh: 'typedef', en: 'typedef' },
      chapter: { zh: 'typedef', en: 'typedef' },
      file: 'lessons/27-typedef.js' },

    { id: 28, section: 'main', slug: 'scanf-details',
      title:   { zh: '交互输入：问个名字', en: 'Interactive input: ask a name' },
      chapter: { zh: 'scanf,printf', en: 'scanf,printf' },
      file: 'lessons/28-scanf-details.js' },

    { id: 29, section: 'main', slug: 'string-as-file',
      title:   { zh: '文件读写', en: 'File I/O' },
      chapter: { zh: 'fopen,fread,fclose', en: 'fopen,fread,fclose' },
      file: 'lessons/29-string-as-file.js' },

    { id: 30, section: 'main', slug: 'malloc-free',
      title:   { zh: '动态内存', en: 'Dynamic memory' },
      chapter: { zh: 'malloc,free', en: 'malloc,free' },
      file: 'lessons/30-malloc-free.js' },

    /* ───────── Standard Library ───────── */

    { id: 31, section: 'stdlib', slug: 'printf-format',
      title:   { zh: '学习C标准库：&lt;stdio.h&gt;', en: 'Learn C stdlib: &lt;stdio.h&gt;' },
      chapter: { zh: 'printf', en: 'printf' },
      file: 'lessons/31-printf-format.js' },

    { id: 32, section: 'stdlib', slug: 'strchr-strstr',
      title:   { zh: '学习C标准库：&lt;string.h&gt;', en: 'Learn C stdlib: &lt;string.h&gt;' },
      chapter: { zh: 'strchr,strstr,strrchr', en: 'strchr,strstr,strrchr' },
      file: 'lessons/32-strchr-strstr.js' },

    { id: 33, section: 'stdlib', slug: 'strn-family',
      title:   { zh: '学习C标准库：&lt;string.h&gt; 2', en: 'Learn C stdlib: &lt;string.h&gt; 2' },
      chapter: { zh: 'strncpy,strncmp,strncat', en: 'strncpy,strncmp,strncat' },
      file: 'lessons/33-strn-family.js' },

    { id: 34, section: 'stdlib', slug: 'strtok',
      title:   { zh: '学习C标准库：&lt;string.h&gt; 3', en: 'Learn C stdlib: &lt;string.h&gt; 3' },
      chapter: { zh: 'strtok', en: 'strtok' },
      file: 'lessons/34-strtok.js' },

    { id: 35, section: 'stdlib', slug: 'mem-functions',
      title:   { zh: '学习C标准库：&lt;string.h&gt; 4', en: 'Learn C stdlib: &lt;string.h&gt; 4' },
      chapter: { zh: 'memcpy,memset,memcmp', en: 'memcpy,memset,memcmp' },
      file: 'lessons/35-mem-functions.js' },

    { id: 36, section: 'stdlib', slug: 'atoi-strtol',
      title:   { zh: '学习C标准库：&lt;stdlib.h&gt;', en: 'Learn C stdlib: &lt;stdlib.h&gt;' },
      chapter: { zh: 'atoi,strtol', en: 'atoi,strtol' },
      file: 'lessons/36-atoi-strtol.js' },

    { id: 37, section: 'stdlib', slug: 'rand-srand',
      title:   { zh: '学习C标准库：&lt;stdlib.h&gt; 2', en: 'Learn C stdlib: &lt;stdlib.h&gt; 2' },
      chapter: { zh: 'rand,srand', en: 'rand,srand' },
      file: 'lessons/37-rand-srand.js' },

    { id: 38, section: 'stdlib', slug: 'qsort',
      title:   { zh: '学习C标准库：&lt;stdlib.h&gt; 3', en: 'Learn C stdlib: &lt;stdlib.h&gt; 3' },
      chapter: { zh: 'qsort', en: 'qsort' },
      file: 'lessons/38-qsort.js' },

    { id: 39, section: 'stdlib', slug: 'sqrt-pow-fabs',
      title:   { zh: '学习C标准库：&lt;math.h&gt;', en: 'Learn C stdlib: &lt;math.h&gt;' },
      chapter: { zh: 'sqrt,pow,fabs', en: 'sqrt,pow,fabs' },
      file: 'lessons/39-sqrt-pow-fabs.js' },

    { id: 40, section: 'stdlib', slug: 'trig-functions',
      title:   { zh: '学习C标准库：&lt;math.h&gt; 2', en: 'Learn C stdlib: &lt;math.h&gt; 2' },
      chapter: { zh: 'sin,cos', en: 'sin,cos' },
      file: 'lessons/40-trig-functions.js' },

    { id: 41, section: 'stdlib', slug: 'rounding',
      title:   { zh: '学习C标准库：&lt;math.h&gt; 3', en: 'Learn C stdlib: &lt;math.h&gt; 3' },
      chapter: { zh: 'floor,ceil,round', en: 'floor,ceil,round' },
      file: 'lessons/41-rounding.js' },

    { id: 42, section: 'stdlib', slug: 'ctype',
      title:   { zh: '学习C标准库：&lt;ctype.h&gt;', en: 'Learn C stdlib: &lt;ctype.h&gt;' },
      chapter: { zh: 'isdigit,isalpha,tolower', en: 'isdigit,isalpha,tolower' },
      file: 'lessons/42-ctype.js' },

    { id: 43, section: 'stdlib', slug: 'time-clock',
      title:   { zh: '学习C标准库：&lt;time.h&gt;', en: 'Learn C stdlib: &lt;time.h&gt;' },
      chapter: { zh: 'time,clock', en: 'time,clock' },
      file: 'lessons/43-time-clock.js' },

    { id: 44, section: 'stdlib', slug: 'assert',
      title:   { zh: '学习C标准库：&lt;assert.h&gt;', en: 'Learn C stdlib: &lt;assert.h&gt;' },
      chapter: { zh: 'assert', en: 'assert' },
      file: 'lessons/44-assert.js' },
  ],
});
