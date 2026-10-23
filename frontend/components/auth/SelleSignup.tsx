'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import {
  Store,
  ArrowRight,
  CheckCircle2,
  User,
  Mail,
} from 'lucide-react';
import AuthField from './shared/AuthField';
import PasswordField from './shared/PasswordField';
import AuthNotice from './shared/AuthNotice';
import {
  validateRequired,
  validateEmail,
  validatePassword,
  validateSellerPhone,
  formatCnic,
  formatPhone,
} from './shared/authValidators';

export const SelleSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [shopName, setShopName] = useState('');
  const [cnic, setCnic] = useState('');
  const [phone, setPhone] = useState('+92 ');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPreviewNotice, setShowPreviewNotice] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const fullNameRef = useRef<HTMLInputElement>(null);
  const shopNameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const termsCheckboxRef = useRef<HTMLInputElement>(null);

  const validateAll = (): boolean => {
    const emailErr = validateEmail(email);
    const passErr = validatePassword(password, 6);
    const fnErr = validateRequired(fullName, 'Full Name');
    const shopErr = validateRequired(shopName, 'Business / Shop Name');
    const phoneErr = validateSellerPhone(phone);
    const termsErr = !agreedToTerms
      ? 'You must accept the Terms & Conditions and Privacy Policy.'
      : '';

    const newErrors: Record<string, string> = {};
    if (emailErr) newErrors.email = emailErr;
    if (passErr) newErrors.password = passErr;
    if (fnErr) newErrors.fullName = fnErr;
    if (shopErr) newErrors.shopName = shopErr;
    if (phoneErr) newErrors.phone = phoneErr;
    if (termsErr) newErrors.agreedToTerms = termsErr;

    setErrors(newErrors);

    if (emailErr) {
      emailRef.current?.focus();
      return false;
    }
    if (passErr) {
      passwordRef.current?.focus();
      return false;
    }
    if (fnErr) {
      fullNameRef.current?.focus();
      return false;
    }
    if (shopErr) {
      shopNameRef.current?.focus();
      return false;
    }
    if (phoneErr) {
      phoneRef.current?.focus();
      return false;
    }
    if (termsErr) {
      termsCheckboxRef.current?.focus();
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setShowPreviewNotice(false);

    if (!validateAll()) {
      setErrorMessage('Please review and correct the highlighted fields.');
      return;
    }

    // Form is valid. UI preview only — do not submit to backend
    // TODO: connect to auth later
    setShowPreviewNotice(true);
  };

  return (
    <div className="bg-stone-50 min-h-screen text-stone-900 pt-16 sm:pt-20 md:pt-24 pb-20 sm:pb-28 animate-fade-in w-full font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8">
        {/* Header Hero Banner */}
        <div className="bg-stone-900 text-white rounded-lg p-6 sm:p-8 mb-8 text-center shadow-lg relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-amber-400 block mb-2">
            ZEBAISH SELLER PARTNERS
          </span>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight font-brand-serif mb-3">
            Monetize Brand Surplus & Factory Leftovers
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 max-w-xl mx-auto leading-relaxed">
            Join 350+ verified Pakistani boutique sellers liquidating authentic Khaadi, Sapphire,
            Maria B, and Gul Ahmed leftover stock nationwide.
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 text-xs text-stone-300">
            <div className="flex items-center justify-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Zero Listing Monthly Fee</span>
            </div>
            <div className="flex items-center justify-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Bank / EasyPaisa Payouts</span>
            </div>
            <div className="flex items-center justify-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Automated TCS / Leopards Pickup</span>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white border border-stone-200 rounded-lg p-6 sm:p-10 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-stone-200 gap-2">
            <h2 className="text-base font-bold uppercase tracking-wider text-stone-900 flex items-center space-x-2">
              <Store className="w-5 h-5 text-amber-600 shrink-0" />
              <span>Register as Seller</span>
            </h2>
            <span className="text-xs text-stone-500">
              Already a seller?{' '}
              {/* Note: There is no dedicated seller login page in this project. Linking to /login as customer/seller shared entry */}
              <Link
                href="/login"
                className="font-bold text-stone-900 underline hover:text-black cursor-pointer ml-1"
              >
                Log In Here
              </Link>
            </span>
          </div>

          <AuthNotice
            errorMessage={errorMessage}
            showPreviewNotice={showPreviewNotice}
          />

          <form onSubmit={handleSubmit} className="space-y-6 text-xs" noValidate>
            {/* 1. Account Credentials */}
            <div className="space-y-4">
              <h3 className="font-bold text-stone-900 uppercase tracking-wider text-xs border-b border-stone-100 pb-2 flex items-center space-x-2">
                <Mail className="w-4 h-4 text-stone-500" />
                <span>1. Account Credentials</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <AuthField
                    // ref={emailRef}
                    id="seller-email"
                    label="Email"
                    requiredAsterisk
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="reseller@example.com"
                    value={email}
                    error={errors.email}
                    icon={<Mail className="w-4 h-4" />}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                    }}
                    onBlur={() => {
                      const err = validateEmail(email);
                      setErrors((prev) => ({ ...prev, email: err }));
                    }}
                  />
                </div>

                <div>
                  <PasswordField
                    // ref={passwordRef}
                    id="seller-password"
                    label="Password"
                    requiredAsterisk
                    autoComplete="new-password"
                    placeholder="At least 6 characters"
                    value={password}
                    error={errors.password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
                    }}
                    onBlur={() => {
                      const err = validatePassword(password, 6);
                      setErrors((prev) => ({ ...prev, password: err }));
                    }}
                  />
                </div>
              </div>
            </div>

            {/* 2. Personal & Business Details */}
            <div className="space-y-4 pt-2">
              <h3 className="font-bold text-stone-900 uppercase tracking-wider text-xs border-b border-stone-100 pb-2 flex items-center space-x-2">
                <User className="w-4 h-4 text-stone-500" />
                <span>2. Personal & Business Details</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <AuthField
                    // ref={fullNameRef}
                    id="seller-full-name"
                    label="Full Name"
                    requiredAsterisk
                    type="text"
                    autoComplete="name"
                    placeholder="Ali Raza"
                    value={fullName}
                    error={errors.fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: '' }));
                    }}
                    onBlur={() => {
                      const err = validateRequired(fullName, 'Full Name');
                      setErrors((prev) => ({ ...prev, fullName: err }));
                    }}
                  />
                </div>

                <div>
                  <AuthField
                    // ref={shopNameRef}
                    id="seller-shop-name"
                    label="Business / Shop Name"
                    requiredAsterisk
                    type="text"
                    placeholder="The Clothing Studio"
                    value={shopName}
                    error={errors.shopName}
                    onChange={(e) => {
                      setShopName(e.target.value);
                      if (errors.shopName) setErrors((prev) => ({ ...prev, shopName: '' }));
                    }}
                    onBlur={() => {
                      const err = validateRequired(shopName, 'Business / Shop Name');
                      setErrors((prev) => ({ ...prev, shopName: err }));
                    }}
                  />
                </div>

                <div>
                  <AuthField
                    id="seller-cnic"
                    label="CNIC / National ID Number"
                    type="text"
                    inputMode="numeric"
                    maxLength={15}
                    placeholder="35202-XXXXXXX-X"
                    value={cnic}
                    error={errors.cnic}
                    onChange={(e) => {
                      const formatted = formatCnic(e.target.value);
                      setCnic(formatted);
                    }}
                  />
                </div>

                <div>
                  <AuthField
                    // ref={phoneRef}
                    id="seller-phone"
                    label="Phone Number"
                    requiredAsterisk
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="+92 300 1234567"
                    value={phone}
                    error={errors.phone}
                    onChange={(e) => {
                      const formatted = formatPhone(e.target.value);
                      setPhone(formatted);
                      if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                    }}
                    onBlur={() => {
                      const err = validateSellerPhone(phone);
                      setErrors((prev) => ({ ...prev, phone: err }));
                    }}
                  />
                </div>

                <div>
                  <AuthField
                    id="seller-city"
                    label="City (Optional)"
                    type="text"
                    autoComplete="address-level2"
                    placeholder="Lahore"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>

                <div>
                  <AuthField
                    id="seller-address"
                    label="Warehouse / Shop Address (Optional)"
                    type="text"
                    autoComplete="street-address"
                    placeholder="Shop #12, Liberty Market, Gulberg III"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Terms & Policies Checkbox */}
            <div className="pt-2">
              <label className="flex items-start space-x-2.5 cursor-pointer text-stone-700 select-none">
                <input
                  ref={termsCheckboxRef}
                  id="seller-terms"
                  type="checkbox"
                  checked={agreedToTerms}
                  aria-invalid={Boolean(errors.agreedToTerms)}
                  aria-describedby={errors.agreedToTerms ? 'seller-terms-error' : undefined}
                  onChange={(e) => {
                    setAgreedToTerms(e.target.checked);
                    if (errors.agreedToTerms) setErrors((prev) => ({ ...prev, agreedToTerms: '' }));
                  }}
                  className="mt-0.5 w-4 h-4 accent-stone-900 rounded cursor-pointer shrink-0"
                />
                <span className="text-xs leading-relaxed">
                  I accept the{' '}
                  <Link
                    href="/terms-and-conditions"
                    target="_blank"
                    className="text-amber-800 hover:text-stone-900 font-semibold underline transition-colors"
                  >
                    Terms &amp; Conditions
                  </Link>{' '}
                  and{' '}
                  <Link
                    href="/privacy-policy"
                    target="_blank"
                    className="text-amber-800 hover:text-stone-900 font-semibold underline transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
              {errors.agreedToTerms && (
                <p id="seller-terms-error" className="text-xs text-red-600 font-medium mt-1 ml-6">
                  {errors.agreedToTerms}
                </p>
              )}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-4 bg-stone-900 hover:bg-black text-white text-xs font-bold uppercase tracking-widest rounded-xs shadow-md flex items-center justify-center space-x-2 transition-all cursor-pointer active:scale-[0.99]"
              >
                <span>REGISTER NOW</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SelleSignup;
