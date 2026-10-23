'use client';

import React, { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

export interface PasswordFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  id: string;
  label?: string;
  error?: string;
  requiredAsterisk?: boolean;
  autoComplete?: 'current-password' | 'new-password';
}

export const PasswordField: React.FC<PasswordFieldProps> = ({
  id,
  label = 'Password',
  error,
  requiredAsterisk,
  autoComplete = 'current-password',
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-xs font-semibold text-stone-700 mb-1">
          {label} {requiredAsterisk && <span className="text-red-600">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          className={`w-full px-4 py-3 pl-10 pr-10 border text-xs sm:text-sm rounded-md focus:outline-none transition-colors ${
            error
              ? 'border-red-500 focus:border-red-600'
              : 'border-stone-300 focus:border-stone-900'
          } ${className}`}
          {...props}
        />
        <div className="w-4 h-4 text-stone-400 absolute left-3 top-3.5 pointer-events-none flex items-center justify-center">
          <Lock className="w-4 h-4" />
        </div>
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-pressed={showPassword}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          className="absolute right-3 top-3.5 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
        >
          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
      {error && (
        <p id={errorId} className="text-xs text-red-600 font-medium mt-1 ml-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default PasswordField;
