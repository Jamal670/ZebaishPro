'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, CheckCircle2, KeyRound } from 'lucide-react';
import AuthField from './shared/AuthField';
import AuthNotice from './shared/AuthNotice';
import { validateEmail } from './shared/authValidators';

export const ForgetPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPreviewNotice, setShowPreviewNotice] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setShowPreviewNotice(false);

    const err = validateEmail(email);
    if (err) {
      setError(err);
      setErrorMessage('Please enter a valid email address.');
      emailRef.current?.focus();
      return;
    }

    // Form is valid. UI preview only — do not trigger reset email
    // TODO: connect to auth later
    setShowPreviewNotice(true);
  };

  return (
    <div className="bg-stone-50 min-h-screen text-stone-900 pt-16 sm:pt-20 md:pt-24 pb-20 sm:pb-28 animate-fade-in w-full font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8">
        {/* Header Banner */}
        <div className="bg-stone-900 text-white rounded-lg p-6 sm:p-8 mb-8 text-center shadow-lg relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-amber-400 block mb-2">
            ZEBAISH SELLER PORTAL
          </span>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight font-brand-serif mb-3">
            Reset Your Seller Password
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 max-w-xl mx-auto leading-relaxed">
            Enter your registered seller email address below to receive instant password reset instructions.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 sm:gap-6 text-xs text-stone-300">
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Zero Listing Monthly Fee</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Direct Bank / EasyPaisa Payouts</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Automated TCS / Leopards Pickup</span>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white border border-stone-200 rounded-lg p-6 sm:p-10 shadow-sm max-w-2xl mx-auto">
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-stone-200">
            <h2 className="text-xs sm:text-sm lg:text-base font-bold uppercase tracking-wider text-stone-900 flex items-center space-x-2">
              <KeyRound className="w-5 h-5 text-amber-600" />
              <span>Forgot Password</span>
            </h2>
            <span className="text-xs text-stone-500">
              Remember your password?{' '}
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
            <div className="space-y-4">
              <h3 className="font-bold text-stone-900 uppercase tracking-wider text-xs border-b border-stone-100 pb-2 flex items-center space-x-2">
                <Mail className="w-4 h-4 text-stone-500" />
                <span>Account Email</span>
              </h3>

              <div>
                <AuthField
                //   ref={emailRef}
                  id="forgot-email"
                  label="Email Address"
                  requiredAsterisk
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="reseller@example.com"
                  value={email}
                  error={error || undefined}
                  icon={<Mail className="w-4 h-4" />}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  onBlur={() => {
                    const err = validateEmail(email);
                    if (err) setError(err);
                  }}
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 bg-stone-900 hover:bg-black text-white text-xs font-bold uppercase tracking-widest rounded-xs shadow-md flex items-center justify-center space-x-2 transition-all cursor-pointer active:scale-[0.99]"
              >
                <span>SEND RESET LINK</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
