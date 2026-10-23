'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Lock, ArrowRight, CheckCircle2, KeyRound } from 'lucide-react';
import PasswordField from './shared/PasswordField';
import AuthNotice from './shared/AuthNotice';
import { validatePassword, validateConfirmPassword } from './shared/authValidators';

export const UpdatePassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPreviewNotice, setShowPreviewNotice] = useState(false);

  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmRef = useRef<HTMLInputElement>(null);

  const validateAll = (): boolean => {
    const pErr = validatePassword(password, 6);
    const cErr = validateConfirmPassword(confirmPassword, password);

    const newErrors: { password?: string; confirmPassword?: string } = {};
    if (pErr) newErrors.password = pErr;
    if (cErr) newErrors.confirmPassword = cErr;

    setErrors(newErrors);

    if (pErr) {
      passwordRef.current?.focus();
      return false;
    }
    if (cErr) {
      confirmRef.current?.focus();
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setShowPreviewNotice(false);

    if (!validateAll()) {
      setErrorMessage('Please fix the errors below before proceeding.');
      return;
    }

    // Form is valid. UI preview only — do not update password or navigate
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
            Set Your New Password
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 max-w-xl mx-auto leading-relaxed">
            Please enter your new password below to secure your seller account.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-6 text-xs text-stone-300">
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Enhanced Account Security</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Instant Dashboard Access</span>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white border border-stone-200 rounded-lg p-6 sm:p-10 shadow-sm max-w-2xl mx-auto">
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-stone-200">
            <h2 className="text-xs sm:text-sm lg:text-base font-bold uppercase tracking-wider text-stone-900 flex items-center space-x-2">
              <KeyRound className="w-5 h-5 text-amber-600" />
              <span>Update Password</span>
            </h2>
            <span className="text-xs text-stone-500">
              <Link
                href="/login"
                className="font-bold text-stone-900 underline hover:text-black cursor-pointer"
              >
                Back to Login
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
                <Lock className="w-4 h-4 text-stone-500" />
                <span>New Credentials</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <PasswordField
                    // ref={passwordRef}
                    id="update-new-password"
                    label="New Password"
                    requiredAsterisk
                    autoComplete="new-password"
                    placeholder="Min 6 characters"
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

                <div>
                  <PasswordField
                    // ref={confirmRef}
                    id="update-confirm-password"
                    label="Confirm New Password"
                    requiredAsterisk
                    autoComplete="new-password"
                    placeholder="Re-enter new password"
                    value={confirmPassword}
                    error={errors.confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: '' }));
                    }}
                    onBlur={() => {
                      const err = validateConfirmPassword(confirmPassword, password);
                      setErrors((prev) => ({ ...prev, confirmPassword: err }));
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 bg-stone-900 hover:bg-black text-white text-xs font-bold uppercase tracking-widest rounded-xs shadow-md flex items-center justify-center space-x-2 transition-all cursor-pointer active:scale-[0.99]"
              >
                <span>UPDATE PASSWORD</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
