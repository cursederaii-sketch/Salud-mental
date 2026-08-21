const fill = document.getElementById('matchFill');
const clockEl = document.getElementById('matchClock');
const phaseEl = document.getElementById('matchPhase');

// Zonas de la cancha, en orden, según el atributo data-zone de cada sección
const zones = Array.from(document.querySelectorAll('[data-zone]'));

// Fases que se juegan bajo los reflectores (fondo oscuro)
const nightZones = ['SEGUNDO TIEMPO', 'TIEMPO AÑADIDO', 'PITIDO FINAL'];

function currentZone(probe) {
  let current = zones[0];
  for (const z of zones) {
    const rect = z.getBoundingClientRect();
    if (rect.top <= probe) current = z;
  }
  return current;
}

function update() {
  const h = document.documentElement;
  const scrollable = h.scrollHeight - h.clientHeight;
  const pct = scrollable > 0 ? Math.min(Math.max(h.scrollTop / scrollable, 0), 1) : 0;
  fill.style.width = (pct * 100) + '%';

  const probe = window.innerHeight * 0.35;
  const zone = currentZone(probe);
  const zoneName = zone.dataset.zone;
  phaseEl.textContent = zoneName;

  let clockText = zone.dataset.clockStatic || '';
  if (zone.dataset.clockStart) {
    const rect = zone.getBoundingClientRect();
    const start = parseFloat(zone.dataset.clockStart);
    const end = parseFloat(zone.dataset.clockEnd);
    const progress = Math.min(Math.max((probe - rect.top) / rect.height, 0), 1);
    const minute = Math.round(start + progress * (end - start));
    clockText = (zone.dataset.added === 'true' && minute > 90) ? `90+${minute - 90}'` : `${minute}'`;
  }
  clockEl.textContent = clockText;
  clockEl.style.display = clockText ? 'inline' : 'none';

  document.body.style.background = nightZones.includes(zoneName) ? 'var(--night)' : 'var(--chalk)';
}

window.addEventListener('scroll', update, { passive: true });
window.addEventListener('resize', update);
update();

// marca las imágenes que aún no fueron reemplazadas
document.querySelectorAll('.img-slot img').forEach(img => {
  img.addEventListener('error', () => img.parentElement.classList.add('missing'));
});
