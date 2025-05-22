"use client"

import { useState, useEffect } from "react"
import { TShirtViewer } from "./t-shirt-viewer"
import { CustomizationPanel } from "./customization-panel"
import { ImageUploader } from "./image-uploader"
import { TextEditor } from "./text-editor"
import { ProductSelector } from "./product-selector"
import { AddToCartPanel } from "./add-to-cart-panel"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { useCartContext } from "@/components/cart-provider"
import { getProductPrice } from "@/lib/store"
import { useUserPreferences } from "@/lib/store"
import Link from "next/link"

export type ProductType = "tshirt" | "hoodie" | "sleevie" | "cap"
export type BuildType = "lean" | "regular" | "athletic" | "big"
export type SizeType = "XS" | "S" | "M" | "L" | "XL" | "XXL"
export type ColorType = "white" | "black" | "gray" | "navy" | "red"

export interface CustomizationOptions {
  productType: ProductType
  height: number
  weight: number
  build: BuildType
  size: SizeType
  color: ColorType
  designImage: string | null
  customText: string
  textColor: string
  themeVariant: number
  quantity: number
}

interface ProductCustomizerProps {
  initialProductType?: ProductType
}

export function ProductCustomizer({ initialProductType = "tshirt" }: ProductCustomizerProps) {
  const { preferences, updatePreferences, isLoaded: preferencesLoaded } = useUserPreferences()
  const { addToCart } = useCartContext()

  const [options, setOptions] = useState<CustomizationOptions>({
    productType: initialProductType,
    height: 180,
    weight: 80,
    build: "athletic",
    size: "M",
    color: "white",
    designImage: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=300",
    customText: "",
    textColor: "#000000",
    themeVariant: 0,
    quantity: 1,
  })

  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const themeVariantCount = 3

  // Update product type when initialProductType changes
  useEffect(() => {
    setOptions((prev) => ({ ...prev, productType: initialProductType }))
  }, [initialProductType])

  // Load theme preference from localStorage
  useEffect(() => {
    if (preferencesLoaded) {
      setOptions((prev) => ({ ...prev, themeVariant: preferences.themeVariant }))
    }
  }, [preferences.themeVariant, preferencesLoaded])

  // Handle keyboard shortcut for theme switching
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === "q") {
        const newThemeVariant = (options.themeVariant + 1) % themeVariantCount
        setOptions((prev) => ({
          ...prev,
          themeVariant: newThemeVariant,
        }))
        updatePreferences({ themeVariant: newThemeVariant })
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [options.themeVariant, themeVariantCount, updatePreferences])

  const updateOptions = (newOptions: Partial<CustomizationOptions>) => {
    setOptions((prev) => ({ ...prev, ...newOptions }))
  }

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl)
    updateOptions({ designImage: imageUrl })
  }

  const getThemeClass = () => {
    switch (options.themeVariant) {
      case 0:
        return "theme-default"
      case 1:
        return "theme-dark"
      case 2:
        return "theme-colorful"
      default:
        return "theme-default"
    }
  }

  const handleAddToCart = () => {
    // Get the price based on product type
    const price = getProductPrice(options.productType)

    // Add to cart using context
    const newItem = addToCart({
      productType: options.productType,
      size: options.size,
      color: options.color,
      designImage: options.designImage,
      customText: options.customText,
      textColor: options.textColor,
      quantity: options.quantity,
      price: price,
    })

    toast({
      title: "Added to cart!",
      description: `${options.quantity} × ${options.productType} (${options.size}, ${options.color})`,
      action: (
        <ToastAction altText="View Cart">
          <Link href="/cart">View Cart</Link>
        </ToastAction>
      ),
    })

    // Save customization to localStorage for later use
    const savedCustomizations = JSON.parse(localStorage.getItem("savedCustomizations") || "[]")
    savedCustomizations.push({
      id: newItem.id,
      ...options,
      timestamp: new Date().toISOString(),
    })
    localStorage.setItem("savedCustomizations", JSON.stringify(savedCustomizations))
  }

  return (
    <div className={`min-h-screen p-4 md:p-8 ${getThemeClass()}`}>
      <div className="max-w-7xl mx-auto">
        <ProductSelector
          selectedProduct={options.productType}
          onSelectProduct={(productType) => updateOptions({ productType })}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="flex flex-col">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Customize Your {options.productType}</h1>
              <p className="text-gray-600 dark:text-gray-300">Design your perfect apparel with our easy-to-use tools</p>
            </div>

            <div className="flex-1 flex flex-col">
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Your Design</h2>
                <div className="aspect-square max-w-md mx-auto relative border border-gray-200 rounded-md overflow-hidden bg-white">
                  {options.designImage && (
                    <img
                      src={options.designImage || "/placeholder.svg"}
                      alt="Your design"
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
              </div>

              <ImageUploader onImageUpload={handleImageUpload} />

              <TextEditor
                value={options.customText}
                onChange={(text) => updateOptions({ customText: text })}
                textColor={options.textColor}
                onColorChange={(color) => updateOptions({ textColor: color })}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
              <TShirtViewer
                productType={options.productType}
                productColor={options.color}
                designImage={options.designImage}
                customText={options.customText}
                textColor={options.textColor}
              />
            </div>

            <CustomizationPanel options={options} updateOptions={updateOptions} />

            <AddToCartPanel options={options} updateOptions={updateOptions} onAddToCart={handleAddToCart} />

            <p className="text-sm text-gray-500 mt-2 text-center">Press Alt + Q to switch between theme variants</p>
          </div>
        </div>
      </div>
    </div>
  )
}
