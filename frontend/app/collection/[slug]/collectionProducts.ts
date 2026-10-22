// app/collection/[slug]/collectionProducts.ts
// Re-export from unified catalog at utils/products.ts to maintain a single source of truth.

export {
  PRODUCTS as STATIC_COLLECTION_PRODUCTS,
  getProductsForCollection,
  getProduct,
  computeDiscountPercentage,
  formatPrice,
} from '@/utils/products';
