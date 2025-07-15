@echo off
echo Starting commit process for version 0.3.0...

:: Stage modified files (excluding test pages)
echo Staging modified files...
git add CHANGELOG.md
git add app/globals.css
git add app/inventory/page.tsx
git add app/layout.tsx
git add app/orders/page.tsx
git add app/page.tsx
git add components/common/Breadcrumbs.tsx
git add components/common/Button.tsx
git add components/common/GlobalStyles.tsx
git add components/common/ModernStyle.tsx
git add components/common/Navbar.tsx
git add components/common/PageLayout.tsx
git add components/common/VersionFooter.tsx
git add components/dashboard/DashboardCard.tsx
git add components/inventory/ProductCard.tsx
git add components/layout/
git add context/AppDataContext.tsx
git add context/ThemeContext.tsx
git add models/Order.ts
git add package.json
git add .gitignore
git add docs/modern-theme-guide.md
git add styles/

:: Create tag for new version
echo Creating commit...
git commit -m "feat(ui): Enhance UI with back navigation and improved modals

# Version 0.3.0

## Added
- Back button navigation feature across all pages
- Pulsing animation effects for improved visibility
- Dynamic footer navigation with context-awareness
- Product selection modal in Orders page

## Fixed
- Modal display issues in Inventory page
- Add from Inventory button functionality in Orders
- Footer positioning and styling consistency
- Z-index issues with overlapping UI elements

## Changed
- Updated color scheme to orange and black
- Enhanced footer with fixed positioning
- Improved modal styling for consistency
- Enhanced button styles and interaction feedback
- Overall UI modernization with consistent patterns"

:: Create tag for new version
echo Creating version tag...
git tag -a v0.3.0 -m "Version 0.3.0"

echo.
echo Commit and tag created successfully!
echo.
echo To push to GitHub, run:
echo git push origin main --tags
echo.
