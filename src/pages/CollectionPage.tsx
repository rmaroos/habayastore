import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductCard } from '../components/product/ProductCard';
import { RelatedCarousel } from '../components/product/RelatedCarousel';
import { FilterPanel } from '../components/collection/FilterPanel';
import { FilterDrawer } from '../components/collection/FilterDrawer';
import { CollectionToolbar } from '../components/collection/CollectionToolbar';
import { useCollectionFilters } from '../hooks/useCollectionFilters';
import { getCollectionView, getRelatedForCollection } from '../utils/catalogue';
import { useStore } from '../contexts/StoreContext';
import { NotFound } from './NotFound';

export function CollectionPage() {
  const { slug } = useParams();
  const { products } = useStore();
  const view = useMemo(() => getCollectionView(slug), [slug, products]);
  if (!view) return <NotFound />;
  return <CollectionView key={`${view.slug}-${products.length}`} view={view} />;
}

function CollectionView({ view }: {view: NonNullable<ReturnType<typeof getCollectionView>>;}) {
  const filters = useCollectionFilters(view.products);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const related = getRelatedForCollection(view.slug);

  const crumbs = view.slug === 'all' ?
  [{ label: 'Home', to: '/' }, { label: 'Shop' }] :
  [{ label: 'Home', to: '/' }, { label: 'Shop', to: '/shop' }, { label: view.title }];

  return (
    <>
      <section className="border-b border-rule">
        <div className="container-page pb-10 pt-8 lg:pb-14 lg:pt-10">
          <Breadcrumbs items={crumbs} />
          <div className="mt-8 grid gap-4 lg:mt-10 lg:grid-cols-12 lg:items-end lg:gap-8">
            <h1 className="font-display text-[42px] font-medium leading-none lg:col-span-7 lg:text-[64px]">
              {view.title}
            </h1>
            <p className="max-w-md text-[16px] leading-relaxed text-ink-soft lg:col-span-5 lg:justify-self-end">
              {view.description}
            </p>
          </div>
        </div>
      </section>

      <section className="container-page py-8 lg:py-12">
        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12">
          <aside aria-label="Filters" className="hidden lg:block">
            <div className="sticky top-[160px]">
              <FilterPanel filters={filters} showFabric={view.isAll} />
              {filters.active.length > 0 &&
              <button
                type="button"
                onClick={filters.clearAll}
                className="mt-4 text-[13px] text-ink-soft underline underline-offset-4 hover:text-burgundy">
                
                  Clear all filters
                </button>
              }
            </div>
          </aside>

          <div>
            <CollectionToolbar filters={filters} onOpenFilters={() => setDrawerOpen(true)} />

            {filters.filtered.length === 0 ?
            <div className="flex flex-col items-center py-20 text-center">
                <p className="font-display text-[30px] leading-tight">Nothing matches those filters</p>
                <p className="mt-2 max-w-sm text-[15px] text-ink-soft">
                  Try removing a filter or two — the right hijab may simply be in another colour.
                </p>
                <button type="button" onClick={filters.clearAll} className="btn-outline mt-6">
                  Clear filters
                </button>
              </div> :

            <>
                <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:gap-x-6 lg:gap-y-14">
                  {filters.visible.map((p) =>
                <li key={p.id}>
                      <ProductCard product={p} />
                    </li>
                )}
                </ul>
                <div className="mt-14 flex flex-col items-center gap-4">
                  <p className="text-[13px] text-ink-soft">
                    Showing {filters.visible.length} of {filters.filtered.length}
                  </p>
                  <div className="h-[2px] w-40 bg-linen" aria-hidden="true">
                    <div
                    className="h-full bg-ink"
                    style={{ width: `${filters.visible.length / filters.filtered.length * 100}%` }} />
                  
                  </div>
                  {filters.hasMore &&
                <button type="button" onClick={filters.loadMore} className="btn-outline mt-2">
                      Load more
                    </button>
                }
                </div>
              </>
            }
          </div>
        </div>
      </section>

      <RelatedCarousel heading={related.heading} products={related.products} />

      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        showFabric={view.isAll} />
      
    </>);

}