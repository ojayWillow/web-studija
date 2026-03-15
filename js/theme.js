// THEME — runs first to prevent flash
const html = document.documentElement;
const savedTheme = localStorage.getItem('vd-theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('vd-theme', theme);
  const btn = document.getElementById('themeToggle');
  if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
  const nav = document.getElementById('nav');
  if (nav) {
    nav.style.background = window.scrollY > 40
      ? (theme === 'dark' ? 'rgba(8,9,13,0.97)' : 'rgba(255,255,255,0.98)')
      : (theme === 'dark' ? 'rgba(8,9,13,0.8)'  : 'rgba(255,255,255,0.85)');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  btn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
  btn.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  });
});
