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
//  NAV TAB — 跳转（无自动高亮，hover 才有下划线）
// ═══════════════════════════════════════════════
const tabPageMap = {
  'about me': '../Aboutme/index.html',
  'projects': './index.html',
  'activies': './processing-works.html',
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
  'contact':   './contact.html',
};

document.querySelectorAll('.tab-rightbtn').forEach(btn => {
  const tabName = btn.dataset.tab;
  btn.addEventListener('click', () => {
    if (rightBtnMap[tabName]) {
      window.open(rightBtnMap[tabName], '_blank');
    }
  });
});

const viewBtnMap = {
  'demo': './monitor-demo.html',
};

document.querySelectorAll('.view-btn').forEach(btn => {
  const tabName = btn.dataset.tab;  
  btn.addEventListener('click', () => {
    if (viewBtnMap[tabName]) {
      window.location.href = viewBtnMap[tabName];
    } else {
      console.warn(`No URL mapped for view button: ${tabName}`);
    }
  });
});   


// ═══════════════════════════════════════════════
//  VIDEO 循环播放
// ═══════════════════════════════════════════════
const videos = [
    './images/video/spacecraft.mp4',
    './images/video/Airflow.mp4',
    './images/video/particles.mp4',
    './images/video/mushroom.mp4',
    './images/video/emotion.mp4'
];
let currentIndex = 0;
const videoEl = document.querySelector('.video-container video');

videoEl.addEventListener('ended', () => {
    currentIndex = (currentIndex + 1) % videos.length;
    videoEl.src = videos[currentIndex];
    videoEl.play();
});


// ═══════════════════════════════════════════════
//  SECTION 切换
// ═══════════════════════════════════════════════
const sections = [
    document.querySelector('.section-video'),
    document.querySelector('.section-intro'),
    document.querySelector('.section-previousworks'),
    document.querySelector('.section-processingworks'),
    document.querySelector('.section-artworks')
].filter(Boolean);

let current = 0;
let isAnimating = false;

// 全屏静态 section（不需要内部滚动检测），直接切换
const staticSections = [0, 1]; // section-video, section-intro

function goTo(index) {
    if (index < 0 || index >= sections.length) return;
    if (isAnimating) return;
    isAnimating = true;

    const prev = current;

    sections[index].classList.add('active');

    if (index !== prev) {
        sections[prev].classList.remove('active');
    }

    current = index;
    setTimeout(() => { isAnimating = false; }, 800);
}


// ═══════════════════════════════════════════════
//  滚轮切换
// ═══════════════════════════════════════════════
window.addEventListener('wheel', (e) => {
    const section = sections[current];
    const isStatic = staticSections.includes(current);
    const atBottom = section.scrollHeight - section.scrollTop - section.clientHeight < 10;
    const atTop = section.scrollTop === 0;

    if (e.deltaY > 0) {
        if (isStatic || atBottom) goTo(current + 1);
    } else {
        if (isStatic || atTop) goTo(current - 1);
    }
}, { passive: true });


// ═══════════════════════════════════════════════
//  TOUCH SWIPE — 手机端上下滑动切换 section
// ═══════════════════════════════════════════════
let touchStartY = 0;

window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
}, { passive: true });

window.addEventListener('touchend', (e) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY - touchEndY;

    if (Math.abs(diff) < 50) return;

    const section = sections[current];
    const isStatic = staticSections.includes(current);
    const atBottom = section.scrollHeight - section.scrollTop - section.clientHeight < 10;
    const atTop = section.scrollTop === 0;

    if (diff > 0) {
        if (isStatic || atBottom) goTo(current + 1);
    } else {
        if (isStatic || atTop) goTo(current - 1);
    }
}, { passive: true });