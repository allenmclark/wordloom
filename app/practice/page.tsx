"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, BookOpen, Check, HelpCircle, X, User, Settings, LogOut, TrendingUp } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Area, AreaChart, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Types for our vocabulary items
type SpanishWord = {
  id: number
  spanish: string
  english: string
  exampleSentence: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
}

// Mock data - in a real app, this would come from your database
const spanishVocabulary: SpanishWord[] = [
  {
    id: 1,
    spanish: "casa",
    english: "house",
    exampleSentence: "Mi casa está cerca del parque.",
    difficulty: "Beginner",
  },
  {
    id: 2,
    spanish: "tiempo",
    english: "time",
    exampleSentence: "No tengo tiempo para hacer ejercicio hoy.",
    difficulty: "Beginner",
  },
  {
    id: 3,
    spanish: "trabajo",
    english: "work",
    exampleSentence: "Me gusta mi trabajo porque es interesante.",
    difficulty: "Beginner",
  },
  {
    id: 4,
    spanish: "desarrollar",
    english: "to develop",
    exampleSentence: "Necesitamos desarrollar nuevas estrategias.",
    difficulty: "Intermediate",
  },
  {
    id: 5,
    spanish: "acontecimiento",
    english: "event",
    exampleSentence: "El acontecimiento fue celebrado por toda la ciudad.",
    difficulty: "Advanced",
  },
  {
    id: 6,
    spanish: "deslumbrante",
    english: "dazzling",
    exampleSentence: "Las estrellas eran deslumbrantes en el cielo nocturno.",
    difficulty: "Advanced",
  },
  {
    id: 7,
    spanish: "madrugada",
    english: "early morning",
    exampleSentence: "Me desperté en la madrugada para ver el amanecer.",
    difficulty: "Intermediate",
  },
  {
    id: 8,
    spanish: "aprovechar",
    english: "to take advantage of",
    exampleSentence: "Debes aprovechar esta oportunidad única.",
    difficulty: "Intermediate",
  },
  {
    id: 9,
    spanish: "desafortunadamente",
    english: "unfortunately",
    exampleSentence: "Desafortunadamente, no podré asistir a la reunión.",
    difficulty: "Intermediate",
  },
  {
    id: 10,
    spanish: "imprescindible",
    english: "essential",
    exampleSentence: "Es imprescindible llevar identificación.",
    difficulty: "Advanced",
  },
]

