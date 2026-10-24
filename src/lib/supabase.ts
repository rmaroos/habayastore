import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Product } from '../types/product';
import { CustomerInquiry, StoredOrder } from '../types/admin';

const STORAGE_KEY_URL = 'habaya_supabase_url';
const STORAGE_KEY_KEY = 'habaya_supabase_key';
const ALT_STORAGE_KEY_URL = 'habaya_admin_supabase_url';
const ALT_STORAGE_KEY_KEY = 'habaya_admin_supabase_key';

export function getSavedCredentials(): { url: string; anonKey: string } {
  const envUrl = import.meta.env.VITE_SUPABASE_URL || '';
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
  const localUrl = localStorage.getItem(STORAGE_KEY_URL) || localStorage.getItem(ALT_STORAGE_KEY_URL) || '';
  const localKey = localStorage.getItem(STORAGE_KEY_KEY) || localStorage.getItem(ALT_STORAGE_KEY_KEY) || '';

  return {
    url: localUrl || envUrl,
    anonKey: localKey || envKey,
  };
}

export function saveCredentials(url: string, anonKey: string) {
  if (url) {
    localStorage.setItem(STORAGE_KEY_URL, url.trim());
    localStorage.setItem(ALT_STORAGE_KEY_URL, url.trim());
  } else {
    localStorage.removeItem(STORAGE_KEY_URL);
    localStorage.removeItem(ALT_STORAGE_KEY_URL);
  }

  if (anonKey) {
    localStorage.setItem(STORAGE_KEY_KEY, anonKey.trim());
    localStorage.setItem(ALT_STORAGE_KEY_KEY, anonKey.trim());
  } else {
    localStorage.removeItem(STORAGE_KEY_KEY);
    localStorage.removeItem(ALT_STORAGE_KEY_KEY);
  }

  // Invalidate client cache on credential change
  cachedClient = null;
  lastUsedUrl = '';
  lastUsedKey = '';
}

let cachedClient: SupabaseClient | null = null;
let lastUsedUrl = '';
let lastUsedKey = '';

export function getSupabase(): SupabaseClient | null {
  const { url, anonKey } = getSavedCredentials();
  if (!url || !anonKey) return null;

  if (cachedClient && lastUsedUrl === url && lastUsedKey === anonKey) {
    return cachedClient;
  }

  try {
    cachedClient = createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
    lastUsedUrl = url;
    lastUsedKey = anonKey;
    return cachedClient;
  } catch (err) {
    console.warn('Supabase client creation error:', err);
    return null;
  }
}

// ---------------------------------------------------------
// SUPABASE AUTHENTICATION HELPERS
// ---------------------------------------------------------

export async function signInAdmin(email: string, password: string) {
  const client = getSupabase();
  if (!client) {
    return { data: null, error: new Error('Supabase is not configured yet. Please enter your project URL & Key.') };
  }
  return await client.auth.signInWithPassword({
    email: email.trim(),
    password,
  });
}

export async function signUpAdmin(email: string, password: string) {
  const client = getSupabase();
  if (!client) {
    return { data: null, error: new Error('Supabase is not configured yet. Please enter your project URL & Key.') };
  }
  return await client.auth.signUp({
    email: email.trim(),
    password,
  });
}

export async function signOutAdmin() {
  const client = getSupabase();
  if (client) {
    await client.auth.signOut();
  }
  sessionStorage.removeItem('habaya_admin_auth');
  sessionStorage.removeItem('habaya_admin_user');
}

export async function getAdminSession() {
  const client = getSupabase();
  if (!client) return null;
  const { data } = await client.auth.getSession();
  return data.session;
}

export async function getAdminUser() {
  const client = getSupabase();
  if (!client) return null;
  const { data } = await client.auth.getUser();
  return data.user;
}

export function onAdminAuthStateChange(callback: (event: string, session: any) => void) {
  const client = getSupabase();
  if (!client) return { data: { subscription: { unsubscribe: () => {} } } };
  return client.auth.onAuthStateChange(callback);
}

export async function testSupabaseConnection(url: string, anonKey: string): Promise<{ success: boolean; message: string }> {
  try {
    const client = createClient(url.trim(), anonKey.trim());
    // Try pinging or querying products
    const { error } = await client.from('products').select('id').limit(1);
    if (error) {
      if (error.code === '42P01') {
        return {
          success: true,
          message: 'Connected to Supabase, but the "products" table was not found yet. Please run the provided SQL setup script below.',
        };
      }
      return { success: false, message: error.message };
    }
    return { success: true, message: 'Successfully connected and verified database tables.' };
  } catch (err: any) {
    return { success: false, message: err?.message || 'Connection failed. Please check your credentials.' };
  }
}

