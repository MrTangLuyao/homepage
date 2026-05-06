/* learn/learn_data/sql/course.js — SQL course
   Database engine: sql.js (SQLite, asm.js build), so the SQL dialect is
   standard SQLite. Date columns are stored as ISO strings ('YYYY-MM-DD');
   that comparison is lexicographic AND chronological for ISO format. */

/* ─── FINAL_SCHEMA: shared library / bookstore database used by all
   "final challenges" (lessons 28-37). Each challenge re-runs this whole
   block in a fresh in-memory database, so problems are independent. */
const FINAL_SCHEMA = `
  CREATE TABLE branches (id INTEGER, name TEXT, city TEXT, opened_date TEXT);
  INSERT INTO branches VALUES (1, 'Central',      'Sydney',   '2010-01-01');
  INSERT INTO branches VALUES (2, 'North',        'Sydney',   '2015-06-15');
  INSERT INTO branches VALUES (3, 'Beijing-East', 'Beijing',  '2018-09-01');
  INSERT INTO branches VALUES (4, 'NYC-West',     'New York', '2020-03-15');
  INSERT INTO branches VALUES (5, 'Newtown',      'Sydney',   '2024-11-01');

  CREATE TABLE members (id INTEGER, name TEXT, country TEXT, joined_date TEXT);
  INSERT INTO members VALUES (1, 'Anna', 'AU', '2023-01-15');
  INSERT INTO members VALUES (2, 'Ben',  'CN', '2023-03-20');
  INSERT INTO members VALUES (3, 'Cara', 'US', '2024-02-10');
  INSERT INTO members VALUES (4, 'Dan',  'AU', '2024-06-05');
  INSERT INTO members VALUES (5, 'Eli',  'CN', '2025-01-12');
  INSERT INTO members VALUES (6, 'Fay',  'US', '2025-04-22');
  INSERT INTO members VALUES (7, 'Gus',  'AU', '2025-09-01');
  INSERT INTO members VALUES (8, 'Hua',  'CN', '2026-02-15');

  CREATE TABLE memberships (id INTEGER, member_id INTEGER, plan TEXT, start_date TEXT, end_date TEXT, monthly_fee INTEGER);
  INSERT INTO memberships VALUES (1, 1, 'premium', '2023-01-15',  NULL,         15);
  INSERT INTO memberships VALUES (2, 2, 'basic',   '2023-03-20', '2024-03-20',   5);
  INSERT INTO memberships VALUES (3, 3, 'premium', '2024-02-10', '2026-02-10',  15);
  INSERT INTO memberships VALUES (4, 4, 'basic',   '2024-06-05', '2027-06-05',   5);
  INSERT INTO memberships VALUES (5, 5, 'premium', '2025-01-12',  NULL,         15);
  INSERT INTO memberships VALUES (6, 6, 'basic',   '2025-04-22', '2025-10-22',   5);

  CREATE TABLE authors (id INTEGER, name TEXT, nationality TEXT);
  INSERT INTO authors VALUES (1, 'Smith',  'UK');
  INSERT INTO authors VALUES (2, 'Lee',    'US');
  INSERT INTO authors VALUES (3, 'Tanaka', 'Japan');
  INSERT INTO authors VALUES (4, 'Patel',  'India');
  INSERT INTO authors VALUES (5, 'Rivera', 'Mexico');
  INSERT INTO authors VALUES (6, 'Chen',   'China');
  INSERT INTO authors VALUES (7, 'Brown',  'UK');
  INSERT INTO authors VALUES (8, 'Garcia', 'Spain');

  CREATE TABLE books (id INTEGER, title TEXT, author_id INTEGER, genre TEXT, published_year INTEGER);
  INSERT INTO books VALUES ( 1, 'Alpha',   1, 'Mystery',  2010);
  INSERT INTO books VALUES ( 2, 'Beta',    1, 'Mystery',  2014);
  INSERT INTO books VALUES ( 3, 'Gamma',   2, 'SciFi',    2018);
  INSERT INTO books VALUES ( 4, 'Delta',   2, 'SciFi',    2022);
  INSERT INTO books VALUES ( 5, 'Epsilon', 2, 'Thriller', 2020);
  INSERT INTO books VALUES ( 6, 'Zeta',    3, 'Mystery',  2017);
  INSERT INTO books VALUES ( 7, 'Eta',     3, 'Romance',  2019);
  INSERT INTO books VALUES ( 8, 'Theta',   4, 'SciFi',    2021);
  INSERT INTO books VALUES ( 9, 'Iota',    5, 'Thriller', 2015);
  INSERT INTO books VALUES (10, 'Kappa',   6, 'Mystery',  2023);
  INSERT INTO books VALUES (11, 'Lambda',  6, 'Mystery',  2024);
  INSERT INTO books VALUES (12, 'Mu',      7, 'Romance',  2016);

  CREATE TABLE copies (id INTEGER, book_id INTEGER, branch_id INTEGER);
  INSERT INTO copies VALUES ( 1,  1, 1);
  INSERT INTO copies VALUES ( 2,  3, 1);
  INSERT INTO copies VALUES ( 3,  5, 1);
  INSERT INTO copies VALUES ( 4,  7, 1);
  INSERT INTO copies VALUES ( 5,  9, 1);
  INSERT INTO copies VALUES ( 6,  2, 2);
  INSERT INTO copies VALUES ( 7,  4, 2);
  INSERT INTO copies VALUES ( 8,  6, 2);
  INSERT INTO copies VALUES ( 9,  8, 2);
  INSERT INTO copies VALUES (10, 10, 2);
  INSERT INTO copies VALUES (11,  1, 3);
  INSERT INTO copies VALUES (12,  6, 3);
  INSERT INTO copies VALUES (13, 11, 3);
  INSERT INTO copies VALUES (14, 12, 3);
  INSERT INTO copies VALUES (15,  2, 4);
  INSERT INTO copies VALUES (16,  4, 4);
  INSERT INTO copies VALUES (17,  5, 4);
  INSERT INTO copies VALUES (18, 10, 4);

  CREATE TABLE loans (id INTEGER, member_id INTEGER, copy_id INTEGER, loan_date TEXT, return_date TEXT, fine INTEGER);
  INSERT INTO loans VALUES ( 1, 1,  1, '2025-03-10', '2025-03-25',    0);
  INSERT INTO loans VALUES ( 2, 1,  2, '2025-04-01', '2025-04-15',    0);
  INSERT INTO loans VALUES ( 3, 1,  6, '2025-05-12', '2025-05-30',    5);
  INSERT INTO loans VALUES ( 4, 1, 11, '2025-08-20', '2025-09-05',    0);
  INSERT INTO loans VALUES ( 5, 1, 17, '2026-01-10',  NULL,         NULL);
  INSERT INTO loans VALUES ( 6, 1,  8, '2025-10-15', '2025-11-01',    0);
  INSERT INTO loans VALUES ( 7, 1, 13, '2025-11-15', '2025-12-01',    0);

  INSERT INTO loans VALUES ( 8, 2,  1, '2025-06-05', '2025-06-25',    0);
  INSERT INTO loans VALUES ( 9, 2,  3, '2025-07-12', '2025-07-30',    0);
  INSERT INTO loans VALUES (10, 2, 12, '2026-01-05',  NULL,         NULL);
  INSERT INTO loans VALUES (11, 2, 13, '2026-02-15',  NULL,         NULL);

  INSERT INTO loans VALUES (12, 3,  4, '2025-09-01', '2025-09-20',   10);
  INSERT INTO loans VALUES (13, 3, 10, '2025-10-12', '2025-11-05',    5);
  INSERT INTO loans VALUES (14, 3, 16, '2025-12-01', '2025-12-20',    0);

  INSERT INTO loans VALUES (15, 4,  5, '2025-04-15', '2025-05-02',    0);
  INSERT INTO loans VALUES (16, 4,  7, '2025-06-10', '2025-06-25',    0);
  INSERT INTO loans VALUES (17, 4,  9, '2025-08-05', '2025-08-22',    0);
  INSERT INTO loans VALUES (18, 4, 14, '2025-10-15', '2025-11-01',    0);
  INSERT INTO loans VALUES (19, 4, 18, '2026-02-01',  NULL,         NULL);
  INSERT INTO loans VALUES (20, 4,  1, '2024-12-01', '2024-12-20',    0);
  INSERT INTO loans VALUES (21, 4,  6, '2025-01-15', '2025-02-01',    0);
  INSERT INTO loans VALUES (22, 4, 12, '2025-09-25', '2025-10-12',    0);
  INSERT INTO loans VALUES (23, 4, 13, '2025-11-15', '2025-12-01',    0);

  INSERT INTO loans VALUES (24, 5,  8, '2025-09-10', '2025-09-30',    0);
  INSERT INTO loans VALUES (25, 5, 11, '2025-11-15', '2025-12-05',    0);
  INSERT INTO loans VALUES (26, 5, 15, '2026-01-20',  NULL,         NULL);
  INSERT INTO loans VALUES (27, 5, 10, '2025-09-15', '2025-10-01',    0);

  INSERT INTO loans VALUES (28, 6,  6, '2025-07-08', '2025-07-25',    0);
  INSERT INTO loans VALUES (29, 6, 16, '2025-12-10',  NULL,         NULL);

  CREATE TABLE reviews (id INTEGER, member_id INTEGER, book_id INTEGER, rating INTEGER, created_at TEXT);
  INSERT INTO reviews VALUES ( 1, 1,  1, 5, '2025-03-26');
  INSERT INTO reviews VALUES ( 2, 1,  3, 4, '2025-04-16');
  INSERT INTO reviews VALUES ( 3, 1,  2, 3, '2025-05-31');
  INSERT INTO reviews VALUES ( 4, 1,  5, 5, '2026-02-15');
  INSERT INTO reviews VALUES ( 5, 1,  6, 5, '2025-11-02');
  INSERT INTO reviews VALUES ( 6, 1, 11, 4, '2025-12-15');

  INSERT INTO reviews VALUES ( 7, 2,  1, 4, '2025-06-26');
  INSERT INTO reviews VALUES ( 8, 2,  5, 5, '2025-07-31');

  INSERT INTO reviews VALUES ( 9, 3,  7, 4, '2025-09-21');
  INSERT INTO reviews VALUES (10, 3, 10, 3, '2025-11-06');
  INSERT INTO reviews VALUES (11, 3,  4, 4, '2025-12-21');

  INSERT INTO reviews VALUES (12, 4,  9, 4, '2025-05-03');
  INSERT INTO reviews VALUES (13, 4,  4, 4, '2025-06-26');

  INSERT INTO reviews VALUES (14, 5,  6, 4, '2025-10-01');
  INSERT INTO reviews VALUES (15, 5,  1, 5, '2025-12-06');

  INSERT INTO reviews VALUES (16, 6,  2, 4, '2025-07-26');
`;

