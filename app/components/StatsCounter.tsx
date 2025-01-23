'use client';

import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const stats = [
  {
    number: 10,
    suffix: '+',
    label: 'Year Of Experience',
    color: 'bg-yellow-400',
    textColor: 'text-yellow-400',
  },
  {
    number: 100,
    suffix: '%',
    label: 'Satisfaction',
    color: 'bg-yellow-400',
    textColor: 'text-yellow-400',
  },
  {
    number: 250,
    suffix: '+',
    label: 'Products',
    color: 'bg-yellow-400',
    textColor: 'text-yellow-400',
  },
  {
    number: 1000,
    suffix: '+',
    label: 'Happy Customers',
    color: 'bg-yellow-400',
    textColor: 'text-yellow-400',
  },
];

export default function StatsCounter() {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <section className="relative py-20 overflow-hidden bg-black">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" 
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, yellow 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="relative">
          {/* Connecting Lines */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent transform -translate-y-1/2" />
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                className="relative flex flex-col items-center"
              >
                {/* Circle Background */}
                <div className={`relative w-32 h-32 ${stat.color} rounded-full flex items-center justify-center`}>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
                  <div className="text-center">
                    <div className="flex items-center justify-center text-black font-bold">
                      <span className="text-4xl">
                        {inView && (
                          <CountUp
                            end={stat.number}
                            duration={2.5}
                            separator=","
                          />
                        )}
                      </span>
                      <span className="text-2xl ml-1">{stat.suffix}</span>
                    </div>
                  </div>
                </div>

                {/* Label */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="mt-4 text-center"
                >
                  <h3 className="text-lg font-semibold text-white">
                    {stat.label}
                  </h3>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
