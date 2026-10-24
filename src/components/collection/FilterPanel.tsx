import React from 'react';
import { CheckIcon } from 'lucide-react';
import { CollectionFilters, colourFamilyHex } from '../../hooks/useCollectionFilters';

interface FilterPanelProps {
  filters: CollectionFilters;
  showFabric: boolean;
}

export function FilterPanel({ filters, showFabric }: FilterPanelProps) {
  const { selected, options, toggleList, toggleFlag } = filters;

  return (
    <div className="divide-y divide-rule border-y border-rule">
      {showFabric && options.fabrics.length > 1 &&
      <FilterGroup legend="Fabric">
          {options.fabrics.map((c) =>
        <CheckRow
          key={c.slug}
          label={c.shortName}
          checked={selected.fabric.includes(c.slug)}
          onChange={() => toggleList('fabric', c.slug)} />

        )}
        </FilterGroup>
      }

      <FilterGroup legend="Colour">
        {options.families.map((f) =>
        <CheckRow
          key={f}
          label={f}
          checked={selected.colour.includes(f)}
          onChange={() => toggleList('colour', f)}
          swatch={colourFamilyHex[f]} />

        )}
      </FilterGroup>

      <FilterGroup legend="Price">
        {options.priceRanges.map((r) =>
        <CheckRow
          key={r.id}
          label={r.label}
          checked={selected.price.includes(r.id)}
          onChange={() => toggleList('price', r.id)} />

        )}
      </FilterGroup>

      <FilterGroup legend="Availability">
        <CheckRow label="In stock only" checked={selected.stock} onChange={() => toggleFlag('stock')} />
        <CheckRow label="On sale" checked={selected.sale} onChange={() => toggleFlag('sale')} />
      </FilterGroup>
    </div>);

}

function FilterGroup({ legend, children }: {legend: string;children: React.ReactNode;}) {
  return (
    <fieldset className="py-5">
      <legend className="float-left mb-3 w-full text-[11px] font-bold uppercase tracking-[0.2em] text-ink-soft">
        {legend}
      </legend>
      <div className="clear-both space-y-1">{children}</div>
    </fieldset>);

}

interface CheckRowProps {
  label: string;
  checked: boolean;
  onChange: () => void;
  swatch?: string;
}

function CheckRow({ label, checked, onChange, swatch }: CheckRowProps) {
  return (
    <label className="group flex min-h-9 cursor-pointer items-center gap-3 text-[14px] text-ink">
      <input type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
      <span
        aria-hidden="true"
        className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[1px] border transition-colors duration-150 ease-out peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-burgundy ${
        checked ? 'border-ink bg-ink text-warm' : 'border-taupe bg-warm group-hover:border-ink'}`
        }>
        
        {checked && <CheckIcon className="h-3 w-3" strokeWidth={2.5} />}
      </span>
      {swatch &&
      <span aria-hidden="true" className="h-3.5 w-3.5 rounded-full border border-ink/15" style={{ backgroundColor: swatch }} />
      }
      <span className={checked ? 'font-bold' : ''}>{label}</span>
    </label>);

}