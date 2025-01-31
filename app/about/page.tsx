'use client';

import Image from 'next/image';
import Link from 'next/link';

const brands = [
    { name: "AJANTHA", logo: "/brand1.webp" },
    { name: "SONNY", logo: "/brand2.webp" },
    { name: "SPARKLES", logo: "/brand3.webp" },
    { name: "THUNDER", logo: "/brand4.webp" },
    { name: "GALAXY", logo: "/brand5.png" },
    { name: "STELLAR", logo: "/brand6.webp" },
    { name: "NOVA", logo: "/brand7.webp" },
    { name: "COSMIC", logo: "/brand8.webp" }
];

export default function About() {
    return (
        <main className="min-h-screen bg-black">
            <section className="relative py-20 bg-gradient-to-b from-yellow-900 to-black">
                <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-6">
                                About SRT Crackers
                            </h1>
                            <div className="text-yellow-100 space-y-4">
                                <p>
                                    SRT Crackers is a well-known brand name in the field of Crackers. We are here to serve you in your &quot;Green Diwali&quot; with our variety of fireworks according to your needs and budget.
                                </p>
                                <p>
                                    Our products are manufactured in Sivakasi, Tamil Nadu, which is the hub of fireworks manufacturing in India. Our products are manufactured with high quality raw materials and with standard quality control measures.
                                </p>
                                <p>
                                    In this website, we will take you to a clear description about the crackers we deal with, and help you to select your own needs. We do all this with great pleasure and satisfaction.
                                </p>
                            </div>
                        </div>
                        <div className="relative aspect-square">
                            <Image
                                src="/demo.jpg"
                                alt="SRT Crackers"
                                fill
                                className="object-cover rounded-xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12">
                    <h2 className="text-3xl font-bold text-yellow-400 text-center mb-12">
                        Our Brands
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {brands.map((brand) => (
                            <div key={brand.name} className="bg-gradient-to-br from-yellow-900 to-black border border-yellow-400/20 rounded-xl p-6 hover:from-yellow-800 hover:to-black transition-all duration-300">
                                <div className="relative aspect-square mb-4">
                                    <Image
                                        src={brand.logo}
                                        alt={brand.name}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <h3 className="text-yellow-400 text-center font-semibold">
                                    {brand.name}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gradient-to-b from-black to-yellow-900">
                <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="bg-gradient-to-br from-yellow-900 to-black border border-yellow-400/20 rounded-xl p-8">
                            <h2 className="text-3xl font-bold text-yellow-400 mb-6">Mission</h2>
                            <p className="text-yellow-100">
                                To be the best fireworks manufacturer committed to bring happiness and joy to everyone&apos;s life.
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-yellow-900 to-black border border-yellow-400/20 rounded-xl p-8">
                            <h2 className="text-3xl font-bold text-yellow-400 mb-6">Vision</h2>
                            <p className="text-yellow-100">
                                Every day we strive for innovation, to be a leader in providing quality and value to our customers in all we do.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12 text-center">
                    <div className="bg-gradient-to-br from-yellow-900 to-black border border-yellow-400/20 rounded-xl p-8">
                        <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                            Join us as we embark on a journey of light,
                        </h2>
                        <p className="text-yellow-100 text-lg">
                            laughter, and love, and together, let&apos;s make this
                            Diwali a truly unforgettable experience for all.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}