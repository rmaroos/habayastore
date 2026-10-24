# Habaya Boutique & Admin — Supabase Integration & Setup Guide

This guide details how to configure Supabase cloud database, real-time synchronization, and email/password authentication for Habaya Boutique.

---

## 1. Create a Free Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign in or create an account.
2. Click **"New project"**.
3. Choose an organization, project name (e.g. `habaya-boutique`), strong database password, and your nearest region.
4. Wait 1–2 minutes for the database to provision.

---

## 2. Run Database Schema & Seed Catalog

1. In your Supabase project dashboard, open the **SQL Editor** from the left sidebar.
2. Click **"New query"**.
3. Copy the entire contents of [`supabase/schema.sql`](./schema.sql) and paste it into the editor.
4. Click **Run** (green button). This creates:
   - `products` table (with slug, pricing, collection, colours, dimensions, stock)
   - `orders` table (with checkout customer details, lines, totals, status)
   - `inquiries` table (with customer contact submissions)
   - Realtime publication subscriptions on `products`, `orders`, and `inquiries`
5. Next, create another query, copy [`supabase/seed.sql`](./seed.sql), paste it, and click **Run**.
6. Check **Table Editor** on the left: your tables will now be seeded with initial boutique catalog products.

---

## 3. Configure Supabase Authentication (Email & Password)

1. In your Supabase dashboard, go to **Authentication** &rarr; **Providers** &rarr; **Email**.
2. Ensure **Email provider** is toggled **ON**.
3. **Recommended for Instant Admin Access:**
   - Under Email Provider settings, uncheck **"Confirm email"** if you want newly created admin accounts to log in immediately without waiting for verification emails.
   - Alternatively, keep "Confirm email" enabled and verify the account via the confirmation email link, or manually set the user as confirmed in the **Authentication > Users** tab.
4. You can also manually create admin users anytime from **Authentication** &rarr; **Users** &rarr; **"Add user"** (enter email & password).

---

## 4. Retrieve API Credentials

1. Go to **Project Settings** (gear icon) &rarr; **API**.
2. Copy:
   - **Project URL:** `https://your-project-id.supabase.co`
   - **Project API Keys &rarr; `anon` `public`:** `eyJhbGciOiJIUzI1Ni...`

---

## 5. Environment Variables

### Main Storefront (`Habaya1`)
Create or edit `.env` in the root folder:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Standalone Admin Portal (`admin-portal/`)
Create or edit `admin-portal/.env`:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_STORE_URL=https://habaya-boutique.vercel.app
```

*(Note: You can also configure credentials directly inside the Admin interface in the "Cloud & Database" tab or on the Admin Login screen at any time!)*

---

## 6. Real-Time Synchronization Explained

- **Products**: Any product added, updated, or deleted in the admin portal immediately publishes via Supabase Realtime (`postgres_changes` on `products`) and updates customer storefronts in real time without refreshing.
- **Cross-Window Sync**: For local testing across tabs, instant `BroadcastChannel` events guarantee zero-latency synchronization between the admin and store windows.
- **Orders & Inquiries**: New orders from checkout and contact inquiries stream directly into the Admin dashboard in real time.

---

## 7. Fast Production Deployment (Vercel)

Both repositories include ready-to-deploy `vercel.json` configurations with SPA route rewrites and long-term asset caching:

### Deploying the Storefront:
1. Push repository to GitHub.
2. In Vercel, import the repository with Root Directory `./`.
3. Add environment variables: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
4. Deploy!

### Deploying the Standalone Admin Portal:
1. In Vercel, import the same repository.
2. In Project Settings, set **Root Directory** to `admin-portal`.
3. Add environment variables: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, and `VITE_STORE_URL`.
4. Deploy!
