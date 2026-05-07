/* learn/learn_data/c/course.js
 * v2 lazy-loading layout. Playground-only for now (no lessons yet).
 *
 * The C runtime (emception/clang in WASM) is loaded via a hidden iframe
 * pointing at lib/runtime/webC/iframe.html — see ensureC() in learn-engines.js.
 * No schemas (C lessons are self-contained, like Python).
 */

LEARN.course('c', {
  slug: 'c',
  type: 'c',
  title: { zh: 'C 语言基础语法 (Canary)', en: 'C · Core Syntax (Canary)' },
  desc:  {
    zh: '开发中，敬请期待。',
    en: 'Under development. Coming soon.',
  },

  hasPlayground: true,
  playgroundTitle: { zh: '自定义 C 代码', en: 'C Playground' },

  lessons: [],
});
