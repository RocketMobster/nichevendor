/**
 * @file orders/[id]/page.tsx
 * @description Order details page component for viewing a specific order
 */

import OrderDetailClient from './OrderDetailClient';
export { generateStaticParams } from './generateStaticParams';

/**
 * Page component for the order details route
 * @returns {JSX.Element} Order details page
 */
export default function Page() {
  return <OrderDetailClient />;
}
