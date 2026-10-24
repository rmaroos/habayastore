import React from 'react';
import { Link } from 'react-router-dom';
import { images } from '../../data/site';

export function MissionSection() {
  return (
    <section aria-labelledby="mission-heading" className="py-16 lg:py-28">
      <div className="container-page grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="order-2 lg:order-1 lg:col-span-4">
          <div className="aspect-[4/5] overflow-hidden rounded-[2px] bg-warm">
            <img
              src={images.mission}
              alt="Hands folding burgundy modal fabric beside vintage brass scissors"
              loading="lazy"
              className="h-full w-full object-cover" />
            
          </div>
        </div>
        <div className="order-1 lg:order-2 lg:col-span-7 lg:col-start-6">
          <h2 id="mission-heading" className="eyebrow">
            Our mission
          </h2>
          <p className="mt-5 font-display text-[30px] leading-[1.18] text-ink lg:text-[44px]">
            We make hijabs to be worn often and kept for years — chosen for their drape, their colour, and the{' '}
            <em className="italic text-burgundy">quiet confidence</em> they give.
          </p>
          <div className="mt-8 h-px w-16 bg-brass" aria-hidden="true" />
          <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-ink-soft">
            Every fabric is sampled, washed and worn before it joins the archive, so what arrives at your door is
            something we would happily wear ourselves.
          </p>
          <Link to="/our-mission" className="link-underline mt-6 inline-block text-[14px] font-bold text-ink">
            Read our mission
          </Link>
        </div>
      </div>
    </section>);

}