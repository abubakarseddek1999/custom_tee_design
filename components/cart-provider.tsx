"use client"

import type React from "react"

import { createContext, useContext } from "react"
import { useCart } from "@/lib/store"
import type { CartItem } from "@/lib/store"

interface CartContextType {
  cart: CartItem[]
  addToCart: (item: Omit<CartItem, "id">) => CartItem
  updateCartItem: (id: string, updates: Partial<CartItem>) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
  getCartTotal: () => number
  getCartCount: () => number
  isLoaded: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const cartUtils = useCart()

  return <CartContext.Provider value={cartUtils}>{children}</CartContext.Provider>
}

export function useCartContext() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCartContext must be used within a CartProvider")
  }
  return context
}