(window.__LEARN_COURSES = window.__LEARN_COURSES || {})['sql'] = {
  slug: 'sql',
  title: { zh: 'SQL 基本语法', en: 'SQL · Core Syntax' },
  desc: {
    zh: '学习 SQL 的基本查询语句',
    en: 'Learn the fundamentals of SQL queries',
  },
  hasPlayground: true,
  playgroundTitle: { zh: '自定义 SQL 语句', en: 'Custom SQL Playground' },
  playgroundSetup: FINAL_SCHEMA,

  lessons: [

    /* ─────────────────────── L1 SELECT ─────────────────────── */
    {
      id: 1,
      section: 'main',
      slug: 'select-basics',
      title: { zh: 'Part 1 · SELECT —— 选哪些列', en: 'Part 1 · SELECT — pick the columns' },
      chapter: { zh: 'SQL 语法大全 · Part 1', en: 'SQL syntax guide · Part 1' },
      chapterRef: 'sql-syntax-guide-1',
      difficulty: { zh: '入门', en: 'Beginner' },
      intro: {
        zh: `<p class="lead"><strong>SELECT</strong> 是 SQL 的第一关键字 —— 它决定结果中<strong>显示哪些列</strong>。</p>
<pre><code>SELECT 列1, 列2 FROM 表名;</code></pre>
<p>用 <code>*</code> 表示所有列；列的顺序由你 SELECT 时写的顺序决定。</p>
<p>SELECT 后面也可以放<strong>表达式</strong>，比如 <code>score + 10</code>，但本关只用列名。</p>`,
        en: `<p class="lead"><strong>SELECT</strong> is the first SQL keyword — it picks <strong>which columns</strong> appear.</p>
<pre><code>SELECT col1, col2 FROM table_name;</code></pre>
<p>Use <code>*</code> for every column. Columns are returned in the order you list them.</p>
<p>SELECT can also take expressions like <code>score + 10</code>, but this lesson only needs plain column names.</p>`
      },
      tables: ['students'],
      setup: `
        CREATE TABLE students (id INTEGER, name TEXT, age INTEGER, gender TEXT, score INTEGER);
        INSERT INTO students VALUES (1, 'Alice', 18, 'F', 85);
        INSERT INTO students VALUES (2, 'Bob',   19, 'M', 92);
        INSERT INTO students VALUES (3, 'Carol', 20, 'F', 78);
        INSERT INTO students VALUES (4, 'David', 18, 'M', 88);
      `,
      task: {
        zh: '从 <code>students</code> 表里只显示每个学生的 <code>name</code> 和 <code>score</code> 两列（每行一个学生）。',
        en: 'Return only the <code>name</code> and <code>score</code> of every student in <code>students</code> (one row per student).'
      },
      hint: {
        zh: 'SELECT 后面把列名用逗号分开，再写 FROM 表名。',
        en: 'List the columns after SELECT separated by commas, then FROM &lt;table&gt;.'
      },
      starter: { zh: '-- 在这里写你的 SQL\n', en: '-- write your SQL here\n' },
      expectedSql: 'SELECT name, score FROM students',
      checkOrder: false,
    },

    /* ─────────────────────── L2 FROM ─────────────────────── */
    {
      id: 2,
      section: 'main',
      slug: 'from-tables',
      title: { zh: 'Part 2 · FROM —— 从哪张表', en: 'Part 2 · FROM — pick the table' },
      chapter: { zh: 'SQL 语法大全 · Part 2', en: 'SQL syntax guide · Part 2' },
      chapterRef: 'sql-syntax-guide-1',
      difficulty: { zh: '入门', en: 'Beginner' },
      intro: {
        zh: `<p class="lead"><strong>FROM</strong> 告诉数据库「<strong>从哪张表里查</strong>」。每个 SELECT 必须配一个 FROM。</p>
<pre><code>SELECT 列名 FROM 表名;</code></pre>
<p>FROM 后面也可以加<strong>表别名</strong>：<code>FROM books AS b</code> 或省略 AS：<code>FROM books b</code>。多表时别名很有用。</p>`,
        en: `<p class="lead"><strong>FROM</strong> tells the database <strong>which table to query</strong>. Every SELECT needs a FROM.</p>
<pre><code>SELECT cols FROM table_name;</code></pre>
<p>You can also add a <strong>table alias</strong>: <code>FROM books AS b</code> or just <code>FROM books b</code>. Aliases shine in multi-table queries.</p>`
      },
      tables: ['books'],
      setup: `
        CREATE TABLE books (id INTEGER, title TEXT, author TEXT, year INTEGER, price INTEGER);
        INSERT INTO books VALUES (1, 'Dune',         'Herbert',  1965, 42);
        INSERT INTO books VALUES (2, 'Foundation',   'Asimov',   1951, 35);
        INSERT INTO books VALUES (3, 'Neuromancer',  'Gibson',   1984, 28);
        INSERT INTO books VALUES (4, 'Hyperion',     'Simmons',  1989, 38);
      `,
      task: {
        zh: '从 <code>books</code> 表里查出每本书的 <code>title</code> 和 <code>year</code>。',
        en: 'List the <code>title</code> and <code>year</code> of every book in the <code>books</code> table.'
      },
      hint: {
        zh: 'SELECT 列名 FROM 表名 —— 这一关就这两步。',
        en: 'SELECT columns FROM table — that is all this lesson needs.'
      },
      starter: { zh: '', en: '' },
      expectedSql: 'SELECT title, year FROM books',
      checkOrder: false,
    },

    /* ─────────────────────── L3 WHERE ─────────────────────── */
    {
      id: 3,
      section: 'main',
      slug: 'where-filter',
      title: { zh: 'Part 3 · WHERE —— 筛选行', en: 'Part 3 · WHERE — filter rows' },
      chapter: { zh: 'SQL 语法大全 · Part 3', en: 'SQL syntax guide · Part 3' },
      chapterRef: 'sql-syntax-guide-1',
      difficulty: { zh: '入门', en: 'Beginner' },
      intro: {
        zh: `<p class="lead"><strong>SELECT</strong> 决定显示<em>哪些列</em>，<strong>WHERE</strong> 决定保留<em>哪些行</em>。</p>
<pre><code>SELECT 列 FROM 表 WHERE 条件;</code></pre>
<p>字符串值要用<strong>单引号</strong>（<code>'F'</code>），数字不用。<strong>等号是单个 <code>=</code></strong>，不是 <code>==</code>。</p>`,
        en: `<p class="lead"><strong>SELECT</strong> picks <em>which columns</em>; <strong>WHERE</strong> picks <em>which rows</em> to keep.</p>
<pre><code>SELECT cols FROM table WHERE condition;</code></pre>
<p>Strings need <strong>single quotes</strong> (<code>'F'</code>); numbers don't. SQL uses <strong>a single <code>=</code></strong>, not <code>==</code>.</p>`
      },
      tables: ['students'],
      setup: `
        CREATE TABLE students (id INTEGER, name TEXT, age INTEGER, gender TEXT, score INTEGER);
        INSERT INTO students VALUES (1, 'Alice',  18, 'F', 85);
        INSERT INTO students VALUES (2, 'Bob',    19, 'M', 92);
        INSERT INTO students VALUES (3, 'Carol',  20, 'F', 78);
        INSERT INTO students VALUES (4, 'David',  18, 'M', 88);
        INSERT INTO students VALUES (5, 'Eve',    21, 'F', 95);
      `,
      task: {
        zh: '从 <code>students</code> 表里查出<strong>成绩 ≥ 85 的所有学生</strong>，返回 <code>name</code> 和 <code>score</code> 两列。',
        en: 'From <code>students</code>, return the <code>name</code> and <code>score</code> of <strong>every student whose score is ≥ 85</strong>.'
      },
      hint: {
        zh: '加一句 <code>WHERE score &gt;= 85</code>。',
        en: 'Add <code>WHERE score &gt;= 85</code> to your query.'
      },
      starter: { zh: 'SELECT name, score FROM students\nWHERE ;', en: 'SELECT name, score FROM students\nWHERE ;' },
      expectedSql: 'SELECT name, score FROM students WHERE score >= 85',
      checkOrder: false,
    },

    /* ─────────────────────── L4 比较运算符 ─────────────────────── */
    {
      id: 4,
      section: 'main',
      slug: 'comparison-operators',
      title: { zh: 'Part 4 · 比较运算符', en: 'Part 4 · Comparison Operators' },
      chapter: { zh: 'SQL 语法大全 · Part 4', en: 'SQL syntax guide · Part 4' },
      chapterRef: 'sql-syntax-guide-1',
      difficulty: { zh: '入门', en: 'Beginner' },
      intro: {
        zh: `<p class="lead">在 WHERE 里能用六个比较运算符：<code>=</code>、<code>&lt;&gt;</code>（不等于）、<code>&gt;</code>、<code>&lt;</code>、<code>&gt;=</code>、<code>&lt;=</code>。</p>
<p><code>&lt;&gt;</code> 和 <code>!=</code> <strong>等价</strong>，标准是前者。</p>
<p>日期也能用比较运算符，格式是 <code>'YYYY-MM-DD'</code>（这一关里日期存为字符串，按 ISO 格式比较 = 时间顺序）。</p>`,
        en: `<p class="lead">Inside WHERE you can use six comparison operators: <code>=</code>, <code>&lt;&gt;</code> (not equal), <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code>.</p>
<p><code>&lt;&gt;</code> and <code>!=</code> are <strong>equivalent</strong>; <code>&lt;&gt;</code> is the SQL standard.</p>
<p>Dates compare too — store as <code>'YYYY-MM-DD'</code> ISO strings (lexicographic order = chronological order).</p>`
      },
      tables: ['events'],
      setup: `
        CREATE TABLE events (id INTEGER, event TEXT, date TEXT);
        INSERT INTO events VALUES (1, 'signup',   '2024-01-15');
        INSERT INTO events VALUES (2, 'login',    '2024-03-20');
        INSERT INTO events VALUES (3, 'purchase', '2024-05-10');
        INSERT INTO events VALUES (4, 'refund',   '2024-07-01');
        INSERT INTO events VALUES (5, 'review',   '2024-09-12');
      `,
      task: {
        zh: '从 <code>events</code> 表里查出<strong> 2024-04-01 之前发生</strong>的所有事件，返回所有列（用 <code>*</code>）。',
        en: 'From <code>events</code>, return every event that happened <strong>before 2024-04-01</strong> (return all columns with <code>*</code>).'
      },
      hint: {
        zh: '用 <code>date &lt; \'2024-04-01\'</code>，注意日期要带单引号。',
        en: 'Use <code>date &lt; \'2024-04-01\'</code> — the literal needs single quotes.'
      },
      starter: { zh: '', en: '' },
      expectedSql: "SELECT * FROM events WHERE date < '2024-04-01'",
      checkOrder: false,
    },

    /* ─────────────────────── L5 AND / OR / NOT ─────────────────────── */
    {
      id: 5,
      section: 'main',
      slug: 'and-or-not',
      title: { zh: 'Part 5 · AND / OR / NOT', en: 'Part 5 · AND / OR / NOT' },
      chapter: { zh: 'SQL 语法大全 · Part 5', en: 'SQL syntax guide · Part 5' },
      chapterRef: 'sql-syntax-guide-1',
      difficulty: { zh: '入门', en: 'Beginner' },
      intro: {
        zh: `<p class="lead">把多个条件粘在一起：<strong>AND</strong>（同时满足）、<strong>OR</strong>（任一满足）、<strong>NOT</strong>（取反）。</p>
<p><strong>优先级</strong>：NOT &gt; AND &gt; OR。混用 AND 和 OR 时<strong>强烈建议加括号</strong>，让意图明确。</p>
<pre><code>WHERE (age &lt; 20) AND (score &gt; 85)</code></pre>`,
        en: `<p class="lead">Combine conditions with <strong>AND</strong> (all true), <strong>OR</strong> (any true), or <strong>NOT</strong> (negate).</p>
<p><strong>Precedence</strong>: NOT &gt; AND &gt; OR. When mixing AND and OR, <strong>add parentheses</strong> to make intent unambiguous.</p>
<pre><code>WHERE (age &lt; 20) AND (score &gt; 85)</code></pre>`
      },
      tables: ['students'],
      setup: `
        CREATE TABLE students (id INTEGER, name TEXT, age INTEGER, gender TEXT, score INTEGER);
        INSERT INTO students VALUES (1, 'Alice',  18, 'F', 85);
        INSERT INTO students VALUES (2, 'Bob',    19, 'M', 92);
        INSERT INTO students VALUES (3, 'Carol',  20, 'F', 78);
        INSERT INTO students VALUES (4, 'David',  18, 'M', 88);
        INSERT INTO students VALUES (5, 'Eve',    21, 'F', 95);
      `,
      task: {
        zh: '查出 <strong>18 岁的女生</strong>（gender = <code>\'F\'</code> AND age = 18），返回 <code>name</code>、<code>age</code>、<code>gender</code> 三列。',
        en: 'Return the <code>name</code>, <code>age</code>, and <code>gender</code> of <strong>every 18-year-old female</strong> (gender = <code>\'F\'</code> AND age = 18).'
      },
      hint: {
        zh: '在 WHERE 里用 AND 把两个条件连起来。',
        en: 'Use AND in the WHERE clause to require both conditions.'
      },
      starter: { zh: '', en: '' },
      expectedSql: "SELECT name, age, gender FROM students WHERE age = 18 AND gender = 'F'",
      checkOrder: false,
    },

    /* ─────────────────────── L6 IN / NOT IN ─────────────────────── */
    {
      id: 6,
      section: 'main',
      slug: 'in-list',
      title: { zh: 'Part 6 · IN / NOT IN', en: 'Part 6 · IN / NOT IN' },
      chapter: { zh: 'SQL 语法大全 · Part 6', en: 'SQL syntax guide · Part 6' },
      chapterRef: 'sql-syntax-guide-1',
      difficulty: { zh: '入门', en: 'Beginner' },
      intro: {
        zh: `<p class="lead">判断一个值<strong>是不是在多个候选里</strong>，写 <code>IN (...)</code> 比一串 <code>OR</code> 优雅。</p>
<pre><code>WHERE category IN ('fruit', 'drink');
-- 等价于
WHERE category = 'fruit' OR category = 'drink';</code></pre>
<p><code>NOT IN</code> 找不在列表里的行；但<strong>列表里有 NULL 时 NOT IN 会返回 0 行</strong>，要小心。</p>`,
        en: `<p class="lead">Test if a value is <strong>among several options</strong> with <code>IN (...)</code> — cleaner than chaining <code>OR</code>s.</p>
<pre><code>WHERE category IN ('fruit', 'drink');
-- equivalent to
WHERE category = 'fruit' OR category = 'drink';</code></pre>
<p><code>NOT IN</code> excludes rows in the list — but <strong>if the list contains NULL, NOT IN returns 0 rows</strong>. Watch out.</p>`
      },
      tables: ['products'],
      setup: `
        CREATE TABLE products (id INTEGER, name TEXT, category TEXT, price INTEGER);
        INSERT INTO products VALUES (1, 'apple',  'fruit', 5);
        INSERT INTO products VALUES (2, 'bread',  'staple', 8);
        INSERT INTO products VALUES (3, 'milk',   'drink', 12);
        INSERT INTO products VALUES (4, 'banana', 'fruit', 4);
        INSERT INTO products VALUES (5, 'cola',   'drink', 6);
        INSERT INTO products VALUES (6, 'rice',   'staple', 20);
      `,
      task: {
        zh: '查出所有<strong> category 是 fruit 或 drink </strong>的商品，返回 <code>name</code> 和 <code>category</code>。',
        en: 'Return the <code>name</code> and <code>category</code> of every product whose <strong>category is fruit or drink</strong>.'
      },
      hint: {
        zh: '用 <code>category IN (\'fruit\', \'drink\')</code>。',
        en: 'Use <code>category IN (\'fruit\', \'drink\')</code>.'
      },
      starter: { zh: '', en: '' },
      expectedSql: "SELECT name, category FROM products WHERE category IN ('fruit', 'drink')",
      checkOrder: false,
    },

    /* ─────────────────────── L7 BETWEEN ─────────────────────── */
    {
      id: 7,
      section: 'main',
      slug: 'between',
      title: { zh: 'Part 7 · BETWEEN —— 范围筛选', en: 'Part 7 · BETWEEN — range filter' },
      chapter: { zh: 'SQL 语法大全 · Part 7', en: 'SQL syntax guide · Part 7' },
      chapterRef: 'sql-syntax-guide-1',
      difficulty: { zh: '入门', en: 'Beginner' },
      intro: {
        zh: `<p class="lead"><strong>BETWEEN x AND y</strong> 判断在 [x, y] 区间内（<strong>包含两端</strong>）。</p>
<pre><code>-- 等价
WHERE score &gt;= 80 AND score &lt;= 90
WHERE score BETWEEN 80 AND 90</code></pre>
<p>必须 <strong>BETWEEN 小 AND 大</strong>，反着写得到 0 行。日期也能用。</p>`,
        en: `<p class="lead"><strong>BETWEEN x AND y</strong> is "in the closed interval [x, y]" — <strong>both ends included</strong>.</p>
<pre><code>-- equivalent
WHERE score &gt;= 80 AND score &lt;= 90
WHERE score BETWEEN 80 AND 90</code></pre>
<p>Always <strong>BETWEEN small AND large</strong> — backwards returns 0 rows. Works on dates too.</p>`
      },
      tables: ['orders'],
      setup: `
        CREATE TABLE orders (id INTEGER, product TEXT, order_date TEXT, total INTEGER);
        INSERT INTO orders VALUES (1, 'apple',  '2024-03-15', 30);
        INSERT INTO orders VALUES (2, 'orange', '2024-04-20', 45);
        INSERT INTO orders VALUES (3, 'banana', '2024-05-10', 25);
        INSERT INTO orders VALUES (4, 'grape',  '2024-06-05', 60);
        INSERT INTO orders VALUES (5, 'mango',  '2024-08-01', 80);
        INSERT INTO orders VALUES (6, 'lemon',  '2024-02-08', 18);
      `,
      task: {
        zh: '查出 <strong>2024 年第二季度（4–6 月）</strong>的订单，返回所有列。要求用 <code>BETWEEN</code>。',
        en: 'Return every order in <strong>Q2 of 2024 (April–June)</strong>, all columns. You must use <code>BETWEEN</code>.'
      },
      hint: {
        zh: '<code>WHERE order_date BETWEEN \'2024-04-01\' AND \'2024-06-30\'</code>。',
        en: '<code>WHERE order_date BETWEEN \'2024-04-01\' AND \'2024-06-30\'</code>.'
      },
      starter: { zh: '', en: '' },
      expectedSql: "SELECT * FROM orders WHERE order_date BETWEEN '2024-04-01' AND '2024-06-30'",
      checkOrder: false,
    },

    /* ─────────────────────── L8 LIKE ─────────────────────── */
    {
      id: 8,
      section: 'main',
      slug: 'like-pattern',
      title: { zh: 'Part 8 · LIKE —— 字符串模糊匹配', en: 'Part 8 · LIKE — pattern matching' },
      chapter: { zh: 'SQL 语法大全 · Part 8', en: 'SQL syntax guide · Part 8' },
      chapterRef: 'sql-syntax-guide-1',
      difficulty: { zh: '入门', en: 'Beginner' },
      intro: {
        zh: `<p class="lead"><strong>LIKE</strong> 配通配符做模糊匹配。两个通配符：</p>
<ul>
  <li><code>%</code> — 任意多个字符（包括 0 个）</li>
  <li><code>_</code> — 恰好 1 个字符</li>
</ul>
<pre><code>title LIKE '%SQL%'    -- 包含 SQL
title LIKE 'SQL%'     -- 以 SQL 开头
title LIKE '%战'       -- 以「战」结尾</code></pre>
<p>反过来用 <code>NOT LIKE</code>。SQLite 默认 LIKE <strong>不区分大小写</strong>（仅对 ASCII）。</p>`,
        en: `<p class="lead"><strong>LIKE</strong> + wildcards do fuzzy string matching:</p>
<ul>
  <li><code>%</code> — any number of characters (including zero)</li>
  <li><code>_</code> — exactly one character</li>
</ul>
<pre><code>title LIKE '%SQL%'   -- contains SQL
title LIKE 'SQL%'    -- starts with SQL
title LIKE '%end'    -- ends with "end"</code></pre>
<p><code>NOT LIKE</code> for the inverse. SQLite's LIKE is <strong>case-insensitive</strong> for ASCII by default.</p>`
      },
      tables: ['books'],
      setup: `
        CREATE TABLE books (id INTEGER, title TEXT);
        INSERT INTO books VALUES (1, 'SQL Cookbook');
        INSERT INTO books VALUES (2, 'Python Crash Course');
        INSERT INTO books VALUES (3, 'Machine Learning Yearning');
        INSERT INTO books VALUES (4, 'Advanced SQL Patterns');
        INSERT INTO books VALUES (5, 'Effective Java');
        INSERT INTO books VALUES (6, 'SQL Antipatterns');
      `,
      task: {
        zh: '查出标题<strong>包含 <code>SQL</code></strong>（任何位置）的所有书，返回 <code>id</code> 和 <code>title</code>。',
        en: 'Return the <code>id</code> and <code>title</code> of every book whose title <strong>contains <code>SQL</code></strong> (anywhere in the string).'
      },
      hint: {
        zh: '用 <code>title LIKE \'%SQL%\'</code>，两边都加 <code>%</code>。',
        en: 'Use <code>title LIKE \'%SQL%\'</code> with <code>%</code> on both sides.'
      },
      starter: { zh: '', en: '' },
      expectedSql: "SELECT id, title FROM books WHERE title LIKE '%SQL%'",
      checkOrder: false,
    },

    /* ─────────────────────── L9 IS NULL ─────────────────────── */
    {
      id: 9,
      section: 'main',
      slug: 'is-null',
      title: { zh: 'Part 9 · IS NULL —— 空值检查', en: 'Part 9 · IS NULL — null check' },
      chapter: { zh: 'SQL 语法大全 · Part 9', en: 'SQL syntax guide · Part 9' },
      chapterRef: 'sql-syntax-guide-1',
      difficulty: { zh: '入门', en: 'Beginner' },
      intro: {
        zh: `<p class="lead">SQL 的 <strong>NULL</strong> 表示「未知」，不等于 0、空字符串或 false。</p>
<p>关键规则：<strong>NULL 不能用 <code>=</code> 比较</strong>。<code>WHERE x = NULL</code> 永远 0 行。必须用：</p>
<pre><code>WHERE x IS NULL
WHERE x IS NOT NULL</code></pre>`,
        en: `<p class="lead">SQL's <strong>NULL</strong> means "unknown" — not 0, not an empty string, not false.</p>
<p>The key rule: <strong>you cannot compare to NULL with <code>=</code></strong>. <code>WHERE x = NULL</code> always returns 0 rows. Use:</p>
<pre><code>WHERE x IS NULL
WHERE x IS NOT NULL</code></pre>`
      },
      tables: ['employees'],
      setup: `
        CREATE TABLE employees (id INTEGER, name TEXT, manager_id INTEGER);
        INSERT INTO employees VALUES (1, 'Zhang',  NULL);
        INSERT INTO employees VALUES (2, 'Li',     1);
        INSERT INTO employees VALUES (3, 'Wang',   2);
        INSERT INTO employees VALUES (4, 'Zhao',   3);
        INSERT INTO employees VALUES (5, 'Sun',    NULL);
      `,
      task: {
        zh: '从 <code>employees</code> 里找出 <strong>没有上级（manager_id 为空）</strong>的员工，返回 <code>id</code> 和 <code>name</code>。',
        en: 'From <code>employees</code>, find everyone who has <strong>no manager (manager_id is null)</strong>; return <code>id</code> and <code>name</code>.'
      },
      hint: {
        zh: '用 <code>manager_id IS NULL</code>，不能用 <code>= NULL</code>。',
        en: 'Use <code>manager_id IS NULL</code> — never <code>= NULL</code>.'
      },
      starter: { zh: '', en: '' },
      expectedSql: "SELECT id, name FROM employees WHERE manager_id IS NULL",
      checkOrder: false,
    },

    /* ─────────────────────── L10 ORDER BY ─────────────────────── */
    {
      id: 10,
      section: 'main',
      slug: 'order-by',
      title: { zh: 'Part 10 · ORDER BY —— 排序', en: 'Part 10 · ORDER BY — sorting' },
      chapter: { zh: 'SQL 语法大全 · Part 10', en: 'SQL syntax guide · Part 10' },
      chapterRef: 'sql-syntax-guide-1',
      difficulty: { zh: '入门', en: 'Beginner' },
      intro: {
        zh: `<p class="lead">SELECT 的结果<strong>顺序不固定</strong>，要按某种顺序展示，就用 <strong>ORDER BY</strong>。</p>
<pre><code>SELECT * FROM students ORDER BY score;       -- 升序（默认）
SELECT * FROM students ORDER BY score DESC;  -- 降序
ORDER BY class ASC, score DESC;              -- 多列排序</code></pre>
<p>记忆：<strong>ASC</strong> = 升 = 小 → 大（默认）；<strong>DESC</strong> = 降 = 大 → 小。</p>
<blockquote>这一关会<strong>检查行的顺序</strong>。</blockquote>`,
        en: `<p class="lead">SELECT's row order is <strong>undefined by default</strong>. Use <strong>ORDER BY</strong> to control it.</p>
<pre><code>SELECT * FROM students ORDER BY score;       -- ascending (default)
SELECT * FROM students ORDER BY score DESC;  -- descending
ORDER BY class ASC, score DESC;              -- multi-column</code></pre>
<p>Mnemonic: <strong>ASC</strong>ending = small → large (default); <strong>DESC</strong>ending = large → small.</p>
<blockquote>This lesson <strong>checks row order</strong>.</blockquote>`
      },
      tables: ['students'],
      setup: `
        CREATE TABLE students (id INTEGER, name TEXT, score INTEGER);
        INSERT INTO students VALUES (1, 'Alice', 85);
        INSERT INTO students VALUES (2, 'Bob',   92);
        INSERT INTO students VALUES (3, 'Carol', 78);
        INSERT INTO students VALUES (4, 'David', 88);
        INSERT INTO students VALUES (5, 'Eve',   95);
      `,
      task: {
        zh: '查出全部学生的 <code>name</code> 和 <code>score</code>，按 <strong>score 从高到低</strong>排序。',
        en: 'Return every student\'s <code>name</code> and <code>score</code>, sorted by <strong>score descending</strong> (highest first).'
      },
      hint: {
        zh: '在 SELECT 后面加 <code>ORDER BY score DESC</code>。',
        en: 'Append <code>ORDER BY score DESC</code> to your SELECT.'
      },
      starter: { zh: '', en: '' },
      expectedSql: "SELECT name, score FROM students ORDER BY score DESC",
      checkOrder: true,
    },

    /* ─────────────────────── L11 LIMIT / OFFSET ─────────────────────── */
    {
      id: 11,
      section: 'main',
      slug: 'limit-offset',
      title: { zh: 'Part 11 · LIMIT / OFFSET —— 限制行数', en: 'Part 11 · LIMIT / OFFSET — page through rows' },
      chapter: { zh: 'SQL 语法大全 · Part 11', en: 'SQL syntax guide · Part 11' },
      chapterRef: 'sql-syntax-guide-2',
      difficulty: { zh: '入门', en: 'Beginner' },
      intro: {
        zh: `<p class="lead"><strong>LIMIT</strong> 限制返回的行数，<strong>OFFSET</strong> 从第几行开始（0 是第一行）。</p>
<pre><code>SELECT * FROM students ORDER BY score DESC
LIMIT 3;            -- 前 3 名

SELECT * FROM students ORDER BY score DESC
LIMIT 3 OFFSET 3;   -- 跳过前 3 行，再取 3 行（第 4–6 名）</code></pre>
<p>分页常用：每页 N 行，第 k 页 = <code>LIMIT N OFFSET (k-1)*N</code>。</p>
<blockquote><strong>LIMIT 通常配 ORDER BY</strong>，否则「前 N 行」是不确定的。</blockquote>`,
        en: `<p class="lead"><strong>LIMIT</strong> caps the number of rows; <strong>OFFSET</strong> skips that many first (0-indexed).</p>
<pre><code>SELECT * FROM students ORDER BY score DESC
LIMIT 3;            -- top 3

SELECT * FROM students ORDER BY score DESC
LIMIT 3 OFFSET 3;   -- skip first 3, take next 3 (ranks 4–6)</code></pre>
<p>Pagination: page <code>k</code> of <code>N</code> rows = <code>LIMIT N OFFSET (k-1)*N</code>.</p>
<blockquote><strong>LIMIT almost always pairs with ORDER BY</strong>; otherwise "first N" is undefined.</blockquote>`
      },
      tables: ['students'],
      setup: `
        CREATE TABLE students (id INTEGER, name TEXT, score INTEGER);
        INSERT INTO students VALUES (1, 'Alice', 85);
        INSERT INTO students VALUES (2, 'Bob',   92);
        INSERT INTO students VALUES (3, 'Carol', 78);
        INSERT INTO students VALUES (4, 'David', 88);
        INSERT INTO students VALUES (5, 'Eve',   95);
        INSERT INTO students VALUES (6, 'Frank', 70);
      `,
      task: {
        zh: '查出 <strong>分数前 3 名</strong>的学生，返回 <code>name</code> 和 <code>score</code>，按分数从高到低。',
        en: 'Return the <strong>top 3 students by score</strong> (<code>name</code>, <code>score</code>), highest first.'
      },
      hint: {
        zh: 'ORDER BY score DESC 之后加 LIMIT 3。',
        en: 'After ORDER BY score DESC, add LIMIT 3.'
      },
      starter: { zh: '', en: '' },
      expectedSql: 'SELECT name, score FROM students ORDER BY score DESC LIMIT 3',
      checkOrder: true,
    },

    /* ─────────────────────── L12 DISTINCT ─────────────────────── */
    {
      id: 12,
      section: 'main',
      slug: 'distinct',
      title: { zh: 'Part 12 · DISTINCT —— 去重', en: 'Part 12 · DISTINCT — unique values' },
      chapter: { zh: 'SQL 语法大全 · Part 12', en: 'SQL syntax guide · Part 12' },
      chapterRef: 'sql-syntax-guide-2',
      difficulty: { zh: '入门', en: 'Beginner' },
      intro: {
        zh: `<p class="lead"><strong>DISTINCT</strong> 放在 SELECT 后面，把重复行去掉，只保留<strong>不同的组合</strong>。</p>
<pre><code>SELECT DISTINCT category FROM products;        -- 所有出现过的 category
SELECT DISTINCT city, country FROM orders;     -- 不重复的 (city, country) 组合</code></pre>
<p>注意 DISTINCT 作用于<strong>整行的列组合</strong>，不是单独某一列。</p>`,
        en: `<p class="lead"><strong>DISTINCT</strong> after SELECT removes duplicate rows — it keeps only the <strong>unique combinations</strong> of the projected columns.</p>
<pre><code>SELECT DISTINCT category FROM products;        -- every distinct category
SELECT DISTINCT city, country FROM orders;     -- unique (city, country) pairs</code></pre>
<p>Important: DISTINCT looks at <strong>the whole projected row</strong>, not a single column.</p>`
      },
      tables: ['products'],
      setup: `
        CREATE TABLE products (id INTEGER, name TEXT, category TEXT);
        INSERT INTO products VALUES (1, 'apple',  'fruit');
        INSERT INTO products VALUES (2, 'bread',  'staple');
        INSERT INTO products VALUES (3, 'milk',   'drink');
        INSERT INTO products VALUES (4, 'banana', 'fruit');
        INSERT INTO products VALUES (5, 'cola',   'drink');
        INSERT INTO products VALUES (6, 'rice',   'staple');
        INSERT INTO products VALUES (7, 'mango',  'fruit');
      `,
      task: {
        zh: '从 <code>products</code> 里查出 <strong>所有不重复的 category</strong>。',
        en: 'Return <strong>all distinct categories</strong> from <code>products</code>.'
      },
      hint: {
        zh: '<code>SELECT DISTINCT category FROM products</code>。',
        en: '<code>SELECT DISTINCT category FROM products</code>.'
      },
      starter: { zh: '', en: '' },
      expectedSql: 'SELECT DISTINCT category FROM products',
      checkOrder: false,
    },

    /* ─────────────────────── L13 AS (alias) ─────────────────────── */
    {
      id: 13,
      section: 'main',
      slug: 'alias-as',
      title: { zh: 'Part 13 · AS —— 起别名', en: 'Part 13 · AS — column aliases' },
      chapter: { zh: 'SQL 语法大全 · Part 13', en: 'SQL syntax guide · Part 13' },
      chapterRef: 'sql-syntax-guide-2',
      difficulty: { zh: '入门', en: 'Beginner' },
      intro: {
        zh: `<p class="lead"><strong>AS</strong> 给列或表起别名，让结果列名好看，或让长表名简化。</p>
<pre><code>-- 列别名：让 score + 10 显示成 bonus_score
SELECT name, score + 10 AS bonus_score FROM students;

-- 表别名（多表 JOIN 必备）
SELECT s.name FROM students AS s;     -- 也可省略 AS：FROM students s</code></pre>
<blockquote>列别名可以含空格，但要用<strong>双引号</strong>括起来：<code>AS "Bonus Score"</code>。</blockquote>`,
        en: `<p class="lead"><strong>AS</strong> renames a column or table — useful when the raw column name is ugly (e.g. <code>score + 10</code>) or the table name is long.</p>
<pre><code>-- column alias
SELECT name, score + 10 AS bonus_score FROM students;

-- table alias (essential for multi-table queries)
SELECT s.name FROM students AS s;     -- AS is optional: FROM students s</code></pre>
<blockquote>An alias with spaces must be in <strong>double quotes</strong>: <code>AS "Bonus Score"</code>.</blockquote>`
      },
      tables: ['students'],
      setup: `
        CREATE TABLE students (id INTEGER, name TEXT, score INTEGER);
        INSERT INTO students VALUES (1, 'Alice', 85);
        INSERT INTO students VALUES (2, 'Bob',   92);
        INSERT INTO students VALUES (3, 'Carol', 78);
        INSERT INTO students VALUES (4, 'David', 88);
      `,
      task: {
        zh: '查出每个学生的 <code>name</code> 和「奖励 10 分后的成绩」。返回两列：第一列是名字，第二列是 <code>score + 10</code>，给它取个别名（任意都行，比如 <code>bonus_score</code>）。',
        en: 'Return each student\'s <code>name</code> and their score-plus-10. Two columns: name first, then <code>score + 10</code> with any alias you like (e.g. <code>bonus_score</code>).'
      },
      hint: {
        zh: '<code>SELECT name, score + 10 AS bonus_score FROM students</code>。',
        en: '<code>SELECT name, score + 10 AS bonus_score FROM students</code>.'
      },
      starter: { zh: '', en: '' },
      expectedSql: 'SELECT name, score + 10 AS bonus_score FROM students',
      checkOrder: false,
    },

    /* ─────────────────────── L14 INNER JOIN ─────────────────────── */
    {
      id: 14,
      section: 'main',
      slug: 'inner-join',
      title: { zh: 'Part 14 · INNER JOIN —— 内连接', en: 'Part 14 · INNER JOIN' },
      chapter: { zh: 'SQL 语法大全 · Part 14', en: 'SQL syntax guide · Part 14' },
      chapterRef: 'sql-syntax-guide-2',
      difficulty: { zh: '中级', en: 'Intermediate' },
      intro: {
        zh: `<p class="lead"><strong>INNER JOIN</strong> 把两张表用一个匹配条件「<strong>缝合</strong>」起来，只保留两边都能对上的行。</p>
<pre><code>SELECT b.title, a.name
FROM books AS b
INNER JOIN authors AS a ON b.author_id = a.id;</code></pre>
<ul>
  <li><code>ON</code> 是<strong>连接条件</strong>，通常是「外键 = 主键」</li>
  <li>关键字 <code>INNER</code> 可省略，<code>JOIN</code> 默认就是 INNER JOIN</li>
  <li>多表查询常给表起别名（<code>b</code>、<code>a</code>），引用列时用 <code>表别名.列名</code></li>
</ul>`,
        en: `<p class="lead"><strong>INNER JOIN</strong> stitches two tables together by a match condition, keeping only rows where both sides match.</p>
<pre><code>SELECT b.title, a.name
FROM books AS b
INNER JOIN authors AS a ON b.author_id = a.id;</code></pre>
<ul>
  <li><code>ON</code> is the <strong>match condition</strong> — usually "foreign key = primary key"</li>
  <li><code>INNER</code> is optional; bare <code>JOIN</code> means INNER JOIN</li>
  <li>Aliases (<code>b</code>, <code>a</code>) keep multi-table queries readable — use <code>alias.column</code></li>
</ul>`
      },
      tables: ['authors', 'books'],
      setup: `
        CREATE TABLE authors (id INTEGER, name TEXT, country TEXT);
        INSERT INTO authors VALUES (1, 'Herbert', 'US');
        INSERT INTO authors VALUES (2, 'Asimov',  'US');
        INSERT INTO authors VALUES (3, 'Gibson',  'CA');
        INSERT INTO authors VALUES (4, 'Le Guin', 'US');
        CREATE TABLE books (id INTEGER, title TEXT, author_id INTEGER, year INTEGER);
        INSERT INTO books VALUES (1, 'Dune',         1, 1965);
        INSERT INTO books VALUES (2, 'Foundation',   2, 1951);
        INSERT INTO books VALUES (3, 'I, Robot',     2, 1950);
        INSERT INTO books VALUES (4, 'Neuromancer',  3, 1984);
      `,
      task: {
        zh: '把每本书和它的作者拼起来，返回两列：<code>title</code>（书名）和<code>name</code>（作者名）。',
        en: 'Stitch each book to its author. Return two columns: <code>title</code> (book) and <code>name</code> (author).'
      },
      hint: {
        zh: 'FROM books JOIN authors ON books.author_id = authors.id。',
        en: 'FROM books JOIN authors ON books.author_id = authors.id.'
      },
      starter: { zh: '', en: '' },
      expectedSql: 'SELECT b.title, a.name FROM books AS b INNER JOIN authors AS a ON b.author_id = a.id',
      checkOrder: false,
    },

    /* ─────────────────────── L15 LEFT JOIN ─────────────────────── */
    {
      id: 15,
      section: 'main',
      slug: 'left-join',
      title: { zh: 'Part 15 · LEFT JOIN —— 左连接', en: 'Part 15 · LEFT JOIN' },
      chapter: { zh: 'SQL 语法大全 · Part 15', en: 'SQL syntax guide · Part 15' },
      chapterRef: 'sql-syntax-guide-2',
      difficulty: { zh: '中级', en: 'Intermediate' },
      intro: {
        zh: `<p class="lead"><strong>LEFT JOIN</strong> 保留<strong>左边表的所有行</strong>，右边没匹配上的列用 NULL 填。</p>
<pre><code>SELECT a.name, b.title
FROM authors AS a
LEFT JOIN books AS b ON a.id = b.author_id;</code></pre>
<p>典型用途：「<strong>列出所有 X，包括没有任何 Y 的</strong>」。</p>
<blockquote>区分：
<br/>· INNER JOIN —— 两边都得有
<br/>· LEFT JOIN —— 左边都保留，右边没的填 NULL
<br/>· RIGHT JOIN —— 反过来（实际工作中很少用，把表换边写 LEFT JOIN 即可）</blockquote>`,
        en: `<p class="lead"><strong>LEFT JOIN</strong> keeps <strong>every row from the left table</strong>; non-matching right-side columns are filled with NULL.</p>
<pre><code>SELECT a.name, b.title
FROM authors AS a
LEFT JOIN books AS b ON a.id = b.author_id;</code></pre>
<p>Classic use: "<strong>list all X, including those with no Y</strong>".</p>
<blockquote>Compare:
<br/>· INNER JOIN — both sides must match
<br/>· LEFT JOIN — keep all left rows; missing right → NULL
<br/>· RIGHT JOIN — the mirror (rarely used; just swap sides and write LEFT JOIN)</blockquote>`
      },
      tables: ['authors', 'books'],
      setup: `
        CREATE TABLE authors (id INTEGER, name TEXT);
        INSERT INTO authors VALUES (1, 'Herbert');
        INSERT INTO authors VALUES (2, 'Asimov');
        INSERT INTO authors VALUES (3, 'Le Guin');
        INSERT INTO authors VALUES (4, 'Pratchett');  -- no books in our DB
        CREATE TABLE books (id INTEGER, title TEXT, author_id INTEGER);
        INSERT INTO books VALUES (1, 'Dune',       1);
        INSERT INTO books VALUES (2, 'Foundation', 2);
        INSERT INTO books VALUES (3, 'I, Robot',   2);
      `,
      task: {
        zh: '列出<strong>所有作者</strong>和他们的书名 —— <strong>没有书的作者也要出现</strong>，title 显示 NULL。返回两列：<code>name</code> 和 <code>title</code>。',
        en: 'List <strong>every author</strong> and their book titles — <strong>authors with no books must still appear</strong>, with NULL for title. Return two columns: <code>name</code> and <code>title</code>.'
      },
      hint: {
        zh: '左表是 authors，<code>LEFT JOIN books ON authors.id = books.author_id</code>。',
        en: 'Authors is the left table: <code>LEFT JOIN books ON authors.id = books.author_id</code>.'
      },
      starter: { zh: '', en: '' },
      expectedSql: 'SELECT a.name, b.title FROM authors AS a LEFT JOIN books AS b ON a.id = b.author_id',
      checkOrder: false,
    },

    /* ─────────────────────── L16 多表连续 JOIN ─────────────────────── */
    {
      id: 16,
      section: 'main',
      slug: 'multi-join',
      title: { zh: 'Part 16 · 多表连续 JOIN', en: 'Part 16 · Chaining JOINs' },
      chapter: { zh: 'SQL 语法大全 · Part 16', en: 'SQL syntax guide · Part 16' },
      chapterRef: 'sql-syntax-guide-2',
      difficulty: { zh: '中级', en: 'Intermediate' },
      intro: {
        zh: `<p class="lead">三张以上的表？<strong>JOIN 接着写</strong>就行 —— 每个 JOIN 接一个 ON。</p>
<pre><code>SELECT c.name, p.name, o.total
FROM orders AS o
JOIN customers AS c ON o.customer_id = c.id
JOIN products  AS p ON o.product_id  = p.id;</code></pre>
<p>读法：先有 <code>orders</code>，再把 <code>customers</code> 缝上去，再把 <code>products</code> 缝上去。三张表的别名让查询不啰嗦。</p>`,
        en: `<p class="lead">Three or more tables? Just <strong>chain JOINs</strong> — each one with its own ON clause.</p>
<pre><code>SELECT c.name, p.name, o.total
FROM orders AS o
JOIN customers AS c ON o.customer_id = c.id
JOIN products  AS p ON o.product_id  = p.id;</code></pre>
<p>Read top-down: start with <code>orders</code>, stitch <code>customers</code> on, then stitch <code>products</code> on. Aliases keep it tidy.</p>`
      },
      tables: ['customers', 'products', 'orders'],
      setup: `
        CREATE TABLE customers (id INTEGER, name TEXT, country TEXT);
        INSERT INTO customers VALUES (1, 'Anna', 'AU');
        INSERT INTO customers VALUES (2, 'Ben',  'CN');
        INSERT INTO customers VALUES (3, 'Cara', 'US');
        CREATE TABLE products  (id INTEGER, name TEXT, price INTEGER);
        INSERT INTO products  VALUES (1, 'Pen',     5);
        INSERT INTO products  VALUES (2, 'Notebook', 12);
        INSERT INTO products  VALUES (3, 'Lamp',    40);
        CREATE TABLE orders   (id INTEGER, customer_id INTEGER, product_id INTEGER, total INTEGER);
        INSERT INTO orders    VALUES (1, 1, 2, 24);
        INSERT INTO orders    VALUES (2, 1, 3, 40);
        INSERT INTO orders    VALUES (3, 2, 1, 10);
        INSERT INTO orders    VALUES (4, 3, 2, 12);
      `,
      task: {
        zh: '把每个订单的<strong>顾客名、商品名、订单金额</strong>都拼出来。返回三列：<code>customer_name</code>、<code>product_name</code>、<code>total</code>。',
        en: 'For every order, return the <strong>customer name, product name, and order total</strong>. Three columns: <code>customer_name</code>, <code>product_name</code>, <code>total</code>.'
      },
      hint: {
        zh: 'orders 是核心表，分别 JOIN customers 和 products 两次。',
        en: 'Start from orders and JOIN customers, then JOIN products.'
      },
      starter: { zh: '', en: '' },
      expectedSql: `SELECT c.name AS customer_name, p.name AS product_name, o.total
FROM orders AS o
JOIN customers AS c ON o.customer_id = c.id
JOIN products  AS p ON o.product_id  = p.id`,
      checkOrder: false,
    },

    /* ─────────────────────── L17 COUNT ─────────────────────── */
    {
      id: 17,
      section: 'main',
      slug: 'count',
      title: { zh: 'Part 17 · COUNT —— 计数', en: 'Part 17 · COUNT — counting rows' },
      chapter: { zh: 'SQL 语法大全 · Part 17', en: 'SQL syntax guide · Part 17' },
      chapterRef: 'sql-syntax-guide-2',
      difficulty: { zh: '中级', en: 'Intermediate' },
      intro: {
        zh: `<p class="lead"><strong>COUNT</strong> 是聚合函数，把一堆行折成一个数字。</p>
<pre><code>SELECT COUNT(*)            FROM orders;          -- 全部行数
SELECT COUNT(email)        FROM users;           -- email 不为 NULL 的行数
SELECT COUNT(DISTINCT city) FROM users;          -- 不同城市的数量</code></pre>
<ul>
  <li><code>COUNT(*)</code> 数<strong>所有行</strong>（包括 NULL）</li>
  <li><code>COUNT(列)</code> 只数<strong>该列非 NULL</strong> 的行</li>
  <li><code>COUNT(DISTINCT 列)</code> 数<strong>不重复</strong>的非 NULL 值</li>
</ul>`,
        en: `<p class="lead"><strong>COUNT</strong> is an aggregate — it collapses many rows into one number.</p>
<pre><code>SELECT COUNT(*)            FROM orders;        -- all rows
SELECT COUNT(email)        FROM users;         -- rows where email IS NOT NULL
SELECT COUNT(DISTINCT city) FROM users;        -- distinct cities</code></pre>
<ul>
  <li><code>COUNT(*)</code> — every row (NULLs included)</li>
  <li><code>COUNT(col)</code> — only rows where <code>col</code> is NOT NULL</li>
  <li><code>COUNT(DISTINCT col)</code> — distinct non-NULL values</li>
</ul>`
      },
      tables: ['users'],
      setup: `
        CREATE TABLE users (id INTEGER, name TEXT, email TEXT, city TEXT);
        INSERT INTO users VALUES (1, 'Anna', 'a@x.com', 'Sydney');
        INSERT INTO users VALUES (2, 'Ben',  NULL,      'Sydney');
        INSERT INTO users VALUES (3, 'Cara', 'c@x.com', 'Beijing');
        INSERT INTO users VALUES (4, 'Dan',  'd@x.com', 'Beijing');
        INSERT INTO users VALUES (5, 'Ева',  NULL,      'Moscow');
      `,
      task: {
        zh: '一句查询返回三个数：<code>total_users</code>（总行数）、<code>users_with_email</code>（有邮箱的人数）、<code>distinct_cities</code>（不同城市的数量）。',
        en: 'Return three numbers in one query: <code>total_users</code> (all rows), <code>users_with_email</code> (rows with non-null email), and <code>distinct_cities</code> (number of distinct cities).'
      },
      hint: {
        zh: '<code>COUNT(*)</code>、<code>COUNT(email)</code>、<code>COUNT(DISTINCT city)</code>，各自用 AS 起别名。',
        en: 'Use <code>COUNT(*)</code>, <code>COUNT(email)</code>, and <code>COUNT(DISTINCT city)</code>, each with an AS alias.'
      },
      starter: { zh: '', en: '' },
      expectedSql: `SELECT COUNT(*) AS total_users,
       COUNT(email) AS users_with_email,
       COUNT(DISTINCT city) AS distinct_cities
FROM users`,
      checkOrder: false,
    },

    /* ─────────────────────── L18 SUM / AVG / MAX / MIN ─────────────────────── */
    {
      id: 18,
      section: 'main',
      slug: 'sum-avg-max-min',
      title: { zh: 'Part 18 · SUM / AVG / MAX / MIN', en: 'Part 18 · SUM / AVG / MAX / MIN' },
      chapter: { zh: 'SQL 语法大全 · Part 18', en: 'SQL syntax guide · Part 18' },
      chapterRef: 'sql-syntax-guide-2',
      difficulty: { zh: '中级', en: 'Intermediate' },
      intro: {
        zh: `<p class="lead">和 COUNT 类似的聚合函数：</p>
<table>
  <thead><tr><th>函数</th><th>作用</th></tr></thead>
  <tbody>
    <tr><td><code>SUM(列)</code></td><td>求和（忽略 NULL）</td></tr>
    <tr><td><code>AVG(列)</code></td><td>平均值（忽略 NULL）</td></tr>
    <tr><td><code>MAX(列)</code></td><td>最大值（数字、字符串、日期都行）</td></tr>
    <tr><td><code>MIN(列)</code></td><td>最小值</td></tr>
  </tbody>
</table>
<pre><code>SELECT SUM(total), AVG(total), MAX(total), MIN(total) FROM orders;</code></pre>
<blockquote>没有 <code>GROUP BY</code> 时，聚合函数把<strong>整张表</strong>折成一行。</blockquote>`,
        en: `<p class="lead">Cousins of COUNT:</p>
<table>
  <thead><tr><th>Function</th><th>What it does</th></tr></thead>
  <tbody>
    <tr><td><code>SUM(col)</code></td><td>Total (NULLs ignored)</td></tr>
    <tr><td><code>AVG(col)</code></td><td>Average (NULLs ignored)</td></tr>
    <tr><td><code>MAX(col)</code></td><td>Largest value — works for numbers, strings, dates</td></tr>
    <tr><td><code>MIN(col)</code></td><td>Smallest value</td></tr>
  </tbody>
</table>
<pre><code>SELECT SUM(total), AVG(total), MAX(total), MIN(total) FROM orders;</code></pre>
<blockquote>Without <code>GROUP BY</code>, an aggregate collapses <strong>the whole table</strong> to one row.</blockquote>`
      },
      tables: ['orders'],
      setup: `
        CREATE TABLE orders (id INTEGER, customer TEXT, total INTEGER);
        INSERT INTO orders VALUES (1, 'Anna', 24);
        INSERT INTO orders VALUES (2, 'Anna', 40);
        INSERT INTO orders VALUES (3, 'Ben',  10);
        INSERT INTO orders VALUES (4, 'Cara', 12);
        INSERT INTO orders VALUES (5, 'Anna', 18);
        INSERT INTO orders VALUES (6, 'Ben',  60);
      `,
      task: {
        zh: '一句查询返回 <code>orders</code> 表的<strong>总销售额</strong>、<strong>平均订单金额</strong>、<strong>最大订单</strong>、<strong>最小订单</strong>，分别取别名 <code>total_revenue</code>、<code>avg_order</code>、<code>max_order</code>、<code>min_order</code>。',
        en: 'In one query, return <strong>total revenue</strong>, <strong>average order</strong>, <strong>biggest order</strong>, and <strong>smallest order</strong> from <code>orders</code>, aliased as <code>total_revenue</code>, <code>avg_order</code>, <code>max_order</code>, <code>min_order</code>.'
      },
      hint: {
        zh: '四个聚合函数放在同一个 SELECT 里。',
        en: 'Put all four aggregates in the same SELECT.'
      },
      starter: { zh: '', en: '' },
      expectedSql: `SELECT SUM(total) AS total_revenue,
       AVG(total) AS avg_order,
       MAX(total) AS max_order,
       MIN(total) AS min_order
FROM orders`,
      checkOrder: false,
    },

    /* ─────────────────────── L19 GROUP BY ─────────────────────── */
    {
      id: 19,
      section: 'main',
      slug: 'group-by',
      title: { zh: 'Part 19 · GROUP BY —— 分组聚合', en: 'Part 19 · GROUP BY — group + aggregate' },
      chapter: { zh: 'SQL 语法大全 · Part 19', en: 'SQL syntax guide · Part 19' },
      chapterRef: 'sql-syntax-guide-2',
      difficulty: { zh: '中级', en: 'Intermediate' },
      intro: {
        zh: `<p class="lead"><strong>GROUP BY</strong> 把行<strong>按某列分组</strong>，每组聚合成一行。「每个 X 的 Y」就用它。</p>
<pre><code>SELECT customer, COUNT(*) AS orders_count, SUM(total) AS spent
FROM orders
GROUP BY customer;</code></pre>
<p>规则：SELECT 里出现的<strong>非聚合列</strong>，必须出现在 GROUP BY 里（这就是 <code>only_full_group_by</code> 模式）。</p>
<blockquote>「每个 X 的 ... 」 → GROUP BY X，SELECT 里只能放 X 本身和聚合（<code>COUNT</code>、<code>SUM</code> 等）。</blockquote>`,
        en: `<p class="lead"><strong>GROUP BY</strong> bins rows <strong>by a column value</strong> and collapses each bin to one row. "For each X, the Y" — that's GROUP BY.</p>
<pre><code>SELECT customer, COUNT(*) AS orders_count, SUM(total) AS spent
FROM orders
GROUP BY customer;</code></pre>
<p>Rule: every <strong>non-aggregate column</strong> in SELECT must also appear in GROUP BY (that's <code>only_full_group_by</code> mode).</p>
<blockquote>"For each X, the …" → GROUP BY X, and SELECT can only project X itself and aggregate functions (<code>COUNT</code>, <code>SUM</code>, …).</blockquote>`
      },
      tables: ['orders'],
      setup: `
        CREATE TABLE orders (id INTEGER, customer TEXT, total INTEGER);
        INSERT INTO orders VALUES (1, 'Anna', 24);
        INSERT INTO orders VALUES (2, 'Anna', 40);
        INSERT INTO orders VALUES (3, 'Ben',  10);
        INSERT INTO orders VALUES (4, 'Cara', 12);
        INSERT INTO orders VALUES (5, 'Anna', 18);
        INSERT INTO orders VALUES (6, 'Ben',  60);
      `,
      task: {
        zh: '查出<strong>每个顾客</strong>的订单数和总消费，返回三列：<code>customer</code>、<code>orders_count</code>、<code>spent</code>。',
        en: 'For <strong>each customer</strong>, return order count and total spent. Three columns: <code>customer</code>, <code>orders_count</code>, <code>spent</code>.'
      },
      hint: {
        zh: '<code>GROUP BY customer</code>，SELECT 里放 <code>customer</code>、<code>COUNT(*)</code>、<code>SUM(total)</code>。',
        en: '<code>GROUP BY customer</code>, then SELECT <code>customer</code>, <code>COUNT(*)</code>, <code>SUM(total)</code>.'
      },
      starter: { zh: '', en: '' },
      expectedSql: 'SELECT customer, COUNT(*) AS orders_count, SUM(total) AS spent FROM orders GROUP BY customer',
      checkOrder: false,
    },

    /* ─────────────────────── L20 HAVING ─────────────────────── */
    {
      id: 20,
      section: 'main',
      slug: 'having',
      title: { zh: 'Part 20 · HAVING —— 分组后筛选', en: 'Part 20 · HAVING — filter after grouping' },
      chapter: { zh: 'SQL 语法大全 · Part 20', en: 'SQL syntax guide · Part 20' },
      chapterRef: 'sql-syntax-guide-2',
      difficulty: { zh: '中级', en: 'Intermediate' },
      intro: {
        zh: `<p class="lead"><strong>WHERE</strong> 在分组<strong>之前</strong>过滤行；<strong>HAVING</strong> 在分组<strong>之后</strong>过滤聚合结果。</p>
<pre><code>SELECT customer, SUM(total) AS spent
FROM orders
GROUP BY customer
HAVING SUM(total) &gt; 50;</code></pre>
<p>HAVING 里能用聚合函数（<code>SUM</code>、<code>COUNT</code>），WHERE 里不能。</p>
<table>
  <thead><tr><th>子句</th><th>过滤的对象</th></tr></thead>
  <tbody>
    <tr><td>WHERE</td><td>原始行（一行一行看）</td></tr>
    <tr><td>HAVING</td><td>分组后的聚合结果（一组一组看）</td></tr>
  </tbody>
</table>`,
        en: `<p class="lead"><strong>WHERE</strong> filters rows <strong>before</strong> grouping; <strong>HAVING</strong> filters group aggregates <strong>after</strong>.</p>
<pre><code>SELECT customer, SUM(total) AS spent
FROM orders
GROUP BY customer
HAVING SUM(total) &gt; 50;</code></pre>
<p>HAVING can use aggregates (<code>SUM</code>, <code>COUNT</code>); WHERE cannot.</p>
<table>
  <thead><tr><th>Clause</th><th>What it filters</th></tr></thead>
  <tbody>
    <tr><td>WHERE</td><td>Raw rows (one row at a time)</td></tr>
    <tr><td>HAVING</td><td>Group aggregates (one group at a time)</td></tr>
  </tbody>
</table>`
      },
      tables: ['orders'],
      setup: `
        CREATE TABLE orders (id INTEGER, customer TEXT, total INTEGER);
        INSERT INTO orders VALUES (1, 'Anna', 24);
        INSERT INTO orders VALUES (2, 'Anna', 40);
        INSERT INTO orders VALUES (3, 'Ben',  10);
        INSERT INTO orders VALUES (4, 'Cara', 12);
        INSERT INTO orders VALUES (5, 'Anna', 18);
        INSERT INTO orders VALUES (6, 'Ben',  60);
        INSERT INTO orders VALUES (7, 'Dan',  500);
      `,
      task: {
        zh: '查出<strong>下过 2 单及以上</strong>的顾客和他们的订单数，两列：<code>customer</code>、<code>orders_count</code>。',
        en: 'Find customers who placed <strong>at least 2 orders</strong>; return <code>customer</code> and <code>orders_count</code>.'
      },
      hint: {
        zh: 'GROUP BY customer + <code>HAVING COUNT(*) &gt;= 2</code>。',
        en: 'GROUP BY customer + <code>HAVING COUNT(*) &gt;= 2</code>.'
      },
      starter: { zh: '', en: '' },
      expectedSql: 'SELECT customer, COUNT(*) AS orders_count FROM orders GROUP BY customer HAVING COUNT(*) >= 2',
      checkOrder: false,
    },

    /* ─────────────────────── L21 子查询 (WHERE) ─────────────────────── */
    {
      id: 21,
      section: 'main',
      slug: 'subquery-where',
      title: { zh: 'Part 21 · 子查询（WHERE 里）', en: 'Part 21 · Subqueries in WHERE' },
      chapter: { zh: 'SQL 语法大全 · Part 21', en: 'SQL syntax guide · Part 21' },
      chapterRef: 'sql-syntax-guide-3',
      difficulty: { zh: '中级', en: 'Intermediate' },
      intro: {
        zh: `<p class="lead"><strong>子查询</strong>就是「查询里嵌套查询」。在 WHERE 里很常见。</p>
<p><strong>返回单值</strong>（标量子查询）—— 用作比较运算符的右值：</p>
<pre><code>SELECT name, score FROM students
WHERE score &gt; (SELECT AVG(score) FROM students);   -- 高于平均</code></pre>
<p><strong>返回多值</strong> —— 配 IN：</p>
<pre><code>WHERE id IN (SELECT student_id FROM enrollments WHERE course = 'SQL')</code></pre>
<blockquote>子查询要用括号包住。它先算出值，主查询再用这个值。</blockquote>`,
        en: `<p class="lead">A <strong>subquery</strong> is a query nested inside another. They appear most often inside WHERE.</p>
<p><strong>Scalar subquery</strong> — returns a single value, plug into a comparison:</p>
<pre><code>SELECT name, score FROM students
WHERE score &gt; (SELECT AVG(score) FROM students);   -- above average</code></pre>
<p><strong>List subquery</strong> — pair with IN:</p>
<pre><code>WHERE id IN (SELECT student_id FROM enrollments WHERE course = 'SQL')</code></pre>
<blockquote>Subqueries are wrapped in parentheses. SQL evaluates the inner query first.</blockquote>`
      },
      tables: ['students'],
      setup: `
        CREATE TABLE students (id INTEGER, name TEXT, score INTEGER);
        INSERT INTO students VALUES (1, 'Alice', 85);
        INSERT INTO students VALUES (2, 'Bob',   92);
        INSERT INTO students VALUES (3, 'Carol', 78);
        INSERT INTO students VALUES (4, 'David', 88);
        INSERT INTO students VALUES (5, 'Eve',   95);
        INSERT INTO students VALUES (6, 'Frank', 70);
      `,
      task: {
        zh: '查出<strong>分数高于全班平均分</strong>的学生，返回 <code>name</code> 和 <code>score</code>。要求用<strong>标量子查询</strong>计算平均值。',
        en: 'Return the <code>name</code> and <code>score</code> of students <strong>scoring above the class average</strong>. Use a <strong>scalar subquery</strong> to compute the average.'
      },
      hint: {
        zh: '<code>WHERE score &gt; (SELECT AVG(score) FROM students)</code>。',
        en: '<code>WHERE score &gt; (SELECT AVG(score) FROM students)</code>.'
      },
      starter: { zh: '', en: '' },
      expectedSql: 'SELECT name, score FROM students WHERE score > (SELECT AVG(score) FROM students)',
      checkOrder: false,
    },

    /* ─────────────────────── L22 子查询 (FROM) ─────────────────────── */
    {
      id: 22,
      section: 'main',
      slug: 'subquery-from',
      title: { zh: 'Part 22 · 子查询（FROM 里 —— 派生表）', en: 'Part 22 · Subqueries in FROM (derived tables)' },
      chapter: { zh: 'SQL 语法大全 · Part 22', en: 'SQL syntax guide · Part 22' },
      chapterRef: 'sql-syntax-guide-3',
      difficulty: { zh: '中级', en: 'Intermediate' },
      intro: {
        zh: `<p class="lead">子查询也能放在 FROM 里，被当成<strong>临时表</strong>（派生表）参与查询。</p>
<pre><code>SELECT AVG(spent) AS avg_spent
FROM (
  SELECT customer, SUM(total) AS spent
  FROM orders
  GROUP BY customer
) AS per_customer;</code></pre>
<p>典型场景：<strong>先聚合，再对聚合结果继续查</strong>。比如「每个顾客先求总消费，再求平均消费」 —— 一句 SQL 干不动，但派生表能。</p>
<blockquote>派生表必须有<strong>别名</strong>（上例中的 <code>per_customer</code>），即使不引用。</blockquote>`,
        en: `<p class="lead">Subqueries can also live in FROM as a <strong>derived table</strong> — a temporary table within the query.</p>
<pre><code>SELECT AVG(spent) AS avg_spent
FROM (
  SELECT customer, SUM(total) AS spent
  FROM orders
  GROUP BY customer
) AS per_customer;</code></pre>
<p>Classic use: "<strong>aggregate, then query the aggregates</strong>" — e.g. "first sum each customer's spend, then take the mean of those sums".</p>
<blockquote>A derived table <strong>must have an alias</strong> (above: <code>per_customer</code>), even if you never reference it.</blockquote>`
      },
      tables: ['orders'],
      setup: `
        CREATE TABLE orders (id INTEGER, customer TEXT, total INTEGER);
        INSERT INTO orders VALUES (1, 'Anna', 24);
        INSERT INTO orders VALUES (2, 'Anna', 40);
        INSERT INTO orders VALUES (3, 'Ben',  10);
        INSERT INTO orders VALUES (4, 'Cara', 12);
        INSERT INTO orders VALUES (5, 'Anna', 18);
        INSERT INTO orders VALUES (6, 'Ben',  60);
        INSERT INTO orders VALUES (7, 'Dan',  500);
      `,
      task: {
        zh: '先按顾客把订单金额求和（每人一个总数），然后查出<strong>这些总数里的最大值</strong>，列名 <code>top_spent</code>。要求用 FROM 子查询。',
        en: 'First sum each customer\'s order totals, then return the <strong>largest of those sums</strong> as <code>top_spent</code>. You must use a derived table (subquery in FROM).'
      },
      hint: {
        zh: '内层 GROUP BY customer 求 SUM；外层 SELECT MAX。',
        en: 'Inner query: GROUP BY customer with SUM. Outer: MAX over that.'
      },
      starter: { zh: '', en: '' },
      expectedSql: `SELECT MAX(spent) AS top_spent
FROM (SELECT customer, SUM(total) AS spent FROM orders GROUP BY customer) AS per_customer`,
      checkOrder: false,
    },

    /* ─────────────────────── L23 EXISTS / NOT EXISTS ─────────────────────── */
    {
      id: 23,
      section: 'main',
      slug: 'exists',
      title: { zh: 'Part 23 · EXISTS / NOT EXISTS', en: 'Part 23 · EXISTS / NOT EXISTS' },
      chapter: { zh: 'SQL 语法大全 · Part 23', en: 'SQL syntax guide · Part 23' },
      chapterRef: 'sql-syntax-guide-3',
      difficulty: { zh: '中级', en: 'Intermediate' },
      intro: {
        zh: `<p class="lead"><strong>EXISTS (子查询)</strong> 检查子查询是否<strong>有至少一行</strong>。配合<strong>关联子查询</strong>（子查询里引用外层的列）做「找出有相关记录的行」。</p>
<pre><code>-- 找出「至少出过一本书」的作者
SELECT a.name FROM authors AS a
WHERE EXISTS (
  SELECT 1 FROM books AS b WHERE b.author_id = a.id
);</code></pre>
<p><strong>NOT EXISTS</strong> 反过来 —— 找「没有相关记录的」（比 NOT IN 安全，能正确处理 NULL）。</p>
<blockquote>EXISTS 只关心「有没有」，<strong>不关心子查询返回的内容</strong>，所以惯例写 <code>SELECT 1</code>。</blockquote>`,
        en: `<p class="lead"><strong>EXISTS (subquery)</strong> tests whether the subquery returns <strong>any row at all</strong>. Pair it with a <strong>correlated subquery</strong> (one that references the outer row) to find "rows with related records".</p>
<pre><code>-- authors who have at least one book
SELECT a.name FROM authors AS a
WHERE EXISTS (
  SELECT 1 FROM books AS b WHERE b.author_id = a.id
);</code></pre>
<p><strong>NOT EXISTS</strong> for the inverse — "no related rows". Safer than NOT IN around NULLs.</p>
<blockquote>EXISTS only checks for any row; the subquery's actual columns don't matter, so the idiom is <code>SELECT 1</code>.</blockquote>`
      },
      tables: ['authors', 'books'],
      setup: `
        CREATE TABLE authors (id INTEGER, name TEXT);
        INSERT INTO authors VALUES (1, 'Herbert');
        INSERT INTO authors VALUES (2, 'Asimov');
        INSERT INTO authors VALUES (3, 'Le Guin');
        INSERT INTO authors VALUES (4, 'Pratchett');   -- no books
        INSERT INTO authors VALUES (5, 'Sanderson');   -- no books
        CREATE TABLE books (id INTEGER, title TEXT, author_id INTEGER);
        INSERT INTO books VALUES (1, 'Dune',       1);
        INSERT INTO books VALUES (2, 'Foundation', 2);
        INSERT INTO books VALUES (3, 'I, Robot',   2);
        INSERT INTO books VALUES (4, 'Earthsea',   3);
      `,
      task: {
        zh: '查出<strong>没有出过任何一本书</strong>的作者，返回 <code>id</code> 和 <code>name</code>。用 <code>NOT EXISTS</code>。',
        en: 'Return the <code>id</code> and <code>name</code> of every author who has <strong>not published any book</strong>. Use <code>NOT EXISTS</code>.'
      },
      hint: {
        zh: '<code>WHERE NOT EXISTS (SELECT 1 FROM books WHERE books.author_id = authors.id)</code>。',
        en: '<code>WHERE NOT EXISTS (SELECT 1 FROM books WHERE books.author_id = authors.id)</code>.'
      },
      starter: { zh: '', en: '' },
      expectedSql: `SELECT a.id, a.name FROM authors AS a
WHERE NOT EXISTS (SELECT 1 FROM books AS b WHERE b.author_id = a.id)`,
      checkOrder: false,
    },

    /* ─────────────────────── L24 COALESCE ─────────────────────── */
    {
      id: 24,
      section: 'main',
      slug: 'coalesce',
      title: { zh: 'Part 24 · COALESCE —— 替换 NULL', en: 'Part 24 · COALESCE — replace NULL' },
      chapter: { zh: 'SQL 语法大全 · Part 24', en: 'SQL syntax guide · Part 24' },
      chapterRef: 'sql-syntax-guide-3',
      difficulty: { zh: '中级', en: 'Intermediate' },
      intro: {
        zh: `<p class="lead"><strong>COALESCE(a, b, c, ...)</strong> 返回参数列表中<strong>第一个非 NULL 值</strong>。最常见的用途是「把 NULL 替换成默认值」。</p>
<pre><code>COALESCE(discount, 0)            -- 没折扣按 0 算
COALESCE(nickname, name)         -- 优先昵称，没昵称用真名
COALESCE(a, b, 'unknown')        -- 多级回退</code></pre>
<p>经典搭配：<strong>LEFT JOIN + COALESCE</strong>。LEFT JOIN 让没匹配的列变 NULL，COALESCE 把 NULL 变 0 或别的占位值。</p>`,
        en: `<p class="lead"><strong>COALESCE(a, b, c, …)</strong> returns the <strong>first non-NULL argument</strong>. The classic use: "replace NULL with a default".</p>
<pre><code>COALESCE(discount, 0)            -- treat missing discount as 0
COALESCE(nickname, name)         -- prefer nickname; fall back to real name
COALESCE(a, b, 'unknown')        -- multi-level fallback</code></pre>
<p>Pairs perfectly with <strong>LEFT JOIN</strong>: LEFT JOIN turns missing matches into NULL, COALESCE swaps those NULLs for 0 (or any sentinel).</p>`
      },
      tables: ['sales'],
      setup: `
        CREATE TABLE sales (id INTEGER, name TEXT, price INTEGER, discount INTEGER);
        INSERT INTO sales VALUES (1, 'Pen',      10, 2);
        INSERT INTO sales VALUES (2, 'Notebook', 25, NULL);
        INSERT INTO sales VALUES (3, 'Lamp',     50, 8);
        INSERT INTO sales VALUES (4, 'Mug',      15, NULL);
      `,
      task: {
        zh: '查出每件商品的 <code>name</code>、<code>price</code>，以及<strong>实付价</strong>（<code>price - discount</code>，没折扣按 0 算），第三列别名 <code>final_price</code>。',
        en: 'Return each product\'s <code>name</code>, <code>price</code>, and <strong>final price</strong> (<code>price - discount</code>, with NULL discounts treated as 0). Alias the third column <code>final_price</code>.'
      },
      hint: {
        zh: '用 <code>price - COALESCE(discount, 0)</code>。',
        en: 'Use <code>price - COALESCE(discount, 0)</code>.'
      },
      starter: { zh: '', en: '' },
      expectedSql: 'SELECT name, price, price - COALESCE(discount, 0) AS final_price FROM sales',
      checkOrder: false,
    },

    /* ─────────────────────── L25 CASE WHEN ─────────────────────── */
    {
      id: 25,
      section: 'main',
      slug: 'case-when',
      title: { zh: 'Part 25 · CASE WHEN —— SQL 的 if-else', en: 'Part 25 · CASE WHEN — SQL\'s if-else' },
      chapter: { zh: 'SQL 语法大全 · Part 25', en: 'SQL syntax guide · Part 25' },
      chapterRef: 'sql-syntax-guide-3',
      difficulty: { zh: '中级', en: 'Intermediate' },
      intro: {
        zh: `<p class="lead"><strong>CASE WHEN</strong> 是 SQL 的 if-else，能根据条件返回不同的值，做<strong>分级、打标签</strong>等。</p>
<pre><code>SELECT name, score,
  CASE
    WHEN score &gt;= 90 THEN 'A'
    WHEN score &gt;= 80 THEN 'B'
    WHEN score &gt;= 70 THEN 'C'
    ELSE 'F'
  END AS grade
FROM students;</code></pre>
<p>规则：<strong>从上到下</strong>第一个为真的 WHEN 生效，后面的 WHEN 被跳过；都不满足走 ELSE（没写 ELSE 默认是 NULL）。</p>
<p>CASE 还能配合 SUM 做「条件计数 / 求和」（参见博客 25.4、25.5）。</p>`,
        en: `<p class="lead"><strong>CASE WHEN</strong> is SQL's if-else. It evaluates conditions in order and returns the first match — perfect for <strong>grading, bucketing, labelling</strong>.</p>
<pre><code>SELECT name, score,
  CASE
    WHEN score &gt;= 90 THEN 'A'
    WHEN score &gt;= 80 THEN 'B'
    WHEN score &gt;= 70 THEN 'C'
    ELSE 'F'
  END AS grade
FROM students;</code></pre>
<p>Rule: <strong>top to bottom</strong> — the first matching WHEN wins, the rest are skipped. If nothing matches, ELSE runs (defaults to NULL if absent).</p>
<p>CASE inside SUM/COUNT lets you do "conditional sums" — a powerful pivot trick.</p>`
      },
      tables: ['students'],
      setup: `
        CREATE TABLE students (id INTEGER, name TEXT, score INTEGER);
        INSERT INTO students VALUES (1, 'Alice', 92);
        INSERT INTO students VALUES (2, 'Bob',   85);
        INSERT INTO students VALUES (3, 'Carol', 78);
        INSERT INTO students VALUES (4, 'David', 67);
        INSERT INTO students VALUES (5, 'Eve',   95);
        INSERT INTO students VALUES (6, 'Frank', 55);
      `,
      task: {
        zh: '给每个学生打个等级。返回三列：<code>name</code>、<code>score</code>、<code>grade</code>。<br/>规则：score &ge; 90 → <code>\'A\'</code>；80–89 → <code>\'B\'</code>；70–79 → <code>\'C\'</code>；其余 → <code>\'F\'</code>。',
        en: 'Assign a letter grade to every student. Three columns: <code>name</code>, <code>score</code>, <code>grade</code>.<br/>Rules: score ≥ 90 → <code>\'A\'</code>; 80–89 → <code>\'B\'</code>; 70–79 → <code>\'C\'</code>; else → <code>\'F\'</code>.'
      },
      hint: {
        zh: 'CASE WHEN ... THEN ... WHEN ... THEN ... ELSE ... END，最后用 AS grade 起别名。',
        en: 'CASE WHEN … THEN … WHEN … THEN … ELSE … END AS grade.'
      },
      starter: { zh: '', en: '' },
      expectedSql: `SELECT name, score,
  CASE
    WHEN score >= 90 THEN 'A'
    WHEN score >= 80 THEN 'B'
    WHEN score >= 70 THEN 'C'
    ELSE 'F'
  END AS grade
FROM students`,
      checkOrder: false,
    },

    /* ─────────────────────── L26 SQL 执行顺序 ─────────────────────── */
    {
      id: 26,
      section: 'main',
      slug: 'execution-order',
      title: { zh: 'Part 26 · SQL 执行顺序（必背）', en: 'Part 26 · Logical execution order (memorize)' },
      chapter: { zh: 'SQL 语法大全 · Part 26', en: 'SQL syntax guide · Part 26' },
      chapterRef: 'sql-syntax-guide-3',
      difficulty: { zh: '中级', en: 'Intermediate' },
      intro: {
        zh: `<p class="lead">SQL 写起来 SELECT 在前，但<strong>逻辑执行顺序完全不一样</strong>：</p>
<pre><code>1. FROM      ← 先决定数据源
2. WHERE     ← 再过滤行
3. GROUP BY  ← 再分组
4. HAVING    ← 再过滤分组
5. SELECT    ← 才计算 SELECT 列（包括别名）
6. ORDER BY  ← 最后排序
7. LIMIT     ← 截取若干行</code></pre>
<p>这能解释几个新手常见疑问：</p>
<ul>
  <li>WHERE 不能用 SELECT 里起的<strong>别名</strong> —— WHERE 在 SELECT 之前执行</li>
  <li>WHERE 不能放<strong>聚合函数</strong> —— 聚合在 GROUP BY 之后才有，用 HAVING</li>
  <li>ORDER BY <strong>能</strong>用 SELECT 别名 —— 它在 SELECT 之后</li>
</ul>
<p>这一关用一句查询练习<strong>从原始数据到最终结果</strong>的完整链：FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT。</p>`,
        en: `<p class="lead">SQL is <strong>written</strong> SELECT-first, but its <strong>logical execution order</strong> is very different:</p>
<pre><code>1. FROM      ← pick the data source
2. WHERE     ← filter raw rows
3. GROUP BY  ← bin into groups
4. HAVING    ← filter groups
5. SELECT    ← only now compute the projection (and aliases exist)
6. ORDER BY  ← sort
7. LIMIT     ← take the first N</code></pre>
<p>This explains a few classic gotchas:</p>
<ul>
  <li>WHERE can't reference an <strong>alias</strong> from SELECT — WHERE runs first</li>
  <li>WHERE can't use an <strong>aggregate</strong> — aggregates only exist after GROUP BY (use HAVING)</li>
  <li>ORDER BY <strong>can</strong> use SELECT aliases — it runs after SELECT</li>
</ul>
<p>This level chains every clause from raw data to a final list: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT.</p>`
      },
      tables: ['orders'],
      setup: `
        CREATE TABLE orders (id INTEGER, customer TEXT, country TEXT, total INTEGER);
        INSERT INTO orders VALUES (1, 'Anna', 'AU', 24);
        INSERT INTO orders VALUES (2, 'Anna', 'AU', 40);
        INSERT INTO orders VALUES (3, 'Ben',  'CN', 10);
        INSERT INTO orders VALUES (4, 'Cara', 'US', 12);
        INSERT INTO orders VALUES (5, 'Anna', 'AU', 18);
        INSERT INTO orders VALUES (6, 'Ben',  'CN', 60);
        INSERT INTO orders VALUES (7, 'Dan',  'CN', 500);
        INSERT INTO orders VALUES (8, 'Cara', 'US', 250);
        INSERT INTO orders VALUES (9, 'Eli',  'AU', 5);
      `,
      task: {
        zh: '只看<strong>金额 ≥ 10 的订单</strong>（WHERE）；按顾客分组（GROUP BY），算每人的订单数和总消费；只保留<strong>下过 ≥ 2 单</strong>的人（HAVING）；按总消费<strong>从高到低</strong>（ORDER BY）取<strong>前 3 名</strong>（LIMIT）。返回三列：<code>customer</code>、<code>orders_count</code>、<code>spent</code>。',
        en: 'Keep only orders with <strong>total ≥ 10</strong> (WHERE). Group by customer; compute order count and total spent. Keep only customers with <strong>≥ 2 qualifying orders</strong> (HAVING). Sort by spend <strong>descending</strong> (ORDER BY) and take the <strong>top 3</strong> (LIMIT). Three columns: <code>customer</code>, <code>orders_count</code>, <code>spent</code>.'
      },
      hint: {
        zh: 'WHERE total &gt;= 10 → GROUP BY customer → HAVING COUNT(*) &gt;= 2 → ORDER BY spent DESC → LIMIT 3。',
        en: 'WHERE total >= 10 → GROUP BY customer → HAVING COUNT(*) >= 2 → ORDER BY spent DESC → LIMIT 3.'
      },
      starter: { zh: '', en: '' },
      expectedSql: `SELECT customer, COUNT(*) AS orders_count, SUM(total) AS spent
FROM orders
WHERE total >= 10
GROUP BY customer
HAVING COUNT(*) >= 2
ORDER BY spent DESC
LIMIT 3`,
      checkOrder: true,
    },

    /* ─────────────────────── L27 实用技巧 · 找重复 ─────────────────────── */
    {
      id: 27,
      section: 'main',
      slug: 'practical-find-duplicates',
      title: { zh: 'Part 27.1 · 找重复的行', en: 'Part 27.1 · Find duplicate rows' },
      chapter: { zh: 'SQL 语法大全 · Part 27.1', en: 'SQL syntax guide · Part 27.1' },
      chapterRef: 'sql-syntax-guide-3',
      difficulty: { zh: '中级', en: 'Intermediate' },
      intro: {
        zh: `<p class="lead">数据清洗的第一题：哪些<strong>邮箱 / 用户名 / 订单号</strong>出现了不止一次？</p>
<pre><code>SELECT email, COUNT(*) AS n
FROM users
GROUP BY email
HAVING COUNT(*) &gt; 1;</code></pre>
<p>套路：<strong>GROUP BY 你怀疑重复的列</strong>，<strong>HAVING COUNT(*) &gt; 1</strong>。返回的就是被重复过的值和它出现的次数。</p>
<p>博客 Part 27 还有更多类似的实用技巧：</p>
<ul>
  <li>27.2 找前 N 名（带并列）</li>
  <li>27.3 每组里取最大 / 最小那一行</li>
  <li>27.4 算累计百分比</li>
  <li>27.7 防止除零错误</li>
  <li>27.9 取第 N 大的值</li>
</ul>`,
        en: `<p class="lead">The classic data-cleaning question: which <strong>emails / usernames / order IDs</strong> appear more than once?</p>
<pre><code>SELECT email, COUNT(*) AS n
FROM users
GROUP BY email
HAVING COUNT(*) &gt; 1;</code></pre>
<p>Recipe: <strong>GROUP BY the column you suspect is duplicated</strong>, then <strong>HAVING COUNT(*) &gt; 1</strong>. The result is each repeated value with its count.</p>
<p>Blog Part 27 covers more recipes:</p>
<ul>
  <li>27.2 top N with ties</li>
  <li>27.3 the row with max/min in each group</li>
  <li>27.4 cumulative percentages</li>
  <li>27.7 avoid division-by-zero</li>
  <li>27.9 the N-th largest value</li>
</ul>`
      },
      tables: ['users'],
      setup: `
        CREATE TABLE users (id INTEGER, name TEXT, email TEXT);
        INSERT INTO users VALUES (1, 'Anna', 'anna@x.com');
        INSERT INTO users VALUES (2, 'Ben',  'ben@x.com');
        INSERT INTO users VALUES (3, 'Cara', 'anna@x.com');
        INSERT INTO users VALUES (4, 'Dan',  'dan@x.com');
        INSERT INTO users VALUES (5, 'Eli',  'ben@x.com');
        INSERT INTO users VALUES (6, 'Fay',  'anna@x.com');
        INSERT INTO users VALUES (7, 'Gus',  'gus@x.com');
      `,
      task: {
        zh: '查出<strong>注册邮箱重复</strong>的所有 email，以及每个 email 被使用了多少次（次数 &gt; 1 才算重复）。返回两列：<code>email</code>、<code>n</code>。',
        en: 'Find every <strong>email that has been used more than once</strong>, and how many users used it. Two columns: <code>email</code>, <code>n</code>.'
      },
      hint: {
        zh: 'GROUP BY email + HAVING COUNT(*) &gt; 1。',
        en: 'GROUP BY email + HAVING COUNT(*) > 1.'
      },
      starter: { zh: '', en: '' },
      expectedSql: 'SELECT email, COUNT(*) AS n FROM users GROUP BY email HAVING COUNT(*) > 1',
      checkOrder: false,
    },

    /* ─────────────────────── L28 · 27.2 Top N with ties ─────────── */
    {
      id: 28,
      section: 'main',
      slug: 'practical-top-n-ties',
      title: { zh: 'Part 27.2 · 找前 N 名（带并列）', en: 'Part 27.2 · Top N with ties' },
      chapter: { zh: 'SQL 语法大全 · Part 27.2', en: 'SQL syntax guide · Part 27.2' },
      chapterRef: 'sql-syntax-guide-3',
      difficulty: { zh: '中级', en: 'Intermediate' },
      intro: {
        zh: `<p class="lead">「<strong>前 N 名带并列</strong>」是<code>LIMIT N</code> 解决不了的问题 —— LIMIT 会把并列的人砍掉。</p>
<p>正确套路：<strong>找到第 N 大的值</strong>，然后筛选所有 ≥ 这个值的行。</p>
<pre><code>WHERE score &gt;= (
  SELECT DISTINCT score FROM students
  ORDER BY score DESC
  LIMIT 1 OFFSET 2          -- 第 3 大的不重复 score
)</code></pre>
<p>关键是子查询里的 <code>SELECT DISTINCT</code> + <code>LIMIT 1 OFFSET (N-1)</code> —— 这样取到的是「第 N 大的<strong>不重复</strong>分数」，确保并列正确。</p>`,
        en: `<p class="lead">"<strong>Top N with ties</strong>" can't be done with plain <code>LIMIT N</code> — that blindly drops tied rows.</p>
<p>Pattern: <strong>find the N-th largest distinct value</strong>, then keep every row ≥ that.</p>
<pre><code>WHERE score &gt;= (
  SELECT DISTINCT score FROM students
  ORDER BY score DESC
  LIMIT 1 OFFSET 2          -- 3rd-largest distinct score
)</code></pre>
<p>Notice the inner query: <code>SELECT DISTINCT</code> + <code>LIMIT 1 OFFSET (N-1)</code>. That picks the N-th largest <strong>distinct</strong> score, so ties at the cut-off are preserved.</p>`
      },
      tables: ['students'],
      setup: `
        CREATE TABLE students (id INTEGER, name TEXT, score INTEGER);
        INSERT INTO students VALUES (1, 'Alice',  92);
        INSERT INTO students VALUES (2, 'Bob',    88);
        INSERT INTO students VALUES (3, 'Carol',  85);
        INSERT INTO students VALUES (4, 'David',  85);
        INSERT INTO students VALUES (5, 'Eve',    78);
        INSERT INTO students VALUES (6, 'Frank',  92);
        INSERT INTO students VALUES (7, 'Grace',  70);
      `,
      task: {
        zh: '查出<strong>分数排名前 3 的所有学生</strong>（带并列）。如果第 N 名有并列，并列的全都返回。返回两列：<code>name</code>、<code>score</code>，按分数<strong>从高到低</strong>。',
        en: 'Return <strong>every student in the top 3 scores</strong>, including ties. Two columns: <code>name</code>, <code>score</code>, sorted by score <strong>descending</strong>.'
      },
      hint: {
        zh: '子查询里 SELECT DISTINCT score ORDER BY DESC LIMIT 1 OFFSET 2 拿到第 3 大的分数，外层 WHERE score &gt;= 那个值。',
        en: 'Inner query: SELECT DISTINCT score ORDER BY DESC LIMIT 1 OFFSET 2; outer WHERE score >= that.'
      },
      starter: { zh: '', en: '' },
      expectedSql: `SELECT name, score FROM students
WHERE score >= (
  SELECT DISTINCT score FROM students
  ORDER BY score DESC
  LIMIT 1 OFFSET 2
)
ORDER BY score DESC`,
      checkOrder: true,
    },

    /* ─────────────────────── L29 · 27.3 Per-group max row ─────────── */
    {
      id: 29,
      section: 'main',
      slug: 'practical-per-group-max',
      title: { zh: 'Part 27.3 · 每组里取最大那一行', en: 'Part 27.3 · The max row in each group' },
      chapter: { zh: 'SQL 语法大全 · Part 27.3', en: 'SQL syntax guide · Part 27.3' },
      chapterRef: 'sql-syntax-guide-3',
      difficulty: { zh: '中级', en: 'Intermediate' },
      intro: {
        zh: `<p class="lead">「<strong>每组里最大的那一行</strong>」 —— 不是 <code>SELECT MAX(score)</code>，那只能给你最大值，给不了行的其他列。</p>
<p>套路：<strong>子查询求每组最大值，主查询比对</strong>。</p>
<pre><code>SELECT * FROM students s
WHERE score = (SELECT MAX(score) FROM students WHERE class = s.class);</code></pre>
<p>这是<strong>关联子查询</strong> —— 内层用了外层的 <code>s.class</code>。每行检查时，子查询都按那一行的 class 重新计算。</p>
<p>用 <code>=</code> 而不是 <code>LIMIT 1</code>，<strong>并列时同班级最高分的几个人都返回</strong>。</p>`,
        en: `<p class="lead">"<strong>The row holding the max in each group</strong>" — <code>SELECT MAX(score)</code> alone gives you the max value, not the row.</p>
<p>Pattern: <strong>inner query computes the per-group max, outer matches against it</strong>.</p>
<pre><code>SELECT * FROM students s
WHERE score = (SELECT MAX(score) FROM students WHERE class = s.class);</code></pre>
<p>This is a <strong>correlated subquery</strong> — the inner query references the outer row's <code>s.class</code>, so it re-evaluates per row.</p>
<p>Using <code>=</code> instead of <code>LIMIT 1</code> means <strong>ties are preserved</strong> — every student tied for the class top score appears.</p>`
      },
      tables: ['students'],
      setup: `
        CREATE TABLE students (id INTEGER, name TEXT, class TEXT, score INTEGER);
        INSERT INTO students VALUES (1, 'Alice',  'A', 85);
        INSERT INTO students VALUES (2, 'Bob',    'A', 92);
        INSERT INTO students VALUES (3, 'Carol',  'A', 92);
        INSERT INTO students VALUES (4, 'David',  'B', 78);
        INSERT INTO students VALUES (5, 'Eve',    'B', 88);
        INSERT INTO students VALUES (6, 'Frank',  'B', 88);
        INSERT INTO students VALUES (7, 'Grace',  'C', 95);
      `,
      task: {
        zh: '对每个班级，找出<strong>分数最高的学生</strong>（含并列）。返回三列：<code>name</code>、<code>class</code>、<code>score</code>。',
        en: 'For each class, return the <strong>top-scoring student(s)</strong> (including ties). Three columns: <code>name</code>, <code>class</code>, <code>score</code>.'
      },
      hint: {
        zh: 'WHERE score = (SELECT MAX(score) FROM students WHERE class = 外层.class) —— 关联子查询。',
        en: 'WHERE score = (SELECT MAX(score) FROM students WHERE class = outer.class) — correlated subquery.'
      },
      starter: { zh: '', en: '' },
      expectedSql: `SELECT name, class, score FROM students s
WHERE score = (SELECT MAX(score) FROM students WHERE class = s.class)`,
      checkOrder: false,
    },

    /* ─────────────────────── L30 · 27.4 Cumulative percentage ─── */
    {
      id: 30,
      section: 'main',
      slug: 'practical-percentage',
      title: { zh: 'Part 27.4 · 算占比 / 累计百分比', en: 'Part 27.4 · Percentage of total' },
      chapter: { zh: 'SQL 语法大全 · Part 27.4', en: 'SQL syntax guide · Part 27.4' },
      chapterRef: 'sql-syntax-guide-3',
      difficulty: { zh: '中级', en: 'Intermediate' },
      intro: {
        zh: `<p class="lead">「<strong>每个 X 占总数的多少 %</strong>」 —— GROUP BY 给每行求和，再用<strong>子查询求总数</strong>。</p>
<pre><code>SELECT customer,
       SUM(total) AS spent,
       SUM(total) * 100.0 / (SELECT SUM(total) FROM orders) AS pct
FROM orders
GROUP BY customer;</code></pre>
<p>三个细节：</p>
<ul>
  <li>子查询 <code>(SELECT SUM(total) FROM orders)</code> 返回单值，可以直接参与算术</li>
  <li>乘 <code>100.0</code>（不是 <code>100</code>）—— 强制浮点除法，否则 SQLite 会做整数除法</li>
  <li>外层 GROUP BY，子查询里<strong>不</strong> GROUP BY —— 子查询是「全表的总和」</li>
</ul>`,
        en: `<p class="lead">"<strong>What % of the total does each X account for?</strong>" — GROUP BY gives the per-group sum; a <strong>subquery gives the grand total</strong>.</p>
<pre><code>SELECT customer,
       SUM(total) AS spent,
       SUM(total) * 100.0 / (SELECT SUM(total) FROM orders) AS pct
FROM orders
GROUP BY customer;</code></pre>
<p>Three details that bite:</p>
<ul>
  <li>The subquery returns one value, plug it straight into arithmetic</li>
  <li>Multiply by <code>100.0</code> not <code>100</code> — forces float division (otherwise SQLite does integer division and you get 0)</li>
  <li>Outer GROUP BY only; subquery has <strong>no</strong> GROUP BY — it's the grand total</li>
</ul>`
      },
      tables: ['orders'],
      setup: `
        CREATE TABLE orders (id INTEGER, customer TEXT, total INTEGER);
        INSERT INTO orders VALUES (1, 'Anna',  100);
        INSERT INTO orders VALUES (2, 'Anna',  200);
        INSERT INTO orders VALUES (3, 'Ben',   150);
        INSERT INTO orders VALUES (4, 'Cara',   50);
        INSERT INTO orders VALUES (5, 'Anna',  100);
        INSERT INTO orders VALUES (6, 'Ben',   200);
        INSERT INTO orders VALUES (7, 'Cara',  200);
      `,
      task: {
        zh: '每个顾客<strong>消费总额</strong> 以及 <strong>占全店总收入的百分比</strong>。返回三列：<code>customer</code>、<code>spent</code>、<code>pct</code>（百分比，比如 40.0 表示 40%）。',
        en: 'For each customer, return <strong>total spent</strong> and <strong>their share of overall revenue as a percentage</strong>. Three columns: <code>customer</code>, <code>spent</code>, <code>pct</code> (e.g. 40.0 means 40%).'
      },
      hint: {
        zh: 'SUM(total) * 100.0 / (SELECT SUM(total) FROM orders) AS pct —— 注意 100.0 强制浮点。',
        en: 'SUM(total) * 100.0 / (SELECT SUM(total) FROM orders) AS pct — note <code>100.0</code> forces floating point.'
      },
      starter: { zh: '', en: '' },
      expectedSql: `SELECT customer,
       SUM(total) AS spent,
       SUM(total) * 100.0 / (SELECT SUM(total) FROM orders) AS pct
FROM orders
GROUP BY customer`,
      checkOrder: false,
    },

    /* ─────────────────────── L31 · 27.7 Safe division (NULLIF) ─── */
    {
      id: 31,
      section: 'main',
      slug: 'practical-nullif',
      title: { zh: 'Part 27.7 · 防止除零（NULLIF）', en: 'Part 27.7 · Avoid division by zero' },
      chapter: { zh: 'SQL 语法大全 · Part 27.7', en: 'SQL syntax guide · Part 27.7' },
      chapterRef: 'sql-syntax-guide-3',
      difficulty: { zh: '中级', en: 'Intermediate' },
      intro: {
        zh: `<p class="lead">SQLite 里整数除以 0 会得到 NULL，而 MySQL 会报错。无论哪种，都会让查询失败或返回意外值。</p>
<p>SQL 标准函数 <strong>NULLIF(a, b)</strong>：当 <code>a = b</code> 时返回 NULL，否则返回 <code>a</code>。除法时用它把 0 换成 NULL，整个表达式就<strong>安全地变 NULL</strong>。</p>
<pre><code>-- 危险写法
returns / sales

-- 安全写法
returns * 1.0 / NULLIF(sales, 0)</code></pre>
<p>结合 <code>COALESCE</code> 还能把 NULL 再换成 0：<code>COALESCE(returns * 1.0 / NULLIF(sales, 0), 0)</code>。</p>`,
        en: `<p class="lead">In SQLite an integer divided by 0 yields NULL; in MySQL it raises an error. Either way the query goes off-rails.</p>
<p>The standard helper <strong>NULLIF(a, b)</strong>: returns NULL when <code>a = b</code>, else <code>a</code>. Wrap the divisor with it — the whole expression <strong>safely becomes NULL</strong> when the divisor is 0.</p>
<pre><code>-- dangerous
returns / sales

-- safe
returns * 1.0 / NULLIF(sales, 0)</code></pre>
<p>Combine with <code>COALESCE</code> to swap NULL out for 0: <code>COALESCE(returns * 1.0 / NULLIF(sales, 0), 0)</code>.</p>`
      },
      tables: ['products'],
      setup: `
        CREATE TABLE products (id INTEGER, name TEXT, sales INTEGER, returns INTEGER);
        INSERT INTO products VALUES (1, 'Pen',       100, 5);
        INSERT INTO products VALUES (2, 'Notebook', 200, 30);
        INSERT INTO products VALUES (3, 'Lamp',       0, 0);
        INSERT INTO products VALUES (4, 'Mug',       50, 10);
        INSERT INTO products VALUES (5, 'Eraser',     0, 2);
      `,
      task: {
        zh: '查出每件商品的<strong>退货率</strong>（<code>returns / sales</code>，<strong>浮点</strong>）。如果 sales 为 0，<strong>不要让查询出错</strong>，让那一行的退货率显示为 NULL。返回两列：<code>name</code>、<code>return_rate</code>。',
        en: 'For each product return its <strong>return rate</strong> (<code>returns / sales</code>, <strong>as a float</strong>). When sales is 0, <strong>do not let the query fail</strong> — show NULL for that row\'s rate. Two columns: <code>name</code>, <code>return_rate</code>.'
      },
      hint: {
        zh: '<code>returns * 1.0 / NULLIF(sales, 0) AS return_rate</code>。',
        en: '<code>returns * 1.0 / NULLIF(sales, 0) AS return_rate</code>.'
      },
      starter: { zh: '', en: '' },
      expectedSql: 'SELECT name, returns * 1.0 / NULLIF(sales, 0) AS return_rate FROM products',
      checkOrder: false,
    },

    /* ─────────────────────── L32 · 27.9 Nth largest ─────────────── */
    {
      id: 32,
      section: 'main',
      slug: 'practical-nth-largest',
      title: { zh: 'Part 27.9 · 取第 N 大的值', en: 'Part 27.9 · The N-th largest value' },
      chapter: { zh: 'SQL 语法大全 · Part 27.9', en: 'SQL syntax guide · Part 27.9' },
      chapterRef: 'sql-syntax-guide-3',
      difficulty: { zh: '中级', en: 'Intermediate' },
      intro: {
        zh: `<p class="lead">「<strong>第 N 大的值</strong>」 —— 比如「第三高的工资」 —— 用 <code>DISTINCT + ORDER BY DESC + LIMIT 1 OFFSET (N-1)</code>。</p>
<pre><code>SELECT DISTINCT salary
FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET 2            -- N=3，所以 OFFSET 是 N-1 = 2</code></pre>
<p><code>DISTINCT</code> 是关键 —— 多人同薪时<strong>只算一档</strong>。</p>
<p>「第 1 大」就是 OFFSET 0 = 等价于 <code>SELECT MAX(salary)</code>；「第 2 大」OFFSET 1；以此类推。</p>`,
        en: `<p class="lead">"<strong>The N-th largest value</strong>" — e.g. "the 3rd highest salary" — uses <code>DISTINCT + ORDER BY DESC + LIMIT 1 OFFSET (N-1)</code>.</p>
<pre><code>SELECT DISTINCT salary
FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET 2            -- N=3, so OFFSET is N-1 = 2</code></pre>
<p>The <code>DISTINCT</code> matters — multiple people on the same salary count as <strong>one tier</strong>.</p>
<p>"1st largest" with OFFSET 0 is equivalent to <code>SELECT MAX(salary)</code>; "2nd" uses OFFSET 1, and so on.</p>`
      },
      tables: ['employees'],
      setup: `
        CREATE TABLE employees (id INTEGER, name TEXT, salary INTEGER);
        INSERT INTO employees VALUES (1, 'Anna',  9000);
        INSERT INTO employees VALUES (2, 'Ben',   7500);
        INSERT INTO employees VALUES (3, 'Cara',  9000);
        INSERT INTO employees VALUES (4, 'Dan',   8200);
        INSERT INTO employees VALUES (5, 'Eli',   7500);
        INSERT INTO employees VALUES (6, 'Fay',   6800);
      `,
      task: {
        zh: '查出<strong>第 3 高的工资</strong>是多少（同薪只算一档）。返回一列：<code>salary</code>，一行结果。',
        en: 'Return the <strong>3rd highest salary</strong> (people on the same salary count as one tier). One column: <code>salary</code>, one row.'
      },
      hint: {
        zh: '<code>SELECT DISTINCT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 2</code>。',
        en: '<code>SELECT DISTINCT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 2</code>.'
      },
      starter: { zh: '', en: '' },
      expectedSql: 'SELECT DISTINCT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 2',
      checkOrder: false,
    },

    /* ════════════════════════ FINAL CHALLENGES (L33-L42) ════════════════════════
       Eight tables (branches, members, memberships, authors, books, copies,
       loans, reviews) describe a small library network. Every challenge runs
       on the same data — what changes is the question, not the schema. */

    /* ─── C1 (L33) · Per-branch copy count, including 0 ───────── */
    {
      id: 33,
      section: 'final',
      slug: 'final-copies-per-branch',
      title: { zh: '挑战 1 · 每个分馆的藏书副本数（含 0）', en: 'Challenge 1 · Copies per branch (including zero)' },
      chapter: { zh: '综合挑战 · LEFT JOIN + GROUP BY', en: 'Final challenge · LEFT JOIN + GROUP BY' },
      difficulty: { zh: '进阶', en: 'Advanced' },
      intro: {
        zh: `<p class="lead">综合大题登场。这一关的关键：<strong>没有副本的分馆也要出现</strong>，数量为 0。</p>
<p>这是大学课程作业里最常见的一类题：「每个 X 的 Y 数，包括 Y=0 的 X」。INNER JOIN 会丢掉空分馆 —— 必须用 <strong>LEFT JOIN</strong>。</p>
<p>另一个细节：用 <code>COUNT(c.id)</code> 而不是 <code>COUNT(*)</code>。LEFT JOIN 时空分馆会得到一行 <code>copies</code> 全为 NULL —— <code>COUNT(c.id)</code> 不会数 NULL，所以正确返回 0；<code>COUNT(*)</code> 会数那一行，错误返回 1。</p>`,
        en: `<p class="lead">Final challenges start here. The trick: <strong>branches with no copies must still appear</strong> with a 0.</p>
<p>The classic university-assignment shape: "for every X, the count of Y, including X with no Y". INNER JOIN drops the empty branches — you need <strong>LEFT JOIN</strong>.</p>
<p>Bonus subtlety: use <code>COUNT(c.id)</code>, not <code>COUNT(*)</code>. After LEFT JOIN an empty branch produces one row whose <code>copies</code> columns are all NULL — <code>COUNT(c.id)</code> ignores NULL and gives 0; <code>COUNT(*)</code> counts that row and wrongly gives 1.</p>`
      },
      tables: ['branches', 'copies'],
      setup: FINAL_SCHEMA,
      task: {
        zh: '查出<strong>每个分馆</strong>的 <code>id</code> 和该分馆<strong>藏书副本（copies 表）的数量</strong>。<strong>没有副本的分馆也要出现</strong>，数量为 0。返回两列：<code>branch_id</code>、<code>copy_count</code>。',
        en: 'For <strong>every branch</strong>, return its <code>id</code> and the <strong>number of book copies based at it</strong>. <strong>Empty branches must appear</strong> with 0. Two columns: <code>branch_id</code>, <code>copy_count</code>.'
      },
      hint: {
        zh: '从 branches 出发 LEFT JOIN copies；GROUP BY 分馆 id；用 <code>COUNT(c.id)</code> 而不是 <code>COUNT(*)</code>。',
        en: 'Start from branches, LEFT JOIN copies; GROUP BY branch id; use <code>COUNT(c.id)</code>, not <code>COUNT(*)</code>.'
      },
      starter: { zh: '', en: '' },
      expectedSql: `SELECT br.id AS branch_id, COUNT(c.id) AS copy_count
FROM branches br
LEFT JOIN copies c ON c.branch_id = br.id
GROUP BY br.id`,
      checkOrder: false,
    },

    /* ─── C2 (L34) · Active loans but no active membership ───── */
    {
      id: 34,
      section: 'final',
      slug: 'final-active-loan-no-membership',
      title: { zh: '挑战 2 · 在借书但没有有效会员', en: 'Challenge 2 · Active loan, no active membership' },
      chapter: { zh: '综合挑战 · NOT EXISTS / 双重否定', en: 'Final challenge · NOT EXISTS' },
      difficulty: { zh: '进阶', en: 'Advanced' },
      intro: {
        zh: `<p class="lead">两条独立条件求交集，其中一条是<strong>否定</strong>。</p>
<p>「<strong>有 X，没 Y</strong>」 这种题型的标准写法：</p>
<pre><code>WHERE EXISTS (有 X 的子查询)
  AND NOT EXISTS (有 Y 的子查询)</code></pre>
<p>「有效会员」定义：在 memberships 表里存在一条记录，其 <code>end_date IS NULL</code>（永久）或 <code>end_date &gt; DATE('now')</code>（未来到期）。</p>
<p>「在借书」定义：loans 里 <code>return_date IS NULL</code>。</p>
<blockquote>SQLite 用 <code>DATE('now')</code> 取当天日期。</blockquote>`,
        en: `<p class="lead">Intersection of two independent predicates — one of which is a <strong>negation</strong>.</p>
<p>The classic shape "<strong>has X but not Y</strong>" is:</p>
<pre><code>WHERE EXISTS (subquery for X)
  AND NOT EXISTS (subquery for Y)</code></pre>
<p>"Active membership" = a row in <code>memberships</code> where <code>end_date IS NULL</code> (perpetual) or <code>end_date &gt; DATE('now')</code> (still in the future).</p>
<p>"Currently borrowing" = a <code>loans</code> row with <code>return_date IS NULL</code>.</p>
<blockquote>SQLite gives today's date with <code>DATE('now')</code>.</blockquote>`
      },
      tables: ['members', 'memberships', 'loans'],
      setup: FINAL_SCHEMA,
      task: {
        zh: '查出<strong>当前有未归还借阅</strong>但<strong>没有任何有效会员资格</strong>的会员。返回两列：<code>member_id</code> 和 <code>active_loans</code>（该会员当前未归还的借阅数）。',
        en: 'Find members who <strong>currently have at least one unreturned loan</strong> but <strong>have no active membership</strong>. Return two columns: <code>member_id</code> and <code>active_loans</code> (count of unreturned loans for that member).'
      },
      hint: {
        zh: 'JOIN loans 限定 return_date IS NULL；NOT EXISTS 检查 memberships 里 end_date 是 NULL 或 &gt; DATE(\'now\')；GROUP BY 会员 id。',
        en: 'JOIN loans with return_date IS NULL; NOT EXISTS for any membership row whose end_date is NULL or > DATE(\'now\'); GROUP BY member id.'
      },
      starter: { zh: '', en: '' },
      expectedSql: `SELECT m.id AS member_id, COUNT(l.id) AS active_loans
FROM members m
JOIN loans l ON l.member_id = m.id AND l.return_date IS NULL
WHERE NOT EXISTS (
  SELECT 1 FROM memberships ms
  WHERE ms.member_id = m.id
    AND (ms.end_date IS NULL OR ms.end_date > DATE('now'))
)
GROUP BY m.id`,
      checkOrder: false,
    },

    /* ─── C3 (L35) · Genre fans (>3 distinct books in same genre) */
    {
      id: 35,
      section: 'final',
      slug: 'final-genre-fans',
      title: { zh: '挑战 3 · 类型迷（同类型 &gt; 3 本）', en: 'Challenge 3 · Genre fans (> 3 distinct books)' },
      chapter: { zh: '综合挑战 · GROUP BY 多键 + HAVING', en: 'Final challenge · GROUP BY multi-key + HAVING' },
      difficulty: { zh: '进阶', en: 'Advanced' },
      intro: {
        zh: `<p class="lead">「在某个分类里达到一定数量」 的题型 —— GROUP BY 多个键 + HAVING。</p>
<p>核心思路：按 <code>(member_id, genre)</code> 双键分组，每组用 <code>COUNT(DISTINCT book_id)</code> 数<strong>不重复的书</strong>（同一本书借多次只算 1 本）。HAVING 过滤组。</p>
<p>注意「<strong>多于 3 本</strong>」是<strong>严格大于</strong>，所以条件是 <code>&gt; 3</code>，不是 <code>&gt;= 3</code>。</p>
<p>同一会员可能在多个 genre 都达标 —— 那他就有<strong>多行</strong>结果。</p>`,
        en: `<p class="lead">"Reaches a threshold within a category" — GROUP BY two keys, then HAVING.</p>
<p>The pattern: group by <code>(member_id, genre)</code>, count <code>DISTINCT book_id</code> per group (the same book borrowed twice still counts as 1). HAVING filters the groups.</p>
<p>"<strong>More than 3</strong>" is <strong>strict</strong>: <code>&gt; 3</code>, not <code>&gt;= 3</code>.</p>
<p>One member may qualify in multiple genres → multiple rows for that member.</p>`
      },
      tables: ['members', 'books', 'copies', 'loans'],
      setup: FINAL_SCHEMA,
      task: {
        zh: '一个会员被称为「<strong>类型迷</strong>」，如果他在<strong>同一个 genre</strong> 里借过<strong>多于 3 本</strong>不重复的书。列出每个类型迷以及他在那个 genre 里的<strong>总借阅次数</strong>（含重复）。如果一个人在多个 genre 都达标，每个 genre 单独一行。返回三列：<code>member_id</code>、<code>genre</code>、<code>total_loans</code>。',
        en: 'A member is a <strong>genre fan</strong> if they have borrowed <strong>more than 3 distinct books in the same genre</strong>. List every genre fan with their <strong>total loan count in that genre</strong> (counting repeats). One row per (member, genre) qualifying pair. Three columns: <code>member_id</code>, <code>genre</code>, <code>total_loans</code>.'
      },
      hint: {
        zh: 'GROUP BY l.member_id, b.genre；HAVING COUNT(DISTINCT b.id) &gt; 3；SELECT 里 <code>COUNT(*) AS total_loans</code>。',
        en: 'GROUP BY l.member_id, b.genre; HAVING COUNT(DISTINCT b.id) > 3; SELECT <code>COUNT(*) AS total_loans</code>.'
      },
      starter: { zh: '', en: '' },
      expectedSql: `SELECT l.member_id, b.genre, COUNT(*) AS total_loans
FROM loans l
JOIN copies c ON c.id = l.copy_id
JOIN books b  ON b.id = c.book_id
GROUP BY l.member_id, b.genre
HAVING COUNT(DISTINCT b.id) > 3`,
      checkOrder: false,
    },

    /* ─── C4 (L36) · Top 3 by distinct authors borrowed, with ties */
    {
      id: 36,
      section: 'final',
      slug: 'final-top-readers-ties',
      title: { zh: '挑战 4 · 阅读最多作者的前 3 名（含并列）', en: 'Challenge 4 · Top 3 by distinct authors (with ties)' },
      chapter: { zh: '综合挑战 · 含并列的 Top-N', en: 'Final challenge · Top-N with ties' },
      difficulty: { zh: '进阶', en: 'Advanced' },
      intro: {
        zh: `<p class="lead">「<strong>含并列</strong>」 是大坑 —— <code>LIMIT 3</code> 会粗暴砍掉并列的人。</p>
<p>正确思路：<strong>找到第 3 大的「不重复」计数</strong>，再用 HAVING 把所有 ≥ 这个值的人都返回。</p>
<pre><code>HAVING COUNT(DISTINCT ...) &gt;= (
  /* 第 3 大的不重复计数 */
  SELECT da FROM (
    SELECT DISTINCT COUNT(DISTINCT ...) AS da
    FROM ... GROUP BY ...
    ORDER BY da DESC
  )
  LIMIT 1 OFFSET 2
)</code></pre>
<p>如果第 1、2、3 名分别是 7、4、4，<strong>不重复</strong>的计数是 {7, 4}，第 3 大不存在 —— 所以这一题<strong>题目假定至少 3 个不同的计数值</strong>。</p>
<blockquote>这道题对应 PDF 第 7 题。</blockquote>`,
        en: `<p class="lead">"<strong>Including ties</strong>" is the trap — <code>LIMIT 3</code> blindly cuts off tied rows.</p>
<p>Correct approach: <strong>find the third-largest distinct count</strong>, then HAVING ≥ that value.</p>
<pre><code>HAVING COUNT(DISTINCT ...) &gt;= (
  /* 3rd-largest distinct count */
  SELECT da FROM (
    SELECT DISTINCT COUNT(DISTINCT ...) AS da
    FROM ... GROUP BY ...
    ORDER BY da DESC
  )
  LIMIT 1 OFFSET 2
)</code></pre>
<p>This question maps directly to PDF Q7.</p>`
      },
      tables: ['members', 'books', 'copies', 'loans'],
      setup: FINAL_SCHEMA,
      task: {
        zh: '查出<strong>借阅作者数最多的前 3 名</strong>会员，<strong>含并列</strong>。如果有人在<strong>第 N 名</strong>并列，所有并列的人都要返回。返回两列：<code>member_id</code>、<code>distinct_authors</code>。',
        en: 'Return the <strong>top 3 members by number of distinct authors</strong> they have borrowed. <strong>Include ties</strong> at any rank. Two columns: <code>member_id</code>, <code>distinct_authors</code>.'
      },
      hint: {
        zh: '主查询 GROUP BY member_id，HAVING 的右边是「第 3 大的不重复计数」—— 通过子查询里 SELECT DISTINCT count + ORDER BY DESC + LIMIT 1 OFFSET 2 拿到。',
        en: 'Main query: GROUP BY member_id. The HAVING threshold is the "3rd-largest distinct count" — get it via SELECT DISTINCT count + ORDER BY DESC + LIMIT 1 OFFSET 2.'
      },
      starter: { zh: '', en: '' },
      expectedSql: `SELECT m.id AS member_id, COUNT(DISTINCT b.author_id) AS distinct_authors
FROM members m
JOIN loans l  ON l.member_id = m.id
JOIN copies c ON c.id = l.copy_id
JOIN books b  ON b.id = c.book_id
GROUP BY m.id
HAVING COUNT(DISTINCT b.author_id) >= (
  SELECT da FROM (
    SELECT DISTINCT COUNT(DISTINCT b2.author_id) AS da
    FROM members m2
    JOIN loans l2  ON l2.member_id = m2.id
    JOIN copies c2 ON c2.id = l2.copy_id
    JOIN books b2  ON b2.id = c2.book_id
    GROUP BY m2.id
    ORDER BY da DESC
  )
  LIMIT 1 OFFSET 2
)`,
      checkOrder: false,
    },

    /* ─── C5 (L37) · Per-branch top genre, with empty-branch + ties */
    {
      id: 37,
      section: 'final',
      slug: 'final-per-branch-top-genre',
      title: { zh: '挑战 5 · 每个分馆借阅最多的类型', en: 'Challenge 5 · Top-loaned genre per branch' },
      chapter: { zh: '综合挑战 · 分组内最大值 + 含 0 + 并列', en: 'Final challenge · per-group max + zeros + ties' },
      difficulty: { zh: '进阶', en: 'Advanced' },
      intro: {
        zh: `<p class="lead">三个难点叠加：</p>
<ol>
  <li><strong>每组的最大值那一行</strong> —— 把聚合结果当派生表，再用相关子查询比对组内最大值</li>
  <li><strong>没有借阅记录的分馆也要出现</strong>（NULL genre + 0 计数）—— LEFT JOIN 链路全开</li>
  <li><strong>并列要全保留</strong> —— 用 <code>n = MAX(...)</code> 而不是 <code>LIMIT 1</code></li>
</ol>
<blockquote>这道题对应 PDF 第 8 题（每个 site 的 endangered species）。</blockquote>`,
        en: `<p class="lead">Three classic difficulties at once:</p>
<ol>
  <li><strong>The row(s) holding the per-group maximum</strong> — build the aggregates as a derived table, then correlate to its own per-group max</li>
  <li><strong>Branches with zero loans must appear</strong> (NULL genre, 0 count) — chain LEFT JOINs all the way</li>
  <li><strong>Ties stay</strong> — use <code>n = MAX(...)</code>, not <code>LIMIT 1</code></li>
</ol>
<blockquote>This maps to PDF Q8 (most-observed endangered species per site).</blockquote>`
      },
      tables: ['branches', 'copies', 'books', 'loans'],
      setup: FINAL_SCHEMA,
      task: {
        zh: '每个分馆<strong>被借阅最多的 genre</strong> 是哪个？返回三列：<code>branch_id</code>、<code>genre</code>、<code>n</code>（该分馆该 genre 的借阅次数）。<strong>没有任何借阅</strong>的分馆也要出现 —— 此时 genre 为 NULL，<code>n</code> 为 0。<strong>并列</strong>时该分馆下每个并列 genre 各一行。',
        en: 'For each branch, find the <strong>genre that has been loaned the most times</strong> from copies based at that branch. Three columns: <code>branch_id</code>, <code>genre</code>, <code>n</code>. Branches with <strong>no loans at all</strong> must still appear, with NULL genre and 0 count. If multiple genres tie for the top, return one row for each tied genre.'
      },
      hint: {
        zh: '把「每分馆每 genre 的借阅数」算出来当派生表（用 LEFT JOIN 让空分馆产生一行 genre=NULL, n=0），然后 WHERE n = (SELECT MAX(n2) FROM 同一派生表 WHERE branch_id = …)。',
        en: 'Build a derived table of (branch_id, genre, n) using LEFT JOIN copies/loans/books so empty branches yield (NULL, 0). Then WHERE n = (SELECT MAX(n2) FROM same-derived-table WHERE branch_id = …).'
      },
      starter: { zh: '', en: '' },
      expectedSql: `SELECT gc.branch_id, gc.genre, gc.n
FROM (
  SELECT br.id AS branch_id, b.genre, COUNT(l.id) AS n
  FROM branches br
  LEFT JOIN copies c ON c.branch_id = br.id
  LEFT JOIN loans  l ON l.copy_id   = c.id
  LEFT JOIN books  b ON b.id        = c.book_id
  GROUP BY br.id, b.genre
) AS gc
WHERE gc.n = (
  SELECT MAX(gc2.n)
  FROM (
    SELECT br.id AS branch_id, b.genre, COUNT(l.id) AS n
    FROM branches br
    LEFT JOIN copies c ON c.branch_id = br.id
    LEFT JOIN loans  l ON l.copy_id   = c.id
    LEFT JOIN books  b ON b.id        = c.book_id
    GROUP BY br.id, b.genre
  ) AS gc2
  WHERE gc2.branch_id = gc.branch_id
)`,
      checkOrder: false,
    },

    /* ─── C6 (L38) · Members who reviewed every borrowed book ──── */
    {
      id: 38,
      section: 'final',
      slug: 'final-review-every-borrowed',
      title: { zh: '挑战 6 · 每借必评的读者', en: 'Challenge 6 · Reviewed every book borrowed' },
      chapter: { zh: '综合挑战 · 全称量词（双重否定）', en: 'Final challenge · universal quantifier' },
      difficulty: { zh: '进阶', en: 'Advanced' },
      intro: {
        zh: `<p class="lead">「<strong>对所有 X 都满足 P</strong>」是关系代数里的<strong>除法</strong>，SQL 没有专门语法 —— 用<strong>双重否定</strong> 表达：</p>
<blockquote>「<strong>每一本</strong>都评过」 ≡ 「<strong>不存在</strong>一本是没评过的」</blockquote>
<pre><code>WHERE NOT EXISTS (
  SELECT 1 FROM 借阅 l
  WHERE l.member_id = m.id
    AND NOT EXISTS (SELECT 1 FROM 评价 r WHERE r.member_id = m.id AND r.book_id = l.book_id)
)</code></pre>
<p>另外要注意：<strong>没借过任何书</strong>的会员被「空集为真」逻辑包进来 —— 题目要求<strong>排除</strong>他们，所以加个 JOIN loans + GROUP BY 强制要求至少一条借阅。</p>
<blockquote>对应 PDF 第 9 题的核心思路。</blockquote>`,
        en: `<p class="lead">"<strong>For every X, P holds</strong>" is relational <strong>division</strong> — SQL has no native syntax, so we use a <strong>double negation</strong>:</p>
<blockquote>"reviewed <strong>every</strong> borrowed book" ≡ "there is <strong>no</strong> borrowed book that was not reviewed"</blockquote>
<pre><code>WHERE NOT EXISTS (
  SELECT 1 FROM loans l
  WHERE l.member_id = m.id
    AND NOT EXISTS (SELECT 1 FROM reviews r WHERE r.member_id = m.id AND r.book_id = l.book_id)
)</code></pre>
<p>Watch out: members with <strong>no loans at all</strong> trivially satisfy "for every loan…" — the spec says <strong>exclude them</strong>, so add a JOIN loans + GROUP BY to force at least one borrow.</p>
<blockquote>The core trick from PDF Q9.</blockquote>`
      },
      tables: ['members', 'loans', 'copies', 'books', 'reviews'],
      setup: FINAL_SCHEMA,
      task: {
        zh: '查出<strong>对自己借过的每一本书都写过评价</strong>的会员（同一本书借多次只算一本）。<strong>排除</strong>没借过任何书的会员。返回两列：<code>member_id</code>、<code>borrowed_count</code>（该会员借过的不重复书的数量）。',
        en: 'Find members who have <strong>written a review for every distinct book they have borrowed</strong>. <strong>Exclude</strong> members who have not borrowed anything. Two columns: <code>member_id</code>, <code>borrowed_count</code> (distinct books borrowed).'
      },
      hint: {
        zh: '主查询 JOIN loans 强制至少一次借阅；WHERE NOT EXISTS 包一个 NOT EXISTS（双重否定）。',
        en: 'Main query JOINs loans (forces ≥ 1 borrow); WHERE NOT EXISTS wrapping a NOT EXISTS (double negation).'
      },
      starter: { zh: '', en: '' },
      expectedSql: `SELECT m.id AS member_id, COUNT(DISTINCT b.id) AS borrowed_count
FROM members m
JOIN loans l  ON l.member_id = m.id
JOIN copies c ON c.id = l.copy_id
JOIN books b  ON b.id = c.book_id
WHERE NOT EXISTS (
  SELECT 1
  FROM loans l2
  JOIN copies c2 ON c2.id = l2.copy_id
  JOIN books b2  ON b2.id = c2.book_id
  WHERE l2.member_id = m.id
    AND NOT EXISTS (
      SELECT 1 FROM reviews r
      WHERE r.member_id = m.id AND r.book_id = b2.id
    )
)
GROUP BY m.id`,
      checkOrder: false,
    },

    /* ─── C7 (L39) · Avg fine per loan, NULL for no-loan members ── */
    {
      id: 39,
      section: 'final',
      slug: 'final-avg-fine-per-loan',
      title: { zh: '挑战 7 · 每位会员每笔借阅的平均罚金', en: 'Challenge 7 · Average fine per loan, per member' },
      chapter: { zh: '综合挑战 · LEFT JOIN + COALESCE + CASE 防除零', en: 'Final challenge · LEFT JOIN + COALESCE + safe division' },
      difficulty: { zh: '进阶', en: 'Advanced' },
      intro: {
        zh: `<p class="lead">每位会员的<strong>总罚金 ÷ 借阅笔数</strong>。三种边界要全部正确处理：</p>
<ul>
  <li><strong>没借过任何书</strong>的会员 → 结果 NULL（不能除 0）</li>
  <li>借过但<strong>从没罚款</strong> → 结果 0（SUM 在全 NULL 时返回 NULL，要 COALESCE 成 0）</li>
  <li>正常情况 → 浮点除法（乘 1.0 强制转成 REAL，否则 SQLite 会做整数除法）</li>
</ul>
<pre><code>CASE WHEN COUNT(l.id) = 0 THEN NULL
     ELSE COALESCE(SUM(l.fine), 0) * 1.0 / COUNT(l.id)
END</code></pre>
<blockquote>对应 PDF 第 10 题（funding ÷ observations）。</blockquote>`,
        en: `<p class="lead">Per member: <strong>total fine ÷ number of loans</strong>. Three boundary cases:</p>
<ul>
  <li>Member with <strong>no loans</strong> → NULL (can't divide by zero)</li>
  <li>Has loans but <strong>no fines ever</strong> → 0 (SUM returns NULL when all values are NULL — wrap with COALESCE)</li>
  <li>Normal case → float division (multiply by <code>1.0</code> to force REAL; SQLite does integer division otherwise)</li>
</ul>
<pre><code>CASE WHEN COUNT(l.id) = 0 THEN NULL
     ELSE COALESCE(SUM(l.fine), 0) * 1.0 / COUNT(l.id)
END</code></pre>
<blockquote>This mirrors PDF Q10 (funding ÷ observations).</blockquote>`
      },
      tables: ['members', 'loans'],
      setup: FINAL_SCHEMA,
      task: {
        zh: '<strong>所有会员都要出现</strong>。对每位会员，返回其 <code>id</code> 和「<strong>平均每笔借阅的罚金</strong>」（总罚金 ÷ 借阅笔数）。<strong>没借过书</strong>的会员该值为 NULL；<strong>借过但 fine 全为 NULL/0</strong> 的会员该值为 0。<strong>不要四舍五入</strong>。',
        en: '<strong>Include every member</strong>. For each, return <code>id</code> and the <strong>average fine per loan</strong> (total fine ÷ loans). Members with <strong>no loans</strong> get NULL; members with loans but no recorded fines get 0. <strong>Do not round.</strong>'
      },
      hint: {
        zh: 'LEFT JOIN loans + GROUP BY member.id；CASE WHEN COUNT(l.id) = 0 THEN NULL ELSE COALESCE(SUM(l.fine),0) * 1.0 / COUNT(l.id) END。',
        en: 'LEFT JOIN loans + GROUP BY member.id; wrap in CASE WHEN COUNT(l.id) = 0 THEN NULL ELSE COALESCE(SUM(l.fine),0) * 1.0 / COUNT(l.id) END.'
      },
      starter: { zh: '', en: '' },
      expectedSql: `SELECT m.id,
  CASE WHEN COUNT(l.id) = 0 THEN NULL
       ELSE COALESCE(SUM(l.fine), 0) * 1.0 / COUNT(l.id)
  END AS avg_fine_per_loan
FROM members m
LEFT JOIN loans l ON l.member_id = m.id
GROUP BY m.id`,
      checkOrder: false,
    },

    /* ─── C8 (L40) · Books popular AND well-rated ─── */
    {
      id: 40,
      section: 'final',
      slug: 'final-popular-and-rated',
      title: { zh: '挑战 8 · 既受欢迎又口碑好的书', en: 'Challenge 8 · Popular AND well-rated books' },
      chapter: { zh: '综合挑战 · 标量子查询并列条件', en: 'Final challenge · parallel scalar subqueries' },
      difficulty: { zh: '进阶', en: 'Advanced' },
      intro: {
        zh: `<p class="lead">两个独立指标都要满足：「借阅次数 ≥ N」<strong>且</strong>「平均评分 ≥ M」。</p>
<p>用 <strong>JOIN + GROUP BY + DISTINCT</strong> 容易踩「笛卡尔积让 AVG 失真」的坑（评价记录被借阅笛卡尔重复一次，AVG 仍正确，但 COUNT 会被放大）。</p>
<p>更稳妥：<strong>每个指标用一个独立的标量子查询</strong>，主查询从 books 出发，分别投影。</p>`,
        en: `<p class="lead">Two independent metrics, both required: "loaned ≥ N times" <strong>AND</strong> "average rating ≥ M".</p>
<p>JOIN + GROUP BY easily hits the "cartesian product inflates COUNT" pitfall when the same book has many loans <em>and</em> many reviews.</p>
<p>Cleaner: <strong>compute each metric in its own scalar subquery</strong>, main query iterates over books.</p>`
      },
      tables: ['books', 'copies', 'loans', 'reviews'],
      setup: FINAL_SCHEMA,
      task: {
        zh: '查出<strong>被借阅至少 4 次</strong> 且 <strong>评价平均分 &ge; 4.0</strong> 的书。返回四列：<code>id</code>、<code>title</code>、<code>loan_count</code>、<code>avg_rating</code>。',
        en: 'Find books with <strong>≥ 4 total loans</strong> AND <strong>average rating ≥ 4.0</strong>. Four columns: <code>id</code>, <code>title</code>, <code>loan_count</code>, <code>avg_rating</code>.'
      },
      hint: {
        zh: '主查询 FROM books；两个标量子查询：一个数 loans（JOIN copies），一个 AVG(rating)；WHERE 用同样的两个表达式。',
        en: 'Main query FROM books; two scalar subqueries — one COUNT over loans/copies, one AVG(rating); WHERE repeats both with thresholds.'
      },
      starter: { zh: '', en: '' },
      expectedSql: `SELECT b.id, b.title,
  (SELECT COUNT(*) FROM loans l JOIN copies c ON c.id = l.copy_id WHERE c.book_id = b.id) AS loan_count,
  (SELECT AVG(r.rating) FROM reviews r WHERE r.book_id = b.id) AS avg_rating
FROM books b
WHERE (SELECT COUNT(*) FROM loans l JOIN copies c ON c.id = l.copy_id WHERE c.book_id = b.id) >= 4
  AND (SELECT AVG(r.rating) FROM reviews r WHERE r.book_id = b.id) >= 4.0`,
      checkOrder: false,
    },

    /* ─── C9 (L41) · Per-member top genre with ties ─── */
    {
      id: 41,
      section: 'final',
      slug: 'final-per-member-top-genre',
      title: { zh: '挑战 9 · 每位会员最常借阅的类型', en: 'Challenge 9 · Each member\'s favourite genre' },
      chapter: { zh: '综合挑战 · 分组内最大值 + 并列', en: 'Final challenge · per-group max + ties' },
      difficulty: { zh: '进阶', en: 'Advanced' },
      intro: {
        zh: `<p class="lead">和挑战 5 同形 —— 但<strong>分组主体换成会员</strong>，且<strong>没借过书的会员被排除</strong>。</p>
<p>所以这一次<strong>不需要</strong> LEFT JOIN（不需要 0 行），用 INNER JOIN + GROUP BY 即可。</p>
<p><strong>并列保留</strong>的写法仍然是相关子查询比 MAX。</p>`,
        en: `<p class="lead">Same shape as Challenge 5 — but <strong>grouped by member</strong>, and members with no loans are <strong>excluded</strong>.</p>
<p>So this time <strong>no LEFT JOIN needed</strong> (no zero rows): plain INNER JOIN + GROUP BY suffices.</p>
<p><strong>Ties</strong> are still preserved by correlating to MAX inside the per-group derived table.</p>`
      },
      tables: ['members', 'loans', 'copies', 'books'],
      setup: FINAL_SCHEMA,
      task: {
        zh: '对<strong>每位有借阅记录的会员</strong>，找出他<strong>借阅次数最多</strong>的 genre。如果该会员在多个 genre 上并列最多，<strong>每个并列 genre 一行</strong>。返回三列：<code>member_id</code>、<code>genre</code>、<code>n</code>。',
        en: 'For <strong>every member who has borrowed at least once</strong>, find the genre they have <strong>loaned most often</strong>. If multiple genres tie at the top for that member, return <strong>one row per tied genre</strong>. Three columns: <code>member_id</code>, <code>genre</code>, <code>n</code>.'
      },
      hint: {
        zh: '派生表 (member_id, genre, n) 来自 GROUP BY 双键；外层 WHERE n = (SELECT MAX(n2) FROM 同派生表 WHERE member_id 相同)。',
        en: 'Derived table of (member_id, genre, n) via GROUP BY two keys; outer WHERE n = (SELECT MAX(n2) FROM same derived table WHERE same member_id).'
      },
      starter: { zh: '', en: '' },
      expectedSql: `SELECT mg.member_id, mg.genre, mg.n
FROM (
  SELECT l.member_id, b.genre, COUNT(*) AS n
  FROM loans l
  JOIN copies c ON c.id = l.copy_id
  JOIN books b  ON b.id = c.book_id
  GROUP BY l.member_id, b.genre
) AS mg
WHERE mg.n = (
  SELECT MAX(n2)
  FROM (
    SELECT l.member_id AS mid, b.genre, COUNT(*) AS n2
    FROM loans l
    JOIN copies c ON c.id = l.copy_id
    JOIN books b  ON b.id = c.book_id
    GROUP BY l.member_id, b.genre
  ) AS mg2
  WHERE mg2.mid = mg.member_id
)`,
      checkOrder: false,
    },

    /* ─── C10 (L42) · Authors with global reach ─── */
    {
      id: 42,
      section: 'final',
      slug: 'final-global-authors',
      title: { zh: '挑战 10 · 国际化的作者', en: 'Challenge 10 · Authors with global reach' },
      chapter: { zh: '综合挑战 · 跨 5 张表 + COUNT(DISTINCT)', en: 'Final challenge · 5-table chain + COUNT(DISTINCT)' },
      difficulty: { zh: '进阶', en: 'Advanced' },
      intro: {
        zh: `<p class="lead">综合大题最后一关 —— 链上五张表，HAVING 里用 <code>COUNT(DISTINCT)</code> 做去重计数。</p>
<p>路径：<code>authors → books → copies → loans → members</code>，从 author 一路连到借阅这本书的会员，最后看会员的 <code>country</code>。</p>
<p>同一作者可能写过多本书、每本被多人借过 —— <strong>笛卡尔积会让同一个国家被数多次</strong>，必须用 <code>COUNT(DISTINCT m.country)</code>，不能用 <code>COUNT(*)</code>。</p>`,
        en: `<p class="lead">The final synthesis — five-table JOIN chain, HAVING with <code>COUNT(DISTINCT)</code>.</p>
<p>The path: <code>authors → books → copies → loans → members</code>. Land on the borrowing member, look at their <code>country</code>.</p>
<p>One author can have many books, each loaned by many members — the <strong>Cartesian explosion will count the same country many times</strong> unless you use <code>COUNT(DISTINCT m.country)</code>, never <code>COUNT(*)</code>.</p>`
      },
      tables: ['authors', 'books', 'copies', 'loans', 'members'],
      setup: FINAL_SCHEMA,
      task: {
        zh: '查出<strong>书被来自至少 3 个不同国家的会员借阅</strong>过的作者。返回三列：<code>id</code>、<code>name</code>、<code>distinct_countries</code>（该作者的书的借阅人来自的不同国家数）。',
        en: 'Find every author whose books have been <strong>borrowed by members from at least 3 distinct countries</strong>. Three columns: <code>id</code>, <code>name</code>, <code>distinct_countries</code>.'
      },
      hint: {
        zh: '5 表 JOIN 串联 + GROUP BY a.id, a.name + HAVING COUNT(DISTINCT m.country) &gt;= 3。',
        en: 'Chain all 5 tables with JOINs, GROUP BY a.id, a.name, HAVING COUNT(DISTINCT m.country) >= 3.'
      },
      starter: { zh: '', en: '' },
      expectedSql: `SELECT a.id, a.name, COUNT(DISTINCT m.country) AS distinct_countries
FROM authors a
JOIN books b   ON b.author_id = a.id
JOIN copies c  ON c.book_id   = b.id
JOIN loans l   ON l.copy_id   = c.id
JOIN members m ON m.id        = l.member_id
GROUP BY a.id, a.name
HAVING COUNT(DISTINCT m.country) >= 3`,
      checkOrder: false,
    },

  ]
};
