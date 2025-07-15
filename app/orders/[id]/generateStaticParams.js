/**
 * This file contains the generateStaticParams function for the order detail page.
 * It's necessary for static site generation with dynamic routes.
 */

export async function generateStaticParams() {
  // For static export, we need to define which order IDs should be pre-rendered
  // Since this is a demo/prototype, we'll just use some sample IDs
  return [
    { id: 'sample-order-1' },
    { id: 'sample-order-2' },
    { id: 'sample-order-3' }
  ];
}
