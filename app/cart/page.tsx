'use client';

import { useCart } from '../context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import PDFPreviewModal from '../components/PDFPreviewModal';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();
  const [isPDFModalOpen, setIsPDFModalOpen] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    mobile: '',
    address: ''
  });
  const [showCustomerForm, setShowCustomerForm] = useState(false);

  const handleProceedToCheckout = () => {
    setShowCustomerForm(true);
  };

  const handleCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowCustomerForm(false);
    setIsPDFModalOpen(true);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-lg text-gray-600 mb-8">Add some exciting products to your cart!</p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
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
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          <div className="lg:col-span-8">
            <div className="bg-white shadow-sm rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-900">Shopping Cart ({totalItems} items)</h2>
              </div>

              <ul role="list" className="divide-y divide-gray-200">
                {cart.map((item) => {
                  const discountedPrice = item.product.price - (item.product.price * (item.product.discount || 0)) / 100;
                  return (
                    <li key={item.product.id} className="p-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-24 h-24 relative rounded-md overflow-hidden">
                          <Image
                            src={item.product.image_url || '/placeholder.jpg'}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="ml-6 flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">{item.product.name}</h3>
                              <div className="mt-1 flex items-center">
                                <div className="flex text-yellow-400">
                                  {[...Array(5)].map((_, i) => (
                                    <svg
                                      key={i}
                                      className={`w-4 h-4 ${i < (item.product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  ))}
                                </div>
                                <span className="text-sm text-gray-600 ml-2">{item.product.rating}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-medium text-red-600">{formatPrice(discountedPrice)}</div>
                              {(item.product.discount || 0) > 0 && (
                                <div className="mt-1">
                                  <span className="text-sm text-gray-500 line-through mr-2">{formatPrice(item.product.price)}</span>
                                  <span className="text-sm text-green-600">
                                    You save {formatPrice((item.product.price * (item.product.discount || 0)) / 100 * item.quantity)}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <label htmlFor={`quantity-${item.product.id}`} className="text-sm font-medium text-gray-700">
                                Quantity:
                              </label>
                              <div className="flex items-center">
                                <button
                                  onClick={() => item.quantity > 1 && updateQuantity(item.product.id, item.quantity - 1)}
                                  className="px-2 py-1 border border-gray-300 rounded-l text-gray-600 hover:bg-gray-100"
                                  disabled={item.quantity <= 1}
                                >
                                  -
                                </button>
                                <input
                                  type="number"
                                  id={`quantity-${item.product.id}`}
                                  min="1"
                                  max="100"
                                  value={item.quantity}
                                  onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    if (!isNaN(value) && value >= 1 && value <= 100) {
                                      updateQuantity(item.product.id, value);
                                    }
                                  }}
                                  className="w-16 text-center border-y border-gray-300 py-1"
                                />
                                <button
                                  onClick={() => item.quantity < 100 && updateQuantity(item.product.id, item.quantity + 1)}
                                  className="px-2 py-1 border border-gray-300 rounded-r text-gray-600 hover:bg-gray-100"
                                  disabled={item.quantity >= 100}
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-sm font-medium text-red-600 hover:text-red-500"
                            >
                              Remove
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="mt-8 lg:mt-0 lg:col-span-4">
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              <div className="flow-root">
                <dl className="space-y-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-gray-600">Subtotal</dt>
                    <dd className="text-gray-900 font-medium">{formatPrice(totalPrice)}</dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="text-lg font-medium text-gray-900">Order total</dt>
                    <dd className="text-lg font-medium text-red-600">{formatPrice(totalPrice)}</dd>
                  </div>
                </dl>
              </div>

              <div className="mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleProceedToCheckout}
                  className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
                >
                  Proceed to Checkout
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Details Form Modal */}
      <Transition show={showCustomerForm} as={Fragment}>
        <Dialog onClose={() => setShowCustomerForm(false)} className="relative z-50">
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="mx-auto max-w-md rounded bg-white p-6">
              <Dialog.Title className="text-lg font-medium mb-4">Enter Your Details</Dialog.Title>
              <form onSubmit={handleCustomerSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={customerDetails.name}
                    onChange={(e) => setCustomerDetails(prev => ({ ...prev, name: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Mobile</label>
                  <input
                    type="tel"
                    value={customerDetails.mobile}
                    onChange={(e) => setCustomerDetails(prev => ({ ...prev, mobile: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <textarea
                    value={customerDetails.address}
                    onChange={(e) => setCustomerDetails(prev => ({ ...prev, address: e.target.value }))}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowCustomerForm(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                  >
                    Generate Estimate
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>

      {/* PDF Preview Modal */}
      <PDFPreviewModal
        isOpen={isPDFModalOpen}
        onClose={() => setIsPDFModalOpen(false)}
        items={cart}
        totalAmount={totalPrice}
        customerDetails={customerDetails}
      />
    </div>
  );
}
