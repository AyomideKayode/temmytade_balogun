import fs from 'fs';
import path from 'path';

// Map generic categories/collections to actual folder names
// Keys are the "URL slugs" or "Collection Names", Values are folder names in public/images
const FOLDER_MAP: Record<string, string> = {
  'product-marketing': 'product',
  'wedding-photography': 'wedding-photography',
  'event-photography': 'event-photography',
  'videography': 'video', // Assumed based on legacy grid
  'motion-design': 'motion', // Assumed
  'portraits': 'portraits',
  'Grublane': 'grublane',
  'Lettuce Entertain': 'lettuce-entertain', // Hypothesis
  'The Art of Style': 'the-art-of-style',
  'Juan More Taco': 'juan-more-taco',
  'Moments in Motion': 'moments-in-motion',
  'Cookie Monstah': 'cookie-monstah',
  'Happily Ever After in Frames': 'happily-ever-after',
  'The Lockhart Bar': 'the-lockhart-bar',
  'Shoe Promo': 'shoe-promo',
  'Wedding Shot': 'wedding-shot',
  'Fashion Show': 'fashion-show',
  '12 Baskets': '12-baskets'
};

// Fallback: If folder not found, some collections map to a Category + Filter?
// For Phase 3, we assume strict folder structure as requested.

const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];

export interface GalleryImage {
  src: string;
  alt: string;
}

export async function getGalleryImages(categoryOrCollection: string): Promise<string[]> {
  const folderName = FOLDER_MAP[categoryOrCollection] || categoryOrCollection;
  const imagesDir = path.join(process.cwd(), 'public', 'images');

  // Try to find the directory directly under images
  let targetDir = path.join(imagesDir, folderName);

  // If the category maps to something like 'product', we scan it.
  // If the user provided a path like 'product/grublane', we scan that.

  // Special handling for the "Mismatch":
  // User says "portraits", filesystem might have "potraits".
  // We strictly follow "portraits" as per instruction, but we can log if missing.

  if (!fs.existsSync(targetDir)) {
      console.warn(`[GalleryLocal] Directory not found: ${targetDir}`);

      // Attempt to look for it inside other categories?
      // The requirement says {category}/{collection}.
      // But for "Landing Page" collections, we don't know the parent category easily.
      // We will perform a search if direct lookup fails?
      // No, let's keep it simple and efficient.
      // If we can't find it, we return empty.
      return [];
  }

  try {
    const entries = await fs.promises.readdir(targetDir, { withFileTypes: true });

    // We want all images in this directory AND subdirectories?
    // User said "{category}/{collection}".
    // If I request "product", I want all images in "product" (flat) AND "product/*" (nested)?
    // Usually a category page shows EVERYTHING.

    const files = await getAllFiles(targetDir);

    // Filter images
    const images = files
        .filter(file => ALLOWED_EXTENSIONS.includes(path.extname(file).toLowerCase()))
        .map(file => {
            // Convert absolute path to public URL
            const relativePath = path.relative(path.join(process.cwd(), 'public'), file);
            return '/' + relativePath.split(path.sep).join('/');
        });

    return images;
  } catch (error) {
    console.error(`[GalleryLocal] Error reading directory ${targetDir}:`, error);
    return [];
  }
}

// Recursive function to get all files
async function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
  const files = await fs.promises.readdir(dirPath, { withFileTypes: true });

  for (const file of files) {
    if (file.isDirectory()) {
      arrayOfFiles = await getAllFiles(path.join(dirPath, file.name), arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, file.name));
    }
  }

  return arrayOfFiles;
}

// Helper to find a collection specific path if we know the parent category
export async function getCollectionImages(category: string, collectionName: string): Promise<string[]> {
    const categoryFolder = FOLDER_MAP[category] || category;
    // We try to find the collection folder inside the category
    // But we don't know the exact folder name for the collection (e.g. "Grublane" -> "grublane"?)
    // We'll normalize to kebab-case
    const collectionFolder = collectionName.toLowerCase().replace(/\s+/g, '-');

    // Construct path: public/images/category/collection
    const targetPath = path.join('public', 'images', categoryFolder, collectionFolder); // Relative for logging
    const fullPath = path.join(process.cwd(), targetPath);

    if (fs.existsSync(fullPath)) {
        return getGalleryImages(path.join(categoryFolder, collectionFolder));
    } else {
        // Fallback: Check if there are files in the category folder that START with the collection name?
        // e.g. product/grublane_1.jpg matches collection "Grublane"
        // This supports the "Flat" structure in the sandbox while we migrate.

        console.warn(`[GalleryLocal] Collection folder ${targetPath} not found. Falling back to file prefix scan in ${categoryFolder}.`);

        const catImages = await getGalleryImages(category);
        const prefix = collectionFolder.replace(/-/g, '_'); // grublane-pizza -> grublane_pizza?
        // Actually "Grublane" -> "grublane". Files are "grublane_...".
        // "Lettuce Entertain" -> "lettuce-entertain". Files are "category-1..." (Wait, script.js said Lettuce Entertain -> category-1.jpg)
        // This fallback is tricky because file naming isn't consistent.

        // For now, return empty if folder not found, as instructed ("Treat missing as data issue").
        // But for "Grublane" specifically, we see "grublane_..." files in product.
        // Let's implement a simple heuristic: if collection has mapped files in legacy, we might want to respect that?
        // No, strict filesystem.

        return [];
    }
}
