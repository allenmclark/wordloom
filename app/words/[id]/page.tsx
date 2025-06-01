"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  BookOpen,
  ExternalLink,
  Share2,
  Bookmark,
  Volume2,
  TrendingUp,
  TrendingDown,
  Clock,
  Users,
  User,
  Settings,
  LogOut,
} from "lucide-react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Types
type WordData = {
  id: string
  word: string
  phonetic: string
  partOfSpeech: string
  definition: string
  example: string
  synonyms: string[]
  antonyms: string[]
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  tags: string[]
  notes?: string
}

type MarketData = {
  timestamp: string
  successRate: number
  volume: number
}

export default function WordPage({ params }: { params: { id: string } }) {
  const [wordData, setWordData] = useState<WordData | null>(null)
  const [marketData, setMarketData] = useState<MarketData[]>([])
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [timeRange, setTimeRange] = useState("1w")

  // Fetch word data
  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll use mock data
    setWordData(getWordById(params.id))
    setMarketData(generateMarketData(params.id))
  }, [params.id])

  if (!wordData) {
    return <div className="container py-8">Loading...</div>
  }

  // Calculate current success rate (last value in the market data)
  const currentSuccessRate = marketData.length > 0 ? marketData[marketData.length - 1].successRate : 0

  // Calculate change over the selected period
  const periodChange = marketData.length > 0 ? currentSuccessRate - marketData[0].successRate : 0

  // Determine if the trend is up or down
  const trendDirection = periodChange >= 0 ? "up" : "down"

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
            <Link
              href="/practice"
              className="text-sm font-medium transition-colors hover:text-orange-500 relative group"
            >
              Practice
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
            <Link href="/blog" className="text-sm font-medium transition-colors hover:text-orange-500 relative group">
              Blog
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
      <main className="flex-1 container py-8 hero-gradient dot-pattern">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="rounded-lg">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                {wordData.word}
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full h-8 w-8 p-0"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                >
                  <Bookmark
                    className={`h-5 w-5 ${isBookmarked ? "fill-orange-500 text-orange-500" : "text-slate-400"}`}
                  />
                  <span className="sr-only">{isBookmarked ? "Remove bookmark" : "Bookmark"}</span>
                </Button>
                <Button variant="ghost" size="sm" className="rounded-full h-8 w-8 p-0">
                  <Volume2 className="h-5 w-5 text-slate-400" />
                  <span className="sr-only">Pronounce</span>
                </Button>
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-slate-500 text-lg">{wordData.phonetic}</span>
                <Badge variant="outline" className="text-xs font-normal">
                  {wordData.partOfSpeech}
                </Badge>
                <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200 text-xs font-normal">
                  {wordData.difficulty}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-lg">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Link href={`/practice?word=${params.id}`}>
              <Button
                size="sm"
                className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-sm"
                variant="default"
              >
                Practice Now
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-8">
            {/* Market Chart */}
            <Card className="border-2 shadow-card overflow-hidden">
              <CardHeader className="bg-slate-50 border-b p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl font-display">Success Rate Market</CardTitle>
                    <CardDescription className="text-slate-500 mt-1">
                      Percentage of correct answers over time
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex items-center gap-1 ${trendDirection === "up" ? "text-emerald-600" : "text-red-600"}`}
                    >
                      {trendDirection === "up" ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                      <span className="font-medium">{Math.abs(periodChange).toFixed(1)}%</span>
                    </div>
                    <div className="text-sm text-slate-500">
                      {timeRange === "1d"
                        ? "Today"
                        : timeRange === "1w"
                          ? "This week"
                          : timeRange === "1m"
                            ? "This month"
                            : "All time"}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <div className="text-3xl font-bold">{currentSuccessRate.toFixed(1)}%</div>
                    <div className="flex items-center gap-1 text-sm text-slate-500">
                      <Users className="h-4 w-4" />
                      <span>1,245 attempts</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Button
                      variant={timeRange === "1d" ? "default" : "outline"}
                      size="sm"
                      className="rounded-l-lg rounded-r-none h-8"
                      onClick={() => setTimeRange("1d")}
                    >
                      1D
                    </Button>
                    <Button
                      variant={timeRange === "1w" ? "default" : "outline"}
                      size="sm"
                      className="rounded-none border-l-0 border-r-0 h-8"
                      onClick={() => setTimeRange("1w")}
                    >
                      1W
                    </Button>
                    <Button
                      variant={timeRange === "1m" ? "default" : "outline"}
                      size="sm"
                      className="rounded-none border-r-0 h-8"
                      onClick={() => setTimeRange("1m")}
                    >
                      1M
                    </Button>
                    <Button
                      variant={timeRange === "all" ? "default" : "outline"}
                      size="sm"
                      className="rounded-l-none rounded-r-lg h-8"
                      onClick={() => setTimeRange("all")}
                    >
                      ALL
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={marketData} margin={{ top: 20, right: 10, left: 10, bottom: 20 }}>
                      <defs>
                        <linearGradient id="successGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#d03801" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#d03801" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                      <XAxis
                        dataKey="timestamp"
                        tickFormatter={(value) => {
                          const date = new Date(value)
                          if (timeRange === "1d") {
                            return `${date.getHours()}:00`
                          } else {
                            return `${date.getMonth() + 1}/${date.getDate()}`
                          }
                        }}
                        tick={{ fontSize: 12, fill: "#64748b" }}
                        axisLine={{ stroke: "#e5e7eb" }}
                        tickLine={{ stroke: "#e5e7eb" }}
                      />
                      <YAxis
                        domain={[0, 100]}
                        tickFormatter={(value) => `${value}%`}
                        tick={{ fontSize: 12, fill: "#64748b" }}
                        axisLine={{ stroke: "#e5e7eb" }}
                        tickLine={{ stroke: "#e5e7eb" }}
                      />
                      <Tooltip
                        formatter={(value) => [`${Number(value).toFixed(1)}%`, "Success Rate"]}
                        labelFormatter={(value) => {
                          const date = new Date(value)
                          return `${date.toLocaleDateString()} ${date.getHours()}:00`
                        }}
                        contentStyle={{
                          fontSize: "12px",
                          borderRadius: "8px",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                          border: "none",
                          padding: "10px 14px",
                          backgroundColor: "#ffffff",
                        }}
                      />
                      <ReferenceLine y={50} stroke="#94a3b8" strokeDasharray="3 3" />
                      <Line
                        type="monotone"
                        dataKey="successRate"
                        stroke="#d03801"
                        strokeWidth={2.5}
                        dot={false}
                        activeDot={{ r: 6, strokeWidth: 0 }}
                        animationDuration={1500}
                        fill="url(#successGradient)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <Card className="border p-4">
                    <div className="text-sm text-slate-500">Your Success Rate</div>
                    <div className="text-xl font-bold mt-1">78.5%</div>
                    <div className="text-xs text-emerald-600 flex items-center gap-1 mt-1">
                      <TrendingUp className="h-3 w-3" />
                      <span>+5.2% from last attempt</span>
                    </div>
                  </Card>
                  <Card className="border p-4">
                    <div className="text-sm text-slate-500">Community Average</div>
                    <div className="text-xl font-bold mt-1">{currentSuccessRate.toFixed(1)}%</div>
                    <div className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                      <Users className="h-3 w-3" />
                      <span>Based on 1,245 attempts</span>
                    </div>
                  </Card>
                  <Card className="border p-4">
                    <div className="text-sm text-slate-500">Mastery Prediction</div>
                    <div className="text-xl font-bold mt-1">3 days</div>
                    <div className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3" />
                      <span>At current learning rate</span>
                    </div>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Word Details */}
            <Card className="border-2 shadow-card overflow-hidden">
              <CardHeader className="bg-slate-50 border-b">
                <CardTitle>Word Details</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Tabs defaultValue="definition">
                  <TabsList className="mb-4">
                    <TabsTrigger value="definition">Definition</TabsTrigger>
                    <TabsTrigger value="examples">Examples</TabsTrigger>
                    <TabsTrigger value="synonyms">Synonyms & Antonyms</TabsTrigger>
                    <TabsTrigger value="notes">Notes</TabsTrigger>
                  </TabsList>
                  <TabsContent value="definition" className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Definition</h3>
                      <p className="text-slate-700">{wordData.definition}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Etymology</h3>
                      <p className="text-slate-700">
                        From Latin <span className="italic">ephemerus</span>, from Ancient Greek
                        <span className="italic"> ἐφήμερος</span> (ephḗmeros, "lasting only a day, short-lived"), from{" "}
                        <span className="italic">ἐπί</span> (epí, "on") + <span className="italic">ἡμέρα</span> (hēméra,
                        "day").
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="examples" className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Example Sentences</h3>
                      <ul className="space-y-3">
                        <li className="p-3 bg-slate-50 rounded-lg">{wordData.example}</li>
                        <li className="p-3 bg-slate-50 rounded-lg">
                          The beauty of cherry blossoms is ephemeral, lasting only a few days each spring.
                        </li>
                        <li className="p-3 bg-slate-50 rounded-lg">
                          Social media trends are often ephemeral, quickly replaced by the next viral sensation.
                        </li>
                      </ul>
                    </div>
                  </TabsContent>
                  <TabsContent value="synonyms" className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Synonyms</h3>
                        <div className="flex flex-wrap gap-2">
                          {wordData.synonyms.map((synonym, index) => (
                            <Badge key={index} variant="outline" className="px-3 py-1 text-sm">
                              {synonym}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Antonyms</h3>
                        <div className="flex flex-wrap gap-2">
                          {wordData.antonyms.map((antonym, index) => (
                            <Badge key={index} variant="outline" className="px-3 py-1 text-sm">
                              {antonym}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="notes" className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Your Notes</h3>
                      {wordData.notes ? (
                        <p className="text-slate-700">{wordData.notes}</p>
                      ) : (
                        <div className="p-4 bg-slate-50 rounded-lg text-center">
                          <p className="text-slate-500">You haven't added any notes for this word yet.</p>
                          <Button variant="outline" size="sm" className="mt-2">
                            Add Notes
                          </Button>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Your Progress */}
            <Card className="border-2 shadow-card overflow-hidden">
              <CardHeader className="bg-slate-50 border-b">
                <CardTitle>Your Progress</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Mastery Level</span>
                      <span className="text-sm text-slate-500">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Practice History</h3>
                    <div className="space-y-3">
                      {[
                        { date: "Today, 10:45 AM", result: "Correct", score: "10 points" },
                        { date: "Yesterday, 3:20 PM", result: "Incorrect", score: "0 points" },
                        { date: "May 15, 9:30 AM", result: "Correct", score: "10 points" },
                      ].map((session, index) => (
                        <div key={index} className="flex items-center justify-between text-sm p-2 border-b">
                          <span className="text-slate-500">{session.date}</span>
                          <span className={session.result === "Correct" ? "text-emerald-600" : "text-red-600"}>
                            {session.result}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-md shadow-sm"
                    variant="default"
                  >
                    Practice Again
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Related Words */}
            <Card className="border-2 shadow-card overflow-hidden">
              <CardHeader className="bg-slate-50 border-b">
                <CardTitle>Related Words</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[
                    { word: "Transient", definition: "Lasting only for a short time", difficulty: "Intermediate" },
                    { word: "Fleeting", definition: "Passing quickly; brief", difficulty: "Beginner" },
                    { word: "Evanescent", definition: "Quickly fading or disappearing", difficulty: "Advanced" },
                  ].map((word, index) => (
                    <Link href={`/words/${word.word.toLowerCase()}`} key={index}>
                      <div className="p-3 border rounded-lg hover:border-orange-200 hover:bg-orange-50 transition-colors cursor-pointer">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{word.word}</h3>
                            <p className="text-sm text-slate-500 mt-1">{word.definition}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {word.difficulty}
                          </Badge>
                        </div>
                      </div>
                    </Link>
                  ))}
                  <Button variant="outline" className="w-full">
                    View More
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* External Resources */}
            <Card className="border-2 shadow-card overflow-hidden">
              <CardHeader className="bg-slate-50 border-b">
                <CardTitle>External Resources</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {[
                    { name: "Merriam-Webster", url: "https://www.merriam-webster.com/dictionary/ephemeral" },
                    {
                      name: "Oxford Dictionary",
                      url: "https://www.oxfordlearnersdictionaries.com/definition/english/ephemeral",
                    },
                    { name: "Vocabulary.com", url: "https://www.vocabulary.com/dictionary/ephemeral" },
                  ].map((resource, index) => (
                    <a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 border rounded-lg hover:border-orange-200 hover:bg-orange-50 transition-colors"
                    >
                      <span>{resource.name}</span>
                      <ExternalLink className="h-4 w-4 text-slate-400" />
                    </a>
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

// Mock data functions
function getWordById(id: string): WordData {
  // In a real app, this would fetch from an API
  return {
    id,
    word: "Ephemeral",
    phonetic: "/ɪˈfɛm(ə)rəl/",
    partOfSpeech: "adjective",
    definition: "Lasting for a very short time; transitory; short-lived.",
    example: "The ephemeral nature of fashion trends makes it difficult to stay current.",
    synonyms: ["fleeting", "transient", "momentary", "brief", "short-lived", "temporary"],
    antonyms: ["permanent", "enduring", "everlasting", "eternal", "perpetual"],
    difficulty: "Advanced",
    tags: ["time", "duration", "literature"],
    notes:
      "Remember this word by thinking of ephemera - items designed to be useful or important for only a short time.",
  }
}

function generateMarketData(wordId: string): MarketData[] {
  const data: MarketData[] = []
  const now = new Date()

  // Generate 30 days of data
  for (let i = 30; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    // For the current day, generate hourly data
    if (i === 0) {
      for (let hour = 0; hour <= now.getHours(); hour++) {
        const hourDate = new Date(now)
        hourDate.setHours(hour, 0, 0, 0)

        // Add some randomness but with a general upward trend
        const baseRate = 65 + (30 - i) * 0.5 // Base rate increases over time
        const randomFactor = Math.random() * 10 - 5 // Random fluctuation between -5 and +5
        const successRate = Math.min(Math.max(baseRate + randomFactor, 0), 100) // Keep between 0-100%

        data.push({
          timestamp: hourDate.toISOString(),
          successRate,
          volume: Math.floor(Math.random() * 50) + 10,
        })
      }
    } else {
      // For past days, just one data point per day
      const baseRate = 65 + (30 - i) * 0.5 // Base rate increases over time
      const randomFactor = Math.random() * 10 - 5 // Random fluctuation between -5 and +5
      const successRate = Math.min(Math.max(baseRate + randomFactor, 0), 100) // Keep between 0-100%

      data.push({
        timestamp: date.toISOString(),
        successRate,
        volume: Math.floor(Math.random() * 200) + 50,
      })
    }
  }

  return data
}
