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
    id = ''
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
        className="relative group cursor-pointer"
        onClick={() => setIsModalOpen(true)}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Background Pattern with gradient from all sides */}
        <div 
          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `
              radial-gradient(circle at top left, rgba(251, 191, 36, 0.85) 0%, transparent 70%),
              radial-gradient(circle at top right, rgba(251, 191, 36, 0.85) 0%, transparent 70%),
              radial-gradient(circle at bottom left, rgba(251, 191, 36, 0.85) 0%, transparent 70%),
              radial-gradient(circle at bottom right, rgba(251, 191, 36, 0.85) 0%, transparent 70%)
            `,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
          }}
        />

        {/* Card Content */}
        <div className="relative bg-black rounded-lg overflow-hidden border border-yellow-400/20 transition-all duration-300 group-hover:border-yellow-400 group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <div className="relative aspect-square overflow-hidden bg-gray-900">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            {discount > 0 && (
              <div className="absolute top-3 left-3 bg-yellow-400 text-black px-2 py-1 text-xs font-bold rounded-full">
                Save {discount}%
              </div>
            )}
          </div>

          <div className="p-4">
            <h3 className="text-lg font-bold text-yellow-400 mb-1">
              {name}
            </h3>
            <div className="flex items-baseline space-x-2 mb-2">
              <span className="text-xl font-bold text-yellow-400">₹{discountedPrice}</span>
              {discount > 0 && (
                <span className="text-sm text-gray-400 line-through">₹{price}</span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-600'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-1 text-sm text-gray-400">({rating})</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart();
                }}
                className="px-3 py-1 bg-yellow-400 text-black text-sm font-medium rounded-full hover:bg-yellow-500 transition-colors"
              >
                Add to Cart
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      <ProductModal
        product={fullProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={handleAddToCart}
      />
    </>
  );
}
