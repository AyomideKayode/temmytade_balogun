import React from 'react';
import { getCategoryImages } from '@/lib/gallery-local';
import GalleryGrid from '../components/GalleryGrid';
import ScriptInitializer from '../components/ScriptInitializer';

export const metadata = {
  title: 'Wedding Photography | Tadz Media Concepts',
  description: 'Wedding photography portfolio',
};

export default async function WeddingPhotography() {
  const images = await getCategoryImages('wedding-photography');

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
