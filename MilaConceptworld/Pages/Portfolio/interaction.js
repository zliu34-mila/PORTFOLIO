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
  'contact':    './contact.html',
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
    './images/video/spacecraft.mp4',
    './images/video/Airflow.mp4',
    './images/video/particles.mp4',
    './images/video/video4.mp4',
    './images/video/video5.mp4'
    
];
let currentIndex = 0;
const videoEl = document.querySelector('.video-container video');

videoEl.addEventListener('ended', () => {
    currentIndex = (currentIndex + 1) % videos.length;
    videoEl.src = videos[currentIndex];
    videoEl.play();
});


const sections = [
    document.querySelector('.section-video'),
    document.querySelector('.section-previousworks'),
    document.querySelector('.section-processingworks')
];

let current = 0;
let isAnimating = false;

function goTo(index) {
    if (index < 0 || index >= sections.length) return;
    if (isAnimating) return;
    isAnimating = true;

    // 新section滑上来
    sections[index].classList.add('active');

    // 旧section如果往回滚，需要退下去
    if (index < current) {
        sections[current].classList.remove('active');
    }

    current = index;

    setTimeout(() => { isAnimating = false; }, 800);
}

// 监听滚轮
window.addEventListener('wheel', (e) => {
    if (e.deltaY > 0) {
        goTo(current + 1); // 向下
    } else {
        goTo(current - 1); // 向上
    }
});
