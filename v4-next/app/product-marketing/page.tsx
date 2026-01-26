import React from 'react';
import { getCategoryImages } from '@/lib/gallery-local';
import GalleryGrid from '../components/GalleryGrid';
import ScriptInitializer from '../components/ScriptInitializer';

export const metadata = {
  title: 'Product Marketing | Tadz Media Concepts',
  description: 'Product marketing photography portfolio',
};

export default async function ProductMarketing() {
  const images = await getCategoryImages('product-marketing');

  return (
    <main>
      <ScriptInitializer />
      <section className='section gallery'>
        <div className='container'>
          <GalleryGrid images={images} />
        </div>
      </section>
    </main>
  );
}
