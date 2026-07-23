// GSAP ScrollTrigger animations — initialized after DOM ready
// GSAP is loaded via CDN in BaseLayout.astro

declare const gsap: any;
declare const ScrollTrigger: any;

document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // ── Header scroll behavior ──────────────────────────────────────
  const header = document.getElementById('site-header');
  if (header) {
    ScrollTrigger.create({
      start: 'top -80',
      onEnter: () => header.classList.add('scrolled'),
      onLeaveBack: () => header.classList.remove('scrolled'),
    });
  }

  // ── Generic reveal — elements with .reveal class ────────────────
  gsap.utils.toArray('.reveal').forEach((el: HTMLElement) => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power2.out',
    });
  });

  // ── Historia image clip-path reveals ───────────────────────────
  gsap.utils.toArray('.history-img').forEach((el: HTMLElement) => {
    // Skip on mobile (clip-path disabled via CSS inset 0 0%)
    if (window.innerWidth <= 768) return;

    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 82%',
        toggleActions: 'play none none none',
      },
      clipPath: 'inset(0 0% 0 0)',
      duration: 1.1,
      ease: 'power3.inOut',
    });
  });
});
