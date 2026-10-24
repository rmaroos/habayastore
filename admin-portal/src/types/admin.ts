import { Product } from './product';

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
  delivery: {
    id: string;
    label: string;
    detail: string;
    price: number;
  };
  deliveryCost: number;
  subtotal: number;
  total: number;
  lines: AdminOrderLine[];
  status: OrderStatus;
  createdAt: string;
  notes?: string;
}

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
