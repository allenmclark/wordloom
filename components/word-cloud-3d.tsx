"use client"

import * as THREE from "three"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"
import { WordNode } from "./word-node"

// In a real app, this data would come from your backend after running UMAP/t-SNE on 300d embeddings
const mockWords = [
  // Cluster 1: Food
  { id: 1, word: "manzana", translation: "apple", mastery: 0.95, position: new THREE.Vector3(1, 1, 1) },
  { id: 2, word: "naranja", translation: "orange", mastery: 0.8, position: new THREE.Vector3(1.2, 1.3, 0.8) },
  { id: 3, word: "plátano", translation: "banana", mastery: 0.6, position: new THREE.Vector3(0.8, 0.7, 1.2) },
  { id: 4, word: "pan", translation: "bread", mastery: 0.98, position: new THREE.Vector3(1.5, 0.9, 1.5) },
  { id: 5, word: "queso", translation: "cheese", mastery: 0.3, position: new THREE.Vector3(1.1, 1.6, 1.4) },

  // Cluster 2: Animals
  { id: 6, word: "perro", translation: "dog", mastery: 1.0, position: new THREE.Vector3(-2, -1, -1.5) },
  { id: 7, word: "gato", translation: "cat", mastery: 0.9, position: new THREE.Vector3(-2.2, -1.2, -1.3) },
  { id: 8, word: "pájaro", translation: "bird", mastery: 0.75, position: new THREE.Vector3(-1.8, -0.8, -1.7) },
  { id: 9, word: "león", translation: "lion", mastery: 0.2, position: new THREE.Vector3(-2.5, -1.5, -1.0) },
  { id: 10, word: "elefante", translation: "elephant", mastery: 0.1, position: new THREE.Vector3(-1.5, -1.8, -1.8) },

  // Cluster 3: Travel
  { id: 11, word: "viaje", translation: "trip", mastery: 0.88, position: new THREE.Vector3(3, -2, 0.5) },
  { id: 12, word: "avión", translation: "airplane", mastery: 0.92, position: new THREE.Vector3(3.3, -2.2, 0.3) },
  { id: 13, word: "hotel", translation: "hotel", mastery: 0.99, position: new THREE.Vector3(2.8, -1.8, 0.7) },
  { id: 14, word: "playa", translation: "beach", mastery: 0.5, position: new THREE.Vector3(3.5, -2.5, 0.9) },
  { id: 15, word: "montaña", translation: "mountain", mastery: 0.4, position: new THREE.Vector3(2.5, -1.5, 0.1) },

  // Unclustered words
  { id: 16, word: "libro", translation: "book", mastery: 0.96, position: new THREE.Vector3(0, 3, 0) },
  { id: 17, word: "música", translation: "music", mastery: 0.85, position: new THREE.Vector3(-3, 2, 2) },
  { id: 18, word: "ciencia", translation: "science", mastery: 0.65, position: new THREE.Vector3(2, 2, -3) },
]

export function WordCloud3D() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 25 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      {mockWords.map((props) => (
        <WordNode key={props.id} {...props} />
      ))}

      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    </Canvas>
  )
}
