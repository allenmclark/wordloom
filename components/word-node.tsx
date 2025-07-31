"use client"

import * as THREE from "three"
import { useState, useMemo } from "react"
import { Html } from "@react-three/drei"
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
    if (mastery >= 0.9) return new THREE.Color("#4ade80") // green-400
    if (mastery >= 0.5) return new THREE.Color("#facc15") // yellow-400
    return new THREE.Color("#60a5fa") // blue-400
  }, [mastery])

  return (
    <group position={position}>
      <mesh
        onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => (e.stopPropagation(), setActive(!active))}
        scale={active ? 1.5 : 1}
      >
        <sphereGeometry args={[0.05, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered || active ? 1 : 0.5}
          toneMapped={false}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>

      <Html position={[0, 0.1, 0]} wrapperClass="word-node-html" center distanceFactor={8} visible={active} transform>
        <Card className="w-48 bg-background/80 backdrop-blur-sm border-white/20 text-white shadow-lg">
          <CardHeader className="p-3">
            <CardTitle className="text-base">{word}</CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <p className="text-sm text-slate-300 mb-2 italic">"{translation}"</p>
            <Progress value={mastery * 100} className="h-2" />
            <p className="text-xs text-slate-400 mt-1 text-right">Mastery: {Math.round(mastery * 100)}%</p>
          </CardContent>
        </Card>
      </Html>
    </group>
  )
}
