// PARTICLES — hero canvas animation (theme-aware)
(function initParticles() {
  const canvas = document.getElementById('hero-particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const html = document.documentElement;
  let W, H, particles;

  function getColors() {
    return html.getAttribute('data-theme') === 'light'
      ? ['91,82,240','124,111,247']
      : ['108,99,255','167,139,250'];
  }
  function resize() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; }
  window.addEventListener('resize', resize); resize();
  function rand(a, b) { return Math.random() * (b - a) + a; }
  function makeParticle() {
    const c = getColors();
    return { x: rand(0,W), y: rand(0,H), r: rand(1,2.5), vx: rand(-0.15,0.15), vy: rand(-0.25,-0.05), alpha: rand(0.2,0.7), color: c[Math.random() > .5 ? 0 : 1] };
  }
  particles = Array.from({ length: 72 }, makeParticle);
  function tick() {
    ctx.clearRect(0, 0, W, H);
    const c = getColors();
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.y < -4) { p.y = H + 4; p.x = rand(0,W); p.color = c[Math.random() > .5 ? 0 : 1]; }
      if (p.x < -4 || p.x > W + 4) p.x = rand(0, W);
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${p.alpha})`; ctx.fill();
    });
    requestAnimationFrame(tick);
  }
  tick();
})();
