/**
 * @file Order.ts
 * @description Defines the data structure for customer orders in the system.
 */

/**
 * Represents a customer order, including custom commissions and pre-orders
 * 
 * @interface Order
 * @property {string} id - Unique identifier for the order
 * @property {string} customerName - Name of the customer
 * @property {string} [customerEmail] - Customer's email address
 * @property {string} [customerPhone] - Customer's phone number
 * @property {OrderItem[]} products - Array of products or items in the order
 * @property {number} totalAmount - Total cost of the order
 * @property {number} [depositAmount] - Amount paid as deposit
 * @property {boolean} isPaid - Whether the order has been paid in full
 * @property {'pending' | 'in-progress' | 'completed' | 'delivered'} status - Current status of the order
 * @property {Date} [deadline] - Due date for completing the order
 * @property {string} [notes] - Additional notes about the order
 * @property {string} [eventId] - Optional reference to the event where the order was placed
 * @property {Date} createdAt - Date when the order was created
 * @property {Date} updatedAt - Date when the order was last updated
 */
export interface Order {
  id: string;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  products: OrderItem[];
  totalAmount: number;
  depositAmount?: number;
  isPaid: boolean;
  status: 'pending' | 'in-progress' | 'completed' | 'delivered';
  deadline?: Date | string;
  notes?: string;
  eventId?: string; // Optional link to an event
  createdAt: Date | string;
  updatedAt?: Date | string;
}

/**
 * Represents an individual item within an order
 * 
 * @interface OrderItem
 * @property {string} [productId] - Reference to product ID (optional for custom items)
 * @property {string} description - Description of the item
 * @property {number} quantity - Number of items ordered
 * @property {number} price - Price per unit
 */
export interface OrderItem {
  id: string; // Added for tracking individual items in orders
  productId?: string; // Optional as it might be a custom item
  description: string;
  quantity: number;
  price: number;
}
