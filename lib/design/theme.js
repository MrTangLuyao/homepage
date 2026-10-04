/* Apply the saved appearance before styles render. Dark is the default for
   everyone, whatever the system prefers; the navbar button switches to light
   and back. The follow-the-system mode is hidden, so an earlier saved
   "system" choice falls back to dark. */
(function () {
  'use strict';
  const root = document.documentElement;
  const key = 'louie-theme';
  const fallback = 'dark';
  const valid = value => ['light', 'dark'].includes(value);
  let mode = fallback;
  try {
    const saved = localStorage.getItem(key);
    if (valid(saved)) mode = saved;
  } catch (_) { /* Appearance still works when storage is unavailable. */ }

  function nextMode() {
    return mode === 'dark' ? 'light' : 'dark';
  }

  function updateControls() {
    const button = document.getElementById('theme-btn');
    if (!button) return;
    const zh = root.lang.toLowerCase().startsWith('zh');
    const names = zh
      ? { light: '浅色', dark: '深色' }
      : { light: 'Light', dark: 'Dark' };
    const label = zh
      ? `外观：${names[mode]}；点击切换为${names[nextMode()]}`
      : `Appearance: ${names[mode]}; click to switch to ${names[nextMode()]}`;
    button.title = label;
    button.setAttribute('aria-label', label);
  }

  function apply() {
    root.dataset.theme = mode;
    root.dataset.themeMode = mode;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = mode === 'dark' ? '#1f1f1e' : '#faf8f2';
    updateControls();
  }

  function setMode(next) {
    if (!valid(next)) return;
    mode = next;
    try {
      if (mode === fallback) localStorage.removeItem(key);
      else localStorage.setItem(key, mode);
    } catch (_) {}
    apply();
  }

  apply();
  window.addEventListener('storage', event => {
    if (event.key !== key && event.key !== null) return;
    mode = valid(event.newValue) ? event.newValue : fallback;
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
