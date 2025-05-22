import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">About Custom Tee</h1>

          <div className="mb-12 relative h-80 rounded-xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1581876955780-0b23b4a6a48d?q=80&w=1000"
              alt="Our workshop"
              fill
              className="object-cover"
            />
          </div>

          <div className="prose prose-lg max-w-none">
            <h2>Our Story</h2>
            <p>
              Custom Tee was founded in 2020 with a simple mission: to help people express their individuality through
              custom apparel. What started as a small operation in a garage has grown into a thriving business serving
              customers worldwide.
            </p>

            <p>
              We believe that clothing is more than just fabric—it's a canvas for self-expression. Whether you're
              creating a custom t-shirt for your team, designing a special gift, or just want to wear something that
              reflects your unique style, we're here to bring your vision to life.
            </p>

            <h2>Our Process</h2>
            <p>
              We use state-of-the-art printing technology to ensure your designs look vibrant and last through countless
              washes. Our team of skilled professionals carefully reviews each order to ensure the highest quality
              standards are met.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="font-bold mb-2">Design</h3>
                <p className="text-gray-600">Use our intuitive design tools to create your perfect apparel</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="font-bold mb-2">Print</h3>
                <p className="text-gray-600">We print your design with precision and care</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="font-bold mb-2">Deliver</h3>
                <p className="text-gray-600">Your custom creation arrives at your doorstep</p>
              </div>
            </div>

            <h2>Our Commitment</h2>
            <p>At Custom Tee, we're committed to:</p>
            <ul>
              <li>
                <strong>Quality:</strong> We use premium materials and printing techniques
              </li>
              <li>
                <strong>Sustainability:</strong> Eco-friendly practices and materials whenever possible
              </li>
              <li>
                <strong>Customer Satisfaction:</strong> Your happiness is our top priority
              </li>
              <li>
                <strong>Innovation:</strong> Constantly improving our design tools and options
              </li>
            </ul>

            <p>
              We're proud to have served thousands of satisfied customers and can't wait to help you create your perfect
              custom apparel.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
