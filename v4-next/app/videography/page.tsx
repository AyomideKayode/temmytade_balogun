import React from 'react';
import { getCategoryImages } from '@/lib/gallery';
import GalleryGrid from '../components/GalleryGrid';
import ScriptInitializer from '../components/ScriptInitializer';

export const metadata = {
  title: 'Videography | Tadz Media Concepts',
  description: 'Videography portfolio',
};

export const revalidate = 3600;

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
