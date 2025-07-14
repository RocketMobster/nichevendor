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

export interface ProductVariant {
  id: string;
  name: string;
  attributes: {
    [key: string]: string; // e.g., { "color": "blue", "size": "XL" }
  };
  stockAdjustment: number; // Adjustment to main stock level
}
