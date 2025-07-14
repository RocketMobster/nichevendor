"use client";

import Button from '../../components/common/Button';
import Link from 'next/link';

export default function OrdersPage() {
  return (
    <main className="flex min-h-screen flex-col p-4 md:p-6 pb-20">
      <header className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-orange-500">📝 Orders</h1>
          <Button variant="primary" size="sm">
            + Add Order
          </Button>
        </div>
      </header>
      
      <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-xl shadow p-8 mb-4 text-center">
        <div className="text-5xl mb-4">📋</div>
        <h2 className="text-xl font-bold mb-2">No Orders Yet</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Start tracking your custom orders and pre-orders here.
        </p>
        <Button variant="primary">Add Your First Order</Button>
      </div>
      
      <div className="w-full max-w-md bg-orange-50 dark:bg-gray-700 rounded-xl p-4 mb-4">
        <h3 className="font-medium mb-2">💡 Order Management Tips</h3>
        <ul className="text-sm space-y-2 list-disc pl-4">
          <li>Track custom orders from conventions</li>
          <li>Set deadlines for order completion</li>
          <li>Keep contact information for follow-ups</li>
          <li>Monitor status: pending, in-progress, completed</li>
        </ul>
      </div>
    </main>
  );
}
