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
})