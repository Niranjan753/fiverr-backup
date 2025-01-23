import { useState } from 'react';
import ProductCard from './ProductCard';
import { Product } from '../types/product';

interface CategoryPageProps {
  title: string;
  description: string;
  products: Product[];
}

export default function CategoryPage({ title, description, products }: CategoryPageProps) {
  const [sortBy, setSortBy] = useState('featured');
  const [filterPrice, setFilterPrice] = useState('all');

  const filteredProducts = products.filter(product => {
    if (filterPrice === 'all') return true;
    if (filterPrice === 'under-500' && product.price < 500) return true;
    if (filterPrice === '500-1000' && product.price >= 500 && product.price <= 1000) return true;
    if (filterPrice === 'over-1000' && product.price > 1000) return true;
    return false;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // featured
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-400 via-yellow-500 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">{title}</h1>
          <p className="text-lg text-black/80">{description}</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
          <div className="flex space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-black text-yellow-400 px-4 py-2 rounded-lg border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            <select
              value={filterPrice}
              onChange={(e) => setFilterPrice(e.target.value)}
              className="bg-black text-yellow-400 px-4 py-2 rounded-lg border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="all">All Prices</option>
              <option value="under-500">Under ₹500</option>
              <option value="500-1000">₹500 - ₹1000</option>
              <option value="over-1000">Over ₹1000</option>
            </select>
          </div>

          <p className="text-black font-medium">
            Showing {sortedProducts.length} products
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              discount={product.discount}
              image={product.image}
              rating={product.rating}
              description={product.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
