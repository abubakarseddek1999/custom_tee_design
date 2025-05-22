"use client"

import { useState } from "react"
import type { ProductType } from "./product-customizer"
import { ShirtIcon as TShirt, BadgeIcon as Hoodie, Shirt, GraduationCapIcon as Cap } from "lucide-react"

interface ProductSelectorProps {
  selectedProduct: ProductType
  onSelectProduct: (product: ProductType) => void
}

export function ProductSelector({ selectedProduct, onSelectProduct }: ProductSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const products = [
    { id: "tshirt", name: "T-Shirt", icon: TShirt },
    { id: "hoodie", name: "Hoodie", icon: Hoodie },
    { id: "sleevie", name: "Sleevie", icon: Shirt },
    { id: "cap", name: "Cap", icon: Cap },
  ]

  return (
    <div className="relative">
      <div className="flex items-center justify-center space-x-2 py-4 border-b">
        {products.map((product) => {
          const Icon = product.icon
          return (
            <button
              key={product.id}
              className={`flex flex-col items-center p-4 rounded-lg transition-colors ${
                selectedProduct === product.id
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
              onClick={() => onSelectProduct(product.id as ProductType)}
            >
              <Icon className="w-8 h-8 mb-2" />
              <span>{product.name}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
