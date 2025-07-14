export interface Sale {
  id: string;
  eventId?: string; // Optional, as sale might not be tied to an event
  products: SaleItem[];
  totalAmount: number;
  paymentMethod: 'cash' | 'card' | 'other';
  notes?: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface SaleItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number; // Price at time of sale
  variantId?: string;
}
