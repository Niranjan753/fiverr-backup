'use client';

import { useCart } from '../context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="mb-4">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
            <Link
              href="/shop-by-products"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h1 className="text-2xl font-semibold text-gray-900">Shopping Cart</h1>
                <p className="text-gray-600 mt-1">{totalItems} items</p>
              </div>

              <div className="divide-y divide-gray-200">
                {items.map((item) => {
                  const discountedPrice = item.price - (item.price * (item.discount || 0)) / 100;
                  
                  return (
                    <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-6">
                      {/* Product Image */}
                      <div className="relative w-full sm:w-32 h-32 flex-shrink-0">
                        <Image
                          src={item.image || '/placeholder.jpg'}
                          alt={item.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                          <p className="text-lg font-semibold text-gray-900">
                            ₹{(discountedPrice * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        
                        <p className="mt-1 text-sm text-gray-600 line-clamp-2">{item.description}</p>

                        {(item.discount || 0) > 0 && (
                          <p className="mt-1 text-sm text-green-600">
                            You save ₹{((item.price * (item.discount || 0)) / 100 * item.quantity).toFixed(2)}
                          </p>
                        )}

                        <div className="mt-4 flex items-center gap-4">
                          <select
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                            className="block w-20 rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-sm"
                          >
                            {[...Array(10)].map((_, i) => (
                              <option key={i + 1} value={i + 1}>
                                {i + 1}
                              </option>
                            ))}
                          </select>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-sm text-red-600 hover:text-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <p className="text-gray-600">Subtotal ({totalItems} items)</p>
                  <p className="text-gray-900">₹{totalPrice.toFixed(2)}</p>
                </div>
                
                <div className="flex justify-between">
                  <p className="text-gray-600">Delivery</p>
                  <p className="text-gray-900">Free</p>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <p className="text-lg font-semibold text-gray-900">Order Total</p>
                    <p className="text-lg font-semibold text-gray-900">₹{totalPrice.toFixed(2)}</p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors mt-6"
                >
                  Proceed to Checkout
                </motion.button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Free Delivery for orders above ₹500
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
