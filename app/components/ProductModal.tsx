'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Product } from '../types/product';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const discountedPrice = product.price - (product.price * (product.discount || 0)) / 100;

  return (
    <Transition appear show={true} as={Fragment}>
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
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative aspect-square">
                    <Image
                      src={product.image_url || '/placeholder.jpg'}
                      alt={product.name}
                      fill
                      className="object-contain"
                      quality={85}
                    />
                  </div>

                  <div>
                    <Dialog.Title as="h3" className="text-lg font-medium text-gray-900">
                      {product.name}
                    </Dialog.Title>

                    <div className="mt-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-medium text-gray-900">
                          {formatPrice(discountedPrice)}
                        </span>
                        {product.discount && product.discount > 0 && (
                          <>
                            <span className="text-sm text-gray-500 line-through">
                              {formatPrice(product.price)}
                            </span>
                            <span className="text-sm text-green-500">
                              {product.discount}% off
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm text-gray-600">{product.description}</p>
                    </div>

                    <div className="mt-6 flex gap-3">
                      <button
                        onClick={onClose}
                        className="flex-1 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50"
                      >
                        Cancel
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
