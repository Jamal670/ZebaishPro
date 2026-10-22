import { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCollection } from '@/utils/collections';
import CollectionPage from '@/components/customer/collection/CollectionPage';
import { getProductsForCollection } from './collectionProducts';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);

  if (!collection) {
    return {
      title: 'Collection Not Found | ZEBAISH',
      description: 'The requested luxury collection could not be found.',
    };
  }

  return {
    title: `${collection.title} Collection | ZEBAISH Official Store`,
    description: collection.description,
  };
}

async function CollectionViewContainer({ params }: PageProps) {
  const { slug } = await params;
  const collection = getCollection(slug);

  if (!collection) {
    notFound();
  }

  const products = getProductsForCollection(collection.category);

  return (
    <CollectionPage
      collection={collection}
      initialProducts={products}
    />
  );
}

export default function CollectionRoutePage({ params }: PageProps) {
  return (
    <Suspense fallback={null}>
      <CollectionViewContainer params={params} />
    </Suspense>
  );
}
