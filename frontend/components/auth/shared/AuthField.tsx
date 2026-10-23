'use client';

import React from 'react';

export interface AuthFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  requiredAsterisk?: boolean;
}

export const AuthField: React.FC<AuthFieldProps> = ({
  id,
  label,
  error,
  icon,
  requiredAsterisk,
  className = '',
  ...props
}) => {
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
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          className={`w-full px-4 py-3 ${icon ? 'pl-10' : ''} border text-xs sm:text-sm rounded-md focus:outline-none transition-colors ${
            error
              ? 'border-red-500 focus:border-red-600'
              : 'border-stone-300 focus:border-stone-900'
          } ${className}`}
          {...props}
        />
        {icon && (
          <div className="w-4 h-4 text-stone-400 absolute left-3 top-3.5 pointer-events-none flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>
      {error && (
        <p id={errorId} className="text-xs text-red-600 font-medium mt-1 ml-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default AuthField;
