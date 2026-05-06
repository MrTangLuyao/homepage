/* ============================================================
 * learn/learn-i18n.js
 * Translation tables + language helpers for learn.html.
 *
 * Exposes (as globals — no module wrapper, file:// compatible):
 *   translations     — { zh: {...}, en: {...} }
 *   currentLang      — 'zh' | 'en'  (mutable)
 *   applyLang(lang)  — re-render all [data-i18n] elements + persist
 *   toggleLang()     — flip language and apply
 *   tt(key, vars)    — translate one key with {placeholder} substitution
 *   pickLang(field)  — pick zh/en branch from a {zh,en} object
 *
 * applyLang() calls route(), which is defined in learn-lesson.js.
 * That forward reference is safe because applyLang is first invoked
 * at boot, after every learn-*.js file has loaded.
 * ============================================================ */

const translations = {
  zh: {
    'learn-greeting': '互动闯关',
    'learn-title': '学习',
    'learn-sub': '以闯关方式学习',
    'course-back': '所有课程',
    'lesson-back': '返回课程',
    'footer-copy': 'Copyright © 2026 路易的学习室',
    'task-label': '任务',
    'editor-label': '在这里写你的查询',
    'btn-run': '运行',
    'btn-check': '提交',
    'btn-reset': '重置',
    'btn-show-answer': '查看答案',
    'btn-hide-answer': '隐藏答案',
    'btn-prev': '上一课',
    'btn-next': '下一课',
    'btn-back-list': '回到目录',
    'result-pass': '通过',
    'result-fail': '不通过',
    'result-runonly': '已执行',
    'result-empty': '（无结果行）',
    'result-yours': '你的结果',
    'result-expected': '期望结果',
    'result-error': '错误',
    'result-no-rows': '查询没有返回任何行。',
    'msg-pass': '完美 ✦ 答案正确，可以进入下一课！',
    'msg-fail-rows': '行数不对：你 {got} 行，期望 {want} 行。',
    'msg-fail-cols': '列对不上。仔细看看 SELECT 选了哪些列、顺序对不对。',
    'msg-fail-data': '数据值对不上。仔细对比一下两边的输出。',
    'msg-fail-order': '顺序错了 —— 任务要求按特定顺序排，加 ORDER BY。',
    'msg-no-engine': 'SQL 引擎还没加载，刷新一下页面再试。',
    'msg-empty-query': '先写一段 SQL 再点运行。',
    'progress-label': '进度',
    'lessons-count': '课节',
    'difficulty': '难度',
    'tables-label': '本课的表',
    'hint-label': '提示',
    'show-hint': '看看提示',
    'hide-hint': '收起提示',
    'coming-soon': '敬请期待',
    'not-found-title': '找不到这个内容',
    'not-found-desc': '链接可能不对。回到目录试试看。',
    'not-found-back': '回到目录',
    'final-section': '最终挑战',
    'lesson-section': '语法教程',
    'tutorial-link': '博客中学习这一章的知识',
    'nav-hint': '点击这里能切换我的不同网页',
    'reset-progress': '清除进度',
    'reset-confirm': '确定要清除「{course}」的所有进度吗？\n\n该操作不可撤销 —— 已通过的关卡会全部重置为未完成。',
    'reset-no-progress': '还没有任何进度可清除。',
    'py-playground-label': '自定义 Python 代码',
    'playground-label': '自定义 SQL 语句',
    'playground-load-demo': '加载 Demo 表',
    'playground-reset': '重置表',
    'playground-tables-label': '当前数据库',
    'playground-empty': '暂无表 — 点击"加载 Demo 表"或用 CREATE TABLE 自行建表。',
    'py-editor-label': '在这里写 Python 代码',
    'py-clear': '清空',
    'py-expected': '期望输出：',
    'py-got': '你的输出：',
    'py-loading': '正在加载 Python 环境…',
    'py-ready': '准备好了，点击 运行 执行代码。',
    'py-reset-done': '已重置。',
    'py-running': '运行中…',
  },
  en: {
    'learn-greeting': 'interactive · code to win',
    'learn-title': 'Learn',
    'learn-sub': 'Learn by leveling up.',
    'course-back': 'All courses',
    'lesson-back': 'Back to course',
    'footer-copy': "Copyright © 2026 Louie's Learn",
    'task-label': 'Task',
    'editor-label': 'Write your query here',
    'btn-run': 'Run',
    'btn-check': 'Submit',
    'btn-reset': 'Reset',
    'btn-show-answer': 'Show answer',
    'btn-hide-answer': 'Hide answer',
    'btn-prev': 'Previous',
    'btn-next': 'Next',
    'btn-back-list': 'Back to lessons',
    'result-pass': 'Passed',
    'result-fail': 'Not yet',
    'result-runonly': 'Executed',
    'result-empty': '(no rows)',
    'result-yours': 'Your result',
    'result-expected': 'Expected',
    'result-error': 'Error',
    'result-no-rows': 'Your query returned no rows.',
    'msg-pass': 'Nice ✦ Correct answer — you can move to the next lesson!',
    'msg-fail-rows': 'Wrong row count: you returned {got} rows, expected {want}.',
    'msg-fail-cols': 'Column mismatch. Check what your SELECT projects and the order.',
    'msg-fail-data': 'Cell values differ. Compare your result with the expected one.',
    'msg-fail-order': 'Order is off — the task wants a specific order, add ORDER BY.',
    'msg-no-engine': 'SQL engine has not loaded — refresh the page.',
    'msg-empty-query': 'Type some SQL first, then click Run.',
    'progress-label': 'Progress',
    'lessons-count': 'lessons',
    'difficulty': 'Difficulty',
    'tables-label': 'Tables in this lesson',
    'hint-label': 'Hint',
    'show-hint': 'Show hint',
    'hide-hint': 'Hide hint',
    'coming-soon': 'Coming soon',
    'not-found-title': 'Not found',
    'not-found-desc': 'The link may have changed. Try going back.',
    'not-found-back': 'Back to courses',
    'final-section': 'Final Challenge',
    'lesson-section': 'Syntax lessons',
    'tutorial-link': 'Read this chapter on the blog',
    'nav-hint': 'Click here to switch between my different pages',
    'reset-progress': 'Clear progress',
    'reset-confirm': 'Clear all progress for "{course}"?\n\nThis cannot be undone — every passed lesson will be marked unfinished again.',
    'reset-no-progress': 'There is no progress to clear yet.',
    'py-playground-label': 'Python Playground',
    'playground-label': 'Custom SQL Playground',
    'playground-load-demo': 'Load Demo Tables',
    'playground-reset': 'Reset Tables',
    'playground-tables-label': 'Current Database',
    'playground-empty': 'No tables yet — load demos or CREATE TABLE yourself.',
    'py-editor-label': 'Write your Python here',
    'py-clear': 'Clear',
    'py-expected': 'Expected output:',
    'py-got': 'Your output:',
    'py-loading': 'Loading Python environment…',
    'py-ready': 'Ready — click Run to execute your code.',
    'py-reset-done': 'Reset.',
    'py-running': 'Running…',
  }
};

let currentLang = 'en';
const userBrowserLang = navigator.language.toLowerCase();
if (userBrowserLang === 'zh-cn' || userBrowserLang === 'zh') currentLang = 'zh';
try {
  const saved = localStorage.getItem('louie-lang');
  if (saved === 'zh' || saved === 'en') currentLang = saved;
} catch(e) {}

function applyLang(lang) {
  const t = translations[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.innerHTML = t[key];
  });
  const langLabel = document.getElementById('lang-label');
  if (langLabel) langLabel.textContent = lang === 'zh' ? '文 ⇄ EN' : 'EN ⇄ 文';
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  try { localStorage.setItem('louie-lang', lang); } catch(e) {}
  route();
}

function toggleLang() {
  currentLang = currentLang === 'zh' ? 'en' : 'zh';
  applyLang(currentLang);
}

function tt(key, vars) {
  let s = (translations[currentLang] || translations.en)[key] || key;
  if (vars) for (const k in vars) s = s.replace(`{${k}}`, vars[k]);
  return s;
}

function pickLang(field, fallback = '') {
  if (field == null) return fallback;
  if (typeof field === 'string') return field;
  return field[currentLang] || field.en || field.zh || fallback;
}
