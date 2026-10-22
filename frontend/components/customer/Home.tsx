import React from 'react';
import HeroCarousel from '@/components/customer/home/HeroCarousel';
import NewArrivalsCategories from '@/components/customer/home/NewArrivalsCategories';
import MostTrending from '@/components/customer/home/MostTrending';
import CoutureSection from '@/components/customer/home/CoutureSection';
import WornAndLoved from '@/components/customer/home/WornAndLoved';
import Newsletter from '@/components/customer/home/Newsletter';

export const Home: React.FC = () => {
  return (
    <div className="w-full flex flex-col">
      {/* 1. Hero Carousel */}
      <HeroCarousel />

      {/* 2. New Arrivals Categories */}
      <NewArrivalsCategories />

      {/* 3. Most Trending */}
      <MostTrending />

      {/* 4. Couture Section */}
      <CoutureSection />

      {/* 5. Worn & Loved */}
      <WornAndLoved />

      {/* 6. Newsletter */}
      <Newsletter />
    </div>
  );
};

export default Home;