// Mock historical performance data for each word
const wordPerformanceHistory: Record<number, { attempt: number; correct: boolean; cumulativeRate: number }[]> = {
  1: [
    { attempt: 1, correct: true, cumulativeRate: 100 },
    { attempt: 2, correct: true, cumulativeRate: 100 },
    { attempt: 3, correct: false, cumulativeRate: 67 },
    { attempt: 4, correct: true, cumulativeRate: 75 },
    { attempt: 5, correct: true, cumulativeRate: 80 },
    { attempt: 6, correct: false, cumulativeRate: 67 },
    { attempt: 7, correct: true, cumulativeRate: 71 },
    { attempt: 8, correct: true, cumulativeRate: 75 },
  ],
  2: [
    { attempt: 1, correct: false, cumulativeRate: 0 },
    { attempt: 2, correct: true, cumulativeRate: 50 },
    { attempt: 3, correct: true, cumulativeRate: 67 },
    { attempt: 4, correct: false, cumulativeRate: 50 },
    { attempt: 5, correct: true, cumulativeRate: 60 },
    { attempt: 6, correct: true, cumulativeRate: 67 },
    { attempt: 7, correct: true, cumulativeRate: 71 },
    { attempt: 8, correct: false, cumulativeRate: 63 },
    { attempt: 9, correct: true, cumulativeRate: 67 },
    { attempt: 10, correct: true, cumulativeRate: 70 },
  ],
  3: [
    { attempt: 1, correct: true, cumulativeRate: 100 },
    { attempt: 2, correct: false, cumulativeRate: 50 },
    { attempt: 3, correct: true, cumulativeRate: 67 },
    { attempt: 4, correct: true, cumulativeRate: 75 },
    { attempt: 5, correct: false, cumulativeRate: 60 },
    { attempt: 6, correct: true, cumulativeRate: 67 },
  ],
  4: [
    { attempt: 1, correct: false, cumulativeRate: 0 },
    { attempt: 2, correct: false, cumulativeRate: 0 },
    { attempt: 3, correct: true, cumulativeRate: 33 },
    { attempt: 4, correct: true, cumulativeRate: 50 },
    { attempt: 5, correct: false, cumulativeRate: 40 },
    { attempt: 6, correct: true, cumulativeRate: 50 },
    { attempt: 7, correct: true, cumulativeRate: 57 },
    { attempt: 8, correct: true, cumulativeRate: 63 },
    { attempt: 9, correct: false, cumulativeRate: 56 },
    { attempt: 10, correct: true, cumulativeRate: 60 },
    { attempt: 11, correct: true, cumulativeRate: 64 },
    { attempt: 12, correct: true, cumulativeRate: 67 },
  ],
  5: [
    { attempt: 1, correct: false, cumulativeRate: 0 },
    { attempt: 2, correct: false, cumulativeRate: 0 },
    { attempt: 3, correct: false, cumulativeRate: 0 },
    { attempt: 4, correct: true, cumulativeRate: 25 },
    { attempt: 5, correct: false, cumulativeRate: 20 },
    { attempt: 6, correct: true, cumulativeRate: 33 },
    { attempt: 7, correct: true, cumulativeRate: 43 },
    { attempt: 8, correct: false, cumulativeRate: 38 },
    { attempt: 9, correct: true, cumulativeRate: 44 },
    { attempt: 10, correct: true, cumulativeRate: 50 },
  ],
  6: [
    { attempt: 1, correct: true, cumulativeRate: 100 },
    { attempt: 2, correct: true, cumulativeRate: 100 },
    { attempt: 3, correct: false, cumulativeRate: 67 },
    { attempt: 4, correct: true, cumulativeRate: 75 },
    { attempt: 5, correct: true, cumulativeRate: 80 },
  ],
  7: [
    { attempt: 1, correct: true, cumulativeRate: 100 },
    { attempt: 2, correct: true, cumulativeRate: 100 },
    { attempt: 3, correct: false, cumulativeRate: 67 },
    { attempt: 4, correct: true, cumulativeRate: 75 },
    { attempt: 5, correct: true, cumulativeRate: 80 },
    { attempt: 6, correct: false, cumulativeRate: 67 },
    { attempt: 7, correct: true, cumulativeRate: 71 },
    { attempt: 8, correct: true, cumulativeRate: 75 },
    { attempt: 9, correct: true, cumulativeRate: 78 },
  ],
  8: [
    { attempt: 1, correct: false, cumulativeRate: 0 },
    { attempt: 2, correct: true, cumulativeRate: 50 },
    { attempt: 3, correct: true, cumulativeRate: 67 },
    { attempt: 4, correct: true, cumulativeRate: 75 },
    { attempt: 5, correct: false, cumulativeRate: 60 },
    { attempt: 6, correct: true, cumulativeRate: 67 },
    { attempt: 7, correct: true, cumulativeRate: 71 },
    { attempt: 8, correct: false, cumulativeRate: 63 },
  ],
  9: [
    { attempt: 1, correct: true, cumulativeRate: 100 },
    { attempt: 2, correct: false, cumulativeRate: 50 },
    { attempt: 3, correct: false, cumulativeRate: 33 },
    { attempt: 4, correct: true, cumulativeRate: 50 },
    { attempt: 5, correct: true, cumulativeRate: 60 },
    { attempt: 6, correct: true, cumulativeRate: 67 },
    { attempt: 7, correct: false, cumulativeRate: 57 },
    { attempt: 8, correct: true, cumulativeRate: 63 },
    { attempt: 9, correct: true, cumulativeRate: 67 },
    { attempt: 10, correct: false, cumulativeRate: 60 },
    { attempt: 11, correct: true, cumulativeRate: 64 },
    { attempt: 12, correct: true, cumulativeRate: 67 },
  ],
  10: [
    { attempt: 1, correct: false, cumulativeRate: 0 },
    { attempt: 2, correct: false, cumulativeRate: 0 },
    { attempt: 3, correct: true, cumulativeRate: 33 },
    { attempt: 4, correct: false, cumulativeRate: 25 },
    { attempt: 5, correct: true, cumulativeRate: 40 },
    { attempt: 6, correct: true, cumulativeRate: 50 },
    { attempt: 7, correct: false, cumulativeRate: 43 },
    { attempt: 8, correct: true, cumulativeRate: 50 },
  ],
}

