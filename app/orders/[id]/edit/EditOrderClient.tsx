"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppData } from '../../../../context/AppDataContext';
import Button from '../../../../components/common/Button';
import { Order, OrderItem } from '../../../../models/Order';
import { formatCurrency } from '../../../../utils/formatCurrency';
import { v4 as uuidv4 } from 'uuid';

export default function EditOrderClient(props: any) {
  const params = useParams();
  const router = useRouter();
  const { orders, updateOrder, products } = useAppData();
  const orderId = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';
  const existingOrder = orders.find(o => o.id === orderId);

  const [customerName, setCustomerName] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [deadline, setDeadline] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [items, setItems] = useState<OrderItem[]>([]);
  const [status, setStatus] = useState<'pending' | 'in-progress' | 'completed' | 'delivered'>('pending');
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [depositAmount, setDepositAmount] = useState<number>(0);
  const [showProductSelector, setShowProductSelector] = useState<boolean>(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
  const [productSearchTerm, setProductSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Get unique categories from products for filtering
  const categories = ['all', ...Array.from(new Set(products.map(p => p.category || 'Uncategorized')))];

  // Load existing order data
  useEffect(() => {
    if (existingOrder) {
      setCustomerName(existingOrder.customerName);
      setCustomerEmail(existingOrder.customerEmail || '');
      setCustomerPhone(existingOrder.customerPhone || '');
      setNotes(existingOrder.notes || '');
      setStatus(existingOrder.status);
      setIsPaid(existingOrder.isPaid);
      setDepositAmount(existingOrder.depositAmount || 0);
      if (existingOrder.deadline) {
        if (typeof existingOrder.deadline === 'string') {
          const dateObj = new Date(existingOrder.deadline);
          setDeadline(dateObj.toISOString().split('T')[0]);
        } else {
          setDeadline(existingOrder.deadline.toISOString().split('T')[0]);
        }
      }
      setItems(existingOrder.products);
    }
  }, [existingOrder]);

  // Redirect if order not found
  if (!existingOrder) {
    return (
      <main className="flex min-h-screen flex-col p-4 md:p-6 pb-20">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Order Not Found</h1>
          <p className="mb-6">The order you're trying to edit doesn't exist or has been deleted.</p>
          <Link href="/orders">
            <Button variant="primary">Back to Orders</Button>
          </Link>
        </div>
      </main>
    );
  }

  // Add a new item to the order
  const addItem = () => {
    setItems([...items, { id: uuidv4(), description: '', price: 0, quantity: 1 }]);
  };

  // Remove an item from the order
  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Update an item's details
  const updateItem = (id: string, updates: Partial<OrderItem>) => {
    setItems(items.map(item => {
      if (item.id === id) {
        return { ...item, ...updates };
      }
      return item;
    }));
  };

  // Calculate the total price of the order
  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  // Validate the form fields
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    if (!customerName.trim()) {
      newErrors.customerName = 'Customer name is required';
    }
    if (items.length === 0) {
      newErrors.items = 'At least one item is required';
    } else {
      const invalidItems = items.filter(item => !item.description.trim());
      if (invalidItems.length > 0) {
        newErrors.items = 'All items must have a description';
      }
    }
    if (depositAmount > calculateTotal()) {
      newErrors.depositAmount = 'Deposit cannot exceed total order amount';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit the form and update the order
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }
    try {
      const totalAmount = calculateTotal();
      const updatedOrder: Order = {
        ...existingOrder,
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim() || undefined,
        customerPhone: customerPhone.trim() || undefined,
        products: items,
        status: status,
        isPaid: isPaid,
        depositAmount: depositAmount || undefined,
        notes: notes.trim() || undefined,
        deadline: deadline ? new Date(deadline).toISOString() : undefined,
        totalAmount: totalAmount,
        updatedAt: new Date().toISOString()
      };
      updateOrder(updatedOrder);
      router.push(`/orders/${orderId}`);
    } catch (error) {
      console.error('Error updating order:', error);
      setErrors({ form: 'Failed to update order. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col p-4 md:p-6 pb-20">
      <header className="mb-6">
        <div className="flex items-center mb-4">
          <Link href={`/orders/${orderId}`} className="text-gray-500 mr-2">
            ← Back
          </Link>
          <h1 className="text-2xl font-bold text-orange-500">Edit Order</h1>
        </div>
      </header>
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.form && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4" role="alert">
            <p>{errors.form}</p>
          </div>
        )}
        {/* Customer Details */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
          {/* ...customer info fields... */}
          {/* ...existing code... */}
        </div>
        {/* Order Items */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
          {/* ...order items fields... */}
          {/* ...existing code... */}
        </div>
        {/* Notes */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
          {/* ...notes textarea... */}
          {/* ...existing code... */}
        </div>
        {/* Order Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
          {/* ...order summary fields... */}
          {/* ...existing code... */}
        </div>
        {/* Product Selector Modal */}
        {showProductSelector && (
          <div className="fixed inset-0 z-50">
            <div style={{position: 'absolute', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.75)'}} onClick={() => setShowProductSelector(false)} aria-hidden="true"></div>
            <div className="relative flex items-center justify-center h-full p-4">
              <div className="w-full max-w-[calc(100vw-20px)] mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-xl border-2 border-orange-500 max-h-[80vh] overflow-y-auto webkit-overflow-scrolling-touch">
                  {/* ...modal content... */}
                  {/* ...existing code... */}
                </div>
              </div>
            </div>
          </div>
        )}
      </form>
    </main>
  );
}
