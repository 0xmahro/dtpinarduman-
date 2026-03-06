// dtpinardumancapraz - WhatsApp numarası (ülke kodu + numara, başında 0 yok)
// Örnek: 905321234567
const WHATSAPP_NUMBER = '905443462294';

function initWhatsApp() {
  const links = document.querySelectorAll('a[href*="wa.me"]');
  const display = document.getElementById('phone-display');
  if (!WHATSAPP_NUMBER || WHATSAPP_NUMBER.includes('X')) return;

  const url = `https://wa.me/${WHATSAPP_NUMBER}`;
  const formatted = formatPhone(WHATSAPP_NUMBER);

  links.forEach((el) => {
    el.href = url;
  });
  if (display) display.textContent = formatted;
}

function formatPhone(num) {
  const n = String(num).replace(/\D/g, '');
  if (n.length === 12 && n.startsWith('90')) {
    return '+90 ' + n.slice(2, 5) + ' ' + n.slice(5, 8) + ' ' + n.slice(8, 10) + ' ' + n.slice(10, 12);
  }
  return '+' + n;
}

// Placeholder görselleri: images/ klasörüne before1.jpg, after1.jpg vb. koyarsanız otomatik yüklenir
function loadPlaceholderImages() {
  const placeholders = document.querySelectorAll('.ba-placeholder[data-src]');
  placeholders.forEach((el) => {
    const src = el.getAttribute('data-src');
    const img = new Image();
    img.onload = () => {
      el.style.backgroundImage = `url(${src})`;
    };
    img.src = 'images/' + src;
  });
}

function initHeroSlider() {
  const track = document.querySelector('.hero-slider .slider-track');
  const dots = document.querySelectorAll('.hero-slider .slider-dot');
  const prevBtn = document.querySelector('.hero-slider .slider-prev');
  const nextBtn = document.querySelector('.hero-slider .slider-next');
  if (!track || !dots.length) return;

  let current = 0;
  const total = dots.length;
  const slideWidth = 100;

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * slideWidth}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function next() {
    goTo(current + 1);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goTo(i));
  });
  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', next);

  setInterval(next, 5000);
}

document.addEventListener('DOMContentLoaded', () => {
  initWhatsApp();
  loadPlaceholderImages();
  initHeroSlider();
});
