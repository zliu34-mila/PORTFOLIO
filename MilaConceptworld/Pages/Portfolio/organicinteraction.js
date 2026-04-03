// ═══════════════════════════════════════════════
//  CUSTOM CURSOR
// ═══════════════════════════════════════════════
const cursor = document.getElementById('cursor');

// Follow mouse
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});

// Hover targets — all interactive elements
const hoverTargets = 'a, .tab-btn, .tab-rightbtn, .card, button';

// Use event delegation on document for dynamic elements (e.g. cards built later)
document.addEventListener('mouseover', e => {
  if (e.target.closest(hoverTargets)) {
    cursor.classList.add('hover');
  }
});
document.addEventListener('mouseout', e => {
  if (e.target.closest(hoverTargets)) {
    cursor.classList.remove('hover');
  }
});

// Click squeeze
document.addEventListener('mousedown', () => cursor.classList.add('click'));
document.addEventListener('mouseup',   () => cursor.classList.remove('click'));

// Hide when leaving window
document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; });
document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; });

// Hide all system cursors
const styleTag = document.createElement('style');
styleTag.textContent = `*, *::before, *::after { cursor: none !important; }`;
document.head.appendChild(styleTag);


// ═══════════════════════════════════════════════
//  NAV TAB — 高亮 + 跳转
// ═══════════════════════════════════════════════

// 👉 把文件路径换成你实际的页面地址
const tabPageMap = {
  'previous works': './index.html',
  'processing works': './processing-works.html',
};

const currentPage = window.location.pathname.split('/').pop() || 'index.html';

// 页面加载时自动激活当前 tab
document.querySelectorAll('.tab-btn').forEach(btn => {
  const tabName = btn.dataset.tab;
  const tabFile = tabPageMap[tabName]?.split('/').pop();
  if (tabFile === currentPage) {
    btn.classList.add('active');
  }

  // 点击跳转
  btn.addEventListener('click', () => {
    if (tabPageMap[tabName]) {
      window.location.href = tabPageMap[tabName];
    }
  });
});

const rightBtnMap = {
  'see my CV':  '../Aboutme/images/CV_Mila.pdf', 
  'back': '../Portfolio/index.html',
};

document.querySelectorAll('.tab-rightbtn').forEach(btn => {
  const tabName = btn.dataset.tab;
  btn.addEventListener('click', () => {
    if (rightBtnMap[tabName]) {
      window.open(rightBtnMap[tabName], '_blank'); // 新标签页打开
    }
  });
});

// video
const videos = [
    './images/video/APPdesign.mp4',
    './images/video/Airflow.mp4',
];
let currentIndex = 0;
const videoEl = document.querySelector('.video-container video');

videoEl.addEventListener('ended', () => {
    currentIndex = (currentIndex + 1) % videos.length;
    videoEl.src = videos[currentIndex];
    videoEl.play();
});

// ═══════════════════════════════════════════════
//  TOUCH SWIPE — 手机端上下滑动切换 section
// ═══════════════════════════════════════════════
let touchStartY = 0;
let touchEndY = 0;

window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
}, { passive: true });

window.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY - touchEndY;

    // 滑动距离超过 50px 才触发，防止误触
    if (Math.abs(diff) < 50) return;

    const section = sections[current];
    const atBottom = section.scrollHeight - section.scrollTop - section.clientHeight < 10;
    const atTop = section.scrollTop === 0;

    if (diff > 0) {
        // 手指向上滑 → 下一个 section
        if (current === 0 || atBottom) {
            goTo(current + 1);
        }
    } else {
        // 手指向下滑 → 上一个 section
        if (current === 0 || atTop) {
            goTo(current - 1);
        }
    }
}, { passive: true });