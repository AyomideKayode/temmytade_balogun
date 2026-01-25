'use client';

import React from 'react';

interface GalleryGridProps {
  images: string[];
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  if (!images || images.length === 0) {
    return (
      <div className="category_text">
        <p>No images found for this category.</p>
      </div>
    );
  }

  return (
    <div className="category_gallery">
      {images.map((src, index) => (
        <img key={index} src={src} alt="Gallery image" loading="lazy" />
      ))}
    </div>
  );
}
