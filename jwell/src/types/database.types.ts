// src/types/database.types.ts

// Main Product interface
export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category: string | null;
  collection?: string | null;
  stock: number;
  is_featured?: boolean | null;
  created_at: string | null;
  updated_at: string | null;
}

// Category interface
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  created_at: string;
}

// Collection interface
export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  created_at: string;
}

// Cart Item interface
export interface CartItem extends Product {
  quantity: number;
}

// User interface
export interface User {
  id: string;
  email: string;
  created_at: string;
}

// You might also want to add order-related types
export interface Order {
  id: string;
  user_id: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total_amount: number;
  created_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price_at_time: number;
}
