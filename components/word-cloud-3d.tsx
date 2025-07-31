"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"
import { WordNode } from "./word-node"
import * as THREE from "three"

// Mock data with 3D positions from a dimensionality reduction (e.g., UMAP)
const mockWords = [
  // Cluster 1: Animals
  { id: 1, word: "perro", translation: "dog", mastery: 0.95, position: new THREE.Vector3(-6, 4, -5) },
  { id: 2, word: "gato", translation: "cat", mastery: 0.8, position: new THREE.Vector3(-6.5, 4.2, -4.5) },
  { id: 3, word: "pájaro", translation: "bird", mastery: 0.6, position: new THREE.Vector3(-5.5, 3.8, -5.5) },

  // Cluster 2: Food
  { id: 4, word: "manzana", translation: "apple", mastery: 1.0, position: new THREE.Vector3(5, -5, 6) },
  { id: 5, word: "pan", translation: "bread", mastery: 0.7, position: new THREE.Vector3(5.2, -4.5, 6.5) },
  { id: 6, word: "queso", translation: "cheese", mastery: 0.4, position: new THREE.Vector3(4.8, -5.5, 5.5) },

  // Cluster 3: House
  { id: 7, word: "casa", translation: "house", mastery: 0.9, position: new THREE.Vector3(0, 7, 0) },
  { id: 8, word: "puerta", translation: "door", mastery: 0.85, position: new THREE.Vector3(0.5, 7.5, 0) },
  { id: 9, word: "ventana", translation: "window", mastery: 0.7, position: new THREE.Vector3(-0.5, 6.5, 0.5) },

  // Cluster 4: Travel
  { id: 10, word: "viaje", translation: "trip", mastery: 0.5, position: new THREE.Vector3(8, 0, -8) },
  { id: 11, word: "avión", translation: "airplane", mastery: 0.6, position: new THREE.Vector3(8.5, 0.5, -7.5) },
  { id: 12, word: "hotel", translation: "hotel", mastery: 0.9, position: new THREE.Vector3(7.5, -0.5, -8.5) },

  // Unclustered words
  { id: 13, word: "libro", translation: "book", mastery: 0.98, position: new THREE.Vector3(-8, -8, 8) },
  { id: 14, word: "música", translation: "music", mastery: 0.3, position: new THREE.Vector3(0, 0, 10) },
  { id: 15, word: "agua", translation: "water", mastery: 1.0, position: new THREE.Vector3(10, 10, 10) },
]

export function WordCloud3D() {
  return (
    <Canvas camera={{ position: [0, 0, 18], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <OrbitControls enableZoom={true} enablePan={true} />
      {mockWords.map((word) => (
        <WordNode key={word.id} {...word} />
      ))}
    </Canvas>
  )
}
