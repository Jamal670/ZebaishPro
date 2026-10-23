// utils/imageLoader.ts
// Typed registry mapping of all local images in public/ used by migrated components

export const IMAGES = {
  // Brand
  logo: '/logo.png',

  // Hero Carousel Slides
  heroSlide1: '/hero_zibaish_1784666632437.jpg',
  heroSlide2: '/hero_nafasat_1784666696363.jpg',
  heroSlide3: '/hero_riwayati_husn_1784666650670.jpg',
  heroSlide4: '/hero_zibaish_banner_1784666341674.jpg',
  heroSlide5: '/hero_classic_1784666682016.jpg',

  // New Arrivals Categories
  catUnstitched: '/cat_unstitched_lawn_1784668900458.jpg',
  catReadyToWear: '/prod_pret_kurti_1784669264016.jpg',
  catFormals: '/callout_rtw_1784669029753.jpg',
  catAccessories: '/back.png',

  // Most Trending Now (per requirement: every image in this section uses only callout_unstitched_1784669045779.jpg)
  mostTrending: '/callout_unstitched_1784669045779.jpg',

  // Couture Section (Top Stores)
  coutureShowroom: '/top_stores_showroom_1784731726898.jpg',
  storeAyesha: '/store_ayesha_lahore_1784731969228.jpg',
  storeZainab: '/store_zainab_karachi_1784731993765.jpg',
  storeRoyal: '/store_royal_threads_1784732014623.jpg',
  storeVault: '/store_lawn_vault_1784732035582.jpg',
  campaignMastaniBg: '/campaign_mastani_bg_1784669097184.jpg',
  sellerBoutiquePartner: '/seller_boutique_partner_1784730609664.jpg',

  // Worn and Loved (UGC photos)
  wornAndLoved1: '/callout_unstitched_1784669045779.jpg',
  wornAndLoved2: '/prod_rawsilk_peacock_1784669181500.jpg',
  wornAndLoved3: '/prod_lawn_crimson_1784669131773.jpg',
  wornAndLoved4: '/prod_organza_lilac_1784669279327.jpg',
  wornAndLoved5: '/couture_merjan_1784669229241.jpg',
  wornAndLoved6: '/prod_rawsilk_maroon_1784669163942.jpg',

  // Product Catalog & Collection Products
  prodChiffonEmerald: '/prod_chiffon_emerald_1784669315334.jpg',
  prodIndigoKurti: '/prod_indigo_kurti_1784669297726.jpg',
  prodLawnPink: '/prod_lawn_pink_1784669148389.jpg',
  prodLawnCrimson: '/prod_lawn_crimson_1784669131773.jpg',
  prodRawSilkMaroon: '/prod_rawsilk_maroon_1784669163942.jpg',
  prodRawSilkPeacock: '/prod_rawsilk_peacock_1784669181500.jpg',
  prodOrganzaLilac: '/prod_organza_lilac_1784669279327.jpg',
  prodPretKurti: '/prod_pret_kurti_1784669264016.jpg',
  catAccessoriesAlt: '/cat_accessories_1784669010361.jpg',
  catLuxuryFormals: '/cat_luxury_formals_1784668924057.jpg',
  catLuxuryPret: '/cat_luxury_pret_1784668945182.jpg',
  catStitchedSuit: '/cat_stitched_suit_1784668961334.jpg',
} as const;

export type ImageKey = keyof typeof IMAGES;

export const getImage = (key: ImageKey): string => IMAGES[key];

export default getImage;
