import React from 'react';
import { formatPrice } from '../../utils/currency';

const THRESHOLD = 50;

export function FreeDeliveryNote({ subtotal }: {subtotal: number;}) {
  const remaining = THRESHOLD - subtotal;
  const progress = Math.min(1, subtotal / THRESHOLD);
  return (
    <div>
      <p className="text-[13px] text-ink">
        {remaining > 0 ?
        <>
            You are <strong>{formatPrice(remaining)}</strong> away from complimentary UK delivery.
          </> :

        <>Your order qualifies for complimentary UK delivery.</>
        }
      </p>
      <div className="mt-2 h-[2px] w-full bg-linen" aria-hidden="true">
        <div className="h-full bg-burgundy transition-[width] duration-300 ease-out" style={{ width: `${progress * 100}%` }} />
      </div>
    </div>);

}