"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, BookOpen, Check, HelpCircle, X, User, Settings, LogOut } from "lucide-react"

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

// Generate incorrect options for a given word
const generateOptions = (correctWord: SpanishWord): string[] => {
  const otherWords = spanishVocabulary.filter((word) => word.id !== correctWord.id)
  const shuffled = [...otherWords].sort(() => 0.5 - Math.random())
  const incorrectOptions = shuffled.slice(0, 4).map((word) => word.english)

  // Add the correct answer and shuffle again
  const allOptions = [...incorrectOptions, correctWord.english]
  return allOptions.sort(() => 0.5 - Math.random())
}

export default function PracticePage() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [options, setOptions] = useState<string[]>([])
  const [showHint, setShowHint] = useState(false)
  const [answeredQuestions, setAnsweredQuestions] = useState(0)

  const currentWord = spanishVocabulary[currentWordIndex]

  // Generate options when the current word changes
  useEffect(() => {
    setOptions(generateOptions(currentWord))
    setSelectedOption(null)
    setIsCorrect(null)
    setShowHint(false)
  }, [currentWordIndex])

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
      <main className="flex-1 container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Spanish Vocabulary Practice</h1>
            <p className="text-muted-foreground mt-1">Expand your Spanish vocabulary through interactive quizzes</p>
          </div>
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
                  className="bg-orange-500 hover:bg-orange-600 rounded-lg shadow-sm hover:shadow transition-all duration-300"
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
