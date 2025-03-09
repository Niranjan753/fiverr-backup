'use client';

import { Product } from '../types/product';
import ProductCard from './ProductCard';

interface CategoryPageProps {
  title: string;
  description: string;
  products: Product[];
}

export default function CategoryPage({ title, description, products }: CategoryPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-lg text-gray-600">{description}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map((product) => {
            // Ensure all optional props have default values
            const productWithDefaults: Product = {
              ...product,
              discount: product.discount ?? 0,
              rating: product.rating ?? 4.5,
              image_url: product.image_url || product.image || '/placeholder.jpg',
              features: product.features ?? [],
              specifications: product.specifications ?? {},
              safetyInstructions: product.safetyInstructions ?? [],
              stock: product.stock ?? 0,
              isNew: product.isNew ?? false,
            };
            
            return (
              <ProductCard
                key={product.id}
                {...productWithDefaults}
              />
            );
          })}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No products found</h3>
            <p className="mt-2 text-sm text-gray-500">
              Check back later for new products in this category
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
