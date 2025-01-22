import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header>
      {/* Top Info Bar */}
      <div className="bg-white text-gray-600 text-xs py-1 px-4 text-center">
        India's #1 Sivakasi Based Crackers Seller SHOP | Directly from Manufacturers | Factory Price | Assured Quality | Note : We do not sell/deliver to cities, where crackers are banned. Our License No: E/SS/TN
      </div>

      {/* Main Header */}
      <div className="bg-white py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="text-2xl font-bold text-[#e31837]">SIVAKASI</div>
          </Link>

          {/* Search Bar */}
          <div className="flex-grow mx-8 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search over 400 crackers type"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#e31837]"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Select City Button */}
          <button className="flex items-center text-[#e31837] border border-[#e31837] px-4 py-2 rounded hover:bg-[#e31837] hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          <div className="flex items-center">
            {/* Category Menu */}
            <div className="relative group py-3 px-4 bg-gray-900 cursor-pointer hover:bg-gray-800 transition-colors duration-200">
              <div className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <span>Shop By Category</span>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex space-x-6 ml-6 py-3">
              <Link href="/all-crackers" className="hover:text-yellow-300">All Crackers</Link>
              <Link href="/day-time" className="hover:text-yellow-300">Day Time</Link>
              <Link href="/night-time" className="hover:text-yellow-300">Night Time</Link>
              <Link href="/kids-collection" className="hover:text-yellow-300">Kids Collection</Link>
              <Link href="/new-arrivals" className="hover:text-yellow-300">New Arrivals</Link>
              <Link href="/family-packs" className="hover:text-yellow-300">Family Packs</Link>
              <Link href="/gift-boxes" className="hover:text-yellow-300">Gift Boxes</Link>
              <Link href="/celebration" className="hover:text-yellow-300">Celebration</Link>
            </div>

            {/* Cart & Account */}
            <div className="ml-auto flex items-center space-x-4">
              <Link href="/cart" className="flex items-center hover:text-yellow-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="ml-1">0</span>
              </Link>
              <Link href="/account" className="hover:text-yellow-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
