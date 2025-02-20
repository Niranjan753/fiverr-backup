'use client';

import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Product } from '../types/product';
import { useProducts } from '../hooks/useProducts';

export default function ShopByProducts() {
  const { products, loading, error } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'ground_chakras', name: 'Ground Chakras' },
    { id: 'fountains', name: 'Fountains' },
  ];

  useEffect(() => {
    if (products) {
      setFilteredProducts(
        selectedCategory === 'all'
          ? products
          : products.filter(product => product.category === selectedCategory)
      );
    }
  }, [selectedCategory, products]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2874f0]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Error loading products: {error.message}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Left Sidebar - Categories */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
              <div className="space-y-1">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-4 py-2 rounded text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-50 text-[#2874f0]'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Products Grid */}
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">
                {categories.find(c => c.id === selectedCategory)?.name || 'All Products'}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {filteredProducts.length} products available
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500">Try selecting a different category</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    {...product}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}