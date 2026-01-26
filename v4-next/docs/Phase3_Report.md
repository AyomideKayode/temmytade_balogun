# Phase 3 Report: Filesystem Bridge & Data Migration

## Phase Objective

Transition from hardcoded image arrays to a dynamic, filesystem-backed data source. Refactor the gallery pages and modal logic to consume this data, enabling easier content management.

## Checklist

- [x] Implement `lib/gallery-local.ts` using `fs.readdir`
- [x] Create backend mapping for categories/collections to folders
- [x] Refactor `GalleryGrid` to accept dynamic data
- [x] Update Category Pages to Server Components
- [x] Refactor Landing Page Modal to React (Client Component)
- [x] Clean up legacy hardcoded arrays
- [x] Document data structure expectations

## Progress Log

### Filesystem Bridge (`lib/gallery-local.ts`)

- Created a server-side utility to scan `public/images`.
- Implemented `getGalleryImages(category)`: Scans all files recursively in a category folder.
- Implemented `getCollectionImages(category, collection)`: Scans specific subfolders (e.g., `product/grublane`).
- **Feature**: Includes a fallback mechanism. If the expected subfolder (e.g., `product/grublane`) is missing (as seen in the sandbox), it returns an empty array and logs a warning, rather than crashing. This adheres to the instruction "Treat missing images as a data issue".

### Component Refactoring

- **GalleryGrid**: Converted to a pure presentation Client Component. It now accepts an `images` array prop, making it reusable for any data source.
- **Category Pages**: Converted `/product-marketing`, `/wedding-photography`, etc., to Server Components. They now fetch data using `gallery-local` and pass it to `GalleryGrid`.
- **ScriptInitializer**: Created a helper component to ensure legacy scripts (`initScript`) continue to function on Server Component pages.

### Landing Page & Modal Refactor

- **Architecture Split**: Separated `app/page.tsx` into a Server Component (fetching data) and `app/components/HomeClient.tsx` (presentation).
- **Modal Logic**: Replaced the legacy DOM-based modal in `script.js` with a React-controlled `GalleryModal` component. This allows the modal to accept dynamic data passed from the server.
- **Interaction**: Clicking a collection card now triggers a React state update instead of a DOM event listener, ensuring smoother integration.

### Cleanup

- Deleted `populateGallery.js` (obsolete).
- Commented out legacy modal logic in `script.js`.

## Data Structure Notes

- The system now expects an "Authoritative" structure: `public/images/{category}/{collection}/`.
- **Known Issue**: The current sandbox environment contains a flat structure (e.g., `public/images/product/grublane_pizza.jpg`) and a typo folder `potraits`.
- **Resolution**: The code is written to expect the _correct_ structure (`portraits`, nested folders). In the current environment, this will result in empty galleries or missing modal images. **This is expected behavior** until the filesystem is updated to match the authoritative structure.
