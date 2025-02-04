'use client';

import { useState } from 'react';
import Image from 'next/image';

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

const products = [
    {
        id: 1,
        name: "7CM - ELECTRIC",
        category: "sparklers",
        price: "₹149",
        description: "Electric sparklers with bright effects",
        image: "/demo.jpg"
    },
    {
        id: 2,
        name: "7CM - CRACKLING",
        category: "sparklers",
        price: "₹159",
        description: "Crackling sparklers with sound effects",
        image: "/demo.jpg"
    },
    {
        id: 3,
        name: "7CM - 50/50",
        category: "sparklers",
        price: "₹139",
        description: "Mixed effects sparklers",
        image: "/demo.jpg"
    },
    {
        id: 4,
        name: "10CM - ELECTRIC",
        category: "sparklers",
        price: "₹199",
        description: "Long electric sparklers",
        image: "/demo.jpg"
    },
    {
        id: 5,
        name: "Mega Gift Pack",
        category: "gift-pack",
        price: "₹2,999",
        description: "Complete celebration pack",
        image: "/demo.jpg"
    }
];

export default function ShopByProducts() {
    const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
    
    const filteredProducts = products.filter(product => product.category === selectedCategory);

    return (
        <main className="min-h-screen bg-white">
            <section className="py-12">
                <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="md:w-1/4 lg:w-1/5">
                            <div className="bg-white border rounded-lg p-4 sticky top-24">
                                <h2 className="text-lg font-bold mb-4 text-black">Categories</h2>
                                <div className="space-y-2">
                                    {categories.map((category) => (
                                        <button
                                            key={category.id}
                                            onClick={() => setSelectedCategory(category.id)}
                                            className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                                                selectedCategory === category.id
                                                    ? 'bg-red-500 text-white'
                                                    : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                        >
                                            {category.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="md:w-3/4 lg:w-4/5">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                                {filteredProducts.map((product) => (
                                    <div key={product.id} className="group bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                                        <div className="relative aspect-square overflow-hidden">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                                            
                                            <button className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-red-500 text-white px-3 py-1 text-sm rounded-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600">
                                                Quick View
                                            </button>
                                        </div>
                                        
                                        <div className="p-3">
                                            <h3 className="text-sm font-semibold text-black mb-1 truncate">
                                                {product.name}
                                            </h3>
                                            <p className="text-gray-500 text-xs mb-1 line-clamp-2">{product.description}</p>
                                            <p className="text-base font-bold text-black">{product.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {filteredProducts.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="text-gray-500">No products found in this category.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
