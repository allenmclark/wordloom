"use client"

import dynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"

const WordCloud3D = dynamic(() => import("@/components/word-cloud-3d").then((mod) => mod.WordCloud3D), {
  ssr: false,
  loading: () => (
    <div className="flex h-[calc(100vh-4rem)] w-full items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ),
})

export default function PortfolioMapPage() {
  return (
    <main className="h-[calc(100vh-4rem)] w-full bg-gray-900">
      <WordCloud3D />
    </main>
  )
}
