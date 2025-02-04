'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function VideoHero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { type: 'video', src: '/crack-2.mp4' },
    { type: 'image', src: '/sample-cracker.jpg' },
    { type: 'image', src: '/fireworks-display.jpg' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

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
          {slide.type === 'video' ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[160%] md:w-[110%] h-auto object-cover"
            >
              <source src={slide.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <Image
              src={slide.src}
              layout="fill"
              objectFit="cover"
              alt={`Slide ${index + 1}`}
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
