import type { Metadata } from 'next';
import About from '@/components/customer/about/About';

export const metadata: Metadata = {
  title: 'About Us | Zebaish',
  description: "Learn about Zebaish, Pakistan's premier designer leftover stock hub connecting buyers with authentic designer fashion and boutique partners.",
};

export default function AboutPage() {
  return <About />;
}
