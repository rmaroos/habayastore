import React, { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { SearchIcon } from 'lucide-react';
import { collections } from '../data/collections';
import { ProductCard } from '../components/product/ProductCard';
import { searchProducts } from '../utils/catalogue';
import { useStore } from '../contexts/StoreContext';

export function Search() {
  const [params, setParams] = useSearchParams();
  const { products } = useStore();
  const q = params.get('q') ?? '';
  const [input, setInput] = useState(q);
  const results = useMemo(() => searchProducts(q), [q, products]);

  useEffect(() => setInput(q), [q]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = input.trim();
    setParams(value ? { q: value } : {});
  };

  return (
    <div className="container-page py-10 lg:py-16">
      <form role="search" onSubmit={submit} className="mx-auto flex max-w-2xl items-center gap-3 border-b border-ink pb-3">
        <SearchIcon className="h-5 w-5 shrink-0 text-ink-soft" strokeWidth={1.5} aria-hidden="true" />
        <label htmlFor="search-page-input" className="sr-only">
          Search
        </label>
        <input
          id="search-page-input"
          type="search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search hijabs, fabrics or colours"
          className="w-full bg-transparent font-display text-[26px] placeholder:text-taupe focus:outline-none lg:text-[32px]" />
        
        <button type="submit" className="text-[13px] font-bold uppercase tracking-[0.14em] text-ink hover:text-burgundy">
          Search
        </button>
      </form>

      {q &&
      <div className="mt-12 lg:mt-16">
          <h1 className="font-display text-[34px] leading-tight lg:text-[44px]">
            {results.length > 0 ?
          <>
                Results for <em className="italic">“{q}”</em>
              </> :

          <>
                Nothing found for <em className="italic">“{q}”</em>
              </>
          }
          </h1>
          <p className="mt-2 text-[14px] text-ink-soft" aria-live="polite">
            {results.length} {results.length === 1 ? 'hijab' : 'hijabs'}
          </p>

          {results.length > 0 ?
        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
              {results.map((p) =>
          <li key={p.id}>
                  <ProductCard product={p} />
                </li>
          )}
            </ul> :

        <EmptySuggestions />
        }
        </div>
      }

      {!q &&
      <div className="mt-12 text-center">
          <p className="text-[15px] text-ink-soft">Try a fabric like “modal”, a colour like “sage”, or browse below.</p>
          <EmptySuggestions />
        </div>
      }
    </div>);

}

function EmptySuggestions() {
  return (
    <div className="mt-8">
      <p className="text-[15px] text-ink-soft">Check the spelling, try a broader word, or explore a collection:</p>
      <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
        {collections.map((c) =>
        <li key={c.slug}>
            <Link to={`/collections/${c.slug}`} className="link-underline font-display text-[22px]">
              {c.name}
            </Link>
          </li>
        )}
      </ul>
    </div>);

}