import React from 'react';
import { ChevronDownIcon, SlidersHorizontalIcon, XIcon } from 'lucide-react';
import { sortOptions } from '../../data/site';
import { CollectionFilters } from '../../hooks/useCollectionFilters';

interface CollectionToolbarProps {
  filters: CollectionFilters;
  onOpenFilters: () => void;
}

export function CollectionToolbar({ filters, onOpenFilters }: CollectionToolbarProps) {
  const count = filters.filtered.length;
  return (
    <div>
      <div className="flex items-center justify-between gap-4 border-b border-rule pb-4">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onOpenFilters}
            className="flex h-10 items-center gap-2 rounded-[2px] border border-ink px-4 text-[13px] font-bold lg:hidden">
            
            <SlidersHorizontalIcon className="h-4 w-4" strokeWidth={1.5} />
            Filter
            {filters.active.length > 0 && <span className="text-ink-soft">({filters.active.length})</span>}
          </button>
          <p className="text-[13px] text-ink-soft" aria-live="polite">
            {count} {count === 1 ? 'hijab' : 'hijabs'}
          </p>
        </div>
        <div className="relative flex items-center gap-2">
          <label htmlFor="sort" className="hidden text-[13px] text-ink-soft sm:block">
            Sort by
          </label>
          <select
            id="sort"
            value={filters.sort}
            onChange={(e) => filters.setSort(e.target.value)}
            className="h-10 appearance-none rounded-[2px] border border-rule bg-warm py-0 pl-3 pr-9 text-[13px] text-ink hover:border-taupe focus:border-ink focus:outline-none">
            
            {sortOptions.map((o) =>
            <option key={o.id} value={o.id}>
                {o.label}
              </option>
            )}
          </select>
          <ChevronDownIcon
            className="pointer-events-none absolute right-3 h-4 w-4 text-ink-soft"
            strokeWidth={1.5}
            aria-hidden="true" />
          
        </div>
      </div>

      {filters.active.length > 0 &&
      <div className="flex flex-wrap items-center gap-2 pt-4">
          {filters.active.map((f) =>
        <button
          key={`${f.key}-${f.value}`}
          type="button"
          onClick={() => filters.removeFilter(f)}
          className="flex h-8 items-center gap-1.5 rounded-[2px] border border-ink bg-warm px-3 text-[13px] text-ink transition-colors duration-150 ease-out hover:bg-parchment"
          aria-label={`Remove filter: ${f.label}`}>
          
              {f.label}
              <XIcon className="h-3.5 w-3.5" strokeWidth={1.75} />
            </button>
        )}
          <button
          type="button"
          onClick={filters.clearAll}
          className="ml-1 text-[13px] text-ink-soft underline underline-offset-4 hover:text-burgundy">
          
            Clear all
          </button>
        </div>
      }
    </div>);

}