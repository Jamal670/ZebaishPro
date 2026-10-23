import type { Metadata } from 'next';
import ForgetPassword from '@/components/auth/forgetPassword';

export const metadata: Metadata = {
  title: 'Forgot Password | Zebaish',
  description: 'Request a password reset link to regain access to your Zebaish account.',
};

export default function ForgotPasswordPage() {
  return <ForgetPassword />;
}
