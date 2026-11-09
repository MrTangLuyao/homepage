/* ============================================================
 * lib/daily/party.js
 * Pixel-art fireworks on the birthday stage in the hero (the panel
 * that holds the day's avatar). Loaded by daily.js on birthdays only.
 *
 * They are drawn the way the avatar is: on a small canvas where one
 * cell is one art pixel (about the stage height / 64, so close to the
 * avatar's own, in whole screen pixels), scaled up with crisp edges.
 * Every spark is a square on that grid, steps through a short colour
 * ramp as it burns down, and flickers out; the sky moves at 15 ticks
 * a second, like the sprite. The ramps come from the chart colours
 * and fade into the stage's own ground, light or dark.
 *
 * They go off behind the avatar, stay inside the stage, rest while
 * the stage is out of view or the tab is hidden, and stay off for
 * visitors who ask for reduced motion.
 * ============================================================ */
(function () {
  'use strict';

  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const root = document.documentElement;
  const dark = () => root.dataset.theme === 'dark';

  /* Colour ramps: [flash, fresh spark, …, last ember]. In light a spark
     starts at its chart colour and fades steadily toward the stage's
     #F4F5F8; in dark the flash starts near-white and the embers cool
     toward its #131F2E. Sparks keep only a ramp's index and look the
     colour up as they are drawn, so a theme switch recolours the sky. */
  const LIGHT = [
    ['#2A7FF0', '#2A7FF0', '#5297F2', '#7BAEF3', '#A3C6F5', '#CCDDF6'],   // blue
    ['#00A06A', '#00A06A', '#31B186', '#62C2A3', '#92D3BF', '#C3E4DC'],   // green
    ['#9B5DE5', '#9B5DE5', '#AD7BE9', '#BF9AED', '#D0B8F0', '#E2D7F4'],   // violet
    ['#E45C9E', '#E45C9E', '#E77BB0', '#EA99C2', '#EEB8D4', '#F1D6E6']    // pink
  ];
  const DARK = [
    ['#E6EBF2', '#9BC0F1', '#629FF1', '#2A7FF0', '#1F4F8F', '#183459'],
    ['#E6EBF2', '#8ACDBC', '#45B793', '#00A06A', '#0A604C', '#0F3B3B'],
    ['#E6EBF2', '#C8B2ED', '#B288E9', '#9B5DE5', '#573E8A', '#312D56'],
    ['#E6EBF2', '#E5B2D0', '#E587B7', '#E45C9E', '#7C3E66', '#412C47']
  ];
  const TICK = 1000 / 15;

  function start() {
    const stage = document.getElementById('party-stage');
    if (!stage) return;
    const canvas = document.createElement('canvas');
    canvas.id = 'party-sky';
    canvas.setAttribute('aria-hidden', 'true');
    stage.prepend(canvas);                         // behind the avatar
    const ctx = canvas.getContext('2d');

    /* One cell = one art pixel, sized to the stage and rounded to whole
       screen pixels (as the avatar is), or crisp scaling at 125% and
       similar ratios makes the cells uneven. */
    let P = 6, D = 0, cols = 0, rows = 0, W = 0, H = 0, small = false;
    function resize() {
      const w = stage.clientWidth, h = stage.clientHeight, dpr = window.devicePixelRatio || 1;
      if (!w || !h || (w === W && h === H && dpr === D)) return;
      W = w; H = h; D = dpr;
      const cell = Math.max(1, Math.round(Math.max(3, Math.min(8, H / 64)) * dpr));
      P = cell / dpr;
      cols = Math.ceil(W / P); rows = Math.ceil(H / P);
      canvas.width = cols; canvas.height = rows;
      canvas.style.width = `${cols * P}px`;
      canvas.style.height = `${rows * P}px`;
      small = W < 400;
    }
    resize();
    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(stage);
    addEventListener('resize', resize);            // zoom changes the pixel ratio too

    const rand = (a, b) => a + Math.random() * (b - a);
    const pick = list => list[Math.floor(Math.random() * list.length)];
    const anyRamp = () => Math.floor(Math.random() * LIGHT.length);
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

    /* A spark travels about ten times its speed before it stalls, then
       sinks a few cells; the burst's size and its launch point keep
       that inside the stage. */
    function launch() {
      const reach = Math.min(cols, rows) * rand(0.17, 0.23);
      const m = reach + 2;
      const x = cols < 2 * m ? cols / 2 : rand(m, cols - m);
      const ty = Math.min(rand(m, rows * 0.45), rows - 2 * m);
      const t = rand(15, 19);                       // ticks to the top
      const vy = -2 * (rows - ty) / t;
      rockets.push({ x, y: rows, vx: rand(-0.1, 0.1), vy, g: -vy / t, age: 0, reach, ramp: anyRamp() });
    }

    function burst(x, y, reach, ramp) {
      const kind = pick(['ring', 'ring', 'double', 'peony']);
      const speed = reach / 10;
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
      if (kind === 'double') { ring(small ? 18 : 22, speed, ramp); ring(10, speed * 0.5, anyRamp()); }
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
        if (k.vy >= -0.3) { burst(k.x, k.y, k.reach, k.ramp); k.done = true; }
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
      const ramps = dark() ? DARK : LIGHT;
      ctx.clearRect(0, 0, cols, rows);
      for (const k of rockets) {                     // a bright head, two sparks behind
        const ramp = ramps[k.ramp];
        dot(k.x, k.y, ramp[1]);
        dot(k.x - k.vx, k.y + 2, ramp[3]);
        if (k.age++ % 2) dot(k.x - k.vx * 2, k.y + 4, ramp[4]);
      }
      for (const f of flashes) {                     // a plus, then a wider one
        const ramp = ramps[f.ramp], c = ramp[f.age + 1], r = f.age + 1;
        dot(f.x, f.y, ramp[0]);
        for (let i = 1; i <= r; i++) {
          dot(f.x + i, f.y, c); dot(f.x - i, f.y, c); dot(f.x, f.y + i, c); dot(f.x, f.y - i, c);
        }
      }
      for (const s of sparks) {
        const t = s.age / s.life;
        if (t > 0.7 && (s.age + (s.flick ? 1 : 0)) % 2) continue;   // flicker out
        const ramp = ramps[s.ramp], last = ramp.length - 1;
        const i = Math.min(last, 1 + Math.floor(t * last));
        if (t < 0.6) line(s.px, s.py, s.x, s.y, ramp[Math.min(i + 1, last)]);
        dot(s.x, s.y, ramp[i]);
      }
    }

    /* "In view" means the stage is on screen and the tab is showing. */
    let onScreen = true;
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => {
        onScreen = entries[entries.length - 1].isIntersecting;
        wake();
      }).observe(stage);
    }
    const inView = () => onScreen && !document.hidden && cols > 0;

    let running = false, last = 0, acc = 0, nextLaunch = 0;

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
    document.addEventListener('visibilitychange', wake);
    wake();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
