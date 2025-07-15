/**
 * @file orders/sample-order-1/edit/page.tsx
 * @description Sample order edit page for static export
 */

"use client";

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppData } from '../../../../context/AppDataContext';
import Button from '../../../../components/common/Button';

/**
 * Edit page for sample-order-1
 */
export default function SampleOrderEditPage() {
  const router = useRouter();
  const { orders } = useAppData();
  
  return (
    <main className="flex min-h-screen flex-col p-4 md:p-6 pb-20">
      <header className="mb-6">
        <div className="flex items-center mb-4">
          <Link href="/orders/sample-order-1" className="text-gray-500 mr-2">
            ← Back
          </Link>
          <h1 className="text-2xl font-bold text-orange-500">Edit Sample Order</h1>
        </div>
      </header>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-4">
        <p className="mb-4">This is a static placeholder for the order edit page.</p>
        <p className="mb-6">In a real application, this would contain a form to edit order details.</p>
        
        <div className="flex justify-between">
          <Link href="/orders">
            <Button variant="secondary">Back to Orders</Button>
          </Link>
          <Link href="/orders/sample-order-1">
            <Button variant="primary">View Order</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
