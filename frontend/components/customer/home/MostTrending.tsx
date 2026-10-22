'use client';

import React, { useState, useRef } from 'react';
import { ArrowRight, PackageOpen } from 'lucide-react';
import { ProductCard, ProductItem } from '@/components/customer/shared/product/ProductCard';
import { getImage } from '@/utils/imageLoader';

const TABS = [
  'NEW ARRIVALS',
  'UNSTITCHED',
  'LUXURY PRET',
  'BRIDAL WEAR',
  'FORMALS',
];

// As strictly requested in Part B3: every image in Most Trending uses only callout_unstitched_1784669045779.jpg
const MOST_TRENDING_IMAGE = getImage('mostTrending');

const STATIC_PRODUCTS: ProductItem[] = [
  {
    id: 'trending-1',
    title: 'Luxury Embroidered Lawn 3-Piece',
    brand: 'Sana Safinaz',
    price: 6490,
    originalPrice: 12500,
    currency: 'Rs.',
    image: MOST_TRENDING_IMAGE,
    alt: 'Sana Safinaz Luxury Embroidered Lawn 3-Piece Leftover Suit',
    badge: '48% OFF',
    category: 'UNSTITCHED',
    stitchingStatus: 'Unstitched',
    resellerName: 'Ayesha Luxury Leftovers',
    resellerRating: 4.9,
    discountPercentage: 48,
    reviewCount: 24,
  },
  {
    id: 'trending-2',
    title: 'Chiffon Bridal Formal Suit',
    brand: 'Maria B',
    price: 14500,
    originalPrice: 28000,
    currency: 'Rs.',
    image: MOST_TRENDING_IMAGE,
    alt: 'Maria B Chiffon Bridal Formal Suit Surplus Stock',
    badge: 'HOT',
    category: 'BRIDAL WEAR',
    stitchingStatus: 'Unstitched',
    resellerName: 'Ayesha Luxury Leftovers',
    resellerRating: 4.9,
    discountPercentage: 48,
    reviewCount: 18,
  },
  {
    id: 'trending-3',
    title: 'Printed Summer Lawn 2-Piece',
    brand: 'Khaadi',
    price: 3490,
    originalPrice: 5990,
    currency: 'Rs.',
    image: MOST_TRENDING_IMAGE,
    alt: 'Khaadi Printed Summer Lawn 2-Piece Clearance Suit',
    badge: 'BEST SELLER',
    category: 'UNSTITCHED',
    stitchingStatus: 'Unstitched',
    resellerName: 'Zainab Boutique Outlet',
    resellerRating: 4.8,
    discountPercentage: 42,
    reviewCount: 31,
  },
  {
    id: 'trending-4',
    title: 'Velvet Embroidered Ready to Wear Kurtis',
    brand: 'Bareeze',
    price: 8990,
    originalPrice: 16000,
    currency: 'Rs.',
    image: MOST_TRENDING_IMAGE,
    alt: 'Bareeze Velvet Embroidered Ready to Wear Kurtis',
    badge: 'LUXURY PRET',
    category: 'LUXURY PRET',
    stitchingStatus: 'Ready to Wear',
    resellerName: 'Ayesha Luxury Leftovers',
    resellerRating: 4.9,
    discountPercentage: 44,
    reviewCount: 14,
  },
  {
    id: 'trending-5',
    title: 'Formal Silk Jacquard 3-Piece',
    brand: 'Asim Jofa',
    price: 11200,
    originalPrice: 21000,
    currency: 'Rs.',
    image: MOST_TRENDING_IMAGE,
    alt: 'Asim Jofa Formal Silk Jacquard 3-Piece Designer Leftover',
    badge: 'LIMITED STOCK',
    category: 'FORMALS',
    stitchingStatus: 'Unstitched',
    resellerName: 'Zainab Boutique Outlet',
    resellerRating: 4.8,
    discountPercentage: 46,
    reviewCount: 19,
  },
];

