/* ============================================================
 * learn/learn-core.js
 * Cross-cutting UI primitives + data plumbing for learn.html.
 *
 *   - Ripple effect binder (bindRipples + immediate boot call)
 *   - Brand-dropdown nav (open/close + first-visit hint ripple)
 *   - Fade-in IntersectionObserver (bindFadeIn)
 *   - Manifest loader  (loadManifest, manifest)
 *   - Course lazy loader  (loadCourse, _courseLoading)
 *   - Per-course progress  (loadProgress, saveProgress, markDone,
 *                           resetProgress, promptResetCourse)
 *   - Lesson splitter  (SPLITTER_HTML, bindSplitter)
 *     Resizes the left/right panes via a draggable bar. The same
 *     handle is also a horizontal bar above the right pane on
 *     mobile (the lesson grid stacks vertically below 1100px).
 *     Two end-buttons collapse the splitter to either extreme.
 *
 * Cross-file references:
 *   - promptResetCourse uses tt() (learn-i18n.js) and route()
 *     (learn-lesson.js); both safe — only invoked on user action,
 *     long after every learn-*.js file has loaded.
 * ============================================================ */

/* ─── Ripple ─── */
const RIPPLE_SEL = '.ripple-surface, .btn, .editor-mini-btn, .nav-btn, .reset-btn, .tutorial-link, .course-back, .lesson-back';
function bindRipples() {
  document.querySelectorAll(RIPPLE_SEL).forEach(el => {
    if (el.classList.contains('ripple-bound')) return;
    el.classList.add('ripple-bound');
    const fire = (cx, cy) => {
      const circle = document.createElement('span');
      const diameter = Math.max(el.clientWidth, el.clientHeight);
      const radius = diameter / 2;
      const rect = el.getBoundingClientRect();
      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${cx - rect.left - radius}px`;
      circle.style.top  = `${cy - rect.top  - radius}px`;
      circle.classList.add('ripple');
      const existing = el.querySelector('.ripple');
      if (existing) existing.remove();
      el.appendChild(circle);
    };
    el.addEventListener('touchstart', (e) => {
      el._lastTouch = Date.now();
      fire(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });
    el.addEventListener('mousedown', (e) => {
      if (Date.now() - (el._lastTouch || 0) < 500) return;
      fire(e.clientX, e.clientY);
    });
  });
}
bindRipples();

/* ─── Nav (M3) ─── */
const brandBtn = document.getElementById('brand-dropdown-btn');
const brandMenu = document.getElementById('brand-dropdown-menu');
const brandIcon = document.getElementById('brand-dropdown-icon');

brandBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  const isOpen = brandMenu.classList.contains('is-open');
  if (isOpen) {
    brandMenu.classList.remove('is-open');
    brandIcon.style.transform = 'rotate(0deg)';
  } else {
    brandMenu.classList.add('is-open');
    brandIcon.style.transform = 'rotate(180deg)';
  }
});

document.addEventListener('click', (e) => {
  if (!brandBtn.contains(e.target) && !brandMenu.contains(e.target)) {
    brandMenu.classList.remove('is-open');
    brandIcon.style.transform = 'rotate(0deg)';
  }
});

function fireBrandRipple() {
  const d = Math.max(brandBtn.clientWidth, brandBtn.clientHeight);
  const el = document.createElement('span');
  el.className = 'brand-hint-ripple';
  el.style.width = el.style.height = d + 'px';
  el.style.left = (brandBtn.clientWidth / 2 - d / 2) + 'px';
  el.style.top  = (brandBtn.clientHeight / 2 - d / 2) + 'px';
  brandBtn.appendChild(el);
  el.addEventListener('animationend', () => el.remove(), { once: true });
}
setTimeout(() => {
  fireBrandRipple();
  setTimeout(fireBrandRipple, 800);
}, 1000);

/* ─── Fade in ─── */
let fadeObserver = null;
function bindFadeIn() {
  if (fadeObserver) fadeObserver.disconnect();
  fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.05 });
  document.querySelectorAll('.fade-in:not(.visible)').forEach(el => fadeObserver.observe(el));
}

/* ─── Manifest + course loading ─── */
let manifest = { courses: [] };
function loadManifest() {
  const m = window.__LEARN_MANIFEST;
  if (!m) {
    console.error('learn/learn_data/manifest.js did not register window.__LEARN_MANIFEST');
    manifest = { courses: [] };
    return;
  }
  manifest = { ...m, courses: (m.courses || []) };
}

const _courseLoading = {};
function loadCourse(slug) {
  const cached = (window.__LEARN_COURSES || {})[slug];
  if (cached) return Promise.resolve(cached);
  if (_courseLoading[slug]) return _courseLoading[slug];
  _courseLoading[slug] = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `learn/learn_data/${slug}/course.js`;
    script.async = false;
    script.onload = () => {
      delete _courseLoading[slug];
      const c = (window.__LEARN_COURSES || {})[slug];
      if (c) resolve(c);
      else reject(new Error(`${script.src} did not register window.__LEARN_COURSES['${slug}']`));
    };
    script.onerror = () => {
      delete _courseLoading[slug];
      reject(new Error(`Failed to load ${script.src}`));
    };
    document.head.appendChild(script);
  });
  return _courseLoading[slug];
}

/* ─── Progress (per course) ─── */
function progKey(slug) { return `louie-learn:${slug}:done`; }
function loadProgress(slug) {
  try {
    const v = localStorage.getItem(progKey(slug));
    return v ? JSON.parse(v) : {};
  } catch(e) { return {}; }
}
function saveProgress(slug, prog) {
  try { localStorage.setItem(progKey(slug), JSON.stringify(prog)); } catch(e) {}
}
function markDone(slug, lessonId) {
  const prog = loadProgress(slug);
  prog[lessonId] = true;
  saveProgress(slug, prog);
}
function resetProgress(slug) {
  try { localStorage.removeItem(progKey(slug)); } catch(e) {}
}
function promptResetCourse(slug, courseTitle) {
  const prog = loadProgress(slug);
  if (Object.keys(prog).length === 0) {
    alert(tt('reset-no-progress'));
    return;
  }
  const msg = tt('reset-confirm').replace('{course}', courseTitle);
  if (!confirm(msg)) return;
  resetProgress(slug);
  route();
}

/* ─── Lesson splitter ─── */
//
// Markup is identical for desktop (vertical) and mobile (horizontal) — only
// CSS rotates the chevrons and flips the flex direction.
//   chevron-prev points "<" by default; mobile rotation makes it "∧"
//   chevron-next points ">" by default; mobile rotation makes it "∨"
//
// The grip is rendered as 3 small dots (universal "drag handle" symbol).
// The whole splitter element is the drag target — everything OUTSIDE the
// buttons is grabbable, so the user can grip the empty space too. Safety
// zone clamps the ratio to [10, 90] so neither pane ever fully disappears.
const SPLITTER_HTML = `
  <div class="lesson-splitter" data-splitter>
    <button class="splitter-btn splitter-collapse-prev ripple-surface" type="button" aria-label="Collapse first pane" title="←">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
    </button>
    <div class="splitter-grip" aria-hidden="true">
      <span></span><span></span><span></span><span></span><span></span>
    </div>
    <button class="splitter-btn splitter-collapse-next ripple-surface" type="button" aria-label="Collapse second pane" title="→">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
    </button>
  </div>
`;

function bindSplitter() {
  const content = document.getElementById('lesson-content');
  if (!content) return;
  const splitter = content.querySelector('.lesson-splitter');
  if (!splitter || splitter.dataset.bound === '1') return;
  splitter.dataset.bound = '1';

  const isHorizontalSplit = () => window.matchMedia('(min-width: 1100px)').matches;

  // Safety zone: each pane is guaranteed at least 10% of the container,
  // including via the collapse buttons.
  const MIN_RATIO = 10;
  const MAX_RATIO = 90;
  const setRatio = (pct) => {
    pct = Math.max(MIN_RATIO, Math.min(MAX_RATIO, pct));
    content.style.setProperty('--split-ratio', pct + '%');
  };

  const onMove = (e) => {
    const point = e.touches ? e.touches[0] : e;
    const rect = content.getBoundingClientRect();
    const pct = isHorizontalSplit()
      ? ((point.clientX - rect.left) / rect.width)  * 100
      : ((point.clientY - rect.top)  / rect.height) * 100;
    setRatio(pct);
    if (e.cancelable) e.preventDefault();
  };
  const onUp = () => {
    splitter.classList.remove('is-dragging');
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup',   onUp);
    document.removeEventListener('touchmove', onMove);
    document.removeEventListener('touchend',  onUp);
  };

  // Drag from anywhere on the splitter EXCEPT the collapse buttons —
  // the empty space around the grip dots is also a drag target so the
  // affordance feels generous.
  splitter.addEventListener('mousedown', (e) => {
    if (e.target.closest('.splitter-btn')) return;
    splitter.classList.add('is-dragging');
    document.body.style.cursor = isHorizontalSplit() ? 'col-resize' : 'row-resize';
    document.body.style.userSelect = 'none';
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup',   onUp);
    e.preventDefault();
  });
  splitter.addEventListener('touchstart', (e) => {
    if (e.target.closest('.splitter-btn')) return;
    splitter.classList.add('is-dragging');
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('touchend',  onUp);
  }, { passive: true });

  splitter.querySelector('.splitter-collapse-prev')?.addEventListener('click', () => setRatio(MIN_RATIO));
  splitter.querySelector('.splitter-collapse-next')?.addEventListener('click', () => setRatio(MAX_RATIO));
}
