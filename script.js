const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');
const legacyMenuButton = document.querySelector('#nav button');
const legacyNavLinks = document.querySelector('#nav .navrght');

if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const open = navLinks.classList.toggle('is-open');
    menuButton.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
  });
  navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    menuButton.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
  }));
}

if (legacyMenuButton && legacyNavLinks) {
  legacyMenuButton.addEventListener('click', () => {
    const open = legacyNavLinks.toggleAttribute('data-open');
    legacyMenuButton.setAttribute('aria-expanded', String(open));
  });
  legacyNavLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    legacyNavLinks.removeAttribute('data-open');
    legacyMenuButton.setAttribute('aria-expanded', 'false');
  }));
}

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.reveal, [data-reveal]');

const showItem = (item) => {
  if (item.hasAttribute('data-reveal')) item.setAttribute('data-visible', 'true');
  else item.classList.add('is-visible');
};

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach(showItem);
} else {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        showItem(entry.target);
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -28px' });
  revealItems.forEach((item) => observer.observe(item));
}
