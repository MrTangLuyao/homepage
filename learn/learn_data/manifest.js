/* learn/learn_data/manifest.js — index of available courses on louie.learn */

window.__LEARN_MANIFEST = {
  version: 1,
  updated: '2026-05-08',
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
        zh: '早期测试，可能包含未知错误。',
        en: 'Early access. May contain unknown bugs.',
      },
      level: { zh: '入门', en: 'Beginner' },
      lessonsCount: 68,
      coming: false,
    },
    {
      slug: 'c',
      icon: 'C',
      family: 'c',                  // route() gates on this; future C++ courses also family:'c'
      title: { zh: 'C 语言基础语法 (Beta)', en: 'C · Core Syntax (Beta)' },
      desc: {
        zh: '早期测试，可能包含错误。',
        en: 'Early access. May contain bugs.',
      },
      level: { zh: '入门', en: 'Beginner' },
      lessonsCount: 44,
      coming: false,
    },
    {
      slug: 'c-algo',
      icon: { zh: 'C 算法', en: 'C Algo' },
      family: 'c',                  // shares the C compiler runtime modal
      title: { zh: 'C 算法入门 (Beta)', en: 'C Algorithms (Beta)' },
      desc: {
        zh: '早期测试，可能包含错误。',
        en: 'Early access. May contain bugs.',
      },
      level: { zh: '进阶', en: 'Intermediate' },
      lessonsCount: 25,
      coming: false,
    },
  ]
};
