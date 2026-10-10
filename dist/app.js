const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
if ('IntersectionObserver' in window && !reduced) {
  document.documentElement.classList.add('motion');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
document.querySelector('#year').textContent = new Date().getFullYear();
const dialog = document.querySelector('#rating');
const status = document.querySelector('#rating-status');
let prompted = false;
let saved = null;
try { saved = localStorage.getItem('mayukh-rating'); prompted = !!saved || !!sessionStorage.getItem('mayukh-rating-prompt'); } catch {}
function openRating() {
  if (dialog.open) return;
  prompted = true;
  try { sessionStorage.setItem('mayukh-rating-prompt', '1'); } catch {}
  if (saved) { const input = document.querySelector(`input[value="${Number(saved)}"]`); if (input) input.checked = true; }
  dialog.showModal();
}
document.querySelector('#rate-open').addEventListener('click', openRating);
document.querySelector('#rate-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const box = dialog.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close(); } });
document.querySelector('#rating-form').addEventListener('submit', event => {
  event.preventDefault();
  const score = new FormData(event.currentTarget).get('score');
  try { localStorage.setItem('mayukh-rating', score); saved = score; status.textContent = `Thank you! Your ${score}/5 rating is saved in this browser only.`; }
  catch { status.textContent = 'Thank you! Browser storage is unavailable, so your rating could not be saved.'; }
});
const started = Date.now();
document.addEventListener('mouseout', event => { if (!prompted && !event.relatedTarget && event.clientY <= 0 && Date.now() - started > 15000 && matchMedia('(pointer: fine)').matches) openRating(); });
if ('IntersectionObserver' in window) {
  const endObserver = new IntersectionObserver(entries => { if (entries.some(entry => entry.isIntersecting) && !prompted && Date.now() - started > 20000) openRating(); }, { threshold: 0.8 });
  endObserver.observe(document.querySelector('footer'));
}
