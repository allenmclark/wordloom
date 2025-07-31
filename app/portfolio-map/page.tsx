"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"
import { Loader } from "lucide-react"

const WordCloud3D = dynamic(() => import("@/components/word-cloud-3d").then((mod) => mod.WordCloud3D), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-gray-900 text-white">
      <div className="flex flex-col items-center gap-4">
        <Loader className="h-8 w-8 animate-spin" />
        <p className="text-lg">Building Vocabulary Universe...</p>
        <p className="text-sm text-muted-foreground">This may take a moment.</p>
      </div>
    </div>
  ),
})

export default function PortfolioMapPage() {
  return (
    <main className="h-[calc(100vh-4rem)] w-full">
      <Suspense fallback={null}>
        <WordCloud3D />
      </Suspense>
    </main>
  )
}
