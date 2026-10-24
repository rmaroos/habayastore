import React from 'react';
import { Link } from 'react-router-dom';
import { LockIcon } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { CartLineItem } from '../components/cart/CartLineItem';
import { FreeDeliveryNote } from '../components/cart/FreeDeliveryNote';
import { formatPrice } from '../utils/currency';

export function Cart() {
  const { lines, count, subtotal } = useCart();

  if (lines.length === 0) {
    return (
      <div className="container-page flex flex-col items-center py-24 text-center lg:py-32">
        <h1 className="font-display text-[42px] leading-tight lg:text-[56px]">Your bag is empty</h1>
        <p className="mt-3 max-w-sm text-[16px] text-ink-soft">
          Nothing here yet. Start with our newest printed modal, or browse the whole archive.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/collections/printed-modal" className="btn-primary">
            Shop Printed Modal
          </Link>
          <Link to="/shop" className="btn-outline">
            Shop all
          </Link>
        </div>
      </div>);

  }

  return (
    <div className="container-page py-10 lg:py-16">
      <div className="flex items-baseline justify-between gap-4 border-b border-rule pb-6">
        <h1 className="font-display text-[42px] leading-none lg:text-[56px]">Your bag</h1>
        <p className="text-[14px] text-ink-soft">
          {count} {count === 1 ? 'item' : 'items'}
        </p>
      </div>

      <div className="mt-2 grid gap-10 lg:grid-cols-12 lg:gap-12">
        <ul className="lg:col-span-7">
          {lines.map((line) =>
          <CartLineItem key={`${line.productId}-${line.colour}`} line={line} />
          )}
        </ul>

        <aside aria-labelledby="summary-heading" className="lg:col-span-5 lg:pt-5">
          <div className="border border-rule bg-warm p-6 lg:sticky lg:top-[160px] lg:p-8">
            <h2 id="summary-heading" className="font-display text-[28px]">
              Summary
            </h2>
            <dl className="mt-5 space-y-3 text-[15px]">
              <div className="flex justify-between">
                <dt className="text-ink-soft">Subtotal</dt>
                <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-soft">Delivery</dt>
                <dd className="text-right text-ink-soft">Calculated at checkout</dd>
              </div>
            </dl>
            <div className="mt-5 border-t border-rule pt-5">
              <FreeDeliveryNote subtotal={subtotal} />
            </div>
            <div className="mt-6 flex items-baseline justify-between border-t border-ink pt-5">
              <span className="text-[14px] font-bold">Estimated total</span>
              <span className="font-display text-[30px] tabular-nums">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-1 text-[13px] text-ink-soft">Prices include VAT.</p>
            <Link to="/checkout" className="btn-primary mt-6 w-full">
              Continue to checkout
            </Link>
            <p className="mt-4 flex items-center justify-center gap-1.5 text-[13px] text-ink-soft">
              <LockIcon className="h-3.5 w-3.5" strokeWidth={1.75} /> Secure payment · Guest checkout available
            </p>
            <Link to="/shop" className="mt-5 block text-center text-[14px] underline underline-offset-4 hover:text-burgundy">
              Continue shopping
            </Link>
          </div>
        </aside>
      </div>
    </div>);

}