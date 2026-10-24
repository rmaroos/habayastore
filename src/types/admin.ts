import { CollectionSlug, DeliveryOption, Product, ProductColour } from './product';

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface AdminOrderLine {
  name: string;
  colour: string;
  quantity: number;
  lineTotal: number;
  image: string;
}

export interface StoredOrder {
  id: string;
  reference: string;
  email: string;
  name: string;
  address: string;
  delivery: DeliveryOption;
  deliveryCost: number;
  subtotal: number;
  total: number;
  lines: AdminOrderLine[];
  status: OrderStatus;
  createdAt: string;
  notes?: string;
}

export type InquiryTopic =
  | 'Order or delivery'
  | 'Returns'
  | 'Product question'
  | 'Flagship store'
  | 'Something else';

export type InquiryStatus = 'New' | 'In Progress' | 'Resolved';

export interface CustomerInquiry {
  id: string;
  name: string;
  email: string;
  orderNumber?: string;
  topic: string;
  message: string;
  status: InquiryStatus;
  createdAt: string;
}

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  isConnected: boolean;
  lastChecked?: string;
}

export interface StoreBackup {
  version: string;
  exportedAt: string;
  products: Product[];
  orders: StoredOrder[];
  inquiries: CustomerInquiry[];
}
