import Image from "next/image";
import ProductCard from "./components/ProductCard";
import Placeholder from "./components/Placeholder";

const featuredProducts = [
  {
    name: "Classic Sparklers",
    price: 299,
    discount: 10,
  },
  {
    name: "Ground Chakkar",
    price: 199,
    discount: 15,
  },
  {
    name: "Sky Rockets",
    price: 499,
    discount: 20,
  },
  {
    name: "Flower Pots",
    price: 399,
    discount: 25,
  }
];

const categories = [
  "Sparklers",
  "Ground Chakkar",
  "Rockets",
  "Flower Pots"
];

export default function Home() {
  return (
    <>
      {/* Hero Banner */}
      <div className="w-full h-[400px] bg-[#8B0000] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">Diwali Special Offers</h1>
          <p className="text-xl">Up to 50% off on selected items</p>
        </div>
      </div>

      {/* Featured Categories */}
      <section className="py-12">
        <h2 className="text-2xl font-bold mb-8 text-center">Featured Categories</h2>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {categories.map((category) => (
              <div key={category} className="text-center">
                <div className="mx-auto w-24 h-24 rounded-full bg-[#e31837] flex items-center justify-center mb-4">
                  <span className="text-white text-sm px-2 text-center">{category}</span>
                </div>
                <h3 className="font-medium">{category}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-12 bg-gray-50">
        <h2 className="text-2xl font-bold mb-8 text-center">Best Sellers</h2>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-[#e31837] text-white p-6 text-center">
              <h3 className="text-xl font-bold mb-2">Early Bird Offer</h3>
              <p>Get additional 10% off on orders above ₹2000</p>
            </div>
            <div className="bg-[#FFC107] text-white p-6 text-center">
              <h3 className="text-xl font-bold mb-2">Combo Deals</h3>
              <p>Save big with our specially curated combo boxes</p>
            </div>
            <div className="bg-[#28A745] text-white p-6 text-center">
              <h3 className="text-xl font-bold mb-2">Bulk Orders</h3>
              <p>Special discounts for bulk orders</p>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
