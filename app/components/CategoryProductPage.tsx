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

  return (
    <CategoryPage
      title={title}
      description={description}
      products={products}
    />
  );
} 