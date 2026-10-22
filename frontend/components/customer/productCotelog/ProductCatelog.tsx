'use client';

import React, { useMemo } from 'react';
import { Filter } from 'lucide-react';
import ProductCard, { ProductItem } from '@/components/customer/shared/product/ProductCard';

export interface ProductCatelogProps {
  products: ProductItem[];
  gridCols?: 2 | 3 | 4;
  onQuickView?: (product: ProductItem) => void;
  onAddToCart?: (product: ProductItem) => void;
  onToggleWishlist?: (productId: string) => void;
  wishlistIds?: string[];
  onResetFilters?: () => void;
  emptyTitle?: string;
  emptyDescription?: string;
  getProductHref?: (product: ProductItem) => string;
}

export const ProductCatelog: React.FC<ProductCatelogProps> = ({
  products,
  gridCols = 4,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  wishlistIds = [],
  onResetFilters,
  emptyTitle = 'No products found in this category',
  emptyDescription = 'Try broadening your selection or clear brand / price filters to view all available factory leftover stock.',
  getProductHref,
}) => {
  const wishlistSet = useMemo(() => new Set(wishlistIds), [wishlistIds]);

  if (products.length === 0) {
    return (
      <div className="bg-white border border-stone-200 rounded-lg p-12 text-center my-8">
        <Filter className="w-10 h-10 text-stone-300 mx-auto mb-3" />
        <h3 className="text-base font-bold text-stone-900 uppercase tracking-wider">
          {emptyTitle}
        </h3>
        <p className="text-xs text-stone-500 mt-1 max-w-md mx-auto">
          {emptyDescription}
        </p>
        {onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-4 inline-block bg-stone-900 text-white text-xs font-bold px-5 py-2.5 rounded-xs uppercase tracking-wider hover:bg-black transition-colors cursor-pointer"
          >
            Reset All Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      className={`grid gap-4 sm:gap-6 ${
        gridCols === 2
          ? 'grid-cols-2'
          : gridCols === 3
            ? 'grid-cols-2 md:grid-cols-3'
            : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
      }`}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          href={getProductHref ? getProductHref(product) : undefined}
          onQuickView={onQuickView}
          onAddToCart={onAddToCart}
          onToggleWishlist={onToggleWishlist}
          isWishlisted={wishlistSet.has(product.id)}
        />
      ))}
    </div>
  );
};

export default ProductCatelog;
