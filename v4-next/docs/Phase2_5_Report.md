# Phase 2.5 Report: Layout Stabilization & Tailwind Integration

## Phase Objective

Restore scrolling behavior on category pages, clean up legacy layout assumptions, and introduce Tailwind CSS v4 for structural primitives. This phase bridges the gap between the component extraction (Phase 2) and the full data migration (Phase 3).

## Status: In Progress

## Key Issues Addressed

### 1. Scroll-Lock Regression
**Diagnosis**: The legacy `script.js` relied on an HTML preloader element to remove the `active` class from the `<body>` tag. In Phase 2, the preloader HTML was removed, but the `active` class remained hardcoded in `layout.tsx`. The legacy CSS rule `body.active { overflow: hidden; }` caused the page to be permanently locked.

**Fix**: Removed the `active` class from the `<body>` tag in `app/layout.tsx`. This restores natural scrolling immediately.

### 2. Preloader Deprecation
The legacy preloader is now considered deprecated. Future loading states will be handled by React components (e.g., Suspense) or specialized Next.js loading UI, avoiding global DOM mutations.

## Tailwind CSS v4 Integration

**Strategy**: "Controlled Introduction"
- Installed `tailwindcss`, `postcss`, and `@tailwindcss/postcss`.
- Configured via `postcss.config.mjs` and `app/globals.css`.
- **Preflight Disabled**: To prevent conflicts with the extensive legacy `globals.css` reset, Tailwind Preflight is skipped by explicitly importing only `theme` and `utilities` layers.
- **Scope**: Tailwind is currently allowed ONLY for layout primitives (e.g., wrappers, grid constraints, overflow handling). Visual styling remains legacy CSS.

## Migration Plan

1. **Stabilize Layout**: Ensure all pages scroll and resize correctly.
2. **Component Migration**: Gradually move high-level layout containers to Tailwind classes.
3. **Legacy Retirement**: As components are fully migrated, remove corresponding rules from `globals.css`.

## Next Steps

- Monitor layout behavior on all routes.
- Begin Phase 3: Filesystem Bridge (Data Migration).
