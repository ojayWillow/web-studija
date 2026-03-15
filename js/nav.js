// NAV — scroll effect, mobile menu, smooth scroll
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  const theme = document.documentElement.getAttribute('data-theme');
  nav.style.background = window.scrollY > 40
    ? (theme === 'dark' ? 'rgba(8,9,13,0.97)' : 'rgba(255,255,255,0.98)')
    : (theme === 'dark' ? 'rgba(8,9,13,0.8)'  : 'rgba(255,255,255,0.85)');
});

const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  burger.classList.toggle('active', open);
  burger.setAttribute('aria-expanded', open);
});
mobileMenu.querySelectorAll('a').forEach(l => l.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  burger.classList.remove('active');
}));

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});
