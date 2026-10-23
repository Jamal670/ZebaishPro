'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Star,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Filter,
} from 'lucide-react';
import { ProductItem, Seller } from '@/types';
import { getImage } from '@/utils/imageLoader';
import { deriveSellerRating } from '@/utils/products';
import ProductCard from '@/components/customer/shared/product/ProductCard';
import { FilterDrawer, StoreFilters } from './filterDrawer';

export const PAGE_SIZE = 8;

export interface SellerStoreProps {
  seller: Seller;
  products: ProductItem[];
  onQuickView?: (product: ProductItem) => void;
  onAddToCart?: (product: ProductItem) => void;
  onToggleWishlist?: (productId: string) => void;
  wishlistIds?: string[];
  onSelectProduct?: (product: ProductItem) => void;
  onNavigateHome?: () => void;
}

/**
 * Computes pagination page numbers with ellipsis when total pages > 7.
 */
export function getPaginationPages(currentPage: number, totalPages: number): (number | '...')[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, '...', totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
}

export const SellerStore: React.FC<SellerStoreProps> = ({
  seller,
  products = [],
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  wishlistIds: controlledWishlistIds,
  onNavigateHome,
}) => {
  // 1. Ref for top of products grid (used on page change scroll)
  const gridTopRef = useRef<HTMLDivElement | null>(null);
  const filterButtonRef = useRef<HTMLButtonElement | null>(null);

  // 2. Local State: category chip, applied filters, pagination, wishlist fallback
  const [typeChip, setTypeChip] = useState<string>('All');
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [localWishlist, setLocalWishlist] = useState<string[]>([]);

  const [appliedFilters, setAppliedFilters] = useState<StoreFilters>({
    sort: null,
    department: null,
    subcategory: null,
  });

  const effectiveWishlistIds = controlledWishlistIds ?? localWishlist;

  const handleToggleWishlist = (productId: string) => {
    if (onToggleWishlist) {
      onToggleWishlist(productId);
    } else {
      setLocalWishlist((prev) =>
        prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
      );
    }
  };

  // 3. Derived Seller Rating & Review Count (weighted mean across seller products)
  const { rating: sellerRating, reviewCount: sellerReviewCount, formattedText: formattedRatingText } =
    useMemo(() => deriveSellerRating(products), [products]);

  const hasProductsOverall = products.length > 0;

  // 4. Derive distinct category chips for this seller's products: "All" + trimmed/deduped categories
  const categoryChips = useMemo(() => {
    if (!hasProductsOverall) return ['All'];

    const seen = new Set<string>();
    const chips: string[] = ['All'];

    for (const p of products) {
      const raw = typeof p.category === 'string' ? p.category.trim() : '';
      if (raw) {
        const lower = raw.toLowerCase();
        if (!seen.has(lower)) {
          seen.add(lower);
          chips.push(raw);
        }
      }
    }

    return chips;
  }, [products, hasProductsOverall]);

  // 5. Derive subcategory options for the active category chip
  const subcategoryOptions = useMemo(() => {
    if (typeChip.toLowerCase() === 'all') return [];

    const seen = new Set<string>();
    const list: string[] = [];

    for (const p of products) {
      const pCat = typeof p.category === 'string' ? p.category.trim().toLowerCase() : '';
      if (pCat === typeChip.toLowerCase()) {
        const sub = typeof p.subcategory === 'string' ? p.subcategory.trim() : '';
        if (sub) {
          const lower = sub.toLowerCase();
          if (!seen.has(lower)) {
            seen.add(lower);
            list.push(sub);
          }
        }
      }
    }

    list.sort();
    return list.map((item) => ({ value: item, label: item }));
  }, [products, typeChip]);

  // 6. Handle category chip click (resets page and subcategory filter)
  const handleSelectCategory = (chip: string) => {
    if (chip.toLowerCase() === typeChip.toLowerCase()) return;
    setTypeChip(chip);
    setAppliedFilters((prev) => ({ ...prev, subcategory: null }));
    setCurrentPage(1);
  };

  // 7. Filter & Sort across whole product set first (never mutating original catalog)
  const filteredAndSortedProducts = useMemo(() => {
    let list = [...products];

    // Category chip filter
    if (typeChip.toLowerCase() !== 'all') {
      list = list.filter(
        (p) => typeof p.category === 'string' && p.category.trim().toLowerCase() === typeChip.toLowerCase()
      );
    }

    // Subcategory filter from drawer
    if (appliedFilters.subcategory) {
      list = list.filter(
        (p) =>
          typeof p.subcategory === 'string' &&
          p.subcategory.trim().toLowerCase() === appliedFilters.subcategory!.toLowerCase()
      );
    }

    // Department filter (applies only if products actually contain that field)
    if (appliedFilters.department) {
      const hasDeptField = products.some(
        (p: any) => p.department !== undefined && p.department !== null && p.department !== ''
      );
      if (hasDeptField) {
        list = list.filter(
          (p: any) =>
            typeof p.department === 'string' &&
            p.department.trim().toLowerCase() === appliedFilters.department!.toLowerCase()
        );
      }
    }

    // Sort order (with product id as tiebreaker)
    if (appliedFilters.sort === 'asc') {
      list.sort((a, b) => Number(a.price) - Number(b.price) || a.id.localeCompare(b.id));
    } else if (appliedFilters.sort === 'desc') {
      list.sort((a, b) => Number(b.price) - Number(a.price) || a.id.localeCompare(b.id));
    }

    return list;
  }, [products, typeChip, appliedFilters]);

  // 8. Pagination calculations & clamping
  const totalPages = Math.ceil(filteredAndSortedProducts.length / PAGE_SIZE);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const paginatedProducts = useMemo(() => {
    const from = (currentPage - 1) * PAGE_SIZE;
    return filteredAndSortedProducts.slice(from, from + PAGE_SIZE);
  }, [filteredAndSortedProducts, currentPage]);

  const paginationPages = useMemo(() => {
    return getPaginationPages(currentPage, totalPages);
  }, [currentPage, totalPages]);

  // Page change handler with accessible scroll to grid top
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);

    if (gridTopRef.current && typeof window !== 'undefined') {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      gridTopRef.current.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    }
  };

  // Handler: Clear all filters
  const handleClearAllFilters = () => {
    setTypeChip('All');
    setAppliedFilters({ sort: null, department: null, subcategory: null });
    setCurrentPage(1);
  };

  // Handler: Drawer Apply
  const handleApplyFilters = (nextFilters: StoreFilters) => {
    setAppliedFilters(nextFilters);
    setCurrentPage(1);
  };

  // Images resolved strictly via imageLoader
  const avatarSrc = getImage(seller.avatar);
  const bannerSrc = seller.banner ? getImage(seller.banner) : getImage('coutureShowroom');

  return (
    <div className="bg-stone-50 min-h-screen text-stone-900 pb-20">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-stone-200 py-3 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center space-x-2 text-xs font-medium text-stone-500">
          {onNavigateHome ? (
            <button
              type="button"
              onClick={onNavigateHome}
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Home
            </button>
          ) : (
            <Link href="/" className="hover:text-stone-900 transition-colors">
              Home
            </Link>
          )}
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span>Reseller Stores</span>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-stone-900 font-semibold truncate">{seller.name}</span>
        </div>
      </div>

      {/* Profile Header Hero Block */}
      <div className="relative bg-stone-900 text-white overflow-hidden">
        {/* Banner Image with overlay */}
        <div className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none">
          <Image
            src={bannerSrc}
            alt={seller.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
          {/* ================= MOBILE LAYOUT ================= */}
          <div className="md:hidden">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="relative w-20 h-20 rounded-full border-2 border-white overflow-hidden bg-stone-800 shrink-0 shadow-xl">
                <Image
                  src={avatarSrc}
                  alt={seller.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>

              {/* Verified Badge + Store Name */}
              <div className="min-w-0 flex flex-col items-start gap-1.5">
                <span className="bg-amber-400 text-stone-950 text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-xs">
                  VERIFIED SELLER
                </span>

                <h1 className="text-xl sm:text-2xl font-brand-serif font-normal tracking-wide truncate max-w-full">
                  {seller.name}
                </h1>
              </div>
            </div>

            {/* Description */}
            <p className="mt-3 text-xs text-stone-300 leading-relaxed">
              {seller.description ||
                'Authentic 100% original designer leftover suits directly sourced from factory overstocks.'}
            </p>

            {/* Mobile Stats Row */}
            <div className="mt-4 -mx-4 px-4 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-5 w-max whitespace-nowrap text-[10px]">
                {/* Derived Rating */}
                <div className="flex items-center gap-1 text-amber-400 font-bold shrink-0">
                  <Star className="w-3.5 h-3.5 fill-amber-400 shrink-0" />
                  <span>{formattedRatingText}</span>
                </div>

                {/* Member Since */}
                <div className="flex items-center gap-1 text-stone-300 shrink-0">
                  <Calendar className="w-3 h-3 text-stone-400 shrink-0" />
                  <span>Member Since: {seller.joinedAt || 'Recently'}</span>
                </div>

                {/* Total Sales */}
                <div className="flex items-center gap-1 text-stone-300 font-semibold shrink-0">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>{seller.totalSales || 0}+ Suits Sold</span>
                </div>
              </div>
            </div>
          </div>

          {/* ================= TABLET + DESKTOP LAYOUT ================= */}
          <div className="hidden md:flex flex-row items-center gap-6">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white overflow-hidden bg-stone-800 shrink-0 shadow-xl">
              <Image
                src={avatarSrc}
                alt={seller.name}
                fill
                sizes="112px"
                className="object-cover"
              />
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-amber-400 text-stone-950 text-2xs font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-xs">
                  VERIFIED RESELLER
                </span>
                {seller.location && (
                  <span className="text-stone-300 text-xs font-medium">
                    • {seller.location}
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-brand-serif font-normal tracking-wide">
                {seller.name}
              </h1>

              <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
                {seller.description}
              </p>

              {/* Badges Row */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs sm:text-sm">
                <div className="flex items-center space-x-1 text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{formattedRatingText}</span>
                </div>

                <div className="flex items-center space-x-1 text-stone-300">
                  <Calendar className="w-3.5 h-3.5 text-stone-400" />
                  <span>Member Since: {seller.joinedAt}</span>
                </div>

                <div className="flex items-center space-x-1 text-stone-300 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{seller.totalSales || 0}+ Suits Sold</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div ref={gridTopRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {!hasProductsOverall ? (
          /* Pure-UI Empty State: Seller has zero products overall (no chips, no filter button) */
          <div className="py-16 text-center bg-white rounded-lg border border-stone-200 p-8 max-w-md mx-auto space-y-2 shadow-2xs">
            <p className="text-sm font-bold text-stone-800">No products yet</p>
            <p className="text-xs text-stone-500">
              This reseller currently has no active surplus listings available.
            </p>
          </div>
        ) : (
          /* Ready State: Category chips row + Filter button + Products grid */
          <>
            {/* Category Chip Row + Filter Button */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex-1 min-w-0 overflow-x-auto no-scrollbar">
                <div className="flex w-max gap-2 py-1">
                  {categoryChips.map((chip) => {
                    const isSelected = typeChip.toLowerCase() === chip.toLowerCase();
                    return (
                      <button
                        key={chip}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => handleSelectCategory(chip)}
                        className={`h-10 px-4 rounded-[10px] text-xs sm:text-sm font-semibold shrink-0 transition-colors border cursor-pointer ${
                          isSelected
                            ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                            : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400 hover:text-stone-900'
                        }`}
                      >
                        {chip}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Fixed Filter Button */}
              <button
                type="button"
                ref={filterButtonRef}
                onClick={() => setIsFilterOpen(true)}
                className="shrink-0 h-10 w-10 rounded-[10px] border border-stone-200 bg-white text-stone-700 hover:text-stone-900 hover:border-stone-400 flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
                aria-label="Open filters"
                aria-haspopup="dialog"
                aria-expanded={isFilterOpen}
              >
                <Filter className="w-4 h-4" />
              </button>
            </div>

            {/* Products Area: Grid or Filter-Empty State */}
            {filteredAndSortedProducts.length === 0 ? (
              /* Pure-UI Empty State: Filters match zero products */
              <div className="py-16 text-center bg-white rounded-lg border border-stone-200 p-8 max-w-md mx-auto space-y-4 shadow-2xs">
                <p className="text-sm font-bold text-stone-800">No products match your filters</p>
                <p className="text-xs text-stone-500">
                  Try adjusting your filters or category selection.
                </p>
                <button
                  type="button"
                  onClick={handleClearAllFilters}
                  className="px-4 py-2 bg-stone-900 text-white text-xs font-bold uppercase tracking-wider rounded-xs hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              /* Product Grid + Pagination */
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {paginatedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onQuickView={onQuickView}
                      onAddToCart={onAddToCart}
                      onToggleWishlist={handleToggleWishlist}
                      isWishlisted={effectiveWishlistIds.includes(product.id)}
                    />
                  ))}
                </div>

                {/* Pagination Controls (hidden when totalPages <= 1) */}
                {totalPages > 1 && (
                  <nav
                    aria-label="Pagination"
                    className="mt-12 flex items-center justify-center gap-1.5 sm:gap-2"
                  >
                    {/* Previous Button */}
                    <button
                      type="button"
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                      className="p-2 sm:px-3 sm:py-2 rounded-[8px] border border-stone-200 bg-white text-stone-700 hover:text-stone-900 hover:border-stone-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-xs font-semibold flex items-center gap-1 cursor-pointer"
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span className="hidden sm:inline">Previous</span>
                    </button>

                    {/* Page Numbers with Ellipsis */}
                    {paginationPages.map((p, idx) => {
                      if (p === '...') {
                        return (
                          <span
                            key={`ellipsis-${idx}`}
                            className="px-2 text-stone-400 select-none text-xs"
                          >
                            ...
                          </span>
                        );
                      }
                      const isCurrent = p === currentPage;
                      return (
                        <button
                          key={p}
                          type="button"
                          aria-current={isCurrent ? 'page' : undefined}
                          onClick={() => handlePageChange(p as number)}
                          className={`h-9 w-9 sm:h-10 sm:w-10 rounded-[8px] text-xs font-bold transition-colors border cursor-pointer ${
                            isCurrent
                              ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                              : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400 hover:text-stone-900'
                          }`}
                        >
                          {p}
                        </button>
                      );
                    })}

                    {/* Next Button */}
                    <button
                      type="button"
                      disabled={currentPage === totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                      className="p-2 sm:px-3 sm:py-2 rounded-[8px] border border-stone-200 bg-white text-stone-700 hover:text-stone-900 hover:border-stone-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-xs font-semibold flex items-center gap-1 cursor-pointer"
                      aria-label="Next page"
                    >
                      <span className="hidden sm:inline">Next</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </nav>
                )}
              </>
            )}
          </>
        )}
      </div>

      {/* Extracted Reusable Filter Drawer Component */}
      <FilterDrawer
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        value={appliedFilters}
        onApply={handleApplyFilters}
        subcategoryOptions={subcategoryOptions}
      />
    </div>
  );
};

export default SellerStore;
