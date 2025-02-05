export interface Product {
  id: string;
  name: string;
  price: number;
  discount: number;
  image: string;
  rating: number;
  description: string;
  category: string;
  features?: string[];
  specifications?: {
    [key: string]: string;
  };
  safetyInstructions?: string[];
  stock: number;
  isNew: boolean;
}
