'use strict';
// populateGallery.js
// Populate Gallery with images from the respective folder
document.addEventListener('DOMContentLoaded', function () {
  const gallery = document.querySelector('.category_gallery');
  const category = document.body.getAttribute('data-category');
  const categoryPath = `/images/${category}`;

  fetch(categoryPath)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Category not found');
      }
      return response.json();
    })
    .then((images) => {
      images.forEach((src) => {
        const img = document.createElement('img');
        img.src = `${categoryPath}/${src}`;
        img.alt = category;
        img.loading = 'lazy';
        gallery.appendChild(img);
      });
    })
    .catch((error) => {
      console.error('Error fetching images:', error);
    });
});
