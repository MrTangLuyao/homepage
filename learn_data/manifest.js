/* learn_data/manifest.js — index of available courses on louie.learn */

window.__LEARN_MANIFEST = {
  version: 1,
  updated: '2026-05-02',
  courses: [
    {
      slug: 'sql',
      icon: 'SQL',
      title: { zh: 'SQL 基本语法', en: 'SQL · Core Syntax' },
      desc: {
        zh: '从 SELECT、WHERE 到 JOIN、子查询和综合大题。每一关写一句查询过关。',
        en: 'From SELECT and WHERE to JOINs, subqueries, and full-database challenges. One query per level.'
      },
      level: { zh: '入门 → 进阶', en: 'Beginner → Advanced' },
      lessonsCount: 42,
      coming: false,
    },
    {
      slug: 'c',
      icon: 'C',
      title: { zh: 'C 语言基础语法', en: 'C · Core Syntax' },
      desc: {
        zh: '从指针、数组到结构体与文件 IO。每一关一个真实代码挑战。',
        en: 'Pointers, arrays, structs, and file IO. Real coding puzzles, one per level.'
      },
      level: { zh: '入门', en: 'Beginner' },
      coming: true,
    },
  ]
};
