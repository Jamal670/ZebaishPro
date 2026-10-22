'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { getImage } from '@/utils/imageLoader';

const SLIDES = [
  { id: 'slide-1', image: getImage('heroSlide1'), alt: 'Zebaish Luxury Collection - Exclusive Festive Wear' },
  { id: 'slide-2', image: getImage('heroSlide2'), alt: 'Nafasat Collection - Elegant Designer Pret' },
  { id: 'slide-3', image: getImage('heroSlide3'), alt: 'Riwayati Husn - Traditional Handcrafted Embroidery' },
  { id: 'slide-4', image: getImage('heroSlide4'), alt: 'Ronaq Festive Edit - Premium Silk and Chiffon' },
  { id: 'slide-5', image: getImage('heroSlide5'), alt: 'Classic Designer Leftovers - Unstitched Luxury Lawn' },
];

export const HeroCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches || isPaused) return;

    timerRef.current = setInterval(nextSlide, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide]);

  return (
    <section
      className="relative w-full overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      aria-label="Hero Carousel"
    >
      <div
        className="relative w-full aspect-[1376/768] overflow-hidden"
        style={{ aspectRatio: '1376 / 768' }}
      >
        {SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'z-10 opacity-100' : 'z-0 opacity-0 pointer-events-none'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              sizes="100vw"
              priority={index === 0}
              loading={index === 0 ? 'eager' : 'lazy'}
              className="object-cover"
            />
          </div>
        ))}

        {/* Pagination Indicators */}
        <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center gap-2 px-4 sm:bottom-6">
          {SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-0.5 transition-all duration-300 cursor-pointer ${
                index === currentIndex
                  ? 'w-8 bg-white sm:w-10'
                  : 'w-4 bg-white/40 hover:bg-white/70 sm:w-6'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
