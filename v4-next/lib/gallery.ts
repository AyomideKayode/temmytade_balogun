import * as LocalGallery from './gallery-local';
import * as CloudinaryGallery from './cloudinary';

// Check environment variable to determine source
const useCloudinary = process.env.USE_CLOUDINARY === 'true';

/**
 * Get all images under a category.
 * Includes images in subfolders (collections).
 */
export async function getCategoryImages(category: string): Promise<string[]> {
  if (useCloudinary) {
    return CloudinaryGallery.getCategoryImages(category);
  }
  return LocalGallery.getCategoryImages(category);
}

/**
 * Get images for a specific collection inside a category.
 */
export async function getCollectionImages(
  category: string,
  collection: string,
): Promise<string[]> {
  if (useCloudinary) {
    return CloudinaryGallery.getCollectionImages(category, collection);
  }
  return LocalGallery.getCollectionImages(category, collection);
}
