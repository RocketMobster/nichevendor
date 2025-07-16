"use client";

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppData } from '../../../context/AppDataContext';
import Button from '../../../components/common/Button';
import { formatCurrency } from '../../../utils/formatCurrency';
import { formatDate } from '../../../utils/dateUtils';

export default function OrderDetailClient() {
  const params = useParams();
  const router = useRouter();
  const { orders, updateOrderStatus, removeOrder } = useAppData();

  const orderId = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';
  const order = orders.find(o => o.id === orderId);

  if (!order) {
    return (
      <main className="flex min-h-screen flex-col p-4 md:p-6 pb-20">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Order Not Found</h1>
          <p className="mb-6">The order you're looking for doesn't exist or has been deleted.</p>
          <Link href="/orders">
            <Button variant="primary">Back to Orders</Button>
          </Link>
        </div>
      </main>
    );
  }

  const calculateTotal = () => {
    return order.products.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const handleStatusChange = (newStatus: 'pending' | 'in-progress' | 'completed' | 'delivered') => {
    updateOrderStatus(order.id, newStatus);
  };

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
            'bg-gray-100 text-gray-800'
          }`}>
            {order.status}
          </span>
        </div>
      </header>
      {/* ...rest of the order details JSX... */}
    </main>
  );
}
