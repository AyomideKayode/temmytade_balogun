import React from 'react';
import HomeClient from './components/HomeClient';
import { getCollectionImages } from '@/lib/gallery-local';

export default async function Home() {
  // Define the collections we need to fetch
  // These keys match the text content of .card_title in HomeClient
  const collectionKeys = [
    'Grublane',
    'Lettuce Entertain',
    'The Art of Style',
    'Juan More Taco',
    'Moments in Motion',
    'Cookie Monstah',
    'Happily Ever After in Frames',
    'The Lockhart Bar',
    'Shoe Promo',
    'Wedding Shot',
    'Fashion Show',
    '12 Baskets ~ Small Chops'
  ];

  // We need to map these keys to likely Categories for the search
  // This helps getCollectionImages find the folder faster or fallback correctly
  const categoryHints: Record<string, string> = {
    'Grublane': 'product',
    'Lettuce Entertain': 'lettuce-entertain', // or default
    'The Art of Style': 'portraits',
    'Juan More Taco': 'product',
    'Moments in Motion': 'portraits',
    'Cookie Monstah': 'wedding-photography', // or event
    'Happily Ever After in Frames': 'wedding-photography',
    'The Lockhart Bar': 'product',
    'Shoe Promo': 'product',
    'Wedding Shot': 'wedding-photography',
    'Fashion Show': 'portraits',
    '12 Baskets ~ Small Chops': 'event-photography' // or product?
  };

  const galleryData: Record<string, string[]> = {};

  for (const key of collectionKeys) {
    // We clean the key for the folder search (e.g. remove " ~ Small Chops" if needed,
    // but getCollectionImages handles normalization).
    // Ideally we pass "12 Baskets" for "12 Baskets ~ Small Chops" if the folder is "12-baskets".

    let searchKey = key;
    if (key === '12 Baskets ~ Small Chops') searchKey = '12 Baskets';

    const category = categoryHints[key] || 'product'; // Default to product if unknown
    const images = await getCollectionImages(category, searchKey);
    galleryData[key] = images;
  }

  return <HomeClient galleryData={galleryData} />;
}
