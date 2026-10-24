import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { Product } from '../../types/product';
import { ProductCard } from './ProductCard';

interface RelatedCarouselProps {
  heading: string;
  products: Product[];
  intro?: string;
}

export function RelatedCarousel({ heading, products, intro }: RelatedCarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [update, products]);

  if (products.length === 0) return null;

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <section aria-labelledby="related-heading" className="border-t border-rule py-16 lg:py-24">
      <div className="container-page">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 id="related-heading" className="font-display text-[32px] leading-tight lg:text-[40px]">
              {heading}
            </h2>
            {intro && <p className="mt-2 max-w-md text-[15px] text-ink-soft">{intro}</p>}
          </div>
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              disabled={!canPrev}
              aria-label="Previous products"
              className="flex h-11 w-11 items-center justify-center rounded-[2px] border border-ink text-ink transition-colors duration-150 ease-out hover:bg-ink hover:text-warm disabled:border-rule disabled:text-taupe disabled:hover:bg-transparent">
              
              <ArrowLeftIcon className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              disabled={!canNext}
              aria-label="Next products"
              className="flex h-11 w-11 items-center justify-center rounded-[2px] border border-ink text-ink transition-colors duration-150 ease-out hover:bg-ink hover:text-warm disabled:border-rule disabled:text-taupe disabled:hover:bg-transparent">
              
              <ArrowRightIcon className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
        <ul
          ref={trackRef}
          onScroll={update}
          className="-mx-[18px] mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-[18px] px-[18px] pb-2 [scrollbar-width:none] md:mx-0 md:scroll-px-0 md:px-0 lg:gap-6 [&::-webkit-scrollbar]:hidden">
          
          {products.map((p) =>
          <li key={p.id} className="w-[68%] shrink-0 snap-start sm:w-[42%] lg:w-[calc(25%-18px)]">
              <ProductCard product={p} />
            </li>
          )}
        </ul>
      </div>
    </section>);

}