export interface Category {
  id: string;
  name: string;
  created_at?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  image_url?: string;
  category_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface OrderItem {
  product_id: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  user_id?: string;
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  items: OrderItem[];
  created_at?: string;
  updated_at?: string;
}
