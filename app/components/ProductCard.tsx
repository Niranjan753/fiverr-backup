'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { Product } from '../types/product';

type ProductCardProps = Product & {
  className?: string;
};

export default function ProductCard({ 
  id, 
  name, 
  price, 
  image_url, 
  description,
  stock_status,
  className = '' 
}: ProductCardProps) {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price,
      image_url,
      quantity: 1
    });
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square">
        <Image
          src={image_url || '/placeholder.jpg'}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">₹{price}</span>
          <button
            onClick={handleAddToCart}
            disabled={stock_status === 'out_of_stock'}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              stock_status === 'out_of_stock'
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-red-600 text-white hover:bg-red-700'
            }`}
          >
            {stock_status === 'out_of_stock' ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
