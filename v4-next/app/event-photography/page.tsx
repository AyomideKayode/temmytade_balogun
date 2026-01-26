import React from 'react';
import { getCategoryImages } from '@/lib/gallery-local';
import GalleryGrid from '../components/GalleryGrid';
import ScriptInitializer from '../components/ScriptInitializer';

export const metadata = {
  title: 'Event Photography | Tadz Media Concepts',
  description: 'Event photography portfolio',
};

export default async function EventPhotography() {
  const images = await getCategoryImages ('event-photography');

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
