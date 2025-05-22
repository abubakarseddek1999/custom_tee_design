"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Menu, X, User } from "lucide-react"
import { usePathname } from "next/navigation"
import { useCartContext } from "@/components/cart-provider"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { getCartCount, isLoaded } = useCartContext()
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    if (isLoaded) {
      setCartCount(getCartCount())
    }
  }, [getCartCount, isLoaded])

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="Custom Tee Logo" width={40} height={40} />
            <h1 className="text-2xl font-bold">CUSTOM TEE</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li>
                <Link
                  href="/"
                  className={`hover:text-blue-200 transition-colors ${isActive("/") ? "text-white font-medium" : "text-blue-100"}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className={`hover:text-blue-200 transition-colors ${
                    isActive("/shop") ? "text-white font-medium" : "text-blue-100"
                  }`}
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/product"
                  className={`hover:text-blue-200 transition-colors ${
                    isActive("/product") ? "text-white font-medium" : "text-blue-100"
                  }`}
                >
                  Customize
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={`hover:text-blue-200 transition-colors ${
                    isActive("/about") ? "text-white font-medium" : "text-blue-100"
                  }`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={`hover:text-blue-200 transition-colors ${
                    isActive("/contact") ? "text-white font-medium" : "text-blue-100"
                  }`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/account" className="hover:text-blue-200 transition-colors">
              <User size={20} />
            </Link>
            <Link href="/cart" className="hover:text-blue-200 transition-colors">
              <div className="relative">
                <ShoppingCart size={20} />
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              </div>
            </Link>

            {/* Mobile menu button */}
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4">
            <ul className="flex flex-col space-y-4">
              <li>
                <Link
                  href="/"
                  className={`block hover:text-blue-200 transition-colors ${
                    isActive("/") ? "text-white font-medium" : "text-blue-100"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className={`block hover:text-blue-200 transition-colors ${
                    isActive("/shop") ? "text-white font-medium" : "text-blue-100"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/product"
                  className={`block hover:text-blue-200 transition-colors ${
                    isActive("/product") ? "text-white font-medium" : "text-blue-100"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Customize
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={`block hover:text-blue-200 transition-colors ${
                    isActive("/about") ? "text-white font-medium" : "text-blue-100"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={`block hover:text-blue-200 transition-colors ${
                    isActive("/contact") ? "text-white font-medium" : "text-blue-100"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}
