import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { MenuIcon, SearchIcon, ShoppingBagIcon } from 'lucide-react';
import { primaryNav } from '../../data/site';
import { useCart } from '../../contexts/CartContext';
import { Wordmark } from './Wordmark';
import { MobileMenu } from './MobileMenu';
import { SearchPanel } from './SearchPanel';

export function Header() {
  const { count, openDrawer } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname, location.search]);

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-ivory">
      <div className="container-page grid h-16 grid-cols-[1fr_auto_1fr] items-center lg:h-[84px]">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="-ml-2 flex h-11 w-11 items-center justify-center text-ink lg:hidden"
            aria-label="Open menu">
            
            <MenuIcon className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={() => setSearchOpen((v) => !v)}
            aria-expanded={searchOpen}
            aria-controls="site-search"
            className="flex h-11 items-center gap-2 px-2 text-[13px] text-ink transition-colors duration-150 ease-out hover:text-burgundy lg:-ml-2">
            
            <SearchIcon className="h-[18px] w-[18px]" strokeWidth={1.5} />
            <span className="hidden lg:inline">Search</span>
            <span className="sr-only lg:hidden">Search</span>
          </button>
        </div>

        <Wordmark />

        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={openDrawer}
            className="-mr-2 flex h-11 items-center gap-2 px-2 text-[13px] text-ink transition-colors duration-150 ease-out hover:text-burgundy"
            aria-label={`Shopping bag, ${count} ${count === 1 ? 'item' : 'items'}`}>
            
            <span className="relative">
              <ShoppingBagIcon className="h-[19px] w-[19px]" strokeWidth={1.5} />
              {count > 0 &&
              <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-burgundy px-1 text-[10px] font-bold text-warm lg:hidden">
                  {count}
                </span>
              }
            </span>
            <span className="hidden lg:inline">Bag ({count})</span>
          </button>
        </div>
      </div>

      <nav aria-label="Primary" className="hidden border-t border-rule lg:block">
        <ul className="container-page flex h-12 items-center justify-center gap-9">
          {primaryNav.map((item) =>
          <li key={item.to}>
              <NavLink
              to={item.to}
              className={({ isActive }) =>
              `relative py-3 text-[13px] tracking-[0.04em] transition-colors duration-150 ease-out hover:text-burgundy ${
              isActive ?
              'font-bold after:absolute after:inset-x-0 after:-bottom-px after:h-px after:bg-ink' :
              ''} ${
              item.label === 'Sale' ? 'text-burgundy' : isActive ? 'text-ink' : 'text-ink-soft'}`
              }>
              
                {item.label}
              </NavLink>
            </li>
          )}
        </ul>
      </nav>

      <SearchPanel open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>);

}