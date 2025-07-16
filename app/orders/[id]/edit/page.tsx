/**
 * @file orders/[id]/edit/page.tsx
 * @description Server component for editing an existing order (static export)
 */

import EditOrderClient from './EditOrderClient';
export { generateStaticParams } from './generateStaticParams';

export default function Page() {
  return <EditOrderClient />;
}
