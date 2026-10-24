import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import { isInStock, isOnSale } from '../../utils/catalogue';
import { Price } from './Price';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [active, setActive] = useState(0);
  const colour = product.colours[active];
  const soldOut = !isInStock(product);
  const label = soldOut ? 'Sold out' : isOnSale(product) ? 'Sale' : product.isNew ? 'New' : null;

  return (
    <article className="group flex h-full flex-col">
      <Link
        to={`/products/${product.slug}`}
        className="relative block aspect-[4/5] overflow-hidden rounded-[2px] bg-warm"
        aria-label={`${product.name}, ${colour.name}`}>
        
        <img
          src={colour.image}
          alt={`${product.name} hijab in ${colour.name}`}
          loading="lazy"
          className={`h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03] ${
          soldOut ? 'opacity-70' : ''}`
          } />
        
        {label &&
        <span
          className={`absolute left-3 top-3 rounded-[1px] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${
          label === 'Sold out' ?
          'bg-ink text-warm' :
          label === 'Sale' ?
          'bg-burgundy text-warm' :
          'bg-warm text-ink'}`
          }>
          
            {label}
          </span>
        }
      </Link>

      <div className="flex flex-1 flex-col pt-3.5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[15px] leading-snug text-ink">
            <Link to={`/products/${product.slug}`} className="hover:text-burgundy">
              {product.name}
            </Link>
          </h3>
          <div className="shrink-0">
            <Price price={product.price} compareAt={product.compareAt} />
          </div>
        </div>
        <p className="mt-0.5 text-[13px] text-ink-soft">
          {product.colours.length > 1 ? `${product.colours.length} colours · ${colour.name}` : colour.name}
        </p>
        {product.colours.length > 1 &&
        <ul className="mt-auto flex gap-1 pt-2.5" aria-label={`Colours for ${product.name}`}>
            {product.colours.map((c, i) =>
          <li key={c.name}>
                <button
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              aria-label={`Show ${c.name}${c.stock === 0 ? ' (sold out)' : ''}`}
              className={`flex h-7 w-7 items-center justify-center rounded-full border transition-colors duration-150 ease-out ${
              i === active ? 'border-ink' : 'border-transparent hover:border-rule'}`
              }>
              
                  <span
                className="relative block h-4 w-4 overflow-hidden rounded-full border border-ink/15"
                style={{ backgroundColor: c.hex }}>
                
                    {c.stock === 0 &&
                <span className="absolute left-1/2 top-[-2px] h-5 w-px -translate-x-1/2 rotate-45 bg-ink/60" />
                }
                  </span>
                </button>
              </li>
          )}
          </ul>
        }
      </div>
    </article>);

}