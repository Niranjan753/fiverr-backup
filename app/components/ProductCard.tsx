import Placeholder from './Placeholder';

interface ProductCardProps {
  name: string;
  price: number;
  discount?: number;
}

export default function ProductCard({ name, price, discount }: ProductCardProps) {
  const discountedPrice = discount ? price - (price * discount / 100) : price;
  
  return (
    <div className="bg-white">
      <div className="relative">
        <div className="bg-[#e31837] text-white h-48 flex items-center justify-center text-2xl font-bold p-4 text-center">
          {name}
        </div>
        {discount && (
          <div className="absolute top-2 right-2 bg-[#e31837] text-white px-2 py-1 text-sm">
            {discount}% OFF
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-center">{name}</h3>
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="text-[#e31837] font-bold">₹{discountedPrice}</span>
          {discount && (
            <span className="text-gray-500 line-through text-sm">₹{price}</span>
          )}
        </div>
        <button className="w-full mt-4 bg-[#e31837] text-white py-2 hover:bg-[#c41430] transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
