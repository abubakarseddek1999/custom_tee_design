import Link from "next/link"
import { ImageTransition } from "@/components/image-transition"
import { FeaturedProducts } from "@/components/featured-products"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Header />

      <div className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="mt-8 mb-16">
            <ImageTransition />
          </div>
        </div>
      </div>

      <div className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-blue-900">Design Your Perfect Apparel</h2>
            <p className="text-lg text-blue-800 max-w-2xl mx-auto">
              Express yourself with our custom apparel. Upload your designs, add text, and create something uniquely
              yours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-blue-900">Choose Your Product</h3>
              <p className="text-blue-700">Select from t-shirts, hoodies, sleevies, or caps as your canvas.</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-blue-900">Customize Design</h3>
              <p className="text-blue-700">Upload your images or add custom text to make it uniquely yours.</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-blue-900">Order & Enjoy</h3>
              <p className="text-blue-700">Place your order and receive your custom creation at your doorstep.</p>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/product"
              className="inline-block bg-blue-600 text-white px-8 py-3 font-medium hover:bg-blue-700 transition-colors rounded-md"
            >
              Start Designing Now
            </Link>
          </div>
        </div>
      </div>

      <FeaturedProducts />
      <Newsletter />
      <Footer />
    </main>
  )
}
