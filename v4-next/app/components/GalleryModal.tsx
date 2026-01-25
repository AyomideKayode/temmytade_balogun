'use client';

import React, { useEffect, useRef } from 'react';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
}

export default function GalleryModal({ isOpen, onClose, images }: GalleryModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && e.target === modalRef.current) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      window.addEventListener('click', handleClickOutside);
      // Disable body scroll when modal is open? Legacy script didn't explicitly do this for modal,
      // but it's good practice. Legacy script did `body.active` for Nav, not Modal.
      // We will stick to legacy behavior (no scroll lock) to be safe, or just follow exact CSS.
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="imageModal"
      className="modal"
      style={{ display: 'block' }}
      ref={modalRef}
    >
      <div className="modal_content">
        <span className="close" onClick={onClose}>&times;</span>
        <div className="modal_images">
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Gallery image ${index + 1}`}
              className="modal_image"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
