import React from 'react';
import { Metadata } from 'next';
import ProductCatelog from '@/components/customer/productCotelog/ProductCatelog';
import { STATIC_COLLECTION_PRODUCTS } from '@/app/collection/[slug]/collectionProducts';

export const metadata: Metadata = {
  title: 'All Products Catalog | ZEBAISH Official Store',
  description: 'Explore all factory surplus and luxury designer suits across Pakistan.',
};

export default function ProductCatelogPage() {
  return (
    <div className="bg-stone-50 min-h-screen text-stone-900 pt-16 sm:pt-20 md:pt-24 pb-20 sm:pb-28">
      <div className="bg-white border-b border-stone-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-brand-serif font-semibold text-stone-900 tracking-wider uppercase">
            All Products Catalog
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Browse our complete inventory of authenticated designer surplus suits
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <ProductCatelog products={STATIC_COLLECTION_PRODUCTS} gridCols={4} />
      </div>
    </div>
  );
}
