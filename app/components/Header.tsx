import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="font-sans">
      {/* Top Info Bar */}
      <div className="bg-white text-gray-600 text-xs py-1.5 px-4 text-center border-b">
        India's #1 Sivakasi Based Crackers Seller SHOP | Directly from Manufacturers | Factory Price | Assured Quality | Note : We do not sell/deliver to cities, where crackers are banned. Our License No: E/SS/TN
      </div>

      {/* Main Header */}
      <div className="bg-white py-4">
        <div className="container mx-auto px-4 flex items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="text-2xl font-medium text-[#e31837]">SRT CRACKERS</div>
          </Link>

          {/* Search Bar */}
          <div className="flex-grow max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search over 400 crackers type"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#e31837]"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Select City Button */}
          <button className="flex items-center text-[#e31837] border border-[#e31837] px-4 py-2 rounded-lg text-sm hover:bg-[#e31837] hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Select City
          </button>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-[#e31837] text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Navigation Links */}
            <div className="flex-1 flex justify-center space-x-8">
              <Link href="/" className="py-3 text-sm hover:text-yellow-300 transition-colors">Home</Link>
              <Link href="/about" className="py-3 text-sm hover:text-yellow-300 transition-colors">About Us</Link>
              <Link href="/products" className="py-3 text-sm hover:text-yellow-300 transition-colors">Products</Link>
              <Link href="/safety" className="py-3 text-sm hover:text-yellow-300 transition-colors">Safety Tips</Link>
              <Link href="/contact" className="py-3 text-sm hover:text-yellow-300 transition-colors">Contact Us</Link>
              <Link href="/kids-special" className="py-3 text-sm hover:text-yellow-300 transition-colors border-b-2 border-transparent hover:border-yellow-300">Kids Special</Link>
              <Link href="/vanitha-series" className="py-3 text-sm hover:text-yellow-300 transition-colors border-b-2 border-transparent hover:border-yellow-300">Vanitha Series</Link>
            </div>

            {/* Cart & Account */}
            <div className="flex items-center space-x-6">
              <Link href="/cart" className="flex items-center hover:text-yellow-300 transition-colors">
                <div className="relative">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="absolute -top-2 -right-2 bg-yellow-300 text-[#e31837] text-xs rounded-full w-4 h-4 flex items-center justify-center">0</span>
                </div>
              </Link>
              <Link href="/account" className="hover:text-yellow-300 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
