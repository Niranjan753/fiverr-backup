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
    <div className="bg-white rounded-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:border-gray-200">
      <Link href={`/product/${name.toLowerCase().replace(/\s+/g, '-')}`}>
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {discount > 0 && (
            <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 text-xs font-medium rounded">
              Save {discount}%
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-3.5 h-3.5 ${i < rating ? 'text-yellow-400' : 'text-gray-200'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="ml-1.5 text-xs text-gray-500">{rating}</span>
        </div>

        {/* Title */}
        <Link href={`/product/${name.toLowerCase().replace(/\s+/g, '-')}`}>
          <h3 className="font-medium text-gray-900 mb-1 hover:text-red-600 transition-colors">
            {name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
          {description}
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-lg font-semibold text-gray-900">
            ₹{discountedPrice.toFixed(0)}
          </span>
          {discount > 0 && (
            <span className="text-sm text-gray-400 line-through">
              ₹{price}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button className="w-full bg-gray-900 text-white py-2 px-4 text-sm font-medium rounded 
          hover:bg-red-600 transition-colors duration-200">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
