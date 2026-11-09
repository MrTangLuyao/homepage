/* The page's own scrollbar: a slim grey pill that floats over the right
   edge, shows while the page scrolls or the pointer comes near, and fades
   out when idle. It can be dragged, and a click on the track pages up or
   down. Only for mouse and trackpad; touch screens keep their own. The
   native bar is hidden only once this one is in place (louie.css,
   html.has-scrollbar), so without this script the page scrolls as usual.
   Wheel, keys and touch all scroll the page natively; this only draws
   the position and adds the drag. */
(function () {
  'use strict';
  var root = document.documentElement;
  // High contrast modes keep the native bar, which follows their colours.
  var fine = window.matchMedia('(hover: hover) and (pointer: fine) and (forced-colors: none)');
  var IDLE = 900;      // ms the bar stays after the last scroll
  var PAD = 4;         // px between the track's ends and the thumb
  var MIN = 32;        // px, the shortest the thumb gets

  var track, thumb, hideTimer = 0, frame = 0;
  var hovering = false, dragging = false;
  var thumbTop = 0, thumbH = 0, travel = 0, range = 0;

  function build() {
    track = document.createElement('div');
    track.className = 'scrollbar';
    track.setAttribute('aria-hidden', 'true');
    thumb = document.createElement('div');
    thumb.className = 'scrollbar-thumb';
    track.appendChild(thumb);
    document.body.appendChild(track);

    track.addEventListener('pointerenter', function () { hovering = true; show(); });
    track.addEventListener('pointerleave', function () { hovering = false; later(); });
    track.addEventListener('pointerdown', onDown);
  }

  function measure() {
    var view = window.innerHeight;
    var full = Math.max(root.scrollHeight, document.body.scrollHeight);
    range = Math.max(0, full - view);
    var length = track.clientHeight - PAD * 2;
    track.classList.toggle('is-idle', range < 1 || length <= MIN);
    if (range < 1 || length <= MIN) return;
    thumbH = Math.max(MIN, Math.round(length * view / full));
    travel = length - thumbH;
    var y = Math.min(Math.max(window.scrollY, 0), range);
    thumbTop = PAD + travel * y / range;
    thumb.style.height = thumbH + 'px';
    thumb.style.transform = 'translateY(' + thumbTop + 'px)';
  }

  function update() {
    if (frame) return;
    frame = requestAnimationFrame(function () { frame = 0; measure(); });
  }

  function show() {
    clearTimeout(hideTimer);
    track.classList.add('is-shown');
  }
  function later() {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(function () {
      if (!hovering && !dragging) track.classList.remove('is-shown');
    }, IDLE);
  }

  function onScroll() { update(); show(); later(); }

  function onDown(e) {
    if (e.button !== 0) return;
    e.preventDefault();
    measure();
    if (e.target === thumb) {
      // Drag: the page follows the thumb one to one, without the page's
      // smooth scrolling lagging behind.
      dragging = true;
      track.classList.add('is-dragging');
      root.style.scrollBehavior = 'auto';
      var startY = e.clientY, startScroll = window.scrollY;
      var ratio = travel > 0 ? range / travel : 0;
      var move = function (ev) {
        window.scrollTo(0, startScroll + (ev.clientY - startY) * ratio);
      };
      var up = function () {
        dragging = false;
        track.classList.remove('is-dragging');
        root.style.scrollBehavior = '';
        thumb.removeEventListener('pointermove', move);
        thumb.removeEventListener('pointerup', up);
        thumb.removeEventListener('pointercancel', up);
        later();
      };
      thumb.setPointerCapture(e.pointerId);
      thumb.addEventListener('pointermove', move);
      thumb.addEventListener('pointerup', up);
      thumb.addEventListener('pointercancel', up);
    } else {
      // A click on the track turns one screen towards it, like the
      // native bar (smooth unless the reader asked for reduced motion).
      var y = e.clientY - track.getBoundingClientRect().top;
      var page = window.innerHeight * 0.875;
      window.scrollBy(0, y < thumbTop ? -page : page);
    }
  }

  function enable() {
    if (!track) build();
    root.classList.add('has-scrollbar');
    measure();
  }
  function disable() {
    root.classList.remove('has-scrollbar');
  }

  function start() {
    if (fine.matches) enable();
    var onChange = function () { fine.matches ? enable() : disable(); };
    if (fine.addEventListener) fine.addEventListener('change', onChange);
    else if (fine.addListener) fine.addListener(onChange);

    window.addEventListener('scroll', function () { if (track && fine.matches) onScroll(); }, { passive: true });
    window.addEventListener('resize', function () { if (track) update(); });
    // The page grows and shrinks as fonts arrive and the language changes.
    if (window.ResizeObserver) new ResizeObserver(function () { if (track) update(); }).observe(document.body);
    // Coming near the right edge brings the bar back, so it can be found
    // without scrolling first.
    document.addEventListener('pointermove', function (e) {
      if (!track || e.pointerType === 'touch' || !fine.matches) return;
      if (e.clientX >= root.clientWidth - 24) { show(); later(); }
    }, { passive: true });
  }

  if (document.body) start();
  else document.addEventListener('DOMContentLoaded', start);
})();
