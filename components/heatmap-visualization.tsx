"use client"

import { Button } from "@/components/ui/button"

import { useState, useEffect } from "react"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"

interface WordData {
  word: string
  probability: number
}

const commonWords = [
  "apple",
  "house",
  "river",
  "happy",
  "dream",
  "light",
  "music",
  "ocean",
  "story",
  "cloud",
  "brave",
  "quiet",
  "swift",
  "grace",
  "truth",
  "peace",
  "honor",
  "faith",
  "hope",
  "wisdom",
  "journey",
  "forest",
  "mountain",
  "valley",
  "flower",
  "garden",
  "spirit",
  "friend",
  "family",
  "future",
  "present",
  "past",
  "moment",
  "silence",
  "whisper",
  "echo",
  "shadow",
  "bright",
  "gentle",
  "vivid",
  "serene",
  "calm",
  "vibrant",
  "radiant",
  "bliss",
  "wonder",
  "magic",
  "destiny",
  "freedom",
  "courage",
  "knowledge",
  "learn",
  "vocabulary",
  "success",
  "growth",
  "insight",
  "explore",
  "discover",
  "mastery",
  "challenge",
  "abundant",
  "benevolent",
  "captivate",
  "dazzling",
  "eloquent",
  "flourish",
  "glorious",
  "harmonious",
  "illustrious",
  "jubilant",
  "kaleidoscope",
  "luminous",
  "magnificent",
  "nebulous",
  "opulent",
  "paradox",
  "quixotic",
  "resplendent",
  "serendipity",
  "tranquil",
  "ubiquitous",
  "venerable",
  "whimsical",
  "xenodochial",
  "yearning",
  "zephyr",
  "ephemeral",
  "incandescent",
  "mellifluous",
  "penumbra",
  "quintessential",
  "rhapsodic",
  "solitude",
  "transient",
  "veridian",
  "wistful",
  "zenith",
  "azure",
  "celestial",
  "effervescent",
  "halcyon",
  "iridescent",
  "limerence",
  "nemesis",
  "oblivion",
  "panacea",
  "quiescent",
  "reverie",
  "sylvan",
  "talisman",
  "umbrage",
  "valiant",
  "winsome",
  "xylophone",
  "yonder",
  "zestful",
  "amethyst",
  "chrysanthemum",
  "dandelion",
  "emerald",
  "fuchsia",
  "geranium",
  "hyacinth",
  "indigo",
  "jasmine",
  "kiwi",
  "lavender",
  "magnolia",
  "narcissus",
  "orchid",
  "petunia",
  "quince",
  "rose",
  "sunflower",
  "tulip",
  "violet",
  "waterlily",
  "xenia",
  "yarrow",
  "zinnia",
]

const generateRandomWords = (count: number): WordData[] => {
  const shuffledWords = [...commonWords].sort(() => 0.5 - Math.random())
  return shuffledWords.slice(0, count).map((word) => ({
    word,
    probability: Math.random(), // Random probability between 0 and 1
  }))
}

const getColor = (probability: number): string => {
  // Hue for orange/red is around 25-35. Saturation 100%.
  // Lightness ranges from 95% (very light) to 40% (dark)
  const lightness = 95 - probability * 55
  return `hsl(25, 100%, ${lightness}%)`
}

export function HeatmapVisualization() {
  const [wordsData, setWordsData] = useState<WordData[]>([])

  useEffect(() => {
    // Generate 50 words as requested
    setWordsData(generateRandomWords(50))
  }, [])

  return (
    <div className="w-full h-full overflow-hidden">
      <h2 className="text-3xl font-bold text-center mb-4 text-gradient">Vocabulary Heatmap</h2>
      <p className="text-center text-lg text-gray-600 mb-8">
        Predicted probability of knowing a word. Darker shades indicate higher confidence.
        <br />
        Use your mouse wheel to zoom and drag to pan.
      </p>
      <div className="relative w-full h-[600px] border border-gray-200 rounded-lg overflow-hidden bg-white/50 backdrop-blur-sm shadow-inner">
        <TransformWrapper
          initialScale={1}
          minScale={0.5}
          maxScale={5}
          limitToBounds={false} // Allow panning outside initial bounds for better zoom experience
          centerZoomedOut={true}
          wheel={{ step: 0.1 }}
          panning={{ disabled: false }}
        >
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <>
              <div className="absolute top-2 right-2 z-10 flex gap-2">
                <Button onClick={() => zoomIn()} size="sm" variant="outline">
                  Zoom In
                </Button>
                <Button onClick={() => zoomOut()} size="sm" variant="outline">
                  Zoom Out
                </Button>
                <Button onClick={() => resetTransform()} size="sm" variant="outline">
                  Reset
                </Button>
              </div>
              <TransformComponent
                wrapperStyle={{ width: "100%", height: "100%" }}
                contentStyle={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8 xl:grid-cols-10 gap-3 p-4 min-w-[600px] min-h-[400px]">
                  {wordsData.map((data, index) => (
                    <div
                      key={index}
                      className="relative flex flex-col items-center justify-center p-3 rounded-lg shadow-sm text-center transition-all duration-200 ease-in-out aspect-square border border-gray-100"
                      style={{ backgroundColor: getColor(data.probability) }}
                    >
                      <span className="font-semibold text-white text-base sm:text-lg break-words leading-tight">
                        {data.word}
                      </span>
                      <span className="absolute bottom-1 right-1 text-xs text-white/80 font-mono">
                        {(data.probability * 100).toFixed(0)}%
                      </span>
                    </div>
                  ))}
                </div>
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </div>
    </div>
  )
}
