/* ============================================================
 * lib/daily/party.js
 * Fireworks over the hero on party days (the birthday template in
 * daily.js). Loaded only on those days. They go off behind the day's
 * figure, in the site's warm colours, and leave soft trails: each
 * frame fades what is already drawn instead of wiping it. Runs while
 * the hero is in view, rests when it scrolls away or the tab is
 * hidden, and stays off for visitors who ask for reduced motion.
 * ============================================================ */
(function () {
  'use strict';

  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const root = document.documentElement;
  /* Champagne, gold, coral, peach, rose — and their deeper light-theme kin. */
  const NIGHT = ['#fff1d6', '#ffcf6b', '#ff8a65', '#ffb49d', '#ff9eb1'];
  const DAY = ['#d98a1c', '#c8691e', '#e0593f', '#cf7a52', '#c9506e'];
  const GRAVITY = 0.05;            // px per frame², at 60 fps
  const night = () => root.dataset.theme !== 'light';

  function start() {
    const ground = document.getElementById('bg-wallpaper');
    if (!ground) return;
    const canvas = document.createElement('canvas');
    canvas.id = 'party-sky';
    canvas.setAttribute('aria-hidden', 'true');
    ground.after(canvas);
    const ctx = canvas.getContext('2d');

    let W = 0, H = 0, scale = 1, small = false;
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = innerWidth; H = innerHeight;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      scale = Math.max(0.65, Math.min(1.2, Math.min(W, H) / 760));
      small = W < 640;
    }
    resize();
    addEventListener('resize', resize);

    const rand = (a, b) => a + Math.random() * (b - a);
    const pick = list => list[Math.floor(Math.random() * list.length)];
    let rockets = [], sparks = [];

    /* A cut-out figure stands in front of the sky, so bursts go anywhere;
       a portrait photo would be drawn over, so they keep off the face. */
    function launchX() {
      if (root.dataset.cover !== 'portrait') return rand(0.1, 0.9);
      if (W > H) return rand(0.05, 0.5);
      return Math.random() < 0.5 ? rand(0.04, 0.2) : rand(0.8, 0.96);
    }

    function launch() {
      const ty = H * rand(0.12, small ? 0.4 : 0.48);
      rockets.push({
        x: W * launchX(), y: H + 6,
        vx: rand(-0.4, 0.4),
        vy: -Math.sqrt(2 * GRAVITY * (H - ty))
      });
    }

    function burst(x, y) {
      const colors = night() ? NIGHT : DAY;
      const main = pick(colors);
      const accent = Math.random() < 0.5 ? pick(colors) : main;
      const n = Math.round((small ? 64 : 96) * rand(0.85, 1.15));
      const power = rand(3.4, 5) * scale;
      for (let i = 0; i < n; i++) {
        const angle = (i / n) * Math.PI * 2 + rand(-0.04, 0.04);
        const inner = i % 4 === 0;                 // a smaller second ring
        const speed = power * (inner ? rand(0.35, 0.5) : rand(0.85, 1));
        sparks.push({
          x, y,
          vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
          life: 1, decay: rand(0.009, 0.014),
          color: inner ? accent : main
        });
      }
    }

    let running = false, last = 0, nextLaunch = 0;
    const inView = () => scrollY < innerHeight * 0.85 && !document.hidden;

    function frame(now) {
      const dt = Math.min((now - last) / 16.67 || 1, 3);
      last = now;
      const live = inView();
      if (live && now >= nextLaunch) {
        launch();
        nextLaunch = now + (small ? rand(1000, 1800) : rand(700, 1400));
      }

      /* Fade the last frame toward transparent: this is the trail. */
      ctx.globalCompositeOperation = 'destination-out';
      ctx.globalAlpha = 1;
      ctx.fillStyle = `rgba(0, 0, 0, ${Math.min(0.2 * dt, 0.6)})`;
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = night() ? 'lighter' : 'source-over';

      const r = 1.7 * scale;
      for (const k of rockets) {
        k.vy += GRAVITY * dt;
        k.x += k.vx * dt; k.y += k.vy * dt;
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = night() ? '#ffe7b8' : '#c8691e';
        ctx.beginPath(); ctx.arc(k.x, k.y, r, 0, Math.PI * 2); ctx.fill();
        if (k.vy >= -0.5) { burst(k.x, k.y); k.done = true; }
      }
      rockets = rockets.filter(k => !k.done);

      const drag = Math.pow(0.968, dt);
      for (const s of sparks) {
        s.vx *= drag; s.vy = s.vy * drag + GRAVITY * 0.5 * dt;
        s.x += s.vx * dt; s.y += s.vy * dt;
        s.life -= s.decay * dt;
        if (s.life <= 0) continue;
        /* Bright at first, then a soft twinkle as it burns out. */
        const twinkle = s.life < 0.35 ? (Math.random() < 0.5 ? 0.25 : 1) : 1;
        ctx.globalAlpha = Math.min(1, s.life * 1.3) * twinkle;
        ctx.fillStyle = s.color;
        ctx.beginPath(); ctx.arc(s.x, s.y, r * (0.6 + s.life * 0.5), 0, Math.PI * 2); ctx.fill();
      }
      sparks = sparks.filter(s => s.life > 0);
      ctx.globalAlpha = 1;

      if (live || rockets.length || sparks.length) requestAnimationFrame(frame);
      else { running = false; ctx.clearRect(0, 0, W, H); }
    }

    function wake() {
      if (running || !inView()) return;
      running = true;
      last = performance.now();
      requestAnimationFrame(frame);
    }

    /* Open with a small volley, then keep an easy rhythm. */
    [0, 350, 700].forEach(t => setTimeout(() => { if (inView()) { launch(); wake(); } }, 250 + t));
    nextLaunch = performance.now() + 1800;
    addEventListener('scroll', wake, { passive: true });
    document.addEventListener('visibilitychange', wake);
    wake();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
