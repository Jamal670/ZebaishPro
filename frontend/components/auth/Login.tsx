'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Mail, Store, UserPlus } from 'lucide-react';
import AuthField from './shared/AuthField';
import PasswordField from './shared/PasswordField';
import SocialLoginButton from './shared/SocialLoginButton';
import AuthNotice from './shared/AuthNotice';
import { validateEmail, validatePassword } from './shared/authValidators';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPreviewNotice, setShowPreviewNotice] = useState(false);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const validateAll = (): boolean => {
    const emailErr = validateEmail(email);
    const passErr = validatePassword(password, 1); // login only requires password to be present

    const newErrors: { email?: string; password?: string } = {};
    if (emailErr) newErrors.email = emailErr;
    if (passErr) newErrors.password = passErr;

    setErrors(newErrors);

    if (emailErr) {
      emailInputRef.current?.focus();
      return false;
    }
    if (passErr) {
      passwordInputRef.current?.focus();
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setShowPreviewNotice(false);

    if (!validateAll()) {
      setErrorMessage('Please enter a valid email and password.');
      return;
    }

    // Form is valid. UI preview only — do not navigate or store credentials
    // TODO: connect to auth later
    setShowPreviewNotice(true);
  };

  return (
    <div className="bg-white min-h-screen text-stone-900 pt-16 sm:pt-20 md:pt-24 pb-20 sm:pb-28 animate-fade-in w-full font-sans">
      <div className="max-w-md mx-auto px-4 pt-6 sm:pt-10">
        <div className="w-full">
          <h1 className="text-xl sm:text-2xl font-light text-center text-stone-900 mb-6 tracking-wide">
            Login
          </h1>

          <AuthNotice
            errorMessage={errorMessage}
            showPreviewNotice={showPreviewNotice}
          />

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <AuthField
                // ref={emailInputRef}
                id="login-email"
                label="Email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="name@example.com"
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
              <div className="flex justify-between items-center mb-1">
                <span className="sr-only">Password Section</span>
              </div>
              <PasswordField
                // ref={passwordInputRef}
                id="login-password"
                label="Password"
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                error={errors.password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
                }}
                onBlur={() => {
                  const err = validatePassword(password, 1);
                  setErrors((prev) => ({ ...prev, password: err }));
                }}
              />
              <Link
                href="/forgot-password"
                className="block w-full text-right text-xs text-stone-500 hover:text-stone-900 hover:underline cursor-pointer mt-1.5"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-stone-950 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-md shadow-xs flex items-center justify-center space-x-2 transition-colors cursor-pointer mt-6 active:scale-[0.99]"
            >
              <span>Login</span>
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

          <div className="space-y-4">
            <SocialLoginButton label="Continue with Google" />

            {/* Separate Signup Navigation Options */}
            <div className="space-y-3 pt-1">
              <Link
                href="/signup"
                className="w-full py-3 border border-stone-300 rounded-md flex items-center justify-center space-x-3 text-xs sm:text-sm font-bold text-stone-800 hover:bg-stone-50 transition-colors cursor-pointer"
              >
                <UserPlus className="w-5 h-5 text-stone-700" />
                <span>Sign Up as Customer</span>
              </Link>

              <Link
                href="/seller/signup"
                className="w-full py-3 bg-amber-400 hover:bg-amber-300 border border-amber-500 text-stone-950 rounded-md flex items-center justify-center space-x-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
              >
                <Store className="w-5 h-5 text-stone-950" />
                <span>Become a Seller</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
