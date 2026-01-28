# Phase 4 Report: Cloud Media Architecture

**Status**: ✅ Complete

## Objective
The goal of Phase 4 was to replace the local filesystem as the image source with Cloudinary to enable client-managed uploads and stable performance via ISR, while maintaining a fallback to the local filesystem during migration.

## Implementation Details

### 1. Cloudinary Integration (`lib/cloudinary.ts`)
- Implemented `getCategoryImages` and `getCollectionImages` using the Cloudinary Search API (`v2`).
- Configured to use standard environment variables (`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`).
- **Folder Strategy**:
  - Root folder: `tadz/`
  - Category folders strictly mirror route slugs (e.g., `tadz/product-marketing`, `tadz/wedding-photography`).
  - Collections live inside category folders (e.g., `tadz/product-marketing/grublane`).
- **Return Shape**: Returns `Promise<string[]>` containing secure public URLs, matching the Phase 3 API.

### 2. Abstraction Layer (`lib/gallery.ts`)
- Created a single entry point for gallery data fetching.
- Switches implementation based on `USE_CLOUDINARY` environment variable:
  - `true`: Delegates to `lib/cloudinary.ts`.
  - `false` (or undefined): Delegates to `lib/gallery-local.ts`.
- Ensures incremental migration and safe fallback.

### 3. Page Updates
- Refactored all gallery pages (`app/page.tsx`, `app/*/page.tsx`) to import from `@/lib/gallery`.
- Added **ISR** configuration (`export const revalidate = 3600;`) to all gallery pages to cache results for 1 hour.

### 4. Legacy Mapping Logic
- To support legacy calling patterns (e.g., the Home page requesting "product" instead of "product-marketing"), `lib/cloudinary.ts` includes a `FOLDER_MAP` to translate legacy keys to the strict folder structure.
- Collection names are normalized to kebab-case to match folder conventions.

## Verification
- **Build**: `npm run build` passes successfully.
- **Runtime**:
  - Validated that `USE_CLOUDINARY=true` attempts to fetch from Cloudinary (confirmed via logs).
  - Validated that default behavior (no env var) correctly falls back to `gallery-local` and finds local images.

## Next Steps (Phase 5)
- Replace `<img>` tags with `next/image` using a Cloudinary Loader for optimization.
- Implement dynamic sitemaps based on Cloudinary content.
- Enhance SEO with JSON-LD schemas.
