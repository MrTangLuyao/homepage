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
const RIPPLE_SEL = '.ripple-surface, .btn, .editor-mini-btn, .tab-btn, .nav-btn, .reset-btn, .tutorial-link, .course-back, .lesson-back';
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
const _lessonLoading = {};   // 'slug:id'   → Promise<lesson>
const _schemaLoading = {};   // 'slug:name' → Promise<void>

// Inject a <script src="..."> and resolve when it fires onload.
function _injectScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.async = false;
    s.onload  = () => resolve(src);
    s.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(s);
  });
}

// Load (or return cached) the course metadata + lesson INDEX.
// course.js calls LEARN.course(slug, meta) which puts a course object onto
// window.__LEARN_COURSES[slug]. The object holds metadata + a `lessons[]`
// INDEX (id/section/slug/title/chapter/file) + `schemas: {name → file}` for
// SQL courses. Lesson content + schema bodies are loaded lazily by
// loadLesson() / loadSchema() the first time they're needed.
function loadCourse(slug) {
  const cached = (window.__LEARN_COURSES || {})[slug];
  if (cached) return Promise.resolve(cached);
  if (_courseLoading[slug]) return _courseLoading[slug];

  const courseSrc = `learn/learn_data/${slug}/course.js`;
  _courseLoading[slug] = _injectScript(courseSrc)
    .then(() => {
      const c = (window.__LEARN_COURSES || {})[slug];
      if (!c) throw new Error(`${courseSrc} did not register window.__LEARN_COURSES['${slug}']`);
      return c;
    })
    .then(c => { delete _courseLoading[slug]; return c; })
    .catch(e   => { delete _courseLoading[slug]; throw e; });

  return _courseLoading[slug];
}

// Lazy-load one schema by its declared name. Reads the file path from
// course.schemas, dedups concurrent calls, and caches via LEARN._schemas.
// Resolves with the SQL string.
function loadSchema(slug, name, course) {
  const fullName = `${slug}:${name}`;
  const cached   = (window.LEARN && window.LEARN._schemas) ? window.LEARN._schemas[fullName] : null;
  if (cached != null) return Promise.resolve(cached);
  if (_schemaLoading[fullName]) return _schemaLoading[fullName];

  const file = course && course.schemas ? course.schemas[name] : null;
  if (!file) {
    return Promise.reject(new Error(`Schema "${name}" not declared in course "${slug}".schemas`));
  }
  const src = `learn/learn_data/${slug}/${file}`;
  _schemaLoading[fullName] = _injectScript(src)
    .then(() => {
      const sql = (window.LEARN._schemas || {})[fullName];
      if (sql == null) throw new Error(`${src} did not register schema "${fullName}"`);
      return sql;
    })
    .then(v => { delete _schemaLoading[fullName]; return v; })
    .catch(e => { delete _schemaLoading[fullName]; throw e; });
  return _schemaLoading[fullName];
}

