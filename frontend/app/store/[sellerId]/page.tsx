import { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SELLERS, getSellerBySlug, getProductsForSeller } from '@/utils/products';
import SellerStore from '@/components/customer/sellerStore/SellerStore';

interface PageProps {
  params: Promise<{
    sellerId: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { sellerId } = await params;
  const seller = getSellerBySlug(sellerId);

  if (!seller) {
    return {
      title: 'Store Not Found | ZEBAISH',
      description: 'The requested verified reseller storefront could not be found.',
    };
  }

  return {
    title: `${seller.name} | Verified Reseller Storefront | ZEBAISH Official Store`,
    description: seller.description,
  };
}

export function generateStaticParams() {
  return SELLERS.map((seller) => ({
    sellerId: seller.slug,
  }));
}

async function SellerStoreContainer({ params }: PageProps) {
  const { sellerId } = await params;
  const seller = getSellerBySlug(sellerId);

  if (!seller) {
    notFound();
  }

  const sellerProducts = getProductsForSeller(seller.slug);

  return (
    <SellerStore
      key={seller.slug}
      seller={seller}
      products={sellerProducts}
    />
  );
}

export default function SellerStoreRoutePage({ params }: PageProps) {
  return (
    <Suspense fallback={null}>
      <SellerStoreContainer params={params} />
    </Suspense>
  );
}
