"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

// Real images for the transition effect
const images = [
  {
    src: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=1000",
    alt: "Urban Collection T-shirt",
    title: "Urban Collection",
    description: "Express your style with our urban-inspired designs",
  },
  {
    src: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000",
    alt: "Nature Series Hoodie",
    title: "Nature Series",
    description: "Bring the outdoors to your wardrobe with our nature-inspired collection",
  },
  {
    src: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000",
    alt: "Abstract Art T-shirt",
    title: "Abstract Art",
    description: "Wear your creativity with bold abstract patterns and designs",
  },
]

export function ImageTransition() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [progress, setProgress] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const transitionDuration = 5000 // 5 seconds per image

  const nextImage = () => {
    if (isAnimating) return

    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % images.length)
    setProgress(0)

    // Reset animation state after transition completes
    setTimeout(() => {
      setIsAnimating(false)
    }, 1000)
  }

  const prevImage = () => {
    if (isAnimating) return

    setIsAnimating(true)
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    setProgress(0)

    // Reset animation state after transition completes
    setTimeout(() => {
      setIsAnimating(false)
    }, 1000)
  }

  useEffect(() => {
    // Auto-advance slides every 5 seconds
    timeoutRef.current = setTimeout(() => {
      nextImage()
    }, transitionDuration)

    // Update progress bar
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100
        return prev + (100 / transitionDuration) * 100
      })
    }, 100)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [currentIndex, isAnimating])

  const currentImage = images[currentIndex]

  // Frame transition effect
  const frameCount = 5
  const frames = Array.from({ length: frameCount }, (_, i) => i)

  return (
    <div className="relative w-full h-[600px] overflow-hidden rounded-xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col justify-center px-8">
            <motion.h2
              className="text-5xl font-bold mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {currentImage.title}
            </motion.h2>
            <motion.p
              className="text-xl mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {currentImage.description}
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link
                href="/product"
                className="bg-blue-600 text-white px-6 py-3 font-medium hover:bg-blue-700 transition-colors rounded-md"
              >
                Shop Collection
              </Link>
            </motion.div>
          </div>

          <div className="relative w-full h-full">
            {/* Frame-based transition effect */}
            <div className="relative w-full h-full overflow-hidden">
              {frames.map((frame) => (
                <motion.div
                  key={`${currentIndex}-${frame}`}
                  className="absolute inset-0"
                  style={{
                    clipPath: `inset(${(frame / frameCount) * 100}% 0 ${
                      ((frameCount - frame - 1) / frameCount) * 100
                    }% 0)`,
                    zIndex: frame,
                  }}
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 0.7,
                    delay: frame * 0.1,
                    ease: "easeOut",
                  }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={currentImage.src || "/placeholder.svg"}
                      alt={currentImage.alt}
                      fill
                      className="object-cover"
                      priority={frame === 0}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      <button
        onClick={prevImage}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-blue-600/50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-600/70 transition-colors z-10"
        disabled={isAnimating}
      >
        ←
      </button>
      <button
        onClick={nextImage}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-600/50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-600/70 transition-colors z-10"
        disabled={isAnimating}
      >
        →
      </button>

      {/* Progress dots only - removed horizontal line */}
      <div className="absolute bottom-8 left-0 w-full px-8">
        <div className="flex justify-center mt-4 space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-blue-500" : "bg-gray-500"}`}
              onClick={() => {
                if (!isAnimating) {
                  setCurrentIndex(index)
                  setProgress(0)
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
