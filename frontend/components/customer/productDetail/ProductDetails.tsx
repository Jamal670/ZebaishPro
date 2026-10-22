'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import {
  Heart,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
  Plus,
  Minus,
  Maximize2,
  Star,
  Store,
  ExternalLink,
  X,
} from 'lucide-react';
import { getImage, ImageKey } from '@/utils/imageLoader';
import { resolveSwatchColor } from '@/utils/colorUtils';
import { formatPrice, computeDiscountPercentage } from '@/utils/products';
import { Product, Review, ProductColor, ProductSize } from '@/types';

export interface ProductDetailsProps {
  product: Product;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  // 1. Image Gallery State
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  // Gallery image URLs resolved only from local static registry
  const galleryImageUrls = useMemo(() => {
    if (product.images && product.images.length > 0) {
      return product.images.map((key) => getImage(key));
    }
    return [product.image];
  }, [product.images, product.image]);

  // 2. Color Swatches State
  const productColors: ProductColor[] = useMemo(() => {
    return product.colors || [];
  }, [product.colors]);

  const [selectedColorId, setSelectedColorId] = useState<string | null>(() => {
    if (productColors.length === 1) {
      return productColors[0].id;
    }
    return null;
  });
  const [colorError, setColorError] = useState<string | null>(null);

  // 3. Sizes State
  const availableSizes: ProductSize[] = useMemo(() => {
    if (product.sizes && product.sizes.length > 0) {
      return product.sizes;
    }
    if (product.category === 'Unstitched') {
      return [{ size: 'Unstitched', available: true, stock: 5 }];
    }
    return [
      { size: 'Small', available: true, stock: 3 },
      { size: 'Medium', available: true, stock: 4 },
      { size: 'Large', available: true, stock: 2 },
      { size: 'X Large', available: false, stock: 0 },
    ];
  }, [product.sizes, product.category]);

  const [selectedSize, setSelectedSize] = useState<string>(() => {
    const firstAvail = availableSizes.find((s) => s.available);
    return firstAvail ? firstAvail.size : 'Small';
  });

  // Calculate available stock for current selection
  const currentSizeObj = availableSizes.find((s) => s.size === selectedSize);
  const availableStock = currentSizeObj?.stock ?? 5;
  const maxSelectableQty = Math.max(1, availableStock);

  // 4. Quantity & Interaction States
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>('description');
  const [addedToast, setAddedToast] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // 5. Reviews State (Pure UI)
  const [localReviews, setLocalReviews] = useState<Review[]>(product.reviews || []);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [modalRating, setModalRating] = useState(5);
  const [modalComment, setModalComment] = useState('');
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Clamp quantity if stock changes
  useEffect(() => {
    if (availableStock > 0 && quantity > availableStock) {
      setQuantity(availableStock);
    }
  }, [availableStock, quantity]);

