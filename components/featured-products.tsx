"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

const products = [
  {
    id: 1,
    name: "Classic White Tee",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=500",
    category: "tshirt",
  },
  {
    id: 2,
    name: "Urban Hoodie",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=500",
    category: "hoodie",
  },
  {
    id: 3,
    name: "Vintage Cap",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=500",
    category: "cap",
  },
  {
    id: 4,
    name: "Premium Sleevie",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=500",
    category: "sleevie",
  },
]

export function FeaturedProducts() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filteredProducts = activeCategory ? products.filter((product) => product.category === activeCategory) : products

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-blue-900">Featured Products</h2>
          <p className="text-blue-700 max-w-2xl mx-auto">
            Browse our most popular items or start with a blank canvas to create your own custom design.
          </p>
        </div>

        <div className="flex justify-center mb-8 space-x-4">
          <button
            className={`px-4 py-2 rounded-md ${
              activeCategory === null ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setActiveCategory(null)}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              activeCategory === "tshirt" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setActiveCategory("tshirt")}
          >
            T-Shirts
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              activeCategory === "hoodie" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setActiveCategory("hoodie")}
          >
            Hoodies
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              activeCategory === "sleevie" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setActiveCategory("sleevie")}
          >
            Sleevies
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              activeCategory === "cap" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setActiveCategory("cap")}
          >
            Caps
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group">
              <div className="relative overflow-hidden rounded-lg mb-4 aspect-square">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-blue-900 bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <Link
                    href={`/product?type=${product.category}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0"
                  >
                    Customize
                  </Link>
                </div>
              </div>
              <h3 className="font-semibold text-lg text-blue-900">{product.name}</h3>
              <p className="text-blue-700">${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  )
}
