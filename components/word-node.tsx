"use client"

import { useState, useMemo } from "react"
import { useThree } from "@react-three/fiber"
import { Text, Html } from "@react-three/drei"
import * as THREE from "three"

type WordNodeProps = {
  id: number
  word: string
  translation: string
  mastery: number
  position: THREE.Vector3
}

export function WordNode({ word, translation, mastery, position }: WordNodeProps) {
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const { viewport } = useThree()

  const color = useMemo(() => {
    if (mastery > 0.9) return new THREE.Color("#4ade80") // Green (Mastered)
    if (mastery > 0.6) return new THREE.Color("#facc15") // Yellow (Learning)
    return new THREE.Color("#60a5fa") // Blue (New)
  }, [mastery])

  const scale = viewport.width / 20

  return (
    <group position={position}>
      <Text
        fontSize={0.25 * scale}
        color={hovered ? "white" : color}
        anchorX="center"
        anchorY="middle"
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setClicked(!clicked)}
      >
        {word}
      </Text>
      {clicked && (
        <Html position={[0, 0.15 * scale, 0]} center>
          <div
            className="bg-gray-800/80 text-white p-2 rounded-md text-xs backdrop-blur-sm"
            style={{ minWidth: "120px" }}
          >
            <p className="font-bold text-sm">{word}</p>
            <p className="text-gray-300 italic">"{translation}"</p>
            <div className="w-full bg-gray-600 rounded-full h-1.5 mt-2">
              <div
                className="bg-gradient-to-r from-blue-400 to-green-400 h-1.5 rounded-full"
                style={{ width: `${mastery * 100}%` }}
              />
            </div>
            <p className="text-right text-gray-400 text-[10px] mt-1">Mastery: {Math.round(mastery * 100)}%</p>
          </div>
        </Html>
      )}
    </group>
  )
}
