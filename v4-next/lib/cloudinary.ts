import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Maps legacy/shorthand category keys to the strict Cloudinary folder structure.
 * Cloudinary folders must strictly mirror route slugs (e.g., 'product-marketing').
 */
const FOLDER_MAP: Record<string, string> = {
  product: 'product-marketing',
  'product-marketing': 'product-marketing',
  'wedding-photography': 'wedding-photography',
  'event-photography': 'event-photography',
  videography: 'videography',
  'motion-design': 'motion-design',
  portraits: 'portraits',
};

const ROOT_FOLDER = 'tadz';

/**
 * Fetch all images in a category (including sub-collections).
 * Matches behavior of gallery-local (recursive).
 */
export async function getCategoryImages(category: string): Promise<string[]> {
  const folderName = FOLDER_MAP[category] ?? category;
  // Use wildcard to include subfolders (collections)
  const searchFolder = `${ROOT_FOLDER}/${folderName}/*`;

  try {
    const result = await cloudinary.search
      .expression(`folder:"${searchFolder}"`)
      .sort_by('public_id', 'desc')
      .max_results(500) // generous limit
      .execute();

    return result.resources.map((r: any) => r.secure_url);
  } catch (error) {
    console.error(
      `[Cloudinary] Error fetching category '${category}' from '${searchFolder}':`,
      error,
    );
    return [];
  }
}

/**
 * Fetch images in a specific collection.
 */
export async function getCollectionImages(
  category: string,
  collection: string,
): Promise<string[]> {
  const categoryFolder = FOLDER_MAP[category] ?? category;

  // Normalize collection name to kebab-case to match folder conventions
  // e.g. "Juan More Taco" -> "juan-more-taco"
  const collectionFolder = collection
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

  const searchFolder = `${ROOT_FOLDER}/${categoryFolder}/${collectionFolder}/*`;

  try {
    const result = await cloudinary.search
      .expression(`folder:"${searchFolder}"`)
      .sort_by('public_id', 'desc')
      .max_results(500)
      .execute();

    return result.resources.map((r: any) => r.secure_url);
  } catch (error) {
    console.error(
      `[Cloudinary] Error fetching collection '${collection}' from '${searchFolder}':`,
      error,
    );
    return [];
  }
}
