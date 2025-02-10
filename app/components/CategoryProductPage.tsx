'use client';

import { useProducts } from '../hooks/useProducts';
import CategoryPage from './CategoryPage';

interface CategoryProductPageProps {
  category: string;
  title: string;
  description: string;
}

export default function CategoryProductPage({ 
  category,
  title,
  description 
}: CategoryProductPageProps) {
  const { products, loading, error } = useProducts(category);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  // Transform products to ensure they have all required fields
  const transformedProducts = products.map(product => ({
    ...product,
    image: product.image_url || product.image || '/placeholder.jpg',
    image_url: product.image_url || product.image || '/placeholder.jpg',
    discount: product.discount || 0,
    rating: product.rating || 4.5,
    features: product.features || [],
    specifications: product.specifications || {},
    safetyInstructions: product.safetyInstructions || [],
    stock: product.stock || 50,
    isNew: product.isNew || false
  }));

  return (
    <CategoryPage
      title={title}
      description={description}
      products={transformedProducts}
    />
  );
} 