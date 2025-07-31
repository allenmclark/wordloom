"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, TrendingUp, Filter } from "lucide-react"

const partsOfSpeech = ["All", "Verb", "Noun", "Adjective", "Adverb", "Conjunction"]

// Generate sample heatmap data for the past year
const generateHeatmapData = () => {
  const data = []
  const startDate = new Date()
  startDate.setFullYear(startDate.getFullYear() - 1)

  for (let i = 0; i < 365; i++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)

    // Simulate activity levels (0-4)
    const activity = Math.random() > 0.3 ? Math.floor(Math.random() * 5) : 0

    if (activity > 0) {
      data.push({
        date: date.toISOString().split("T")[0],
        activity,
        words: activity * 5 + Math.floor(Math.random() * 10),
        partOfSpeech: partsOfSpeech[Math.floor(Math.random() * (partsOfSpeech.length - 1)) + 1],
      })
    } else {
      data.push({
        date: date.toISOString().split("T")[0],
        activity: 0,
        words: 0,
        partOfSpeech: "None",
      })
    }
  }

  return data
}

const rawHeatmapData = generateHeatmapData()

const getActivityColor = (level: number) => {
  const colors = [
    "bg-gray-100", // No activity
    "bg-orange-100", // Low activity
    "bg-orange-200", // Medium-low activity
    "bg-orange-400", // Medium-high activity
    "bg-orange-500", // High activity
  ]
  return colors[level] || colors[0]
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export function HeatmapVisualization() {
  const [selectedPOS, setSelectedPOS] = useState("All")

  const heatmapData = useMemo(() => {
    if (selectedPOS === "All") {
      return rawHeatmapData
    }
    // For filtering, we still need to show all days, but only count activity for the selected POS
    return rawHeatmapData.map((day) => {
      if (day.partOfSpeech === selectedPOS) {
        return day
      }
      return { ...day, activity: 0, words: 0 }
    })
  }, [selectedPOS])

  const totalWords = heatmapData.reduce((sum, day) => sum + day.words, 0)
  const activeDays = heatmapData.filter((day) => day.activity > 0).length

  const calculateStreak = (data: typeof heatmapData) => {
    let currentStreak = 0
    let longestStreak = 0
    data.forEach((day) => {
      if (day.activity > 0) {
        currentStreak++
      } else {
        longestStreak = Math.max(longestStreak, currentStreak)
        currentStreak = 0
      }
    })
    longestStreak = Math.max(longestStreak, currentStreak) // Check streak at the end

    let finalCurrentStreak = 0
    for (let i = data.length - 1; i >= 0; i--) {
      if (data[i].activity > 0) {
        finalCurrentStreak++
      } else {
        break
      }
    }
    return { currentStreak: finalCurrentStreak, longestStreak }
  }

  const { currentStreak, longestStreak } = calculateStreak(heatmapData)

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <CardTitle className="flex items-center gap-2 mb-2">
            <Calendar className="h-5 w-5 text-orange-500" />
            Learning Activity
          </CardTitle>
          <CardDescription>Your vocabulary learning activity over the past year.</CardDescription>
        </div>
        <div className="mt-4 md:mt-0">
          <Select value={selectedPOS} onValueChange={setSelectedPOS}>
            <SelectTrigger className="w-full md:w-[180px]">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Filter by Type" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {partsOfSpeech.map((pos) => (
                <SelectItem key={pos} value={pos}>
                  {pos}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">{totalWords}</div>
            <p className="text-sm text-muted-foreground">Total words learned</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{activeDays}</div>
            <p className="text-sm text-muted-foreground">Active days</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{currentStreak}</div>
            <p className="text-sm text-muted-foreground">Current streak</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">{longestStreak}</div>
            <p className="text-sm text-muted-foreground">Longest streak</p>
          </CardContent>
        </Card>
      </div>

      {/* Heatmap */}
      <Card>
        <CardContent className="p-6 overflow-x-auto">
          <div className="space-y-4 min-w-[600px]">
            {/* Month labels */}
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              {months.map((month) => (
                <span key={month}>{month}</span>
              ))}
            </div>

            {/* Heatmap grid */}
            <div className="flex gap-1">
              {/* Weekday labels */}
              <div className="flex flex-col gap-1 mr-2">
                {weekdays.map((day, index) => (
                  <div key={day} className="h-3 text-xs text-muted-foreground flex items-center">
                    {index % 2 === 1 ? day.slice(0, 3) : ""}
                  </div>
                ))}
              </div>

              {/* Heatmap cells */}
              <div className="grid grid-cols-53 gap-1">
                {heatmapData.map((day) => {
                  return (
                    <div
                      key={day.date}
                      className={`w-3 h-3 rounded-sm ${getActivityColor(day.activity)} hover:ring-2 hover:ring-orange-300 cursor-pointer transition-all`}
                      title={`${day.date}: ${day.words} words learned`}
                    />
                  )
                })}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Less</span>
                <div className="flex gap-1">
                  {[0, 1, 2, 3, 4].map((level) => (
                    <div key={level} className={`w-3 h-3 rounded-sm ${getActivityColor(level)}`} />
                  ))}
                </div>
                <span>More</span>
              </div>

              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {Math.round((activeDays / 365) * 100)}% active days
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
