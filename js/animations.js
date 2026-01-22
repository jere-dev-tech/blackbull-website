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


/* =========================
   MENU CATEGORIES (MOBILE)
========================= */

const menuCategories = document.querySelectorAll('.menu-category');
const menuPanels = document.querySelectorAll('.menu-panel');

menuCategories.forEach(category => {
  category.addEventListener('click', () => {
    const target = category.dataset.category;

    // active category
    menuCategories.forEach(c => c.classList.remove('active'));
    category.classList.add('active');

    // show panel
    menuPanels.forEach(panel => {
      panel.classList.toggle(
        'active',
        panel.dataset.category === target
      );
    });
  });
});
const hamburgerCheckbox = document.querySelector(
  'header input[type="checkbox"]'
);
const mobileMenu = document.getElementById('mobile-menu');

hamburgerCheckbox.addEventListener('change', () => {
  if (hamburgerCheckbox.checked) {
    mobileMenu.classList.remove('-translate-x-full');
  } else {
    mobileMenu.classList.add('-translate-x-full');
  }
});



const checkbox = document.getElementById('menu-checkbox');
const menu = document.getElementById('mobile-menu');

/* abrir / cerrar */
checkbox.addEventListener('change', () => {
  if (checkbox.checked) {
    menu.classList.remove('-translate-x-full');
    menu.classList.add('translate-x-0');
  } else {
    menu.classList.add('-translate-x-full');
    menu.classList.remove('translate-x-0');
  }
});

/* click afuera */
document.addEventListener('click', (e) => {
  if (!checkbox.checked) return;

  if (!menu.contains(e.target) && !e.target.closest('#hamburger')) {
    checkbox.checked = false;
    menu.classList.add('-translate-x-full');
    menu.classList.remove('translate-x-0');
  }
});

/* scroll hacia abajo */
let lastScroll = window.scrollY;
window.addEventListener('scroll', () => {
  if (!checkbox.checked) return;

  if (window.scrollY > lastScroll + 10) {
    checkbox.checked = false;
    menu.classList.add('-translate-x-full');
    menu.classList.remove('translate-x-0');
  }
  lastScroll = window.scrollY;
});









