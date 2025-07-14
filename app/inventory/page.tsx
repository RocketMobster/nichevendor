"use client";

import { useAppData } from '../../context/AppDataContext';
import Button from '../../components/common/Button';
import ProductCard from '../../components/inventory/ProductCard';
import { Product } from '../../models/Product';
import React, { useState, useMemo } from 'react';

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // We would normally use the context here, but for demo purposes we'll use mock data
  // Use useMemo to prevent recreation of mock products on every render
  const mockProducts: Product[] = useMemo(() => [
    {
      id: '1',
      name: 'Ghost Pins',
      description: 'Glow-in-the-dark enamel pins',
      price: 10,
      stock: 25,
      category: 'Pins',
      imageUrl: '/placeholder.jpg',
      createdAt: new Date("2025-06-01"),
      updatedAt: new Date("2025-06-01"),
    },
    {
      id: '2',
      name: 'Print Set',
      description: 'Set of 5 art prints',
      price: 25,
      stock: 10,
      category: 'Prints',
      imageUrl: '/placeholder.jpg',
      createdAt: new Date("2025-06-02"),
      updatedAt: new Date("2025-06-02"),
    },
    {
      id: '3',
      name: 'Sticker Pack',
      description: 'Pack of 3 vinyl stickers',
      price: 8,
      stock: 15,
      category: 'Stickers',
      imageUrl: '/placeholder.jpg',
      createdAt: new Date("2025-06-03"),
      updatedAt: new Date("2025-06-03"),
    },
  ], []);
  
  const categories = ['All', 'Pins', 'Prints', 'Stickers'];
  
  // Filter products based on search term and category
  const filteredProducts = mockProducts.filter(product => {
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
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-orange-500">📦 Inventory</h1>
          <Button variant="primary" size="sm">
            + Add Product
          </Button>
        </div>
        
        <div className="mt-4 mb-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full p-2 pl-8 rounded-xl border"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute left-2 top-2">🔍</span>
          </div>
        </div>
        
        <div className="flex gap-2 overflow-x-auto py-2">
          {categories.map(category => (
            <button 
              key={category}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                selectedCategory === category ? 'bg-orange-100' : 'bg-gray-100'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
          <button className="px-3 py-1 bg-gray-100 rounded-full text-sm whitespace-nowrap">
            + Category
          </button>
        </div>
      </header>
      
      <div className="flex flex-col gap-3">
        {filteredProducts.map((product) => (
          <ProductCard 
            key={product.id}
            product={product}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        ))}
      </div>
    </main>
  );
}
