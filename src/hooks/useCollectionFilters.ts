import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { collections } from '../data/collections';
import { priceRanges, sortOptions } from '../data/site';
import { ColourFamily, Product } from '../types/product';
import { isOnSale } from '../utils/catalogue';

export const PAGE_SIZE = 6;

export const colourFamilyHex: Record<ColourFamily, string> = {
  Neutrals: '#CDB596',
  Pinks: '#D9A9A4',
  Greens: '#9AA58C',
  Blues: '#5F7391',
  Reds: '#8B3A3A',
  Darks: '#2A2422'
};

export type ListKey = 'colour' | 'fabric' | 'price';
export type FlagKey = 'stock' | 'sale';

export interface ActiveFilter {
  key: ListKey | FlagKey;
  value: string;
  label: string;
}

function readList(params: URLSearchParams, key: string): string[] {
  return params.get(key)?.split(',').filter(Boolean) ?? [];
}

export function useCollectionFilters(base: Product[]) {
  const [params, setParams] = useSearchParams();

  const colour = readList(params, 'colour');
  const fabric = readList(params, 'fabric');
  const price = readList(params, 'price');
  const stock = params.get('stock') === '1';
  const sale = params.get('sale') === '1';
  const sort = sortOptions.some((o) => o.id === params.get('sort')) ? params.get('sort') as string : 'featured';
  const page = Math.max(1, Number(params.get('page') ?? '1') || 1);

  const filtered = useMemo(() => {
    const ranges = priceRanges.filter((r) => price.includes(r.id));
    const result = base.filter((p) => {
      if (fabric.length && !fabric.includes(p.collection)) return false;
      if (ranges.length && !ranges.some((r) => p.price >= r.min && p.price <= r.max)) return false;
      if (sale && !isOnSale(p)) return false;
      const variants = p.colours.filter((c) => (!colour.length || colour.includes(c.family)) && (!stock || c.stock > 0));
      return variants.length > 0;
    });
    const sorted = [...result];
    if (sort === 'newest') sorted.sort((a, b) => b.addedOrder - a.addedOrder);
    if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price);
    if (sort === 'featured') sorted.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    return sorted;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [base, params]);

  const update = useCallback(
    (mutate: (next: URLSearchParams) => void) => {
      const next = new URLSearchParams(params);
      mutate(next);
      next.delete('page');
      setParams(next, { replace: true, preventScrollReset: true });
    },
    [params, setParams]
  );

  const toggleList = (key: ListKey, value: string) =>
  update((next) => {
    const current = readList(next, key);
    const updated = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
    if (updated.length) next.set(key, updated.join(','));else
    next.delete(key);
  });

  const toggleFlag = (key: FlagKey) =>
  update((next) => {
    if (next.get(key) === '1') next.delete(key);else
    next.set(key, '1');
  });

  const setSort = (value: string) =>
  update((next) => {
    if (value === 'featured') next.delete('sort');else
    next.set('sort', value);
  });

  const clearAll = () =>
  update((next) => {
    ['colour', 'fabric', 'price', 'stock', 'sale'].forEach((k) => next.delete(k));
  });

  const loadMore = () => {
    const next = new URLSearchParams(params);
    next.set('page', String(page + 1));
    setParams(next, { replace: true, preventScrollReset: true });
  };

  const active: ActiveFilter[] = [
  ...fabric.map((v) => ({ key: 'fabric' as const, value: v, label: collections.find((c) => c.slug === v)?.shortName ?? v })),
  ...colour.map((v) => ({ key: 'colour' as const, value: v, label: v })),
  ...price.map((v) => ({ key: 'price' as const, value: v, label: priceRanges.find((r) => r.id === v)?.label ?? v })),
  ...(stock ? [{ key: 'stock' as const, value: '1', label: 'In stock' }] : []),
  ...(sale ? [{ key: 'sale' as const, value: '1', label: 'On sale' }] : [])];


  const removeFilter = (f: ActiveFilter) => {
    if (f.key === 'stock' || f.key === 'sale') toggleFlag(f.key);else
    toggleList(f.key, f.value);
  };

  const families = Array.from(new Set(base.flatMap((p) => p.colours.map((c) => c.family)))) as ColourFamily[];
  const fabrics = collections.filter((c) => base.some((p) => p.collection === c.slug));

  return {
    selected: { colour, fabric, price, stock, sale },
    sort,
    filtered,
    visible: filtered.slice(0, page * PAGE_SIZE),
    hasMore: filtered.length > page * PAGE_SIZE,
    active,
    options: { families, fabrics, priceRanges },
    toggleList,
    toggleFlag,
    setSort,
    clearAll,
    removeFilter,
    loadMore
  };
}

export type CollectionFilters = ReturnType<typeof useCollectionFilters>;