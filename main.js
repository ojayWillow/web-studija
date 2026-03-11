// =============================================
// KOLAB WEB STUDIO — MAIN JS
// =============================================

// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.style.background = window.scrollY > 40 ? 'rgba(8,9,13,0.97)' : 'rgba(8,9,13,0.8)';
});

// Mobile menu
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(l => l.addEventListener('click', () => mobileMenu.classList.remove('open')));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// Portfolio filter
const filterBtns = document.querySelectorAll('.filter-btn');
const workCards  = document.querySelectorAll('.work__grid .work-card');

workCards.forEach(c => { if (c.classList.contains('work-card--wide')) c.dataset.wide = 'true'; });

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('filter-btn--active'));
    btn.classList.add('filter-btn--active');
    const filter = btn.dataset.filter;
    workCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !match);
      if (filter !== 'all') card.classList.remove('work-card--wide');
      else if (card.dataset.wide) card.classList.add('work-card--wide');
    });
  });
});

// Scroll fade-in
const style = document.createElement('style');
style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);

const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.service-card, .package-card, .process-step, .work-card, .testimonial-card').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.5s ease ${i * 0.05}s, transform 0.5s ease ${i * 0.05}s`;
  io.observe(el);
});

// Counter animation
function animateCounter(el, target, suffix = '') {
  const duration = 1600, start = performance.now();
  const isDecimal = target.toString().includes('.');
  const update = (time) => {
    const p = Math.min((time - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = (isDecimal ? (eased * parseFloat(target)).toFixed(1) : Math.round(eased * parseFloat(target))) + suffix;
    if (p < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}
const sio = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const nums = e.target.querySelectorAll('.stat__num');
      [{ val: 120, s: '+' }, { val: 3.8, s: '×' }, { val: 48, s: 'h' }].forEach(({ val, s }, i) => { if (nums[i]) animateCounter(nums[i], val, s); });
      sio.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
const heroStats = document.querySelector('.hero__stats');
if (heroStats) sio.observe(heroStats);

// Contact form
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = '✓ Ziņojums nosūtīts!';
    btn.style.cssText = 'background:#10b981;border-color:#10b981';
    btn.disabled = true;
    setTimeout(() => { btn.textContent = 'Nosūtīt ziņojumu →'; btn.style.cssText = ''; btn.disabled = false; form.reset(); }, 3000);
  });
}
