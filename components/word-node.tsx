"use client"

import { useState, useMemo } from "react"
import { Text } from "@react-three/drei"
import type { Vector3 } from "three"

type WordNodeProps = {
  word: string
  translation: string
  mastery: number
  position: Vector3 | [number, number, number]
}

export function WordNode({ word, translation, mastery, position }: WordNodeProps) {
  const [active, setActive] = useState(false)

  const color = useMemo(() => {
    if (mastery >= 0.9) return "#fc4c02" // orange-500 (High Mastery)
    if (mastery >= 0.5) return "#fb923c" // orange-400 (Medium Mastery)
    return "#94a3b8" // slate-400 (Low Mastery)
  }, [mastery])

  return (
    <group position={position} onClick={() => setActive(!active)}>
      <Text
        fontSize={active ? 0.8 : 0.5}
        color={active ? "white" : color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={active ? 0.02 : 0}
        outlineColor="white"
      >
        {word}
      </Text>

      {/* Show mastery % when not active */}
      {!active && (
        <Text position={[0, -0.35, 0]} fontSize={0.25} color={color} anchorX="center" anchorY="middle">
          {`${Math.round(mastery * 100)}%`}
        </Text>
      )}

      {/* Show details when active */}
      {active && (
        <>
          <Text
            position={[0, -0.5, 0]}
            fontSize={0.3}
            color="#d1d5db" // gray-300
            anchorX="center"
            anchorY="middle"
          >
            "{translation}"
          </Text>
          <Text position={[0, -0.8, 0]} fontSize={0.25} color={color} anchorX="center" anchorY="middle">
            Mastery: {Math.round(mastery * 100)}%
          </Text>
        </>
      )}
    </group>
  )
}
