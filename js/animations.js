// ANIMATIONS — scroll fade-in, services tilt, packages spotlight, portfolio magnetic

const isTouchDevice = window.matchMedia('(hover:none)').matches;

// Inject .visible helper style
const fadeStyle = document.createElement('style');
fadeStyle.textContent = '.visible{opacity:1!important;transform:translateY(0)!important;}';
document.head.appendChild(fadeStyle);

// Scroll fade-in observer
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.service-card,.package-card,.work-card').forEach((el, i) => {
  el.style.opacity = '0'; el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.5s ease ${i * 0.05}s,transform 0.5s ease ${i * 0.05}s`;
  io.observe(el);
});

// Services — 3D card tilt
if (!isTouchDevice) {
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `perspective(600px) rotateY(${x*10}deg) rotateX(${-y*10}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

// Packages — per-card spotlight
if (!isTouchDevice) {
  document.querySelectorAll('.package-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--cx', ((e.clientX - rect.left) / rect.width  * 100) + '%');
      card.style.setProperty('--cy', ((e.clientY - rect.top)  / rect.height * 100) + '%');
    });
  });
}

// Portfolio — magnetic hover
if (!isTouchDevice) {
  document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width  / 2) * 0.06;
      const y = (e.clientY - rect.top  - rect.height / 2) * 0.06;
      card.style.transform = `translate(${x}px,${y}px) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}
