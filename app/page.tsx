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
import FeaturedCategories from './components/FeaturedCategories';

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
      <FeaturedCategories />
      <WelcomeSection />
      <FeaturesSection />
      <ReviewsSection />
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
