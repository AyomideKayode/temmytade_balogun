import React from 'react';
import { getCategoryImages } from '@/lib/gallery-local';
import GalleryGrid from '../components/GalleryGrid';
import ScriptInitializer from '../components/ScriptInitializer';

export const metadata = {
  title: 'Videography | Tadz Media Concepts',
  description: 'Videography portfolio',
};

export default async function Videography() {
  const images = await getCategoryImages('videography');

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
