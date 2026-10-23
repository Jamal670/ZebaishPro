import type { Metadata } from 'next';
import Login from '@/components/auth/Login';

export const metadata: Metadata = {
  title: 'Customer Login | Zebaish',
  description: 'Log in to your Zebaish account to track orders, manage your wishlist, and checkout smoothly.',
};

export default function LoginPage() {
  return <Login />;
}
