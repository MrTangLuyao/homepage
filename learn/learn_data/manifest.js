/* learn/learn_data/manifest.js — index of available courses on louie.learn */

window.__LEARN_MANIFEST = {
  version: 1,
  updated: '2026-05-02',
  courses: [
    {
      slug: 'sql',
      icon: 'SQL',
      title: { zh: 'SQL 基本语法', en: 'SQL · Core Syntax' },
      desc: {
        zh: '学习 SQL 的基本查询语句',
        en: 'Learn the fundamentals of SQL queries',
      },
      level: { zh: '入门', en: 'Beginner' },
      lessonsCount: 42,
      coming: false,
    },
    {
      slug: 'python',
      icon: 'Python',
      title: { zh: 'Python 基础语法 (Beta)', en: 'Python Core Syntax (Beta)' },
      desc: {
        zh: '早期测试，可能包含大量未知错误。',
        en: 'Early access. May contain many unknown bugs.',
      },
      level: { zh: '入门', en: 'Beginner' },
      lessonsCount: 68,
      coming: false,
    },
    {
      slug: 'c',
      icon: 'C',
      title: { zh: 'C 语言基础语法', en: 'C · Core Syntax' },
      desc: {
        zh: '开发中，敬请期待。',
        en: 'Under development. Coming soon.',
      },
      level: { zh: '入门', en: 'Beginner' },
      lessonsCount: 1,
      coming: true,
    },
  ]
};
