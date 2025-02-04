'use client';

import Image from 'next/image';

const brands = [
    { name: "STARVELL", logo: "/brand1.webp" },
    { name: "SUPREME", logo: "/brand2.webp" },
    { name: "VANITHA", logo: "/brand3.webp" },
    { name: "VADIVEL", logo: "/brand4.webp" },
    { name: "SUNSHINE", logo: "/brand5.png" },
    { name: "AJANTA", logo: "/brand6.webp" },
    { name: "SONNY", logo: "/brand7.webp" },
    { name: "MOTHERS", logo: "/brand8.webp" }
];

export default function About() {
    return (
        <main className="min-h-screen bg-white">
            <section className="relative py-20 bg-gradient-to-b from-red-800 to-red-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                About SRT Crackers
                            </h1>
                            <div className="text-red-100 space-y-4">
                                <p>
                                    SRT Crackers is a premier brand in the fireworks industry, dedicated to bringing joy and excitement to your celebrations with our diverse range of high-quality crackers.
                                </p>
                                <p>
                                    Our products are meticulously crafted in Sivakasi, Tamil Nadu - the heart of India's fireworks manufacturing. We pride ourselves on using premium raw materials and adhering to stringent quality control measures.
                                </p>
                                <p>
                                    Explore our website to discover a comprehensive guide to our product range, helping you select the perfect crackers for your needs and budget. We're committed to enhancing your festive experience with unparalleled satisfaction.
                                </p>
                            </div>
                        </div>
                        <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-xl mx-auto">
                            <Image
                                src="/srt-text.png"
                                alt="SRT Crackers"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-red-800 text-center mb-12">
                        Our Esteemed Brands
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {brands.map((brand) => (
                            <div key={brand.name} className="bg-white shadow-lg rounded-xl p-6 transition-all duration-300 hover:shadow-xl">
                                <div className="relative aspect-square mb-4">
                                    <Image
                                        src={brand.logo}
                                        alt={brand.name}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <h3 className="text-red-800 text-center font-semibold">
                                    {brand.name}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-red-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="bg-white shadow-lg rounded-xl p-8">
                            <h2 className="text-3xl font-bold text-red-800 mb-6">Our Mission</h2>
                            <p className="text-gray-700">
                                To be the leading fireworks manufacturer, dedicated to bringing happiness and joy to every celebration, while maintaining the highest standards of safety and quality.
                            </p>
                        </div>

                        <div className="bg-white shadow-lg rounded-xl p-8">
                            <h2 className="text-3xl font-bold text-red-800 mb-6">Our Vision</h2>
                            <p className="text-gray-700">
                                To continuously innovate and set new benchmarks in the fireworks industry, providing unparalleled value and experiences to our customers in everything we do.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}