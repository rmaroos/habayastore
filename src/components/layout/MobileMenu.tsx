import React, { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { primaryNav, store } from '../../data/site';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open &&
      <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <motion.div
          className="absolute inset-0 bg-ink/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose} />
        
          <motion.div
          className="absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col bg-ivory"
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}>
          
            <div className="flex h-16 items-center justify-between border-b border-rule px-[18px]">
              <span className="font-display text-[26px] tracking-[0.06em]">Habaya</span>
              <button
              type="button"
              onClick={onClose}
              className="-mr-2 flex h-11 w-11 items-center justify-center"
              aria-label="Close menu">
              
                <XIcon className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>
            <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-[18px] py-4">
              <ul>
                <li>
                  <NavLink to="/shop" className="block border-b border-rule py-4 font-display text-[24px]">
                    Shop all
                  </NavLink>
                </li>
                {primaryNav.map((item) =>
              <li key={item.to}>
                    <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                  `block border-b border-rule py-4 font-display text-[24px] ${
                  isActive ? 'italic text-burgundy' : 'text-ink'}`

                  }>
                  
                      {item.label}
                    </NavLink>
                  </li>
              )}
              </ul>
              <ul className="mt-6 space-y-3 text-[14px] text-ink-soft">
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/help/shipping">Shipping & delivery</Link></li>
                <li><Link to="/help/returns">Returns & refunds</Link></li>
                <li><Link to="/contact">Contact us</Link></li>
              </ul>
            </nav>
            <div className="border-t border-rule bg-parchment px-[18px] py-5 text-[13px] text-ink-soft">
              <p className="font-bold text-ink">{store.name}</p>
              <p>{store.addressLines.slice(0, 2).join(', ')}</p>
            </div>
          </motion.div>
        </div>
      }
    </AnimatePresence>);

}