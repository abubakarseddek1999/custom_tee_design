"use client"

import { useEffect, useState } from "react"
import type { ProductType, ColorType, SizeType } from "@/components/product-customizer"

export interface CartItem {
  id: string
  productType: ProductType
  size: SizeType
  color: ColorType
  designImage: string | null
  customText: string
  textColor: string
  quantity: number
  price: number
}

// Helper to generate a unique ID
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

// Get product price based on type
export const getProductPrice = (productType: ProductType): number => {
  switch (productType) {
    case "tshirt":
      return 24.99
    case "hoodie":
      return 49.99
    case "sleevie":
      return 34.99
    case "cap":
      return 19.99
    default:
      return 24.99
  }
}

// Cart functions
export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem("customTeeCart")
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (e) {
        console.error("Failed to parse cart from localStorage:", e)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("customTeeCart", JSON.stringify(cart))
    }
  }, [cart, isLoaded])

  const addToCart = (item: Omit<CartItem, "id">) => {
    const newItem = { ...item, id: generateId() }
    setCart((prevCart) => [...prevCart, newItem])
    return newItem
  }

  const updateCartItem = (id: string, updates: Partial<CartItem>) => {
    setCart((prevCart) => prevCart.map((item) => (item.id === id ? { ...item, ...updates } : item)))
  }

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  const clearCart = () => {
    setCart([])
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0)
  }

  return {
    cart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount,
    isLoaded,
  }
}

// Recently viewed products
export const useRecentlyViewed = () => {
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem("customTeeRecentlyViewed")
    if (saved) {
      try {
        setRecentlyViewed(JSON.parse(saved))
      } catch (e) {
        console.error("Failed to parse recently viewed from localStorage:", e)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("customTeeRecentlyViewed", JSON.stringify(recentlyViewed))
    }
  }, [recentlyViewed, isLoaded])

  const addToRecentlyViewed = (productId: string) => {
    setRecentlyViewed((prev) => {
      // Remove if already exists
      const filtered = prev.filter((id) => id !== productId)
      // Add to beginning of array
      return [productId, ...filtered].slice(0, 5) // Keep only 5 most recent
    })
  }

  return {
    recentlyViewed,
    addToRecentlyViewed,
  }
}

// User preferences
export const useUserPreferences = () => {
  const [preferences, setPreferences] = useState({
    themeVariant: 0,
  })
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem("customTeePreferences")
    if (saved) {
      try {
        setPreferences(JSON.parse(saved))
      } catch (e) {
        console.error("Failed to parse preferences from localStorage:", e)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("customTeePreferences", JSON.stringify(preferences))
    }
  }, [preferences, isLoaded])

  const updatePreferences = (updates: Partial<typeof preferences>) => {
    setPreferences((prev) => ({ ...prev, ...updates }))
  }

  return {
    preferences,
    updatePreferences,
    isLoaded,
  }
}
