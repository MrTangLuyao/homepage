/* ============================================================
 * lib/daily/picker.js
 * The hero's "特别主题" button: a Doodle-style archive of every
 * themed day in lib/daily/daily.js. Picking a person opens the
 * homepage on their day (?day=MM-DD); "回到今天" goes back.
 * ============================================================ */
(function () {
  'use strict';

  const D = window.LouieDaily;
  const button = document.getElementById('daily-picker-btn');
  if (!D || !button) return;

  const TEXT = {
    zh: {
      title: '每日特别主题',
      sub: '查看历史及未来的特别主题',
      today: '今天', viewing: '正在看', back: '回到今天', close: '关闭',
      month: m => `${m} 月`
    },
    en: {
      title: 'Daily special themes',
      sub: 'See past and upcoming special themes',
      today: 'Today', viewing: 'Viewing', back: 'Back to today', close: 'Close',
      month: m => ['January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'][m - 1]
    }
  };

  let overlay = null;
  let lastFocus = null;

  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const isLeap = y => y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0);

  function href(day) {
    if (day === D.today) return location.pathname;
    let y = D.todayYear;
    if (day === '02-29') while (!isLeap(y)) y++;
    return `${location.pathname}?day=${day === '02-29' ? `${y}-${day}` : day}`;
  }

  function card(day, [slug, name, hasCover]) {
    const t = TEXT[lang()];
    const cls = ['dp-card', 'ripple-surface'];
    let badge = '';
    if (day === D.today) { cls.push('is-today'); badge = t.today; }
    if (D.previewing && day === D.day) { cls.push('is-current'); badge = t.viewing; }
    const thumb = hasCover === 0
      ? `<span class="dp-thumb dp-blank" aria-hidden="true">${esc([...name][0])}</span>`
      : `<img class="dp-thumb" draggable="false" src="${D.base}${slug}/thumb.jpg" alt="" loading="lazy" decoding="async">`;
    return `<a class="${cls.join(' ')}" draggable="false" href="${href(day)}">${thumb}` +
      (badge ? `<span class="dp-badge">${badge}</span>` : '') +
      `<span class="dp-cap"><span class="dp-date">${day}</span><span class="dp-name">${esc(name)}</span></span></a>`;
  }

  const lang = () => document.documentElement.lang.toLowerCase().startsWith('zh') ? 'zh' : 'en';

  function build() {
    const t = TEXT[lang()];
    const days = Object.keys(D.calendar).sort();
    const months = {};
    days.forEach(d => { (months[+d.slice(0, 2)] = months[+d.slice(0, 2)] || []).push(d); });

    overlay = document.createElement('div');
    overlay.className = 'dp-overlay';
    overlay.innerHTML =
      `<div class="dp-panel" role="dialog" aria-modal="true" aria-labelledby="dp-title">
        <header class="dp-head">
          <div class="dp-heading">
            <h2 id="dp-title" class="dp-title">${t.title}</h2>
            <p class="dp-sub">${t.sub}</p>
          </div>
          <div class="dp-actions">
            ${D.previewing ? `<a class="dp-back ripple-surface" href="${location.pathname}">${t.back}</a>` : ''}
            <button type="button" class="dp-close ripple-surface" aria-label="${t.close}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
          </div>
        </header>
        <div class="dp-body">
          ${Object.keys(months).map(m => `
            <section class="dp-month">
              <h3 class="dp-month-title">${t.month(+m)}</h3>
              <div class="dp-grid">${months[m].map(d => card(d, D.calendar[d])).join('')}</div>
            </section>`).join('')}
        </div>
      </div>`;
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
    overlay.querySelector('.dp-close').addEventListener('click', close);
    document.body.appendChild(overlay);
    if (window.bindRipples) window.bindRipples();   // the page's Material ripple, as on every other button
  }

  function onKey(e) {
    if (e.key === 'Escape') close();
  }

  function open() {
    if (overlay) overlay.remove();
    build();                                   // rebuilt each time so the language is current
    lastFocus = document.activeElement;
    document.documentElement.classList.add('dp-lock');
    overlay.classList.add('is-open');
    document.addEventListener('keydown', onKey);
    overlay.querySelector('.dp-close').focus();
    const here = overlay.querySelector('.is-current') || overlay.querySelector('.is-today')
      || nearest(overlay.querySelectorAll('.dp-card'));
    if (here) here.scrollIntoView({ block: 'center' });
  }

  /* On a day without a theme, start at the next themed day. */
  function nearest(cards) {
    const days = Object.keys(D.calendar).sort();
    const next = days.find(d => d >= D.day) || days[0];
    return [...cards].find(c => c.querySelector('.dp-date').textContent === next);
  }

  /* Fade out briefly so the close button's ripple is seen. */
  function close() {
    if (!overlay) return;
    const leaving = overlay;
    overlay = null;
    leaving.classList.add('is-closing');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setTimeout(() => leaving.remove(), reduced ? 0 : 180);
    document.documentElement.classList.remove('dp-lock');
    document.removeEventListener('keydown', onKey);
    if (lastFocus) lastFocus.focus();
  }

  button.addEventListener('click', open);
})();
