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
const ProductCard = ({ product, onEdit, onDelete }: ProductCardProps) => {
  const { id, name, description, price, stock, imageUrl, category } = product;
  
  // Constants for business logic
  const lowStockThreshold = 10;
  const isLowStock = stock < lowStockThreshold;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex items-center gap-3">
      <div
        className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center text-center"
        style={{ minWidth: '4rem' }}
      >
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-cover rounded-lg"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/images/placeholder-product.jpg"; // Fallback to placeholder
            }}
          />
        ) : (
          <img 
            src="/images/placeholder-product.jpg" 
            alt="Product placeholder" 
            className="w-full h-full object-cover rounded-lg opacity-50" 
          />
        )}
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between">
          <h3 className="font-semibold">{name}</h3>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
            {category}
          </span>
        </div>
        
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {description}
          </p>
        )}
        
        <div className="flex justify-between mt-1">
          <span className="text-sm font-medium">
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
        <div className="flex flex-col gap-1">
          {onEdit && (
            <button
              onClick={() => onEdit(id)}
              className="text-blue-500 p-1"
              aria-label="Edit product"
            >
              ✏️
            </button>
          )}
          
          {onDelete && (
            <button
              onClick={() => onDelete(id)}
              className="text-red-500 p-1"
              aria-label="Delete product"
            >
              🗑️
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// Use React.memo to prevent unnecessary re-renders
export default React.memo(ProductCard);
