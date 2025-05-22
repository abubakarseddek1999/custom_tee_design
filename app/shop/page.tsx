"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { Sliders, Search } from "lucide-react"

// Sample product data
const allProducts = [
  {
    id: 1,
    name: "Classic White Tee",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=500",
    category: "tshirt",
    color: "white",
    isNew: true,
    rating: 4.5,
  },
  {
    id: 2,
    name: "Urban Hoodie",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=500",
    category: "hoodie",
    color: "black",
    isNew: false,
    rating: 4.8,
  },
  {
    id: 3,
    name: "Vintage Cap",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=500",
    category: "cap",
    color: "blue",
    isNew: false,
    rating: 4.2,
  },
  {
    id: 4,
    name: "Premium Sleevie",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=500",
    category: "sleevie",
    color: "gray",
    isNew: true,
    rating: 4.7,
  },
  {
    id: 5,
    name: "Graphic Print Tee",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=500",
    category: "tshirt",
    color: "black",
    isNew: true,
    rating: 4.3,
  },
  {
    id: 6,
    name: "Zip-Up Hoodie",
    price: 54.99,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=500",
    category: "hoodie",
    color: "navy",
    isNew: false,
    rating: 4.6,
  },
  {
    id: 7,
    name: "Snapback Cap",
    price: 22.99,
    image: "https://images.unsplash.com/photo-1534215754734-18e55d13e346?q=80&w=500",
    category: "cap",
    color: "red",
    isNew: true,
    rating: 4.1,
  },
  {
    id: 8,
    name: "Long Sleeve Tee",
    price: 32.99,
    image: "https://images.unsplash.com/photo-1618517351616-38fb9c5210c6?q=80&w=500",
    category: "sleevie",
    color: "white",
    isNew: false,
    rating: 4.4,
  },
]

type SortOption = "featured" | "price-low" | "price-high" | "newest" | "rating"

