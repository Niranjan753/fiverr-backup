'use client';

import Image from 'next/image';
import { useState } from 'react';
import ProductModal from './ProductModal';
import { Product } from '../types/product';
import { useCart } from '../context/CartContext';

type ProductCardProps = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  image_url?: string;
  discount?: number;
  rating?: number;
  features?: string[];
  specifications?: Record<string, string>;
  safetyInstructions?: string[];
  stock?: number;
  onClick?: () => void;
  className?: string;
};

export default function ProductCard(props: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);
  const { addToCart } = useCart();
  
  const { 
    name, 
    price, 
    discount = 0, 
    image,
    image_url, 
    rating = 4.5,
    description,
    features = [],
    specifications = {},
    safetyInstructions = [],
    stock = 0,
    category = '',
    id = '',
    onClick,
    className = '',
  } = props;

  const discountedPrice = price - (price * discount) / 100;
  const imageSource = !imageError 
    ? (image_url || image || '/placeholder.jpg')
    : '/placeholder.jpg';

  const cleanImageUrl = (url: string) => {
    try {
      if (url.startsWith('/') || !url.includes('supabase')) {
        return url;
      }
      const urlObj = new URL(url);
      const path = urlObj.pathname.split('/storage/v1/object/public/')[1];
      if (!path) return url;
      return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${path}`;
    } catch (e) {
      console.error('Error cleaning image URL:', e);
      return url;
    }
  };

  const finalImageUrl = cleanImageUrl(imageSource);

  const fullProduct: Product = {
    id,
    name,
    price,
    discount,
    image: finalImageUrl,
    image_url: finalImageUrl,
    rating,
    description,
    features,
    specifications,
    safetyInstructions,
    stock,
    category,
    isNew: false,
  };

  const handleAddToCart = () => {
    addToCart(fullProduct, quantity);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const incrementQuantity = () => {
    if (stock === 0 || quantity < stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <>
      <div 
        className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden ${className}`}
      >
        <div 
          className="relative aspect-square cursor-pointer bg-white p-6" 
          onClick={() => setIsModalOpen(true)}
        >
          <div className="relative w-full h-full group">
            <Image
              src={finalImageUrl}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
              onError={() => setImageError(true)}
              priority={false}
              quality={75}
            />
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[2.5rem] mb-2">
            {name}
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-semibold text-gray-900">
                {formatPrice(discountedPrice)}
              </span>
              {discount > 0 && (
                <>
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(price)}
                  </span>
                  <span className="text-sm font-medium text-green-600">
                    {discount}% off
                  </span>
                </>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center border border-gray-200 rounded">
                <button 
                  onClick={decrementQuantity}
                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                  type="button"
                >
                  -
                </button>
                <span className="w-10 text-center text-sm font-medium">{quantity}</span>
                <button 
                  onClick={incrementQuantity}
                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                  type="button"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#2874f0] text-white h-8 px-4 rounded font-medium text-sm hover:bg-blue-600 transition-colors"
                type="button"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ProductModal
          product={fullProduct}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
