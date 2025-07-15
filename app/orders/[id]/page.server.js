// Static generation configuration for orders page
export const dynamic = 'error';
export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { id: 'sample-order-1' },
    { id: 'sample-order-2' },
    { id: 'sample-order-3' },
  ]
}
