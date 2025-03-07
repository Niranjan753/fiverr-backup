export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category_id: string;
  image_url: string;
  is_visible: boolean;  // Add this
  stock_status: 'in_stock' | 'out_of_stock';
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
}
