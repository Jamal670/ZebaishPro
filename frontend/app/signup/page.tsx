import type { Metadata } from 'next';
import CustSignUp from '@/components/auth/CustSignUp';

export const metadata: Metadata = {
  title: 'Customer Sign Up | Zebaish',
  description: 'Create your Zebaish customer account to access designer leftover stocks and boutique fashion.',
};

export default function SignupPage() {
  return <CustSignUp />;
}
