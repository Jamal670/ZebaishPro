// types/index.ts
// Frontend type definitions for Zebaish Pro

import { ImageKey } from '@/utils/imageLoader';

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  resellerReply?: string;
}

export interface ProductColor {
  id: string;
  name: string;
  code?: string;
}

export interface ProductSize {
  size: string;
  available: boolean;
  stock?: number;
}

export interface ProductItem {
  id: string;
  title: string;
  brand: string;
  price: number;
  originalPrice?: number;
  currency: string;
  image: string;
  images?: ImageKey[];
  alt: string;
  badge?: string;
  category: string;
  subcategory?: string;
  stitchingStatus?: string;
  resellerName?: string;
  resellerRating?: number;
  sellerStoreImageKey?: ImageKey;
  discountPercentage?: number;
  reviewCount?: number;
  rating?: number;
  fabric?: string;
  color?: string;
  colors?: ProductColor[];
  sizes?: ProductSize[];
  pieceCount?: string;
  occasion?: string;
  size?: string;
  inStock?: boolean;
  description?: string;
  defect?: string;
  collectionSlug?: string;
  reviews?: Review[];
}

export type Product = ProductItem;

export interface FilterOptions {
  brands: string[];
  stitchingStatuses: string[];
  pieceCounts: string[];
  fabrics: string[];
  colors: string[];
  occasions: string[];
  sizes: string[];
  priceRange: [number, number];
  discountRanges: string[];
  minResellerRating: number;
  inStockOnly: boolean;
  categories: string[];
}

export interface Collection {
  readonly slug: string;
  readonly title: string;
  readonly displayTitle?: string;
  readonly category: string;
  readonly imageKey: string;
  readonly image: string;
  readonly alt: string;
  readonly description?: string;
}

export type SortOption =
  | 'featured'
  | 'price-low'
  | 'price-high'
  | 'newest'
  | 'best-discount'
  | 'most-popular';
