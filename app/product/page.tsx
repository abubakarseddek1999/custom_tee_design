"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { ProductCustomizer } from "@/components/product-customizer"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { ProductType } from "@/components/product-customizer"

export default function ProductPage() {
  const searchParams = useSearchParams()
  const [productType, setProductType] = useState<ProductType>("tshirt")

  useEffect(() => {
    const type = searchParams.get("type") as ProductType | null
    if (type && ["tshirt", "hoodie", "sleevie", "cap"].includes(type)) {
      setProductType(type as ProductType)
    }
  }, [searchParams])

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <ProductCustomizer initialProductType={productType} />
      <Footer />
    </main>
  )
}
