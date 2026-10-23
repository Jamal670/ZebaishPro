import React from 'react';
import {
  FileText,
  Store,
  UserCheck,
  ShieldCheck,
  CreditCard,
  UserX,
  Clock,
  Lock,
  Database,
  Mail,
  AlertTriangle,
} from 'lucide-react';
import { LegalPageLayout, LegalSection } from '@/components/customer/shared/legal/LegalPageLayout';

export const PrivacyPolicy: React.FC = () => {
  const sections: LegalSection[] = [
    {
      id: 'information-we-collect',
      title: 'Information We Collect',
      icon: <FileText className="w-5 h-5" />,
      content: (
        <p>
          When you register and operate as a Seller on Zebaish, we may collect information necessary to create and manage your seller account. This may include your full name, email address, phone number, CNIC or identity information, city, address, shop name, store information, product information, order-related information, and other information required to provide seller-related services on the platform. We may also collect information about your account activity, product listings, order fulfillment, commission payments, and seller account status.
        </p>
      ),
    },
    {
      id: 'why-we-collect',
      title: 'Why We Collect Seller Information',
      icon: <Store className="w-5 h-5" />,
      content: (
        <p>
          We collect seller information to create and maintain your seller account, verify your identity, operate the seller platform, manage your product listings and orders, process and track seller commissions, communicate important account-related information, and maintain the security and reliability of the Zebaish marketplace. Your information may also be used to monitor seller activity and determine whether your account continues to meet Zebaish&apos;s seller requirements and operational policies.
        </p>
      ),
    },
    {
      id: 'cnic-verification',
      title: 'CNIC / Identity Verification',
      icon: <UserCheck className="w-5 h-5" />,
      content: (
        <p>
          Zebaish may collect and use your CNIC or other identity information for seller identity verification and account-related verification purposes. This information helps us confirm that the seller account belongs to a legitimate individual and helps prevent fraudulent, misleading, or unauthorized seller accounts. Identity information may also be used when necessary to maintain marketplace security and comply with applicable legal or operational requirements.
        </p>
      ),
    },
    {
      id: 'product-order-information',
      title: 'Product & Order Information',
      icon: <ShieldCheck className="w-5 h-5" />,
      content: (
        <p>
          As a Seller, information related to your products and orders may be collected and stored as part of operating your seller account. This may include product names, descriptions, prices, images, product status, order details, order status, shipping or fulfillment activity, cancellation information, refund-related information, and other information associated with your products and customer orders. This information is necessary to manage your listings, process orders, monitor fulfillment, and provide the marketplace services offered by Zebaish.
        </p>
      ),
    },
    {
      id: 'commission-payments',
      title: 'Commission & Seller Payments',
      icon: <CreditCard className="w-5 h-5" />,
      content: (
        <p>
          Zebaish calculates seller commissions on a monthly basis based on the applicable commission rules and the seller&apos;s eligible order activity during the relevant billing period. The monthly commission amount is calculated at the beginning of the applicable payment cycle, and sellers are required to complete their outstanding commission payment by the 5th day of the month. Sellers may receive reminders and payment notifications regarding outstanding commissions. If the required commission payment is not completed within the applicable payment period, Zebaish may restrict the seller&apos;s account, deactivate the seller&apos;s account, or apply other account restrictions in accordance with the platform&apos;s seller policies. Such restrictions may also affect the seller&apos;s ability to manage products and operate normally on the platform until the outstanding commission is resolved.
        </p>
      ),
    },
    {
      id: 'account-status-restrictions',
      title: 'Seller Account Status & Restrictions',
      icon: <UserX className="w-5 h-5" />,
      content: (
        <p>
          Your Zebaish seller account may have different statuses, including Active, Inactive, or Suspended, depending on your account activity and compliance with platform requirements. An account may be restricted or changed to Inactive status for reasons including unpaid commissions, failure to fulfill orders within the required timeframe, or other violations of applicable seller policies. When an account is restricted or made Inactive, certain seller functionality may be disabled, including the ability to add or modify products or perform other seller actions that require an Active account. The duration and conditions of a restriction may depend on the reason for the restriction and the applicable Zebaish policy.
        </p>
      ),
    },
    {
      id: 'pending-orders',
      title: 'Pending Orders & Seller Activity',
      icon: <Clock className="w-5 h-5" />,
      content: (
        <p>
          Zebaish expects sellers to process and ship newly received orders within the required timeframe. If a Seller fails to ship eligible pending orders within 3 days, the seller account may be restricted or changed to Inactive status in accordance with the platform&apos;s seller activity policy. This restriction is intended to encourage timely order fulfillment and protect customers from unnecessary delays. Sellers may be required to resolve their pending orders or meet the applicable requirements before their seller account can regain full access to seller functionality.
        </p>
      ),
    },
    {
      id: 'data-security',
      title: 'Seller Data Security',
      icon: <Lock className="w-5 h-5" />,
      content: (
        <p>
          Zebaish takes reasonable technical and organizational measures to protect seller information against unauthorized access, misuse, alteration, disclosure, or loss. Seller information is stored and processed using systems and security controls designed to protect account and marketplace data. However, no online system or method of electronic storage can be guaranteed to be completely secure, and sellers should also take reasonable steps to protect their account credentials and avoid sharing their login information with unauthorized individuals.
        </p>
      ),
    },
    {
      id: 'data-retention',
      title: 'Data Retention',
      icon: <Database className="w-5 h-5" />,
      content: (
        <p>
          Zebaish may retain seller information for as long as necessary to operate the seller account, maintain transaction and marketplace records, process commissions and payments, resolve disputes, maintain security, prevent fraud, comply with applicable legal or regulatory requirements, and fulfill legitimate business purposes. Certain information may therefore remain in our systems after a seller account becomes Inactive, Suspended, or is otherwise no longer actively used, where retention is reasonably necessary for these purposes.
        </p>
      ),
    },
    {
      id: 'emails-notifications',
      title: 'Emails & Notifications',
      icon: <Mail className="w-5 h-5" />,
      content: (
        <p>
          Zebaish may send sellers emails, notifications, or other account-related communications regarding their seller account and platform activity. These communications may include account verification messages, order-related notifications, commission calculations, payment reminders, payment deadlines, account restrictions, inactivity notices, suspension-related notifications, and other important seller communications. These notifications are intended to keep sellers informed about actions or requirements that may affect their seller account and access to the platform.
        </p>
      ),
    },
  ];

  return (
    <LegalPageLayout
      badgeIcon={<ShieldCheck className="w-4 h-4" />}
      badgeText="Platform Policy"
      title="Zebaish Seller Privacy Policy"
      subtitle="Essential information regarding data collection, seller account operations, verification, and platform security for Zebaish seller partners."
      lastUpdated="October 2025"
      noticeTitle="Important Notice for Sellers"
      noticeIcon={<AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />}
      noticeContent={
        <p>
          If you are registered as a Seller on the Zebaish platform, this Privacy Policy applies to you. It explains what information we collect from you, why we collect it, how it is used to operate your seller account, and how your seller activity and account status may be managed on the platform. By registering and using Zebaish as a Seller, you acknowledge and agree to the practices described in this Privacy Policy.
        </p>
      }
      sections={sections}
    />
  );
};

export default PrivacyPolicy;
