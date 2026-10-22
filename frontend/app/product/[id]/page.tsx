import { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProduct, PRODUCTS } from '@/utils/products';
import ProductDetails from '@/components/customer/productDetail/ProductDetails';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);

  if (!product) {
    return {
      title: 'Product Not Found | ZEBAISH',
      description: 'The requested luxury designer product could not be found.',
    };
  }

  return {
    title: `${product.title} | ${product.brand} | ZEBAISH Official Store`,
    description:
      product.description ||
      `Authentic ${product.brand} factory surplus luxury designer suit on ZEBAISH.`,
  };
}

export function generateStaticParams() {
  return PRODUCTS.map((item) => ({
    id: item.id,
  }));
}

async function ProductDetailsContainer({ params }: PageProps) {
  const { id } = await params;
  const product = getProduct(id);

  if (!product) {
    notFound();
  }

  return <ProductDetails key={product.id} product={product} />;
}

export default function ProductDetailPage({ params }: PageProps) {
  return (
    <Suspense fallback={null}>
      <ProductDetailsContainer params={params} />
    </Suspense>
  );
}
