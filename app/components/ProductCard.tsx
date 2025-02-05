'use client';

import Image from 'next/image';
import { useState } from 'react';
import ProductModal from './ProductModal';
import { Product } from '../types/product';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

type ProductCardProps = Partial<Product> & {
  name: string;
  price: number;
  discount: number;
  image: string;
  rating: number;
  description: string;
  onClick?: () => void;
};

export default function ProductCard(props: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCart();
  
  const { 
    name, 
    price, 
    discount, 
    image, 
    rating,
    description,
    features = [],
    specifications = {},
    safetyInstructions = [],
    stock = 0,
    category = '',
    isNew = false,
    id = '',
    onClick,
  } = props;

  const discountedPrice = price - (price * discount) / 100;

  const fullProduct: Product = {
    id,
    name,
    price,
    discount,
    image,
    rating,
    description,
    features,
    specifications,
    safetyInstructions,
    stock,
    category,
    isNew
  };

  const handleAddToCart = () => {
    addToCart(fullProduct);
  };

  return (
    <>
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:border-red-500 transition-colors"
      >
        <div className="relative h-48 cursor-pointer" onClick={onClick || (() => setIsModalOpen(true))}>
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
          />
          {isNew && (
            <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
              New
            </div>
          )}
          {discount > 0 && (
            <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
              {discount}% OFF
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{name}</h3>
          
          <div className="flex items-center mb-2">
            <div className="flex text-yellow-400">
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
            <span className="text-sm text-gray-600 ml-2">{rating}</span>
          </div>

          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>

          <div className="flex items-center justify-between">
            <div>
              {discount > 0 ? (
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-red-600">₹{discountedPrice.toFixed(2)}</span>
                  <span className="text-sm text-gray-500 line-through">₹{price.toFixed(2)}</span>
                </div>
              ) : (
                <span className="text-lg font-bold text-red-600">₹{price.toFixed(2)}</span>
              )}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart();
              }}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-semibold"
            >
              Add to Cart
            </motion.button>
          </div>
        </div>
      </motion.div>

      {isModalOpen && (
        <ProductModal
          product={fullProduct}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddToCart={handleAddToCart}
        />
      )}
    </>
  );
}
