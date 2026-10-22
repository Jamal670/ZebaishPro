'use client';

import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, Grid3X3, Grid2X2, ArrowUpDown, X, Grid3x2 } from 'lucide-react';
import { ProductItem, FilterOptions, SortOption } from '@/types';
import { CollectionItem } from '@/utils/collections';
import ProductCatelog from '@/components/customer/productCotelog/ProductCatelog';
import FiltersDrawer from '@/components/customer/collection/FiltersDrawer';

export interface CollectionPageProps {
  collection: CollectionItem;
  initialProducts: ProductItem[];
}

export const CollectionPage: React.FC<CollectionPageProps> = ({
  collection,
  initialProducts = [],
}) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(4);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  const [filters, setFilters] = useState<FilterOptions>({
    brands: [],
    stitchingStatuses: [],
    pieceCounts: [],
    fabrics: [],
    colors: [],
    occasions: [],
    sizes: [],
    priceRange: [0, 100000],
    discountRanges: [],
    minResellerRating: 0,
    inStockOnly: false,
    categories: [],
  });

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const handleResetFilters = () => {
    setFilters({
      brands: [],
      stitchingStatuses: [],
      pieceCounts: [],
      fabrics: [],
      colors: [],
      occasions: [],
      sizes: [],
      priceRange: [0, 100000],
      discountRanges: [],
      minResellerRating: 0,
      inStockOnly: false,
      categories: [],
    });
  };

  const removeFilterChip = (key: keyof FilterOptions, val?: string) => {
    setFilters((prev) => {
      if (Array.isArray(prev[key]) && val) {
        const arr = (prev[key] as string[]).filter((item) => item !== val);
        return { ...prev, [key]: arr };
      }
      if (key === 'inStockOnly') return { ...prev, inStockOnly: false };
      if (key === 'minResellerRating') return { ...prev, minResellerRating: 0 };
      if (key === 'priceRange') return { ...prev, priceRange: [0, 100000] };
      return prev;
    });
  };

  // Client-side filtering and sorting over the supplied props (never mutating props)
  const displayProducts = useMemo(() => {
    let result = [...initialProducts];

    // Filter by Brand
    if (filters.brands && filters.brands.length > 0) {
      result = result.filter((p) =>
        filters.brands.some((b) => b.toLowerCase() === p.brand?.toLowerCase())
      );
    }

    // Filter by Stitching Status
    if (filters.stitchingStatuses && filters.stitchingStatuses.length > 0) {
      result = result.filter(
        (p) =>
          p.stitchingStatus &&
          filters.stitchingStatuses.some(
            (s) => s.toLowerCase() === p.stitchingStatus?.toLowerCase()
          )
      );
    }

    // Filter by Fabric
    if (filters.fabrics && filters.fabrics.length > 0) {
      result = result.filter(
        (p) =>
          p.fabric &&
          filters.fabrics.some((f) => f.toLowerCase() === p.fabric?.toLowerCase())
      );
    }

    // Filter by Price Range
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      result = result.filter((p) => p.price >= min && p.price <= max);
    }

    // Filter by Reseller Rating
    if (filters.minResellerRating > 0) {
      result = result.filter(
        (p) => (p.resellerRating ?? 0) >= filters.minResellerRating
      );
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.reverse();
        break;
      case 'best-discount':
        result.sort(
          (a, b) => (b.discountPercentage ?? 0) - (a.discountPercentage ?? 0)
        );
        break;
      case 'most-popular':
        result.sort((a, b) => (b.resellerRating ?? 0) - (a.resellerRating ?? 0));
        break;
      case 'featured':
      default:
        break;
    }

    return result;
  }, [initialProducts, filters, sortBy]);

  const activeFilterCount =
    (filters.brands?.length || 0) +
    (filters.stitchingStatuses?.length || 0) +
    (filters.pieceCounts?.length || 0) +
    (filters.fabrics?.length || 0) +
    (filters.colors?.length || 0) +
    (filters.occasions?.length || 0) +
    (filters.sizes?.length || 0) +
    (filters.discountRanges?.length || 0) +
    (filters.minResellerRating > 0 ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0) +
    (filters.priceRange && (filters.priceRange[1] < 100000 || filters.priceRange[0] > 0)
      ? 1
      : 0);

  return (
    <div className="bg-stone-50 min-h-screen text-stone-900 pt-16 sm:pt-20 md:pt-24 pb-20 sm:pb-28">
      {/* Top Banner / Breadcrumb */}
      <div className="bg-white border-b border-stone-200 py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
         
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-brand-serif font-semibold text-stone-900 tracking-wider uppercase">
                {collection.displayTitle || collection.title}
              </h1>
              <p className="text-xs text-stone-500 mt-1 max-w-2xl">
                Authentic factory surplus & end-of-season designer suits from verified resellers across Pakistan
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content & Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Toolbar */}
        <div className="bg-white border border-stone-200 rounded-lg p-2.5 sm:p-3.5 lg:p-4 mb-6 shadow-2xs">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* LEFT: Filter + Item Count */}
            <div className="flex items-center gap-1.5 sm:gap-3 lg:gap-4 min-w-0">
              <button
                type="button"
                onClick={() => setIsFiltersOpen(true)}
                className="flex items-center justify-center gap-1 sm:gap-1.5 lg:gap-2 w-[78px] h-[32px] sm:w-[100px] sm:h-[36px] lg:w-[115px] lg:h-[40px] bg-stone-900 hover:bg-black text-white rounded-xs text-[9px] sm:text-[10px] lg:text-xs font-bold uppercase tracking-wide sm:tracking-wider shadow-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <SlidersHorizontal className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 shrink-0" />
                <span>FILTERS</span>
                {activeFilterCount > 0 && (
                  <span className="ml-0.5 bg-red-600 text-white text-[8px] sm:text-[9px] lg:text-[10px] w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-4 lg:h-4 rounded-full flex items-center justify-center font-extrabold shrink-0">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Item Count */}
              <span className="hidden sm:inline text-[10px] sm:text-xs lg:text-sm text-stone-500 font-medium whitespace-nowrap">
                Showing <strong className="text-stone-900">{displayProducts.length}</strong> items
              </span>
            </div>

            {/* RIGHT: Grid Switcher + Sort */}
            <div className="flex items-center gap-1.5 sm:gap-3 lg:gap-4 shrink-0">
              {/* Grid Columns Switcher */}
              <div className="hidden md:flex items-center space-x-0.5 lg:space-x-1 border-r border-stone-200 pr-2 lg:pr-4">
                <button
                  type="button"
                  onClick={() => setGridCols(2)}
                  className={`p-1 lg:p-1.5 rounded-xs transition-colors cursor-pointer ${
                    gridCols === 2
                      ? 'bg-stone-900 text-white'
                      : 'text-stone-400 hover:text-stone-700'
                  }`}
                  title="2 Columns"
                >
                  <Grid2X2 className="w-3 h-3 lg:w-4 lg:h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setGridCols(3)}
                  className={`p-1 lg:p-1.5 rounded-xs transition-colors cursor-pointer ${
                    gridCols === 3
                      ? 'bg-stone-900 text-white'
                      : 'text-stone-400 hover:text-stone-700'
                  }`}
                  title="3 Columns"
                >
                  <Grid3x2 className="w-3 h-3 lg:w-4 lg:h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setGridCols(4)}
                  className={`p-1 lg:p-1.5 rounded-xs transition-colors cursor-pointer ${
                    gridCols === 4
                      ? 'bg-stone-900 text-white'
                      : 'text-stone-400 hover:text-stone-700'
                  }`}
                  title="4 Columns"
                >
                  <Grid3X3 className="w-3 h-3 lg:w-4 lg:h-4" />
                </button>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-1 sm:gap-1.5 lg:gap-2 shrink-0">
                <ArrowUpDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-stone-400 shrink-0" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-stone-50 border border-stone-200 text-stone-800 text-[9px] sm:text-[10px] lg:text-xs font-semibold rounded-xs w-[115px] h-[32px] sm:w-[150px] sm:h-[36px] lg:w-[175px] lg:h-[40px] px-1.5 sm:px-2 lg:px-2.5 focus:outline-none focus:border-stone-900 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="newest">Sort: Newest First</option>
                  <option value="price-low">Sort: Price (Low to High)</option>
                  <option value="price-high">Sort: Price (High to Low)</option>
                  <option value="best-discount">Sort: Best Discount</option>
                  <option value="most-popular">Sort: Reseller Rating</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-xs text-stone-500 font-semibold uppercase tracking-wider mr-1">
              Active Filters:
            </span>
            {filters.brands.map((b) => (
              <span
                key={b}
                className="inline-flex items-center space-x-1.5 bg-stone-900 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-2xs"
              >
                <span>Brand: {b}</span>
                <button
                  type="button"
                  onClick={() => removeFilterChip('brands', b)}
                  className="hover:text-stone-300 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {filters.stitchingStatuses.map((s) => (
              <span
                key={s}
                className="inline-flex items-center space-x-1.5 bg-stone-900 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full"
              >
                <span>{s}</span>
                <button
                  type="button"
                  onClick={() => removeFilterChip('stitchingStatuses', s)}
                  className="hover:text-stone-300 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {filters.fabrics.map((f) => (
              <span
                key={f}
                className="inline-flex items-center space-x-1.5 bg-stone-900 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full"
              >
                <span>Fabric: {f}</span>
                <button
                  type="button"
                  onClick={() => removeFilterChip('fabrics', f)}
                  className="hover:text-stone-300 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {filters.minResellerRating > 0 && (
              <span className="inline-flex items-center space-x-1.5 bg-stone-900 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                <span>Rating: {filters.minResellerRating}★ & above</span>
                <button
                  type="button"
                  onClick={() => removeFilterChip('minResellerRating')}
                  className="hover:text-stone-300 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs font-bold text-stone-600 underline hover:text-stone-900 ml-2 cursor-pointer"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Product Grid composed via ProductCatelog */}
        <ProductCatelog
          products={displayProducts}
          gridCols={gridCols}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onResetFilters={handleResetFilters}
          emptyTitle={`No products found in ${collection.title}`}
          emptyDescription="Try broadening your selection or clearing brand and price filters to view all available leftover stock."
          getProductHref={(product) => `/product/${product.id}`}
        />
      </div>

      {/* Filters Drawer */}
      <FiltersDrawer
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        filters={filters}
        onApplyFilters={(newFilters) => setFilters(newFilters)}
        onClearFilters={handleResetFilters}
        totalResultsCount={displayProducts.length}
      />
    </div>
  );
};

export default CollectionPage;
