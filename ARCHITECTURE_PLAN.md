# Architectural Refactor Plan: Tadz Media Portfolio

## Phase 0 — Current System Blueprint

### 1. Current Architecture Map

**Runtime Flow:**
1.  **Request**: User requests `https://domain.com/`.
2.  **Server**: Node.js/Express (`server.js`) intercepts request.
3.  **Resolution**: Express serves static HTML files (`index.html`, `wedding-photography.html`) from the `public/` directory.
4.  **Client**: Browser loads HTML, CSS, and Vanilla JavaScript bundles.
5.  **Rendering**:
    - `script.js` and `populateGallery.js` execute on `DOMContentLoaded`.
    - Scripts manually inject DOM elements into gallery containers based on hardcoded arrays.

**Responsibility Split:**
*   **`server.js`**: Functions primarily as a static file server. It contains a "ghost" API endpoint (`/images/:category`) which is implemented but unused by the client.
*   **`public/js/populateGallery.js`**: Acts as the de-facto "database" and "controller". It holds the hardcoded image paths (`imageCollections`) and logic to render `<img>` tags.
*   **`public/js/script.js`**: Handles global interactions (modals, form submission) and initializes effects.
*   **`public/js/utils.js` & `navigation.js`**: Modular utility libraries for specific UI behaviors (scroll, mobile menu).

**Image Delivery Pipeline:**
*   **Filesystem Intent**: The folder structure (`public/images/category-name`) suggests a dynamic system where adding a file should make it visible. The backend supports this via `fs.readdir`.
*   **Frontend Reality**: The frontend ignores the filesystem. It relies entirely on `imageCollections` objects in JavaScript files.
*   **Divergence Cause**: Likely a rapid development compromise. The backend logic was written for scalability, but the frontend implementation reverted to manual mapping to get the visual layout working quickly without wiring up async data fetching.

### 2. Stability & Fragility Assessment

**Stable Components (Preserve):**
*   **Visual Assets**: The images and design assets (`/images`, `/css`) are high quality and can be migrated directly.
*   **Core UI Interactions**: The behaviors defined in `utils.js` (scroll reveal, sticky header) are sound UX patterns, even if the implementation needs modernizing.
*   **Form Handling**: The Web3Forms integration is stateless and easily portable.

**Brittle Components (Isolate & Replace):**
*   **Hardcoded Data**: `populateGallery.js` is the single point of failure. It requires code deploys for content updates and is prone to typos breaking image loading.
*   **HTML Duplication**: Navigation and Footer HTML is copy-pasted across multiple `.html` files (`index.html`, `videography.html`, etc.). Changing a menu item requires editing every file.
*   **DOM Manipulation**: Direct DOM manipulation (`document.querySelector(...)`) in `script.js` is tightly coupled to specific HTML classes, making layout changes risky.

**Regression Risks:**
*   **SEO**: Current HTML is static and indexable. Converting to a pure Client-Side SPA (React without SSR) could hurt ranking.
*   **Performance**: The site currently uses native lazy loading. A naive React port might regress Core Web Vitals if image optimization isn't handled correctly.

---

## Phase 1 — Architecture Direction Decision Framework

### Option A: React (Vite/SPA) + Modern Tooling
*   **Mechanism**: Client-side rendering. Browser downloads empty HTML + JS bundle -> JS builds UI.
*   **Pros**: Extremely fast transition for dynamic interactions; simple hosting.
*   **Cons (Context: Photography Portfolio)**:
    *   **SEO**: Poor "out of the box" for image-heavy portfolios without complex hydration setup.
    *   **Performance**: Large initial JS bundle. Images are not automatically optimized/resized, requiring a manual pipeline (Cloudinary/Sharp) or manual responsive `srcset`.
    *   **CMS**: Requires fetching data on client-side load, causing layout shift (CLS).

### Option B: Next.js (Hybrid SSR/SSG)
*   **Mechanism**: Server-side or Build-time rendering. Browser receives fully formed HTML.
*   **Pros**:
    *   **SEO**: Best-in-class. Search engines see full content immediately.
    *   **Image Optimization**: The `<Image />` component is a "killer feature" for portfolios. It automatically resizes, converts to WebP/AVIF, and prevents layout shift.
    *   **Filesystem as CMS**: We can use `getStaticProps` to read the `public/images` folder at build time, finally realizing the original backend's intent without needing a running Node server (perfect for Vercel).
