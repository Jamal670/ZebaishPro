// utils/products.ts
// Single source of truth for products across collections and product details.
// Pure static frontend data with no backend dependencies.

import { ProductItem, Review } from '@/types';
import { getImage, ImageKey } from '@/utils/imageLoader';
import { matchesCollectionCategory } from '@/utils/collections';

/**
 * Computes discount percentage with division-by-zero guard.
 */
export function computeDiscountPercentage(price: number, originalPrice?: number): number {
  if (!originalPrice || originalPrice <= 0 || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

/**
 * Formats price in PKR or designated currency.
 */
export function formatPrice(price: number, currency: string = 'PKR'): string {
  const symbol = currency === 'PKR' ? 'Rs.' : currency;
  return `${symbol} ${price.toLocaleString()}`;
}

export const PRODUCTS: ProductItem[] = [
  // ==========================================
  // 1. Unstitched Collection
  // ==========================================
  {
    id: 'prod-unst-1',
    title: 'Crimson Embroidered Lawn 3-Piece Unstitched Suit',
    brand: 'Khaadi',
    price: 4950,
    originalPrice: 8500,
    currency: 'PKR',
    image: getImage('prodLawnCrimson'),
    images: ['prodLawnCrimson', 'catUnstitched', 'wornAndLoved3'],
    alt: 'Crimson Embroidered Lawn Suit',
    badge: '42% OFF',
    category: 'Unstitched',
    stitchingStatus: 'Unstitched',
    fabric: 'Lawn',
    color: 'Red',
    colors: [
      { id: 'c-crimson', name: 'Crimson Red', code: '#990000' },
      { id: 'c-maroon', name: 'Maroon', code: '#800000' },
    ],
    sizes: [{ size: 'Unstitched', available: true, stock: 4 }],
    resellerName: 'Ayesha Luxury Hub',
    resellerRating: 4.9,
    sellerStoreImageKey: 'storeAyesha',
    discountPercentage: 42,
    rating: 4.9,
    reviewCount: 28,
    collectionSlug: 'unstitched',
    description:
      'Authentic Khaadi factory leftover 3-piece unstitched summer lawn ensemble. Features intricate floral shadow embroidery across the front neckline, accompanied by a digitally printed luxury voile dupatta and plain dyed cambric trousers.\n\nGuaranteed original surplus sourced directly from authorized textile distributors in Lahore.',
    reviews: [
      {
        id: 'rev-unst-1-1',
        userName: 'Sobia Tariq',
        rating: 5,
        date: 'Oct 14, 2025',
        comment:
          'Stunning fabric quality! Color is exactly like the picture, soft luxury lawn and fast 2-day delivery.',
        verifiedPurchase: true,
        resellerReply: 'Thank you Sobia! Delighted you loved the authentic Khaadi lawn print.',
      },
      {
        id: 'rev-unst-1-2',
        userName: 'Mahnoor Khan',
        rating: 5,
        date: 'Sep 29, 2025',
        comment:
          '100% genuine surplus piece with complete factory stamp on borders. Will definitely purchase again.',
        verifiedPurchase: true,
      },
    ],
  },
  {
    id: 'prod-unst-2',
    title: 'Floral Pastel Digital Print Unstitched Lawn Suit',
    brand: 'Sapphire',
    price: 3850,
    originalPrice: 6500,
    currency: 'PKR',
    image: getImage('prodLawnPink'),
    images: ['prodLawnPink', 'catUnstitched', 'catLuxuryPret'],
    alt: 'Sapphire Pastel Printed Lawn Suit',
    badge: '40% OFF',
    category: 'Unstitched',
    stitchingStatus: 'Unstitched',
    fabric: 'Lawn',
    color: 'Pink',
    colors: [
      { id: 'c-pink', name: 'Pastel Pink', code: '#F472B6' },
      { id: 'c-peach', name: 'Peach Blush', code: '#FFE5B4' },
    ],
    sizes: [{ size: 'Unstitched', available: true, stock: 7 }],
    resellerName: 'Karachi Surplus Depot',
    resellerRating: 4.8,
    sellerStoreImageKey: 'storeZainab',
    discountPercentage: 40,
    rating: 4.8,
    reviewCount: 19,
    collectionSlug: 'unstitched',
    description:
      'Delicate pastel floral compositions rendered onto high-thread-count premium lawn. Includes 3 meters printed shirt, dyed trouser fabric, and fine chiffon dupatta with scalloped borders.\n\nLeftover batch from end-of-season retail inventory, inspected for fabric perfection.',
    reviews: [
      {
        id: 'rev-unst-2-1',
        userName: 'Hira Salman',
        rating: 5,
        date: 'Oct 02, 2025',
        comment:
          'Soft breathable material for summer festivities. True pastel shade, looks elegant after tailoring.',
        verifiedPurchase: true,
      },
    ],
  },
  {
    id: 'prod-unst-3',
    title: 'Classic Luxury Summer Lawn 3-Piece Suit with Chiffon Dupatta',
    brand: 'Gul Ahmed',
    price: 5200,
    originalPrice: 9200,
    currency: 'PKR',
    image: getImage('catUnstitched'),
    images: ['catUnstitched', 'prodLawnPink', 'wornAndLoved1'],
    alt: 'Gul Ahmed Luxury Summer Lawn',
    badge: '43% OFF',
    category: 'Unstitched',
    stitchingStatus: 'Unstitched',
    fabric: 'Lawn',
    color: 'Gold',
    colors: [
      { id: 'c-gold', name: 'Warm Gold', code: '#D97706' },
      { id: 'c-beige', name: 'Beige Cream', code: '#F5F5DC' },
    ],
    sizes: [{ size: 'Unstitched', available: true, stock: 3 }],
    resellerName: 'Royal Threads Lahore',
    resellerRating: 4.9,
    sellerStoreImageKey: 'storeRoyal',
    discountPercentage: 43,
    rating: 4.9,
    reviewCount: 34,
    collectionSlug: 'unstitched',
    description:
      'Timeless Gul Ahmed signature summer collection featuring metallic zari thread accents along the embroidered daman. Paired with a feather-light printed pure chiffon dupatta.',
    reviews: [
      {
        id: 'rev-unst-3-1',
        userName: 'Rabia Zafar',
        rating: 5,
        date: 'Aug 18, 2025',
        comment:
          'Gul Ahmed lawn never disappoints! Excellent packaging and genuine verified seal.',
        verifiedPurchase: true,
      },
    ],
  },
  {
    id: 'prod-unst-4',
    title: 'Intricate Cambric Shadow Embroidered 2-Piece Suit',
    brand: 'Alkaram',
    price: 3400,
    originalPrice: 5800,
    currency: 'PKR',
    image: getImage('wornAndLoved1'),
    images: ['wornAndLoved1', 'catUnstitched', 'prodLawnCrimson'],
    alt: 'Alkaram Cambric Shadow Embroidered Suit',
    badge: '41% OFF',
    category: 'Unstitched',
    stitchingStatus: 'Unstitched',
    fabric: 'Cambric',
    color: 'Blue',
    colors: [
      { id: 'c-blue', name: 'Sky Blue', code: '#38BDF8' },
      { id: 'c-navy', name: 'Navy Blue', code: '#0F172A' },
    ],
    sizes: [{ size: 'Unstitched', available: true, stock: 5 }],
    resellerName: 'Lawn Vault Multan',
    resellerRating: 4.7,
    sellerStoreImageKey: 'storeVault',
    discountPercentage: 41,
    rating: 4.7,
    reviewCount: 15,
    collectionSlug: 'unstitched',
    description:
      'Comfort-first fine cambric 2-piece suit with tone-on-tone shadow thread embroidery on the neckline and sleeve cuffs. Premium quality fabric suitable for year-round everyday wear.',
    reviews: [
      {
        id: 'rev-unst-4-1',
        userName: 'Amina Baig',
        rating: 4,
        date: 'Jul 21, 2025',
        comment: 'Very nice fabric. Stitching master had an easy time tailor-fitting it.',
        verifiedPurchase: true,
      },
    ],
  },

  // ==========================================
  // 2. Ready to Wear Collection
  // ==========================================
  {
    id: 'prod-rtw-1',
    title: 'Indigo Geometric Embroidered Cotton Pret Kurti',
    brand: 'Khaadi',
    price: 2950,
    originalPrice: 4800,
    currency: 'PKR',
    image: getImage('prodIndigoKurti'),
    images: ['prodIndigoKurti', 'prodPretKurti', 'catReadyToWear'],
    alt: 'Khaadi Indigo Embroidered Kurti',
    badge: '38% OFF',
    category: 'Ready to Wear',
    stitchingStatus: 'Ready to Wear',
    fabric: 'Cotton',
    color: 'Blue',
    colors: [
      { id: 'c-indigo', name: 'Indigo Blue', code: '#1E3A8A' },
      { id: 'c-navy', name: 'Navy', code: '#0F172A' },
    ],
    sizes: [
      { size: 'Small', available: true, stock: 2 },
      { size: 'Medium', available: true, stock: 5 },
      { size: 'Large', available: true, stock: 3 },
      { size: 'X Large', available: false, stock: 0 },
    ],
    resellerName: 'Pret Studio Lahore',
    resellerRating: 4.9,
    sellerStoreImageKey: 'storeAyesha',
    discountPercentage: 38,
    rating: 4.9,
    reviewCount: 42,
    collectionSlug: 'ready-to-wear',
    description:
      'Straight-silhouette tailored cotton pret kurti with geometric threadwork detailing across the placket and side slits. Finished with tailored piping and neat hemline seams.',
    reviews: [
      {
        id: 'rev-rtw-1-1',
        userName: 'Zunaira Asif',
        rating: 5,
        date: 'Oct 11, 2025',
        comment: 'Fitting is true to size (Medium). The indigo color did not bleed on first wash!',
        verifiedPurchase: true,
      },
    ],
  },
  {
    id: 'prod-rtw-2',
    title: 'Contemporary Luxury Pret Kurti with Tassels',
    brand: 'Sapphire',
    price: 3200,
    originalPrice: 5500,
    currency: 'PKR',
    image: getImage('catReadyToWear'),
    images: ['catReadyToWear', 'prodPretKurti', 'prodIndigoKurti'],
    alt: 'Sapphire Contemporary Luxury Pret Kurti',
    badge: '41% OFF',
    category: 'Ready to Wear',
    stitchingStatus: 'Ready to Wear',
    fabric: 'Lawn',
    color: 'White/Cream',
    colors: [
      { id: 'c-offwhite', name: 'Off White', code: '#FAF9F6' },
      { id: 'c-beige', name: 'Beige', code: '#F5F5DC' },
    ],
    sizes: [
      { size: 'Small', available: true, stock: 4 },
      { size: 'Medium', available: true, stock: 6 },
      { size: 'Large', available: false, stock: 0 },
      { size: 'X Large', available: false, stock: 0 },
    ],
    resellerName: 'Zainab Cloth Karachi',
    resellerRating: 4.8,
    sellerStoreImageKey: 'storeZainab',
    discountPercentage: 41,
    rating: 4.8,
    reviewCount: 23,
    collectionSlug: 'ready-to-wear',
    description:
      'Airy A-line cut stitched lawn kurti adorned with handmade matching yarn tassels on the neckline. Tailored for elevated casual outings and university wear.',
    reviews: [
      {
        id: 'rev-rtw-2-1',
        userName: 'Fatima Noor',
        rating: 5,
        date: 'Sep 19, 2025',
        comment: 'Chic modern cut. Goes beautifully with cigarette pants or mom jeans.',
        verifiedPurchase: true,
      },
    ],
  },
  {
    id: 'prod-rtw-3',
    title: 'Modern Cut Embroidered Tunic Pret Top',
    brand: 'Ethnic',
    price: 2750,
    originalPrice: 4200,
    currency: 'PKR',
    image: getImage('prodPretKurti'),
    images: ['prodPretKurti', 'catReadyToWear', 'catStitchedSuit'],
    alt: 'Ethnic Embroidered Tunic Pret',
    badge: '35% OFF',
    category: 'Ready to Wear',
    stitchingStatus: 'Ready to Wear',
    fabric: 'Cotton',
    color: 'Black',
    colors: [
      { id: 'c-blk', name: 'Jet Black', code: '#18181B' },
      { id: 'c-charcoal', name: 'Charcoal', code: '#36454F' },
    ],
    sizes: [
      { size: 'Small', available: true, stock: 3 },
      { size: 'Medium', available: true, stock: 4 },
      { size: 'Large', available: true, stock: 1 },
      { size: 'X Large', available: false, stock: 0 },
    ],
    resellerName: 'Urban Fashion Resellers',
    resellerRating: 4.7,
    sellerStoreImageKey: 'storeVault',
    discountPercentage: 35,
    rating: 4.7,
    reviewCount: 18,
    collectionSlug: 'ready-to-wear',
    description:
      'Flattering dropped-shoulder tunic crafted from slub cotton with intricate folk-inspired cross-stitch motifs in contrast rust and ivory tones.',
    reviews: [
      {
        id: 'rev-rtw-3-1',
        userName: 'Khadija Rehman',
        rating: 5,
        date: 'Aug 24, 2025',
        comment: 'Really nice silhouette and heavy cotton drape. High value for surplus price.',
        verifiedPurchase: true,
      },
    ],
  },
  {
    id: 'prod-rtw-4',
    title: 'Solid Button-Down Mandarin Collar Pret Kurti',
    brand: 'Limelight',
    price: 2400,
    originalPrice: 3800,
    currency: 'PKR',
    image: getImage('catStitchedSuit'),
    images: ['catStitchedSuit', 'prodPretKurti', 'catReadyToWear'],
    alt: 'Limelight Mandarin Collar Pret Kurti',
    badge: '37% OFF',
    category: 'Ready to Wear',
    stitchingStatus: 'Ready to Wear',
    fabric: 'Linen',
    color: 'Yellow',
    colors: [
      { id: 'c-mustard', name: 'Mustard Yellow', code: '#FFDB58' },
      { id: 'c-rust', name: 'Rust Orange', code: '#B7410E' },
    ],
    sizes: [
      { size: 'Small', available: true, stock: 5 },
      { size: 'Medium', available: true, stock: 2 },
      { size: 'Large', available: false, stock: 0 },
      { size: 'X Large', available: false, stock: 0 },
    ],
    resellerName: 'Punjab Outlet Stock',
    resellerRating: 4.6,
    sellerStoreImageKey: 'storeRoyal',
    discountPercentage: 37,
    rating: 4.6,
    reviewCount: 12,
    collectionSlug: 'ready-to-wear',
    description:
      'Minimalist solid tone button-down pret kurti featuring wooden button accents along the placket and a crisp band collar. Versatile smart-casual piece.',
    reviews: [
      {
        id: 'rev-rtw-4-1',
        userName: 'Sana Malik',
        rating: 4,
        date: 'Aug 05, 2025',
        comment: 'Nice fabric for daily office wear. Neat stitching.',
        verifiedPurchase: true,
      },
    ],
  },

  // ==========================================
  // 3. Formals Collection
  // ==========================================
  {
    id: 'prod-form-1',
    title: 'Emerald Green Luxury Chiffon Hand-Embellished Formal Suit',
    brand: 'Maria B',
    price: 14500,
    originalPrice: 24000,
    currency: 'PKR',
    image: getImage('prodChiffonEmerald'),
    images: ['prodChiffonEmerald', 'catLuxuryFormals', 'catFormals'],
    alt: 'Maria B Emerald Green Luxury Chiffon Suit',
    badge: '40% OFF',
    category: 'Formals',
    stitchingStatus: 'Stitched',
    fabric: 'Chiffon',
    color: 'Peacock/Emerald',
    colors: [
      { id: 'c-emerald', name: 'Emerald Green', code: '#065F46' },
      { id: 'c-teal', name: 'Dark Teal', code: '#008080' },
    ],
    sizes: [
      { size: 'Small', available: true, stock: 1 },
      { size: 'Medium', available: true, stock: 2 },
      { size: 'Large', available: false, stock: 0 },
      { size: 'X Large', available: false, stock: 0 },
    ],
    resellerName: 'Couture Vault Islamabad',
    resellerRating: 5.0,
    sellerStoreImageKey: 'storeAyesha',
    discountPercentage: 40,
    rating: 5.0,
    reviewCount: 31,
    collectionSlug: 'formals',
    description:
      'Heavily hand-embellished Maria B formal 3-piece suit on pure crinkle chiffon. Adorned with gota, pearls, kora and sequin embroidery over the bodice and sleeve cuff borders.\n\nComplete with raw silk under-slip, cigarette pants, and an embroidered organza dupatta.',
    reviews: [
      {
        id: 'rev-form-1-1',
        userName: 'Ayesha Chaudhry',
        rating: 5,
        date: 'Oct 08, 2025',
        comment:
          'Absolute showstopper for a wedding! The emerald shade is mesmerizing and hand-embroidery work is intact.',
        verifiedPurchase: true,
      },
    ],
  },
  {
    id: 'prod-form-2',
    title: 'Lilac Organza Embroidered Festive 3-Piece Formal Suit',
    brand: 'Bareeze',
    price: 16800,
    originalPrice: 28500,
    currency: 'PKR',
    image: getImage('prodOrganzaLilac'),
    images: ['prodOrganzaLilac', 'catLuxuryFormals', 'wornAndLoved4'],
    alt: 'Bareeze Lilac Organza Festive Suit',
    badge: '41% OFF',
    category: 'Formals',
    stitchingStatus: 'Stitched',
    fabric: 'Organza',
    color: 'Purple/Lilac',
    colors: [
      { id: 'c-lilac', name: 'Lilac Mauve', code: '#C8A2C8' },
      { id: 'c-lavender', name: 'Lavender Mist', code: '#E6E6FA' },
    ],
    sizes: [
      { size: 'Small', available: true, stock: 2 },
      { size: 'Medium', available: true, stock: 1 },
      { size: 'Large', available: false, stock: 0 },
      { size: 'X Large', available: false, stock: 0 },
    ],
    resellerName: 'Royal Threads Lahore',
    resellerRating: 4.9,
    sellerStoreImageKey: 'storeRoyal',
    discountPercentage: 41,
    rating: 4.9,
    reviewCount: 27,
    collectionSlug: 'formals',
    description:
      'Bareeze masterpiece featuring fine resham threadwork on sheer luxury organza. Accented with subtle silver tilla details that catch the evening light gracefully.',
    reviews: [
      {
        id: 'rev-form-2-1',
        userName: 'Maryam Siddiqui',
        rating: 5,
        date: 'Sep 15, 2025',
        comment: 'Exquisite needlework, Bareeze authenticity verified by my tailor.',
        verifiedPurchase: true,
      },
    ],
  },
  {
    id: 'prod-form-3',
    title: 'Peacock Raw Silk Hand-Worked Zardozi Formal Suit',
    brand: 'Sana Safinaz',
    price: 18500,
    originalPrice: 32000,
    currency: 'PKR',
    image: getImage('prodRawSilkPeacock'),
    images: ['prodRawSilkPeacock', 'prodRawSilkMaroon', 'wornAndLoved2'],
    alt: 'Sana Safinaz Peacock Raw Silk Formal',
    badge: '42% OFF',
    category: 'Formals',
    stitchingStatus: 'Stitched',
    fabric: 'Raw Silk',
    color: 'Peacock/Emerald',
    colors: [
      { id: 'c-peacock', name: 'Peacock Blue', code: '#0284C7' },
      { id: 'c-emerald', name: 'Emerald', code: '#065F46' },
    ],
    sizes: [
      { size: 'Small', available: true, stock: 1 },
      { size: 'Medium', available: true, stock: 3 },
      { size: 'Large', available: true, stock: 1 },
      { size: 'X Large', available: false, stock: 0 },
    ],
    resellerName: 'Karachi Couture Leftover Hub',
    resellerRating: 4.9,
    sellerStoreImageKey: 'storeZainab',
    discountPercentage: 42,
    rating: 4.9,
    reviewCount: 16,
    collectionSlug: 'formals',
    description:
      'Heavy 80g pure Pakistani raw silk suit in rich jewel tones with hand-sewn zardozi neckline, dabka highlights, and pure organza jacquard dupatta.',
    reviews: [
      {
        id: 'rev-form-3-1',
        userName: 'Farah Qureshi',
        rating: 5,
        date: 'Sep 01, 2025',
        comment: 'Rich pure raw silk fabric, luxury hand-feel. Superb leftover buy.',
        verifiedPurchase: true,
      },
    ],
  },
  {
    id: 'prod-form-4',
    title: 'Deep Maroon Velvet Heavy Embroidered Festive Suit',
    brand: 'Maria B',
    price: 15900,
    originalPrice: 26500,
    currency: 'PKR',
    image: getImage('prodRawSilkMaroon'),
    images: ['prodRawSilkMaroon', 'prodRawSilkPeacock', 'wornAndLoved6'],
    alt: 'Deep Maroon Embroidered Festive Suit',
    badge: '40% OFF',
    category: 'Formals',
    stitchingStatus: 'Stitched',
    fabric: 'Velvet',
    color: 'Red',
    colors: [
      { id: 'c-maroon', name: 'Deep Maroon', code: '#800000' },
      { id: 'c-burgundy', name: 'Burgundy Wine', code: '#800020' },
    ],
    sizes: [
      { size: 'Small', available: true, stock: 2 },
      { size: 'Medium', available: true, stock: 2 },
      { size: 'Large', available: false, stock: 0 },
      { size: 'X Large', available: false, stock: 0 },
    ],
    resellerName: 'Ayesha Luxury Hub',
    resellerRating: 4.8,
    sellerStoreImageKey: 'storeAyesha',
    discountPercentage: 40,
    rating: 4.8,
    reviewCount: 22,
    collectionSlug: 'formals',
    defect: 'Minor inner lining thread irregularity near hem, completely unnoticeable on wear.',
    description:
      'Winter festive luxury micro-velvet formal suit with golden antique tilla embroidery spanning the daman and chaak borders. Paired with an embroidered net dupatta.',
    reviews: [
      {
        id: 'rev-form-4-1',
        userName: 'Nadia Riaz',
        rating: 5,
        date: 'Aug 10, 2025',
        comment: 'Heavy plush velvet. The defect mentioned is practically invisible. Great bargain!',
        verifiedPurchase: true,
      },
    ],
  },

  // ==========================================
  // 4. Accessories Collection
  // ==========================================
  {
    id: 'prod-acc-1',
    title: 'Designer Handcrafted Embroidered Velvet Shawl',
    brand: 'Bareeze',
    price: 6500,
    originalPrice: 11000,
    currency: 'PKR',
    image: getImage('catAccessories'),
    images: ['catAccessories', 'catAccessoriesAlt'],
    alt: 'Bareeze Velvet Embroidered Shawl',
    badge: '41% OFF',
    category: 'Accessories',
    fabric: 'Velvet',
    color: 'Black',
    colors: [
      { id: 'c-blk', name: 'Black Velvet', code: '#18181B' },
      { id: 'c-gold', name: 'Antique Gold', code: '#D97706' },
    ],
    sizes: [{ size: 'Free Size (2.5m)', available: true, stock: 6 }],
    resellerName: 'Ayesha Luxury Hub',
    resellerRating: 4.9,
    sellerStoreImageKey: 'storeAyesha',
    discountPercentage: 41,
    rating: 4.9,
    reviewCount: 14,
    collectionSlug: 'accessories',
    description:
      'Lavish 2.5 meter pure micro-velvet shawl embroidered with traditional Mughal motifs across all four borders. Lined with silk kathan for warmth and luxury drape.',
    reviews: [
      {
        id: 'rev-acc-1-1',
        userName: 'Bushra Khan',
        rating: 5,
        date: 'Oct 04, 2025',
        comment: 'Heavy, royal look shawl. Completed my winter formal outfit beautifully.',
        verifiedPurchase: true,
      },
    ],
  },
  {
    id: 'prod-acc-2',
    title: 'Luxury Silk Digital Printed Dupatta with Gold Borders',
    brand: 'Khaadi',
    price: 2200,
    originalPrice: 3800,
    currency: 'PKR',
    image: getImage('catAccessoriesAlt'),
    images: ['catAccessoriesAlt', 'catAccessories'],
    alt: 'Khaadi Luxury Silk Printed Dupatta',
    badge: '42% OFF',
    category: 'Accessories',
    fabric: 'Silk',
    color: 'Gold',
    colors: [
      { id: 'c-gold', name: 'Metallic Gold', code: '#D97706' },
      { id: 'c-cream', name: 'Cream Ivory', code: '#FAF9F6' },
    ],
    sizes: [{ size: 'Free Size (2.5m)', available: true, stock: 8 }],
    resellerName: 'Pret Studio Lahore',
    resellerRating: 4.8,
    sellerStoreImageKey: 'storeRoyal',
    discountPercentage: 42,
    rating: 4.8,
    reviewCount: 37,
    collectionSlug: 'accessories',
    description:
      'Silky medium-weight digital printed dupatta with intricate geometric patterns and golden zari printed borders. Can be paired with plain unstitched or solid pret kurtis.',
    reviews: [
      {
        id: 'rev-acc-2-1',
        userName: 'Sadia Bilal',
        rating: 5,
        date: 'Sep 12, 2025',
        comment: 'Silky smooth feel and bright colors. Looks much more expensive than 2200.',
        verifiedPurchase: true,
      },
    ],
  },
  {
    id: 'prod-acc-3',
    title: 'Handcrafted Festive Metallic Clutch with Traditional Embroidery',
    brand: 'Ethnic',
    price: 3200,
    originalPrice: 5200,
    currency: 'PKR',
    image: getImage('catAccessories'),
    images: ['catAccessories', 'catAccessoriesAlt'],
    alt: 'Festive Metallic Embroidered Clutch',
    badge: '38% OFF',
    category: 'Accessories',
    fabric: 'Raw Silk',
    color: 'Gold',
    colors: [
      { id: 'c-gold', name: 'Antique Gold', code: '#D97706' },
      { id: 'c-silver', name: 'Silver Gota', code: '#E2E8F0' },
    ],
    sizes: [{ size: 'Standard Clutch', available: true, stock: 4 }],
    resellerName: 'Karachi Surplus Depot',
    resellerRating: 4.7,
    sellerStoreImageKey: 'storeZainab',
    discountPercentage: 38,
    rating: 4.7,
    reviewCount: 19,
    collectionSlug: 'accessories',
    description:
      'Rigid brass frame clutch with velvet inner lining, detachable metallic chain strap, and hand-embroidered dabka embellishments on both exterior sides.',
    reviews: [
      {
        id: 'rev-acc-3-1',
        userName: 'Zehra Javed',
        rating: 5,
        date: 'Aug 29, 2025',
        comment: 'Spacious enough for phone and lipstick. The clasp closure is sturdy.',
        verifiedPurchase: true,
      },
    ],
  },
];

/**
 * Look up a product by stable id
 */
export function getProduct(id: string): ProductItem | undefined {
  return PRODUCTS.find((product) => product.id === id);
}

/**
 * Filter static products by collection category
 */
export function getProductsForCollection(collectionCategory: string): ProductItem[] {
  return PRODUCTS.filter((product) =>
    matchesCollectionCategory(product.category, collectionCategory)
  );
}

/**
 * Re-export for collection backward-compatibility
 */
export const STATIC_COLLECTION_PRODUCTS = PRODUCTS;
