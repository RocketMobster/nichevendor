/**
 * This file is specifically for static site generation with Next.js.
 * It defines which dynamic routes should be pre-rendered at build time for the edit page.
 */

export const generateStaticParams = async () => {
  // For static export, we need to define which order IDs should be pre-rendered
  // Since this is a demo/prototype, we'll just use some sample IDs
  return [
    { id: 'sample-order-1' },
    { id: 'sample-order-2' },
    { id: 'sample-order-3' }
  ];
}
