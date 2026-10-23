'use client';

import React from 'react';
import { AlertCircle, Info } from 'lucide-react';
import { AUTH_PREVIEW_MESSAGE } from './authConstants';

export interface AuthNoticeProps {
  errorMessage?: string | null;
  showPreviewNotice?: boolean;
}

export const AuthNotice: React.FC<AuthNoticeProps> = ({
  errorMessage,
  showPreviewNotice,
}) => {
  return (
    <>
      {errorMessage && (
        <div
          role="alert"
          aria-live="assertive"
          className="mb-6 p-3.5 bg-red-50 border border-red-200 rounded-md flex items-center space-x-2.5 text-xs text-red-700 font-medium animate-shake"
        >
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {showPreviewNotice && !errorMessage && (
        <div
          role="status"
          aria-live="polite"
          className="mb-6 p-3.5 bg-amber-50 border border-amber-200 rounded-md flex items-center space-x-2.5 text-xs text-amber-900 font-medium"
        >
          <Info className="w-4 h-4 text-amber-700 shrink-0" />
          <span>{AUTH_PREVIEW_MESSAGE}</span>
        </div>
      )}
    </>
  );
};

export default AuthNotice;
