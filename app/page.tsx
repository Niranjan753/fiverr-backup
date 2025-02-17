'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import VideoHero from "./components/VideoHero";
import Link from "next/link";
import Image from "next/image";
import WelcomeSection from './components/WelcomeSection';
import FeaturesSection from './components/FeaturesSection';
import StatsCounter from './components/StatsCounter';
import ReviewsSection from './components/ReviewsSection';

const categoryData = [/* ... same category data ... */];

export default function Home() {
  const [categories, setCategories] = useState(categoryData.map(cat => ({ ...cat, count: 0 })));
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchProductCounts() {
      // ... same fetch logic ...
    }
    fetchProductCounts();
  }, [supabase]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 via-indigo-50 to-blue-50">
      <VideoHero />
      {/* Products Section */}
      <section className="relative py-20">
        <div className="relative z-10 px-6 md:px-8 lg:px-12 max-w-[1400px] mx-auto">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
              Featured Categories
            </h2>
            <p className="text-xl text-gray-600">
              Explore our wide range of premium quality crackers
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link 
                href={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                key={category.id}
                className="group relative overflow-hidden rounded-2xl bg-white hover:transform hover:scale-[1.02] hover:rotate-[0.5deg] transition-all duration-500 shadow-lg hover:shadow-2xl border border-gray-100 hover:border-indigo-200"
              >
                <div className="aspect-[16/9] relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-600/10 before:to-indigo-600/10 before:opacity-0 before:transition-opacity group-hover:before:opacity-100 before:z-10">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  
                  {/* New Badge */}
                  {category.isNew && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-indigo-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg transform -rotate-2 group-hover:rotate-0 transition-transform duration-300">
                      NEW
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 bg-white relative before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/0 before:via-indigo-50/10 before:to-purple-50/20 before:opacity-0 group-hover:before:opacity-100 before:transition-opacity">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-300 transform group-hover:translate-x-1">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 transform group-hover:translate-x-1 transition-transform duration-300 delay-75">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between transform group-hover:translate-x-1 transition-transform duration-300 delay-100">
                    <span className="text-gray-500 text-sm font-medium">
                      {loading ? (
                        <span className="inline-flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Loading...
                        </span>
                      ) : (
                        `${category.count} Products`
                      )}
                    </span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 font-semibold flex items-center gap-1 opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      Explore
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* View All Button */}
          <div className="mt-16 text-center">
            <Link 
              href="/products" 
              className="inline-flex items-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-purple-300/50 transform hover:-translate-y-1"
            >
              View All Products
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      <ReviewsSection />
      <WelcomeSection />
      <FeaturesSection />

      {/* Featured Categories */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-white to-purple-50">
      </section>

      {/* Stats Counter */}
      <StatsCounter />
      <LegalNotice />
    </main>
  );
}

const LegalNotice = () => (
  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-l-4 border-purple-500 text-gray-700 p-6 shadow-inner">
    <p className="font-bold mb-3 text-gray-900">Important Legal Notice:</p>
    <p className="text-sm leading-relaxed">
      As per the 2018 Supreme Court order, online sales of firecrackers are not 
      permitted. At SRT Crackers, we value our customers and respect legal 
      jurisdiction. We kindly request you to add products to your cart and submit 
      your requirements through the enquiry button. Our team will contact you 
      within 24 hours to confirm your order via WhatsApp or phone call. Please 
      submit your enquiries and enjoy a safe Diwali with SRT Crackers. SRT Crackers 
      adheres to 100% legal and statutory compliances, and all our shops and 
      warehouses are maintained as per explosive acts. We dispatch orders 
      through registered and legal transport service providers, in line with 
      standard practices in Sivakasi.
    </p>
  </div>
);
