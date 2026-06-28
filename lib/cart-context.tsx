"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import { Product } from "./products";

export interface CartItem { product: Product; quantity: number; }
interface CartState { items: CartItem[]; }
type CartAction =
  | { type: "ADD_ITEM"; product: Product }
  | { type: "REMOVE_ITEM"; productId: string }
  | { type: "UPDATE_QUANTITY"; productId: string; quantity: number }
  | { type: "CLEAR_CART" };

interface CartContextValue {
  items: CartItem[]; addItem: (product: Product) => void;
  removeItem: (productId: string) => void; updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void; itemCount: number; total: number;
}

const CartContext = createContext<CartContextValue | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.product.id === action.product.id);
      if (existing) return { ...state, items: state.items.map((i) => i.product.id === action.product.id ? { ...i, quantity: i.quantity + 1 } : i) };
      return { ...state, items: [...state.items, { product: action.product, quantity: 1 }] };
    }
    case "REMOVE_ITEM": return { ...state, items: state.items.filter((i) => i.product.id !== action.productId) };
    case "UPDATE_QUANTITY":
      if (action.quantity <= 0) return { ...state, items: state.items.filter((i) => i.product.id !== action.productId) };
      return { ...state, items: state.items.map((i) => i.product.id === action.productId ? { ...i, quantity: action.quantity } : i) };
    case "CLEAR_CART": return { items: [] };
    default: return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] }, () => {
    if (typeof window !== "undefined") {
      try { const saved = localStorage.getItem("cart"); return saved ? JSON.parse(saved) : { items: [] }; }
      catch { return { items: [] }; }
    }
    return { items: [] };
  });

  useEffect(() => { localStorage.setItem("cart", JSON.stringify(state)); }, [state]);

  const addItem = (product: Product) => dispatch({ type: "ADD_ITEM", product });
  const removeItem = (productId: string) => dispatch({ type: "REMOVE_ITEM", productId });
  const updateQuantity = (productId: string, quantity: number) => dispatch({ type: "UPDATE_QUANTITY", productId, quantity });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });
  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const total = state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items: state.items, addItem, removeItem, updateQuantity, clearCart, itemCount, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
