"use client"

import { useState } from "react"
import type { CustomizationOptions, BuildType, SizeType, ColorType } from "./product-customizer"
import { ChevronDown, ChevronUp } from "lucide-react"

interface CustomizationPanelProps {
  options: CustomizationOptions
  updateOptions: (options: Partial<CustomizationOptions>) => void
}

export function CustomizationPanel({ options, updateOptions }: CustomizationPanelProps) {
  const [isOpen, setIsOpen] = useState(true)

  const buildTypes: BuildType[] = ["lean", "regular", "athletic", "big"]
  const sizes: SizeType[] = ["XS", "S", "M", "L", "XL", "XXL"]
  const colors: ColorType[] = ["white", "black", "gray", "navy", "red"]

  return (
    <div className="mt-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div
        className="bg-gray-100 dark:bg-gray-800 p-4 flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-lg font-semibold">Customization Options</h2>
        <button className="text-gray-500 dark:text-gray-400">
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="p-4 space-y-6 bg-white dark:bg-gray-900">
          <div>
            <label className="block text-sm font-medium mb-2">Size</label>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 rounded-md ${
                    options.size === size
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                  onClick={() => updateOptions({ size })}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Color</label>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  className={`w-10 h-10 rounded-full border ${
                    options.color === color ? "ring-2 ring-black dark:ring-white ring-offset-2" : ""
                  }`}
                  style={{ backgroundColor: color === "navy" ? "#0a192f" : color }}
                  onClick={() => updateOptions({ color })}
                  aria-label={`Select ${color} color`}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Height (cm)</label>
            <div className="flex items-center">
              <input
                type="range"
                min="150"
                max="210"
                value={options.height}
                onChange={(e) => updateOptions({ height: Number.parseInt(e.target.value) })}
                className="w-full"
              />
              <span className="ml-2 min-w-[40px] text-right">{options.height}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Weight (kg)</label>
            <div className="flex items-center">
              <input
                type="range"
                min="40"
                max="120"
                value={options.weight}
                onChange={(e) => updateOptions({ weight: Number.parseInt(e.target.value) })}
                className="w-full"
              />
              <span className="ml-2 min-w-[40px] text-right">{options.weight}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Build</label>
            <div className="flex flex-wrap gap-2">
              {buildTypes.map((type) => (
                <button
                  key={type}
                  className={`px-4 py-2 rounded-md ${
                    options.build === type
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                  onClick={() => updateOptions({ build: type })}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
