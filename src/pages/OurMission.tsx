import React from 'react';
import { Link } from 'react-router-dom';
import { images, missionValues } from '../data/site';
import { Breadcrumbs } from '../components/Breadcrumbs';

export function OurMission() {
  return (
    <>
      <section className="bg-parchment">
        <div className="container-page pb-16 pt-8 lg:pb-24 lg:pt-10">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Our mission' }]} />
          <div className="mt-10 grid items-end gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <h1 className="font-display text-[40px] font-medium leading-[1.08] lg:text-[60px]">
                To make modest dressing feel <em className="italic text-burgundy">effortless</em>, considered and
                lasting.
              </h1>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <div className="aspect-[4/5] overflow-hidden rounded-[2px]">
                <img
                  src={images.mission}
                  alt="Hands folding burgundy modal fabric on a cutting table"
                  className="h-full w-full object-cover" />
                
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="values-heading" className="container-page py-16 lg:py-24">
        <h2 id="values-heading" className="font-display text-[32px] lg:text-[40px]">
          What guides us
        </h2>
        <dl className="mt-8 border-t border-ink">
          {missionValues.map((v) =>
          <div key={v.title} className="grid gap-3 border-b border-rule py-8 lg:grid-cols-12 lg:gap-8">
              <dt className="font-display text-[26px] leading-tight lg:col-span-5 lg:text-[30px]">{v.title}</dt>
              <dd className="text-[16px] leading-relaxed text-ink-soft lg:col-span-6 lg:col-start-7">{v.body}</dd>
            </div>
          )}
        </dl>
        <div className="mt-12 flex flex-wrap gap-3">
          <Link to="/shop" className="btn-primary">Shop the collection</Link>
          <Link to="/our-story" className="btn-outline">Read our story</Link>
        </div>
      </section>
    </>);

}