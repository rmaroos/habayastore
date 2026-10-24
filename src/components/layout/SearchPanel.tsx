import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { SearchIcon, XIcon } from 'lucide-react';
import { collections } from '../../data/collections';

interface SearchPanelProps {
  open: boolean;
  onClose: () => void;
}

export function SearchPanel({ open, onClose }: SearchPanelProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
    setQuery('');
  };

  return (
    <AnimatePresence>
      {open &&
      <motion.div
        id="site-search"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
        className="absolute inset-x-0 top-full border-b border-rule bg-warm shadow-[0_12px_24px_-16px_rgba(48,37,31,0.25)]">
        
          <div className="container-page py-8 lg:py-10">
            <form role="search" onSubmit={submit} className="flex items-center gap-3 border-b border-ink pb-3">
              <SearchIcon className="h-5 w-5 shrink-0 text-ink-soft" strokeWidth={1.5} aria-hidden="true" />
              <label htmlFor="site-search-input" className="sr-only">
                Search Habaya
              </label>
              <input
              ref={inputRef}
              id="site-search-input"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search hijabs, fabrics or colours"
              className="w-full bg-transparent font-display text-[26px] text-ink placeholder:text-taupe focus:outline-none lg:text-[32px]" />
            
              <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 shrink-0 items-center justify-center text-ink-soft hover:text-ink"
              aria-label="Close search">
              
                <XIcon className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </form>
            <div className="mt-5 flex flex-wrap items-baseline gap-x-6 gap-y-2 text-[14px]">
              <span className="eyebrow">Browse</span>
              {collections.map((c) =>
            <Link key={c.slug} to={`/collections/${c.slug}`} className="link-underline text-ink">
                  {c.name}
                </Link>
            )}
            </div>
          </div>
        </motion.div>
      }
    </AnimatePresence>);

}