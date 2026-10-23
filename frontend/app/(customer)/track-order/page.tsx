import type { Metadata } from 'next';
import TrackYourOrder from '@/components/customer/trackYourOrder/trackYourOrder';

export const metadata: Metadata = {
  title: 'Track Your Order | Zebaish',
  description: 'Track the shipping status and real-time delivery milestones of your Zebaish order.',
};

export default function TrackOrderPage() {
  return <TrackYourOrder />;
}
