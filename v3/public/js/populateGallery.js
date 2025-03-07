'use strict';
// populateGallery.js
// Populate Gallery with images from the respective folder
document.addEventListener('DOMContentLoaded', function () {
  const gallery = document.querySelector('.category_gallery');
  const category = document.body.getAttribute('data-category');

  // Define image paths for each category
  const imageCategories = {
    'wedding-photography': [
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
    'event-photography': [
      './images/event-photography/12baskets_5.jpg',
      './images/event-photography/12baskets_6.jpg',
      './images/event-photography/12baskets_7.jpg',
      './images/event-photography/12baskets_8.jpg',
      './images/event-photography/12baskets_9.jpg',
      './images/event-photography/12baskets_10.jpg',
    ],
    'product-marketing': [
      './images/product/product_1.jpg',
      './images/product/product_2.jpg',
      './images/product/product_3.jpg',
    ],
    videography: [
      './images/video/video_1.jpg',
      './images/video/video_2.jpg',
      './images/video/video_3.jpg',
    ],
  };

  // populate gallery with imgs based on category
  if (imageCategories[category]) {
    imageCategories[category].forEach((src) => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = category;
      img.loading = 'lazy';
      gallery.appendChild(img);
    });
  } else {
    console.error('Category not found');
  }

  // const categoryPath = `/images/${category}`;
  // fetch(categoryPath)
  //   .then((response) => {
  //     if (!response.ok) {
  //       throw new Error('Category not found');
  //     }
  //     return response.json();
  //   })
  //   .then((images) => {
  //     images.forEach((src) => {
  //       const img = document.createElement('img');
  //       img.src = `${categoryPath}/${src}`;
  //       img.alt = category;
  //       img.loading = 'lazy';
  //       gallery.appendChild(img);
  //     });
  //   })
  //   .catch((error) => {
  //     console.error('Error fetching images:', error);
  //   });
});
