/* Apply the saved/system appearance before styles render. */
(function () {
  'use strict';
  const root = document.documentElement;
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  const key = 'louie-theme';
  const valid = value => ['system', 'light', 'dark'].includes(value);
  let mode = 'system';
  try {
    const saved = localStorage.getItem(key);
    if (valid(saved)) mode = saved;
  } catch (_) { /* Appearance still works when storage is unavailable. */ }

  function nextMode() {
    const preferred = system.matches ? 'dark' : 'light';
    const opposite = preferred === 'dark' ? 'light' : 'dark';
    return mode === 'system' ? opposite : mode === opposite ? preferred : 'system';
  }

  function updateControls() {
    const button = document.getElementById('theme-btn');
    if (!button) return;
    const zh = root.lang.toLowerCase().startsWith('zh');
    const names = zh
      ? { system: '跟随系统', light: '浅色', dark: '深色' }
      : { system: 'System', light: 'Light', dark: 'Dark' };
    const label = zh
      ? `外观：${names[mode]}；点击切换为${names[nextMode()]}`
      : `Appearance: ${names[mode]}; click to switch to ${names[nextMode()]}`;
    button.title = label;
    button.setAttribute('aria-label', label);
  }

  function apply() {
    const theme = mode === 'system' ? (system.matches ? 'dark' : 'light') : mode;
    root.dataset.theme = theme;
    root.dataset.themeMode = mode;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === 'dark' ? '#1f1f1e' : '#faf8f2';
    updateControls();
  }

  function setMode(next) {
    if (!valid(next)) return;
    mode = next;
    try {
      if (mode === 'system') localStorage.removeItem(key);
      else localStorage.setItem(key, mode);
    } catch (_) {}
    apply();
  }

  apply();
  system.addEventListener('change', apply);
  window.addEventListener('storage', event => {
    if (event.key !== key && event.key !== null) return;
    mode = valid(event.newValue) ? event.newValue : 'system';
    apply();
  });

  document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('theme-btn');
    if (!button) return;
    button.addEventListener('click', () => setMode(nextMode()));
    new MutationObserver(updateControls).observe(root, { attributes: true, attributeFilter: ['lang'] });
    updateControls();
  });
})();
