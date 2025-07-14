"use client";

import { Product } from '../../models/Product';
import { formatCurrency } from '../../utils/formatCurrency';

interface ProductCardProps {
  product: Product;
  onEdit?: (productId: string) => void;
  onDelete?: (productId: string) => void;
}

const ProductCard = ({ product, onEdit, onDelete }: ProductCardProps) => {
  const { id, name, description, price, stock, imageUrl, category } = product;
  
  const lowStockThreshold = 10;
  const isLowStock = stock < lowStockThreshold;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex items-center gap-3">
      <div
        className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center"
        style={{ minWidth: '4rem' }}
      >
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <span className="text-2xl">📦</span>
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

export default ProductCard;
