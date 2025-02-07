'use client';

import { FaFire, FaShieldAlt, FaStar, FaCoins } from 'react-icons/fa';

const features = [
  {
    icon: <FaFire className="text-red-600" />,
    title: 'Premium Quality',
    description: 'Experience the pinnacle of cracker excellence with our innovative products.'
  },
  {
    icon: <FaShieldAlt className="text-red-600" />,
    title: 'Safety Assured',
    description: 'Enjoy worry-free celebrations with our meticulously crafted, secure crackers.'
  },
  {
    icon: <FaStar className="text-red-600" />,
    title: 'Customer Delight',
    description: 'Join our community of satisfied customers who keep coming back for more.'
  },
  {
    icon: <FaCoins className="text-red-600" />,
    title: 'Competitive Pricing',
    description: 'Get the best bang for your buck with our high-quality, affordable crackers.'
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-red-600 mb-16">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-xl border border-red-600 flex items-start"
            >
              <div className="text-4xl mr-6 mt-1">{feature.icon}</div>
              <div>
                <h3 className="text-2xl font-bold text-red-600 mb-2">{feature.title}</h3>
                <p className="text-gray-700 text-lg">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
