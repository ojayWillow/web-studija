// HERO — spotlight, typewriter, glitch, stats counter

// Spotlight
const heroEl = document.querySelector('.hero');
const spotlight = document.querySelector('.hero__spotlight');
if (heroEl && spotlight) {
  heroEl.addEventListener('mousemove', e => {
    const rect = heroEl.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    heroEl.style.setProperty('--mx', x + '%');
    heroEl.style.setProperty('--my', y + '%');
  });
}

// Typewriter
(function initTypewriter() {
  const el = document.querySelector('.hero__typewriter');
  if (!el) return;
  const words = ['Profesionāla','Moderna','Ātra','Efektīva'];
  let wi = 0, ci = 0, deleting = false;
  function type() {
    const word = words[wi];
    if (!deleting) {
      el.textContent = word.slice(0, ++ci);
      if (ci === word.length) { deleting = true; setTimeout(type, 1800); return; }
      setTimeout(type, 68);
    } else {
      el.textContent = word.slice(0, --ci);
      if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; setTimeout(type, 300); return; }
      setTimeout(type, 38);
    }
  }
  type();
})();

// Stats counter
function animateCounter(el, target, suffix = '') {
  const duration = 1400, start = performance.now();
  const update = time => {
    const p = Math.min((time - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(eased * parseFloat(target)) + suffix;
    if (p < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}
const sio = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const nums = e.target.querySelectorAll('.stat__num');
      [{val:15,s:'+'},{val:48,s:'h'},{val:100,s:'%'}].forEach(({val,s},i) => { if (nums[i]) animateCounter(nums[i], val, s); });
      sio.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
const heroStats = document.querySelector('.hero__stats');
if (heroStats) sio.observe(heroStats);
