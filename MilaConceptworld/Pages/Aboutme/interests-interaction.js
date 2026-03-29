// ═══════════════════════════════════════════════
//  INTERESTS STACK  — scroll + hover
// ═══════════════════════════════════════════════
(function () {
  const scene = document.getElementById('interestsScene');
  const stack = document.getElementById('stack');
  if (!scene || !stack) return;

  const cards = stack.querySelectorAll('.stack-card');
  const CARD_W  = 420;
  const CARD_H  = 290;
  // Step between cards: diagonal offset in 3-D space
  const STEP_X  = 90;
  const STEP_Y  = 80;
  const STEP_Z  = -55;

  // Position cards in the diagonal stack
  cards.forEach((card, i) => {
    card.style.transform = `
      translate3d(
        ${(i - (cards.length - 1) / 2) * STEP_X - CARD_W / 2}px,
        ${(i - (cards.length - 1) / 2) * STEP_Y - CARD_H / 2}px,
        ${i * STEP_Z}px
      )
    `;
    // store base transform for scroll offset
    card.dataset.baseX = (i - (cards.length - 1) / 2) * STEP_X - CARD_W / 2;
    card.dataset.baseY = (i - (cards.length - 1) / 2) * STEP_Y - CARD_H / 2;
    card.dataset.baseZ = i * STEP_Z;
  });

  // ── Scroll to move the stack ──────────────────
  let scrollY    = 0;
  let targetY    = 0;
  let rafScroll;

  scene.addEventListener('wheel', e => {
    e.preventDefault();
    targetY += e.deltaY * 0.6;
    // clamp so you can't scroll past first/last card
    const maxScroll = (cards.length - 1) * STEP_Y * 1.5;
    targetY = Math.max(-maxScroll / 2, Math.min(maxScroll / 2, targetY));
    scheduleScroll();
  }, { passive: false });

  // Touch swipe
  let touchStartY = 0;
  scene.addEventListener('touchstart', e => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });
  scene.addEventListener('touchmove', e => {
    const dy = touchStartY - e.touches[0].clientY;
    touchStartY = e.touches[0].clientY;
    targetY += dy * 1.2;
    scheduleScroll();
  }, { passive: true });

  function scheduleScroll() {
    cancelAnimationFrame(rafScroll);
    rafScroll = requestAnimationFrame(smoothScroll);
  }

  function smoothScroll() {
    scrollY += (targetY - scrollY) * 0.1;
    // Apply scroll as Y translation on the whole stack group
    stack.style.transform =
      `rotateX(46deg) rotateZ(-32deg) translateY(${-scrollY}px)`;
    if (Math.abs(targetY - scrollY) > 0.5) {
      rafScroll = requestAnimationFrame(smoothScroll);
    }
  }
})();

// ═══════════════════════════════════════════════
//  LIGHTBOX
// ═══════════════════════════════════════════════

// 每张卡片的说明文字 — key 对应 data-label
const captions = {
  'Tennis':   'Playing tennis keeps me sharp — both physically and mentally.',
  'Travel':   'Exploring new places fuels my design thinking and creativity.',
  'Hiking':   'Mountains reset my mind. Fresh air, no screens, just movement.',
  'Knitting': 'A meditative craft — patience, rhythm, and tangible results.',
  'Gym':      'Consistent training taught me discipline that carries into work.',
};

const lightbox        = document.getElementById('lightbox');
const lightboxImg     = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose   = document.getElementById('lightboxClose');

function openLightbox(src, alt, label) {
  lightboxImg.src         = src;
  lightboxImg.alt         = alt;
  lightboxCaption.textContent = captions[label] || label;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  // clear src after transition so image doesn't flash
  setTimeout(() => { lightboxImg.src = ''; }, 400);
  document.body.style.overflow = '';
}

// Close button
lightboxClose.addEventListener('click', closeLightbox);

// Click backdrop to close
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

// ESC to close
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

// Bind click on each stack card
document.querySelectorAll('.stack-card').forEach(card => {
  card.addEventListener('click', () => {
    const img   = card.querySelector('img');
    const label = card.dataset.label;
    openLightbox(img.src, img.alt, label);
  });
});