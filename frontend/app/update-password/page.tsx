import type { Metadata } from 'next';
import UpdatePassword from '@/components/auth/UpdatePassword';

export const metadata: Metadata = {
  title: 'Update Password | Zebaish',
  description: 'Set your new secure password for your Zebaish account.',
  robots: {
    index: false,
  },
};

export default function UpdatePasswordPage() {
  return <UpdatePassword />;
}
