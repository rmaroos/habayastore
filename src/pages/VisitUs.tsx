import React from 'react';
import { images, store } from '../data/site';
import { PageIntro } from '../components/PageIntro';
import { StoreHours } from '../components/StoreHours';

export function VisitUs() {
  return (
    <>
      <PageIntro
        crumb="Visit us"
        title="Visit the flagship"
        intro="Our Leicester shop is where the whole archive lives. Come and feel the fabrics, try colours in natural light, and collect online orders." />
      
      <div className="container-page py-12 lg:py-16">
        <div className="aspect-[16/9] overflow-hidden rounded-[2px] bg-warm lg:aspect-[21/9]">
          <img src={images.store} alt="Inside the Habaya flagship boutique" className="h-full w-full object-cover" />
        </div>

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-8">
          <section aria-labelledby="find-us" className="lg:col-span-4">
            <h2 id="find-us" className="font-display text-[30px]">Find us</h2>
            <address className="mt-4 text-[16px] not-italic leading-relaxed">
              {store.addressLines.map((l) =>
              <span key={l} className="block">{l}</span>
              )}
            </address>
            <p className="mt-4 text-[15px]">
              <a href={`tel:${store.phone.replace(/\s/g, '')}`} className="link-underline">{store.phone}</a>
            </p>
            <p className="mt-1 text-[15px]">
              <a href={`mailto:${store.email}`} className="link-underline">{store.email}</a>
            </p>
            <a href={store.directionsUrl} target="_blank" rel="noreferrer" className="btn-primary mt-8">
              Get directions
            </a>
          </section>

          <section aria-labelledby="hours" className="lg:col-span-4">
            <h2 id="hours" className="font-display text-[30px]">Opening hours</h2>
            <div className="mt-4">
              <StoreHours />
            </div>
            <p className="mt-4 text-[13px] text-ink-soft">Hours may change on public holidays and during Ramadan and Eid.</p>
          </section>

          <section aria-labelledby="good-to-know" className="lg:col-span-4">
            <h2 id="good-to-know" className="font-display text-[30px]">Good to know</h2>
            <dl className="mt-4 space-y-5 text-[15px] leading-relaxed">
              <div>
                <dt className="font-bold">Click & collect</dt>
                <dd className="text-ink-soft">Choose collection at checkout. Orders are usually ready within 24 hours.</dd>
              </div>
              <div>
                <dt className="font-bold">Getting here</dt>
                <dd className="text-ink-soft">A five-minute walk from Leicester station. Pay-and-display parking on nearby streets.</dd>
              </div>
              <div>
                <dt className="font-bold">Accessibility</dt>
                <dd className="text-ink-soft">Step-free entrance and a seated fitting area. Call ahead if we can help.</dd>
              </div>
            </dl>
          </section>
        </div>
      </div>
    </>);

}