"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  ShieldAlert,
  Filter,
  BarChartHorizontal,
  PieChartIcon,
} from "lucide-react"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts"

// --- MOCK DATA ---
const portfolioWords = [
  {
    id: 1,
    word: "Viajar",
    partOfSpeech: "Verb",
    group: "Travel Essentials",
    difficulty: "Beginner",
    masteryStatus: "Mastered",
    masteryValue: 5, // e.g., correct 5 times in a row
    predictedKnowledge: 95,
    trend: "stable",
    lastPracticed: "2 days ago",
  },
  {
    id: 2,
    word: "Reunión",
    partOfSpeech: "Noun",
    group: "Business Spanish",
    difficulty: "Advanced",
    masteryStatus: "Learning",
    masteryValue: 2,
    predictedKnowledge: 68,
    trend: "up",
    lastPracticed: "1 day ago",
  },
  {
    id: 3,
    word: "Delicioso",
    partOfSpeech: "Adjective",
    group: "Food & Cooking",
    difficulty: "Intermediate",
    masteryStatus: "Mastered",
    masteryValue: 7,
    predictedKnowledge: 98,
    trend: "stable",
    lastPracticed: "5 days ago",
  },
  {
    id: 4,
    word: "Aunque",
    partOfSpeech: "Conjunction",
    group: "Advanced Grammar",
    difficulty: "Advanced",
    masteryStatus: "At Risk",
    masteryValue: 1,
    predictedKnowledge: 45,
    trend: "down",
    lastPracticed: "2 weeks ago",
  },
  {
    id: 5,
    word: "Ordenador",
    partOfSpeech: "Noun",
    group: "Technology",
    difficulty: "Intermediate",
    masteryStatus: "Learning",
    masteryValue: 3,
    predictedKnowledge: 82,
    trend: "up",
    lastPracticed: "3 days ago",
  },
  {
    id: 6,
    word: "Siempre",
    partOfSpeech: "Adverb",
    group: "Everyday Conversation",
    difficulty: "Beginner",
    masteryStatus: "Mastered",
    masteryValue: 12,
    predictedKnowledge: 99,
    trend: "stable",
    lastPracticed: "1 day ago",
  },
  {
    id: 7,
    word: "Desarrollar",
    partOfSpeech: "Verb",
    group: "Business Spanish",
    difficulty: "Advanced",
    masteryStatus: "Learning",
    masteryValue: 1,
    predictedKnowledge: 55,
    trend: "up",
    lastPracticed: "4 hours ago",
  },
  {
    id: 8,
    word: "Éxito",
    partOfSpeech: "Noun",
    group: "Business Spanish",
    difficulty: "Intermediate",
    masteryStatus: "At Risk",
    masteryValue: 4,
    predictedKnowledge: 75,
    trend: "down",
    lastPracticed: "1 week ago",
  },
]

const wordGroups = [
  "All Groups",
  "Travel Essentials",
  "Business Spanish",
  "Food & Cooking",
  "Advanced Grammar",
  "Technology",
  "Everyday Conversation",
]
const partsOfSpeech = ["All", "Verb", "Noun", "Adjective", "Adverb", "Conjunction"]
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"]

