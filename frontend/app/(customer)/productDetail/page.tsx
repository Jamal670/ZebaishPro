import { redirect } from 'next/navigation';
import { PRODUCTS } from '@/utils/products';

export default function ProductDetailRedirectPage() {
  const defaultProduct = PRODUCTS[0];
  const targetId = defaultProduct ? defaultProduct.id : 'prod-unst-1';
  redirect(`/product/${targetId}`);
}
