# Codebase Analysis & Understanding

## 1. High-Level Architecture
The project is a **Personal Photography Portfolio** currently built as a **Multi-Page Application (MPA)** served by a simple Node.js/Express server.

- **Backend**: A minimal `Express.js` server (`v3/server.js`) that primarily serves static files from the `public` directory.
- **Frontend**: Vanilla HTML, CSS, and JavaScript (ES6 Modules). It uses standard DOM manipulation for interactivity (modals, navigation, scroll effects).
- **Deployment**: Configured for Vercel (indicated by `@vercel/analytics` and `README.md`).

## 2. Key Code Components
- **`v3/server.js`**:
  - Serves static assets.
  - **Crucial Finding**: It contains a dynamic API endpoint (`/images/:category`) designed to read image files from the disk and return them as a list. **This endpoint appears to be completely unused by the frontend.**

- **`v3/public/js/script.js` & `populateGallery.js`**:
  - These scripts control the gallery logic.
  - **The Disconnect**: Instead of fetching data from the server's API, the image lists are **hardcoded** into these files (e.g., `const imageCollections = { ... }`).
  - This means adding a new image currently requires a code change and a redeploy, rather than just uploading a file.

- **`v3/public/js/utils.js` & `navigation.js`**:
  - Clean, modular utility functions for UI interactions (scroll reveal, mobile menu, preloader). This indicates a decent separation of concerns on the frontend.

## 3. Analysis of the "Disconnect"
The biggest architectural flaw is the separation between the storage intent (filesystem) and the display logic (hardcoded arrays).
- **Backend Intent**: The backend was written to be dynamic. It tries to scan folders like `images/wedding` to serve content.
- **Frontend Reality**: The frontend ignores this and relies on manual lists.
- **Result**: The application is brittle. If an image is deleted from the folder but remains in the JS list, the site shows a broken image. If an image is added to the folder but not the list, it never appears.

## 4. Refactoring Recommendations
To achieve the goal of a scalable, modern portfolio, I recommend the following refactor path:

### Phase 1: Modern Framework (Next.js)
Migrate from Express/HTML to **Next.js**.
- **Why**: Next.js supports Server-Side Rendering (SSR) and Static Site Generation (SSG).
- **Benefit**: You can replicate the "filesystem as CMS" approach properly. `getStaticProps` can read the image directories at build time and generate the gallery pages automatically. No more hardcoded arrays.

### Phase 2: Image Optimization
- Current setup loads full-resolution images (with basic native lazy loading).
- **Next.js Image Component**: Will automatically resize, compress, and serve images in modern formats (WebP/AVIF), significantly improving performance and Lighthouse scores.

### Phase 3: Content Management
- **Immediate Fix**: Use the filesystem (reading folders) as the source of truth.
- **Long-term**: Integrate a Headless CMS (like Sanity, Strapi, or Contentful). This allows the client to upload photos via a nice UI without needing a developer to touch the code.

### Phase 4: Component Architecture
- Break down the HTML monoliths (`index.html`, `wedding-photography.html`) into reusable components (`<Navbar />`, `<GalleryGrid />`, `<ContactForm />`).
- This eliminates the code duplication seen across the multiple HTML files.

## 5. Summary
The current codebase is functional but difficult to maintain. The "Hardcoded Data" vs "Dynamic Server" disconnect is the primary technical debt. Refactoring to a framework like Next.js will solve this immediately by allowing build-time file scanning, aligning perfectly with the original backend intent while providing modern performance benefits.