// --- COMPONENT ---
export function PortfolioAnalysis() {
  const [activeTab, setActiveTab] = useState("atRisk")

  // Calculate portfolio summary
  const portfolioValue = portfolioWords.filter((w) => w.masteryStatus === "Mastered").length
  const totalWords = portfolioWords.length
  const predictedKnowledgeScore = Math.round(
    portfolioWords.reduce((acc, word) => acc + word.predictedKnowledge, 0) / totalWords,
  )
  const wordsAtRisk = portfolioWords.filter((w) => w.masteryStatus === "At Risk" || w.predictedKnowledge < 50).length

  // Data for charts
  const allocationData = partsOfSpeech
    .slice(1)
    .map((pos) => ({
      name: pos,
      value: portfolioWords.filter((w) => w.partOfSpeech === pos).length,
    }))
    .filter((d) => d.value > 0)

  const knowledgeDistributionData = [
    { name: "0-20%", count: portfolioWords.filter((w) => w.predictedKnowledge <= 20).length },
    {
      name: "21-40%",
      count: portfolioWords.filter((w) => w.predictedKnowledge > 20 && w.predictedKnowledge <= 40).length,
    },
    {
      name: "41-60%",
      count: portfolioWords.filter((w) => w.predictedKnowledge > 40 && w.predictedKnowledge <= 60).length,
    },
    {
      name: "61-80%",
      count: portfolioWords.filter((w) => w.predictedKnowledge > 60 && w.predictedKnowledge <= 80).length,
    },
    { name: "81-100%", count: portfolioWords.filter((w) => w.predictedKnowledge > 80).length },
  ]

  const COLORS = ["#fc4c02", "#ea580c", "#c2410c", "#9a3412", "#7c2d12", "#431407"]

  const renderAssetsTable = () => {
    let data
    switch (activeTab) {
      case "topGainers":
        data = portfolioWords
          .filter((w) => w.trend === "up")
          .sort((a, b) => b.predictedKnowledge - a.predictedKnowledge)
        break
      case "atRisk":
      default:
        data = portfolioWords
          .filter((w) => w.masteryStatus === "At Risk" || w.trend === "down")
          .sort((a, b) => a.predictedKnowledge - b.predictedKnowledge)
        break
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Asset (Word)</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Predicted Knowledge</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((word) => (
            <TableRow key={word.id}>
              <TableCell className="font-medium">{word.word}</TableCell>
              <TableCell>{word.partOfSpeech}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    word.masteryStatus === "Mastered"
                      ? "default"
                      : word.masteryStatus === "At Risk"
                        ? "destructive"
                        : "secondary"
                  }
                >
                  {word.masteryStatus}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <span>{word.predictedKnowledge}%</span>
                  {word.trend === "up" && <TrendingUp className="h-4 w-4 text-green-500" />}
                  {word.trend === "down" && <TrendingDown className="h-4 w-4 text-red-500" />}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Your Vocabulary Portfolio</h2>
        <p className="text-muted-foreground">An investment-style analysis of your language assets.</p>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-orange-500" />
            Portfolio Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-4">
          <Select defaultValue="All Groups">
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Filter by Deck" />
            </SelectTrigger>
            <SelectContent>
              {wordGroups.map((group) => (
                <SelectItem key={group} value={group}>
                  {group}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select defaultValue="All">
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Filter by Part of Speech" />
            </SelectTrigger>
            <SelectContent>
              {partsOfSpeech.map((pos) => (
                <SelectItem key={pos} value={pos}>
                  {pos}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select defaultValue="All">
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Filter by Difficulty" />
            </SelectTrigger>
            <SelectContent>
              {difficulties.map((diff) => (
                <SelectItem key={diff} value={diff}>
                  {diff}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {portfolioValue} <span className="text-sm font-normal text-muted-foreground">/ {totalWords} words</span>
            </div>
            <p className="text-xs text-muted-foreground">Total mastered assets</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Predicted Knowledge</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{predictedKnowledgeScore}%</div>
            <p className="text-xs text-muted-foreground">Average ML prediction score</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth (30d)</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+18%</div>
            <p className="text-xs text-muted-foreground">Increase in mastered words</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assets at Risk</CardTitle>
            <ShieldAlert className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{wordsAtRisk}</div>
            <p className="text-xs text-muted-foreground">Words likely to be forgotten</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-2 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="h-5 w-5 text-orange-500" />
              Portfolio Allocation
            </CardTitle>
            <CardDescription>Diversification by part of speech.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={allocationData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                    {allocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChartHorizontal className="h-5 w-5 text-orange-500" />
              Knowledge Distribution
            </CardTitle>
            <CardDescription>Asset distribution by predicted knowledge score.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={knowledgeDistributionData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={60} />
                  <Tooltip />
                  <Bar dataKey="count" name="Words" fill="#fc4c02" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Asset Table */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Asset Analysis</CardTitle>
          <CardDescription>Review your individual vocabulary assets.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList>
              <TabsTrigger value="atRisk">Assets at Risk</TabsTrigger>
              <TabsTrigger value="topGainers">Top Gainers</TabsTrigger>
            </TabsList>
            <TabsContent value="atRisk">{renderAssetsTable()}</TabsContent>
            <TabsContent value="topGainers">{renderAssetsTable()}</TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
