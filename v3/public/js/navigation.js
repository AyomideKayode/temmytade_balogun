'use strict';
// script for navbar functions and responsive design
// and all related functions

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

  addEventOnElements(navTogglers, 'click', toggleNav);
  addEventOnElements(navLinks, 'click', closeNav);
};

/**
 * Header Active Class on Scroll
 */
export const initHeaderOnScroll = () => {
  const header = document.querySelector('[data-header]');

  window.addEventListener('scroll', () => {
    header.classList.toggle('active', window.scrollY > 50);
  });
};

/**
 * Back to Top functionality
 */
export const initBackToTop = () => {
  const backToTopBtn = document.querySelector('[data-back-top-btn]');

  window.addEventListener('scroll', () => {
    // get scroll end position using scrollHeight and window.innerHeight
    const scrollEndPos = document.body.scrollHeight - window.innerHeight;
    // get total scroll percentage
    const scrollPercent = (window.scrollY / scrollEndPos) * 100;

    backToTopBtn.textContent = `${scrollPercent.toFixed(0)}%`; // show scroll percentage on button
    // toggle back to top button visibility
    backToTopBtn.classList.toggle('show', scrollPercent > 5);
  });
};
