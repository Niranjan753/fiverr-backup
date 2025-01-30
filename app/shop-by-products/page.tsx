import Image from 'next/image';
import Link from 'next/link';

const categories = [
  {
    id: 1,
    name: "Aerial Shots",
    image: "/products/aerial.jpg",
    description: "Spectacular aerial display crackers",
    subCategories: ["Single Shot", "Multi Shot", "Aerial Repeaters"]
  },
  {
    id: 2,
    name: "Ground Chakkar",
    image: "/products/chakkar.jpg",
    description: "Spinning ground fireworks",
    subCategories: ["Classic Chakkar", "Glitter Chakkar", "Color Chakkar"]
  },
  {
    id: 3,
    name: "Sparklers",
    image: "/products/sparklers.jpg",
    description: "Hand-held sparkling fireworks",
    subCategories: ["Color Sparklers", "Electric Sparklers", "Morning Sparklers"]
  },
  {
    id: 4,
    name: "Fountains",
    image: "/products/fountains.jpg",
    description: "Beautiful shower of sparks",
    subCategories: ["Small Fountains", "Medium Fountains", "Large Fountains"]
  },
  {
    id: 5,
    name: "Rockets",
    image: "/products/rockets.jpg",
    description: "High-flying aerial fireworks",
    subCategories: ["Whistling Rockets", "Color Rockets", "Multi-Effect Rockets"]
  },
  {
    id: 6,
    name: "Sound Crackers",
    image: "/products/sound.jpg",
    description: "Various sound-making crackers",
    subCategories: ["Atom Bombs", "Deluxe Bombs", "Chain Crackers"]
  },
  {
    id: 7,
    name: "Kids Special",
    image: "/products/kids.jpg",
    description: "Safe crackers for children",
    subCategories: ["Snake Tablets", "Pop-Pops", "Small Sparklers"]
  },
  {
    id: 8,
    name: "Gift Boxes",
    image: "/products/giftbox.jpg",
    description: "Assorted cracker collections",
    subCategories: ["Family Pack", "Premium Pack", "Deluxe Pack"]
  }
];

export default function ShopByProducts() {
  return (
    <div className="bg-black min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-yellow-400 mb-4">Shop By Products</h1>
          <p className="text-gray-300 text-lg">
            Explore our wide range of crackers by category
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link 
              href={`/shop-by-products/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
              key={category.id}
              className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="aspect-[4/3] relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-yellow-400 mb-2">{category.name}</h3>
                <p className="text-gray-400 mb-3 text-sm">{category.description}</p>
                <div className="space-y-1">
                  {category.subCategories.map((sub, index) => (
                    <div key={index} className="text-sm text-gray-500">{sub}</div>
                  ))}
                </div>
                <div className="mt-4 text-right">
                  <span className="text-yellow-400 font-medium">View Products →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
