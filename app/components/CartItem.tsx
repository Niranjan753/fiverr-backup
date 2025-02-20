'use client';

import Image from 'next/image';
import { Product } from '../types/product';

type CartItemProps = {
  product: Product;
  quantity: number;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
};

export default function CartItem({ product, quantity, onUpdateQuantity, onRemove }: CartItemProps) {
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      onUpdateQuantity(newQuantity);
    }
  };

  const discountedPrice = product.price - (product.price * (product.discount || 0)) / 100;
  const totalPrice = discountedPrice * quantity;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="flex items-center p-4 border-b border-gray-200">
      <div className="flex-shrink-0 w-24 h-24 relative rounded-md overflow-hidden">
        <Image
          src={product.image_url || '/placeholder.jpg'}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="ml-4 flex-1">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
            <p className="mt-1 text-sm text-gray-500">{product.category}</p>
          </div>
          <button
            onClick={onRemove}
            className="text-sm font-medium text-red-600 hover:text-red-500"
          >
            Remove
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center border rounded-md">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              className="px-3 py-1 border-r hover:bg-gray-100"
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="px-4 py-1">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="px-3 py-1 border-l hover:bg-gray-100"
            >
              +
            </button>
          </div>
          <div className="text-right">
            <p className="text-lg font-medium text-gray-900">
              {formatPrice(totalPrice)}
            </p>
            {product.discount && product.discount > 0 && (
              <p className="text-sm text-gray-500">
                <span className="line-through">{formatPrice(product.price * quantity)}</span>
                <span className="ml-2 text-green-600">{product.discount}% off</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}