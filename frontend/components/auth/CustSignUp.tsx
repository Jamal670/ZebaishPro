'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import AuthField from './shared/AuthField';
import PasswordField from './shared/PasswordField';
import SocialLoginButton from './shared/SocialLoginButton';
import AuthNotice from './shared/AuthNotice';
import {
  validateRequired,
  validateEmail,
  validatePassword,
  validateCustomerPhone,
} from './shared/authValidators';

export const CustSignUp: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPreviewNotice, setShowPreviewNotice] = useState(false);

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const validateAll = (): boolean => {
    const fnErr = validateRequired(firstName, 'First name');
    const lnErr = validateRequired(lastName, 'Last name');
    const phoneErr = validateCustomerPhone(phoneNo);
    const emailErr = validateEmail(email);
    const passErr = validatePassword(password, 6);

    const newErrors: Record<string, string> = {};
    if (fnErr) newErrors.firstName = fnErr;
    if (lnErr) newErrors.lastName = lnErr;
    if (phoneErr) newErrors.phoneNo = phoneErr;
    if (emailErr) newErrors.email = emailErr;
    if (passErr) newErrors.password = passErr;

    setErrors(newErrors);

    if (fnErr) {
      firstNameRef.current?.focus();
      return false;
    }
    if (lnErr) {
      lastNameRef.current?.focus();
      return false;
    }
    if (phoneErr) {
      phoneRef.current?.focus();
      return false;
    }
    if (emailErr) {
      emailRef.current?.focus();
      return false;
    }
    if (passErr) {
      passwordRef.current?.focus();
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setShowPreviewNotice(false);

    if (!validateAll()) {
      setErrorMessage('Please fix the errors before creating your account.');
      return;
    }

    // Form is valid. UI preview only — do not create account or navigate
    // TODO: connect to auth later
    setShowPreviewNotice(true);
  };

  return (
    <div className="bg-white min-h-screen text-stone-900 pt-16 sm:pt-20 md:pt-24 pb-20 sm:pb-28 animate-fade-in w-full font-sans">
      <div className="max-w-md mx-auto px-4 pt-6 sm:pt-10">
        <div className="w-full">
          <h1 className="text-xl sm:text-2xl font-light text-center text-stone-900 mb-8 tracking-wide">
            Create account
          </h1>

          <AuthNotice
            errorMessage={errorMessage}
            showPreviewNotice={showPreviewNotice}
          />

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <AuthField
                // ref={firstNameRef}
                id="signup-first-name"
                type="text"
                autoComplete="given-name"
                placeholder="First name"
                value={firstName}
                error={errors.firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  if (errors.firstName) setErrors((prev) => ({ ...prev, firstName: '' }));
                }}
                onBlur={() => {
                  const err = validateRequired(firstName, 'First name');
                  setErrors((prev) => ({ ...prev, firstName: err }));
                }}
              />
            </div>

            <div>
              <AuthField
                // ref={lastNameRef}
                id="signup-last-name"
                type="text"
                autoComplete="family-name"
                placeholder="Last name"
                value={lastName}
                error={errors.lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  if (errors.lastName) setErrors((prev) => ({ ...prev, lastName: '' }));
                }}
                onBlur={() => {
                  const err = validateRequired(lastName, 'Last name');
                  setErrors((prev) => ({ ...prev, lastName: err }));
                }}
              />
            </div>

            <div>
              <AuthField
                // ref={phoneRef}
                id="signup-phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="Phone Number (+923001234567)"
                value={phoneNo}
                error={errors.phoneNo}
                onChange={(e) => {
                  setPhoneNo(e.target.value);
                  if (errors.phoneNo) setErrors((prev) => ({ ...prev, phoneNo: '' }));
                }}
                onBlur={() => {
                  const err = validateCustomerPhone(phoneNo);
                  setErrors((prev) => ({ ...prev, phoneNo: err }));
                }}
              />
            </div>

            <div>
              <AuthField
                // ref={emailRef}
                id="signup-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="Email"
                value={email}
                error={errors.email}
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
                id="signup-password"
                label=""
                autoComplete="new-password"
                placeholder="Password"
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

            <button
              type="submit"
              className="w-full py-3.5 bg-stone-950 hover:bg-black text-white text-sm font-semibold rounded-md shadow-xs flex items-center justify-center space-x-2 transition-colors cursor-pointer mt-6 active:scale-[0.99]"
            >
              <span>Create</span>
            </button>
          </form>

          {/* Social Divider */}
          <div className="relative my-8 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-200" />
            </div>
            <span className="relative bg-white px-3 text-xs text-stone-400 font-medium uppercase tracking-wider">
              OR
            </span>
          </div>

          <div className="space-y-3">
            <SocialLoginButton label="Continue with Google" />
          </div>

          <div className="mt-8 text-center text-xs text-stone-600">
            <span>Already have an account? </span>
            <Link
              href="/login"
              className="font-bold text-stone-900 underline hover:text-black ml-1 cursor-pointer"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustSignUp;
