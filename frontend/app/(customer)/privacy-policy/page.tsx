import type { Metadata } from 'next';
import PrivacyPolicy from '@/components/customer/privacyPolicy/privacyPolicy';

export const metadata: Metadata = {
  title: 'Privacy Policy | Zebaish',
  description: 'Zebaish seller privacy policy outlining data collection, seller verification, commissions, and marketplace privacy practices.',
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}
