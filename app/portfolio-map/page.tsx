"use client"

import dynamic from "next/dynamic"
import { Loader } from "@react-three/drei"

const WordCloud3D = dynamic(() => import("@/components/word-cloud-3d").then((mod) => mod.WordCloud3D), {
  ssr: false,
})

export default function PortfolioMapPage() {
  return (
    <div className="h-[calc(100vh-4rem)] w-full bg-black">
      <WordCloud3D />
      <Loader />
    </div>
  )
}
