"use client";

/**
 * @file orders/new/page.tsx
 * @description Component for creating a new customer order
 * Allows users to add customer information and order details
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppData } from '../../../context/AppDataContext';
import Button from '../../../components/common/Button';
import { Order, OrderItem } from '../../../models/Order';
import { formatCurrency } from '../../../utils/formatCurrency';
import { v4 as uuidv4 } from 'uuid';
import VersionFooter from '../../../components/common/VersionFooter';

/**
 * NewOrderPage component for creating a new order
 * @returns {JSX.Element} New order form page
 */
export default function NewOrderPage() {
  const router = useRouter();
  const { addOrder, products } = useAppData();

  const [customerName, setCustomerName] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [deadline, setDeadline] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [items, setItems] = useState<OrderItem[]>([
    { id: uuidv4(), description: '', price: 0, quantity: 1 }
  ]);
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
  
  // Debug products state
  useEffect(() => {
    console.log("Products available:", products);
    console.log("Show product selector:", showProductSelector);
  }, [products, showProductSelector]);
  
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
   * Submit the form and create a new order
   * @param {React.FormEvent} e - Form event
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Calculate the total amount
      const totalAmount = calculateTotal();
      
      const newOrder: Order = {
        id: uuidv4(),
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim() || undefined,
        customerPhone: customerPhone.trim() || undefined,
        products: items,
        status: 'pending',
        isPaid: isPaid,
        depositAmount: depositAmount || undefined,
        notes: notes.trim() || undefined,
        deadline: deadline ? new Date(deadline).toISOString() : undefined,
        totalAmount: totalAmount,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      addOrder(newOrder);
      router.push('/orders');
    } catch (error) {
      console.error('Error creating order:', error);
      setErrors({ form: 'Failed to create order. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col p-4 md:p-6 pb-20">
      <header className="mb-6">
        <div className="flex items-center mb-4">
          <Link href="/orders" className="text-gray-500 mr-2">
            ← Back
          </Link>
          <h1 className="text-2xl font-bold text-orange-500">New Order</h1>
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
                          console.log("Select from inventory clicked");
                          setSelectedItemIndex(index);
                          setShowProductSelector(true);
                          setProductSearchTerm('');
                          setSelectedCategory('all');
                          console.log("ShowProductSelector set to:", true);
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
              {isSubmitting ? 'Creating...' : 'Create Order'}
              {isSubmitting && (
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
              )}
            </Button>
            <Link href="/orders" className="w-full">
              <Button variant="outline" className="w-full" type="button">
                Cancel
              </Button>
            </Link>
          </div>
        </div>
      </form>
      
      {/* New Product Selector Modal with guaranteed visibility */}
      {showProductSelector && (
        <>
          {/* Modal Backdrop with guaranteed opacity */}
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.75)',
              zIndex: 9998,
              display: 'block',
              opacity: 1
            }}
            onClick={() => setShowProductSelector(false)}
          ></div>
          
          {/* Modal Content with forced white background and text colors */}
          <div 
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#ffffff',
              width: '90%',
              maxWidth: '500px',
              borderRadius: '8px',
              boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.25)',
              zIndex: 9999,
              overflow: 'hidden',
              display: 'block',
              opacity: 1,
              border: '1px solid #e5e7eb',
              height: 'auto',
              color: '#000000' /* Force black text color */
            }}
          >
              <div style={{
                backgroundColor: '#f97316', /* orange-500 */
                color: 'white',
                padding: '12px 24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <h3 style={{ 
                  fontWeight: 'bold', 
                  fontSize: '18px',
                  color: 'white'  /* Force white text in header */
                }}>Select Product</h3>
                <button 
                  type="button"
                  onClick={() => setShowProductSelector(false)}
                  style={{
                    backgroundColor: 'white',
                    color: '#f97316', /* orange color */
                    borderRadius: '9999px',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    border: 'none'
                  }}
                >
                  ✕
                </button>
              </div>
              
              <div style={{
                padding: '24px',
                backgroundColor: '#ffffff',
                color: '#000000'
              }}>
                {products.length === 0 ? (
                  <p style={{ 
                    color: '#6b7280', 
                    textAlign: 'center', 
                    padding: '16px' 
                  }}>No products in inventory</p>
                ) : (
                  <>
                    <div style={{ 
                      marginBottom: '16px', 
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px'
                    }}>
                      <div style={{ position: 'relative' }}>
                        <input 
                          type="text" 
                          placeholder="Search products..." 
                          style={{
                            width: '100%',
                            padding: '12px',
                            paddingLeft: '40px',
                            borderRadius: '8px',
                            border: '1px solid #fed7aa', /* orange-200 */
                            outline: 'none',
                            color: '#000000',
                            backgroundColor: '#ffffff'
                          }}
                          value={productSearchTerm}
                          onChange={(e) => setProductSearchTerm(e.target.value)}
                        />
                        <div style={{ 
                          position: 'absolute', 
                          left: '12px', 
                          top: '12px', 
                          color: '#fb923c' /* orange-400 */
                        }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                          </svg>
                        </div>
                      </div>
                      
                      {/* Category Filter */}
                      <div style={{ 
                        display: 'flex', 
                        gap: '8px', 
                        overflowX: 'auto', 
                        paddingBottom: '8px' 
                      }}>
                        {categories.map(category => (
                          <button
                            key={category}
                            type="button"
                            onClick={() => setSelectedCategory(category)}
                            style={{
                              padding: '4px 12px',
                              borderRadius: '9999px',
                              fontSize: '14px',
                              whiteSpace: 'nowrap',
                              color: selectedCategory === category ? '#ffffff' : '#374151', /* text-gray-700 */
                              backgroundColor: selectedCategory === category ? '#f97316' : '#f3f4f6', /* bg-orange-500 or bg-gray-100 */
                              border: 'none',
                              cursor: 'pointer'
                            }}
                          >
                            {category === 'all' ? 'All Categories' : category}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div style={{ marginTop: '16px' }}>
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
                            <div style={{ 
                              textAlign: 'center', 
                              padding: '24px', 
                              backgroundColor: '#f9fafb', /* bg-gray-50 */
                              borderRadius: '8px', 
                              border: '1px dashed #fdba74', /* border-orange-300 */
                              color: '#4b5563' /* text-gray-600 */
                            }}>
                              <div style={{ fontSize: '30px', marginBottom: '8px' }}>🔍</div>
                              <p style={{ color: '#4b5563' }}>No products match your filters</p>
                              <div style={{ 
                                marginTop: '8px', 
                                display: 'flex', 
                                justifyContent: 'center', 
                                gap: '8px' 
                              }}>
                                {productSearchTerm && (
                                  <button 
                                    style={{
                                      fontSize: '14px',
                                      color: '#f97316', /* text-orange-500 */
                                      padding: '4px 8px',
                                      backgroundColor: '#fff7ed', /* bg-orange-50 */
                                      borderRadius: '4px',
                                      border: 'none',
                                      cursor: 'pointer'
                                    }}
                                    onClick={() => setProductSearchTerm('')}
                                  >
                                    Clear search
                                  </button>
                                )}
                                {selectedCategory !== 'all' && (
                                  <button 
                                    style={{
                                      fontSize: '14px',
                                      color: '#f97316', /* text-orange-500 */
                                      padding: '4px 8px',
                                      backgroundColor: '#fff7ed', /* bg-orange-50 */
                                      borderRadius: '4px',
                                      border: 'none',
                                      cursor: 'pointer'
                                    }}
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
                          <div style={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            gap: '12px', 
                            maxHeight: '50vh', 
                            overflowY: 'auto',
                            color: '#000000' /* Ensure text is visible */
                          }}>
                            {filteredProducts.map(product => (
                              <div 
                                key={product.id} 
                                style={{
                                  padding: '16px',
                                  border: '1px solid #fed7aa', /* border-orange-200 */
                                  borderRadius: '8px',
                                  cursor: 'pointer',
                                  backgroundColor: '#ffffff',
                                  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                                  transition: 'all 0.2s ease',
                                  color: '#000000' /* Ensure text is visible */
                                }}
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
                                <div style={{ 
                                  display: 'flex', 
                                  justifyContent: 'space-between', 
                                  alignItems: 'center', 
                                  marginBottom: '4px' 
                                }}>
                                  <span style={{ 
                                    fontWeight: '500',
                                    color: '#1f2937' /* text-gray-800 */ 
                                  }}>{product.name}</span>
                                  <span style={{ 
                                    backgroundColor: '#fff7ed', /* bg-orange-50 */
                                    color: '#9a3412', /* text-orange-800 */
                                    padding: '4px 12px',
                                    borderRadius: '9999px',
                                    fontWeight: '600'
                                  }}>
                                    {formatCurrency(product.price || 0)}
                                  </span>
                                </div>
                                <p style={{ 
                                  fontSize: '14px',
                                  color: '#374151' /* text-gray-700 */
                                }}>
                                  {product.description?.substring(0, 50)}
                                  {product.description && product.description.length > 50 ? '...' : ''}
                                </p>
                                <div style={{ 
                                  display: 'flex', 
                                  justifyContent: 'space-between', 
                                  alignItems: 'center', 
                                  marginTop: '8px',
                                  fontSize: '12px'
                                }}>
                                  <span style={{
                                    backgroundColor: '#f3f4f6', /* bg-gray-100 */
                                    padding: '4px 8px',
                                    borderRadius: '4px',
                                    color: '#374151' /* text-gray-700 */
                                  }}>
                                    {product.category || 'Uncategorized'}
                                  </span>
                                  <span style={{
                                    padding: '4px 8px',
                                    borderRadius: '4px',
                                    backgroundColor: (product.stock || 0) <= 5 
                                      ? '#fee2e2' /* bg-red-100 */ 
                                      : (product.stock || 0) <= 10 
                                        ? '#fef3c7' /* bg-yellow-100 */ 
                                        : '#dcfce7', /* bg-green-100 */
                                    color: (product.stock || 0) <= 5 
                                      ? '#b91c1c' /* text-red-700 */ 
                                      : (product.stock || 0) <= 10 
                                        ? '#a16207' /* text-yellow-700 */ 
                                        : '#15803d' /* text-green-700 */
                                  }}>
                                    Stock: {product.stock || 0}
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
        </>
      )}
      
      <VersionFooter className="fixed bottom-0 w-full bg-white" />
    </main>
  );
}
