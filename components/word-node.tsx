"use client"

import * as THREE from "three"
import { useState, useMemo } from "react"
import { Text, Html } from "@react-three/drei"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

type WordNodeProps = {
  word: string
  translation: string
  mastery: number
  position: THREE.Vector3
}

export function WordNode({ word, translation, mastery, position }: WordNodeProps) {
  const [hovered, setHovered] = useState(false)
  const [active, setActive] = useState(false)

  const color = useMemo(() => {
    if (hovered) return new THREE.Color("white")
    if (mastery >= 0.9) return new THREE.Color("#4ade80") // green-400
    if (mastery >= 0.5) return new THREE.Color("#facc15") // yellow-400
    return new THREE.Color("#60a5fa") // blue-400
  }, [mastery, hovered])

  return (
    <group position={position}>
      <mesh
        onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => (e.stopPropagation(), setActive(!active))}
      >
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.5 : 0.1}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>
      <Text
        position={[0, 0.2, 0]}
        fontSize={0.1}
        color="white"
        anchorX="center"
        anchorY="middle"
        visible={hovered || active}
      >
        {word}
      </Text>
      {active && (
        <Html position={[0.2, 0.2, 0]} center>
          <Card className="w-48 bg-background/80 backdrop-blur-sm border-white/20 text-white">
            <CardHeader className="p-3">
              <CardTitle className="text-base">{word}</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <p className="text-sm text-slate-300 mb-2">{translation}</p>
              <Progress value={mastery * 100} className="h-2" />
              <p className="text-xs text-slate-400 mt-1">Mastery: {Math.round(mastery * 100)}%</p>
            </CardContent>
          </Card>
        </Html>
      )}
    </group>
  )
}
