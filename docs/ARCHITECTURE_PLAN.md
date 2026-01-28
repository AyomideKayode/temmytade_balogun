# Architectural Refactor Plan: Tadz Media Portfolio

## Phase 0 — Current System Blueprint

### 1. Current Architecture Map

**Runtime Flow:**

1. **Request**: User requests `https://domain.com/`.
2. **Server**: Node.js/Express (`server.js`) serves static HTML files.
3. **Rendering**: Client browser loads HTML + Vanilla JS. Scripts manually inject DOM elements into gallery containers based on hardcoded arrays (`imageCollections`).

**Responsibility Split:**

- **`server.js`**: Static file server. Contains an unused "ghost" API.
- **`populateGallery.js`**: The de-facto "database" (hardcoded arrays) and "controller" (DOM injection).
- **`script.js`**: Global UI interactions (modals, scroll effects).

**Image Delivery Pipeline:**

- **Filesystem Intent**: Folders exist (`public/images/wedding`), implying dynamic availability.
- **Frontend Reality**: JS ignores folders; relies on manual array updates.
- **Divergence**: Backend scalability intent was abandoned for frontend speed-to-delivery, resulting in a brittle maintenance model.

### 2. Stability & Fragility Assessment

**Stable (Preserve):** Visual Assets, Core UX patterns (scroll reveal).
**Brittle (Isolate):** Hardcoded Data Arrays (Single Point of Failure), HTML Duplication.
**Critical Constraints:** SEO (currently static), Performance (Lazy Loading).

---

## Phase 1 — Architecture Direction Decision Framework

### Architecture Recommendation: **Next.js (App Router) + Cloudinary**

**Justification**:

1. **SEO & Performance**: Next.js Server Components provide the best-in-class indexing and Time-to-First-Byte (TTFB).
2. **Scalability**: Moving from "Hardcoded Arrays" -> "Filesystem" -> "Cloudinary" allows us to stabilize the site immediately while paving the way for a client-accessible CMS.
3. **Maintenance**: Offloading image hosting to Cloudinary removes the need for the client to touch the codebase or redeploy to add photos.

---

## Roadmap Status

| Phase | Name                        | Status         |
| ----- | --------------------------- | -------------- |
| 1     | Hybrid Bridge               | ✅ Complete    |
| 2     | Component Atomization       | ✅ Complete    |
| 2.5   | Design System Modernization | ✅ Complete    |
| 3     | Filesystem Bridge           | ✅ Complete    |
| 4     | Cloudinary Architecture     | ✅ Complete    |
| 5     | Production Polish           | ⏺ Planned      |

---

## Phase 2 Progress

- **Extracted Components**: `<Navbar />`, `<Header />`, `<Footer />`, `<GalleryGrid />`.
- **Duplication Removed**: Header and Footer moved to `layout.tsx`. Gallery logic converted to React component.
- **Untouched**: Legacy logic in `script.js` (preserved but links updated).

---

## Phase 2+ — Dependency-Aware Refactor Roadmap

### Phase 1: The "Hybrid Bridge" (Foundational)

- **Objective**: Establish Next.js infrastructure and migrate assets without visual or logic regression.
- **Architectural Rationale**: A "Lift and Shift" approach minimizes risk. We establish the build pipeline (Next.js) before changing internal logic.
- **Scope**:
  - Initialize Next.js (App Router).
  - Migrate `public/` assets and global CSS.
  - Port HTML pages to `page.tsx`.
  - Bridge legacy JS using `useEffect`.
- **Developer Replication**:

  ```bash
  npx create-next-app@latest v4-next --typescript --eslint --tailwind no
  cp -r v3/public/images v4-next/public/
  cp v3/public/css/style.css v4-next/styles/globals.css
  ```

### Phase 2: Component Atomization (Transitional)

- **Objective**: Eliminate HTML duplication (DRY) and encapsulate UI logic.
- **Architectural Rationale**: We must stabilize the Component Tree (React structure) before refactoring the Styling Layer (CSS). This prevents "fighting on two fronts."
- **Scope**:
  - Extract `<Navbar />`, `<Footer />` layouts.
  - Convert `populateGallery.js` logic into a `<GalleryGrid />` component.
  - **Constraint**: Keep using the legacy `style.css` classes. Do not rewrite styles yet.

### Phase 2.5: Design System Modernization (Transitional)

- **Objective**: Introduce Tailwind CSS v4 safely for new and refactored components.
- **Rationale**: **Deferred because** refactoring structure (Phase 2) and style (Phase 2.5) simultaneously is high-risk.
- **Strategy**: "Co-existence".
  - Install Tailwind v4.
  - Keep `globals.css` (legacy styles) active.
  - New components use Tailwind utilities.
  - Incrementally replace legacy CSS classes with Tailwind utilities during future iterations.
- **Scope**:
  - Configure Tailwind v4.
  - Refactor _one_ component (e.g., `<Footer />`) to pure Tailwind to validate the pipeline.

### Phase 3: Data Unification - The Filesystem Bridge (Transitional)

- **Objective**: Connect Frontend Reality to Filesystem Intent (Intermediate Stability).
- **Rationale**: We need to stop the bleeding (manual code updates for images) _now_. Using the local filesystem as the source of truth fixes the "Disconnect" immediately without external dependencies.
- **Scope**:
  - Create `lib/gallery-local.ts`.
  - Use `fs.readdir` in Server Components to generate image lists.
  - **Delete** hardcoded arrays in JS.

### Phase 4: Cloud Media Architecture (Production-Grade)

- **Objective**: Enable Client-Managed Content and Advanced Optimization.
- **Rationale**: The Filesystem (Phase 3) still requires a developer to "push code" (upload files to git) to update the site. Cloudinary allows the client to upload photos via a Web UI.
- **Cloudinary Strategy**:
  - **Structure**: Folders strictly match route slugs (e.g., `tadz/wedding-photography`, `tadz/product-marketing`). Collections live in subfolders.
  - **Source**: Abstraction layer (`lib/gallery.ts`) switches between Filesystem and Cloudinary based on `USE_CLOUDINARY` env var.
- **Implementation (Next.js App Router)**:
  - **Fetching**: Server Components call Cloudinary Search API via `lib/cloudinary.ts`.
  - **Caching Strategy**: Use **ISR (Incremental Static Regeneration)** with `revalidate = 3600`.

    ```typescript
    // lib/cloudinary.ts
    export async function getImages(folder: string) {
      const results = await cloudinary.search
        .expression(`folder:tadz/${folder}`)
        .execute();
      return results.resources;
    }

    // app/gallery/[category]/page.tsx
    export const revalidate = 3600; // Cache for 1 hour (ISR)
    ```

  - **Benefit**: Site is blazing fast (served from cache) but updates within an hour of client upload.

### Phase 5: Production Polish (Production-Grade)

- **Objective**: 100/100 Lighthouse & SEO Dominance.
- **Scope**:
  - Replace `<img>` with `next/image` (using Cloudinary Loader).
  - Generate Dynamic Sitemaps (`sitemap.ts`) based on Cloudinary categories.
  - Implement JSON-LD Schema for "PhotographyBusiness".
