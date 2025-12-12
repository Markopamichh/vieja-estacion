// Mobile navigation toggle script
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

if (burger && nav) {
  burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('nav-active');

    // Animate Links
    navLinks.forEach((link, index) => {
      const linkElement = link as HTMLElement;
      if (linkElement.style.animation) {
        linkElement.style.animation = '';
      } else {
        linkElement.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
      }
    });

    // Burger Animation
    burger.classList.toggle('toggle');
  });
}
