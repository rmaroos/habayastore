import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { formatPrice } from '../../utils/currency';
import { CartLineItem } from './CartLineItem';
import { FreeDeliveryNote } from './FreeDeliveryNote';

export function CartDrawer() {
  const { lines, count, subtotal, isDrawerOpen, closeDrawer } = useCart();

  useEffect(() => {
    if (!isDrawerOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeDrawer();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [isDrawerOpen, closeDrawer]);

  return (
    <AnimatePresence>
      {isDrawerOpen &&
      <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Shopping bag">
          <motion.div
          className="absolute inset-0 bg-ink/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={closeDrawer} />
        
          <motion.aside
          className="absolute inset-y-0 right-0 flex w-full max-w-[440px] flex-col bg-ivory"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}>
          
            <div className="flex h-16 items-center justify-between border-b border-rule px-6">
              <h2 className="font-display text-[26px]">
                Your bag <span className="text-[18px] text-ink-soft">({count})</span>
              </h2>
              <button
              type="button"
              onClick={closeDrawer}
              className="-mr-2 flex h-11 w-11 items-center justify-center"
              aria-label="Close bag"
              autoFocus>
              
                <XIcon className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            {lines.length === 0 ?
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <p className="font-display text-[28px] leading-tight">Your bag is empty</p>
                <p className="mt-2 text-[15px] text-ink-soft">Begin with our printed modal, or browse the full archive.</p>
                <Link to="/shop" onClick={closeDrawer} className="btn-outline mt-6">
                  Shop all hijabs
                </Link>
              </div> :

          <>
                <div className="border-b border-rule bg-parchment px-6 py-3">
                  <FreeDeliveryNote subtotal={subtotal} />
                </div>
                <ul className="flex-1 overflow-y-auto px-6">
                  {lines.map((line) =>
              <CartLineItem key={`${line.productId}-${line.colour}`} line={line} compact onNavigate={closeDrawer} />
              )}
                </ul>
                <div className="border-t border-rule bg-warm px-6 py-5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[14px] font-bold">Subtotal</span>
                    <span className="font-display text-[24px] tabular-nums">{formatPrice(subtotal)}</span>
                  </div>
                  <p className="mt-1 text-[13px] text-ink-soft">Delivery calculated at checkout.</p>
                  <div className="mt-4 grid gap-2">
                    <Link to="/checkout" onClick={closeDrawer} className="btn-primary w-full">
                      Checkout
                    </Link>
                    <Link to="/cart" onClick={closeDrawer} className="btn-outline w-full">
                      View bag
                    </Link>
                  </div>
                </div>
              </>
          }
          </motion.aside>
        </div>
      }
    </AnimatePresence>);

}