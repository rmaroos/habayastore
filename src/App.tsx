import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { StoreProvider } from './contexts/StoreContext';
import { CartProvider } from './contexts/CartContext';
import { SiteLayout } from './components/layout/SiteLayout';
import { CheckoutLayout } from './components/layout/CheckoutLayout';
import { ScrollToTop } from './components/layout/ScrollToTop';

// Code Splitting / Lazy Loaded Route Components for Maximum Performance
const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })));
const CollectionPage = lazy(() => import('./pages/CollectionPage').then((m) => ({ default: m.CollectionPage })));
const ProductDetail = lazy(() => import('./pages/ProductDetail').then((m) => ({ default: m.ProductDetail })));
const Search = lazy(() => import('./pages/Search').then((m) => ({ default: m.Search })));
const Cart = lazy(() => import('./pages/Cart').then((m) => ({ default: m.Cart })));
const Checkout = lazy(() => import('./pages/Checkout').then((m) => ({ default: m.Checkout })));
const OrderConfirmation = lazy(() => import('./pages/OrderConfirmation').then((m) => ({ default: m.OrderConfirmation })));
const OurStory = lazy(() => import('./pages/OurStory').then((m) => ({ default: m.OurStory })));
const OurMission = lazy(() => import('./pages/OurMission').then((m) => ({ default: m.OurMission })));
const VisitUs = lazy(() => import('./pages/VisitUs').then((m) => ({ default: m.VisitUs })));
const Contact = lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact })));
const Faq = lazy(() => import('./pages/Faq').then((m) => ({ default: m.Faq })));
const Policy = lazy(() => import('./pages/Policy').then((m) => ({ default: m.Policy })));
const AdminPage = lazy(() => import('./pages/AdminPage').then((m) => ({ default: m.AdminPage })));
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })));

function PageLoadingFallback() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 bg-ivory">
      <div className="relative flex items-center justify-center mb-4">
        <div className="h-10 w-10 rounded-full border-2 border-rule border-t-burgundy animate-spin" />
        <span className="absolute font-display text-[10px] tracking-widest text-burgundy font-bold">H</span>
      </div>
      <p className="font-display text-xs tracking-[0.2em] text-ink-soft uppercase animate-pulse">
        Habaya Atelier
      </p>
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <CartProvider>
          <ScrollToTop />
          <Suspense fallback={<PageLoadingFallback />}>
            <Routes>
              {/* Dedicated Client Admin Portal */}
              <Route path="admin" element={<AdminPage />} />

              {/* Main Public Boutique */}
              <Route element={<SiteLayout />}>
                <Route index element={<Home />} />
                <Route path="shop" element={<CollectionPage />} />
                <Route path="collections/:slug" element={<CollectionPage />} />
                <Route path="products/:slug" element={<ProductDetail />} />
                <Route path="search" element={<Search />} />
                <Route path="cart" element={<Cart />} />
                <Route path="our-story" element={<OurStory />} />
                <Route path="our-mission" element={<OurMission />} />
                <Route path="visit-us" element={<VisitUs />} />
                <Route path="contact" element={<Contact />} />
                <Route path="faq" element={<Faq />} />
                <Route path="help/:policy" element={<Policy />} />
                <Route path="*" element={<NotFound />} />
              </Route>

              {/* Checkout Flow */}
              <Route element={<CheckoutLayout />}>
                <Route path="checkout" element={<Checkout />} />
                <Route path="order-confirmed" element={<OrderConfirmation />} />
              </Route>
            </Routes>
          </Suspense>
        </CartProvider>
      </StoreProvider>
    </BrowserRouter>
  );
}