import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PlacedOrder } from '../types/product';
import { formatPrice } from '../utils/currency';

export function OrderConfirmation() {
  const location = useLocation();
  const order = (location.state as {order?: PlacedOrder;} | null)?.order;

  if (!order) {
    return (
      <div className="container-page flex flex-col items-center py-24 text-center">
        <h1 className="font-display text-[40px] leading-tight">No recent order to show</h1>
        <p className="mt-3 max-w-md text-[16px] text-ink-soft">
          If you have just placed an order, your confirmation has been sent by email. For anything else, we are happy
          to help.
        </p>
        <div className="mt-8 flex gap-3">
          <Link to="/" className="btn-outline">Return home</Link>
          <Link to="/contact" className="btn-primary">Contact us</Link>
        </div>
      </div>);

  }

  return (
    <div className="container-page py-12 lg:py-20">
      <div className="mx-auto max-w-2xl">
        <p className="text-[14px] text-success">Payment confirmed</p>
        <h1 className="mt-3 font-display text-[44px] font-medium leading-[1.05] lg:text-[60px]">
          Thank you, {order.name.split(' ')[0]}.
        </h1>
        <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
          Your order <strong className="text-ink">{order.reference}</strong> is confirmed. We have sent a confirmation
          to <strong className="text-ink">{order.email}</strong> and will email again when it is on its way.
        </p>

        <div className="mt-10 border border-rule bg-warm">
          <ul className="divide-y divide-rule px-6">
            {order.lines.map((l) =>
            <li key={`${l.name}-${l.colour}`} className="flex gap-4 py-4">
                <img src={l.image} alt="" className="h-[80px] w-[64px] shrink-0 rounded-[2px] object-cover" />
                <div className="flex flex-1 justify-between gap-3">
                  <div>
                    <p className="text-[15px]">{l.name}</p>
                    <p className="text-[13px] text-ink-soft">{l.colour} · Qty {l.quantity}</p>
                  </div>
                  <p className="text-[14px] tabular-nums">{formatPrice(l.lineTotal)}</p>
                </div>
              </li>
            )}
          </ul>
          <dl className="space-y-2 border-t border-rule px-6 py-5 text-[15px]">
            <div className="flex justify-between"><dt className="text-ink-soft">Subtotal</dt><dd className="tabular-nums">{formatPrice(order.subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-ink-soft">{order.delivery.label}</dt><dd className="tabular-nums">{order.deliveryCost === 0 ? 'Free' : formatPrice(order.deliveryCost)}</dd></div>
            <div className="flex items-baseline justify-between border-t border-ink pt-3"><dt className="font-bold">Total paid</dt><dd className="font-display text-[26px] tabular-nums">{formatPrice(order.total)}</dd></div>
          </dl>
        </div>

        <div className="mt-8 grid gap-8 border-t border-rule pt-8 sm:grid-cols-2">
          <div>
            <h2 className="eyebrow">{order.delivery.id === 'collect' ? 'Collection' : 'Delivering to'}</h2>
            <p className="mt-2 text-[15px] leading-relaxed">{order.address}</p>
            <p className="mt-1 text-[14px] text-ink-soft">{order.delivery.detail}</p>
          </div>
          <div>
            <h2 className="eyebrow">Need help?</h2>
            <p className="mt-2 text-[15px] leading-relaxed">
              Reply to your confirmation email or{' '}
              <Link to="/contact" className="link-underline">contact us</Link> with your order reference.
            </p>
          </div>
        </div>

        <Link to="/shop" className="btn-outline mt-10">Continue shopping</Link>
      </div>
    </div>);

}