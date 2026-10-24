import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { Product } from '../types/product';
import { CustomerInquiry, InquiryStatus, OrderStatus, StoredOrder, StoreBackup } from '../types/admin';
import { initialProducts } from '../data/products';
import {
  getSavedCredentials,
  getSupabase,
  inquiryToRow,
  orderToRow,
  productToRow,
  rowToInquiry,
  rowToOrder,
  rowToProduct,
  saveCredentials,
  testSupabaseConnection,
} from '../lib/supabase';

interface AdminStoreContextValue {
  products: Product[];
  orders: StoredOrder[];
  inquiries: CustomerInquiry[];
  loading: boolean;
  cloudStatus: {
    isConnected: boolean;
    isSyncing: boolean;
    url: string;
    anonKey: string;
    lastError?: string;
    lastSynced?: string;
  };
  // Product actions
  addProduct: (product: Omit<Product, 'id'> & { id?: string }) => Promise<{ success: boolean; error?: string }>;
  updateProduct: (product: Product) => Promise<{ success: boolean; error?: string }>;
  deleteProduct: (id: string) => Promise<{ success: boolean; error?: string }>;
  quickUpdateStock: (productId: string, colourName: string, newStock: number) => Promise<void>;
  // Order actions
  updateOrderStatus: (orderId: string, status: OrderStatus, notes?: string) => Promise<void>;
  // Inquiry actions
  updateInquiryStatus: (inquiryId: string, status: InquiryStatus) => Promise<void>;
  // Cloud & Backup actions
  configureSupabase: (url: string, key: string) => Promise<{ success: boolean; message: string }>;
  disconnectSupabase: () => void;
  syncAllToCloud: () => Promise<{ success: boolean; message: string }>;
  syncAllFromCloud: () => Promise<{ success: boolean; message: string }>;
  resetToDefaults: () => void;
  exportBackupJson: () => string;
  importBackupJson: (jsonString: string) => { success: boolean; message: string };
}

const STORAGE_PRODUCTS = 'habaya_admin_products';
const STORAGE_ORDERS = 'habaya_admin_orders';
const STORAGE_INQUIRIES = 'habaya_admin_inquiries';

const AdminStoreContext = createContext<AdminStoreContextValue | null>(null);

