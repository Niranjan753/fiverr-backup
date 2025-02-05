'use client';

import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { Product } from '../types/product';

const categories = [
    { id: 'gift-pack', name: 'Gift Pack' },
    { id: 'sparklers', name: 'Sparklers' },
    { id: 'color-matches', name: 'Color Matches' },
    { id: 'sound-crackers', name: 'Sound Crackers' },
    { id: 'flower-pots', name: 'Flower Pots' },
    { id: 'ground-chakkar', name: 'Ground Chakkar' },
    { id: 'soil-pots', name: 'Soil Pots' },
    { id: 'bombs', name: 'Bombs' },
    { id: 'paper-bomb', name: 'Paper Bomb' },
    { id: 'vanitha-colors', name: 'Vanitha Colors' },
    { id: 'fancy-candles', name: 'Fancy Candles' },
    { id: 'kids-special', name: 'Kids Special' },
    { id: 'kids-night-attraction', name: 'Kids Night Attraction' }
];

const products: Product[] = [
    {
        id: '1',
        name: "7CM - ELECTRIC",
        category: "sparklers",
        price: 149,
        discount: 0,
        description: "Electric sparklers with bright effects",
        image: "/demo.jpg",
        rating: 4.5,
        stock: 100,
        isNew: false
    },
    {
        id: '2',
        name: "7CM - CRACKLING",
        category: "sparklers",
        price: 159,
        discount: 5,
        description: "Crackling sparklers with sound effects",
        image: "/demo.jpg",
        rating: 4.3,
        stock: 80,
        isNew: true
    },
    {
        id: '3',
        name: "7CM - 50/50",
        category: "sparklers",
        price: 139,
        discount: 0,
        description: "Mixed effects sparklers",
        image: "/demo.jpg",
        rating: 4.4,
        stock: 90,
        isNew: false
    },
    {
        id: '4',
        name: "10CM - ELECTRIC",
        category: "sparklers",
        price: 199,
        discount: 10,
        description: "Long electric sparklers",
        image: "/demo.jpg",
        rating: 4.6,
        stock: 70,
        isNew: true
    },
    {
        id: '5',
        name: "Mega Gift Pack",
        category: "gift-pack",
        price: 2999,
        discount: 15,
        description: "Complete celebration pack",
        image: "/demo.jpg",
        rating: 4.8,
        stock: 30,
        isNew: true
    }
];

export default function ShopByProducts() {
    const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const filteredProducts = products.filter(product => product.category === selectedCategory);

    return (
        <main className="min-h-screen bg-white">
            <section className="py-12">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Categories Sidebar */}
                        <div className="w-full md:w-1/4 lg:w-1/5">
                            <div className="bg-white border rounded-lg p-4 md:sticky md:top-24">
                                <h2 className="text-lg font-bold mb-4 text-gray-900">Categories</h2>
                                <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
                                    {categories.map((category) => (
                                        <button
                                            key={category.id}
                                            onClick={() => setSelectedCategory(category.id)}
                                            className={`w-full text-left px-3 py-2 rounded-md transition-colors text-sm md:text-base ${
                                                selectedCategory === category.id
                                                    ? 'bg-red-600 text-white'
                                                    : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                        >
                                            {category.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className="w-full md:w-3/4 lg:w-4/5">
                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
                                {filteredProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        {...product}
                                        onClick={() => setSelectedProduct(product)}
                                    />
                                ))}
                            </div>

                            {/* Empty State */}
                            {filteredProducts.length === 0 && (
                                <div className="text-center py-12">
                                    <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Try selecting a different category
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </main>
    );
}