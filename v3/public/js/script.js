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

// TEXT ANIMATION EFFECT for HERO Section
const letterBoxes = document.querySelectorAll('[data-letter-effect]'); // get all letter boxes

let activeLetterBoxIndex = 0; // set active letter box index to 0
let lastActiveLetterBoxIndex = 0; // set last active letter box index to 0
let totalLetterBoxDelay = 0; // set total letter box delay to 0

const setLetterEffect = function () {
  // loop through all letter boxes
  for (let i = 0; i < letterBoxes.length; i++) {
    // set initial animation delay to 0
    let letterAnimationDelay = 0;

    // get all characters from the current letter box
    const letters = letterBoxes[i].textContent.trim();
    // remove all character from the current letter box
    letterBoxes[i].textContent = '';

    // loop through all the letters
    for (let j = 0; j < letters.length; j++) {
      // create a span
      const span = document.createElement('span');
      // set animation delay on span
      span.style.animationDelay = `${letterAnimationDelay}s`;

      // set the "in" class on the span, if current letter box is active
      // otherwise set the "out" class
      // span.className = i === activeLetterBoxIndex ? 'in' : 'out';
      if (i === activeLetterBoxIndex) {
        span.classList.add('in');
      } else {
        span.classList.add('out');
      }

      // pass current letter into the span
      span.textContent = letters[j];
      // add space class on span, when current letter is a space
      if (letters[j] === ' ') span.classList.add('space');

      // pass the span on the current letter box
      letterBoxes[i].appendChild(span);
      // skip letterAnimationDelay when loop is in the last index
      if (j >= letters.length - 1) break;
      // otherwise update letterAnimationDelay
      letterAnimationDelay += 0.05;
    }

    // get total delay of active letter box
    if (i === activeLetterBoxIndex) {
      totalLetterBoxDelay = Number(letterAnimationDelay.toFixed(2));
    }

    // add active clas on last active letter box
    if (i === lastActiveLetterBoxIndex) {
      letterBoxes[i].classList.add('active');
    } else {
      letterBoxes[i].classList.remove('active');
    }
  }

  setTimeout(function () {
    lastActiveLetterBoxIndex = activeLetterBoxIndex;

    // update activeLetterBoxIndex based on total letter boxes
    activeLetterBoxIndex >= letterBoxes.length - 1
      ? (activeLetterBoxIndex = 0)
      : activeLetterBoxIndex++;

    setLetterEffect(); // call setLetterEffect function
  }, totalLetterBoxDelay * 1000 + 3000);
};

// call the letter effect function after window is loaded
window.addEventListener('load', setLetterEffect);

/**
 * Back to Top Button
 */
const backToTopBtn = document.querySelector('[data-back-top-btn]'); // get back to top button

window.addEventListener('scroll', function () {
  const bodyHeight = document.body.scrollHeight; // get body height
  const windowHeight = window.innerHeight; // get window height
  const scrollEndPos = bodyHeight - windowHeight; // get scroll end position
  const totalScrollPercent = (window.scrollY / scrollEndPos) * 100; // get total scroll percentage

  backToTopBtn.textContent = `${totalScrollPercent.toFixed(0)}%`; // set total scroll percentage on back to top button

  // show back to top button when total scroll percentage is greater than 5
  if (totalScrollPercent > 5) {
    backToTopBtn.classList.add('show'); // add show class to back to top button
  } else {
    backToTopBtn.classList.remove('show'); // remove show class from back to top button
  }
});
