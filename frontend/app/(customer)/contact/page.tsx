import type { Metadata } from 'next';
import ContactUS from '@/components/customer/contactUs/ContactUS';

export const metadata: Metadata = {
  title: 'Contact Us | Zebaish',
  description: 'Get in touch with Zebaish customer support for order inquiries, boutique partnerships, and general assistance.',
};

export default function ContactPage() {
  return <ContactUS />;
}
