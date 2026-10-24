import React from 'react';
import { HeroCampaign } from '../components/home/HeroCampaign';
import { BrandIntro } from '../components/home/BrandIntro';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { BrowseCollections } from '../components/home/BrowseCollections';
import { MissionSection } from '../components/home/MissionSection';
import { FlagshipStore } from '../components/home/FlagshipStore';
import { NewsletterSection } from '../components/home/NewsletterSection';

export function Home() {
  return (
    <>
      <HeroCampaign />
      <BrandIntro />
      <FeaturedProducts />
      <BrowseCollections />
      <MissionSection />
      <FlagshipStore />
      <NewsletterSection />
    </>);

}