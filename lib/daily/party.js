/* ============================================================
 * lib/daily/party.js
 * Fireworks over the hero on party days (the birthday template in
 * daily.js). Loaded only on those days. Runs while the hero is in
 * view, rests when it scrolls away or the tab is hidden, and stays
 * off for visitors who ask for reduced motion.
 * ============================================================ */
(function () {
  'use strict';

  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const root = document.documentElement;
  const NIGHT = ['#ff5d73', '#ffd166', '#4ade80', '#38bdf8', '#f472b6', '#a78bfa', '#fb923c'];
  const DAY = ['#e11d48', '#f97316', '#eab308', '#16a34a', '#0284c7', '#7c3aed', '#db2777'];
  const GRAVITY = 0.09;            // px per frame², at 60 fps

  function start() {
    const overlay = document.getElementById('bg-overlay');
    if (!overlay) return;
    const canvas = document.createElement('canvas');
    canvas.id = 'party-sky';
    canvas.setAttribute('aria-hidden', 'true');
    overlay.after(canvas);
    const ctx = canvas.getContext('2d');

    let W = 0, H = 0, scale = 1, small = false;
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = innerWidth; H = innerHeight;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      scale = Math.max(0.6, Math.min(1.25, Math.min(W, H) / 720));
      small = W < 640;
    }
    resize();
    addEventListener('resize', resize);

    const rand = (a, b) => a + Math.random() * (b - a);
    const rockets = [];
    let sparks = [], flashes = [];

    function launch() {
      const ty = H * rand(0.1, small ? 0.38 : 0.45);
      rockets.push({
        x: W * rand(0.08, 0.92), y: H + 4,
        vx: rand(-0.6, 0.6),
        vy: -Math.sqrt(2 * GRAVITY * (H - ty))
      });
    }

    function burst(x, y) {
      const night = root.dataset.theme !== 'light';
      const colors = night ? NIGHT : DAY;
      const a = colors[Math.floor(Math.random() * colors.length)];
      const b = Math.random() < 0.4 ? colors[Math.floor(Math.random() * colors.length)] : a;
      const n = Math.round((small ? 70 : 110) * rand(0.85, 1.15));
      const power = rand(4.2, 6.4) * scale;
      for (let i = 0; i < n; i++) {
        const angle = (i / n) * Math.PI * 2 + rand(-0.06, 0.06);
        /* Two shells in one: a full outer ring and a softer inner one. */
        const speed = power * (i % 3 ? rand(0.8, 1) : rand(0.3, 0.6));
        sparks.push({
          x, y, px: x, py: y,
          vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
          life: 1, decay: rand(0.008, 0.013),
          color: i % 2 ? a : b
        });
      }
      flashes.push({ x, y, life: 1, color: a });
    }

    let running = false, last = 0, nextLaunch = 0;
    const inView = () => scrollY < innerHeight * 0.85 && !document.hidden;

    function frame(now) {
      const dt = Math.min((now - last) / 16.67 || 1, 3);
      last = now;
      const live = inView();
      if (live && now >= nextLaunch) {
        launch();
        nextLaunch = now + (small ? rand(800, 1500) : rand(550, 1100));
      }

      ctx.clearRect(0, 0, W, H);
      const night = root.dataset.theme !== 'light';
      ctx.globalCompositeOperation = night ? 'lighter' : 'source-over';
      ctx.lineCap = 'round';

      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.vy += GRAVITY * dt;
        r.x += r.vx * dt; r.y += r.vy * dt;
        ctx.globalAlpha = 0.9;
        ctx.strokeStyle = night ? '#ffe9b0' : '#b45309';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(r.x, r.y); ctx.lineTo(r.x - r.vx * 3, r.y - r.vy * 3);
        ctx.stroke();
        if (r.vy >= -0.6) { burst(r.x, r.y); rockets.splice(i, 1); }
      }

      for (const f of flashes) {
        f.life -= 0.07 * dt;
        if (f.life <= 0) continue;
        const r = 46 * scale;
        const g = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, r);
        g.addColorStop(0, night ? '#ffffff' : f.color);
        g.addColorStop(1, 'transparent');
        ctx.globalAlpha = f.life * (night ? 0.55 : 0.3);
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(f.x, f.y, r, 0, Math.PI * 2); ctx.fill();
      }
      flashes = flashes.filter(f => f.life > 0);

      const drag = Math.pow(0.965, dt);
      for (const s of sparks) {
        s.px = s.x; s.py = s.y;
        s.vx *= drag; s.vy = s.vy * drag + GRAVITY * 0.45 * dt;
        s.x += s.vx * dt; s.y += s.vy * dt;
        s.life -= s.decay * dt;
        if (s.life <= 0) continue;
        ctx.globalAlpha = Math.min(1, s.life * 1.4);
        ctx.strokeStyle = s.color;
        ctx.lineWidth = 2.6 * scale;
        ctx.beginPath();
        ctx.moveTo(s.px - s.vx * 3, s.py - s.vy * 3); ctx.lineTo(s.x, s.y);
        ctx.stroke();
      }
      sparks = sparks.filter(s => s.life > 0);
      ctx.globalAlpha = 1;

      if (live || rockets.length || sparks.length || flashes.length) requestAnimationFrame(frame);
      else { running = false; ctx.clearRect(0, 0, W, H); }
    }

    function wake() {
      if (running || !inView()) return;
      running = true;
      last = performance.now();
      requestAnimationFrame(frame);
    }

    /* Open with a small volley, then keep a steady rhythm. */
    [0, 220, 440, 660].forEach(t => setTimeout(() => { if (inView()) launch(); }, 300 + t));
    nextLaunch = performance.now() + 1500;
    addEventListener('scroll', wake, { passive: true });
    document.addEventListener('visibilitychange', wake);
    wake();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
