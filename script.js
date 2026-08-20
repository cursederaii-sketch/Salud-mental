const fill = document.getElementById('clockFill');
const tag = document.getElementById('clockTag');

window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
  const pct = Math.min(Math.max(scrolled, 0), 1);
  fill.style.width = (pct * 100) + '%';
  tag.textContent = Math.round(pct * 90) + "'";
  document.body.style.background = pct > 0.5 ? 'var(--night-bg)' : 'var(--day-bg)';
});

// marca las imágenes que aún no fueron reemplazadas
document.querySelectorAll('.img-slot img').forEach(img => {
  img.addEventListener('error', () => img.parentElement.classList.add('missing'));
});
