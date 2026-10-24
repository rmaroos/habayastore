export type CollectionSlug =
  | 'printed-modal'
  | 'modal-hijabs'
  | 'jersey-hijabs'
  | 'premium-chiffon';

export type ColourFamily = 'Neutrals' | 'Pinks' | 'Greens' | 'Blues' | 'Reds' | 'Darks';

export interface ProductColour {
  name: string;
  hex: string;
  family: ColourFamily;
  image: string;
  stock: number;
  sku: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  type: string;
  collection: CollectionSlug;
  description: string;
  price: number;
  compareAt?: number;
  material: string;
  dimensions: string;
  care: string[];
  colours: ProductColour[];
  isNew?: boolean;
  featured?: boolean;
  addedOrder: number;
}

export interface Collection {
  slug: CollectionSlug;
  name: string;
  shortName: string;
  description: string;
  image: string;
}
