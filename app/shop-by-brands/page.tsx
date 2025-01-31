'use client';

import Image from 'next/image';
import Link from 'next/link';

const brands = [
    {
        id: 1,
        name: "Standard Fireworks",
        description: "Leading manufacturer of quality fireworks since 1942",
        logo: "/demo.jpg",
        featured: true,
        products: 150
    },
    {
        id: 2,
        name: "Sri Kaliswari",
        description: "Premium fireworks for all celebrations",
        logo: "/demo.jpg",
        featured: true,
        products: 120
    },
    {
        id: 3,
        name: "Ayyan Fireworks",
        description: "Traditional and modern fireworks solutions",
        logo: "/demo.jpg",
        featured: false,
        products: 85
    },
    {
        id: 4,
        name: "Coronation",
        description: "Innovative and safe firework products",
        logo: "/demo.jpg",
        featured: false,
        products: 95
    },
    {
        id: 5,
        name: "Sony Fireworks",
        description: "High-quality crackers for every occasion",
        logo: "/demo.jpg",
        featured: false,
        products: 110
    },
    {
        id: 6,
        name: "Cock Brand",
        description: "Trusted name in fireworks industry",
        logo: "/demo.jpg",
        featured: true,
        products: 130
    }
];

export default function ShopByBrands() {
    return (
        <main className="min-h-screen bg-black">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-b from-yellow-900 to-black">
                <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-yellow-400 mb-6">
                        Shop By Brands
                    </h1>
                    <p className="text-xl text-yellow-100 max-w-2xl mx-auto">
                        Discover premium fireworks from India&apos;s most trusted manufacturers.
                        Quality and safety guaranteed.
                    </p>
                </div>
            </section>

            {/* Featured Brands */}
            <section className="py-16">
                <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12">
                    <h2 className="text-4xl font-bold text-yellow-400 text-center mb-12">
                        Featured Brands
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {brands.filter(brand => brand.featured).map((brand) => (
                            <div key={brand.id} className="group">
                                <div className="relative aspect-square overflow-hidden rounded-xl mb-4 bg-black/60 backdrop-blur-sm border border-yellow-400/20">
                                    <Image
                                        src={brand.logo}
                                        alt={brand.name}
                                        fill
                                        className="object-contain p-8 transition-transform duration-300 group-hover:scale-110"
                                    />
                                </div>
                                
                                <div className="text-center">
                                    <h3 className="text-2xl font-semibold text-yellow-400 mb-2">
                                        {brand.name}
                                    </h3>
                                    <p className="text-yellow-100/80 mb-4">{brand.description}</p>
                                    <p className="text-yellow-400/60">
                                        {brand.products}+ Products Available
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* All Brands Grid */}
            <section className="py-16 bg-gradient-to-b from-black to-yellow-900">
                <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12">
                    <h2 className="text-4xl font-bold text-yellow-400 text-center mb-12">
                        All Brands
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {brands.map((brand) => (
                            <Link
                                key={brand.id}
                                href={`/brands/${brand.name.toLowerCase().replace(/\s+/g, '-')}`}
                                className="group bg-black/40 backdrop-blur-sm border border-yellow-400/20 rounded-xl p-6 hover:bg-black/60 transition-all duration-300"
                            >
                                <div className="relative aspect-square mb-4">
                                    <Image
                                        src={brand.logo}
                                        alt={brand.name}
                                        fill
                                        className="object-contain p-4 transition-transform duration-300 group-hover:scale-110"
                                    />
                                </div>
                                <div className="text-center">
                                    <h3 className="text-xl font-semibold text-yellow-400 mb-2">{brand.name}</h3>
                                    <p className="text-yellow-100/60 text-sm">{brand.products}+ Products</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Brand Benefits */}
            <section className="py-16">
                <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Quality Assured",
                                description: "All our brand partners follow strict quality control measures"
                            },
                            {
                                title: "Safety First",
                                description: "Products comply with all safety regulations and standards"
                            },
                            {
                                title: "Best Prices",
                                description: "Direct partnership ensures competitive pricing"
                            }
                        ].map((benefit, index) => (
                            <div 
                                key={index}
                                className="text-center p-8 bg-black/40 backdrop-blur-sm border border-yellow-400/20 rounded-xl"
                            >
                                <h3 className="text-xl font-semibold text-yellow-400 mb-4">
                                    {benefit.title}
                                </h3>
                                <p className="text-yellow-100/80">
                                    {benefit.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
