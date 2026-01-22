# Phase 1 Execution Checklist: The Hybrid Bridge

**Status:** Ready for Execution
**Objective:** Establish Next.js infrastructure and migrate assets without visual regression.

---

## 1. Project Initialization

- [ ] **Create Project**:

  ```bash
  npx create-next-app@latest v4-next --typescript --eslint --no-tailwind --app --no-src-dir --import-alias "@/*" --use-npm
  ```

- [ ] **Cleanup**:
  - Delete `v4-next/app/page.module.css`.
  - Clear the contents of `v4-next/app/page.tsx` (prepare it for porting).

## 2. Asset Migration

- [ ] **Copy Images**:
  - Copy folder `v3/public/images/` → `v4-next/public/images/`.
- [ ] **Copy Fonts**:
  - Copy folder `v3/public/font/` → `v4-next/public/font/`.
- [ ] **Migrate CSS**:
  - Copy `v3/public/css/style.css` → `v4-next/app/globals.css`.
  - **Important**: Open `v4-next/app/globals.css` and ensure all paths to images/fonts are absolute (e.g., `url('../images/...')` might need to become `url('/images/...')` depending on where the CSS lives relative to the public folder. Since it's in `app/`, URLs like `url('/images/bg.jpg')` work best in Next.js).
- [ ] **Verify Import**:
  - Ensure `import "./globals.css";` exists in `v4-next/app/layout.tsx`.

## 3. Legacy Script Bridging

- [ ] **Create Legacy Directory**:
  - Create folder `v4-next/lib/legacy/`.
- [ ] **Copy Scripts**:
  - Copy `v3/public/js/script.js` → `v4-next/lib/legacy/script.js`.
  - Copy `v3/public/js/populateGallery.js` → `v4-next/lib/legacy/populateGallery.js`.
  - Copy `v3/public/js/utils.js` → `v4-next/lib/legacy/utils.js`.
  - Copy `v3/public/js/navigation.js` → `v4-next/lib/legacy/navigation.js`.
- [ ] **Adapt Scripts (Crucial)**:
  - You cannot simply `import` these if they run immediately on load.
  - **Pattern**: Wrap the logic in an export function.
  - _Example_:

    ```javascript
    // v4-next/lib/legacy/script.js
    export function initScript() {
      // ... paste original content here ...
      // Ensure event listeners are attached to 'window' or 'document' safely
    }
    ```

## 4. Page Porting

- [ ] **Port Index Page**:
  - Open `v3/public/index.html`.
  - Copy the content inside `<body>` (excluding `<script>` tags).
  - Paste into the return statement of `v4-next/app/page.tsx`.
  - **JSX Conversion**:
    - Change `class` to `className`.
    - Close self-closing tags (e.g., `<img ... >` becomes `<img ... />`).
    - Change `for` to `htmlFor`.
    - Change `style="--width: 450;"` to `style={{ "--width": "450" } as React.CSSProperties}`.
- [ ] **Initialize Legacy Scripts**:
  - In `v4-next/app/page.tsx`:

    ```tsx
    "use client"; // Required for useEffect
    import { useEffect } from 'react';
    // Import your legacy init functions
    // import { initScript } from '@/lib/legacy/script';

    export default function Home() {
      useEffect(() => {
        // initScript();
      }, []);

      return ( ... );
    }
    ```

## 5. Verification Guide

- [ ] **Start Server**: `npm run dev` inside `v4-next`.
- [ ] **Visual Check**:
  - Does the font load correctly?
  - Do background images appear?
  - Is the layout identical to the `v3` site?
- [ ] **Functional Check**:
  - Click the "Hamburger Menu" (mobile). Does it open?
  - Scroll down. Do elements fade in (Scroll Reveal)?
  - Click a Gallery Card title. Does the modal open?
- [ ] **Console Check**:
  - Open DevTools. Are there any red errors? (Ignore generic hydration warnings for now, focus on 404s).

---

**Pitfalls to Watch**:

- **Image Paths**: CSS `url()` paths are the #1 cause of breakage. In Next.js, `/images/foo.jpg` resolves to `public/images/foo.jpg`.
- **Window Object**: If legacy scripts access `window` immediately, Next.js will crash during build/SSR. Ensure they are inside `useEffect`.