// Lazy-load ONE lesson's full content. Resolves with the merged lesson object
// (index entry + parsed content + resolved setup SQL). Once loaded, the
// content is cached onto the index entry (`entry._loaded = true`) so a second
// click on the same lesson is free.
function loadLesson(slug, lessonId) {
  return loadCourse(slug).then(course => {
    const entry = (course.lessons || []).find(l => l.id === lessonId);
    if (!entry) throw new Error(`Lesson ${lessonId} not in course "${slug}"`);

    // Already-loaded entry → return as-is
    if (entry._loaded) return entry;

    const key = `${slug}:${lessonId}`;
    if (_lessonLoading[key]) return _lessonLoading[key];

    _lessonLoading[key] = _injectScript(`learn/learn_data/${slug}/${entry.file}`)
      .then(() => {
        // Parse the raw text the lesson file registered under this id
        const blocks  = parseLessonRaw(((window.LEARN._lessonsRaw || {})[slug] || {})[lessonId]);
        const content = assembleLesson(blocks, slug);

        // Lazy-load referenced schema if any, then resolve setup SQL
        if (content.schema) {
          return loadSchema(slug, content.schema, course).then(sql => {
            content.setup = sql;
            return content;
          });
        }
        return content;
      })
      .then(content => {
        Object.assign(entry, content);
        entry._loaded = true;
        delete _lessonLoading[key];
        return entry;
      })
      .catch(e => { delete _lessonLoading[key]; throw e; });

    return _lessonLoading[key];
  });
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

/* ─── C-family resource warning gate ───
 * route() calls this before any course whose manifest entry has family:'c'.
 * Resolves true if user confirmed (or has confirmed previously); false if
 * they cancelled (router then sends them back to the course list).
 *
 * On file://, the dialog swaps into a "you need HTTPS" message and only
 * exposes a 取消/Back button — there's no point letting them proceed because
 * the C runtime cannot fetch its assets cross-origin from a null origin.
 *
 * Confirmation persists across visits via localStorage. To re-prompt, run
 *   localStorage.removeItem('louie-learn:cfamily-loaded')
 * in DevTools.
 */
const _CFAMILY_LS_KEY = 'louie-learn:cfamily-loaded';

function gateCFamilyAccess() {
  // Already passed once on this device — skip.
  try {
    if (localStorage.getItem(_CFAMILY_LS_KEY) === '1') return Promise.resolve(true);
  } catch (e) {}

  const modal      = document.getElementById('c-resources-modal');
  const titleText  = document.getElementById('c-modal-title-text');
  const body       = document.getElementById('c-modal-body');
  const cancelBtn  = document.getElementById('c-modal-cancel');
  const confirmBtn = document.getElementById('c-modal-confirm');
  if (!modal) return Promise.resolve(true);   // safety fallback

  const isFile = (location.protocol === 'file:');
  titleText.textContent = tt('c-modal-title');
  body.innerHTML = isFile ? tt('c-modal-body-file') : tt('c-modal-body-online');
  cancelBtn.textContent  = isFile ? tt('c-modal-back') : tt('c-modal-cancel');
  confirmBtn.textContent = tt('c-modal-confirm');
  confirmBtn.style.display = isFile ? 'none' : '';

  modal.hidden = false;
  // Prevent background scroll while modal is open
  const prevOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';

  return new Promise((resolve) => {
    function close(result) {
      modal.hidden = true;
      document.body.style.overflow = prevOverflow;
      cancelBtn.removeEventListener('click', onCancel);
      confirmBtn.removeEventListener('click', onConfirm);
      modal.removeEventListener('click', onBackdrop);
      document.removeEventListener('keydown', onKey);
      resolve(result);
    }
    function onCancel()   { close(false); }
    function onConfirm()  {
      try { localStorage.setItem(_CFAMILY_LS_KEY, '1'); } catch (e) {}
      close(true);
    }
    function onBackdrop(e) {
      // Click on the dimmed backdrop (not the card) cancels
      if (e.target.classList && e.target.classList.contains('m3-modal-backdrop')) onCancel();
    }
    function onKey(e) {
      if (e.key === 'Escape') onCancel();
      else if (e.key === 'Enter' && !isFile) onConfirm();
    }
    cancelBtn.addEventListener('click', onCancel);
    confirmBtn.addEventListener('click', onConfirm);
    modal.addEventListener('click', onBackdrop);
    document.addEventListener('keydown', onKey);
  });
}

/* ─── Loading placeholder with refresh fallback ───
 * Used everywhere we show "加载中…" / "Loading…". The refresh button is
 * an escape hatch in case the load gets stuck (Monaco / SQL.js / Skulpt
 * lazy-loads can occasionally hang on flaky networks or after long
 * sessions). Style matches .tutorial-link so it reads as part of the
 * existing visual language. */
function loadingHtml(label) {
  return `
    <div class="result-empty" style="padding: 80px 24px; display: flex; flex-direction: column; align-items: center; gap: 18px; text-align: center;">
      <div>${label}</div>
      <a class="tutorial-link ripple-surface" href="javascript:void(0)" onclick="event.preventDefault(); location.reload();">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="1 4 1 10 7 10"></polyline>
          <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
        </svg>
        <span>${tt('btn-refresh')}</span>
      </a>
    </div>
  `;
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
