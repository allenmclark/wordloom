"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"
import { WordNode } from "./word-node"
import type { Vector3 } from "three"

// In a real app, this data would come from your backend after running UMAP/t-SNE on 300d embeddings
// I've increased the spread of the positions for a less clustered look.
const mockWords: {
  id: number
  word: string
  translation: string
  mastery: number
  position: Vector3 | [number, number, number]
}[] = [
  // Cluster 1: Food
  { id: 1, word: "manzana", translation: "apple", mastery: 0.95, position: [4, 4, 4] },
  { id: 2, word: "naranja", translation: "orange", mastery: 0.8, position: [4.8, 5.2, 3.2] },
  { id: 3, word: "plátano", translation: "banana", mastery: 0.6, position: [3.2, 2.8, 4.8] },
  { id: 4, word: "pan", translation: "bread", mastery: 0.98, position: [6, 3.6, 6] },
  { id: 5, word: "queso", translation: "cheese", mastery: 0.3, position: [4.4, 6.4, 5.6] },

  // Cluster 2: Animals
  { id: 6, word: "perro", translation: "dog", mastery: 1.0, position: [-8, -4, -6] },
  { id: 7, word: "gato", translation: "cat", mastery: 0.9, position: [-8.8, -4.8, -5.2] },
  { id: 8, word: "pájaro", translation: "bird", mastery: 0.75, position: [-7.2, -3.2, -6.8] },
  { id: 9, word: "león", translation: "lion", mastery: 0.2, position: [-10, -6, -4] },
  { id: 10, word: "elefante", translation: "elephant", mastery: 0.1, position: [-6, -7.2, -7.2] },

  // Cluster 3: Travel
  { id: 11, word: "viaje", translation: "trip", mastery: 0.88, position: [12, -8, 2] },
  { id: 12, word: "avión", translation: "airplane", mastery: 0.92, position: [13.2, -8.8, 1.2] },
  { id: 13, word: "hotel", translation: "hotel", mastery: 0.99, position: [11.2, -7.2, 2.8] },
  { id: 14, word: "playa", translation: "beach", mastery: 0.5, position: [14, -10, 3.6] },
  { id: 15, word: "montaña", translation: "mountain", mastery: 0.4, position: [10, -6, 0.4] },

  // Unclustered words
  { id: 16, word: "libro", translation: "book", mastery: 0.96, position: [0, 12, 0] },
  { id: 17, word: "música", translation: "music", mastery: 0.85, position: [-12, 8, 8] },
  { id: 18, word: "ciencia", translation: "science", mastery: 0.65, position: [8, 8, -12] },
]

export function WordCloud3D() {
  return (
    <Canvas camera={{ position: [0, 0, 25], fov: 45 }}>
      <color attach="background" args={["#030712"]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[15, 15, 15]} intensity={1.2} color="#fc4c02" />
      <pointLight position={[-15, -15, -15]} intensity={1.2} color="#4f46e5" />

      {mockWords.map((props) => (
        <WordNode key={props.id} {...props} />
      ))}

      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      <Stars radius={200} depth={50} count={10000} factor={8} saturation={0} fade speed={1} />
    </Canvas>
  )
}