  // Close zoom modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isZoomOpen) {
        setIsZoomOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isZoomOpen]);

  // Derived values
  const discountPercent = computeDiscountPercentage(product.price, product.originalPrice);
  const formattedPrice = formatPrice(product.price, product.currency);
  const formattedOriginalPrice = product.originalPrice
    ? formatPrice(product.originalPrice, product.currency)
    : null;

  const sellerImage = getImage(product.sellerStoreImageKey || 'storeAyesha');
  const storeName = product.resellerName || 'Verified Brand Partner';
  const displayRating = (product.resellerRating || product.rating || 4.9).toFixed(1);

  // Handlers
  const handleAddToCart = () => {
    if (productColors.length > 1 && !selectedColorId) {
      setColorError('Please select a color');
      return;
    }
    setColorError(null);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
    // TODO: wire to cart later
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalComment.trim()) return;

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      userName: 'Verified Buyer',
      rating: modalRating,
      date: 'Just now',
      comment: modalComment.trim(),
      verifiedPurchase: true,
    };

    setLocalReviews((prev) => [newReview, ...prev]);
    setIsReviewModalOpen(false);
    setModalComment('');
    setModalRating(5);
    setToastMessage({ text: 'Review submitted successfully!', type: 'success' });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordion((prev) => (prev === id ? null : id));
  };

  const selectedColorName = productColors.find((c) => c.id === selectedColorId)?.name;

  return (
    <div className="bg-white min-h-screen text-stone-900 pt-16 sm:pt-20 md:pt-24 pb-20 sm:pb-28">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 max-w-md w-full px-4 animate-fade-in">
          <div
            className={`p-3.5 sm:p-4 rounded-md shadow-2xl border flex items-center justify-between space-x-3 text-xs sm:text-sm font-bold uppercase tracking-wider ${
              toastMessage.type === 'error'
                ? 'bg-rose-900 text-white border-rose-700'
                : toastMessage.type === 'success'
                ? 'bg-emerald-900 text-white border-emerald-700'
                : 'bg-stone-900 text-white border-stone-700'
            }`}
          >
            <span>{toastMessage.text}</span>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="text-stone-300 hover:text-white font-mono text-sm ml-2 cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* LEFT COLUMN: Gallery & Images (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnails Sidebar */}
            {galleryImageUrls.length > 1 && (
              <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto max-h-[560px] no-scrollbar shrink-0">
                {galleryImageUrls.map((imgUrl, idx) => {
                  const isSelected = selectedImageIndex === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-16 h-20 sm:w-20 sm:h-26 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                        isSelected
                          ? 'border-stone-900 ring-2 ring-stone-900 ring-offset-1'
                          : 'border-stone-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={imgUrl}
                        alt={`${product.title} thumbnail ${idx + 1}`}
                        fill
                        sizes="80px"
                        className="object-cover object-top"
                      />
                    </button>
                  );
                })}
              </div>
            )}

            {/* Main Stage Image Viewer */}
            <div className="relative flex-1 bg-stone-100 rounded-xl overflow-hidden aspect-[3/4] group">
              <Image
                src={galleryImageUrls[selectedImageIndex] || product.image}
                alt={product.title}
                fill
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 700px"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />

              {/* Badge Overlay */}
              <div className="absolute top-4 left-4 z-10 flex flex-col space-y-1.5 pointer-events-none">
                <span className="bg-black/90 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-xs backdrop-blur-xs">
                  {product.brand}
                </span>
                {discountPercent > 0 && (
                  <span className="bg-red-600 text-white text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-xs shadow-2xs">
                    {discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Zoom Button */}
              <button
                type="button"
                onClick={() => setIsZoomOpen(true)}
                className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white text-stone-800 rounded-full shadow-2xs transition-all cursor-pointer backdrop-blur-xs"
                aria-label="Fullscreen zoom"
                title="Fullscreen Zoom"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Product Details & Buy Box (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            {/* Category / Subcategory Tag */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">
                {product.category} {product.stitchingStatus ? `• ${product.stitchingStatus}` : ''}
              </span>
            </div>

            {/* Product Title */}
            <h1 className="font-brand-serif text-2xl sm:text-3xl font-normal text-stone-900 leading-tight mb-3">
              {product.title}
            </h1>

            {/* Price Box */}
            <div className="flex items-baseline space-x-3 mb-4">
              <span className="text-2xl font-extrabold text-stone-900">
                {formattedPrice}
              </span>
              {formattedOriginalPrice && (
                <span className="text-sm text-stone-400 line-through">
                  {formattedOriginalPrice}
                </span>
              )}
            </div>

            {/* Reseller Info Card */}
            <div className="mb-4 sm:mb-5 p-2.5 sm:p-3 lg:p-3.5 rounded-lg border border-stone-200 bg-stone-50/80 flex items-center justify-between gap-2.5 sm:gap-3 shadow-2xs">
              <div className="flex items-center space-x-2 sm:space-x-2.5 min-w-0">
                <div className="relative w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full overflow-hidden shrink-0 border border-stone-200 bg-stone-100 flex items-center justify-center shadow-2xs">
                  <Image
                    src={sellerImage}
                    alt={storeName}
                    fill
                    sizes="40px"
                    className="object-cover rounded-full"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center space-x-1">
                    <span className="text-[10px] sm:text-xs lg:text-sm font-bold text-stone-900 truncate">
                      {storeName}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-[9px] sm:text-[10px] lg:text-xs text-stone-500 mt-0.5">
                    <div className="flex items-center text-amber-600 font-bold">
                      <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5 fill-amber-500 text-amber-500 mr-0.5 shrink-0" />
                      <span>{displayRating}</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="text-[9px] sm:text-[10px] lg:text-xs font-bold text-stone-900 hover:text-black underline flex items-center space-x-1 px-2 sm:px-2.5 py-1 sm:py-1.5 bg-white border border-stone-200 rounded-xs hover:border-stone-400 transition-colors shadow-2xs shrink-0 cursor-pointer"
              >
                <span>Visit Store</span>
                <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-3 lg:h-3 shrink-0" />
              </button>
            </div>

            {/* Specifications & Attributes List */}
            <div className="mb-6 border border-stone-200 rounded-lg divide-y divide-stone-200 bg-white text-xs">
              <div className="p-3 flex justify-between">
                <span className="text-stone-500 font-medium">Brand Authenticity:</span>
                <span className="text-stone-900 font-bold flex items-center space-x-1">
                  <span>Official ({product.brand})</span>
                </span>
              </div>
              <div className="p-3 flex justify-between">
                <span className="text-stone-500 font-medium">Category:</span>
                <span className="text-stone-900 font-bold">{product.category}</span>
              </div>
              {product.fabric && (
                <div className="p-3 flex justify-between">
                  <span className="text-stone-500 font-medium">Fabric Type:</span>
                  <span className="text-stone-900 font-bold">{product.fabric}</span>
                </div>
              )}
              {product.pieceCount && (
                <div className="p-3 flex justify-between">
                  <span className="text-stone-500 font-medium">Piece Count:</span>
                  <span className="text-stone-900 font-bold">{product.pieceCount}</span>
                </div>
              )}
              {product.color && (
                <div className="p-3 flex justify-between">
                  <span className="text-stone-500 font-medium">Color Palette:</span>
                  <span className="text-stone-900 font-bold">{product.color}</span>
                </div>
              )}
              {product.defect && (
                <div className="p-3 flex justify-between bg-amber-50/50">
                  <span className="text-amber-800 font-medium">Defect Disclaimer:</span>
                  <span className="text-amber-900 font-bold text-right">{product.defect}</span>
                </div>
              )}
            </div>

            {/* Size / Stitching Status Selection */}
            <div className="mb-6">
              {product.category === 'Unstitched' ? (
                <div className="p-3 bg-stone-50 border border-stone-200 rounded-md text-xs flex justify-between items-center">
                  <span className="font-bold text-stone-800 uppercase tracking-wider">
                    Unstitched Fabric Ensemble
                  </span>
                  {availableStock <= 5 ? (
                    <span className="font-extrabold text-red-700 bg-red-50 px-2 py-1 rounded border border-red-200">
                      {availableStock} Pcs Left
                    </span>
                  ) : (
                    <span className="text-stone-500 font-medium">In Stock</span>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                    Select Size
                  </span>
                  <div
                    role="radiogroup"
                    aria-label="Select size"
                    className="flex flex-wrap gap-2"
                  >
                    {availableSizes.map((szItem) => {
                      const isSelected = selectedSize === szItem.size;
                      const isAvailable = szItem.available;
                      return (
                        <button
                          key={szItem.size}
                          type="button"
                          role="radio"
                          aria-checked={isSelected}
                          disabled={!isAvailable}
                          onClick={() => {
                            if (isAvailable) {
                              setSelectedSize(szItem.size);
                              setColorError(null);
                            }
                          }}
                          className={`px-3.5 py-2 rounded-xs border text-xs font-bold uppercase transition-all flex flex-col items-center justify-center cursor-pointer ${
                            isSelected && isAvailable
                              ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                              : isAvailable
                              ? 'border-stone-300 text-stone-800 hover:border-stone-900 bg-white'
                              : 'border-stone-200 bg-stone-100 text-stone-400 line-through cursor-not-allowed opacity-60'
                          }`}
                        >
                          <span>{szItem.size}</span>
                          {szItem.stock && szItem.stock <= 3 && isAvailable && (
                            <span
                              className={`text-[9px] font-semibold tracking-tight ${
                                isSelected ? 'text-amber-300' : 'text-amber-600'
                              }`}
                            >
                              Only {szItem.stock} left
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Color Swatches Selection */}
            {productColors.length > 0 && (
              <div className="mb-6 space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                  Color:{' '}
                  <span className="font-normal text-stone-600">
                    {selectedColorName || 'Please select'}
                  </span>
                </span>
                <div
                  role="radiogroup"
                  aria-label="Available colors"
                  className="flex flex-wrap items-center gap-2.5 py-0.5"
                >
                  {productColors.map((colorItem) => {
                    const resolvedBg = resolveSwatchColor(colorItem.code, colorItem.name);
                    const isSelected = selectedColorId === colorItem.id;

                    return (
                      <button
                        key={colorItem.id}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        aria-label={colorItem.name}
                        onClick={() => {
                          setSelectedColorId(colorItem.id);
                          setColorError(null);
                        }}
                        title={colorItem.name}
                        className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full shrink-0 border border-black/15 transition-all cursor-pointer flex items-center justify-center relative focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2 ${
                          isSelected
                            ? 'ring-2 ring-stone-900 ring-offset-2 ring-offset-white scale-110 shadow-xs'
                            : 'hover:scale-105 hover:border-stone-400 opacity-80 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: resolvedBg || '#D1D5DB' }}
                      />
                    );
                  })}
                </div>
                {colorError && (
                  <p className="text-xs text-red-600 font-medium animate-fade-in" role="alert">
                    {colorError}
                  </p>
                )}
              </div>
            )}

            {/* Quantity Stepper & Add to Bag Row */}
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <div className="flex items-center gap-1.5 sm:gap-2.5 lg:gap-3 w-full">
                {/* Quantity Controls */}
                <div className="flex items-center border border-stone-300 rounded-xs bg-white shrink-0 h-9 sm:h-10 lg:h-11">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="flex items-center justify-center w-7 h-full sm:w-8 lg:w-9 text-stone-600 hover:text-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed shrink-0 cursor-pointer"
                  >
                    <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" />
                  </button>

                  <span className="w-7 sm:w-8 lg:w-10 text-center text-[10px] sm:text-xs lg:text-sm font-extrabold shrink-0">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQuantity((q) => Math.min(maxSelectableQty, q + 1))}
                    disabled={quantity >= maxSelectableQty}
                    className="flex items-center justify-center w-7 h-full sm:w-8 lg:w-9 text-stone-600 hover:text-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed shrink-0 cursor-pointer"
                  >
                    <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" />
                  </button>
                </div>

                {/* ADD TO BAG BUTTON */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={availableStock === 0}
                  className="flex-1 min-w-0 h-9 sm:h-10 lg:h-11 px-2 sm:px-4 lg:px-6 bg-stone-900 hover:bg-black disabled:bg-stone-400 text-white text-[9px] sm:text-[10px] lg:text-xs font-bold uppercase tracking-wide sm:tracking-wider lg:tracking-widest rounded-xs shadow-lg flex items-center justify-center gap-1 sm:gap-1.5 lg:gap-2 transition-all transform active:scale-95 disabled:cursor-not-allowed whitespace-nowrap overflow-hidden cursor-pointer"
                >
                  <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 shrink-0" />
                  <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                    {addedToast
                      ? 'ADDED TO BAG ✓'
                      : availableStock === 0
                      ? 'OUT OF STOCK'
                      : 'ADD TO BAG'}
                  </span>
                </button>

                {/* Wishlist Button */}
                <button
                  type="button"
                  aria-label="Save to Wishlist"
                  onClick={() => setIsWishlisted((prev) => !prev)}
                  className={`flex items-center justify-center shrink-0 w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-xs border transition-all cursor-pointer ${
                    isWishlisted
                      ? 'border-red-600 bg-red-50 text-red-600'
                      : 'border-stone-300 hover:border-stone-900 text-stone-700'
                  }`}
                  title="Save to Wishlist"
                >
                  <Heart
                    className={`w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 shrink-0 ${
                      isWishlisted ? 'fill-red-600 text-red-600' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Express Shipping Guarantee Badges */}
              <div className="grid grid-cols-3 gap-1 sm:gap-2 lg:gap-3 pt-3 sm:pt-4 border-t border-stone-200 text-[8px] sm:text-[10px] lg:text-xs text-stone-600 font-medium">
                <div className="flex items-center gap-1 sm:gap-1.5 min-w-0 whitespace-nowrap">
                  <Truck className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-stone-800 shrink-0" />
                  <span className="truncate">Express Shipping</span>
                </div>

                <div className="flex items-center gap-1 sm:gap-1.5 min-w-0 whitespace-nowrap">
                  <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-stone-800 shrink-0" />
                  <span className="truncate">Authentic Brand Seal</span>
                </div>

                <div className="flex items-center gap-1 sm:gap-1.5 min-w-0 whitespace-nowrap">
                  <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-stone-800 shrink-0" />
                  <span className="truncate">7-Day Return Guarantee</span>
                </div>
              </div>
            </div>

            {/* Accordions */}
            <div className="border-t border-stone-200 divide-y divide-stone-200">
              {/* Description Accordion */}
              <div className="py-4">
                <button
                  type="button"
                  onClick={() => toggleAccordion('description')}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-stone-900 cursor-pointer"
                >
                  <span>PRODUCT DETAILS & SPECIFICATIONS</span>
                  {openAccordion === 'description' ? (
                    <Minus className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </button>

                {openAccordion === 'description' && (
                  <div className="mt-3 text-xs text-stone-600 leading-relaxed animate-fade-in">
                    <p className="whitespace-pre-line">
                      {product.description ||
                        'Authentic factory surplus designer attire verified by ZEBAISH inspection teams.'}
                    </p>
                  </div>
                )}
              </div>

              {/* Fabric & Care Accordion */}
              <div className="py-4">
                <button
                  type="button"
                  onClick={() => toggleAccordion('fabric')}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-stone-900 cursor-pointer"
                >
                  <span>FABRIC & CARE INSTRUCTIONS</span>
                  {openAccordion === 'fabric' ? (
                    <Minus className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </button>

                {openAccordion === 'fabric' && (
                  <div className="mt-3 text-xs text-stone-600 leading-relaxed space-y-1.5 animate-fade-in">
                    <p>
                      <strong>Primary Fabric:</strong> {product.fabric || 'Pure Pakistani Fabric'}
                    </p>
                    <p>• Dry clean recommended for long-lasting vibrant color saturation.</p>
                    <p>• Do not expose to direct sunlight or harsh chemical detergents.</p>
                    <p>• Iron at moderate heat level only.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* REVIEWS & RATINGS SECTION */}
        <div className="mt-16 pt-12 border-t border-stone-200">
          <div className="flex flex-nowrap items-center justify-between gap-2 xs:gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 min-w-0">
              <h2 className="font-brand-serif text-[15px] xs:text-base sm:text-xl lg:text-2xl font-normal text-stone-900 uppercase tracking-wide sm:tracking-wider truncate">
                REVIEWS & RATINGS
              </h2>

              {localReviews.length > 0 && (
                <div className="hidden md:flex items-center space-x-1.5 lg:space-x-2 bg-stone-50 px-2 sm:px-2.5 lg:px-3 py-1 sm:py-1.5 rounded-lg border border-stone-200 text-[10px] sm:text-xs font-bold shrink-0">
                  <div className="flex text-amber-500">
                    <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-500 text-amber-500" />
                  </div>
                  <span className="text-stone-900">
                    {(
                      localReviews.reduce((sum, r) => sum + r.rating, 0) / localReviews.length
                    ).toFixed(1)}{' '}
                    / 5
                  </span>
                  <span className="text-stone-500 font-normal">({localReviews.length})</span>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setIsReviewModalOpen(true)}
              className="shrink-0 flex items-center justify-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3 lg:px-3.5 py-1.5 sm:py-2 lg:py-2 bg-stone-900 hover:bg-black text-white text-[9px] sm:text-[10px] lg:text-xs font-bold uppercase tracking-wide rounded-xs shadow-xs transition-all cursor-pointer min-w-fit"
            >
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 fill-amber-400 shrink-0" />
              <span className="whitespace-nowrap">Write a Review</span>
            </button>
          </div>

          {/* Reviews List */}
          {localReviews.length > 0 ? (
            <div className="overflow-x-auto overflow-y-hidden scrollbar-thin pb-2">
              <div className="flex flex-nowrap gap-4 sm:gap-5 lg:gap-5 w-max">
                {localReviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="shrink-0 w-[260px] sm:w-[280px] lg:w-[300px] p-4 sm:p-4.5 lg:p-5 rounded-lg border border-stone-200 bg-white flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                        <div className="flex text-amber-500">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-500 text-amber-500"
                            />
                          ))}
                        </div>
                        <span className="text-[9px] sm:text-[10px] text-stone-400">
                          {rev.date}
                        </span>
                      </div>
                      <p className="text-[10px] sm:text-xs text-stone-700 leading-relaxed mb-2.5 sm:mb-3">
                        "{rev.comment}"
                      </p>
                      {rev.resellerReply && (
                        <div className="mt-2.5 sm:mt-3 p-2.5 sm:p-3 bg-amber-50/60 rounded-xs border-l-2 border-amber-500 text-[10px] sm:text-xs">
                          <span className="font-bold text-stone-900 block text-[9px] sm:text-[10px] mb-0.5">
                            Response from {product.resellerName || 'Seller'}:
                          </span>
                          <p className="text-stone-700 italic">"{rev.resellerReply}"</p>
                        </div>
                      )}
                    </div>
                    <div className="pt-2.5 sm:pt-3 border-t border-stone-100 flex items-center justify-between gap-2 text-[10px] sm:text-xs mt-2.5 sm:mt-3">
                      <span className="font-bold text-stone-900 truncate">{rev.userName}</span>
                      {rev.verifiedPurchase && (
                        <span className="text-[9px] sm:text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 sm:px-2 py-0.5 rounded-xs border border-emerald-200 whitespace-nowrap">
                          ✓ Verified Buyer
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-6 sm:p-7 bg-stone-50 border border-stone-200 rounded-lg text-center text-[10px] sm:text-xs text-stone-500 font-medium">
              No reviews submitted yet for this collection item.
            </div>
          )}
        </div>
      </div>

      {/* Lightbox / Fullscreen Zoom Modal */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 z-50 bg-stone-100/90 backdrop-blur-md overflow-y-auto flex flex-col justify-between transition-opacity duration-300 animate-fade-in"
          onClick={() => setIsZoomOpen(false)}
        >
          {/* Top Header Bar */}
          <div
            className="sticky top-0 z-20 w-full px-4 sm:px-6 py-3 sm:py-3.5 flex items-center justify-between bg-stone-100/80 backdrop-blur-xs border-b border-stone-200/80 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
              <span className="bg-stone-900 text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs shrink-0">
                {product.brand}
              </span>
              <h3 className="text-xs sm:text-sm font-bold text-stone-900 truncate">
                {product.title}
              </h3>
            </div>

            <button
              type="button"
              onClick={() => setIsZoomOpen(false)}
              className="p-1.5 sm:p-2 bg-stone-200/80 hover:bg-stone-900 text-stone-700 hover:text-white rounded-full transition-all shrink-0 shadow-2xs cursor-pointer"
              title="Close Fullscreen View (Esc)"
              aria-label="Close fullscreen view"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Main Content Stage */}
          <div
            className="flex-1 w-full flex flex-col items-center justify-start pt-3 sm:pt-4 pb-6 px-3 sm:px-6 min-h-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-w-4xl w-full h-[70vh] sm:h-[78vh] flex items-center justify-center">
              <Image
                src={galleryImageUrls[selectedImageIndex] || product.image}
                alt={product.title}
                fill
                sizes="(max-width: 1024px) 90vw, 1000px"
                className="object-contain rounded-md shadow-xl border border-stone-200/80 bg-white"
              />
            </div>

            {/* Gallery Thumbnail Selector inside Modal */}
            {galleryImageUrls.length > 1 && (
              <div className="mt-3 sm:mt-4 flex items-center gap-2 overflow-x-auto max-w-full p-2 bg-white/80 border border-stone-200/80 rounded-lg shadow-2xs shrink-0">
                {galleryImageUrls.map((imgUrl, idx) => {
                  const isSelected = selectedImageIndex === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-11 h-14 sm:w-14 sm:h-16 rounded-md overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                        isSelected
                          ? 'border-stone-900 ring-2 ring-stone-900 ring-offset-1'
                          : 'border-stone-200 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={imgUrl}
                        alt={`View thumbnail ${idx + 1}`}
                        fill
                        sizes="60px"
                        className="object-cover object-top"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Review Modal (Pure UI) */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-lg max-w-md w-full p-5 sm:p-6 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-4">
              <div>
                <span className="text-[10px] sm:text-xs lg:text-sm font-extrabold text-amber-600 uppercase tracking-widest block">
                  CUSTOMER REVIEW
                </span>
                <h3 className="text-sm sm:text-base lg:text-lg font-bold text-stone-900">
                  Write Product Review
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsReviewModalOpen(false)}
                className="p-1 hover:bg-stone-100 rounded-full text-stone-400 hover:text-stone-700 text-xs sm:text-sm lg:text-base cursor-pointer"
                aria-label="Close review modal"
              >
                ✕
              </button>
            </div>

            {/* Product Summary */}
            <div className="flex items-center space-x-3 p-3 bg-stone-50 rounded-xs border border-stone-200 mb-4">
              <div className="relative w-12 h-16 sm:w-14 sm:h-18 rounded-xs border border-stone-200 overflow-hidden shrink-0">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="60px"
                  className="object-cover object-top"
                />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] sm:text-xs font-bold text-stone-400 uppercase block truncate">
                  {product.brand}
                </span>
                <h4 className="text-xs sm:text-sm font-semibold text-stone-900 line-clamp-2">
                  {product.title}
                </h4>
              </div>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="font-bold text-stone-700 block mb-1.5 uppercase tracking-wider text-[10px] sm:text-xs">
                  Rating (1 to 5 Stars) *
                </label>
                <div className="flex items-center space-x-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setModalRating(star)}
                      className="p-1 transition-transform hover:scale-110 focus:outline-none cursor-pointer"
                      aria-label={`${star} star`}
                    >
                      <Star
                        className={`w-6 h-6 sm:w-7 sm:h-7 ${
                          star <= modalRating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-stone-200'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs sm:text-sm font-bold text-stone-600 ml-2">
                    {modalRating} / 5 Stars
                  </span>
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1.5 uppercase tracking-wider text-[10px] sm:text-xs">
                  Your Review *
                </label>
                <textarea
                  rows={4}
                  required
                  value={modalComment}
                  onChange={(e) => setModalComment(e.target.value)}
                  placeholder="Share details of the fabric quality, fitting, and color accuracy..."
                  className="w-full p-3 border border-stone-300 rounded-xs focus:outline-none focus:border-stone-900 text-xs sm:text-sm"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="px-3.5 sm:px-4 py-2 border border-stone-300 text-stone-700 font-bold uppercase tracking-wider text-xs rounded-xs hover:bg-stone-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 sm:px-5 py-2 bg-stone-900 hover:bg-black text-white font-bold uppercase tracking-wider text-xs rounded-xs transition-colors cursor-pointer"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
