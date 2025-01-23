'use strict'; // use strict mode meaning that the code should be executed in strict mode

// add event listeners to multiple elements
const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0; i < elements.length; i++) {
    // loop through all elements
    elements[i].addEventListener(eventType, callback); // add event listener to each element
  }
};

/**
 * Preloading Animation Effect
 */
const loadingElement = document.querySelector('[data-loading]'); // get loading element

window.addEventListener('load', function () {
  loadingElement.classList.add('loaded'); // add loaded class to loading element
  this.document.body.classList.remove('active'); // remove active class from body
});

/**
 * Nav Toggle Functionality for Mobile
 */
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

/**
 * Header Active Class on Scroll
 */
const header = document.querySelector('[data-header]'); // get header element

const activeElementOnScroll = function () {
  if (window.scrollY > 50) {
    header.classList.add('active'); // add active class to header
  } else {
    header.classList.remove('active'); // remove active class from header
  }
};

window.addEventListener('scroll', activeElementOnScroll); // add scroll event to window

/**
 * Text Animation Effect for HERO Section
 */
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

/**
 * Scroll Reveal Animation
 */
const revealElements = document.querySelectorAll('[data-reveal]'); // get all reveal elements

const scrollReveal = function () {
  for (let i = 0; i < revealElements.length; i++) {
    // check if element is in view
    const elementIsInView =
      revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.15;

    if (elementIsInView) {
      revealElements[i].classList.add('revealed'); // add revealed class to element
    } else {
      revealElements[i].classList.remove('revealed'); // remove revealed class from element
    }
  }
};

window.addEventListener('scroll', scrollReveal); // add scroll event to window
scrollReveal(); // call scrollReveal function

/**
 * Gallery Modal Effect
 */
document.addEventListener('DOMContentLoaded', function () {
  const modal = this.getElementById('imageModal');
  const modalContent = document.querySelector('.modal_images');
  const closeModal = document.querySelector('.close');

  // create collection of images
  const imageCollections = {
    'The Drunken': [
      './images/owambe_meats.jpg',
      './images/dodo_vegetable.jpg',
      './images/bolognese.jpg',
      // more images...
    ],
    'Lettuce Entertain': [
      './images/category-1.jpg',
      './images/category-2.jpg',
      './images/category-3.jpg',
      // more images...
    ],
  };

  // get card title elements
  document.querySelectorAll('.card_title').forEach((title) => {
    title.addEventListener('click', function (event) {
      event.preventDefault(); // prevent default action
      const cardTitle = this.textContent.trim(); // get card title text content

      // clear existing images
      modalContent.innerHTML = '';

      // populate modal with images based on card title
      if (imageCollections[cardTitle]) {
        imageCollections[cardTitle].forEach((imageSrc) => {
          const img = document.createElement('img');
          img.src = imageSrc;
          img.alt = cardTitle;
          modalContent.appendChild(img);
        });
        // open modal
        modal.style.display = 'block';
      }
    });
  });

  // close modal
  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // close modal when clicked outside the modal content
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
});

/**
 * Custom Cursor Effect
 */
const cursor = document.querySelector('[data-cursor]'); // get cursor element
const anchorElements = document.querySelectorAll('a'); // get all anchor elements
const buttons = document.querySelectorAll('button'); // get all button elements

// change cursorElement position based on mouse position
document.body.addEventListener('mousemove', function (event) {
  setTimeout(function () {
    // set cursorElement position based on mouse position
    cursor.style.top = `${event.clientY}px`;
    cursor.style.left = `${event.clientX}px`;
  }, 100);
});

// add cursor hovered class on cursorElement when mouse is hovered on anchor elements
const hoverActive = function () {
  cursor.classList.add('hovered'); // add hovered class to cursorElement
};

// remove cursor hovered class on cursorElement when mouse is not hovered on anchor elements
const hoverInactive = function () {
  cursor.classList.remove('hovered'); // remove hovered class from cursor
};

// add hover effect on cursor, when hovered on any button or hyperlink
addEventOnElements(anchorElements, 'mouseover', hoverActive); // add mouseover event on anchor elements
addEventOnElements(anchorElements, 'mouseout', hoverInactive); // add mouseout event on anchor elements
// add mouseover event on buttons
addEventOnElements(buttons, 'mouseover', hoverActive);
addEventOnElements(buttons, 'mouseout', hoverInactive);

// add disabled class on cursorElement, when mouse is out of body
document.body.addEventListener('mouseleave', function () {
  cursor.classList.add('disabled'); // add disabled class to cursorElement
});
// remove disabled class on cursorElement, when mouse is in body
document.body.addEventListener('mouseenter', function () {
  cursor.classList.remove('disabled'); // remove disabled class from cursorElement
});
