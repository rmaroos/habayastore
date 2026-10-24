import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboardIcon,
  PackageIcon,
  ShoppingBagIcon,
  MessageSquareIcon,
  SettingsIcon,
  ExternalLinkIcon,
  LogOutIcon,
  CloudIcon,
  ShieldIcon,
  MenuIcon,
  XIcon,
} from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { AdminLogin } from '../components/admin/AdminLogin';
import { AdminDashboard } from '../components/admin/AdminDashboard';
import { AdminProducts } from '../components/admin/AdminProducts';
import { AdminOrders } from '../components/admin/AdminOrders';
import { AdminInquiries } from '../components/admin/AdminInquiries';
import { AdminSettings } from '../components/admin/AdminSettings';
import { getAdminUser, onAdminAuthStateChange, signOutAdmin } from '../lib/supabase';

type Tab = 'dashboard' | 'products' | 'orders' | 'inquiries' | 'settings';

export function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('habaya_admin_auth') === 'true';
  });

  const [currentUser, setCurrentUser] = useState<{ email?: string; id?: string } | null>(() => {
    try {
      const stored = sessionStorage.getItem('habaya_admin_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { orders, inquiries, cloudStatus } = useStore();

  const pendingOrders = orders.filter((o) => o.status === 'Pending').length;
  const newInquiries = inquiries.filter((i) => i.status === 'New').length;

  useEffect(() => {
    // Check initial user from Supabase session
    getAdminUser().then((user) => {
      if (user) {
        setCurrentUser({ email: user.email, id: user.id });
        setIsAuthenticated(true);
        sessionStorage.setItem('habaya_admin_auth', 'true');
        sessionStorage.setItem('habaya_admin_user', JSON.stringify({ email: user.email, id: user.id }));
      }
    });

    const { data: authListener } = onAdminAuthStateChange((event, session) => {
      if (session?.user) {
        setCurrentUser({ email: session.user.email, id: session.user.id });
        setIsAuthenticated(true);
        sessionStorage.setItem('habaya_admin_auth', 'true');
        sessionStorage.setItem('habaya_admin_user', JSON.stringify({ email: session.user.email, id: session.user.id }));
      } else if (event === 'SIGNED_OUT') {
        setCurrentUser(null);
        setIsAuthenticated(false);
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  if (!isAuthenticated) {
    return (
      <AdminLogin
        onSuccess={(user) => {
          if (user) {
            setCurrentUser({ email: user.email, id: user.id });
          }
          setIsAuthenticated(true);
        }}
      />
    );
  }

  const handleLogout = async () => {
    await signOutAdmin();
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const navItems: { id: Tab; label: string; icon: React.ElementType; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboardIcon },
    { id: 'products', label: 'Products & Stock', icon: PackageIcon },
    { id: 'orders', label: 'Orders', icon: ShoppingBagIcon, badge: pendingOrders },
    { id: 'inquiries', label: 'Inquiries', icon: MessageSquareIcon, badge: newInquiries },
    { id: 'settings', label: 'Cloud & Database', icon: SettingsIcon },
  ];

  return (
    <div className="min-h-screen bg-ivory text-ink flex flex-col">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-rule bg-warm shadow-sm">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand & Emblem */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded p-1.5 text-ink-soft md:hidden hover:bg-parchment"
            >
              {mobileMenuOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>

            <div className="flex items-center gap-2.5">
              <span className="font-display text-2xl font-semibold tracking-tight text-ink">
                HABAYA
              </span>
              <span className="rounded bg-burgundy/10 px-2 py-0.5 text-[10px] font-bold tracking-widest text-burgundy uppercase">
                Admin Suite
              </span>
            </div>
          </div>

          {/* Desktop Nav Tabs */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 rounded px-3 py-2 text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-burgundy text-warm shadow-sm'
                      : 'text-ink-soft hover:bg-parchment hover:text-ink'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{item.label}</span>
                  {Boolean(item.badge && item.badge > 0) && (
                    <span
                      className={`ml-1 rounded-full px-1.5 py-0.2 text-[9px] font-bold ${
                        isActive ? 'bg-warm text-burgundy' : 'bg-burgundy text-warm'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action & Cloud Pill */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('settings')}
              title={cloudStatus.isConnected ? 'Supabase Connected' : 'Local Storage Mode'}
              className={`hidden sm:inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold transition-colors ${
                cloudStatus.isConnected
                  ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                  : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  cloudStatus.isConnected ? 'bg-emerald-600 animate-pulse' : 'bg-amber-500'
                }`}
              />
              <CloudIcon className="h-3 w-3" />
              <span>{cloudStatus.isConnected ? 'Cloud Live' : 'Local Mode'}</span>
            </button>

            {currentUser?.email && (
              <div className="hidden lg:flex items-center gap-1.5 rounded-full border border-rule bg-parchment/60 px-2.5 py-1 text-[11px]" title={currentUser.email}>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span className="font-mono text-ink-soft max-w-[140px] truncate">{currentUser.email}</span>
              </div>
            )}

            <Link
              to="/"
              target="_blank"
              className="inline-flex items-center gap-1 text-xs font-bold text-ink-soft hover:text-burgundy"
            >
              <span>Live Store</span>
              <ExternalLinkIcon className="h-3.5 w-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              title="Logout"
              className="rounded p-1.5 text-ink-soft hover:bg-rose-50 hover:text-danger transition-colors"
            >
              <LogOutIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="border-t border-rule bg-warm p-3 md:hidden space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded px-3 py-2.5 text-xs font-bold ${
                    isActive ? 'bg-burgundy text-warm' : 'text-ink hover:bg-parchment'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </div>
                  {Boolean(item.badge && item.badge > 0) && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] ${
                        isActive ? 'bg-warm text-burgundy' : 'bg-burgundy text-warm'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* Main Admin Workspace */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {activeTab === 'dashboard' && <AdminDashboard onNavigate={setActiveTab} />}
        {activeTab === 'products' && <AdminProducts />}
        {activeTab === 'orders' && <AdminOrders />}
        {activeTab === 'inquiries' && <AdminInquiries />}
        {activeTab === 'settings' && <AdminSettings />}
      </main>

      {/* Subtle Footer */}
      <footer className="border-t border-rule py-4 text-center text-[11px] text-taupe">
        Habaya Atelier Management Portal &bull; Real-time Cloud Synchronization
      </footer>
    </div>
  );
}
