'use client';

import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, ChevronRight, Sparkles } from 'lucide-react';

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MegaCategory {
  id: string;
  title: string;
  items: string[];
}

const MEGA_MENU_CATEGORIES: MegaCategory[] = [
  {
    id: 'unstitched',
    title: 'UNSTITCHED',
    items: [
      '3 Piece Lawn',
      '2 Piece Lawn',
      '1 Piece / Shirt',
      'Chiffon Suits',
      'Linen Suits',
      'Khaddar Suits',
      'Cotton Suits',
      'Cambric Suits',
      'Printed Unstitched',
      'Embroidered Unstitched',
      'Digital Printed',
      'Jacquard / Silk',
    ],
  },
  {
    id: 'ready-to-wear',
    title: 'READY TO WEAR',
    items: [
      'Printed Kurtis',
      'Embroidered Kurtis',
      '2 Piece Pret',
      '3 Piece Pret',
      'Luxury Pret',
      'Velvet Pret',
      'Casual Pret',
      'Office / Workwear',
      'Co-Ord Sets',
      'Long Shirts',
      'Trousers & Pants',
    ],
  },
  {
    id: 'formals',
    title: 'FORMALS',
    items: [
      'Chiffon Formals',
      'Organza Dupatta Suit',
      'Embroidered Formal',
      'Luxury Formal',
      'Party Wear',
      'Wedding Guest',
      'Silk Formal',
      'Velvet Formal',
      'Long Frocks',
      'Gharara / Sharara',
      'Maxi',
      'Peplum Suits',
    ],
  },
  {
    id: 'bridal',
    title: 'BRIDAL WEAR (Coming Soon)',
    items: [
      'Heavy Velvet',
      'Maxi & Sharara',
      'Bridal Lehenga',
      'Bridal Gharara',
      'Bridal Sharara',
      'Bridal Maxi',
      'Pishwas',
      'Nikah Dresses',
      'Nikkah / Walima',
      'Mehndi Dresses',
      'Barat Dresses',
      'Reception / Walima',
      'Bridal Separates',
    ],
  },
  {
    id: 'accessories',
    title: 'ACCESSORIES (Coming Soon)',
    items: [
      'Bags',
      'Jewellery',
      'Bangles',
      'Clutches',
      'Handbags',
      'Wallets',
      'Scarves / Stoles',
      'Hair Accessories',
      'Bridal Jewellery',
      'Artificial Jewellery',
      'Rings',
      'Earrings',
      'Necklaces',
      'Bracelets',
    ],
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleAccordion = (id: string) => {
    setOpenAccordion((prev) => (prev === id ? null : id));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in" role="dialog" aria-modal="true">
      {/* Backdrop with Blur */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity cursor-pointer"
        onClick={onClose}
        aria-label="Close sidebar backdrop"
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white text-stone-900 shadow-2xl flex flex-col h-full transform transition-transform duration-300 ease-in-out border-r border-stone-200">
          {/* Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center space-x-2">
              <span className="font-script text-3xl font-normal text-stone-900">
                Zebaish
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-200 rounded-full transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Accordion Sections */}
          <div className="flex-1 overflow-y-auto px-5 py-4 divide-y divide-stone-100">
            {/* Quick Links */}
            <div className="pb-4 mb-2 flex items-center space-x-2 overflow-x-auto no-scrollbar text-xs font-semibold uppercase tracking-wider">
              <button
                type="button"
                className="px-3 py-1.5 bg-stone-900 text-white rounded-xs shrink-0 hover:bg-stone-800 transition-colors flex items-center space-x-1 cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>NEW ARRIVALS</span>
              </button>
              <button
                type="button"
                className="px-3 py-1.5 bg-red-50 text-red-700 hover:bg-red-100 font-bold rounded-xs shrink-0 transition-colors cursor-pointer"
              >
                SALE
              </button>
            </div>

            {/* Category Accordions */}
            {MEGA_MENU_CATEGORIES.map((cat) => {
              const isExpanded = openAccordion === cat.id;
              return (
                <div key={cat.id} className="py-3">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => toggleAccordion(cat.id)}
                      className="text-sm font-semibold tracking-wider text-stone-900 hover:text-stone-600 transition-colors text-left uppercase cursor-pointer"
                    >
                      {cat.title}
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleAccordion(cat.id)}
                      className="p-1 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
                      aria-label={`Toggle ${cat.title}`}
                    >
                      {isExpanded ? (
                        <Minus className="w-4 h-4 text-stone-900" />
                      ) : (
                        <Plus className="w-4 h-4 text-stone-500" />
                      )}
                    </button>
                  </div>

                  {/* Accordion Sub-items */}
                  {isExpanded && (
                    <div className="mt-2 pl-3 border-l-2 border-stone-200 space-y-2 py-1 animate-fade-in">
                      {cat.items.map((subItem) => (
                        <button
                          key={subItem}
                          type="button"
                          className="flex items-center justify-between w-full text-left text-xs text-stone-600 hover:text-stone-900 hover:font-medium py-1 transition-colors cursor-pointer group"
                        >
                          <span>{subItem}</span>
                          <ChevronRight className="w-3 h-3 text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Drawer Footer */}
          <div className="p-4 bg-stone-900 text-stone-300 text-xs border-t border-stone-800 flex items-center justify-between">
            <span className="tracking-wider">Worldwide Express Shipping</span>
            <span className="text-stone-400 font-mono text-[10px]">Rs. / PKR</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
