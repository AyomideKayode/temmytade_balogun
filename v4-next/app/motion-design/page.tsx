import React from 'react';
import { getCategoryImages } from '@/lib/gallery-local';
import GalleryGrid from '../components/GalleryGrid';
import ScriptInitializer from '../components/ScriptInitializer';

export const metadata = {
  title: 'Motion Design | Tadz Media Concepts',
  description: 'Motion design portfolio',
};

export default async function MotionDesign() {
  const images = await getCategoryImages('motion-design');

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
