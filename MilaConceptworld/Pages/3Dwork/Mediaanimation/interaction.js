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

// ── Floating particles ─────────────────────────
(function initParticles() {
  const canvas = document.createElement('canvas');
  canvas.id = 'particles';
  canvas.style.cssText = [
    'position:fixed', 'inset:0', 'width:100%', 'height:100%',
    'pointer-events:none', 'z-index:0'
  ].join(';');
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  const colors = ['#000000'];
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
      y:       fromBottom ? H + 20 : Math.random() * H,
      len:     Math.random() * 100 + 6,
      width:   Math.random() * 1 + 0.4,
      speed:   Math.random() * 5 + 0.4,
      opacity: Math.random() * 0.5 + 0.15,
      color:   colors[Math.floor(Math.random() * colors.length)],
    };
  }

  for (let i = 0; i < 120; i++) particles.push(makeParticle(false));

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach((p, idx) => {
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x, p.y + p.len);
      ctx.strokeStyle = p.color;
      ctx.lineWidth   = p.width;
      ctx.globalAlpha = p.opacity;
      ctx.lineCap     = 'round';
      ctx.stroke();
      p.y -= p.speed;
      if (p.y + p.len < 0) particles[idx] = makeParticle(true);
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }
  animate();
})();