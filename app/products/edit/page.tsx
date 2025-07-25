"use client";

import { useRouter } from "next/navigation";
import { useAppData } from '../../../context/AppDataContext';
import ProductIconPicker from '../../../components/products/ProductIconPicker';
import ProductImageUpload from '../../../components/products/ProductImageUpload';
import Button from '../../../components/common/Button';
import { useState, useEffect } from "react";

export default function EditProductPage({ params }: { params: { id: string } }) {
  const { products, updateProduct } = useAppData();
  const router = useRouter();
  const product = products.find((p) => p.id === params.id);

  const [productName, setProductName] = useState(product?.name || "");
  const [price, setPrice] = useState(product?.price?.toString() || "");
  const [stock, setStock] = useState(product?.stock?.toString() || "");
  const [selectedCategory, setSelectedCategory] = useState(product?.category || "");
  const [selectedIcon, setSelectedIcon] = useState<string | null>(product?.icon || null);
  const [productImage, setProductImage] = useState<string | null>(product?.imageUrl || null);

  useEffect(() => {
    if (!product) router.replace("/inventory");
  }, [product, router]);

  if (!product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProduct({
      ...product,
      name: productName,
      price: parseFloat(price),
      stock: parseInt(stock),
      category: selectedCategory,
      icon: selectedIcon ?? undefined,
      imageUrl: productImage || '',
      updatedAt: new Date(),
    });
    router.push("/inventory");
  };

  return (
    <main className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-orange-600">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          value={productName}
          onChange={e => setProductName(e.target.value)}
          placeholder="Product Name"
          required
        />
        <input
          className="w-full p-2 border rounded"
          value={price}
          onChange={e => setPrice(e.target.value)}
          placeholder="Price"
          type="number"
          min="0"
          required
        />
        <input
          className="w-full p-2 border rounded"
          value={stock}
          onChange={e => setStock(e.target.value)}
          placeholder="Stock"
          type="number"
          min="0"
          required
        />
        <input
          className="w-full p-2 border rounded"
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          placeholder="Category"
        />
        <ProductIconPicker onSelect={setSelectedIcon} />
        <ProductImageUpload value={productImage} onChange={setProductImage} />
        <div className="flex gap-2 justify-end">
          <Button type="button" variant="outline" onClick={() => router.push("/inventory")}>Cancel</Button>
          <Button type="submit" variant="primary">Save Changes</Button>
        </div>
      </form>
    </main>
  );
}
