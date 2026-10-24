import { collections } from '../data/collections';
import { products as initialProducts } from '../data/products';
import { Collection, Product } from '../types/product';

let currentProducts: Product[] = initialProducts;

// Try to hydrate immediately from localStorage if available
try {
  const stored = localStorage.getItem('habaya_products');
  if (stored) {
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed) && parsed.length > 0) {
      currentProducts = parsed;
    }
  }
} catch {
  // Ignore localStorage read errors
}

export function setCatalogProducts(list: Product[]) {
  currentProducts = list;
}

export function getCatalogProducts(): Product[] {
  return currentProducts;
}

export interface CollectionView {
  slug: string;
  title: string;
  description: string;
  products: Product[];
  isAll: boolean;
}

export function getProductBySlug(slug: string): Product | undefined {
  return currentProducts.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return currentProducts.find((p) => p.id === id);
}

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function totalStock(product: Product): number {
  return product.colours.reduce((sum, c) => sum + c.stock, 0);
}

export function isInStock(product: Product): boolean {
  return totalStock(product) > 0;
}

export function isOnSale(product: Product): boolean {
  return product.compareAt !== undefined && product.compareAt > product.price;
}

export function productsInCollection(slug: string): Product[] {
  return currentProducts.filter((p) => p.collection === slug);
}

export function getCollectionView(slug: string | undefined): CollectionView | null {
  if (!slug || slug === 'all') {
    return {
      slug: 'all',
      title: 'Shop all',
      description:
        'Every Habaya hijab, from printed modal to fine chiffon. Filter by colour, fabric and price to find your next favourite.',
      products: currentProducts,
      isAll: true,
    };
  }
  if (slug === 'new-arrivals') {
    return {
      slug,
      title: 'New in',
      description: 'The latest additions to the archive — new prints and colours, freshly arrived.',
      products: [...currentProducts].sort((a, b) => b.addedOrder - a.addedOrder).slice(0, 5),
      isAll: true,
    };
  }
  if (slug === 'sale') {
    return {
      slug,
      title: 'Sale',
      description: 'A small selection of pieces at a reduced price, while stock lasts.',
      products: currentProducts.filter(isOnSale),
      isAll: true,
    };
  }
  const collection = getCollection(slug);
  if (!collection) return null;
  return {
    slug,
    title: collection.name,
    description: collection.description,
    products: productsInCollection(slug),
    isAll: false,
  };
}

export function getRelatedForCollection(slug: string): { heading: string; products: Product[] } {
  if (slug === 'jersey-hijabs') {
    return {
      heading: 'Something lighter? Try chiffon',
      products: productsInCollection('premium-chiffon').concat(productsInCollection('modal-hijabs')),
    };
  }
  return {
    heading: 'Did anyone say jersey?',
    products: productsInCollection('jersey-hijabs').concat(productsInCollection('modal-hijabs')),
  };
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const sameCollection = currentProducts.filter((p) => p.collection === product.collection && p.id !== product.id);
  const others = currentProducts.filter((p) => p.collection !== product.collection && p.id !== product.id);
  return [...sameCollection, ...others].slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];
  return currentProducts.filter((p) => {
    const collectionName = getCollection(p.collection)?.name ?? '';
    const haystack = [
      p.name,
      p.description,
      p.type,
      p.material,
      collectionName,
      ...p.colours.map((c) => `${c.name} ${c.family}`),
    ]
      .join(' ')
      .toLowerCase();
    return terms.every((t) => haystack.includes(t) || haystack.includes(t.replace(/s$/, '')));
  });
}