import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import { ProductCard } from '../product/ProductCard';

export function FeaturedProducts() {
  const { products } = useStore();
  const featured = products.filter((p) => p.featured).slice(0, 4);
  return (
    <section aria-labelledby="featured-heading" className="border-t border-rule bg-warm py-16 lg:py-24">
      <div className="container-page">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="featured-heading" className="font-display text-[34px] leading-tight lg:text-[44px]">
              The Printed Modal edit
            </h2>
            <p className="mt-2 max-w-md text-[15px] text-ink-soft">
              Prints drawn from old textile pattern books, on modal that breathes.
            </p>
          </div>
          <Link
            to="/collections/printed-modal"
            className="group inline-flex items-center gap-2 text-[14px] font-bold text-ink hover:text-burgundy">
            
            View the collection
            <ArrowRightIcon
              className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5"
              strokeWidth={1.5} />
            
          </Link>
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
          {featured.map((p) =>
          <li key={p.id}>
              <ProductCard product={p} />
            </li>
          )}
        </ul>
      </div>
    </section>);

}