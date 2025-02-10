export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  image: string;  // This will be the same as image_url
  discount?: number;
  rating?: number;
  features?: string[];
  specifications?: Record<string, string>;
  safetyInstructions?: string[];
  stock?: number;
  isNew?: boolean;
  created_at?: string;
}
