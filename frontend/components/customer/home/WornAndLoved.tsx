'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Heart, MessageCircle, Send, ShoppingBag } from 'lucide-react';
import { getImage } from '@/utils/imageLoader';

interface UGCItem {
  id: string;
  handle: string;
  initial: string;
  tag: string;
  image: string;
  alt: string;
  likes: number;
}

const WORN_AND_LOVED_ITEMS: UGCItem[] = [
  {
    id: 'ugc-1',
    handle: '@maheen_style',
    initial: 'M',
    tag: '#ZebaishStyle',
    image: getImage('wornAndLoved1'),
    alt: 'Customer style showcase featuring Sana Safinaz luxury lawn',
    likes: 420,
  },
  {
    id: 'ugc-2',
    handle: '@zara.looks',
    initial: 'Z',
    tag: '#LeftoverChic',
    image: getImage('wornAndLoved2'),
    alt: 'Customer style showcase wearing Bareeze velvet pret',
    likes: 310,
  },
  {
    id: 'ugc-3',
    handle: '@alina_glam',
    initial: 'A',
    tag: '#EidGlam',
    image: getImage('wornAndLoved3'),
    alt: 'Customer style showcase in Asim Jofa silk jacquard',
    likes: 580,
  },
  {
    id: 'ugc-4',
    handle: '@fatima_vogue',
    initial: 'F',
    tag: '#FestiveVibes',
    image: getImage('wornAndLoved4'),
    alt: 'Customer style showcase featuring organza lilac formals',
    likes: 640,
  },
  {
    id: 'ugc-5',
    handle: '@hira_couture',
    initial: 'H',
    tag: '#RoyalLeftovers',
    image: getImage('wornAndLoved5'),
    alt: 'Customer style showcase in Merjan bridal couture',
    likes: 720,
  },
  {
    id: 'ugc-6',
    handle: '@ayesha_trends',
    initial: 'A',
    tag: '#RawSilkPret',
    image: getImage('wornAndLoved6'),
    alt: 'Customer style showcase featuring raw silk maroon 3-piece',
    likes: 490,
  },
];

export const WornAndLoved: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 md:py-16 bg-[#f8f8f8] border-t border-stone-200/60 overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-6 sm:px-10 lg:px-[40px]">
        {/* Header */}
        <div className="relative flex items-center justify-center mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-stone-900 tracking-tight flex items-center space-x-2">
            <span>Worn & Loved</span>
            <span className="text-pink-500">❤️</span>
          </h2>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center space-x-4">
            <button
              type="button"
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="text-stone-800 hover:text-black transition-colors focus:outline-none p-1 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 stroke-[1.75]" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="text-stone-800 hover:text-black transition-colors focus:outline-none p-1 cursor-pointer"
            >
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 stroke-[1.75]" />
            </button>
          </div>
        </div>

        {/* Horizontal Influencer Cards */}
        <div
          ref={scrollRef}
          className="flex space-x-4 sm:space-x-5 md:space-x-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 pt-1 mx-0 px-0"
        >
          {WORN_AND_LOVED_ITEMS.map((item) => (
            <div
              key={item.id}
              className="flex-none w-[220px] sm:w-[250px] md:w-[270px] lg:w-[280px] bg-white rounded-2xl overflow-hidden shadow-xs border border-stone-200/60 flex flex-col justify-between"
            >
              {/* Card Header: Avatar Initial, Profile handle & Tag */}
              <div className="p-3.5 flex items-center space-x-3 bg-white">
                <div className="w-8 h-8 rounded-full bg-stone-200 shrink-0 flex items-center justify-center text-xs font-bold text-stone-600 border border-stone-100">
                  {item.initial}
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-xs font-bold text-stone-900 truncate tracking-tight">
                    {item.handle}
                  </span>
                  <span className="text-xs text-stone-400 font-normal leading-tight">
                    {item.tag}
                  </span>
                </div>
              </div>

              {/* Main Photo */}
              <div className="relative w-full aspect-[3/4.6] bg-stone-100 overflow-hidden group">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 220px, (max-width: 768px) 250px, (max-width: 1024px) 270px, 280px"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>

              {/* Card Footer Actions */}
              <div className="p-3.5 flex items-center justify-between bg-white border-t border-stone-100">
                <div className="flex items-center space-x-2.5">
                  <button
                    type="button"
                    aria-label="Like post"
                    className="hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                  </button>
                  <button
                    type="button"
                    aria-label="Comment"
                    className="text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 stroke-[1.5]" />
                  </button>
                  <button
                    type="button"
                    aria-label="Share"
                    className="text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4 stroke-[1.5]" />
                  </button>
                </div>

                <button
                  type="button"
                  className="inline-flex items-center space-x-1.5 text-xs font-medium text-stone-800 hover:text-black transition-colors cursor-pointer"
                >
                  <span>Shop Now</span>
                  <ShoppingBag className="w-4 h-4 text-stone-800 stroke-[1.5]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WornAndLoved;
