"use client"

import type React from "react"
import { useState } from "react"
import { Bold, Italic, AlignLeft, AlignCenter, AlignRight } from "lucide-react"

interface TextEditorProps {
  value: string
  onChange: (text: string) => void
  textColor: string
  onColorChange: (color: string) => void
}

export function TextEditor({ value, onChange, textColor, onColorChange }: TextEditorProps) {
  const MAX_LINES = 3
  const MAX_CHARS = 100
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right">("center")
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    const lines = text.split("\n")

    // Limit to 3 lines
    if (lines.length > MAX_LINES) {
      const limitedText = lines.slice(0, MAX_LINES).join("\n")
      onChange(limitedText)
      return
    }

    // Limit total characters
    if (text.length <= MAX_CHARS) {
      onChange(text)
    }
  }

  const fontOptions = [
    { name: "Sans Serif", value: "sans-serif" },
    { name: "Serif", value: "serif" },
    { name: "Monospace", value: "monospace" },
    { name: "Cursive", value: "cursive" },
  ]

  const popularColors = [
    { name: "Black", value: "#000000" },
    { name: "White", value: "#FFFFFF" },
    { name: "Red", value: "#FF0000" },
    { name: "Blue", value: "#0000FF" },
    { name: "Green", value: "#008000" },
    { name: "Yellow", value: "#FFFF00" },
    { name: "Purple", value: "#800080" },
    { name: "Orange", value: "#FFA500" },
  ]

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Add Custom Text</h2>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2 mb-2">
          <button
            onClick={() => setIsBold(!isBold)}
            className={`p-2 rounded-md ${
              isBold
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
            aria-label="Bold"
          >
            <Bold size={16} />
          </button>
          <button
            onClick={() => setIsItalic(!isItalic)}
            className={`p-2 rounded-md ${
              isItalic
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
            aria-label="Italic"
          >
            <Italic size={16} />
          </button>
          <button
            onClick={() => setTextAlign("left")}
            className={`p-2 rounded-md ${
              textAlign === "left"
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
            aria-label="Align Left"
          >
            <AlignLeft size={16} />
          </button>
          <button
            onClick={() => setTextAlign("center")}
            className={`p-2 rounded-md ${
              textAlign === "center"
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
            aria-label="Align Center"
          >
            <AlignCenter size={16} />
          </button>
          <button
            onClick={() => setTextAlign("right")}
            className={`p-2 rounded-md ${
              textAlign === "right"
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
            aria-label="Align Right"
          >
            <AlignRight size={16} />
          </button>

          <select
            className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 border-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            defaultValue="sans-serif"
          >
            {fontOptions.map((font) => (
              <option key={font.value} value={font.value}>
                {font.name}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <textarea
            value={value}
            onChange={handleTextChange}
            placeholder="Enter text to print on your apparel (max 3 lines)"
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 dark:text-white"
            rows={3}
            maxLength={MAX_CHARS}
            style={{
              textAlign,
              fontWeight: isBold ? "bold" : "normal",
              fontStyle: isItalic ? "italic" : "normal",
            }}
          />
          <div className="absolute bottom-2 right-2 text-xs text-gray-500 dark:text-gray-400">
            {value.length}/{MAX_CHARS}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Text Color:</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {popularColors.map((color) => (
              <button
                key={color.value}
                className={`w-8 h-8 rounded-full border ${
                  textColor === color.value ? "ring-2 ring-black dark:ring-white ring-offset-2" : ""
                }`}
                style={{ backgroundColor: color.value }}
                onClick={() => onColorChange(color.value)}
                aria-label={`Select ${color.name} color`}
              />
            ))}
          </div>
          <div className="flex items-center">
            <input
              type="color"
              value={textColor}
              onChange={(e) => onColorChange(e.target.value)}
              className="w-10 h-10 rounded-md cursor-pointer"
            />
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400 uppercase">{textColor}</span>
          </div>
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-400">
          {value.split("\n").length}/{MAX_LINES} lines
        </div>
      </div>
    </div>
  )
}
