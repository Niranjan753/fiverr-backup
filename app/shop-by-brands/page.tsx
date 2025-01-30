import Image from 'next/image';
import Link from 'next/link';

const brands = [
  {
    id: 1,
    name: "Cock Brand",
    image: "/brands/cock.jpg",
    description: "Premium quality crackers with superior performance",
    productCount: 45
  },
  {
    id: 2,
    name: "Coronation",
    image: "/brands/coronation.jpg",
    description: "Traditional crackers with modern safety standards",
    productCount: 38
  },
  {
    id: 3,
    name: "Standard",
    image: "/brands/standard.jpg",
    description: "Reliable and consistent quality crackers",
    productCount: 52
  },
  {
    id: 4,
    name: "Classic",
    image: "/brands/classic.jpg",
    description: "Time-tested favorites for all celebrations",
    productCount: 33
  },
  {
    id: 5,
    name: "Sri Kaliswari",
    image: "/brands/kaliswari.jpg",
    description: "Innovation meets tradition in fireworks",
    productCount: 60
  },
  {
    id: 6,
    name: "Supreme Industries",
    image: "/brands/supreme.jpg",
    description: "High-end crackers for special occasions",
    productCount: 42
  }
];

export default function ShopByBrands() {
  return (
    <div className="bg-black min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-yellow-400 mb-4">Shop By Brands</h1>
          <p className="text-gray-300 text-lg">
            Explore our collection of premium cracker brands
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brands.map((brand) => (
            <Link 
              href={`/shop-by-brands/${brand.name.toLowerCase().replace(/\s+/g, '-')}`}
              key={brand.id}
              className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="aspect-[16/9] relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-yellow-400 mb-2">{brand.name}</h3>
                <p className="text-gray-400 mb-4">{brand.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-white">{brand.productCount} Products</span>
                  <span className="text-yellow-400 font-medium">View All →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
