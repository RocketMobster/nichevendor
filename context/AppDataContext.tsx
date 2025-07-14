"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../models/Product';

interface AppDataContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  // Other data and functions will be added as needed
}

const defaultContext: AppDataContextType = {
  products: [],
  addProduct: () => {},
  updateProduct: () => {},
  deleteProduct: () => {},
};

const AppDataContext = createContext<AppDataContextType>(defaultContext);

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);

  // Load data from localStorage on initial render
  useEffect(() => {
    try {
      const storedProducts = localStorage.getItem('products');
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      }
    } catch (error) {
      console.error('Error loading products from localStorage', error);
    }
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('products', JSON.stringify(products));
    } catch (error) {
      console.error('Error saving products to localStorage', error);
    }
  }, [products]);

  const addProduct = (product: Product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  const updateProduct = (product: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === product.id ? product : p))
    );
  };

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

export const useAppData = () => useContext(AppDataContext);
