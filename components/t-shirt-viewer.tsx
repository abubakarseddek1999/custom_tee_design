"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Text, Environment, PerspectiveCamera } from "@react-three/drei"
import { TextureLoader } from "three/src/loaders/TextureLoader"
import type * as THREE from "three"
import type { ProductType, ColorType } from "./product-customizer"

interface TShirtViewerProps {
  productType: ProductType
  productColor: ColorType
  designImage: string | null
  customText: string
  textColor: string
}

export function TShirtViewer({ productType, productColor, designImage, customText, textColor }: TShirtViewerProps) {
  return (
    <div className="w-full aspect-square">
      <Canvas shadows>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />
        <pointLight position={[-10, -10, -10]} />

        <ProductModel
          productType={productType}
          productColor={productColor}
          designImage={designImage}
          customText={customText}
          textColor={textColor}
        />

        <OrbitControls
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          minDistance={1.5}
          maxDistance={4}
        />
        <Environment preset="studio" />
        <PerspectiveCamera makeDefault position={[0, 0, 2.5]} fov={50} />
      </Canvas>
    </div>
  )
}

function ProductModel({ productType, productColor, designImage, customText, textColor }: TShirtViewerProps) {
  const group = useRef<THREE.Group>(null)
  const [texture, setTexture] = useState<THREE.Texture | null>(null)
  const { scene } = useThree()

  // Load texture when designImage changes
  useEffect(() => {
    if (!designImage) return

    const loader = new TextureLoader()
    loader.load(
      designImage,
      (loadedTexture) => {
        setTexture(loadedTexture)
      },
      undefined,
      (error) => {
        console.error("Error loading texture:", error)
      },
    )

    return () => {
      if (texture) {
        texture.dispose()
      }
    }
  }, [designImage])

  // Rotate the model slightly
  useFrame((state) => {
    if (group.current) {
      const t = state.clock.getElapsedTime() * 0.3
      group.current.rotation.y = Math.sin(t) * 0.1
    }
  })

  // Get product color
  const getProductColorHex = () => {
    switch (productColor) {
      case "white":
        return "#ffffff"
      case "black":
        return "#000000"
      case "gray":
        return "#808080"
      case "navy":
        return "#0a192f"
      case "red":
        return "#ff0000"
      default:
        return "#ffffff"
    }
  }

  // Enhanced 3D models for each product type
  const renderProductShape = () => {
    switch (productType) {
      case "tshirt":
        return (
          <group>
            <mesh castShadow receiveShadow position={[0, 0, 0]} scale={1}>
              <boxGeometry args={[1, 1.5, 0.2]} />
              <meshStandardMaterial color={getProductColorHex()} />
            </mesh>
            {/* Collar */}
            <mesh position={[0, 0.7, 0.1]} scale={[0.4, 0.1, 0.1]}>
              <cylinderGeometry args={[1, 1, 1, 32]} />
              <meshStandardMaterial color={getProductColorHex()} />
            </mesh>
            {/* Sleeves */}
            <mesh position={[-0.6, 0.3, 0]} rotation={[0, 0, -Math.PI / 4]} scale={[0.2, 0.5, 0.2]}>
              <cylinderGeometry args={[1, 0.8, 1, 32]} />
              <meshStandardMaterial color={getProductColorHex()} />
            </mesh>
            <mesh position={[0.6, 0.3, 0]} rotation={[0, 0, Math.PI / 4]} scale={[0.2, 0.5, 0.2]}>
              <cylinderGeometry args={[1, 0.8, 1, 32]} />
              <meshStandardMaterial color={getProductColorHex()} />
            </mesh>
          </group>
        )
      case "hoodie":
        return (
          <group>
            <mesh castShadow receiveShadow position={[0, 0, 0]} scale={1}>
              <boxGeometry args={[1.2, 1.6, 0.3]} />
              <meshStandardMaterial color={getProductColorHex()} />
            </mesh>
            {/* Hood */}
            <mesh position={[0, 0.9, -0.1]} scale={[0.6, 0.3, 0.3]}>
              <sphereGeometry args={[1, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
              <meshStandardMaterial color={getProductColorHex()} />
            </mesh>
            {/* Pocket */}
            <mesh position={[0, -0.3, 0.16]} scale={[0.7, 0.3, 0.05]}>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color={getProductColorHex() === "#ffffff" ? "#f0f0f0" : "#000000"} />
            </mesh>
            {/* Drawstrings */}
            <mesh position={[-0.2, 0.7, 0.16]} scale={[0.02, 0.3, 0.02]}>
              <cylinderGeometry args={[1, 1, 1, 8]} />
              <meshStandardMaterial color={getProductColorHex() === "#ffffff" ? "#dddddd" : "#333333"} />
            </mesh>
            <mesh position={[0.2, 0.7, 0.16]} scale={[0.02, 0.3, 0.02]}>
              <cylinderGeometry args={[1, 1, 1, 8]} />
              <meshStandardMaterial color={getProductColorHex() === "#ffffff" ? "#dddddd" : "#333333"} />
            </mesh>
          </group>
        )
      case "sleevie":
        return (
          <group>
            <mesh castShadow receiveShadow position={[0, 0, 0]} scale={1}>
              <boxGeometry args={[1.1, 1.4, 0.2]} />
              <meshStandardMaterial color={getProductColorHex()} />
            </mesh>
            {/* Collar */}
            <mesh position={[0, 0.65, 0.1]} scale={[0.35, 0.08, 0.1]}>
              <cylinderGeometry args={[1, 1, 1, 32]} />
              <meshStandardMaterial color={getProductColorHex()} />
            </mesh>
            {/* Long Sleeves */}
            <mesh position={[-0.65, 0.2, 0]} rotation={[0, 0, -Math.PI / 4]} scale={[0.2, 0.7, 0.2]}>
              <cylinderGeometry args={[1, 0.7, 1, 32]} />
              <meshStandardMaterial color={getProductColorHex()} />
            </mesh>
            <mesh position={[0.65, 0.2, 0]} rotation={[0, 0, Math.PI / 4]} scale={[0.2, 0.7, 0.2]}>
              <cylinderGeometry args={[1, 0.7, 1, 32]} />
              <meshStandardMaterial color={getProductColorHex()} />
            </mesh>
            {/* Cuffs */}
            <mesh position={[-0.9, -0.1, 0]} rotation={[0, 0, -Math.PI / 4]} scale={[0.18, 0.1, 0.18]}>
              <cylinderGeometry args={[1, 1, 1, 32]} />
              <meshStandardMaterial color={getProductColorHex() === "#ffffff" ? "#eeeeee" : "#111111"} />
            </mesh>
            <mesh position={[0.9, -0.1, 0]} rotation={[0, 0, Math.PI / 4]} scale={[0.18, 0.1, 0.18]}>
              <cylinderGeometry args={[1, 1, 1, 32]} />
              <meshStandardMaterial color={getProductColorHex() === "#ffffff" ? "#eeeeee" : "#111111"} />
            </mesh>
          </group>
        )
      case "cap":
        return (
          <group>
            <mesh castShadow receiveShadow position={[0, 0.2, 0]} scale={0.8}>
              <sphereGeometry args={[0.5, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
              <meshStandardMaterial color={getProductColorHex()} />
            </mesh>
            <mesh castShadow receiveShadow position={[0, 0, 0.3]} rotation={[Math.PI / 2, 0, 0]} scale={0.8}>
              <cylinderGeometry args={[0.6, 0.6, 0.1, 32]} />
              <meshStandardMaterial color={getProductColorHex()} />
            </mesh>
            {/* Brim */}
            <mesh
              castShadow
              receiveShadow
              position={[0, -0.05, 0.6]}
              rotation={[Math.PI / 2, 0, 0]}
              scale={[1, 0.6, 0.1]}
            >
              <cylinderGeometry args={[0.8, 0.8, 0.1, 32, 1, false, 0, Math.PI]} />
              <meshStandardMaterial color={getProductColorHex()} />
            </mesh>
            {/* Button on top */}
            <mesh position={[0, 0.5, 0]} scale={0.08}>
              <sphereGeometry args={[1, 16, 16]} />
              <meshStandardMaterial color={getProductColorHex() === "#ffffff" ? "#dddddd" : "#333333"} />
            </mesh>
          </group>
        )
      default:
        return (
          <mesh castShadow receiveShadow position={[0, 0, 0]} scale={1}>
            <boxGeometry args={[1, 1.5, 0.2]} />
            <meshStandardMaterial color={getProductColorHex()} />
          </mesh>
        )
    }
  }

  // Determine text color contrast for dark product colors
  const getTextColorForProduct = () => {
    if (productColor === "black" || productColor === "navy") {
      return textColor === "#000000" ? "#FFFFFF" : textColor
    }
    return textColor
  }

  return (
    <group ref={group}>
      {renderProductShape()}

      {/* Design on the product */}
      {texture && (
        <mesh
          position={[0, productType === "cap" ? 0.2 : 0.2, productType === "cap" ? 0.5 : 0.11]}
          scale={productType === "cap" ? 0.4 : 0.8}
        >
          <planeGeometry args={[1, 1]} />
          <meshStandardMaterial map={texture} transparent />
        </mesh>
      )}

      {/* Custom text */}
      {customText && (
        <Text
          position={[0, productType === "cap" ? 0 : -0.4, productType === "cap" ? 0.5 : 0.11]}
          fontSize={0.08}
          maxWidth={0.8}
          lineHeight={1.2}
          textAlign="center"
          color={getTextColorForProduct()}
        >
          {customText}
        </Text>
      )}

      {/* Product type indicator */}
      <Text
        position={[0, 0.8, 0.11]}
        fontSize={0.1}
        color={productColor === "black" || productColor === "navy" ? "#FFFFFF" : "#000000"}
      >
        {productType.toUpperCase()}
      </Text>
    </group>
  )
}
