import React from 'react';
import { Link } from 'react-router-dom';
import { images, store } from '../../data/site';
import { StoreHours } from '../StoreHours';

export function FlagshipStore() {
  return (
    <section aria-labelledby="store-heading" className="bg-ink text-ivory">
      <div className="grid lg:grid-cols-12">
        <div className="aspect-[3/2] overflow-hidden lg:col-span-7 lg:aspect-auto lg:min-h-[620px]">
          <img
            src={images.store}
            alt="Inside the Habaya flagship: wooden shelves of folded hijabs and a brass rail of scarves"
            loading="lazy"
            className="h-full w-full object-cover" />
          
        </div>
        <div className="flex items-center px-[18px] py-14 md:px-7 lg:col-span-5 lg:px-14 lg:py-16 xl:px-20">
          <div className="w-full max-w-md">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brass">The flagship</p>
            <h2 id="store-heading" className="mt-4 font-display text-[36px] leading-tight lg:text-[46px]">
              Visit us in Leicester
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-ivory/80">
              Feel the fabrics, try colours against your skin and take your time. Online orders can also be collected
              here.
            </p>
            <address className="mt-8 border-t border-ivory/20 pt-6 text-[15px] not-italic leading-relaxed">
              {store.addressLines.slice(0, 2).map((l) =>
              <span key={l} className="block">
                  {l}
                </span>
              )}
            </address>
            <div className="mt-6">
              <StoreHours tone="dark" />
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a
                href={store.directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="btn bg-ivory text-ink hover:bg-warm">
                
                Get directions
              </a>
              <Link
                to="/visit-us"
                className="text-[14px] underline decoration-brass underline-offset-[6px] hover:text-warm">
                
                Plan your visit
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>);

}