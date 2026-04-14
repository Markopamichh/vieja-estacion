// Mobile navigation — burger toggles full-screen overlay
const burger = document.getElementById('burger');
const overlay = document.getElementById('mobile-overlay');
const overlayClose = document.getElementById('overlay-close');
const overlayLinks = document.querySelectorAll('.mobile-overlay__links a');

function openMenu() {
  overlay?.classList.add('open');
  document.body.style.overflow = 'hidden';
  burger?.setAttribute('aria-expanded', 'true');
}

function closeMenu() {
  overlay?.classList.remove('open');
  document.body.style.overflow = '';
  burger?.setAttribute('aria-expanded', 'false');
}

burger?.addEventListener('click', openMenu);
overlayClose?.addEventListener('click', closeMenu);

// Close on link click
overlayLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});
