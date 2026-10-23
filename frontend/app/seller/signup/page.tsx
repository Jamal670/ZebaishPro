import type { Metadata } from 'next';
import SelleSignup from '@/components/auth/SelleSignup';

export const metadata: Metadata = {
  title: 'Seller Registration | Zebaish Marketplace',
  description: 'Register as an official boutique seller partner on Zebaish and liquidate authentic brand surplus stock.',
};

export default function SellerSignupPage() {
  return <SelleSignup />;
}
