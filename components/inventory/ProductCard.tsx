"use client";

/**
 * @file ProductCard.tsx
 * @description A card component that displays product information in the inventory.
 * Shows product image, name, description, price, stock level, and action buttons.
 */

import React from 'react';
import { Product } from '../../models/Product';
import { formatCurrency } from '../../utils/formatCurrency';

/**
 * Props interface for the ProductCard component
 * @interface ProductCardProps
 * @property {Product} product - The product data to display
 * @property {Function} [onEdit] - Optional callback for edit action
 * @property {Function} [onDelete] - Optional callback for delete action
 */
interface ProductCardProps {
  product: Product;
  onEdit?: (productId: string) => void;
  onDelete?: (productId: string) => void;
}

/**
 * A card component that displays product information with image, details, and actions
 * @param {ProductCardProps} props - Component props 
 * @returns {JSX.Element} Product card component
 */
const ProductCard = React.memo(({ product, onEdit, onDelete }: ProductCardProps) => {
  const { id, name, description, price, stock, imageUrl, category } = product;
  
  // Constants for business logic
  const lowStockThreshold = 10;
  const isLowStock = stock < lowStockThreshold;

  return (
    <div className="bg-white border border-orange-100 hover:border-orange-200 rounded-xl shadow p-4 flex items-center gap-3" style={{ transition: "all 0.2s ease", willChange: "auto" }}>
      <div
        className="w-16 h-16 rounded-xl bg-orange-50 flex items-center justify-center text-center overflow-hidden"
        style={{ minWidth: '4rem' }}
      >
        {/* Static placeholder for all products to prevent image loading flashes */}
        <div className="w-full h-full flex items-center justify-center bg-orange-100 text-orange-500 text-xl">
          📦
        </div>
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between">
          <h3 className="font-semibold text-neutral-800">{name}</h3>
          <span className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full">
            {category}
          </span>
        </div>
        
        {description && (
          <p className="text-sm text-neutral-600 line-clamp-2">
            {description}
          </p>
        )}
        
        <div className="flex justify-between mt-1">
          <span className="text-sm font-medium text-orange-600">
            {formatCurrency(price)}
          </span>
          <span className={`text-sm ${
            isLowStock ? 'text-red-500' : 'text-green-600'
          }`}>
            Stock: {stock}
            {isLowStock && ' (Low)'}
          </span>
        </div>
      </div>
      
      {(onEdit || onDelete) && (
        <div className="flex flex-col gap-2">
          {onEdit && (
            <button
              onClick={() => onEdit(id)}
              className="w-8 h-8 rounded-full bg-orange-50 hover:bg-orange-100 flex items-center justify-center text-orange-600"
              aria-label="Edit product"
            >
              ✏️
            </button>
          )}
          
          {onDelete && (
            <button
              onClick={() => onDelete(id)}
              className="w-8 h-8 rounded-full bg-red-50 hover:bg-red-100 flex items-center justify-center text-red-500"
              aria-label="Delete product"
            >
              🗑️
            </button>
          )}
        </div>
      )}
    </div>
  );
});

// Export the memoized component
export default ProductCard;
