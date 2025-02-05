'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function VideoHero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const slides = [
    { type: 'image', src: '/poster1.webp' },
    { type: 'image', src: '/poster2.webp' },
    { type: 'video', src: '/newsrtvideo.mp4' }
  ];

  useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Video autoplay failed:', error);
      });
    }
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  if (!isClient) {
    // Show a static image during SSR
    return (
      <div className="relative w-full h-[45vh] md:h-[350px] overflow-hidden">
        <Image
          src="/poster1.webp"
          layout="fill"
          objectFit="cover"
          alt="Loading..."
          priority
        />
      </div>
    );
  }

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
              priority={index === 0}
            />
          ) : (
            <video
              ref={videoRef}
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

      <div className="absolute inset-0 bg-black bg-opacity-40" />

      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={prevSlide}
          className="p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
