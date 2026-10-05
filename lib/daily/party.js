/* ============================================================
 * lib/daily/party.js
 * Pixel-art fireworks over the hero on party days (the birthday
 * template in daily.js). Loaded only on those days.
 *
 * They are drawn the way the day's sprite is: on a small canvas where
 * one cell is one art pixel (about the size of the avatar's), scaled
 * up with crisp edges. Every spark is a square on that grid, steps
 * through a short colour ramp as it burns down, and flickers out;
 * the sky moves at 15 frames a second, like the sprite.
 *
 * They go off behind the day's figure, keep clear of a portrait
 * photo's face, rest when the hero scrolls away or the tab is hidden,
 * and stay off for visitors who ask for reduced motion.
 * ============================================================ */
(function () {
  'use strict';

  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const root = document.documentElement;
  const night = () => root.dataset.theme !== 'light';

  /* Colour ramps, from a fresh spark to its last ember. In dark the
     embers cool toward the night; in light they fade toward the cream. */
  const NIGHT = [
    ['#ffffff', '#fff1c4', '#ffd36b', '#f2a33a', '#b8612a', '#5e2f1c'],   // gold
    ['#ffffff', '#ffe3d6', '#ffb49d', '#ff8a65', '#c9503a', '#6b2a20'],   // coral
    ['#ffffff', '#ffe6ee', '#ffb3c4', '#ff7a99', '#c24868', '#5e2238'],   // rose
    ['#ffffff', '#fffaf0', '#fff1d6', '#ffd9a0', '#c9a46a', '#5e4c30']    // champagne
  ];
  const DAY = [
    ['#f0a020', '#e08a12', '#e8b04a', '#efc97e', '#f2dcae', '#f3e8d2'],
    ['#ff6a4a', '#e0593f', '#ec8a6e', '#f2ab96', '#f3cbbd', '#f4e2da'],
    ['#f0507a', '#c9506e', '#e08aa0', '#ecb2c0', '#f1d0d8', '#f3e3e6'],
    ['#d99a3a', '#b8873c', '#d4ad6a', '#e3c896', '#ecdcbc', '#f2eadb']
  ];
  const TICK = 1000 / 15;

  function start() {
    const ground = document.getElementById('bg-wallpaper');
    if (!ground) return;
    const canvas = document.createElement('canvas');
    canvas.id = 'party-sky';
    canvas.setAttribute('aria-hidden', 'true');
    ground.after(canvas);
    const ctx = canvas.getContext('2d');

    /* One cell = one art pixel, sized to match the avatar's. */
    let P = 8, cols = 0, rows = 0, small = false;
    function resize() {
      const W = innerWidth, H = innerHeight;
      P = Math.max(4, Math.min(12, Math.round(Math.min(W, H) / 72)));
      cols = Math.ceil(W / P); rows = Math.ceil(H / P);
      canvas.width = cols; canvas.height = rows;
      canvas.style.width = `${cols * P}px`;
      canvas.style.height = `${rows * P}px`;
      small = W < 640;
    }
    resize();
    addEventListener('resize', resize);

    const rand = (a, b) => a + Math.random() * (b - a);
    const pick = list => list[Math.floor(Math.random() * list.length)];
    let rockets = [], sparks = [], flashes = [];

    function dot(x, y, color) {
      ctx.fillStyle = color;
      ctx.fillRect(Math.round(x), Math.round(y), 1, 1);
    }
    /* A run of cells from (x0, y0) to (x1, y1): the streak behind a spark. */
    function line(x0, y0, x1, y1, color) {
      x0 = Math.round(x0); y0 = Math.round(y0); x1 = Math.round(x1); y1 = Math.round(y1);
      const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0));
      ctx.fillStyle = color;
      for (let i = 0; i <= n; i++) {
        const t = n ? i / n : 0;
        ctx.fillRect(Math.round(x0 + (x1 - x0) * t), Math.round(y0 + (y1 - y0) * t), 1, 1);
      }
    }

    /* A cut-out figure stands in front of the sky, so bursts go anywhere;
       a portrait photo would be drawn over, so they keep off the face. */
    function launchX() {
      if (root.dataset.cover !== 'portrait') return rand(0.1, 0.9);
      if (cols > rows) return rand(0.05, 0.5);
      return Math.random() < 0.5 ? rand(0.04, 0.2) : rand(0.8, 0.96);
    }

    function launch() {
      const ramps = night() ? NIGHT : DAY;
      const x = cols * launchX();
      const ty = rows * rand(0.1, small ? 0.38 : 0.34);
      const t = rand(15, 19);                       // ticks to the top
      const vy = -2 * (rows - ty) / t;
      rockets.push({ x, y: rows, vx: rand(-0.15, 0.15), vy, g: -vy / t, age: 0, ramp: pick(ramps) });
    }

    function burst(x, y, ramp) {
      const ramps = night() ? NIGHT : DAY;
      const kind = pick(['ring', 'ring', 'double', 'peony']);
      const speed = rand(1.15, 1.5);
      const life = rand(22, 30);
      const spark = (vx, vy, r) =>
        sparks.push({ x, y, px: x, py: y, vx, vy, age: 0, life, ramp: r, flick: Math.random() < 0.5 });
      const ring = (n, s, r) => {
        for (let i = 0; i < n; i++) {
          const a = (i / n) * Math.PI * 2, v = s * rand(0.97, 1.03);
          spark(Math.cos(a) * v, Math.sin(a) * v, r);
        }
      };
      if (kind === 'ring') ring(small ? 18 : 22, speed, ramp);
      if (kind === 'double') { ring(small ? 18 : 22, speed, ramp); ring(10, speed * 0.5, pick(ramps)); }
      if (kind === 'peony') {
        for (let i = 0; i < (small ? 34 : 44); i++) {
          const a = rand(0, Math.PI * 2), v = speed * Math.sqrt(rand(0.1, 1));
          spark(Math.cos(a) * v, Math.sin(a) * v, ramp);
        }
      }
      flashes.push({ x, y, age: 0, ramp });
    }

    function step() {
      for (const k of rockets) {
        k.vy += k.g; k.x += k.vx; k.y += k.vy;
        if (k.vy >= -0.3) { burst(k.x, k.y, k.ramp); k.done = true; }
      }
      rockets = rockets.filter(k => !k.done);
      for (const s of sparks) {
        s.px = s.x; s.py = s.y;
        s.vx *= 0.9; s.vy = s.vy * 0.9 + 0.035;
        s.x += s.vx; s.y += s.vy;
        s.age++;
      }
      sparks = sparks.filter(s => s.age < s.life);
      for (const f of flashes) f.age++;
      flashes = flashes.filter(f => f.age < 3);
    }

    function draw() {
      ctx.clearRect(0, 0, cols, rows);
      for (const k of rockets) {                     // a bright head, two sparks behind
        dot(k.x, k.y, k.ramp[1]);
        dot(k.x - k.vx, k.y + 2, k.ramp[3]);
        if (k.age++ % 2) dot(k.x - k.vx * 2, k.y + 4, k.ramp[4]);
      }
      for (const f of flashes) {                     // a plus, then a wider one
        const c = f.ramp[f.age + 1], r = f.age + 1;
        dot(f.x, f.y, f.ramp[0]);
        for (let i = 1; i <= r; i++) {
          dot(f.x + i, f.y, c); dot(f.x - i, f.y, c); dot(f.x, f.y + i, c); dot(f.x, f.y - i, c);
        }
      }
      for (const s of sparks) {
        const t = s.age / s.life;
        if (t > 0.7 && (s.age + (s.flick ? 1 : 0)) % 2) continue;   // flicker out
        const i = Math.min(s.ramp.length - 1, 1 + Math.floor(t * (s.ramp.length - 1)));
        if (t < 0.6) line(s.px, s.py, s.x, s.y, s.ramp[Math.min(i + 1, s.ramp.length - 1)]);
        dot(s.x, s.y, s.ramp[i]);
      }
    }

    let running = false, last = 0, acc = 0, nextLaunch = 0;
    const inView = () => scrollY < innerHeight * 0.85 && !document.hidden;

    function frame(now) {
      acc += Math.min(now - last, 250);
      last = now;
      const live = inView();
      if (live && now >= nextLaunch) {
        launch();
        nextLaunch = now + (small ? rand(1000, 1800) : rand(700, 1400));
      }
      let stepped = false;
      while (acc >= TICK) { step(); acc -= TICK; stepped = true; }
      if (stepped) draw();

      if (live || rockets.length || sparks.length || flashes.length) requestAnimationFrame(frame);
      else { running = false; ctx.clearRect(0, 0, cols, rows); }
    }

    function wake() {
      if (running || !inView()) return;
      running = true;
      last = performance.now(); acc = 0;
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
