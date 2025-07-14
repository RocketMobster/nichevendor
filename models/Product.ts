/**
 * @file Product.ts
 * @description Defines the data structure for products in the inventory system.
 */

/**
 * Represents a product in the inventory
 * 
 * @interface Product
 * @property {string} id - Unique identifier for the product
 * @property {string} name - Product name
 * @property {string} [description] - Optional product description
 * @property {number} price - Product price
 * @property {number} stock - Current inventory quantity
 * @property {string} category - Product category for filtering and organization
 * @property {ProductVariant[]} [variants] - Optional array of product variants
 * @property {string} [imageUrl] - Optional URL to product image
 * @property {Date} createdAt - Date when the product was created
 * @property {Date} updatedAt - Date when the product was last updated
 */
export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  category: string;
  variants?: ProductVariant[];
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Represents a variant of a product with different attributes
 * Used for products that come in multiple versions (e.g., different colors, sizes)
 * 
 * @interface ProductVariant
 * @property {string} id - Unique identifier for the variant
 * @property {string} name - Variant name
 * @property {Object} attributes - Key-value pairs of attributes (e.g., color, size)
 * @property {number} stockAdjustment - Adjustment to the main product's stock level for this variant
 */
export interface ProductVariant {
  id: string;
  name: string;
  attributes: {
    [key: string]: string; // e.g., { "color": "blue", "size": "XL" }
  };
  stockAdjustment: number; // Adjustment to main stock level
}
