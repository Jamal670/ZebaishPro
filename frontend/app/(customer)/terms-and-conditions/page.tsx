import type { Metadata } from 'next';
import TermAndCondition from '@/components/customer/termAndCondition/TermAndCondition';

export const metadata: Metadata = {
  title: 'Terms and Conditions | Zebaish',
  description: 'Terms and conditions, buyer policies, and seller guidelines for using the Zebaish marketplace platform.',
};

export default function TermsAndConditionsPage() {
  return <TermAndCondition />;
}
