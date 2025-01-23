'use client';

import { useCart } from '../context/CartContext';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function CartPage() {
  const { cartItems, removeFromCart, getCartTotal } = useCart();

  const handleEvaluationSubmit = () => {
    // Here you would typically handle the evaluation submission
    console.log('Submitting evaluation for:', cartItems);
  };

  return (
    <main className="min-h-screen bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-yellow-400 mb-8">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl text-gray-400">Your cart is empty</h2>
          </div>
        ) : (
          <>
            <div className="bg-gray-900 rounded-lg overflow-hidden shadow-xl">
              <table className="w-full">
                <thead>
                  <tr className="bg-yellow-400/10">
                    <th className="px-6 py-3 text-left text-xs font-medium text-yellow-400 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-yellow-400 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-yellow-400 uppercase tracking-wider">Discount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-yellow-400 uppercase tracking-wider">Final Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-yellow-400 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {cartItems.map((item) => {
                    const discountedPrice = item.price - (item.price * item.discount) / 100;
                    return (
                      <tr key={item.id} className="hover:bg-gray-800/50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-16 w-16 relative flex-shrink-0">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover rounded-lg"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium">{item.name}</div>
                              <div className="text-sm text-gray-400">{item.category}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm">₹{item.price}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-yellow-400">{item.discount}%</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium">₹{discountedPrice}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-400 hover:text-red-500 text-sm font-medium"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="bg-yellow-400/10">
                    <td colSpan={3} className="px-6 py-4 text-right font-medium">Total:</td>
                    <td className="px-6 py-4 font-bold text-yellow-400">₹{getCartTotal()}</td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="mt-8 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEvaluationSubmit}
                className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-medium hover:bg-yellow-500 transition-colors"
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
