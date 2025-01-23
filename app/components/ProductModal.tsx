import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import Image from 'next/image';
import { Product } from '../types/product';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
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
          <div className="fixed inset-0 bg-black bg-opacity-75" />
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
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-gradient-to-br from-black to-gray-900 p-6 text-left align-middle shadow-xl transition-all">
                <div className="absolute top-4 right-4">
                  <button
                    onClick={onClose}
                    className="text-yellow-400 hover:text-yellow-300 focus:outline-none"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Product Image */}
                  <div className="relative aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {product.discount > 0 && (
                      <div className="absolute top-4 left-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                        Save {product.discount}%
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="space-y-6">
                    <div>
                      <Dialog.Title as="h3" className="text-2xl font-bold text-yellow-400">
                        {product.name}
                      </Dialog.Title>
                      <p className="mt-2 text-gray-300">{product.description}</p>
                    </div>

                    <div className="flex items-baseline space-x-3">
                      <span className="text-3xl font-bold text-yellow-400">₹{discountedPrice}</span>
                      {product.discount > 0 && (
                        <span className="text-lg text-gray-400 line-through">₹{product.price}</span>
                      )}
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-yellow-400 mb-2">Features</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-300">
                        {product.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-yellow-400 mb-2">Specifications</h4>
                      <dl className="space-y-2 text-gray-300">
                        {Object.entries(product.specifications).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <dt className="font-medium">{key}</dt>
                            <dd>{value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-yellow-400 mb-2">Safety Instructions</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-300">
                        {product.safetyInstructions.map((instruction, index) => (
                          <li key={index}>{instruction}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border border-yellow-400 rounded-lg">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="px-3 py-2 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-colors"
                        >
                          -
                        </button>
                        <span className="px-4 text-yellow-400">{quantity}</span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="px-3 py-2 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <button className="flex-1 bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
                        Add to Cart
                      </button>
                    </div>

                    <div className="text-sm text-gray-400">
                      {product.stock > 0 ? (
                        <p className="text-green-400">In Stock ({product.stock} available)</p>
                      ) : (
                        <p className="text-red-400">Out of Stock</p>
                      )}
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
