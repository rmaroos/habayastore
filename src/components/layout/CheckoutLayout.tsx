import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ChevronLeftIcon, LockIcon } from 'lucide-react';
import { Wordmark } from './Wordmark';

export function CheckoutLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-ivory">
      <header className="border-b border-rule bg-ivory">
        <div className="container-page grid h-16 grid-cols-[1fr_auto_1fr] items-center lg:h-20">
          <Link to="/cart" className="flex items-center gap-1 text-[13px] text-ink-soft hover:text-ink">
            <ChevronLeftIcon className="h-4 w-4" strokeWidth={1.5} />
            <span className="hidden sm:inline">Back to bag</span>
            <span className="sm:hidden">Bag</span>
          </Link>
          <Wordmark />
          <p className="flex items-center justify-end gap-1.5 text-[13px] text-ink-soft">
            <LockIcon className="h-3.5 w-3.5" strokeWidth={1.75} />
            <span className="hidden sm:inline">Secure checkout</span>
          </p>
        </div>
      </header>
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-rule">
        <div className="container-page flex flex-wrap gap-x-6 gap-y-2 py-6 text-[13px] text-ink-soft">
          <Link to="/help/shipping" className="hover:text-ink">Shipping</Link>
          <Link to="/help/returns" className="hover:text-ink">Returns</Link>
          <Link to="/help/privacy" className="hover:text-ink">Privacy</Link>
          <Link to="/contact" className="hover:text-ink">Need help?</Link>
        </div>
      </footer>
    </div>);

}