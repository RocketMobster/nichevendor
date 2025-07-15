"use client";

/**
 * @file orders/[id]/edit/page.tsx
 * @description Component for editing an existing order
 */

// Import the generateStaticParams function
import { generateStaticParams } from './generateStaticParams';

// Export the generateStaticParams function for Next.js static export
export { generateStaticParams };

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppData } from '../../../../context/AppDataContext';
import Button from '../../../../components/common/Button';
import { Order, OrderItem } from '../../../../models/Order';
import { formatCurrency } from '../../../../utils/formatCurrency';
import { v4 as uuidv4 } from 'uuid';

/**
 * EditOrderPage component for modifying an existing order
 * @returns {JSX.Element} Edit order form page
 */
export default function EditOrderPage() {
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
          // If it's already a string, format it for the date input
          const dateObj = new Date(existingOrder.deadline);
          setDeadline(dateObj.toISOString().split('T')[0]);
        } else {
          // If it's a Date object
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
  
  /**
   * Add a new item to the order
   */
  const addItem = () => {
    setItems([...items, { id: uuidv4(), description: '', price: 0, quantity: 1 }]);
  };

  /**
   * Remove an item from the order
   * @param {string} id - ID of the item to remove
   */
  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  /**
   * Update an item's details
   * @param {string} id - ID of the item to update
   * @param {Object} updates - Object containing the properties to update
   */
  const updateItem = (id: string, updates: Partial<OrderItem>) => {
    setItems(items.map(item => {
      if (item.id === id) {
        return { ...item, ...updates };
      }
      return item;
    }));
  };

  /**
   * Calculate the total price of the order
   * @returns {number} Total price of all items
   */
  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  /**
   * Validate the form fields
   * @returns {boolean} True if form is valid, false otherwise
   */
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    // Check required fields
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

  /**
   * Submit the form and update the order
   * @param {React.FormEvent} e - Form event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Calculate the total amount
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
        <h2 className="font-bold mb-4 text-lg">Customer Information</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="customerName" className="block text-sm font-medium mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="customerName"
              type="text"
              className={`w-full p-2 rounded border ${errors.customerName ? 'border-red-500' : 'border-gray-300'}`}
              value={customerName}
              onChange={(e) => {
                setCustomerName(e.target.value);
                if (errors.customerName) {
                  const newErrors = {...errors};
                  delete newErrors.customerName;
                  setErrors(newErrors);
                }
              }}
              aria-invalid={errors.customerName ? 'true' : 'false'}
              aria-describedby={errors.customerName ? 'customerName-error' : undefined}
            />
            {errors.customerName && (
              <p id="customerName-error" className="mt-1 text-sm text-red-600">
                {errors.customerName}
              </p>
            )}
          </div>
          
          <div>
            <label htmlFor="customerEmail" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="customerEmail"
              type="email"
              className="w-full p-2 rounded border border-gray-300"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              placeholder="customer@example.com"
            />
          </div>
          
          <div>
            <label htmlFor="customerPhone" className="block text-sm font-medium mb-1">
              Phone
            </label>
            <input
              id="customerPhone"
              type="tel"
              className="w-full p-2 rounded border border-gray-300"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="(123) 456-7890"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="deadline" className="block text-sm font-medium mb-1">
                Deadline
              </label>
              <input
                id="deadline"
                type="date"
                className="w-full p-2 rounded border border-gray-300"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="status" className="block text-sm font-medium mb-1">
                Status
              </label>
              <select
                id="status"
                className="w-full p-2 rounded border border-gray-300"
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="depositAmount" className="block text-sm font-medium mb-1">
                Deposit Amount ($)
              </label>
              <input
                id="depositAmount"
                type="number"
                min="0"
                step="0.01"
                className={`w-full p-2 rounded border ${errors.depositAmount ? 'border-red-500' : 'border-gray-300'}`}
                value={depositAmount || ''}
                onChange={(e) => {
                  setDepositAmount(parseFloat(e.target.value) || 0);
                  if (errors.depositAmount) {
                    const newErrors = {...errors};
                    delete newErrors.depositAmount;
                    setErrors(newErrors);
                  }
                }}
                aria-invalid={errors.depositAmount ? 'true' : 'false'}
                aria-describedby={errors.depositAmount ? 'depositAmount-error' : undefined}
              />
              {errors.depositAmount && (
                <p id="depositAmount-error" className="mt-1 text-sm text-red-600">
                  {errors.depositAmount}
                </p>
              )}
            </div>
            
            <div className="flex items-center">
              <input
                id="isPaid"
                type="checkbox"
                className="h-5 w-5 text-orange-500 rounded border-gray-300 focus:ring-orange-500"
                checked={isPaid}
                onChange={(e) => setIsPaid(e.target.checked)}
              />
              <label htmlFor="isPaid" className="ml-2 block text-sm font-medium">
                Order is paid in full
              </label>
            </div>
          </div>
        </div>
      </div>
        
        {/* Order Items */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">Order Items</h2>
            {errors.items && (
              <p className="text-sm text-red-600">
                {errors.items}
              </p>
            )}
          </div>
          
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={item.id} className="p-3 border rounded bg-gray-50 dark:bg-gray-700 transition-all hover:border-orange-300">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium flex items-center">
                    <span className="bg-orange-500 text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 text-xs">
                      {index + 1}
                    </span>
                    Item {index + 1}
                  </h3>
                  <div>
                    {items.length > 1 && (
                      <button 
                        type="button" 
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 text-sm hover:text-red-700 transition-colors"
                        aria-label={`Remove item ${index + 1}`}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center">
                      <label htmlFor={`item-description-${item.id}`} className="block text-sm font-medium mb-1">
                        Description <span className="text-red-500">*</span>
                      </label>
                      <button 
                        type="button"
                        onClick={() => {
                          setSelectedItemIndex(index);
                          setShowProductSelector(true);
                          setProductSearchTerm('');
                          setSelectedCategory('all');
                        }}
                        className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded hover:bg-orange-200 transition-colors"
                      >
                        Select from Inventory
                      </button>
                    </div>
                    <input
                      id={`item-description-${item.id}`}
                      type="text"
                      className="w-full p-2 rounded border border-gray-300"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, { description: e.target.value })}
                      required
                    />
                    {item.productId && (
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          Product ID: {item.productId}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label htmlFor={`item-price-${item.id}`} className="block text-sm font-medium mb-1">
                        Price ($) <span className="text-red-500">*</span>
                      </label>
                      <input
                        id={`item-price-${item.id}`}
                        type="number"
                        step="0.01"
                        min="0"
                        className="w-full p-2 rounded border border-gray-300"
                        value={item.price}
                        onChange={(e) => updateItem(item.id, { price: parseFloat(e.target.value) || 0 })}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor={`item-quantity-${item.id}`} className="block text-sm font-medium mb-1">
                        Quantity
                      </label>
                      <input
                        id={`item-quantity-${item.id}`}
                        type="number"
                        min="1"
                        className="w-full p-2 rounded border border-gray-300"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, { quantity: parseInt(e.target.value) || 1 })}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="text-right text-sm font-medium text-gray-700">
                    Item Total: {formatCurrency(item.price * item.quantity)}
                  </div>
                </div>
              </div>
            ))}
            
            <button 
              type="button" 
              onClick={addItem}
              className="text-orange-500 hover:text-orange-700 flex items-center text-sm font-medium border border-dashed border-orange-300 p-2 rounded w-full justify-center hover:bg-orange-50 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add Another Item
            </button>
          </div>
        </div>
        
        {/* Notes */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
          <h2 className="font-bold mb-4 text-lg">Additional Notes</h2>
          <textarea
            id="notes"
            className="w-full p-2 rounded border border-gray-300 min-h-[100px]"
            placeholder="Add any special instructions or details about this order..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>
        
        {/* Order Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
          <h2 className="font-bold mb-4 text-lg">Order Summary</h2>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between items-center border-b pb-2">
              <span>Subtotal:</span>
              <span>{formatCurrency(calculateTotal())}</span>
            </div>
            
            {depositAmount > 0 && (
              <div className="flex justify-between items-center text-sm">
                <span>Deposit Amount:</span>
                <span className="text-green-600">-{formatCurrency(depositAmount)}</span>
              </div>
            )}
            
            <div className="flex justify-between font-bold text-lg pt-2">
              <span>Total {depositAmount > 0 ? 'Remaining' : ''}:</span>
              <span>{formatCurrency(calculateTotal() - depositAmount)}</span>
            </div>
            
            <div className="mt-2 text-sm">
              <span className={`px-2 py-1 rounded-full ${isPaid 
                ? 'bg-green-100 text-green-800' 
                : depositAmount > 0 
                  ? 'bg-yellow-100 text-yellow-800' 
                  : 'bg-red-100 text-red-800'}`}>
                {isPaid 
                  ? '✓ Paid in Full' 
                  : depositAmount > 0 
                    ? `Partially Paid (${formatCurrency(depositAmount)})` 
                    : 'Unpaid'}
              </span>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="primary" 
              type="submit" 
              className="w-full relative" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
              {isSubmitting && (
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
              )}
            </Button>
            <Link href={`/orders/${orderId}`} className="w-full">
              <Button variant="outline" className="w-full" type="button">
                Cancel
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Product Selector Modal */}
        {showProductSelector && (
          <div className="fixed inset-0 z-50">
            {/* Modal Backdrop - Full screen semi-transparent overlay with direct style */}
            <div 
              style={{position: 'absolute', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.75)'}} 
              onClick={() => setShowProductSelector(false)} 
              aria-hidden="true"
            ></div>
            
            {/* Modal Container */}
            <div className="relative flex items-center justify-center h-full p-4">
              <div className="w-full max-w-md mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-xl border-2 border-orange-500 max-h-[80vh] overflow-y-auto">
                  <div className="bg-orange-500 text-white px-6 py-3 flex justify-between items-center border-b border-orange-300">
                    <h3 id="product-selector-title" className="font-bold text-lg">Select Product</h3>
                    <button 
                      type="button"
                      onClick={() => setShowProductSelector(false)}
                      className="bg-white text-orange-600 hover:bg-gray-100 hover:text-red-600 rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold"
                      aria-label="Close"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="p-6">
                    {products.length === 0 ? (
                      <p className="text-gray-500 text-center p-4">No products in inventory</p>
                    ) : (
                      <>
                        <div className="mb-4 space-y-3">
                          <div className="relative">
                            <input 
                              type="text" 
                              placeholder="Search products..." 
                              className="w-full p-3 pl-10 rounded-lg border border-orange-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 outline-none"
                              value={productSearchTerm}
                              onChange={(e) => setProductSearchTerm(e.target.value)}
                              aria-label="Search products"
                            />
                            <div className="absolute left-3 top-3 text-orange-400">
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                              </svg>
                            </div>
                          </div>
                          
                          {/* Category Filter */}
                          <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
                            {categories.map(category => (
                              <button
                                key={category}
                                type="button"
                                onClick={() => setSelectedCategory(category)}
                                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                                  selectedCategory === category 
                                    ? 'bg-orange-500 text-white' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                              >
                                {category === 'all' ? 'All Categories' : category}
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          {/* Filtered Products */}
                          {(() => {
                            const filteredProducts = products.filter(product => {
                              const matchesSearch = 
                                product.name.toLowerCase().includes(productSearchTerm.toLowerCase()) ||
                                (product.description && product.description.toLowerCase().includes(productSearchTerm.toLowerCase()));
                              
                              const matchesCategory = 
                                selectedCategory === 'all' || 
                                product.category === selectedCategory ||
                                (!product.category && selectedCategory === 'Uncategorized');
                                
                              return matchesSearch && matchesCategory;
                            });
                            
                            if (filteredProducts.length === 0) {
                              return (
                                <div className="text-center p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border border-dashed border-orange-300">
                                  <div className="text-3xl mb-2">🔍</div>
                                  <p className="text-gray-600 dark:text-gray-400">No products match your filters</p>
                                  <div className="mt-2 flex justify-center space-x-2">
                                    {productSearchTerm && (
                                      <button 
                                        className="text-sm text-orange-500 hover:text-orange-700 px-2 py-1 bg-orange-50 rounded"
                                        onClick={() => setProductSearchTerm('')}
                                      >
                                        Clear search
                                      </button>
                                    )}
                                    {selectedCategory !== 'all' && (
                                      <button 
                                        className="text-sm text-orange-500 hover:text-orange-700 px-2 py-1 bg-orange-50 rounded"
                                        onClick={() => setSelectedCategory('all')}
                                      >
                                        Show all categories
                                      </button>
                                    )}
                                  </div>
                                </div>
                              );
                            }
                            
                            return (
                              <div className="space-y-3">
                                {filteredProducts.map(product => (
                                  <div 
                                    key={product.id} 
                                    className="p-4 border border-orange-200 rounded-lg cursor-pointer hover:bg-orange-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all"
                                    onClick={() => {
                                      if (selectedItemIndex !== null) {
                                        updateItem(items[selectedItemIndex].id, {
                                          productId: product.id,
                                          description: product.name,
                                          price: product.price || 0,
                                          quantity: 1
                                        });
                                        setProductSearchTerm('');
                                        setShowProductSelector(false);
                                      }
                                    }}
                                  >
                                    <div className="flex justify-between items-center mb-1">
                                      <span className="font-medium text-gray-800 dark:text-white">{product.name}</span>
                                      <span className="bg-orange-50 text-orange-800 px-3 py-1 rounded-full font-semibold">
                                        {formatCurrency(product.price || 0)}
                                      </span>
                                    </div>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">
                                      {product.description?.substring(0, 50)}
                                      {product.description && product.description.length > 50 ? '...' : ''}
                                    </p>
                                    <div className="flex justify-between items-center mt-2 text-xs">
                                      <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                        {product.category || 'Uncategorized'}
                                      </span>
                                      <span className={`px-2 py-1 rounded ${
                                        (product.stock || 0) <= 5 
                                          ? 'bg-red-100 text-red-700' 
                                          : (product.stock || 0) <= 10 
                                            ? 'bg-yellow-100 text-yellow-700' 
                                            : 'bg-green-100 text-green-700'
                                      }`}>
                                        Stock: {product.stock || 0}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            );
                          })()}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </form>
    </main>
  );
}
