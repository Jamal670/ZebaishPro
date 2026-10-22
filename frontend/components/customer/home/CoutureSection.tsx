'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Star, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';
import { getImage } from '@/utils/imageLoader';

interface StoreItem {
  id: string;
  name: string;
  city: string;
  rating: number;
  salesCount: number;
  activeSuits: number;
  responseTime: string;
  banner: string;
  alt: string;
  specialty: string;
}

const TOP_STORES: StoreItem[] = [
  {
    id: 'store-1',
    name: 'Ayesha Luxury Surplus',
    city: 'Lahore',
    rating: 4.9,
    salesCount: 890,
    activeSuits: 42,
    responseTime: '< 15 mins',
    banner: getImage('storeAyesha'),
    alt: 'Ayesha Luxury Surplus Store Showcase Lahore',
    specialty: 'Khaadi & Sapphire Surplus',
  },
  {
    id: 'store-2',
    name: 'Zainab Surplus Hub',
    city: 'Karachi',
    rating: 4.8,
    salesCount: 540,
    activeSuits: 28,
    responseTime: '< 30 mins',
    banner: getImage('storeZainab'),
    alt: 'Zainab Surplus Hub Store Showcase Karachi',
    specialty: 'Gul Ahmed & Bareeze',
  },
  {
    id: 'store-3',
    name: 'Royal Threads & Leftovers',
    city: 'Faisalabad',
    rating: 4.7,
    salesCount: 410,
    activeSuits: 19,
    responseTime: '< 1 hour',
    banner: getImage('storeRoyal'),
    alt: 'Royal Threads & Leftovers Store Showcase Faisalabad',
    specialty: 'Sana Safinaz Couture',
  },
  {
    id: 'store-4',
    name: 'Khaadi & Lawn Vault',
    city: 'Islamabad',
    rating: 4.9,
    salesCount: 1120,
    activeSuits: 56,
    responseTime: '< 10 mins',
    banner: getImage('storeVault'),
    alt: 'Khaadi & Lawn Vault Store Showcase Islamabad',
    specialty: 'Clearance Lawn Lots',
  },
];

export const CoutureSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-10 md:py-14 bg-white border-t border-stone-100 overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-6 sm:px-10 lg:px-[40px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Tall Feature Photo */}
          <div className="lg:col-span-4 relative min-h-[420px] lg:min-h-[500px] rounded-xl overflow-hidden bg-stone-900 group">
            <Image
              src={getImage('coutureShowroom')}
              alt="Top Stores Selling With Zebaish - Showroom Preview"
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
            <div className="absolute bottom-8 left-8 right-8 text-white pointer-events-none">
              <span className="text-[10px] uppercase font-extrabold tracking-[0.25em] text-amber-300 block mb-2">
                VERIFIED SELLER NETWORK
              </span>
              <h3 className="font-brand-serif text-3xl sm:text-4xl font-normal tracking-wide leading-tight">
                Top Stores Selling With Zebaish
              </h3>
              <p className="text-stone-300 text-xs mt-2 font-light line-clamp-2">
                Curated boutiques offering authentic Pakistani designer leftover rolls & clearance suits.
              </p>
            </div>
          </div>

          {/* Right Section: Header & Stores Carousel */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            {/* Header & Controls */}
            <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-6">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-amber-700 block mb-1">
                  FEATURED PARTNERS
                </span>
                <h2 className="font-brand-serif text-2xl sm:text-3xl md:text-4xl font-normal text-stone-900 tracking-wider uppercase">
                  TOP STORES
                </h2>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => scroll('left')}
                  aria-label="Scroll left"
                  className="p-2 border border-stone-200 text-stone-700 hover:text-black hover:border-stone-400 rounded-full transition-colors cursor-pointer bg-white"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => scroll('right')}
                  aria-label="Scroll right"
                  className="p-2 border border-stone-200 text-stone-700 hover:text-black hover:border-stone-400 rounded-full transition-colors cursor-pointer bg-white"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Store Cards Horizontal Scroll Carousel */}
            <div
              ref={scrollRef}
              className="flex gap-5 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 pt-1 w-full"
            >
              {TOP_STORES.map((store) => (
                <div
                  key={store.id}
                  className="flex-none w-[260px] sm:w-[280px] md:w-[310px] group cursor-pointer bg-white border border-stone-200 rounded-xl overflow-hidden flex flex-col justify-between transition-all hover:border-stone-400 hover:shadow-lg select-none"
                >
                  {/* Full Tall Showcase Image */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100">
                    <Image
                      src={store.banner}
                      alt={store.alt}
                      fill
                      sizes="(max-width: 640px) 260px, (max-width: 768px) 280px, 310px"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <span className="bg-stone-900/90 backdrop-blur-md text-amber-300 text-[10px] font-extrabold px-2.5 py-1 rounded-xs flex items-center space-x-1 shadow-sm">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>VERIFIED SELLER</span>
                      </span>

                      <span className="bg-white/95 text-stone-900 text-[11px] font-extrabold px-2.5 py-1 rounded-xs flex items-center space-x-1 shadow-sm">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span>{store.rating}</span>
                      </span>
                    </div>

                    {/* Bottom Gradient */}
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/75 via-black/30 to-transparent pointer-events-none" />

                    <div className="absolute bottom-3 left-3 right-3 text-white pointer-events-none">
                      <div className="flex items-center space-x-1.5 text-stone-300 text-[10px] uppercase font-medium tracking-wider mb-0.5">
                        <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                        <span>{store.city}</span>
                        <span>•</span>
                        <span>{store.responseTime}</span>
                      </div>
                      <h4 className="font-brand-serif text-lg font-medium text-white line-clamp-1 leading-snug drop-shadow-xs">
                        {store.name}
                      </h4>
                    </div>
                  </div>

                  {/* Card Footer Details */}
                  <div className="p-4 bg-white flex flex-col justify-between flex-1 space-y-3">
                    <p className="text-xs text-stone-600 line-clamp-1 font-light">
                      Specialty: <span className="text-stone-900 font-medium">{store.specialty}</span>
                    </p>

                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-xs">
                        <div>
                          <span className="text-[10px] text-stone-400 uppercase block font-semibold">
                            Total Sales
                          </span>
                          <span className="font-extrabold text-stone-900 text-xs">
                            {store.salesCount}+
                          </span>
                        </div>
                        <div className="h-6 w-[1px] bg-stone-200" />
                        <div>
                          <span className="text-[10px] text-stone-400 uppercase block font-semibold">
                            Available
                          </span>
                          <span className="font-extrabold text-stone-900 text-xs">
                            {store.activeSuits} Suits
                          </span>
                        </div>
                      </div>

                      <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center group-hover:bg-amber-600 transition-colors shadow-2xs">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoutureSection;
