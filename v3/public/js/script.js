'use strict'; // use strict mode meaning that the code should be executed in strict mode

// add event listeners to multiple elements
const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0; i < elements.length; i++) {
    // loop through all elements
    elements[i].addEventListener(eventType, callback); // add event listener to each element
  }
};

// PRELOADING
const loadingElement = document.querySelector('[data-loading]'); // get loading element

window.addEventListener('load', function () {
  loadingElement.classList.add('loaded'); // add loaded class to loading element
  this.document.body.classList.remove('active'); // remove active class from body
});

// Mobile Nav Toggle Function
const [navTogglers, navLinks, navbar, overlay] = [
  document.querySelectorAll('[data-nav-toggler]'),
  document.querySelectorAll('[data-nav-link]'),
  document.querySelector('[data-navbar]'),
  document.querySelector('[data-overlay]'),
];

const toggleNav = function () {
  navbar.classList.toggle('active'); // toggle active class on navbar
  overlay.classList.toggle('active'); // toggle active class on overlay
  document.body.classList.toggle('active'); // toggle active class on body
};

addEventOnElements(navTogglers, 'click', toggleNav); // add click event to navTogglers

const closeNav = function () {
  navbar.classList.remove('active'); // remove active class from navbar
  overlay.classList.remove('active'); // remove active class from overlay
  document.body.classList.remove('active'); // remove active class from body
};

addEventOnElements(navLinks, 'click', closeNav); // add click event to navLinks

// Header
const header = document.querySelector('[data-header]'); // get header element

const activeElementOnScroll = function () {
  if (window.scrollY > 50) {
    header.classList.add('active'); // add active class to header
  } else {
    header.classList.remove('active'); // remove active class from header
  }
};

window.addEventListener('scroll', activeElementOnScroll); // add scroll event to window
