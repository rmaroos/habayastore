-- ==============================================================================
-- HABAYA BOUTIQUE & ADMIN - SUPABASE DATABASE SCHEMA
-- ==============================================================================
-- Run this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql
-- ==============================================================================

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
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index for fast lookup by collection and slug
create index if not exists idx_products_collection on public.products(collection);
create index if not exists idx_products_slug on public.products(slug);
create index if not exists idx_products_featured on public.products(featured);

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
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_orders_reference on public.orders(reference);
create index if not exists idx_orders_email on public.orders(email);
create index if not exists idx_orders_status on public.orders(status);

-- 3. Create Customer Inquiries Table
create table if not exists public.inquiries (
  id text primary key,
  name text not null,
  email text not null,
  order_number text,
  topic text not null,
  message text not null,
  status text not null default 'New',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_inquiries_email on public.inquiries(email);
create index if not exists idx_inquiries_status on public.inquiries(status);

-- 4. Enable Row Level Security (RLS)
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.inquiries enable row level security;

-- Drop existing policies if any to prevent conflicts when re-running
drop policy if exists "Public read and write access to products" on public.products;
drop policy if exists "Public read and write access to orders" on public.orders;
drop policy if exists "Public read and write access to inquiries" on public.inquiries;

-- Create policies for public access (Store + Admin Panel)
create policy "Public read and write access to products" 
  on public.products for all 
  using (true) 
  with check (true);

create policy "Public read and write access to orders" 
  on public.orders for all 
  using (true) 
  with check (true);

create policy "Public read and write access to inquiries" 
  on public.inquiries for all 
  using (true) 
  with check (true);

-- 5. Enable Realtime Replication
-- Allows both the customer store and admin panel to get live updates immediately
alter publication supabase_realtime add table public.products;
alter publication supabase_realtime add table public.orders;
alter publication supabase_realtime add table public.inquiries;
