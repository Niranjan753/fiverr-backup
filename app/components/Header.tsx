"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import ProductListModal from './ProductListModal';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const [isProductListModalOpen, setIsProductListModalOpen] = useState(false);

  return (
    <header className="font-sans">
      <div className="bg-white text-red-600 text-xs py-1.5 px-4 text-center border-b border-gray-200 font-bold">
        India&apos;s #1 Sivakasi Based Crackers Seller SHOP | Directly from Manufacturers | Factory Price | Assured Quality | Note : We do not sell/deliver to cities, where crackers are banned. Our License No: E/SS/TN
      </div>

      <div className="sticky top-0 z-50">
        <div className="bg-white shadow-md">
          <div className="py-2 border-b border-gray-200">
            <div className="container mx-auto px-4 flex items-center justify-between gap-4">
              <button 
                className="md:hidden flex-none text-black"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>

              <Link href="/" className="flex-none md:flex-shrink-0 flex items-center">
                <Image src="/srt-text.png" alt="SRT CRACKERS" width={150} height={50} />
                <Image src="/srt-logo.png" alt="SRT CRACKERS" width={50} height={50} className="ml-2" />
              </Link>

              <div className="flex-grow max-w-2xl">
                <input type="text" placeholder="Search products..." className="w-full px-4 py-2 border border-black rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black" />
              </div>

              <div className="hidden md:flex items-center space-x-4">
                <button
                  onClick={() => setIsProductListModalOpen(true)}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Download Price List
                </button>

                <Link href="/cart" className="relative">
                  <FaShoppingCart className="h-6 w-6 text-gray-600 hover:text-gray-900" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                      {totalItems}
                    </span>
                  )}
                  </Link>

                <Link href="/login">
                  <FaUser className="h-6 w-6 text-gray-600 hover:text-gray-900" />
                  </Link>
              </div>
            </div>
          </div>
        </div>

        <nav className="hidden md:block bg-white text-black">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center">
              <div className="flex justify-center space-x-8">
                {[
                  { href: "/", label: "HOME" },
                  { href: "/about", label: "ABOUT US" },
                  { href: "/shop-by-products", label: "SHOP BY PRODUCTS" },
                  { href: "/shop-by-brands", label: "SHOP BY BRANDS" },
                  { href: "/chit-fund", label: "CHIT FUND" },
                  { href: "/safety", label: "SAFETY TIPS" },
                  { href: "/contact", label: "CONTACT US" }
                ].map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="py-2 text-sm relative group"
                  >
                    {/* {label} */}
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-red-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                    <span className="group-hover:text-red-600 transition-colors duration-300">
                      {label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div 
        className={`md:hidden fixed inset-0 z-50 ${isMobileMenuOpen ? 'visible' : 'invisible'}`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-50' : 'opacity-0'}`} />
        
        <div 
          className={`absolute top-0 left-0 w-64 h-full bg-white transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
          onClick={e => e.stopPropagation()}
        >
          <div className="p-4">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <Image src="/srt-text.png" alt="SRT CRACKERS" width={100} height={33} />
                <Image src="/srt-logo.png" alt="SRT CRACKERS" width={33} height={33} className="ml-2" />
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="space-y-4">
              <Link href="/" className="block py-2 text-black hover:text-yellow-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>HOME</Link>
              <Link href="/about" className="block py-2 text-black hover:text-yellow-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>ABOUT US</Link>
              <Link href="/shop-by-products" className="block py-2 text-black hover:text-yellow-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>SHOP BY PRODUCTS</Link>
              <Link href="/shop-by-brands" className="block py-2 text-black hover:text-yellow-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>SHOP BY BRANDS</Link>
              <Link href="/chit-fund" className="block py-2 text-black hover:text-yellow-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>CHIT FUND</Link>
              <Link href="/safety" className="block py-2 text-black hover:text-yellow-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>SAFETY TIPS</Link>
              <Link href="/contact" className="block py-2 text-black hover:text-yellow-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>CONTACT US</Link>
              
              <button className="w-full flex items-center text-left py-2 text-black hover:text-yellow-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                Select City
              </button>

              <Link href="/cart" className="flex items-center py-2 text-black hover:text-yellow-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                <div className="relative">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </div>
                Cart
              </Link>
              <Link href="/login" className="flex items-center py-2 text-black hover:text-yellow-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Account
              </Link>
            </nav>
          </div>
        </div>
      </div>

      <ProductListModal
        isOpen={isProductListModalOpen}
        onClose={() => setIsProductListModalOpen(false)}
      />
    </header>
  );
}
