import React from 'react';
import { formatPrice } from '../../utils/currency';

interface PriceProps {
  price: number;
  compareAt?: number;
  size?: 'sm' | 'lg';
}

export function Price({ price, compareAt, size = 'sm' }: PriceProps) {
  const onSale = compareAt !== undefined && compareAt > price;
  const main = size === 'lg' ? 'text-[22px]' : 'text-[14px]';
  return (
    <p className={`flex items-baseline gap-2 tabular-nums ${main}`}>
      {onSale ?
      <>
          <span className="sr-only">Sale price</span>
          <span className="font-bold text-burgundy">{formatPrice(price)}</span>
          <span className="sr-only">Original price</span>
          <s className={`text-ink-soft ${size === 'lg' ? 'text-[16px]' : 'text-[13px]'}`}>{formatPrice(compareAt)}</s>
        </> :

      <span className={size === 'lg' ? '' : 'text-ink'}>{formatPrice(price)}</span>
      }
    </p>);

}