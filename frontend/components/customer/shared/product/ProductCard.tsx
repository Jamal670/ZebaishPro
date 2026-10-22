'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, ShoppingBag, Heart, Star, Store } from 'lucide-react';
import { ProductItem } from '@/types';

export type { ProductItem };

export interface ProductCardProps {
  product: ProductItem;
  href?: string;
  onQuickView?: (product: ProductItem) => void;
  onAddToCart?: (product: ProductItem) => void;
  onToggleWishlist?: (productId: string) => void;
  isWishlisted?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = React.memo(({
  product,
  href,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false,
}) => {
  const surplusPrice = product.price;
  const retailPrice = product.originalPrice ?? product.price;
  const hasDiscount = Boolean(
    (product.discountPercentage && product.discountPercentage > 0) ||
    (retailPrice > surplusPrice)
  );

  const getCleanBadge = () => {
    if (hasDiscount) {
      const percentage = product.discountPercentage
        ? product.discountPercentage
        : retailPrice > 0
        ? Math.round(((retailPrice - surplusPrice) / retailPrice) * 100)
        : 0;
      return {
        label: `${percentage}% OFF`,
        isDiscount: true,
      };
    }

    if (product.badge) {
      return {
        label: product.badge,
        isDiscount: false,
      };
    }

    return null;
  };

  const badge = getCleanBadge();
  const ratingToDisplay = (product.resellerRating ?? product.rating ?? 4.9).toFixed(1);
  const reviewCount = product.reviewCount ?? 12;

  return (
    <div className="group/card relative flex flex-col h-full bg-white rounded-xl overflow-hidden border border-stone-100 hover:border-stone-300 hover:shadow-md transition-all duration-300">
      {/* Opt-in Stretched Navigation Link: Covers whole card at z-0, buttons sit above at z-10 */}
      {href && (
        <Link
          href={href}
          aria-label={product.title}
          className="absolute inset-0 z-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2 rounded-xl"
        />
      )}

      {/* Image Container */}
      <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden pointer-events-none">
        <Image
          src={product.image}
          alt={product.alt || product.title}
          fill
          sizes="(max-width: 640px) 200px, (max-width: 768px) 250px, (max-width: 1024px) 280px, 310px"
          className="object-cover object-top transition-transform duration-700 group-hover/card:scale-105"
        />

        {/* Badge */}
        {badge && (
          <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 z-10 pointer-events-none">
            <span
              className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-2xs ${
                badge.isDiscount
                  ? 'bg-red-600 text-white'
                  : 'bg-stone-900/90 text-white backdrop-blur-xs'
              }`}
            >
              {badge.label}
            </span>
          </div>
        )}

        {/* Wishlist Button (sibling to link, z-10, pointer-events-auto) */}
        <button
          type="button"
          onClick={() => onToggleWishlist?.(product.id)}
          aria-label="Toggle Wishlist"
          className="pointer-events-auto absolute top-2 right-2 sm:top-2.5 sm:right-2.5 z-10 p-1.5 sm:p-2 rounded-full bg-white/80 hover:bg-white text-stone-700 hover:text-red-600 shadow-2xs transition-all hover:scale-110 active:scale-95 backdrop-blur-xs cursor-pointer"
        >
          <Heart
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
              isWishlisted ? 'fill-red-600 text-red-600' : ''
            }`}
          />
        </button>

        {/* Desktop Hover Actions Overlay (sibling to link, z-10, pointer-events-auto) */}
        <div className="pointer-events-auto hidden md:flex absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 items-center justify-center space-x-2 z-10">
          <button
            type="button"
            onClick={() => onQuickView?.(product)}
            className="flex-1 py-1.5 bg-white/95 hover:bg-white text-stone-900 text-[11px] font-semibold uppercase tracking-wider rounded-xs flex items-center justify-center space-x-1 shadow-2xs transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>

          <button
            type="button"
            onClick={() => onAddToCart?.(product)}
            className="p-1.5 bg-stone-900 hover:bg-black text-white rounded-xs shadow-2xs transition-colors cursor-pointer"
            title="Add to Bag"
            aria-label="Add to Bag"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Quick Add Floating Icon (sibling to link, z-10, pointer-events-auto) */}
        <button
          type="button"
          onClick={() => onAddToCart?.(product)}
          className="pointer-events-auto md:hidden absolute bottom-2 right-2 z-10 p-2 rounded-full bg-stone-900/90 text-white shadow-md active:scale-95 transition-transform cursor-pointer"
          title="Add to Bag"
          aria-label="Add to Bag"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Product Meta Info (pointer-events-none so click bubbles to stretched Link) */}
      <div className="p-2.5 sm:p-3.5 flex flex-col justify-between flex-1 bg-white pointer-events-none">
        <div>
          <div className="flex items-center justify-between gap-1 mb-1">
            {product.brand && (
              <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-stone-900 uppercase truncate">
                {product.brand}
              </span>
            )}
            {product.stitchingStatus && (
              <span className="text-[9px] sm:text-[10px] font-medium text-stone-400 uppercase tracking-wide shrink-0">
                {product.stitchingStatus}
              </span>
            )}
          </div>

          <h3 className="text-xs sm:text-sm font-normal text-stone-800 line-clamp-1 sm:line-clamp-2 leading-snug">
            {product.title}
          </h3>
        </div>

        {/* Price & Seller */}
        <div className="mt-2 pt-2 border-t border-stone-100 flex flex-col space-y-1">
          <div className="flex items-baseline space-x-1.5">
            <p className="text-xs sm:text-sm font-bold text-stone-900 tracking-tight">
              {product.currency} {surplusPrice.toLocaleString()}
            </p>
            {hasDiscount && (
              <p className="text-[10px] sm:text-[11px] text-stone-400 font-normal line-through">
                {product.currency} {retailPrice.toLocaleString()}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-stone-400 pt-0.5">
            {product.resellerName ? (
              <div className="flex items-center space-x-1 truncate max-w-[120px] sm:max-w-[150px]">
                <Store className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-stone-400 shrink-0" />
                <span className="truncate font-normal text-stone-500">
                  {product.resellerName}
                </span>
              </div>
            ) : (
              <div />
            )}

            <div className="flex items-center space-x-0.5 text-amber-600 font-semibold text-[9px] sm:text-[10px] shrink-0 ml-auto">
              <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
              <span>{ratingToDisplay}</span>
              <span className="text-stone-400 font-normal text-[9px] sm:text-[10px] ml-0.5">
                ({reviewCount})
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';
export default ProductCard;