// Transform database row to Product
export function rowToProduct(row: any): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    type: row.type,
    collection: row.collection,
    description: row.description,
    price: Number(row.price),
    compareAt: row.compare_at ? Number(row.compare_at) : undefined,
    material: row.material,
    dimensions: row.dimensions,
    care: Array.isArray(row.care) ? row.care : typeof row.care === 'string' ? JSON.parse(row.care) : [],
    colours: Array.isArray(row.colours) ? row.colours : typeof row.colours === 'string' ? JSON.parse(row.colours) : [],
    isNew: Boolean(row.is_new),
    featured: Boolean(row.featured),
    addedOrder: Number(row.added_order || 0),
  };
}

// Transform Product to database row
export function productToRow(p: Product) {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    type: p.type,
    collection: p.collection,
    description: p.description,
    price: p.price,
    compare_at: p.compareAt ?? null,
    material: p.material,
    dimensions: p.dimensions,
    care: p.care,
    colours: p.colours,
    is_new: p.isNew ?? false,
    featured: p.featured ?? false,
    added_order: p.addedOrder,
  };
}

// Transform row to StoredOrder
export function rowToOrder(row: any): StoredOrder {
  return {
    id: row.id,
    reference: row.reference,
    email: row.email,
    name: row.name,
    address: row.address,
    delivery: typeof row.delivery === 'string' ? JSON.parse(row.delivery) : row.delivery,
    deliveryCost: Number(row.delivery_cost),
    subtotal: Number(row.subtotal),
    total: Number(row.total),
    lines: Array.isArray(row.lines) ? row.lines : typeof row.lines === 'string' ? JSON.parse(row.lines) : [],
    status: row.status,
    createdAt: row.created_at,
    notes: row.notes || undefined,
  };
}

export function orderToRow(o: StoredOrder) {
  return {
    id: o.id,
    reference: o.reference,
    email: o.email,
    name: o.name,
    address: o.address,
    delivery: o.delivery,
    delivery_cost: o.deliveryCost,
    subtotal: o.subtotal,
    total: o.total,
    lines: o.lines,
    status: o.status,
    notes: o.notes ?? null,
    created_at: o.createdAt,
  };
}

export function rowToInquiry(row: any): CustomerInquiry {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    orderNumber: row.order_number || undefined,
    topic: row.topic,
    message: row.message,
    status: row.status,
    createdAt: row.created_at,
  };
}

export function inquiryToRow(i: CustomerInquiry) {
  return {
    id: i.id,
    name: i.name,
    email: i.email,
    order_number: i.orderNumber ?? null,
    topic: i.topic,
    message: i.message,
    status: i.status,
    created_at: i.createdAt,
  };
}

export const SUPABASE_SQL_SCHEMA = `-- HABAYA CLOUD DATABASE SCHEMA
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)

-- 1. Create Products Table
create table if not exists public.products (
  id text primary key,
  slug text unique not null,
  name text not null,
  type text not null,
  collection text not null,
  description text not null,
  price numeric not null,
  compare_at numeric,
  material text not null,
  dimensions text not null,
  care jsonb not null default '[]'::jsonb,
  colours jsonb not null default '[]'::jsonb,
  is_new boolean default false,
  featured boolean default false,
  added_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create Orders Table
create table if not exists public.orders (
  id text primary key,
  reference text unique not null,
  email text not null,
  name text not null,
  address text not null,
  delivery jsonb not null,
  delivery_cost numeric not null,
  subtotal numeric not null,
  total numeric not null,
  lines jsonb not null default '[]'::jsonb,
  status text not null default 'Pending',
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Create Inquiries Table
create table if not exists public.inquiries (
  id text primary key,
  name text not null,
  email text not null,
  order_number text,
  topic text not null,
  message text not null,
  status text not null default 'New',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.inquiries enable row level security;

-- Policies for public app access (read & write)
create policy "Allow all access to products" on public.products for all using (true) with check (true);
create policy "Allow all access to orders" on public.orders for all using (true) with check (true);
create policy "Allow all access to inquiries" on public.inquiries for all using (true) with check (true);

-- Enable real-time replication if desired
alter publication supabase_realtime add table public.products;
alter publication supabase_realtime add table public.orders;
alter publication supabase_realtime add table public.inquiries;
`;
