'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Image from 'next/image';
import { Product } from '../types/product';
import { motion } from 'framer-motion';

type ProductModalProps = {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: () => void;
};

export default function ProductModal({ product, isOpen, onClose, onAddToCart }: ProductModalProps) {
  const discountedPrice = product.price - (product.price * product.discount) / 100;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-60" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Image */}
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    {product.discount > 0 && (
                      <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 text-xs font-bold rounded-full">
                        Save {product.discount}%
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div>
                    <Dialog.Title as="h3" className="text-2xl font-bold text-gray-900 mb-2">
                      {product.name}
                    </Dialog.Title>

                    <div className="flex items-baseline space-x-2 mb-4">
                      <span className="text-2xl font-bold text-red-600">₹{discountedPrice}</span>
                      {product.discount > 0 && (
                        <span className="text-lg text-gray-400 line-through">₹{product.price}</span>
                      )}
                    </div>

                    <p className="text-gray-600 mb-4">{product.description}</p>

                    <div className="space-y-4">
                      {/* Features */}
                      {product.features !== null && product.features !== undefined && product.features.length > 0 && (
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">Features</h4>
                          <ul className="list-disc list-inside text-gray-600 space-y-1">
                            {product.features.map((feature, index) => (
                              <li key={index}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Specifications */}
                      {product.specifications !== null && product.specifications !== undefined && Object.keys(product.specifications).length > 0 && (
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">Specifications</h4>
                          <dl className="grid grid-cols-2 gap-2 text-sm">
                            {Object.entries(product.specifications).map(([key, value]) => (
                              <div key={key}>
                                <dt className="text-gray-500 font-medium">{key}</dt>
                                <dd className="text-gray-900">{value}</dd>
                              </div>
                            ))}
                          </dl>
                        </div>
                      )}

                      {/* Safety Instructions */}
                      {product.safetyInstructions !== null && product.safetyInstructions !== undefined && product.safetyInstructions.length > 0 && (
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">Safety Instructions</h4>
                          <ul className="list-disc list-inside text-gray-600 space-y-1">
                            {product.safetyInstructions.map((instruction, index) => (
                              <li key={index}>{instruction}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Buttons */}
                    <div className="mt-6 flex gap-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          onAddToCart();
                          onClose();
                        }}
                        className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
                      >
                        Add to Cart
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Close
                      </motion.button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
