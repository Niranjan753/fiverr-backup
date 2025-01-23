import ProductCard from "./components/ProductCard";
import VideoHero from "./components/VideoHero";
import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    id: 1,
    name: "Ground Chakkar",
    description: "Colorful ground spinners with mesmerizing effects",
    count: 24
  },
  {
    id: 2,
    name: "Flower Pots",
    description: "Beautiful aerial showers of colorful sparks",
    count: 18
  },
  {
    id: 3,
    name: "Rockets",
    description: "High-flying crackers with spectacular effects",
    count: 32
  },
  {
    id: 4,
    name: "Single Sound Crackers",
    description: "Classic crackers with powerful sound effects",
    count: 45
  },
  {
    id: 5,
    name: "Sparklers",
    description: "Safe and beautiful hand-held sparklers",
    count: 28
  },
  {
    id: 6,
    name: "Sky Shots",
    description: "Multi-shot aerial display with stunning effects",
    count: 36
  },
  {
    id: 7,
    name: "Fountains",
    description: "Long-lasting fountains with colorful effects",
    count: 22
  },
  {
    id: 8,
    name: "Repeating Shots",
    description: "Multiple shots with continuous effects",
    count: 30
  },
  {
    id: 9,
    name: "New Arrivals",
    description: "Latest additions to our collection",
    count: 15,
    isNew: true
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      {/* Hero Slider */}
      <VideoHero />

      {/* Products Section */}
      <section className="relative py-16">
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 z-0" 
          style={{
            background: `
              linear-gradient(rgba(0, 0, 0, 0.92), rgba(0, 0, 0, 0.92)),
              url("/dark-container-grid.svg")
            `,
            backgroundSize: '80px 80px',
            backgroundRepeat: 'repeat',
            backgroundPosition: 'center center',
            backgroundColor: '#000000',
          }}
        />

        <div className="relative z-10 px-6 md:px-8 lg:px-12 max-w-[1400px] mx-auto">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold text-yellow-400 mb-4">
              Featured Categories
            </h2>
            <p className="text-xl text-yellow-300/80">
              Explore our wide range of premium quality crackers
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {categories.map((category) => (
              <Link 
                href={`/category/${category.id}`} 
                key={category.id}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-black border border-yellow-400/10 hover:border-yellow-400/30 transition-all duration-300"
              >
                <div className="aspect-[21/9] relative overflow-hidden">
                  {/* Placeholder with dimensions: 600x260 pixels */}
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <div className="text-yellow-400/30 text-sm">
                      Image: 600x260px
                    </div>
                  </div>
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                  
                  {/* New Badge */}
                  {category.isNew && (
                    <div className="absolute top-4 right-4 bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded-full">
                      NEW
                    </div>
                  )}

                  {/* Category Name Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-2xl font-bold text-white text-center px-4 py-2 bg-black/60 rounded-lg">
                      {category.name}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-yellow-300/70 text-sm mb-4">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-yellow-300/60 text-sm">
                      {category.count} Products
                    </span>
                    <span className="text-yellow-400 group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* View All Button */}
          <div className="mt-12 text-center">
            <Link 
              href="/products" 
              className="inline-flex items-center bg-yellow-400 text-black px-8 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-300 transition-colors duration-200 shadow-lg hover:shadow-yellow-400/20"
            >
              View All Products
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
