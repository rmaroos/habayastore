import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { collections } from '../../data/collections';
import { productsInCollection } from '../../utils/catalogue';

export function BrowseCollections() {
  return (
    <section aria-labelledby="collections-heading" className="bg-parchment py-16 lg:py-24">
      <div className="container-page">
        <h2 id="collections-heading" className="text-center font-display text-[34px] leading-tight lg:text-[44px]">
          Browse by collection
        </h2>
        <p className="mx-auto mt-2 max-w-md text-center text-[15px] text-ink-soft">
          Four fabrics, each chosen for a different kind of day.
        </p>
        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 lg:mt-14 lg:grid-cols-4 lg:gap-x-6">
          {collections.map((c) => {
            const count = productsInCollection(c.slug).length;
            return (
              <li key={c.slug}>
                <Link to={`/collections/${c.slug}`} className="group block">
                  <div className="aspect-[3/4] overflow-hidden rounded-[2px] bg-warm">
                    <img
                      src={c.image}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]" />
                    
                  </div>
                  <div className="mt-4 flex items-baseline justify-between gap-3 border-b border-ink/20 pb-3">
                    <span className="font-display text-[22px] leading-tight text-ink group-hover:text-burgundy lg:text-[26px]">
                      {c.name}
                    </span>
                    <span className="flex shrink-0 items-center gap-1.5 text-[12px] text-ink-soft">
                      {count} {count === 1 ? 'style' : 'styles'}
                      <ArrowRightIcon
                        className="hidden h-3.5 w-3.5 transition-transform duration-150 ease-out group-hover:translate-x-0.5 sm:block"
                        strokeWidth={1.5} />
                      
                    </span>
                  </div>
                </Link>
              </li>);

          })}
        </ul>
      </div>
    </section>);

}