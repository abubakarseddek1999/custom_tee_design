import Link from "next/link"
import { ImageTransition } from "@/components/image-transition"
import { FeaturedProducts } from "@/components/featured-products"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { FaTshirt, FaPaintBrush, FaShoppingBag } from "react-icons/fa"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Header />

      <section className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="mt-8 mb-16">
            <ImageTransition />
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold mb-4 text-blue-900">Design Your Perfect Apparel</h2>
            <p className="text-lg text-blue-800 max-w-2xl mx-auto">
              Express yourself with our custom apparel. Upload your designs, add text, and create something uniquely yours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
            {/* Card 1 */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                <FaTshirt />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-900">Choose Your Product</h3>
              <p className="text-blue-700">Pick from t-shirts, hoodies, sleevies, or caps as your base canvas.</p>
            </div>

            {/* Card 2 */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                <FaPaintBrush />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-900">Customize Design</h3>
              <p className="text-blue-700">Upload your images or add custom text to make it truly your own.</p>
            </div>

            {/* Card 3 */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                <FaShoppingBag />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-900">Order & Enjoy</h3>
              <p className="text-blue-700">Place your order and receive your custom creation right at your doorstep.</p>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/product"
              className="inline-block bg-blue-600 text-white px-10 py-3 text-lg font-semibold rounded-md hover:bg-blue-700 transition-colors"
            >
              Start Designing Now
            </Link>
          </div>
        </div>
      </section>

      <FeaturedProducts />
      <Newsletter />
      <Footer />
    </main>
  )
}