*   **Cons**: Slightly higher learning curve than vanilla React.

### Final Architecture Recommendation: **Next.js**
**Justification**:
1.  **Product Fit**: A photography portfolio is 90% visual asset delivery. Next.js's built-in image optimization pipeline is superior to anything we could manually build in React/Vite.
2.  **Scalability**: The "Filesystem as API" pattern in Next.js allows us to fix the data disconnect immediately (Phase 3) while preparing for a Headless CMS in the future.
3.  **Performance**: Static Site Generation (SSG) ensures the fastest possible Time-to-First-Byte (TTFB), critical for retaining users on image-heavy sites.

---

## Phase 2+ — Dependency-Aware Refactor Roadmap

### Phase 1: The "Hybrid Bridge" (Bootstrapping & Static Port)
*   **Objective**: Establish the Next.js infrastructure and migrate assets without changing the visual design or logic flows.
*   **Architectural Rationale**: We need a stable modern environment before refactoring logic. This "lift and shift" approach minimizes risk by running the new framework with the old content structure initially.
*   **Scope**:
    *   Initialize Next.js project.
    *   Migrate `public/` assets (images, fonts, global CSS).
    *   Port `index.html` and other pages to Next.js Pages/App Router structure.
    *   Bridge legacy JS: Use `useEffect` to run existing DOM scripts temporarily.
*   **Developer Replication Guide**:
    ```bash
    npx create-next-app@latest v4-next --typescript --eslint --tailwind no
    # (Tailwind: No for now to preserve current CSS exactly)
    cp -r v3/public/images v4-next/public/
    cp v3/public/css/style.css v4-next/styles/globals.css
    ```

### Phase 2: Component Atomization
*   **Objective**: Eliminate code duplication (DRY) and encapsulate UI logic.
*   **Architectural Rationale**: Breaking the HTML monoliths into `<Navbar />`, `<Footer />`, and `<GalleryCard />` components allows for single-source updates.
*   **Scope**:
    *   Extract Header and Footer into layout components.
    *   Convert `populateGallery.js` rendering logic into a React `<Gallery />` component.
    *   Replace `<a>` tags with `next/link` for instant client-side transitions.

### Phase 3: Data Unification (The "Filesystem CMS")
*   **Objective**: Connect the "Frontend Reality" to the "Filesystem Intent".
*   **Architectural Rationale**: By using `getStaticProps` (or Server Components), we can read the directories at build time to generate the image lists. This removes the need for hardcoded arrays.
*   **Scope**:
    *   Write a `lib/gallery.ts` utility to scan image directories.
    *   Pass image lists to components via props.
    *   **Delete** the hardcoded arrays in JS files.

### Phase 4: Production Polish
*   **Objective**: Achieve 100/100 Lighthouse scores.
*   **Architectural Rationale**: Raw `<img>` tags are performance bottlenecks.
*   **Scope**:
    *   Replace `<img>` with `next/image`.
    *   Implement blur-up placeholders.
    *   Refactor `script.js` DOM effects into React hooks (e.g., `framer-motion` for scroll reveal).

---

## Detailed Phase 1 Plan (Immediate Execution)

1.  **Environment Setup**:
    - Create a new directory `v4-next` (sibling to `v3`).
    - Initialize Next.js (App Router recommended for future-proofing).
2.  **Asset Migration**:
    - Move `images`, `fonts`, `css` to the new project.
    - Import global CSS in `layout.tsx`.
3.  **Page Porting**:
    - Convert `index.html` to `page.tsx`.
    - Isolate the `<header>` and `<footer>` into a `components/Layout` wrapper.
    - Copy the HTML body content into the main page component.
4.  **Script Bridging**:
    - Import the logic from `utils.js` and `script.js`.
    - Wrap them in a `useEffect` hook to ensure they run only after the component mounts (client-side).
    - *Constraint*: Do not rewrite the logic yet, just make it run.

**Checkpoint**: The site looks identical to the original but is running on `localhost:3000` via Next.js.
