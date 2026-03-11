// =============================================
// KOLAB WEB STUDIO — MAIN JS
// =============================================

// ----- Nav scroll effect -----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.style.background = window.scrollY > 40
    ? 'rgba(8,9,13,0.97)'
    : 'rgba(8,9,13,0.8)';
});

// ----- Mobile burger menu -----
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ----- Smooth scroll for all anchor links -----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ----- Scroll-triggered fade-in animations -----
const observerOptions = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Add fade-in class and observe elements
const animatedEls = document.querySelectorAll(
  '.service-card, .package-card, .process-step, .work-card, .testimonial-card, .hero__badge, .hero__stats .stat'
);

animatedEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.5s ease ${i * 0.06}s, transform 0.5s ease ${i * 0.06}s`;
  observer.observe(el);
});

document.querySelectorAll('.service-card, .package-card, .process-step, .work-card, .testimonial-card, .hero__badge, .hero__stats .stat').forEach(el => {
  // Add .visible style via JS (since we set inline styles)
});

// Inject CSS for .visible class
const style = document.createElement('style');
style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);

// ----- Counter animation for stats -----
function animateCounter(el, target, suffix = '') {
  const duration = 1600;
  const start = performance.now();
  const isDecimal = target.toString().includes('.');

  function update(time) {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = isDecimal
      ? (eased * parseFloat(target)).toFixed(1)
      : Math.round(eased * parseFloat(target));
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNums = entry.target.querySelectorAll('.stat__num');
      const data = [
        { val: 120, suffix: '+' },
        { val: 3.8, suffix: '×' },
        { val: 48, suffix: 'h' },
      ];
      statNums.forEach((el, i) => {
        if (data[i]) animateCounter(el, data[i].val, data[i].suffix);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero__stats');
if (heroStats) statsObserver.observe(heroStats);

// ----- Contact form (demo handler) -----
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = '✓ Message Sent!';
    btn.style.background = '#10b981';
    btn.style.borderColor = '#10b981';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Send Message →';
      btn.style.background = '';
      btn.style.borderColor = '';
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
}
