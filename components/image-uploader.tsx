"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, X } from "lucide-react"

interface ImageUploaderProps {
  onImageUpload: (imageUrl: string) => void
}

export function ImageUploader({ onImageUpload }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    if (!file.type.match("image.*")) {
      alert("Please select an image file")
      return
    }

    setIsLoading(true)
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target && typeof e.target.result === "string") {
        setPreview(e.target.result)
        onImageUpload(e.target.result)
        setIsLoading(false)
      }
    }
    reader.readAsDataURL(file)
  }

  const clearImage = () => {
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const sampleImages = [
    "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=300",
    "https://images.unsplash.com/photo-1516876437184-593fda40c7ce?q=80&w=300",
    "https://images.unsplash.com/photo-1541753866388-0b3c701627d3?q=80&w=300",
    "https://images.unsplash.com/photo-1614632537197-38a17061c2bd?q=80&w=300",
  ]

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Upload Your Design</h2>

      {preview ? (
        <div className="relative">
          <img
            src={preview || "/placeholder.svg"}
            alt="Preview"
            className="w-full max-h-64 object-contain border rounded-lg"
          />
          <button
            onClick={clearImage}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <>
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
              isDragging
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                : "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            {isLoading ? (
              <div className="flex flex-col items-center">
                <div className="animate-spin h-10 w-10 border-4 border-gray-400 border-t-transparent rounded-full mb-4"></div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Processing your image...</p>
              </div>
            ) : (
              <>
                <Upload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Drag and drop an image here, or click to select a file
                </p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">PNG, JPG, GIF up to 5MB</p>
              </>
            )}
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Or choose from our sample designs:</h3>
            <div className="grid grid-cols-4 gap-2">
              {sampleImages.map((image, index) => (
                <button
                  key={index}
                  className="border rounded-md overflow-hidden hover:ring-2 ring-black dark:ring-white transition-all"
                  onClick={() => onImageUpload(image)}
                >
                  <img src={image || "/placeholder.svg"} alt={`Sample design ${index + 1}`} className="w-full h-auto" />
                </button>
              ))}
            </div>
          </div>
        </>
      )}
      <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleFileInput} />
    </div>
  )
}
