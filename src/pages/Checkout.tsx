import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircleIcon, LockIcon } from 'lucide-react';
import { deliveryOptions } from '../data/site';
import { deliveryCostFor, useCheckout } from '../hooks/useCheckout';
import { CheckoutStep } from '../components/checkout/CheckoutStep';
import { Field } from '../components/checkout/Field';
import { OrderSummary } from '../components/checkout/OrderSummary';
import { formatPrice } from '../utils/currency';

export function Checkout() {
  const c = useCheckout();
  const { details: d, detailErrors: de, payment: p, paymentErrors: pe, summary } = c;

  if (summary.lines.length === 0) {
    return (
      <div className="container-page flex flex-col items-center py-24 text-center">
        <h1 className="font-display text-[40px] leading-tight">There is nothing to check out</h1>
        <p className="mt-3 text-[16px] text-ink-soft">Your bag is empty. Add a hijab or two, then come back.</p>
        <Link to="/shop" className="btn-primary mt-8">
          Shop all hijabs
        </Link>
      </div>);

  }

  const status = (n: 1 | 2 | 3) => c.step === n ? 'active' : c.step > n ? 'done' : 'upcoming';

  return (
    <div className="container-page py-8 lg:py-14">
      <h1 className="font-display text-[38px] leading-none lg:text-[48px]">Checkout</h1>
      <div className="mt-4 grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <CheckoutStep
            number={1}
            title="Your details"
            status={status(1)}
            onEdit={() => c.setStep(1)}
            summary={
            <>
                <p>{d.email}</p>
                <p>
                  {d.firstName} {d.lastName}, {d.address1}, {d.city} {d.postcode.toUpperCase()}
                </p>
              </>
            }>
            
            <form
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                c.submitDetails();
              }}
              className="grid gap-5 sm:grid-cols-2">
              
              <Field
                className="sm:col-span-2"
                label="Email"
                type="email"
                autoComplete="email"
                value={d.email}
                onChange={(v) => c.updateDetails('email', v)}
                error={de.email}
                hint="For your order confirmation. No account needed." />
              
              <Field label="First name" autoComplete="given-name" value={d.firstName} onChange={(v) => c.updateDetails('firstName', v)} error={de.firstName} />
              <Field label="Last name" autoComplete="family-name" value={d.lastName} onChange={(v) => c.updateDetails('lastName', v)} error={de.lastName} />
              <Field className="sm:col-span-2" label="Address" autoComplete="address-line1" value={d.address1} onChange={(v) => c.updateDetails('address1', v)} error={de.address1} />
              <Field className="sm:col-span-2" label="Apartment, suite, etc." optional autoComplete="address-line2" value={d.address2} onChange={(v) => c.updateDetails('address2', v)} />
              <Field label="Town or city" autoComplete="address-level2" value={d.city} onChange={(v) => c.updateDetails('city', v)} error={de.city} />
              <Field label="Postcode" autoComplete="postal-code" value={d.postcode} onChange={(v) => c.updateDetails('postcode', v)} error={de.postcode} />
              <Field
                className="sm:col-span-2"
                label="Phone"
                optional
                type="tel"
                autoComplete="tel"
                value={d.phone}
                onChange={(v) => c.updateDetails('phone', v)}
                hint="Only used by our courier for delivery updates." />
              
              <div className="sm:col-span-2">
                <button type="submit" className="btn-dark w-full sm:w-auto">
                  Continue to delivery
                </button>
              </div>
            </form>
          </CheckoutStep>

          <CheckoutStep
            number={2}
            title="Delivery"
            status={status(2)}
            onEdit={() => c.setStep(2)}
            summary={<p>{c.delivery.label} · {c.delivery.detail}</p>}>
            
            <fieldset>
              <legend className="sr-only">Choose a delivery option</legend>
              <div className="divide-y divide-rule border border-rule bg-warm">
                {deliveryOptions.map((opt) => {
                  const cost = deliveryCostFor(opt, summary.subtotal);
                  const selected = c.deliveryId === opt.id;
                  return (
                    <label
                      key={opt.id}
                      className={`flex cursor-pointer items-center gap-4 px-5 py-4 transition-colors duration-150 ease-out ${
                      selected ? 'bg-parchment' : 'hover:bg-ivory'}`
                      }>
                      
                      <input
                        type="radio"
                        name="delivery"
                        value={opt.id}
                        checked={selected}
                        onChange={() => c.setDeliveryId(opt.id)}
                        className="h-4 w-4 accent-burgundy" />
                      
                      <span className="flex-1">
                        <span className="block text-[15px] font-bold">{opt.label}</span>
                        <span className="block text-[13px] text-ink-soft">{opt.detail}</span>
                      </span>
                      <span className="text-[14px] tabular-nums">
                        {cost === 0 ? 'Free' : formatPrice(cost)}
                      </span>
                    </label>);

                })}
              </div>
            </fieldset>
            <button type="button" onClick={c.submitDelivery} className="btn-dark mt-6 w-full sm:w-auto">
              Continue to payment
            </button>
          </CheckoutStep>

          <CheckoutStep number={3} title="Payment" status={status(3)}>
            <form
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                c.placeOrder();
              }}>
              
              {c.paymentFailed &&
              <div role="alert" className="mb-6 flex gap-3 border border-danger bg-warm p-4 text-[14px] text-danger">
                  <AlertCircleIcon className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2} />
                  <p>
                    <strong>Your payment was declined.</strong> No money has been taken and your bag is saved. Please
                    check your card details or try a different card.
                  </p>
                </div>
              }
              <div className="grid gap-5 sm:grid-cols-2">
                <Field className="sm:col-span-2" label="Name on card" autoComplete="cc-name" value={p.cardName} onChange={(v) => c.updatePayment('cardName', v)} error={pe.cardName} />
                <Field className="sm:col-span-2" label="Card number" inputMode="numeric" autoComplete="cc-number" placeholder="1234 5678 9012 3456" value={p.cardNumber} onChange={(v) => c.updatePayment('cardNumber', v)} error={pe.cardNumber} />
                <Field label="Expiry date" inputMode="numeric" autoComplete="cc-exp" placeholder="MM / YY" value={p.expiry} onChange={(v) => c.updatePayment('expiry', v)} error={pe.expiry} />
                <Field label="Security code" inputMode="numeric" autoComplete="cc-csc" placeholder="CVC" value={p.cvc} onChange={(v) => c.updatePayment('cvc', v)} error={pe.cvc} />
              </div>
              <p className="mt-5 flex items-center gap-2 text-[13px] text-ink-soft">
                <LockIcon className="h-3.5 w-3.5" strokeWidth={1.75} />
                Payments are encrypted and processed by our payment provider. Habaya never stores card details.
              </p>
              <button type="submit" disabled={c.processing} className="btn-primary mt-6 w-full">
                {c.processing ? 'Processing payment…' : `Pay ${formatPrice(summary.total)}`}
              </button>
              <p className="mt-3 text-center text-[13px] text-ink-soft">
                By placing your order you agree to our{' '}
                <Link to="/help/terms" className="underline underline-offset-2">terms</Link> and{' '}
                <Link to="/help/returns" className="underline underline-offset-2">returns policy</Link>.
              </p>
            </form>
          </CheckoutStep>
        </div>

        <aside className="lg:col-span-5">
          <div className="lg:sticky lg:top-8">
            <OrderSummary
              lines={summary.lines}
              subtotal={summary.subtotal}
              deliveryCost={summary.deliveryCost}
              deliveryLabel={c.delivery.label}
              total={summary.total} />
            
          </div>
        </aside>
      </div>
    </div>);

}