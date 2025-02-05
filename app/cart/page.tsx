'use client';

import { useCart } from '../context/CartContext';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function CartPage() {
  const { cartItems, removeFromCart, getCartTotal } = useCart();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleEvaluationSubmit = () => {
    console.log('Submitting evaluation for:', cartItems);
  };

  return (
    <main className="min-h-screen bg-white text-red-600 py-8 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-red-600 mb-6 sm:mb-8">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <h2 className="text-xl sm:text-2xl text-gray-600">Your cart is empty</h2>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg overflow-hidden shadow-xl border border-red-100">
              {isMobile ? (
                <div className="divide-y divide-red-100">
                  {cartItems.map((item) => {
                    const discountedPrice = item.price - (item.price * item.discount) / 100;
                    return (
                      <div key={item.id} className="p-4">
                        <div className="flex items-center mb-4">
                          <div className="h-20 w-20 relative flex-shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover rounded-lg"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium">{item.name}</div>
                            <div className="text-xs text-gray-500">{item.category}</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>Price:</div>
                          <div>₹{item.price}</div>
                          <div>Discount:</div>
                          <div className="text-red-600">{item.discount}%</div>
                          <div>Final Price:</div>
                          <div className="font-medium">₹{discountedPrice}</div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="mt-4 text-red-600 hover:text-red-700 text-sm font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    );
                  })}
                  <div className="p-4 bg-red-50 flex justify-between items-center">
                    <span className="font-medium">Total:</span>
                    <span className="font-bold text-red-600">₹{getCartTotal()}</span>
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-red-50">
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">Product</th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">Price</th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">Discount</th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">Final Price</th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-red-100">
                      {cartItems.map((item) => {
                        const discountedPrice = item.price - (item.price * item.discount) / 100;
                        return (
                          <tr key={item.id} className="hover:bg-red-50">
                            <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-12 w-12 sm:h-16 sm:w-16 relative flex-shrink-0">
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover rounded-lg"
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium">{item.name}</div>
                                  <div className="text-xs text-gray-500">{item.category}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                              <div className="text-sm">₹{item.price}</div>
                            </td>
                            <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-red-600">{item.discount}%</div>
                            </td>
                            <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium">₹{discountedPrice}</div>
                            </td>
                            <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-600 hover:text-red-700 text-sm font-medium"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr className="bg-red-50">
                        <td colSpan={3} className="px-4 sm:px-6 py-4 text-right font-medium">Total:</td>
                        <td className="px-4 sm:px-6 py-4 font-bold text-red-600">₹{getCartTotal()}</td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}
            </div>

            <div className="mt-8 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEvaluationSubmit}
                className="bg-red-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Send for Evaluation
              </motion.button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
