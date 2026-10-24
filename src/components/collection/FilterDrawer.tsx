import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { CollectionFilters } from '../../hooks/useCollectionFilters';
import { FilterPanel } from './FilterPanel';

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  filters: CollectionFilters;
  showFabric: boolean;
}

export function FilterDrawer({ open, onClose, filters, showFabric }: FilterDrawerProps) {
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

  const count = filters.filtered.length;

  return (
    <AnimatePresence>
      {open &&
      <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
          <motion.div
          className="absolute inset-0 bg-ink/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose} />
        
          <motion.div
          className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-ivory"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}>
          
            <div className="flex h-16 items-center justify-between border-b border-rule px-[18px]">
              <h2 className="font-display text-[26px]">Filter</h2>
              <button
              type="button"
              onClick={onClose}
              className="-mr-2 flex h-11 w-11 items-center justify-center"
              aria-label="Close filters"
              autoFocus>
              
                <XIcon className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-[18px]">
              <FilterPanel filters={filters} showFabric={showFabric} />
            </div>
            <div className="grid grid-cols-2 gap-2 border-t border-rule bg-warm px-[18px] py-4">
              <button
              type="button"
              onClick={filters.clearAll}
              disabled={filters.active.length === 0}
              className="btn-outline px-3 disabled:border-rule disabled:text-taupe disabled:hover:bg-transparent">
              
                Clear all
              </button>
              <button type="button" onClick={onClose} className="btn-primary px-3">
                Show {count} {count === 1 ? 'result' : 'results'}
              </button>
            </div>
          </motion.div>
        </div>
      }
    </AnimatePresence>);

}