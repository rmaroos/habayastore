export type CollectionSlug =
'printed-modal' |
'modal-hijabs' |
'jersey-hijabs' |
'premium-chiffon';

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
  /** Higher numbers were added more recently. */
  addedOrder: number;
}

export interface Collection {
  slug: CollectionSlug;
  name: string;
  shortName: string;
  description: string;
  image: string;
}

export interface CartItem {
  productId: string;
  colour: string;
  quantity: number;
}

export interface CartLine extends CartItem {
  product: Product;
  variant: ProductColour;
  lineTotal: number;
}

export interface DeliveryOption {
  id: 'standard' | 'express' | 'collect';
  label: string;
  detail: string;
  price: number;
  freeOver?: number;
}

export interface PlacedOrder {
  reference: string;
  email: string;
  name: string;
  address: string;
  delivery: DeliveryOption;
  deliveryCost: number;
  subtotal: number;
  total: number;
  lines: {name: string;colour: string;quantity: number;lineTotal: number;image: string;}[];
}