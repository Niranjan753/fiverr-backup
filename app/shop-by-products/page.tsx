'use client';

import Image from 'next/image';
import Link from 'next/link';

const products = [
    {
        id: 1,
        name: "Supreme Sky Shot",
        category: "Sky Shots",
        price: "₹1,499",
        description: "Multi-color aerial display with stunning effects",
        image: "/demo.jpg"
    },
    {
        id: 2,
        name: "Golden Sparklers",
        category: "Sparklers",
        price: "₹299",
        description: "Long-lasting sparklers with golden sparkles",
        image: "/demo.jpg"
    },
    {
        id: 3,
        name: "Thunder King",
        category: "Sound Crackers",
        price: "₹799",
        description: "Powerful sound crackers with maximum impact",
        image: "/demo.jpg"
    },
    {
        id: 4,
        name: "Color Rain Fountain",
        category: "Fountains",
        price: "₹999",
        description: "Beautiful fountain with colorful rain effects",
        image: "/demo.jpg"
    },
    {
        id: 5,
        name: "Mega Ground Chakkar",
        category: "Ground Chakkars",
        price: "₹399",
        description: "High-speed spinning with colorful sparks",
        image: "/demo.jpg"
    },
    {
        id: 6,
        name: "Rocket Express",
        category: "Rockets",
        price: "₹599",
        description: "High-flying rockets with trail effects",
        image: "/demo.jpg"
    }
];

export default function ShopByProducts() {
    return (
        <main className="min-h-screen bg-black">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-b from-yellow-900 to-black">
                <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-yellow-400 mb-6">
                        Shop By Products
                    </h1>
                    <p className="text-xl text-yellow-100 max-w-2xl mx-auto">
                        Explore our extensive collection of premium quality crackers, 
                        carefully curated for your celebration needs.
                    </p>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-16">
                <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product) => (
                            <div key={product.id} className="group">
                                <div className="relative aspect-square overflow-hidden rounded-xl mb-4">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                                    
                                    {/* Quick View Button */}
                                    <button className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-yellow-500">
                                        Quick View
                                    </button>
                                </div>
                                
                                <div className="text-center">
                                    <h3 className="text-xl font-semibold text-yellow-400 mb-1">
                                        {product.name}
                                    </h3>
                                    <p className="text-yellow-100/80 mb-2">{product.category}</p>
                                    <p className="text-2xl font-bold text-yellow-400 mb-4">{product.price}</p>
                                    <p className="text-yellow-100/60 text-sm">{product.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-16 bg-gradient-to-b from-black to-yellow-900">
                <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12">
                    <h2 className="text-4xl font-bold text-yellow-400 text-center mb-12">
                        Browse By Category
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {['Sky Shots', 'Sparklers', 'Sound Crackers', 'Fountains', 'Ground Chakkars', 'Rockets', 'Flower Pots', 'New Arrivals'].map((category) => (
                            <Link
                                key={category}
                                href={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                                className="bg-black/40 backdrop-blur-sm border border-yellow-400/20 rounded-xl p-6 text-center hover:bg-black/60 transition-all duration-300"
                            >
                                <h3 className="text-yellow-400 font-semibold">{category}</h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
