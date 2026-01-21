const slider = document.querySelector('.hero-slider');
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');

let index = 0;
let startX = 0;
let isDragging = false;

/* ---- FUNCTIONS ---- */

function goToSlide(i) {
  index = i;
  slider.style.transform = `translateX(-${index * 100}%)`;

  dots.forEach(dot => dot.classList.remove('active'));
  dots[index].classList.add('active');
}

/* ---- DOTS CLICK ---- */

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => goToSlide(i));
});

/* ---- AUTOPLAY ---- */

setInterval(() => {
  index = (index + 1) % slides.length;
  goToSlide(index);
}, 6000);

/* ---- DRAG (MOUSE + TOUCH) ---- */

slider.addEventListener('mousedown', e => {
  startX = e.clientX;
  isDragging = true;
});

slider.addEventListener('mouseup', e => {
  if (!isDragging) return;
  const diff = e.clientX - startX;
  handleDrag(diff);
  isDragging = false;
});

slider.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

slider.addEventListener('touchend', e => {
  const diff = e.changedTouches[0].clientX - startX;
  handleDrag(diff);
});

function handleDrag(diff) {
  if (diff > 50 && index > 0) {
    goToSlide(index - 1);
  } else if (diff < -50 && index < slides.length - 1) {
    goToSlide(index + 1);
  }
}
const hamburger = document.querySelector('.hamburger');
const mobileSidebar = document.querySelector('.mobile-sidebar');
const mobileLinks = document.querySelectorAll('.mobile-sidebar a');

if (hamburger && mobileSidebar) {
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.contains('open');

    if (isOpen) {
      hamburger.classList.remove('open');
      mobileSidebar.classList.remove('open');
    } else {
      hamburger.classList.add('open');
      mobileSidebar.classList.add('open');
    }
  });
}

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileSidebar.classList.remove('open');
  });
});

