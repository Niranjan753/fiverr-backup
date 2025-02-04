import VideoHero from "./components/VideoHero";
import Link from "next/link";
import Image from "next/image";
import WelcomeSection from './components/WelcomeSection';
import FeaturesSection from './components/FeaturesSection';
import StatsCounter from './components/StatsCounter';
import ReviewsSection from './components/ReviewsSection';

const categories = [
  {
    id: 1,
    name: "Ground Chakkar",
    description: "Colorful ground spinners with mesmerizing effects",
    count: 24,
    image: "/ground-chakkar.webp"
  },
  {
    id: 2,
    name: "Flower Pots",
    description: "Beautiful aerial showers of colorful sparks",
    count: 18,
    image: "/flowerpot.webp"
  },
  {
    id: 3,
    name: "Rockets",
    description: "High-flying crackers with spectacular effects",
    count: 32,
    image: "/rocket.webp"
  },
  {
    id: 4,
    name: "Single Sound Crackers",
    description: "Classic crackers with powerful sound effects",
    count: 45,
    image: "/singlesound.webp"
  },
  {
    id: 5,
    name: "Sparklers",
    description: "Safe and beautiful hand-held sparklers",
    count: 28,
    image: "/sparklers.webp"
  },
  {
    id: 6,
    name: "Sky Shots",
    description: "Multi-shot aerial display with stunning effects",
    count: 36,
    image: "/skyshots.webp"
  },
  {
    id: 7,
    name: "Fountains",
    description: "Long-lasting fountains with colorful effects",
    count: 22,
    image: "/fountain.webp"
  },
  {
    id: 8,
    name: "Repeating Shots",
    description: "Multiple shots with continuous effects",
    count: 30,
    image: "/repeatingshot.webp"
  },
  {
    id: 9,
    name: "New Arrivals",
    description: "Latest additions to our collection",
    count: 15,
    isNew: true,
    image: "/newarrival.webp"
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <VideoHero />
      {/* Products Section */}
      <section className="relative" style={{
        background: `radial-gradient(circle at center, #FACC15 0%, #EAB308 40%, #000000 100%)`
      }}>
        <div className="relative z-10 px-6 md:px-8 lg:px-12 max-w-[1400px] mx-auto">
          {/* Section Header */}
          <div className="mb-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-2 mt-4 pt-10">
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
                    src={category.image}
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
          <div className="mt-12 pb-16 text-center">
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
      <ReviewsSection />
      <WelcomeSection />
      <FeaturesSection />

      {/* Featured Categories */}
      <section className="py-16 px-4 md:px-8 bg-black">
      </section>

      {/* Stats Counter */}
      <StatsCounter />
      <LegalNotice />
    </main>
  );
}
const LegalNotice = () => (
  <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 ">
    <p className="font-bold mb-2">Important Legal Notice:</p>
    <p className="text-sm">
    As per the 2018 Supreme Court order, online sales of firecrackers are not 
      permitted. At SRT Crackers, we value our customers and respect legal 
      jurisdiction. We kindly request you to add products to your cart and submit 
      your requirements through the enquiry button. Our team will contact you 
      within 24 hours to confirm your order via WhatsApp or phone call. Please 
      submit your enquiries and enjoy a safe Diwali with SRT Crackers. SRT Crackers 
      adheres to 100% legal and statutory compliances, and all our shops and 
      warehouses are maintained as per explosive acts. We dispatch orders 
      through registered and legal transport service providers, in line with 
      standard practices in Sivakasi.
    </p>
  </div>
);    
