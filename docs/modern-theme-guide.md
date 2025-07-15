# Modern Orange Theme Implementation Guide

This guide explains how to apply the new orange-themed styling to your NicheVendor application.

## Overview

We've created a modern, clean design system using orange as the primary color with various shades. The design includes:

- Consistent orange color palette with complementary neutrals
- Modern form elements with rounded corners
- Card-based layouts with subtle shadows
- Improved button styles with hover effects
- Better typography and spacing

## Quick Implementation

### 1. Apply the Modern Style Component

Add the `ModernStyle` component to your main layout or `_app.tsx` file:

```tsx
import ModernStyle from '../components/common/ModernStyle';

// Inside your main layout component:
return (
  <>
    <ModernStyle />
    {/* Rest of your layout */}
  </>
);
```

### 2. Use the New UI Components

Replace existing form elements with the modern ones:

- `InputField` instead of regular input elements
- `SelectField` instead of regular select elements
- `Card` for grouping content
- Enhanced `Button` with more variants

### 3. Use the PageLayout Component

For consistent page styling, use the `PageLayout` component:

```tsx
import PageLayout from '../components/common/PageLayout';

export default function MyPage() {
  return (
    <PageLayout 
      title="My Page Title" 
      description="Page description"
      backLink={{ href: '/previous-page', label: 'Back' }}
      actions={<Button variant="primary">Action</Button>}
    >
      {/* Page content */}
    </PageLayout>
  );
}
```

## Style Showcase

Visit the Style Showcase page at `/style-showcase` to see all the components and styles in action.

## Component Examples

### Button Examples

```tsx
<Button variant="primary">Primary Button</Button>
<Button variant="outline" size="sm">Small Outline Button</Button>
<Button variant="text" icon={<Icon />}>Text with Icon</Button>
```

### Input Field Examples

```tsx
<InputField
  id="name"
  label="Name"
  placeholder="Enter your name"
  value={name}
  onChange={handleChange}
/>

<InputField
  id="search"
  placeholder="Search..."
  icon={<SearchIcon />}
/>
```

### Card Examples

```tsx
<Card title="Card Title">
  <p>Card content here</p>
</Card>

<Card 
  title="Card with Actions" 
  actions={<Button>Action</Button>}
  footer={<div>Footer content</div>}
>
  <p>Card content here</p>
</Card>
```

## Color Palette

Our orange theme uses these primary colors:

- Primary Orange: #f97316 (orange-500)
- Light Orange: #ffedd5 (orange-100)
- Dark Orange: #c2410c (orange-700)
- White Background: #ffffff
- Light Background: #f9fafb (neutral-50)

## Need Help?

Check out the `/debug-modal` page for examples of properly styled modals with guaranteed visibility.
