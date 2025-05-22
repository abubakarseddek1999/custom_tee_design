"use client"

import { useState } from "react"
import { Minus, Plus, ShoppingCart } from "lucide-react"
import type { CustomizationOptions } from "./product-customizer"

interface AddToCartPanelProps {
  options: CustomizationOptions
  updateOptions: (options: Partial<CustomizationOptions>) => void
  onAddToCart: () => void
}

export function AddToCartPanel({ options, updateOptions, onAddToCart }: AddToCartPanelProps) {
  const [isLoading, setIsLoading] = useState(false)

  const incrementQuantity = () => {
    updateOptions({ quantity: Math.min(options.quantity + 1, 10) })
  }

  const decrementQuantity = () => {
    updateOptions({ quantity: Math.max(options.quantity - 1, 1) })
  }

  const handleAddToCart = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      onAddToCart()
      setIsLoading(false)
    }, 800)
  }

  // Calculate price based on product type and options
  const getBasePrice = () => {
    switch (options.productType) {
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

  const basePrice = getBasePrice()
  const totalPrice = basePrice * options.quantity

  return (
    <div className="mt-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="p-4 bg-white dark:bg-gray-900">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="font-semibold">Price:</h3>
            <div className="text-2xl font-bold">${totalPrice.toFixed(2)}</div>
            <div className="text-sm text-gray-500">${basePrice.toFixed(2)} each</div>
          </div>

          <div className="flex items-center">
            <button
              onClick={decrementQuantity}
              disabled={options.quantity <= 1}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 disabled:opacity-50"
            >
              <Minus size={16} />
            </button>
            <span className="mx-3 font-medium w-6 text-center">{options.quantity}</span>
            <button
              onClick={incrementQuantity}
              disabled={options.quantity >= 10}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 disabled:opacity-50"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          {isLoading ? (
            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
          ) : (
            <ShoppingCart className="mr-2" size={20} />
          )}
          {isLoading ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  )
}
