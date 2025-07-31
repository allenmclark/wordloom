"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const WordCloud3D = dynamic(() => import("@/components/word-cloud-3d").then((mod) => mod.WordCloud3D), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] flex items-center justify-center bg-muted rounded-lg">
      <p>Loading Vocabulary Universe...</p>
    </div>
  ),
})

export default function PortfolioMapPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Vocabulary Universe</CardTitle>
          <CardDescription>
            An interactive 3D map of your vocabulary portfolio. Words are clustered by semantic meaning.
            <br />
            Use your mouse to rotate (left-click & drag), zoom (scroll), and pan (right-click & drag).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[65vh] rounded-lg overflow-hidden border">
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center bg-muted">
                  <p>Loading 3D assets...</p>
                </div>
              }
            >
              <WordCloud3D />
            </Suspense>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
