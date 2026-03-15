// CONTACT — Formspree form submission
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
        setTimeout(() => { btn.textContent = originalText; btn.style.cssText = ''; btn.disabled = false; }, 4000);
      } else {
        throw new Error('Servera kļūda');
      }
    } catch (err) {
      btn.textContent = '✗ Kļūda — mēģiniet vēlreiz';
      btn.style.cssText = 'background:#ef4444;border-color:#ef4444';
      setTimeout(() => { btn.textContent = originalText; btn.style.cssText = ''; btn.disabled = false; }, 3000);
    }
  });
}
