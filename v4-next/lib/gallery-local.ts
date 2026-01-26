import fs from 'fs';
import path from 'path';

/**
 * Route slug → filesystem category
 * Categories only. NEVER collections.
 */
const CATEGORY_MAP: Record<string, string> = {
  'product-marketing': 'product',
  'wedding-photography': 'wedding-photography',
  'event-photography': 'event-photography',
  portraits: 'portraits',
};

const ALLOWED_EXTENSIONS = new Set([
  '.jpg',
  '.jpeg',
  '.png',
  '.gif',
  '.webp',
  '.svg',
]);

export interface GalleryImage {
  src: string;
  alt: string;
}
const IMAGES_ROOT = path.join(process.cwd(), 'public', 'images');

/**
 * Get all images under a category.
 * Includes images in subfolders (collections).
 */
export async function getCategoryImages(
  categorySlug: string,
): Promise<string[]> {
  const categoryFolder = CATEGORY_MAP[categorySlug] ?? categorySlug;
  const categoryPath = path.join(IMAGES_ROOT, categoryFolder);

  if (!fs.existsSync(categoryPath)) {
    console.warn(`[GalleryLocal] Category not found: ${categoryPath}`);
    return [];
  }

  const files = await getAllFiles(categoryPath);
  return files.filter(isImage).map(toPublicPath);
}

/**
 * Get images for a specific collection inside a category.
 */
export async function getCollectionImages(
  categorySlug: string,
  collectionSlug: string,
): Promise<string[]> {
  const categoryFolder = CATEGORY_MAP[categorySlug] ?? categorySlug;
  const collectionPath = path.join(IMAGES_ROOT, categoryFolder, collectionSlug);

  if (!fs.existsSync(collectionPath)) {
    console.warn(`[GalleryLocal] Collection not found: ${collectionPath}`);
    return [];
  }

  const files = await getAllFiles(collectionPath);
  return files.filter(isImage).map(toPublicPath);
}

/* ----------------- helpers ----------------- */

async function getAllFiles(dir: string): Promise<string[]> {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await getAllFiles(fullPath)));
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

function isImage(filePath: string): boolean {
  return ALLOWED_EXTENSIONS.has(path.extname(filePath).toLowerCase());
}

function toPublicPath(filePath: string): string {
  const relative = path.relative(path.join(process.cwd(), 'public'), filePath);
  return '/' + relative.split(path.sep).join('/');
}
