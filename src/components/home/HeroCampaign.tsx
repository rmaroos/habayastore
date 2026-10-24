import React from 'react';
import { Link } from 'react-router-dom';
import { images } from '../../data/site';

export function HeroCampaign() {
  return (
    <section aria-labelledby="hero-heading" className="relative bg-parchment">
      <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/10] lg:aspect-auto lg:h-[min(80vh,780px)] lg:min-h-[560px]">
        <img
          src={images.hero}
          alt="A woman in a dusty-rose printed modal hijab stands by an arched atelier window"
          className="h-full w-full object-cover object-[62%_center] lg:object-center" />
        
        <div className="absolute inset-0 hidden lg:block">
          <div className="container-page flex h-full items-center">
            <HeroCopy />
          </div>
        </div>
      </div>
      <div className="container-page py-10 lg:hidden">
        <HeroCopy />
      </div>
    </section>);

}

function HeroCopy() {
  return (
    <div className="max-w-[440px] xl:max-w-[480px]">
      <p className="eyebrow text-ink">Autumn archive · No. 07</p>
      <h1
        id="hero-heading"
        className="mt-4 font-display text-[42px] font-medium leading-[1.02] tracking-[-0.01em] text-ink sm:text-[52px] lg:text-[64px] xl:text-[72px]">
        
        Printed modal, drawn from the <em className="font-normal italic text-burgundy">garden</em> archive
      </h1>
      <p className="mt-5 max-w-sm text-[16px] leading-relaxed text-ink">
        Four new prints on our softest modal — botanical, trellis, paisley and terracotta garden.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
        <Link to="/collections/printed-modal" className="btn-primary">
          Shop Printed Modal
        </Link>
        <Link to="/shop" className="link-underline text-[14px] text-ink">
          Browse all hijabs
        </Link>
      </div>
    </div>);

}