// VDIGITAL — MAIN JS

// ── Theme toggle (runs FIRST to prevent flash) ──
const html = document.documentElement;
const savedTheme = localStorage.getItem('vd-theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('vd-theme', theme);
  const btn = document.getElementById('themeToggle');
  if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
  if (nav) {
    nav.style.background = window.scrollY > 40
      ? (theme === 'dark' ? 'rgba(8,9,13,0.97)' : 'rgba(255,255,255,0.98)')
      : (theme === 'dark' ? 'rgba(8,9,13,0.8)'  : 'rgba(255,255,255,0.85)');
  }
}

// ── Nav scroll effect ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  const theme = html.getAttribute('data-theme');
  nav.style.background = window.scrollY > 40
    ? (theme === 'dark' ? 'rgba(8,9,13,0.97)' : 'rgba(255,255,255,0.98)')
    : (theme === 'dark' ? 'rgba(8,9,13,0.8)'  : 'rgba(255,255,255,0.85)');
});

// ── Mobile menu ──
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

// ── Theme toggle button ──
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  btn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
  btn.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  });
});

// ── Smooth scroll ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// ── STEP 1: Hero spotlight ──
const hero = document.querySelector('.hero');
const spotlight = document.querySelector('.hero__spotlight');
if (hero && spotlight) {
  hero.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    hero.style.setProperty('--mx', x + '%');
    hero.style.setProperty('--my', y + '%');
  });
}

// Particles (theme-aware)
(function initParticles() {
  const canvas = document.getElementById('hero-particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles;
  function getColors() {
    return html.getAttribute('data-theme') === 'light'
      ? ['91,82,240','124,111,247']
      : ['108,99,255','167,139,250'];
  }
  function resize() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; }
  window.addEventListener('resize', resize); resize();
  function rand(a,b) { return Math.random()*(b-a)+a; }
  function makeParticle() {
    const c = getColors();
    return { x:rand(0,W), y:rand(0,H), r:rand(1,2.5), vx:rand(-0.15,0.15), vy:rand(-0.25,-0.05), alpha:rand(0.2,0.7), color:c[Math.random()>.5?0:1] };
  }
  particles = Array.from({length:72},makeParticle);
  function tick() {
    ctx.clearRect(0,0,W,H);
    const c = getColors();
    particles.forEach(p => {
      p.x+=p.vx; p.y+=p.vy;
      if(p.y<-4){p.y=H+4;p.x=rand(0,W);p.color=c[Math.random()>.5?0:1];}
      if(p.x<-4||p.x>W+4)p.x=rand(0,W);
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(${p.color},${p.alpha})`; ctx.fill();
    });
    requestAnimationFrame(tick);
  }
  tick();
})();

// ── Typewriter ──
(function initTypewriter() {
  const el = document.querySelector('.hero__typewriter');
  if (!el) return;
  const words = ['Profesionāla','Moderna','Ātra','Efektīva'];
  let wi=0,ci=0,deleting=false;
  function type() {
    const word=words[wi];
    if(!deleting){el.textContent=word.slice(0,++ci);if(ci===word.length){deleting=true;setTimeout(type,1800);return;}setTimeout(type,68);}
    else{el.textContent=word.slice(0,--ci);if(ci===0){deleting=false;wi=(wi+1)%words.length;setTimeout(type,300);return;}setTimeout(type,38);}
  }
  type();
})();

// ── STEP 2: Services — 3D card tilt ──
const isTouchDevice = window.matchMedia('(hover:none)').matches;
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

// ── STEP 3: Packages — per-card spotlight ──
if (!isTouchDevice) {
  document.querySelectorAll('.package-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width)  * 100;
      const y = ((e.clientY - rect.top)  / rect.height) * 100;
      card.style.setProperty('--cx', x + '%');
      card.style.setProperty('--cy', y + '%');
    });
  });
}

// ── STEP 4: Portfolio — iframe dynamic scaling ──
const IFRAME_SRC_WIDTH = 1280;

function scalePortfolioIframes() {
  document.querySelectorAll('.browser-viewport').forEach(vp => {
    const cardWidth = vp.offsetWidth;
    if (!cardWidth) return;
    const scale = cardWidth / IFRAME_SRC_WIDTH;
    const iframe = vp.querySelector('iframe');
    if (iframe) {
      iframe.style.transform = `scale(${scale})`;
      vp.dataset.scale = scale;
    }
    vp.style.height = Math.round(220 * (cardWidth / 375)) + 'px';
    vp.style.height = Math.min(Math.max(vp.style.height.replace('px',''), 160), 240) + 'px';
  });
}

window.addEventListener('resize', scalePortfolioIframes);
document.addEventListener('DOMContentLoaded', () => {
  scalePortfolioIframes();
  setTimeout(scalePortfolioIframes, 300);
});
if (document.readyState !== 'loading') scalePortfolioIframes();

// Hover scroll — shift iframe up to reveal more content
if (!isTouchDevice) {
  document.querySelectorAll('.work-card').forEach(card => {
    const vp = card.querySelector('.browser-viewport');
    card.addEventListener('mouseenter', () => {
      if (!vp) return;
      const scale = parseFloat(vp.dataset.scale) || 0.295;
      const iframe = vp.querySelector('iframe');
      if (iframe) iframe.style.transform = `scale(${scale}) translateY(-180px)`;
    });
    card.addEventListener('mouseleave', () => {
      if (!vp) return;
      const scale = parseFloat(vp.dataset.scale) || 0.295;
      const iframe = vp.querySelector('iframe');
      if (iframe) iframe.style.transform = `scale(${scale})`;
    });
  });
}

// ── Portfolio magnetic hover ──
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

// ── Scroll fade-in ──
const fadeStyle = document.createElement('style');
fadeStyle.textContent = '.visible{opacity:1!important;transform:translateY(0)!important;}';
document.head.appendChild(fadeStyle);
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);} });
},{threshold:0.1,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.service-card,.package-card,.work-card').forEach((el,i)=>{
  el.style.opacity='0'; el.style.transform='translateY(24px)';
  el.style.transition=`opacity 0.5s ease ${i*0.05}s,transform 0.5s ease ${i*0.05}s`;
  io.observe(el);
});

// ── Stats counter ──
function animateCounter(el,target,suffix=''){
  const duration=1400,start=performance.now();
  const update=time=>{
    const p=Math.min((time-start)/duration,1);
    const eased=1-Math.pow(1-p,3);
    el.textContent=Math.round(eased*parseFloat(target))+suffix;
    if(p<1)requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}
const sio = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const nums=e.target.querySelectorAll('.stat__num');
      [{val:15,s:'+'},{val:48,s:'h'},{val:100,s:'%'}].forEach(({val,s},i)=>{if(nums[i])animateCounter(nums[i],val,s);});
      sio.unobserve(e.target);
    }
  });
},{threshold:0.5});
const heroStats=document.querySelector('.hero__stats');
if(heroStats)sio.observe(heroStats);

// ── Contact form — real Formspree submission ──
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Sūta...';
    btn.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        btn.textContent = '✓ Nosūtīts!';
        btn.style.cssText = 'background:#10b981;border-color:#10b981';
        form.reset();
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.cssText = '';
          btn.disabled = false;
        }, 4000);
      } else {
        throw new Error('Servera kļūda');
      }
    } catch (err) {
      btn.textContent = '✗ Kļūda — mēģiniet vēlreiz';
      btn.style.cssText = 'background:#ef4444;border-color:#ef4444';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.cssText = '';
        btn.disabled = false;
      }, 3000);
    }
  });
}
