// utils/collections.ts
// Single source of truth for collection categories, URL slugs, and metadata

import { getImage } from '@/utils/imageLoader';

export interface CollectionItem {
  id: string;
  slug: string;
  title: string;
  displayTitle: string;
  category: string;
  image: string;
  alt: string;
  description: string;
}

export const COLLECTIONS = [
  {
    id: 'cat-1',
    slug: 'unstitched',
    title: 'Unstitched',
    displayTitle: 'UNSTITCHED',
    category: 'Unstitched',
    image: getImage('catUnstitched'),
    alt: 'Unstitched Luxury Lawn Collection',
    description:
      'Authentic factory surplus & end-of-season unstitched lawn designer suits from verified resellers across Pakistan',
  },
  {
    id: 'cat-2',
    slug: 'ready-to-wear',
    title: 'Ready to Wear',
    displayTitle: 'READY TO WEAR',
    category: 'Ready to Wear',
    image: getImage('catReadyToWear'),
    alt: 'Ready to Wear Kurtis and 2-Piece Pret',
    description:
      'Curated pret kurtis and ready-to-wear 2-piece & 3-piece designer suits from verified boutiques',
  },
  {
    id: 'cat-3',
    slug: 'formals',
    title: 'Formals',
    displayTitle: 'FORMALS',
    category: 'Formals',
    image: getImage('catFormals'),
    alt: 'Luxury Formal Wear and Festive Suits',
    description:
      'Exquisite luxury formal wear, chiffon, and festive wedding collections at surplus prices',
  },
  {
    id: 'cat-4',
    slug: 'accessories',
    title: 'Accessories',
    displayTitle: 'ACCESSORIES',
    category: 'Accessories',
    image: getImage('catAccessories'),
    alt: 'Fashion Accessories and Bags',
    description:
      'Complete your designer look with curated dupattas, shawls, bags, and luxury accessories',
  },
] as const;

export type CollectionSlug = (typeof COLLECTIONS)[number]['slug'];

/**
 * Lookup collection by slug (case-insensitive)
 */
export const getCollection = (slug: string) => {
  const normalized = slug.trim().toLowerCase();
  return COLLECTIONS.find((c) => c.slug.toLowerCase() === normalized);
};

/**
 * Case-insensitive comparison helper for product category vs collection category
 * e.g., 'Ready to Wear' vs 'ready-to-wear' vs 'Ready to wear'
 */
export const matchesCollectionCategory = (
  productCategory: string,
  targetCategory: string
): boolean => {
  if (!productCategory || !targetCategory) return false;
  const norm1 = productCategory.trim().toLowerCase().replace(/[-_]/g, ' ');
  const norm2 = targetCategory.trim().toLowerCase().replace(/[-_]/g, ' ');
  return norm1 === norm2;
};

export default COLLECTIONS;
