'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, Search, Heart, User, ShoppingBag } from 'lucide-react';
import Sidebar from '@/components/customer/shared/sidebar/Sidebar';

export interface HeaderProps {
  hasDarkHero?: boolean;
  cartCount?: number;
  wishlistCount?: number;
}

const HeaderContent: React.FC<HeaderProps> = ({
  hasDarkHero = true,
  cartCount = 0,
  wishlistCount = 0,
}) => {
  const pathname = usePathname();
  const isHomePage = pathname === '/' || pathname === '/home';
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          setIsScrolled(currentScrollY > 80);

          if (currentScrollY <= 20) {
            setIsVisible(true);
          } else {
            const diff = currentScrollY - lastScrollY.current;

            if (diff > 5) {
              setIsVisible(false);
            } else if (diff < -5) {
              setIsVisible(true);
            }
          }

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isSolid = !hasDarkHero || isScrolled || !isHomePage;

  return (
    <>
      <header
        style={
          isSolid
            ? {
                WebkitBackdropFilter: 'blur(10px)',
                backdropFilter: 'blur(10px)',
              }
            : undefined
        }
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out transform ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isSolid
            ? 'bg-white/95 text-stone-900 border-b border-stone-200/80 shadow-sm'
            : 'bg-transparent text-white border-b-0'
        }`}
      >
        {/* Main Navbar Row */}
        <div className="py-3 sm:py-3.5 px-3.5 sm:px-4 md:px-8 max-w-7xl mx-auto flex items-center justify-between">
          {/* Left Icons: Hamburger & Search */}
          <div className="flex items-center space-x-2.5 sm:space-x-4 md:space-x-5">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open Navigation Menu"
              className="transition-colors duration-300 focus:outline-none p-1 flex items-center space-x-1.5 hover:opacity-80 cursor-pointer"
            >
              <Menu className="w-[18px] h-[18px] sm:w-5 sm:h-5 md:w-6 md:h-6 stroke-[1.5]" />
              <span className="hidden sm:inline-block text-xs font-semibold uppercase tracking-wider">
                Menu
              </span>
            </button>

            <button
              type="button"
              aria-label="Search"
              className="transition-colors duration-300 focus:outline-none p-1 hover:opacity-80 cursor-pointer"
            >
              <Search className="w-[18px] h-[18px] sm:w-5 sm:h-5 md:w-6 md:h-6 stroke-[1.5]" />
            </button>
          </div>

          {/* Center Brand Logo (Static UI) */}
          <div className="text-center">
            <div
              aria-label="Zebaish Home"
              className="inline-block group focus:outline-none cursor-pointer py-1 select-none"
            >
              <span
                className={`font-script text-2xl sm:text-3xl md:text-5xl font-normal leading-none tracking-normal transition-colors duration-300 block ${
                  isSolid ? 'text-stone-900' : 'text-white drop-shadow-md'
                }`}
              >
                Zebaish
              </span>
            </div>
          </div>

          {/* Right Icons: Wishlist, Account, Cart (Static UI controls) */}
          <div className="flex items-center space-x-2.5 sm:space-x-4 md:space-x-5">
            {/* Wishlist */}
            <button
              type="button"
              aria-label="Wishlist"
              className="transition-colors duration-300 focus:outline-none relative p-1 hover:opacity-80 inline-block cursor-pointer"
            >
              <Heart className="w-[18px] h-[18px] sm:w-5 sm:h-5 md:w-6 md:h-6 stroke-[1.5]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[8px] sm:text-[10px] w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center font-semibold shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* User Account */}
            <button
              type="button"
              aria-label="User Account"
              className="transition-colors duration-300 focus:outline-none p-1 inline-block hover:opacity-80 cursor-pointer"
            >
              <User className="w-[18px] h-[18px] sm:w-5 sm:h-5 md:w-6 md:h-6 stroke-[1.5]" />
            </button>

            {/* Shopping Cart */}
            <button
              type="button"
              aria-label="Shopping Cart"
              className="transition-colors duration-300 focus:outline-none relative p-1 hover:opacity-80 cursor-pointer"
            >
              <ShoppingBag className="w-[18px] h-[18px] sm:w-5 sm:h-5 md:w-6 md:h-6 stroke-[1.5]" />
              {cartCount > 0 && (
                <span
                  className={`absolute -top-1 -right-1 text-[8px] sm:text-[10px] w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center font-bold shadow-xs transition-colors duration-300 ${
                    isSolid ? 'bg-stone-900 text-white' : 'bg-white text-stone-900'
                  }`}
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar (Mega Menu Drawer) owned by Header */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};

export const Header: React.FC<HeaderProps> = (props) => (
  <Suspense fallback={null}>
    <HeaderContent {...props} />
  </Suspense>
);

export default Header;