// Generate incorrect options for a given word
const generateOptions = (correctWord: SpanishWord): string[] => {
  const otherWords = spanishVocabulary.filter((word) => word.id !== correctWord.id)
  const shuffled = [...otherWords].sort(() => 0.5 - Math.random())
  const incorrectOptions = shuffled.slice(0, 4).map((word) => word.english)

  // Add the correct answer and shuffle again
  const allOptions = [...incorrectOptions, correctWord.english]
  return allOptions.sort(() => 0.5 - Math.random())
}

// Get current success rate for a word
const getCurrentSuccessRate = (wordId: number): number => {
  const history = wordPerformanceHistory[wordId] || []
  if (history.length === 0) return 0
  return history[history.length - 1].cumulativeRate
}

// Get predicted success rate based on recent performance and difficulty
const getPredictedSuccessRate = (wordId: number, difficulty: string): number => {
  const currentRate = getCurrentSuccessRate(wordId)
  const history = wordPerformanceHistory[wordId] || []

  if (history.length === 0) {
    // Base prediction on difficulty for new words
    switch (difficulty) {
      case "Beginner":
        return 75
      case "Intermediate":
        return 50
      case "Advanced":
        return 30
      default:
        return 50
    }
  }

  // Weight recent performance more heavily
  const recentAttempts = history.slice(-3)
  const recentCorrect = recentAttempts.filter((a) => a.correct).length
  const recentRate = (recentCorrect / recentAttempts.length) * 100

  // Blend current rate with recent performance
  return Math.round(currentRate * 0.7 + recentRate * 0.3)
}

// Generate dynamic background chart data based on current word performance
const generateBackgroundChartData = (wordId: number, currentIndex: number) => {
  const history = wordPerformanceHistory[wordId] || []
  const baseData = []

  // Create a smooth trending line based on actual performance data
  if (history.length > 0) {
    // Use actual performance data as foundation
    const performancePoints = history.map((h, index) => ({
      x: (index / Math.max(history.length - 1, 1)) * 100,
      y: h.cumulativeRate,
      volume: Math.random() * 0.3 + 0.1, // Simulated volume for visual effect
    }))

    // Interpolate additional points for smoother curve
    for (let i = 0; i <= 100; i += 5) {
      const nearestPoint = performancePoints.reduce((prev, curr) =>
        Math.abs(curr.x - i) < Math.abs(prev.x - i) ? curr : prev,
      )

      // Add some realistic market-like volatility
      const volatility = Math.sin(i * 0.1 + currentIndex) * 3 + Math.random() * 2 - 1
      const trendAdjustment = (i / 100) * 10 // Slight upward trend

      baseData.push({
        x: i,
        y: Math.max(0, Math.min(100, nearestPoint.y + volatility + trendAdjustment)),
        volume: Math.random() * 0.4 + 0.1,
      })
    }
  } else {
    // Generate realistic trending data for words without history
    const startValue = Math.random() * 30 + 20
    const endValue = Math.random() * 40 + 50

    for (let i = 0; i <= 100; i += 5) {
      const progress = i / 100
      const baseValue = startValue + (endValue - startValue) * progress
      const marketNoise = Math.sin(i * 0.15 + currentIndex * 0.5) * 8 + Math.random() * 6 - 3
      const momentum = Math.sin(i * 0.05) * 5

      baseData.push({
        x: i,
        y: Math.max(0, Math.min(100, baseValue + marketNoise + momentum)),
        volume: Math.random() * 0.5 + 0.1,
      })
    }
  }

  return baseData
}

