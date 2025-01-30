import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

// This would typically come from an API or database
const brandProducts = {
  'cock': {
    name: "Cock Brand",
    products: [
      {
        id: 1,
        name: "Cock Brand Deluxe Bombs",
        price: 299,
        image: "/products/deluxe-bombs.jpg",
        description: "Premium quality sound crackers"
      },
      {
        id: 2,
        name: "Cock Brand Color Sparklers",
        price: 199,
        image: "/products/color-sparklers.jpg",
        description: "Colorful hand sparklers"
      },
      // Add more products...
    ]
  },
  'coronation': {
    name: "Coronation",
    products: [
      {
        id: 1,
        name: "Coronation Aerial Shots",
        price: 499,
        image: "/products/aerial-shots.jpg",
        description: "Multi-shot aerial display"
      },
      // Add more products...
    ]
  },
  // Add more brands...
};

export async function generateMetadata({ params }: { params: { brand: string } }): Promise<Metadata> {
  const brandName = params.brand.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  return {
    title: `${brandName} Products - SRT Crackers`,
    description: `Explore our collection of ${brandName} crackers and fireworks products`,
  };
}

export default async function BrandPage({ params }: { params: { brand: string } }) {
  // In a real app, you'd fetch this data from an API
  const brandData = brandProducts[params.brand as keyof typeof brandProducts] || {
    name: params.brand.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' '),
    products: []
  };

  return (
    <div className="bg-black min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-yellow-400 mb-4">{brandData.name}</h1>
          <p className="text-gray-300 text-lg">
            Explore our collection of {brandData.name} products
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {brandData.products.map((product) => (
            <div 
              key={product.id}
              className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-yellow-400 mb-2">{product.name}</h3>
                <p className="text-gray-400 mb-3">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-white font-bold">₹{product.price}</span>
                  <button className="bg-yellow-400 text-black px-4 py-2 rounded-full hover:bg-yellow-500 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {brandData.products.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            <p>No products found for this brand.</p>
            <Link href="/shop-by-brands" className="text-yellow-400 hover:text-yellow-500 mt-4 inline-block">
              ← Back to all brands
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
