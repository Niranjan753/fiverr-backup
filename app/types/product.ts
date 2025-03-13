export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category_id: string;
  category_name?: string;  // Optional category name for display
  image_url: string;
  image?: string;  // Fallback image URL
  is_visible: boolean;
  stock_status: 'in_stock' | 'out_of_stock';
  updated_at: string;
  discount?: number;  // Optional discount percentage
  rating?: number;  // Optional product rating
  features?: string[];  // Optional list of product features
  specifications?: Record<string, string>;  // Optional product specifications
  safetyInstructions?: string[];  // Optional safety instructions
  stock?: number;  // Optional stock count
  isNew?: boolean;  // Optional flag for new products
}

export interface Category {
  id: number;
  name: string;
  created_at?: string;  // Made optional
}
