"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="font-sans">
      <div className="bg-white text-gray-600 text-xs py-1.5 px-4 text-center border-b">
        India&apos;s #1 Sivakasi Based Crackers Seller SHOP | Directly from Manufacturers | Factory Price | Assured Quality | Note : We do not sell/deliver to cities, where crackers are banned. Our License No: E/SS/TN
      </div>

      <div className="sticky top-0 z-50">
        <div className="bg-white shadow-md">
          <div className="py-2 border-b">
            <div className="container mx-auto px-4 flex items-center justify-between gap-4">
              <button 
                className="md:hidden flex-none text-black"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>

              <Link href="/" className="flex-none md:flex-shrink-0">
                <div className="text-xl md:text-2xl font-medium text-black">SRT CRACKERS</div>
              </Link>

              <div className="flex-grow max-w-2xl">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search over 400 crackers type"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="hidden md:flex items-center space-x-4">
                <button className="flex items-center text-black border border-black px-3 py-1.5 rounded-lg text-sm hover:bg-black hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Select City
                </button>

                <div className="flex items-center space-x-4">
                  <Link href="/cart" className="flex items-center hover:text-yellow-600 transition-colors">
                    <div className="relative">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="absolute -top-2 -right-2 bg-yellow-300 text-black text-xs rounded-full w-4 h-4 flex items-center justify-center">0</span>
                    </div>
                  </Link>
                  <Link href="/account" className="hover:text-yellow-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <nav className="hidden md:block bg-black text-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center">
              <div className="flex justify-center space-x-8">
                <Link href="/" className="py-2 text-sm hover:text-yellow-300 transition-colors">HOME</Link>
                <Link href="/about" className="py-2 text-sm hover:text-yellow-300 transition-colors">ABOUT US</Link>
                <Link href="/chit-fund" className="py-2 text-sm hover:text-yellow-300 transition-colors">CHIT FUND</Link>
                <Link href="/safety" className="py-2 text-sm hover:text-yellow-300 transition-colors">SAFETY TIPS</Link>
                <Link href="/contact" className="py-2 text-sm hover:text-yellow-300 transition-colors">CONTACT US</Link>
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
              <h2 className="text-lg font-bold">Menu</h2>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="space-y-4">
              <Link href="/" className="block py-2 hover:text-yellow-600 transition-colors">HOME</Link>
              <Link href="/about" className="block py-2 hover:text-yellow-600 transition-colors">ABOUT US</Link>
              <Link href="/products" className="block py-2 hover:text-yellow-600 transition-colors">SHOP BY PRODUCTS</Link>
              <Link href="/brands" className="block py-2 hover:text-yellow-600 transition-colors">SHOP BY BRANDS</Link>
              <Link href="/chit-fund" className="block py-2 hover:text-yellow-600 transition-colors">CHIT FUND</Link>
              <Link href="/safety" className="block py-2 hover:text-yellow-600 transition-colors">SAFETY TIPS</Link>
              <Link href="/contact" className="block py-2 hover:text-yellow-600 transition-colors">CONTACT US</Link>
              
              <button className="w-full flex items-center text-left py-2 hover:text-yellow-600 transition-colors">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                Select City
              </button>

              <Link href="/cart" className="flex items-center py-2 hover:text-yellow-600 transition-colors">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Cart
              </Link>
              <Link href="/account" className="flex items-center py-2 hover:text-yellow-600 transition-colors">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Account
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
