'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Image from 'next/image';
import { Product } from '../types/product';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: () => void;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

export default function ProductModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
  quantity,
  onQuantityChange,
}: ProductModalProps) {
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
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <div className="grid grid-cols-2 gap-6">
                  <div className="relative h-80">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                    {product.isNew && (
                      <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        New
                      </div>
                    )}
                    {product.discount > 0 && (
                      <div className="absolute top-2 left-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {product.discount}% OFF
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <Dialog.Title as="h3" className="text-2xl font-semibold text-gray-900">
                      {product.name}
                    </Dialog.Title>

                    <div className="flex items-center space-x-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">{product.rating}</span>
                    </div>

                    <p className="text-gray-600">{product.description}</p>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-4">
                        {product.discount > 0 ? (
                          <div className="space-y-1">
                            <div className="text-2xl font-bold text-red-600">₹{discountedPrice.toFixed(2)}</div>
                            <div className="flex items-center space-x-2">
                              <span className="text-lg text-gray-500 line-through">₹{product.price.toFixed(2)}</span>
                              <span className="text-sm text-green-600">Save ₹{((product.price * product.discount) / 100).toFixed(2)}</span>
                            </div>
                          </div>
                        ) : (
                          <div className="text-2xl font-bold text-red-600">₹{product.price.toFixed(2)}</div>
                        )}
                      </div>

                      <div className="flex items-center space-x-4">
                        <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                          Quantity:
                        </label>
                        <div className="flex items-center">
                          <button
                            onClick={() => quantity > 1 && onQuantityChange(quantity - 1)}
                            className="px-2 py-1 border border-gray-300 rounded-l text-gray-600 hover:bg-gray-100"
                            disabled={quantity <= 1}
                          >
                            -
                          </button>
                          <input
                            type="number"
                            id="quantity"
                            min="1"
                            max="100"
                            value={quantity}
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              if (!isNaN(value) && value >= 1 && value <= 100) {
                                onQuantityChange(value);
                              }
                            }}
                            className="w-16 text-center border-y border-gray-300 py-1"
                          />
                          <button
                            onClick={() => quantity < 100 && onQuantityChange(quantity + 1)}
                            className="px-2 py-1 border border-gray-300 rounded-r text-gray-600 hover:bg-gray-100"
                            disabled={quantity >= 100}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {product.features && product.features.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Key Features:</h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                          {product.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="pt-4 flex space-x-4">
                      <button
                        onClick={onAddToCart}
                        className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors text-lg font-semibold flex items-center justify-center space-x-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                        </svg>
                        <span>Add to Cart</span>
                      </button>
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
