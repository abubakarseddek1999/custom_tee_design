"use client"

import type React from "react"

import { useState } from "react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // In a real app, you would send this to your API
      console.log("Subscribing email:", email)
      setSubscribed(true)
      setEmail("")

      // Store in localStorage
      const subscribers = JSON.parse(localStorage.getItem("subscribers") || "[]")
      subscribers.push({ email, date: new Date().toISOString() })
      localStorage.setItem("subscribers", JSON.stringify(subscribers))
    }
  }

  return (
    <section className="py-16 bg-blue-900 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
        <p className="text-blue-100 max-w-2xl mx-auto mb-8">
          Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
        </p>

        {subscribed ? (
          <div className="bg-blue-600 text-white p-4 rounded-md max-w-md mx-auto">
            <p>Thanks for subscribing! We'll be in touch soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-l-md text-black focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-r-md font-medium hover:bg-blue-700 transition-colors"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
