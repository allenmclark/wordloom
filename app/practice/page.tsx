"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Check, X, TrendingUp, Target, BarChart3 } from "lucide-react"
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

// Types for our vocabulary items
type SpanishWord = {
  id: number
  spanish: string
  english: string
  exampleSentence: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
}

// Mock data - in a real app, this would come from your database
/*
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

*/

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

// Calculate overall historical accuracy across all words
const getOverallHistoricalAccuracy = (): number => {
  let totalAttempts = 0
  let totalCorrect = 0

  Object.values(wordPerformanceHistory).forEach((history) => {
    totalAttempts += history.length
    totalCorrect += history.filter((attempt) => attempt.correct).length
  })

  return totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0
}

export default function PracticePage() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [options, setOptions] = useState<string[]>([])
  const [answeredQuestions, setAnsweredQuestions] = useState(0)

  // --- vocabulary fetched from API -------------------------------
  const [spanishVocabulary, setVocabularyData] = useState<SpanishWord[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // fetch the words once on mount
  useEffect(() => {
    const controller = new AbortController()

    fetch("https://vocab-backend-dev-615369945513.us-east1.run.app/words/100", { signal: controller.signal })
      .then((res) => res.json())
      .then((data: SpanishWord[]) => setVocabularyData(data))
      .catch((err) => {
        if (err.name !== "AbortError") console.error("Failed to fetch vocabulary:", err)
      })
      .finally(() => setIsLoading(false))

    // cancel fetch if component unmounts
    return () => controller.abort()
  }, [])
  // ----------------------------------------------------------------

  const generateOptions = (correctWord: SpanishWord): string[] => {
    const otherWords = spanishVocabulary.filter((w) => w.id !== correctWord.id)
    const incorrect = [...otherWords].sort(() => 0.5 - Math.random()).slice(0, 4)
    return [...incorrect.map((w) => w.english), correctWord.english].sort(() => 0.5 - Math.random())
  }

  const currentWord = spanishVocabulary[currentWordIndex]

  // Generate options when the current word changes
  useEffect(() => {
    if (spanishVocabulary[currentWordIndex]) {
      setOptions(generateOptions(spanishVocabulary[currentWordIndex]))
      setSelectedOption(null)
      setIsCorrect(null)
    }
  }, [currentWordIndex, spanishVocabulary])

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
  const predictedChance = getPredictedSuccessRate(currentWord.id, currentWord.difficulty)
  const historicalAccuracy = getCurrentSuccessRate(currentWord.id)
  const overallAccuracy = getOverallHistoricalAccuracy()
  const performanceData = wordPerformanceHistory[currentWord.id] || []

  if (isLoading || spanishVocabulary.length === 0) {
    return <div className="flex h-screen items-center justify-center">Loading vocabulary…</div>
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 hero-gradient overflow-hidden relative">
        <div className="container py-6">
          {/* Refactored Performance Overview Card */}
          <div className="mb-6">
            <Card className="border-2 border-orange-200 bg-gradient-to-br from-white via-orange-50/30 to-amber-50/50 shadow-xl overflow-hidden no-fade">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-900">Performance Overview</CardTitle>
                    <CardDescription className="text-gray-600">
                      Current word: <span className="font-semibold text-orange-700">"{currentWord.spanish}"</span> •{" "}
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          currentWord.difficulty === "Beginner"
                            ? "bg-emerald-100 text-emerald-800"
                            : currentWord.difficulty === "Intermediate"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {currentWord.difficulty}
                      </span>
                    </CardDescription>
                  </div>
                  <div className="text-xs text-gray-500 font-mono">
                    VOCAB:{currentWord.id.toString().padStart(3, "0")}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Compact Metrics Section - Left Side */}
                  <div className="lg:col-span-4 space-y-4">
                    {/* Predicted Chance */}
                    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-orange-200/50 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          <Target className="w-5 h-5 text-orange-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-2">
                            <div className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                              {predictedChance}%
                            </div>
                            <div className="text-sm text-gray-600">predicted</div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">Estimated correctness</div>
                        </div>
                      </div>
                    </div>

                    {/* Historical Accuracy */}
                    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-orange-200/50 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          <BarChart3 className="w-5 h-5 text-orange-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-2">
                            <div className="text-2xl font-bold text-gray-900">{historicalAccuracy}%</div>
                            <div className="text-sm text-gray-600">historical</div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            This word ({performanceData.length} attempts)
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Overall Stats */}
                    <div className="bg-white/50 backdrop-blur-sm rounded-xl p-3 border border-orange-200/30">
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-1">Overall Accuracy</div>
                        <div className="text-lg font-semibold text-gray-800">{overallAccuracy}%</div>
                        <div className="text-xs text-gray-500">across all words</div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Chart Section - Right Side */}
                  <div className="lg:col-span-8">
                    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-orange-200/50 shadow-sm h-full">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-orange-600" />
                          <h3 className="font-semibold text-gray-900">Cumulative Performance Trend</h3>
                        </div>
                        {performanceData.length >= 2 && (
                          <div
                            className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                              performanceData[performanceData.length - 1].cumulativeRate >=
                              performanceData[performanceData.length - 2].cumulativeRate
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {performanceData[performanceData.length - 1].cumulativeRate >=
                            performanceData[performanceData.length - 2].cumulativeRate
                              ? "↗ Improving"
                              : "↘ Declining"}
                          </div>
                        )}
                      </div>

                      {performanceData.length > 0 ? (
                        <div className="space-y-4">
                          <div className="h-[200px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={performanceData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f97316" strokeOpacity={0.2} />
                                <XAxis
                                  dataKey="attempt"
                                  axisLine={false}
                                  tickLine={false}
                                  tick={{ fontSize: 12, fill: "#6b7280" }}
                                  label={{
                                    value: "Attempt",
                                    position: "insideBottom",
                                    offset: -10,
                                    style: { textAnchor: "middle", fontSize: "12px", fill: "#6b7280" },
                                  }}
                                />
                                <YAxis
                                  domain={[0, 100]}
                                  axisLine={false}
                                  tickLine={false}
                                  tick={{ fontSize: 12, fill: "#6b7280" }}
                                  tickFormatter={(value) => `${value}%`}
                                  label={{
                                    value: "Success Rate (%)",
                                    angle: -90,
                                    position: "insideLeft",
                                    style: { textAnchor: "middle", fontSize: "12px", fill: "#6b7280" },
                                  }}
                                />
                                <ChartTooltip
                                  content={<ChartTooltipContent />}
                                  formatter={(value, name) => [`${value}%`, "Success Rate"]}
                                  labelFormatter={(label) => `Attempt ${label}`}
                                />
                                <Line
                                  type="monotone"
                                  dataKey="cumulativeRate"
                                  stroke="#f97316"
                                  strokeWidth={3}
                                  dot={{
                                    fill: "#f97316",
                                    strokeWidth: 2,
                                    r: 5,
                                  }}
                                  activeDot={{
                                    r: 8,
                                    stroke: "#f97316",
                                    strokeWidth: 3,
                                    fill: "white",
                                    style: {
                                      filter: "drop-shadow(0 2px 6px rgba(249,115,22,0.4))",
                                    },
                                  }}
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>

                          <div className="flex justify-between items-center text-sm border-t pt-3">
                            <div className="text-gray-600">
                              <span className="font-medium">Start:</span> {performanceData[0]?.cumulativeRate}%
                            </div>
                            <div className="text-center text-gray-600">
                              <span className="font-medium">{performanceData.length}</span> total attempts
                            </div>
                            <div className="text-gray-600">
                              <span className="font-medium">Latest:</span>{" "}
                              <span className="font-bold text-orange-600">
                                {performanceData[performanceData.length - 1]?.cumulativeRate}%
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="h-[200px] flex items-center justify-center text-center">
                          <div className="text-gray-400">
                            <TrendingUp className="w-12 h-12 mx-auto mb-3 opacity-50" />
                            <p className="text-lg font-medium">No performance data yet</p>
                            <p className="text-sm">Start practicing to see your cumulative trend</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card className="border-2 shadow-card overflow-hidden animate-in vibrant-card">
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

                      <div className="mt-8">
                        <h3 className="text-lg font-medium mb-4 text-center">
                          Select the correct English translation:
                        </h3>
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
                                  {option === currentWord.english && isCorrect === false && (
                                    <Check className="h-4 w-4" />
                                  )}
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
                    className="vibrant-button-primary rounded-lg shadow-sm hover:shadow transition-all duration-300"
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
                            className="text-xs rounded-full px-3 vibrant-button-outline bg-transparent"
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
            </div>

            {/* Session Statistics - Right Column */}
            <div className="lg:col-span-1">
              <Card className="border-2 shadow-card overflow-hidden vibrant-card h-fit">
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
                  <Button variant="outline" className="w-full rounded-lg vibrant-button-outline bg-transparent">
                    End Session
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          {/* Word Sets - Horizontal Display Below */}
          <div className="mt-8">
            <Card className="border-2 shadow-card overflow-hidden vibrant-card">
              <CardHeader className="bg-slate-50 border-b">
                <CardTitle>Word Sets</CardTitle>
                <CardDescription>Choose a different set to practice</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {wordSets.map((set, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-auto py-4 px-4 rounded-lg vibrant-button-outline transition-all duration-300 flex flex-col items-center space-y-2 bg-transparent"
                    >
                      <span className="font-medium text-center">{set.name}</span>
                      <span className="text-xs bg-slate-100 px-2 py-1 rounded-full">{set.count} words</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Back to Dashboard Button */}
          <div className="mt-6 flex justify-center">
            <Link href="/dashboard">
              <Button variant="outline" className="rounded-lg vibrant-button-outline bg-transparent">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </main>
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
