# Changelog

All notable changes to this project will be documented in this file.

## [Phase 2] - Component Atomization

### Added

- Created `v4-next/app/components/Navbar.tsx` to encapsulate navigation markup.
- Created `v4-next/app/components/Footer.tsx` to encapsulate footer markup.
- Created `v4-next/app/components/Header.tsx` to encapsulate header markup.
- Created `v4-next/app/components/GalleryGrid.tsx` to render category image grids.
- Added new routes: `product-marketing`, `wedding-photography`, `event-photography`, `motion-design`, `videography`.

### Changed

- Refactored `v4-next/app/page.tsx` to use `<Navbar />` component.
- Refactored `v4-next/app/page.tsx` to use `<Footer />` component.
- Moved `<Header />` and `<Footer />` to `v4-next/app/layout.tsx` for global persistence.
