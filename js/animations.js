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

  heroSlides.forEach(slide => slide.classList.remove('active'));
  heroSlides[heroIndex].classList.add('active');

  heroDots.forEach(dot => dot.classList.remove('active'));
  heroDots[heroIndex].classList.add('active');

  /* Re-disparar animación del botón */
  const btn = heroSlides[heroIndex].querySelector('.hero-btn');
  if (btn) {
    btn.style.transition = 'none';
    btn.style.opacity = '0';
    btn.style.transform = 'scale(0.6) translateY(20px)';
    btn.offsetHeight; // force reflow
    btn.style.transition = '';
    btn.style.opacity = '';
    btn.style.transform = '';
  }
}

heroDots.forEach((dot, i) => {
  dot.addEventListener('click', () => goToHeroSlide(i));
});

/* Autoplay */
setInterval(() => {
  goToHeroSlide(heroIndex + 1);
}, 6000);

/* Drag / Swipe hero */
heroSlider.addEventListener('mousedown', e => {
  heroStartX = e.clientX;
  heroDragging = true;
});

heroSlider.addEventListener('mouseup', e => {
  if (!heroDragging) return;
  handleHeroDrag(e.clientX - heroStartX);
  heroDragging = false;
});

heroSlider.addEventListener('touchstart', e => {
  heroStartX = e.touches[0].clientX;
});

heroSlider.addEventListener('touchend', e => {
  handleHeroDrag(e.changedTouches[0].clientX - heroStartX);
});

function handleHeroDrag(diff) {
  if (diff > 50) goToHeroSlide(heroIndex - 1);
  else if (diff < -50) goToHeroSlide(heroIndex + 1);
}

/* =========================
   MENU CAROUSEL
========================= */

const carouselTrack = document.querySelector('.menu-carousel-track');
const carouselSlides = document.querySelectorAll('.menu-carousel-slide');
const arrowLeft = document.querySelector('.menu-arrow.left');
const arrowRight = document.querySelector('.menu-arrow.right');

let currentSlide = 0;

function updateMenuCarousel() {
  carouselTrack.style.transition = 'transform 0.45s ease';
  carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function setSlide(index) {
  currentSlide = (index + carouselSlides.length) % carouselSlides.length;
  updateMenuCarousel();
}

arrowLeft.addEventListener('click', () => setSlide(currentSlide - 1));
arrowRight.addEventListener('click', () => setSlide(currentSlide + 1));

/* Drag / Swipe carousel */
let isDragging = false;
let startX = 0;
let deltaX = 0;
const swipeThreshold = 60;

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

carouselTrack.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

carouselTrack.addEventListener('touchmove', e => {
  deltaX = e.touches[0].clientX - startX;
});

carouselTrack.addEventListener('touchend', handleCarouselSwipe);

function handleCarouselSwipe() {
  if (deltaX > swipeThreshold) setSlide(currentSlide - 1);
  else if (deltaX < -swipeThreshold) setSlide(currentSlide + 1);
  deltaX = 0;
}

/* =========================
   MENU CATEGORIES + PANELS
========================= */

const menuSection = document.querySelector('.menu-section');
const menuButtons = document.querySelectorAll('.menu-category');
const menuPanels = document.querySelectorAll('.menu-panel');

/* Click en categoría */
menuButtons.forEach(button => {
  button.addEventListener('click', e => {
    e.stopPropagation(); // evita que el document click dispare

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

/* Click fuera de una card → SOLO desactiva la card */
document.addEventListener('click', e => {
  if (!e.target.closest('.menu-category')) {
    menuButtons.forEach(b => b.classList.remove('active'));
    // ⚠️ NO tocamos los menu-panel
  }
});


/* =========================
   MOBILE MENU
========================= */

const checkbox = document.getElementById('menu-checkbox');
const mobileMenu = document.getElementById('mobile-menu');

checkbox.addEventListener('change', () => {
  mobileMenu.classList.toggle('-translate-x-full', !checkbox.checked);
  mobileMenu.classList.toggle('translate-x-0', checkbox.checked);
});

/* Click fuera */
document.addEventListener('click', e => {
  if (!checkbox.checked) return;

  if (!mobileMenu.contains(e.target) && !e.target.closest('#hamburger')) {
    checkbox.checked = false;
    mobileMenu.classList.add('-translate-x-full');
    mobileMenu.classList.remove('translate-x-0');
  }
});

/* Cerrar al scrollear */
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
document.addEventListener("DOMContentLoaded", () => {
  const heroMenuBtn = document.getElementById("heroMenuBtn");
  const menuSection = document.getElementById("menu");

  if (!heroMenuBtn || !menuSection) return;

  heroMenuBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // 1️⃣ Forzamos animación completa del botón
    heroMenuBtn.classList.add("is-clicked");

    // 2️⃣ Esperamos que termine el barrido
    setTimeout(() => {
      menuSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      // 3️⃣ Limpieza visual
      setTimeout(() => {
        heroMenuBtn.classList.remove("is-clicked");
      }, 600);

    }, 450);
  });
});
slider.addEventListener("mousedown", e => {
  isDragging = true;
  startX = e.clientX;
  slider.style.transition = "none";

  slider.classList.add("is-dragging"); // 👈 AÑADIR
});
window.addEventListener("mouseup", () => {
  if (!isDragging) return;
  isDragging = false;

  slider.classList.remove("is-dragging"); // 👈 AÑADIR
  handleSnap();
});
