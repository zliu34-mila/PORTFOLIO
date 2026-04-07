// ═══════════════════════════════════════════════
//  CUSTOM CURSOR
// ═══════════════════════════════════════════════
const cursor = document.getElementById('cursor');

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});

const hoverTargets = 'a, .tab-btn, .tab-rightbtn, .card, button';

document.addEventListener('mouseover', e => {
  if (e.target.closest(hoverTargets)) cursor.classList.add('hover');
});
document.addEventListener('mouseout', e => {
  if (e.target.closest(hoverTargets)) cursor.classList.remove('hover');
});

document.addEventListener('mousedown', () => cursor.classList.add('click'));
document.addEventListener('mouseup',   () => cursor.classList.remove('click'));

document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; });
document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; });

const styleTag = document.createElement('style');
styleTag.textContent = `*, *::before, *::after { cursor: none !important; }`;
document.head.appendChild(styleTag);


// ═══════════════════════════════════════════════
//  NAV TAB — 跳转（hover 才有下划线，无自动高亮）
// ═══════════════════════════════════════════════
const tabPageMap = {
  'Projects':   './index.html',
  'Activities': './processing-works.html',
};

document.querySelectorAll('.tab-btn').forEach(btn => {
  const tabName = btn.dataset.tab;
  btn.addEventListener('click', () => {
    if (tabPageMap[tabName]) {
      window.location.href = tabPageMap[tabName];
    }
  });
});

const rightBtnMap = {
  'see my CV': '../Aboutme/images/CV_Mila.pdf',
  'back':      '../Portfolio/index.html',
};

document.querySelectorAll('.tab-rightbtn').forEach(btn => {
  const tabName = btn.dataset.tab;
  btn.addEventListener('click', () => {
    if (rightBtnMap[tabName]) {
      window.open(rightBtnMap[tabName], '_blank');
    }
  });
});


// ═══════════════════════════════════════════════
//  BACK TO TOP
// ═══════════════════════════════════════════════
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}