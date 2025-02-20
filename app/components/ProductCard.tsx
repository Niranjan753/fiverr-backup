'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image_url: string;
  description: string;
  stock?: number;
  category: string;
  brand?: string;
  featured?: boolean;
}

export default function ProductCard({ id, name, price, image_url, description, stock }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const { addToCart } = useCart();

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= 99) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id: id.toString(),
      name,
      price,
      image: image_url,
      image_url,
      description,
      category: '',
      discount: 0,
      rating: 0,
      features: [],
      specifications: {},
      safetyInstructions: [],
      stock: stock || 0,
      isNew: false
    }, quantity);
    setQuantity(1);
    setIsOpen(false);
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative">
      <div 
        className="relative aspect-square cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <Image
          src={image_url || '/placeholder.jpg'}
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-1">{name}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-[#2874f0]">₹{price}</span>
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-gray-100 rounded-lg">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="px-2 py-1 text-gray-600 hover:text-[#2874f0] transition-colors"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                className="w-12 text-center bg-transparent border-none focus:outline-none text-gray-900"
                min="1"
                max="99"
              />
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="px-2 py-1 text-gray-600 hover:text-[#2874f0] transition-colors"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-[#2874f0] text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              Add
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full mx-4 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative aspect-square rounded-xl overflow-hidden">
                <Image
                  src={image_url || '/placeholder.jpg'}
                  alt={name}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{name}</h2>
                <p className="text-gray-600 mb-4">{description}</p>
                <div className="text-3xl font-bold text-[#2874f0] mb-6">₹{price}</div>

                <div className="flex items-center gap-4 mb-6">
                  <span className="text-gray-700">Quantity:</span>
                  <div className="flex items-center bg-gray-100 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="px-3 py-2 text-gray-600 hover:text-[#2874f0] transition-colors"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                      className="w-16 text-center bg-transparent border-none focus:outline-none text-gray-900"
                      min="1"
                      max="99"
                    />
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="px-3 py-2 text-gray-600 hover:text-[#2874f0] transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-[#2874f0] text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                  >
                    Add to Cart
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
