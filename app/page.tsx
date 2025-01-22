import ProductCard from "./components/ProductCard";
import ImageSlider from "./components/ImageSlider";
import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    id: 1,
    name: "Ground Chakkar",
    image: "https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?w=800&h=600&fit=crop",
    description: "Colorful ground spinners with mesmerizing effects",
    count: 24
  },
  {
    id: 2,
    name: "Flower Pots",
    image: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=800&h=600&fit=crop",
    description: "Beautiful aerial showers of colorful sparks",
    count: 18
  },
  {
    id: 3,
    name: "Rockets",
    image: "https://images.unsplash.com/photo-1514912885225-5c9ec8507d68?w=800&h=600&fit=crop",
    description: "High-flying crackers with spectacular effects",
    count: 32
  },
  {
    id: 4,
    name: "Single Sound Crackers",
    image: "https://images.unsplash.com/photo-1576687772714-45db4c7c3cd5?w=800&h=600&fit=crop",
    description: "Classic crackers with powerful sound effects",
    count: 45
  },
  {
    id: 5,
    name: "Sparklers",
    image: "https://images.unsplash.com/photo-1481846627958-6c5b29f8edaf?w=800&h=600&fit=crop",
    description: "Safe and beautiful hand-held sparklers",
    count: 28
  },
  {
    id: 6,
    name: "Sky Shots",
    image: "https://images.unsplash.com/photo-1552525892-893defd34d54?w=800&h=600&fit=crop",
    description: "Multi-shot aerial display with stunning effects",
    count: 36
  },
  {
    id: 7,
    name: "Fountains",
    image: "https://images.unsplash.com/photo-1533762385849-5aa14c83dbaf?w=800&h=600&fit=crop",
    description: "Long-lasting fountains with colorful effects",
    count: 22
  },
  {
    id: 8,
    name: "Repeating Shots",
    image: "https://images.unsplash.com/photo-1468276311594-df7cb65d8df6?w=800&h=600&fit=crop",
    description: "Multiple shots with continuous effects",
    count: 30
  },
  {
    id: 9,
    name: "New Arrivals",
    image: "https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?w=800&h=600&fit=crop",
    description: "Latest additions to our collection",
    count: 15,
    isNew: true
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      {/* Hero Slider */}
      <ImageSlider />

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
                <div className="aspect-[4/3] relative overflow-hidden">
                  {/* Category Image */}
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={400}
                    height={300}
                    className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                  
                  {/* New Badge */}
                  {category.isNew && (
                    <div className="absolute top-4 right-4 bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded-full">
                      NEW
                    </div>
                  )}
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
