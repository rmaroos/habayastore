import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../types/product';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductGallery } from '../components/product/ProductGallery';
import { PurchasePanel } from '../components/product/PurchasePanel';
import { RelatedCarousel } from '../components/product/RelatedCarousel';
import { getCollection, getProductBySlug, getRelatedProducts } from '../utils/catalogue';
import { useStore } from '../contexts/StoreContext';
import { NotFound } from './NotFound';

export function ProductDetail() {
  const { slug = '' } = useParams();
  const { products } = useStore();
  const product = useMemo(() => getProductBySlug(slug), [slug, products]);
  if (!product) return <NotFound />;
  return <ProductView key={product.id} product={product} />;
}

function ProductView({ product }: {product: Product;}) {
  const firstAvailable = Math.max(0, product.colours.findIndex((c) => c.stock > 0));
  const [activeIndex, setActiveIndex] = useState(firstAvailable);
  const collection = getCollection(product.collection);

  return (
    <>
      <div className="container-page pb-16 pt-6 lg:pb-24 lg:pt-8">
        <Breadcrumbs
          items={[
          { label: 'Home', to: '/' },
          ...(collection ? [{ label: collection.name, to: `/collections/${collection.slug}` }] : []),
          { label: product.name }]
          } />
        
        <div className="mt-6 grid gap-10 lg:mt-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <ProductGallery product={product} activeIndex={activeIndex} onSelect={setActiveIndex} />
          </div>
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[160px]">
              <PurchasePanel product={product} activeIndex={activeIndex} onSelect={setActiveIndex} />
            </div>
          </div>
        </div>
      </div>
      <RelatedCarousel heading="You may also love" products={getRelatedProducts(product, 6)} />
    </>);

}