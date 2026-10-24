import React from 'react';
import { CartLine } from '../../types/product';
import { formatPrice } from '../../utils/currency';

interface OrderSummaryProps {
  lines: CartLine[];
  subtotal: number;
  deliveryCost: number;
  deliveryLabel: string;
  total: number;
}

export function OrderSummary({ lines, subtotal, deliveryCost, deliveryLabel, total }: OrderSummaryProps) {
  return (
    <div className="border border-rule bg-warm p-6 lg:p-8">
      <h2 className="font-display text-[26px]">Order summary</h2>
      <ul className="mt-4 divide-y divide-rule">
        {lines.map((l) =>
        <li key={`${l.productId}-${l.colour}`} className="flex gap-4 py-4">
            <div className="relative h-[80px] w-[64px] shrink-0 overflow-hidden rounded-[2px] bg-ivory">
              <img src={l.variant.image} alt="" className="h-full w-full object-cover" />
              <span className="absolute -right-0 -top-0 flex h-5 min-w-5 items-center justify-center bg-ink px-1 text-[11px] font-bold text-warm">
                {l.quantity}
              </span>
            </div>
            <div className="flex min-w-0 flex-1 justify-between gap-3">
              <div>
                <p className="text-[15px] text-ink">{l.product.name}</p>
                <p className="text-[13px] text-ink-soft">
                  {l.variant.name} · Qty {l.quantity}
                </p>
              </div>
              <p className="text-[14px] tabular-nums">{formatPrice(l.lineTotal)}</p>
            </div>
          </li>
        )}
      </ul>
      <dl className="mt-2 space-y-2.5 border-t border-rule pt-5 text-[15px]">
        <div className="flex justify-between">
          <dt className="text-ink-soft">Subtotal</dt>
          <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-ink-soft">{deliveryLabel}</dt>
          <dd className="tabular-nums">{deliveryCost === 0 ? 'Free' : formatPrice(deliveryCost)}</dd>
        </div>
      </dl>
      <div className="mt-5 flex items-baseline justify-between border-t border-ink pt-5">
        <span className="text-[14px] font-bold">Total</span>
        <span className="font-display text-[30px] tabular-nums">{formatPrice(total)}</span>
      </div>
      <p className="mt-1 text-right text-[13px] text-ink-soft">Including VAT</p>
    </div>);

}