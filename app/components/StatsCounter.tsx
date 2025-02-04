'use client';

import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const stats = [
  { number: 20, suffix: '+', label: 'Years of Excellence' },
  { number: 100, suffix: '%', label: 'Customer Satisfaction' },
  { number: 500, suffix: '+', label: 'Premium Products' },
  { number: 10000, suffix: '+', label: 'Delighted Customers' },
];

export default function StatsCounter() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section className="relative py-32 bg-red-600 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="flex flex-col items-center bg-white p-6 rounded-xl shadow-2xl"
            >
              <div className="mb-4 w-32 h-32 bg-gradient-to-br from-red-600 to-white rounded-full flex items-center justify-center">
                <span className="text-3xl font-extrabold text-black">
                  {inView && (
                    <CountUp end={stat.number} duration={3} separator="," />
                  )}
                  {stat.suffix}
                </span>
              </div>
              <h3 className="text-xl font-bold text-red-600 text-center">
                {stat.label}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
