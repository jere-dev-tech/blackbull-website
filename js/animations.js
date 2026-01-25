/* =========================
   HERO SLIDER
========================= */

const heroSlider = document.querySelector('.hero-slider');
const heroSlides = document.querySelectorAll('.hero-slide');
const heroDots = document.querySelectorAll('.dot');

let heroIndex = 0;
let heroStartX = 0;
let heroDragging = false;

function goToHeroSlide(i) {
  heroIndex = (i + heroSlides.length) % heroSlides.length;
  heroSlider.style.transform = `translateX(-${heroIndex * 100}%)`;

  // Reset slides
  heroSlides.forEach(slide => slide.classList.remove('active'));
  heroSlides[heroIndex].classList.add('active');

  // Dots
  heroDots.forEach(dot => dot.classList.remove('active'));
  heroDots[heroIndex].classList.add('active');

  // 🔥 EFECTO BOTÓN (SIEMPRE)
  const btn = heroSlides[heroIndex].querySelector('.hero-btn');
  if (btn) {
    // Reset duro
    btn.style.transition = 'none';
    btn.style.opacity = '0';
    btn.style.transform = 'scale(0.6) translateY(20px)';

    // Forzar reflow
    btn.offsetHeight;

    // Re-aplicar animación con delay
    btn.style.transition = '';
    btn.style.opacity = '';
    btn.style.transform = '';
  }
}


/* Dots */
heroDots.forEach((dot, i) => {
  dot.addEventListener('click', () => goToHeroSlide(i));
});

/* Autoplay */
setInterval(() => {
  goToHeroSlide(heroIndex + 1);
}, 6000);

/* Drag */
heroSlider.addEventListener('mousedown', e => {
  heroStartX = e.clientX;
  heroDragging = true;
});

heroSlider.addEventListener('mouseup', e => {
  if (!heroDragging) return;
  const diff = e.clientX - heroStartX;
  handleHeroDrag(diff);
  heroDragging = false;
});

heroSlider.addEventListener('touchstart', e => {
  heroStartX = e.touches[0].clientX;
});

heroSlider.addEventListener('touchend', e => {
  const diff = e.changedTouches[0].clientX - heroStartX;
  handleHeroDrag(diff);
});

function handleHeroDrag(diff) {
  if (diff > 50) {
    goToHeroSlide(heroIndex - 1);
  } else if (diff < -50) {
    goToHeroSlide(heroIndex + 1);
  }
}

/* =========================
   MENU CAROUSEL (INFINITE)
========================= */

const carouselTrack = document.querySelector('.menu-carousel-track');
const carouselSlides = document.querySelectorAll('.menu-carousel-slide');
const menuButtons = document.querySelectorAll('.menu-category');
const menuPanels = document.querySelectorAll('.menu-panel');
const arrowLeft = document.querySelector('.menu-arrow.left');
const arrowRight = document.querySelector('.menu-arrow.right');

let currentSlide = 0;

/* Update position */
function updateMenuCarousel() {
  carouselTrack.style.transition = 'transform 0.45s ease';
  carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
}

/* Normalize index (infinite) */
function setSlide(index) {
  currentSlide = (index + carouselSlides.length) % carouselSlides.length;
  updateMenuCarousel();
}

/* Arrows */
arrowLeft.addEventListener('click', () => {
  setSlide(currentSlide - 1);
});

arrowRight.addEventListener('click', () => {
  setSlide(currentSlide + 1);
});

/* =========================
   DRAG / SWIPE (INFINITE)
========================= */

let isDragging = false;
let startX = 0;
let deltaX = 0;
const swipeThreshold = 60;

/* Mouse */
carouselTrack.addEventListener('mousedown', e => {
  isDragging = true;
  startX = e.clientX;
});

document.addEventListener('mousemove', e => {
  if (!isDragging) return;
  deltaX = e.clientX - startX;
});

document.addEventListener('mouseup', () => {
  if (!isDragging) return;
  handleCarouselSwipe();
  isDragging = false;
});

/* Touch */
carouselTrack.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

carouselTrack.addEventListener('touchmove', e => {
  deltaX = e.touches[0].clientX - startX;
});

carouselTrack.addEventListener('touchend', handleCarouselSwipe);

function handleCarouselSwipe() {
  if (deltaX > swipeThreshold) {
    setSlide(currentSlide - 1);
  } else if (deltaX < -swipeThreshold) {
    setSlide(currentSlide + 1);
  }
  deltaX = 0;
}

/* =========================
   CATEGORY CLICK (PANELS)
========================= */

menuButtons.forEach(button => {
  button.addEventListener('click', () => {
    const target = button.dataset.category;

    menuButtons.forEach(b => b.classList.remove('active'));
    button.classList.add('active');

    menuPanels.forEach(panel => {
      panel.classList.toggle(
        'active',
        panel.dataset.category === target
      );
    });
  });
});

/* =========================
   MOBILE MENU (HAMBURGER)
========================= */

const checkbox = document.getElementById('menu-checkbox');
const mobileMenu = document.getElementById('mobile-menu');

checkbox.addEventListener('change', () => {
  mobileMenu.classList.toggle('-translate-x-full', !checkbox.checked);
  mobileMenu.classList.toggle('translate-x-0', checkbox.checked);
});

/* Click outside */
document.addEventListener('click', e => {
  if (!checkbox.checked) return;

  if (!mobileMenu.contains(e.target) && !e.target.closest('#hamburger')) {
    checkbox.checked = false;
    mobileMenu.classList.add('-translate-x-full');
    mobileMenu.classList.remove('translate-x-0');
  }
});

/* Close on scroll */
let lastScroll = window.scrollY;
window.addEventListener('scroll', () => {
  if (!checkbox.checked) return;

  if (window.scrollY > lastScroll + 10) {
    checkbox.checked = false;
    mobileMenu.classList.add('-translate-x-full');
    mobileMenu.classList.remove('translate-x-0');
  }
  lastScroll = window.scrollY;
});
/* =========================
   MENU CATEGORY – CLICK OUTSIDE (FIX)
========================= */

document.querySelectorAll('.menu-category').forEach(btn => {
  btn.addEventListener('click', () => {
    document
      .querySelectorAll('.menu-category')
      .forEach(b => b.classList.remove('active'));

    btn.classList.add('active');
  });
});

