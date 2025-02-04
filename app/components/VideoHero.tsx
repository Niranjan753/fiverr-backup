'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function VideoHero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { type: 'image', src: '/poster1.webp' },
    { type: 'image', src: '/poster2.webp' },
    { type: 'video', src: '/crack-2.mp4' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-[45vh] md:h-[350px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {slide.type === 'image' ? (
            <Image
              src={slide.src}
              layout="fill"
              objectFit="cover"
              alt={`Slide ${index + 1}`}
            />
          ) : (
            <video
              src={slide.src}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          )}
        </div>
      ))}
      
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              to bottom,
              transparent 0%,
              transparent 70%,
              rgba(0, 0, 0, 0.8) 90%,
              rgba(0, 0, 0, 1) 100%
            )
          `
        }}
      />

      <button 
        onClick={prevSlide} 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 p-2 rounded-full"
      >
        &#10094;
      </button>
      <button 
        onClick={nextSlide} 
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 p-2 rounded-full"
      >
        &#10095;
      </button>
    </div>
  );
}
