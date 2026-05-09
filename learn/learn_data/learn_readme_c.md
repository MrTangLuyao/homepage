# learn_readme_c.md（中文）

> 给未来自己的笔记。`learn.html` 的内部结构、添加或扩展课程不会踩坑的步骤。

---

## 架构概览

**零编译、零后端、按需懒加载每一节课。**

- SQL 和 Python 100% 在浏览器跑——sql.js（SQLite asm.js）和 Skulpt——通过 `<script>` 标签加载。`file://` 本地能跑。
- C 体量大些：通过 [emception](https://github.com/jprendes/emception) 在隐藏 `<iframe>` 里跑真实的 **clang** 编译器。iframe 同源（镜像在 `lib/runtime/webC/`），所以 `<script>` 和 Worker 创建都不会撞跨域。**C 课程必须 HTTPS 或 `http://localhost`**；纯 `file://` 会被 C-family 模态框拦下。
- 课程的元数据 + 课时索引在用户打开课程时加载；每节课的完整内容（以及它引用的 SQL schema）等用户点进那一节才加载。

每门课首次访问的下载量（之后浏览器缓存，免费）：
- SQL：~8 KB 课程索引 + 每节 ~5–15 KB
- Python：~6 KB 课程索引 + 每节 ~3–10 KB
- **C：~25–30 MB**（clang.wasm + libc/libc++ 归档）首次进任意 C-family 课程（`c` 基础语法 / `c-algo` 算法）或 playground 时；之后免费。`c` 和 `c-algo` 共享同一份 emception 缓存。

---

## 目录结构

```
learn.html                              ← 交互 UI（路由、渲染、引擎）
learn/
├── learn-core.js                       ← loadCourse / loadLesson / loadSchema、涟漪、
│                                         分隔条、进度、课程缓存
├── learn-engines.js                    ← sql.js + Skulpt + Monaco + emception 封装、
│                                         结果表格渲染辅助
├── learn-i18n.js                       ← zh / en 翻译 + applyLang / tt / pickLang
├── learn-lesson-parser.js              ← `@@key` 解析器 + LEARN.{course,lesson,schema}
│                                         注册函数 + assembleOneLesson
├── learn-views.js                      ← 课程列表、课时列表、playgrounds（SQL/Py/C）
├── learn-lesson.js                     ← 课时运行器（SQL/Python/C 判题）、
│                                         hash 路由、启动
├── learn.css                           ← 共享样式（含新 .editor-pane 布局）
└── learn_data/
    ├── learn_readme.md                 ← 英文版
    ├── learn_readme_c.md               ← 本文件
    ├── manifest.js                     ← 课程目录（window.__LEARN_MANIFEST）
    ├── sql/
    │   ├── course.js                   ← 元数据 + 课时索引 + schema manifest
    │   ├── schemas/<name>.js           ← 共享 SQL schema（LEARN.schema）
    │   └── lessons/<NN>-<slug>.js      ← 每节内容（LEARN.lesson）
    ├── python/
    │   ├── course.js                   ← 元数据 + 课时索引（无 schemas）
    │   └── lessons/<NN>-<slug>.js
    ├── c/
    │   ├── course.js                   ← 元数据 + 课时索引（无 schemas）；
    │   │                                 'main'（语法）和 'stdlib' 两段
    │   └── lessons/<NN>-<slug>.js      ← 共 44 节（30 节语法 + 14 节标准库）
    └── c-algo/                         ← C 算法入门（Beta），与 c 共享 emception 运行时
        ├── course.js                   ← 元数据 + 课时索引；family: 'c'
        └── lessons/<NN>-<slug>.js      ← 共 25 节（算法 + 数据结构）
lib/
├── design/                             ← 视觉资源（字体、M3 tokens、共享 CSS）
├── resources/                          ← 静态图片（po.webp 等）
└── runtime/
    ├── sql-asm.js                      ← sql.js 引擎（模块加载时立即初始化）
    ├── webPython/                      ← Skulpt Python 解释器（懒加载）
    ├── webC/                           ← emception clang 镜像（~450 MB，懒加载）
    │   ├── iframe.html                 ← C 运行时 iframe 入口
    │   ├── postmsg-bridge.js           ← parent ↔ wasm postMessage 适配器
    │   ├── main.bundle.js              ← 上游 emception webpack bundle（3 MB）
    │   ├── emception.worker.bundle.worker.js  (530 KB)
    │   ├── cecdfcda360457a8f204.br     ← 压缩后的 clang（22 MB）
    │   └── 249 × *.a / *.gz            ← libc、libc++、libGL 等——按需 fetch
    ├── luxon.min.js                    ← 日期库（blog/95 用）
    └── monaco/vs/                      ← Monaco 编辑器（~3 MB，loader.js 立即加载，
                                          editor.main 懒加载）
```

---

## 加载流程

```
manifest.js（立即）─┐
                    │
                    ▼
            用户点击课程卡片
                    │
                    ▼
       loadCourse(slug)         ← 注入 <slug>/course.js
                    │
                    ▼
   课程元数据 + 课时索引就绪（卡片渲染）
                    │
                    ▼
            用户点击某节课
                    │
                    ▼
       loadLesson(slug, id)     ← 注入 lessons/<NN>-<slug>.js
                    │
                    ▼
       该课设置了 @@schema 吗？
              │            │
              是           否
              │            │
              ▼            ▼
      loadSchema(...)    就绪
              │
              ▼
       注入 schemas/<name>.js
              │
              ▼
       lesson.setup ← LEARN._schemas[<slug>:<name>]
```

`loadCourse`、`loadLesson`、`loadSchema` 都做"飞行中请求去重"和"成功结果缓存"。一节课或 schema 拉过一次，整个会话里都在内存。

---

## `manifest.js` 字段

```js
window.__LEARN_MANIFEST = {
  version: 1,
  updated: 'YYYY-MM-DD',
  courses: [
    {
      slug: 'sql',                              // 必填——和文件夹名一致
      icon: 'SQL',                              // 卡片上显示的图标文字（也支持 { zh, en } 双语对象，
                                                //   例如 c-algo: { zh: 'C 算法', en: 'C Algo' }）
      title: { zh: '...', en: '...' },
      desc:  { zh: '...', en: '...' },
      level: { zh: '入门', en: 'Beginner' },
      lessonsCount: 42,
      coming: false,                            // true → 灰显的 "Coming Soon"
      family: 'c',                              // 可选——会被 C-resource 模态框拦截
    }
  ]
};
```

manifest 只决定课程列表显示哪些卡片。课程**内容**藏在 `loadCourse(slug)` 后面。`family: 'c'` 目前是唯一的 family 值，触发 `gateCFamilyAccess()` 警告下载量再加载该 C 系课程。

---

## `course.js` 字段

一个课程文件调用 `LEARN.course(slug, meta)`。它带元数据、课时**索引**，以及（SQL 才有的）schema manifest：

```js
LEARN.course('sql', {
  slug: 'sql',
  type: 'sql',                                  // 'sql' | 'python' | 'c'
  title: { zh: '...', en: '...' },
  desc:  { zh: '...', en: '...' },

  hasPlayground: true,
  playgroundTitle:  { zh: '...', en: '...' },
  playgroundSchema: 'final_schema',             // 仅 SQL——名字来自下面的 schemas

  // 仅 SQL。schema 名 → 文件路径。loadSchema() 懒加载。
  schemas: {
    c1_schema:    'schemas/c1_schema.js',
    final_schema: 'schemas/final_schema.js',
    // ...
  },

  // 课时索引。够渲染课时列表就行。
  // 完整内容（intro/task/hint/setup/expectedSql/...）住在 `file` 里。
  lessons: [
    { id: 1, section: 'main', slug: 'select-basics',
      title:   { zh: '...', en: '...' },
      chapter: { zh: '...', en: '...' },
      file: 'lessons/01-select-basics.js' },
    // ...
  ],
});
```

`section` 默认 `'main'`。路由把 `'final'` 和 `'stdlib'` 当成独立分组渲染（"最终挑战" / "标准库" 各有自己的小标题）。C 课程同时用 `'main'`（语法部分）和 `'stdlib'`（`<stdio.h>`、`<string.h>` 等）。

---

## 课时文件格式（`@@key` 语法）

每节课文件调用 `LEARN.lesson(courseSlug, id, raw)` 一次，正文用模板字符串放在 `raw` 里：

```js
LEARN.lesson('sql', 1, `
@@schema c1_schema
@@chapterRef sql-syntax-guide-1
@@expectedSql SELECT name, score FROM students
@@checkOrder false
@@tables students

@@difficulty:zh 入门
@@difficulty:en Beginner

@@intro:zh
<p class="lead"><strong>SELECT</strong> 是 SQL 的第一关键字 ——</p>
<pre><code>SELECT 列1, 列2 FROM 表名;</code></pre>
@@intro:en
<p class="lead"><strong>SELECT</strong> is the first SQL keyword —</p>
<pre><code>SELECT col1, col2 FROM table_name;</code></pre>

@@task:zh
从 <code>students</code> 表里只显示每个学生的 <code>name</code> 和 <code>score</code> 两列。
@@task:en
Return only the <code>name</code> and <code>score</code> of every student.

@@hint:zh
SELECT 后面把列名用逗号分开，再写 FROM 表名。
@@hint:en
List columns after SELECT separated by commas, then FROM <table>.

@@starter:zh
-- 在这里写你的 SQL

@@starter:en
-- write your SQL here
`);
```

### `@@key` 规则

- `@@key value`（同一行剩余）        — 单行标量
- `@@key` 然后到下一个 `@@`           — 多行标量
- `@@key:zh` / `@@key:en`              — 双语变体；最终装配成 `{zh, en}`
- `@@`（双 @）是字段标记。单 `@` 会和 Python 装饰器（`@property`、`@app.route`）在代码示例的列 0 处冲撞；`@@` 不会和任何真东西冲突。

### 末尾换行

解析器原样保留值——包括末尾的 `\n`。约定是**"下一个 `@@key` 前留一空行表示这个值末尾有 `\n`"**：

```
@@starter:zh
-- 在这里写你的 SQL              ← 值末尾没有 '\n'
@@starter:en

@@starter:zh
-- 在这里写你的 SQL
                                   ← 值末尾有 '\n'（光标停在干净的下一行）
@@starter:en
```

这影响 `starter`（Monaco 光标位置）和 `answer` / `expectedOutput`（Python、C 判题严格对比 stdout）。

### 双语规则

1. **每个散文字段都需要 `@@key:zh` 和 `@@key:en` 都给。** 课程是端到端双语的。
2. **HTML 原样输出。** `intro` / `task` / `hint` 用裸 HTML（`<p class="lead">`、`<pre><code>`、`<strong>`、`<code>`）。别切到 Markdown——解析器是原样透传，不是 Markdown 渲染器。

### 字段速查

| 字段             | 类型           | 位置                  | 备注                                            |
|-------------------|----------------|-----------------------|--------------------------------------------------|
| `id`              | int            | LEARN.lesson 第 2 参 + course.js 索引 | 稳定身份，路由和进度都用它                  |
| `section`         | string         | course.js 索引        | `'main'`（默认）、`'final'`、`'stdlib'`         |
| `slug`            | string         | course.js 索引        | URL 友好；用于文件名                             |
| `title`           | bilingual      | course.js 索引        |                                                  |
| `chapter`         | bilingual      | course.js 索引        | 课时标题下的副标签                               |
| `chapterRef`      | string         | 课时文件              | 可选。<br>· `sql` / `python` / `c-algo`：链到 `blog.html#<chapterRef>`<br>· `c`（基础语法）：忽略，固定链到菜鸟教程主页 |
| `difficulty`      | bilingual      | 课时文件              | "入门" / "Beginner" 等                           |
| `intro`           | bilingual HTML | 课时文件              | 长篇课时讲解                                     |
| `task`            | bilingual HTML | 课时文件              | 用户要完成什么                                   |
| `hint`            | bilingual HTML | 课时文件              | 可选——按需展示                                  |
| `warning`         | bilingual HTML | 课时文件              | 可选——警告 / 浏览器沙箱说明                     |
| `subtitle`        | bilingual HTML | 课时文件              | 可选                                             |
| `starter`         | bilingual code | 课时文件              | 编辑器初始内容                                   |
| **仅 SQL**        |                |                       |                                                  |
| `schema`          | string         | 课时文件              | 来自 `course.schemas` 的名字；解析为 `setup`     |
| `tables`          | array          | 课时文件              | 在左面板预览的表名                               |
| `expectedSql`     | string         | 课时文件              | 判题在同一个 fresh DB 上跑这条                   |
| `checkOrder`      | bool           | 课时文件              | `true` → 行顺序也要匹配（ORDER BY/LIMIT）        |
| **Python / C**    |                |                       |                                                  |
| `answer`          | code           | 课时文件              | 参考答案（点"查看答案"才显示）                   |
| `expectedOutput`  | string         | 课时文件              | 判题对比 stdout（trim 之后）                     |
| `testInputs`      | array          | 课时文件              | 判题时喂给 `input()`(Py) / stdin(C) 的字符串     |

双语字段是 `@@key:zh` 和 `@@key:en` 块。string/int/bool 标量字段是普通 `@@key` 块。`tables` 是逗号或空格分隔。`testInputs` 一行一项。

---

## Schema 文件格式（仅 SQL）

```js
// learn/learn_data/sql/schemas/c1_schema.js

LEARN.schema('sql:c1_schema', `
  CREATE TABLE students (id INTEGER, name TEXT, age INTEGER, gender TEXT, score INTEGER);
  INSERT INTO students VALUES (1, 'Alice', 18, 'F', 85);
  INSERT INTO students VALUES (2, 'Bob',   19, 'M', 92);
  INSERT INTO students VALUES (3, 'Carol', 20, 'F', 78);
  INSERT INTO students VALUES (4, 'David', 18, 'M', 88);
`);
```

完全限定名是 `<courseSlug>:<schemaName>`。课程文件只引用 `<schemaName>`（`@@schema c1_schema`），课程 slug 自动加上。

### Schema 复用规则（保守）

- **`final_schema`** —— 大共享图书馆/书店数据库。每节"最终挑战"和 playground 都用它。
- **`c<N>_schema`** —— 第 N 节独占（大多数课时）。
- **多节共享时取最小成员的 id 做名字**（L3 + L5 共享 → `c3_schema`）。
- **必须字节相同才能合并**。两节哪怕差一行就分开。别为美观合并——原则是"作者特意挑了这些行，尊重它"。
- **真正可命名的共享概念**（如 `students_basic`、`books_with_genre`）可以给语义名字，但用得克制。

---

## 引擎

### SQL —— sql.js（SQLite，asm.js）
- 通过 `<script src="lib/runtime/sql-asm.js">` 立即加载。
- `ensureSql()` 初始化一次后缓存。
- 每节课跑在**全新内存 DB**上——前一节的查询不会泄露状态。
- SQL Playground 整个会话**保持同一个 DB**。"加载示例表"懒加载 `playgroundSchema` 然后跑；"重置表"清空。

### Python —— Skulpt
- 第一次进 Python 课时或 playground 才加载（`ensurePython()`）。
- 输出被捕获用于判题。`input()` 在交互运行时由页内终端泵；判题运行时按顺序从 `testInputs` 拉。
- 硬运行时上限：`yieldLimit: 100`（每 ~100ms 让一次事件循环），`execLimit: 10000`（10 秒后超时）。
- Skulpt 是 Python 3 风格但不 100%。f-strings、列表/字典/集合推导式、基础 stdlib（`math`、`random`、`re`）能用；`numpy`、`pandas`、`requests` 等不行。

### 代码编辑器 —— Monaco
- 住在 `lib/runtime/monaco/vs/`。安装方式：下载 monaco-editor 的 npm tarball，把 `package/min/vs/` 解压到这里。
- `vs/loader.js`（小 AMD 加载器）`learn.html` 立即拉。`vs/editor/editor.main`（~3 MB）由 `ensureMonaco()` 在第一次进课时或 playground 时懒加载。
- 编辑器通过 `createCodeEditor(container, opts)` 创建。两种高度模式：
  - `fillParent: true` —— 容器高度由父级 CSS 决定（课时视图的 `.editor-pane` 用这个）；函数会在创建后多次调 `ed.layout()` 解决初始渲染竞态。
  - 默认 —— 按内容从 `minLines` 到 `maxLines` 自动扩展（类 Ace）。
- Worker 路由到一个空 `data:` URL，让语言服务降级到主线程跑（`file://` 兼容必需）。DevTools 会看到很多 `data:text/javascrip…` 0 字节请求，正常——过滤 `-data:` 隐藏掉。

### C —— emception（浏览器内真实 clang）

C 是个特殊场景。浏览器没有好用的"C 解释器"库（试过 JSCPP、TCC.wasm，都坏）。唯一可行的方案是用 [emception](https://github.com/jprendes/emception) 把真正的 LLVM/clang 编译成 WASM——它是个完整的 IDE 应用，不是干净的库。

**架构**（`learn-engines.js` 里的 `ensureC()`）：

```
learn.html（父）
  │ 创建隐藏 <iframe src="lib/runtime/webC/iframe.html">
  ▼
iframe.html
  │ <script src="postmsg-bridge.js">
  ▼
postmsg-bridge.js
  ├─ stream-fetch main.bundle.js（带字节进度 UI）
  ├─ 通过 <script src=> 注入（让 webpack auto-publicPath 找得到 bundle）
  ├─ 等 window.emception（上游 demo bundle 设置的）
  ├─ 隐藏上游 demo UI 元素
  └─ 通过 postMessage 接收 {type:'run', id, code, stdin?}
       └─ writeFile /working/main.c → emcc → read /working/main.js
            └─ 通过 `new Function('Module', code)(Module)` 执行
                 配合我们的 Module.print/printErr/stdin/onExit hook
```

整个 emception demo 分支**本地镜像**在 `lib/runtime/webC/`（~450 MB，522 个文件）。必须这样因为：
- 浏览器禁止跨域 Worker（CORS 解锁不了）
- 从 jsDelivr 加载会让 `main.bundle.js` 跨域 → 它的 worker 报 `SecurityError`
- 同源镜像绕开所有跨域限制

Cloudflare Pages 处理 450 MB 不在话下（25 GB / 20k 文件上限，**带宽无限**）。浏览器只 fetch 程序需要的部分——首次进 C 通常 **~25-30 MB**，之后永久缓存。

**C-family 模态框拦截**：任何 manifest 条目里有 `family: 'c'` 的课程在渲染前都触发 `gateCFamilyAccess()`（`learn-core.js`）。模态框警告下载量和 `file://` 不兼容。确认会持久化到 `localStorage['louie-learn:cfamily-loaded']`。要重新提示：清这个 key。

**当前编译参数**：
```
emcc -O0 -sSINGLE_FILE=1 -sEXIT_RUNTIME=1 -sFORCE_FILESYSTEM=1 main.c -o main.js
```

- `-sSINGLE_FILE=1` —— 把 wasm 以 base64 嵌进 JS（单文件输出）
- `-sEXIT_RUNTIME=1` —— main 返回时触发 `Module.onExit(status)`（拿到退出码）
- `-sFORCE_FILESYSTEM=1` —— 把 `/dev/stdin` 接到 `Module.stdin`（不加 emcc 可能会剥掉 FS init）

### C 运行时 —— 已知限制

这些**不是我们代码的 bug**——是上游约束。

1. **没有交互式 `scanf`/`getchar`**。stdin 在 Run 之前从 textarea **预填**；程序同步读取。我们试过 `-sASYNCIFY=1 -sASYNCIFY_IMPORTS=fd_read`，但 emception 的特定 emscripten 构建有 bug：ASYNCIFY 的状态机在第一次 `Module.stdin`-via-`handleSleep` 时立即就崩。加更多 import (`proc_exit`、`fd_close`) 让 WASM 布局更早翻车。没 ASYNCIFY，`Module.stdin` 是同步的，无法暂停 WASM 等输入。
   - **未来修复**：等 JSPI（JavaScript Promise Integration）普及——Chrome 133+ 默认开，Firefox 132+ 标志后——把 ASYNCIFY 换成 `-sJSPI=1`。JSPI 用浏览器原生 Promise 集成，没 ASYNCIFY 那种状态机。代码 stub 都留着（`learn-engines.js` 的 `onInputRequest`、`learn-views.js` 的 `termRequestInput`、`postmsg-bridge.js` 的 `input-request`/`response` postMessage 协议），等 JSPI 上线就重新启用。

2. **stdout 缓冲会重排 `scanf` 周围的输出**。症状：`printf("Hello"); scanf(...);` 可能吞或延迟提示。两种修法：
   - 每个 prompt `printf` 末尾加 `\n` —— 行缓冲 stdout 遇到换行就 flush（playground demo 这么做）
   - 或 `scanf` 前显式 `fflush(stdout);`（无需 `\n`，适合 `printf("> ");` 这种行内提示）
   - 推测原因：libc 在目标是 TTY 时按行缓冲。FORCE_FILESYSTEM 下 /dev/stdout 被识别为 TTY，触发缓冲，延迟我们的 `Module.print` 回调。

3. **冷缓存首次加载慢**（~25-30 MB）。缓解：
   - C-family 模态框先警告
   - playground 进度条显示真实下载字节
   - 浏览器 HTTP 缓存 + Cloudflare 边缘缓存让后续访问秒开

4. **`file://` 用户看到 "needs HTTPS" 提示**而不是 playground/课时。emception 的 worker 创建需要 HTTPS 或 `http://localhost`。

### C playground —— 默认值

用户打开 `#c/playground`（在 C-family 模态框确认后），编辑器预加载一段示教 demo，覆盖 playground 支持的每个 C 概念：

```c
#include <stdio.h>

int main(void) {
    char name[64];
    int  age;
    char *p = name;          // 指向 name 数组首元素的指针

    printf("What's your name?\n");
    scanf("%63s", p);        // 通过指针 p 把名字写进 name

    printf("How old are you?\n");
    scanf("%d", &age);       // &age 取 age 的地址 —— 也是个指针

    printf("Hello, %s! You are %d years old.\n", p, age);
    return 0;
}
```

stdin textarea 预填 `Louie\n19`，所以一键 Run 就能得到完整输出，用户不用打字。注释根据 `currentLang` 在 zh/en 间切换。定义在 `learn-views.js` 的 `renderCPlayground()`。

### emcc stderr 格式化

emception 把 emcc 的编译消息逐行转发到 `Module.printErr`，但每次调用末尾不带换行。不处理的话多行错误会挤成一坨。`postmsg-bridge.js` 的编译期 `onOut` / `onErr` 包装通过 `withTrailingNl()` 让每行单独成行。ANSI 颜色码（如 `\x1b[32m`）被剥掉，匹配 `^[a-z_]+:(INFO|DEBUG):` 的 emscripten 内部信息（如 `shared:INFO: (Emscripten: Running sanity checks)`）被丢弃——对学生是噪声。

---

## 右面板编辑器布局

课时和 playground 共用一套右面板结构（`.editor-pane`）。用绝对定位给 Monaco 一个稳定的容器尺寸——`flex` + `overflow:auto` 同用会让 Monaco 锁在 ~10 行。

```
┌──────────────────────────────────────┐  ← .editor-pane（背景：var(--surface)）
│  ╭────────────────────────────────╮  │
│  │                                │  │  ← .tab-pane.code-tab.is-active（背景：#1e1e1e）
│  │   Monaco 编辑器（.editor-fill） │  │     position: absolute; top: 0; bottom: 50px;
│  │   [重置][提示][答案]           │  │     border-bottom-radius: 14px（Chrome-tab 风融合）
│  │   ← .tab-actions（右上）       │  │
│  ╰╮                              ╭╯  │
│   │                              │   │
│   │ [代码][输入][输出] ▶ ✓       │   │  ← .editor-foot（高 50px）
│   │                              │   │     ↑ tabs（左侧）         ↑ Run/Submit（右侧）
│   ╰──────────────────────────────╯   │
└──────────────────────────────────────┘
```

关键 CSS（`learn.css` 里都用 `!important`，因为要打败更高特殊性的 `body.lesson-mode .lesson-pane { padding; overflow }`）：

- `.editor-pane` —— `padding: 0; position: relative; overflow: hidden; background: var(--surface)`
- `.editor-pane .tab-pane` —— `position: absolute; top: 0; left: 0; right: 0; bottom: 50px; background: #1e1e1e; border-bottom-{left,right}-radius: 14px; overflow: hidden`。默认 `display: none`；激活 tab 显示 `display: block`。
- `.editor-pane .editor-fill` —— Monaco 容器，`position: absolute; inset: 0; width: 100%; height: 100%`。
- `.editor-pane .editor-foot` —— `position: absolute; bottom: 0; left: 0; right: 0; height: 50px`——底部操作栏。
- `.tab-strip` / `.tab-btn` —— 从底栏顶边垂下来的 Excel 风 sheet tab。激活 tab 用 `background: #1e1e1e`（和编辑器同色）+ `margin-top: -1px` 无缝融入上方编辑器卡片。

Monaco 内部渲染自己的滚动条 / overflow-guard 层，有时绕过父容器的 `border-radius` 裁剪——`learn.css` 在 `.editor-pane .tab-pane.code-tab .monaco-editor` 和它的 `.overflow-guard` 上显式加 `border-bottom-{left,right}-radius` 让两个底角都干净。

`createCodeEditor(container, { fillParent: true })` 是入口。它在 4 个时刻调 `ed.layout({ width, height })`（RAF、+50ms、+200ms、+600ms）以恢复创建时父布局未稳定的情况。

---

## 添加新课时（SQL）

1. 挑 `id`（课程里下一个空整数）。
2. 挑 `slug`（小写、连字符：`having-filter`、`cross-join-basics`）。
3. 决定 schema：
   - 现有 schema 合适，`@@schema` 里复用其名。
   - 否则建 `learn/learn_data/sql/schemas/c<id>_schema.js`，并在 `course.js` 的 `course.schemas` 里加条目。
4. 用上面的格式建 `learn/learn_data/sql/lessons/<NN>-<slug>.js`。
5. 把索引条目追加到 `course.js` 的 `course.lessons`。
6. 如果可见数有变，改 `manifest.js` 的 `lessonsCount`。

**SQL 判题规则：**

1. **`expectedSql` 严格对应任务**：任务说"name 和 age"，`expectedSql` 必须 `SELECT name, age`——不是 `SELECT *`。
2. **SQLite 方言**：日期是 ISO 字符串（`'YYYY-MM-DD'`）；这个格式下字典序和时序一致。**没有** `RIGHT JOIN` 或 `FULL OUTER JOIN`。
3. **`checkOrder: false`（默认）**：两边结果集都先排序再比对。仅 `ORDER BY` / `LIMIT` 课时设 `true`。
4. **提示是引导，不是答案**："试试 `WHERE`" 比直接给答案好。
5. **先写 schema，再写任务，再写 `expectedSql`**——确认题目能解、数据集够。

## 添加新课时（Python）

1. 挑 `id`。
2. 挑 `slug`（从英文标题派生，如 `for-loop-basics`）。
3. 建 `learn/learn_data/python/lessons/<NN>-<slug>.js`。
4. 把索引条目追加到 `course.lessons`。
5. 不需要 schema 工作——Python 课时自包含。

**Python 判题规则：**

1. **`expectedOutput` 必须严格匹配 stdout**（trim 后）。任务说"打印总和"就要让 `answer` **只**输出那个，连末尾 `\n` 都对。
2. **`testInputs` 顺序与 `input()` 调用顺序一致**。输入是字符串（Python `input()` 返回 str）。
3. **沙箱限制**：没文件 I/O、没网络。要文件就把内容当字符串变量模拟。
4. **Skulpt 是 Python 3 风格但不 100%**——见上面"引擎 / Python"。

## 添加新课时（C）

1. 挑 `id`（下一个空整数；`c` 基础语法课目前是 1–44，`c-algo` 是 1–25——两个课程独立编号）。
2. 挑 `slug`（`hello-c`、`pointers`、`malloc-free` 等）。
3. 决定 section：基础语法课用 `'main'`，`<header.h>` 课时用 `'stdlib'`；`c-algo` 全部用 `'main'`。
4. 建 `learn/learn_data/<course-slug>/lessons/<NN>-<slug>.js`（注意 course-slug 是 `c` 还是 `c-algo`）。
5. 把索引条目追加到对应 `course.lessons`。`manifest.js` 的 `lessonsCount` 也 +1。

**C 判题规则：**

1. **`expectedOutput` 是空白容忍的 trim 比对**对 stdout。stderr 也加进来，让编译错误可见。
2. **`testInputs` 数组用换行 join 后预填进 stdin**。没有交互式输入——见上面运行时限制。
3. **每个 prompt 的 `printf` 末尾加 `\n`**，否则 libc 行缓冲会吞输出。
4. **固定 RNG / 时间相关的输出**。`srand(time(NULL))` 必然挂判题（输出每次变）；用固定种子（`srand(42)`），或只检查不变量（`time(NULL) > 0`）。

## 添加新课程

1. 挑 slug（小写、连字符）。文件夹名 = slug。
2. 建 `learn/learn_data/<slug>/course.js`，调 `LEARN.course('<slug>', { type: 'sql' | 'python' | 'c', ... })`。
3. 建 `lessons/`（SQL 还要 `schemas/`）。
4. 在 `manifest.js` 加条目。

新语言类型（如 JavaScript、Rust）需要运行时工作——加 `learn-engines.js` 的 `ensure<Language>()` 包装、`learn-lesson.js` 的判题路径、`learn-views.js` 的 playground。参照 C 课程是最完整的范例：它有最复杂的运行时拦截，也是最干净的样板。