export default function PracticePage() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [options, setOptions] = useState<string[]>([])
  const [showHint, setShowHint] = useState(false)
  const [answeredQuestions, setAnsweredQuestions] = useState(0)
  const [backgroundChartData, setBackgroundChartData] = useState<any[]>([])

  const currentWord = spanishVocabulary[currentWordIndex]

  // Generate options when the current word changes
  useEffect(() => {
    setOptions(generateOptions(currentWord))
    setSelectedOption(null)
    setIsCorrect(null)
    setShowHint(false)

    // Update background chart data dynamically
    setBackgroundChartData(generateBackgroundChartData(currentWord.id, currentWordIndex))
  }, [currentWordIndex, currentWord.id, currentWord])

  const handleOptionSelect = (option: string) => {
    if (selectedOption !== null) return // Prevent changing answer after selection

    setSelectedOption(option)
    const correct = option === currentWord.english
    setIsCorrect(correct)

    if (correct) {
      setScore(score + 1)
    }

    setAnsweredQuestions(answeredQuestions + 1)
  }

  const handleNextWord = () => {
    if (currentWordIndex < spanishVocabulary.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1)
    } else {
      // Quiz completed - in a real app, you'd save progress to the database here
      alert("¡Felicidades! You've completed the practice session.")
      // Reset for another round
      setCurrentWordIndex(0)
      setScore(0)
      setAnsweredQuestions(0)
    }
  }

  const accuracy = answeredQuestions > 0 ? Math.round((score / answeredQuestions) * 100) : 0

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-orange-500" />
            <span className="text-xl font-display font-bold">VocabMarket</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-orange-500 relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/practice" className="text-sm font-medium text-orange-500 relative group">
              Practice
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-orange-500"></span>
            </Link>
            <Link
              href="/spanish-english"
              className="text-sm font-medium transition-colors hover:text-orange-500 relative group"
            >
              Spanish-English
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-medium transition-colors hover:text-orange-500 relative group"
            >
              Dashboard
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
            </Link>
            <Link
              href="/leaderboard"
              className="text-sm font-medium transition-colors hover:text-orange-500 relative group"
            >
              Leaderboard
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <span className="sr-only">User menu</span>
                  <div className="rounded-full bg-orange-100 h-8 w-8 flex items-center justify-center">
                    <span className="text-sm font-medium text-orange-800">JD</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 overflow-hidden rounded-xl p-1 shadow-elevated">
                <div className="flex items-center gap-2 p-2 border-b mb-1">
                  <div className="rounded-full bg-orange-100 h-10 w-10 flex items-center justify-center">
                    <span className="text-sm font-medium text-orange-800">JD</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-muted-foreground">john.doe@example.com</p>
                  </div>
                </div>
                <DropdownMenuItem asChild className="cursor-pointer rounded-lg h-10 my-1">
                  <Link href="/user" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer rounded-lg h-10 my-1">
                  <Link href="/user" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center cursor-pointer rounded-lg h-10 my-1 text-red-500 hover:text-red-600 hover:bg-red-50">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-6 hero-gradient dot-pattern">
        {/* Kalshi-Inspired Performance Analytics with Dynamic Stock Chart */}
        <div className="mb-4">
          <Card className="relative border border-orange-200 bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 shadow-lg overflow-hidden">
            {/* Dynamic Stock-Style Background Chart */}
            <div className="absolute inset-0 opacity-25">
              <ChartContainer
                config={{
                  backgroundTrend: {
                    label: "Performance Trend",
                    color: "#ea580c",
                  },
                  volume: {
                    label: "Volume",
                    color: "#ea580c",
                  },
                }}
                className="h-full w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={backgroundChartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="stockGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ea580c" stopOpacity={0.4} />
                        <stop offset="50%" stopColor="#fb923c" stopOpacity={0.2} />
                        <stop offset="100%" stopColor="#fed7aa" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ea580c" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#ea580c" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>

                    {/* Volume bars at bottom */}
                    <Area
                      type="monotone"
                      dataKey="volume"
                      stroke="none"
                      fill="url(#volumeGradient)"
                      fillOpacity={1}
                      stackId="volume"
                    />

                    {/* Main trend line with area fill */}
                    <Area
                      type="monotone"
                      dataKey="y"
                      stroke="#ea580c"
                      strokeWidth={3}
                      fill="url(#stockGradient)"
                      fillOpacity={1}
                      dot={false}
                    />

                    {/* Secondary trend line for depth */}
                    <Line
                      type="monotone"
                      dataKey="y"
                      stroke="#ea580c"
                      strokeWidth={2}
                      dot={false}
                      strokeOpacity={0.8}
                      strokeDasharray="3,3"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            {/* Market-style grid overlay */}
            <div className="absolute inset-0 opacity-5">
              <svg className="w-full h-full">
                <defs>
                  <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 20" fill="none" stroke="#f97316" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Gradient Overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-50/95 via-orange-50/80 to-amber-50/95"></div>

            <CardContent className="relative z-10 p-4">
              <div className="grid grid-cols-12 gap-4 items-center">
                {/* Left Section - Primary Metrics */}
                <div className="col-span-3">
                  <div className="space-y-3">
                    <div>
                      <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                        {getCurrentSuccessRate(currentWord.id)}%
                      </div>
                      <div className="text-xs text-orange-700/70 font-medium">Success Rate</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-emerald-600">
                        {getPredictedSuccessRate(currentWord.id, currentWord.difficulty)}%
                      </div>
                      <div className="text-xs text-orange-700/70 font-medium">Predicted</div>
                    </div>
                  </div>
                </div>

                {/* Middle Section - Word Context */}
                <div className="col-span-3">
                  <div className="space-y-2">
                    <div className="font-bold text-orange-800 truncate text-lg">"{currentWord.spanish}"</div>
                    <div className="text-xs text-orange-700/80 font-medium">
                      {wordPerformanceHistory[currentWord.id]?.length || 0} attempts
                    </div>
                    <div
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${
                        currentWord.difficulty === "Beginner"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : currentWord.difficulty === "Intermediate"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-red-50 text-red-700 border-red-200"
                      }`}
                    >
                      {currentWord.difficulty}
                    </div>
                  </div>
                </div>

                {/* Right Section - Interactive Chart */}
                <div className="col-span-6">
                  {wordPerformanceHistory[currentWord.id] && wordPerformanceHistory[currentWord.id].length > 0 ? (
                    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-3 border border-orange-200/50 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-orange-600" />
                          <span className="text-sm font-semibold text-orange-800">Progress Trend</span>
                        </div>
                        <div
                          className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium border ${
                            wordPerformanceHistory[currentWord.id] && wordPerformanceHistory[currentWord.id].length >= 2
                              ? wordPerformanceHistory[currentWord.id][
                                  wordPerformanceHistory[currentWord.id].length - 1
                                ].cumulativeRate >=
                                wordPerformanceHistory[currentWord.id][
                                  wordPerformanceHistory[currentWord.id].length - 2
                                ].cumulativeRate
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : "bg-red-50 text-red-700 border-red-200"
                              : "bg-orange-50 text-orange-700 border-orange-200"
                          }`}
                        >
                          {wordPerformanceHistory[currentWord.id] && wordPerformanceHistory[currentWord.id].length >= 2
                            ? wordPerformanceHistory[currentWord.id][wordPerformanceHistory[currentWord.id].length - 1]
                                .cumulativeRate >=
                              wordPerformanceHistory[currentWord.id][wordPerformanceHistory[currentWord.id].length - 2]
                                .cumulativeRate
                              ? "↗ Improving"
                              : "↘ Declining"
                            : "— Tracking"}
                        </div>
                      </div>
                      <ChartContainer
                        config={{
                          cumulativeRate: {
                            label: "Success Rate",
                            color: "#f97316",
                          },
                        }}
                        className="h-[120px]" // Updated height
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={wordPerformanceHistory[currentWord.id]}
                            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                          >
                            <XAxis dataKey="attempt" hide />
                            <YAxis domain={[0, 100]} hide />
                            <CartesianGrid strokeDasharray="3 3" stroke="#f97316" strokeOpacity={0.5} />{" "}
                            {/* Updated opacity */}
                            <ChartTooltip
                              content={<ChartTooltipContent />}
                              formatter={(value, name) => [`${value}%`, "Success Rate"]}
                              labelFormatter={(label) => `Attempt ${label}`}
                            />
                            <Line
                              type="monotone"
                              dataKey="cumulativeRate"
                              stroke="#f97316"
                              strokeWidth={2.5}
                              dot={false}
                              activeDot={{
                                r: 4,
                                stroke: "#f97316",
                                strokeWidth: 2,
                                fill: "white",
                                style: {
                                  filter: "drop-shadow(0 2px 4px rgba(249,115,22,0.3))",
                                  cursor: "pointer",
                                },
                              }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                      <div className="flex justify-between text-xs text-orange-700/70 font-medium mt-1">
                        <span>Start</span>
                        <span className="font-semibold">Latest: {getCurrentSuccessRate(currentWord.id)}%</span>
                      </div>
                    </div>
                  ) : (
                    <div className="h-[100px] flex items-center justify-center bg-white/50 backdrop-blur-sm rounded-xl border border-orange-200/50">
                      <div className="text-center text-orange-600/60">
                        <TrendingUp className="w-8 h-8 mx-auto mb-2 opacity-60" />
                        <p className="text-sm font-medium">Building your trend...</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>

            {/* Kalshi-style decorative elements */}
            <div className="absolute top-3 right-3 flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
              <div className="w-1 h-1 bg-orange-400 rounded-full opacity-60"></div>
            </div>
            <div className="absolute bottom-3 left-3 flex items-center gap-1">
              <div className="w-1 h-1 bg-amber-400 rounded-full opacity-40"></div>
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full opacity-50"></div>
            </div>

            {/* Market ticker style element */}
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2">
              <div className="text-xs text-orange-600/40 font-mono">
                VOCAB:{currentWord.id.toString().padStart(3, "0")}
              </div>
            </div>
          </Card>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card className="border-2 shadow-card overflow-hidden animate-in">
              <CardHeader className="bg-slate-50 border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Spanish to English</CardTitle>
                    <CardDescription>
                      Question {currentWordIndex + 1} of {spanishVocabulary.length}
                    </CardDescription>
                  </div>
                  <div className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                    {currentWord.difficulty}
                  </div>
                </div>
                <Progress value={((currentWordIndex + 1) / spanishVocabulary.length) * 100} className="h-2 mt-2" />
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                      <h2 className="text-4xl font-bold text-orange-600 animate-pulse-slow">{currentWord.spanish}</h2>
                      <p className="text-lg italic text-muted-foreground">"{currentWord.exampleSentence}"</p>
                    </div>

                    {showHint && (
                      <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-center text-amber-800 text-sm animate-fade-in">
                        <p>Think about the context of the example sentence.</p>
                      </div>
                    )}

                    <div className="mt-8">
                      <h3 className="text-lg font-medium mb-4 text-center">Select the correct English translation:</h3>
                      <div className="grid gap-3">
                        {options.map((option, index) => (
                          <Button
                            key={option}
                            variant={
                              selectedOption === null
                                ? "outline"
                                : selectedOption === option && isCorrect
                                  ? "default"
                                  : selectedOption === option && !isCorrect
                                    ? "destructive"
                                    : option === currentWord.english && isCorrect === false
                                      ? "default"
                                      : "outline"
                            }
                            className={`w-full justify-start h-auto py-4 px-4 text-left rounded-xl transition-all duration-300 ${
                              selectedOption === option && isCorrect
                                ? "bg-orange-500 hover:bg-orange-500 text-white"
                                : option === currentWord.english && isCorrect === false
                                  ? "bg-orange-500 hover:bg-orange-500 text-white opacity-70"
                                  : "hover:border-orange-300 hover:bg-orange-50"
                            }`}
                            onClick={() => handleOptionSelect(option)}
                          >
                            <div className="flex items-center">
                              <div className="h-6 w-6 rounded-full border-2 mr-3 flex items-center justify-center">
                                {selectedOption === option && isCorrect && <Check className="h-4 w-4" />}
                                {selectedOption === option && !isCorrect && <X className="h-4 w-4" />}
                                {option === currentWord.english && isCorrect === false && <Check className="h-4 w-4" />}
                                {!selectedOption && String.fromCharCode(65 + index)}
                              </div>
                              <span>{option}</span>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between p-4 bg-slate-50 border-t">
                <Button
                  variant="outline"
                  onClick={() => setShowHint(true)}
                  disabled={showHint || selectedOption !== null}
                  className="rounded-lg border-orange-200 hover:border-orange-500 hover:bg-orange-50"
                >
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Hint
                </Button>
                <Button
                  className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-sm hover:shadow transition-all duration-300" // Explicit orange styling
                  onClick={handleNextWord}
                  disabled={selectedOption === null}
                >
                  {currentWordIndex < spanishVocabulary.length - 1 ? (
                    <>
                      Next Word
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    "Finish Practice"
                  )}
                </Button>
              </CardFooter>
            </Card>

            {isCorrect !== null && (
              <div
                className={`mt-4 p-4 rounded-xl shadow-subtle animate-fade-in ${
                  isCorrect
                    ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                    : "bg-red-50 border border-red-200 text-red-800"
                }`}
              >
                <div className="flex items-start">
                  {isCorrect ? <Check className="h-5 w-5 mr-2 mt-0.5" /> : <X className="h-5 w-5 mr-2 mt-0.5" />}
                  <div className="flex-1">
                    <p className="font-medium">{isCorrect ? "¡Correcto!" : "Not quite right"}</p>
                    <p className="text-sm mt-1">
                      {isCorrect
                        ? `Great job! "${currentWord.spanish}" means "${currentWord.english}" in English.`
                        : `"${currentWord.spanish}" means "${currentWord.english}" in English.`}
                    </p>
                    <div className="mt-3">
                      <Link href={`/words/${currentWord.spanish.toLowerCase()}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs rounded-full px-3 border-orange-200 hover:border-orange-500 hover:bg-orange-50"
                        >
                          View word details
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Back to Dashboard Button */}
            <div className="mt-6 flex justify-center">
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  className="rounded-lg border-orange-200 hover:border-orange-500 hover:bg-orange-50"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-6 animate-in" style={{ animationDelay: "0.2s" }}>
            <Card className="border-2 shadow-card overflow-hidden">
              <CardHeader className="bg-slate-50 border-b">
                <CardTitle>Session Stats</CardTitle>
                <CardDescription>Your current learning session</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Progress</span>
                    <span className="font-medium">
                      {currentWordIndex + 1}/{spanishVocabulary.length}
                    </span>
                  </div>
                  <Progress value={((currentWordIndex + 1) / spanishVocabulary.length) * 100} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Accuracy</span>
                    <span className="font-medium">{accuracy}%</span>
                  </div>
                  <Progress value={accuracy} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Words Mastered</span>
                    <span className="font-medium">
                      {score}/{answeredQuestions}
                    </span>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">Difficulty Breakdown</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span>Beginner</span>
                        <span className="bg-slate-100 px-2 py-1 rounded-full">
                          {spanishVocabulary.filter((w) => w.difficulty === "Beginner").length} words
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span>Intermediate</span>
                        <span className="bg-slate-100 px-2 py-1 rounded-full">
                          {spanishVocabulary.filter((w) => w.difficulty === "Intermediate").length} words
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span>Advanced</span>
                        <span className="bg-slate-100 px-2 py-1 rounded-full">
                          {spanishVocabulary.filter((w) => w.difficulty === "Advanced").length} words
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 bg-slate-50 border-t">
                <Button
                  variant="outline"
                  className="w-full rounded-lg border-orange-200 hover:border-orange-500 hover:bg-orange-50"
                >
                  End Session
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-2 shadow-card overflow-hidden">
              <CardHeader className="bg-slate-50 border-b">
                <CardTitle>Word Sets</CardTitle>
                <CardDescription>Choose a different set to practice</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  {wordSets.map((set, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-between h-auto py-3 rounded-lg border-orange-200 hover:border-orange-500 hover:bg-orange-50 transition-all duration-300"
                    >
                      <span>{set.name}</span>
                      <span className="text-xs bg-slate-100 px-2 py-1 rounded-full">{set.count} words</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <footer className="border-t py-6 md:py-0 bg-white">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-orange-500" />
            <p className="text-sm text-muted-foreground">© 2025 VocabMarket. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

const wordSets = [
  { name: "Spanish Basics", count: 20 },
  { name: "Travel Vocabulary", count: 30 },
  { name: "Business Spanish", count: 25 },
  { name: "Everyday Conversation", count: 40 },
  { name: "Advanced Spanish", count: 15 },
]

</merged_code>
