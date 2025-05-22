# 🧢 Custom Tee Design – POD T-Shirt Store (SPA)

**Live Demo**: [https://custom-tee-design.vercel.app/](https://custom-tee-design.vercel.app/)  
**Author**: Abu Bakar

---

## 📦 Project Overview

This is a **Print-on-Demand (POD) T-shirt store** built as a **Single Page Application** using **Lit Web Components**. Users can customize their apparel with uploaded images or typed text and preview them on interactive 3D models of t-shirts, hoodies, caps, and more.

This project replicates and enhances the experience from:
- ✨ [Repeating Image Transition Animation](https://tympanus.net/Development/RepeatingImageTransition/)
- 🛍️ UI inspirations from Codepen + Three.js T-shirt renderer

---

## 🛠️ Features

### 🔁 Home Page
- Pixel-perfect clone of the [Tympanus animation](https://tympanus.net/Development/RepeatingImageTransition/)
- Uses `<lit-router>` for client-side routing
- Reusable Lit components for transitions
- Built with full Vite SPA setup

### 👕 Product Page
- Three.js 3D models for apparel with drag-to-rotate preview
- Image upload/drag-and-drop with dual preview:
  - Full-size image
  - Smaller version rendered inside apparel
- Customization fields: Height, Weight, Build (Athletic, Regular, Lean, Big)
- Text input (max 3 lines) to print on shirt
- Switch between **3 layout styles** using `Alt + Q`
- Style inspired by [jh3y UI playground](https://codepen.io/jh3y/pen/QWPGwOr)

### 🧑‍🎨 Style & Experience
- Fully responsive and mobile-optimized
- Styling with **Tailwind CSS**
- Minimalist layout, dynamic transitions, smooth UX
- No backend or server interaction

---

## 🚀 Tech Stack

| Feature        | Tech Used                  |
|----------------|----------------------------|
| Framework      | Lit Web Components         |
| Build Tool     | Vite                       |
| Styling        | Tailwind CSS               |
| 3D Rendering   | Three.js (custom model)    |
| Routing        | Manual SPA logic in Lit    |
| Deployment     | Vercel (for demo only, to be moved to Cloudflare Pages) |
| Image Effects  | Custom shader + Tympanus pattern |
| Storybook      | Component-driven workflow for testing |

---

## 🧱 Project Structure

