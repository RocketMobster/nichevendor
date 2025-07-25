"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAppData } from '../../context/AppDataContext';
import Button from '../../components/common/Button';
import ProductCard from '../../components/inventory/ProductCard';
import { Product } from '../../models/Product';
import React, { useState } from 'react';

const InventoryPage = React.memo(function InventoryPage() {
  const { products, deleteProduct } = useAppData();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showProductSelector, setShowProductSelector] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [customCategories, setCustomCategories] = useState<string[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  // Get unique categories from products
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category || ''))).filter(Boolean)];
  // Merge custom categories
  const allCategories = [...categories, ...customCategories.filter(cat => !categories.includes(cat))];

  // Filter products based on search term and category
  const filteredProducts = products.filter((product: Product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description?.toLowerCase().includes(searchTerm.toLowerCase()) || false);

    if (selectedCategory === 'All') {
      return matchesSearch;
    }

    // For custom categories, match products with that category
    if (customCategories.includes(selectedCategory)) {
      return matchesSearch && product.category === selectedCategory;
    }

    // For built-in categories, match products with that category
    return matchesSearch && product.category === selectedCategory;
  });

  const handleEditProduct = (productId: string) => {
    router.push(`/products/edit/${productId}`);
  };

  const handleDeleteProduct = (productId: string) => {
    setProductToDelete(productId);
    setShowDeleteConfirm(true);
  };

  const onConfirmDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete);
      setProductToDelete(null);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col p-4 md:p-6 pb-20 font-sans bg-white dark:bg-white">
      <header className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-orange-500 flex items-center gap-2">
            <span className="text-xl align-middle">📦</span>
            <span className="align-middle">Inventory</span>
          </h1>
          <Link href="/products/add">
            <Button variant="primary" size="xs">+ Add Product</Button>
          </Link>
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
          {allCategories.map(category => (
            <button
              key={category}
              className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-all ${selectedCategory === category ? 'bg-orange-500 text-white shadow-sm' : 'bg-white text-neutral-700 hover:bg-orange-100'}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </header>
      <div className="flex flex-col gap-3">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="bg-orange-50 dark:bg-orange-100 border border-orange-100 rounded-xl shadow p-0" key={product.id}>
              <ProductCard product={product} onEdit={handleEditProduct} onDelete={handleDeleteProduct} />
            </div>
          ))
        ) : (
          <div className="bg-orange-50 dark:bg-orange-100 border border-orange-100 rounded-xl shadow p-6 text-center">
            <div className="w-16 h-16 bg-orange-50 dark:bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl text-orange-600">🔍</span>
            </div>
            <p className="text-orange-700 font-semibold">No products match your search criteria.</p>
          </div>
        )}
      </div>

      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-lg font-bold mb-2 text-red-600">Delete Product?</h2>
            <p className="mb-4">Are you sure you want to delete this product? This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
              <Button variant="danger" onClick={onConfirmDelete}>Delete</Button>
            </div>
          </div>
        </div>
      )}
      {/* Product Selector Modal */}
      {showProductSelector && (
        <React.Fragment>
          <div className="fixed inset-0 bg-black bg-opacity-70 z-50" onClick={() => setShowProductSelector(false)}></div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-md mx-auto p-6 font-sans border border-orange-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-lg text-orange-600">Select Product from Inventory</h2>
                <button type="button" onClick={() => setShowProductSelector(false)} className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-base font-bold hover:bg-orange-600 focus:outline-none">✕</button>
              </div>
              <div className="mb-4">
                <input type="text" placeholder="Search products..." className="w-full p-2 rounded-lg border border-orange-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-300/20 bg-white text-black" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
              <div className="max-h-64 overflow-y-auto bg-white dark:bg-gray-900">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product, idx) => (
                    <div key={product.id} className="flex items-center justify-between py-2 border-b border-gray-200 bg-white dark:bg-gray-900">
                      <span className="font-medium text-gray-800 dark:text-gray-100">{product.name}</span>
                      <button onClick={() => { setSelectedItemIndex(idx); setShowProductSelector(false); }} className="bg-white dark:bg-gray-900 text-orange-500 border border-orange-500 rounded px-2 py-1 text-sm hover:bg-orange-50 focus:outline-none">Add</button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4 bg-white dark:bg-gray-900">No products found.</p>
                )}
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
      {/* Category Modal */}
      {showCategoryModal && (
        <React.Fragment>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setShowCategoryModal(false)}></div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-orange-50 dark:bg-orange-100 rounded-xl shadow-xl w-full max-w-sm mx-auto p-6 font-sans border border-orange-100">
              <h2 className="text-lg font-bold text-orange-600 mb-4">Add New Category</h2>
              <input type="text" placeholder="Category name" className="w-full p-2 rounded-xl border border-orange-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-300/20 mb-2" value={newCategory} onChange={e => { setNewCategory(e.target.value); setCategoryError(''); }} />
              {categoryError && <p className="text-red-500 text-xs mb-2">{categoryError}</p>}
              <div className="flex gap-2 justify-end mt-4">
                <Button variant="outline" size="sm" onClick={() => setShowCategoryModal(false)}>Cancel</Button>
                <Button variant="primary" size="sm" onClick={() => {
                  if (!newCategory.trim()) {
                    setCategoryError('Category name cannot be empty');
                    return;
                  }
                  setNewCategory('');
                  setShowCategoryModal(false);
                }}>Save</Button>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </main>
  );
});

export default InventoryPage;
