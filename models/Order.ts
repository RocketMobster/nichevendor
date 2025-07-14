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
  deadline?: Date;
  notes?: string;
  eventId?: string; // Optional link to an event
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  productId?: string; // Optional as it might be a custom item
  description: string;
  quantity: number;
  price: number;
}
