
"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "../../../components/common/Button";
import { useAppData } from "../../../context/AppDataContext";
import ProductIconPicker from "../../../components/products/ProductIconPicker";
import ProductImageUpload from "../../../components/products/ProductImageUpload";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const { products, addProduct } = useAppData();
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [customCategories, setCustomCategories] = useState<string[]>([]);
  // ...existing code...
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const router = useRouter();
  // ...existing code...

// ...existing code...
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [productImage, setProductImage] = useState<string | null>(null);
  const categories = Array.from(new Set([
    ...products.map((p) => p.category).filter(Boolean),
    ...customCategories
  ]));

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCustomCategories([...customCategories, newCategory]);
      setSelectedCategory(newCategory);
      setNewCategory("");
      setShowCategoryModal(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now().toString(),
      name: productName,
      price: parseFloat(price),
      stock: parseInt(stock),
      category: selectedCategory,
      icon: selectedIcon ?? undefined,
      imageUrl: productImage || '',
      description: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    addProduct(newProduct);
    setShowConfirmation(true);
    setProductName("");
    setPrice("");
    setStock("");
    setSelectedCategory("");
    setSelectedIcon(null);
    setProductImage(null);
    setTimeout(() => {
      setRedirecting(true);
      if (router) router.push('/inventory');
    }, 2000);
  };

  return (
    <main className="flex min-h-screen flex-col p-4 md:p-6 pb-20 font-sans bg-white dark:bg-white">
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-20">
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
            <span className="text-4xl mb-2 text-orange-500">✅</span>
            <h2 className="text-lg font-bold mb-2 text-orange-600">Product Added!</h2>
            <p className="text-gray-600 mb-2">Your product was successfully added.</p>
            {redirecting ? (
              <span className="text-xs text-gray-400">Redirecting to inventory...</span>
            ) : (
              <span className="text-xs text-gray-400">You will be redirected shortly.</span>
            )}
          </div>
        </div>
      )}
      {/* Custom Breadcrumbs for Add Product page */}
      <nav className="mb-2">
        <div className="flex items-center text-sm py-4 px-6 text-neutral-500 overflow-x-auto bg-white border-b border-neutral-100 shadow-sm">
          <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
          <span className="mx-2 text-neutral-300">/</span>
          <Link href="/inventory" className="hover:text-orange-500 transition-colors">Inventory</Link>
          <span className="mx-2 text-neutral-300">/</span>
          <span className="font-medium text-orange-600">Add Product</span>
        </div>
      </nav>
      <header className="mb-6">
        <div className="flex items-center mb-4">
          <Link href="/inventory" className="text-gray-500 mr-2">
            ← Back
          </Link>
          <h1 className="text-2xl font-bold text-orange-500">Add Product</h1>
        </div>
      </header>
      <form className="space-y-6 max-w-xl mx-auto" onSubmit={handleSubmit}>
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-bold mb-4 text-lg">Product Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Icon <span className="text-gray-400">(optional)</span></label>
              <ProductIconPicker onSelect={(icon) => { setSelectedIcon(icon); setProductImage(null); }} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Image <span className="text-gray-400">(optional)</span></label>
              <ProductImageUpload 
                onImageSelect={(img) => { setProductImage(img); setSelectedIcon(null); }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                className="w-full p-2 rounded border border-gray-300"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price <span className="text-red-500">*</span></label>
              <input
                type="number"
                className="w-full p-2 rounded border border-gray-300"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock <span className="text-red-500">*</span></label>
              <input
                type="number"
                className="w-full p-2 rounded border border-gray-300"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
                min="0"
                step="1"
                placeholder="Number of items in stock"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category <span className="text-red-500">*</span></label>
              <div className="flex gap-2 flex-wrap">
                {categories.map((cat) => (
                  <button
                    type="button"
                    key={cat}
                    className={`px-3 py-1 rounded-full border text-sm ${selectedCategory === cat ? "bg-orange-100 border-orange-400 text-orange-600" : "bg-gray-100 border-gray-300 text-gray-600"}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
                <button
                  type="button"
                  className="px-3 py-1 rounded-full border border-dashed border-orange-300 text-orange-500 bg-white"
                  onClick={() => setShowCategoryModal(true)}
                >
                  + Add Category
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="primary" size="md" type="submit" className="w-full" disabled={!productName || !price || !selectedCategory || !stock}>
            Add Product
          </Button>
          <Link href="/products" className="w-full">
            <Button variant="outline" size="md" type="button" className="w-full">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
      {/* Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xs">
            <h2 className="text-lg font-bold mb-3 text-orange-500">Add Category</h2>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-orange-200"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Category name"
              autoFocus
            />
            <div className="flex gap-2 justify-end">
              <Button variant="outline" size="sm" onClick={() => setShowCategoryModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleAddCategory} disabled={!newCategory}>
                Add
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
