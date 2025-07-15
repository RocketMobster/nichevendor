"use client";

/**
 * @file AppDataContext.tsx
 * @description Global application data context provider that manages state for products, events, 
 * sales and other app data. Handles loading and saving data to localStorage.
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../models/Product';
import { Order } from '../models/Order';

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
  // Product management
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  
  // Order management
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrder: (order: Order) => void;
  deleteOrder: (orderId: string) => void;
  getOrderById: (orderId: string) => Order | undefined;
  updateOrderStatus: (orderId: string, status: 'pending' | 'in-progress' | 'completed' | 'delivered') => void;
  removeOrder: (orderId: string) => void;
  
  // Other data and functions will be added as needed
}

/**
 * Default context values provided when using context outside of provider
 */
const defaultContext: AppDataContextType = {
  // Product defaults
  products: [],
  addProduct: () => {},
  updateProduct: () => {},
  deleteProduct: () => {},
  
  // Order defaults
  orders: [],
  addOrder: () => {},
  updateOrder: () => {},
  deleteOrder: () => {},
  getOrderById: () => undefined,
  updateOrderStatus: () => {},
  removeOrder: () => {},
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
  // State for products data with default items to prevent flashing
  const [products, setProducts] = useState<Product[]>([
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
  ]);
  
  // State for orders data
  const [orders, setOrders] = useState<Order[]>([]);

  // Load data from localStorage on initial render
  useEffect(() => {
    try {
      const storedProducts = localStorage.getItem('products');
      if (storedProducts && storedProducts !== "[]") { // Only replace if we have actual stored products
        // Convert ISO date strings back to Date objects
        const parsedProducts = JSON.parse(storedProducts);
        const productsWithDates = parsedProducts.map((product: any) => ({
          ...product,
          createdAt: product.createdAt ? new Date(product.createdAt) : new Date(),
          updatedAt: product.updatedAt ? new Date(product.updatedAt) : new Date()
        }));
        
        // Only update if we have valid products to prevent flashing
        if (parsedProducts.length > 0) {
          setProducts(productsWithDates);
        }
      }
    } catch (error) {
      console.error('Error loading products from localStorage', error);
      // Keep default products if there's an error loading
    }
  }, []);
  
  // Load orders from localStorage on initial render
  useEffect(() => {
    try {
      const storedOrders = localStorage.getItem('orders');
      if (storedOrders && storedOrders !== "[]") {
        // Convert ISO date strings back to Date objects
        const parsedOrders = JSON.parse(storedOrders);
        const ordersWithDates = parsedOrders.map((order: any) => ({
          ...order,
          deadline: order.deadline ? new Date(order.deadline) : undefined,
          createdAt: order.createdAt ? new Date(order.createdAt) : new Date(),
          updatedAt: order.updatedAt ? new Date(order.updatedAt) : new Date()
        }));
        
        if (parsedOrders.length > 0) {
          setOrders(ordersWithDates);
        }
      }
    } catch (error) {
      console.error('Error loading orders from localStorage', error);
      // Keep default empty orders if there's an error
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
   * Save orders to localStorage whenever they change
   * Handles proper serialization of Date objects by converting to ISO strings
   */
  useEffect(() => {
    try {
      // Convert dates to ISO strings for proper serialization
      const serializedOrders = orders.map(order => ({
        ...order,
        deadline: order.deadline instanceof Date ? order.deadline.toISOString() : order.deadline,
        createdAt: order.createdAt instanceof Date ? order.createdAt.toISOString() : order.createdAt,
        updatedAt: order.updatedAt instanceof Date ? order.updatedAt.toISOString() : order.updatedAt
      }));
      localStorage.setItem('orders', JSON.stringify(serializedOrders));
    } catch (error) {
      console.error('Error saving orders to localStorage', error);
    }
  }, [orders]);

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
  
  /**
   * Adds a new order to the system
   * @param {Order} order - The order to add
   */
  const addOrder = (order: Order) => {
    setOrders((prevOrders) => [...prevOrders, order]);
  };

  /**
   * Updates an existing order
   * @param {Order} order - The order with updated values
   */
  const updateOrder = (order: Order) => {
    setOrders((prevOrders) =>
      prevOrders.map((o) => (o.id === order.id ? order : o))
    );
  };

  /**
   * Deletes an order from the system
   * @param {string} orderId - The ID of the order to delete
   */
  const deleteOrder = (orderId: string) => {
    setOrders((prevOrders) =>
      prevOrders.filter((o) => o.id !== orderId)
    );
  };
  
  /**
   * Retrieves an order by its ID
   * @param {string} orderId - The ID of the order to retrieve
   * @returns {Order | undefined} The found order or undefined if not found
   */
  const getOrderById = (orderId: string): Order | undefined => {
    return orders.find((order) => order.id === orderId);
  };

  /**
   * Updates the status of an order
   * @param {string} orderId - The ID of the order to update
   * @param {string} status - The new status
   */
  const updateOrderStatus = (orderId: string, status: 'pending' | 'in-progress' | 'completed' | 'delivered') => {
    setOrders((prevOrders) =>
      prevOrders.map((o) => {
        if (o.id === orderId) {
          return {
            ...o,
            status,
            updatedAt: new Date().toISOString()
          };
        }
        return o;
      })
    );
  };
  
  /**
   * Alias for deleteOrder to maintain API consistency
   * @param {string} orderId - The ID of the order to remove
   */
  const removeOrder = (orderId: string) => {
    deleteOrder(orderId);
  };

  return (
    <AppDataContext.Provider
      value={{
        // Product management
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        
        // Order management
        orders,
        addOrder,
        updateOrder,
        deleteOrder,
        getOrderById,
        updateOrderStatus,
        removeOrder
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
