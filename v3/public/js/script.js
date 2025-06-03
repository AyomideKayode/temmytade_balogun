'use strict'; // use strict mode meaning that the code should be executed in strict mode

// import helper functions and utilities
import { addEventOnElements } from './utils.js';
import { initPreloader } from './utils.js';
import { initNavbar } from './navigation.js';
import { initHeaderOnScroll } from './navigation.js';
import { initBackToTop } from './navigation.js';

initPreloader(); // call initPreloader function
initNavbar(); // call initNavbar function
initHeaderOnScroll(); // call initHeaderOnScroll function
initBackToTop(); // call initBackToTop function

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
    Grublane: [
      './images/product/grublane_pizza.jpg',
      './images/product/grublane_wideshot.jpg',
      './images/product/grublane_jollof.jpg',
      './images/product/grublane_2.jpg',
      './images/product/grublane_english-breakfast.jpg',
      './images/product/grublane_coconut-rice.jpg',
      './images/product/grublane_3.jpg',
      './images/product/grublane_4.jpg',
      './images/product/grublane_5.jpg',
      './images/product/grublane_6.jpg',
      './images/product/grublane_1.jpg',
      './images/product/grublane_7.jpg',
      './images/product/grublane_8.jpg',
    ],
    'Lettuce Entertain': [
      './images/category-1.jpg',
      './images/category-2.jpg',
      './images/category-3.jpg',
    ],
    'The Art of Style': [
      './images/potraits/potrait_10.png',
      './images/potraits/potrait_5.png',
      './images/potraits/potrait_1.png',
      './images/potraits/potrait_6.png',
      './images/potraits/potrait_15.png',
    ],
    'Moments in Motion': [
      './images/potraits/potrait_2.png',
      './images/potraits/potrait_7.jpg',
      './images/potraits/potrait_12.jpg',
      './images/potraits/potrait_8.jpg',
      './images/potraits/potrait_11.png',
      './images/potraits/potrait_13.jpg',
      './images/potraits/potrait_16.jpg',
      './images/potraits/potrait_3.png',
      './images/potraits/potrait_9.jpg',
      './images/potraits/potrait_4.png',
      './images/potraits/potrait_14.jpg',
    ],
    'Happily Ever After in Frames': [
      './images/wedding-photography/category-8.jpg',
      './images/wedding-photography/footer-1.jpg',
      './images/wedding-photography/footer-4.jpg',
      './images/wedding-photography/gallery-6.jpg',
      './images/wedding-photography/gallery-7.jpg',
      './images/wedding-photography/portfolio-2.jpg',
      './images/wedding-photography/service-1.jpg',
      './images/wedding-photography/wedding_1.jpg',
      './images/wedding-photography/wedding_2.jpg',
      './images/wedding-photography/wedding_3.jpg',
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
 * Get Elements for Contact Form display and hide
 * Modal Effect - Toggle
 */
const contactModalBtn = document.querySelector('.contact_modal_btn'); // get contact modal button
const contactModalBtnImage = document.querySelector('.contact_modal_btn img'); // get contact modal button
const contactModal = document.querySelector('.contact_modal'); // get contact modal

// create function to toggle contact modal with the button
const toggleContactModal = function () {
  contactModal.classList.toggle('hidden'); // toggle hidden class on contact modal
  contactModalBtnImage.classList.toggle('rotate');
};

// add click event to contact modal button
contactModalBtn.addEventListener('click', toggleContactModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !contactModal.classList.contains('hidden')) {
    toggleContactModal();
  }
});

/**
 * Get Form Elements
 * Contact Form Submission Functionality
 * Email Validation
 */
const form = document.querySelector('form');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const subject = document.getElementById('subject');
const message = document.getElementById('message');
const result = document.getElementById('result');

// add input for Web3Forms access key
const accessKeyInput = document.createElement('input');
accessKeyInput.type = 'hidden'; // set input type to hidden
accessKeyInput.name = 'access_key';
accessKeyInput.value = 'de28c4b6-5665-49a5-a0ff-cf52c82dd664'; // set access key value
form.appendChild(accessKeyInput); // append access key input to form

// create sendEmail function with the Web3Forms API
function sendEmail() {
  const formData = new FormData(form);
  // formData.append('name', `${firstName.value} ${lastName.value}`);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  result.textContent = 'Sending...📸';

  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: json,
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status === 200) {
        result.textContent = 'Message sent successfully! 📩';
      } else {
        console.log(response)
        result.textContent =
          'Something went wrong. Please try again later.' ||
          `Error: ${json.message} ❌`;
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      result.textContent =
        'An error occurred while sending the message. Please try again later. ❌';
    })
    .finally(() => {
      form.reset(); // reset form fields after submission
      setTimeout(() => {
        result.style.display = 'none'; // hide result message after 3 seconds
      }, 3000);
    });
}

// create function to validate email
function isValidEmail() {
  // regex for email validation
  const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;

  const errTxtEmail = document.querySelector('.error_txt.email'); // get error text for email

  // verify email value matches regex pattern
  if (!email.value.match(emailRegex)) {
    email.classList.add('error');
    email.parentElement.classList.add('error');

    // display appropriate error message based on email value
    if (email.value !== '') {
      errTxtEmail.textContent = 'Please enter a valid email address.';
    } else {
      errTxtEmail.textContent = 'Email is required.';
    }
  } else {
    email.classList.remove('error');
    email.parentElement.classList.remove('error');
    errTxtEmail.textContent = '';
  }
}

// create function to validate form inputs
function validateInputs() {
  const items = document.querySelectorAll('.item');

  items.forEach((item) => {
    if (item.value === '') {
      item.classList.add('error');
      item.parentElement.classList.add('error');
    }

    // Check email validity if the email input is not empty
    if (items[2].value !== '') {
      isValidEmail();
    }

    // Add event listener to the email input for real-time email validation
    items[2].addEventListener('keyup', () => {
      isValidEmail();
    });

    // Add event listener to each input for real-time error handling
    item.addEventListener('keyup', () => {
      if (item.value !== '') {
        // Remove error styles if the input value is not empty
        item.classList.remove('error');
        item.parentElement.classList.remove('error');
      } else {
        // Add error styles if the input value is empty
        item.classList.add('error');
        item.parentElement.classList.add('error');
      }
    });
  });
}

// Add event listener to the form for form submission
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent default form submission behavior

  validateInputs(); // Check if any input fields are empty and add error styles

  // Check if all input fields do not have the error class
  if (
    !firstName.classList.contains('error') &&
    !lastName.classList.contains('error') &&
    !email.classList.contains('error') &&
    !subject.classList.contains('error') &&
    !message.classList.contains('error')
  ) {
    sendEmail(); // If all input fields are valid, send the email
  }

  form.reset(); // Reset form fields after submission
  return false; // Prevent form submission
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

// Reverted back to previous working commit

// add disabled class on cursorElement, when mouse is out of body
document.body.addEventListener('mouseleave', function () {
  cursor.classList.add('disabled'); // add disabled class to cursorElement
});
// remove disabled class on cursorElement, when mouse is in body
document.body.addEventListener('mouseenter', function () {
  cursor.classList.remove('disabled'); // remove disabled class from cursorElement
});

// handle services section page navigation
document.querySelectorAll('#services .btn_icon').forEach((button) => {
  button.addEventListener('click', function (event) {
    event.preventDefault(); // prevent default action
    const category = this.getAttribute('data-category'); // get category attribute
    window.location.href = `/${category}.html`; // redirect to respective category page
  });
});
