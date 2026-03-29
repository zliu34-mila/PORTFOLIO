// ── Custom cursor ──────────────────────────────
const cursor = document.getElementById('cursor');

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// ── Click ripple ───────────────────────────────
document.addEventListener('click', e => {
  const rip = document.createElement('div');
  rip.className = 'ripple';
  rip.style.left = e.clientX + 'px';
  rip.style.top  = e.clientY + 'px';
  document.body.appendChild(rip);
  setTimeout(() => rip.remove(), 600);
});

// ── Nav Tab active state ───────────────────────
const path = window.location.pathname;

const tabMap = [
  { keyword: 'Mediaanimation', tab: 'media' },
  { keyword: 'Game',           tab: 'game'  },
  { keyword: 'Product',        tab: 'product' },
  { keyword: 'Prototype',      tab: 'prototype' },
];

const matched = tabMap.find(t => path.includes(t.keyword));

if (matched) {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === matched.tab);
  });
}

// ── Floating particles (bubbles) ─────────────────────────
(function initParticles() {
  const canvas = document.createElement('canvas');
  canvas.id = 'particles';
  canvas.style.cssText = [
    'position:fixed', 'inset:0', 'width:100%', 'height:100%',
    'pointer-events:none', 'z-index:0'
  ].join(';');
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function makeParticle(fromBottom) {
    return {
      x:       Math.random() * W,
      y:       fromBottom ? H + 40 : Math.random() * H,
      r:       Math.random() * 100 + 5, 
      speed:   Math.random() * 5 + 0.5,
      drift:   (Math.random() - 0.5) * 0.8,
      opacity: Math.random() * 0.3 + 0.08,
    };
  }

  for (let i = 0; i < 60; i++) particles.push(makeParticle(false));

  function drawBubble(x, y, r, opacity) {
    // ── 泡泡主体：透明圆形边缘 ──
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 1.5})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // ── 内部薄雾填充 ──
    const bodyGrad = ctx.createRadialGradient(x, y, r * 0.1, x, y, r);
    bodyGrad.addColorStop(0, `rgba(255, 255, 255, ${opacity * 0.15})`);
    bodyGrad.addColorStop(0.7, `rgba(200, 230, 255, ${opacity * 0.08})`);
    bodyGrad.addColorStop(1, `rgba(255, 255, 255, 0)`);
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = bodyGrad;
    ctx.fill();

    // ── 主高光：左上角椭圆光斑 ──
    const hx = x - r * 0.35;
    const hy = y - r * 0.35;
    const highlightGrad = ctx.createRadialGradient(hx, hy, 0, hx, hy, r * 0.45);
    highlightGrad.addColorStop(0, `rgba(255, 255, 255, ${opacity * 3.5})`);
    highlightGrad.addColorStop(0.5, `rgba(255, 255, 255, ${opacity * 1.2})`);
    highlightGrad.addColorStop(1, `rgba(255, 255, 255, 0)`);
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.save();
    ctx.clip();
    ctx.beginPath();
    ctx.ellipse(hx, hy, r * 0.38, r * 0.22, -Math.PI / 4, 0, Math.PI * 2);
    ctx.fillStyle = highlightGrad;
    ctx.fill();
    ctx.restore();

    // ── 副高光：右下角小反光 ──
    const shx = x + r * 0.4;
    const shy = y + r * 0.4;
    const subGrad = ctx.createRadialGradient(shx, shy, 0, shx, shy, r * 0.2);
    subGrad.addColorStop(0, `rgba(255, 255, 255, ${opacity * 1.5})`);
    subGrad.addColorStop(1, `rgba(255, 255, 255, 0)`);
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.save();
    ctx.clip();
    ctx.beginPath();
    ctx.arc(shx, shy, r * 0.15, 0, Math.PI * 2);
    ctx.fillStyle = subGrad;
    ctx.fill();
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);

    particles.forEach((p, idx) => {
      drawBubble(p.x, p.y, p.r, p.opacity);
      p.y -= p.speed;
      p.x += p.drift;
      if (p.y + p.r < 0) particles[idx] = makeParticle(true);
    });

    requestAnimationFrame(animate);
  }
  animate();
})();

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}