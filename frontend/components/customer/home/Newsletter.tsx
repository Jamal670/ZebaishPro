'use client';

import React, { useState } from 'react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="py-14 md:py-16 px-4 md:px-8 bg-white border-t border-stone-100">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-brand-serif text-2xl sm:text-3xl md:text-4xl font-normal text-stone-900 tracking-wide mb-2">
          Join our newsletter
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 font-light mb-8">
          We&apos;ll send you updates once per week.
        </p>

        <div className="max-w-xl mx-auto space-y-3">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:flex-1 px-4 py-3 text-xs sm:text-sm border border-stone-300 rounded-sm focus:outline-none focus:border-stone-900 text-stone-800 placeholder:text-stone-400"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-black hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors shrink-0 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>SUBSCRIBE</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
