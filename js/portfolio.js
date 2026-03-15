// PORTFOLIO — iframe dynamic scaling + hover scroll

const IFRAME_SRC_WIDTH = 1280;
const isTouchDevice = window.matchMedia('(hover:none)').matches;

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
    let h = Math.round(220 * (cardWidth / 375));
    h = Math.min(Math.max(h, 160), 240);
    vp.style.height = h + 'px';
  });
}

window.addEventListener('resize', scalePortfolioIframes);
document.addEventListener('DOMContentLoaded', () => {
  scalePortfolioIframes();
  setTimeout(scalePortfolioIframes, 300);
});
if (document.readyState !== 'loading') scalePortfolioIframes();

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
