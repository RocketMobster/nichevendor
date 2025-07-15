"use client";

/**
 * @file orders/page.tsx
 * @description Orders page component for managing custom orders and pre-orders
 * Allows users to track, add, edit, and manage customer orders
 */

import { useState } from 'react';
import Link from 'next/link';
import { useAppData } from '../../context/AppDataContext';
import Button from '../../components/common/Button';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/dateUtils';

/**
 * Orders page component that displays a list of customer orders
 * and provides management functionality
 * @returns {JSX.Element} The orders page
 */
export default function OrdersPage() {
  const { orders } = useAppData();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Filter orders based on status and search term
  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesSearch = 
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (order.customerEmail && order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())) || 
      order.products.some(p => p.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesStatus && matchesSearch;
  });

  // Status options for filtering
  const statusOptions = [
    { value: 'all', label: 'All Orders' },
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'delivered', label: 'Delivered' }
  ];

  return (
    <main className="flex min-h-screen flex-col p-4 md:p-6 pb-20">
      <header className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-orange-500">📝 Orders</h1>
          <Link href="/orders/new">
            <Button variant="primary" size="sm">
              + Add Order
            </Button>
          </Link>
        </div>
        
        {/* Search and filter */}
        <div className="mt-4 space-y-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full p-2 pl-8 rounded-xl border"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute left-2 top-2">🔍</span>
          </div>
          
          <div className="flex gap-2 overflow-x-auto py-2">
            {statusOptions.map(status => (
              <button 
                key={status.value}
                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                  statusFilter === status.value ? 'bg-orange-100' : 'bg-gray-100'
                }`}
                onClick={() => setStatusFilter(status.value)}
              >
                {status.label}
              </button>
            ))}
          </div>
        </div>
      </header>
      
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-xl shadow p-8 mb-4 text-center">
          <div className="text-5xl mb-4">📋</div>
          <h2 className="text-xl font-bold mb-2">No Orders Yet</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Start tracking your custom orders and pre-orders here.
          </p>
          <Link href="/orders/new">
            <Button variant="primary">Add Your First Order</Button>
          </Link>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">No orders match your filter criteria</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map(order => (
            <div key={order.id} className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold">{order.customerName}</h3>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  order.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                  order.status === 'completed' ? 'bg-green-100 text-green-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
              
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {order.createdAt && (
                  <p>Date: {formatDate(order.createdAt)}</p>
                )}
                {order.customerEmail && (
                  <p>Email: {order.customerEmail}</p>
                )}
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                <p className="text-sm font-semibold">Items:</p>
                <ul className="text-sm">
                  {order.products.map((item, idx) => (
                    <li key={idx} className="flex justify-between">
                      <span>{item.description}</span>
                      <span>{formatCurrency(item.price)}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between font-semibold mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                  <span>Total:</span>
                  <span>
                    {formatCurrency(order.products.reduce((sum, item) => sum + item.price, 0))}
                  </span>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Link href={`/orders/${order.id}`}>
                  <Button variant="secondary" size="sm">View Details</Button>
                </Link>
                <Link href={`/orders/${order.id}/edit`}>
                  <Button variant="outline" size="sm">Edit</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="w-full max-w-md bg-orange-50 dark:bg-gray-700 rounded-xl p-4 mb-4 mt-6">
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
