"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react"
import { useCartContext } from "@/components/cart-provider"
import { toast } from "@/components/ui/use-toast"

export default function CartPage() {
  const { cart, updateCartItem, removeFromCart, clearCart, getCartTotal, isLoaded } = useCartContext()
  const [isProcessing, setIsProcessing] = useState(false)

  const shipping = 5.99
  const tax = getCartTotal() * 0.08
  const total = getCartTotal() + shipping + tax

  const handleCheckout = () => {
    setIsProcessing(true)

    // Simulate checkout process
    setTimeout(() => {
      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase. Your order is being processed.",
      })

      // Save order to localStorage
      const orders = JSON.parse(localStorage.getItem("orders") || "[]")
      orders.push({
        id: `ORD-${Date.now()}`,
        items: cart,
        total: total,
        date: new Date().toISOString(),
        status: "processing",
      })
      localStorage.setItem("orders", JSON.stringify(orders))

      // Clear cart
      clearCart()
      setIsProcessing(false)
    }, 2000)
  }

  if (!isLoaded) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading your cart...</p>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8 text-blue-900">Your Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 mx-auto text-blue-400 mb-4" />
            <h2 className="text-2xl font-semibold mb-4 text-blue-900">Your cart is empty</h2>
            <p className="text-blue-700 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link
              href="/product"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-blue-50 rounded-lg p-6">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-blue-200">
                      <th className="text-left pb-4 text-blue-900">Product</th>
                      <th className="text-center pb-4 text-blue-900">Quantity</th>
                      <th className="text-right pb-4 text-blue-900">Price</th>
                      <th className="pb-4 w-10"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={item.id} className="border-b border-blue-200">
                        <td className="py-4">
                          <div className="flex items-center">
                            <div className="relative w-16 h-16 mr-4 rounded overflow-hidden bg-white">
                              {item.designImage ? (
                                <Image
                                  src={item.designImage || "/placeholder.svg"}
                                  alt={`${item.productType}`}
                                  fill
                                  className="object-contain"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-500">
                                  No image
                                </div>
                              )}
                            </div>
                            <div>
                              <h3 className="font-medium text-blue-900">Custom {item.productType}</h3>
                              <p className="text-sm text-blue-700">
                                Size: {item.size} | Color: {item.color}
                              </p>
                              {item.customText && (
                                <p className="text-xs text-blue-600 mt-1 italic">"{item.customText}"</p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center justify-center">
                            <button
                              onClick={() => updateCartItem(item.id, { quantity: Math.max(1, item.quantity - 1) })}
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
                            >
                              -
                            </button>
                            <span className="mx-3 w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateCartItem(item.id, { quantity: Math.min(10, item.quantity + 1) })}
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="py-4 text-right font-medium text-blue-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                        <td className="py-4 text-right">
                          <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex justify-between items-center">
                <Link href="/product" className="text-blue-600 hover:underline flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                  Continue Shopping
                </Link>

                <button onClick={() => clearCart()} className="text-red-500 hover:text-red-700" disabled={isProcessing}>
                  Clear Cart
                </button>
              </div>
            </div>

            <div>
              <div className="bg-blue-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-blue-900">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Subtotal</span>
                    <span className="text-blue-900">${getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Shipping</span>
                    <span className="text-blue-900">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Tax</span>
                    <span className="text-blue-900">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-blue-200 pt-3 mt-3">
                    <div className="flex justify-between font-semibold">
                      <span className="text-blue-900">Total</span>
                      <span className="text-blue-900">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                  onClick={handleCheckout}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center">
                      <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                      Processing...
                    </span>
                  ) : (
                    "Proceed to Checkout"
                  )}
                </button>

                <div className="mt-6">
                  <h3 className="font-medium mb-2 text-blue-900">We Accept</h3>
                  <div className="flex space-x-2">
                    <div className="w-10 h-6 bg-blue-200 rounded flex items-center justify-center text-xs text-blue-800">
                      VISA
                    </div>
                    <div className="w-10 h-6 bg-blue-200 rounded flex items-center justify-center text-xs text-blue-800">
                      MC
                    </div>
                    <div className="w-10 h-6 bg-blue-200 rounded flex items-center justify-center text-xs text-blue-800">
                      AMEX
                    </div>
                    <div className="w-10 h-6 bg-blue-200 rounded flex items-center justify-center text-xs text-blue-800">
                      PYPL
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
