import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  name: string;
  price: number;
  discount: number;
  image: string;
  rating: number;
  description: string;
}

export default function ProductCard({ name, price, discount, image, rating, description }: ProductCardProps) {
  const discountedPrice = price - (price * discount) / 100;

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
      <Link href={`/product/${name.toLowerCase().replace(/\s+/g, '-')}`} className="block">
        <div className="relative aspect-square">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover rounded-t-lg"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {discount > 0 && (
            <div className="absolute top-2 right-2 bg-[#e31837] text-white text-sm font-medium px-2 py-1 rounded">
              {discount}% OFF
            </div>
          )}
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/product/${name.toLowerCase().replace(/\s+/g, '-')}`} className="block">
          <h3 className="text-lg font-medium text-gray-800 mb-1 hover:text-[#e31837] transition-colors">
            {name}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{description}</p>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-[#e31837]">₹{discountedPrice}</span>
            {discount > 0 && (
              <span className="text-sm text-gray-500 line-through">₹{price}</span>
            )}
          </div>
          <button className="bg-[#e31837] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#c41430] transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
