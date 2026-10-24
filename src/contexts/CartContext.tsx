import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { CartItem, CartLine } from '../types/product';
import { getProductById } from '../utils/catalogue';

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  isDrawerOpen: boolean;
  addItem: (productId: string, colour: string, quantity: number) => void;
  updateQuantity: (productId: string, colour: string, quantity: number) => void;
  removeItem: (productId: string, colour: string) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const STORAGE_KEY = 'habaya-cart';
const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: {children: React.ReactNode;}) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) as CartItem[] : [];
    } catch {
      return [];
    }
  });
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {

      /* storage unavailable — cart stays in memory */}
  }, [items]);

  const lines = useMemo<CartLine[]>(() => {
    return items.flatMap((item) => {
      const product = getProductById(item.productId);
      const variant = product?.colours.find((c) => c.name === item.colour);
      if (!product || !variant) return [];
      return [{ ...item, product, variant, lineTotal: product.price * item.quantity }];
    });
  }, [items]);

  const addItem = useCallback((productId: string, colour: string, quantity: number) => {
    const stock = getProductById(productId)?.colours.find((c) => c.name === colour)?.stock ?? 0;
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === productId && i.colour === colour);
      if (existing) {
        return prev.map((i) =>
        i === existing ? { ...i, quantity: Math.min(stock, i.quantity + quantity) } : i
        );
      }
      return [...prev, { productId, colour, quantity: Math.min(stock, quantity) }];
    });
    setDrawerOpen(true);
  }, []);

  const updateQuantity = useCallback((productId: string, colour: string, quantity: number) => {
    const stock = getProductById(productId)?.colours.find((c) => c.name === colour)?.stock ?? 0;
    setItems((prev) =>
    prev.
    map((i) =>
    i.productId === productId && i.colour === colour ?
    { ...i, quantity: Math.max(0, Math.min(stock, quantity)) } :
    i
    ).
    filter((i) => i.quantity > 0)
    );
  }, []);

  const removeItem = useCallback((productId: string, colour: string) => {
    setItems((prev) => prev.filter((i) => !(i.productId === productId && i.colour === colour)));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count: lines.reduce((s, l) => s + l.quantity, 0),
      subtotal: lines.reduce((s, l) => s + l.lineTotal, 0),
      isDrawerOpen,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false)
    }),
    [lines, isDrawerOpen, addItem, updateQuantity, removeItem, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}