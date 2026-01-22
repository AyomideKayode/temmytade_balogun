import { addEventOnElements } from './utils.js';

/**
 * Nav Toggle Functionality for Mobile
 */
export const initNavbar = () => {
  const [navTogglers, navLinks, navbar, overlay] = [
    document.querySelectorAll('[data-nav-toggler]'),
    document.querySelectorAll('[data-nav-link]'),
    document.querySelector('[data-navbar]'),
    document.querySelector('[data-overlay]'),
  ];

  if (!navbar || !overlay) return;

  const toggleNav = () => {
    navbar.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.classList.toggle('active');
  };

  const closeNav = () => {
    navbar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('active');
  };

  if (navTogglers.length) addEventOnElements(navTogglers, 'click', toggleNav);
  if (navLinks.length) addEventOnElements(navLinks, 'click', closeNav);
};

/**
 * Header Active Class on Scroll
 */
export const initHeaderOnScroll = () => {
  const header = document.querySelector('[data-header]');
  if (!header) return;

  const handleScroll = () => {
    header.classList.toggle('active', window.scrollY > 50);
  };

  window.addEventListener('scroll', handleScroll);

  // Cleanup function for React useEffect
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};

/**
 * Back to Top functionality
 */
export const initBackToTop = () => {
  const backToTopBtn = document.querySelector('[data-back-top-btn]');
  if (!backToTopBtn) return;

  const handleScroll = () => {
    const scrollEndPos = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (window.scrollY / scrollEndPos) * 100;

    backToTopBtn.textContent = `${scrollPercent.toFixed(0)}%`;
    backToTopBtn.classList.toggle('show', scrollPercent > 5);
  };

  window.addEventListener('scroll', handleScroll);

  // Cleanup function for React useEffect
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};
