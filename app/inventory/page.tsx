"use client";

import { useAppData } from '../../context/AppDataContext';
import Button from '../../components/common/Button';
import ProductCard from '../../components/inventory/ProductCard';
import { Product } from '../../models/Product';
import React, { useState, useMemo } from 'react';

const InventoryPage = React.memo(function InventoryPage() {
  const { products } = useAppData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showProductSelector, setShowProductSelector] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
  
  // Get unique categories from products
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category || ''))).filter(Boolean)];
  
  // Filter products based on search term and category
  const filteredProducts = products.filter((product: Product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (product.description?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const handleEditProduct = (productId: string) => {
    // This would normally open an edit form
    alert(`Edit product ${productId}`);
  };
  
  const handleDeleteProduct = (productId: string) => {
    // This would normally show a confirmation dialog
    alert(`Delete product ${productId}`);
  };

  return (
    <main className="flex min-h-screen flex-col p-4 md:p-6 pb-20">
      <header className="mb-6">
        <div className="flex items-center justify-between mb-4 bg-white p-4 rounded-xl border-b-2 border-orange-500 shadow-sm">
          <h1 className="text-2xl font-bold text-orange-600">📦 Inventory</h1>
          <Button 
            variant="primary" 
            size="sm" 
            onClick={() => setShowProductSelector(true)}
          >
            + Add Product
          </Button>
        </div>
        
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full p-2 pl-10 rounded-xl border border-orange-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-300/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute left-3 top-2.5 text-orange-400">🔍</span>
          </div>
        </div>
        
        <div className="flex gap-2 overflow-x-auto py-2 pb-3 bg-orange-50/70 px-3 rounded-xl">
          {categories.map(category => (
            <button 
              key={category}
              className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-all ${
                selectedCategory === category 
                  ? 'bg-orange-500 text-white shadow-sm' 
                  : 'bg-white text-neutral-700 hover:bg-orange-100'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
          <button className="px-4 py-1.5 bg-white hover:bg-orange-100 rounded-full text-sm whitespace-nowrap flex items-center gap-1 text-orange-600">
            <span>+</span> Category
          </button>
        </div>
      </header>
      
      <div className="flex flex-col gap-3">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard 
              key={product.id}
              product={product}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />
          ))
        ) : (
          <div className="bg-white border border-orange-100 rounded-xl shadow p-6 text-center">
            <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🔍</span>
            </div>
            <p className="text-neutral-600">No products match your search criteria.</p>
          </div>
        )}
      </div>

      {showProductSelector && (
        <>
          {/* Guaranteed visible overlay with opacity */}
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
              zIndex: 9998,
              display: 'block',
              opacity: 1
            }}
            onClick={() => setShowProductSelector(false)}
          ></div>
          
          {/* Modal with guaranteed styles */}
          <div 
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#ffffff',
              width: '95%',
              maxWidth: 'calc(100vw - 20px)',
              maxHeight: '80vh',
              borderRadius: '8px',
              boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.25)',
              zIndex: 9999,
              overflow: 'auto',
              WebkitOverflowScrolling: 'touch',
              display: 'block',
              opacity: 1,
              border: '1px solid #e5e7eb',
              padding: '20px',
              color: '#000000', /* Force black text color */
              margin: '0 auto'
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <h2 style={{ 
                fontWeight: 'bold', 
                fontSize: '18px',
                color: '#ea580c'  /* orange-600 */
              }}>Select Product from Inventory</h2>
              <button 
                type="button"
                onClick={() => setShowProductSelector(false)}
                style={{
                  backgroundColor: '#f97316', /* orange color */
                  color: 'white',
                  borderRadius: '9999px',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  border: 'none'
                }}
              >
                ✕
              </button>
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <input
                type="text"
                placeholder="Search products..."
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #fed7aa', /* orange-200 */
                  backgroundColor: 'white',
                  color: 'black',
                  boxSizing: 'border-box'
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div style={{ 
              maxHeight: '250px', 
              overflowY: 'auto',
              backgroundColor: 'white'
            }}>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, idx) => (
                  <div 
                    key={product.id} 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 0',
                      borderBottom: '1px solid #e5e7eb',
                      backgroundColor: 'white'
                    }}
                  >
                    <span style={{ 
                      fontWeight: '500', 
                      color: '#1f2937',
                      backgroundColor: 'white'
                    }}>
                      {product.name}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedItemIndex(idx);
                        setShowProductSelector(false);
                      }}
                      style={{
                        backgroundColor: 'white',
                        color: '#f97316',
                        border: '1px solid #f97316',
                        borderRadius: '4px',
                        padding: '4px 8px',
                        fontSize: '14px',
                        cursor: 'pointer'
                      }}
                    >
                      Add
                    </button>
                  </div>
                ))
              ) : (
                <p style={{ 
                  color: '#6b7280',
                  textAlign: 'center',
                  padding: '16px',
                  backgroundColor: 'white'
                }}>
                  No products found.
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </main>
  );
});

export default InventoryPage;
