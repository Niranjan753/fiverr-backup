'use client';

import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { Product } from '../types/product';
import { useProducts } from '../hooks/useProducts';

const categories = [
    { id: 'gift_pack', name: 'Gift Pack' },
    { id: 'sparklers', name: 'Sparklers' },
    { id: 'color_matches', name: 'Color Matches' },
    { id: 'sound_crackers', name: 'Sound Crackers' },
    { id: 'flower_pots', name: 'Flower Pots' },
    { id: 'ground_chakkar', name: 'Ground Chakkar' },
    { id: 'soil_pots', name: 'Soil Pots' },
    { id: 'bombs', name: 'Bombs' },
    { id: 'paper_bomb', name: 'Paper Bomb' },
    { id: 'vanitha_colors', name: 'Vanitha Colors' },
    { id: 'fancy_candles', name: 'Fancy Candles' },
    { id: 'kids_special', name: 'Kids Special' },
    { id: 'kids_night_attraction', name: 'Kids Night Attraction' }
];

export default function ShopByProducts() {
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const { products, loading, error } = useProducts(selectedCategory);

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
                            {loading ? (
                                <div className="flex items-center justify-center h-64">
                                    <div className="text-2xl text-gray-600">Loading products...</div>
                                </div>
                            ) : error ? (
                                <div className="text-center py-12">
                                    <h3 className="text-lg font-medium text-red-600">Error loading products</h3>
                                    <p className="mt-2 text-sm text-gray-500">{error}</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
                                    {products.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            {...product}
                                            onClick={() => setSelectedProduct(product)}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Empty State */}
                            {!loading && !error && products.length === 0 && (
                                <div className="text-center py-12">
                                    <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                                    <p className="mt-2 text-sm text-gray-500">
                                        {selectedCategory 
                                            ? 'Try selecting a different category'
                                            : 'Please select a category to view products'
                                        }
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Modal */}
            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    isOpen={selectedProduct !== null}
                    onClose={() => setSelectedProduct(null)}
                    onAddToCart={() => {
                        // Add to cart logic here
                        setSelectedProduct(null);
                    }}
                />
            )}
        </main>
    );
}