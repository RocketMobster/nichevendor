
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.6.0] - 2025-07-17

### Highlights
- 🚀 **Major Inventory & Add Product Workflow Refactor**
  - Moved Add Category logic from a standalone modal to an inline flow within Add Product, eliminating empty categories and streamlining product creation.
  - Created a new Add Product page, linked from Inventory, using real categories from product data.
  - Recovered from file corruption and fully restored Inventory page functionality and UI.

### Added
- Add Product page with inline Add Category modal.
- Custom breadcrumbs for Add Product page.
- Consistent card styling across Events, Sales, Orders, and Inventory pages.
- Product icon/image picker: users can select a preset icon or upload a custom image for products.
- Custom image upload with preview, validation, and click-to-change support.
- Icon color picker: users can choose a color for preset icons before submitting a product.
- Inline confirmation modal and automatic redirect after adding a product.
- Product model and ProductCard updated to support and display custom icon colors.

### Changed
- Navigation and layout: removed bottom navigation, restored VersionFooter, improved SidebarNavigation.
- Breadcrumbs logic: removed duplicate breadcrumbs, improved navigation clarity.
- Moved Add Category logic to Add Product flow for better UX.
- Add Product form: icon and image selection are now mutually exclusive; selecting one clears the other.
- Improved form stability: eliminated layout shifting/expansion when selecting icons or images.
- Enhanced accessibility and UX for icon/image selection and color picking.

### Fixed
- Build errors related to route/page conflicts and "use client" directive placement.
- Persistent UI and navigation bugs, including blank screens and modal rendering issues.
- Accessibility, performance, and security improvements.
- Prevented accidental form submission/validation when clicking icon buttons.
- Fixed preview not clearing when switching between icon and image.
- Fixed preview not displaying after switching from icon to image.
- Fixed form field and card layout shifting on icon selection.
- Fixed all known issues with icon/image picker and color persistence.

### Removed
- Legacy Navbar component.
- Redundant/duplicate breadcrumbs on Add Product page.

## [0.5.0] - 2025-07-16

### Changed
- Refactored dynamic routes for static export compatibility (Next.js)
- Split server/client logic for edit order page
- Cleaned up duplicate and conflicting files in app directory
- Updated routing and build process for static export

### Added
- GitHub Actions workflow for automatic deployment to GitHub Pages
- Static params generation for all dynamic routes

### Removed
- Old dynamic route files incompatible with static export

### Fixed
- Build errors related to static export and routing
- Improved deployment reliability and automation

### Changed
- Updated GitHub Actions workflow to remove custom index.html and rely on Next.js static export for root route
- Updated layout.tsx to use dynamic assetPrefix for static assets, ensuring consistent styling on GitHub Pages
- Bumped app version to 0.4.0

### Fixed
- Resolved redirect loop and flashing issues on GitHub Pages
- Fixed inconsistent loading of CSS and JS assets after navigation
- Ensured mobile fixes and backup redirect pages are included in deployment
- Improved reliability of mobile styling and asset loading

### Added
- Mobile-specific CSS and JS fixes for scrolling, modal sizing, and navigation
- Enhanced back button and footer visibility for mobile usability

## [0.4.0] - 2025-07-16

### Changed
- Updated GitHub Actions workflow to remove custom index.html and rely on Next.js static export for root route
- Updated layout.tsx to use dynamic assetPrefix for static assets, ensuring consistent styling on GitHub Pages
- Bumped app version to 0.4.0

### Fixed
- Resolved redirect loop and flashing issues on GitHub Pages
- Fixed inconsistent loading of CSS and JS assets after navigation
- Ensured mobile fixes and backup redirect pages are included in deployment
- Improved reliability of mobile styling and asset loading

### Added
- Mobile-specific CSS and JS fixes for scrolling, modal sizing, and navigation
- Enhanced back button and footer visibility for mobile usability

## [0.3.0] - 2025-07-15

### Added
- Back button navigation feature across all pages except home page
- Pulsing animation for the back button with high-visibility styling
- New FooterWithNavigation component that dynamically shows back button
- Modal for adding products from inventory in Orders page

### Fixed
- Fixed modal display issues on the Inventory page
- Fixed Add from Inventory button functionality on Orders page
- Fixed footer positioning and visibility issues
- Corrected styling inconsistencies in modals
- Addressed z-index problems with overlapping UI elements

### Changed
- Enhanced footer with fixed positioning at bottom of viewport
- Updated color scheme to orange and black for better brand consistency
- Improved modal styling to match rest of application design
- Enhanced button styles with better contrast and interaction feedback
- Modernized overall UI with consistent styling patterns

## [0.1.0] - 2025-07-13

### Added
- Initial project setup with Next.js, TypeScript, and Tailwind CSS
- Basic component library (Button, Card, Navbar, etc.)
- Dashboard page with summary widgets
- Inventory management page with filtering
- Event listing page
- Sales summary page
- Mobile-first responsive layout
- Bottom navigation bar
- Local storage service for data persistence
- Version display in the application footer

### Technical
- Set up project structure following component-based architecture
- Implemented React Context API for state management
- Added TypeScript interfaces for all data models
- Configured Tailwind CSS with custom theme extensions
