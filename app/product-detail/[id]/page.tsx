"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { Star, ShoppingCart, Heart, Share2 } from "lucide-react"
import { useCartContext } from "@/components/cart-provider"
import { toast } from "@/components/ui/use-toast"

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
    description:
      "Our classic white t-shirt is made from 100% organic cotton for maximum comfort and durability. Perfect for everyday wear or as a base for your custom designs.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["white", "black", "gray", "navy", "red"],
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
    description:
      "Stay warm and stylish with our urban hoodie. Features a comfortable fit, adjustable hood, and front pocket. Made from a premium cotton-polyester blend.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["black", "gray", "navy", "red"],
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
    description:
      "Our vintage-style cap features an adjustable strap for the perfect fit. Made from durable materials with a classic design that complements any outfit.",
    sizes: ["One Size"],
    colors: ["blue", "black", "white", "red"],
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
    description:
      "Our premium long sleeve shirt offers both style and comfort. Perfect for cooler weather, this versatile piece features ribbed cuffs and a tailored fit.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["gray", "black", "white", "navy"],
  },
]

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addToCart } = useCartContext()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  useEffect(() => {
    // In a real app, you would fetch this from an API
    const productId = Number(params.id)
    const foundProduct = allProducts.find((p) => p.id === productId)

    if (foundProduct) {
      setProduct(foundProduct)
      setSelectedSize(foundProduct.sizes[0])
      setSelectedColor(foundProduct.color)

      // Save to recently viewed in localStorage
      const recentlyViewed = JSON.parse(localStorage.getItem("recentlyViewed") || "[]")
      const updatedRecent = [productId, ...recentlyViewed.filter((id: number) => id !== productId)].slice(0, 5)
      localStorage.setItem("recentlyViewed", JSON.stringify(updatedRecent))
    }

    setLoading(false)
  }, [params.id])

  const handleAddToCart = () => {
    if (!product) return

    setIsAddingToCart(true)

    setTimeout(() => {
      addToCart({
        productType: product.category,
        size: selectedSize,
        color: selectedColor,
        designImage: product.image,
        customText: "",
        textColor: "#000000",
        quantity: quantity,
        price: product.price,
      })

      toast({
        title: "Added to cart!",
        description: `${quantity} × ${product.name} (${selectedSize}, ${selectedColor})`,
      })

      setIsAddingToCart(false)
    }, 800)
  }

  const handleCustomize = () => {
    router.push(`/product?type=${product.category}`)
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading product details...</p>
        </div>
        <Footer />
      </main>
    )
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4 text-blue-900">Product Not Found</h1>
          <p className="text-blue-700 mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Link
            href="/shop"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <Link href="/shop" className="text-blue-600 hover:underline">
            ← Back to Shop
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="relative h-[500px] bg-blue-50 rounded-lg overflow-hidden">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-contain p-4" />
            {product.isNew && (
              <div className="absolute top-4 left-4 bg-blue-600 text-white text-sm px-3 py-1 rounded-full">NEW</div>
            )}
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-2 text-blue-900">{product.name}</h1>

            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < Math.floor(product.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                  />
                ))}
              </div>
              <span className="ml-2 text-blue-700">
                {product.rating} ({Math.floor(product.rating * 10)} reviews)
              </span>
            </div>

            <div className="text-2xl font-bold mb-6 text-blue-900">${product.price.toFixed(2)}</div>

            <p className="text-blue-700 mb-6">{product.description}</p>

            <div className="mb-6">
              <h3 className="font-semibold mb-2 text-blue-900">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size: string) => (
                  <button
                    key={size}
                    className={`px-4 py-2 rounded-md ${
                      selectedSize === size ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200 text-blue-900"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2 text-blue-900">Color</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color: string) => (
                  <button
                    key={color}
                    className={`w-10 h-10 rounded-full ${
                      selectedColor === color ? "ring-2 ring-blue-600 ring-offset-2" : ""
                    }`}
                    style={{ backgroundColor: color === "navy" ? "#0a192f" : color }}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Select ${color} color`}
                  />
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2 text-blue-900">Quantity</h3>
              <div className="flex items-center">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-100 text-blue-900"
                >
                  -
                </button>
                <span className="mx-4 w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-100 text-blue-900"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                {isAddingToCart ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Adding...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2" size={20} />
                    Add to Cart
                  </>
                )}
              </button>

              <button
                onClick={handleCustomize}
                className="flex-1 bg-blue-100 text-blue-800 py-3 px-6 rounded-md hover:bg-blue-200 transition-colors"
              >
                Customize This Design
              </button>
            </div>

            <div className="flex gap-4">
              <button className="flex items-center text-blue-600 hover:text-blue-800">
                <Heart size={20} className="mr-1" />
                Add to Wishlist
              </button>

              <button className="flex items-center text-blue-600 hover:text-blue-800">
                <Share2 size={20} className="mr-1" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
