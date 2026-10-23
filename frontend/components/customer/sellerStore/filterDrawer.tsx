'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

export type StoreFilters = {
  sort: 'asc' | 'desc' | null;
  department: string | null;
  subcategory: string | null;
};

export interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  value: StoreFilters;
  onApply: (next: StoreFilters) => void;
  subcategoryOptions: { value: string; label: string }[];
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  open,
  onClose,
  value,
  onApply,
  subcategoryOptions,
}) => {
  // 1. Draft state: initialized from value each time it opens
  const [draft, setDraft] = useState<StoreFilters>(value);

  useEffect(() => {
    if (open) {
      setDraft(value);
    }
  }, [open, value]);

  // 2. SSR portal mount guard
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // 3. Accessibility refs
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const lastActiveElementRef = useRef<HTMLElement | null>(null);

  // 4. Body scroll lock, focus trap, Escape key, and focus return
  useEffect(() => {
    if (!mounted) return;

    if (open) {
      // Remember trigger element to return focus on close
      lastActiveElementRef.current = document.activeElement as HTMLElement | null;

      // Lock body scroll while preserving previous overflow
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      // Move focus into dialog
      const timer = setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);

      // Keyboard event handler: Escape and Focus Trap
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          onClose();
          return;
        }

        if (e.key === 'Tab' && panelRef.current) {
          const focusableElements = panelRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          const focusable = Array.from(focusableElements).filter(
            (el) => !el.hasAttribute('disabled') && el.offsetParent !== null
          );

          if (focusable.length === 0) return;

          const firstElement = focusable[0];
          const lastElement = focusable[focusable.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstElement || document.activeElement === panelRef.current) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = previousOverflow;
        window.removeEventListener('keydown', handleKeyDown);
        clearTimeout(timer);
      };
    } else if (lastActiveElementRef.current) {
      // Return focus to the trigger element
      lastActiveElementRef.current.focus();
      lastActiveElementRef.current = null;
    }
  }, [open, mounted, onClose]);

  // Handler: Reset clears the draft only
  const handleReset = () => {
    setDraft({ sort: null, department: null, subcategory: null });
  };

  // Handler: Apply calls onApply(draft) and closes
  const handleApply = () => {
    onApply(draft);
    onClose();
  };

  // Handler: Toggle sort radio
  const handleSortClick = (sortType: 'asc' | 'desc') => {
    setDraft((prev) => ({
      ...prev,
      sort: prev.sort === sortType ? null : sortType,
    }));
  };

  // Handler: Toggle department radio
  const handleDepartmentClick = (dept: string) => {
    setDraft((prev) => ({
      ...prev,
      department: prev.department?.toLowerCase() === dept.toLowerCase() ? null : dept,
    }));
  };

  // Handler: Toggle subcategory radio
  const handleSubcategoryClick = (subcat: string) => {
    setDraft((prev) => ({
      ...prev,
      subcategory: prev.subcategory?.toLowerCase() === subcat.toLowerCase() ? null : subcat,
    }));
  };

  if (!mounted) return null;

  const hasActiveDraft = Boolean(draft.sort || draft.department || draft.subcategory);

  return createPortal(
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 motion-reduce:transition-none ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      aria-hidden={!open}
    >
      {/* Dimmed Backdrop - closing discards draft */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity cursor-pointer"
        aria-hidden="true"
      />

      {/* Slide-in Drawer Panel from Right */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="filter-drawer-title"
        tabIndex={-1}
        className={`fixed inset-y-0 right-0 w-[min(88vw,360px)] bg-white text-stone-900 shadow-2xl flex flex-col h-full z-10 transform transition-transform duration-300 ease-in-out motion-reduce:transition-none ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-3">
            <h2 id="filter-drawer-title" className="text-base font-bold uppercase tracking-wider text-stone-900">
              Filter
            </h2>
            {hasActiveDraft && (
              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-semibold text-stone-500 hover:text-stone-900 underline transition-colors cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="p-2 text-stone-500 hover:text-stone-900 rounded-full transition-colors cursor-pointer"
            aria-label="Close filters"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Filters Content (Edits draft copy only) */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 pb-8">
          {/* Section 1: Sort by Price (Two radios in one row: Low to high / High to low) */}
          <fieldset className="border-b border-stone-200 pb-5">
            <legend className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3">
              Sort by price
            </legend>
            <div className="flex items-center gap-4 flex-wrap">
              <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-stone-700 cursor-pointer py-1.5 px-1 hover:text-stone-900">
                <input
                  type="radio"
                  name="filter-price-sort"
                  value="asc"
                  checked={draft.sort === 'asc'}
                  onClick={() => handleSortClick('asc')}
                  onChange={() => setDraft((prev) => ({ ...prev, sort: 'asc' }))}
                  className="w-4 h-4 text-stone-900 accent-stone-900 border-stone-300 focus:ring-stone-900 cursor-pointer"
                />
                <span>Low to high</span>
              </label>
              <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-stone-700 cursor-pointer py-1.5 px-1 hover:text-stone-900">
                <input
                  type="radio"
                  name="filter-price-sort"
                  value="desc"
                  checked={draft.sort === 'desc'}
                  onClick={() => handleSortClick('desc')}
                  onChange={() => setDraft((prev) => ({ ...prev, sort: 'desc' }))}
                  className="w-4 h-4 text-stone-900 accent-stone-900 border-stone-300 focus:ring-stone-900 cursor-pointer"
                />
                <span>High to low</span>
              </label>
            </div>
          </fieldset>

          {/* Section 2: Department (Mens, Womens, Kids) */}
          <fieldset className="border-b border-stone-200 pb-5">
            <legend className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3">
              Department
            </legend>
            <div className="flex flex-col gap-2">
              {['Mens', 'Womens', 'Kids'].map((dept) => {
                const isChecked = draft.department?.toLowerCase() === dept.toLowerCase();
                return (
                  <label
                    key={dept}
                    className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-stone-700 cursor-pointer py-1 px-1 hover:text-stone-900"
                  >
                    <input
                      type="radio"
                      name="filter-department"
                      value={dept}
                      checked={isChecked}
                      onClick={() => handleDepartmentClick(dept)}
                      onChange={() => setDraft((prev) => ({ ...prev, department: dept }))}
                      className="w-4 h-4 text-stone-900 accent-stone-900 border-stone-300 focus:ring-stone-900 cursor-pointer"
                    />
                    <span>{dept}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* Section 3: Collection Type (Subcategories of active chip; hidden on 'All' or when empty) */}
          {subcategoryOptions && subcategoryOptions.length > 0 && (
            <fieldset className="border-b border-stone-200 pb-5">
              <legend className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3">
                Collection Type
              </legend>
              <div className="flex flex-col gap-2">
                {subcategoryOptions.map((opt) => {
                  const isChecked = draft.subcategory?.toLowerCase() === opt.value.toLowerCase();
                  return (
                    <label
                      key={opt.value}
                      className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-stone-700 cursor-pointer py-1 px-1 hover:text-stone-900"
                    >
                      <input
                        type="radio"
                        name="filter-subcategory"
                        value={opt.value}
                        checked={isChecked}
                        onClick={() => handleSubcategoryClick(opt.value)}
                        onChange={() => setDraft((prev) => ({ ...prev, subcategory: opt.value }))}
                        className="w-4 h-4 text-stone-900 accent-stone-900 border-stone-300 focus:ring-stone-900 cursor-pointer"
                      />
                      <span>{opt.label}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          )}
        </div>

        {/* Drawer Footer with Fixed Apply Button */}
        <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50">
          <button
            type="button"
            onClick={handleApply}
            className="w-full py-3 bg-stone-900 hover:bg-black text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer shadow-sm active:scale-[0.99] flex items-center justify-center gap-2"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default FilterDrawer;