export function AdminStoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_PRODUCTS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return initialProducts;
  });

  const [orders, setOrders] = useState<StoredOrder[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_ORDERS);
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return [];
  });

  const [inquiries, setInquiries] = useState<CustomerInquiry[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_INQUIRIES);
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return [];
  });

  const [loading] = useState(false);
  const [cloudStatus, setCloudStatus] = useState(() => {
    const creds = getSavedCredentials();
    return {
      isConnected: Boolean(creds.url && creds.anonKey),
      isSyncing: false,
      url: creds.url,
      anonKey: creds.anonKey,
      lastError: undefined as string | undefined,
      lastSynced: undefined as string | undefined,
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_PRODUCTS, JSON.stringify(products));
    } catch {}
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_ORDERS, JSON.stringify(orders));
    } catch {}
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_INQUIRIES, JSON.stringify(inquiries));
    } catch {}
  }, [inquiries]);

  // Initial cloud fetch & realtime subscription
  useEffect(() => {
    const creds = getSavedCredentials();
    if (!creds.url || !creds.anonKey) return;

    let isMounted = true;
    (async () => {
      setCloudStatus((prev) => ({ ...prev, isSyncing: true }));
      const test = await testSupabaseConnection(creds.url, creds.anonKey);
      if (!isMounted) return;

      if (!test.success) {
        setCloudStatus((prev) => ({
          ...prev,
          isConnected: false,
          isSyncing: false,
          lastError: test.message,
        }));
        return;
      }

      setCloudStatus((prev) => ({
        ...prev,
        isConnected: true,
        isSyncing: false,
        lastError: undefined,
        lastSynced: new Date().toLocaleTimeString(),
      }));

      const client = getSupabase();
      if (!client) return;

      try {
        const { data: pData, error: pErr } = await client.from('products').select('*');
        if (!pErr && pData && pData.length > 0 && isMounted) {
          setProducts(pData.map(rowToProduct));
        }

        const { data: oData, error: oErr } = await client
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false });
        if (!oErr && oData && isMounted) {
          setOrders(oData.map(rowToOrder));
        }

        const { data: iData, error: iErr } = await client
          .from('inquiries')
          .select('*')
          .order('created_at', { ascending: false });
        if (!iErr && iData && isMounted) {
          setInquiries(iData.map(rowToInquiry));
        }

        // Realtime listener for products (Syncs immediately with cloud changes)
        const productsChannel = client
          .channel('public:products')
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'products' },
            (payload) => {
              if (payload.eventType === 'INSERT' && payload.new) {
                const newProduct = rowToProduct(payload.new);
                setProducts((prev) => {
                  if (prev.some((p) => p.id === newProduct.id)) {
                    return prev.map((p) => (p.id === newProduct.id ? newProduct : p));
                  }
                  return [newProduct, ...prev];
                });
              } else if (payload.eventType === 'UPDATE' && payload.new) {
                const updated = rowToProduct(payload.new);
                setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
              } else if (payload.eventType === 'DELETE' && payload.old) {
                const deletedId = (payload.old as any)?.id;
                if (deletedId) {
                  setProducts((prev) => prev.filter((p) => p.id !== deletedId));
                }
              }
            }
          )
          .subscribe();

        // Set up Realtime listener for incoming orders
        const ordersChannel = client
          .channel('public:orders')
          .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, (payload) => {
            if (payload.eventType === 'INSERT' && payload.new) {
              const newOrder = rowToOrder(payload.new);
              setOrders((prev) => [newOrder, ...prev.filter((o) => o.id !== newOrder.id)]);
            } else if (payload.eventType === 'UPDATE' && payload.new) {
              const updated = rowToOrder(payload.new);
              setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
            }
          })
          .subscribe();

        // Realtime listener for customer inquiries
        const inquiriesChannel = client
          .channel('public:inquiries')
          .on('postgres_changes', { event: '*', schema: 'public', table: 'inquiries' }, (payload) => {
            if (payload.eventType === 'INSERT' && payload.new) {
              const newInq = rowToInquiry(payload.new);
              setInquiries((prev) => [newInq, ...prev.filter((i) => i.id !== newInq.id)]);
            } else if (payload.eventType === 'UPDATE' && payload.new) {
              const updated = rowToInquiry(payload.new);
              setInquiries((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
            }
          })
          .subscribe();

        return () => {
          client.removeChannel(productsChannel);
          client.removeChannel(ordersChannel);
          client.removeChannel(inquiriesChannel);
        };
      } catch (err: any) {
        console.warn('Initial cloud pull failed:', err);
      }
    })();

    // Cross-tab broadcast listener
    let bc: BroadcastChannel | null = null;
    try {
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        bc = new BroadcastChannel('habaya_products_sync');
        bc.onmessage = (event) => {
          if (!event.data) return;
          const { type, payload } = event.data;
          if (type === 'PRODUCT_ADDED' && payload) {
            setProducts((prev) => {
              if (prev.some((p) => p.id === payload.id)) {
                return prev.map((p) => (p.id === payload.id ? payload : p));
              }
              return [payload, ...prev];
            });
          } else if (type === 'PRODUCT_UPDATED' && payload) {
            setProducts((prev) => prev.map((p) => (p.id === payload.id ? payload : p)));
          } else if (type === 'PRODUCT_DELETED' && payload?.id) {
            setProducts((prev) => prev.filter((p) => p.id !== payload.id));
          }
        };
      }
    } catch {}

    return () => {
      isMounted = false;
      if (bc) bc.close();
    };
  }, []);

  const broadcastProductChange = (type: 'PRODUCT_ADDED' | 'PRODUCT_UPDATED' | 'PRODUCT_DELETED', payload: any) => {
    try {
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        const bc = new BroadcastChannel('habaya_products_sync');
        bc.postMessage({ type, payload });
        bc.close();
      }
    } catch {}
  };

  const addProduct = useCallback(async (productData: Omit<Product, 'id'> & { id?: string }) => {
    const id = productData.id || `p-${Date.now()}`;
    const newProduct: Product = { ...productData, id };

    setProducts((prev) => [newProduct, ...prev]);
    broadcastProductChange('PRODUCT_ADDED', newProduct);

    const client = getSupabase();
    if (client) {
      try {
        const { error } = await client.from('products').upsert(productToRow(newProduct));
        if (error) return { success: false, error: error.message };
      } catch (err: any) {
        return { success: false, error: err?.message };
      }
    }
    return { success: true };
  }, []);

  const updateProduct = useCallback(async (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    broadcastProductChange('PRODUCT_UPDATED', updated);

    const client = getSupabase();
    if (client) {
      try {
        const { error } = await client.from('products').upsert(productToRow(updated));
        if (error) return { success: false, error: error.message };
      } catch (err: any) {
        return { success: false, error: err?.message };
      }
    }
    return { success: true };
  }, []);

  const deleteProduct = useCallback(async (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    broadcastProductChange('PRODUCT_DELETED', { id });

    const client = getSupabase();
    if (client) {
      try {
        const { error } = await client.from('products').delete().eq('id', id);
        if (error) return { success: false, error: error.message };
      } catch (err: any) {
        return { success: false, error: err?.message };
      }
    }
    return { success: true };
  }, []);

  const quickUpdateStock = useCallback(async (productId: string, colourName: string, newStock: number) => {
    let targetProduct: Product | undefined;
    setProducts((prev) => {
      return prev.map((p) => {
        if (p.id !== productId) return p;
        const updatedColours = p.colours.map((c) => (c.name === colourName ? { ...c, stock: Math.max(0, newStock) } : c));
        targetProduct = { ...p, colours: updatedColours };
        return targetProduct;
      });
    });

    if (targetProduct) {
      broadcastProductChange('PRODUCT_UPDATED', targetProduct);
      const client = getSupabase();
      if (client) {
        try {
          await client.from('products').upsert(productToRow(targetProduct));
        } catch (err) {
          console.warn('Quick stock update cloud sync error:', err);
        }
      }
    }
  }, []);

  const updateOrderStatus = useCallback(async (orderId: string, status: OrderStatus, notes?: string) => {
    let updatedOrder: StoredOrder | undefined;
    setOrders((prev) => {
      return prev.map((o) => {
        if (o.id !== orderId && o.reference !== orderId) return o;
        updatedOrder = { ...o, status, notes: notes !== undefined ? notes : o.notes };
        return updatedOrder;
      });
    });

    if (updatedOrder) {
      const client = getSupabase();
      if (client) {
        try {
          await client.from('orders').update({ status, notes: updatedOrder.notes }).eq('id', updatedOrder.id);
        } catch (err) {
          console.warn('Cloud updateOrderStatus error:', err);
        }
      }
    }
  }, []);

  const updateInquiryStatus = useCallback(async (inquiryId: string, status: InquiryStatus) => {
    setInquiries((prev) => prev.map((i) => (i.id === inquiryId ? { ...i, status } : i)));

    const client = getSupabase();
    if (client) {
      try {
        await client.from('inquiries').update({ status }).eq('id', inquiryId);
      } catch (err) {
        console.warn('Cloud updateInquiryStatus error:', err);
      }
    }
  }, []);

  const configureSupabase = useCallback(async (url: string, key: string) => {
    setCloudStatus((prev) => ({ ...prev, isSyncing: true }));
    const result = await testSupabaseConnection(url, key);

    if (result.success) {
      saveCredentials(url, key);
      setCloudStatus({
        isConnected: true,
        isSyncing: false,
        url,
        anonKey: key,
        lastError: undefined,
        lastSynced: new Date().toLocaleTimeString(),
      });
      return result;
    } else {
      setCloudStatus((prev) => ({
        ...prev,
        isConnected: false,
        isSyncing: false,
        url,
        anonKey: key,
        lastError: result.message,
      }));
      return result;
    }
  }, []);

  const disconnectSupabase = useCallback(() => {
    saveCredentials('', '');
    setCloudStatus({
      isConnected: false,
      isSyncing: false,
      url: '',
      anonKey: '',
      lastError: undefined,
      lastSynced: undefined,
    });
  }, []);

  const syncAllToCloud = useCallback(async () => {
    const client = getSupabase();
    if (!client) {
      return { success: false, message: 'Supabase is not configured yet. Enter credentials in Settings.' };
    }

    setCloudStatus((prev) => ({ ...prev, isSyncing: true }));
    try {
      const pRows = products.map(productToRow);
      const { error: pErr } = await client.from('products').upsert(pRows);
      if (pErr) throw pErr;

      if (orders.length > 0) {
        const oRows = orders.map(orderToRow);
        const { error: oErr } = await client.from('orders').upsert(oRows);
        if (oErr) throw oErr;
      }

      if (inquiries.length > 0) {
        const iRows = inquiries.map(inquiryToRow);
        const { error: iErr } = await client.from('inquiries').upsert(iRows);
        if (iErr) throw iErr;
      }

      setCloudStatus((prev) => ({
        ...prev,
        isSyncing: false,
        lastError: undefined,
        lastSynced: new Date().toLocaleTimeString(),
      }));

      return { success: true, message: `Successfully synchronized ${products.length} products to Supabase cloud database.` };
    } catch (err: any) {
      setCloudStatus((prev) => ({
        ...prev,
        isSyncing: false,
        lastError: err?.message,
      }));
      return { success: false, message: err?.message || 'Sync failed.' };
    }
  }, [products, orders, inquiries]);

  const syncAllFromCloud = useCallback(async () => {
    const client = getSupabase();
    if (!client) return { success: false, message: 'Supabase is not configured yet.' };

    setCloudStatus((prev) => ({ ...prev, isSyncing: true }));
    try {
      const { data: pData, error: pErr } = await client.from('products').select('*');
      if (pErr) throw pErr;
      if (pData) setProducts(pData.map(rowToProduct));

      const { data: oData, error: oErr } = await client.from('orders').select('*').order('created_at', { ascending: false });
      if (oErr) throw oErr;
      if (oData) setOrders(oData.map(rowToOrder));

      const { data: iData, error: iErr } = await client.from('inquiries').select('*').order('created_at', { ascending: false });
      if (iErr) throw iErr;
      if (iData) setInquiries(iData.map(rowToInquiry));

      setCloudStatus((prev) => ({
        ...prev,
        isSyncing: false,
        lastError: undefined,
        lastSynced: new Date().toLocaleTimeString(),
      }));

      return { success: true, message: 'Successfully pulled latest data from Supabase cloud database.' };
    } catch (err: any) {
      setCloudStatus((prev) => ({
        ...prev,
        isSyncing: false,
        lastError: err?.message,
      }));
      return { success: false, message: err?.message || 'Pull failed.' };
    }
  }, []);

  const resetToDefaults = useCallback(() => {
    setProducts(initialProducts);
    setOrders([]);
    setInquiries([]);
    localStorage.removeItem(STORAGE_PRODUCTS);
    localStorage.removeItem(STORAGE_ORDERS);
    localStorage.removeItem(STORAGE_INQUIRIES);
  }, []);

  const exportBackupJson = useCallback(() => {
    const backup: StoreBackup = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      products,
      orders,
      inquiries,
    };
    return JSON.stringify(backup, null, 2);
  }, [products, orders, inquiries]);

  const importBackupJson = useCallback((jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString) as StoreBackup;
      if (!Array.isArray(parsed.products)) {
        return { success: false, message: 'Invalid backup file: "products" array missing.' };
      }

      setProducts(parsed.products);
      if (Array.isArray(parsed.orders)) setOrders(parsed.orders);
      if (Array.isArray(parsed.inquiries)) setInquiries(parsed.inquiries);

      return {
        success: true,
        message: `Successfully restored ${parsed.products.length} products and ${parsed.orders?.length || 0} orders.`,
      };
    } catch (err: any) {
      return { success: false, message: `JSON Parse error: ${err?.message}` };
    }
  }, []);

  const value = useMemo<AdminStoreContextValue>(
    () => ({
      products,
      orders,
      inquiries,
      loading,
      cloudStatus,
      addProduct,
      updateProduct,
      deleteProduct,
      quickUpdateStock,
      updateOrderStatus,
      updateInquiryStatus,
      configureSupabase,
      disconnectSupabase,
      syncAllToCloud,
      syncAllFromCloud,
      resetToDefaults,
      exportBackupJson,
      importBackupJson,
    }),
    [
      products,
      orders,
      inquiries,
      loading,
      cloudStatus,
      addProduct,
      updateProduct,
      deleteProduct,
      quickUpdateStock,
      updateOrderStatus,
      updateInquiryStatus,
      configureSupabase,
      disconnectSupabase,
      syncAllToCloud,
      syncAllFromCloud,
      resetToDefaults,
      exportBackupJson,
      importBackupJson,
    ]
  );

  return <AdminStoreContext.Provider value={value}>{children}</AdminStoreContext.Provider>;
}

export function useAdminStore(): AdminStoreContextValue {
  const context = useContext(AdminStoreContext);
  if (!context) {
    throw new Error('useAdminStore must be used within an AdminStoreProvider');
  }
  return context;
}
