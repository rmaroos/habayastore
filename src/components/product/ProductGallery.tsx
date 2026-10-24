import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Product } from '../../types/product';

interface ProductGalleryProps {
  product: Product;
  activeIndex: number;
  onSelect: (index: number) => void;
}

export function ProductGallery({ product, activeIndex, onSelect }: ProductGalleryProps) {
  const active = product.colours[activeIndex];
  const hasThumbs = product.colours.length > 1;

  return (
    <div className={`flex flex-col-reverse gap-3 ${hasThumbs ? 'md:flex-row' : ''}`}>
      {hasThumbs &&
      <ul className="flex gap-3 md:flex-col" aria-label="Product images">
          {product.colours.map((c, i) =>
        <li key={c.name}>
              <button
            type="button"
            onClick={() => onSelect(i)}
            aria-label={`View ${c.name}`}
            aria-current={i === activeIndex}
            className={`block h-[90px] w-[72px] overflow-hidden rounded-[2px] border bg-warm transition-colors duration-150 ease-out md:h-[110px] md:w-[88px] ${
            i === activeIndex ? 'border-ink' : 'border-transparent hover:border-rule'}`
            }>
            
                <img src={c.image} alt="" className="h-full w-full object-cover" />
              </button>
            </li>
        )}
        </ul>
      }
      <div className="relative aspect-[4/5] flex-1 overflow-hidden rounded-[2px] bg-warm">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.img
            key={active.image}
            src={active.image}
            alt={`${product.name} hijab in ${active.name}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="absolute inset-0 h-full w-full object-cover" />
          
        </AnimatePresence>
      </div>
    </div>);

}