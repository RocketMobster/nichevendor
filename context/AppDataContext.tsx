"use client";

/**
 * @file AppDataContext.tsx
 * @description Global application data context provider that manages state for products, events, 
 * sales and other app data. Handles loading and saving data to localStorage.
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../models/Product';

/**
 * Interface defining the shape of the AppData context
 * Contains all the state and methods for managing app data
 * 
 * @interface AppDataContextType
 * @property {Product[]} products - List of all products in inventory
 * @property {Function} addProduct - Method to add a new product
 * @property {Function} updateProduct - Method to update an existing product
 * @property {Function} deleteProduct - Method to remove a product
 */
interface AppDataContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  // Other data and functions will be added as needed
}

/**
 * Default context values provided when using context outside of provider
 */
const defaultContext: AppDataContextType = {
  products: [],
  addProduct: () => {},
  updateProduct: () => {},
  deleteProduct: () => {},
};

/**
 * Create the context with default values
 */
const AppDataContext = createContext<AppDataContextType>(defaultContext);

/**
 * Provider component that wraps the application and provides app data state
 * 
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components to wrap with context
 * @returns {JSX.Element} Context provider component
 */
export function AppDataProvider({ children }: { children: ReactNode }) {
  // State for products data
  const [products, setProducts] = useState<Product[]>([]);

  // Load data from localStorage on initial render
  useEffect(() => {
    try {
      const storedProducts = localStorage.getItem('products');
      if (storedProducts) {
        // Convert ISO date strings back to Date objects
        const parsedProducts = JSON.parse(storedProducts);
        const productsWithDates = parsedProducts.map((product: any) => ({
          ...product,
          createdAt: product.createdAt ? new Date(product.createdAt) : new Date(),
          updatedAt: product.updatedAt ? new Date(product.updatedAt) : new Date()
        }));
        setProducts(productsWithDates);
      }
    } catch (error) {
      console.error('Error loading products from localStorage', error);
    }
  }, []);

  /**
   * Save products to localStorage whenever they change
   * Handles proper serialization of Date objects by converting to ISO strings
   */
  useEffect(() => {
    try {
      // Convert dates to ISO strings for proper serialization
      const serializedProducts = products.map(product => ({
        ...product,
        createdAt: product.createdAt instanceof Date ? product.createdAt.toISOString() : product.createdAt,
        updatedAt: product.updatedAt instanceof Date ? product.updatedAt.toISOString() : product.updatedAt
      }));
      localStorage.setItem('products', JSON.stringify(serializedProducts));
    } catch (error) {
      console.error('Error saving products to localStorage', error);
    }
  }, [products]);

  /**
   * Adds a new product to the inventory
   * @param {Product} product - The product to add
   */
  const addProduct = (product: Product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  /**
   * Updates an existing product in the inventory
   * @param {Product} product - The product with updated values
   */
  const updateProduct = (product: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === product.id ? product : p))
    );
  };

  /**
   * Deletes a product from the inventory
   * @param {string} productId - The ID of the product to delete
   */
  const deleteProduct = (productId: string) => {
    setProducts((prevProducts) =>
      prevProducts.filter((p) => p.id !== productId)
    );
  };

  return (
    <AppDataContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
}

/**
 * Custom hook to access the AppData context from any component
 * @returns {AppDataContextType} The app data context values and methods
 */
export const useAppData = () => useContext(AppDataContext);
