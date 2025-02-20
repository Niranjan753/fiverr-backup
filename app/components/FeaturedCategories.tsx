'use client';

import Image from 'next/image';
import Link from 'next/link';

const categories = [
  {
    id: 'ground_chakkar',
    name: 'Ground Chakkar',
    description: 'Colorful ground spinners with mesmerizing effects',
    image: '/ground-chakkar.webp',
    products: '24 Products'
  },
  {
    id: 'flower_pots',
    name: 'Flower Pots',
    description: 'Beautiful aerial showers of colorful sparks',
    image: '/flowerpot.webp',
    products: '18 Products'
  },
  {
    id: 'rockets',
    name: 'Rockets',
    description: 'High-flying crackers with spectacular effects',
    image: '/rocket.webp',
    products: '32 Products'
  },
  {
    id: 'single_sound',
    name: 'Single Sound Crackers',
    description: 'Classic crackers with powerful sound effects',
    image: '/singlesound.webp',
    products: '45 Products'
  },
  {
    id: 'sparklers',
    name: 'Sparklers',
    description: 'Safe and beautiful hand-held sparklers',
    image: '/sparklers.webp',
    products: '28 Products'
  },
  {
    id: 'sky_shots',
    name: 'Sky Shots',
    description: 'Multi-shot aerial display with stunning effects',
    image: '/skyshots.webp',
    products: '36 Products'
  },
  {
    id: 'fountains',
    name: 'Fountains',
    description: 'Long-lasting fountains with colorful effects',
    image: '/fountain.webp',
    products: '22 Products'
  },
  {
    id: 'repeating_shots',
    name: 'Repeating Shots',
    description: 'Multiple shots with continuous effects',
    image: '/repeatingshot.webp',
    products: '30 Products'
  },
  {
    id: 'new_arrivals',
    name: 'New Arrivals',
    description: 'Latest additions to our collection',
    image: '/newarrival.webp',
    products: '15 Products',
    badge: 'NEW'
  }
];

export default function FeaturedCategories() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Categories
          </h2>
          <p className="text-lg text-gray-600">
            Explore our wide range of premium quality crackers
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/shop-by-products?category=${category.id}`}
              className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-semibold">
                    {category.name}
                  </h3>
                  {category.badge && (
                    <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                      {category.badge}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-200 mb-2">
                  {category.description}
                </p>
                <p className="text-sm font-medium text-gray-300">
                  {category.products}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/shop-by-products"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#2874f0] hover:bg-blue-600 transition-colors duration-300"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
