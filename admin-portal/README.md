# Habaya Atelier • Admin Suite

Standalone client management portal for Habaya Boutique. Manage products, live inventory, stock levels, orders from checkout, and customer inquiries with real-time Supabase cloud synchronization.

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Navigate to the admin-portal directory
cd admin-portal

# 2. Install dependencies
npm install

# 3. Create .env from .env.example
cp .env.example .env

# 4. Start the development server (runs on http://localhost:5174)
npm run dev
```

---

## 🌐 Deploying to Vercel & GitHub

You have two simple options to deploy this Admin Portal:

### Option A: Deploy as a Sub-project from the main repository (Recommended)

1. Push your repository to GitHub.
2. In the [Vercel Dashboard](https://vercel.com/dashboard), click **"Add New Project"** and import your GitHub repository.
3. In the project configuration:
   - **Project Name:** `habaya-admin`
   - **Framework Preset:** `Vite`
   - **Root Directory:** Click **Edit** and select `admin-portal`
4. Expand **Environment Variables** and add:
   - `VITE_SUPABASE_URL` = Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` = Your Supabase anon public key
   - `VITE_ADMIN_PASSWORD` = Your desired secret admin passcode (e.g. `yourStrongPassword`)
   - `VITE_STORE_URL` = URL of your deployed customer boutique (e.g. `https://habaya.vercel.app`)
5. Click **Deploy**. Vercel will build and deploy your standalone admin portal!

---

### Option B: Deploy from its own independent GitHub repository

If you wish to keep the Admin Portal code completely separated into its own GitHub repository:

```bash
# Navigate to the folder
cd admin-portal

# Initialize git repository
git init
git branch -M main
git add .
git commit -m "Initial commit of Habaya Admin Portal"

# Link to your new GitHub repository
git remote add origin https://github.com/your-username/habaya-admin.git
git push -u origin main
```
Then import that repository directly into Vercel!

---

## 🔒 Security
The admin portal includes a passcode security screen. The passcode can be customized via the `VITE_ADMIN_PASSWORD` environment variable (defaults to `admin123` if omitted).
