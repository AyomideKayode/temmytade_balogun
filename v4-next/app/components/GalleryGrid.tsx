import React from "react";

const imageCategories: Record<string, string[]> = {
  "wedding-photography": [
    "/images/wedding-photography/category-8.jpg",
    "/images/wedding-photography/wedding_1.jpg",
    "/images/wedding-photography/gallery-6.jpg",
    "/images/wedding-photography/wedding_4.jpg",
    "/images/wedding-photography/gallery-7.jpg",
    "/images/wedding-photography/wedding_2.jpg",
    "/images/wedding-photography/portfolio-2.jpg",
    "/images/wedding-photography/wedding_5.jpg",
    "/images/wedding-photography/service-1.jpg",
    "/images/wedding-photography/wedding_3.jpg",
    "/images/wedding-photography/wedding_7.jpg",
    "/images/wedding-photography/wedding_6.jpg",
  ],
  "event-photography": [
    "/images/event-photography/event_1.jpg",
    "/images/event-photography/event_2.jpg",
    "/images/event-photography/event_3.jpg",
    "/images/event-photography/12baskets_8.jpg",
    "/images/event-photography/12baskets_9.jpg",
    "/images/event-photography/12baskets_10.jpg",
    "/images/event-photography/event_4.jpg",
    "/images/event-photography/event_5.jpg",
    "/images/event-photography/event_6.jpg",
    "/images/event-photography/12baskets_5.jpg",
    "/images/event-photography/12baskets_6.jpg",
    "/images/event-photography/12baskets_7.jpg",
    "/images/event-photography/event_10.jpg",
    "/images/event-photography/event_15.jpg",
    "/images/event-photography/event_12.jpg",
    "/images/event-photography/event_7.jpg",
    "/images/event-photography/event_8.jpg",
    "/images/event-photography/event_9.jpg",
    "/images/event-photography/event_13.jpg",
    "/images/event-photography/event_11.jpg",
    "/images/event-photography/event_17.jpg",
    "/images/event-photography/event_14.jpg",
    "/images/event-photography/event_19.jpg",
    "/images/event-photography/event_16.jpg",
    "/images/event-photography/event_18.jpg",
    "/images/event-photography/event_22.jpg",
    "/images/event-photography/event_20.jpg",
    "/images/event-photography/event_21.jpg",
    "/images/event-photography/event_23.jpg",
    "/images/event-photography/event_24.jpg",
    "/images/event-photography/event_25.jpg",
    "/images/event-photography/event_26.jpg",
    "/images/event-photography/event_27.jpg",
  ],
  "product-marketing": [
    "/images/product/product_marketing_1.jpg",
    "/images/product/grublane_pizza.jpg",
    "/images/product/product_marketing_2.jpg",
    "/images/product/grublane_wideshot.jpg",
    "/images/product/product_marketing_3.jpg",
    "/images/product/grublane_jollof.jpg",
    "/images/product/product_marketing_4.jpg",
    "/images/product/grublane_2.jpg",
    "/images/product/product_marketing_5.jpg",
    "/images/product/grublane_english-breakfast.jpg",
    "/images/product/product_marketing_6.jpg",
    "/images/product/grublane_coconut-rice.jpg",
    "/images/product/product_marketing_7.jpg",
    "/images/product/grublane_3.jpg",
    "/images/product/product_marketing_8.jpg",
    "/images/product/grublane_4.jpg",
    "/images/product/product_marketing_9.jpg",
    "/images/product/grublane_5.jpg",
    "/images/product/product_marketing_10.jpg",
    "/images/product/grublane_1.jpg",
    "/images/product/product_marketing_11.jpg",
    "/images/product/grublane_6.jpg",
    "/images/product/product_marketing_12.jpg",
    "/images/product/grublane_7.jpg",
    "/images/product/grublane_8.jpg",
  ],
  videography: [
    "/images/video/video_1.jpg",
    "/images/video/video_2.jpg",
    "/images/video/video_3.jpg",
  ],
};

interface GalleryGridProps {
  category: string;
}

export default function GalleryGrid({ category }: GalleryGridProps) {
  const images = imageCategories[category];

  if (!images) {
    console.error(`Category not found: ${category}`);
    return null;
  }

  return (
    <div className="category_gallery">
      {images.map((src, index) => (
        <img key={index} src={src} alt={category} loading="lazy" />
      ))}
    </div>
  );
}
