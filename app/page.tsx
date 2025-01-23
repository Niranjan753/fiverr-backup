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
      <section className="relative py-8" style={{
        background: `radial-gradient(circle at center, #FACC15 0%, #EAB308 40%, #000000 100%)`
      }}>
        <div className="relative z-10 px-6 md:px-8 lg:px-12 max-w-[1400px] mx-auto">
          {/* Section Header */}
          <div className="mb-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-2">
              Featured Categories
            </h2>
            <p className="text-xl text-white pt-[-4]">
              Explore our wide range of premium quality crackers
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {categories.map((category) => (
              <Link 
                href={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                key={category.id}
                className="group relative overflow-hidden rounded-xl bg-black hover:transform hover:scale-[1.02] transition-all duration-300"
              >
                <div className="aspect-[16/9] relative overflow-hidden">
                  <Image
                    src="/demo.jpg"
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                  
                  {/* New Badge */}
                  {category.isNew && (
                    <div className="absolute top-4 right-4 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                      NEW
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-yellow-400 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-yellow-400/70 text-sm mb-4">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-yellow-400/60 text-sm">
                      {category.count} Products
                    </span>
                    <span className="text-yellow-400 text-lg group-hover:translate-x-1 transition-transform duration-300">
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
              className="inline-flex items-center bg-black text-yellow-400 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-900 transition-colors duration-200 shadow-lg hover:shadow-yellow-400/20"
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
