// lib/legacy/script.js
export function initScript() {
  'use strict';
  // script for helper functions and utilities

  // add event listeners to multiple elements
  export const addEventOnElements = (elements, eventType, callback) => {
    elements.forEach((element) => {
      element.addEventListener(eventType, callback);
    });
  };

  // Preloading Animation Effect
  export const initPreloader = () => {
    const loadingElement = document.querySelector('[data-loading]');

    window.addEventListener('load', function () {
      loadingElement.classList.add('loaded'); // add loaded class to loading element
      this.document.body.classList.remove('active'); // remove active class from body
    });
  };
}
