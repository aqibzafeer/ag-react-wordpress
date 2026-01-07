/**
 * Consolidated Cart Context
 * Single file for CartContext, CartProvider, and useCart hook
 */

import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import { STORAGE_KEYS } from "../constants";

// Create context
const CartContext = createContext(null);

/**
 * Cart Provider Component
 */
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CART);
      if (stored) {
        setCart(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load cart:", e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
      } catch (e) {
        console.error("Failed to save cart:", e);
      }
    }
  }, [cart, isHydrated]);

  const addToCart = useCallback((product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    if (quantity < 1) return;
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const isInCart = useCallback((id) => {
    return cart.some((item) => item.id === id);
  }, [cart]);

  const getItemQuantity = useCallback((id) => {
    const item = cart.find((item) => item.id === id);
    return item?.quantity || 0;
  }, [cart]);

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => {
      const price = Number(item.sale_price || item.price || 0);
      return sum + price * item.quantity;
    }, 0);
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  const value = useMemo(
    () => ({
      cart,
      cartTotal,
      cartCount,
      isHydrated,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isInCart,
      getItemQuantity,
    }),
    [cart, cartTotal, cartCount, isHydrated, addToCart, removeFromCart, updateQuantity, clearCart, isInCart, getItemQuantity]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

/**
 * useCart Hook
 */
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
};

// Default export
export default CartContext;
