/**
 * @file orders/sample-order-2/page.tsx
 * @description Order details page component for viewing a specific order
 */

"use client";

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppData } from '../../../context/AppDataContext';
import Button from '../../../components/common/Button';
import { formatCurrency } from '../../../utils/formatCurrency';
import { formatDate } from '../../../utils/dateUtils';

/**
 * Order sample-order-2 detail page
 */
export default function OrderDetailPage() {
  const router = useRouter();
  const { orders, updateOrderStatus, removeOrder } = useAppData();
  
  const orderId = 'sample-order-2';
  const order = orders.find(o => o.id === orderId) || {
    id: 'sample-order-2',
    customerName: 'Sample Customer 2',
    products: [{ id: 'p2', description: 'Sample Product 2', price: 29.99, quantity: 2 }],
    status: 'in-progress' as 'pending' | 'in-progress' | 'completed' | 'delivered',
    createdAt: new Date().toISOString(),
    customerEmail: 'customer2@example.com',
    customerPhone: '555-123-4567',
    deadline: new Date().toISOString(),
    notes: 'Sample order notes'
  };
  
  /**
   * Calculate the total price of the order
   */
  const calculateTotal = () => {
    return order.products.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };
  
  /**
   * Update the status of the current order
   */
  const handleStatusChange = (newStatus: 'pending' | 'in-progress' | 'completed' | 'delivered') => {
    updateOrderStatus(order.id, newStatus);
  };
  
  /**
   * Handle deleting the current order
   */
  const handleDeleteOrder = () => {
    if (confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
      removeOrder(order.id);
      router.push('/orders');
    }
  };
  
  return (
    <main className="flex min-h-screen flex-col p-4 md:p-6 pb-20">
      <header className="mb-6">
        <div className="flex items-center mb-4">
          <Link href="/orders" className="text-gray-500 mr-2">
            ← Back
          </Link>
          <h1 className="text-2xl font-bold text-orange-500">Order Details</h1>
        </div>
        
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-xl">Order #{order.id.substring(0, 6)}</h2>
          <span className={`px-3 py-1 rounded-full text-xs ${
            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            order.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
            order.status === 'completed' ? 'bg-green-100 text-green-800' :
            'bg-purple-100 text-purple-800'
          }`}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </div>
      </header>
      
      {/* Customer Information */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 mb-4">
        <h3 className="font-bold mb-3">Customer Information</h3>
        <div className="space-y-2">
          <p><strong>Name:</strong> {order.customerName}</p>
          {order.customerEmail && <p><strong>Email:</strong> {order.customerEmail}</p>}
          {order.customerPhone && <p><strong>Phone:</strong> {order.customerPhone}</p>}
          {order.createdAt && <p><strong>Order Date:</strong> {formatDate(order.createdAt)}</p>}
          {order.deadline && <p><strong>Deadline:</strong> {formatDate(order.deadline)}</p>}
        </div>
      </div>
      
      {/* Order Items */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 mb-4">
        <h3 className="font-bold mb-3">Order Items</h3>
        <div className="space-y-3">
          {order.products.map((item) => (
            <div key={item.id} className="border-b border-gray-200 dark:border-gray-700 pb-2 last:border-0">
              <div className="flex justify-between mb-1">
                <span className="font-medium">{item.description}</span>
                <span>{formatCurrency(item.price)}</span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Quantity: {item.quantity}
              </div>
            </div>
          ))}
          
          <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between font-bold">
            <span>Total:</span>
            <span>{formatCurrency(calculateTotal())}</span>
          </div>
        </div>
      </div>
      
      {/* Order Notes */}
      {order.notes && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 mb-4">
          <h3 className="font-bold mb-3">Notes</h3>
          <p className="whitespace-pre-wrap">{order.notes}</p>
        </div>
      )}
      
      {/* Order Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 mb-4">
        <h3 className="font-bold mb-3">Update Status</h3>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button 
            className={`p-2 rounded-lg text-center ${
              order.status === 'pending' ? 'bg-yellow-500 text-white' : 'bg-yellow-100'
            }`}
            onClick={() => handleStatusChange('pending')}
          >
            Pending
          </button>
          <button 
            className={`p-2 rounded-lg text-center ${
              order.status === 'in-progress' ? 'bg-blue-500 text-white' : 'bg-blue-100'
            }`}
            onClick={() => handleStatusChange('in-progress')}
          >
            In Progress
          </button>
          <button 
            className={`p-2 rounded-lg text-center ${
              order.status === 'completed' ? 'bg-green-500 text-white' : 'bg-green-100'
            }`}
            onClick={() => handleStatusChange('completed')}
          >
            Completed
          </button>
          <button 
            className={`p-2 rounded-lg text-center ${
              order.status === 'delivered' ? 'bg-purple-500 text-white' : 'bg-purple-100'
            }`}
            onClick={() => handleStatusChange('delivered')}
          >
            Delivered
          </button>
        </div>
        
        <div className="flex gap-2">
          <Link href={`/orders/sample-order-2/edit`} className="flex-1">
            <Button variant="secondary" className="w-full">
              Edit Order
            </Button>
          </Link>
          <button 
            onClick={handleDeleteOrder}
            className="flex-1 p-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg text-center transition"
          >
            Delete Order
          </button>
        </div>
      </div>
    </main>
  );
}
