/* DOMIDELT shared effects v4: scroll reveal, blurred section words, dot network, drawn figures, checklist result line */
(function () {
  var root = document.documentElement;
  root.classList.add('js');
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO = 'IntersectionObserver' in window;

  /* ---------- 1. cards rise from the bottom ---------- */
  var SEL = ['.problem', '.card', '.box', '.faq-item', '.profile', '.principles li', '.process li', '.topic',
             '.split', '.deliver', '.chips-nav', '.howto', '.follow p', '.closing', '.path', '.toolbar',
             '.section > .lead', '.section > h2', '.section > .eyebrow', '.contact-lines', '.section > .btn'].join(',');
  var items = [].slice.call(document.querySelectorAll(SEL)).filter(function (el) {
    return !el.closest('.popup, .dmd-ov, header, footer') && !el.closest('.topic .deliver') ;
  });
  if (hasIO && !reduce) {
    var seen = new Map();
    items.forEach(function (el) {
      var p = el.parentNode, k = seen.get(p) || 0; seen.set(p, k + 1);
      el.style.setProperty('--d', Math.min(k, 5) * 0.09 + 's');
      el.classList.add('rv');
    });
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target; io.unobserve(el); el.classList.add('in');
        setTimeout(function () { el.classList.remove('rv', 'in'); el.style.removeProperty('--d'); }, 1500);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 2. drawn figures (triangle, flow dots) ---------- */
  var figs = document.querySelectorAll('.net-fig, .flow');
  if (hasIO && !reduce) {
    var fio = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); fio.unobserve(e.target); } });
    }, { threshold: 0.3 });
    figs.forEach(function (f) { fio.observe(f); });
  } else { figs.forEach(function (f) { f.classList.add('in'); }); }

  /* ---------- 3. blurred section words drift slower than the page ---------- */
  var bgs = [].slice.call(document.querySelectorAll('[data-bg]'));
  if (bgs.length && !reduce) {
    var ticking = false;
    var upd = function () {
      ticking = false;
      var vh = window.innerHeight;
      bgs.forEach(function (s) {
        var r = s.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        s.style.setProperty('--py', ((vh / 2 - (r.top + r.height / 2)) * 0.1).toFixed(1));
      });
    };
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }, { passive: true });
    window.addEventListener('resize', upd); upd();
  }

  /* ---------- 4. drifting dots joined by lines ---------- */
  function network(host) {
    var c = document.createElement('canvas');
    c.className = 'net'; c.setAttribute('aria-hidden', 'true');
    host.insertBefore(c, host.firstChild);
    var ctx = c.getContext('2d'), W = 0, H = 0, pts = [], mx = -9999, my = -9999, live = false, raf = 0, ink = '#111';
    function readInk() { ink = (getComputedStyle(root).getPropertyValue('--ink') || '#111').trim() || '#111'; }
    function size() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = host.clientWidth; H = host.clientHeight; if (!W || !H) return;
      c.width = W * dpr; c.height = H * dpr; c.style.width = W + 'px'; c.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.round(Math.min(W * H / 15000, W < 600 ? 34 : 85)); pts = [];
      for (var i = 0; i < n; i++) pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .34, vy: (Math.random() - .5) * .34, r: 1.1 + Math.random() * 1.7 });
      draw(false);
    }
    function draw(move) {
      ctx.clearRect(0, 0, W, H);
      var D = W < 600 ? 92 : 140, M = 170, i, j, a, b, d, dx, dy;
      ctx.fillStyle = ink; ctx.strokeStyle = ink; ctx.lineWidth = .8;
      for (i = 0; i < pts.length; i++) {
        a = pts[i];
        if (move) {
          a.x += a.vx; a.y += a.vy;
          if (a.x < 0 || a.x > W) a.vx *= -1; if (a.y < 0 || a.y > H) a.vy *= -1;
        }
        for (j = i + 1; j < pts.length; j++) {
          b = pts[j]; dx = a.x - b.x; dy = a.y - b.y; d = Math.sqrt(dx * dx + dy * dy);
          if (d < D) { ctx.globalAlpha = (1 - d / D) * .26; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
        }
        dx = a.x - mx; dy = a.y - my; d = Math.sqrt(dx * dx + dy * dy);
        if (d < M) { ctx.globalAlpha = (1 - d / M) * .5; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mx, my); ctx.stroke(); }
        ctx.globalAlpha = d < M ? .75 : .38; ctx.beginPath(); ctx.arc(a.x, a.y, d < M ? a.r + .7 : a.r, 0, 6.2832); ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
    function loop() { if (!live) return; draw(true); raf = requestAnimationFrame(loop); }
    function point(x, y) { var r = host.getBoundingClientRect(); mx = x - r.left; my = y - r.top; }
    host.addEventListener('mousemove', function (e) { point(e.clientX, e.clientY); }, { passive: true });
    host.addEventListener('touchmove', function (e) { var t = e.touches[0]; if (t) point(t.clientX, t.clientY); }, { passive: true });
    host.addEventListener('mouseleave', function () { mx = my = -9999; });
    readInk(); size();
    var t; window.addEventListener('resize', function () { clearTimeout(t); t = setTimeout(function () { readInk(); size(); }, 150); });
    if (window.matchMedia) { var mq = matchMedia('(prefers-color-scheme: dark)'); (mq.addEventListener || mq.addListener).call(mq, 'change', function () { readInk(); draw(false); }); }
    if (reduce || !hasIO) return;
    new IntersectionObserver(function (es) {
      es.forEach(function (e) { live = e.isIntersecting; cancelAnimationFrame(raf); if (live) loop(); });
    }).observe(host);
  }
  document.querySelectorAll('.net-host').forEach(network);

  /* ---------- 5. checklist guidance: live result line ---------- */
  function wrappers() {
    var w = [].slice.call(document.querySelectorAll('details.checklist'));
    var s = document.getElementById('sample-checks'); if (s) w.push(s.parentNode);
    return w;
  }
  function update(w) {
    var ins = w.querySelectorAll('input[type=checkbox]'), t = ins.length, n = w.querySelectorAll('input:checked').length, r = w.querySelector('.result');
    if (!r) { r = document.createElement('p'); r.className = 'result'; r.setAttribute('aria-live', 'polite'); var ul = w.querySelector('ul'); ul.parentNode.insertBefore(r, ul); }
    var txt, cls = '';
    if (n === 0) txt = 'Tick a question only if you can answer yes and explain why.';
    else if (n === t) { txt = 'All ' + t + ' ticked. If you can also explain each answer, this area is in good shape.'; cls = ' good'; }
    else { var g = t - n; txt = g + (g === 1 ? ' gap' : ' gaps') + ' to look at. Each unticked question is a challenge worth addressing.'; cls = ' part'; }
    r.className = 'result' + cls; r.textContent = txt;
  }
  wrappers().forEach(update);
  document.addEventListener('change', function (e) {
    if (!e.target || e.target.type !== 'checkbox') return;
    var w = e.target.closest('details.checklist') || (e.target.closest('#sample-checks') && document.getElementById('sample-checks').parentNode);
    if (w) update(w);
  });
  document.addEventListener('click', function (e) {          // Reset button clears ticks without a change event
    if (e.target && e.target.id === 'reset') setTimeout(function () { wrappers().forEach(update); }, 0);
  });
})();
