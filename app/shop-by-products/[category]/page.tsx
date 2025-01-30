import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

// This would typically come from an API or database
const categoryProducts = {
  'aerial-shots': {
    name: "Aerial Shots",
    products: [
      {
        id: 1,
        name: "240 Shots Cake",
        price: 1999,
        image: "/products/240-shots.jpg",
        description: "Multi-colored aerial display with 240 shots"
      },
      {
        id: 2,
        name: "100 Shots Cake",
        price: 999,
        image: "/products/100-shots.jpg",
        description: "Spectacular aerial display with 100 shots"
      },
      // Add more products...
    ]
  },
  'ground-chakkar': {
    name: "Ground Chakkar",
    products: [
      {
        id: 1,
        name: "Golden Spinner",
        price: 149,
        image: "/products/golden-spinner.jpg",
        description: "Classic ground spinner with golden sparks"
      },
      // Add more products...
    ]
  },
  // Add more categories...
};

type Props = {
  params: {
    category: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categoryName = params.category.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  return {
    title: `${categoryName} - SRT Crackers`,
    description: `Explore our collection of ${categoryName.toLowerCase()} crackers and fireworks`,
  };
}

export default function CategoryPage({ params }: Props) {
  // In a real app, you'd fetch this data from an API
  const categoryData = categoryProducts[params.category as keyof typeof categoryProducts] || {
    name: params.category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' '),
    products: []
  };

  return (
    <div className="bg-black min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-yellow-400 mb-4">{categoryData.name}</h1>
          <p className="text-gray-300 text-lg">
            Explore our collection of {categoryData.name.toLowerCase()}
          </p>
        </div>

        {/* Filter Section */}
        <div className="mb-8 flex flex-wrap gap-4">
          <select className="bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-700">
            <option value="">Sort By</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="popular">Most Popular</option>
          </select>

          <select className="bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-700">
            <option value="">Brand</option>
            <option value="cock">Cock Brand</option>
            <option value="coronation">Coronation</option>
            <option value="standard">Standard</option>
          </select>

          <select className="bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-700">
            <option value="">Price Range</option>
            <option value="0-500">₹0 - ₹500</option>
            <option value="501-1000">₹501 - ₹1000</option>
            <option value="1001+">₹1001+</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryData.products.map((product) => (
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

        {categoryData.products.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            <p>No products found in this category.</p>
            <Link href="/shop-by-products" className="text-yellow-400 hover:text-yellow-500 mt-4 inline-block">
              ← Back to all categories
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
