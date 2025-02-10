'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import EstimatePDF from './EstimatePDF';
import { CartItem } from '../context/CartContext';

interface PDFPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  totalAmount: number;
  customerDetails?: {
    name: string;
    mobile: string;
    address: string;
  };
}

export default function PDFPreviewModal({
  isOpen,
  onClose,
  items,
  totalAmount,
  customerDetails,
}: PDFPreviewModalProps) {
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
              <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-2xl font-semibold text-gray-900 mb-4">
                  Estimate Preview
                </Dialog.Title>

                <div className="mb-4">
                  <PDFDownloadLink
                    document={
                      <EstimatePDF
                        items={items}
                        totalAmount={totalAmount}
                        customerDetails={customerDetails}
                      />
                    }
                    fileName={`SRT-Estimate-${new Date().toISOString().split('T')[0]}.pdf`}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                  >
                    {({ blob, url, loading, error }) =>
                      loading ? 'Generating PDF...' : 'Download PDF'
                    }
                  </PDFDownloadLink>
                </div>

                <div className="h-[800px] w-full">
                  <PDFViewer width="100%" height="100%" className="border rounded-lg">
                    <EstimatePDF
                      items={items}
                      totalAmount={totalAmount}
                      customerDetails={customerDetails}
                    />
                  </PDFViewer>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
} 