export default function ShopPage() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState(allProducts)
  const [filteredProducts, setFilteredProducts] = useState(allProducts)
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)
  const [colorFilter, setColorFilter] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100])
  const [sortBy, setSortBy] = useState<SortOption>("featured")
  const [searchQuery, setSearchQuery] = useState("")
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [viewedProducts, setViewedProducts] = useState<number[]>([])

  // Load viewed products from localStorage
  useEffect(() => {
    const storedViewedProducts = localStorage.getItem("viewedProducts")
    if (storedViewedProducts) {
      setViewedProducts(JSON.parse(storedViewedProducts))
    }
  }, [])

  // Handle URL query parameters
  useEffect(() => {
    const type = searchParams.get("type")
    if (type) {
      setCategoryFilter(type)
    }
  }, [searchParams])

  // Apply filters
  useEffect(() => {
    let result = [...allProducts]

    // Category filter
    if (categoryFilter) {
      result = result.filter((product) => product.category === categoryFilter)
    }

    // Color filter
    if (colorFilter) {
      result = result.filter((product) => product.color === colorFilter)
    }

    // Price range filter
    result = result.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.color.toLowerCase().includes(query),
      )
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
      case "newest":
        result.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1))
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      default:
        // featured - no specific sort
        break
    }

    setFilteredProducts(result)
  }, [categoryFilter, colorFilter, priceRange, sortBy, searchQuery])

  const handleProductView = (productId: number) => {
    // Update viewed products in localStorage
    const updated = [productId, ...viewedProducts.filter((id) => id !== productId)].slice(0, 5)
    setViewedProducts(updated)
    localStorage.setItem("viewedProducts", JSON.stringify(updated))
  }

  const resetFilters = () => {
    setCategoryFilter(null)
    setColorFilter(null)
    setPriceRange([0, 100])
    setSortBy("featured")
    setSearchQuery("")
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900">Shop All Products</h1>
          <button
            className="md:hidden flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-md"
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            <Sliders size={18} />
            <span>Filters</span>
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Desktop */}
          <div className={`md:block md:w-1/4 ${filtersOpen ? "block" : "hidden"}`}>
            <div className="bg-blue-50 p-6 rounded-lg sticky top-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-blue-900">Filters</h2>
                <button className="text-blue-600 text-sm hover:underline" onClick={resetFilters}>
                  Reset All
                </button>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-blue-800">Search</h3>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full p-2 pl-8 border border-blue-200 rounded-md"
                  />
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-blue-400" />
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-blue-800">Category</h3>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={categoryFilter === null}
                      onChange={() => setCategoryFilter(null)}
                      className="mr-2"
                    />
                    All Categories
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={categoryFilter === "tshirt"}
                      onChange={() => setCategoryFilter("tshirt")}
                      className="mr-2"
                    />
                    T-Shirts
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={categoryFilter === "hoodie"}
                      onChange={() => setCategoryFilter("hoodie")}
                      className="mr-2"
                    />
                    Hoodies
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={categoryFilter === "sleevie"}
                      onChange={() => setCategoryFilter("sleevie")}
                      className="mr-2"
                    />
                    Sleevies
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={categoryFilter === "cap"}
                      onChange={() => setCategoryFilter("cap")}
                      className="mr-2"
                    />
                    Caps
                  </label>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-blue-800">Color</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    className={`w-8 h-8 rounded-full ${
                      colorFilter === null ? "ring-2 ring-blue-500 ring-offset-2" : ""
                    }`}
                    style={{ background: "linear-gradient(45deg, red, blue, green, yellow)" }}
                    onClick={() => setColorFilter(null)}
                    aria-label="All colors"
                  />
                  <button
                    className={`w-8 h-8 rounded-full bg-white border ${
                      colorFilter === "white" ? "ring-2 ring-blue-500 ring-offset-2" : ""
                    }`}
                    onClick={() => setColorFilter("white")}
                    aria-label="White"
                  />
                  <button
                    className={`w-8 h-8 rounded-full bg-black ${
                      colorFilter === "black" ? "ring-2 ring-blue-500 ring-offset-2" : ""
                    }`}
                    onClick={() => setColorFilter("black")}
                    aria-label="Black"
                  />
                  <button
                    className={`w-8 h-8 rounded-full bg-gray-500 ${
                      colorFilter === "gray" ? "ring-2 ring-blue-500 ring-offset-2" : ""
                    }`}
                    onClick={() => setColorFilter("gray")}
                    aria-label="Gray"
                  />
                  <button
                    className={`w-8 h-8 rounded-full bg-blue-700 ${
                      colorFilter === "blue" ? "ring-2 ring-blue-500 ring-offset-2" : ""
                    }`}
                    onClick={() => setColorFilter("blue")}
                    aria-label="Blue"
                  />
                  <button
                    className={`w-8 h-8 rounded-full bg-red-600 ${
                      colorFilter === "red" ? "ring-2 ring-blue-500 ring-offset-2" : ""
                    }`}
                    onClick={() => setColorFilter("red")}
                    aria-label="Red"
                  />
                  <button
                    className={`w-8 h-8 rounded-full bg-[#0a192f] ${
                      colorFilter === "navy" ? "ring-2 ring-blue-500 ring-offset-2" : ""
                    }`}
                    onClick={() => setColorFilter("navy")}
                    aria-label="Navy"
                  />
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-blue-800">Price Range</h3>
                  <span className="text-sm text-blue-600">
                    ${priceRange[0]} - ${priceRange[1]}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-blue-800">Sort By</h3>
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-full p-2 border border-blue-200 rounded-md"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>

              <button
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors md:hidden"
                onClick={() => setFiltersOpen(false)}
              >
                Apply Filters
              </button>
            </div>
          </div>

          {/* Products */}
          <div className="md:w-3/4">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12 bg-blue-50 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4 text-blue-900">No products found</h2>
                <p className="text-blue-700 mb-6">Try adjusting your filters or search query.</p>
                <button
                  onClick={resetFilters}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <p className="text-blue-700">
                    Showing <span className="font-medium">{filteredProducts.length}</span> products
                  </p>
                  <div className="hidden md:block">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                      className="p-2 border border-blue-200 rounded-md"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="newest">Newest</option>
                      <option value="rating">Top Rated</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                    >
                      <Link href={`/product-detail/${product.id}`} onClick={() => handleProductView(product.id)}>
                        <div className="relative h-64 overflow-hidden">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {product.isNew && (
                            <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                              NEW
                            </div>
                          )}
                        </div>
                      </Link>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg text-blue-900 mb-1">{product.name}</h3>
                        <div className="flex justify-between items-center mb-3">
                          <p className="text-blue-700 font-medium">${product.price.toFixed(2)}</p>
                          <div className="flex items-center">
                            <span className="text-yellow-500 mr-1">★</span>
                            <span className="text-sm text-gray-600">{product.rating}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Link
                            href={`/product?type=${product.category}`}
                            className="flex-1 bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700 transition-colors"
                          >
                            Customize
                          </Link>
                          <Link
                            href={`/product-detail/${product.id}`}
                            className="flex-1 bg-blue-100 text-blue-800 text-center py-2 rounded-md hover:bg-blue-200 transition-colors"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
