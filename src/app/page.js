import HeroFeatures from '@/components/Feature';
import Footer from '@/components/footer/Footer';
import Hero from '@/components/Home/Hero';
import TrendingIdeas from '@/components/Home/TrendingIdeas';
import TopContributors from '@/components/TopContributors';

import React from 'react';

const page = () => {
  return (
    <div>
      <Hero/>
      <HeroFeatures/>
      <TrendingIdeas/>
      <TopContributors/>
      <Footer/>
    </div>
  );
};

export default page;