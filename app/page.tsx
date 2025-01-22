import ProductCard from "./components/ProductCard";
import ImageSlider from "./components/ImageSlider";

const products = [
  {
    name: "Supreme Deluxe",
    price: 2999,
    discount: 15,
    image: "https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?w=400&h=400&fit=crop",
    rating: 4.5,
    description: "Premium quality crackers with extra-long duration and vibrant colors."
  },
  {
    name: "Color Rain 5000",
    price: 1999,
    discount: 10,
    image: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=400&h=400&fit=crop",
    rating: 4.2,
    description: "Creates a stunning display of colorful sparks that rain down."
  },
  {
    name: "Golden Sparklers",
    price: 499,
    discount: 5,
    image: "https://images.unsplash.com/photo-1514912885225-5c9ec8507d68?w=400&h=400&fit=crop",
    rating: 4.8,
    description: "Long-lasting sparklers that create beautiful golden patterns."
  },
  {
    name: "Thunder Bombs",
    price: 799,
    discount: 12,
    image: "https://images.unsplash.com/photo-1576687772714-45db4c7c3cd5?w=400&h=400&fit=crop",
    rating: 4.0,
    description: "High-intensity crackers that create impressive sound effects."
  },
  {
    name: "Rainbow Wheel",
    price: 1299,
    discount: 8,
    image: "https://images.unsplash.com/photo-1481846627958-6c5b29f8edaf?w=400&h=400&fit=crop",
    rating: 4.6,
    description: "Spinning wheel that creates a mesmerizing display of rainbow colors."
  },
  {
    name: "Flower Shower",
    price: 1599,
    discount: 20,
    image: "https://images.unsplash.com/photo-1552525892-893defd34d54?w=400&h=400&fit=crop",
    rating: 4.7,
    description: "Creates beautiful flower-shaped patterns in the sky."
  },
  {
    name: "Magic Missiles",
    price: 899,
    discount: 15,
    image: "https://images.unsplash.com/photo-1533762385849-5aa14c83dbaf?w=400&h=400&fit=crop",
    rating: 4.3,
    description: "High-flying rockets that burst into spectacular patterns."
  },
  {
    name: "Diamond Chain",
    price: 2499,
    discount: 18,
    image: "https://images.unsplash.com/photo-1468276311594-df7cb65d8df6?w=400&h=400&fit=crop",
    rating: 4.9,
    description: "Premium crackers that create a chain reaction of patterns."
  },
  {
    name: "Aerial Shell Kit",
    price: 399,
    discount: 22,
    image: "https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?w=400&h=400&fit=crop",
    rating: 4.7,
    description: "Professional-grade aerial shells for spectacular displays."
  },
  {
    name: "Celebration Pack",
    price: 4999,
    discount: 25,
    image: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=400&h=400&fit=crop",
    rating: 4.8,
    description: "Complete celebration pack with variety of effects."
  },
  {
    name: "Kids Special",
    price: 699,
    discount: 10,
    image: "https://images.unsplash.com/photo-1514912885225-5c9ec8507d68?w=400&h=400&fit=crop",
    rating: 4.4,
    description: "Safe and fun crackers specially designed for children."
  },
  {
    name: "Party Popper Set",
    price: 299,
    discount: 5,
    image: "https://images.unsplash.com/photo-1576687772714-45db4c7c3cd5?w=400&h=400&fit=crop",
    rating: 4.2,
    description: "Colorful party poppers perfect for celebrations."
  },
  {
    name: "Grand Finale Box",
    price: 5999,
    discount: 30,
    image: "https://images.unsplash.com/photo-1481846627958-6c5b29f8edaf?w=400&h=400&fit=crop",
    rating: 5.0,
    description: "The ultimate finale box for your celebration."
  },
  {
    name: "Sparkle Fountain",
    price: 899,
    discount: 12,
    image: "https://images.unsplash.com/photo-1552525892-893defd34d54?w=400&h=400&fit=crop",
    rating: 4.6,
    description: "Beautiful fountain effect with long duration."
  },
  {
    name: "Diwali Special",
    price: 3499,
    discount: 20,
    image: "https://images.unsplash.com/photo-1533762385849-5aa14c83dbaf?w=400&h=400&fit=crop",
    rating: 4.8,
    description: "Special Diwali assortment of premium crackers."
  },
  {
    name: "Night Sky Pack",
    price: 2799,
    discount: 15,
    image: "https://images.unsplash.com/photo-1468276311594-df7cb65d8df6?w=400&h=400&fit=crop",
    rating: 4.7,
    description: "Perfect for lighting up the night sky."
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Slider */}
      <ImageSlider />

      {/* Products Section */}
      <section className="py-16 px-6 md:px-8 lg:px-12 max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900">
            Featured Products
          </h2>
          <p className="mt-1 text-gray-500">
            Premium quality crackers for your celebrations
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-6 lg:gap-8">
          {products.map((product, index) => (
            <div key={index} className="h-full">
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
