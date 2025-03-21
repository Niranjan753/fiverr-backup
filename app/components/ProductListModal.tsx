'use client';

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { getClientComponentClient } from '@/lib/supabase';
import ProductListPDF from './ProductListPDF';

const STATES = [
  'Tamil Nadu',
  'Kerala',
  'Karnataka',
  'Andhra Pradesh',
  'Telangana',
  'Maharashtra',
  // Add more states as needed
];

const TN_DISTRICTS = [
  'Chennai',
  'Coimbatore',
  'Madurai',
  'Salem',
  'Tiruchirappalli',
  'Tirunelveli',
  'Erode',
  'Vellore',
  'Thoothukudi',
  'Dindigul',
  // Add more districts as needed
];

// Make sure this matches the Product type in ProductListPDF
interface Product {
  id: string;  // Changed back to string to match PDF component
  name: string;
  price: number;
  category: string;
  description?: string;
  image_url?: string;
  stock_status?: string;
  created_at?: string;
  updated_at?: string;
}

interface ProductListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProductListModal = ({ isOpen, onClose }: ProductListModalProps) => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPDF, setShowPDF] = useState(false);
  // const [downloadCount, setDownloadCount] = useState(0);

  const supabase = getClientComponentClient();

  const fetchProducts = async () => {
    if (!selectedState) {
      setError('Please select a state');
      return;
    }

    if (!supabase) {
      setError('Unable to connect to the database');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const { data, error: supabaseError } = await supabase
        .from('products')
        .select('id, name, price, category, description, image_url, stock_status, created_at, updated_at')
        .order('category');

      if (supabaseError) throw supabaseError;

      if (data) {
        const typedProducts: Product[] = data.map(item => ({
          id: String(item.id), // Convert number to string
          name: String(item.name),
          price: Number(item.price),
          category: String(item.category),
          description: item.description ? String(item.description) : undefined,
          image_url: item.image_url ? String(item.image_url) : undefined,
          stock_status: item.stock_status ? String(item.stock_status) : undefined,
          created_at: item.created_at ? String(item.created_at) : undefined,
          updated_at: item.updated_at ? String(item.updated_at) : undefined
        }));
        setProducts(typedProducts);
        setShowPDF(true);
      }
    } catch (err) {
      setError('Failed to fetch products. Please try again.');
      console.error('Error fetching products:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleDownload = () => {
  //   setDownloadCount(downloadCount + 1);
  //   sendNotification();
  // };

  // const sendNotification = () => {
  //   console.log(`Sending notification for product list download`);
  // };

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
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 mb-4">
                  Download Product List
                </Dialog.Title>

                {!showPDF ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select State
                      </label>
                      <select
                        value={selectedState}
                        onChange={(e) => {
                          setSelectedState(e.target.value);
                          setSelectedDistrict('');
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      >
                        <option value="">Choose a state</option>
                        {STATES.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                    </div>

                    {selectedState === 'Tamil Nadu' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Select District
                        </label>
                        <select
                          value={selectedDistrict}
                          onChange={(e) => setSelectedDistrict(e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                          <option value="">Choose a district</option>
                          {TN_DISTRICTS.map((district) => (
                            <option key={district} value={district}>
                              {district}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <div className="mt-4 flex justify-end space-x-3">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                        onClick={onClose}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                        onClick={fetchProducts}
                        disabled={isLoading}
                      >
                        {isLoading ? 'Loading...' : 'Generate PDF'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-gray-900">Product List Preview</h3>
                      <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                      >
                        <span className="sr-only">Close</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="h-[600px] w-full">
                      <PDFViewer width="100%" height="100%">
                        <ProductListPDF
                          products={products}
                          state={selectedState}
                          district={selectedDistrict}
                        />
                      </PDFViewer>
                    </div>

                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                        onClick={() => setShowPDF(false)}
                      >
                        Back
                      </button>
                      <PDFDownloadLink
                        document={
                          <ProductListPDF
                            products={products}
                            state={selectedState}
                            district={selectedDistrict}
                          />
                        }
                        fileName={`product-list-${selectedState}${
                          selectedDistrict ? `-${selectedDistrict}` : ''
                        }.pdf`}
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                        // onClick={handleDownload}
                      >
                        {({ loading }) => (loading ? 'Loading...' : 'Download PDF')}
                      </PDFDownloadLink>
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ProductListModal; 