export const MostTrending: React.FC = () => {
  const [activeTab, setActiveTab] = useState('NEW ARRIVALS');
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const getFilteredProducts = (tab: string): ProductItem[] => {
    const tabUpper = tab.toUpperCase().trim();
    if (tabUpper === 'NEW ARRIVALS') {
      return STATIC_PRODUCTS;
    }
    return STATIC_PRODUCTS.filter((p) => {
      const cat = p.category.toUpperCase();
      if (tabUpper === 'UNSTITCHED') return cat.includes('UNSTITCHED');
      if (tabUpper === 'LUXURY PRET') return cat.includes('PRET') || cat.includes('READY');
      if (tabUpper === 'BRIDAL WEAR') return cat.includes('BRIDAL');
      if (tabUpper === 'FORMALS') return cat.includes('FORMAL');
      return true;
    });
  };

  const handleToggleWishlist = (id: string) => {
    setWishlistIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const currentProducts = getFilteredProducts(activeTab);

  return (
    <section className="py-12 md:py-16 bg-white overflow-hidden">
      {/* Top Header & Category Tabs */}
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 mb-8">
        <div className="flex items-center justify-between gap-3 sm:gap-5 border-b border-stone-200 pb-5">
          {/* Left Side - Heading */}
          <div className="min-w-0 shrink">
            <h2 className="font-brand-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-stone-900 tracking-wide whitespace-nowrap">
              Most Trending Now
            </h2>
            <p className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm text-stone-500 mt-1 font-light tracking-wide truncate max-w-full">
              Curated Designer Leftovers
            </p>
          </div>

          {/* Right Side - Scrollable Tabs */}
          <div className="flex items-center justify-end gap-2 sm:gap-4 min-w-0 flex-1">
            <div className="flex items-center gap-0.5 sm:gap-1 md:gap-1.5 overflow-x-auto no-scrollbar py-1 min-w-0">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`shrink-0 whitespace-nowrap bg-transparent border-none text-[10px] sm:text-xs md:text-sm px-2 py-1.5 sm:px-2.5 sm:py-2 md:px-3 transition-all duration-300 cursor-pointer ${
                    activeTab === tab
                      ? 'font-extrabold text-stone-900 underline underline-offset-4 decoration-1 decoration-stone-300'
                      : 'font-medium text-stone-500 hover:text-stone-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Product Cards Row */}
      <div className="max-w-[1920px] mx-auto pl-6 sm:pl-10 lg:pl-[40px] pr-4">
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 pt-1 w-full"
        >
          {currentProducts.length === 0 ? (
            <div className="w-full flex flex-col items-center justify-center py-16 sm:py-20 text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-stone-100 flex items-center justify-center mb-5">
                <PackageOpen className="w-7 h-7 sm:w-8 sm:h-8 text-stone-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-stone-900 tracking-wide mb-2">
                Oops!
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 font-light tracking-wide max-w-[280px] sm:max-w-[360px] leading-relaxed">
                This product is not available in this category right now.
              </p>
            </div>
          ) : (
            <>
              {currentProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex-none w-[200px] sm:w-[250px] md:w-[280px] xl:w-[310px]"
                >
                  <ProductCard
                    product={product}
                    onToggleWishlist={handleToggleWishlist}
                    isWishlisted={wishlistIds.includes(product.id)}
                  />
                </div>
              ))}

              {/* View All Card (Static UI) */}
              <div className="flex-none w-[200px] sm:w-[250px] md:w-[280px] xl:w-[310px]">
                <div
                  className="group/viewall flex flex-col items-center justify-center h-full min-h-[350px] sm:min-h-[400px] text-white rounded-xl p-6 text-center cursor-pointer select-none"
                >
                  <div className="w-12 h-12 rounded-full bg-stone-800 group-hover/viewall:bg-amber-400 group-hover/viewall:text-stone-950 text-amber-400 flex items-center justify-center mb-4 transition-all duration-300 transform group-hover/viewall:scale-110">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold tracking-widest text-amber-400 uppercase mb-1">
                    EXPLORE COLLECTION
                  </span>
                  <h4 className="text-base sm:text-lg font-extrabold uppercase tracking-wider text-white mb-2">
                    VIEW ALL
                  </h4>
                  <p className="text-[11px] sm:text-xs text-stone-400 max-w-[180px] font-medium leading-relaxed">
                    Browse all available {activeTab.toLowerCase()} stock
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default MostTrending;
