import React from 'react';
import { Link } from 'react-router-dom';
import { storyChapters } from '../data/site';
import { PageIntro } from '../components/PageIntro';

export function OurStory() {
  return (
    <>
      <PageIntro
        crumb="Our story"
        title="A small label, built around fabric"
        intro="Habaya began with a simple belief: that a hijab you reach for every day should feel as good on the hundredth wear as the first." />
      

      <div className="container-page py-16 lg:py-24">
        <ol className="space-y-20 lg:space-y-32">
          {storyChapters.map((ch, i) => {
            const reverse = i % 2 === 1;
            return (
              <li key={ch.title} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-8">
                <div className={`lg:col-span-7 ${reverse ? 'lg:order-2 lg:col-start-6' : ''}`}>
                  <div className="aspect-[3/2] overflow-hidden rounded-[2px] bg-warm">
                    <img src={ch.image} alt={ch.alt} loading="lazy" className="h-full w-full object-cover" />
                  </div>
                </div>
                <div className={`lg:col-span-4 ${reverse ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-9'}`}>
                  <p className="font-display text-[18px] italic text-ink-soft">Chapter {['I', 'II', 'III'][i]}</p>
                  <h2 className="mt-2 font-display text-[32px] leading-tight lg:text-[40px]">{ch.title}</h2>
                  <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">{ch.body}</p>
                </div>
              </li>);

          })}
        </ol>
      </div>

      <section className="bg-parchment py-16 lg:py-20">
        <div className="container-page flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <h2 className="max-w-xl font-display text-[32px] leading-tight lg:text-[40px]">
            Find the hijab you will reach for every day.
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link to="/shop" className="btn-primary">Shop all</Link>
            <Link to="/visit-us" className="btn-outline">Visit the flagship</Link>
          </div>
        </div>
      </section>
    </>);

}